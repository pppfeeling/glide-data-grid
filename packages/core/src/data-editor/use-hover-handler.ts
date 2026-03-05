import * as React from "react";
import clamp from "lodash/clamp.js";
import {
    type GridSelection,
    type Rectangle,
    CompactSelection,
    type Slice,
    type GridColumn,
    type FillHandleDirection,
} from "../internal/data-grid/data-grid-types.js";
import {
    type GridMouseEventArgs,
    mouseEventArgsAreEqual,
    outOfBoundsKind,
} from "../internal/data-grid/event-args.js";
import { getClosestRect } from "../common/math.js";
import type { VisibleRegion } from "./visible-region.js";
import type { MouseState } from "./data-editor-types.js";
import type { MouseHandlers } from "./data-editor-state.js";
import { type SelectionTrigger } from "../internal/data-grid/use-selection-behavior.js";

interface UseHoverHandlerArgs {
    readonly mouseState: MouseState | undefined;
    readonly gridSelection: GridSelection;
    readonly rowMarkerOffset: number;
    readonly rowSelect: "none" | "single" | "multi";
    readonly rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    readonly showTrailingBlankRow: boolean;
    readonly rows: number;
    readonly mangledCols: readonly GridColumn[];
    readonly allowedFillDirections: FillHandleDirection;
    readonly visibleRegionRef: React.MutableRefObject<VisibleRegion>;
    readonly mouseDownData: MouseHandlers["mouseDownData"];
    readonly isActivelyDraggingRef: React.RefObject<boolean>;
    readonly isActivelyDraggingHeader: React.RefObject<boolean>;

    readonly setCurrent: (
        current: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined,
        expand: boolean,
        multiKey: boolean,
        trigger: SelectionTrigger
    ) => void;
    readonly setSelectedRows: (
        newRows: CompactSelection | undefined,
        append: Slice | number | undefined,
        multiKey: boolean
    ) => void;
    readonly setFillHighlightRegion: (region: Rectangle | undefined) => void;
    readonly getSelectionRowLimits: (row: number) => readonly [number, number] | undefined;
    readonly onItemHovered: ((args: GridMouseEventArgs) => void) | undefined;
}

export interface HoverHandlerResult {
    readonly onItemHoveredImpl: (args: GridMouseEventArgs) => void;
    readonly adjustSelectionOnScroll: () => void;
    readonly hoveredRef: React.RefObject<GridMouseEventArgs | undefined>;
}

export function useHoverHandler(args: UseHoverHandlerArgs): HoverHandlerResult {
    const {
        mouseState,
        gridSelection,
        rowMarkerOffset,
        rowSelect,
        rangeSelect,
        showTrailingBlankRow,
        rows,
        mangledCols,
        allowedFillDirections,
        visibleRegionRef,
        mouseDownData,
        isActivelyDraggingRef,
        isActivelyDraggingHeader,
        setCurrent,
        setSelectedRows,
        setFillHighlightRegion,
        getSelectionRowLimits,
        onItemHovered,
    } = args;

    const hoveredRef = React.useRef<GridMouseEventArgs>(undefined);

    const onItemHoveredImpl = React.useCallback(
        (mouseArgs: GridMouseEventArgs) => {
            // make sure we still have a button down
            if (mouseEventArgsAreEqual(mouseArgs, hoveredRef.current)) return;
            hoveredRef.current = mouseArgs;
            if (mouseDownData?.current?.button !== undefined && mouseDownData.current.button >= 1) return;
            if (
                mouseArgs.buttons !== 0 &&
                mouseState !== undefined &&
                mouseDownData.current?.location[0] === 0 &&
                rowMarkerOffset === 1 &&
                rowSelect === "multi" &&
                mouseState.previousSelection &&
                !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) &&
                gridSelection.rows.hasIndex(mouseDownData.current.location[1])
            ) {
                const start = Math.min(mouseDownData.current.location[1], mouseArgs.location[1]);
                const end = Math.max(mouseDownData.current.location[1], mouseArgs.location[1]) + 1;
                setSelectedRows(CompactSelection.fromSingleSelection([start, end]), undefined, false);
            }
            // Only handle rect selection if not already processed by row selection:
            else if (
                mouseArgs.buttons !== 0 &&
                mouseState !== undefined &&
                gridSelection.current !== undefined &&
                !isActivelyDraggingRef.current &&
                !isActivelyDraggingHeader.current &&
                (rangeSelect === "rect" || rangeSelect === "multi-rect")
            ) {
                const [selectedCol, selectedRow] = gridSelection.current.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = mouseArgs.location;

                if (row < 0) {
                    row = visibleRegionRef.current.y;
                }

                if (mouseState.fillHandle === true && mouseState.previousSelection?.current !== undefined) {
                    const prevRange = mouseState.previousSelection.current.range;
                    row = Math.min(row, showTrailingBlankRow ? rows - 1 : rows);
                    const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
                    setFillHighlightRegion(rect);
                } else {
                    const startedFromLastStickyRow = showTrailingBlankRow && selectedRow === rows;
                    if (startedFromLastStickyRow) return;

                    const landedOnLastStickyRow = showTrailingBlankRow && row === rows;
                    if (landedOnLastStickyRow) {
                        if (mouseArgs.kind === outOfBoundsKind) row--;
                        else return;
                    }

                    col = Math.max(col, rowMarkerOffset);
                    const clampLimits = getSelectionRowLimits(selectedRow);
                    row = clampLimits === undefined ? row : clamp(row, clampLimits[0], clampLimits[1]);

                    const deltaX = col - selectedCol;
                    const deltaY = row - selectedRow;

                    const newRange: Rectangle = {
                        x: deltaX >= 0 ? selectedCol : col,
                        y: deltaY >= 0 ? selectedRow : row,
                        width: Math.abs(deltaX) + 1,
                        height: Math.abs(deltaY) + 1,
                    };

                    setCurrent(
                        {
                            ...gridSelection.current,
                            range: newRange,
                        },
                        true,
                        false,
                        "drag"
                    );
                }
            }

            onItemHovered?.({ ...mouseArgs, location: [mouseArgs.location[0] - rowMarkerOffset, mouseArgs.location[1]] as any });
        },
        [
            mouseState,
            rowMarkerOffset,
            rowSelect,
            gridSelection,
            rangeSelect,
            onItemHovered,
            setSelectedRows,
            showTrailingBlankRow,
            rows,
            allowedFillDirections,
            getSelectionRowLimits,
            setCurrent,
        ]
    );

    const adjustSelectionOnScroll = React.useCallback(() => {
        const hovered = hoveredRef.current;
        if (hovered === undefined) return;
        const [xDir, yDir] = hovered.scrollEdge;
        let [col, row] = hovered.location;
        const visible = visibleRegionRef.current;
        if (xDir === -1) {
            col = visible.extras?.freezeRegion?.x ?? visible.x;
        } else if (xDir === 1) {
            col = visible.x + visible.width;
        }
        if (yDir === -1) {
            row = Math.max(0, visible.y);
        } else if (yDir === 1) {
            row = Math.min(rows - 1, visible.y + visible.height);
        }
        col = clamp(col, 0, mangledCols.length - 1);
        row = clamp(row, 0, rows - 1);
        onItemHoveredImpl({
            ...hovered,
            location: [col, row] as any,
        });
    }, [mangledCols.length, onItemHoveredImpl, rows]);

    return { onItemHoveredImpl, adjustSelectionOnScroll, hoveredRef };
}
