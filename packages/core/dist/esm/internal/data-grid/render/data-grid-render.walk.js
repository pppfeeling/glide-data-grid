import "../data-grid-types.js";
import { isGroupEqual, getGroupName, getGroupAtLevel, isGroupEqualAtLevel } from "./data-grid-lib.js";
export function getSkipPoint(drawRegions) {
  if (drawRegions.length === 0) return undefined;
  let drawRegionsLowestY;
  for (const dr of drawRegions) {
    drawRegionsLowestY = Math.min(drawRegionsLowestY !== null && drawRegionsLowestY !== void 0 ? drawRegionsLowestY : dr.y, dr.y);
  }
  return drawRegionsLowestY;
}
export function walkRowsInCol(startRow, drawY, height, rows, getRowHeight, freezeTrailingRows, hasAppendRow, skipToY, cb) {
  skipToY = skipToY !== null && skipToY !== void 0 ? skipToY : drawY;
  let y = drawY;
  let row = startRow;
  const rowEnd = rows - freezeTrailingRows;
  let didBreak = false;
  while (y < height && row < rowEnd) {
    const rh = getRowHeight(row);
    if (y + rh > skipToY && cb(y, row, rh, false, hasAppendRow && row === rows - 1) === true) {
      didBreak = true;
      break;
    }
    y += rh;
    row++;
  }
  if (didBreak) return;
  y = height;
  for (let fr = 0; fr < freezeTrailingRows; fr++) {
    row = rows - 1 - fr;
    const rh = getRowHeight(row);
    y -= rh;
    cb(y, row, rh, true, hasAppendRow && row === rows - 1);
  }
}
export function walkColumns(effectiveCols, cellYOffset, translateX, translateY, totalHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  const drawY = totalHeaderHeight + translateY;
  for (const c of effectiveCols) {
    const drawX = c.sticky ? clipX : x + translateX;
    if (cb(c, drawX, drawY, c.sticky ? 0 : clipX, cellYOffset) === true) {
      break;
    }
    x += c.width;
    clipX += c.sticky ? c.width : 0;
  }
}
export function walkGroups(effectiveCols, width, translateX, groupHeaderHeight, cb) {
  let x = 0;
  let clipX = 0;
  for (let index = 0; index < effectiveCols.length; index++) {
    const startCol = effectiveCols[index];
    let end = index + 1;
    let boxWidth = startCol.width;
    if (startCol.sticky) {
      clipX += boxWidth;
    }
    while (end < effectiveCols.length && isGroupEqual(effectiveCols[end].group, startCol.group) && effectiveCols[end].sticky === effectiveCols[index].sticky) {
      const endCol = effectiveCols[end];
      boxWidth += endCol.width;
      end++;
      index++;
      if (endCol.sticky) {
        clipX += endCol.width;
      }
    }
    const t = startCol.sticky ? 0 : translateX;
    const localX = x + t;
    const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
    const w = Math.min(boxWidth - delta, width - (localX + delta));
    cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], getGroupName(startCol.group), localX + delta, 0, w, groupHeaderHeight);
    x += boxWidth;
  }
}
export function walkMultiLevelGroups(effectiveCols, width, translateX, groupHeaderHeights, groupLevels, cb) {
  if (groupLevels === 0) return;
  const levelYOffsets = [];
  let yOffset = 0;
  for (let level = 0; level < groupLevels; level++) {
    var _groupHeaderHeights$l;
    levelYOffsets.push(yOffset);
    yOffset += (_groupHeaderHeights$l = groupHeaderHeights[level]) !== null && _groupHeaderHeights$l !== void 0 ? _groupHeaderHeights$l : 0;
  }
  const colXPositions = [];
  let accX = 0;
  for (const col of effectiveCols) {
    colXPositions.push(accX);
    accX += col.width;
  }
  for (let level = 0; level < groupLevels; level++) {
    var _groupHeaderHeights$l2;
    const levelY = levelYOffsets[level];
    const levelHeight = (_groupHeaderHeights$l2 = groupHeaderHeights[level]) !== null && _groupHeaderHeights$l2 !== void 0 ? _groupHeaderHeights$l2 : 0;
    let clipX = 0;
    let index = 0;
    while (index < effectiveCols.length) {
      const startCol = effectiveCols[index];
      const startGroupName = getGroupAtLevel(startCol.group, level, groupLevels);
      if (startGroupName === undefined) {
        if (startCol.sticky) {
          clipX += startCol.width;
        }
        index++;
        continue;
      }
      const startX = colXPositions[index];
      let end = index + 1;
      let boxWidth = startCol.width;
      if (startCol.sticky) {
        clipX += startCol.width;
      }
      while (end < effectiveCols.length) {
        const endCol = effectiveCols[end];
        const isEqual = isGroupEqualAtLevel(endCol.group, startCol.group, level, groupLevels);
        const sameSticky = endCol.sticky === startCol.sticky;
        if (!isEqual || !sameSticky) {
          break;
        }
        boxWidth += endCol.width;
        if (endCol.sticky) {
          clipX += endCol.width;
        }
        end++;
      }
      const t = startCol.sticky ? 0 : translateX;
      const localX = startX + t;
      const delta = startCol.sticky ? 0 : Math.max(0, clipX - localX);
      const w = Math.min(boxWidth - delta, width - (localX + delta));
      if (w > 0) {
        cb([startCol.sourceIndex, effectiveCols[end - 1].sourceIndex], startGroupName, localX + delta, levelY, w, levelHeight, level);
      }
      index = end;
    }
  }
}
export function getSpanBounds(span, cellX, cellY, cellW, cellH, column, allColumns) {
  var _allColumns$find$sour, _allColumns$find;
  const [startCol, endCol] = span;
  let frozenRect;
  let contentRect;
  const firstNonSticky = (_allColumns$find$sour = (_allColumns$find = allColumns.find(x => !x.sticky)) === null || _allColumns$find === void 0 ? void 0 : _allColumns$find.sourceIndex) !== null && _allColumns$find$sour !== void 0 ? _allColumns$find$sour : 0;
  if (endCol > firstNonSticky) {
    const renderFromCol = Math.max(startCol, firstNonSticky);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= renderFromCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= endCol; x++) {
      tempW += allColumns[x].width;
    }
    contentRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  if (firstNonSticky > startCol) {
    const renderToCol = Math.min(endCol, firstNonSticky - 1);
    let tempX = cellX;
    let tempW = cellW;
    for (let x = column.sourceIndex - 1; x >= startCol; x--) {
      tempX -= allColumns[x].width;
      tempW += allColumns[x].width;
    }
    for (let x = column.sourceIndex + 1; x <= renderToCol; x++) {
      tempW += allColumns[x].width;
    }
    frozenRect = {
      x: tempX,
      y: cellY,
      width: tempW,
      height: cellH
    };
  }
  return [frozenRect, contentRect];
}
//# sourceMappingURL=data-grid-render.walk.js.map