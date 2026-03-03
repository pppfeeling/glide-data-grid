import * as React from "react";
import type { FullTheme } from "../../common/styles.js";
import {
    GridCellKind,
    type Rectangle,
    type GridSelection,
    type InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    type Item,
    type DrawHeaderCallback,
    booleanCellIsEditable,
    type InnerGridColumn,
    type DrawCellCallback,
    type FillHandle,
} from "./data-grid-types.js";
import { SpriteManager, type SpriteMap } from "./data-grid-sprites.js";
import clamp from "lodash/clamp.js";
import type { CellRenderer } from "../../cells/cell-types.js";
import type { ImageWindowLoader } from "./image-window-loader-interface.js";
import {
    type GridMouseEventArgs,
    type GridKeyEventArgs,
    type GridDragEventArgs,
} from "./event-args.js";
import {
    type GroupDetailsCallback,
    type GetRowThemeCallback,
    type Highlight,
} from "./render/data-grid-render.cells.js";

// Extracted hooks
import { useGridGeometry } from "./use-grid-geometry.js";
import { useCanvasRenderer } from "./use-canvas-renderer.js";
import { useGridPointerEvents } from "./use-grid-pointer-events.js";
import { useGridDragAndDrop } from "./use-grid-drag-and-drop.js";
import { useGridFocusAndAccessibility } from "./use-grid-focus-and-accessibility.js";

export interface DataGridProps {
    readonly width: number;
    readonly height: number;

    readonly cellXOffset: number;
    readonly cellYOffset: number;

    readonly translateX: number | undefined;
    readonly translateY: number | undefined;

    readonly accessibilityHeight: number;

    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly hasAppendRow: boolean;
    readonly firstColAccessible: boolean;

    /**
     * Enables or disables the overlay shadow when scrolling horizontally
     * @group Style
     */
    readonly fixedShadowX: boolean | undefined;
    /**
     * Enables or disables the overlay shadow when scrolling vertical
     * @group Style
     */
    readonly fixedShadowY: boolean | undefined;

    readonly allowResize: boolean | undefined;
    readonly isResizing: boolean;
    readonly resizeColumn: number | undefined;
    readonly isDragging: boolean;
    readonly isFilling: boolean;
    readonly isFocused: boolean;

    readonly columns: readonly InnerGridColumn[];
    /**
     * The number of rows in the grid.
     * @group Data
     */
    readonly rows: number;

    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly enableGroups: boolean;
    readonly groupLevels: number;
    readonly groupHeaderHeights: readonly number[];
    readonly rowHeight: number | ((index: number) => number);

    readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null> | undefined;

    readonly eventTargetRef: React.MutableRefObject<HTMLDivElement | null> | undefined;

    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    /**
     * Provides additional details about groups to extend group functionality.
     * @group Data
     */
    readonly getGroupDetails: GroupDetailsCallback | undefined;
    /**
     * Provides per row theme overrides.
     * @group Style
     */
    readonly getRowThemeOverride: GetRowThemeCallback | undefined;
    /**
     * Emitted when a header menu disclosure indicator is clicked.
     * @group Events
     */
    readonly onHeaderMenuClick: ((col: number, screenPosition: Rectangle) => void) | undefined;

    /**
     * Emitted when a header indicator icon is clicked.
     * @group Events
     */
    readonly onHeaderIndicatorClick: ((col: number, screenPosition: Rectangle) => void) | undefined;

    readonly selection: GridSelection;
    readonly prelightCells: readonly Item[] | undefined;
    /**
     * Highlight regions provide hints to users about relations between cells and selections.
     * @group Selection
     */
    readonly highlightRegions: readonly Highlight[] | undefined;

    /**
     * Enabled/disables the fill handle.
     * @defaultValue false
     * @group Editing
     */
    readonly fillHandle: FillHandle | undefined;

    readonly disabledRows: CompactSelection | undefined;
    /**
     * Allows passing a custom image window loader.
     * @group Advanced
     */
    readonly imageWindowLoader: ImageWindowLoader;

    /**
     * Emitted when an item is hovered.
     * @group Events
     */
    readonly onItemHovered: (args: GridMouseEventArgs) => void;
    readonly onMouseMove: (args: GridMouseEventArgs) => void;
    readonly onMouseDown: (args: GridMouseEventArgs) => void;
    readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
    readonly onContextMenu: (args: GridMouseEventArgs, preventDefault: () => void) => void;

    readonly onCanvasFocused: () => void;
    readonly onCanvasBlur: () => void;
    readonly onCellFocused: (args: Item) => void;

    readonly onMouseMoveRaw: (event: MouseEvent) => void;

    /**
     * Emitted when the canvas receives a key down event.
     * @group Events
     */
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
    /**
     * Emitted when the canvas receives a key up event.
     * @group Events
     */
    readonly onKeyUp: ((event: GridKeyEventArgs) => void) | undefined;

    readonly verticalBorder: (col: number) => boolean;

    /**
     * Determines what can be dragged using HTML drag and drop
     * @defaultValue false
     * @group Drag and Drop
     */
    readonly isDraggable: boolean | "cell" | "header" | undefined;
    /**
     * If `isDraggable` is set, the grid becomes HTML draggable, and `onDragStart` will be called when dragging starts.
     * You can use this to build a UI where the user can drag the Grid around.
     * @group Drag and Drop
     */
    readonly onDragStart: (args: GridDragEventArgs) => void;
    readonly onDragEnd: () => void;

    /** @group Drag and Drop */
    readonly onDragOverCell: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
    /** @group Drag and Drop */
    readonly onDragLeave: (() => void) | undefined;

    /**
     * Called when a HTML Drag and Drop event is ended on the data grid.
     * @group Drag and Drop
     */
    readonly onDrop: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;

    /**
     * Overrides the rendering of a header. The grid will call this for every header it needs to render. Header
     * rendering is not as well optimized because they do not redraw as often, but very heavy drawing methods can
     * negatively impact horizontal scrolling performance.
     *
     * It is possible to return `false` after rendering just a background and the regular foreground rendering
     * will happen.
     * @group Drawing
     * @returns `false` if default header rendering should still happen, `true` to cancel rendering.
     */
    readonly drawHeader: DrawHeaderCallback | undefined;

    readonly drawCell: DrawCellCallback | undefined;

    /**
     * Controls the drawing of the focus ring.
     * @defaultValue true
     * @group Style
     */
    readonly drawFocusRing: boolean;

    readonly dragAndDropState:
        | {
              src: number;
              dest: number;
          }
        | undefined;

    /**
     * Experimental features
     * @group Advanced
     * @experimental
     */
    readonly experimental:
        | {
              readonly disableAccessibilityTree?: boolean;
              readonly disableMinimumCellWidth?: boolean;
              readonly paddingRight?: number;
              readonly paddingBottom?: number;
              readonly enableFirefoxRescaling?: boolean;
              readonly enableSafariRescaling?: boolean;
              readonly kineticScrollPerfHack?: boolean;
              readonly isSubGrid?: boolean;
              readonly strict?: boolean;
              readonly scrollbarWidthOverride?: number;
              readonly hyperWrapping?: boolean;
              readonly renderStrategy?: "single-buffer" | "double-buffer" | "direct";
              /**
               * Allows providing a custom event target for event listeners.
               * If not provided, the grid will use the window as the event target.
               */
              readonly eventTarget?: HTMLElement | Window | Document;
          }
        | undefined;

    /**
     * Additional header icons for use by `GridColumn`.
     *
     * Providing custom header icons to the data grid must be done with a somewhat non-standard mechanism to allow
     * theming and scaling. The `headerIcons` property takes a dictionary which maps icon names to functions which can
     * take a foreground and background color and returns back a string representation of an svg. The svg should contain
     * a header similar to this `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">` and
     * interpolate the fg/bg colors into the string.
     *
     * We recognize this process is not fantastic from a graphics workflow standpoint, improvements are very welcome
     * here.
     *
     * @group Style
     */
    readonly headerIcons: SpriteMap | undefined;

    /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
     * aligned.
     * @defaultValue `false`
     * @group Style
     */
    readonly smoothScrollX: boolean | undefined;
    /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
     * aligned.
     * @defaultValue `false`
     * @group Style
     */
    readonly smoothScrollY: boolean | undefined;

    readonly theme: FullTheme;

    readonly getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;

    /**
     * Controls the resize indicator behavior.
     *
     * - `full` will show the resize indicator on the full height.
     * - `header` will show the resize indicator only on the header.
     * - `none` will not show the resize indicator.
     *
     * @defaultValue "full"
     * @group Style
     */
    readonly resizeIndicator: "full" | "header" | "none" | undefined;
}

type DamageUpdateList = readonly {
    cell: Item;
}[];

export interface DataGridRef {
    focus: () => void;
    getBounds: (col?: number, row?: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
    getMouseArgsForPosition: (
        posX: number,
        posY: number,
        ev?: MouseEvent | TouchEvent
    ) => GridMouseEventArgs | undefined;
}

const DataGrid: React.ForwardRefRenderFunction<DataGridRef, DataGridProps> = (p, forwardedRef) => {
    const {
        width,
        height,
        accessibilityHeight,
        columns,
        cellXOffset: cellXOffsetReal,
        cellYOffset,
        headerHeight,
        fillHandle = false,
        groupHeaderHeight,
        groupLevels,
        groupHeaderHeights,
        rowHeight,
        rows,
        getCellContent,
        getRowThemeOverride,
        onHeaderMenuClick,
        onHeaderIndicatorClick,
        enableGroups,
        isFilling,
        onCanvasFocused,
        onCanvasBlur,
        isFocused,
        selection,
        freezeColumns,
        onContextMenu,
        freezeTrailingRows,
        fixedShadowX = true,
        fixedShadowY = true,
        drawFocusRing,
        onMouseDown,
        onMouseUp,
        onMouseMoveRaw,
        onMouseMove,
        onItemHovered,
        dragAndDropState,
        firstColAccessible,
        onKeyDown,
        onKeyUp,
        highlightRegions,
        canvasRef,
        onDragStart,
        onDragEnd,
        eventTargetRef,
        isResizing,
        resizeColumn: resizeCol,
        isDragging,
        isDraggable = false,
        allowResize,
        disabledRows,
        hasAppendRow,
        getGroupDetails,
        theme,
        prelightCells,
        headerIcons,
        verticalBorder,
        drawCell: drawCellCallback,
        drawHeader: drawHeaderCallback,
        onCellFocused,
        onDragOverCell,
        onDrop,
        onDragLeave,
        imageWindowLoader,
        smoothScrollX = false,
        smoothScrollY = false,
        experimental,
        getCellRenderer,
        resizeIndicator = "full",
    } = p;
    const translateX = p.translateX ?? 0;
    const translateY = p.translateY ?? 0;
    const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));

    const ref = React.useRef<HTMLCanvasElement | null>(null);
    const windowEventTargetRef = React.useRef<HTMLElement | Window | Document>(experimental?.eventTarget ?? window);
    const windowEventTarget = windowEventTargetRef.current;

    const imageLoader = imageWindowLoader;
    const [hoveredItemInfo, setHoveredItemInfo] = React.useState<[Item, readonly [number, number]] | undefined>();
    const [hoveredOnEdge, setHoveredOnEdge] = React.useState<boolean>();
    const overlayRef = React.useRef<HTMLCanvasElement | null>(null);

    const [lastWasTouch, setLastWasTouch] = React.useState(false);
    const lastWasTouchRef = React.useRef(lastWasTouch);
    lastWasTouchRef.current = lastWasTouch;

    const hoverValues = React.useRef<readonly { item: Item; hoverAmount: number }[]>([]);
    const hoverInfoRef = React.useRef(hoveredItemInfo);
    hoverInfoRef.current = hoveredItemInfo;

    // 1. Geometry hook
    const totalGroupHeaderHeight = enableGroups ? groupHeaderHeights.reduce((a, b) => a + b, 0) : 0;
    const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;

    const {
        mappedColumns,
        stickyX,
        getBoundsForItem,
        getMouseArgsForPosition,
    } = useGridGeometry({
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
    });

    // SpriteManager (needs lastArgsRef/lastDrawRef from renderer hook - use refs for forward reference)
    const lastDrawRefForSprite = React.useRef<() => void>(() => { /* noop */ });
    const lastArgsRefForSprite = React.useRef<any>(undefined);
    const spriteManager = React.useMemo(
        () =>
            new SpriteManager(headerIcons, () => {
                lastArgsRefForSprite.current = undefined;
                lastDrawRefForSprite.current();
            }),
        [headerIcons]
    );

    // 2. Canvas renderer hook
    const {
        damageInternal,
        damage,
        drawCursorOverride,
        setDrawCursorOverride,
        renderStateProvider,
        lastDrawRef,
        lastArgsRef,
    } = useCanvasRenderer({
        canvasRef: ref,
        overlayRef,
        width,
        height,
        cellXOffset,
        cellYOffset,
        translateX,
        translateY,
        mappedColumns,
        enableGroups,
        freezeColumns,
        freezeTrailingRows,
        rows,
        headerHeight,
        groupHeaderHeight,
        groupLevels,
        groupHeaderHeights,
        theme,
        rowHeight,
        verticalBorder,
        isResizing,
        resizeCol,
        isFocused,
        fillHandle,
        drawFocusRing,
        drawCellCallback,
        drawHeaderCallback,
        resizeIndicator,
        selection,
        disabledRows,
        hasAppendRow,
        getCellContent,
        getGroupDetails,
        getRowThemeOverride,
        prelightCells,
        highlightRegions,
        dragAndDropState,
        spriteManager,
        imageLoader,
        getCellRenderer,
        hoveredItemInfo,
        hoverInfoRef,
        hoverValues,
        lastWasTouch,
        experimental,
        smoothScrollX,
        smoothScrollY,
    });

    // Wire up sprite manager refs
    lastDrawRefForSprite.current = lastDrawRef.current;
    lastArgsRefForSprite.current = lastArgsRef.current;

    // Keep spriteManager's invalidate callback in sync
    React.useLayoutEffect(() => {
        lastDrawRefForSprite.current = lastDrawRef.current;
    });

    const [overFill, setOverFill] = React.useState(false);

    // 3. Pointer events hook
    useGridPointerEvents({
        canvasRef: ref,
        windowEventTarget,
        eventTargetRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        hoveredOnEdge,
        setHoveredItemInfo,
        setHoveredOnEdge,
        setOverFill,
        lastWasTouchRef,
        setLastWasTouch,
        setDrawCursorOverride,
        hoverInfoRef,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseMoveRaw,
        onItemHovered,
        onContextMenu,
        onHeaderMenuClick,
        onHeaderIndicatorClick,
        isDraggable,
        isDragging,
        isResizing,
        allowResize,
        firstColAccessible,
        theme,
        selection,
        rows,
        getCellContent,
        getCellRenderer,
        getGroupDetails,
        damageInternal,
    });

    // 4. Drag and drop hook
    useGridDragAndDrop({
        canvasRef: ref,
        eventTargetRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        isDraggable,
        isResizing,
        firstColAccessible,
        theme,
        getCellContent,
        getCellRenderer,
        spriteManager,
        renderStateProvider,
        imageLoader,
        drawHeaderCallback,
        onDragStart,
        onDragEnd,
        onDragOverCell,
        onDrop,
        onDragLeave,
    });

    // 5. Focus and accessibility hook
    const { accessibilityTree } = useGridFocusAndAccessibility({
        canvasRef: ref,
        canvasPropRef: canvasRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        width,
        height,
        cellXOffset,
        cellYOffset,
        translateX,
        rows,
        accessibilityHeight,
        firstColAccessible,
        selection,
        dragAndDropState,
        onKeyDown,
        onCellFocused,
        getCellContent,
        getCellRenderer,
        damage,
        disableAccessibilityTree: experimental?.disableAccessibilityTree === true,
        forwardedRef,
    });

    // Keyboard handlers (small, kept in orchestrator)
    const onKeyDownImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            let location: Item | undefined = undefined;
            if (selection.current !== undefined) {
                bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
                location = selection.current.cell;
            }

            onKeyDown?.({
                bounds,
                stopPropagation: () => event.stopPropagation(),
                preventDefault: () => event.preventDefault(),
                cancel: () => undefined,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                key: event.key,
                keyCode: event.keyCode,
                rawEvent: event,
                location,
            });
        },
        [onKeyDown, selection, getBoundsForItem]
    );

    const onKeyUpImpl = React.useCallback(
        (event: React.KeyboardEvent<HTMLCanvasElement>) => {
            const canvas = ref.current;
            if (canvas === null) return;

            let bounds: Rectangle | undefined;
            let location: Item | undefined = undefined;
            if (selection.current !== undefined) {
                bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
                location = selection.current.cell;
            }

            onKeyUp?.({
                bounds,
                stopPropagation: () => event.stopPropagation(),
                preventDefault: () => event.preventDefault(),
                cancel: () => undefined,
                ctrlKey: event.ctrlKey,
                metaKey: event.metaKey,
                shiftKey: event.shiftKey,
                altKey: event.altKey,
                key: event.key,
                keyCode: event.keyCode,
                rawEvent: event,
                location,
            });
        },
        [onKeyUp, selection, getBoundsForItem]
    );

    // Canvas ref callback
    const refImpl = React.useCallback(
        (instance: HTMLCanvasElement | null) => {
            ref.current = instance;
            if (canvasRef !== undefined) {
                canvasRef.current = instance;
            }

            if (experimental?.eventTarget) {
                windowEventTargetRef.current = experimental.eventTarget;
            } else if (instance === null) {
                windowEventTargetRef.current = window;
            } else {
                const docRoot = instance.getRootNode();

                if (docRoot === document) windowEventTargetRef.current = window;
                windowEventTargetRef.current = docRoot as any;
            }
        },
        [canvasRef, experimental?.eventTarget]
    );

    // Cursor logic
    const [hoveredItem] = hoveredItemInfo ?? [];
    const [hCol, hRow] = hoveredItem ?? [];
    const headerHovered =
        hCol !== undefined &&
        hRow === -1 &&
        hCol >= 0 &&
        hCol < mappedColumns.length &&
        mappedColumns[hCol].headerRowMarkerDisabled !== true;
    const groupHeaderHovered = hCol !== undefined && hRow === -2;
    let clickableInnerCellHovered = false;
    let editableBoolHovered = false;
    let cursorOverride: React.CSSProperties["cursor"] | undefined = drawCursorOverride;
    if (cursorOverride === undefined && hCol !== undefined && hRow !== undefined && hRow > -1 && hRow < rows) {
        const cell = getCellContent([hCol, hRow], true);
        clickableInnerCellHovered =
            cell.kind === InnerGridCellKind.NewRow ||
            (cell.kind === InnerGridCellKind.Marker && cell.markerKind !== "number");
        editableBoolHovered = cell.kind === GridCellKind.Boolean && booleanCellIsEditable(cell);
        cursorOverride = cell.cursor;
    }
    const canDrag = hoveredOnEdge ?? false;
    const cursor = isDragging
        ? "grabbing"
        : canDrag || isResizing
          ? "col-resize"
          : overFill || isFilling
            ? "crosshair"
            : cursorOverride !== undefined
              ? cursorOverride
              : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered
                ? "pointer"
                : "default";

    const style = React.useMemo(
        () => ({
            contain: "strict",
            display: "block",
            cursor,
        }),
        [cursor]
    );

    const lastSetCursor = React.useRef<typeof cursor>("default");
    const target = eventTargetRef?.current;
    if (target !== null && target !== undefined && lastSetCursor.current !== style.cursor) {
        target.style.cursor = lastSetCursor.current = style.cursor;
    }

    // Sticky shadow overlay
    const opacityX =
        freezeColumns === 0 || !fixedShadowX ? 0 : cellXOffset > freezeColumns ? 1 : clamp(-translateX / 100, 0, 1);

    const absoluteOffsetY = -cellYOffset * 32 + translateY;
    const opacityY = !fixedShadowY ? 0 : clamp(-absoluteOffsetY / 100, 0, 1);

    const stickyShadow = React.useMemo(() => {
        if (!opacityX && !opacityY) {
            return null;
        }

        const styleX: React.CSSProperties = {
            position: "absolute",
            top: 0,
            left: stickyX,
            width: width - stickyX,
            height: height,
            opacity: opacityX,
            pointerEvents: "none",
            transition: !smoothScrollX ? "opacity 0.2s" : undefined,
            boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)",
        };

        const styleY: React.CSSProperties = {
            position: "absolute",
            top: totalHeaderHeight,
            left: 0,
            width: width,
            height: height,
            opacity: opacityY,
            pointerEvents: "none",
            transition: !smoothScrollY ? "opacity 0.2s" : undefined,
            boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)",
        };

        return (
            <>
                {opacityX > 0 && <div id="shadow-x" style={styleX} />}
                {opacityY > 0 && <div id="shadow-y" style={styleY} />}
            </>
        );
    }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);

    const overlayStyle = React.useMemo<React.CSSProperties>(
        () => ({
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            pointerEvents: "none",
        }),
        []
    );

    return (
        <>
            <canvas
                data-testid="data-grid-canvas"
                tabIndex={-1}
                onKeyDown={onKeyDownImpl}
                onKeyUp={onKeyUpImpl}
                onFocus={onCanvasFocused}
                onBlur={onCanvasBlur}
                ref={refImpl}
                style={style}>
                {accessibilityTree}
            </canvas>
            <canvas ref={overlayRef} style={overlayStyle} />
            {stickyShadow}
        </>
    );
};

export default React.memo(React.forwardRef(DataGrid));
