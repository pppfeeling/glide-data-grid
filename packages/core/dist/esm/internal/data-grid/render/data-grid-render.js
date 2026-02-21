import "../data-grid-types.js";
import { CellSet } from "../cell-set.js";
import { getEffectiveColumns, rectBottomRight } from "./data-grid-lib.js";
import { blend } from "../color-parser.js";
import { assert } from "../../../common/support.js";
import { walkColumns, walkGroups, walkRowsInCol } from "./data-grid-render.walk.js";
import { drawCells } from "./data-grid-render.cells.js";
import { drawGridHeaders } from "./data-grid-render.header.js";
import { drawGridLines, overdrawStickyBoundaries, drawBlanks, drawExtraRowThemes } from "./data-grid-render.lines.js";
import { blitLastFrame, blitResizedCol, computeCanBlit } from "./data-grid-render.blit.js";
import { drawHighlightRings, drawFillHandle, drawColumnResizeOutline } from "./data-grid.render.rings.js";
function clipHeaderDamage(ctx, effectiveColumns, width, totalGroupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage) {
  if (damage === undefined || damage.size === 0) return;
  ctx.beginPath();
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (c, drawX, _colDrawY, clipX) => {
    const diff = Math.max(0, clipX - drawX);
    const finalX = drawX + diff + 1;
    const finalWidth = c.width - diff - 1;
    if (damage.has([c.sourceIndex, -1])) {
      ctx.rect(finalX, totalGroupHeaderHeight, finalWidth, totalHeaderHeight - totalGroupHeaderHeight);
    }
  });
  ctx.clip();
}
function getLastRow(effectiveColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow) {
  let result = 0;
  walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight, (_c, __drawX, colDrawY, _clipX, startRow) => {
    walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, undefined, (_drawY, row, _rh, isSticky) => {
      if (!isSticky) {
        result = Math.max(row, result);
      }
    });
    return true;
  });
  return result;
}
export function drawGrid(arg, lastArg) {
  var _window$devicePixelRa, _selection$current;
  const {
    canvasCtx,
    headerCanvasCtx,
    width,
    height,
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mappedColumns,
    enableGroups,
    freezeColumns,
    dragAndDropState,
    theme,
    drawFocus,
    headerHeight,
    groupHeaderHeight,
    groupLevels,
    groupHeaderHeights,
    disabledRows,
    rowHeight,
    verticalBorder,
    overrideCursor,
    isResizing,
    selection,
    fillHandle,
    freezeTrailingRows,
    rows,
    getCellContent,
    getGroupDetails,
    getRowThemeOverride,
    isFocused,
    drawHeaderCallback,
    prelightCells,
    drawCellCallback,
    highlightRegions,
    resizeCol,
    imageLoader,
    lastBlitData,
    hoverValues,
    hyperWrapping,
    hoverInfo,
    spriteManager,
    maxScaleFactor,
    hasAppendRow,
    touchMode,
    enqueue,
    renderStateProvider,
    getCellRenderer,
    renderStrategy,
    bufferACtx,
    bufferBCtx,
    damage,
    minimumCellWidth,
    resizeIndicator
  } = arg;
  if (width === 0 || height === 0) return;
  const doubleBuffer = renderStrategy === "double-buffer";
  const dpr = Math.min(maxScaleFactor, Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1));
  const canBlit = renderStrategy !== "direct" && computeCanBlit(arg, lastArg);
  const canvas = canvasCtx.canvas;
  if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
  }
  const overlayCanvas = headerCanvasCtx.canvas;
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const overlayHeight = totalHeaderHeight + 1;
  if (overlayCanvas.width !== width * dpr || overlayCanvas.height !== overlayHeight * dpr) {
    overlayCanvas.width = width * dpr;
    overlayCanvas.height = overlayHeight * dpr;
    overlayCanvas.style.width = width + "px";
    overlayCanvas.style.height = overlayHeight + "px";
  }
  const bufferA = bufferACtx.canvas;
  const bufferB = bufferBCtx.canvas;
  if (doubleBuffer && (bufferA.width !== width * dpr || bufferA.height !== height * dpr)) {
    bufferA.width = width * dpr;
    bufferA.height = height * dpr;
    if (lastBlitData.current !== undefined) lastBlitData.current.aBufferScroll = undefined;
  }
  if (doubleBuffer && (bufferB.width !== width * dpr || bufferB.height !== height * dpr)) {
    bufferB.width = width * dpr;
    bufferB.height = height * dpr;
    if (lastBlitData.current !== undefined) lastBlitData.current.bBufferScroll = undefined;
  }
  const last = lastBlitData.current;
  if (canBlit === true && cellXOffset === (last === null || last === void 0 ? void 0 : last.cellXOffset) && cellYOffset === (last === null || last === void 0 ? void 0 : last.cellYOffset) && translateX === (last === null || last === void 0 ? void 0 : last.translateX) && translateY === (last === null || last === void 0 ? void 0 : last.translateY)) return;
  let mainCtx = null;
  if (doubleBuffer) {
    mainCtx = canvasCtx;
  }
  const overlayCtx = headerCanvasCtx;
  let targetCtx;
  if (!doubleBuffer) {
    targetCtx = canvasCtx;
  } else if (damage !== undefined) {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferBCtx : bufferACtx;
  } else {
    targetCtx = (last === null || last === void 0 ? void 0 : last.lastBuffer) === "b" ? bufferACtx : bufferBCtx;
  }
  const targetBuffer = targetCtx.canvas;
  const blitSource = doubleBuffer ? targetBuffer === bufferA ? bufferB : bufferA : canvas;
  const getRowHeight = typeof rowHeight === "number" ? () => rowHeight : rowHeight;
  overlayCtx.save();
  targetCtx.save();
  overlayCtx.beginPath();
  targetCtx.beginPath();
  overlayCtx.textBaseline = "middle";
  targetCtx.textBaseline = "middle";
  if (dpr !== 1) {
    overlayCtx.scale(dpr, dpr);
    targetCtx.scale(dpr, dpr);
  }
  const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
  let drawRegions = [];
  const mustDrawFocusOnHeader = drawFocus && ((_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell[1]) === cellYOffset && translateY === 0;
  let mustDrawHighlightRingsOnHeader = false;
  if (highlightRegions !== undefined) {
    for (const r of highlightRegions) {
      if (r.style !== "no-outline" && r.range.y === cellYOffset && translateY === 0) {
        mustDrawHighlightRingsOnHeader = true;
        break;
      }
    }
  }
  const drawHeaderTexture = () => {
    var _ref, _theme$headerBottomBo;
    overlayCtx.fillStyle = theme.bgHeader;
    overlayCtx.fillRect(0, 0, width, totalHeaderHeight + 1);
    drawGridHeaders(overlayCtx, effectiveCols, mappedColumns, enableGroups, hoverInfo, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, theme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode, groupLevels, groupHeaderHeights);
    drawGridLines(overlayCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, undefined, undefined, totalGroupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme, true);
    overlayCtx.beginPath();
    overlayCtx.moveTo(0, overlayHeight - 0.5);
    overlayCtx.lineTo(width, overlayHeight - 0.5);
    overlayCtx.strokeStyle = blend((_ref = (_theme$headerBottomBo = theme.headerBottomBorderColor) !== null && _theme$headerBottomBo !== void 0 ? _theme$headerBottomBo : theme.horizontalBorderColor) !== null && _ref !== void 0 ? _ref : theme.borderColor, theme.bgHeader);
    overlayCtx.stroke();
    if (mustDrawHighlightRingsOnHeader) {
      drawHighlightRings(overlayCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, totalGroupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme, groupLevels, groupHeaderHeights);
    }
    if (mustDrawFocusOnHeader) {
      drawFillHandle(overlayCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
    }
  };
  if (damage !== undefined) {
    const viewRegionWidth = effectiveCols[effectiveCols.length - 1].sourceIndex + 1;
    const damageInView = damage.hasItemInRegion([{
      x: cellXOffset,
      y: -2,
      width: viewRegionWidth,
      height: 2
    }, {
      x: cellXOffset,
      y: cellYOffset,
      width: viewRegionWidth,
      height: 300
    }, {
      x: 0,
      y: cellYOffset,
      width: freezeColumns,
      height: 300
    }, {
      x: 0,
      y: -2,
      width: freezeColumns,
      height: 2
    }, {
      x: cellXOffset,
      y: rows - freezeTrailingRows,
      width: viewRegionWidth,
      height: freezeTrailingRows,
      when: freezeTrailingRows > 0
    }]);
    const doDamage = ctx => {
      drawCells(ctx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
      const selectionCurrent = selection.current;
      if (fillHandle !== false && fillHandle !== undefined && drawFocus && selectionCurrent !== undefined && damage.has(rectBottomRight(selectionCurrent.range))) {
        drawFillHandle(ctx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows);
      }
    };
    if (damageInView) {
      doDamage(targetCtx);
      if (mainCtx !== null) {
        mainCtx.save();
        mainCtx.scale(dpr, dpr);
        mainCtx.textBaseline = "middle";
        doDamage(mainCtx);
        mainCtx.restore();
      }
      const doHeaders = damage.hasHeader();
      if (doHeaders) {
        clipHeaderDamage(overlayCtx, effectiveCols, width, totalGroupHeaderHeight, totalHeaderHeight, translateX, translateY, cellYOffset, damage);
        drawHeaderTexture();
      }
    }
    targetCtx.restore();
    overlayCtx.restore();
    return;
  }
  if (canBlit !== true || cellXOffset !== (last === null || last === void 0 ? void 0 : last.cellXOffset) || cellYOffset !== (last === null || last === void 0 ? void 0 : last.cellYOffset) || translateX !== (last === null || last === void 0 ? void 0 : last.translateX) || translateY !== (last === null || last === void 0 ? void 0 : last.translateY) || mustDrawFocusOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawFocusOnHeader) || mustDrawHighlightRingsOnHeader !== (last === null || last === void 0 ? void 0 : last.mustDrawHighlightRingsOnHeader)) {
    drawHeaderTexture();
  }
  if (canBlit === true) {
    assert(blitSource !== undefined && last !== undefined);
    const {
      regions
    } = blitLastFrame(targetCtx, blitSource, blitSource === bufferA ? last.aBufferScroll : last.bBufferScroll, blitSource === bufferA ? last.bBufferScroll : last.aBufferScroll, last, cellXOffset, cellYOffset, translateX, translateY, freezeTrailingRows, width, height, rows, totalHeaderHeight, dpr, mappedColumns, effectiveCols, rowHeight, doubleBuffer);
    drawRegions = regions;
  } else if (canBlit !== false) {
    assert(last !== undefined);
    const resizedCol = canBlit;
    drawRegions = blitResizedCol(last, cellXOffset, cellYOffset, translateX, translateY, width, height, totalHeaderHeight, effectiveCols, resizedCol);
  }
  overdrawStickyBoundaries(targetCtx, effectiveCols, width, height, freezeTrailingRows, rows, verticalBorder, getRowHeight, theme);
  const highlightRedraw = drawHighlightRings(targetCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, freezeColumns, headerHeight, totalGroupHeaderHeight, rowHeight, freezeTrailingRows, rows, highlightRegions, theme, groupLevels, groupHeaderHeights);
  const focusRedraw = drawFocus ? drawFillHandle(targetCtx, width, height, cellYOffset, translateX, translateY, effectiveCols, mappedColumns, theme, totalHeaderHeight, selection, getRowHeight, getCellContent, freezeTrailingRows, hasAppendRow, fillHandle, rows) : undefined;
  targetCtx.fillStyle = theme.bgCell;
  if (drawRegions.length > 0) {
    targetCtx.beginPath();
    for (const r of drawRegions) {
      targetCtx.rect(r.x, r.y, r.width, r.height);
    }
    targetCtx.clip();
    targetCtx.fill();
    targetCtx.beginPath();
  } else {
    targetCtx.fillRect(0, 0, width, height);
  }
  const spans = drawCells(targetCtx, effectiveCols, mappedColumns, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getCellContent, getGroupDetails, getRowThemeOverride, disabledRows, isFocused, drawFocus, freezeTrailingRows, hasAppendRow, drawRegions, damage, selection, prelightCells, highlightRegions, imageLoader, spriteManager, hoverValues, hoverInfo, drawCellCallback, hyperWrapping, theme, enqueue, renderStateProvider, getCellRenderer, overrideCursor, minimumCellWidth);
  drawBlanks(targetCtx, effectiveCols, mappedColumns, width, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, getRowThemeOverride, selection.rows, disabledRows, freezeTrailingRows, hasAppendRow, drawRegions, damage, theme);
  drawExtraRowThemes(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  drawGridLines(targetCtx, effectiveCols, cellYOffset, translateX, translateY, width, height, drawRegions, spans, totalGroupHeaderHeight, totalHeaderHeight, getRowHeight, getRowThemeOverride, verticalBorder, freezeTrailingRows, rows, theme);
  highlightRedraw === null || highlightRedraw === void 0 || highlightRedraw();
  focusRedraw === null || focusRedraw === void 0 || focusRedraw();
  if (isResizing && resizeIndicator !== "none") {
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
      if (c.sourceIndex === resizeCol) {
        var _theme$resizeIndicato;
        drawColumnResizeOutline(overlayCtx, x + c.width, 0, totalHeaderHeight + 1, blend((_theme$resizeIndicato = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato !== void 0 ? _theme$resizeIndicato : theme.accentLight, theme.bgHeader));
        if (resizeIndicator === "full") {
          var _theme$resizeIndicato2;
          drawColumnResizeOutline(targetCtx, x + c.width, totalHeaderHeight, height, blend((_theme$resizeIndicato2 = theme.resizeIndicatorColor) !== null && _theme$resizeIndicato2 !== void 0 ? _theme$resizeIndicato2 : theme.accentLight, theme.bgCell));
        }
        return true;
      }
      return false;
    });
  }
  if (mainCtx !== null) {
    mainCtx.fillStyle = theme.bgCell;
    mainCtx.fillRect(0, 0, width, height);
    mainCtx.drawImage(targetCtx.canvas, 0, 0);
  }
  const lastRowDrawn = getLastRow(effectiveCols, height, totalHeaderHeight, translateX, translateY, cellYOffset, rows, getRowHeight, freezeTrailingRows, hasAppendRow);
  imageLoader === null || imageLoader === void 0 || imageLoader.setWindow({
    x: cellXOffset,
    y: cellYOffset,
    width: effectiveCols.length,
    height: lastRowDrawn - cellYOffset
  }, freezeColumns, Array.from({
    length: freezeTrailingRows
  }, (_, i) => rows - 1 - i));
  const scrollX = last !== undefined && (cellXOffset !== last.cellXOffset || translateX !== last.translateX);
  const scrollY = last !== undefined && (cellYOffset !== last.cellYOffset || translateY !== last.translateY);
  lastBlitData.current = {
    cellXOffset,
    cellYOffset,
    translateX,
    translateY,
    mustDrawFocusOnHeader,
    mustDrawHighlightRingsOnHeader,
    lastBuffer: doubleBuffer ? targetBuffer === bufferA ? "a" : "b" : undefined,
    aBufferScroll: targetBuffer === bufferA ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.aBufferScroll,
    bBufferScroll: targetBuffer === bufferB ? [scrollX, scrollY] : last === null || last === void 0 ? void 0 : last.bBufferScroll
  };
  targetCtx.restore();
  overlayCtx.restore();
}
//# sourceMappingURL=data-grid-render.js.map