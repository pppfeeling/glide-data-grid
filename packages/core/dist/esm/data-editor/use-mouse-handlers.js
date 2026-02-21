import * as React from "react";
import { isEditableGridCell, isReadWriteCell, CompactSelection, isInnerOnlyCell } from "../internal/data-grid/data-grid-types.js";
import { groupHeaderKind, headerKind } from "../internal/data-grid/event-args.js";
import { browserIsOSX } from "../common/browser-detect.js";
import { isGroupEqual, isGroupEqualAtLevel, itemsAreEqual, itemIsInRect } from "../internal/data-grid/render/data-grid-lib.js";
import { combineRects } from "../common/math.js";
import { measureColumn } from "./use-column-sizer.js";
export function useMouseHandlers(args) {
  const {
    state,
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
  } = args;
  const {
    gridSelection,
    gridRef,
    visibleRegionRef,
    abortControllerRef,
    rowMarkerOffset,
    mangledCols,
    rows,
    setGridSelection,
    getMangledCellContent,
    mangledOnCellsEdited,
    reselect,
    focus,
    getCellRenderer
  } = state;
  const isActivelyDraggingHeader = React.useRef(false);
  const touchDownArgs = React.useRef(visibleRegion);
  const mouseDownData = React.useRef(undefined);
  const isPrevented = React.useRef(false);
  const onMouseDown = mouseArgs => {
    isPrevented.current = false;
    touchDownArgs.current = visibleRegionRef.current;
    if (mouseArgs.button !== 0 && mouseArgs.button !== 1) {
      mouseDownData.current = undefined;
      return;
    }
    const time = performance.now();
    mouseDownData.current = {
      button: mouseArgs.button,
      time,
      location: mouseArgs.location
    };
    if ((mouseArgs === null || mouseArgs === void 0 ? void 0 : mouseArgs.kind) === "header") {
      isActivelyDraggingHeader.current = true;
    }
    const fh = mouseArgs.kind === "cell" && mouseArgs.isFillHandle;
    if (!fh && mouseArgs.kind !== "cell" && mouseArgs.isEdge) return;
    setMouseState({
      previousSelection: gridSelection,
      fillHandle: fh
    });
    lastMouseSelectLocation.current = undefined;
    if (!mouseArgs.isTouch && mouseArgs.button === 0 && !fh) {
      handleSelect(mouseArgs);
    } else if (!mouseArgs.isTouch && mouseArgs.button === 1) {
      lastMouseSelectLocation.current = mouseArgs.location;
    }
  };
  const handleGroupHeaderSelection = mouseArgs_0 => {
    if (mouseArgs_0.kind !== groupHeaderKind || columnSelect !== "multi") {
      return;
    }
    const isMultiKey = browserIsOSX.value ? mouseArgs_0.metaKey : mouseArgs_0.ctrlKey;
    const [col, row] = mouseArgs_0.location;
    const selectedColumns = gridSelection.columns;
    if (col < rowMarkerOffset) return;
    const needle = mangledCols[col];
    let start = col;
    let end = col;
    const clickedLevel = row <= -2 ? -(row + 2) : 0;
    const compareGroups = (g1, g2) => {
      if (groupLevels > 1) {
        return isGroupEqualAtLevel(g1, g2, clickedLevel, groupLevels);
      }
      return isGroupEqual(g1, g2);
    };
    for (let i = col - 1; i >= rowMarkerOffset; i--) {
      if (!compareGroups(needle.group, mangledCols[i].group)) break;
      start--;
    }
    for (let i_0 = col + 1; i_0 < mangledCols.length; i_0++) {
      if (!compareGroups(needle.group, mangledCols[i_0].group)) break;
      end++;
    }
    focus();
    if (isMultiKey || mouseArgs_0.isTouch || columnSelectionMode === "multi") {
      if (selectedColumns.hasAll([start, end + 1])) {
        let newVal = selectedColumns;
        for (let index = start; index <= end; index++) {
          newVal = newVal.remove(index);
        }
        setSelectedColumns(newVal, undefined, isMultiKey);
      } else {
        setSelectedColumns(undefined, [start, end + 1], isMultiKey);
      }
    } else {
      setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), undefined, isMultiKey);
    }
  };
  const normalSizeColumn = async col_0 => {
    if (getCellsForSelection !== undefined && onColumnResize !== undefined) {
      const start_0 = visibleRegionRef.current.y;
      const end_0 = visibleRegionRef.current.height;
      let cells = getCellsForSelection({
        x: col_0,
        y: start_0,
        width: 1,
        height: Math.min(end_0, rows - start_0)
      }, abortControllerRef.current.signal);
      if (typeof cells !== "object") {
        cells = await cells();
      }
      const inputCol = columns[col_0 - rowMarkerOffset];
      const offscreen = document.createElement("canvas");
      const ctx = offscreen.getContext("2d", {
        alpha: false
      });
      if (ctx !== null) {
        ctx.font = mergedTheme.baseFontFull;
        const newCol = measureColumn(ctx, mergedTheme, inputCol, 0, cells, minColumnWidth, maxColumnWidth, false, getCellRenderer);
        onColumnResize === null || onColumnResize === void 0 || onColumnResize(inputCol, newCol.width, col_0, newCol.width);
      }
    }
  };
  const fillPattern = async (previousSelection, currentSelection) => {
    var _previousSelection$cu, _gridRef$current;
    const patternRange = (_previousSelection$cu = previousSelection.current) === null || _previousSelection$cu === void 0 ? void 0 : _previousSelection$cu.range;
    if (patternRange === undefined || getCellsForSelection === undefined || currentSelection.current === undefined) {
      return;
    }
    const currentRange = currentSelection.current.range;
    if (onFillPattern !== undefined) {
      let canceled = false;
      onFillPattern({
        fillDestination: {
          ...currentRange,
          x: currentRange.x - rowMarkerOffset
        },
        patternSource: {
          ...patternRange,
          x: patternRange.x - rowMarkerOffset
        },
        preventDefault: () => canceled = true
      });
      if (canceled) return;
    }
    let cells_0 = getCellsForSelection(patternRange, abortControllerRef.current.signal);
    if (typeof cells_0 !== "object") cells_0 = await cells_0();
    const pattern = cells_0;
    const editItemList = [];
    for (let x = 0; x < currentRange.width; x++) {
      for (let y = 0; y < currentRange.height; y++) {
        const cell = [currentRange.x + x, currentRange.y + y];
        if (itemIsInRect(cell, patternRange)) continue;
        const patternCell = pattern[y % patternRange.height][x % patternRange.width];
        if (isInnerOnlyCell(patternCell) || !isReadWriteCell(patternCell)) continue;
        editItemList.push({
          location: cell,
          value: {
            ...patternCell
          }
        });
      }
    }
    mangledOnCellsEdited(editItemList);
    (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage(editItemList.map(c => ({
      cell: c.location
    })));
  };
  const fillRight = () => {
    if (gridSelection.current === undefined || gridSelection.current.range.width <= 1) return;
    const firstColSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          width: 1
        }
      }
    };
    void fillPattern(firstColSelection, gridSelection);
  };
  const fillDown = () => {
    if (gridSelection.current === undefined || gridSelection.current.range.height <= 1) return;
    const firstRowSelection = {
      ...gridSelection,
      current: {
        ...gridSelection.current,
        range: {
          ...gridSelection.current.range,
          height: 1
        }
      }
    };
    void fillPattern(firstRowSelection, gridSelection);
  };
  const onMouseUp = (mouseArgs_1, isOutside) => {
    var _mouse$previousSelect, _lastMouseSelectLocat;
    const mouse = mouseState;
    setMouseState(undefined);
    setFillHighlightRegion(undefined);
    setScrollDir(undefined);
    isActivelyDraggingHeader.current = false;
    if (isOutside) return;
    if ((mouse === null || mouse === void 0 ? void 0 : mouse.fillHandle) === true && gridSelection.current !== undefined && ((_mouse$previousSelect = mouse.previousSelection) === null || _mouse$previousSelect === void 0 ? void 0 : _mouse$previousSelect.current) !== undefined) {
      if (fillHighlightRegion === undefined) return;
      const newRange = {
        ...gridSelection,
        current: {
          ...gridSelection.current,
          range: combineRects(mouse.previousSelection.current.range, fillHighlightRegion)
        }
      };
      void fillPattern(mouse.previousSelection, newRange);
      setGridSelection(newRange, true);
      return;
    }
    const [col_1, row_0] = mouseArgs_1.location;
    const [lastMouseDownCol, lastMouseDownRow] = (_lastMouseSelectLocat = lastMouseSelectLocation.current) !== null && _lastMouseSelectLocat !== void 0 ? _lastMouseSelectLocat : [];
    const preventDefault = () => {
      isPrevented.current = true;
    };
    const handleMaybeClick = a => {
      const isValidClick = a.isTouch || lastMouseDownCol === col_1 && lastMouseDownRow === row_0;
      if (isValidClick) {
        onCellClicked === null || onCellClicked === void 0 || onCellClicked([col_1 - rowMarkerOffset, row_0], {
          ...a,
          preventDefault
        });
      }
      if (a.button === 1) return !isPrevented.current;
      if (!isPrevented.current) {
        var _c_0$activationBehavi;
        const c_0 = getMangledCellContent(mouseArgs_1.location);
        const r = getCellRenderer(c_0);
        if (r !== undefined && r.onClick !== undefined && isValidClick) {
          const newVal_0 = r.onClick({
            ...a,
            cell: c_0,
            posX: a.localEventX,
            posY: a.localEventY,
            bounds: a.bounds,
            theme: themeForCell(c_0, mouseArgs_1.location),
            preventDefault
          });
          if (newVal_0 !== undefined && !isInnerOnlyCell(newVal_0) && isEditableGridCell(newVal_0)) {
            var _gridRef$current2;
            mangledOnCellsEdited([{
              location: a.location,
              value: newVal_0
            }]);
            (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 || _gridRef$current2.damage([{
              cell: a.location
            }]);
          }
        }
        if (isPrevented.current || gridSelection.current === undefined) return false;
        let shouldActivate = false;
        switch ((_c_0$activationBehavi = c_0.activationBehaviorOverride) !== null && _c_0$activationBehavi !== void 0 ? _c_0$activationBehavi : cellActivationBehavior) {
          case "double-click":
          case "second-click":
            {
              var _mouse$previousSelect2;
              if ((mouse === null || mouse === void 0 || (_mouse$previousSelect2 = mouse.previousSelection) === null || _mouse$previousSelect2 === void 0 || (_mouse$previousSelect2 = _mouse$previousSelect2.current) === null || _mouse$previousSelect2 === void 0 ? void 0 : _mouse$previousSelect2.cell) === undefined) break;
              const [selectedCol, selectedRow] = gridSelection.current.cell;
              const [prevCol, prevRow] = mouse.previousSelection.current.cell;
              const isClickOnSelected = col_1 === selectedCol && col_1 === prevCol && row_0 === selectedRow && row_0 === prevRow;
              shouldActivate = isClickOnSelected && (a.isDoubleClick === true || cellActivationBehavior === "second-click");
              break;
            }
          case "single-click":
            {
              shouldActivate = true;
              break;
            }
        }
        if (shouldActivate) {
          var _c_0$activationBehavi2;
          const act = a.isDoubleClick === true ? "double-click" : (_c_0$activationBehavi2 = c_0.activationBehaviorOverride) !== null && _c_0$activationBehavi2 !== void 0 ? _c_0$activationBehavi2 : cellActivationBehavior;
          const activationEvent = {
            inputType: "pointer",
            pointerActivation: act,
            pointerType: a.isTouch ? "touch" : "mouse"
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col_1 - rowMarkerOffset, row_0], activationEvent);
          reselect(a.bounds, activationEvent);
          return true;
        }
      }
      return false;
    };
    const clickLocation = mouseArgs_1.location[0] - rowMarkerOffset;
    if (mouseArgs_1.isTouch) {
      const vr = visibleRegionRef.current;
      const touchVr = touchDownArgs.current;
      if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
        return;
      }
      if (mouseArgs_1.isLongTouch === true) {
        var _gridSelection$curren;
        if (mouseArgs_1.kind === "cell" && itemsAreEqual((_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell, mouseArgs_1.location)) {
          onCellContextMenu === null || onCellContextMenu === void 0 || onCellContextMenu([clickLocation, mouseArgs_1.location[1]], {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        } else if (mouseArgs_1.kind === "header" && gridSelection.columns.hasIndex(col_1)) {
          onHeaderContextMenu === null || onHeaderContextMenu === void 0 || onHeaderContextMenu(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        } else if (mouseArgs_1.kind === groupHeaderKind) {
          if (clickLocation < 0) {
            return;
          }
          onGroupHeaderContextMenu === null || onGroupHeaderContextMenu === void 0 || onGroupHeaderContextMenu(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
          return;
        }
      }
      if (mouseArgs_1.kind === "cell") {
        if (!handleMaybeClick(mouseArgs_1)) {
          handleSelect(mouseArgs_1);
        }
      } else if (mouseArgs_1.kind === groupHeaderKind) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
      } else {
        if (mouseArgs_1.kind === headerKind) {
          onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
            ...mouseArgs_1,
            preventDefault
          });
        }
        handleSelect(mouseArgs_1);
      }
      return;
    }
    if (mouseArgs_1.kind === "header") {
      if (clickLocation < 0) {
        return;
      }
      if (mouseArgs_1.isEdge) {
        if (mouseArgs_1.isDoubleClick === true) {
          void normalSizeColumn(col_1);
        }
      } else if (mouseArgs_1.button === 0 && col_1 === lastMouseDownCol && row_0 === lastMouseDownRow) {
        onHeaderClicked === null || onHeaderClicked === void 0 || onHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
      }
    }
    if (mouseArgs_1.kind === groupHeaderKind) {
      if (clickLocation < 0) {
        return;
      }
      if (mouseArgs_1.button === 0 && col_1 === lastMouseDownCol && row_0 === lastMouseDownRow) {
        onGroupHeaderClicked === null || onGroupHeaderClicked === void 0 || onGroupHeaderClicked(clickLocation, {
          ...mouseArgs_1,
          preventDefault
        });
        if (!isPrevented.current) {
          handleGroupHeaderSelection(mouseArgs_1);
        }
      }
    }
    if (mouseArgs_1.kind === "cell" && (mouseArgs_1.button === 0 || mouseArgs_1.button === 1)) {
      handleMaybeClick(mouseArgs_1);
    }
    lastMouseSelectLocation.current = undefined;
  };
  const onMouseMoveImpl = mouseArgs_2 => {
    const a_0 = {
      ...mouseArgs_2,
      location: [mouseArgs_2.location[0] - rowMarkerOffset, mouseArgs_2.location[1]]
    };
    onMouseMove === null || onMouseMove === void 0 || onMouseMove(a_0);
    if (mouseState !== undefined && mouseArgs_2.buttons === 0) {
      setMouseState(undefined);
      setFillHighlightRegion(undefined);
      setScrollDir(undefined);
      isActivelyDraggingHeader.current = false;
    }
    setScrollDir(cv => {
      var _mouseDownData$curren, _mouseDownData$curren2;
      if (isActivelyDraggingHeader.current) return [mouseArgs_2.scrollEdge[0], 0];
      if (mouseArgs_2.scrollEdge[0] === (cv === null || cv === void 0 ? void 0 : cv[0]) && mouseArgs_2.scrollEdge[1] === cv[1]) return cv;
      return mouseState === undefined || ((_mouseDownData$curren = (_mouseDownData$curren2 = mouseDownData.current) === null || _mouseDownData$curren2 === void 0 ? void 0 : _mouseDownData$curren2.location[0]) !== null && _mouseDownData$curren !== void 0 ? _mouseDownData$curren : 0) < rowMarkerOffset ? undefined : mouseArgs_2.scrollEdge;
    });
  };
  return {
    onMouseDown,
    onMouseUp,
    onMouseMoveImpl,
    handleGroupHeaderSelection,
    normalSizeColumn,
    fillDown,
    fillRight,
    mouseDownData,
    isActivelyDraggingHeader
  };
}
//# sourceMappingURL=use-mouse-handlers.js.map