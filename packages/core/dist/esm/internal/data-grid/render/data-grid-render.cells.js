import { CompactSelection, GridColumnIcon, GridCellKind, isInnerOnlyCell } from "../data-grid-types.js";
import { CellSet } from "../cell-set.js";
import { cellIsSelected, cellIsInRange, getFreezeTrailingHeight, drawLastUpdateUnderlay, getGroupName } from "./data-grid-lib.js";
import { mergeAndRealizeTheme } from "../../../common/styles.js";
import { blend } from "../color-parser.js";
import { intersectRect } from "../../../common/math.js";
import { getSkipPoint, getSpanBounds, walkColumns, walkRowsInCol } from "./data-grid-render.walk.js";
const loadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
export function drawCells(ctx, effectiveColumns, allColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, outerTheme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth) {
  var _damage$size;
  let toDraw = (_damage$size = damage === null || damage === void 0 ? void 0 : damage.size) !== null && _damage$size !== void 0 ? _damage$size : Number.MAX_SAFE_INTEGER;
  const frameTime = performance.now();
  let font = outerTheme.baseFontFull;
  ctx.font = font;
  const deprepArg = {
    ctx
  };
  const cellIndex = [0, 0];
  const freezeTrailingRowsHeight = freezeTrailingRows > 0 ? getFreezeTrailingHeight(rows, freezeTrailingRows, getRowHeight) : 0;
  let result;
  let handledSpans = undefined;
  const rowSpannedCells = new CellSet();
  const handledRowSpans = new Set();
  const skipPoint = getSkipPoint(drawRegions);
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, colDrawStartY, clipX, startRow) => {
    const diff = Math.max(0, clipX - drawX);
    const colDrawX = drawX + diff;
    const colDrawY = totalHeaderHeight + 1;
    const colWidth = c.width - diff;
    const colHeight = height - totalHeaderHeight - 1;
    if (drawRegions.length > 0) {
      let found = false;
      for (let i = 0; i < drawRegions.length; i++) {
        const dr = drawRegions[i];
        if (intersectRect(colDrawX, colDrawY, colWidth, colHeight, dr.x, dr.y, dr.width, dr.height)) {
          found = true;
          break;
        }
      }
      if (!found) return;
    }
    const reclip = () => {
      ctx.save();
      ctx.beginPath();
      ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
      ctx.clip();
    };
    const colSelected = selection.columns.hasIndex(c.sourceIndex);
    const groupTheme = getGroupDetails(getGroupName(c.group)).overrideTheme;
    const colTheme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);
    const colFont = colTheme.baseFontFull;
    if (colFont !== font) {
      font = colFont;
      ctx.font = colFont;
    }
    reclip();
    let prepResult = undefined;
    walkRowsInCol(startRow, colDrawStartY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipPoint, (drawY, row, rh, isSticky, isTrailingRow) => {
      var _c$trailingRowOptions, _c$trailingRowOptions2;
      if (row < 0) return;
      cellIndex[0] = c.sourceIndex;
      cellIndex[1] = row;
      if (rowSpannedCells.has(cellIndex)) {
        toDraw--;
        return;
      }
      if (damage !== undefined && !damage.has(cellIndex)) {
        return;
      }
      if (drawRegions.length > 0) {
        let found = false;
        for (let i = 0; i < drawRegions.length; i++) {
          const dr = drawRegions[i];
          if (intersectRect(drawX, drawY, c.width, rh, dr.x, dr.y, dr.width, dr.height)) {
            found = true;
            break;
          }
        }
        if (!found) return;
      }
      const rowSelected = selection.rows.hasIndex(row);
      const rowDisabled = disabledRows.hasIndex(row);
      const cell = row < rows ? getCellContent(cellIndex) : loadingCell;
      let cellX = drawX;
      let cellWidth = c.width;
      let cellY = drawY;
      let cellHeight = rh;
      let drawingSpan = false;
      let skipContents = false;
      if (cell.rowspan !== undefined) {
        const [startRowX, endRow] = cell.rowspan;
        const spanKey = `${c.sourceIndex}|${startRowX}`;
        if (!handledRowSpans.has(spanKey)) {
          let spanY = drawY;
          for (let i = startRowX; i < row; i++) {
            spanY -= getRowHeight(i);
          }
          let spanHeight = 0;
          for (let i = startRowX; i < endRow; i++) {
            spanHeight += getRowHeight(i);
          }
          if (spanY < colDrawY + colHeight && spanY + spanHeight > colDrawY) {
            cellY = spanY;
            cellHeight = spanHeight;
            handledRowSpans.add(spanKey);
            for (let i = startRowX; i < endRow; i++) {
              if (i !== row) {
                rowSpannedCells.add([c.sourceIndex, i]);
              }
            }
            drawingSpan = true;
          } else {
            handledRowSpans.add(spanKey);
            for (let i = startRowX; i < endRow; i++) {
              rowSpannedCells.add([c.sourceIndex, i]);
            }
            toDraw--;
            return;
          }
        } else {
          toDraw--;
          return;
        }
      }
      if (cell.span !== undefined) {
        const [startCol, endCol] = cell.span;
        const spanKey = `${row},${startCol},${endCol},${c.sticky}`;
        if (handledSpans === undefined) handledSpans = new Set();
        if (!handledSpans.has(spanKey)) {
          const areas = getSpanBounds(cell.span, drawX, drawY, c.width, rh, c, allColumns);
          const area = c.sticky ? areas[0] : areas[1];
          if (!c.sticky && areas[0] !== undefined) {
            skipContents = true;
          }
          if (area !== undefined) {
            cellX = area.x;
            cellWidth = area.width;
            handledSpans.add(spanKey);
            drawingSpan = true;
          }
        } else {
          toDraw--;
          return;
        }
      }
      if (drawingSpan) {
        ctx.restore();
        prepResult = undefined;
        ctx.save();
        ctx.beginPath();
        const d = Math.max(0, clipX - cellX);
        ctx.rect(cellX + d, cellY, cellWidth - d, cellHeight);
        if (result === undefined) {
          result = [];
        }
        result.push({
          x: cellX + d,
          y: cellY,
          width: cellWidth - d,
          height: cellHeight
        });
        ctx.clip();
      }
      const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
      const trailingTheme = isTrailingRow && ((_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.themeOverride) !== undefined ? (_c$trailingRowOptions2 = c.trailingRowOptions) === null || _c$trailingRowOptions2 === void 0 ? void 0 : _c$trailingRowOptions2.themeOverride : undefined;
      const theme = cell.themeOverride === undefined && rowTheme === undefined && trailingTheme === undefined ? colTheme : mergeAndRealizeTheme(colTheme, rowTheme, trailingTheme, cell.themeOverride);
      ctx.beginPath();
      const isSelected = cellIsSelected(cellIndex, cell, selection);
      let accentCount = cellIsInRange(cellIndex, cell, selection, drawFocus);
      const spanIsHighlighted = cell.span !== undefined && selection.columns.some(index => cell.span !== undefined && index >= cell.span[0] && index <= cell.span[1]);
      if (isSelected && !isFocused && drawFocus) {
        accentCount = 0;
      } else if (isSelected && drawFocus) {
        accentCount = Math.max(accentCount, 1);
      }
      if (spanIsHighlighted) {
        accentCount++;
      }
      if (!isSelected) {
        if (rowSelected) accentCount++;
        if (colSelected && !isTrailingRow) accentCount++;
      }
      const bgCell = cell.kind === GridCellKind.Protected ? theme.bgCellMedium : theme.bgCell;
      let fill;
      if (isSticky || bgCell !== outerTheme.bgCell) {
        fill = blend(bgCell, fill);
      }
      if (accentCount > 0 || rowDisabled) {
        if (rowDisabled) {
          fill = blend(theme.bgHeader, fill);
        }
        for (let i = 0; i < accentCount; i++) {
          fill = blend(theme.accentLight, fill);
        }
      } else if (prelightCells !== undefined) {
        for (const pre of prelightCells) {
          if (pre[0] === c.sourceIndex && pre[1] === row) {
            fill = blend(theme.bgSearchResult, fill);
            break;
          }
        }
      }
      if (highlightRegions !== undefined) {
        for (let i = 0; i < highlightRegions.length; i++) {
          const region = highlightRegions[i];
          const r = region.range;
          if (region.style !== "solid-outline" && r.x <= c.sourceIndex && c.sourceIndex < r.x + r.width && r.y <= row && row < r.y + r.height) {
            fill = blend(region.color, fill);
          }
        }
      }
      let didDamageClip = false;
      if (damage !== undefined) {
        const top = drawY + 1;
        const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - freezeTrailingRowsHeight);
        const h = bottom - top;
        if (h !== rh - 1 || cellX + 1 <= clipX) {
          didDamageClip = true;
          ctx.save();
          ctx.beginPath();
          ctx.rect(cellX + 1, top, cellWidth - 1, h);
          ctx.clip();
        }
        fill = fill === undefined ? theme.bgCell : blend(fill, theme.bgCell);
      }
      const isLastColumn = c.sourceIndex === allColumns.length - 1;
      const isLastRow = row === rows - 1;
      if (fill !== undefined) {
        ctx.fillStyle = fill;
        if (prepResult !== undefined) {
          prepResult.fillStyle = fill;
        }
        if (damage !== undefined) {
          ctx.fillRect(cellX + 1, cellY + 1, cellWidth - (isLastColumn ? 2 : 1), cellHeight - (isLastRow ? 2 : 1));
        } else {
          ctx.fillRect(cellX, cellY, cellWidth, cellHeight);
        }
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 0.6;
      }
      let hoverValue;
      for (let i = 0; i < hoverValues.length; i++) {
        const hv = hoverValues[i];
        if (hv.item[0] === c.sourceIndex && hv.item[1] === row) {
          hoverValue = hv;
          break;
        }
      }
      if (cellWidth > minimumCellWidth && !skipContents) {
        var _hoverValue$hoverAmou, _hoverValue;
        const cellFont = theme.baseFontFull;
        if (cellFont !== font) {
          ctx.font = cellFont;
          font = cellFont;
        }
        let vtrans = 0;
        if (cell.rowspan !== undefined) {
          var _cell$rowSpanPosition;
          const pos = (_cell$rowSpanPosition = cell.rowSpanPosition) !== null && _cell$rowSpanPosition !== void 0 ? _cell$rowSpanPosition : "top";
          if (pos === "top") {
            vtrans = rh / 2 - cellHeight / 2;
          } else if (pos === "bottom") {
            const [_, endRow] = cell.rowspan;
            const lastRowHeight = getRowHeight(endRow - 1);
            vtrans = cellHeight / 2 - lastRowHeight / 2;
          }
        }
        prepResult = drawCell(ctx, cell, c.sourceIndex, row, isLastColumn, isLastRow, cellX, cellY, cellWidth, cellHeight, accentCount > 0, theme, fill !== null && fill !== void 0 ? fill : theme.bgCell, imageLoader, spriteManager, (_hoverValue$hoverAmou = (_hoverValue = hoverValue) === null || _hoverValue === void 0 ? void 0 : _hoverValue.hoverAmount) !== null && _hoverValue$hoverAmou !== void 0 ? _hoverValue$hoverAmou : 0, hoverInfo, hyperWrapping, frameTime, drawCellCallback, prepResult, enqueue, renderStateProvider, getCellRenderer, overrideCursor, vtrans);
      }
      if (didDamageClip) {
        ctx.restore();
      }
      if (cell.style === "faded") {
        ctx.globalAlpha = 1;
      }
      toDraw--;
      if (drawingSpan) {
        var _prepResult, _prepResult$deprep;
        ctx.restore();
        (_prepResult = prepResult) === null || _prepResult === void 0 || (_prepResult$deprep = _prepResult.deprep) === null || _prepResult$deprep === void 0 || _prepResult$deprep.call(_prepResult, deprepArg);
        prepResult = undefined;
        reclip();
        font = colFont;
        ctx.font = colFont;
      }
      return toDraw <= 0;
    });
    ctx.restore();
    return toDraw <= 0;
  });
  if (result === undefined) return;
  return result;
}
const allocatedItem = [0, 0];
const reusableRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};
const drawState = [undefined, () => undefined];
let animationFrameRequested = false;
function animRequest() {
  animationFrameRequested = true;
}
export function drawCell(ctx, cell, col, row, isLastCol, isLastRow, x, y, w, h, highlighted, theme, finalCellFillColor, imageLoader, spriteManager, hoverAmount, hoverInfo, hyperWrapping, frameTime, drawCellCallback, lastPrep, enqueue, renderStateProvider, getCellRenderer, overrideCursor, vtrans) {
  let hoverX;
  let hoverY;
  if (hoverInfo !== undefined && hoverInfo[0][0] === col && hoverInfo[0][1] === row) {
    hoverX = hoverInfo[1][0];
    hoverY = hoverInfo[1][1];
  }
  let result = undefined;
  allocatedItem[0] = col;
  allocatedItem[1] = row;
  reusableRect.x = x;
  reusableRect.y = y;
  reusableRect.width = w;
  reusableRect.height = h;
  drawState[0] = renderStateProvider.getValue(allocatedItem);
  drawState[1] = val => renderStateProvider.setValue(allocatedItem, val);
  animationFrameRequested = false;
  const args = {
    ctx,
    theme,
    col,
    row,
    cell,
    rect: reusableRect,
    highlighted,
    cellFillColor: finalCellFillColor,
    hoverAmount,
    frameTime,
    hoverX,
    drawState,
    hoverY,
    imageLoader,
    spriteManager,
    hyperWrapping,
    overrideCursor: hoverX !== undefined ? overrideCursor : undefined,
    requestAnimationFrame: animRequest
  };
  const needsAnim = drawLastUpdateUnderlay(args, cell.lastUpdated, frameTime, lastPrep, isLastCol, isLastRow);
  const r = getCellRenderer(cell);
  if (r !== undefined) {
    var _lastPrep, _r$drawPrep;
    if (((_lastPrep = lastPrep) === null || _lastPrep === void 0 ? void 0 : _lastPrep.renderer) !== r) {
      var _lastPrep2, _lastPrep2$deprep;
      (_lastPrep2 = lastPrep) === null || _lastPrep2 === void 0 || (_lastPrep2$deprep = _lastPrep2.deprep) === null || _lastPrep2$deprep === void 0 || _lastPrep2$deprep.call(_lastPrep2, args);
      lastPrep = undefined;
    }
    const partialPrepResult = (_r$drawPrep = r.drawPrep) === null || _r$drawPrep === void 0 ? void 0 : _r$drawPrep.call(r, args, lastPrep);
    ctx.save();
    ctx.translate(0, vtrans);
    if (drawCellCallback !== undefined && !isInnerOnlyCell(args.cell)) {
      drawCellCallback(args, () => r.draw(args, cell));
    } else {
      r.draw(args, cell);
    }
    ctx.restore();
    result = partialPrepResult === undefined ? undefined : {
      deprep: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.deprep,
      fillStyle: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.fillStyle,
      font: partialPrepResult === null || partialPrepResult === void 0 ? void 0 : partialPrepResult.font,
      renderer: r
    };
  }
  if (needsAnim || animationFrameRequested) enqueue === null || enqueue === void 0 || enqueue(allocatedItem);
  return result;
}
//# sourceMappingURL=data-grid-render.cells.js.map