import * as React from "react";
import { assert } from "../common/support.js";
import range from "lodash/range.js";
import {
    type GridCell,
    GridCellKind,
    type GridSelection,
    isEditableGridCell,
    type Rectangle,
    isReadWriteCell,
    type InnerGridCell,
    CompactSelection,
    isInnerOnlyCell,
    type GridColumn,
    type Item,
    type CustomCell,
    BooleanEmpty,
    BooleanIndeterminate,
    type EditListItem,
} from "../internal/data-grid/data-grid-types.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import { useEventListener } from "../common/utils.js";
import { unquote, copyToClipboard } from "./data-editor-fns.js";
import { decodeHTML, type CopyBuffer } from "./copy-paste.js";
import type { CustomRenderer } from "../cells/cell-types.js";
import type { DataEditorCoreState, ClipboardHandlers } from "./data-editor-state.js";
import type { Keybinds } from "./data-editor-keybindings.js";

interface UseClipboardArgs {
    readonly state: DataEditorCoreState;
    readonly keybindings: Keybinds;
    readonly getCellsForSelection: DataGridSearchProps["getCellsForSelection"] | undefined;
    readonly coercePasteValue?: (val: string, cell: GridCell) => GridCell | undefined;
    readonly onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
    readonly copyHeaders: boolean;
    readonly columnsIn: readonly GridColumn[];
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    readonly deleteRange: (range: Rectangle) => void;
    readonly safeWindow: Window | null;
}

export function useClipboard(args: UseClipboardArgs): ClipboardHandlers {
    const {
        state,
        keybindings,
        getCellsForSelection,
        coercePasteValue,
        onPaste,
        copyHeaders,
        columnsIn,
        onDelete,
        deleteRange,
        safeWindow,
    } = args;

    const {
        gridSelection,
        gridRef,
        scrollRef,
        canvasRef,
        abortControllerRef,
        rowMarkerOffset,
        mangledCols,
        mangledRows,
        rows,
        getMangledCellContent,
        mangledOnCellsEdited,
        getCellRenderer,
    } = state;

    const onPasteInternal = async (e?: ClipboardEvent) => {
        if (!keybindings.paste) return;
        function pasteToCell(
            inner: InnerGridCell,
            target: Item,
            rawValue: string | boolean | string[] | number | boolean | BooleanEmpty | BooleanIndeterminate,
            formatted?: string | string[]
        ): EditListItem | undefined {
            const stringifiedRawValue =
                typeof rawValue === "object" ? (rawValue?.join("\n") ?? "") : (rawValue?.toString() ?? "");

            if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
                const coerced = coercePasteValue?.(stringifiedRawValue, inner);
                if (coerced !== undefined && isEditableGridCell(coerced)) {
                    return {
                        location: target,
                        value: coerced,
                    };
                }
                const r = getCellRenderer(inner);
                if (r === undefined) return undefined;
                if (r.kind === GridCellKind.Custom) {
                    assert(inner.kind === GridCellKind.Custom);
                    const newVal = (r as unknown as CustomRenderer<CustomCell<any>>).onPaste?.(
                        stringifiedRawValue,
                        inner.data
                    );
                    if (newVal === undefined) return undefined;
                    return {
                        location: target,
                        value: {
                            ...inner,
                            data: newVal,
                        },
                    };
                } else {
                    const newVal = r.onPaste?.(stringifiedRawValue, inner, {
                        formatted,
                        formattedString: typeof formatted === "string" ? formatted : formatted?.join("\n"),
                        rawValue,
                    });
                    if (newVal === undefined) return undefined;
                    assert(newVal.kind === inner.kind);
                    return {
                        location: target,
                        value: newVal,
                    };
                }
            }
            return undefined;
        }

        const selectedColumns = gridSelection.columns;
        const selectedRows = gridSelection.rows;
        const focused =
            scrollRef.current?.contains(document.activeElement) === true ||
            canvasRef.current?.contains(document.activeElement) === true;

        let target: Item | undefined;

        if (gridSelection.current !== undefined) {
            target = [gridSelection.current.range.x, gridSelection.current.range.y];
        } else if (selectedColumns.length === 1) {
            target = [selectedColumns.first() ?? 0, 0];
        } else if (selectedRows.length === 1) {
            target = [rowMarkerOffset, selectedRows.first() ?? 0];
        }

        if (focused && target !== undefined) {
            let data: CopyBuffer | undefined;
            let text: string | undefined;

            const textPlain = "text/plain";
            const textHtml = "text/html";

            if (navigator.clipboard.read !== undefined) {
                const clipboardContent = await navigator.clipboard.read();

                for (const item of clipboardContent) {
                    if (item.types.includes(textHtml)) {
                        const htmlBlob = await item.getType(textHtml);
                        const html = await htmlBlob.text();
                        const decoded = decodeHTML(html);
                        if (decoded !== undefined) {
                            data = decoded;
                            break;
                        }
                    }
                    if (item.types.includes(textPlain)) {
                        // eslint-disable-next-line unicorn/no-await-expression-member
                        text = await (await item.getType(textPlain)).text();
                    }
                }
            } else if (navigator.clipboard.readText !== undefined) {
                text = await navigator.clipboard.readText();
            } else if (e !== undefined && e?.clipboardData !== null) {
                if (e.clipboardData.types.includes(textHtml)) {
                    const html = e.clipboardData.getData(textHtml);
                    data = decodeHTML(html);
                }
                if (data === undefined && e.clipboardData.types.includes(textPlain)) {
                    text = e.clipboardData.getData(textPlain);
                }
            } else {
                return; // I didn't want to read that paste value anyway
            }

            const [targetCol, targetRow] = target;

            const editList: EditListItem[] = [];
            do {
                if (onPaste === undefined) {
                    const cellData = getMangledCellContent(target);
                    const rawValue = text ?? data?.map(r => r.map(cb => cb.rawValue).join("\t")).join("\t") ?? "";
                    const newVal = pasteToCell(cellData, target, rawValue, undefined);
                    if (newVal !== undefined) {
                        editList.push(newVal);
                    }
                    break;
                }

                if (data === undefined) {
                    if (text === undefined) return;
                    data = unquote(text);
                }

                if (
                    onPaste === false ||
                    (typeof onPaste === "function" &&
                        onPaste?.(
                            [target[0] - rowMarkerOffset, target[1]],
                            data.map(r => r.map(cb => cb.rawValue?.toString() ?? ""))
                        ) !== true)
                ) {
                    return;
                }

                for (const [row, dataRow] of data.entries()) {
                    if (row + targetRow >= rows) break;
                    for (const [col, dataItem] of dataRow.entries()) {
                        const index = [col + targetCol, row + targetRow] as const;
                        const [writeCol, writeRow] = index;
                        if (writeCol >= mangledCols.length) continue;
                        if (writeRow >= mangledRows) continue;
                        const cellData = getMangledCellContent(index);
                        const newVal = pasteToCell(cellData, index, dataItem.rawValue, dataItem.formatted);
                        if (newVal !== undefined) {
                            editList.push(newVal);
                        }
                    }
                }
                // eslint-disable-next-line no-constant-condition
            } while (false);

            mangledOnCellsEdited(editList);

            gridRef.current?.damage(
                editList.map(c => ({
                    cell: c.location,
                }))
            );
        }
    };

    useEventListener("paste", onPasteInternal, safeWindow, false, true);

    // While this function is async, we deeply prefer not to await if we don't have to. This will lead to unpacking
    // promises in rather awkward ways when possible to avoid awaiting. We have to use fallback copy mechanisms when
    // an await has happened.
    const onCopy = async (e?: ClipboardEvent, ignoreFocus?: boolean) => {
        if (!keybindings.copy) return;
        const focused =
            ignoreFocus === true ||
            scrollRef.current?.contains(document.activeElement) === true ||
            canvasRef.current?.contains(document.activeElement) === true;

        const selectedColumns = gridSelection.columns;
        const selectedRows = gridSelection.rows;

        const copyToClipboardWithHeaders = (
            cells: readonly (readonly GridCell[])[],
            columnIndexes: readonly number[]
        ) => {
            if (!copyHeaders) {
                copyToClipboard(cells, columnIndexes, e);
            } else {
                const headers = columnIndexes.map(index => ({
                    kind: GridCellKind.Text,
                    data: columnsIn[index].title,
                    displayData: columnsIn[index].title,
                    allowOverlay: false,
                })) as GridCell[];
                copyToClipboard([headers, ...cells], columnIndexes, e);
            }
        };

        if (focused && getCellsForSelection !== undefined) {
            if (gridSelection.current !== undefined) {
                let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
                if (typeof thunk !== "object") {
                    thunk = await thunk();
                }
                copyToClipboardWithHeaders(
                    thunk,
                    range(
                        gridSelection.current.range.x - rowMarkerOffset,
                        gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset
                    )
                );
            } else if (selectedRows !== undefined && selectedRows.length > 0) {
                const toCopy = [...selectedRows];
                const cells = toCopy.map(rowIndex => {
                    const thunk = getCellsForSelection(
                        {
                            x: rowMarkerOffset,
                            y: rowIndex,
                            width: columnsIn.length,
                            height: 1,
                        },
                        abortControllerRef.current.signal
                    );
                    if (typeof thunk === "object") {
                        return thunk[0];
                    }
                    return thunk().then(v => v[0]);
                });
                if (cells.some(x => x instanceof Promise)) {
                    const settled = await Promise.all(cells);
                    copyToClipboardWithHeaders(settled, range(columnsIn.length));
                } else {
                    copyToClipboardWithHeaders(cells as (readonly GridCell[])[], range(columnsIn.length));
                }
            } else if (selectedColumns.length > 0) {
                const results: (readonly (readonly GridCell[])[])[] = [];
                const cols: number[] = [];
                for (const col of selectedColumns) {
                    let thunk = getCellsForSelection(
                        {
                            x: col,
                            y: 0,
                            width: 1,
                            height: rows,
                        },
                        abortControllerRef.current.signal
                    );
                    if (typeof thunk !== "object") {
                        thunk = await thunk();
                    }
                    results.push(thunk);
                    cols.push(col - rowMarkerOffset);
                }
                if (results.length === 1) {
                    copyToClipboardWithHeaders(results[0], cols);
                } else {
                    // FIXME: this is dumb
                    const toCopy = results.reduce((pv, cv) => pv.map((row, index) => [...row, ...cv[index]]));
                    copyToClipboardWithHeaders(toCopy, cols);
                }
            }
        }
    };

    useEventListener("copy", onCopy, safeWindow, false, false);

    const onCut = async (e?: ClipboardEvent) => {
        if (!keybindings.cut) return;
        const focused =
            scrollRef.current?.contains(document.activeElement) === true ||
            canvasRef.current?.contains(document.activeElement) === true;

        if (!focused) return;
        await onCopy(e);
        if (gridSelection.current !== undefined) {
            let effectiveSelection: GridSelection = {
                current: {
                    cell: gridSelection.current.cell,
                    range: gridSelection.current.range,
                    rangeStack: [],
                },
                rows: CompactSelection.empty(),
                columns: CompactSelection.empty(),
            };
            const onDeleteResult = onDelete?.(effectiveSelection);
            if (onDeleteResult === false) return;
            effectiveSelection = onDeleteResult === undefined || onDeleteResult === true ? effectiveSelection : onDeleteResult;
            if (effectiveSelection.current === undefined) return;
            deleteRange(effectiveSelection.current.range);
        }
    };

    useEventListener("cut", onCut, safeWindow, false, false);

    return {
        onCopy,
        onCut,
        onPasteInternal,
    };
}
