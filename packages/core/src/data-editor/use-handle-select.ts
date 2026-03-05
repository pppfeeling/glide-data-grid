import * as React from "react";
import {
    type GridSelection,
    type InnerGridCell,
    InnerGridCellKind,
    CompactSelection,
    type Slice,
    type Item,
    type MarkerCell,
} from "../internal/data-grid/data-grid-types.js";
import { browserIsOSX } from "../common/browser-detect.js";
import {
    type GridMouseEventArgs,
    groupHeaderKind,
    outOfBoundsKind,
} from "../internal/data-grid/event-args.js";
import type { FullTheme } from "../common/styles.js";
import type { GetCellRendererCallback } from "../cells/cell-types.js";
import { type SelectionTrigger } from "../internal/data-grid/use-selection-behavior.js";
import { assert } from "../common/support.js";
import { emptyGridSelection } from "./use-selection.js";

interface UseHandleSelectArgs {
    readonly gridSelection: GridSelection;
    readonly rowSelect: "none" | "single" | "multi";
    readonly columnSelect: "none" | "single" | "multi";
    readonly rowSelectionMode: "auto" | "multi";
    readonly columnSelectionMode: "auto" | "multi";
    readonly hasRowMarkers: boolean;
    readonly rowMarkerOffset: number;
    readonly showTrailingBlankRow: boolean;
    readonly showRowNumber: boolean;
    readonly rows: number;
    readonly rowMarkers: string;
    readonly lastRowSticky: boolean;
    readonly rowGroupingNavBehavior: string | undefined;
    readonly headerRowMarkerDisabled: boolean;

    readonly getMangledCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly themeForCell: (cell: InnerGridCell, pos: Item) => FullTheme;
    readonly focus: (immediate?: boolean) => void;
    readonly setOverlay: (overlay: undefined) => void;
    readonly setGridSelection: (newVal: GridSelection, expand: boolean) => void;
    readonly setCurrent: (
        current: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined,
        expand: boolean,
        multiKey: boolean,
        trigger: SelectionTrigger
    ) => void;
    readonly setSelectedRows: (
        newRows: CompactSelection | undefined,
        append: Slice | number | undefined,
        multiKey: boolean
    ) => void;
    readonly setSelectedColumns: (
        newCols: CompactSelection | undefined,
        append: Slice | number | undefined,
        multiKey: boolean
    ) => void;
    readonly getCustomNewRowTargetColumn: (col: number) => number | undefined;
    readonly appendRow: (col: number, openOverlay?: boolean) => Promise<void>;
    readonly mapper: (row: number) => { isGroupHeader: boolean };
    readonly onRowMoved: unknown;
    readonly onSelectionCleared: (() => void) | undefined;

    readonly lastSelectedRowRef: React.MutableRefObject<number | undefined>;
    readonly lastSelectedColRef: React.MutableRefObject<number | undefined>;
    readonly lastMouseSelectLocation: React.MutableRefObject<readonly [number, number] | undefined>;
}

export function useHandleSelect(args: UseHandleSelectArgs): (args: GridMouseEventArgs) => void {
    const {
        gridSelection,
        rowSelect,
        columnSelect,
        rowSelectionMode,
        columnSelectionMode,
        hasRowMarkers,
        rowMarkerOffset,
        showTrailingBlankRow,
        showRowNumber,
        rows,
        rowMarkers,
        lastRowSticky,
        rowGroupingNavBehavior,
        headerRowMarkerDisabled,
        getMangledCellContent,
        getCellRenderer,
        themeForCell,
        focus,
        setOverlay,
        setGridSelection,
        setCurrent,
        setSelectedRows,
        setSelectedColumns,
        getCustomNewRowTargetColumn,
        appendRow,
        mapper,
        onRowMoved,
        onSelectionCleared,
        lastSelectedRowRef,
        lastSelectedColRef,
        lastMouseSelectLocation,
    } = args;

    return React.useCallback(
        (mouseArgs: GridMouseEventArgs) => {
            const isMultiKey = browserIsOSX.value ? mouseArgs.metaKey : mouseArgs.ctrlKey;
            const isMultiRow = isMultiKey && rowSelect === "multi";

            const [col, row] = mouseArgs.location;
            const selectedColumns = gridSelection.columns;
            const selectedRows = gridSelection.rows;
            const [cellCol, cellRow] = gridSelection.current?.cell ?? [];
            // eslint-disable-next-line unicorn/prefer-switch
            if (mouseArgs.kind === "cell") {
                lastSelectedColRef.current = undefined;

                lastMouseSelectLocation.current = [col, row];

                // Determine which column is the checkbox column based on new order: rowNumber, checkbox, rowStatus
                const checkboxColIndex = showRowNumber ? 1 : 0;
                const isCheckboxCol = col === checkboxColIndex;

                if (isCheckboxCol && hasRowMarkers) {
                    if (
                        (showTrailingBlankRow === true && row === rows) ||
                        rowMarkers === "number" ||
                        rowSelect === "none"
                    )
                        return;

                    const markerCell = getMangledCellContent(mouseArgs.location);
                    if (markerCell.kind !== InnerGridCellKind.Marker) {
                        return;
                    }
                    if (markerCell.disabled === true) return;

                    if (onRowMoved !== undefined) {
                        const renderer = getCellRenderer(markerCell);
                        assert(renderer?.kind === InnerGridCellKind.Marker);
                        const postClick = renderer?.onClick?.({
                            ...mouseArgs,
                            cell: markerCell,
                            posX: mouseArgs.localEventX,
                            posY: mouseArgs.localEventY,
                            bounds: mouseArgs.bounds,
                            theme: themeForCell(markerCell, mouseArgs.location),
                            preventDefault: () => undefined,
                        }) as MarkerCell | undefined;
                        if (postClick === undefined || postClick.checked === markerCell.checked) return;
                    }

                    setOverlay(undefined);
                    focus();
                    const isSelected = selectedRows.hasIndex(row);

                    const lastHighlighted = lastSelectedRowRef.current;
                    if (
                        rowSelect === "multi" &&
                        (mouseArgs.shiftKey || mouseArgs.isLongTouch === true) &&
                        lastHighlighted !== undefined &&
                        selectedRows.hasIndex(lastHighlighted)
                    ) {
                        const newSlice: Slice = [Math.min(lastHighlighted, row), Math.max(lastHighlighted, row) + 1];

                        if (isMultiRow || rowSelectionMode === "multi") {
                            setSelectedRows(undefined, newSlice, true);
                        } else {
                            setSelectedRows(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiRow);
                        }
                    } else if (rowSelect === "multi" && (isMultiRow || mouseArgs.isTouch || rowSelectionMode === "multi")) {
                        if (isSelected) {
                            setSelectedRows(selectedRows.remove(row), undefined, true);
                        } else {
                            setSelectedRows(undefined, row, true);
                            lastSelectedRowRef.current = row;
                        }
                    } else if (isSelected && selectedRows.length === 1) {
                        setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                    } else {
                        setSelectedRows(CompactSelection.fromSingleSelection(row), undefined, isMultiKey);
                        lastSelectedRowRef.current = row;
                    }
                } else if (col >= rowMarkerOffset && showTrailingBlankRow && row === rows) {
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col);
                } else {
                    if (cellCol !== col || cellRow !== row) {
                        const cell = getMangledCellContent(mouseArgs.location);
                        const renderer = getCellRenderer(cell);

                        if (renderer?.onSelect !== undefined) {
                            let prevented = false;
                            renderer.onSelect({
                                ...mouseArgs,
                                cell,
                                posX: mouseArgs.localEventX,
                                posY: mouseArgs.localEventY,
                                bounds: mouseArgs.bounds,
                                preventDefault: () => (prevented = true),
                                theme: themeForCell(cell, mouseArgs.location),
                            });
                            if (prevented) {
                                return;
                            }
                        }

                        if (rowGroupingNavBehavior === "block" && mapper(row).isGroupHeader) {
                            return;
                        }

                        const isLastStickyRow = lastRowSticky && row === rows;

                        const startedFromLastSticky =
                            lastRowSticky && gridSelection !== undefined && gridSelection.current?.cell[1] === rows;

                        if (
                            (mouseArgs.shiftKey || mouseArgs.isLongTouch === true) &&
                            cellCol !== undefined &&
                            cellRow !== undefined &&
                            gridSelection.current !== undefined &&
                            !startedFromLastSticky
                        ) {
                            if (isLastStickyRow) {
                                // If we're making a selection and shift click in to the last sticky row,
                                // just drop the event. Don't kill the selection.
                                return;
                            }

                            const left = Math.min(col, cellCol);
                            const right = Math.max(col, cellCol);
                            const top = Math.min(row, cellRow);
                            const bottom = Math.max(row, cellRow);
                            setCurrent(
                                {
                                    ...gridSelection.current,
                                    range: {
                                        x: left,
                                        y: top,
                                        width: right - left + 1,
                                        height: bottom - top + 1,
                                    },
                                },
                                true,
                                isMultiKey,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            focus();
                        } else {
                            // Keep row selection when clicking on other cells
                            const hasRowSelection = gridSelection.rows.length > 0;
                            setCurrent(
                                {
                                    cell: [col, row],
                                    range: { x: col, y: row, width: 1, height: 1 },
                                },
                                true,
                                isMultiKey || hasRowSelection,
                                "click"
                            );
                            lastSelectedRowRef.current = undefined;
                            setOverlay(undefined);
                            focus();
                        }
                    }
                }
            } else if (mouseArgs.kind === "header") {
                lastMouseSelectLocation.current = [col, row];
                setOverlay(undefined);
                const headerCheckboxColIndex = showRowNumber ? 1 : 0;
                if (hasRowMarkers && col === headerCheckboxColIndex) {
                    lastSelectedRowRef.current = undefined;
                    lastSelectedColRef.current = undefined;
                    if (!headerRowMarkerDisabled && rowSelect === "multi") {
                        if (selectedRows.length !== rows) {
                            setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), undefined, isMultiKey);
                        } else {
                            setSelectedRows(CompactSelection.empty(), undefined, isMultiKey);
                        }
                        focus();
                    }
                } else {
                    const lastCol = lastSelectedColRef.current;
                    if (
                        columnSelect === "multi" &&
                        (mouseArgs.shiftKey || mouseArgs.isLongTouch === true) &&
                        lastCol !== undefined &&
                        selectedColumns.hasIndex(lastCol)
                    ) {
                        // Support for selecting a slice of columns:
                        const newSlice: Slice = [Math.min(lastCol, col), Math.max(lastCol, col) + 1];

                        if (isMultiKey || mouseArgs.isTouch || columnSelectionMode === "multi") {
                            setSelectedColumns(undefined, newSlice, isMultiKey);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(newSlice), undefined, isMultiKey);
                        }
                    } else if (
                        columnSelect === "multi" &&
                        (isMultiKey || mouseArgs.isTouch || columnSelectionMode === "multi")
                    ) {
                        // Support for selecting a single columns additively:
                        if (selectedColumns.hasIndex(col)) {
                            // If the column is already selected, deselect that column:
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
                        } else {
                            setSelectedColumns(undefined, col, isMultiKey);
                        }
                        lastSelectedColRef.current = col;
                    } else if (columnSelect !== "none") {
                        if (selectedColumns.hasIndex(col)) {
                            // If the column is already selected, deselect that column:
                            setSelectedColumns(selectedColumns.remove(col), undefined, isMultiKey);
                        } else {
                            setSelectedColumns(CompactSelection.fromSingleSelection(col), undefined, isMultiKey);
                        }
                        lastSelectedColRef.current = col;
                    }
                    lastSelectedRowRef.current = undefined;
                    focus();
                }
            } else if (mouseArgs.kind === groupHeaderKind) {
                lastMouseSelectLocation.current = [col, row];
            } else if (mouseArgs.kind === outOfBoundsKind && !mouseArgs.isMaybeScrollbar) {
                setGridSelection(emptyGridSelection, false);
                setOverlay(undefined);
                focus();
                onSelectionCleared?.();
                lastSelectedRowRef.current = undefined;
                lastSelectedColRef.current = undefined;
            }
        },
        [
            rowSelect,
            columnSelect,
            gridSelection,
            hasRowMarkers,
            rowMarkerOffset,
            showTrailingBlankRow,
            showRowNumber,
            rows,
            rowMarkers,
            getMangledCellContent,
            onRowMoved,
            focus,
            rowSelectionMode,
            columnSelectionMode,
            getCellRenderer,
            themeForCell,
            setSelectedRows,
            getCustomNewRowTargetColumn,
            appendRow,
            rowGroupingNavBehavior,
            mapper,
            lastRowSticky,
            setCurrent,
            headerRowMarkerDisabled,
            setSelectedColumns,
            setGridSelection,
            onSelectionCleared,
        ]
    );
}
