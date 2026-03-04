/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { createPortal } from "react-dom";
import { assert, assertNever, maybe } from "../common/support.js";
import clamp from "lodash/clamp.js";
import uniq from "lodash/uniq.js";
import flatten from "lodash/flatten.js";
import range from "lodash/range.js";
import debounce from "lodash/debounce.js";
import {
    type EditableGridCell,
    type GridCell,
    GridCellKind,
    type GridSelection,
    isEditableGridCell,
    type Rectangle,
    isReadWriteCell,
    type InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    type Slice,
    isInnerOnlyCell,
    type GridColumn,
    isObjectEditorCallbackResult,
    type Item,
    type MarkerCell,
    type EditListItem,
} from "../internal/data-grid/data-grid-types.js";
import DataGridSearch, { type DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { browserIsOSX } from "../common/browser-detect.js";
import {
    getDataEditorTheme,
    makeCSSStyle,
    type FullTheme,
    type Theme,
    ThemeContext,
    mergeAndRealizeTheme,
} from "../common/styles.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import { getScrollBarWidth, whenDefined } from "../common/utils.js";
import {
    gridSelectionHasItem,
    getFreezeTrailingHeight,
} from "../internal/data-grid/render/data-grid-lib.js";
import { GroupRename } from "./group-rename.js";
import { useColumnSizer } from "./use-column-sizer.js";
import { useKeyboardHandlers } from "./use-keyboard-handlers.js";
import { useSelectionBehavior } from "../internal/data-grid/use-selection-behavior.js";
import { useCellsForSelection } from "./use-cells-for-selection.js";
import { expandSelection, toggleBoolean, shiftSelection } from "./data-editor-fns.js";
import { DataEditorContainer } from "../internal/data-editor-container/data-grid-container.js";
import { useAutoscroll } from "./use-autoscroll.js";
import type { CustomRenderer, CellRenderer, InternalCellRenderer } from "../cells/cell-types.js";
import { useClipboard } from "./use-clipboard.js";
import { useRemAdjuster } from "./use-rem-adjuster.js";
import { withAlpha } from "../internal/data-grid/color-parser.js";
import { getClosestRect, pointInRect } from "../common/math.js";
import {
    type HeaderClickedEventArgs,
    type GroupHeaderClickedEventArgs,
    type CellClickedEventArgs,
    type FillPatternEventArgs,
    type GridMouseEventArgs,
    groupHeaderKind,
    outOfBoundsKind,
    type GridDragEventArgs,
    mouseEventArgsAreEqual,
    type CellActivatedEventArgs,
} from "../internal/data-grid/event-args.js";
import { type Keybinds, useKeybindingsWithDefaults } from "./data-editor-keybindings.js";
import type { Highlight } from "../internal/data-grid/render/data-grid-render.cells.js";
import { useRowGroupingInner, type RowGroupingOptions } from "./row-grouping.js";
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


    const searchInputRef = React.useRef<HTMLInputElement | null>(null);
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

    const gridRef = React.useRef<DataGridRef | null>(null);

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
            });
        }

        return regions.length > 0 ? regions : undefined;
    }, [
        fillHighlightRegion,
        highlightRange,
        highlightFocusCol,
        highlightFocusRow,
        highlightRegionsIn,
        mangledCols.length,
        mergedTheme.accentColor,
        rowMarkerOffset,
    ]);

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

    const handleSelect = React.useCallback(
        (args: GridMouseEventArgs) => {
            const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
            const isMultiRow = isMultiKey && rowSelect === "multi";

            const [col, row] = args.location;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;
            const [cellCol, cellRow] = gridSelection.current?.cell ?? [];
            // eslint-disable-next-line unicorn/prefer-switch
            if (args.kind === "cell") {
                lastSelectedColRef.current = undefined;

                lastMouseSelectLocation.current = [col, row];

                // Determine which column is the checkbox column based on new order: rowNumber, checkbox, rowStatus
                const checkboxColIndex = showRowNumber ? 1 : 0;
                const isCheckboxCol = col === checkboxColIndex;

                if (isCheckboxCol && hasRowMarkers) {
                    if (
                        (showTrailingBlankRow === true && row === rows) ||
                        rowMarkers === "number" ||
                        rowSelect === "none"
                    )
                        return;

                    const markerCell = getMangledCellContent(args.location);
                    if (markerCell.kind !== InnerGridCellKind.Marker) {
                        return;
                    }
                    if (markerCell.disabled === true) return;

                    if (onRowMoved !== undefined) {
                        const renderer = getCellRenderer(markerCell);
                        assert(renderer?.kind === InnerGridCellKind.Marker);
                        const postClick = renderer?.onClick?.({
                            ...args,
                            cell: markerCell,
                            posX: args.localEventX,
                            posY: args.localEventY,
                            bounds: args.bounds,
                            theme: themeForCell(markerCell, args.location),
                            preventDefault: () => undefined,
                        }) as MarkerCell | undefined;
                        if (postClick === undefined || postClick.checked === markerCell.checked) return;
                    }

                    setOverlay(undefined);
                    focus();
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (
                        rowSelect === "multi" &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastHighlighted !== undefined &&
                        selectedRows.hasIndex(lastHighlighted)
                    ) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiRow || rowSelectionMode === "multi") {
                            setSelectedRows(undefined, newSlice, true);
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiRow);
                        }
                    } else if (rowSelect === "multi" && (isMultiRow || args.isTouch || rowSelectionMode === "multi")) {
                        if (isSelected) {
                            setSelectedRows(selectedRows.remove(row), undefined, true);
                        } else {
                            setSelectedRows(undefined, row, true);
                            lastSelectedRowRef.current = row;
                        }
                    } else if (isSelected && selectedRows.length === 1) {
                        setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                    } else {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, isMultiKey);
                        lastSelectedRowRef.current = row;
                    }
                } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col);
                } else {
                    if (cellCol !== col || cellRow !== row) {
                        const cell = getMangledCellContent(args.location);
                        const renderer = getCellRenderer(cell);

                        if (renderer?.onSelect !== undefined) {
                            let prevented = false;
                            renderer.onSelect({
                                ...args,
                                cell,
                                posX: args.localEventX,
                                posY: args.localEventY,
                                bounds: args.bounds,
                                preventDefault: () => (prevented = true),
                                theme: themeForCell(cell, args.location),
                            });
                            if (prevented) {
                                return;
                            }
                        }

                        if (rowGroupingNavBehavior === "block" && mapper(row).isGroupHeader) {
                            return;
                        }

                        const isLastStickyRow = lastRowSticky && row === rows;

                        const startedFromLastSticky =
                            lastRowSticky && gridSelection !== undefined && gridSelection.current?.cell[1] === rows;

                        if (
                            (args.shiftKey || args.isLongTouch === true) &&
                            cellCol !== undefined &&
                            cellRow !== undefined &&
                            gridSelection.current !== undefined &&
                            !startedFromLastSticky
                        ) {
                            if (isLastStickyRow) {
                                // If we're making a selection and shift click in to the last sticky row,
                                // just drop the event. Don't kill the selection.
                                return;
                            }

                            const left = Math.min(col, cellCol);
                            const right = Math.max(col, cellCol);
                            const top = Math.min(row, cellRow);
                            const bottom = Math.max(row, cellRow);
                            setCurrent(
                                {
                                    ...gridSelection.current,
                                    range: {
                                        x: left,
                                        y: top,
                                        width: right - left + 1,
                                        height: bottom - top + 1,
                                    },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            focus();
                        } else {
                            // Keep row selection when clicking on other cells
                            const hasRowSelection = gridSelection.rows.length > 0;
                            setCurrent(
                                {
                                    cell: [col, row],
                                    range: { x: col, y: row, width: 1, height: 1 },
                                },
                                true,
                                isMultiKey || hasRowSelection,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (args.kind === "header") {
                lastMouseSelectLocation.current = [col, row];
                setOverlay(undefined);
                const headerCheckboxColIndex = showRowNumber ? 1 : 0;
                if (hasRowMarkers && col === headerCheckboxColIndex) {
                    lastSelectedRowRef.current = undefined;
                    lastSelectedColRef.current = undefined;
                    if (!headerRowMarkerDisabled && rowSelect === "multi") {
                        if (selectedRows.length !== rows) {
                            setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), undefined, isMultiKey);
                        } else {
                            setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                        }
                        focus();
                    }
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (
                        columnSelect === "multi" &&
                        (args.shiftKey || args.isLongTouch === true) &&
                        lastCol !== undefined &&
                        selectedColumns.hasIndex(lastCol)
                    ) {
                        // Support for selecting a slice of columns:
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiKey || args.isTouch || columnSelectionMode === "multi") {
                            setSelectedColumns(undefined, newSlice, isMultiKey);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiKey);
                        }
                    } else if (
                        columnSelect === "multi" &&
                        (isMultiKey || args.isTouch || columnSelectionMode === "multi")
                    ) {
                        // Support for selecting a single columns additively:
                        if (selectedColumns.hasIndex(col)) {
                            // If the column is already selected, deselect that column:
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
                        } else {
                            setSelectedColumns(undefined, col, isMultiKey);
                        }
                        lastSelectedColRef.current = col;
                    } else if (columnSelect !== "none") {
                        if (selectedColumns.hasIndex(col)) {
                            // If the column is already selected, deselect that column:
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, isMultiKey);
                        }
                        lastSelectedColRef.current = col;
                    }
                    lastSelectedRowRef.current = undefined;
                    focus();
                }
            } else if (args.kind === groupHeaderKind) {
                lastMouseSelectLocation.current = [col, row];
            } else if (args.kind === outOfBoundsKind && !args.isMaybeScrollbar) {
                setGridSelection(emptyGridSelection, false);
                setOverlay(undefined);
                focus();
                onSelectionCleared?.();
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            }
        },
        [
            rowSelect,
            columnSelect,
            gridSelection,
            hasRowMarkers,
            rowMarkerOffset,
            showTrailingBlankRow,
            showRowNumber,
            rows,
            rowMarkers,
            getMangledCellContent,
            onRowMoved,
            focus,
            rowSelectionMode,
            columnSelectionMode,
            getCellRenderer,
            themeForCell,
            setSelectedRows,
            getCustomNewRowTargetColumn,
            appendRow,
            rowGroupingNavBehavior,
            mapper,
            lastRowSticky,
            setCurrent,
            headerRowMarkerDisabled,
            setSelectedColumns,
            setGridSelection,
            onSelectionCleared,
        ]
    );
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
    const onVisibleRegionChangedImpl = React.useCallback(
        (
            region: Rectangle,
            clientWidth: number,
            clientHeight: number,
            rightElWidth: number,
            tx: number,
            ty: number
        ) => {
            hasJustScrolled.current = false;

            // Close overlay editor when scrolling
            if (overlay !== undefined) {
                const prevRegion = visibleRegionRef.current;
                const hasScrolled = prevRegion.x !== region.x || prevRegion.y !== region.y;
                if (hasScrolled) {
                    setOverlay(undefined);
                }
            }

            let selected = currentCell;
            if (selected !== undefined) {
                selected = [selected[0] - rowMarkerOffset, selected[1]];
            }

            const freezeRegion =
                freezeColumns === 0
                    ? undefined
                    : {
                        x: 0,
                        y: region.y,
                        width: freezeColumns,
                        height: region.height,
                    };

            const freezeRegions: Rectangle[] = [];
            if (freezeRegion !== undefined) freezeRegions.push(freezeRegion);
            if (freezeTrailingRows > 0) {
                freezeRegions.push({
                    x: region.x - rowMarkerOffset,
                    y: rows - freezeTrailingRows,
                    width: region.width,
                    height: freezeTrailingRows,
                });

                if (freezeColumns > 0) {
                    freezeRegions.push({
                        x: 0,
                        y: rows - freezeTrailingRows,
                        width: freezeColumns,
                        height: freezeTrailingRows,
                    });
                }
            }

            const newRegion = {
                x: region.x - rowMarkerOffset,
                y: region.y,
                width: region.width,
                height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
                tx,
                ty,
                extras: {
                    selected,
                    freezeRegion,
                    freezeRegions,
                },
            };
            visibleRegionRef.current = newRegion;
            setVisibleRegion(newRegion);
            setClientSize([clientWidth, clientHeight, rightElWidth]);
            onVisibleRegionChanged?.(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
        },
        [
            currentCell,
            overlay,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            freezeColumns,
            freezeTrailingRows,
            setOverlay,
            setVisibleRegion,
            onVisibleRegionChanged,
        ]
    );

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

    const hoveredRef = React.useRef<GridMouseEventArgs>(undefined);
    const onItemHoveredImpl = React.useCallback(
        (args: GridMouseEventArgs) => {
            // make sure we still have a button down
            if (mouseEventArgsAreEqual(args, hoveredRef.current)) return;
            hoveredRef.current = args;
            if (mouseDownData?.current?.button !== undefined && mouseDownData.current.button >= 1) return;
            if (
                args.buttons !== 0 &&
                mouseState !== undefined &&
                mouseDownData.current?.location[0] === 0 &&
                rowMarkerOffset === 1 &&
                rowSelect === "multi" &&
                mouseState.previousSelection &&
                !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) &&
                gridSelection.rows.hasIndex(mouseDownData.current.location[1])
            ) {
                const start = Math.min(mouseDownData.current.location[1], args.location[1]);
                const end = Math.max(mouseDownData.current.location[1], args.location[1]) + 1;
                setSelectedRows(CompactSelection.fromSingleSelection([start, end]), undefined, false);
            }
            // Only handle rect selection if not already processed by row selection:
            else if (
                args.buttons !== 0 &&
                mouseState !== undefined &&
                gridSelection.current !== undefined &&
                !isActivelyDragging.current &&
                !isActivelyDraggingHeader.current &&
                (rangeSelect === "rect" || rangeSelect === "multi-rect")
            ) {
                const [selectedCol, selectedRow] = gridSelection.current.cell;
                // eslint-disable-next-line prefer-const
                let [col, row] = args.location;

                if (row < 0) {
                    row = visibleRegionRef.current.y;
                }

                if (mouseState.fillHandle === true && mouseState.previousSelection?.current !== undefined) {
                    const prevRange = mouseState.previousSelection.current.range;
                    row = Math.min(row, showTrailingBlankRow ? rows - 1 : rows);
                    const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
                    setFillHighlightRegion(rect);
                } else {
                    const startedFromLastStickyRow = showTrailingBlankRow && selectedRow === rows;
                    if (startedFromLastStickyRow) return;

                    const landedOnLastStickyRow = showTrailingBlankRow && row === rows;
                    if (landedOnLastStickyRow) {
                        if (args.kind === outOfBoundsKind) row--;
                        else return;
                    }

                    col = Math.max(col, rowMarkerOffset);
                    const clampLimits = getSelectionRowLimits(selectedRow);
                    row = clampLimits === undefined ? row : clamp(row, clampLimits[0], clampLimits[1]);

                    // FIXME: Restrict row based on rowGrouping.selectionBehavior here

                    const deltaX = col - selectedCol;
                    const deltaY = row - selectedRow;

                    const newRange: Rectangle = {
                        x: deltaX >= 0 ? selectedCol : col,
                        y: deltaY >= 0 ? selectedRow : row,
                        width: Math.abs(deltaX) + 1,
                        height: Math.abs(deltaY) + 1,
                    };

                    setCurrent(
                        {
                            ...gridSelection.current,
                            range: newRange,
                        },
                        true,
                        false,
                        "drag"
                    );
                }
            }

            onItemHovered?.({ ...args, location: [args.location[0] - rowMarkerOffset, args.location[1]] as any });
        },
        [
            mouseState,
            rowMarkerOffset,
            rowSelect,
            gridSelection,
            rangeSelect,
            onItemHovered,
            setSelectedRows,
            showTrailingBlankRow,
            rows,
            allowedFillDirections,
            getSelectionRowLimits,
            setCurrent,
        ]
    );

    const adjustSelectionOnScroll = React.useCallback(() => {
        const args = hoveredRef.current;
        if (args === undefined) return;
        const [xDir, yDir] = args.scrollEdge;
        let [col, row] = args.location;
        const visible = visibleRegionRef.current;
        if (xDir === -1) {
            col = visible.extras?.freezeRegion?.x ?? visible.x;
        } else if (xDir === 1) {
            col = visible.x + visible.width;
        }
        if (yDir === -1) {
            row = Math.max(0, visible.y);
        } else if (yDir === 1) {
            row = Math.min(rows - 1, visible.y + visible.height);
        }
        col = clamp(col, 0, mangledCols.length - 1);
        row = clamp(row, 0, rows - 1);
        onItemHoveredImpl({
            ...args,
            location: [col, row] as any,
        });
    }, [mangledCols.length, onItemHoveredImpl, rows]);

    useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);





    const onFinishEditing = React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            // Use refs to get current state (avoids stale closure issues)
            const currentOverlay = overlayRef.current;
            const isGhostMode = ghostInputVisibleRef.current;

            // Read value from GhostInput if available (even if isGhostMode is false)
            // This handles cases where editing is completed by clicking outside
            let finalValue = newValue;
            const ghostText = ghostInputRef.current?.getValue() ?? "";

            // IMPORTANT: For Custom cells, the custom editor provides the value via newValue.
            // We should NOT try to use ghostText for Custom cells because:
            // 1. Custom cells have their own editors that handle input directly
            // 2. ghostText might be stale or contain the initial keystroke only
            // 3. The custom editor's onFinishedEditing callback provides the correct finalValue
            const isCustomCell = currentOverlay?.content?.kind === GridCellKind.Custom;

            if (currentOverlay?.cell !== undefined && ghostText.length > 0 && currentOverlay.content !== undefined && !isCustomCell) {
                // Create a new cell value based on the GhostInput text
                // Important: Update both 'data' and 'displayData' for proper display
                const cellContent = currentOverlay.content;
                if (cellContent.kind === GridCellKind.Text) {
                    finalValue = { ...cellContent, data: ghostText, displayData: ghostText };
                } else if (cellContent.kind === GridCellKind.Number) {
                    const num = Number.parseFloat(ghostText);
                    const numVal = Number.isNaN(num) ? 0 : num;
                    finalValue = { ...cellContent, data: numVal, displayData: numVal.toLocaleString() };
                } else if (cellContent.kind === GridCellKind.Uri) {
                    finalValue = { ...cellContent, data: ghostText, displayData: ghostText };
                } else if (cellContent.kind === GridCellKind.Markdown) {
                    finalValue = { ...cellContent, data: ghostText };
                }
            } else if (isCustomCell) {
                // For Custom cells, use newValue from the custom editor
                // Don't modify it based on ghostText
                finalValue = newValue;
            }

            // When GhostInput is empty but newValue comes from overlay editor (e.g., Enter/double-click edit mode),
            // ensure displayData matches data for text cells to fix display issues
            if (finalValue !== undefined && ghostText.length === 0) {
                if (finalValue.kind === GridCellKind.Text && finalValue.data !== finalValue.displayData) {
                    finalValue = { ...finalValue, displayData: finalValue.data };
                } else if (finalValue.kind === GridCellKind.Number) {
                    const formatted = finalValue.data !== undefined ? finalValue.data.toLocaleString() : "0";
                    if (finalValue.displayData !== formatted) {
                        finalValue = { ...finalValue, displayData: formatted };
                    }
                } else if (finalValue.kind === GridCellKind.Uri && finalValue.data !== finalValue.displayData) {
                    finalValue = { ...finalValue, displayData: finalValue.data };
                }
            }

            // Check if the value actually changed by comparing data fields
            const originalContent = currentOverlay?.content;
            const hasValueChanged = (): boolean => {
                if (finalValue === undefined || originalContent === undefined) return false;
                if (finalValue.kind !== originalContent.kind) return true;

                // Compare based on cell type
                switch (finalValue.kind) {
                    case GridCellKind.Text:
                    case GridCellKind.Uri:
                    case GridCellKind.Markdown:
                        return (finalValue as any).data !== (originalContent as any).data;
                    case GridCellKind.Number:
                        return (finalValue as any).data !== (originalContent as any).data;
                    case GridCellKind.Boolean:
                        return (finalValue as any).data !== (originalContent as any).data;
                    default:
                        // For other cell types, assume changed
                        return true;
                }
            };

            if (currentOverlay?.cell !== undefined && finalValue !== undefined && isEditableGridCell(finalValue) && hasValueChanged()) {
                mangledOnCellsEdited([{ location: currentOverlay.cell, value: finalValue }]);
                window.requestAnimationFrame(() => {
                    gridRef.current?.damage([
                        {
                            cell: currentOverlay.cell,
                        },
                    ]);
                });
            }
            // Clear GhostInput and hide it (direct DOM manipulation to avoid re-render)
            ghostInputRef.current?.clear();
            ghostInputRef.current?.setVisible(false);
            setGhostInputVisible(false);

            focus(true);
            // CRITICAL: Reset overlayRef.current immediately (before React re-render)
            // This ensures onGhostCompositionStart sees undefined when checking
            // overlayRef.current === undefined for the next cell edit
            overlayRef.current = undefined;
            setOverlay(undefined);

            const [movX, movY] = movement;
            if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingLastRow = gridSelection.current.cell[1] === mangledRows - 1;

                if (isEditingLastRow && movY === 1) {
                    onFinishedEditing?.(newValue, [0, 0]);
                    return;
                }

                const isEditingLastCol =
                    gridSelection.current.cell[0] === mangledCols.length - 1 && newValue !== undefined;
                let updateSelected = true;
                if (isEditingLastRow && movY === 1 && onRowAppended !== undefined) {
                    updateSelected = false;
                    const col = gridSelection.current.cell[0] + movX;
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col, false);
                }
                if (isEditingLastCol && movX === 1 && onColumnAppended !== undefined) {
                    updateSelected = false;
                    const row = gridSelection.current.cell[1] + movY;
                    void appendColumn(row, false);
                }
                if (updateSelected) {
                    const newCol = clamp(gridSelection.current.cell[0] + movX, rowMarkerOffset, mangledCols.length - 1);
                    const newRow = clamp(gridSelection.current.cell[1] + movY, 0, mangledRows - 1);

                    updateSelectedCell(newCol, newRow, isEditingLastRow, false);

                    // Re-focus GhostInput after cell selection update
                    // This ensures IME input works immediately after navigation
                    window.requestAnimationFrame(() => {
                        ghostInputRef.current?.focus();
                    });
                }
            }
            onFinishedEditing?.(newValue, movement);
        },
        [
            focus,
            gridSelection,
            onFinishedEditing,
            mangledOnCellsEdited,
            mangledRows,
            updateSelectedCell,
            mangledCols.length,
            appendRow,
            appendColumn,
            onRowAppended,
            onColumnAppended,
            getCustomNewRowTargetColumn,
            rowMarkerOffset,
        ]
    );

    const overlayIDRef = React.useRef<string | null>(null);
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
