import * as React from "react";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import { getFreezeTrailingHeight } from "../internal/data-grid/render/data-grid-lib.js";
import type { InnerGridColumn, Rectangle } from "../internal/data-grid/data-grid-types.js";
import type { ScrollToFn } from "./data-editor-types.js";

interface UseScrollToProps {
    readonly scrollRef: React.RefObject<HTMLDivElement | null>;
    readonly gridRef: React.RefObject<DataGridRef | null>;
    readonly canvasRef: React.RefObject<HTMLCanvasElement | null>;
    readonly rowMarkerOffset: number;
    readonly freezeTrailingRows: number;
    readonly totalMarkerWidth: number;
    readonly totalHeaderHeight: number;
    readonly freezeColumns: number;
    readonly columns: readonly InnerGridColumn[];
    readonly mangledRows: number;
    readonly lastRowSticky: boolean;
    readonly rowHeight: number | ((n: number) => number);
}

export function useScrollTo(props: UseScrollToProps) {
    const {
        scrollRef,
        gridRef,
        canvasRef,
        rowMarkerOffset,
        freezeTrailingRows,
        totalMarkerWidth,
        totalHeaderHeight,
        freezeColumns,
        columns,
        mangledRows,
        lastRowSticky,
        rowHeight,
    } = props;

    return React.useCallback<ScrollToFn>(
        (col, row, dir = "both", paddingX = 0, paddingY = 0, options = undefined): void => {
            if (scrollRef.current !== null) {
                const grid = gridRef.current;
                const canvas = canvasRef.current;

                const trueCol = typeof col !== "number" ? (col.unit === "cell" ? col.amount : undefined) : col;
                const trueRow = typeof row !== "number" ? (row.unit === "cell" ? row.amount : undefined) : row;
                const desiredX = typeof col !== "number" && col.unit === "px" ? col.amount : undefined;
                const desiredY = typeof row !== "number" && row.unit === "px" ? row.amount : undefined;

                if (grid !== null && canvas !== null) {
                    let targetRect: Rectangle = {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0,
                    };

                    if (trueCol !== undefined || trueRow !== undefined) {
                        targetRect = grid.getBounds((trueCol ?? 0) + rowMarkerOffset, trueRow ?? 0) ?? targetRect;
                        if (targetRect.width === 0 || targetRect.height === 0) return;
                    }

                    const scrollBounds = canvas.getBoundingClientRect();
                    const scale = scrollBounds.width / canvas.offsetWidth;

                    if (desiredX !== undefined) {
                        targetRect = {
                            ...targetRect,
                            x: desiredX - scrollBounds.left - scrollRef.current.scrollLeft,
                            width: 1,
                        };
                    }
                    if (desiredY !== undefined) {
                        targetRect = {
                            ...targetRect,
                            y: desiredY + scrollBounds.top - scrollRef.current.scrollTop,
                            height: 1,
                        };
                    }

                    if (targetRect !== undefined) {
                        const bounds = {
                            x: targetRect.x - paddingX,
                            y: targetRect.y - paddingY,
                            width: targetRect.width + 2 * paddingX,
                            height: targetRect.height + 2 * paddingY,
                        };

                        let frozenWidth = 0;
                        for (let i = 0; i < freezeColumns; i++) {
                            frozenWidth += columns[i].width;
                        }

                        let trailingRowHeight = 0;
                        const freezeTrailingRowsEffective = freezeTrailingRows + (lastRowSticky ? 1 : 0);
                        if (freezeTrailingRowsEffective > 0) {
                            trailingRowHeight = getFreezeTrailingHeight(
                                mangledRows,
                                freezeTrailingRowsEffective,
                                rowHeight
                            );
                        }

                        // scrollBounds is already scaled
                        let sLeft = frozenWidth * scale + scrollBounds.left + totalMarkerWidth * scale;
                        let sRight = scrollBounds.right;
                        let sTop = scrollBounds.top + totalHeaderHeight * scale;
                        let sBottom = scrollBounds.bottom - trailingRowHeight * scale;

                        const minx = targetRect.width + paddingX * 2;
                        switch (options?.hAlign) {
                            case "start":
                                sRight = sLeft + minx;
                                break;
                            case "end":
                                sLeft = sRight - minx;
                                break;
                            case "center":
                                sLeft = Math.floor((sLeft + sRight) / 2) - minx / 2;
                                sRight = sLeft + minx;
                                break;
                        }

                        const miny = targetRect.height + paddingY * 2;
                        switch (options?.vAlign) {
                            case "start":
                                sBottom = sTop + miny;
                                break;
                            case "end":
                                sTop = sBottom - miny;
                                break;
                            case "center":
                                sTop = Math.floor((sTop + sBottom) / 2) - miny / 2;
                                sBottom = sTop + miny;
                                break;
                        }

                        let scrollX = 0;
                        let scrollY = 0;

                        if (sLeft > bounds.x) {
                            scrollX = bounds.x - sLeft;
                        } else if (sRight < bounds.x + bounds.width) {
                            scrollX = bounds.x + bounds.width - sRight;
                        }

                        if (sTop > bounds.y) {
                            scrollY = bounds.y - sTop;
                        } else if (sBottom < bounds.y + bounds.height) {
                            scrollY = bounds.y + bounds.height - sBottom;
                        }

                        if (dir === "vertical" || (typeof col === "number" && col < freezeColumns)) {
                            scrollX = 0;
                        } else if (
                            dir === "horizontal" ||
                            (typeof row === "number" && row >= mangledRows - freezeTrailingRowsEffective)
                        ) {
                            scrollY = 0;
                        }

                        if (scrollX !== 0 || scrollY !== 0) {
                            // Remove scaling as scrollTo method is unaffected by transform scale.
                            if (scale !== 1) {
                                scrollX /= scale;
                                scrollY /= scale;
                            }
                            scrollRef.current.scrollTo({
                                left: scrollX + scrollRef.current.scrollLeft,
                                top: scrollY + scrollRef.current.scrollTop,
                                behavior: options?.behavior ?? "auto",
                            });
                        }
                    }
                }
            }
        },
        [
            scrollRef,
            gridRef,
            canvasRef,
            rowMarkerOffset,
            freezeTrailingRows,
            totalMarkerWidth,
            totalHeaderHeight,
            freezeColumns,
            columns,
            mangledRows,
            lastRowSticky,
            rowHeight,
        ]
    );
}
