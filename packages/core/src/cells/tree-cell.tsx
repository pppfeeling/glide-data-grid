import React from "react";
import { GridCellKind, type CustomCell } from "../internal/data-grid/data-grid-types.js";
import type { CustomRenderer } from "./cell-types.js";
import { getMiddleCenterBias } from "../internal/data-grid/render/data-grid-lib.js";

export interface TreeCellData {
    readonly kind: "tree-cell";
    readonly text: string;
    readonly level: number;
    readonly child: boolean;
    readonly isExpanded: boolean;
    readonly last: boolean;
    readonly parentContinues: readonly boolean[];
}

export type TreeCell = CustomCell<TreeCellData>;

const DEFAULT_INDENT = 18;
const DEFAULT_ICON_SIZE = 13;

export const treeCellRenderer: CustomRenderer<TreeCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is TreeCell => (c.data as any).kind === "tree-cell",
    needsHover: true,
    needsHoverPosition: true,

    draw: (args, cell) => {
        const { ctx, rect, theme, hoverX, hoverY, overrideCursor } = args;
        const { text, level, child, isExpanded, last, parentContinues } = cell.data;

        const indent = theme.treeIndent ?? DEFAULT_INDENT;
        const iconSize = theme.treeIconSize ?? DEFAULT_ICON_SIZE;

        const leftPad = 8;
        const x0 = rect.x + leftPad;
        const cy = rect.y + rect.height / 2;

        const slotX = (d: number) => x0 + d * indent + indent / 2 + 0.5;

        const textX = x0 + (level + 1) * indent + 4;

        ctx.save();
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 1;

        for (let d = 0; d < level; d++) {
            if (parentContinues[d]) {
                const lx = slotX(d);
                ctx.beginPath();
                ctx.moveTo(lx, rect.y);
                ctx.lineTo(lx, rect.y + rect.height);
                ctx.stroke();
            }
        }

        const connX = slotX(level);

        if (child) {
            const iconLeft = Math.round(connX - iconSize / 2 - 0.5);
            const iconTop = Math.round(cy - iconSize / 2);

            const relX = hoverX ?? -999;
            const relY = hoverY ?? -999;
            const isHovering =
                relX >= iconLeft - rect.x - 2 &&
                relX <= iconLeft - rect.x + iconSize + 2 &&
                relY >= iconTop - rect.y - 2 &&
                relY <= iconTop - rect.y + iconSize + 2;

            if (isHovering && overrideCursor !== undefined) overrideCursor("pointer");

            ctx.fillStyle = isHovering ? "#e8f0fe" : theme.bgCell;
            ctx.strokeStyle = "#888";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(iconLeft + 0.5, iconTop + 0.5, iconSize, iconSize);
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = "#555";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(iconLeft + 3, cy);
            ctx.lineTo(iconLeft + iconSize - 2, cy);
            if (!isExpanded) {
                ctx.moveTo(Math.round(connX), iconTop + 3);
                ctx.lineTo(Math.round(connX), iconTop + iconSize - 2);
            }
            ctx.stroke();
        } else {
            ctx.strokeStyle = "#bbb";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(connX, rect.y);
            ctx.lineTo(connX, last ? cy : rect.y + rect.height);
            ctx.moveTo(connX, cy);
            ctx.lineTo(textX - 2, cy);
            ctx.stroke();
        }

        const maxTextWidth = rect.x + rect.width - textX - 4;

        ctx.font = theme.baseFontFull;
        ctx.fillStyle = theme.textDark;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        ctx.beginPath();
        ctx.rect(textX, rect.y, Math.max(0, maxTextWidth), rect.height);
        ctx.clip();
        ctx.fillText(text, textX, cy + getMiddleCenterBias(ctx, theme));

        ctx.restore();
        return true;
    },

    measure: (ctx, cell, theme) => {
        const { text, level } = cell.data;
        const indent = theme.treeIndent ?? DEFAULT_INDENT;
        const textStart = 8 + (level + 1) * indent + 4;
        return textStart + ctx.measureText(text).width + theme.cellHorizontalPadding;
    },

    provideEditor: () => ({
        editor: p => {
            const { text } = p.value.data;
            const [value, setValue] = React.useState(text);
            return (
                <input
                    autoFocus
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        outline: "none",
                        padding: "0 8px",
                        fontSize: "inherit",
                        fontFamily: "inherit",
                        background: "transparent",
                    }}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            p.onFinishedEditing({
                                ...p.value,
                                copyData: value,
                                data: { ...p.value.data, text: value },
                            });
                        } else if (e.key === "Escape") {
                            p.onFinishedEditing(undefined);
                        }
                    }}
                    onBlur={() => {
                        p.onFinishedEditing({
                            ...p.value,
                            copyData: value,
                            data: { ...p.value.data, text: value },
                        });
                    }}
                />
            );
        },
        disablePadding: true,
    }),

    onPaste: (val, data) => ({
        ...data,
        text: val,
    }),
};
