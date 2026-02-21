import { type Item, type Rectangle } from "../data-grid-types.js";
import { type MappedGridColumn } from "./data-grid-lib.js";
export declare function getSkipPoint(drawRegions: readonly Rectangle[]): number | undefined;
export type WalkRowsCallback = (drawY: number, row: number, rowHeight: number, isSticky: boolean, isTrailingRow: boolean) => boolean | void;
export declare function walkRowsInCol(startRow: number, drawY: number, height: number, rows: number, getRowHeight: (row: number) => number, freezeTrailingRows: number, hasAppendRow: boolean, skipToY: number | undefined, cb: WalkRowsCallback): void;
export type WalkColsCallback = (col: MappedGridColumn, drawX: number, drawY: number, clipX: number, startRow: number) => boolean | void;
export declare function walkColumns(effectiveCols: readonly MappedGridColumn[], cellYOffset: number, translateX: number, translateY: number, totalHeaderHeight: number, cb: WalkColsCallback): void;
export type WalkGroupsCallback = (colSpan: Item, group: string, x: number, y: number, width: number, height: number) => void;
export declare function walkGroups(effectiveCols: readonly MappedGridColumn[], width: number, translateX: number, groupHeaderHeight: number, cb: WalkGroupsCallback): void;
export type WalkMultiLevelGroupsCallback = (colSpan: Item, group: string, x: number, y: number, width: number, height: number, level: number) => void;
/**
 * Walks through multi-level group headers, calling the callback for each group span at each level.
 * @param effectiveCols The columns to walk
 * @param width Total width available
 * @param translateX Translation offset
 * @param groupHeaderHeights Array of heights for each group level
 * @param groupLevels Number of group levels
 * @param cb Callback called for each group span
 */
export declare function walkMultiLevelGroups(effectiveCols: readonly MappedGridColumn[], width: number, translateX: number, groupHeaderHeights: readonly number[], groupLevels: number, cb: WalkMultiLevelGroupsCallback): void;
export declare function getSpanBounds(span: Item, cellX: number, cellY: number, cellW: number, cellH: number, column: MappedGridColumn, allColumns: readonly MappedGridColumn[]): [Rectangle | undefined, Rectangle | undefined];
//# sourceMappingURL=data-grid-render.walk.d.ts.map