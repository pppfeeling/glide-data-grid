import * as React from "react";
import clamp from "lodash/clamp.js";
import range from "lodash/range.js";
import { assertNever } from "../common/support.js";
import {
    type GridSelection,
    type Item,
    type Rectangle,
    type GridCell,
} from "../internal/data-grid/data-grid-types.js";

function getSpanStops(cells: readonly (readonly GridCell[])[]): number[] {
    return (
        cells[0]
            ?.filter(c => c.span !== undefined)
            .flatMap(c => range((c.span?.[0] ?? 0) + 1, (c.span?.[1] ?? 0) + 1)) ?? []
    );
}

interface UseSelectionNavigationArgs {
    readonly gridSelection: GridSelection;
    readonly rows: number;
    readonly mangledCols: readonly any[];
    readonly rowMarkerOffset: number;
    readonly getCellsForSelection: ((rect: Rectangle, signal: AbortSignal) => (readonly (readonly GridCell[])[]) | (() => Promise<readonly (readonly GridCell[])[]>)) | undefined;
    readonly abortControllerRef: React.RefObject<AbortController>;
    readonly setCurrent: (value: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined, expand: boolean, append: boolean, trigger: any) => void;
    readonly setGridSelection: (value: GridSelection, expand: boolean) => void;
    readonly scrollTo: (col: number, row: number, dir?: "horizontal" | "vertical" | "both", paddingX?: number, paddingY?: number, options?: any) => void;
    readonly currentCell: Item | undefined;
    readonly mangledRows: number;
    readonly mapper: (row: number) => { isGroupHeader: boolean; path: readonly number[]; groupRows: number };
    readonly rowGroupingSelectionBehavior: string | undefined;
    readonly scrollToActiveCell: boolean;
}

export function useSelectionNavigation(args: UseSelectionNavigationArgs) {
    const {
        gridSelection,
        rows,
        mangledCols,
        rowMarkerOffset,
        getCellsForSelection,
        abortControllerRef,
        setCurrent,
        setGridSelection,
        scrollTo,
        currentCell,
        mangledRows,
        mapper,
        rowGroupingSelectionBehavior,
        scrollToActiveCell,
    } = args;

    const getSelectionRowLimits = React.useCallback(
        (selectedRow: number): readonly [number, number] | undefined => {
            if (rowGroupingSelectionBehavior !== "block-spanning") return undefined;

            const { isGroupHeader, path, groupRows } = mapper(selectedRow);

            if (isGroupHeader) {
                return [selectedRow, selectedRow];
            }

            const groupRowIndex = path[path.length - 1];
            const lowerBounds = selectedRow - groupRowIndex;
            const upperBounds = selectedRow + groupRows - groupRowIndex - 1;

            return [lowerBounds, upperBounds];
        },
        [mapper, rowGroupingSelectionBehavior]
    );

    const adjustSelection = React.useCallback(
        (direction: [0 | 1 | -1 | 2 | -2, 0 | 1 | -1 | 2 | -2]) => {
            if (gridSelection.current === undefined) return;

            const [x, y] = direction;
            const [col, row] = gridSelection.current.cell;
            const old = gridSelection.current.range;
            let left = old.x;
            let right = old.x + old.width;
            let top = old.y;
            let bottom = old.y + old.height;

            const [minRow, maxRowRaw] = getSelectionRowLimits(row) ?? [0, rows - 1];
            const maxRow = maxRowRaw + 1; // we need an inclusive value

            // take care of vertical first in case new spans come in
            if (y !== 0) {
                switch (y) {
                    case 2: {
                        // go to end
                        bottom = maxRow;
                        top = row;
                        scrollTo(0, bottom, "vertical");

                        break;
                    }
                    case -2: {
                        // go to start
                        top = minRow;
                        bottom = row + 1;
                        scrollTo(0, top, "vertical");

                        break;
                    }
                    case 1: {
                        // motion down
                        if (top < row) {
                            top++;
                            scrollTo(0, top, "vertical");
                        } else {
                            bottom = Math.min(maxRow, bottom + 1);
                            scrollTo(0, bottom, "vertical");
                        }

                        break;
                    }
                    case -1: {
                        // motion up
                        if (bottom > row + 1) {
                            bottom--;
                            scrollTo(0, bottom, "vertical");
                        } else {
                            top = Math.max(minRow, top - 1);
                            scrollTo(0, top, "vertical");
                        }

                        break;
                    }
                    default: {
                        assertNever(y as never);
                    }
                }
            }

            if (x !== 0) {
                if (x === 2) {
                    right = mangledCols.length;
                    left = col;
                    scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                } else if (x === -2) {
                    left = rowMarkerOffset;
                    right = col + 1;
                    scrollTo(left - rowMarkerOffset, 0, "horizontal");
                } else {
                    let disallowed: number[] = [];
                    if (getCellsForSelection !== undefined) {
                        const cells = getCellsForSelection(
                            {
                                x: left,
                                y: top,
                                width: right - left,
                                height: bottom - top,
                            },
                            abortControllerRef.current!.signal
                        );

                        if (typeof cells === "object") {
                            disallowed = getSpanStops(cells as GridCell[][]);
                        }
                    }
                    if (x === 1) {
                        // motion right
                        let done = false;
                        if (left < col) {
                            if (disallowed.length > 0) {
                                const target = range(left + 1, col + 1).find(
                                    (n: number) => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    left = target;
                                    done = true;
                                }
                            } else {
                                left++;
                                done = true;
                            }
                            if (done) scrollTo(left - rowMarkerOffset, 0, "horizontal");
                        }
                        if (!done) {
                            right = Math.min(mangledCols.length, right + 1);
                            scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                        }
                    } else if (x === -1) {
                        // motion left
                        let done = false;
                        if (right > col + 1) {
                            if (disallowed.length > 0) {
                                const target = range(right - 1, col, -1).find(
                                    n => !disallowed.includes(n - rowMarkerOffset)
                                );
                                if (target !== undefined) {
                                    right = target;
                                    done = true;
                                }
                            } else {
                                right--;
                                done = true;
                            }
                            if (done) scrollTo(right - 1 - rowMarkerOffset, 0, "horizontal");
                        }
                        if (!done) {
                            left = Math.max(rowMarkerOffset, left - 1);
                            scrollTo(left - rowMarkerOffset, 0, "horizontal");
                        }
                    } else {
                        assertNever(x as never);
                    }
                }
            }

            setCurrent(
                {
                    cell: gridSelection.current.cell,
                    range: {
                        x: left,
                        y: top,
                        width: right - left,
                        height: bottom - top,
                    },
                },
                true,
                false,
                "keyboard-select"
            );
        },
        [
            gridSelection,
            getSelectionRowLimits,
            rows,
            scrollTo,
            mangledCols.length,
            rowMarkerOffset,
            getCellsForSelection,
            abortControllerRef,
            setCurrent,
        ]
    );

    const updateSelectedCell = React.useCallback(
        (col: number, row: number, fromEditingTrailingRow: boolean, freeMove: boolean): boolean => {
            const rowMax = mangledRows - (fromEditingTrailingRow ? 0 : 1);
            col = clamp(col, rowMarkerOffset, mangledCols.length - 1);
            row = clamp(row, 0, rowMax);

            const curCol = currentCell?.[0];
            const curRow = currentCell?.[1];

            if (col === curCol && row === curRow) return false;
            if (freeMove && gridSelection.current !== undefined) {
                const newStack = [...gridSelection.current.rangeStack];
                if (gridSelection.current.range.width > 1 || gridSelection.current.range.height > 1) {
                    newStack.push(gridSelection.current.range);
                }
                setGridSelection(
                    {
                        ...gridSelection,
                        current: {
                            cell: [col, row],
                            range: { x: col, y: row, width: 1, height: 1 },
                            rangeStack: newStack,
                        },
                    },
                    true
                );
            } else {
                setCurrent(
                    {
                        cell: [col, row],
                        range: { x: col, y: row, width: 1, height: 1 },
                    },
                    true,
                    false,
                    "keyboard-nav"
                );
            }

            if (scrollToActiveCell) {
                // scrollTo padding logic should be outside or passed in
                scrollTo(col - rowMarkerOffset, row, "both", 0, 20);
            }

            return true;
        },
        [
            mangledRows,
            rowMarkerOffset,
            mangledCols.length,
            currentCell,
            gridSelection,
            scrollTo,
            setGridSelection,
            setCurrent,
            scrollToActiveCell,
        ]
    );

    return {
        getSelectionRowLimits,
        adjustSelection,
        updateSelectedCell,
    };
}
