import React from "react";
import { blend } from "../internal/data-grid/color-parser.js";
export function makeCSSStyle(theme) {
  var _theme$textGroupHeade, _theme$bgGroupHeader, _theme$bgGroupHeaderH, _theme$horizontalBord;
  return {
    "--gdg-accent-color": theme.accentColor,
    "--gdg-accent-fg": theme.accentFg,
    "--gdg-accent-light": theme.accentLight,
    "--gdg-text-dark": theme.textDark,
    "--gdg-text-medium": theme.textMedium,
    "--gdg-text-light": theme.textLight,
    "--gdg-text-bubble": theme.textBubble,
    "--gdg-bg-icon-header": theme.bgIconHeader,
    "--gdg-fg-icon-header": theme.fgIconHeader,
    "--gdg-text-header": theme.textHeader,
    "--gdg-text-group-header": (_theme$textGroupHeade = theme.textGroupHeader) !== null && _theme$textGroupHeade !== void 0 ? _theme$textGroupHeade : theme.textHeader,
    "--gdg-bg-group-header": (_theme$bgGroupHeader = theme.bgGroupHeader) !== null && _theme$bgGroupHeader !== void 0 ? _theme$bgGroupHeader : theme.bgHeader,
    "--gdg-bg-group-header-hovered": (_theme$bgGroupHeaderH = theme.bgGroupHeaderHovered) !== null && _theme$bgGroupHeaderH !== void 0 ? _theme$bgGroupHeaderH : theme.bgHeaderHovered,
    "--gdg-text-header-selected": theme.textHeaderSelected,
    "--gdg-bg-cell": theme.bgCell,
    "--gdg-bg-cell-medium": theme.bgCellMedium,
    "--gdg-bg-header": theme.bgHeader,
    "--gdg-bg-header-has-focus": theme.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": theme.bgHeaderHovered,
    "--gdg-bg-bubble": theme.bgBubble,
    "--gdg-bg-bubble-selected": theme.bgBubbleSelected,
    "--gdg-bubble-height": `${theme.bubbleHeight}px`,
    "--gdg-bubble-padding": `${theme.bubblePadding}px`,
    "--gdg-bubble-margin": `${theme.bubbleMargin}px`,
    "--gdg-bg-search-result": theme.bgSearchResult,
    "--gdg-border-color": theme.borderColor,
    "--gdg-horizontal-border-color": (_theme$horizontalBord = theme.horizontalBorderColor) !== null && _theme$horizontalBord !== void 0 ? _theme$horizontalBord : theme.borderColor,
    "--gdg-drilldown-border": theme.drilldownBorder,
    "--gdg-link-color": theme.linkColor,
    "--gdg-cell-horizontal-padding": `${theme.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${theme.cellVerticalPadding}px`,
    "--gdg-header-font-style": theme.headerFontStyle,
    "--gdg-base-font-style": theme.baseFontStyle,
    "--gdg-marker-font-style": theme.markerFontStyle,
    "--gdg-font-family": theme.fontFamily,
    "--gdg-editor-font-size": theme.editorFontSize,
    "--gdg-checkbox-max-size": `${theme.checkboxMaxSize}px`,
    ...(theme.resizeIndicatorColor === undefined ? {} : {
      "--gdg-resize-indicator-color": theme.resizeIndicatorColor
    }),
    ...(theme.headerBottomBorderColor === undefined ? {} : {
      "--gdg-header-bottom-border-color": theme.headerBottomBorderColor
    }),
    ...(theme.roundingRadius === undefined ? {} : {
      "--gdg-rounding-radius": `${theme.roundingRadius}px`
    })
  };
}
const dataEditorBaseTheme = {
  accentColor: "#4F5DFF",
  accentFg: "#FFFFFF",
  accentLight: "rgba(62, 116, 253, 0.1)",
  textDark: "#313139",
  textMedium: "#737383",
  textLight: "#B2B2C0",
  textBubble: "#313139",
  bgIconHeader: "#737383",
  fgIconHeader: "#FFFFFF",
  textHeader: "#313139",
  textGroupHeader: "#313139BB",
  textHeaderSelected: "#FFFFFF",
  bgCell: "#FFFFFF",
  bgCellMedium: "#FAFAFB",
  bgHeader: "#F7F7F8",
  bgHeaderHasFocus: "#E9E9EB",
  bgHeaderHovered: "#EFEFF1",
  bgBubble: "#EDEDF3",
  bgBubbleSelected: "#FFFFFF",
  bubbleHeight: 20,
  bubblePadding: 6,
  bubbleMargin: 4,
  bgSearchResult: "#fff9e3",
  borderColor: "rgba(115, 116, 131, 0.16)",
  drilldownBorder: "rgba(0, 0, 0, 0)",
  linkColor: "#353fb5",
  cellHorizontalPadding: 8,
  cellVerticalPadding: 3,
  headerIconSize: 18,
  headerFontStyle: "600 13px",
  baseFontStyle: "13px",
  markerFontStyle: "9px",
  fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
  editorFontSize: "13px",
  lineHeight: 1.4,
  checkboxMaxSize: 18
};
export function getDataEditorTheme() {
  return dataEditorBaseTheme;
}
export const ThemeContext = React.createContext(dataEditorBaseTheme);
export function useTheme() {
  return React.useContext(ThemeContext);
}
export function mergeAndRealizeTheme(theme) {
  const merged = {
    ...theme
  };
  for (var _len = arguments.length, overlays = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    overlays[_key - 1] = arguments[_key];
  }
  for (const overlay of overlays) {
    if (overlay !== undefined) {
      for (const key in overlay) {
        if (overlay.hasOwnProperty(key)) {
          if (key === "bgCell") {
            merged[key] = blend(overlay[key], merged[key]);
          } else {
            merged[key] = overlay[key];
          }
        }
      }
    }
  }
  if (merged.headerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.headerFontStyle !== merged.headerFontStyle) {
    merged.headerFontFull = `${merged.headerFontStyle} ${merged.fontFamily}`;
  }
  if (merged.baseFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.baseFontStyle !== merged.baseFontStyle) {
    merged.baseFontFull = `${merged.baseFontStyle} ${merged.fontFamily}`;
  }
  if (merged.markerFontFull === undefined || theme.fontFamily !== merged.fontFamily || theme.markerFontStyle !== merged.markerFontStyle) {
    merged.markerFontFull = `${merged.markerFontStyle} ${merged.fontFamily}`;
  }
  return merged;
}
//# sourceMappingURL=styles.js.map