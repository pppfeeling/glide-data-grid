import { getMiddleCenterBias, measureTextCached } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind } from "../internal/data-grid/data-grid-types.js";
export const rowIDCellRenderer = {
  getAccessibilityString: c => {
    var _c$rowId;
    return (_c$rowId = c.rowId) !== null && _c$rowId !== void 0 ? _c$rowId : "";
  },
  kind: InnerGridCellKind.RowId,
  needsHover: false,
  needsHoverPosition: false,
  measure: (ctx, cell, t) => {
    var _cell$rowId;
    const textWidth = measureTextCached((_cell$rowId = cell.rowId) !== null && _cell$rowId !== void 0 ? _cell$rowId : "", ctx, t.baseFontStyle).width;
    return textWidth + t.cellHorizontalPadding * 2;
  },
  draw: args => {
    const {
      ctx,
      rect,
      cell,
      theme
    } = args;
    const rowId = cell.rowId;
    if (!rowId) return;
    ctx.fillStyle = theme.textDark;
    ctx.font = theme.baseFontStyle;
    ctx.textAlign = "left";
    const x = rect.x + theme.cellHorizontalPadding;
    const centerY = rect.y + rect.height / 2;
    ctx.fillText(rowId, x, centerY + getMiddleCenterBias(ctx, theme));
  },
  onClick: () => undefined,
  onPaste: () => undefined
};
//# sourceMappingURL=row-id-cell.js.map