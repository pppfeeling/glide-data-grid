import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";
import { InnerGridCellKind, type RowStatusCell } from "../internal/data-grid/data-grid-types.js";
import type { BaseDrawArgs, InternalCellRenderer, PrepResult } from "./cell-types.js";

export const rowStatusCellRenderer: InternalCellRenderer<RowStatusCell> = {
    getAccessibilityString: c => c.status ?? "",
    kind: InnerGridCellKind.RowStatus,
    needsHover: false,
    needsHoverPosition: false,
    drawPrep: prepRowStatusCell,
    measure: () => 40,
    draw: a => drawRowStatusCell(a, a.cell.status),
    onClick: () => undefined,
    onPaste: () => undefined,
};

function prepRowStatusCell(args: BaseDrawArgs, lastPrep: PrepResult | undefined): Partial<PrepResult> {
    const { ctx } = args;
    const newFont = "bold 14px sans-serif";
    const result: Partial<PrepResult> = lastPrep ?? {};
    if (result?.font !== newFont) {
        ctx.font = newFont;
        result.font = newFont;
    }
    result.deprep = deprepRowStatusCell;
    ctx.textAlign = "center";
    return result;
}

function deprepRowStatusCell(args: Pick<BaseDrawArgs, "ctx">) {
    const { ctx } = args;
    ctx.textAlign = "start";
}

function drawRowStatusCell(args: BaseDrawArgs, status?: "A" | "U" | "D") {
    if (!status) return;

    const { ctx, rect } = args;
    const { x, y, width, height } = rect;

    // Status colors
    const colors = {
        A: "#2e7d32", // Green
        U: "#f9a825", // Yellow
        D: "#c62828", // Red
    };

    ctx.fillStyle = colors[status];
    ctx.font = "bold 14px sans-serif";

    const centerX = x + width / 2;
    const centerY = y + height / 2;

    ctx.fillText(status, centerX, centerY + getMiddleCenterBias(ctx, ctx.font));
}
