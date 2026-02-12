import * as React from "react";
import {
    GridCellKind,
    isReadWriteCell,
    type GridCell,
    type Item,
} from "../internal/data-grid/data-grid-types.js";
import type {
    GridKeyEventArgs,
    CellActivatedEventArgs,
} from "../internal/data-grid/event-args.js";
import type { DataEditorCoreState, GhostInputHandlers } from "./data-editor-state.js";

interface UseGhostInputArgs {
    readonly state: DataEditorCoreState;
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
    readonly onFinishEditing: (
        newValue: GridCell | undefined,
        movement: readonly [-1 | 0 | 1, -1 | 0 | 1]
    ) => void;
    readonly onKeyUpIn?: (event: GridKeyEventArgs) => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly setIsFocused: (focused: boolean) => void;
}

const onGhostCompositionEnd = (_finalValue: string) => {
    // Composition ended. The final value is already in GhostInput.
    // No state update needed here - value will be read from GhostInput
    // when user confirms (Enter) or moves to another cell.
};

export function useGhostInput(args: UseGhostInputArgs): GhostInputHandlers {
    const {
        state,
        onKeyDown,
        onFinishEditing,
        onKeyUpIn,
        onCellActivated,
        setIsFocused,
    } = args;

    const {
        gridSelection,
        overlayRef,
        ghostInputRef,
        ghostInputVisibleRef,
        gridRef,
        rowMarkerOffset,
        getMangledCellContent,
        reselect,
    } = state;

    const onGhostInput = (value: string, composing: boolean) => {
        // IMPORTANT: Do NOT call setGhostValue during IME composition!
        // Any React state update during composition will cause re-render
        // which breaks the IME composition session.
        // GhostInput is the visible editor, so no need to sync value to GrowingEntry.

        // If overlay is already open, GhostInput is visible and handling input directly
        // Use overlayRef to avoid re-creating this callback when overlay changes
        if (overlayRef.current !== undefined) {
            return;
        }

        // If not composing and we have a value, start editing (for non-IME input like English)
        // Skip if value is only whitespace (e.g., space key in navigation mode should not start editing)
        // Skip CustomCell - they have their own editors and don't use GhostInput for typing
        if (!composing && value.length > 0 && value.trim().length > 0 && gridSelection.current !== undefined) {
            const [col, row] = gridSelection.current.cell;
            const cell = getMangledCellContent([col, row]);

            // Skip CustomCell - they have their own editors (e.g., react-select for DropdownCell)
            // Exception: number-cell and date-picker-cell support keystroke activation
            if (cell.kind === GridCellKind.Custom) {
                const cellData = cell.data as { kind?: string } | undefined;
                const cellKind = cellData?.kind;
                // Allow number-cell and date-picker-cell to activate on keystroke
                if (cellKind !== 'number-cell' && cellKind !== 'date-picker-cell') {
                    return;
                }
            }

            if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
                const bounds = gridRef.current?.getBounds(col, row);
                if (bounds !== undefined) {
                    const activation: CellActivatedEventArgs = {
                        inputType: "keyboard",
                        key: value,
                    };
                    onCellActivated?.([col - rowMarkerOffset, row], activation);
                    reselect(bounds, activation, value);
                    // Note: reselect sets the value in GhostInput via setValue()
                }
            }
        }
    };

    const onGhostCompositionStart = () => {
        // IMPORTANT: Minimize React state updates during IME composition!
        // Only open the overlay if not already open. The overlay opening is necessary
        // but we avoid any other state updates to prevent re-renders.
        // Use overlayRef to avoid re-creating this callback when overlay changes

        if (gridSelection.current === undefined) return;

        const [col, row] = gridSelection.current.cell;
        const currentOverlayCell = overlayRef.current?.cell;

        // Check if overlay is open for a DIFFERENT cell
        // This happens when user moves to a new cell and starts typing before previous overlay closes
        if (currentOverlayCell !== undefined &&
            (currentOverlayCell[0] !== col || currentOverlayCell[1] !== row)) {
            // Close current overlay immediately without saving (composition just started for new cell)
            ghostInputRef.current?.clear();
            ghostInputRef.current?.setVisible(false);
            state.setGhostInputVisible(false);
            overlayRef.current = undefined;
            state.setOverlay(undefined);
        }

        // Start editing when composition starts (for IME like Korean/Japanese/Chinese)
        // Skip CustomCell - they have their own editors and don't use GhostInput for IME
        if (overlayRef.current === undefined) {
            const cell = getMangledCellContent([col, row]);

            // Skip CustomCell - they have their own editors (e.g., react-select for DropdownCell)
            // Exception: number-cell and date-picker-cell support keystroke activation
            if (cell.kind === GridCellKind.Custom) {
                const cellData = cell.data as { kind?: string } | undefined;
                const cellKind = cellData?.kind;
                // Allow number-cell and date-picker-cell to activate on keystroke
                if (cellKind !== 'number-cell' && cellKind !== 'date-picker-cell') {
                    return;
                }
            }

            if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true) {
                const bounds = gridRef.current?.getBounds(col, row);
                if (bounds !== undefined) {
                    // IMPORTANT: Clear GhostInput before opening new overlay
                    // This prevents previous cell's value from being carried over
                    ghostInputRef.current?.clear();

                    const activation: CellActivatedEventArgs = {
                        inputType: "keyboard",
                        key: "",
                    };
                    onCellActivated?.([col - rowMarkerOffset, row], activation);
                    reselect(bounds, activation, "");
                }
            }
        }
    };



    const onGhostKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {

        // IMPORTANT: Ignore key events during IME composition
        // This prevents Enter/Tab from interrupting IME input
        if (event.nativeEvent.isComposing) {
            return;
        }

        // Handle Enter, Tab, Escape when overlay is open (GhostMode editing)
        // These keys should complete the editing and call onFinishEditing
        // Use ref to avoid stale closure issues
        if (overlayRef.current !== undefined && ghostInputVisibleRef.current) {
            const key = event.key;

            // IMPORTANT: For Custom cells, the custom editor (e.g., NumberInput) handles
            // Enter/Tab/Escape keys itself. GhostInput should NOT interfere.
            // Only handle these keys for non-Custom cells (Text, Number, Uri, Markdown).
            const cellContent = overlayRef.current.content;
            if (cellContent.kind === GridCellKind.Custom) {
                // Prevent default behavior (e.g., Enter adding newline in textarea)
                // but don't call onFinishEditing - let the custom editor handle it
                if (key === "Enter" || key === "Tab" || key === "Escape") {
                    event.preventDefault();
                    event.stopPropagation();
                }
                // Don't handle Enter/Tab/Escape for Custom cells
                // The custom editor will handle these keys via onFinishedEditing callback
                return;
            }

            if (key === "Escape") {
                // Cancel editing - don't save value
                event.preventDefault();
                event.stopPropagation();
                onFinishEditing(undefined, [0, 0]);
                return;
            }

            if (key === "Enter" && !event.shiftKey) {
                // Complete editing and move down
                event.preventDefault();
                event.stopPropagation();
                onFinishEditing(undefined, [0, 1]);
                return;
            }

            if (key === "Tab") {
                // Complete editing and move right (or left with shift)
                event.preventDefault();
                event.stopPropagation();
                onFinishEditing(undefined, event.shiftKey ? [-1, 0] : [1, 0]);
                return;
            }
        }

        // Printable characters should NEVER be passed to the grid's key handler.
        // They are handled by GhostInput natively (textarea) and processed via onGhostInput (input event).
        // Passing them to handleFixedKeybindings would cause duplicate overlay opening.
        // EXCEPTION: Space key on Boolean cells should be passed through for toggle functionality.
        {
            const key = event.key;
            const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

            if (isPrintable) {
                // Space key on Boolean cell should pass through to handleFixedKeybindings for toggle
                if (key === " " && gridSelection.current !== undefined) {
                    const cell = gridSelection.current.cell;
                    const cellContent = getMangledCellContent(cell);
                    if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {
                        // Don't return - let Space pass through to handleFixedKeybindings
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            }
        }

        // If overlay is open (GhostMode editing), let GhostInput handle editing/cursor keys directly
        if (overlayRef.current !== undefined && ghostInputVisibleRef.current) {
            const key = event.key;
            const isEditingKey = key === "Backspace" || key === "Delete";
            const isCursorKey = key === "ArrowLeft" || key === "ArrowRight" ||
                key === "ArrowUp" || key === "ArrowDown" ||
                key === "Home" || key === "End";

            if (isEditingKey || isCursorKey) {
                return;
            }
        }

        // Convert to GridKeyEventArgs format for other keys
        const cell = gridSelection.current?.cell;
        const bounds = cell !== undefined ? gridRef.current?.getBounds(cell[0], cell[1]) : undefined;

        let cancelled = false;
        const gridArgs: GridKeyEventArgs = {
            bounds,
            cancel: () => {
                cancelled = true;
            },
            stopPropagation: () => event.stopPropagation(),
            preventDefault: () => event.preventDefault(),
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            key: event.key,
            keyCode: event.keyCode,
            rawEvent: event as any,
            location: cell,
        };

        onKeyDown(gridArgs);

        if (cancelled) {
            event.preventDefault();
            event.stopPropagation();
        }
    };

    const onGhostKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const cell = gridSelection.current?.cell;
        const bounds = cell !== undefined ? gridRef.current?.getBounds(cell[0], cell[1]) : undefined;

        const gridArgs: GridKeyEventArgs = {
            bounds,
            cancel: () => {
                // Do nothing
            },
            stopPropagation: () => event.stopPropagation(),
            preventDefault: () => event.preventDefault(),
            ctrlKey: event.ctrlKey,
            metaKey: event.metaKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            key: event.key,
            keyCode: event.keyCode,
            rawEvent: event as any,
            location: cell,
        };

        onKeyUpIn?.(gridArgs);
    };

    const onGhostFocus = () => {
        setIsFocused(true);
    };

    const onGhostBlur = () => {
        setIsFocused(false);
    };

    return {
        onGhostInput,
        onGhostCompositionStart,
        onGhostCompositionEnd,
        onGhostKeyDown,
        onGhostKeyUp,
        onGhostFocus,
        onGhostBlur,
    };
}
