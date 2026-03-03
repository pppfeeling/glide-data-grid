import * as React from "react";
import type {
    Rectangle,
    GridSelection,
    InnerGridCell,
    Item,
} from "./data-grid-types.js";
import {
    GridCellKind,
    isReadWriteCell,
    isInnerOnlyCell,
} from "./data-grid-types.js";
import { useDebouncedMemo } from "../../common/utils.js";
import { getEffectiveColumns } from "./render/data-grid-lib.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";
import makeRange from "lodash/range.js";
import { packColRowToNumber } from "../../common/render-state-provider.js";
import type { GridKeyEventArgs } from "./event-args.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";

type DamageUpdateList = readonly { cell: Item }[];

const getRowData = (cell: InnerGridCell, getCellRenderer?: GetCellRendererCallback) => {
    if (cell.kind === GridCellKind.Custom) return cell.copyData;
    const r = getCellRenderer?.(cell);
    return r?.getAccessibilityString(cell) ?? "";
};

export interface DataGridRef {
    focus: () => void;
    getBounds: (col?: number, row?: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
    getMouseArgsForPosition: (
        posX: number,
        posY: number,
        ev?: MouseEvent | TouchEvent
    ) => GridKeyEventArgs | undefined;
}

export interface GridFocusAndAccessibilityArgs {
    // Canvas refs
    readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly canvasPropRef: React.MutableRefObject<HTMLCanvasElement | null> | undefined;

    // Geometry
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: PointerEvent | MouseEvent | TouchEvent
    ) => any;
    readonly mappedColumns: readonly MappedGridColumn[];

    // Layout
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number;
    readonly rows: number;
    readonly accessibilityHeight: number;
    readonly firstColAccessible: boolean;

    // State
    readonly selection: GridSelection;
    readonly dragAndDropState: { src: number; dest: number } | undefined;

    // Callbacks
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
    readonly onCellFocused: (args: Item) => void;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly damage: (cells: DamageUpdateList) => void;

    // Experimental
    readonly disableAccessibilityTree: boolean;

    // Forwarded ref
    readonly forwardedRef: React.Ref<any>;
}

export interface GridFocusAndAccessibilityResult {
    readonly focusElement: (el: HTMLElement | null) => void;
    readonly accessibilityTree: React.ReactNode;
}

export function useGridFocusAndAccessibility(args: GridFocusAndAccessibilityArgs): GridFocusAndAccessibilityResult {
    const {
        canvasRef,
        canvasPropRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        width,
        cellXOffset,
        cellYOffset,
        translateX,
        rows,
        accessibilityHeight,
        firstColAccessible,
        selection,
        dragAndDropState,
        onKeyDown,
        onCellFocused,
        getCellContent,
        getCellRenderer,
        damage,
        disableAccessibilityTree,
        forwardedRef,
    } = args;

    const selectionRef = React.useRef(selection);
    selectionRef.current = selection;
    const focusRef = React.useRef<HTMLElement | null>(null);

    const focusElement = React.useCallback(
        (el: HTMLElement | null) => {
            if (canvasRef.current === null || !canvasRef.current.contains(document.activeElement)) return;
            if (el === null && selectionRef.current.current !== undefined) {
                canvasPropRef?.current?.focus({
                    preventScroll: true,
                });
            } else if (el !== null) {
                el.focus({
                    preventScroll: true,
                });
            }
            focusRef.current = el;
        },
        [canvasRef, canvasPropRef]
    );

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            focus: () => {
                const el = focusRef.current;
                if (el === null || !document.contains(el)) {
                    canvasPropRef?.current?.focus({
                        preventScroll: true,
                    });
                } else {
                    el.focus({
                        preventScroll: true,
                    });
                }
            },
            getBounds: (col?: number, row?: number) => {
                if (canvasPropRef === undefined || canvasPropRef.current === null) {
                    return undefined;
                }

                return getBoundsForItem(canvasPropRef.current, col ?? 0, row ?? -1);
            },
            damage,
            getMouseArgsForPosition: (posX: number, posY: number, ev?: MouseEvent | TouchEvent) => {
                if (canvasPropRef === undefined || canvasPropRef.current === null) {
                    return undefined;
                }

                return getMouseArgsForPosition(canvasPropRef.current, posX, posY, ev);
            },
        }),
        [canvasPropRef, damage, getBoundsForItem, getMouseArgsForPosition]
    );

    const lastFocusedSubdomNode = React.useRef<Item | undefined>(undefined);

    const accessibilityTree = useDebouncedMemo(
        () => {
            if (width < 50 || disableAccessibilityTree) return null;
            let effectiveCols = getEffectiveColumns(mappedColumns, cellXOffset, width, dragAndDropState, translateX);
            const colOffset = firstColAccessible ? 0 : -1;
            if (!firstColAccessible && effectiveCols[0]?.sourceIndex === 0) {
                effectiveCols = effectiveCols.slice(1);
            }

            const [fCol, fRow] = selection.current?.cell ?? [];
            const range = selection.current?.range;

            const visibleCols = effectiveCols.map(c => c.sourceIndex);
            const visibleRows = makeRange(cellYOffset, Math.min(rows, cellYOffset + accessibilityHeight));

            if (
                fCol !== undefined &&
                fRow !== undefined &&
                !(visibleCols.includes(fCol) && visibleRows.includes(fRow))
            ) {
                focusElement(null);
            }

            return (
                <table
                    key="access-tree"
                    role="grid"
                    aria-rowcount={rows + 1}
                    aria-multiselectable="true"
                    aria-colcount={mappedColumns.length + colOffset}>
                    <thead role="rowgroup">
                        <tr role="row" aria-rowindex={1}>
                            {effectiveCols.map(c => (
                                <th
                                    role="columnheader"
                                    aria-selected={selection.columns.hasIndex(c.sourceIndex)}
                                    aria-colindex={c.sourceIndex + 1 + colOffset}
                                    tabIndex={-1}
                                    onFocus={e => {
                                        if (e.target === focusRef.current) return;
                                        return onCellFocused?.([c.sourceIndex, -1]);
                                    }}
                                    key={c.sourceIndex}>
                                    {c.title}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody role="rowgroup">
                        {visibleRows.map(row => (
                            <tr
                                role="row"
                                aria-selected={selection.rows.hasIndex(row)}
                                key={row}
                                aria-rowindex={row + 2}>
                                {effectiveCols.map(c => {
                                    const col = c.sourceIndex;
                                    const key = packColRowToNumber(col, row);
                                    const focused = fCol === col && fRow === row;
                                    const selected =
                                        range !== undefined &&
                                        col >= range.x &&
                                        col < range.x + range.width &&
                                        row >= range.y &&
                                        row < range.y + range.height;
                                    const id = `glide-cell-${col}-${row}`;
                                    const location: Item = [col, row];
                                    const cellContent = getCellContent(location, true);
                                    return (
                                        <td
                                            key={key}
                                            role="gridcell"
                                            aria-colindex={col + 1 + colOffset}
                                            aria-selected={selected}
                                            aria-readonly={
                                                isInnerOnlyCell(cellContent) || !isReadWriteCell(cellContent)
                                            }
                                            id={id}
                                            data-testid={id}
                                            onClick={() => {
                                                const canvas = canvasPropRef?.current;
                                                if (canvas === null || canvas === undefined) return;
                                                return onKeyDown?.({
                                                    bounds: getBoundsForItem(canvas, col, row),
                                                    cancel: () => undefined,
                                                    preventDefault: () => undefined,
                                                    stopPropagation: () => undefined,
                                                    ctrlKey: false,
                                                    key: "Enter",
                                                    keyCode: 13,
                                                    metaKey: false,
                                                    shiftKey: false,
                                                    altKey: false,
                                                    rawEvent: undefined,
                                                    location,
                                                });
                                            }}
                                            onFocusCapture={e => {
                                                if (
                                                    e.target === focusRef.current ||
                                                    (lastFocusedSubdomNode.current?.[0] === col &&
                                                        lastFocusedSubdomNode.current?.[1] === row)
                                                )
                                                    return;
                                                lastFocusedSubdomNode.current = location;
                                                return onCellFocused?.(location);
                                            }}
                                            ref={focused ? focusElement : undefined}
                                            tabIndex={-1}>
                                            {getRowData(cellContent, getCellRenderer)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        },
        [
            width,
            mappedColumns,
            cellXOffset,
            dragAndDropState,
            translateX,
            rows,
            cellYOffset,
            accessibilityHeight,
            selection,
            focusElement,
            getCellContent,
            canvasPropRef,
            onKeyDown,
            getBoundsForItem,
            onCellFocused,
            disableAccessibilityTree,
            firstColAccessible,
            getCellRenderer,
        ],
        200
    );

    return {
        focusElement,
        accessibilityTree,
    };
}
