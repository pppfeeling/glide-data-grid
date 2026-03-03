import * as React from "react";
import {
    computeBounds,
    getColumnIndexForX,
    getEffectiveColumns,
    getRowIndexForY,
    getStickyWidth,
    useMappedColumns,
    getGroupName,
    rectBottomRight,
} from "./render/data-grid-lib.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";
import {
    type Rectangle,
    type GridSelection,
    type InnerGridColumn,
    type FillHandle,
    DEFAULT_FILL_HANDLE,
} from "./data-grid-types.js";
import {
    type GridMouseEventArgs,
    OutOfBoundsRegionAxis,
    outOfBoundsKind,
    groupHeaderKind,
    headerKind,
} from "./event-args.js";
import { getScrollBarWidth } from "../../common/utils.js";
import { assert } from "../../common/support.js";

export interface GridGeometryArgs {
    readonly columns: readonly InnerGridColumn[];
    readonly freezeColumns: number;
    readonly width: number;
    readonly height: number;
    readonly groupHeaderHeight: number;
    readonly totalHeaderHeight: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly rows: number;
    readonly freezeTrailingRows: number;
    readonly rowHeight: number | ((index: number) => number);
    readonly enableGroups: boolean;
    readonly headerHeight: number;
    readonly groupLevels: number;
    readonly groupHeaderHeights: readonly number[];
    readonly fillHandle: FillHandle | undefined;
    readonly selection: GridSelection;
    readonly fixedShadowX: boolean;
    readonly dragAndDropState: { src: number; dest: number } | undefined;
}

export interface GridGeometryResult {
    readonly mappedColumns: readonly MappedGridColumn[];
    readonly totalGroupHeaderHeight: number;
    readonly totalHeaderHeight: number;
    readonly stickyX: number;
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: PointerEvent | MouseEvent | TouchEvent
    ) => GridMouseEventArgs;
}

export function useGridGeometry(args: GridGeometryArgs): GridGeometryResult {
    const {
        columns,
        freezeColumns,
        width,
        height,
        groupHeaderHeight,
        totalHeaderHeight,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        rows,
        freezeTrailingRows,
        rowHeight,
        enableGroups,
        headerHeight,
        groupLevels,
        groupHeaderHeights,
        fillHandle,
        selection,
        fixedShadowX,
        dragAndDropState,
    } = args;

    const mappedColumns = useMappedColumns(columns, freezeColumns);

    const stickyX = React.useMemo(
        () => (fixedShadowX ? getStickyWidth(mappedColumns, dragAndDropState) : 0),
        [mappedColumns, dragAndDropState, fixedShadowX]
    );

    const getBoundsForItem = React.useCallback(
        (canvas: HTMLCanvasElement, col: number, row: number): Rectangle | undefined => {
            const rect = canvas.getBoundingClientRect();

            if (col >= mappedColumns.length || row >= rows) {
                return undefined;
            }

            const scale = rect.width / width;

            const result = computeBounds(
                col,
                row,
                width,
                height,
                groupHeaderHeight,
                totalHeaderHeight,
                cellXOffset,
                cellYOffset,
                translateX,
                translateY,
                rows,
                freezeColumns,
                freezeTrailingRows,
                mappedColumns,
                rowHeight,
                groupLevels,
                groupHeaderHeights
            );

            if (scale !== 1) {
                result.x *= scale;
                result.y *= scale;
                result.width *= scale;
                result.height *= scale;
            }

            result.x += rect.x;
            result.y += rect.y;

            return result;
        },
        [
            width,
            height,
            groupHeaderHeight,
            totalHeaderHeight,
            cellXOffset,
            cellYOffset,
            translateX,
            translateY,
            rows,
            freezeColumns,
            freezeTrailingRows,
            mappedColumns,
            rowHeight,
            groupLevels,
            groupHeaderHeights,
        ]
    );

    const getMouseArgsForPosition = React.useCallback(
        (
            canvas: HTMLCanvasElement,
            posX: number,
            posY: number,
            ev?: PointerEvent | MouseEvent | TouchEvent
        ): GridMouseEventArgs => {
            const rect = canvas.getBoundingClientRect();
            const scale = rect.width / width;
            const x = (posX - rect.left) / scale;
            const y = (posY - rect.top) / scale;
            const edgeDetectionBuffer = 5;

            const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, undefined, translateX);

            let button = 0;
            let buttons = 0;

            const isMouse =
                (typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "mouse") ||
                (typeof MouseEvent !== "undefined" && ev instanceof MouseEvent);

            const isTouch =
                (typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "touch") ||
                (typeof TouchEvent !== "undefined" && ev instanceof TouchEvent);

            if (isMouse) {
                button = ev.button;
                buttons = ev.buttons;
            }

            const col = getColumnIndexForX(x, effectiveCols, translateX);

            const row = getRowIndexForY(
                y,
                height,
                enableGroups,
                headerHeight,
                groupHeaderHeight,
                rows,
                rowHeight,
                cellYOffset,
                translateY,
                freezeTrailingRows,
                groupLevels,
                groupHeaderHeights
            );

            const shiftKey = ev?.shiftKey === true;
            const ctrlKey = ev?.ctrlKey === true;
            const metaKey = ev?.metaKey === true;

            const scrollEdge: GridMouseEventArgs["scrollEdge"] = [
                x < 0 ? -1 : width < x ? 1 : 0,
                y < totalHeaderHeight ? -1 : height < y ? 1 : 0,
            ];

            let result: GridMouseEventArgs;
            if (col === -1 || y < 0 || x < 0 || row === undefined || x > width || y > height) {
                const horizontal = x > width ? 1 : x < 0 ? -1 : 0;
                const vertical = y > height ? 1 : y < 0 ? -1 : 0;

                let innerHorizontal: OutOfBoundsRegionAxis = horizontal * 2;
                let innerVertical: OutOfBoundsRegionAxis = vertical * 2;
                if (horizontal === 0)
                    innerHorizontal = col === -1 ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
                if (vertical === 0)
                    innerVertical = row === undefined ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;

                let isEdge = false;
                if (col === -1 && row === -1) {
                    const b = getBoundsForItem(canvas, mappedColumns.length - 1, -1);
                    assert(b !== undefined);
                    isEdge = posX < b.x + b.width + edgeDetectionBuffer;
                }

                const isMaybeScrollbar =
                    (x > width && x < width + getScrollBarWidth()) || (y > height && y < height + getScrollBarWidth());

                result = {
                    kind: outOfBoundsKind,
                    location: [col !== -1 ? col : x < 0 ? 0 : mappedColumns.length - 1, row ?? rows - 1],
                    region: [innerHorizontal, innerVertical],
                    shiftKey,
                    ctrlKey,
                    metaKey,
                    isEdge,
                    isTouch,
                    button,
                    buttons,
                    scrollEdge,
                    isMaybeScrollbar,
                };
            } else if (row <= -1) {
                let bounds = getBoundsForItem(canvas, col, row);
                assert(bounds !== undefined);
                let isEdge = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;

                const isGroupHeader = enableGroups && row <= -2;
                const groupLevel = isGroupHeader ? -(row + 2) : undefined;

                const previousCol = col - 1;
                if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
                    isEdge = true;
                    bounds = getBoundsForItem(canvas, previousCol, row);
                    assert(bounds !== undefined);
                    result = {
                        kind: isGroupHeader ? groupHeaderKind : headerKind,
                        location: [previousCol, row] as any,
                        bounds: bounds,
                        group: getGroupName(mappedColumns[previousCol].group, groupLevel),
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
                        button,
                        buttons,
                        scrollEdge,
                    };
                } else {
                    result = {
                        kind: isGroupHeader ? groupHeaderKind : headerKind,
                        group: getGroupName(mappedColumns[col].group, groupLevel),
                        location: [col, row] as any,
                        bounds: bounds,
                        isEdge,
                        shiftKey,
                        ctrlKey,
                        metaKey,
                        isTouch,
                        localEventX: posX - bounds.x,
                        localEventY: posY - bounds.y,
                        button,
                        buttons,
                        scrollEdge,
                    };
                }
            } else {
                const bounds = getBoundsForItem(canvas, col, row);
                assert(bounds !== undefined);
                const isEdge = bounds !== undefined && bounds.x + bounds.width - posX < edgeDetectionBuffer;

                let isFillHandle = false;
                const drawFill = fillHandle !== false && fillHandle !== undefined;
                if (drawFill && selection.current !== undefined) {
                    const fill =
                        typeof fillHandle === "object"
                            ? { ...DEFAULT_FILL_HANDLE, ...fillHandle }
                            : DEFAULT_FILL_HANDLE;

                    const fillHandleClickSize = fill.size;
                    const half = fillHandleClickSize / 2;

                    const fillHandleLocation = rectBottomRight(selection.current.range);
                    const fillBounds = getBoundsForItem(canvas, fillHandleLocation[0], fillHandleLocation[1]);

                    if (fillBounds !== undefined) {
                        const centerX = fillBounds.x + fillBounds.width + fill.offsetX - half + 0.5;
                        const centerY = fillBounds.y + fillBounds.height + fill.offsetY - half + 0.5;

                        isFillHandle =
                            Math.abs(centerX - posX) < fillHandleClickSize &&
                            Math.abs(centerY - posY) < fillHandleClickSize;
                    }
                }

                result = {
                    kind: "cell",
                    location: [col, row],
                    bounds: bounds,
                    isEdge,
                    shiftKey,
                    ctrlKey,
                    isFillHandle,
                    metaKey,
                    isTouch,
                    localEventX: posX - bounds.x,
                    localEventY: posY - bounds.y,
                    button,
                    buttons,
                    scrollEdge,
                };
            }
            return result;
        },
        [
            width,
            mappedColumns,
            cellXOffset,
            translateX,
            height,
            enableGroups,
            headerHeight,
            groupHeaderHeight,
            rows,
            rowHeight,
            cellYOffset,
            translateY,
            freezeTrailingRows,
            getBoundsForItem,
            fillHandle,
            selection,
            totalHeaderHeight,
            groupLevels,
            groupHeaderHeights,
        ]
    );

    const totalGroupHeaderHeight = enableGroups ? groupHeaderHeights.reduce((a, b) => a + b, 0) : 0;

    return {
        mappedColumns,
        totalGroupHeaderHeight,
        totalHeaderHeight,
        stickyX,
        getBoundsForItem,
        getMouseArgsForPosition,
    };
}
