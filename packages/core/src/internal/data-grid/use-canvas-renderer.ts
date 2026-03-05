import * as React from "react";
import type { FullTheme } from "../../common/styles.js";
import type {
    GridSelection,
    InnerGridCell,
    Item,
    DrawHeaderCallback,
    DrawCellCallback,
    FillHandle,
} from "./data-grid-types.js";
import { CompactSelection, GridCellKind } from "./data-grid-types.js";
import { CellSet } from "./cell-set.js";
import { drawGrid } from "./render/data-grid-render.js";
import type { BlitData } from "./render/data-grid-render.blit.js";
import { AnimationManager } from "./animation-manager.js";
import { RenderStateProvider } from "../../common/render-state-provider.js";
import { browserIsFirefox, browserIsSafari } from "../../common/browser-detect.js";
import { type EnqueueCallback, useAnimationQueue } from "./use-animation-queue.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import type { DrawGridArg } from "./render/draw-grid-arg.js";
import type { ImageWindowLoader } from "./image-window-loader-interface.js";
import type { GroupDetailsCallback, GetRowThemeCallback, Highlight } from "./render/data-grid-render.cells.js";
import type { SpriteManager } from "./data-grid-sprites.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";

type DamageUpdateList = readonly { cell: Item }[];

function createBufferCanvases(): [CanvasRenderingContext2D | null, CanvasRenderingContext2D | null] {
    const a = document.createElement("canvas");
    const b = document.createElement("canvas");
    a.style["display"] = "none";
    a.style["opacity"] = "0";
    a.style["position"] = "fixed";
    b.style["display"] = "none";
    b.style["opacity"] = "0";
    b.style["position"] = "fixed";
    return [a.getContext("2d", { alpha: false }), b.getContext("2d", { alpha: false })];
}

export interface CanvasRendererArgs {
    // Canvas refs
    readonly canvasRef: React.RefObject<HTMLCanvasElement | null>;
    readonly overlayRef: React.RefObject<HTMLCanvasElement | null>;

    // Layout
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly translateY: number;
    readonly mappedColumns: readonly MappedGridColumn[];
    readonly enableGroups: boolean;
    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly rows: number;

    // Header
    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly groupLevels: number;
    readonly groupHeaderHeights: readonly number[];

    // Style
    readonly theme: FullTheme;
    readonly rowHeight: number | ((index: number) => number);
    readonly verticalBorder: (col: number) => boolean;
    readonly isResizing: boolean;
    readonly resizeCol: number | undefined;
    readonly isFocused: boolean;
    readonly fillHandle: FillHandle;
    readonly drawFocusRing: boolean;
    readonly drawCellCallback: DrawCellCallback | undefined;
    readonly drawHeaderCallback: DrawHeaderCallback | undefined;
    readonly resizeIndicator: "full" | "header" | "none";

    // Data
    readonly selection: GridSelection;
    readonly disabledRows: CompactSelection | undefined;
    readonly hasAppendRow: boolean;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getGroupDetails: GroupDetailsCallback | undefined;
    readonly getRowThemeOverride: GetRowThemeCallback | undefined;
    readonly prelightCells: readonly Item[] | undefined;
    readonly highlightRegions: readonly Highlight[] | undefined;
    readonly dragAndDropState: { src: number; dest: number } | undefined;

    // Rendering
    readonly spriteManager: SpriteManager;
    readonly imageLoader: ImageWindowLoader;
    readonly getCellRenderer: GetCellRendererCallback;

    // Hover state
    readonly hoveredItemInfo: [Item, readonly [number, number]] | undefined;
    readonly hoverInfoRef: React.MutableRefObject<[Item, readonly [number, number]] | undefined>;
    readonly hoverValuesRef: React.MutableRefObject<readonly { item: Item; hoverAmount: number }[]>;
    readonly lastWasTouch: boolean;

    // Experimental
    readonly experimental: {
        readonly enableFirefoxRescaling?: boolean;
        readonly enableSafariRescaling?: boolean;
        readonly hyperWrapping?: boolean;
        readonly renderStrategy?: "single-buffer" | "double-buffer" | "direct";
        readonly disableMinimumCellWidth?: boolean;
    } | undefined;

    // Smooth scroll
    readonly smoothScrollX: boolean;
    readonly smoothScrollY: boolean;
}

export interface CanvasRendererResult {
    readonly scrolling: boolean;
    readonly damageInternal: (locations: CellSet) => void;
    readonly damage: (cells: DamageUpdateList) => void;
    readonly enqueueRef: React.MutableRefObject<EnqueueCallback>;
    readonly drawCursorOverride: React.CSSProperties["cursor"] | undefined;
    readonly setDrawCursorOverride: React.Dispatch<React.SetStateAction<React.CSSProperties["cursor"] | undefined>>;
    readonly renderStateProvider: RenderStateProvider;
    readonly lastDrawRef: React.MutableRefObject<() => void>;
    readonly lastArgsRef: React.MutableRefObject<DrawGridArg | undefined>;
}

export function useCanvasRenderer(args: CanvasRendererArgs): CanvasRendererResult {
    const {
        canvasRef,
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
        hoverValuesRef,
        lastWasTouch,
        experimental,
    } = args;

    const [scrolling, setScrolling] = React.useState<boolean>(false);
    const [drawCursorOverride, setDrawCursorOverride] = React.useState<React.CSSProperties["cursor"] | undefined>();

    const damageRegion = React.useRef<CellSet | undefined>(undefined);
    const lastBlitData = React.useRef<BlitData | undefined>(undefined);

    const enableFirefoxRescaling = (experimental?.enableFirefoxRescaling ?? false) && browserIsFirefox.value;
    const enableSafariRescaling = (experimental?.enableSafariRescaling ?? false) && browserIsSafari.value;

    const scrollingStopRef = React.useRef(-1);
    React.useLayoutEffect(() => {
        if (window.devicePixelRatio === 1 || (!enableFirefoxRescaling && !enableSafariRescaling)) return;
        if (scrollingStopRef.current !== -1) {
            setScrolling(true);
        }
        window.clearTimeout(scrollingStopRef.current);
        scrollingStopRef.current = window.setTimeout(() => {
            setScrolling(false);
            scrollingStopRef.current = -1;
        }, 200);
    }, [cellYOffset, cellXOffset, translateX, translateY, enableFirefoxRescaling, enableSafariRescaling]);

    const enqueueRef = React.useRef<EnqueueCallback>(() => {
        // do nothing
    });

    const bufferCanvasesRef = React.useRef<ReturnType<typeof createBufferCanvases> | null>(null);
    if (bufferCanvasesRef.current === null) {
        bufferCanvasesRef.current = createBufferCanvases();
    }
    const [bufferACtx, bufferBCtx] = bufferCanvasesRef.current;

    React.useLayoutEffect(() => {
        if (bufferACtx === null || bufferBCtx === null) return;
        document.documentElement.append(bufferACtx.canvas);
        document.documentElement.append(bufferBCtx.canvas);
        return () => {
            bufferACtx.canvas.remove();
            bufferBCtx.canvas.remove();
        };
    }, [bufferACtx, bufferBCtx]);

    const renderStateProviderRef = React.useRef<RenderStateProvider | null>(null);
    if (renderStateProviderRef.current === null) {
        renderStateProviderRef.current = new RenderStateProvider();
    }
    const renderStateProvider = renderStateProviderRef.current;

    const maxDPR = enableFirefoxRescaling && scrolling ? 1 : enableSafariRescaling && scrolling ? 2 : 5;
    const minimumCellWidth = experimental?.disableMinimumCellWidth === true ? 1 : 10;
    const lastArgsRef = React.useRef<DrawGridArg | undefined>(undefined);

    const canvasCtx = React.useRef<CanvasRenderingContext2D | null>(null);
    const overlayCtx = React.useRef<CanvasRenderingContext2D | null>(null);

    const draw = React.useCallback(() => {
        const canvas = canvasRef.current;
        const overlay = overlayRef.current;
        if (canvas === null || overlay === null) return;

        if (canvasCtx.current === null) {
            canvasCtx.current = canvas.getContext("2d", { alpha: false });
            canvas.width = 0;
            canvas.height = 0;
        }

        if (overlayCtx.current === null) {
            overlayCtx.current = overlay.getContext("2d", { alpha: false });
            overlay.width = 0;
            overlay.height = 0;
        }

        if (canvasCtx.current === null || overlayCtx.current === null || bufferACtx === null || bufferBCtx === null) {
            return;
        }

        let didOverride = false;
        const overrideCursor = (cursor: React.CSSProperties["cursor"]) => {
            didOverride = true;
            setDrawCursorOverride(cursor);
        };

        const last = lastArgsRef.current;
        const current = {
            headerCanvasCtx: overlayCtx.current,
            canvasCtx: canvasCtx.current,
            bufferACtx,
            bufferBCtx,
            width,
            height,
            cellXOffset,
            cellYOffset,
            translateX: Math.round(translateX),
            translateY: Math.round(translateY),
            mappedColumns,
            enableGroups,
            freezeColumns,
            dragAndDropState,
            theme,
            headerHeight,
            groupHeaderHeight,
            groupLevels,
            groupHeaderHeights,
            disabledRows: disabledRows ?? CompactSelection.empty(),
            rowHeight,
            verticalBorder,
            isResizing,
            resizeCol,
            isFocused,
            selection,
            fillHandle,
            drawCellCallback,
            hasAppendRow,
            overrideCursor,
            maxScaleFactor: maxDPR,
            freezeTrailingRows,
            rows,
            drawFocus: drawFocusRing,
            getCellContent,
            getGroupDetails: getGroupDetails ?? (name => ({ name })),
            getRowThemeOverride,
            drawHeaderCallback,
            prelightCells,
            highlightRegions,
            imageLoader,
            lastBlitData,
            damage: damageRegion.current,
            hoverValues: hoverValuesRef.current,
            hoverInfo: hoverInfoRef.current,
            spriteManager,
            scrolling,
            hyperWrapping: experimental?.hyperWrapping ?? false,
            touchMode: lastWasTouch,
            enqueue: enqueueRef.current,
            renderStateProvider,
            renderStrategy: experimental?.renderStrategy ?? (browserIsSafari.value ? "double-buffer" : "single-buffer"),
            getCellRenderer,
            minimumCellWidth,
            resizeIndicator,
        };

        if (current.damage === undefined) {
            lastArgsRef.current = current;
            drawGrid(current, last);
        } else {
            drawGrid(current, undefined);
        }

        if (!didOverride && (current.damage === undefined || current.damage.has(hoverInfoRef?.current?.[0]))) {
            setDrawCursorOverride(undefined);
        }
    }, [
        canvasRef,
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
        hoverInfoRef,
        hoverValuesRef,
        lastWasTouch,
        maxDPR,
        minimumCellWidth,
        scrolling,
        renderStateProvider,
        experimental,
        bufferACtx,
        bufferBCtx,
    ]);

    const lastDrawRef = React.useRef(draw);
    React.useLayoutEffect(() => {
        draw();
        lastDrawRef.current = draw;
    }, [draw]);

    React.useLayoutEffect(() => {
        const fn = async () => {
            if (document?.fonts?.ready === undefined) return;
            await document.fonts.ready;
            lastArgsRef.current = undefined;
            lastDrawRef.current();
        };
        void fn();
    }, []);

    const damageInternal = React.useCallback((locations: CellSet) => {
        damageRegion.current = locations;
        lastDrawRef.current();
        damageRegion.current = undefined;
    }, []);

    const enqueue = useAnimationQueue(damageInternal);

    React.useLayoutEffect(() => {
        enqueueRef.current = enqueue;
    });

    const damage = React.useCallback((cells: DamageUpdateList) => {
        damageInternal(new CellSet(cells.map(x => x.cell)));
    }, [damageInternal]);

    React.useLayoutEffect(() => {
        imageLoader.setCallback(damageInternal);
    });

    // Animation manager for hover effects
    const animManagerRef = React.useRef<AnimationManager | null>(null);
    if (animManagerRef.current === null) {
        animManagerRef.current = new AnimationManager(_values => {
            // initial callback - will be replaced in useLayoutEffect
        });
    }
    const animManager = animManagerRef.current;

    React.useLayoutEffect(() => {
        animManager.setCallback(values => {
            damageRegion.current = new CellSet(values.map(x => x.item));
            hoverValuesRef.current = values;
            lastDrawRef.current();
            damageRegion.current = undefined;
        });
    });

    const [hoveredItem] = hoveredItemInfo ?? [];
    React.useLayoutEffect(() => {
        if (hoveredItem === undefined || hoveredItem[1] < 0) {
            animManager.setHovered(hoveredItem);
            return;
        }
        const cell = getCellContent(hoveredItem as [number, number], true);
        const r = getCellRenderer(cell);
        const cellNeedsHover =
            (r === undefined && cell.kind === GridCellKind.Custom) ||
            (r?.needsHover !== undefined && (typeof r.needsHover === "boolean" ? r.needsHover : r.needsHover(cell)));
        animManager.setHovered(cellNeedsHover ? hoveredItem : undefined);
    }, [getCellContent, getCellRenderer, hoveredItem, animManager]);

    return {
        scrolling,
        damageInternal,
        damage,
        enqueueRef,
        drawCursorOverride,
        setDrawCursorOverride,
        renderStateProvider,
        lastDrawRef,
        lastArgsRef,
    };
}
