import * as React from "react";
import clamp from "lodash/clamp.js";
import {
    type GridCell,
    GridCellKind,
    type GridSelection,
    isEditableGridCell,
    type GridColumn,
    type EditListItem,
} from "../internal/data-grid/data-grid-types.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import type { GhostInputRef } from "../internal/ghost-input/index.js";
import type { OverlayState } from "./data-editor-state.js";

interface UseFinishEditingArgs {
    readonly gridSelection: GridSelection;
    readonly mangledRows: number;
    readonly mangledCols: readonly GridColumn[];
    readonly rowMarkerOffset: number;

    readonly gridRef: React.RefObject<DataGridRef | null>;
    readonly ghostInputRef: React.RefObject<GhostInputRef | null>;
    readonly overlayRef: React.RefObject<OverlayState | undefined>;
    readonly focus: (immediate?: boolean) => void;
    readonly setOverlay: (overlay: OverlayState | undefined) => void;
    readonly setGhostInputVisible: (visible: boolean) => void;
    readonly mangledOnCellsEdited: (items: readonly EditListItem[]) => boolean | void;
    readonly updateSelectedCell: (col: number, row: number, isLastRow: boolean, fromEditMode: boolean) => void;
    readonly appendRow: (col: number, openOverlay?: boolean) => Promise<void>;
    readonly appendColumn: (row: number, openOverlay?: boolean) => Promise<void>;
    readonly getCustomNewRowTargetColumn: (col: number) => number | undefined;
    readonly onRowAppended: unknown;
    readonly onColumnAppended: unknown;
    readonly onFinishedEditing: ((newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void) | undefined;
}

export function useFinishEditing(args: UseFinishEditingArgs) {
    const {
        gridSelection,
        mangledRows,
        mangledCols,
        rowMarkerOffset,
        gridRef,
        ghostInputRef,
        overlayRef,
        focus,
        setOverlay,
        setGhostInputVisible,
        mangledOnCellsEdited,
        updateSelectedCell,
        appendRow,
        appendColumn,
        getCustomNewRowTargetColumn,
        onRowAppended,
        onColumnAppended,
        onFinishedEditing,
    } = args;

    return React.useCallback(
        (newValue: GridCell | undefined, movement: readonly [-1 | 0 | 1, -1 | 0 | 1]) => {
            // Use refs to get current state (avoids stale closure issues)
            const currentOverlay = overlayRef.current;
            // Read value from GhostInput if available (even if isGhostMode is false)
            // This handles cases where editing is completed by clicking outside
            let finalValue = newValue;
            const ghostText = ghostInputRef.current?.getValue() ?? "";

            // IMPORTANT: For Custom cells, the custom editor provides the value via newValue.
            // We should NOT try to use ghostText for Custom cells because:
            // 1. Custom cells have their own editors that handle input directly
            // 2. ghostText might be stale or contain the initial keystroke only
            // 3. The custom editor's onFinishedEditing callback provides the correct finalValue
            const isCustomCell = currentOverlay?.content?.kind === GridCellKind.Custom;

            if (currentOverlay?.cell !== undefined && ghostText.length > 0 && currentOverlay.content !== undefined && !isCustomCell) {
                // Create a new cell value based on the GhostInput text
                // Important: Update both 'data' and 'displayData' for proper display
                const cellContent = currentOverlay.content;
                if (cellContent.kind === GridCellKind.Text) {
                    finalValue = { ...cellContent, data: ghostText, displayData: ghostText };
                } else if (cellContent.kind === GridCellKind.Number) {
                    const num = Number.parseFloat(ghostText);
                    const numVal = Number.isNaN(num) ? 0 : num;
                    finalValue = { ...cellContent, data: numVal, displayData: numVal.toLocaleString() };
                } else if (cellContent.kind === GridCellKind.Uri) {
                    finalValue = { ...cellContent, data: ghostText, displayData: ghostText };
                } else if (cellContent.kind === GridCellKind.Markdown) {
                    finalValue = { ...cellContent, data: ghostText };
                }
            } else if (isCustomCell) {
                // For Custom cells, use newValue from the custom editor
                // Don't modify it based on ghostText
                finalValue = newValue;
            }

            // When GhostInput is empty but newValue comes from overlay editor (e.g., Enter/double-click edit mode),
            // ensure displayData matches data for text cells to fix display issues
            if (finalValue !== undefined && ghostText.length === 0) {
                if (finalValue.kind === GridCellKind.Text && finalValue.data !== finalValue.displayData) {
                    finalValue = { ...finalValue, displayData: finalValue.data };
                } else if (finalValue.kind === GridCellKind.Number) {
                    const formatted = finalValue.data !== undefined ? finalValue.data.toLocaleString() : "0";
                    if (finalValue.displayData !== formatted) {
                        finalValue = { ...finalValue, displayData: formatted };
                    }
                } else if (finalValue.kind === GridCellKind.Uri && finalValue.data !== finalValue.displayData) {
                    finalValue = { ...finalValue, displayData: finalValue.data };
                }
            }

            // Check if the value actually changed by comparing data fields
            const originalContent = currentOverlay?.content;
            const hasValueChanged = (): boolean => {
                if (finalValue === undefined || originalContent === undefined) return false;
                if (finalValue.kind !== originalContent.kind) return true;

                // Compare based on cell type
                switch (finalValue.kind) {
                    case GridCellKind.Text:
                    case GridCellKind.Uri:
                    case GridCellKind.Markdown:
                        return (finalValue as any).data !== (originalContent as any).data;
                    case GridCellKind.Number:
                        return (finalValue as any).data !== (originalContent as any).data;
                    case GridCellKind.Boolean:
                        return (finalValue as any).data !== (originalContent as any).data;
                    default:
                        // For other cell types, assume changed
                        return true;
                }
            };

            if (currentOverlay?.cell !== undefined && finalValue !== undefined && isEditableGridCell(finalValue) && hasValueChanged()) {
                mangledOnCellsEdited([{ location: currentOverlay.cell, value: finalValue }]);
                window.requestAnimationFrame(() => {
                    gridRef.current?.damage([
                        {
                            cell: currentOverlay.cell,
                        },
                    ]);
                });
            }
            // Clear GhostInput and hide it (direct DOM manipulation to avoid re-render)
            ghostInputRef.current?.clear();
            ghostInputRef.current?.setVisible(false);
            setGhostInputVisible(false);

            focus(true);
            // CRITICAL: Reset overlayRef.current immediately (before React re-render)
            // This ensures onGhostCompositionStart sees undefined when checking
            // overlayRef.current === undefined for the next cell edit
            overlayRef.current = undefined;
            setOverlay(undefined);

            const [movX, movY] = movement;
            if (gridSelection.current !== undefined && (movX !== 0 || movY !== 0)) {
                const isEditingLastRow = gridSelection.current.cell[1] === mangledRows - 1;

                if (isEditingLastRow && movY === 1) {
                    onFinishedEditing?.(newValue, [0, 0]);
                    return;
                }

                const isEditingLastCol =
                    gridSelection.current.cell[0] === mangledCols.length - 1 && newValue !== undefined;
                let updateSelected = true;
                if (isEditingLastRow && movY === 1 && onRowAppended !== undefined) {
                    updateSelected = false;
                    const col = gridSelection.current.cell[0] + movX;
                    const customTargetColumn = getCustomNewRowTargetColumn(col);
                    void appendRow(customTargetColumn ?? col, false);
                }
                if (isEditingLastCol && movX === 1 && onColumnAppended !== undefined) {
                    updateSelected = false;
                    const row = gridSelection.current.cell[1] + movY;
                    void appendColumn(row, false);
                }
                if (updateSelected) {
                    const newCol = clamp(gridSelection.current.cell[0] + movX, rowMarkerOffset, mangledCols.length - 1);
                    const newRow = clamp(gridSelection.current.cell[1] + movY, 0, mangledRows - 1);

                    updateSelectedCell(newCol, newRow, isEditingLastRow, false);

                    // Re-focus GhostInput after cell selection update
                    // This ensures IME input works immediately after navigation
                    window.requestAnimationFrame(() => {
                        ghostInputRef.current?.focus();
                    });
                }
            }
            onFinishedEditing?.(newValue, movement);
        },
        [
            focus,
            gridSelection,
            onFinishedEditing,
            mangledOnCellsEdited,
            mangledRows,
            updateSelectedCell,
            mangledCols.length,
            appendRow,
            appendColumn,
            onRowAppended,
            onColumnAppended,
            getCustomNewRowTargetColumn,
            rowMarkerOffset,
        ]
    );
}
