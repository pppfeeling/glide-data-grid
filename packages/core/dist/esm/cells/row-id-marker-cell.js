import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind } from "../internal/data-grid/data-grid-types.js";
export const rowIdMarkerCellRenderer = {
  getAccessibilityString: c => {
    var _c$rowId;
    return (_c$rowId = c.rowId) !== null && _c$rowId !== void 0 ? _c$rowId : "";
  },
  kind: InnerGridCellKind.RowId,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: prepRowIdMarkerCell,
  measure: () => 80,
  draw: a => drawRowIdMarkerCell(a, a.cell.rowId),
  onClick: () => undefined,
  onPaste: () => undefined
};
function prepRowIdMarkerCell(args, lastPrep) {
  const {
    ctx
  } = args;
  const newFont = "12px sans-serif";
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepRowIdMarkerCell;
  ctx.textAlign = "left";
  return result;
}
function deprepRowIdMarkerCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawRowIdMarkerCell(args, rowId) {
  if (!rowId) return;
  const {
    ctx,
    rect,
    theme
  } = args;
  const {
    x,
    y,
    height
  } = rect;
  ctx.fillStyle = theme.textDark;
  ctx.font = "12px sans-serif";
  const textX = x + 8;
  const centerY = y + height / 2;
  ctx.fillText(rowId, textX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
//# sourceMappingURL=row-id-marker-cell.js.map