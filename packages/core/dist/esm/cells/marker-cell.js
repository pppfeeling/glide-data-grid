import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind } from "../internal/data-grid/data-grid-types.js";
import { drawCheckbox } from "../internal/data-grid/render/draw-checkbox.js";
export const markerCellRenderer = {
  getAccessibilityString: c => c.row.toString(),
  kind: InnerGridCellKind.Marker,
  needsHover: true,
  needsHoverPosition: false,
  drawPrep: prepMarkerRowCell,
  measure: () => 44,
  draw: a => drawMarkerRowCell(a, a.cell.row, a.cell.checked, a.cell.markerKind, a.cell.drawHandle, a.cell.checkboxStyle, a.cell.disabled),
  onClick: e => {
    const {
      bounds,
      cell,
      posX: x,
      posY: y
    } = e;
    if (cell.disabled === true) return;
    const {
      width,
      height
    } = bounds;
    const centerX = cell.drawHandle ? 7 + (width - 7) / 2 : width / 2;
    const centerY = height / 2;
    if (Math.abs(x - centerX) <= 10 && Math.abs(y - centerY) <= 10) {
      return {
        ...cell,
        checked: !cell.checked
      };
    }
    return undefined;
  },
  onPaste: () => undefined
};
function prepMarkerRowCell(args, lastPrep) {
  const {
    ctx,
    theme
  } = args;
  const newFont = theme.markerFontFull;
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepMarkerRowCell;
  ctx.textAlign = "center";
  return result;
}
function deprepMarkerRowCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawMarkerRowCell(args, index, checked, markerKind, drawHandle, style, disabled) {
  if (disabled) {
    const {
      ctx,
      rect,
      theme
    } = args;
    const {
      x,
      y,
      width,
      height
    } = rect;
    const mKind = markerKind === "checkbox" ? "checkbox-visible" : markerKind;
    if (mKind !== "number") {
      ctx.globalAlpha = checked ? 1 : 0.4;
      drawCheckbox(ctx, theme, checked, drawHandle ? x + 7 : x, y, drawHandle ? width - 7 : width, height, false, -20, -20, theme.checkboxMaxSize, "center", style, true);
      ctx.globalAlpha = 1;
    }
    if (mKind === "number" || mKind === "both" && !checked) {
      const text = index.toString();
      const fontStyle = theme.markerFontFull;
      const start = x + width / 2;
      ctx.fillStyle = "#cccccc";
      ctx.font = fontStyle;
      ctx.fillText(text, start, y + height / 2 + getMiddleCenterBias(ctx, fontStyle));
    }
    if (drawHandle) {
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
        }
      }
      ctx.fillStyle = "#cccccc";
      ctx.fill();
      ctx.beginPath();
      ctx.globalAlpha = 1;
    }
    return;
  }
  const {
    ctx,
    rect,
    hoverAmount,
    theme
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const checkedboxAlpha = checked ? 1 : markerKind === "checkbox-visible" ? 0.6 + 0.4 * hoverAmount : hoverAmount;
  if (markerKind !== "number" && checkedboxAlpha > 0) {
    ctx.globalAlpha = checkedboxAlpha;
    const offsetAmount = 7 * (checked ? hoverAmount : 1);
    drawCheckbox(ctx, theme, checked, drawHandle ? x + offsetAmount : x, y, drawHandle ? width - offsetAmount : width, height, true, undefined, undefined, theme.checkboxMaxSize, "center", style, disabled);
    if (drawHandle) {
      ctx.globalAlpha = hoverAmount;
      ctx.beginPath();
      for (const xOffset of [3, 6]) {
        for (const yOffset of [-5, -1, 3]) {
          ctx.rect(x + xOffset, y + height / 2 + yOffset, 2, 2);
        }
      }
      ctx.fillStyle = theme.textLight;
      ctx.fill();
      ctx.beginPath();
    }
    ctx.globalAlpha = 1;
  }
  if (markerKind === "number" || markerKind === "both" && !checked) {
    const text = index.toString();
    const fontStyle = theme.markerFontFull;
    const start = x + width / 2;
    if (markerKind === "both" && hoverAmount !== 0) {
      ctx.globalAlpha = 1 - hoverAmount;
    }
    ctx.fillStyle = theme.textLight;
    ctx.font = fontStyle;
    ctx.fillText(text, start, y + height / 2 + getMiddleCenterBias(ctx, fontStyle));
    if (hoverAmount !== 0) {
      ctx.globalAlpha = 1;
    }
  }
}
//# sourceMappingURL=marker-cell.js.map