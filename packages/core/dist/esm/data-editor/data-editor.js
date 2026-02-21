import * as React from "react";
import { createPortal } from "react-dom";
import { assert, assertNever, maybe } from "../common/support.js";
import clamp from "lodash/clamp.js";
import uniq from "lodash/uniq.js";
import flatten from "lodash/flatten.js";
import range from "lodash/range.js";
import debounce from "lodash/debounce.js";
import { GridCellKind, isEditableGridCell, isReadWriteCell, InnerGridCellKind, CompactSelection, isInnerOnlyCell, isObjectEditorCallbackResult } from "../internal/data-grid/data-grid-types.js";
import DataGridSearch from "../internal/data-grid-search/data-grid-search.js";
import { browserIsOSX } from "../common/browser-detect.js";
import { getDataEditorTheme, makeCSSStyle, ThemeContext, mergeAndRealizeTheme } from "../common/styles.js";
import { getScrollBarWidth, whenDefined } from "../common/utils.js";
import { gridSelectionHasItem, getFreezeTrailingHeight } from "../internal/data-grid/render/data-grid-lib.js";
import { GroupRename } from "./group-rename.js";
import { useColumnSizer } from "./use-column-sizer.js";
import { useKeyboardHandlers } from "./use-keyboard-handlers.js";
import { useSelectionBehavior } from "../internal/data-grid/use-selection-behavior.js";
import { useCellsForSelection } from "./use-cells-for-selection.js";
import { expandSelection, toggleBoolean } from "./data-editor-fns.js";
import { DataEditorContainer } from "../internal/data-editor-container/data-grid-container.js";
import { useAutoscroll } from "./use-autoscroll.js";
import { useClipboard } from "./use-clipboard.js";
import { useRemAdjuster } from "./use-rem-adjuster.js";
import { withAlpha } from "../internal/data-grid/color-parser.js";
import { getClosestRect, pointInRect } from "../common/math.js";
import { groupHeaderKind, outOfBoundsKind, mouseEventArgsAreEqual } from "../internal/data-grid/event-args.js";
import { useKeybindingsWithDefaults } from "./data-editor-keybindings.js";
import { useRowGroupingInner } from "./row-grouping.js";
import { useRowGrouping } from "./row-grouping-api.js";
import { useInitialScrollOffset } from "./use-initial-scroll-offset.js";
import { GhostInput } from "../internal/ghost-input/index.js";
import { useGhostInput } from "./use-ghost-input.js";
import { useMouseHandlers } from "./use-mouse-handlers.js";
const DataGridOverlayEditor = React.lazy(async () => await import("../internal/data-grid-overlay-editor/data-grid-overlay-editor.js"));
let idCounter = 0;
function getSpanStops(cells) {
  return uniq(flatten(flatten(cells).filter(c => c.span !== undefined).map(c => {
    var _c$span$, _c$span, _c$span$2, _c$span2;
    return range(((_c$span$ = (_c$span = c.span) === null || _c$span === void 0 ? void 0 : _c$span[0]) !== null && _c$span$ !== void 0 ? _c$span$ : 0) + 1, ((_c$span$2 = (_c$span2 = c.span) === null || _c$span2 === void 0 ? void 0 : _c$span2[1]) !== null && _c$span$2 !== void 0 ? _c$span$2 : 0) + 1);
  })));
}
function shiftSelection(input, offset) {
  if (input === undefined || offset === 0 || input.columns.length === 0 && input.current === undefined) return input;
  return {
    current: input.current === undefined ? undefined : {
      cell: [input.current.cell[0] + offset, input.current.cell[1]],
      range: {
        ...input.current.range,
        x: input.current.range.x + offset
      },
      rangeStack: input.current.rangeStack.map(r => ({
        ...r,
        x: r.x + offset
      }))
    },
    rows: input.rows,
    columns: input.columns.offset(offset)
  };
}
const loadingCell = {
  kind: GridCellKind.Loading,
  allowOverlay: false
};
export const emptyGridSelection = {
  columns: CompactSelection.empty(),
  rows: CompactSelection.empty(),
  current: undefined
};
const DataEditorImpl = (p, forwardedRef) => {
  var _rowMarkersObj$rowNum, _ref, _rowMarkersObj$kind, _rowMarkersObj$width, _ref2, _rowMarkersObj$startI, _rowMarkersObj$theme, _rowMarkersObj$checkb, _rowMarkersObj$rowSta, _rowMarkersObj$rowSta2, _rowMarkersObj$rowId, _rowMarkersObj$rowIdW, _gridSelection$curren, _gridSelection$curren5, _gridSelectionOuter$c, _gridSelectionOuter$c2;
  const [gridSelectionInner, setGridSelectionInner] = React.useState(emptyGridSelection);
  const [overlay, setOverlay] = React.useState();
  const searchInputRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const [mouseState, setMouseState] = React.useState();
  const [scrollDir, setScrollDir] = React.useState();
  const lastSent = React.useRef(undefined);
  const ghostInputRef = React.useRef(null);
  const [ghostInputVisible, setGhostInputVisible] = React.useState(false);
  const ghostInputVisibleRef = React.useRef(ghostInputVisible);
  ghostInputVisibleRef.current = ghostInputVisible;
  const overlayRef = React.useRef(overlay);
  overlayRef.current = overlay;
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
    onRowId
  } = p;
  const drawFocusRing = drawFocusRingIn === "no-editor" ? overlay === undefined : drawFocusRingIn;
  const rowMarkersObj = typeof p.rowMarkers === "string" ? undefined : p.rowMarkers;
  const rowNumberOption = (_rowMarkersObj$rowNum = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowNumber) !== null && _rowMarkersObj$rowNum !== void 0 ? _rowMarkersObj$rowNum : false;
  let normalizedKind = (_ref = (_rowMarkersObj$kind = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.kind) !== null && _rowMarkersObj$kind !== void 0 ? _rowMarkersObj$kind : p.rowMarkers) !== null && _ref !== void 0 ? _ref : "none";
  let showRowNumber = rowNumberOption;
  if (normalizedKind === "both" || normalizedKind === "checkbox-and-number") {
    normalizedKind = "checkbox";
    showRowNumber = true;
  }
  const rowMarkers = normalizedKind;
  const rowMarkerWidthRaw = (_rowMarkersObj$width = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.width) !== null && _rowMarkersObj$width !== void 0 ? _rowMarkersObj$width : p.rowMarkerWidth;
  const rowMarkerStartIndex = (_ref2 = (_rowMarkersObj$startI = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.startIndex) !== null && _rowMarkersObj$startI !== void 0 ? _rowMarkersObj$startI : p.rowMarkerStartIndex) !== null && _ref2 !== void 0 ? _ref2 : 1;
  const rowMarkerTheme = (_rowMarkersObj$theme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.theme) !== null && _rowMarkersObj$theme !== void 0 ? _rowMarkersObj$theme : p.rowMarkerTheme;
  const headerRowMarkerTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerTheme;
  const headerRowMarkerAlwaysVisible = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerAlwaysVisible;
  const headerRowMarkerDisabled = rowSelect !== "multi" || (rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.headerDisabled) === true;
  const rowMarkerCheckboxStyle = (_rowMarkersObj$checkb = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.checkboxStyle) !== null && _rowMarkersObj$checkb !== void 0 ? _rowMarkersObj$checkb : "square";
  const rowStatusOption = (_rowMarkersObj$rowSta = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatus) !== null && _rowMarkersObj$rowSta !== void 0 ? _rowMarkersObj$rowSta : false;
  const rowStatusWidth = (_rowMarkersObj$rowSta2 = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatusWidth) !== null && _rowMarkersObj$rowSta2 !== void 0 ? _rowMarkersObj$rowSta2 : 40;
  const rowStatusTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowStatusTheme;
  const rowIdOption = (_rowMarkersObj$rowId = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowId) !== null && _rowMarkersObj$rowId !== void 0 ? _rowMarkersObj$rowId : false;
  const rowIdWidth = (_rowMarkersObj$rowIdW = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowIdWidth) !== null && _rowMarkersObj$rowIdW !== void 0 ? _rowMarkersObj$rowIdW : 80;
  const rowIdTheme = rowMarkersObj === null || rowMarkersObj === void 0 ? void 0 : rowMarkersObj.rowIdTheme;
  const minColumnWidth = Math.max(minColumnWidthIn, 20);
  const maxColumnWidth = Math.max(maxColumnWidthIn, minColumnWidth);
  const maxColumnAutoWidth = Math.max(maxColumnAutoWidthIn !== null && maxColumnAutoWidthIn !== void 0 ? maxColumnAutoWidthIn : maxColumnWidth, minColumnWidth);
  const docStyle = (() => {
    if (typeof window === "undefined") return {
      fontSize: "16px"
    };
    return window.getComputedStyle(document.documentElement);
  })();
  const {
    rows,
    rowNumberMapper,
    rowHeight: rowHeightPostGrouping,
    getRowThemeOverride
  } = useRowGroupingInner(rowGrouping, rowsIn, rowHeightIn, getRowThemeOverrideIn);
  const remSize = Number.parseFloat(docStyle.fontSize);
  const {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  } = useRemAdjuster({
    groupHeaderHeight: groupHeaderHeightIn,
    headerHeight: headerHeightIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    remSize,
    rowHeight: rowHeightPostGrouping,
    scaleToRem,
    theme: themeIn
  });
  const keybindings = useKeybindingsWithDefaults(keybindingsIn);
  const rowMarkerWidth = rowMarkerWidthRaw !== null && rowMarkerWidthRaw !== void 0 ? rowMarkerWidthRaw : rowsIn > 10000 ? 48 : rowsIn > 1000 ? 44 : rowsIn > 100 ? 36 : 32;
  const hasRowMarkers = rowMarkers !== "none";
  const hasRowStatus = rowStatusOption === true;
  const hasRowId = rowIdOption === true;
  const rowMarkerOffset = (hasRowMarkers ? showRowNumber ? 2 : 1 : 0) + (hasRowStatus ? 1 : 0) + (hasRowId ? 1 : 0);
  const totalMarkerWidth = (hasRowMarkers ? (showRowNumber ? 2 : 1) * rowMarkerWidth : 0) + (hasRowStatus ? rowStatusWidth : 0) + (hasRowId ? rowIdWidth : 0);
  const showTrailingBlankRow = trailingRowOptions !== undefined;
  const lastRowSticky = (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true;
  const [showSearchInner, setShowSearchInner] = React.useState(false);
  const showSearch = showSearchIn !== null && showSearchIn !== void 0 ? showSearchIn : showSearchInner;
  const onSearchClose = () => {
    if (onSearchCloseIn !== undefined) {
      onSearchCloseIn();
    } else {
      setShowSearchInner(false);
    }
  };
  const gridSelectionOuterMangled = gridSelectionOuter === undefined ? undefined : shiftSelection(gridSelectionOuter, rowMarkerOffset);
  const gridSelection = gridSelectionOuterMangled !== null && gridSelectionOuterMangled !== void 0 ? gridSelectionOuterMangled : gridSelectionInner;
  const abortControllerRef = React.useRef(new AbortController());
  React.useEffect(() => () => abortControllerRef === null || abortControllerRef === void 0 ? void 0 : abortControllerRef.current.abort(), []);
  const [getCellsForSelection, getCellsForSeletionDirect] = useCellsForSelection(getCellsForSelectionIn, getCellContent, rowMarkerOffset, abortControllerRef.current, rows);
  const validateCell = (cell, newValue, prevValue) => {
    if (validateCellIn === undefined) return true;
    const item = [cell[0] - rowMarkerOffset, cell[1]];
    return validateCellIn === null || validateCellIn === void 0 ? void 0 : validateCellIn(item, newValue, prevValue);
  };
  const expectedExternalGridSelection = React.useRef(gridSelectionOuter);
  const setGridSelection = (newVal, expand) => {
    if (expand) {
      newVal = expandSelection(newVal, getCellsForSelection, rowMarkerOffset, spanRangeBehavior, abortControllerRef.current);
    }
    if (onGridSelectionChange !== undefined) {
      expectedExternalGridSelection.current = shiftSelection(newVal, -rowMarkerOffset);
      onGridSelectionChange(expectedExternalGridSelection.current);
    } else {
      setGridSelectionInner(newVal);
    }
  };
  const onColumnResize = whenDefined(onColumnResizeIn, (_, w, ind, wg) => {
    onColumnResizeIn === null || onColumnResizeIn === void 0 || onColumnResizeIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  });
  const onColumnResizeEnd = whenDefined(onColumnResizeEndIn, (_, w, ind, wg) => {
    onColumnResizeEndIn === null || onColumnResizeEndIn === void 0 || onColumnResizeEndIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  });
  const onColumnResizeStart = whenDefined(onColumnResizeStartIn, (_, w, ind, wg) => {
    onColumnResizeStartIn === null || onColumnResizeStartIn === void 0 || onColumnResizeStartIn(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
  });
  const drawHeader = whenDefined(drawHeaderIn, (args, draw) => {
    var _drawHeaderIn;
    return (_drawHeaderIn = drawHeaderIn === null || drawHeaderIn === void 0 ? void 0 : drawHeaderIn({
      ...args,
      columnIndex: args.columnIndex - rowMarkerOffset
    }, draw)) !== null && _drawHeaderIn !== void 0 ? _drawHeaderIn : false;
  });
  const drawCell = whenDefined(drawCellIn, (args, draw) => {
    var _drawCellIn;
    return (_drawCellIn = drawCellIn === null || drawCellIn === void 0 ? void 0 : drawCellIn({
      ...args,
      col: args.col - rowMarkerOffset
    }, draw)) !== null && _drawCellIn !== void 0 ? _drawCellIn : false;
  });
  const onDelete = sel => {
    if (onDeleteIn !== undefined) {
      const result = onDeleteIn(shiftSelection(sel, -rowMarkerOffset));
      if (typeof result === "boolean") {
        return result;
      }
      return shiftSelection(result, rowMarkerOffset);
    }
    return true;
  };
  const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(gridSelection, setGridSelection, rangeSelectionBlending, columnSelectionBlending, rowSelectionBlending, rangeSelect, rangeSelectionColumnSpanning);
  const mergedTheme = mergeAndRealizeTheme(getDataEditorTheme(), theme);
  const [clientSize, setClientSize] = React.useState([0, 0, 0]);
  const rendererMap = (() => {
    if (renderers === undefined) return {};
    const result = {};
    for (const r of renderers) {
      result[r.kind] = r;
    }
    return result;
  })();
  const getCellRenderer = cell => {
    if (cell.kind !== GridCellKind.Custom) {
      return rendererMap[cell.kind];
    }
    return additionalRenderers === null || additionalRenderers === void 0 ? void 0 : additionalRenderers.find(x => x.isMatch(cell));
  };
  let {
    sizedColumns: columns,
    nonGrowWidth
  } = useColumnSizer(columnsIn, rows, getCellsForSeletionDirect, clientSize[0] - totalMarkerWidth - clientSize[2], minColumnWidth, maxColumnAutoWidth, mergedTheme, getCellRenderer, abortControllerRef.current);
  nonGrowWidth += totalMarkerWidth;
  const groupLevels = (() => {
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
  })();
  const enableGroups = groupLevels > 0;
  const groupHeaderHeights = groupLevels === 0 ? [] : Array(groupLevels).fill(groupHeaderHeight);
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const numSelectedRows = gridSelection.rows.length;
  const rowMarkerChecked = rowMarkers === "none" ? undefined : numSelectedRows === 0 ? false : numSelectedRows === rows ? true : undefined;
  const mangledCols = (() => {
    const markerColumns = [];
    if (rowMarkers !== "none") {
      if (showRowNumber) {
        markerColumns.push({
          title: "",
          width: rowMarkerWidth,
          icon: undefined,
          hasMenu: false,
          style: "normal",
          themeOverride: rowMarkerTheme,
          rowMarker: rowMarkerCheckboxStyle,
          rowMarkerChecked: false,
          headerRowMarkerTheme,
          headerRowMarkerAlwaysVisible: false,
          headerRowMarkerDisabled: true
        });
      }
      markerColumns.push({
        title: "",
        width: rowMarkerWidth,
        icon: undefined,
        hasMenu: false,
        style: "normal",
        themeOverride: rowMarkerTheme,
        rowMarker: rowMarkerCheckboxStyle,
        rowMarkerChecked,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled
      });
    }
    if (hasRowStatus) {
      markerColumns.push({
        title: "",
        width: rowStatusWidth,
        icon: undefined,
        hasMenu: false,
        style: "normal",
        themeOverride: rowStatusTheme
      });
    }
    if (hasRowId) {
      markerColumns.push({
        title: "ID",
        width: rowIdWidth,
        icon: undefined,
        hasMenu: false,
        style: "normal",
        themeOverride: rowIdTheme
      });
    }
    return [...markerColumns, ...columns];
  })();
  const visibleRegionRef = React.useRef({
    height: 1,
    width: 1,
    x: 0,
    y: 0
  });
  const hasJustScrolled = React.useRef(false);
  const {
    setVisibleRegion,
    visibleRegion,
    scrollRef
  } = useInitialScrollOffset(scrollOffsetX, scrollOffsetY, rowHeight, visibleRegionRef, () => hasJustScrolled.current = true);
  visibleRegionRef.current = visibleRegion;
  const cellXOffset = visibleRegion.x + rowMarkerOffset;
  const cellYOffset = visibleRegion.y;
  const gridRef = React.useRef(null);
  const focus = immediate => {
    if (immediate === true) {
      var _ghostInputRef$curren;
      (_ghostInputRef$curren = ghostInputRef.current) === null || _ghostInputRef$curren === void 0 || _ghostInputRef$curren.focus();
    } else {
      window.requestAnimationFrame(() => {
        var _ghostInputRef$curren2;
        (_ghostInputRef$curren2 = ghostInputRef.current) === null || _ghostInputRef$curren2 === void 0 || _ghostInputRef$curren2.focus();
      });
    }
  };
  const mangledRows = showTrailingBlankRow ? rows + 1 : rows;
  const mangledOnCellsEdited = items => {
    const mangledItems = rowMarkerOffset === 0 ? items : items.map(x => ({
      ...x,
      location: [x.location[0] - rowMarkerOffset, x.location[1]]
    }));
    const r = onCellsEdited === null || onCellsEdited === void 0 ? void 0 : onCellsEdited(mangledItems);
    if (r !== true) {
      for (const i of mangledItems) {
        onCellEdited === null || onCellEdited === void 0 || onCellEdited(i.location, i.value);
      }
    }
    return r;
  };
  const [fillHighlightRegion, setFillHighlightRegion] = React.useState();
  const highlightRange = gridSelection.current !== undefined && gridSelection.current.range.width * gridSelection.current.range.height > 1 ? gridSelection.current.range : undefined;
  const highlightFocus = drawFocusRing ? (_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell : undefined;
  const highlightFocusCol = highlightFocus === null || highlightFocus === void 0 ? void 0 : highlightFocus[0];
  const highlightFocusRow = highlightFocus === null || highlightFocus === void 0 ? void 0 : highlightFocus[1];
  const highlightRegions = ((_ref3, _ref4) => {
    if ((highlightRegionsIn === undefined || highlightRegionsIn.length === 0) && ((_ref3 = (_ref4 = highlightRange !== null && highlightRange !== void 0 ? highlightRange : highlightFocusCol) !== null && _ref4 !== void 0 ? _ref4 : highlightFocusRow) !== null && _ref3 !== void 0 ? _ref3 : fillHighlightRegion) === undefined) return undefined;
    const regions = [];
    if (highlightRegionsIn !== undefined) {
      for (const r of highlightRegionsIn) {
        const maxWidth = mangledCols.length - r.range.x - rowMarkerOffset;
        if (maxWidth > 0) {
          regions.push({
            color: r.color,
            range: {
              ...r.range,
              x: r.range.x + rowMarkerOffset,
              width: Math.min(maxWidth, r.range.width)
            },
            style: r.style
          });
        }
      }
    }
    if (fillHighlightRegion !== undefined) {
      regions.push({
        color: withAlpha(mergedTheme.accentColor, 0),
        range: fillHighlightRegion,
        style: "dashed"
      });
    }
    if (highlightRange !== undefined) {
      regions.push({
        color: withAlpha(mergedTheme.accentColor, 0.5),
        range: highlightRange,
        style: "solid-outline"
      });
    }
    if (highlightFocusCol !== undefined && highlightFocusRow !== undefined) {
      regions.push({
        color: mergedTheme.accentColor,
        range: {
          x: highlightFocusCol,
          y: highlightFocusRow,
          width: 1,
          height: 1
        },
        style: "solid-outline"
      });
    }
    return regions.length > 0 ? regions : undefined;
  })();
  const mangledColsRef = React.useRef(mangledCols);
  mangledColsRef.current = mangledCols;
  const getMangledCellContent = function (_ref5) {
    let [col, row] = _ref5;
    let forceStrict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    const isTrailing = showTrailingBlankRow && row === mangledRows - 1;
    let currentColIndex = 0;
    let rowNumberColIndex = -1;
    let checkboxColIndex = -1;
    let rowStatusColIndex = -1;
    let rowIdColIndex = -1;
    if (hasRowMarkers && showRowNumber) {
      rowNumberColIndex = currentColIndex++;
    }
    if (hasRowMarkers) {
      checkboxColIndex = currentColIndex++;
    }
    if (hasRowStatus) {
      rowStatusColIndex = currentColIndex++;
    }
    if (hasRowId) {
      rowIdColIndex = currentColIndex++;
    }
    if (col === rowNumberColIndex) {
      var _p$disabledRows;
      if (isTrailing) {
        return loadingCell;
      }
      const mappedRow = rowNumberMapper(row);
      if (mappedRow === undefined) return loadingCell;
      return {
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        checkboxStyle: rowMarkerCheckboxStyle,
        checked: false,
        markerKind: "number",
        row: rowMarkerStartIndex + mappedRow,
        drawHandle: false,
        cursor: undefined,
        disabled: ((_p$disabledRows = p.disabledRows) === null || _p$disabledRows === void 0 ? void 0 : _p$disabledRows.call(p, row)) === true
      };
    }
    if (col === checkboxColIndex) {
      var _p$disabledRows2;
      if (isTrailing) {
        return loadingCell;
      }
      const mappedRow = rowNumberMapper(row);
      if (mappedRow === undefined) return loadingCell;
      let markerKind;
      if (showRowNumber) {
        markerKind = rowMarkers === "checkbox-visible" ? "checkbox-visible" : "checkbox";
      } else if (rowMarkers === "clickable-number") {
        markerKind = "number";
      } else {
        markerKind = rowMarkers;
      }
      return {
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        checkboxStyle: rowMarkerCheckboxStyle,
        checked: (gridSelection === null || gridSelection === void 0 ? void 0 : gridSelection.rows.hasIndex(row)) === true,
        markerKind,
        row: rowMarkerStartIndex + mappedRow,
        drawHandle: onRowMoved !== undefined,
        cursor: showRowNumber ? undefined : rowMarkers === "clickable-number" ? "pointer" : undefined,
        disabled: ((_p$disabledRows2 = p.disabledRows) === null || _p$disabledRows2 === void 0 ? void 0 : _p$disabledRows2.call(p, row)) === true
      };
    }
    if (col === rowStatusColIndex) {
      if (isTrailing) {
        return loadingCell;
      }
      const status = onRowStatus === null || onRowStatus === void 0 ? void 0 : onRowStatus(row);
      return {
        kind: InnerGridCellKind.RowStatus,
        allowOverlay: false,
        status,
        themeOverride: rowStatusTheme
      };
    }
    if (col === rowIdColIndex) {
      if (isTrailing) {
        return loadingCell;
      }
      const rowId = onRowId === null || onRowId === void 0 ? void 0 : onRowId(row);
      return {
        kind: InnerGridCellKind.RowId,
        allowOverlay: false,
        rowId,
        themeOverride: rowIdTheme
      };
    }
    if (isTrailing) {
      var _trailingRowOptions$h, _c$trailingRowOptions;
      const isFirst = col === rowMarkerOffset;
      const maybeFirstColumnHint = isFirst ? (_trailingRowOptions$h = trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.hint) !== null && _trailingRowOptions$h !== void 0 ? _trailingRowOptions$h : "" : "";
      const c = mangledColsRef.current[col];
      if ((c === null || c === void 0 || (_c$trailingRowOptions = c.trailingRowOptions) === null || _c$trailingRowOptions === void 0 ? void 0 : _c$trailingRowOptions.disabled) === true) {
        return loadingCell;
      } else {
        var _c$trailingRowOptions2, _c$trailingRowOptions3, _c$trailingRowOptions4, _c$trailingRowOptions5;
        const hint = (_c$trailingRowOptions2 = c === null || c === void 0 || (_c$trailingRowOptions3 = c.trailingRowOptions) === null || _c$trailingRowOptions3 === void 0 ? void 0 : _c$trailingRowOptions3.hint) !== null && _c$trailingRowOptions2 !== void 0 ? _c$trailingRowOptions2 : maybeFirstColumnHint;
        const icon = (_c$trailingRowOptions4 = c === null || c === void 0 || (_c$trailingRowOptions5 = c.trailingRowOptions) === null || _c$trailingRowOptions5 === void 0 ? void 0 : _c$trailingRowOptions5.addIcon) !== null && _c$trailingRowOptions4 !== void 0 ? _c$trailingRowOptions4 : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.addIcon;
        return {
          kind: InnerGridCellKind.NewRow,
          hint,
          allowOverlay: false,
          icon
        };
      }
    } else {
      const outerCol = col - rowMarkerOffset;
      if (forceStrict || (experimental === null || experimental === void 0 ? void 0 : experimental.strict) === true) {
        var _vr$extras, _vr$extras2, _vr$extras3;
        const vr = visibleRegionRef.current;
        const isOutsideMainArea = vr.x > outerCol || outerCol > vr.x + vr.width || vr.y > row || row > vr.y + vr.height || row >= rowsRef.current;
        const isSelected = outerCol === ((_vr$extras = vr.extras) === null || _vr$extras === void 0 || (_vr$extras = _vr$extras.selected) === null || _vr$extras === void 0 ? void 0 : _vr$extras[0]) && row === ((_vr$extras2 = vr.extras) === null || _vr$extras2 === void 0 ? void 0 : _vr$extras2.selected[1]);
        let isInFreezeArea = false;
        if (((_vr$extras3 = vr.extras) === null || _vr$extras3 === void 0 ? void 0 : _vr$extras3.freezeRegions) !== undefined) {
          for (const fr of vr.extras.freezeRegions) {
            if (pointInRect(fr, outerCol, row)) {
              isInFreezeArea = true;
              break;
            }
          }
        }
        if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
          return loadingCell;
        }
      }
      let result = getCellContent([outerCol, row]);
      if (rowMarkerOffset !== 0 && result.span !== undefined) {
        result = {
          ...result,
          span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset]
        };
      }
      return result;
    }
  };
  const mangledGetGroupDetails = group => {
    var _getGroupDetails;
    let result = (_getGroupDetails = getGroupDetails === null || getGroupDetails === void 0 ? void 0 : getGroupDetails(group)) !== null && _getGroupDetails !== void 0 ? _getGroupDetails : {
      name: group
    };
    if (onGroupHeaderRenamed !== undefined && group !== "") {
      var _result$actions;
      result = {
        icon: result.icon,
        name: result.name,
        overrideTheme: result.overrideTheme,
        actions: [...((_result$actions = result.actions) !== null && _result$actions !== void 0 ? _result$actions : []), {
          title: "Rename",
          icon: "renameIcon",
          onClick: e => setRenameGroup({
            group: result.name,
            bounds: e.bounds
          })
        }]
      };
    }
    return result;
  };
  const setOverlaySimple = val => {
    var _mangledGetGroupDetai;
    const [col, row] = val.cell;
    const column = mangledCols[col];
    const groupTheme = (column === null || column === void 0 ? void 0 : column.group) !== undefined ? (_mangledGetGroupDetai = mangledGetGroupDetails(column.group)) === null || _mangledGetGroupDetai === void 0 ? void 0 : _mangledGetGroupDetai.overrideTheme : undefined;
    const colTheme = column === null || column === void 0 ? void 0 : column.themeOverride;
    const rowTheme = getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row);
    setOverlay({
      ...val,
      theme: mergeAndRealizeTheme(mergedTheme, groupTheme, colTheme, rowTheme, val.content.themeOverride)
    });
  };
  const reselect = (bounds, activation, initialValue) => {
    if (gridSelection.current === undefined) return;
    const [col, row] = gridSelection.current.cell;
    const c = getMangledCellContent([col, row]);
    if (c.kind !== GridCellKind.Boolean && c.allowOverlay) {
      let content = c;
      if (initialValue !== undefined) {
        switch (content.kind) {
          case GridCellKind.Number:
            {
              const d = maybe(() => initialValue === "-" ? -0 : Number.parseFloat(initialValue), 0);
              content = {
                ...content,
                data: Number.isNaN(d) ? 0 : d
              };
              break;
            }
          case GridCellKind.Text:
          case GridCellKind.Markdown:
          case GridCellKind.Uri:
            content = {
              ...content,
              data: initialValue
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
        activation
      });
      const isCustomCell = content.kind === GridCellKind.Custom;
      const useGhostMode = initialValue !== undefined && !isCustomCell;
      if (useGhostMode) {
        var _ghostInputRef$curren3, _ghostInputRef$curren5;
        (_ghostInputRef$curren3 = ghostInputRef.current) === null || _ghostInputRef$curren3 === void 0 || _ghostInputRef$curren3.setPosition(bounds.x, bounds.y, bounds.width, bounds.height);
        if (initialValue.length > 0) {
          var _ghostInputRef$curren4;
          (_ghostInputRef$curren4 = ghostInputRef.current) === null || _ghostInputRef$curren4 === void 0 || _ghostInputRef$curren4.setValue(initialValue);
        }
        (_ghostInputRef$curren5 = ghostInputRef.current) === null || _ghostInputRef$curren5 === void 0 || _ghostInputRef$curren5.setVisible(true);
        setGhostInputVisible(true);
      } else if (isCustomCell && initialValue !== undefined) {
        var _ghostInputRef$curren6, _ghostInputRef$curren7, _ghostInputRef$curren8;
        (_ghostInputRef$curren6 = ghostInputRef.current) === null || _ghostInputRef$curren6 === void 0 || _ghostInputRef$curren6.clear();
        (_ghostInputRef$curren7 = ghostInputRef.current) === null || _ghostInputRef$curren7 === void 0 || _ghostInputRef$curren7.setVisible(false);
        (_ghostInputRef$curren8 = ghostInputRef.current) === null || _ghostInputRef$curren8 === void 0 || _ghostInputRef$curren8.blur();
        setGhostInputVisible(false);
      }
    } else if (c.kind === GridCellKind.Boolean && activation.inputType === "keyboard" && c.readonly !== true) {
      var _gridRef$current;
      mangledOnCellsEdited([{
        location: gridSelection.current.cell,
        value: {
          ...c,
          data: toggleBoolean(c.data)
        }
      }]);
      (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage([{
        cell: gridSelection.current.cell
      }]);
    }
  };
  const focusOnRowFromTrailingBlankRow = (col, row) => {
    var _gridRef$current2;
    const bounds = (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.getBounds(col, row);
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
      activation: {
        inputType: "keyboard",
        key: "Enter"
      }
    });
  };
  const scrollTo = function (col, row) {
    let dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "both";
    let paddingX = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    let paddingY = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    let options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : undefined;
    if (scrollRef.current !== null) {
      const grid = gridRef.current;
      const canvas = canvasRef.current;
      const trueCol = typeof col !== "number" ? col.unit === "cell" ? col.amount : undefined : col;
      const trueRow = typeof row !== "number" ? row.unit === "cell" ? row.amount : undefined : row;
      const desiredX = typeof col !== "number" && col.unit === "px" ? col.amount : undefined;
      const desiredY = typeof row !== "number" && row.unit === "px" ? row.amount : undefined;
      if (grid !== null && canvas !== null) {
        let targetRect = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
        let scrollX = 0;
        let scrollY = 0;
        if (trueCol !== undefined || trueRow !== undefined) {
          var _grid$getBounds;
          targetRect = (_grid$getBounds = grid.getBounds((trueCol !== null && trueCol !== void 0 ? trueCol : 0) + rowMarkerOffset, trueRow !== null && trueRow !== void 0 ? trueRow : 0)) !== null && _grid$getBounds !== void 0 ? _grid$getBounds : targetRect;
          if (targetRect.width === 0 || targetRect.height === 0) return;
        }
        const scrollBounds = canvas.getBoundingClientRect();
        const scale = scrollBounds.width / canvas.offsetWidth;
        if (desiredX !== undefined) {
          targetRect = {
            ...targetRect,
            x: desiredX - scrollBounds.left - scrollRef.current.scrollLeft,
            width: 1
          };
        }
        if (desiredY !== undefined) {
          targetRect = {
            ...targetRect,
            y: desiredY + scrollBounds.top - scrollRef.current.scrollTop,
            height: 1
          };
        }
        if (targetRect !== undefined) {
          const bounds = {
            x: targetRect.x - paddingX,
            y: targetRect.y - paddingY,
            width: targetRect.width + 2 * paddingX,
            height: targetRect.height + 2 * paddingY
          };
          let frozenWidth = 0;
          for (let i = 0; i < freezeColumns; i++) {
            frozenWidth += columns[i].width;
          }
          let trailingRowHeight = 0;
          const freezeTrailingRowsEffective = freezeTrailingRows + (lastRowSticky ? 1 : 0);
          if (freezeTrailingRowsEffective > 0) {
            trailingRowHeight = getFreezeTrailingHeight(mangledRows, freezeTrailingRowsEffective, rowHeight);
          }
          let sLeft = frozenWidth * scale + scrollBounds.left + totalMarkerWidth * scale;
          let sRight = scrollBounds.right;
          let sTop = scrollBounds.top + totalHeaderHeight * scale;
          let sBottom = scrollBounds.bottom - trailingRowHeight * scale;
          const minx = targetRect.width + paddingX * 2;
          switch (options === null || options === void 0 ? void 0 : options.hAlign) {
            case "start":
              sRight = sLeft + minx;
              break;
            case "end":
              sLeft = sRight - minx;
              break;
            case "center":
              sLeft = Math.floor((sLeft + sRight) / 2) - minx / 2;
              sRight = sLeft + minx;
              break;
          }
          const miny = targetRect.height + paddingY * 2;
          switch (options === null || options === void 0 ? void 0 : options.vAlign) {
            case "start":
              sBottom = sTop + miny;
              break;
            case "end":
              sTop = sBottom - miny;
              break;
            case "center":
              sTop = Math.floor((sTop + sBottom) / 2) - miny / 2;
              sBottom = sTop + miny;
              break;
          }
          if (sLeft > bounds.x) {
            scrollX = bounds.x - sLeft;
          } else if (sRight < bounds.x + bounds.width) {
            scrollX = bounds.x + bounds.width - sRight;
          }
          if (sTop > bounds.y) {
            scrollY = bounds.y - sTop;
          } else if (sBottom < bounds.y + bounds.height) {
            scrollY = bounds.y + bounds.height - sBottom;
          }
          if (dir === "vertical" || typeof col === "number" && col < freezeColumns) {
            scrollX = 0;
          } else if (dir === "horizontal" || typeof row === "number" && row >= mangledRows - freezeTrailingRowsEffective) {
            scrollY = 0;
          }
          if (scrollX !== 0 || scrollY !== 0) {
            var _options$behavior;
            if (scale !== 1) {
              scrollX /= scale;
              scrollY /= scale;
            }
            scrollRef.current.scrollTo({
              left: scrollX + scrollRef.current.scrollLeft,
              top: scrollY + scrollRef.current.scrollTop,
              behavior: (_options$behavior = options === null || options === void 0 ? void 0 : options.behavior) !== null && _options$behavior !== void 0 ? _options$behavior : "auto"
            });
          }
        }
      }
    }
  };
  const scrollToRef = React.useRef(scrollTo);
  scrollToRef.current = scrollTo;
  const focusCallback = React.useRef(focusOnRowFromTrailingBlankRow);
  const getCellContentRef = React.useRef(getCellContent);
  focusCallback.current = focusOnRowFromTrailingBlankRow;
  getCellContentRef.current = getCellContent;
  const rowsRef = React.useRef(rows);
  rowsRef.current = rows;
  const colsRef = React.useRef(mangledCols.length);
  colsRef.current = mangledCols.length;
  const appendRow = async function (col) {
    var _ref6, _c$trailingRowOptions6, _c$trailingRowOptions7;
    let openOverlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    let behavior = arguments.length > 2 ? arguments[2] : undefined;
    const c = mangledCols[col];
    const appendResult = (_ref6 = (_c$trailingRowOptions6 = c === null || c === void 0 || (_c$trailingRowOptions7 = c.trailingRowOptions) === null || _c$trailingRowOptions7 === void 0 ? void 0 : _c$trailingRowOptions7.onRowAppended) !== null && _c$trailingRowOptions6 !== void 0 ? _c$trailingRowOptions6 : onRowAppended) === null || _ref6 === void 0 ? void 0 : _ref6();
    let r = undefined;
    let bottom = true;
    if (appendResult !== undefined) {
      r = await appendResult;
      if (r === "top") bottom = false;
      if (typeof r === "number") bottom = false;
    }
    let backoff = 0;
    const doFocus = () => {
      if (rowsRef.current <= rows) {
        if (backoff < 500) {
          window.setTimeout(doFocus, backoff);
        }
        backoff = 50 + backoff * 2;
        return;
      }
      const row = typeof r === "number" ? r : bottom ? rows : 0;
      scrollToRef.current(col - rowMarkerOffset, row, "both", 0, 20, behavior ? {
        behavior
      } : undefined);
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, false, false, "edit");
      const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
        window.setTimeout(() => {
          focusCallback.current(col, row);
        }, 0);
      }
    };
    doFocus();
  };
  const appendColumn = async function (row) {
    let openOverlay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const appendResult = onColumnAppended === null || onColumnAppended === void 0 ? void 0 : onColumnAppended();
    let r = undefined;
    let right = true;
    if (appendResult !== undefined) {
      r = await appendResult;
      if (r === "left") right = false;
      if (typeof r === "number") right = false;
    }
    let backoff = 0;
    const doFocus = () => {
      if (colsRef.current <= mangledCols.length) {
        if (backoff < 500) {
          window.setTimeout(doFocus, backoff);
        }
        backoff = 50 + backoff * 2;
        return;
      }
      const col = typeof r === "number" ? r : right ? mangledCols.length : 0;
      scrollTo(col - rowMarkerOffset, row);
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, false, false, "edit");
      const cell = getCellContentRef.current([col - rowMarkerOffset, row]);
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
        window.setTimeout(() => {
          focusCallback.current(col, row);
        }, 0);
      }
    };
    doFocus();
  };
  const getCustomNewRowTargetColumn = col => {
    var _columns$col$trailing, _columns$col;
    const customTargetColumn = (_columns$col$trailing = (_columns$col = columns[col]) === null || _columns$col === void 0 || (_columns$col = _columns$col.trailingRowOptions) === null || _columns$col === void 0 ? void 0 : _columns$col.targetColumn) !== null && _columns$col$trailing !== void 0 ? _columns$col$trailing : trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.targetColumn;
    if (typeof customTargetColumn === "number") {
      const customTargetOffset = hasRowMarkers ? 1 : 0;
      return customTargetColumn + customTargetOffset;
    }
    if (typeof customTargetColumn === "object") {
      const maybeIndex = columnsIn.indexOf(customTargetColumn);
      if (maybeIndex >= 0) {
        const customTargetOffset = hasRowMarkers ? 1 : 0;
        return maybeIndex + customTargetOffset;
      }
    }
    return undefined;
  };
  const lastSelectedRowRef = React.useRef(undefined);
  const lastSelectedColRef = React.useRef(undefined);
  const themeForCell = (cell, pos) => {
    var _mangledCols$col;
    const [col, row] = pos;
    return mergeAndRealizeTheme(mergedTheme, (_mangledCols$col = mangledCols[col]) === null || _mangledCols$col === void 0 ? void 0 : _mangledCols$col.themeOverride, getRowThemeOverride === null || getRowThemeOverride === void 0 ? void 0 : getRowThemeOverride(row), cell.themeOverride);
  };
  const {
    mapper
  } = useRowGrouping(rowGrouping, rowsIn);
  const rowGroupingNavBehavior = rowGrouping === null || rowGrouping === void 0 ? void 0 : rowGrouping.navigationBehavior;
  const lastMouseSelectLocation = React.useRef(undefined);
  const handleSelect = args => {
    var _gridSelection$curren2, _gridSelection$curren3;
    const isMultiKey = browserIsOSX.value ? args.metaKey : args.ctrlKey;
    const isMultiRow = isMultiKey && rowSelect === "multi";
    const [col, row] = args.location;
    const selectedColumns = gridSelection.columns;
    const selectedRows = gridSelection.rows;
    const [cellCol, cellRow] = (_gridSelection$curren2 = (_gridSelection$curren3 = gridSelection.current) === null || _gridSelection$curren3 === void 0 ? void 0 : _gridSelection$curren3.cell) !== null && _gridSelection$curren2 !== void 0 ? _gridSelection$curren2 : [];
    if (args.kind === "cell") {
      lastSelectedColRef.current = undefined;
      lastMouseSelectLocation.current = [col, row];
      const checkboxColIndex = showRowNumber ? 1 : 0;
      const isCheckboxCol = col === checkboxColIndex;
      if (isCheckboxCol && hasRowMarkers) {
        if (showTrailingBlankRow === true && row === rows || rowMarkers === "number" || rowSelect === "none") return;
        const markerCell = getMangledCellContent(args.location);
        if (markerCell.kind !== InnerGridCellKind.Marker) {
          return;
        }
        if (markerCell.disabled === true) return;
        if (onRowMoved !== undefined) {
          var _renderer$onClick;
          const renderer = getCellRenderer(markerCell);
          assert((renderer === null || renderer === void 0 ? void 0 : renderer.kind) === InnerGridCellKind.Marker);
          const postClick = renderer === null || renderer === void 0 || (_renderer$onClick = renderer.onClick) === null || _renderer$onClick === void 0 ? void 0 : _renderer$onClick.call(renderer, {
            ...args,
            cell: markerCell,
            posX: args.localEventX,
            posY: args.localEventY,
            bounds: args.bounds,
            theme: themeForCell(markerCell, args.location),
            preventDefault: () => undefined
          });
          if (postClick === undefined || postClick.checked === markerCell.checked) return;
        }
        setOverlay(undefined);
        focus();
        const isSelected = selectedRows.hasIndex(row);
        const lastHighlighted = lastSelectedRowRef.current;
        if (rowSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastHighlighted !== undefined && selectedRows.hasIndex(lastHighlighted)) {
          const newSlice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];
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
        void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col);
      } else {
        if (cellCol !== col || cellRow !== row) {
          var _gridSelection$curren4;
          const cell = getMangledCellContent(args.location);
          const renderer = getCellRenderer(cell);
          if ((renderer === null || renderer === void 0 ? void 0 : renderer.onSelect) !== undefined) {
            let prevented = false;
            renderer.onSelect({
              ...args,
              cell,
              posX: args.localEventX,
              posY: args.localEventY,
              bounds: args.bounds,
              preventDefault: () => prevented = true,
              theme: themeForCell(cell, args.location)
            });
            if (prevented) {
              return;
            }
          }
          if (rowGroupingNavBehavior === "block" && mapper(row).isGroupHeader) {
            return;
          }
          const isLastStickyRow = lastRowSticky && row === rows;
          const startedFromLastSticky = lastRowSticky && gridSelection !== undefined && ((_gridSelection$curren4 = gridSelection.current) === null || _gridSelection$curren4 === void 0 ? void 0 : _gridSelection$curren4.cell[1]) === rows;
          if ((args.shiftKey || args.isLongTouch === true) && cellCol !== undefined && cellRow !== undefined && gridSelection.current !== undefined && !startedFromLastSticky) {
            if (isLastStickyRow) {
              return;
            }
            const left = Math.min(col, cellCol);
            const right = Math.max(col, cellCol);
            const top = Math.min(row, cellRow);
            const bottom = Math.max(row, cellRow);
            setCurrent({
              ...gridSelection.current,
              range: {
                x: left,
                y: top,
                width: right - left + 1,
                height: bottom - top + 1
              }
            }, true, isMultiKey, "click");
            lastSelectedRowRef.current = undefined;
            focus();
          } else {
            const hasRowSelection = gridSelection.rows.length > 0;
            setCurrent({
              cell: [col, row],
              range: {
                x: col,
                y: row,
                width: 1,
                height: 1
              }
            }, true, isMultiKey || hasRowSelection, "click");
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
        if (columnSelect === "multi" && (args.shiftKey || args.isLongTouch === true) && lastCol !== undefined && selectedColumns.hasIndex(lastCol)) {
          const newSlice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];
          if (isMultiKey || args.isTouch || columnSelectionMode === "multi") {
            setSelectedColumns(undefined, newSlice, isMultiKey);
          } else {
            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiKey);
          }
        } else if (columnSelect === "multi" && (isMultiKey || args.isTouch || columnSelectionMode === "multi")) {
          if (selectedColumns.hasIndex(col)) {
            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
          } else {
            setSelectedColumns(undefined, col, isMultiKey);
          }
          lastSelectedColRef.current = col;
        } else if (columnSelect !== "none") {
          if (selectedColumns.hasIndex(col)) {
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
      onSelectionCleared === null || onSelectionCleared === void 0 || onSelectionCleared();
      lastSelectedRowRef.current = undefined;
      lastSelectedColRef.current = undefined;
    }
  };
  const coreState = {
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
    getCellRenderer
  };
  const {
    onMouseDown,
    onMouseUp,
    onMouseMoveImpl,
    normalSizeColumn,
    fillDown,
    fillRight,
    mouseDownData,
    isActivelyDraggingHeader
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
    lastMouseSelectLocation
  });
  const [renameGroup, setRenameGroup] = React.useState();
  const onHeaderMenuClickInner = (col, screenPosition) => {
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col - rowMarkerOffset, screenPosition);
  };
  const onHeaderIndicatorClickInner = (col, screenPosition) => {
    onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col - rowMarkerOffset, screenPosition);
  };
  React.useEffect(() => {
    if (overlay === undefined) return;
    const findScrollableParents = element => {
      const parents = [];
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
    const handleParentScroll = event => {
      const target = event.target;
      if (scrollRef.current && !scrollRef.current.contains(target)) {
        setOverlay(undefined);
      }
    };
    const scrollableParents = [];
    if (scrollRef.current) {
      const parents = findScrollableParents(scrollRef.current);
      scrollableParents.push(...parents);
    }
    scrollableParents.forEach(parent => {
      parent.addEventListener('scroll', handleParentScroll);
    });
    window.addEventListener('scroll', handleParentScroll);
    document.addEventListener('scroll', handleParentScroll, true);
    return () => {
      scrollableParents.forEach(parent => {
        parent.removeEventListener('scroll', handleParentScroll);
      });
      window.removeEventListener('scroll', handleParentScroll);
      document.removeEventListener('scroll', handleParentScroll, true);
    };
  }, [overlay, setOverlay, scrollRef]);
  const currentCell = gridSelection === null || gridSelection === void 0 || (_gridSelection$curren5 = gridSelection.current) === null || _gridSelection$curren5 === void 0 ? void 0 : _gridSelection$curren5.cell;
  const onVisibleRegionChangedImpl = (region, clientWidth, clientHeight, rightElWidth, tx, ty) => {
    hasJustScrolled.current = false;
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
    const freezeRegion = freezeColumns === 0 ? undefined : {
      x: 0,
      y: region.y,
      width: freezeColumns,
      height: region.height
    };
    const freezeRegions = [];
    if (freezeRegion !== undefined) freezeRegions.push(freezeRegion);
    if (freezeTrailingRows > 0) {
      freezeRegions.push({
        x: region.x - rowMarkerOffset,
        y: rows - freezeTrailingRows,
        width: region.width,
        height: freezeTrailingRows
      });
      if (freezeColumns > 0) {
        freezeRegions.push({
          x: 0,
          y: rows - freezeTrailingRows,
          width: freezeColumns,
          height: freezeTrailingRows
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
        freezeRegions
      }
    };
    visibleRegionRef.current = newRegion;
    setVisibleRegion(newRegion);
    setClientSize([clientWidth, clientHeight, rightElWidth]);
    onVisibleRegionChanged === null || onVisibleRegionChanged === void 0 || onVisibleRegionChanged(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
  };
  const onColumnProposeMoveImpl = whenDefined(onColumnProposeMove, (startIndex, endIndex) => {
    return (onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset)) !== false;
  });
  const onColumnMovedImpl = whenDefined(onColumnMoved, (startIndex, endIndex) => {
    onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(startIndex - rowMarkerOffset, endIndex - rowMarkerOffset);
    if (columnSelect !== "none") {
      setSelectedColumns(CompactSelection.fromSingleSelection(endIndex), undefined, true);
    }
  });
  const isActivelyDragging = React.useRef(false);
  const onDragStartImpl = args => {
    if (args.location[0] === 0 && rowMarkerOffset > 0) {
      args.preventDefault();
      return;
    }
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
    if (!args.defaultPrevented()) {
      isActivelyDragging.current = true;
    }
    setMouseState(undefined);
  };
  const onDragEnd = () => {
    isActivelyDragging.current = false;
  };
  const rowGroupingSelectionBehavior = rowGrouping === null || rowGrouping === void 0 ? void 0 : rowGrouping.selectionBehavior;
  const getSelectionRowLimits = selectedRow => {
    if (rowGroupingSelectionBehavior !== "block-spanning") return undefined;
    const {
      isGroupHeader,
      path,
      groupRows
    } = mapper(selectedRow);
    if (isGroupHeader) {
      return [selectedRow, selectedRow];
    }
    const groupRowIndex = path[path.length - 1];
    const lowerBounds = selectedRow - groupRowIndex;
    const upperBounds = selectedRow + groupRows - groupRowIndex - 1;
    return [lowerBounds, upperBounds];
  };
  const hoveredRef = React.useRef(undefined);
  const onItemHoveredImpl = args => {
    var _mouseDownData$curren, _mouseDownData$curren2;
    if (mouseEventArgsAreEqual(args, hoveredRef.current)) return;
    hoveredRef.current = args;
    if ((mouseDownData === null || mouseDownData === void 0 || (_mouseDownData$curren = mouseDownData.current) === null || _mouseDownData$curren === void 0 ? void 0 : _mouseDownData$curren.button) !== undefined && mouseDownData.current.button >= 1) return;
    if (args.buttons !== 0 && mouseState !== undefined && ((_mouseDownData$curren2 = mouseDownData.current) === null || _mouseDownData$curren2 === void 0 ? void 0 : _mouseDownData$curren2.location[0]) === 0 && rowMarkerOffset === 1 && rowSelect === "multi" && mouseState.previousSelection && !mouseState.previousSelection.rows.hasIndex(mouseDownData.current.location[1]) && gridSelection.rows.hasIndex(mouseDownData.current.location[1])) {
      const start = Math.min(mouseDownData.current.location[1], args.location[1]);
      const end = Math.max(mouseDownData.current.location[1], args.location[1]) + 1;
      setSelectedRows(CompactSelection.fromSingleSelection([start, end]), undefined, false);
    } else if (args.buttons !== 0 && mouseState !== undefined && gridSelection.current !== undefined && !isActivelyDragging.current && !isActivelyDraggingHeader.current && (rangeSelect === "rect" || rangeSelect === "multi-rect")) {
      var _mouseState$previousS;
      const [selectedCol, selectedRow] = gridSelection.current.cell;
      let [col, row] = args.location;
      if (row < 0) {
        row = visibleRegionRef.current.y;
      }
      if (mouseState.fillHandle === true && ((_mouseState$previousS = mouseState.previousSelection) === null || _mouseState$previousS === void 0 ? void 0 : _mouseState$previousS.current) !== undefined) {
        const prevRange = mouseState.previousSelection.current.range;
        row = Math.min(row, showTrailingBlankRow ? rows - 1 : rows);
        const rect = getClosestRect(prevRange, col, row, allowedFillDirections);
        setFillHighlightRegion(rect);
      } else {
        const startedFromLastStickyRow = showTrailingBlankRow && selectedRow === rows;
        if (startedFromLastStickyRow) return;
        const landedOnLastStickyRow = showTrailingBlankRow && row === rows;
        if (landedOnLastStickyRow) {
          if (args.kind === outOfBoundsKind) row--;else return;
        }
        col = Math.max(col, rowMarkerOffset);
        const clampLimits = getSelectionRowLimits(selectedRow);
        row = clampLimits === undefined ? row : clamp(row, clampLimits[0], clampLimits[1]);
        const deltaX = col - selectedCol;
        const deltaY = row - selectedRow;
        const newRange = {
          x: deltaX >= 0 ? selectedCol : col,
          y: deltaY >= 0 ? selectedRow : row,
          width: Math.abs(deltaX) + 1,
          height: Math.abs(deltaY) + 1
        };
        setCurrent({
          ...gridSelection.current,
          range: newRange
        }, true, false, "drag");
      }
    }
    onItemHovered === null || onItemHovered === void 0 || onItemHovered({
      ...args,
      location: [args.location[0] - rowMarkerOffset, args.location[1]]
    });
  };
  const adjustSelectionOnScroll = () => {
    const args = hoveredRef.current;
    if (args === undefined) return;
    const [xDir, yDir] = args.scrollEdge;
    let [col, row] = args.location;
    const visible = visibleRegionRef.current;
    if (xDir === -1) {
      var _visible$extras$freez, _visible$extras;
      col = (_visible$extras$freez = (_visible$extras = visible.extras) === null || _visible$extras === void 0 || (_visible$extras = _visible$extras.freezeRegion) === null || _visible$extras === void 0 ? void 0 : _visible$extras.x) !== null && _visible$extras$freez !== void 0 ? _visible$extras$freez : visible.x;
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
      location: [col, row]
    });
  };
  useAutoscroll(scrollDir, scrollRef, adjustSelectionOnScroll);
  const adjustSelection = direction => {
    var _getSelectionRowLimit;
    if (gridSelection.current === undefined) return;
    const [x, y] = direction;
    const [col, row] = gridSelection.current.cell;
    const old = gridSelection.current.range;
    let left = old.x;
    let right = old.x + old.width;
    let top = old.y;
    let bottom = old.y + old.height;
    const [minRow, maxRowRaw] = (_getSelectionRowLimit = getSelectionRowLimits(row)) !== null && _getSelectionRowLimit !== void 0 ? _getSelectionRowLimit : [0, rows - 1];
    const maxRow = maxRowRaw + 1;
    if (y !== 0) {
      switch (y) {
        case 2:
          {
            bottom = maxRow;
            top = row;
            scrollTo(0, bottom, "vertical");
            break;
          }
        case -2:
          {
            top = minRow;
            bottom = row + 1;
            scrollTo(0, top, "vertical");
            break;
          }
        case 1:
          {
            if (top < row) {
              top++;
              scrollTo(0, top, "vertical");
            } else {
              bottom = Math.min(maxRow, bottom + 1);
              scrollTo(0, bottom, "vertical");
            }
            break;
          }
        case -1:
          {
            if (bottom > row + 1) {
              bottom--;
              scrollTo(0, bottom, "vertical");
            } else {
              top = Math.max(minRow, top - 1);
              scrollTo(0, top, "vertical");
            }
            break;
          }
        default:
          {
            assertNever(y);
          }
      }
    }
    if (x !== 0) {
      if (x === 2) {
        right = mangledCols.length;
        left = col;
        scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
      } else if (x === -2) {
        left = rowMarkerOffset;
        right = col + 1;
        scrollTo(left - rowMarkerOffset, 0, "horizontal");
      } else {
        let disallowed = [];
        if (getCellsForSelection !== undefined) {
          const cells = getCellsForSelection({
            x: left,
            y: top,
            width: right - left - rowMarkerOffset,
            height: bottom - top
          }, abortControllerRef.current.signal);
          if (typeof cells === "object") {
            disallowed = getSpanStops(cells);
          }
        }
        if (x === 1) {
          let done = false;
          if (left < col) {
            if (disallowed.length > 0) {
              const target = range(left + 1, col + 1).find(n => !disallowed.includes(n - rowMarkerOffset));
              if (target !== undefined) {
                left = target;
                done = true;
              }
            } else {
              left++;
              done = true;
            }
            if (done) scrollTo(left, 0, "horizontal");
          }
          if (!done) {
            right = Math.min(mangledCols.length, right + 1);
            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
          }
        } else if (x === -1) {
          let done = false;
          if (right > col + 1) {
            if (disallowed.length > 0) {
              const target = range(right - 1, col, -1).find(n => !disallowed.includes(n - rowMarkerOffset));
              if (target !== undefined) {
                right = target;
                done = true;
              }
            } else {
              right--;
              done = true;
            }
            if (done) scrollTo(right - rowMarkerOffset, 0, "horizontal");
          }
          if (!done) {
            left = Math.max(rowMarkerOffset, left - 1);
            scrollTo(left - rowMarkerOffset, 0, "horizontal");
          }
        } else {
          assertNever(x);
        }
      }
    }
    setCurrent({
      cell: gridSelection.current.cell,
      range: {
        x: left,
        y: top,
        width: right - left,
        height: bottom - top
      }
    }, true, false, "keyboard-select");
  };
  const scrollToActiveCellRef = React.useRef(scrollToActiveCell);
  scrollToActiveCellRef.current = scrollToActiveCell;
  const updateSelectedCell = (col, row, fromEditingTrailingRow, freeMove) => {
    const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
    col = clamp(col, rowMarkerOffset, columns.length - 1 + rowMarkerOffset);
    row = clamp(row, 0, rowMax);
    const curCol = currentCell === null || currentCell === void 0 ? void 0 : currentCell[0];
    const curRow = currentCell === null || currentCell === void 0 ? void 0 : currentCell[1];
    if (col === curCol && row === curRow) return false;
    if (freeMove && gridSelection.current !== undefined) {
      const newStack = [...gridSelection.current.rangeStack];
      if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
        newStack.push(gridSelection.current.range);
      }
      setGridSelection({
        ...gridSelection,
        current: {
          cell: [col, row],
          range: {
            x: col,
            y: row,
            width: 1,
            height: 1
          },
          rangeStack: newStack
        }
      }, true);
    } else {
      setCurrent({
        cell: [col, row],
        range: {
          x: col,
          y: row,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-nav");
    }
    if (lastSent.current !== undefined && lastSent.current[0] === col && lastSent.current[1] === row) {
      lastSent.current = undefined;
    }
    if (scrollToActiveCellRef.current) {
      const paddingY = 20;
      scrollTo(col - rowMarkerOffset, row, "both", 0, paddingY);
    }
    return true;
  };
  const onFinishEditing = (newValue, movement) => {
    var _ghostInputRef$curren9, _ghostInputRef$curren0, _currentOverlay$conte, _ghostInputRef$curren1, _ghostInputRef$curren10;
    const currentOverlay = overlayRef.current;
    const isGhostMode = ghostInputVisibleRef.current;
    let finalValue = newValue;
    const ghostText = (_ghostInputRef$curren9 = (_ghostInputRef$curren0 = ghostInputRef.current) === null || _ghostInputRef$curren0 === void 0 ? void 0 : _ghostInputRef$curren0.getValue()) !== null && _ghostInputRef$curren9 !== void 0 ? _ghostInputRef$curren9 : "";
    const isCustomCell = (currentOverlay === null || currentOverlay === void 0 || (_currentOverlay$conte = currentOverlay.content) === null || _currentOverlay$conte === void 0 ? void 0 : _currentOverlay$conte.kind) === GridCellKind.Custom;
    if ((currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.cell) !== undefined && ghostText.length > 0 && currentOverlay.content !== undefined && !isCustomCell) {
      const cellContent = currentOverlay.content;
      if (cellContent.kind === GridCellKind.Text) {
        finalValue = {
          ...cellContent,
          data: ghostText,
          displayData: ghostText
        };
      } else if (cellContent.kind === GridCellKind.Number) {
        const num = Number.parseFloat(ghostText);
        const numVal = Number.isNaN(num) ? 0 : num;
        finalValue = {
          ...cellContent,
          data: numVal,
          displayData: numVal.toLocaleString()
        };
      } else if (cellContent.kind === GridCellKind.Uri) {
        finalValue = {
          ...cellContent,
          data: ghostText,
          displayData: ghostText
        };
      } else if (cellContent.kind === GridCellKind.Markdown) {
        finalValue = {
          ...cellContent,
          data: ghostText
        };
      }
    } else if (isCustomCell) {
      finalValue = newValue;
    }
    if (finalValue !== undefined && ghostText.length === 0) {
      if (finalValue.kind === GridCellKind.Text && finalValue.data !== finalValue.displayData) {
        finalValue = {
          ...finalValue,
          displayData: finalValue.data
        };
      } else if (finalValue.kind === GridCellKind.Number) {
        const formatted = finalValue.data !== undefined ? finalValue.data.toLocaleString() : "0";
        if (finalValue.displayData !== formatted) {
          finalValue = {
            ...finalValue,
            displayData: formatted
          };
        }
      } else if (finalValue.kind === GridCellKind.Uri && finalValue.data !== finalValue.displayData) {
        finalValue = {
          ...finalValue,
          displayData: finalValue.data
        };
      }
    }
    const originalContent = currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.content;
    const hasValueChanged = () => {
      if (finalValue === undefined || originalContent === undefined) return false;
      if (finalValue.kind !== originalContent.kind) return true;
      switch (finalValue.kind) {
        case GridCellKind.Text:
        case GridCellKind.Uri:
        case GridCellKind.Markdown:
          return finalValue.data !== originalContent.data;
        case GridCellKind.Number:
          return finalValue.data !== originalContent.data;
        case GridCellKind.Boolean:
          return finalValue.data !== originalContent.data;
        default:
          return true;
      }
    };
    if ((currentOverlay === null || currentOverlay === void 0 ? void 0 : currentOverlay.cell) !== undefined && finalValue !== undefined && isEditableGridCell(finalValue) && hasValueChanged()) {
      mangledOnCellsEdited([{
        location: currentOverlay.cell,
        value: finalValue
      }]);
      window.requestAnimationFrame(() => {
        var _gridRef$current3;
        (_gridRef$current3 = gridRef.current) === null || _gridRef$current3 === void 0 || _gridRef$current3.damage([{
          cell: currentOverlay.cell
        }]);
      });
    }
    (_ghostInputRef$curren1 = ghostInputRef.current) === null || _ghostInputRef$curren1 === void 0 || _ghostInputRef$curren1.clear();
    (_ghostInputRef$curren10 = ghostInputRef.current) === null || _ghostInputRef$curren10 === void 0 || _ghostInputRef$curren10.setVisible(false);
    setGhostInputVisible(false);
    focus(true);
    overlayRef.current = undefined;
    setOverlay(undefined);
    const [movX, movY] = movement;
    if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
      const isEditingLastRow = gridSelection.current.cell[1] === mangledRows - 1;
      if (isEditingLastRow && movY === 1) {
        onFinishedEditing === null || onFinishedEditing === void 0 || onFinishedEditing(newValue, [0, 0]);
        return;
      }
      const isEditingLastCol = gridSelection.current.cell[0] === mangledCols.length - 1 && newValue !== undefined;
      let updateSelected = true;
      if (isEditingLastRow && movY === 1 && onRowAppended !== undefined) {
        updateSelected = false;
        const col = gridSelection.current.cell[0] + movX;
        const customTargetColumn = getCustomNewRowTargetColumn(col);
        void appendRow(customTargetColumn !== null && customTargetColumn !== void 0 ? customTargetColumn : col, false);
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
        window.requestAnimationFrame(() => {
          var _ghostInputRef$curren11;
          (_ghostInputRef$curren11 = ghostInputRef.current) === null || _ghostInputRef$curren11 === void 0 || _ghostInputRef$curren11.focus();
        });
      }
    }
    onFinishedEditing === null || onFinishedEditing === void 0 || onFinishedEditing(newValue, movement);
  };
  const [overlayID] = React.useState(() => `gdg-overlay-${idCounter++}`);
  const deleteRange = r => {
    var _gridRef$current4;
    focus();
    const editList = [];
    for (let x = r.x; x < r.x + r.width; x++) {
      for (let y = r.y; y < r.y + r.height; y++) {
        const cellValue = getCellContent([x - rowMarkerOffset, y]);
        if (!cellValue.allowOverlay && cellValue.kind !== GridCellKind.Boolean) continue;
        let newVal = undefined;
        if (cellValue.kind === GridCellKind.Custom) {
          var _toDelete$provideEdit;
          const toDelete = getCellRenderer(cellValue);
          const editor = toDelete === null || toDelete === void 0 || (_toDelete$provideEdit = toDelete.provideEditor) === null || _toDelete$provideEdit === void 0 ? void 0 : _toDelete$provideEdit.call(toDelete, {
            ...cellValue,
            location: [x - rowMarkerOffset, y]
          });
          if ((toDelete === null || toDelete === void 0 ? void 0 : toDelete.onDelete) !== undefined) {
            newVal = toDelete.onDelete(cellValue);
          } else if (isObjectEditorCallbackResult(editor)) {
            var _editor$deletedValue;
            newVal = editor === null || editor === void 0 || (_editor$deletedValue = editor.deletedValue) === null || _editor$deletedValue === void 0 ? void 0 : _editor$deletedValue.call(editor, cellValue);
          }
        } else if (isEditableGridCell(cellValue) && cellValue.allowOverlay || cellValue.kind === GridCellKind.Boolean) {
          var _toDelete$onDelete;
          const toDelete = getCellRenderer(cellValue);
          newVal = toDelete === null || toDelete === void 0 || (_toDelete$onDelete = toDelete.onDelete) === null || _toDelete$onDelete === void 0 ? void 0 : _toDelete$onDelete.call(toDelete, cellValue);
        }
        if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
          editList.push({
            location: [x, y],
            value: newVal
          });
        }
      }
    }
    mangledOnCellsEdited(editList);
    (_gridRef$current4 = gridRef.current) === null || _gridRef$current4 === void 0 || _gridRef$current4.damage(editList.map(x => ({
      cell: x.location
    })));
  };
  const overlayOpen = overlay !== undefined;
  const {
    onKeyDown
  } = useKeyboardHandlers({
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
    setShowSearchInner,
    searchInputRef,
    adjustSelection,
    updateSelectedCell,
    deleteRange,
    fillDown,
    fillRight,
    appendRow,
    getCustomNewRowTargetColumn,
    scrollToRef
  });
  const [isFocused, setIsFocused] = React.useState(false);
  const setIsFocusedDebounced = React.useRef(debounce(val => {
    setIsFocused(val);
  }, 5));
  const {
    onGhostInput,
    onGhostCompositionStart,
    onGhostCompositionEnd,
    onGhostKeyDown,
    onGhostKeyUp,
    onGhostFocus,
    onGhostBlur
  } = useGhostInput({
    state: coreState,
    onKeyDown,
    onFinishEditing,
    onKeyUpIn,
    onCellActivated,
    setIsFocused
  });
  const onContextMenu = (args, preventDefault) => {
    const adjustedCol = args.location[0] - rowMarkerOffset;
    if (args.kind === "header") {
      onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === groupHeaderKind) {
      if (adjustedCol < 0) {
        return;
      }
      onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(adjustedCol, {
        ...args,
        preventDefault
      });
    }
    if (args.kind === "cell") {
      const [col, row] = args.location;
      onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([adjustedCol, row], {
        ...args,
        preventDefault
      });
      if (!gridSelectionHasItem(gridSelection, args.location)) {
        updateSelectedCell(col, row, false, false);
      }
    }
  };
  const {
    onCopy,
    onPasteInternal
  } = useClipboard({
    state: coreState,
    keybindings,
    getCellsForSelection,
    coercePasteValue,
    onPaste,
    copyHeaders,
    columnsIn,
    onDelete,
    deleteRange,
    safeWindow
  });
  const onSearchResultsChanged = (results, navIndex) => {
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
  };
  const [outCol, outRow] = (_gridSelectionOuter$c = gridSelectionOuter === null || gridSelectionOuter === void 0 || (_gridSelectionOuter$c2 = gridSelectionOuter.current) === null || _gridSelectionOuter$c2 === void 0 ? void 0 : _gridSelectionOuter$c2.cell) !== null && _gridSelectionOuter$c !== void 0 ? _gridSelectionOuter$c : [];
  React.useLayoutEffect(() => {
    var _expectedExternalGrid, _expectedExternalGrid2;
    if (scrollToActiveCellRef.current && !hasJustScrolled.current && outCol !== undefined && outRow !== undefined && (outCol !== ((_expectedExternalGrid = expectedExternalGridSelection.current) === null || _expectedExternalGrid === void 0 || (_expectedExternalGrid = _expectedExternalGrid.current) === null || _expectedExternalGrid === void 0 ? void 0 : _expectedExternalGrid.cell[0]) || outRow !== ((_expectedExternalGrid2 = expectedExternalGridSelection.current) === null || _expectedExternalGrid2 === void 0 || (_expectedExternalGrid2 = _expectedExternalGrid2.current) === null || _expectedExternalGrid2 === void 0 ? void 0 : _expectedExternalGrid2.cell[1]))) {
      scrollToRef.current(outCol, outRow);
    }
    hasJustScrolled.current = false;
  }, [outCol, outRow]);
  const selectionOutOfBounds = gridSelection.current !== undefined && (gridSelection.current.cell[0] >= mangledCols.length || gridSelection.current.cell[1] >= mangledRows);
  React.useLayoutEffect(() => {
    if (selectionOutOfBounds) {
      setGridSelection(emptyGridSelection, false);
    }
  }, [selectionOutOfBounds, setGridSelection]);
  const disabledRows = showTrailingBlankRow === true && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.tint) === true ? CompactSelection.fromSingleSelection(mangledRows - 1) : CompactSelection.empty();
  const mangledVerticalBorder = col => {
    var _verticalBorder;
    return typeof verticalBorder === "boolean" ? verticalBorder : (_verticalBorder = verticalBorder === null || verticalBorder === void 0 ? void 0 : verticalBorder(col - rowMarkerOffset)) !== null && _verticalBorder !== void 0 ? _verticalBorder : true;
  };
  const renameGroupNode = renameGroup === undefined || canvasRef.current === null ? null : (React.createElement(GroupRename, {
    bounds: renameGroup.bounds,
    group: renameGroup.group,
    canvasBounds: canvasRef.current.getBoundingClientRect(),
    onClose: () => setRenameGroup(undefined),
    onFinish: newVal => {
      setRenameGroup(undefined);
      onGroupHeaderRenamed === null || onGroupHeaderRenamed === void 0 || onGroupHeaderRenamed(renameGroup.group, newVal);
    }
  }));
  const mangledFreezeColumns = Math.min(mangledCols.length, freezeColumns + rowMarkerOffset);
  React.useImperativeHandle(forwardedRef, () => ({
    appendRow: (col, openOverlay) => appendRow(col + rowMarkerOffset, openOverlay),
    appendColumn: (row, openOverlay) => appendColumn(row, openOverlay),
    updateCells: damageList => {
      var _gridRef$current5;
      if (rowMarkerOffset !== 0) {
        damageList = damageList.map(x => ({
          cell: [x.cell[0] + rowMarkerOffset, x.cell[1]]
        }));
      }
      return (_gridRef$current5 = gridRef.current) === null || _gridRef$current5 === void 0 ? void 0 : _gridRef$current5.damage(damageList);
    },
    getBounds: (col, row) => {
      var _gridRef$current6;
      if ((canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current) === null || (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current) === null) {
        return undefined;
      }
      if (col === undefined && row === undefined) {
        const rect = canvasRef.current.getBoundingClientRect();
        const scale = rect.width / scrollRef.current.clientWidth;
        return {
          x: rect.x - scrollRef.current.scrollLeft * scale,
          y: rect.y - scrollRef.current.scrollTop * scale,
          width: scrollRef.current.scrollWidth * scale,
          height: scrollRef.current.scrollHeight * scale
        };
      }
      return (_gridRef$current6 = gridRef.current) === null || _gridRef$current6 === void 0 ? void 0 : _gridRef$current6.getBounds((col !== null && col !== void 0 ? col : 0) + rowMarkerOffset, row);
    },
    focus: () => {
      var _gridRef$current7;
      return (_gridRef$current7 = gridRef.current) === null || _gridRef$current7 === void 0 ? void 0 : _gridRef$current7.focus();
    },
    emit: async e => {
      switch (e) {
        case "delete":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: false,
            key: "Delete",
            keyCode: 46,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "fill-right":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: true,
            key: "r",
            keyCode: 82,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "fill-down":
          onKeyDown({
            bounds: undefined,
            cancel: () => undefined,
            stopPropagation: () => undefined,
            preventDefault: () => undefined,
            ctrlKey: true,
            key: "d",
            keyCode: 68,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: undefined
          });
          break;
        case "copy":
          await onCopy(undefined, true);
          break;
        case "paste":
          await onPasteInternal();
          break;
      }
    },
    scrollTo,
    remeasureColumns: cols => {
      for (const col of cols) {
        void normalSizeColumn(col + rowMarkerOffset);
      }
    },
    getMouseArgsForPosition: (posX, posY, ev) => {
      if ((gridRef === null || gridRef === void 0 ? void 0 : gridRef.current) === null) {
        return undefined;
      }
      const args = gridRef.current.getMouseArgsForPosition(posX, posY, ev);
      if (args === undefined) {
        return undefined;
      }
      return {
        ...args,
        location: [args.location[0] - rowMarkerOffset, args.location[1]]
      };
    }
  }), [appendRow, appendColumn, normalSizeColumn, scrollRef, onCopy, onKeyDown, onPasteInternal, rowMarkerOffset, scrollTo]);
  const [selCol, selRow] = currentCell !== null && currentCell !== void 0 ? currentCell : [];
  const onCellFocused = cell => {
    const [col, row] = cell;
    if (row === -1) {
      if (columnSelect !== "none") {
        setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, false);
        focus();
      }
      return;
    }
    if (selCol === col && selRow === row) return;
    setCurrent({
      cell,
      range: {
        x: col,
        y: row,
        width: 1,
        height: 1
      }
    }, true, false, "keyboard-nav");
    scrollTo(col, row);
  };
  const onCanvasFocused = () => {
    setIsFocusedDebounced.current(true);
    if (gridSelection.current === undefined && gridSelection.columns.length === 0 && gridSelection.rows.length === 0 && mouseState === undefined) {
      setCurrent({
        cell: [rowMarkerOffset, cellYOffset],
        range: {
          x: rowMarkerOffset,
          y: cellYOffset,
          width: 1,
          height: 1
        }
      }, true, false, "keyboard-select");
    }
  };
  const onFocusOut = () => {
    setIsFocusedDebounced.current(false);
  };
  const [idealWidth, idealHeight] = (_experimental$scrollb => {
    let h;
    const scrollbarWidth = (_experimental$scrollb = experimental === null || experimental === void 0 ? void 0 : experimental.scrollbarWidthOverride) !== null && _experimental$scrollb !== void 0 ? _experimental$scrollb : getScrollBarWidth();
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
    return [`${Math.min(100000, w)}px`, `${Math.min(100000, h)}px`];
  })();
  const cssStyle = makeCSSStyle(mergedTheme);
  return React.createElement(ThemeContext.Provider, {
    value: mergedTheme
  }, React.createElement(DataEditorContainer, {
    style: cssStyle,
    className: className,
    inWidth: width !== null && width !== void 0 ? width : idealWidth,
    inHeight: height !== null && height !== void 0 ? height : idealHeight
  }, React.createElement(DataGridSearch, {
    fillHandle: fillHandle,
    drawFocusRing: drawFocusRing,
    experimental: experimental,
    fixedShadowX: fixedShadowX,
    fixedShadowY: fixedShadowY,
    getRowThemeOverride: getRowThemeOverride,
    headerIcons: headerIcons,
    imageWindowLoader: imageWindowLoader,
    initialSize: initialSize,
    isDraggable: isDraggable,
    onDragLeave: onDragLeave,
    onRowMoved: onRowMoved,
    overscrollX: overscrollX,
    overscrollY: overscrollY,
    preventDiagonalScrolling: preventDiagonalScrolling,
    rightElement: rightElement,
    rightElementProps: rightElementProps,
    smoothScrollX: smoothScrollX,
    smoothScrollY: smoothScrollY,
    className: className,
    enableGroups: enableGroups,
    onCanvasFocused: onCanvasFocused,
    onCanvasBlur: onFocusOut,
    canvasRef: canvasRef,
    onContextMenu: onContextMenu,
    theme: mergedTheme,
    cellXOffset: cellXOffset,
    cellYOffset: cellYOffset,
    accessibilityHeight: visibleRegion.height,
    onDragEnd: onDragEnd,
    columns: mangledCols,
    nonGrowWidth: nonGrowWidth,
    drawHeader: drawHeader,
    onColumnProposeMove: onColumnProposeMoveImpl,
    drawCell: drawCell,
    disabledRows: disabledRows,
    freezeColumns: mangledFreezeColumns,
    lockColumns: rowMarkerOffset,
    firstColAccessible: rowMarkerOffset === 0,
    getCellContent: getMangledCellContent,
    minColumnWidth: minColumnWidth,
    maxColumnWidth: maxColumnWidth,
    searchInputRef: searchInputRef,
    showSearch: showSearch,
    onSearchClose: onSearchClose,
    highlightRegions: highlightRegions,
    getCellsForSelection: getCellsForSelection,
    getGroupDetails: mangledGetGroupDetails,
    headerHeight: headerHeight,
    isFocused: isFocused,
    groupHeaderHeight: enableGroups ? groupHeaderHeight : 0,
    groupLevels: groupLevels,
    groupHeaderHeights: groupHeaderHeights,
    freezeTrailingRows: freezeTrailingRows + (showTrailingBlankRow && (trailingRowOptions === null || trailingRowOptions === void 0 ? void 0 : trailingRowOptions.sticky) === true ? 1 : 0),
    hasAppendRow: showTrailingBlankRow,
    onColumnResize: onColumnResize,
    onColumnResizeEnd: onColumnResizeEnd,
    onColumnResizeStart: onColumnResizeStart,
    onCellFocused: onCellFocused,
    onColumnMoved: onColumnMovedImpl,
    onDragStart: onDragStartImpl,
    onHeaderMenuClick: onHeaderMenuClickInner,
    onHeaderIndicatorClick: onHeaderIndicatorClickInner,
    onItemHovered: onItemHoveredImpl,
    isFilling: (mouseState === null || mouseState === void 0 ? void 0 : mouseState.fillHandle) === true,
    onMouseMove: onMouseMoveImpl,
    onKeyDown: onKeyDown,
    onKeyUp: onKeyUpIn,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onDragOverCell: onDragOverCell,
    onDrop: onDrop,
    onSearchResultsChanged: onSearchResultsChanged,
    onVisibleRegionChanged: onVisibleRegionChangedImpl,
    clientSize: clientSize,
    rowHeight: rowHeight,
    searchResults: searchResults,
    searchValue: searchValue,
    onSearchValueChange: onSearchValueChange,
    rows: mangledRows,
    scrollRef: scrollRef,
    selection: gridSelection,
    translateX: visibleRegion.tx,
    translateY: visibleRegion.ty,
    verticalBorder: mangledVerticalBorder,
    gridRef: gridRef,
    getCellRenderer: getCellRenderer,
    resizeIndicator: resizeIndicator
  }), renameGroupNode, overlay !== undefined && (React.createElement(React.Suspense, {
    fallback: null
  }, React.createElement(DataGridOverlayEditor, {
    ...overlay,
    validateCell: validateCell,
    bloom: editorBloom,
    id: overlayID,
    getCellRenderer: getCellRenderer,
    className: (experimental === null || experimental === void 0 ? void 0 : experimental.isSubGrid) === true ? "click-outside-ignore" : undefined,
    provideEditor: provideEditor,
    imageEditorOverride: imageEditorOverride,
    portalElementRef: portalElementRef,
    onFinishEditing: onFinishEditing,
    markdownDivCreateNode: markdownDivCreateNode,
    isOutsideClick: isOutsideClick,
    customEventTarget: experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget,
    isGhostMode: ghostInputVisible
  })))), (_portalElementRef$cur => {
    const portalElement = (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal");
    if (portalElement === null) return null;
    return createPortal(React.createElement(GhostInput, {
      ref: ghostInputRef,
      onInput: onGhostInput,
      onCompositionStart: onGhostCompositionStart,
      onCompositionEnd: onGhostCompositionEnd,
      onKeyDown: onGhostKeyDown,
      onKeyUp: onGhostKeyUp,
      onFocus: onGhostFocus,
      onBlur: onGhostBlur
    }), portalElement);
  })());
};
export const DataEditor = React.forwardRef(DataEditorImpl);
//# sourceMappingURL=data-editor.js.map