import * as React from "react";
import {
    GridCellKind,
    type GridSelection,
    isReadWriteCell,
    type Rectangle,
    CompactSelection,
    type Item,
} from "../internal/data-grid/data-grid-types.js";
import {
    type GridKeyEventArgs,
    type CellActivatedEventArgs,
} from "../internal/data-grid/event-args.js";
import { isHotkey } from "../common/is-hotkey.js";
import { toggleBoolean } from "./data-editor-fns.js";
import type { RealizedKeybinds } from "./data-editor-keybindings.js";
import type { DataEditorCoreState, KeyboardHandlers } from "./data-editor-state.js";

interface UseKeyboardHandlersArgs {
    readonly state: DataEditorCoreState;
    readonly keybindings: RealizedKeybinds;
    readonly overlayOpen: boolean;
    readonly columnSelect: "none" | "single" | "multi";
    readonly rowSelect: "none" | "single" | "multi";
    readonly rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    readonly editOnType: boolean;
    readonly trapFocus: boolean;
    readonly showTrailingBlankRow: boolean;
    readonly columnsInLength: number;
    readonly rowGroupingNavBehavior: string | undefined;
    readonly mapper: (row: number) => { isGroupHeader: boolean };
    readonly onKeyDownIn?: (event: GridKeyEventArgs) => void;
    readonly onSelectionCleared?: () => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    readonly getCellContent: (cell: Item) => import("../internal/data-grid/data-grid-types.js").GridCell;
    readonly setSelectedColumns: (
        newColumns: CompactSelection | undefined,
        grow: number | undefined,
        expand: boolean
    ) => void;
    readonly setSelectedRows: (
        newRows: CompactSelection | undefined,
        grow: number | undefined,
        expand: boolean
    ) => void;
    readonly setShowSearchInner: (show: boolean) => void;
    readonly searchInputRef: React.RefObject<HTMLInputElement | null>;
    readonly adjustSelection: (direction: [0 | 1 | -1 | 2 | -2, 0 | 1 | -1 | 2 | -2]) => void;
    readonly updateSelectedCell: (
        col: number,
        row: number,
        fromEditingTrailingRow: boolean,
        freeMove: boolean
    ) => boolean;
    readonly deleteRange: (range: Rectangle) => void;
    readonly fillDown: () => void;
    readonly fillRight: () => void;
    readonly appendRow: (col: number, openOverlay?: boolean, behavior?: ScrollBehavior) => Promise<void>;
    readonly getCustomNewRowTargetColumn: (col: number) => number | undefined;
    readonly scrollToRef: React.MutableRefObject<(col: number, row: number) => void>;
}

export function useKeyboardHandlers(args: UseKeyboardHandlersArgs): KeyboardHandlers {
    const {
        state,
        keybindings,
        overlayOpen,
        columnSelect,
        rowSelect,
        rangeSelect,
        editOnType,
        trapFocus,
        showTrailingBlankRow,
        columnsInLength,
        rowGroupingNavBehavior,
        mapper,
        onKeyDownIn,
        onSelectionCleared,
        onCellActivated,
        onDelete,
        getCellContent,
        setSelectedColumns,
        setSelectedRows,
        setShowSearchInner,
        searchInputRef,
        adjustSelection,
        updateSelectedCell,
        deleteRange,
        fillDown,
        fillRight,
        appendRow,
        getCustomNewRowTargetColumn,
        scrollToRef,
    } = args;

    const {
        gridSelection,
        gridRef,
        visibleRegionRef,
        rowMarkerOffset,
        rows,
        setGridSelection,
        getMangledCellContent,
        mangledOnCellsEdited,
        setOverlay,
        reselect,
        focus,
    } = state;

    const handleFixedKeybindings = React.useCallback(
        (event: GridKeyEventArgs): boolean => {
            const cancel = () => {
                event.stopPropagation();
                event.preventDefault();
            };

            const details = {
                didMatch: false,
            };

            const { bounds } = event;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;

            const keys = keybindings;

            if (!overlayOpen && isHotkey(keys.clear, event, details)) {
                const clearedCell = gridSelection.current?.cell ?? [rowMarkerOffset, 0];
                setGridSelection({
                    columns: CompactSelection.empty(),
                    rows: CompactSelection.empty(),
                    current: {
                        cell: clearedCell,
                        range: { x: clearedCell[0], y: clearedCell[1], width: 1, height: 1 },
                        rangeStack: [],
                    },
                }, false);
                onSelectionCleared?.();

                focus();
            } else if (!overlayOpen && isHotkey(keys.selectAll, event, details)) {
                setGridSelection(
                    {
                        columns: CompactSelection.empty(),
                        rows: CompactSelection.empty(),
                        current: {
                            cell: gridSelection.current?.cell ?? [rowMarkerOffset, 0],
                            range: {
                                x: rowMarkerOffset,
                                y: 0,
                                width: columnsInLength,
                                height: rows,
                            },
                            rangeStack: [],
                        },
                    },
                    false
                );
            } else if (isHotkey(keys.search, event, details)) {
                searchInputRef?.current?.focus({ preventScroll: true });
                setShowSearchInner(true);
            } else if (isHotkey(keys.delete, event, details)) {
                const callbackResult = onDelete?.(gridSelection) ?? true;
                if (callbackResult !== false) {
                    const toDelete = callbackResult === true ? gridSelection : callbackResult;

                    if (toDelete.current !== undefined) {
                        deleteRange(toDelete.current.range);
                        for (const r of toDelete.current.rangeStack) {
                            deleteRange(r);
                        }
                    }

                    for (const r of toDelete.rows) {
                        deleteRange({
                            x: rowMarkerOffset,
                            y: r,
                            width: columnsInLength,
                            height: 1,
                        });
                    }

                    for (const col of toDelete.columns) {
                        deleteRange({
                            x: col,
                            y: 0,
                            width: 1,
                            height: rows,
                        });
                    }
                }
            }

            if (details.didMatch) {
                cancel();
                return true;
            }

            if (gridSelection.current === undefined) return false;
            let [col, row] = gridSelection.current.cell;
            const [, startRow] = gridSelection.current.cell;
            let freeMove = false;
            let cancelOnlyOnMove = false;

            if (isHotkey(keys.scrollToSelectedCell, event, details)) {
                scrollToRef.current(col - rowMarkerOffset, row);
            } else if (columnSelect !== "none" && isHotkey(keys.selectColumn, event, details)) {
                if (selectedColumns.hasIndex(col)) {
                    setSelectedColumns(selectedColumns.remove(col), undefined, true);
                } else {
                    if (columnSelect === "single") {
                        setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, true);
                    } else {
                        setSelectedColumns(undefined, col, true);
                    }
                }
            } else if (rowSelect !== "none" && isHotkey(keys.selectRow, event, details)) {
                if (selectedRows.hasIndex(row)) {
                    setSelectedRows(selectedRows.remove(row), undefined, true);
                } else {
                    if (rowSelect === "single") {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, true);
                    } else {
                        setSelectedRows(undefined, row, true);
                    }
                }
            } else if (!overlayOpen && bounds !== undefined && isHotkey(keys.activateCell, event, details)) {
                if (row === rows && showTrailingBlankRow) {
                    window.setTimeout(() => {
                        const customTargetColumn = getCustomNewRowTargetColumn(col);
                        void appendRow(customTargetColumn ?? col);
                    }, 0);
                } else {
                    const activationEvent: CellActivatedEventArgs = {
                        inputType: "keyboard",
                        key: event.key,
                    };

                    // For Boolean cells: both Enter and Space toggle the value
                    const cellContent = getMangledCellContent([col, row]);

                    if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {
                        onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
                        mangledOnCellsEdited([
                            {
                                location: [col, row],
                                value: {
                                    ...cellContent,
                                    data: toggleBoolean(cellContent.data),
                                },
                            },
                        ]);
                        gridRef.current?.damage([{ cell: [col, row] }]);
                    } else {
                        onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
                        reselect(bounds, activationEvent);
                    }
                }
            } else if (gridSelection.current.range.height > 1 && isHotkey(keys.downFill, event, details)) {
                fillDown();
            } else if (gridSelection.current.range.width > 1 && isHotkey(keys.rightFill, event, details)) {
                fillRight();
            } else if (isHotkey(keys.goToNextPage, event, details)) {
                row += Math.max(1, visibleRegionRef.current.height - 4);
            } else if (isHotkey(keys.goToPreviousPage, event, details)) {
                row -= Math.max(1, visibleRegionRef.current.height - 4);
            } else if (isHotkey(keys.goToFirstCell, event, details)) {
                setOverlay(undefined);
                row = 0;
                col = 0;
            } else if (isHotkey(keys.goToLastCell, event, details)) {
                setOverlay(undefined);
                row = Number.MAX_SAFE_INTEGER;
                col = Number.MAX_SAFE_INTEGER;
            } else if (isHotkey(keys.selectToFirstCell, event, details)) {
                setOverlay(undefined);
                adjustSelection([-2, -2]);
            } else if (isHotkey(keys.selectToLastCell, event, details)) {
                setOverlay(undefined);
                adjustSelection([2, 2]);
            } else if (!overlayOpen) {
                if (isHotkey(keys.goDownCell, event, details)) {
                    row += 1;
                } else if (isHotkey(keys.goUpCell, event, details)) {
                    row -= 1;
                } else if (isHotkey(keys.goRightCell, event, details)) {
                    col += 1;
                } else if (isHotkey(keys.goLeftCell, event, details)) {
                    col -= 1;
                } else if (isHotkey(keys.goDownCellRetainSelection, event, details)) {
                    row += 1;
                    freeMove = true;
                } else if (isHotkey(keys.goUpCellRetainSelection, event, details)) {
                    row -= 1;
                    freeMove = true;
                } else if (isHotkey(keys.goRightCellRetainSelection, event, details)) {
                    col += 1;
                    freeMove = true;
                } else if (isHotkey(keys.goLeftCellRetainSelection, event, details)) {
                    col -= 1;
                    freeMove = true;
                } else if (isHotkey(keys.goToLastRow, event, details)) {
                    row = rows - 1;
                } else if (isHotkey(keys.goToFirstRow, event, details)) {
                    row = Number.MIN_SAFE_INTEGER;
                } else if (isHotkey(keys.goToLastColumn, event, details)) {
                    col = Number.MAX_SAFE_INTEGER;
                } else if (isHotkey(keys.goToFirstColumn, event, details)) {
                    col = Number.MIN_SAFE_INTEGER;
                } else if (rangeSelect === "rect" || rangeSelect === "multi-rect") {
                    if (isHotkey(keys.selectGrowDown, event, details)) {
                        adjustSelection([0, 1]);
                    } else if (isHotkey(keys.selectGrowUp, event, details)) {
                        adjustSelection([0, -1]);
                    } else if (isHotkey(keys.selectGrowRight, event, details)) {
                        adjustSelection([1, 0]);
                    } else if (isHotkey(keys.selectGrowLeft, event, details)) {
                        adjustSelection([-1, 0]);
                    } else if (isHotkey(keys.selectToLastRow, event, details)) {
                        adjustSelection([0, 2]);
                    } else if (isHotkey(keys.selectToFirstRow, event, details)) {
                        adjustSelection([0, -2]);
                    } else if (isHotkey(keys.selectToLastColumn, event, details)) {
                        adjustSelection([2, 0]);
                    } else if (isHotkey(keys.selectToFirstColumn, event, details)) {
                        adjustSelection([-2, 0]);
                    }
                }
                cancelOnlyOnMove = details.didMatch;
            } else {
                if (isHotkey(keys.closeOverlay, event, details)) {
                    setOverlay(undefined);
                }

                if (isHotkey(keys.acceptOverlayDown, event, details)) {
                    setOverlay(undefined);
                    row++;
                }

                if (isHotkey(keys.acceptOverlayUp, event, details)) {
                    setOverlay(undefined);
                    row--;
                }

                if (isHotkey(keys.acceptOverlayLeft, event, details)) {
                    setOverlay(undefined);
                    col--;
                }

                if (isHotkey(keys.acceptOverlayRight, event, details)) {
                    setOverlay(undefined);
                    col++;
                }
            }
            // #endregion

            const mustRestrictRow = rowGroupingNavBehavior !== undefined && rowGroupingNavBehavior !== "normal";

            if (mustRestrictRow && row !== startRow) {
                const skipUp =
                    rowGroupingNavBehavior === "skip-up" ||
                    rowGroupingNavBehavior === "skip" ||
                    rowGroupingNavBehavior === "block";
                const skipDown =
                    rowGroupingNavBehavior === "skip-down" ||
                    rowGroupingNavBehavior === "skip" ||
                    rowGroupingNavBehavior === "block";
                const didMoveUp = row < startRow;
                if (didMoveUp && skipUp) {
                    while (row >= 0 && mapper(row).isGroupHeader) {
                        row--;
                    }

                    if (row < 0) {
                        row = startRow;
                    }
                } else if (!didMoveUp && skipDown) {
                    while (row < rows && mapper(row).isGroupHeader) {
                        row++;
                    }

                    if (row >= rows) {
                        row = startRow;
                    }
                }
            }

            const moved = updateSelectedCell(col, row, false, freeMove);

            const didMatch = details.didMatch;

            if (didMatch && (moved || !cancelOnlyOnMove || trapFocus)) {
                cancel();
            }

            return didMatch;
        },
        [
            rowGroupingNavBehavior,
            overlayOpen,
            gridSelection,
            keybindings,
            columnSelect,
            rowSelect,
            rangeSelect,
            rowMarkerOffset,
            mapper,
            rows,
            updateSelectedCell,
            setGridSelection,
            onSelectionCleared,
            columnsInLength,
            onDelete,
            trapFocus,
            deleteRange,
            setSelectedColumns,
            setSelectedRows,
            showTrailingBlankRow,
            getCustomNewRowTargetColumn,
            appendRow,
            onCellActivated,
            reselect,
            fillDown,
            fillRight,
            adjustSelection,
            getMangledCellContent,
            mangledOnCellsEdited,
            gridRef,
            setOverlay,
            focus,
            visibleRegionRef,
            searchInputRef,
            setShowSearchInner,
            scrollToRef,
        ]
    );

    const onKeyDown = React.useCallback(
        (event: GridKeyEventArgs) => {
            let cancelled = false;
            if (onKeyDownIn !== undefined) {
                onKeyDownIn({
                    ...event,
                    ...(event.location && {
                        location: [event.location[0] - rowMarkerOffset, event.location[1]] as any,
                    }),
                    cancel: () => {
                        cancelled = true;
                    },
                });
            }

            if (cancelled) return;

            if (handleFixedKeybindings(event)) return;

            if (gridSelection.current === undefined) return;

            const [col, row] = gridSelection.current.cell;
            const vr = visibleRegionRef.current;

            // IME input detection (keyCode 229) or single character input - use GhostInput for IME support
            const isIMEInput = event.keyCode === 229;
            const isCharacterInput =
                editOnType &&
                !event.metaKey &&
                !event.ctrlKey &&
                event.key.length === 1 &&
                /[\p{L}\p{M}\p{N}\p{S}\p{P}]/u.test(event.key);

            if (
                (isIMEInput || isCharacterInput) &&
                event.bounds !== undefined &&
                isReadWriteCell(getCellContent([col - rowMarkerOffset, Math.max(0, Math.min(row, rows - 1))]))
            ) {
                if (
                    (!showTrailingBlankRow || row !== rows) &&
                    (vr.y > row || row > vr.y + vr.height || vr.x > col || col > vr.x + vr.width)
                ) {
                    return;
                }

                event.stopPropagation();
                event.preventDefault();

                if (isIMEInput) {
                    const activationEvent: CellActivatedEventArgs = {
                        inputType: "keyboard",
                        key: "",
                    };
                    onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
                    reselect(event.bounds, activationEvent, "");
                } else {
                    const activationEvent: CellActivatedEventArgs = {
                        inputType: "keyboard",
                        key: event.key,
                    };
                    onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
                    reselect(event.bounds, activationEvent, event.key);
                }
            }
        },
        [
            editOnType,
            onKeyDownIn,
            handleFixedKeybindings,
            gridSelection,
            getCellContent,
            rowMarkerOffset,
            rows,
            showTrailingBlankRow,
            onCellActivated,
            reselect,
            visibleRegionRef,
        ]
    );

    return {
        handleFixedKeybindings,
        onKeyDown,
    };
}
