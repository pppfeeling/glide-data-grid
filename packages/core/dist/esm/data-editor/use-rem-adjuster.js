import React from "react";
import { getDataEditorTheme } from "../common/styles.js";
export function useRemAdjuster(_ref) {
  let {
    rowHeight: rowHeightIn,
    headerHeight: headerHeightIn,
    groupHeaderHeight: groupHeaderHeightIn,
    theme: themeIn,
    overscrollX: overscrollXIn,
    overscrollY: overscrollYIn,
    scaleToRem,
    remSize
  } = _ref;
  const [rowHeight, headerHeight, groupHeaderHeight, theme, overscrollX, overscrollY] = ((_themeIn$headerIconSi, _themeIn$cellHorizont, _themeIn$cellVertical) => {
    if (!scaleToRem || remSize === 16) return [rowHeightIn, headerHeightIn, groupHeaderHeightIn, themeIn, overscrollXIn, overscrollYIn];
    const scaler = remSize / 16;
    const rh = rowHeightIn;
    const bt = getDataEditorTheme();
    return [typeof rh === "number" ? rh * scaler : n => Math.ceil(rh(n) * scaler), Math.ceil(headerHeightIn * scaler), Math.ceil(groupHeaderHeightIn * scaler), {
      ...themeIn,
      headerIconSize: ((_themeIn$headerIconSi = themeIn === null || themeIn === void 0 ? void 0 : themeIn.headerIconSize) !== null && _themeIn$headerIconSi !== void 0 ? _themeIn$headerIconSi : bt.headerIconSize) * scaler,
      cellHorizontalPadding: ((_themeIn$cellHorizont = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellHorizontalPadding) !== null && _themeIn$cellHorizont !== void 0 ? _themeIn$cellHorizont : bt.cellHorizontalPadding) * scaler,
      cellVerticalPadding: ((_themeIn$cellVertical = themeIn === null || themeIn === void 0 ? void 0 : themeIn.cellVerticalPadding) !== null && _themeIn$cellVertical !== void 0 ? _themeIn$cellVertical : bt.cellVerticalPadding) * scaler
    }, Math.ceil((overscrollXIn !== null && overscrollXIn !== void 0 ? overscrollXIn : 0) * scaler), Math.ceil((overscrollYIn !== null && overscrollYIn !== void 0 ? overscrollYIn : 0) * scaler)];
  })();
  return {
    rowHeight,
    headerHeight,
    groupHeaderHeight,
    theme,
    overscrollX,
    overscrollY
  };
}
//# sourceMappingURL=use-rem-adjuster.js.map