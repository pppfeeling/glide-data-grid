import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind } from "../internal/data-grid/data-grid-types.js";
export const rowStatusCellRenderer = {
  getAccessibilityString: c => {
    var _c$status;
    return (_c$status = c.status) !== null && _c$status !== void 0 ? _c$status : "";
  },
  kind: InnerGridCellKind.RowStatus,
  needsHover: false,
  needsHoverPosition: false,
  drawPrep: prepRowStatusCell,
  measure: () => 40,
  draw: a => drawRowStatusCell(a, a.cell.status),
  onClick: () => undefined,
  onPaste: () => undefined
};
function prepRowStatusCell(args, lastPrep) {
  const {
    ctx
  } = args;
  const newFont = "bold 14px sans-serif";
  const result = lastPrep !== null && lastPrep !== void 0 ? lastPrep : {};
  if ((result === null || result === void 0 ? void 0 : result.font) !== newFont) {
    ctx.font = newFont;
    result.font = newFont;
  }
  result.deprep = deprepRowStatusCell;
  ctx.textAlign = "center";
  return result;
}
function deprepRowStatusCell(args) {
  const {
    ctx
  } = args;
  ctx.textAlign = "start";
}
function drawRowStatusCell(args, status) {
  if (!status) return;
  const {
    ctx,
    rect
  } = args;
  const {
    x,
    y,
    width,
    height
  } = rect;
  const colors = {
    A: "#2e7d32",
    U: "#f9a825",
    D: "#c62828"
  };
  ctx.fillStyle = colors[status];
  ctx.font = "bold 14px sans-serif";
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  ctx.fillText(status, centerX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
//# sourceMappingURL=row-status-cell.js.map