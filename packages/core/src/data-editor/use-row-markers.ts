/**
 * Hook for row marker configuration and column construction.
 * Extracts row marker options parsing, mangledCols construction,
 * and getMangledCellContent from the DataEditor component.
 * @module
 */
import * as React from "react";
import {
    type GridCell,
    GridCellKind,
    type GridSelection,
    type InnerGridCell,
    InnerGridCellKind,
    type InnerGridColumn,
    type GridColumn,
    type Item,
    type EditListItem,
} from "../internal/data-grid/data-grid-types.js";
import type { RowMarkerOptions, DataEditorProps } from "./data-editor-types.js";
import type { Theme } from "../common/styles.js";
import type { VisibleRegion } from "./visible-region.js";
import { pointInRect } from "../common/math.js";

const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false,
};

// --- Row marker config ---

interface RowMarkerConfig {
    rowMarkers: RowMarkerOptions["kind"];
    showRowNumber: boolean;
    rowMarkerWidth: number;
    rowMarkerStartIndex: number;
    rowMarkerTheme: Partial<Theme> | undefined;
    headerRowMarkerTheme: Partial<Theme> | undefined;
    headerRowMarkerAlwaysVisible: boolean | undefined;
    headerRowMarkerDisabled: boolean;
    rowMarkerCheckboxStyle: "circle" | "square";
    hasRowMarkers: boolean;
    hasRowStatus: boolean;
    rowStatusWidth: number;
    rowStatusTheme: Partial<Theme> | undefined;
    hasRowId: boolean;
    rowIdWidth: number;
    rowIdTheme: Partial<Theme> | undefined;
    rowMarkerOffset: number;
    totalMarkerWidth: number;
}

export function getRowMarkerConfig(
    p: DataEditorProps,
    rowSelect: "none" | "single" | "multi",
    rowsIn: number
): RowMarkerConfig {
    const rowMarkersObj = typeof p.rowMarkers === "string" ? undefined : p.rowMarkers;

    // Extract rowNumber option and normalize 'both'/'checkbox-and-number' kinds for backward compatibility
    const rowNumberOption = rowMarkersObj?.rowNumber ?? false;
    let normalizedKind = rowMarkersObj?.kind ?? (p.rowMarkers as RowMarkerOptions["kind"]) ?? "none";
    let showRowNumber = rowNumberOption;

    // Convert 'both' and 'checkbox-and-number' to 'checkbox' with rowNumber enabled for backward compatibility
    if (normalizedKind === "both" || normalizedKind === "checkbox-and-number") {
        normalizedKind = "checkbox";
        showRowNumber = true;
    }

    const rowMarkers = normalizedKind;
    const rowMarkerWidthRaw = rowMarkersObj?.width ?? p.rowMarkerWidth;
    const rowMarkerStartIndex = rowMarkersObj?.startIndex ?? p.rowMarkerStartIndex ?? 1;
    const rowMarkerTheme = rowMarkersObj?.theme ?? p.rowMarkerTheme;
    const headerRowMarkerTheme = rowMarkersObj?.headerTheme;
    const headerRowMarkerAlwaysVisible = rowMarkersObj?.headerAlwaysVisible;
    const headerRowMarkerDisabled = rowSelect !== "multi" || rowMarkersObj?.headerDisabled === true;
    const rowMarkerCheckboxStyle = rowMarkersObj?.checkboxStyle ?? "square";

    // Extract rowStatus options
    const rowStatusOption = rowMarkersObj?.rowStatus ?? false;
    const rowStatusWidth = rowMarkersObj?.rowStatusWidth ?? 40;
    const rowStatusTheme = rowMarkersObj?.rowStatusTheme;

    // Extract rowId options
    const rowIdOption = rowMarkersObj?.rowId ?? false;
    const rowIdWidth = rowMarkersObj?.rowIdWidth ?? 80;
    const rowIdTheme = rowMarkersObj?.rowIdTheme;

    const rowMarkerWidth = rowMarkerWidthRaw ?? (rowsIn > 10_000 ? 48 : rowsIn > 1000 ? 44 : rowsIn > 100 ? 36 : 32);
    const hasRowMarkers = rowMarkers !== "none";
    const hasRowStatus = rowStatusOption === true;
    const hasRowId = rowIdOption === true;

    // Calculate offset: rowMarkers (checkbox/number) + rowStatus (if enabled) + rowId (if enabled)
    // When showRowNumber is true, we need 2 columns: one for rowNumber, one for checkbox
    const rowMarkerOffset =
        (hasRowMarkers ? (showRowNumber ? 2 : 1) : 0) +
        (hasRowStatus ? 1 : 0) +
        (hasRowId ? 1 : 0);

    // Total pixel width of all marker columns (rowNumber, checkbox, rowStatus, rowId)
    const totalMarkerWidth =
        (hasRowMarkers ? (showRowNumber ? 2 : 1) * rowMarkerWidth : 0) +
        (hasRowStatus ? rowStatusWidth : 0) +
        (hasRowId ? rowIdWidth : 0);

    return {
        rowMarkers,
        showRowNumber,
        rowMarkerWidth,
        rowMarkerStartIndex,
        rowMarkerTheme,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled,
        rowMarkerCheckboxStyle,
        hasRowMarkers,
        hasRowStatus,
        rowStatusWidth,
        rowStatusTheme,
        hasRowId,
        rowIdWidth,
        rowIdTheme,
        rowMarkerOffset,
        totalMarkerWidth,
    };
}

// --- Mangled columns ---

export function useMangledCols(
    config: RowMarkerConfig,
    columns: readonly InnerGridColumn[],
    rows: number,
    gridSelectionRows: GridSelection["rows"],
): readonly InnerGridColumn[] {
    const {
        rowMarkers,
        showRowNumber,
        rowMarkerWidth,
        rowMarkerTheme,
        rowMarkerCheckboxStyle,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled,
        hasRowMarkers,
        hasRowStatus,
        rowStatusWidth,
        rowStatusTheme,
        hasRowId,
        rowIdWidth,
        rowIdTheme,
    } = config;

    const numSelectedRows = gridSelectionRows.length;
    const rowMarkerChecked =
        rowMarkers === "none" ? undefined : numSelectedRows === 0 ? false : numSelectedRows === rows ? true : undefined;

    return React.useMemo(() => {
        const markerColumns: any[] = [];

        // Column order: rowNumber → checkbox → rowStatus → rowId → user columns

        // 1. rowMarker columns (rowNumber + checkbox, if enabled)
        if (rowMarkers !== "none") {
            // rowNumber column (when showRowNumber is true)
            if (showRowNumber) {
                markerColumns.push({
                    title: "",
                    width: rowMarkerWidth,
                    icon: undefined,
                    hasMenu: false,
                    style: "normal" as const,
                    themeOverride: rowMarkerTheme,
                    rowMarker: rowMarkerCheckboxStyle,
                    rowMarkerChecked: false,
                    headerRowMarkerTheme,
                    headerRowMarkerAlwaysVisible: false,
                    headerRowMarkerDisabled: true,
                });
            }

            // checkbox column (or primary marker when showRowNumber is false)
            markerColumns.push({
                title: "",
                width: rowMarkerWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
                themeOverride: rowMarkerTheme,
                rowMarker: rowMarkerCheckboxStyle,
                rowMarkerChecked,
                headerRowMarkerTheme,
                headerRowMarkerAlwaysVisible,
                headerRowMarkerDisabled,
            });
        }

        // 2. rowStatus column (third, if enabled)
        if (hasRowStatus) {
            markerColumns.push({
                title: "",
                width: rowStatusWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
                themeOverride: rowStatusTheme,
            });
        }

        // 3. rowId column (fourth, if enabled)
        if (hasRowId) {
            markerColumns.push({
                title: "ID",
                width: rowIdWidth,
                icon: undefined,
                hasMenu: false,
                style: "normal" as const,
                themeOverride: rowIdTheme,
            });
        }

        return [...markerColumns, ...columns];
    }, [
        hasRowStatus,
        rowStatusWidth,
        rowStatusTheme,
        hasRowId,
        rowIdWidth,
        rowIdTheme,
        rowMarkers,
        columns,
        rowMarkerWidth,
        rowMarkerTheme,
        rowMarkerCheckboxStyle,
        rowMarkerChecked,
        headerRowMarkerTheme,
        headerRowMarkerAlwaysVisible,
        headerRowMarkerDisabled,
        showRowNumber,
    ]);
}

// --- getMangledCellContent ---

interface MangledCellContentParams {
    readonly config: RowMarkerConfig;
    readonly showTrailingBlankRow: boolean;
    readonly mangledRows: number;
    readonly onRowStatus: DataEditorProps["onRowStatus"];
    readonly onRowId: DataEditorProps["onRowId"];
    readonly rowNumberMapper: (row: number) => number | undefined;
    readonly gridSelectionRows: GridSelection["rows"];
    readonly onRowMoved: DataEditorProps["onRowMoved"];
    readonly trailingRowOptions: DataEditorProps["trailingRowOptions"];
    readonly experimental: DataEditorProps["experimental"];
    readonly getCellContent: DataEditorProps["getCellContent"];
    readonly disabledRows: DataEditorProps["disabledRows"];
    readonly mangledCols: readonly GridColumn[];
    readonly visibleRegionRef: React.MutableRefObject<VisibleRegion>;
    readonly rowsRef: React.MutableRefObject<number>;
}

export function useGetMangledCellContent(params: MangledCellContentParams) {
    const {
        config,
        showTrailingBlankRow,
        mangledRows,
        onRowStatus,
        onRowId,
        rowNumberMapper,
        gridSelectionRows,
        onRowMoved,
        trailingRowOptions,
        experimental,
        getCellContent,
        disabledRows,
        mangledCols,
        visibleRegionRef,
        rowsRef,
    } = params;

    const {
        rowMarkers,
        showRowNumber,
        rowMarkerStartIndex,
        rowMarkerCheckboxStyle,
        rowStatusTheme,
        rowIdTheme,
        hasRowMarkers,
        hasRowStatus,
        hasRowId,
        rowMarkerOffset,
    } = config;

    const mangledColsRef = React.useRef(mangledCols);
    mangledColsRef.current = mangledCols;

    return React.useCallback(
        ([col, row]: Item, forceStrict: boolean = false): InnerGridCell => {
            const isTrailing = showTrailingBlankRow && row === mangledRows - 1;

            // Calculate column positions based on actual order in mangledCols: rowNumber, checkbox, rowStatus, rowId
            let currentColIndex = 0;

            // Must match the order in mangledCols exactly
            let rowNumberColIndex = -1;
            let checkboxColIndex = -1;
            let rowStatusColIndex = -1;
            let rowIdColIndex = -1;

            // 1. rowNumber column (first if enabled)
            if (hasRowMarkers && showRowNumber) {
                rowNumberColIndex = currentColIndex++;
            }

            // 2. checkbox column (second if hasRowMarkers)
            if (hasRowMarkers) {
                checkboxColIndex = currentColIndex++;
            }

            // 3. rowStatus column (third if enabled)
            if (hasRowStatus) {
                rowStatusColIndex = currentColIndex++;
            }

            // 4. rowId column (fourth if enabled)
            if (hasRowId) {
                rowIdColIndex = currentColIndex++;
            }

            // 1. Handle rowNumber column (first if enabled)
            if (col === rowNumberColIndex) {
                if (isTrailing) {
                    return loadingCell;
                }
                const mappedRow = rowNumberMapper(row);
                if (mappedRow === undefined) return loadingCell;

                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checkboxStyle: rowMarkerCheckboxStyle,
                    checked: false,
                    markerKind: "number",
                    row: rowMarkerStartIndex + mappedRow,
                    drawHandle: false,
                    cursor: undefined,
                    disabled: disabledRows?.(row) === true,
                };
            }

            // 2. Handle checkbox column (second if enabled)
            if (col === checkboxColIndex) {
                if (isTrailing) {
                    return loadingCell;
                }
                const mappedRow = rowNumberMapper(row);
                if (mappedRow === undefined) return loadingCell;

                // When showRowNumber is false, this is the only marker column
                let markerKind: "checkbox" | "number" | "both" | "checkbox-visible";
                if (showRowNumber) {
                    markerKind = rowMarkers === "checkbox-visible" ? "checkbox-visible" : "checkbox";
                } else if (rowMarkers === "clickable-number") {
                    markerKind = "number";
                } else {
                    markerKind = rowMarkers as "checkbox" | "number" | "both" | "checkbox-visible";
                }

                return {
                    kind: InnerGridCellKind.Marker,
                    allowOverlay: false,
                    checkboxStyle: rowMarkerCheckboxStyle,
                    checked: gridSelectionRows.hasIndex(row) === true,
                    markerKind,
                    row: rowMarkerStartIndex + mappedRow,
                    drawHandle: onRowMoved !== undefined,
                    cursor: showRowNumber ? undefined : (rowMarkers === "clickable-number" ? "pointer" : undefined),
                    disabled: disabledRows?.(row) === true,
                };
            }

            // 3. Handle rowStatus column (third if enabled)
            if (col === rowStatusColIndex) {
                if (isTrailing) {
                    return loadingCell;
                }

                // Call onRowStatus callback to get the status
                const status = onRowStatus?.(row);

                return {
                    kind: InnerGridCellKind.RowStatus,
                    allowOverlay: false,
                    status,
                    themeOverride: rowStatusTheme,
                };
            }

            // 4. Handle rowId column (fourth if enabled)
            if (col === rowIdColIndex) {
                if (isTrailing) {
                    return loadingCell;
                }

                // Call onRowId callback to get the ID
                const rowId = onRowId?.(row);

                return {
                    kind: InnerGridCellKind.RowId,
                    allowOverlay: false,
                    rowId,
                    themeOverride: rowIdTheme,
                };
            }

            if (isTrailing) {
                //If the grid is empty, we will return text
                const isFirst = col === rowMarkerOffset;

                const maybeFirstColumnHint = isFirst ? (trailingRowOptions?.hint ?? "") : "";
                const c = mangledColsRef.current[col];

                if (c?.trailingRowOptions?.disabled === true) {
                    return loadingCell;
                } else {
                    const hint = c?.trailingRowOptions?.hint ?? maybeFirstColumnHint;
                    const icon = c?.trailingRowOptions?.addIcon ?? trailingRowOptions?.addIcon;
                    return {
                        kind: InnerGridCellKind.NewRow,
                        hint,
                        allowOverlay: false,
                        icon,
                    };
                }
            } else {
                const outerCol = col - rowMarkerOffset;
                if (forceStrict || experimental?.strict === true) {
                    const vr = visibleRegionRef.current;
                    const isOutsideMainArea =
                        vr.x > outerCol ||
                        outerCol > vr.x + vr.width ||
                        vr.y > row ||
                        row > vr.y + vr.height ||
                        row >= rowsRef.current;
                    const isSelected = outerCol === vr.extras?.selected?.[0] && row === vr.extras?.selected[1];
                    let isInFreezeArea = false;
                    if (vr.extras?.freezeRegions !== undefined) {
                        for (const fr of vr.extras.freezeRegions) {
                            if (pointInRect(fr, outerCol, row)) {
                                isInFreezeArea = true;
                                break;
                            }
                        }
                    }

                    if (isOutsideMainArea && !isSelected && !isInFreezeArea) {
                        return loadingCell;
                    }
                }
                let result = getCellContent([outerCol, row]);
                if (rowMarkerOffset !== 0 && result.span !== undefined) {
                    result = {
                        ...result,
                        span: [result.span[0] + rowMarkerOffset, result.span[1] + rowMarkerOffset],
                    };
                }
                return result;
            }
        },
        [
            showTrailingBlankRow,
            mangledRows,
            hasRowStatus,
            onRowStatus,
            rowStatusTheme,
            hasRowId,
            onRowId,
            rowIdTheme,
            hasRowMarkers,
            rowNumberMapper,
            rowMarkerCheckboxStyle,
            gridSelectionRows,
            rowMarkers,
            rowMarkerStartIndex,
            onRowMoved,
            rowMarkerOffset,
            trailingRowOptions?.hint,
            trailingRowOptions?.addIcon,
            experimental?.strict,
            getCellContent,
            showRowNumber,
            disabledRows,
        ]
    );
}
export function useMangledOnCellsEdited(
    onCellsEdited: DataEditorProps["onCellsEdited"],
    onCellEdited: DataEditorProps["onCellEdited"],
    rowMarkerOffset: number
) {
    return React.useCallback(
        (items: readonly EditListItem[]) => {
            const mangledItems =
                rowMarkerOffset === 0
                    ? items
                    : items.map(x => ({
                        ...x,
                        location: [x.location[0] - rowMarkerOffset, x.location[1]] as const,
                    }));
            const r = onCellsEdited?.(mangledItems);

            if (r !== true) {
                for (const i of mangledItems) {
                    onCellEdited?.(i.location, i.value);
                }
            }

            return r;
        },
        [onCellEdited, onCellsEdited, rowMarkerOffset]
    );
}
