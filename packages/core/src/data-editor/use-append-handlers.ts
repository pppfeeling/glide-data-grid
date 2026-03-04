import * as React from "react";
import { isReadWriteCell, type GridCell, type Item, type GridColumn, type GridSelection } from "../internal/data-grid/data-grid-types.js";
import type { DataEditorProps } from "./data-editor-types.js";

type SelectionTrigger = "click" | "drag" | "keyboard-nav" | "keyboard-select" | "edit";

interface UseAppendHandlersArgs {
    readonly mangledCols: readonly any[];
    readonly onRowAppended: DataEditorProps["onRowAppended"];
    readonly onColumnAppended: DataEditorProps["onColumnAppended"];
    readonly rowMarkerOffset: number;
    readonly rows: number;
    readonly rowsRef: React.RefObject<number>;
    readonly colsRef: React.RefObject<number>;
    readonly scrollToRef: React.RefObject<
        (
            col: number,
            row: number,
            dir?: "horizontal" | "vertical" | "both",
            paddingX?: number,
            paddingY?: number,
            options?: any
        ) => void
    >;
    readonly setCurrent: (
        value: Pick<NonNullable<GridSelection["current"]>, "cell" | "range"> | undefined,
        expand: boolean,
        append: boolean,
        trigger: SelectionTrigger
    ) => void;
    readonly getCellContentRef: React.RefObject<(cell: Item) => GridCell>;
    readonly focusCallback: React.RefObject<(col: number, row: number) => void>;
    readonly columns: readonly GridColumn[];
    readonly columnsIn: readonly GridColumn[];
    readonly hasRowMarkers: boolean;
    readonly trailingRowOptions: DataEditorProps["trailingRowOptions"];
}

export function useAppendHandlers(args: UseAppendHandlersArgs) {
    const {
        mangledCols,
        onRowAppended,
        onColumnAppended,
        rowMarkerOffset,
        rows,
        rowsRef,
        colsRef,
        scrollToRef,
        setCurrent,
        getCellContentRef,
        focusCallback,
        columns,
        columnsIn,
        hasRowMarkers,
        trailingRowOptions,
    } = args;

    const appendRow = React.useCallback(
        async (col: number, openOverlay: boolean = true, behavior?: ScrollBehavior): Promise<void> => {
            const c = mangledCols[col];
            const appendResult = ((c?.trailingRowOptions as any)?.onRowAppended ?? onRowAppended)?.();

            let r: "top" | "bottom" | number | undefined = undefined;
            let bottom = true;
            if (appendResult !== undefined) {
                r = await appendResult;
                if (r === "top") bottom = false;
                if (typeof r === "number") bottom = false;
            }

            let backoff = 0;
            const doFocus = () => {
                if (rowsRef.current! <= rows) {
                    if (backoff < 500) {
                        window.setTimeout(doFocus, backoff);
                    }
                    backoff = 50 + backoff * 2;
                    return;
                }

                const row = typeof r === "number" ? r : bottom ? rows : 0;
                scrollToRef.current?.(col - rowMarkerOffset, row, "both", 0, 20, behavior ? { behavior } : undefined);
                setCurrent(
                    {
                        cell: [col, row],
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                    false,
                    false,
                    "edit"
                );

                const cell = getCellContentRef.current!([col - rowMarkerOffset, row]);
                if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
                    // wait for scroll to have a chance to process
                    window.setTimeout(() => {
                        focusCallback.current?.(col, row);
                    }, 0);
                }
            };
            // Queue up to allow the consumer to react to the event and let us check if they did
            doFocus();
        },
        [mangledCols, onRowAppended, rowMarkerOffset, rows, setCurrent, rowsRef, scrollToRef, getCellContentRef, focusCallback]
    );

    const appendColumn = React.useCallback(
        async (row: number, openOverlay: boolean = true): Promise<void> => {
            const appendResult = onColumnAppended?.();

            let r: "left" | "right" | number | undefined = undefined;
            let right = true;
            if (appendResult !== undefined) {
                r = await appendResult;
                if (r === "left") right = false;
                if (typeof r === "number") right = false;
            }

            let backoff = 0;
            const doFocus = () => {
                if (colsRef.current! <= mangledCols.length) {
                    if (backoff < 500) {
                        window.setTimeout(doFocus, backoff);
                    }
                    backoff = 50 + backoff * 2;
                    return;
                }

                const col = typeof r === "number" ? r : right ? mangledCols.length : 0;
                scrollToRef.current?.(col - rowMarkerOffset, row);
                setCurrent(
                    {
                        cell: [col, row],
                        range: {
                            x: col,
                            y: row,
                            width: 1,
                            height: 1,
                        },
                    },
                    false,
                    false,
                    "edit"
                );

                const cell = getCellContentRef.current!([col - rowMarkerOffset, row]);
                if (cell.allowOverlay && isReadWriteCell(cell) && cell.readonly !== true && openOverlay) {
                    window.setTimeout(() => {
                        focusCallback.current?.(col, row);
                    }, 0);
                }
            };
            doFocus();
        },
        [mangledCols, onColumnAppended, rowMarkerOffset, setCurrent, colsRef, scrollToRef, getCellContentRef, focusCallback]
    );

    const getCustomNewRowTargetColumn = React.useCallback(
        (col: number): number | undefined => {
            const customTargetColumn =
                columns[col]?.trailingRowOptions?.targetColumn ?? trailingRowOptions?.targetColumn;

            if (typeof customTargetColumn === "number") {
                const customTargetOffset = hasRowMarkers ? 1 : 0;
                return customTargetColumn + customTargetOffset;
            }

            if (typeof customTargetColumn === "object") {
                const maybeIndex = columnsIn.indexOf(customTargetColumn);
                if (maybeIndex >= 0) {
                    const customTargetOffset = hasRowMarkers ? 1 : 0;
                    return maybeIndex + customTargetOffset;
                }
            }

            return undefined;
        },
        [columns, columnsIn, hasRowMarkers, trailingRowOptions?.targetColumn]
    );

    return {
        appendRow,
        appendColumn,
        getCustomNewRowTargetColumn,
    };
}
