import * as React from "react";
import { type GridSelection, type Rectangle, CompactSelection, type Item } from "../internal/data-grid/data-grid-types.js";
import { type GridKeyEventArgs, type CellActivatedEventArgs } from "../internal/data-grid/event-args.js";
import type { RealizedKeybinds } from "./data-editor-keybindings.js";
import type { DataEditorCoreState, KeyboardHandlers } from "./data-editor-state.js";
interface UseKeyboardHandlersArgs {
    readonly state: DataEditorCoreState;
    readonly keybindings: RealizedKeybinds;
    readonly overlayOpen: boolean;
    readonly columnSelect: "none" | "single" | "multi";
    readonly rowSelect: "none" | "single" | "multi";
    readonly rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    readonly editOnType: boolean;
    readonly trapFocus: boolean;
    readonly showTrailingBlankRow: boolean;
    readonly columnsInLength: number;
    readonly rowGroupingNavBehavior: string | undefined;
    readonly mapper: (row: number) => {
        isGroupHeader: boolean;
    };
    readonly onKeyDownIn?: (event: GridKeyEventArgs) => void;
    readonly onSelectionCleared?: () => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    readonly getCellContent: (cell: Item) => import("../internal/data-grid/data-grid-types.js").GridCell;
    readonly setSelectedColumns: (newColumns: CompactSelection | undefined, grow: number | undefined, expand: boolean) => void;
    readonly setSelectedRows: (newRows: CompactSelection | undefined, grow: number | undefined, expand: boolean) => void;
    readonly setShowSearchInner: (show: boolean) => void;
    readonly searchInputRef: React.RefObject<HTMLInputElement | null>;
    readonly adjustSelection: (direction: [0 | 1 | -1 | 2 | -2, 0 | 1 | -1 | 2 | -2]) => void;
    readonly updateSelectedCell: (col: number, row: number, fromEditingTrailingRow: boolean, freeMove: boolean) => boolean;
    readonly deleteRange: (range: Rectangle) => void;
    readonly fillDown: () => void;
    readonly fillRight: () => void;
    readonly appendRow: (col: number, openOverlay?: boolean, behavior?: ScrollBehavior) => Promise<void>;
    readonly getCustomNewRowTargetColumn: (col: number) => number | undefined;
    readonly scrollToRef: React.MutableRefObject<(col: number, row: number) => void>;
}
export declare function useKeyboardHandlers(args: UseKeyboardHandlersArgs): KeyboardHandlers;
export {};
//# sourceMappingURL=use-keyboard-handlers.d.ts.map