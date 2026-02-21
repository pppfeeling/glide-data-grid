import * as React from "react";
import { type GridSelection, type Rectangle, CompactSelection, type GridColumn, type Item, type Slice, type InnerGridCell, type CellActivationBehavior } from "../internal/data-grid/data-grid-types.js";
import { type GridMouseEventArgs, type CellActivatedEventArgs, type HeaderClickedEventArgs, type GroupHeaderClickedEventArgs, type CellClickedEventArgs, type FillPatternEventArgs } from "../internal/data-grid/event-args.js";
import type { FullTheme } from "../common/styles.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import type { DataEditorCoreState, MouseHandlers } from "./data-editor-state.js";
import type { VisibleRegion } from "./visible-region.js";
interface MouseState {
    readonly previousSelection?: GridSelection;
    readonly fillHandle?: boolean;
}
interface UseMouseHandlersArgs {
    readonly state: DataEditorCoreState;
    readonly mouseState: MouseState | undefined;
    readonly setMouseState: React.Dispatch<React.SetStateAction<MouseState | undefined>>;
    readonly fillHighlightRegion: Rectangle | undefined;
    readonly setFillHighlightRegion: React.Dispatch<React.SetStateAction<Rectangle | undefined>>;
    readonly setScrollDir: React.Dispatch<React.SetStateAction<GridMouseEventArgs["scrollEdge"] | undefined>>;
    readonly handleSelect: (args: GridMouseEventArgs) => void;
    readonly onMouseMove?: (args: GridMouseEventArgs) => void;
    readonly onCellClicked?: (cell: Item, event: CellClickedEventArgs) => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly onCellContextMenu?: (cell: Item, event: CellClickedEventArgs) => void;
    readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onColumnResize?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    readonly onFillPattern?: (event: FillPatternEventArgs) => void;
    readonly cellActivationBehavior: CellActivationBehavior;
    readonly columnSelect: "none" | "single" | "multi";
    readonly columnSelectionMode: "auto" | "multi";
    readonly columns: readonly GridColumn[];
    readonly groupLevels: number;
    readonly mergedTheme: FullTheme;
    readonly minColumnWidth: number;
    readonly maxColumnWidth: number;
    readonly themeForCell: (cell: InnerGridCell, pos: Item) => FullTheme;
    readonly getCellsForSelection: DataGridSearchProps["getCellsForSelection"] | undefined;
    readonly setSelectedColumns: (newColumns: CompactSelection | undefined, grow: Slice | number | undefined, expand: boolean) => void;
    readonly visibleRegion: VisibleRegion;
    readonly lastMouseSelectLocation: React.MutableRefObject<readonly [number, number] | undefined>;
}
export declare function useMouseHandlers(args: UseMouseHandlersArgs): MouseHandlers;
export {};
//# sourceMappingURL=use-mouse-handlers.d.ts.map