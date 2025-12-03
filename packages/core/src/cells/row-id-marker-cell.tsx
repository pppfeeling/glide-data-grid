import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind, type RowIdCell } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer, PrepResult } from "./cell-types.js";

export const rowIdMarkerCellRenderer: InternalCellRenderer<RowIdCell> = {
    getAccessibilityString: c => c.rowId ?? "",
    kind: InnerGridCellKind.RowId,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepRowIdMarkerCell,
    measure: () => 80,
    draw: a => drawRowIdMarkerCell(a, a.cell.rowId),
    onClick: () => undefined,
    onPaste: () => undefined,
};

function prepRowIdMarkerCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined): Partial<PrepResult> {
    const { ctx } = args;
    const newFont = "12px sans-serif";
    const result: Partial<PrepResult> = lastPrep ?? {};
    if (result?.font !== newFont) {
        ctx.font = newFont;
        result.font = newFont;
    }
    result.deprep = deprepRowIdMarkerCell;
    ctx.textAlign = "left";
    return result;
}

function deprepRowIdMarkerCell(args: Pick<BaseDrawArgs, "ctx">) {
    const { ctx } = args;
    ctx.textAlign = "start";
}

function drawRowIdMarkerCell(args: BaseDrawArgs, rowId?: string) {
    if (!rowId) return;

    const { ctx, rect, theme } = args;
    const { x, y, height } = rect;

    ctx.fillStyle = theme.textDark;
    ctx.font = "12px sans-serif";

    const textX = x + 8; // Left padding
    const centerY = y + height / 2;

    ctx.fillText(rowId, textX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
