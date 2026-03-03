import type * as React from "react";
import type { FullTheme } from "../../common/styles.js";
import type {
    Rectangle,
    GridSelection,
    InnerGridCell,
    Item,
} from "./data-grid-types.js";
import type { GridMouseEventArgs } from "./event-args.js";
import type { SpriteManager } from "./data-grid-sprites.js";
import type { RenderStateProvider } from "../../common/render-state-provider.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import type { GroupDetailsCallback } from "./render/data-grid-render.cells.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";

/**
 * Shared state object passed to extracted hooks.
 * Groups commonly shared refs, state, and callbacks to avoid parameter explosion.
 */
export interface DataGridCoreState {
    // Canvas refs
    readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly overlayRef: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly windowEventTargetRef: React.MutableRefObject<HTMLElement | Window | Document>;

    // Hover state (orchestrator owns, pointer hook sets)
    readonly hoveredItemInfo: [Item, readonly [number, number]] | undefined;
    readonly setHoveredItemInfo: React.Dispatch<React.SetStateAction<[Item, readonly [number, number]] | undefined>>;
    readonly hoveredOnEdge: boolean | undefined;
    readonly setHoveredOnEdge: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    readonly setOverFill: React.Dispatch<React.SetStateAction<boolean>>;

    // Touch
    readonly lastWasTouchRef: React.MutableRefObject<boolean>;
    readonly setLastWasTouch: React.Dispatch<React.SetStateAction<boolean>>;

    // Geometry (from useGridGeometry)
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: PointerEvent | MouseEvent | TouchEvent
    ) => GridMouseEventArgs;
    readonly mappedColumns: readonly MappedGridColumn[];
    readonly totalHeaderHeight: number;

    // Rendering
    readonly spriteManager: SpriteManager;
    readonly renderStateProvider: RenderStateProvider;

    // Props subset (needed by multiple hooks)
    readonly rows: number;
    readonly freezeColumns: number;
    readonly selection: GridSelection;
    readonly theme: FullTheme;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly getGroupDetails: GroupDetailsCallback | undefined;
    readonly eventTargetRef: React.MutableRefObject<HTMLDivElement | null> | undefined;
    readonly firstColAccessible: boolean;
    readonly isDragging: boolean;
    readonly isResizing: boolean;
    readonly allowResize: boolean | undefined;
}
