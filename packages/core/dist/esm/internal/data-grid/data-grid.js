import * as React from "react";
import { computeBounds, getColumnIndexForX, getEffectiveColumns, getRowIndexForY, getStickyWidth, rectBottomRight, useMappedColumns, getGroupName } from "./render/data-grid-lib.js";
import { GridCellKind, InnerGridCellKind, CompactSelection, isReadWriteCell, isInnerOnlyCell, booleanCellIsEditable, DEFAULT_FILL_HANDLE } from "./data-grid-types.js";
import { CellSet } from "./cell-set.js";
import { SpriteManager } from "./data-grid-sprites.js";
import { direction, getScrollBarWidth, useDebouncedMemo, useEventListener } from "../../common/utils.js";
import clamp from "lodash/clamp.js";
import makeRange from "lodash/range.js";
import { drawGrid } from "./render/data-grid-render.js";
import "./render/data-grid-render.blit.js";
import { AnimationManager } from "./animation-manager.js";
import { RenderStateProvider, packColRowToNumber } from "../../common/render-state-provider.js";
import { browserIsFirefox, browserIsSafari } from "../../common/browser-detect.js";
import { useAnimationQueue } from "./use-animation-queue.js";
import { assert } from "../../common/support.js";
import { OutOfBoundsRegionAxis, outOfBoundsKind, groupHeaderKind, headerKind, mouseEventArgsAreEqual } from "./event-args.js";
import { pointInRect } from "../../common/math.js";
import { drawCell } from "./render/data-grid-render.cells.js";
import { getActionBoundsForGroup, drawHeader, computeHeaderLayout } from "./render/data-grid-render.header.js";
const getRowData = (cell, getCellRenderer) => {
  var _r$getAccessibilitySt;
  if (cell.kind === GridCellKind.Custom) return cell.copyData;
  const r = getCellRenderer === null || getCellRenderer === void 0 ? void 0 : getCellRenderer(cell);
  return (_r$getAccessibilitySt = r === null || r === void 0 ? void 0 : r.getAccessibilityString(cell)) !== null && _r$getAccessibilitySt !== void 0 ? _r$getAccessibilitySt : "";
};
const DataGrid = (p, forwardedRef) => {
  var _p$translateX, _p$translateY, _experimental$eventTa, _experimental$enableF, _experimental$enableS, _eventTargetRef$curre, _eventTargetRef$curre2, _eventTargetRef$curre3, _eventTargetRef$curre4, _eventTargetRef$curre5, _eventTargetRef$curre6;
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
    resizeIndicator = "full"
  } = p;
  const translateX = (_p$translateX = p.translateX) !== null && _p$translateX !== void 0 ? _p$translateX : 0;
  const translateY = (_p$translateY = p.translateY) !== null && _p$translateY !== void 0 ? _p$translateY : 0;
  const cellXOffset = Math.max(freezeColumns, Math.min(columns.length - 1, cellXOffsetReal));
  const ref = React.useRef(null);
  const windowEventTargetRef = React.useRef((_experimental$eventTa = experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget) !== null && _experimental$eventTa !== void 0 ? _experimental$eventTa : window);
  const windowEventTarget = windowEventTargetRef.current;
  const imageLoader = imageWindowLoader;
  const damageRegion = React.useRef();
  const [scrolling, setScrolling] = React.useState(false);
  const hoverValues = React.useRef([]);
  const lastBlitData = React.useRef();
  const [hoveredItemInfo, setHoveredItemInfo] = React.useState();
  const [hoveredOnEdge, setHoveredOnEdge] = React.useState();
  const overlayRef = React.useRef(null);
  const [drawCursorOverride, setDrawCursorOverride] = React.useState();
  const [lastWasTouch, setLastWasTouch] = React.useState(false);
  const lastWasTouchRef = React.useRef(lastWasTouch);
  lastWasTouchRef.current = lastWasTouch;
  const spriteManager = React.useMemo(() => new SpriteManager(headerIcons, () => {
    lastArgsRef.current = undefined;
    lastDrawRef.current();
  }), [headerIcons]);
  const totalGroupHeaderHeight = enableGroups ? groupHeaderHeights.reduce((a, b) => a + b, 0) : 0;
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  const scrollingStopRef = React.useRef(-1);
  const enableFirefoxRescaling = ((_experimental$enableF = experimental === null || experimental === void 0 ? void 0 : experimental.enableFirefoxRescaling) !== null && _experimental$enableF !== void 0 ? _experimental$enableF : false) && browserIsFirefox.value;
  const enableSafariRescaling = ((_experimental$enableS = experimental === null || experimental === void 0 ? void 0 : experimental.enableSafariRescaling) !== null && _experimental$enableS !== void 0 ? _experimental$enableS : false) && browserIsSafari.value;
  React.useLayoutEffect(() => {
    if (window.devicePixelRatio === 1 || !enableFirefoxRescaling && !enableSafariRescaling) return;
    if (scrollingStopRef.current !== -1) {
      setScrolling(true);
    }
    window.clearTimeout(scrollingStopRef.current);
    scrollingStopRef.current = window.setTimeout(() => {
      setScrolling(false);
      scrollingStopRef.current = -1;
    }, 200);
  }, [cellYOffset, cellXOffset, translateX, translateY, enableFirefoxRescaling, enableSafariRescaling]);
  const mappedColumns = useMappedColumns(columns, freezeColumns);
  const stickyX = React.useMemo(() => fixedShadowX ? getStickyWidth(mappedColumns, dragAndDropState) : 0, [mappedColumns, dragAndDropState, fixedShadowX]);
  const getBoundsForItem = React.useCallback((canvas, col, row) => {
    const rect = canvas.getBoundingClientRect();
    if (col >= mappedColumns.length || row >= rows) {
      return undefined;
    }
    const scale = rect.width / width;
    const result = computeBounds(col, row, width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights);
    if (scale !== 1) {
      result.x *= scale;
      result.y *= scale;
      result.width *= scale;
      result.height *= scale;
    }
    result.x += rect.x;
    result.y += rect.y;
    return result;
  }, [width, height, groupHeaderHeight, totalHeaderHeight, cellXOffset, cellYOffset, translateX, translateY, rows, freezeColumns, freezeTrailingRows, mappedColumns, rowHeight, groupLevels, groupHeaderHeights]);
  const getMouseArgsForPosition = React.useCallback((canvas_0, posX, posY, ev) => {
    const rect_0 = canvas_0.getBoundingClientRect();
    const scale_0 = rect_0.width / width;
    const x = (posX - rect_0.left) / scale_0;
    const y = (posY - rect_0.top) / scale_0;
    const edgeDetectionBuffer = 5;
    const effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, undefined, translateX);
    let button = 0;
    let buttons = 0;
    const isMouse = typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "mouse" || typeof MouseEvent !== "undefined" && ev instanceof MouseEvent;
    const isTouch = typeof PointerEvent !== "undefined" && ev instanceof PointerEvent && ev.pointerType === "touch" || typeof TouchEvent !== "undefined" && ev instanceof TouchEvent;
    if (isMouse) {
      button = ev.button;
      buttons = ev.buttons;
    }
    const col_0 = getColumnIndexForX(x, effectiveCols, translateX);
    const row_0 = getRowIndexForY(y, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, groupLevels, groupHeaderHeights);
    const shiftKey = (ev === null || ev === void 0 ? void 0 : ev.shiftKey) === true;
    const ctrlKey = (ev === null || ev === void 0 ? void 0 : ev.ctrlKey) === true;
    const metaKey = (ev === null || ev === void 0 ? void 0 : ev.metaKey) === true;
    const scrollEdge = [x < 0 ? -1 : width < x ? 1 : 0, y < totalHeaderHeight ? -1 : height < y ? 1 : 0];
    let result_0;
    if (col_0 === -1 || y < 0 || x < 0 || row_0 === undefined || x > width || y > height) {
      const horizontal = x > width ? 1 : x < 0 ? -1 : 0;
      const vertical = y > height ? 1 : y < 0 ? -1 : 0;
      let innerHorizontal = horizontal * 2;
      let innerVertical = vertical * 2;
      if (horizontal === 0) innerHorizontal = col_0 === -1 ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      if (vertical === 0) innerVertical = row_0 === undefined ? OutOfBoundsRegionAxis.EndPadding : OutOfBoundsRegionAxis.Center;
      let isEdge = false;
      if (col_0 === -1 && row_0 === -1) {
        const b_0 = getBoundsForItem(canvas_0, mappedColumns.length - 1, -1);
        assert(b_0 !== undefined);
        isEdge = posX < b_0.x + b_0.width + edgeDetectionBuffer;
      }
      const isMaybeScrollbar = x > width && x < width + getScrollBarWidth() || y > height && y < height + getScrollBarWidth();
      result_0 = {
        kind: outOfBoundsKind,
        location: [col_0 !== -1 ? col_0 : x < 0 ? 0 : mappedColumns.length - 1, row_0 !== null && row_0 !== void 0 ? row_0 : rows - 1],
        region: [innerHorizontal, innerVertical],
        shiftKey,
        ctrlKey,
        metaKey,
        isEdge,
        isTouch,
        button,
        buttons,
        scrollEdge,
        isMaybeScrollbar
      };
    } else if (row_0 <= -1) {
      let bounds = getBoundsForItem(canvas_0, col_0, row_0);
      assert(bounds !== undefined);
      let isEdge_0 = bounds !== undefined && bounds.x + bounds.width - posX <= edgeDetectionBuffer;
      const isGroupHeader = enableGroups && row_0 <= -2;
      const groupLevel = isGroupHeader ? -(row_0 + 2) : undefined;
      const previousCol = col_0 - 1;
      if (posX - bounds.x <= edgeDetectionBuffer && previousCol >= 0) {
        isEdge_0 = true;
        bounds = getBoundsForItem(canvas_0, previousCol, row_0);
        assert(bounds !== undefined);
        result_0 = {
          kind: isGroupHeader ? groupHeaderKind : headerKind,
          location: [previousCol, row_0],
          bounds: bounds,
          group: getGroupName(mappedColumns[previousCol].group, groupLevel),
          isEdge: isEdge_0,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      } else {
        result_0 = {
          kind: isGroupHeader ? groupHeaderKind : headerKind,
          group: getGroupName(mappedColumns[col_0].group, groupLevel),
          location: [col_0, row_0],
          bounds: bounds,
          isEdge: isEdge_0,
          shiftKey,
          ctrlKey,
          metaKey,
          isTouch,
          localEventX: posX - bounds.x,
          localEventY: posY - bounds.y,
          button,
          buttons,
          scrollEdge
        };
      }
    } else {
      const bounds_0 = getBoundsForItem(canvas_0, col_0, row_0);
      assert(bounds_0 !== undefined);
      const isEdge_1 = bounds_0 !== undefined && bounds_0.x + bounds_0.width - posX < edgeDetectionBuffer;
      let isFillHandle = false;
      const drawFill = fillHandle !== false && fillHandle !== undefined;
      if (drawFill && selection.current !== undefined) {
        const fill = typeof fillHandle === "object" ? {
          ...DEFAULT_FILL_HANDLE,
          ...fillHandle
        } : DEFAULT_FILL_HANDLE;
        const fillHandleClickSize = fill.size;
        const half = fillHandleClickSize / 2;
        const fillHandleLocation = rectBottomRight(selection.current.range);
        const fillBounds = getBoundsForItem(canvas_0, fillHandleLocation[0], fillHandleLocation[1]);
        if (fillBounds !== undefined) {
          const centerX = fillBounds.x + fillBounds.width + fill.offsetX - half + 0.5;
          const centerY = fillBounds.y + fillBounds.height + fill.offsetY - half + 0.5;
          isFillHandle = Math.abs(centerX - posX) < fillHandleClickSize && Math.abs(centerY - posY) < fillHandleClickSize;
        }
      }
      result_0 = {
        kind: "cell",
        location: [col_0, row_0],
        bounds: bounds_0,
        isEdge: isEdge_1,
        shiftKey,
        ctrlKey,
        isFillHandle,
        metaKey,
        isTouch,
        localEventX: posX - bounds_0.x,
        localEventY: posY - bounds_0.y,
        button,
        buttons,
        scrollEdge
      };
    }
    return result_0;
  }, [width, mappedColumns, cellXOffset, translateX, height, enableGroups, headerHeight, groupHeaderHeight, rows, rowHeight, cellYOffset, translateY, freezeTrailingRows, getBoundsForItem, fillHandle, selection, totalHeaderHeight, groupLevels, groupHeaderHeights]);
  const [hoveredItem] = hoveredItemInfo !== null && hoveredItemInfo !== void 0 ? hoveredItemInfo : [];
  const enqueueRef = React.useRef(() => {});
  const hoverInfoRef = React.useRef(hoveredItemInfo);
  hoverInfoRef.current = hoveredItemInfo;
  const [bufferACtx, bufferBCtx] = React.useMemo(() => {
    const a_0 = document.createElement("canvas");
    const b_1 = document.createElement("canvas");
    a_0.style["display"] = "none";
    a_0.style["opacity"] = "0";
    a_0.style["position"] = "fixed";
    b_1.style["display"] = "none";
    b_1.style["opacity"] = "0";
    b_1.style["position"] = "fixed";
    return [a_0.getContext("2d", {
      alpha: false
    }), b_1.getContext("2d", {
      alpha: false
    })];
  }, []);
  React.useLayoutEffect(() => {
    if (bufferACtx === null || bufferBCtx === null) return;
    document.documentElement.append(bufferACtx.canvas);
    document.documentElement.append(bufferBCtx.canvas);
    return () => {
      bufferACtx.canvas.remove();
      bufferBCtx.canvas.remove();
    };
  }, [bufferACtx, bufferBCtx]);
  const renderStateProvider = React.useMemo(() => new RenderStateProvider(), []);
  const maxDPR = enableFirefoxRescaling && scrolling ? 1 : enableSafariRescaling && scrolling ? 2 : 5;
  const minimumCellWidth = (experimental === null || experimental === void 0 ? void 0 : experimental.disableMinimumCellWidth) === true ? 1 : 10;
  const lastArgsRef = React.useRef();
  const canvasCtx = React.useRef(null);
  const overlayCtx = React.useRef(null);
  const draw = React.useCallback(() => {
    var _experimental$hyperWr, _experimental$renderS, _hoverInfoRef$current;
    const canvas_1 = ref.current;
    const overlay = overlayRef.current;
    if (canvas_1 === null || overlay === null) return;
    if (canvasCtx.current === null) {
      canvasCtx.current = canvas_1.getContext("2d", {
        alpha: false
      });
      canvas_1.width = 0;
      canvas_1.height = 0;
    }
    if (overlayCtx.current === null) {
      overlayCtx.current = overlay.getContext("2d", {
        alpha: false
      });
      overlay.width = 0;
      overlay.height = 0;
    }
    if (canvasCtx.current === null || overlayCtx.current === null || bufferACtx === null || bufferBCtx === null) {
      return;
    }
    let didOverride = false;
    const overrideCursor = cursor => {
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
      disabledRows: disabledRows !== null && disabledRows !== void 0 ? disabledRows : CompactSelection.empty(),
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
      getGroupDetails: getGroupDetails !== null && getGroupDetails !== void 0 ? getGroupDetails : name => ({
        name
      }),
      getRowThemeOverride,
      drawHeaderCallback,
      prelightCells,
      highlightRegions,
      imageLoader,
      lastBlitData,
      damage: damageRegion.current,
      hoverValues: hoverValues.current,
      hoverInfo: hoverInfoRef.current,
      spriteManager,
      scrolling,
      hyperWrapping: (_experimental$hyperWr = experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping) !== null && _experimental$hyperWr !== void 0 ? _experimental$hyperWr : false,
      touchMode: lastWasTouch,
      enqueue: enqueueRef.current,
      renderStateProvider,
      renderStrategy: (_experimental$renderS = experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy) !== null && _experimental$renderS !== void 0 ? _experimental$renderS : browserIsSafari.value ? "double-buffer" : "single-buffer",
      getCellRenderer,
      minimumCellWidth,
      resizeIndicator
    };
    if (current.damage === undefined) {
      lastArgsRef.current = current;
      drawGrid(current, last);
    } else {
      drawGrid(current, undefined);
    }
    if (!didOverride && (current.damage === undefined || current.damage.has(hoverInfoRef === null || hoverInfoRef === void 0 || (_hoverInfoRef$current = hoverInfoRef.current) === null || _hoverInfoRef$current === void 0 ? void 0 : _hoverInfoRef$current[0]))) {
      setDrawCursorOverride(undefined);
    }
  }, [bufferACtx, bufferBCtx, width, height, cellXOffset, cellYOffset, translateX, translateY, mappedColumns, enableGroups, freezeColumns, dragAndDropState, theme, headerHeight, groupHeaderHeight, groupLevels, groupHeaderHeights, disabledRows, rowHeight, verticalBorder, isResizing, hasAppendRow, resizeCol, isFocused, selection, fillHandle, freezeTrailingRows, rows, drawFocusRing, maxDPR, getCellContent, getGroupDetails, getRowThemeOverride, drawCellCallback, drawHeaderCallback, prelightCells, highlightRegions, imageLoader, spriteManager, scrolling, experimental === null || experimental === void 0 ? void 0 : experimental.hyperWrapping, experimental === null || experimental === void 0 ? void 0 : experimental.renderStrategy, lastWasTouch, renderStateProvider, getCellRenderer, minimumCellWidth, resizeIndicator]);
  const lastDrawRef = React.useRef(draw);
  React.useLayoutEffect(() => {
    draw();
    lastDrawRef.current = draw;
  }, [draw]);
  React.useLayoutEffect(() => {
    const fn = async () => {
      var _document;
      if (((_document = document) === null || _document === void 0 || (_document = _document.fonts) === null || _document === void 0 ? void 0 : _document.ready) === undefined) return;
      await document.fonts.ready;
      lastArgsRef.current = undefined;
      lastDrawRef.current();
    };
    void fn();
  }, []);
  const damageInternal = React.useCallback(locations => {
    damageRegion.current = locations;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const enqueue = useAnimationQueue(damageInternal);
  enqueueRef.current = enqueue;
  const damage = React.useCallback(cells => {
    damageInternal(new CellSet(cells.map(x_0 => x_0.cell)));
  }, [damageInternal]);
  imageLoader.setCallback(damageInternal);
  const [overFill, setOverFill] = React.useState(false);
  const [hCol, hRow] = hoveredItem !== null && hoveredItem !== void 0 ? hoveredItem : [];
  const headerHovered = hCol !== undefined && hRow === -1 && hCol >= 0 && hCol < mappedColumns.length && mappedColumns[hCol].headerRowMarkerDisabled !== true;
  const groupHeaderHovered = hCol !== undefined && hRow === -2;
  let clickableInnerCellHovered = false;
  let editableBoolHovered = false;
  let cursorOverride = drawCursorOverride;
  if (cursorOverride === undefined && hCol !== undefined && hRow !== undefined && hRow > -1 && hRow < rows) {
    const cell = getCellContent([hCol, hRow], true);
    clickableInnerCellHovered = cell.kind === InnerGridCellKind.NewRow || cell.kind === InnerGridCellKind.Marker && cell.markerKind !== "number";
    editableBoolHovered = cell.kind === GridCellKind.Boolean && booleanCellIsEditable(cell);
    cursorOverride = cell.cursor;
  }
  const canDrag = hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false;
  const cursor_0 = isDragging ? "grabbing" : canDrag || isResizing ? "col-resize" : overFill || isFilling ? "crosshair" : cursorOverride !== undefined ? cursorOverride : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered ? "pointer" : "default";
  const style = React.useMemo(() => ({
    contain: "strict",
    display: "block",
    cursor: cursor_0
  }), [cursor_0]);
  const lastSetCursor = React.useRef("default");
  const target = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
  if (target !== null && target !== undefined && lastSetCursor.current !== style.cursor) {
    target.style.cursor = lastSetCursor.current = style.cursor;
  }
  const groupHeaderActionForEvent = React.useCallback((group, bounds_1, localEventX, localEventY) => {
    if (getGroupDetails === undefined) return undefined;
    const groupDesc = getGroupDetails(group);
    if (groupDesc.actions !== undefined) {
      const boxes = getActionBoundsForGroup(bounds_1, groupDesc.actions);
      for (const [i, box] of boxes.entries()) {
        if (pointInRect(box, localEventX + bounds_1.x, localEventY + box.y)) {
          return groupDesc.actions[i];
        }
      }
    }
    return undefined;
  }, [getGroupDetails]);
  const isOverHeaderElement = React.useCallback((canvas_2, col_1, clientX, clientY) => {
    const header = mappedColumns[col_1];
    if (!isDragging && !isResizing && !(hoveredOnEdge !== null && hoveredOnEdge !== void 0 ? hoveredOnEdge : false)) {
      const headerBounds = getBoundsForItem(canvas_2, col_1, -1);
      assert(headerBounds !== undefined);
      const headerLayout = computeHeaderLayout(undefined, header, headerBounds.x, headerBounds.y, headerBounds.width, headerBounds.height, theme, direction(header.title) === "rtl");
      if (header.hasMenu === true && headerLayout.menuBounds !== undefined && pointInRect(headerLayout.menuBounds, clientX, clientY)) {
        return {
          area: "menu",
          bounds: headerLayout.menuBounds
        };
      } else if (header.indicatorIcon !== undefined && headerLayout.indicatorIconBounds !== undefined && pointInRect(headerLayout.indicatorIconBounds, clientX, clientY)) {
        return {
          area: "indicator",
          bounds: headerLayout.indicatorIconBounds
        };
      }
    }
    return undefined;
  }, [mappedColumns, getBoundsForItem, hoveredOnEdge, isDragging, isResizing, theme]);
  const downTime = React.useRef(0);
  const downPosition = React.useRef();
  const mouseDown = React.useRef(false);
  const onPointerDown = React.useCallback(ev_0 => {
    const canvas_3 = ref.current;
    const eventTarget = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas_3 === null || ev_0.target !== canvas_3 && ev_0.target !== eventTarget) return;
    mouseDown.current = true;
    const clientX_0 = ev_0.clientX;
    const clientY_0 = ev_0.clientY;
    if (ev_0.target === eventTarget && eventTarget !== null) {
      const bounds_2 = eventTarget.getBoundingClientRect();
      if (clientX_0 > bounds_2.right || clientY_0 > bounds_2.bottom) return;
    }
    const args = getMouseArgsForPosition(canvas_3, clientX_0, clientY_0, ev_0);
    downPosition.current = args.location;
    if (args.isTouch) {
      downTime.current = Date.now();
    }
    if (lastWasTouchRef.current !== args.isTouch) {
      setLastWasTouch(args.isTouch);
    }
    if (args.kind === headerKind && isOverHeaderElement(canvas_3, args.location[0], clientX_0, clientY_0) !== undefined) {
      return;
    } else if (args.kind === groupHeaderKind) {
      const action = groupHeaderActionForEvent(args.group, args.bounds, args.localEventX, args.localEventY);
      if (action !== undefined) {
        return;
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args);
    if (!args.isTouch && isDraggable !== true && isDraggable !== args.kind && args.button < 3 && args.button !== 1) {
      ev_0.preventDefault();
    }
  }, [eventTargetRef, isDraggable, getMouseArgsForPosition, groupHeaderActionForEvent, isOverHeaderElement, onMouseDown]);
  useEventListener("pointerdown", onPointerDown, windowEventTarget, false);
  const lastUpTime = React.useRef(0);
  const onPointerUp = React.useCallback(ev_1 => {
    const lastUpTimeValue = lastUpTime.current;
    lastUpTime.current = Date.now();
    const canvas_4 = ref.current;
    mouseDown.current = false;
    if (onMouseUp === undefined || canvas_4 === null) return;
    const eventTarget_0 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside = ev_1.target !== canvas_4 && ev_1.target !== eventTarget_0;
    const clientX_1 = ev_1.clientX;
    const clientY_1 = ev_1.clientY;
    const canCancel = ev_1.pointerType === "mouse" ? ev_1.button < 3 : true;
    let args_0 = getMouseArgsForPosition(canvas_4, clientX_1, clientY_1, ev_1);
    if (args_0.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
      args_0 = {
        ...args_0,
        isLongTouch: true
      };
    }
    if (lastUpTimeValue !== 0 && Date.now() - lastUpTimeValue < (args_0.isTouch ? 1000 : 500)) {
      args_0 = {
        ...args_0,
        isDoubleClick: true
      };
    }
    if (lastWasTouchRef.current !== args_0.isTouch) {
      setLastWasTouch(args_0.isTouch);
    }
    if (!isOutside && ev_1.cancelable && canCancel) {
      ev_1.preventDefault();
    }
    const [col_2] = args_0.location;
    const headerBounds_0 = isOverHeaderElement(canvas_4, col_2, clientX_1, clientY_1);
    if (args_0.kind === headerKind && headerBounds_0 !== undefined) {
      var _downPosition$current, _downPosition$current2;
      if (args_0.button !== 0 || ((_downPosition$current = downPosition.current) === null || _downPosition$current === void 0 ? void 0 : _downPosition$current[0]) !== col_2 || ((_downPosition$current2 = downPosition.current) === null || _downPosition$current2 === void 0 ? void 0 : _downPosition$current2[1]) !== -1) {
        onMouseUp(args_0, true);
      }
      return;
    } else if (args_0.kind === groupHeaderKind) {
      const action_0 = groupHeaderActionForEvent(args_0.group, args_0.bounds, args_0.localEventX, args_0.localEventY);
      if (action_0 !== undefined) {
        if (args_0.button === 0) {
          action_0.onClick(args_0);
        }
        return;
      }
    }
    onMouseUp(args_0, isOutside);
  }, [onMouseUp, eventTargetRef, getMouseArgsForPosition, isOverHeaderElement, groupHeaderActionForEvent]);
  useEventListener("pointerup", onPointerUp, windowEventTarget, false);
  const onClickImpl = React.useCallback(ev_2 => {
    const canvas_5 = ref.current;
    if (canvas_5 === null) return;
    const eventTarget_1 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isOutside_0 = ev_2.target !== canvas_5 && ev_2.target !== eventTarget_1;
    let clientX_2;
    let clientY_2;
    let canCancel_0 = true;
    if (ev_2 instanceof MouseEvent) {
      clientX_2 = ev_2.clientX;
      clientY_2 = ev_2.clientY;
      canCancel_0 = ev_2.button < 3;
    } else {
      clientX_2 = ev_2.changedTouches[0].clientX;
      clientY_2 = ev_2.changedTouches[0].clientY;
    }
    const args_1 = getMouseArgsForPosition(canvas_5, clientX_2, clientY_2, ev_2);
    if (lastWasTouchRef.current !== args_1.isTouch) {
      setLastWasTouch(args_1.isTouch);
    }
    if (!isOutside_0 && ev_2.cancelable && canCancel_0) {
      ev_2.preventDefault();
    }
    const [col_3] = args_1.location;
    if (args_1.kind === headerKind) {
      var _downPosition$current3, _downPosition$current4;
      const headerBounds_1 = isOverHeaderElement(canvas_5, col_3, clientX_2, clientY_2);
      if (headerBounds_1 !== undefined && args_1.button === 0 && ((_downPosition$current3 = downPosition.current) === null || _downPosition$current3 === void 0 ? void 0 : _downPosition$current3[0]) === col_3 && ((_downPosition$current4 = downPosition.current) === null || _downPosition$current4 === void 0 ? void 0 : _downPosition$current4[1]) === -1) {
        if (headerBounds_1.area === "menu") {
          onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col_3, headerBounds_1.bounds);
        } else if (headerBounds_1.area === "indicator") {
          onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col_3, headerBounds_1.bounds);
        }
      }
    }
  }, [eventTargetRef, getMouseArgsForPosition, isOverHeaderElement, onHeaderMenuClick, onHeaderIndicatorClick]);
  useEventListener("click", onClickImpl, windowEventTarget, false);
  const onContextMenuImpl = React.useCallback(ev_3 => {
    const canvas_6 = ref.current;
    const eventTarget_2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    if (canvas_6 === null || ev_3.target !== canvas_6 && ev_3.target !== eventTarget_2 || onContextMenu === undefined) return;
    const args_2 = getMouseArgsForPosition(canvas_6, ev_3.clientX, ev_3.clientY, ev_3);
    onContextMenu(args_2, () => {
      if (ev_3.cancelable) ev_3.preventDefault();
    });
  }, [eventTargetRef, getMouseArgsForPosition, onContextMenu]);
  useEventListener("contextmenu", onContextMenuImpl, (_eventTargetRef$curre = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre !== void 0 ? _eventTargetRef$curre : null, false);
  const onAnimationFrame = React.useCallback(values => {
    damageRegion.current = new CellSet(values.map(x_1 => x_1.item));
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = undefined;
  }, []);
  const animManagerValue = React.useMemo(() => new AnimationManager(onAnimationFrame), [onAnimationFrame]);
  const animationManager = React.useRef(animManagerValue);
  animationManager.current = animManagerValue;
  React.useLayoutEffect(() => {
    const am = animationManager.current;
    if (hoveredItem === undefined || hoveredItem[1] < 0) {
      am.setHovered(hoveredItem);
      return;
    }
    const cell_0 = getCellContent(hoveredItem, true);
    const r = getCellRenderer(cell_0);
    const cellNeedsHover = r === undefined && cell_0.kind === GridCellKind.Custom || (r === null || r === void 0 ? void 0 : r.needsHover) !== undefined && (typeof r.needsHover === "boolean" ? r.needsHover : r.needsHover(cell_0));
    am.setHovered(cellNeedsHover ? hoveredItem : undefined);
  }, [getCellContent, getCellRenderer, hoveredItem]);
  const hoveredRef = React.useRef();
  const onPointerMove = React.useCallback(ev_4 => {
    const canvas_7 = ref.current;
    if (canvas_7 === null) return;
    const eventTarget_3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current;
    const isIndirect = ev_4.target !== canvas_7 && ev_4.target !== eventTarget_3;
    const args_3 = getMouseArgsForPosition(canvas_7, ev_4.clientX, ev_4.clientY, ev_4);
    if (args_3.kind !== "out-of-bounds" && isIndirect && !mouseDown.current && !args_3.isTouch) {
      return;
    }
    const maybeSetHoveredInfo = (newVal, needPosition) => {
      setHoveredItemInfo(cv => {
        if (cv === newVal) return cv;
        if ((cv === null || cv === void 0 ? void 0 : cv[0][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][0]) && (cv === null || cv === void 0 ? void 0 : cv[0][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[0][1]) && ((cv === null || cv === void 0 ? void 0 : cv[1][0]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][0]) && (cv === null || cv === void 0 ? void 0 : cv[1][1]) === (newVal === null || newVal === void 0 ? void 0 : newVal[1][1]) || !needPosition)) {
          return cv;
        }
        return newVal;
      });
    };
    if (!mouseEventArgsAreEqual(args_3, hoveredRef.current)) {
      setDrawCursorOverride(undefined);
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args_3);
      maybeSetHoveredInfo(args_3.kind === outOfBoundsKind ? undefined : [args_3.location, [args_3.localEventX, args_3.localEventY]], true);
      hoveredRef.current = args_3;
    } else if (args_3.kind === "cell" || args_3.kind === headerKind || args_3.kind === groupHeaderKind) {
      let needsDamageCell = false;
      let needsHoverPosition = true;
      if (args_3.kind === "cell") {
        var _getCellRenderer;
        const toCheck = getCellContent(args_3.location);
        const rendererNeeds = (_getCellRenderer = getCellRenderer(toCheck)) === null || _getCellRenderer === void 0 ? void 0 : _getCellRenderer.needsHoverPosition;
        needsHoverPosition = rendererNeeds !== null && rendererNeeds !== void 0 ? rendererNeeds : toCheck.kind === GridCellKind.Custom;
        needsDamageCell = needsHoverPosition;
      } else {
        needsDamageCell = true;
      }
      const newInfo = [args_3.location, [args_3.localEventX, args_3.localEventY]];
      maybeSetHoveredInfo(newInfo, needsHoverPosition);
      hoverInfoRef.current = newInfo;
      if (needsDamageCell) {
        damageInternal(new CellSet([args_3.location]));
      }
    }
    const notRowMarkerCol = args_3.location[0] >= (firstColAccessible ? 0 : 1);
    setHoveredOnEdge(args_3.kind === headerKind && args_3.isEdge && notRowMarkerCol && allowResize === true);
    setOverFill(args_3.kind === "cell" && args_3.isFillHandle);
    onMouseMoveRaw === null || onMouseMoveRaw === void 0 || onMouseMoveRaw(ev_4);
    onMouseMove(args_3);
  }, [eventTargetRef, getMouseArgsForPosition, firstColAccessible, allowResize, onMouseMoveRaw, onMouseMove, onItemHovered, getCellContent, getCellRenderer, damageInternal]);
  useEventListener("pointermove", onPointerMove, windowEventTarget, true);
  const onKeyDownImpl = React.useCallback(event => {
    const canvas_8 = ref.current;
    if (canvas_8 === null) return;
    let bounds_3;
    let location = undefined;
    if (selection.current !== undefined) {
      bounds_3 = getBoundsForItem(canvas_8, selection.current.cell[0], selection.current.cell[1]);
      location = selection.current.cell;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown({
      bounds: bounds_3,
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
      location
    });
  }, [onKeyDown, selection, getBoundsForItem]);
  const onKeyUpImpl = React.useCallback(event_0 => {
    const canvas_9 = ref.current;
    if (canvas_9 === null) return;
    let bounds_4;
    let location_0 = undefined;
    if (selection.current !== undefined) {
      bounds_4 = getBoundsForItem(canvas_9, selection.current.cell[0], selection.current.cell[1]);
      location_0 = selection.current.cell;
    }
    onKeyUp === null || onKeyUp === void 0 || onKeyUp({
      bounds: bounds_4,
      stopPropagation: () => event_0.stopPropagation(),
      preventDefault: () => event_0.preventDefault(),
      cancel: () => undefined,
      ctrlKey: event_0.ctrlKey,
      metaKey: event_0.metaKey,
      shiftKey: event_0.shiftKey,
      altKey: event_0.altKey,
      key: event_0.key,
      keyCode: event_0.keyCode,
      rawEvent: event_0,
      location: location_0
    });
  }, [onKeyUp, selection, getBoundsForItem]);
  const refImpl = React.useCallback(instance => {
    ref.current = instance;
    if (canvasRef !== undefined) {
      canvasRef.current = instance;
    }
    if (experimental !== null && experimental !== void 0 && experimental.eventTarget) {
      windowEventTargetRef.current = experimental.eventTarget;
    } else if (instance === null) {
      windowEventTargetRef.current = window;
    } else {
      const docRoot = instance.getRootNode();
      if (docRoot === document) windowEventTargetRef.current = window;
      windowEventTargetRef.current = docRoot;
    }
  }, [canvasRef, experimental === null || experimental === void 0 ? void 0 : experimental.eventTarget]);
  const onDragStartImpl = React.useCallback(event_1 => {
    const canvas_10 = ref.current;
    if (canvas_10 === null || isDraggable === false || isResizing) {
      event_1.preventDefault();
      return;
    }
    let dragMime;
    let dragData;
    const args_4 = getMouseArgsForPosition(canvas_10, event_1.clientX, event_1.clientY);
    if (isDraggable !== true && args_4.kind !== isDraggable) {
      event_1.preventDefault();
      return;
    }
    const setData = (mime, payload) => {
      dragMime = mime;
      dragData = payload;
    };
    let dragImage;
    let dragImageX;
    let dragImageY;
    const setDragImage = (image, x_2, y_0) => {
      dragImage = image;
      dragImageX = x_2;
      dragImageY = y_0;
    };
    let prevented = false;
    onDragStart === null || onDragStart === void 0 || onDragStart({
      ...args_4,
      setData,
      setDragImage,
      preventDefault: () => prevented = true,
      defaultPrevented: () => prevented
    });
    if (!prevented && dragMime !== undefined && dragData !== undefined && event_1.dataTransfer !== null) {
      event_1.dataTransfer.setData(dragMime, dragData);
      event_1.dataTransfer.effectAllowed = "copyLink";
      if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
        event_1.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
      } else {
        const [col_4, row_1] = args_4.location;
        if (row_1 !== undefined) {
          var _window$devicePixelRa;
          const offscreen = document.createElement("canvas");
          const boundsForDragTarget = getBoundsForItem(canvas_10, col_4, row_1);
          assert(boundsForDragTarget !== undefined);
          const dpr = Math.ceil((_window$devicePixelRa = window.devicePixelRatio) !== null && _window$devicePixelRa !== void 0 ? _window$devicePixelRa : 1);
          offscreen.width = boundsForDragTarget.width * dpr;
          offscreen.height = boundsForDragTarget.height * dpr;
          const ctx = offscreen.getContext("2d");
          if (ctx !== null) {
            ctx.scale(dpr, dpr);
            ctx.textBaseline = "middle";
            if (row_1 === -1) {
              ctx.font = theme.headerFontFull;
              ctx.fillStyle = theme.bgHeader;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawHeader(ctx, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, mappedColumns[col_4], false, theme, false, undefined, undefined, false, 0, spriteManager, drawHeaderCallback, false);
            } else {
              ctx.font = theme.baseFontFull;
              ctx.fillStyle = theme.bgCell;
              ctx.fillRect(0, 0, offscreen.width, offscreen.height);
              drawCell(ctx, getCellContent([col_4, row_1]), 0, row_1, false, false, 0, 0, boundsForDragTarget.width, boundsForDragTarget.height, false, theme, theme.bgCell, imageLoader, spriteManager, 1, undefined, false, 0, undefined, undefined, undefined, renderStateProvider, getCellRenderer, () => undefined, 0);
            }
          }
          offscreen.style.left = "-100%";
          offscreen.style.position = "absolute";
          offscreen.style.width = `${boundsForDragTarget.width}px`;
          offscreen.style.height = `${boundsForDragTarget.height}px`;
          document.body.append(offscreen);
          event_1.dataTransfer.setDragImage(offscreen, boundsForDragTarget.width / 2, boundsForDragTarget.height / 2);
          window.setTimeout(() => {
            offscreen.remove();
          }, 0);
        }
      }
    } else {
      event_1.preventDefault();
    }
  }, [isDraggable, isResizing, getMouseArgsForPosition, onDragStart, getBoundsForItem, theme, mappedColumns, spriteManager, drawHeaderCallback, getCellContent, imageLoader, renderStateProvider, getCellRenderer]);
  useEventListener("dragstart", onDragStartImpl, (_eventTargetRef$curre2 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre2 !== void 0 ? _eventTargetRef$curre2 : null, false, false);
  const activeDropTarget = React.useRef();
  const onDragOverImpl = React.useCallback(event_2 => {
    var _activeDropTarget$cur;
    const canvas_11 = ref.current;
    if (onDrop !== undefined) {
      event_2.preventDefault();
    }
    if (canvas_11 === null || onDragOverCell === undefined) {
      return;
    }
    const args_5 = getMouseArgsForPosition(canvas_11, event_2.clientX, event_2.clientY);
    const [rawCol, row_2] = args_5.location;
    const col_5 = rawCol - (firstColAccessible ? 0 : 1);
    const [activeCol, activeRow] = (_activeDropTarget$cur = activeDropTarget.current) !== null && _activeDropTarget$cur !== void 0 ? _activeDropTarget$cur : [];
    if (activeCol !== col_5 || activeRow !== row_2) {
      activeDropTarget.current = [col_5, row_2];
      onDragOverCell([col_5, row_2], event_2.dataTransfer);
    }
  }, [firstColAccessible, getMouseArgsForPosition, onDragOverCell, onDrop]);
  useEventListener("dragover", onDragOverImpl, (_eventTargetRef$curre3 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre3 !== void 0 ? _eventTargetRef$curre3 : null, false, false);
  const onDragEndImpl = React.useCallback(() => {
    activeDropTarget.current = undefined;
    onDragEnd === null || onDragEnd === void 0 || onDragEnd();
  }, [onDragEnd]);
  useEventListener("dragend", onDragEndImpl, (_eventTargetRef$curre4 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre4 !== void 0 ? _eventTargetRef$curre4 : null, false, false);
  const onDropImpl = React.useCallback(event_3 => {
    const canvas_12 = ref.current;
    if (canvas_12 === null || onDrop === undefined) {
      return;
    }
    event_3.preventDefault();
    const args_6 = getMouseArgsForPosition(canvas_12, event_3.clientX, event_3.clientY);
    const [rawCol_0, row_3] = args_6.location;
    const col_6 = rawCol_0 - (firstColAccessible ? 0 : 1);
    onDrop([col_6, row_3], event_3.dataTransfer);
  }, [firstColAccessible, getMouseArgsForPosition, onDrop]);
  useEventListener("drop", onDropImpl, (_eventTargetRef$curre5 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre5 !== void 0 ? _eventTargetRef$curre5 : null, false, false);
  const onDragLeaveImpl = React.useCallback(() => {
    onDragLeave === null || onDragLeave === void 0 || onDragLeave();
  }, [onDragLeave]);
  useEventListener("dragleave", onDragLeaveImpl, (_eventTargetRef$curre6 = eventTargetRef === null || eventTargetRef === void 0 ? void 0 : eventTargetRef.current) !== null && _eventTargetRef$curre6 !== void 0 ? _eventTargetRef$curre6 : null, false, false);
  const selectionRef = React.useRef(selection);
  selectionRef.current = selection;
  const focusRef = React.useRef(null);
  const focusElement = React.useCallback(el => {
    if (ref.current === null || !ref.current.contains(document.activeElement)) return;
    if (el === null && selectionRef.current.current !== undefined) {
      var _canvasRef$current;
      canvasRef === null || canvasRef === void 0 || (_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 || _canvasRef$current.focus({
        preventScroll: true
      });
    } else if (el !== null) {
      el.focus({
        preventScroll: true
      });
    }
    focusRef.current = el;
  }, [canvasRef]);
  React.useImperativeHandle(forwardedRef, () => ({
    focus: () => {
      const el_0 = focusRef.current;
      if (el_0 === null || !document.contains(el_0)) {
        var _canvasRef$current2;
        canvasRef === null || canvasRef === void 0 || (_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 || _canvasRef$current2.focus({
          preventScroll: true
        });
      } else {
        el_0.focus({
          preventScroll: true
        });
      }
    },
    getBounds: (col_7, row_4) => {
      if (canvasRef === undefined || canvasRef.current === null) {
        return undefined;
      }
      return getBoundsForItem(canvasRef.current, col_7 !== null && col_7 !== void 0 ? col_7 : 0, row_4 !== null && row_4 !== void 0 ? row_4 : -1);
    },
    damage,
    getMouseArgsForPosition: (posX_0, posY_0, ev_5) => {
      if (canvasRef === undefined || canvasRef.current === null) {
        return undefined;
      }
      return getMouseArgsForPosition(canvasRef.current, posX_0, posY_0, ev_5);
    }
  }), [canvasRef, damage, getBoundsForItem, getMouseArgsForPosition]);
  const lastFocusedSubdomNode = React.useRef();
  const accessibilityTree = useDebouncedMemo(() => {
    var _effectiveCols_0$, _selection$current$ce, _selection$current, _selection$current2;
    if (width < 50 || (experimental === null || experimental === void 0 ? void 0 : experimental.disableAccessibilityTree) === true) return null;
    let effectiveCols_0 = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
    const colOffset = firstColAccessible ? 0 : -1;
    if (!firstColAccessible && ((_effectiveCols_0$ = effectiveCols_0[0]) === null || _effectiveCols_0$ === void 0 ? void 0 : _effectiveCols_0$.sourceIndex) === 0) {
      effectiveCols_0 = effectiveCols_0.slice(1);
    }
    const [fCol, fRow] = (_selection$current$ce = (_selection$current = selection.current) === null || _selection$current === void 0 ? void 0 : _selection$current.cell) !== null && _selection$current$ce !== void 0 ? _selection$current$ce : [];
    const range = (_selection$current2 = selection.current) === null || _selection$current2 === void 0 ? void 0 : _selection$current2.range;
    const visibleCols = effectiveCols_0.map(c => c.sourceIndex);
    const visibleRows = makeRange(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));
    if (fCol !== undefined && fRow !== undefined && !(visibleCols.includes(fCol) && visibleRows.includes(fRow))) {
      focusElement(null);
    }
    return React.createElement("table", {
      key: "access-tree",
      role: "grid",
      "aria-rowcount": rows + 1,
      "aria-multiselectable": "true",
      "aria-colcount": mappedColumns.length + colOffset
    }, React.createElement("thead", {
      role: "rowgroup"
    }, React.createElement("tr", {
      role: "row",
      "aria-rowindex": 1
    }, effectiveCols_0.map(c_0 => (React.createElement("th", {
      role: "columnheader",
      "aria-selected": selection.columns.hasIndex(c_0.sourceIndex),
      "aria-colindex": c_0.sourceIndex + 1 + colOffset,
      tabIndex: -1,
      onFocus: e => {
        if (e.target === focusRef.current) return;
        return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused([c_0.sourceIndex, -1]);
      },
      key: c_0.sourceIndex
    }, c_0.title))))), React.createElement("tbody", {
      role: "rowgroup"
    }, visibleRows.map(row_5 => (React.createElement("tr", {
      role: "row",
      "aria-selected": selection.rows.hasIndex(row_5),
      key: row_5,
      "aria-rowindex": row_5 + 2
    }, effectiveCols_0.map(c_1 => {
      const col_8 = c_1.sourceIndex;
      const key = packColRowToNumber(col_8, row_5);
      const focused = fCol === col_8 && fRow === row_5;
      const selected = range !== undefined && col_8 >= range.x && col_8 < range.x + range.width && row_5 >= range.y && row_5 < range.y + range.height;
      const id = `glide-cell-${col_8}-${row_5}`;
      const location_1 = [col_8, row_5];
      const cellContent = getCellContent(location_1, true);
      return React.createElement("td", {
        key: key,
        role: "gridcell",
        "aria-colindex": col_8 + 1 + colOffset,
        "aria-selected": selected,
        "aria-readonly": isInnerOnlyCell(cellContent) || !isReadWriteCell(cellContent),
        id: id,
        "data-testid": id,
        onClick: () => {
          const canvas_13 = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
          if (canvas_13 === null || canvas_13 === undefined) return;
          return onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown({
            bounds: getBoundsForItem(canvas_13, col_8, row_5),
            cancel: () => undefined,
            preventDefault: () => undefined,
            stopPropagation: () => undefined,
            ctrlKey: false,
            key: "Enter",
            keyCode: 13,
            metaKey: false,
            shiftKey: false,
            altKey: false,
            rawEvent: undefined,
            location: location_1
          });
        },
        onFocusCapture: e_0 => {
          var _lastFocusedSubdomNod, _lastFocusedSubdomNod2;
          if (e_0.target === focusRef.current || ((_lastFocusedSubdomNod = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod === void 0 ? void 0 : _lastFocusedSubdomNod[0]) === col_8 && ((_lastFocusedSubdomNod2 = lastFocusedSubdomNode.current) === null || _lastFocusedSubdomNod2 === void 0 ? void 0 : _lastFocusedSubdomNod2[1]) === row_5) return;
          lastFocusedSubdomNode.current = location_1;
          return onCellFocused === null || onCellFocused === void 0 ? void 0 : onCellFocused(location_1);
        },
        ref: focused ? focusElement : undefined,
        tabIndex: -1
      }, getRowData(cellContent, getCellRenderer));
    }))))));
  }, [width, mappedColumns, cellXOffset, dragAndDropState, translateX, rows, cellYOffset, accessibilityHeight, selection, focusElement, getCellContent, canvasRef, onKeyDown, getBoundsForItem, onCellFocused], 200);
  const opacityX = freezeColumns === 0 || !fixedShadowX ? 0 : cellXOffset > freezeColumns ? 1 : clamp(-translateX / 100, 0, 1);
  const absoluteOffsetY = -cellYOffset * 32 + translateY;
  const opacityY = !fixedShadowY ? 0 : clamp(-absoluteOffsetY / 100, 0, 1);
  const stickyShadow = React.useMemo(() => {
    if (!opacityX && !opacityY) {
      return null;
    }
    const styleX = {
      position: "absolute",
      top: 0,
      left: stickyX,
      width: width - stickyX,
      height: height,
      opacity: opacityX,
      pointerEvents: "none",
      transition: !smoothScrollX ? "opacity 0.2s" : undefined,
      boxShadow: "inset 13px 0 10px -13px rgba(0, 0, 0, 0.2)"
    };
    const styleY = {
      position: "absolute",
      top: totalHeaderHeight,
      left: 0,
      width: width,
      height: height,
      opacity: opacityY,
      pointerEvents: "none",
      transition: !smoothScrollY ? "opacity 0.2s" : undefined,
      boxShadow: "inset 0 13px 10px -13px rgba(0, 0, 0, 0.2)"
    };
    return React.createElement(React.Fragment, null, opacityX > 0 && React.createElement("div", {
      id: "shadow-x",
      style: styleX
    }), opacityY > 0 && React.createElement("div", {
      id: "shadow-y",
      style: styleY
    }));
  }, [opacityX, opacityY, stickyX, width, smoothScrollX, totalHeaderHeight, height, smoothScrollY]);
  const overlayStyle = React.useMemo(() => ({
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    pointerEvents: "none"
  }), []);
  return React.createElement(React.Fragment, null, React.createElement("canvas", {
    "data-testid": "data-grid-canvas",
    tabIndex: -1,
    onKeyDown: onKeyDownImpl,
    onKeyUp: onKeyUpImpl,
    onFocus: onCanvasFocused,
    onBlur: onCanvasBlur,
    ref: refImpl,
    style: style
  }, accessibilityTree), React.createElement("canvas", {
    ref: overlayRef,
    style: overlayStyle
  }), stickyShadow);
};
export default React.memo(React.forwardRef(DataGrid));
//# sourceMappingURL=data-grid.js.map