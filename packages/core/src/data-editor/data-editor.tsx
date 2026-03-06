/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { createPortal } from "react-dom";
import { maybe } from "../common/support.js";
import debounce from "lodash/debounce.js";
import {
    type GridCell,
    GridCellKind,
    type Rectangle,
    type InnerGridCell,
    CompactSelection,
    isInnerOnlyCell,
    isObjectEditorCallbackResult,
    type Item,
    type EditListItem,
    isEditableGridCell,
} from "../internal/data-grid/data-grid-types.js";
import DataGridSearch from "../internal/data-grid-search/data-grid-search.js";
import {
    getDataEditorTheme,
    makeCSSStyle,
    type FullTheme,
    ThemeContext,
    mergeAndRealizeTheme,
} from "../common/styles.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import { getScrollBarWidth } from "../common/utils.js";
import {
    gridSelectionHasItem,
} from "../internal/data-grid/render/data-grid-lib.js";
import { GroupRename } from "./group-rename.js";
import { useColumnSizer } from "./use-column-sizer.js";
import { useKeyboardHandlers } from "./use-keyboard-handlers.js";
import { useCellsForSelection } from "./use-cells-for-selection.js";
import { toggleBoolean, shiftSelection } from "./data-editor-fns.js";
import { DataEditorContainer } from "../internal/data-editor-container/data-grid-container.js";
import { useAutoscroll } from "./use-autoscroll.js";
import { useClipboard } from "./use-clipboard.js";
import { useRemAdjuster } from "./use-rem-adjuster.js";
import { withAlpha } from "../internal/data-grid/color-parser.js";
import {
    type GridMouseEventArgs,
    groupHeaderKind,
    type CellActivatedEventArgs,
} from "../internal/data-grid/event-args.js";
import { useKeybindingsWithDefaults } from "./data-editor-keybindings.js";
import type { Highlight } from "../internal/data-grid/render/data-grid-render.cells.js";
import { useRowGroupingInner } from "./row-grouping.js";
import { useRowGrouping } from "./row-grouping-api.js";
import { useInitialScrollOffset } from "./use-initial-scroll-offset.js";
import type { VisibleRegion } from "./visible-region.js";
import { GhostInput, type GhostInputRef } from "../internal/ghost-input/index.js";
import { useGhostInput } from "./use-ghost-input.js";
import { useMouseHandlers } from "./use-mouse-handlers.js";
import { useOverlayEditor } from "./use-overlay-editor.js";
import { useDataEditorRef } from "./use-data-editor-ref.js";
import { useSelection, emptyGridSelection } from "./use-selection.js";
import { useMangledProps } from "./use-mangled-props.js";
import { useScrollTo } from "./use-scroll-to.js";
import { useSearch } from "./use-search.js";
import { useCellRenderer } from "./use-cell-renderer.js";
import { useAppendHandlers } from "./use-append-handlers.js";
import { useSelectionNavigation } from "./use-selection-navigation.js";
import { getRowMarkerConfig, useMangledCols, useGetMangledCellContent, useMangledOnCellsEdited } from "./use-row-markers.js";
import { useHandleSelect } from "./use-handle-select.js";
import { useFinishEditing } from "./use-finish-editing.js";
import { useVisibleRegionCallback } from "./use-visible-region.js";
import { useHoverHandler } from "./use-hover-handler.js";
import { useColumnCallbacks } from "./use-column-callbacks.js";

const DataGridOverlayEditor = React.lazy(
    async () => await import("../internal/data-grid-overlay-editor/data-grid-overlay-editor.js")
);

// There must be a better way
let idCounter = 0;

// Re-export types from data-editor-types.ts for backward compatibility
export type { RowMarkerOptions, MouseState, DataEditorProps, DataEditorRef, ScrollToFn, EmitEvents } from "./data-editor-types.js";
import type { RowMarkerOptions, MouseState, DataEditorProps, DataEditorRef, ScrollToFn, EmitEvents } from "./data-editor-types.js";



const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};


const DataEditorImpl: React.ForwardRefRenderFunction<DataEditorRef, DataEditorProps> = (p, forwardedRef) => {


    const searchInputRef = React.useRef<HTMLInputElement>(null);
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    const [renameGroup, setRenameGroup] = React.useState<{
        group: string;
        bounds: Rectangle;
    }>();
    const [mouseState, setMouseState] = React.useState<MouseState>();
    const [scrollDir, setScrollDir] = React.useState<GridMouseEventArgs["scrollEdge"]>();
    const lastSent = React.useRef<[number, number]>(undefined);

    // Ghost Input state for IME support
    const ghostInputRef = React.useRef<GhostInputRef>(null);
    // ghostInputVisible tracks whether GhostInput is visible over the overlay editor
    const [ghostInputVisible, setGhostInputVisible] = React.useState(false);
    // Ref to access ghostInputVisible without causing stale closure issues
    const ghostInputVisibleRef = React.useRef(ghostInputVisible);
    ghostInputVisibleRef.current = ghostInputVisible;


    const safeWindow = typeof window === "undefined" ? null : window;

    const {
        imageEditorOverride,
        getRowThemeOverride: getRowThemeOverrideIn,
        markdownDivCreateNode,
        width,
        height,
        columns: columnsIn,
        rows: rowsIn,
        getCellContent,
        onCellClicked,
        onCellActivated,
        onFillPattern,
        onFinishedEditing,
        coercePasteValue,
        drawHeader: drawHeaderIn,
        drawCell: drawCellIn,
        editorBloom,
        onHeaderClicked,
        onColumnProposeMove,
        rangeSelectionColumnSpanning = true,
        spanRangeBehavior = "default",
        onGroupHeaderClicked,
        onCellContextMenu,
        className,
        onHeaderContextMenu,
        getCellsForSelection: getCellsForSelectionIn,
        onGroupHeaderContextMenu,
        onGroupHeaderRenamed,
        onCellEdited,
        onCellsEdited,
        onSearchResultsChanged: onSearchResultsChangedIn,
        searchResults,
        onSearchValueChange,
        searchValue,
        onKeyDown: onKeyDownIn,
        onKeyUp: onKeyUpIn,
        keybindings: keybindingsIn,
        editOnType = true,
        onRowAppended,
        onColumnAppended,
        onColumnMoved,
        validateCell: validateCellIn,
        highlightRegions: highlightRegionsIn,
        rangeSelect = "rect",
        columnSelect = "multi",
        rowSelect = "multi",
        rangeSelectionBlending = "exclusive",
        columnSelectionBlending = "exclusive",
        rowSelectionBlending = "exclusive",
        onDelete: onDeleteIn,
        onDragStart,
        onMouseMove,
        onPaste,
        copyHeaders = false,
        freezeColumns = 0,
        cellActivationBehavior = "second-click",
        rowSelectionMode = "auto",
        columnSelectionMode = "auto",
        onHeaderMenuClick,
        onHeaderIndicatorClick,
        getGroupDetails,
        rowGrouping,
        onSearchClose: onSearchCloseIn,
        onItemHovered,
        onSelectionCleared,
        showSearch: showSearchIn,
        onVisibleRegionChanged,
        gridSelection: gridSelectionOuter,
        onGridSelectionChange,
        minColumnWidth: minColumnWidthIn = 50,
        maxColumnWidth: maxColumnWidthIn = 500,
        maxColumnAutoWidth: maxColumnAutoWidthIn,
        provideEditor,
        trailingRowOptions,
        freezeTrailingRows = 0,
        allowedFillDirections = "orthogonal",
        scrollOffsetX,
        scrollOffsetY,
        verticalBorder,
        onDragOverCell,
        onDrop,
        onColumnResize: onColumnResizeIn,
        onColumnResizeEnd: onColumnResizeEndIn,
        onColumnResizeStart: onColumnResizeStartIn,
        customRenderers: additionalRenderers,
        fillHandle,
        experimental,
        fixedShadowX,
        fixedShadowY,
        headerIcons,
        imageWindowLoader,
        initialSize,
        isDraggable,
        onDragLeave,
        onRowMoved,
        overscrollX: overscrollXIn,
        overscrollY: overscrollYIn,
        preventDiagonalScrolling,
        rightElement,
        rightElementProps,
        trapFocus = false,
        smoothScrollX,
        smoothScrollY,
        scaleToRem = false,
        rowHeight: rowHeightIn = 34,
        headerHeight: headerHeightIn = 36,
        groupHeaderHeight: groupHeaderHeightIn = headerHeightIn,
        theme: themeIn,
        isOutsideClick,
        renderers,
        resizeIndicator,
        scrollToActiveCell = true,
        drawFocusRing: drawFocusRingIn = true,
        portalElementRef,
        onRowStatus,
        onRowId,
    } = p;



    const rowMarkerConfig = getRowMarkerConfig(p, rowSelect, rowsIn);
    const {
        rowMarkers,
        showRowNumber,
        rowMarkerWidth,
        rowMarkerStartIndex,
        rowMarkerTheme,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled,
        rowMarkerCheckboxStyle,
        hasRowMarkers,
        hasRowStatus,
        rowStatusWidth,
        rowStatusTheme,
        hasRowId,
        rowIdWidth,
        rowIdTheme,
        rowMarkerOffset,
        totalMarkerWidth,
    } = rowMarkerConfig;

    const minColumnWidth = Math.max(minColumnWidthIn, 20);
    const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
    const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn ?? maxColumnWidth, minColumnWidth);

    const docStyle = React.useMemo(() => {
        if (typeof window === "undefined") return { fontSize: "16px" } as CSSStyleDeclaration;
        return window.getComputedStyle(document.documentElement);
    }, []);

    const {
        rows,
        rowNumberMapper,
        rowHeight: rowHeightPostGrouping,
        getRowThemeOverride,
    } = useRowGroupingInner(rowGrouping, rowsIn, rowHeightIn, getRowThemeOverrideIn);

    const remSize = React.useMemo(() => Number.parseFloat(docStyle.fontSize), [docStyle]);
    const { rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY } = useRemAdjuster({
        groupHeaderHeight: groupHeaderHeightIn,
        headerHeight: headerHeightIn,
        overscrollX: overscrollXIn,
        overscrollY: overscrollYIn,
        remSize,
        rowHeight: rowHeightPostGrouping,
        scaleToRem,
        theme: themeIn,
    });

    const keybindings = useKeybindingsWithDefaults(keybindingsIn);

    const showTrailingBlankRow = trailingRowOptions !== undefined;
    const lastRowSticky = trailingRowOptions?.sticky === true;

    const { showSearch, setShowSearch, onSearchClose } = useSearch({
        showSearchIn,
        onSearchCloseIn,
    });

    const abortControllerRef = React.useRef<AbortController>(new AbortController());

    React.useEffect(() => () => abortControllerRef?.current.abort(), []);

    const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(
        getCellsForSelectionIn,
        getCellContent,
        rowMarkerOffset,
        abortControllerRef.current,
        rows
    );

    const validateCell = React.useCallback<NonNullable<typeof validateCellIn>>(
        (cell, newValue, prevValue) => {
            if (validateCellIn === undefined) return true;
            const item: Item = [cell[0] - rowMarkerOffset, cell[1]];
            return validateCellIn?.(item, newValue, prevValue);
        },
        [rowMarkerOffset, validateCellIn]
    );

    const {
        gridSelection,
        setGridSelection,
        setCurrent,
        setSelectedRows,
        setSelectedColumns,
        expectedExternalGridSelection,
    } = useSelection({
        gridSelectionOuter,
        onGridSelectionChange,
        rowMarkerOffset,
        getCellsForSelection,
        spanRangeBehavior,
        abortControllerRef,
        rangeSelectionBlending,
        columnSelectionBlending,
        rowSelectionBlending,
        rangeSelect,
        rangeSelectionColumnSpanning,
    });

    const {
        onColumnResize,
        onColumnResizeEnd,
        onColumnResizeStart,
        drawHeader,
        drawCell,
    } = useMangledProps({
        onColumnResize: onColumnResizeIn,
        onColumnResizeEnd: onColumnResizeEndIn,
        onColumnResizeStart: onColumnResizeStartIn,
        drawHeader: drawHeaderIn,
        drawCell: drawCellIn,
        rowMarkerOffset,
        columnsIn,
    });

    const onDelete = React.useCallback<NonNullable<DataEditorProps["onDelete"]>>(
        sel => {
            if (onDeleteIn !== undefined) {
                const result = onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
                if (typeof result === "boolean") {
                    return result;
                }
                return shiftSelection(result, rowMarkerOffset);
            }
            return true;
        },
        [onDeleteIn, rowMarkerOffset]
    );


    const mergedTheme = React.useMemo(() => {
        return mergeAndRealizeTheme(getDataEditorTheme(), theme);
    }, [theme]);

    const [clientSize, setClientSize] = React.useState<readonly [number, number, number]>([0, 0, 0]);

    const { rendererMap, getCellRenderer } = useCellRenderer({
        renderers,
        additionalRenderers,
    });

    // eslint-disable-next-line prefer-const
    let { sizedColumns: columns, nonGrowWidth } = useColumnSizer(
        columnsIn,
        rows,
        getCellsForSeletionDirect,
        clientSize[0] - totalMarkerWidth - clientSize[2],
        minColumnWidth,
        maxColumnAutoWidth,
        mergedTheme,
        getCellRenderer,
        abortControllerRef.current
    );
    nonGrowWidth += totalMarkerWidth;

    const groupLevels = React.useMemo(() => {
        let maxLevel = 0;
        for (const col of columns) {
            if (col.group === undefined) continue;
            if (typeof col.group === "string") {
                maxLevel = Math.max(maxLevel, 1);
            } else {
                maxLevel = Math.max(maxLevel, col.group.length);
            }
        }
        return maxLevel;
    }, [columns]);

    const enableGroups = groupLevels > 0;

    const groupHeaderHeights = React.useMemo(() => {
        if (groupLevels === 0) return [];
        return Array(groupLevels).fill(groupHeaderHeight) as number[];
    }, [groupLevels, groupHeaderHeight]);

    const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);
    const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;

    const mangledCols = useMangledCols(rowMarkerConfig, columns, rows, gridSelection.rows);

    const mangledGetGroupDetails = React.useCallback<NonNullable<DataEditorProps["getGroupDetails"]>>(
        group => {
            let result = getGroupDetails?.(group) ?? { name: group };
            if (onGroupHeaderRenamed !== undefined && group !== "") {
                result = {
                    icon: result.icon,
                    name: result.name,
                    overrideTheme: result.overrideTheme,
                    actions: [
                        ...(result.actions ?? []),
                        {
                            title: "Rename",
                            icon: "renameIcon",
                            onClick: e =>
                                setRenameGroup({
                                    group: result.name,
                                    bounds: e.bounds,
                                }),
                        },
                    ],
                };
            }
            return result;
        },
        [getGroupDetails, onGroupHeaderRenamed]
    );

    const { overlay, setOverlay, setOverlaySimple } = useOverlayEditor(
        mangledCols,
        mangledGetGroupDetails,
        getRowThemeOverride,
        mergedTheme
    );

    const overlayRef = React.useRef(overlay);
    overlayRef.current = overlay;

    const drawFocusRing = drawFocusRingIn === "no-editor" ? overlay === undefined : drawFocusRingIn;

    const visibleRegionRef = React.useRef<VisibleRegion>({
        height: 1,
        width: 1,
        x: 0,
        y: 0,
    });

    const hasJustScrolled = React.useRef(false);

    const { setVisibleRegion, visibleRegion, scrollRef } = useInitialScrollOffset(
        scrollOffsetX,
        scrollOffsetY,
        rowHeight,
        visibleRegionRef,
        () => (hasJustScrolled.current = true)
    );

    visibleRegionRef.current = visibleRegion;

    const cellXOffset = visibleRegion.x + rowMarkerOffset;
    const cellYOffset = visibleRegion.y;

    const gridRef = React.useRef<DataGridRef>(null);

    const focus = React.useCallback((immediate?: boolean) => {
        // Always focus on GhostInput for IME support
        if (immediate === true) {
            ghostInputRef.current?.focus();
        } else {
            window.requestAnimationFrame(() => {
                ghostInputRef.current?.focus();
            });
        }
    }, []);

    const mangledRows = showTrailingBlankRow ? rows + 1 : rows;

    const mangledOnCellsEdited = useMangledOnCellsEdited(onCellsEdited, onCellEdited, rowMarkerOffset);

    const [fillHighlightRegion, setFillHighlightRegion] = React.useState<Rectangle | undefined>();

    // this will generally be undefined triggering the memo less often
    const highlightRange =
        gridSelection.current !== undefined &&
            gridSelection.current.range.width * gridSelection.current.range.height > 1
            ? gridSelection.current.range
            : undefined;

    const highlightFocus = drawFocusRing ? gridSelection.current?.cell : undefined;
    const highlightFocusCol = highlightFocus?.[0];
    const highlightFocusRow = highlightFocus?.[1];

    const rowsRef = React.useRef(rows);
    rowsRef.current = rows;

    const getMangledCellContent = useGetMangledCellContent({
        config: rowMarkerConfig,
        showTrailingBlankRow,
        mangledRows,
        onRowStatus,
        onRowId,
        rowNumberMapper,
        gridSelectionRows: gridSelection.rows,
        onRowMoved,
        trailingRowOptions,
        experimental,
        getCellContent,
        disabledRows: p.disabledRows,
        mangledCols,
        visibleRegionRef,
        rowsRef,
    });

    const focusCellClipLeft = React.useMemo(() => {
        if (highlightFocusCol === undefined || highlightFocusRow === undefined) return undefined;
        const cell = getMangledCellContent([highlightFocusCol, highlightFocusRow]);
        if (cell.kind === GridCellKind.Custom) {
            const renderer = getCellRenderer(cell);
            if (renderer !== undefined && "getContentLeftOffset" in renderer) {
                return (renderer as any).getContentLeftOffset(cell, mergedTheme);
            }
        }
        return undefined;
    }, [highlightFocusCol, highlightFocusRow, getMangledCellContent, getCellRenderer, mergedTheme]);

    const highlightRegions = React.useMemo(() => {
        if (
            (highlightRegionsIn === undefined || highlightRegionsIn.length === 0) &&
            (highlightRange ?? highlightFocusCol ?? highlightFocusRow ?? fillHighlightRegion) === undefined
        )
            return undefined;

        const regions: Highlight[] = [];

        if (highlightRegionsIn !== undefined) {
            for (const r of highlightRegionsIn) {
                const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
                if (maxWidth > 0) {
                    regions.push({
                        color: r.color,
                        range: {
                            ...r.range,
                            x: r.range.x + rowMarkerOffset,
                            width: Math.min(maxWidth, r.range.width),
                        },
                        style: r.style,
                    });
                }
            }
        }

        if (fillHighlightRegion !== undefined) {
            regions.push({
                color: withAlpha(mergedTheme.accentColor, 0),
                range: fillHighlightRegion,
                style: "dashed",
            });
        }

        if (highlightRange !== undefined) {
            regions.push({
                color: withAlpha(mergedTheme.accentColor, 0.5),
                range: highlightRange,
                style: "solid-outline",
            });
        }

        if (highlightFocusCol !== undefined && highlightFocusRow !== undefined) {
            regions.push({
                color: mergedTheme.accentColor,
                range: {
                    x: highlightFocusCol,
                    y: highlightFocusRow,
                    width: 1,
                    height: 1,
                },
                style: "solid-outline",
                clipLeftPx: focusCellClipLeft,
            });
        }

        return regions.length > 0 ? regions : undefined;
    }, [
        fillHighlightRegion,
        focusCellClipLeft,
        highlightRange,
        highlightFocusCol,
        highlightFocusRow,
        highlightRegionsIn,
        mangledCols.length,
        mergedTheme.accentColor,
        rowMarkerOffset,
    ]);

    const reselect = React.useCallback(
        (bounds: Rectangle, activation: CellActivatedEventArgs, initialValue?: string) => {
            if (gridSelection.current === undefined) return;

            const [col, row] = gridSelection.current.cell;
            const c = getMangledCellContent([col, row]);
            if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
                let content = c;
                if (initialValue !== undefined) {
                    switch (content.kind) {
                        case GridCellKind.Number: {
                            const d = maybe(() => (initialValue === "-" ? -0 : Number.parseFloat(initialValue)), 0);
                            content = {
                                ...content,
                                data: Number.isNaN(d) ? 0 : d,
                            };
                            break;
                        }
                        case GridCellKind.Text:
                        case GridCellKind.Markdown:
                        case GridCellKind.Uri:
                            content = {
                                ...content,
                                data: initialValue,
                            };
                            break;
                    }
                }

                setOverlaySimple({
                    target: bounds,
                    content,
                    initialValue,
                    cell: [col, row],
                    highlight: initialValue === undefined,
                    forceEditMode: initialValue !== undefined,
                    activation,
                });

                // Use GhostInput for character/IME input (not Enter key)
                // - initialValue !== undefined: character input or IME composition start
                // - initialValue === undefined: Enter key (use GrowingEntry)
                const isCustomCell = content.kind === GridCellKind.Custom;
                const useGhostMode = initialValue !== undefined && !isCustomCell;

                if (useGhostMode) {
                    // Set GhostInput position and value for IME support (direct DOM manipulation)
                    // For IME composition, initialValue is "" - don't overwrite with setValue
                    // as the composition is already in progress in GhostInput
                    ghostInputRef.current?.setPosition(bounds.x, bounds.y, bounds.width, bounds.height);
                    if (initialValue.length > 0) {
                        // Only set value for non-IME character input
                        ghostInputRef.current?.setValue(initialValue);
                    }
                    ghostInputRef.current?.setVisible(true);
                    setGhostInputVisible(true);
                } else if (isCustomCell && initialValue !== undefined) {
                    // For Custom cells, hide GhostInput completely so the custom editor
                    // receives all keyboard events (Enter, Tab, Escape, etc.)
                    // The custom editor handles input directly via its own input element
                    ghostInputRef.current?.clear();
                    ghostInputRef.current?.setVisible(false);
                    ghostInputRef.current?.blur();
                    setGhostInputVisible(false);
                }
            } else if (c.kind === GridCellKind.Boolean && activation.inputType === "keyboard" && c.readonly !== true) {
                mangledOnCellsEdited([
                    {
                        location: gridSelection.current.cell,
                        value: {
                            ...c,
                            data: toggleBoolean(c.data),
                        },
                    },
                ]);
                gridRef.current?.damage([{ cell: gridSelection.current.cell }]);
            }
        },
        [getMangledCellContent, gridSelection, mangledOnCellsEdited, setOverlaySimple]
    );

    const focusOnRowFromTrailingBlankRow = React.useCallback(
        (col: number, row: number) => {
            const bounds = gridRef.current?.getBounds(col, row);
            if (bounds === undefined || scrollRef.current === null) {
                return;
            }

            const content = getMangledCellContent([col, row]);
            if (!content.allowOverlay) {
                return;
            }

            setOverlaySimple({
                target: bounds,
                content,
                initialValue: undefined,
                highlight: true,
                cell: [col, row],
                forceEditMode: true,
                activation: { inputType: "keyboard", key: "Enter" },
            });
        },
        [getMangledCellContent, scrollRef, setOverlaySimple]
    );

    const scrollTo = useScrollTo({
        scrollRef,
        gridRef,
        canvasRef,
        rowMarkerOffset,
        freezeTrailingRows,
        totalMarkerWidth,
        totalHeaderHeight,
        freezeColumns,
        columns,
        mangledRows,
        lastRowSticky,
        rowHeight,
    });

    const scrollToRef = React.useRef(scrollTo);
    scrollToRef.current = scrollTo;

    const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
    const getCellContentRef = React.useRef(getCellContent);

    focusCallback.current = focusOnRowFromTrailingBlankRow;
    getCellContentRef.current = getCellContent;



    const colsRef = React.useRef(mangledCols.length);
    colsRef.current = mangledCols.length;

    const { appendRow, appendColumn, getCustomNewRowTargetColumn } = useAppendHandlers({
        mangledCols,
        onRowAppended,
        onColumnAppended,
        rowMarkerOffset,
        rows,
        rowsRef,
        colsRef,
        scrollToRef,
        setCurrent,
        getCellContentRef,
        focusCallback,
        columns,
        columnsIn,
        hasRowMarkers,
        trailingRowOptions,
    });

    const appendRowRef = React.useRef(appendRow);
    appendRowRef.current = appendRow;
    const appendColumnRef = React.useRef(appendColumn);
    appendColumnRef.current = appendColumn;

    const lastSelectedRowRef = React.useRef<number>(undefined);
    const lastSelectedColRef = React.useRef<number>(undefined);

    const themeForCell = React.useCallback(
        (cell: InnerGridCell, pos: Item): FullTheme => {
            const [col, row] = pos;
            return mergeAndRealizeTheme(
                mergedTheme,
                mangledCols[col]?.themeOverride,
                getRowThemeOverride?.(row),
                cell.themeOverride
            );
        },
        [getRowThemeOverride, mangledCols, mergedTheme]
    );

    const { mapper } = useRowGrouping(rowGrouping, rowsIn);

    const rowGroupingNavBehavior = rowGrouping?.navigationBehavior;

    const lastMouseSelectLocation = React.useRef<readonly [number, number]>(undefined);

    const handleSelect = useHandleSelect({
        gridSelection,
        rowSelect,
        columnSelect,
        rowSelectionMode,
        columnSelectionMode,
        hasRowMarkers,
        rowMarkerOffset,
        showTrailingBlankRow,
        showRowNumber,
        rows,
        rowMarkers,
        lastRowSticky,
        rowGroupingNavBehavior,
        headerRowMarkerDisabled,
        getMangledCellContent,
        getCellRenderer,
        themeForCell,
        focus,
        setOverlay,
        setGridSelection,
        setCurrent,
        setSelectedRows,
        setSelectedColumns,
        getCustomNewRowTargetColumn,
        appendRow,
        mapper,
        onRowMoved,
        onSelectionCleared,
        lastSelectedRowRef,
        lastSelectedColRef,
        lastMouseSelectLocation,
    });
    // Shared state object for extracted hooks
    const coreState: import("./data-editor-state.js").DataEditorCoreState = {
        gridSelection,
        overlay,
        gridRef,
        ghostInputRef,
        overlayRef,
        ghostInputVisibleRef,
        scrollRef,
        canvasRef,
        visibleRegionRef,
        abortControllerRef,
        rowMarkerOffset,
        mangledCols,
        mangledRows,
        rows,
        setGridSelection,
        getMangledCellContent,
        mangledOnCellsEdited,
        setOverlay,
        focus,
        setGhostInputVisible,
        reselect,
        getCellRenderer,
    };

    // Mouse handlers - extracted to use-mouse-handlers.ts
    const {
        onMouseDown,
        onMouseUp,
        onMouseMoveImpl,
        normalSizeColumn,
        fillDown,
        fillRight,
        mouseDownData,
        isActivelyDraggingHeader,
    } = useMouseHandlers({
        state: coreState,
        mouseState,
        setMouseState,
        fillHighlightRegion,
        setFillHighlightRegion,
        setScrollDir,
        handleSelect,
        onMouseMove,
        onCellClicked,
        onCellActivated,
        onCellContextMenu,
        onHeaderContextMenu,
        onGroupHeaderContextMenu,
        onHeaderClicked,
        onGroupHeaderClicked,
        onColumnResize,
        onFillPattern,
        cellActivationBehavior,
        columnSelect,
        columnSelectionMode,
        columns,
        groupLevels,
        mergedTheme,
        minColumnWidth,
        maxColumnWidth,
        themeForCell,
        getCellsForSelection,
        setSelectedColumns,
        visibleRegion,
        lastMouseSelectLocation,
    });


    const onHeaderMenuClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderMenuClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderMenuClick, rowMarkerOffset]
    );

    const onHeaderIndicatorClickInner = React.useCallback(
        (col: number, screenPosition: Rectangle) => {
            onHeaderIndicatorClick?.(col - rowMarkerOffset, screenPosition);
        },
        [onHeaderIndicatorClick, rowMarkerOffset]
    );

    // Add parent container scroll detection for overlay termination
    React.useEffect(() => {
        if (overlay === undefined) return;

        // Function to find all scrollable parent elements
        const findScrollableParents = (element: HTMLElement): HTMLElement[] => {
            const parents: HTMLElement[] = [];
            let currentParent = element.parentElement;

            while (currentParent && currentParent !== document.documentElement) {
                const styles = window.getComputedStyle(currentParent);
                const overflow = styles.overflow + styles.overflowY + styles.overflowX;

                if (overflow.includes('scroll') || overflow.includes('auto')) {
                    parents.push(currentParent);
                }

                currentParent = currentParent.parentElement;
            }

            return parents;
        };

        const handleParentScroll = (event: Event) => {
            const target = event.target as Element;

            // Check if this is a scroll from a parent container (not from data-editor itself)
            if (scrollRef.current && !scrollRef.current.contains(target)) {
                // Don't close if scrolling inside the overlay editor (rendered via portal)
                if (target.closest?.(".gdg-clip-region")) return;

                // Close overlay editor when parent container scrolls
                setOverlay(undefined);
            }
        };

        // Find scrollable parents and add listeners to them
        const scrollableParents: HTMLElement[] = [];
        if (scrollRef.current) {
            const parents = findScrollableParents(scrollRef.current);
            scrollableParents.push(...parents);
        }

        // Add scroll listeners to all scrollable parent containers
        scrollableParents.forEach(parent => {
            parent.addEventListener('scroll', handleParentScroll);
        });

        // Also listen to window scroll and document scroll with capture phase
        window.addEventListener('scroll', handleParentScroll);
        document.addEventListener('scroll', handleParentScroll, true);

        return () => {
            // Remove scroll listeners from all scrollable parents
            scrollableParents.forEach(parent => {
                parent.removeEventListener('scroll', handleParentScroll);
            });

            window.removeEventListener('scroll', handleParentScroll);
            document.removeEventListener('scroll', handleParentScroll, true);
        };
    }, [overlay, setOverlay, scrollRef]);

    const currentCell = gridSelection?.current?.cell;
    const onVisibleRegionChangedImpl = useVisibleRegionCallback({
        currentCell,
        overlay,
        rowMarkerOffset,
        showTrailingBlankRow,
        rows,
        freezeColumns,
        freezeTrailingRows,
        visibleRegionRef,
        hasJustScrolled,
        setOverlay,
        setVisibleRegion,
        setClientSize,
        onVisibleRegionChanged,
    });

    const {
        onColumnProposeMoveImpl,
        onColumnMovedImpl,
        onDragStartImpl,
        onDragEnd,
        isActivelyDragging,
    } = useColumnCallbacks({
        rowMarkerOffset,
        columnSelect,
        onColumnProposeMove,
        onColumnMoved,
        onDragStart,
        setSelectedColumns,
        setMouseState,
    });

    const rowGroupingSelectionBehavior = rowGrouping?.selectionBehavior;

    const { getSelectionRowLimits, adjustSelection, updateSelectedCell } = useSelectionNavigation({
        gridSelection,
        rows,
        mangledCols,
        rowMarkerOffset,
        getCellsForSelection,
        abortControllerRef,
        setCurrent,
        setGridSelection,
        scrollTo,
        currentCell,
        mangledRows,
        mapper,
        rowGroupingSelectionBehavior,
        scrollToActiveCell,
    });

    const scrollToActiveCellRef = React.useRef(scrollToActiveCell);
    scrollToActiveCellRef.current = scrollToActiveCell;

    const { onItemHoveredImpl, adjustSelectionOnScroll } = useHoverHandler({
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
        isActivelyDraggingRef: isActivelyDragging,
        isActivelyDraggingHeader,
        setCurrent,
        setSelectedRows,
        setFillHighlightRegion,
        getSelectionRowLimits,
        onItemHovered,
    });

    useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);





    const onFinishEditing = useFinishEditing({
        gridSelection,
        mangledRows,
        mangledCols,
        rowMarkerOffset,
        gridRef,
        ghostInputRef,
        overlayRef,
        focus,
        setOverlay,
        setGhostInputVisible,
        mangledOnCellsEdited,
        updateSelectedCell,
        appendRow,
        appendColumn,
        getCustomNewRowTargetColumn,
        onRowAppended,
        onColumnAppended,
        onFinishedEditing,
    });

    const overlayIDRef = React.useRef<string>(null);
    if (overlayIDRef.current === null) {
        overlayIDRef.current = `gdg-overlay-${idCounter++}`;
    }
    const overlayID = overlayIDRef.current;

    const deleteRange = React.useCallback(
        (r: Rectangle) => {
            focus();
            const editList: EditListItem[] = [];
            for (let x = r.x; x < r.x + r.width; x++) {
                for (let y = r.y; y < r.y + r.height; y++) {
                    const cellValue = getCellContent([x - rowMarkerOffset, y]);
                    if (!cellValue.allowOverlay && cellValue.kind !== GridCellKind.Boolean) continue;
                    let newVal: InnerGridCell | undefined = undefined;
                    if (cellValue.kind === GridCellKind.Custom) {
                        const toDelete = getCellRenderer(cellValue);
                        const editor = toDelete?.provideEditor?.({
                            ...cellValue,
                            location: [x - rowMarkerOffset, y],
                        });
                        if (toDelete?.onDelete !== undefined) {
                            newVal = toDelete.onDelete(cellValue);
                        } else if (isObjectEditorCallbackResult(editor)) {
                            newVal = editor?.deletedValue?.(cellValue);
                        }
                    } else if (
                        (isEditableGridCell(cellValue) && cellValue.allowOverlay) ||
                        cellValue.kind === GridCellKind.Boolean
                    ) {
                        const toDelete = getCellRenderer(cellValue);
                        newVal = toDelete?.onDelete?.(cellValue);
                    }
                    if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                        editList.push({ location: [x, y], value: newVal });
                    }
                }
            }
            mangledOnCellsEdited(editList);
            gridRef.current?.damage(editList.map(x => ({ cell: x.location })));
        },
        [focus, getCellContent, getCellRenderer, mangledOnCellsEdited, rowMarkerOffset]
    );

    const overlayOpen = overlay !== undefined;

    // Keyboard handlers - extracted to use-keyboard-handlers.ts
    const { onKeyDown } = useKeyboardHandlers({
        state: coreState,
        keybindings,
        overlayOpen,
        columnSelect,
        rowSelect,
        rangeSelect,
        editOnType,
        trapFocus,
        showTrailingBlankRow,
        columnsInLength: columnsIn.length,
        rowGroupingNavBehavior,
        mapper,
        onKeyDownIn,
        onSelectionCleared,
        onCellActivated,
        onDelete,
        getCellContent,
        setSelectedColumns,
        setSelectedRows,
        setShowSearchInner: setShowSearch,
        searchInputRef,
        adjustSelection,
        updateSelectedCell,
        deleteRange,
        fillDown,
        fillRight,
        appendRow,
        getCustomNewRowTargetColumn,
        scrollToRef,
    });

    // Focus state - declared here because useGhostInput needs setIsFocused
    const [isFocused, setIsFocused] = React.useState(false);
    const setIsFocusedDebounced = React.useRef(
        debounce((val: boolean) => {
            setIsFocused(val);
        }, 5)
    );

    // GhostInput handlers for IME support - extracted to use-ghost-input.ts
    const {
        onGhostInput,
        onGhostCompositionStart,
        onGhostCompositionEnd,
        onGhostKeyDown,
        onGhostKeyUp,
        onGhostFocus,
        onGhostBlur,
    } = useGhostInput({
        state: coreState,
        onKeyDown,
        onFinishEditing,
        onKeyUpIn,
        onCellActivated,
        setIsFocused,
    });

    const onContextMenu = React.useCallback(
        (args: GridMouseEventArgs, preventDefault: () => void) => {
            const adjustedCol = args.location[0] - rowMarkerOffset;
            if (args.kind === "header") {
                onHeaderContextMenu?.(adjustedCol, { ...args, preventDefault });
            }

            if (args.kind === groupHeaderKind) {
                if (adjustedCol < 0) {
                    return;
                }
                onGroupHeaderContextMenu?.(adjustedCol, { ...args, preventDefault });
            }

            if (args.kind === "cell") {
                const [col, row] = args.location;
                onCellContextMenu?.([adjustedCol, row], {
                    ...args,
                    preventDefault,
                });

                if (!gridSelectionHasItem(gridSelection, args.location)) {
                    updateSelectedCell(col, row, false, false);
                }
            }
        },
        [
            gridSelection,
            onCellContextMenu,
            onGroupHeaderContextMenu,
            onHeaderContextMenu,
            rowMarkerOffset,
            updateSelectedCell,
        ]
    );

    // Clipboard handlers - extracted to use-clipboard.ts
    const { onCopy, onPasteInternal } = useClipboard({
        state: coreState,
        keybindings,
        getCellsForSelection,
        coercePasteValue,
        onPaste,
        copyHeaders,
        columnsIn,
        onDelete,
        deleteRange,
        safeWindow,
    });

    const onSearchResultsChanged = React.useCallback(
        (results: readonly Item[], navIndex: number) => {
            if (onSearchResultsChangedIn !== undefined) {
                if (rowMarkerOffset !== 0) {
                    results = results.map(item => [item[0] - rowMarkerOffset, item[1]]);
                }
                onSearchResultsChangedIn(results, navIndex);
                return;
            }
            if (results.length === 0 || navIndex === -1) return;

            const [col, row] = results[navIndex];
            if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
                return;
            }
            lastSent.current = [col, row];
            updateSelectedCell(col, row, false, false);
        },
        [onSearchResultsChangedIn, rowMarkerOffset, updateSelectedCell]
    );

    // this effects purpose in life is to scroll the newly selected cell into view when and ONLY when that cell
    // is from an external gridSelection change. Also note we want the unmangled out selection because scrollTo
    // expects unmangled indexes
    const [outCol, outRow] = gridSelectionOuter?.current?.cell ?? [];
    React.useLayoutEffect(() => {
        if (
            scrollToActiveCellRef.current &&
            !hasJustScrolled.current &&
            outCol !== undefined &&
            outRow !== undefined &&
            (outCol !== expectedExternalGridSelection.current?.current?.cell[0] ||
                outRow !== expectedExternalGridSelection.current?.current?.cell[1])
        ) {
            scrollToRef.current(outCol, outRow);
        }
        hasJustScrolled.current = false; //only allow skipping a single scroll
    }, [outCol, outRow]);

    const selectionOutOfBounds =
        gridSelection.current !== undefined &&
        (gridSelection.current.cell[0] >= mangledCols.length || gridSelection.current.cell[1] >= mangledRows);
    React.useLayoutEffect(() => {
        if (selectionOutOfBounds) {
            setGridSelection(emptyGridSelection, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectionOutOfBounds, setGridSelection]);

    const disabledRows = React.useMemo(() => {
        if (showTrailingBlankRow === true && trailingRowOptions?.tint === true) {
            return CompactSelection.fromSingleSelection(mangledRows - 1);
        }
        return CompactSelection.empty();
    }, [mangledRows, showTrailingBlankRow, trailingRowOptions?.tint]);

    const mangledVerticalBorder = React.useCallback(
        (col: number) => {
            return typeof verticalBorder === "boolean"
                ? verticalBorder
                : (verticalBorder?.(col - rowMarkerOffset) ?? true);
        },
        [rowMarkerOffset, verticalBorder]
    );

    const renameGroupNode = React.useMemo(() => {
        if (renameGroup === undefined || canvasRef.current === null) return null;
        const { bounds, group } = renameGroup;
        const canvasBounds = canvasRef.current.getBoundingClientRect();
        return (
            <GroupRename
                bounds={bounds}
                group={group}
                canvasBounds={canvasBounds}
                onClose={() => setRenameGroup(undefined)}
                onFinish={newVal => {
                    setRenameGroup(undefined);
                    onGroupHeaderRenamed?.(group, newVal);
                }}
            />
        );
    }, [onGroupHeaderRenamed, renameGroup]);

    const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + rowMarkerOffset);

    useDataEditorRef(forwardedRef, {
        appendRowRef,
        appendColumnRef,
        rowMarkerOffset,
        gridRef,
        canvasRef,
        scrollRef,
        onKeyDown,
        onCopy,
        onPasteInternal,
        scrollToRef,
        normalSizeColumn,
    });

    const [selCol, selRow] = currentCell ?? [];
    const onCellFocused = React.useCallback(
        (cell: Item) => {
            const [col, row] = cell;

            if (row === -1) {
                if (columnSelect !== "none") {
                    setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, false);
                    focus();
                }
                return;
            }

            if (selCol === col && selRow === row) return;
            setCurrent(
                {
                    cell,
                    range: { x: col, y: row, width: 1, height: 1 },
                },
                true,
                false,
                "keyboard-nav"
            );
            scrollTo(col, row);
        },
        [columnSelect, focus, scrollTo, selCol, selRow, setCurrent, setSelectedColumns]
    );

    const onCanvasFocused = React.useCallback(() => {
        setIsFocusedDebounced.current(true);

        // check for mouse state, don't do anything if the user is clicked to focus.
        if (
            gridSelection.current === undefined &&
            gridSelection.columns.length === 0 &&
            gridSelection.rows.length === 0 &&
            mouseState === undefined
        ) {
            setCurrent(
                {
                    cell: [rowMarkerOffset, cellYOffset],
                    range: {
                        x: rowMarkerOffset,
                        y: cellYOffset,
                        width: 1,
                        height: 1,
                    },
                },
                true,
                false,
                "keyboard-select"
            );
        }
    }, [cellYOffset, gridSelection, mouseState, rowMarkerOffset, setCurrent]);

    const onFocusOut = React.useCallback(() => {
        setIsFocusedDebounced.current(false);
    }, []);

    const [idealWidth, idealHeight] = React.useMemo(() => {
        let h: number;
        const scrollbarWidth = experimental?.scrollbarWidthOverride ?? getScrollBarWidth();
        const rowsCountWithTrailingRow = rows + (showTrailingBlankRow ? 1 : 0);
        if (typeof rowHeight === "number") {
            h = totalHeaderHeight + rowsCountWithTrailingRow * rowHeight;
        } else {
            let avg = 0;
            const toAverage = Math.min(rowsCountWithTrailingRow, 10);
            for (let i = 0; i < toAverage; i++) {
                avg += rowHeight(i);
            }
            avg = Math.floor(avg / toAverage);

            h = totalHeaderHeight + rowsCountWithTrailingRow * avg;
        }
        h += scrollbarWidth;

        const w = mangledCols.reduce((acc, x) => x.width + acc, 0) + scrollbarWidth;

        // We need to set a reasonable cap here as some browsers will just ignore huge values
        // rather than treat them as huge values.
        return [`${Math.min(100_000, w)}px`, `${Math.min(100_000, h)}px`];
    }, [mangledCols, experimental?.scrollbarWidthOverride, rowHeight, rows, showTrailingBlankRow, totalHeaderHeight]);

    const cssStyle = React.useMemo(() => {
        return makeCSSStyle(mergedTheme);
    }, [mergedTheme]);

    return (
        <ThemeContext.Provider value={mergedTheme}>
            <DataEditorContainer
                style={cssStyle}
                className={className}
                inWidth={width ?? idealWidth}
                inHeight={height ?? idealHeight}>
                <DataGridSearch
                    fillHandle={fillHandle}
                    drawFocusRing={drawFocusRing}
                    experimental={experimental}
                    fixedShadowX={fixedShadowX}
                    fixedShadowY={fixedShadowY}
                    getRowThemeOverride={getRowThemeOverride}
                    headerIcons={headerIcons}
                    imageWindowLoader={imageWindowLoader}
                    initialSize={initialSize}
                    isDraggable={isDraggable}
                    onDragLeave={onDragLeave}
                    onRowMoved={onRowMoved}
                    overscrollX={overscrollX}
                    overscrollY={overscrollY}
                    preventDiagonalScrolling={preventDiagonalScrolling}
                    rightElement={rightElement}
                    rightElementProps={rightElementProps}
                    smoothScrollX={smoothScrollX}
                    smoothScrollY={smoothScrollY}
                    className={className}
                    enableGroups={enableGroups}
                    onCanvasFocused={onCanvasFocused}
                    onCanvasBlur={onFocusOut}
                    canvasRef={canvasRef}
                    onContextMenu={onContextMenu}
                    theme={mergedTheme}
                    cellXOffset={cellXOffset}
                    cellYOffset={cellYOffset}
                    accessibilityHeight={visibleRegion.height}
                    onDragEnd={onDragEnd}
                    columns={mangledCols}
                    nonGrowWidth={nonGrowWidth}
                    drawHeader={drawHeader}
                    onColumnProposeMove={onColumnProposeMoveImpl}
                    drawCell={drawCell}
                    disabledRows={disabledRows}
                    freezeColumns={mangledFreezeColumns}
                    lockColumns={rowMarkerOffset}
                    firstColAccessible={rowMarkerOffset === 0}
                    getCellContent={getMangledCellContent}
                    minColumnWidth={minColumnWidth}
                    maxColumnWidth={maxColumnWidth}
                    searchInputRef={searchInputRef}
                    showSearch={showSearch}
                    onSearchClose={onSearchClose}
                    highlightRegions={highlightRegions}
                    getCellsForSelection={getCellsForSelection}
                    getGroupDetails={mangledGetGroupDetails}
                    headerHeight={headerHeight}
                    isFocused={isFocused}
                    groupHeaderHeight={enableGroups ? groupHeaderHeight : 0}
                    groupLevels={groupLevels}
                    groupHeaderHeights={groupHeaderHeights}
                    freezeTrailingRows={
                        freezeTrailingRows + (showTrailingBlankRow && trailingRowOptions?.sticky === true ? 1 : 0)
                    }
                    hasAppendRow={showTrailingBlankRow}
                    onColumnResize={onColumnResize}
                    onColumnResizeEnd={onColumnResizeEnd}
                    onColumnResizeStart={onColumnResizeStart}
                    onCellFocused={onCellFocused}
                    onColumnMoved={onColumnMovedImpl}
                    onDragStart={onDragStartImpl}
                    onHeaderMenuClick={onHeaderMenuClickInner}
                    onHeaderIndicatorClick={onHeaderIndicatorClickInner}
                    onItemHovered={onItemHoveredImpl}
                    isFilling={mouseState?.fillHandle === true}
                    onMouseMove={onMouseMoveImpl}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUpIn}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onDragOverCell={onDragOverCell}
                    onDrop={onDrop}
                    onSearchResultsChanged={onSearchResultsChanged}
                    onVisibleRegionChanged={onVisibleRegionChangedImpl}
                    clientSize={clientSize}
                    rowHeight={rowHeight}
                    searchResults={searchResults}
                    searchValue={searchValue}
                    onSearchValueChange={onSearchValueChange}
                    rows={mangledRows}
                    scrollRef={scrollRef}
                    selection={gridSelection}
                    translateX={visibleRegion.tx}
                    translateY={visibleRegion.ty}
                    verticalBorder={mangledVerticalBorder}
                    gridRef={gridRef}
                    getCellRenderer={getCellRenderer}
                    resizeIndicator={resizeIndicator}
                />
                {renameGroupNode}
                {overlay !== undefined && (
                    <React.Suspense fallback={null}>
                        <DataGridOverlayEditor
                            {...overlay}
                            validateCell={validateCell}
                            bloom={editorBloom}
                            id={overlayID}
                            getCellRenderer={getCellRenderer}
                            className={experimental?.isSubGrid === true ? "click-outside-ignore" : undefined}
                            provideEditor={provideEditor}
                            imageEditorOverride={imageEditorOverride}
                            portalElementRef={portalElementRef}
                            onFinishEditing={onFinishEditing}
                            markdownDivCreateNode={markdownDivCreateNode}
                            isOutsideClick={isOutsideClick}
                            customEventTarget={experimental?.eventTarget}
                            isGhostMode={ghostInputVisible}
                        />
                    </React.Suspense>
                )}
            </DataEditorContainer>
            {(() => {
                // Render GhostInput to the same portal as overlay editor
                const portalElement = portalElementRef?.current ?? document.getElementById("portal");
                if (portalElement === null) return null;
                return createPortal(
                    <GhostInput
                        ref={ghostInputRef}
                        onInput={onGhostInput}
                        onCompositionStart={onGhostCompositionStart}
                        onCompositionEnd={onGhostCompositionEnd}
                        onKeyDown={onGhostKeyDown}
                        onKeyUp={onGhostKeyUp}
                        onFocus={onGhostFocus}
                        onBlur={onGhostBlur}
                    />,
                    portalElement
                );
            })()}
        </ThemeContext.Provider>
    );
};

/**
 * The primary component of Glide Data Grid.
 * @category DataEditor
 * @param {DataEditorProps} props
 */
export const DataEditor = React.forwardRef(DataEditorImpl);
