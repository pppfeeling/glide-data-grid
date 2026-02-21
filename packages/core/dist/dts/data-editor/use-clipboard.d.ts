import { type GridCell, type GridSelection, type Rectangle, type GridColumn, type Item } from "../internal/data-grid/data-grid-types.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import type { DataEditorCoreState, ClipboardHandlers } from "./data-editor-state.js";
import type { Keybinds } from "./data-editor-keybindings.js";
interface UseClipboardArgs {
    readonly state: DataEditorCoreState;
    readonly keybindings: Keybinds;
    readonly getCellsForSelection: DataGridSearchProps["getCellsForSelection"] | undefined;
    readonly coercePasteValue?: (val: string, cell: GridCell) => GridCell | undefined;
    readonly onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
    readonly copyHeaders: boolean;
    readonly columnsIn: readonly GridColumn[];
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    readonly deleteRange: (range: Rectangle) => void;
    readonly safeWindow: Window | null;
}
export declare function useClipboard(args: UseClipboardArgs): ClipboardHandlers;
export {};
//# sourceMappingURL=use-clipboard.d.ts.map