import type * as React from "react";
import type {
    GridCell,
    GridSelection,
    InnerGridCell,
    Rectangle,
    GridColumn,
    Item,
    EditListItem,
} from "../internal/data-grid/data-grid-types.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import type { GhostInputRef } from "../internal/ghost-input/index.js";
import type { FullTheme } from "../common/styles.js";
import type { VisibleRegion } from "./visible-region.js";
import type {
    GridKeyEventArgs,
    GridMouseEventArgs,
    CellActivatedEventArgs,
} from "../internal/data-grid/event-args.js";
import type { GetCellRendererCallback } from "../cells/cell-types.js";

export interface OverlayState {
    target: Rectangle;
    content: GridCell;
    theme: FullTheme;
    initialValue: string | undefined;
    cell: Item;
    highlight: boolean;
    forceEditMode: boolean;
    activation: CellActivatedEventArgs;
}

/**
 * Shared state object passed to extracted hooks to avoid parameter explosion.
 * Groups commonly shared refs, state, and callbacks.
 */
export interface DataEditorCoreState {
    // Core state
    readonly gridSelection: GridSelection;
    readonly overlay: OverlayState | undefined;

    // Refs
    readonly gridRef: React.RefObject<DataGridRef | null>;
    readonly ghostInputRef: React.RefObject<GhostInputRef | null>;
    readonly overlayRef: React.MutableRefObject<OverlayState | undefined>;
    readonly ghostInputVisibleRef: React.MutableRefObject<boolean>;
    readonly scrollRef: React.RefObject<HTMLDivElement | null>;
    readonly canvasRef: React.RefObject<HTMLCanvasElement | null>;
    readonly visibleRegionRef: React.MutableRefObject<VisibleRegion>;
    readonly abortControllerRef: React.MutableRefObject<AbortController>;

    // Coordinate conversion
    readonly rowMarkerOffset: number;
    readonly mangledCols: readonly GridColumn[];
    readonly mangledRows: number;
    readonly rows: number;

    // Core callbacks
    readonly setGridSelection: (newVal: GridSelection, expand: boolean) => void;
    readonly getMangledCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly mangledOnCellsEdited: (items: readonly EditListItem[]) => boolean | void;
    readonly setOverlay: (overlay: OverlayState | undefined) => void;
    readonly focus: (immediate?: boolean) => void;
    readonly setGhostInputVisible: (visible: boolean) => void;
    readonly reselect: (bounds: Rectangle, activation: CellActivatedEventArgs, initialValue?: string) => void;
    readonly getCellRenderer: GetCellRendererCallback;
}

export interface GhostInputHandlers {
    readonly onGhostInput: (value: string, composing: boolean) => void;
    readonly onGhostCompositionStart: () => void;
    readonly onGhostCompositionEnd: (finalValue: string) => void;
    readonly onGhostKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onGhostKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    readonly onGhostFocus: () => void;
    readonly onGhostBlur: () => void;
}

export interface ClipboardHandlers {
    readonly onCopy: (e?: ClipboardEvent, ignoreFocus?: boolean) => Promise<void>;
    readonly onCut: (e?: ClipboardEvent) => Promise<void>;
    readonly onPasteInternal: (e?: ClipboardEvent) => Promise<void>;
}

export interface KeyboardHandlers {
    readonly handleFixedKeybindings: (event: GridKeyEventArgs) => boolean;
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
}

export interface MouseHandlers {
    readonly onMouseDown: (args: GridMouseEventArgs) => void;
    readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
    readonly onMouseMoveImpl: (args: GridMouseEventArgs) => void;
    readonly handleGroupHeaderSelection: (args: GridMouseEventArgs) => void;
    readonly normalSizeColumn: (col: number) => Promise<void>;
    readonly fillDown: () => void;
    readonly fillRight: () => void;
    readonly mouseDownData: React.MutableRefObject<{
        readonly time: number;
        readonly button: number;
        readonly location: Item;
    } | undefined>;
    readonly isActivelyDraggingHeader: React.MutableRefObject<boolean>;
}
