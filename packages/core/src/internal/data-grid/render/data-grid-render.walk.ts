import { type Item, type Rectangle } from "../data-grid-types.js";
import { type MappedGridColumn, isGroupEqual, getGroupName, getGroupAtLevel, isGroupEqualAtLevel } from "./data-grid-lib.js";

export function getSkipPoint(drawRegions: readonly Rectangle[]): number | undefined {
    if (drawRegions.length === 0) return undefined;
    let drawRegionsLowestY: number | undefined;
    for (const dr of drawRegions) {
        drawRegionsLowestY = Math.min(drawRegionsLowestY ?? dr.y, dr.y);
    }
    return drawRegionsLowestY;
}

export type WalkRowsCallback = (
    drawY: number,
    row: number,
    rowHeight: number,
    isSticky: boolean,
    isTrailingRow: boolean
) => boolean | void;

export function walkRowsInCol(
    startRow: number,
    drawY: number,
    height: number,
    rows: number,
    getRowHeight: (row: number) => number,
    freezeTrailingRows: number,
    hasAppendRow: boolean,
    skipToY: number | undefined,
    cb: WalkRowsCallback
): void {
    skipToY = skipToY ?? drawY;
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

export type WalkColsCallback = (
    col: MappedGridColumn,
    drawX: number,
    drawY: number,
    clipX: number,
    startRow: number
) => boolean | void;

export function walkColumns(
    effectiveCols: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    totalHeaderHeight: number,
    cb: WalkColsCallback
): void {
    let x = 0;
    let clipX = 0; // this tracks the total width of sticky cols
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

// this should not be item, it is [startInclusive, endInclusive]
export type WalkGroupsCallback = (
    colSpan: Item,
    group: string,
    x: number,
    y: number,
    width: number,
    height: number
) => void;

export function walkGroups(
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeight: number,
    cb: WalkGroupsCallback
): void {
    let x = 0;
    let clipX = 0;
    for (let index = 0; index < effectiveCols.length; index++) {
        const startCol = effectiveCols[index];

        let end = index + 1;
        let boxWidth = startCol.width;
        if (startCol.sticky) {
            clipX += boxWidth;
        }
        while (
            end < effectiveCols.length &&
            isGroupEqual(effectiveCols[end].group, startCol.group) &&
            effectiveCols[end].sticky === effectiveCols[index].sticky
        ) {
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
        cb(
            [startCol.sourceIndex, effectiveCols[end - 1].sourceIndex],
            getGroupName(startCol.group),
            localX + delta,
            0,
            w,
            groupHeaderHeight
        );

        x += boxWidth;
    }
}

// Multi-level groups callback
export type WalkMultiLevelGroupsCallback = (
    colSpan: Item,
    group: string,
    x: number,
    y: number,
    width: number,
    height: number,
    level: number
) => void;

/**
 * Walks through multi-level group headers, calling the callback for each group span at each level.
 * @param effectiveCols The columns to walk
 * @param width Total width available
 * @param translateX Translation offset
 * @param groupHeaderHeights Array of heights for each group level
 * @param groupLevels Number of group levels
 * @param cb Callback called for each group span
 */
export function walkMultiLevelGroups(
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeights: readonly number[],
    groupLevels: number,
    cb: WalkMultiLevelGroupsCallback
): void {
    if (groupLevels === 0) return;

    // Calculate y offset for each level
    const levelYOffsets: number[] = [];
    let yOffset = 0;
    for (let level = 0; level < groupLevels; level++) {
        levelYOffsets.push(yOffset);
        yOffset += groupHeaderHeights[level] ?? 0;
    }

    // Pre-calculate x positions for all columns
    const colXPositions: number[] = [];
    let accX = 0;
    for (const col of effectiveCols) {
        colXPositions.push(accX);
        accX += col.width;
    }

    // Walk each level
    for (let level = 0; level < groupLevels; level++) {
        const levelY = levelYOffsets[level];
        const levelHeight = groupHeaderHeights[level] ?? 0;

        let clipX = 0;
        let index = 0;

        while (index < effectiveCols.length) {
            const startCol = effectiveCols[index];
            const startGroupName = getGroupAtLevel(startCol.group, level, groupLevels);

            // Skip if this column has no group at this level
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

            // Find contiguous columns with the same group at this level
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
                cb(
                    [startCol.sourceIndex, effectiveCols[end - 1].sourceIndex],
                    startGroupName,
                    localX + delta,
                    levelY,
                    w,
                    levelHeight,
                    level
                );
            }

            index = end;
        }
    }
}

export function getSpanBounds(
    span: Item,
    cellX: number,
    cellY: number,
    cellW: number,
    cellH: number,
    column: MappedGridColumn,
    allColumns: readonly MappedGridColumn[]
): [Rectangle | undefined, Rectangle | undefined] {
    const [startCol, endCol] = span;

    let frozenRect: Rectangle | undefined;
    let contentRect: Rectangle | undefined;

    const firstNonSticky = allColumns.find(x => !x.sticky)?.sourceIndex ?? 0;
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
            height: cellH,
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
            height: cellH,
        };
    }

    return [frozenRect, contentRect];
}
