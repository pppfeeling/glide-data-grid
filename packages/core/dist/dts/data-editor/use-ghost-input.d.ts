import { type GridCell, type Item } from "../internal/data-grid/data-grid-types.js";
import type { GridKeyEventArgs, CellActivatedEventArgs } from "../internal/data-grid/event-args.js";
import type { DataEditorCoreState, GhostInputHandlers } from "./data-editor-state.js";
interface UseGhostInputArgs {
    readonly state: DataEditorCoreState;
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
    readonly onFinishEditing: (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly onKeyUpIn?: (event: GridKeyEventArgs) => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly setIsFocused: (focused: boolean) => void;
}
export declare function useGhostInput(args: UseGhostInputArgs): GhostInputHandlers;
export {};
//# sourceMappingURL=use-ghost-input.d.ts.map