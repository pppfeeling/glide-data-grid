import clamp from "lodash/clamp.js";
import * as React from "react";
import DataGrid from "../data-grid/data-grid.js";
function offsetColumnSize(column, width, min, max) {
  var _column$growOffset;
  return clamp(Math.round(width - ((_column$growOffset = column.growOffset) !== null && _column$growOffset !== void 0 ? _column$growOffset : 0)), Math.ceil(min), Math.floor(max));
}
const DataGridDnd = p => {
  var _ref;
  const [resizeColStartX, setResizeColStartX] = React.useState();
  const [resizeCol, setResizeCol] = React.useState();
  const [dragCol, setDragCol] = React.useState();
  const [dropCol, setDropCol] = React.useState();
  const [dragColActive, setDragColActive] = React.useState(false);
  const [dragStartX, setDragStartX] = React.useState();
  const [dragRow, setDragRow] = React.useState();
  const [dropRow, setDropRow] = React.useState();
  const [dragRowActive, setDragRowActive] = React.useState(false);
  const [dragStartY, setDragStartY] = React.useState();
  const {
    onHeaderMenuClick,
    onHeaderIndicatorClick,
    getCellContent,
    onColumnMoved,
    onColumnResize,
    onColumnResizeStart,
    onColumnResizeEnd,
    gridRef,
    maxColumnWidth,
    minColumnWidth,
    onRowMoved,
    lockColumns,
    onColumnProposeMove,
    onMouseDown,
    onMouseUp,
    onItemHovered,
    onDragStart,
    canvasRef
  } = p;
  const canResize = ((_ref = onColumnResize !== null && onColumnResize !== void 0 ? onColumnResize : onColumnResizeEnd) !== null && _ref !== void 0 ? _ref : onColumnResizeStart) !== undefined;
  const {
    columns,
    selection
  } = p;
  const selectedColumns = selection.columns;
  const onItemHoveredImpl = React.useCallback(args => {
    const [col, row] = args.location;
    if (dragCol !== undefined && dropCol !== col && col >= lockColumns) {
      setDragColActive(true);
      setDropCol(col);
    } else if (dragRow !== undefined && row !== undefined) {
      setDragRowActive(true);
      setDropRow(Math.max(0, row));
    } else if (resizeCol === undefined && !dragColActive && !dragRowActive) {
      onItemHovered === null || onItemHovered === void 0 || onItemHovered(args);
    }
  }, [dragCol, dragRow, dropCol, onItemHovered, lockColumns, resizeCol, dragColActive, dragRowActive]);
  const canDragCol = onColumnMoved !== undefined;
  const onMouseDownImpl = React.useCallback(args_0 => {
    if (args_0.button === 0) {
      const [col_0, row_0] = args_0.location;
      if (args_0.kind === "out-of-bounds" && args_0.isEdge && canResize) {
        var _gridRef$current;
        const bounds = gridRef === null || gridRef === void 0 || (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.getBounds(columns.length - 1, -1);
        if (bounds !== undefined) {
          setResizeColStartX(bounds.x);
          setResizeCol(columns.length - 1);
        }
      } else if (args_0.kind === "header" && col_0 >= lockColumns) {
        const canvas = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
        if (args_0.isEdge && canResize && canvas) {
          var _columns$col_0$growOf;
          setResizeColStartX(args_0.bounds.x);
          setResizeCol(col_0);
          const rect = canvas.getBoundingClientRect();
          const scale = rect.width / canvas.offsetWidth;
          const width = args_0.bounds.width / scale;
          onColumnResizeStart === null || onColumnResizeStart === void 0 || onColumnResizeStart(columns[col_0], width, col_0, width + ((_columns$col_0$growOf = columns[col_0].growOffset) !== null && _columns$col_0$growOf !== void 0 ? _columns$col_0$growOf : 0));
        } else if (args_0.kind === "header" && canDragCol) {
          setDragStartX(args_0.bounds.x);
          setDragCol(col_0);
        }
      } else if (args_0.kind === "cell" && lockColumns > 0 && col_0 === 0 && row_0 !== undefined && onRowMoved !== undefined) {
        setDragStartY(args_0.bounds.y);
        setDragRow(row_0);
      }
    }
    onMouseDown === null || onMouseDown === void 0 || onMouseDown(args_0);
  }, [onMouseDown, canResize, lockColumns, onRowMoved, gridRef, columns, canDragCol, onColumnResizeStart, canvasRef]);
  const onHeaderMenuClickMangled = React.useCallback((col_1, screenPosition) => {
    if (dragColActive || dragRowActive) return;
    onHeaderMenuClick === null || onHeaderMenuClick === void 0 || onHeaderMenuClick(col_1, screenPosition);
  }, [dragColActive, dragRowActive, onHeaderMenuClick]);
  const onHeaderIndicatorClickMangled = React.useCallback((col_2, screenPosition_0) => {
    if (dragColActive || dragRowActive) return;
    onHeaderIndicatorClick === null || onHeaderIndicatorClick === void 0 || onHeaderIndicatorClick(col_2, screenPosition_0);
  }, [dragColActive, dragRowActive, onHeaderIndicatorClick]);
  const lastResizeWidthRef = React.useRef(-1);
  const clearAll = React.useCallback(() => {
    lastResizeWidthRef.current = -1;
    setDragRow(undefined);
    setDropRow(undefined);
    setDragStartY(undefined);
    setDragRowActive(false);
    setDragCol(undefined);
    setDropCol(undefined);
    setDragStartX(undefined);
    setDragColActive(false);
    setResizeCol(undefined);
    setResizeColStartX(undefined);
  }, []);
  const onMouseUpImpl = React.useCallback((args_1, isOutside) => {
    if (args_1.button === 0) {
      if (resizeCol !== undefined) {
        var _columns$resizeCol$gr;
        if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.hasIndex(resizeCol)) === true) {
          for (const c of selectedColumns) {
            var _col_3$growOffset;
            if (c === resizeCol) continue;
            const col_3 = columns[c];
            const newSize = offsetColumnSize(col_3, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
            onColumnResize === null || onColumnResize === void 0 || onColumnResize(col_3, newSize, c, newSize + ((_col_3$growOffset = col_3.growOffset) !== null && _col_3$growOffset !== void 0 ? _col_3$growOffset : 0));
          }
        }
        const ns = offsetColumnSize(columns[resizeCol], lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
        onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(columns[resizeCol], ns, resizeCol, ns + ((_columns$resizeCol$gr = columns[resizeCol].growOffset) !== null && _columns$resizeCol$gr !== void 0 ? _columns$resizeCol$gr : 0));
        if (selectedColumns.hasIndex(resizeCol)) {
          for (const c_0 of selectedColumns) {
            var _col_4$growOffset;
            if (c_0 === resizeCol) continue;
            const col_4 = columns[c_0];
            const s = offsetColumnSize(col_4, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
            onColumnResizeEnd === null || onColumnResizeEnd === void 0 || onColumnResizeEnd(col_4, s, c_0, s + ((_col_4$growOffset = col_4.growOffset) !== null && _col_4$growOffset !== void 0 ? _col_4$growOffset : 0));
          }
        }
      }
      clearAll();
      if (dragCol !== undefined && dropCol !== undefined && (onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(dragCol, dropCol)) !== false) {
        onColumnMoved === null || onColumnMoved === void 0 || onColumnMoved(dragCol, dropCol);
      }
      if (dragRow !== undefined && dropRow !== undefined) {
        onRowMoved === null || onRowMoved === void 0 || onRowMoved(dragRow, dropRow);
      }
    }
    onMouseUp === null || onMouseUp === void 0 || onMouseUp(args_1, isOutside);
  }, [onMouseUp, resizeCol, dragCol, dropCol, dragRow, dropRow, selectedColumns, onColumnResizeEnd, columns, minColumnWidth, maxColumnWidth, onColumnResize, onColumnMoved, onRowMoved, clearAll, onColumnProposeMove]);
  const dragOffset = React.useMemo(() => {
    if (dragCol === undefined || dropCol === undefined) return undefined;
    if (dragCol === dropCol) return undefined;
    if ((onColumnProposeMove === null || onColumnProposeMove === void 0 ? void 0 : onColumnProposeMove(dragCol, dropCol)) === false) return undefined;
    return {
      src: dragCol,
      dest: dropCol
    };
  }, [dragCol, dropCol, onColumnProposeMove]);
  const onMouseMove = React.useCallback(event => {
    const canvas_0 = canvasRef === null || canvasRef === void 0 ? void 0 : canvasRef.current;
    if (dragCol !== undefined && dragStartX !== undefined) {
      const diff = Math.abs(event.clientX - dragStartX);
      if (diff > 20) {
        setDragColActive(true);
      }
    } else if (dragRow !== undefined && dragStartY !== undefined) {
      const diff_0 = Math.abs(event.clientY - dragStartY);
      if (diff_0 > 20) {
        setDragRowActive(true);
      }
    } else if (resizeCol !== undefined && resizeColStartX !== undefined && canvas_0) {
      var _column$growOffset2;
      const rect_0 = canvas_0.getBoundingClientRect();
      const scale_0 = rect_0.width / canvas_0.offsetWidth;
      const newWidth = (event.clientX - resizeColStartX) / scale_0;
      const column = columns[resizeCol];
      const ns_0 = offsetColumnSize(column, newWidth, minColumnWidth, maxColumnWidth);
      onColumnResize === null || onColumnResize === void 0 || onColumnResize(column, ns_0, resizeCol, ns_0 + ((_column$growOffset2 = column.growOffset) !== null && _column$growOffset2 !== void 0 ? _column$growOffset2 : 0));
      lastResizeWidthRef.current = newWidth;
      if ((selectedColumns === null || selectedColumns === void 0 ? void 0 : selectedColumns.first()) === resizeCol) {
        for (const c_1 of selectedColumns) {
          var _col_5$growOffset;
          if (c_1 === resizeCol) continue;
          const col_5 = columns[c_1];
          const s_0 = offsetColumnSize(col_5, lastResizeWidthRef.current, minColumnWidth, maxColumnWidth);
          onColumnResize === null || onColumnResize === void 0 || onColumnResize(col_5, s_0, c_1, s_0 + ((_col_5$growOffset = col_5.growOffset) !== null && _col_5$growOffset !== void 0 ? _col_5$growOffset : 0));
        }
      }
    }
  }, [dragCol, dragStartX, dragRow, dragStartY, resizeCol, resizeColStartX, columns, minColumnWidth, maxColumnWidth, onColumnResize, selectedColumns, canvasRef]);
  const getMangledCellContent = React.useCallback((cell, forceStrict) => {
    if (dragRow === undefined || dropRow === undefined) return getCellContent(cell, forceStrict);
    let [col_6, row_1] = cell;
    if (row_1 === dropRow) {
      row_1 = dragRow;
    } else {
      if (row_1 > dropRow) row_1 -= 1;
      if (row_1 >= dragRow) row_1 += 1;
    }
    return getCellContent([col_6, row_1], forceStrict);
  }, [dragRow, dropRow, getCellContent]);
  const onDragStartImpl = React.useCallback(args_2 => {
    onDragStart === null || onDragStart === void 0 || onDragStart(args_2);
    if (!args_2.defaultPrevented()) {
      clearAll();
    }
  }, [clearAll, onDragStart]);
  return React.createElement(DataGrid, {
    accessibilityHeight: p.accessibilityHeight,
    canvasRef: p.canvasRef,
    cellXOffset: p.cellXOffset,
    cellYOffset: p.cellYOffset,
    columns: p.columns,
    disabledRows: p.disabledRows,
    drawFocusRing: p.drawFocusRing,
    drawHeader: p.drawHeader,
    drawCell: p.drawCell,
    enableGroups: p.enableGroups,
    groupLevels: p.groupLevels,
    groupHeaderHeights: p.groupHeaderHeights,
    eventTargetRef: p.eventTargetRef,
    experimental: p.experimental,
    fillHandle: p.fillHandle,
    firstColAccessible: p.firstColAccessible,
    fixedShadowX: p.fixedShadowX,
    fixedShadowY: p.fixedShadowY,
    freezeColumns: p.freezeColumns,
    getCellRenderer: p.getCellRenderer,
    getGroupDetails: p.getGroupDetails,
    getRowThemeOverride: p.getRowThemeOverride,
    groupHeaderHeight: p.groupHeaderHeight,
    headerHeight: p.headerHeight,
    headerIcons: p.headerIcons,
    height: p.height,
    highlightRegions: p.highlightRegions,
    imageWindowLoader: p.imageWindowLoader,
    resizeColumn: resizeCol,
    isDraggable: p.isDraggable,
    isFilling: p.isFilling,
    isFocused: p.isFocused,
    onCanvasBlur: p.onCanvasBlur,
    onCanvasFocused: p.onCanvasFocused,
    onCellFocused: p.onCellFocused,
    onContextMenu: p.onContextMenu,
    onDragEnd: p.onDragEnd,
    onDragLeave: p.onDragLeave,
    onDragOverCell: p.onDragOverCell,
    onDrop: p.onDrop,
    onKeyDown: p.onKeyDown,
    onKeyUp: p.onKeyUp,
    onMouseMove: p.onMouseMove,
    prelightCells: p.prelightCells,
    rowHeight: p.rowHeight,
    rows: p.rows,
    selection: p.selection,
    smoothScrollX: p.smoothScrollX,
    smoothScrollY: p.smoothScrollY,
    theme: p.theme,
    freezeTrailingRows: p.freezeTrailingRows,
    hasAppendRow: p.hasAppendRow,
    translateX: p.translateX,
    translateY: p.translateY,
    resizeIndicator: p.resizeIndicator,
    verticalBorder: p.verticalBorder,
    width: p.width,
    getCellContent: getMangledCellContent,
    isResizing: resizeCol !== undefined,
    onHeaderMenuClick: onHeaderMenuClickMangled,
    onHeaderIndicatorClick: onHeaderIndicatorClickMangled,
    isDragging: dragColActive,
    onItemHovered: onItemHoveredImpl,
    onDragStart: onDragStartImpl,
    onMouseDown: onMouseDownImpl,
    allowResize: canResize,
    onMouseUp: onMouseUpImpl,
    dragAndDropState: dragOffset,
    onMouseMoveRaw: onMouseMove,
    ref: gridRef
  });
};
export default DataGridDnd;
//# sourceMappingURL=data-grid-dnd.js.map