import * as React from "react";
import { drawTextCell, prepTextCell } from "../internal/data-grid/render/data-grid-lib.js";
import { GridCellKind } from "../internal/data-grid/data-grid-types.js";
import { drawEditHoverIndicator } from "../internal/data-grid/render/draw-edit-hover-indicator.js";
const NumberOverlayEditor = React.lazy(async () => await import("../internal/data-grid-overlay-editor/private/number-overlay-editor.js"));
export const numberCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "";
  },
  kind: GridCellKind.Number,
  needsHover: cell => cell.hoverEffect === true,
  needsHoverPosition: false,
  useLabel: true,
  drawPrep: prepTextCell,
  draw: a => {
    const {
      hoverAmount,
      cell,
      ctx,
      theme,
      rect,
      overrideCursor
    } = a;
    const {
      hoverEffect,
      displayData,
      hoverEffectTheme
    } = cell;
    if (hoverEffect === true && hoverAmount > 0) {
      drawEditHoverIndicator(ctx, theme, hoverEffectTheme, displayData, rect, hoverAmount, overrideCursor);
    }
    drawTextCell(a, a.cell.displayData, a.cell.contentAlign);
  },
  measure: (ctx, cell, theme) => ctx.measureText(cell.displayData).width + theme.cellHorizontalPadding * 2,
  onDelete: c => ({
    ...c,
    data: undefined
  }),
  provideEditor: () => p => {
    const {
      isHighlighted,
      onChange,
      onFinishedEditing,
      value,
      validatedSelection
    } = p;
    return React.createElement(React.Suspense, {
      fallback: null
    }, React.createElement(NumberOverlayEditor, {
      highlight: isHighlighted,
      disabled: value.readonly === true,
      value: value.data,
      fixedDecimals: value.fixedDecimals,
      allowNegative: value.allowNegative,
      thousandSeparator: value.thousandSeparator,
      decimalSeparator: value.decimalSeparator,
      validatedSelection: validatedSelection,
      onChange: x => {
        var _x$floatValue;
        return onChange({
          ...value,
          data: Number.isNaN((_x$floatValue = x.floatValue) !== null && _x$floatValue !== void 0 ? _x$floatValue : 0) ? 0 : x.floatValue
        });
      },
      onKeyDown: e => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          onFinishedEditing(value, [0, 1]);
        } else if (e.key === "Tab") {
          e.preventDefault();
          onFinishedEditing(value, [e.shiftKey ? -1 : 1, 0]);
        } else if (e.key === "Escape") {
          e.preventDefault();
          onFinishedEditing(undefined, [0, 0]);
        }
      }
    }));
  },
  onPaste: (toPaste, cell, details) => {
    var _details$formattedStr;
    const newNumber = typeof details.rawValue === "number" ? details.rawValue : Number.parseFloat(typeof details.rawValue === "string" ? details.rawValue : toPaste);
    if (Number.isNaN(newNumber) || cell.data === newNumber) return undefined;
    return {
      ...cell,
      data: newNumber,
      displayData: (_details$formattedStr = details.formattedString) !== null && _details$formattedStr !== void 0 ? _details$formattedStr : cell.displayData
    };
  }
};
//# sourceMappingURL=number-cell.js.map