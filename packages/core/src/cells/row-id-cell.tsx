import { getMiddleCenterBias, measureTextCached } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind, type RowIdCell } from "../internal/data-grid/data-grid-types.js";
import type { InternalCellRenderer } from "./cell-types.js";

export const rowIDCellRenderer: InternalCellRenderer<RowIdCell> = {
    getAccessibilityString: c => c.rowId ?? "",
    kind: InnerGridCellKind.RowId,
    needsHover: false,
    needsHoverPosition: false,
    measure: (ctx, cell, t) => {
        const textWidth = measureTextCached(cell.rowId ?? "", ctx, t.baseFontStyle).width;
        return textWidth + t.cellHorizontalPadding * 2;
    },
    draw: args => {
        const { ctx, rect, cell, theme } = args;
        const rowId = cell.rowId;

        if (!rowId) return;

        // Text style
        ctx.fillStyle = theme.textDark;
        ctx.font = theme.baseFontStyle;
        ctx.textAlign = "left";

        const x = rect.x + theme.cellHorizontalPadding;
        const centerY = rect.y + rect.height / 2;

        ctx.fillText(rowId, x, centerY + getMiddleCenterBias(ctx, theme));
    },
    onClick: () => undefined,
    onPaste: () => undefined,
};
