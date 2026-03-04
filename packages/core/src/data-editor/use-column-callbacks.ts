import * as React from "react";
import { CompactSelection, type Slice } from "../internal/data-grid/data-grid-types.js";
import { whenDefined } from "../common/utils.js";
import type { GridDragEventArgs } from "../internal/data-grid/event-args.js";
import type { MouseState } from "./data-editor-types.js";

interface UseColumnCallbacksArgs {
    readonly rowMarkerOffset: number;
    readonly columnSelect: "none" | "single" | "multi";
    readonly onColumnProposeMove: ((startIndex: number, endIndex: number) => boolean) | undefined;
    readonly onColumnMoved: ((startIndex: number, endIndex: number) => void) | undefined;
    readonly onDragStart: ((args: GridDragEventArgs) => void) | undefined;
    readonly setSelectedColumns: (
        newCols: CompactSelection | undefined,
        append: Slice | number | undefined,
        multiKey: boolean
    ) => void;
    readonly setMouseState: (state: MouseState | undefined) => void;
}

export interface ColumnCallbacksResult {
    readonly onColumnProposeMoveImpl: ((startIndex: number, endIndex: number) => boolean) | undefined;
    readonly onColumnMovedImpl: ((startIndex: number, endIndex: number) => void) | undefined;
    readonly onDragStartImpl: (args: GridDragEventArgs) => void;
    readonly onDragEnd: () => void;
    readonly isActivelyDragging: React.RefObject<boolean>;
}

export function useColumnCallbacks(args: UseColumnCallbacksArgs): ColumnCallbacksResult {
    const {
        rowMarkerOffset,
        columnSelect,
        onColumnProposeMove,
        onColumnMoved,
        onDragStart,
        setSelectedColumns,
        setMouseState,
    } = args;

    const onColumnProposeMoveImpl = whenDefined(
        onColumnProposeMove,
        React.useCallback(
            (startIndex: number, endIndex: number) => {
                return onColumnProposeMove?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset) !== false;
            },
            [onColumnProposeMove, rowMarkerOffset]
        )
    );

    const onColumnMovedImpl = whenDefined(
        onColumnMoved,
        React.useCallback(
            (startIndex: number, endIndex: number) => {
                onColumnMoved?.(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
                if (columnSelect !== "none") {
                    setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), undefined, true);
                }
            },
            [columnSelect, onColumnMoved, rowMarkerOffset, setSelectedColumns]
        )
    );

    const isActivelyDragging = React.useRef(false);
    const onDragStartImpl = React.useCallback(
        (args: GridDragEventArgs) => {
            if (args.location[0] === 0 && rowMarkerOffset > 0) {
                args.preventDefault();
                return;
            }
            onDragStart?.({
                ...args,
                location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
            });

            if (!args.defaultPrevented()) {
                isActivelyDragging.current = true;
            }
            setMouseState(undefined);
        },
        [onDragStart, rowMarkerOffset]
    );

    const onDragEnd = React.useCallback(() => {
        isActivelyDragging.current = false;
    }, []);

    return {
        onColumnProposeMoveImpl,
        onColumnMovedImpl,
        onDragStartImpl,
        onDragEnd,
        isActivelyDragging,
    };
}
