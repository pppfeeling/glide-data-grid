import * as React from "react";
import { GridCellKind, isReadWriteCell } from "../internal/data-grid/data-grid-types.js";
const onGhostCompositionEnd = _finalValue => {};
export function useGhostInput(args) {
  const {
    state,
    onKeyDown,
    onFinishEditing,
    onKeyUpIn,
    onCellActivated,
    setIsFocused
  } = args;
  const {
    gridSelection,
    overlayRef,
    ghostInputRef,
    ghostInputVisibleRef,
    gridRef,
    rowMarkerOffset,
    getMangledCellContent,
    reselect
  } = state;
  const onGhostInput = (value, composing) => {
    if (overlayRef.current !== undefined) {
      return;
    }
    if (!composing && value.length > 0 && value.trim().length > 0 && gridSelection.current !== undefined) {
      const [col, row] = gridSelection.current.cell;
      const cell = getMangledCellContent([col, row]);
      if (cell.kind === GridCellKind.Custom) {
        const cellData = cell.data;
        const cellKind = cellData === null || cellData === void 0 ? void 0 : cellData.kind;
        if (cellKind !== 'number-cell' && cellKind !== 'date-picker-cell') {
          return;
        }
      }
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
        var _gridRef$current;
        const bounds = (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 ? void 0 : _gridRef$current.getBounds(col, row);
        if (bounds !== undefined) {
          const activation = {
            inputType: "keyboard",
            key: value
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activation);
          reselect(bounds, activation, value);
        }
      }
    }
  };
  const onGhostCompositionStart = () => {
    var _overlayRef$current;
    if (gridSelection.current === undefined) return;
    const [col, row] = gridSelection.current.cell;
    const currentOverlayCell = (_overlayRef$current = overlayRef.current) === null || _overlayRef$current === void 0 ? void 0 : _overlayRef$current.cell;
    if (currentOverlayCell !== undefined && (currentOverlayCell[0] !== col || currentOverlayCell[1] !== row)) {
      var _ghostInputRef$curren, _ghostInputRef$curren2;
      (_ghostInputRef$curren = ghostInputRef.current) === null || _ghostInputRef$curren === void 0 || _ghostInputRef$curren.clear();
      (_ghostInputRef$curren2 = ghostInputRef.current) === null || _ghostInputRef$curren2 === void 0 || _ghostInputRef$curren2.setVisible(false);
      state.setGhostInputVisible(false);
      overlayRef.current = undefined;
      state.setOverlay(undefined);
    }
    if (overlayRef.current === undefined) {
      const cell = getMangledCellContent([col, row]);
      if (cell.kind === GridCellKind.Custom) {
        const cellData = cell.data;
        const cellKind = cellData === null || cellData === void 0 ? void 0 : cellData.kind;
        if (cellKind !== 'number-cell' && cellKind !== 'date-picker-cell') {
          return;
        }
      }
      if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
        var _gridRef$current2;
        const bounds = (_gridRef$current2 = gridRef.current) === null || _gridRef$current2 === void 0 ? void 0 : _gridRef$current2.getBounds(col, row);
        if (bounds !== undefined) {
          var _ghostInputRef$curren3;
          (_ghostInputRef$curren3 = ghostInputRef.current) === null || _ghostInputRef$curren3 === void 0 || _ghostInputRef$curren3.clear();
          const activation = {
            inputType: "keyboard",
            key: ""
          };
          onCellActivated === null || onCellActivated === void 0 || onCellActivated([col - rowMarkerOffset, row], activation);
          reselect(bounds, activation, "");
        }
      }
    }
  };
  const onGhostKeyDown = event => {
    var _gridSelection$curren, _gridRef$current3;
    if (event.nativeEvent.isComposing) {
      return;
    }
    if (overlayRef.current !== undefined && ghostInputVisibleRef.current) {
      const key = event.key;
      const cellContent = overlayRef.current.content;
      if (cellContent.kind === GridCellKind.Custom) {
        if (key === "Enter" || key === "Tab" || key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      if (key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(undefined, [0, 0]);
        return;
      }
      if (key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(undefined, [0, 1]);
        return;
      }
      if (key === "Tab") {
        event.preventDefault();
        event.stopPropagation();
        onFinishEditing(undefined, event.shiftKey ? [-1, 0] : [1, 0]);
        return;
      }
    }
    {
      const key = event.key;
      const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
      if (isPrintable) {
        if (key === " " && gridSelection.current !== undefined) {
          const cell = gridSelection.current.cell;
          const cellContent = getMangledCellContent(cell);
          if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {} else {
            return;
          }
        } else {
          return;
        }
      }
    }
    if (overlayRef.current !== undefined && ghostInputVisibleRef.current) {
      const key = event.key;
      const isEditingKey = key === "Backspace" || key === "Delete";
      const isCursorKey = key === "ArrowLeft" || key === "ArrowRight" || key === "ArrowUp" || key === "ArrowDown" || key === "Home" || key === "End";
      if (isEditingKey || isCursorKey) {
        return;
      }
    }
    const cell = (_gridSelection$curren = gridSelection.current) === null || _gridSelection$curren === void 0 ? void 0 : _gridSelection$curren.cell;
    const bounds = cell !== undefined ? (_gridRef$current3 = gridRef.current) === null || _gridRef$current3 === void 0 ? void 0 : _gridRef$current3.getBounds(cell[0], cell[1]) : undefined;
    let cancelled = false;
    const gridArgs = {
      bounds,
      cancel: () => {
        cancelled = true;
      },
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location: cell
    };
    onKeyDown(gridArgs);
    if (cancelled) {
      event.preventDefault();
      event.stopPropagation();
    }
  };
  const onGhostKeyUp = event => {
    var _gridSelection$curren2, _gridRef$current4;
    const cell = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.cell;
    const bounds = cell !== undefined ? (_gridRef$current4 = gridRef.current) === null || _gridRef$current4 === void 0 ? void 0 : _gridRef$current4.getBounds(cell[0], cell[1]) : undefined;
    const gridArgs = {
      bounds,
      cancel: () => {},
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      key: event.key,
      keyCode: event.keyCode,
      rawEvent: event,
      location: cell
    };
    onKeyUpIn === null || onKeyUpIn === void 0 || onKeyUpIn(gridArgs);
  };
  const onGhostFocus = () => {
    setIsFocused(true);
  };
  const onGhostBlur = () => {
    setIsFocused(false);
  };
  return {
    onGhostInput,
    onGhostCompositionStart,
    onGhostCompositionEnd,
    onGhostKeyDown,
    onGhostKeyUp,
    onGhostFocus,
    onGhostBlur
  };
}
//# sourceMappingURL=use-ghost-input.js.map