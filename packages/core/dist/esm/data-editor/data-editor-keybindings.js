import { c as _c } from "react/compiler-runtime";
import React from "react";
import { browserIsOSX } from "../common/browser-detect.js";
import { useDeepMemo } from "../common/utils.js";
export const keybindingDefaults = {
  downFill: false,
  rightFill: false,
  clear: true,
  closeOverlay: true,
  acceptOverlayDown: true,
  acceptOverlayUp: true,
  acceptOverlayLeft: true,
  acceptOverlayRight: true,
  copy: true,
  paste: true,
  cut: true,
  search: false,
  delete: true,
  activateCell: true,
  scrollToSelectedCell: true,
  goToFirstCell: true,
  goToFirstColumn: true,
  goToFirstRow: true,
  goToLastCell: true,
  goToLastColumn: true,
  goToLastRow: true,
  goToNextPage: true,
  goToPreviousPage: true,
  selectToFirstCell: true,
  selectToFirstColumn: true,
  selectToFirstRow: true,
  selectToLastCell: true,
  selectToLastColumn: true,
  selectToLastRow: true,
  selectAll: true,
  selectRow: true,
  selectColumn: true,
  goUpCell: true,
  goRightCell: true,
  goDownCell: true,
  goLeftCell: true,
  goUpCellRetainSelection: true,
  goRightCellRetainSelection: true,
  goDownCellRetainSelection: true,
  goLeftCellRetainSelection: true,
  selectGrowUp: true,
  selectGrowRight: true,
  selectGrowDown: true,
  selectGrowLeft: true
};
function realizeKeybind(keybind, defaultVal) {
  if (keybind === true) return defaultVal;
  if (keybind === false) return "";
  return keybind;
}
export function realizeKeybinds(keybinds) {
  const isOSX = browserIsOSX.value;
  return {
    activateCell: realizeKeybind(keybinds.activateCell, " |Enter|shift+Enter"),
    clear: realizeKeybind(keybinds.clear, "any+Escape"),
    closeOverlay: realizeKeybind(keybinds.closeOverlay, "any+Escape"),
    acceptOverlayDown: realizeKeybind(keybinds.acceptOverlayDown, "Enter"),
    acceptOverlayUp: realizeKeybind(keybinds.acceptOverlayUp, "shift+Enter"),
    acceptOverlayLeft: realizeKeybind(keybinds.acceptOverlayLeft, "shift+Tab"),
    acceptOverlayRight: realizeKeybind(keybinds.acceptOverlayRight, "Tab"),
    copy: keybinds.copy,
    cut: keybinds.cut,
    delete: realizeKeybind(keybinds.delete, isOSX ? "Backspace|Delete" : "Delete"),
    downFill: realizeKeybind(keybinds.downFill, "primary+_68"),
    scrollToSelectedCell: realizeKeybind(keybinds.scrollToSelectedCell, "primary+Enter"),
    goDownCell: realizeKeybind(keybinds.goDownCell, "ArrowDown"),
    goDownCellRetainSelection: realizeKeybind(keybinds.goDownCellRetainSelection, "alt+ArrowDown"),
    goLeftCell: realizeKeybind(keybinds.goLeftCell, "ArrowLeft|shift+Tab"),
    goLeftCellRetainSelection: realizeKeybind(keybinds.goLeftCellRetainSelection, "alt+ArrowLeft"),
    goRightCell: realizeKeybind(keybinds.goRightCell, "ArrowRight|Tab"),
    goRightCellRetainSelection: realizeKeybind(keybinds.goRightCellRetainSelection, "alt+ArrowRight"),
    goUpCell: realizeKeybind(keybinds.goUpCell, "ArrowUp"),
    goUpCellRetainSelection: realizeKeybind(keybinds.goUpCellRetainSelection, "alt+ArrowUp"),
    goToFirstCell: realizeKeybind(keybinds.goToFirstCell, "primary+Home"),
    goToFirstColumn: realizeKeybind(keybinds.goToFirstColumn, "Home|primary+ArrowLeft"),
    goToFirstRow: realizeKeybind(keybinds.goToFirstRow, "primary+ArrowUp"),
    goToLastCell: realizeKeybind(keybinds.goToLastCell, "primary+End"),
    goToLastColumn: realizeKeybind(keybinds.goToLastColumn, "End|primary+ArrowRight"),
    goToLastRow: realizeKeybind(keybinds.goToLastRow, "primary+ArrowDown"),
    goToNextPage: realizeKeybind(keybinds.goToNextPage, "PageDown"),
    goToPreviousPage: realizeKeybind(keybinds.goToPreviousPage, "PageUp"),
    paste: keybinds.paste,
    rightFill: realizeKeybind(keybinds.rightFill, "primary+_82"),
    search: realizeKeybind(keybinds.search, "primary+f"),
    selectAll: realizeKeybind(keybinds.selectAll, "primary+a"),
    selectColumn: realizeKeybind(keybinds.selectColumn, "ctrl+ "),
    selectGrowDown: realizeKeybind(keybinds.selectGrowDown, "shift+ArrowDown"),
    selectGrowLeft: realizeKeybind(keybinds.selectGrowLeft, "shift+ArrowLeft"),
    selectGrowRight: realizeKeybind(keybinds.selectGrowRight, "shift+ArrowRight"),
    selectGrowUp: realizeKeybind(keybinds.selectGrowUp, "shift+ArrowUp"),
    selectRow: realizeKeybind(keybinds.selectRow, "shift+ "),
    selectToFirstCell: realizeKeybind(keybinds.selectToFirstCell, "primary+shift+Home"),
    selectToFirstColumn: realizeKeybind(keybinds.selectToFirstColumn, "primary+shift+ArrowLeft"),
    selectToFirstRow: realizeKeybind(keybinds.selectToFirstRow, "primary+shift+ArrowUp"),
    selectToLastCell: realizeKeybind(keybinds.selectToLastCell, "primary+shift+End"),
    selectToLastColumn: realizeKeybind(keybinds.selectToLastColumn, "primary+shift+ArrowRight"),
    selectToLastRow: realizeKeybind(keybinds.selectToLastRow, "primary+shift+ArrowDown")
  };
}
export function useKeybindingsWithDefaults(keybindingsIn) {
  const $ = _c(9);
  const keys = useDeepMemo(keybindingsIn);
  let t0;
  bb0: {
    var _ref, _keys$goToNextPage, _ref2, _keys$goToPreviousPag, _ref3, _keys$goToFirstCell, _ref4, _keys$goToLastCell, _ref5, _keys$selectToFirstCe, _ref6, _keys$selectToLastCel;
    if (keys === undefined) {
      let t1;
      if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = realizeKeybinds(keybindingDefaults);
        $[0] = t1;
      } else {
        t1 = $[0];
      }
      t0 = t1;
      break bb0;
    }
    const t1 = (_ref = (_keys$goToNextPage = keys === null || keys === void 0 ? void 0 : keys.goToNextPage) !== null && _keys$goToNextPage !== void 0 ? _keys$goToNextPage : keys === null || keys === void 0 ? void 0 : keys.pageDown) !== null && _ref !== void 0 ? _ref : keybindingDefaults.goToNextPage;
    const t2 = (_ref2 = (_keys$goToPreviousPag = keys === null || keys === void 0 ? void 0 : keys.goToPreviousPage) !== null && _keys$goToPreviousPag !== void 0 ? _keys$goToPreviousPag : keys === null || keys === void 0 ? void 0 : keys.pageUp) !== null && _ref2 !== void 0 ? _ref2 : keybindingDefaults.goToPreviousPage;
    const t3 = (_ref3 = (_keys$goToFirstCell = keys === null || keys === void 0 ? void 0 : keys.goToFirstCell) !== null && _keys$goToFirstCell !== void 0 ? _keys$goToFirstCell : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref3 !== void 0 ? _ref3 : keybindingDefaults.goToFirstCell;
    const t4 = (_ref4 = (_keys$goToLastCell = keys === null || keys === void 0 ? void 0 : keys.goToLastCell) !== null && _keys$goToLastCell !== void 0 ? _keys$goToLastCell : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref4 !== void 0 ? _ref4 : keybindingDefaults.goToLastCell;
    const t5 = (_ref5 = (_keys$selectToFirstCe = keys === null || keys === void 0 ? void 0 : keys.selectToFirstCell) !== null && _keys$selectToFirstCe !== void 0 ? _keys$selectToFirstCe : keys === null || keys === void 0 ? void 0 : keys.first) !== null && _ref5 !== void 0 ? _ref5 : keybindingDefaults.selectToFirstCell;
    const t6 = (_ref6 = (_keys$selectToLastCel = keys === null || keys === void 0 ? void 0 : keys.selectToLastCell) !== null && _keys$selectToLastCel !== void 0 ? _keys$selectToLastCel : keys === null || keys === void 0 ? void 0 : keys.last) !== null && _ref6 !== void 0 ? _ref6 : keybindingDefaults.selectToLastCell;
    let t7;
    if ($[1] !== keys || $[2] !== t1 || $[3] !== t2 || $[4] !== t3 || $[5] !== t4 || $[6] !== t5 || $[7] !== t6) {
      const withBackCompatApplied = {
        ...keys,
        goToNextPage: t1,
        goToPreviousPage: t2,
        goToFirstCell: t3,
        goToLastCell: t4,
        selectToFirstCell: t5,
        selectToLastCell: t6
      };
      t7 = realizeKeybinds({
        ...keybindingDefaults,
        ...withBackCompatApplied
      });
      $[1] = keys;
      $[2] = t1;
      $[3] = t2;
      $[4] = t3;
      $[5] = t4;
      $[6] = t5;
      $[7] = t6;
      $[8] = t7;
    } else {
      t7 = $[8];
    }
    t0 = t7;
  }
  return t0;
}
//# sourceMappingURL=data-editor-keybindings.js.map