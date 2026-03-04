import * as React from "react";
import type { DataEditorRef, ScrollToFn } from "./data-editor-types.js";
import type { DataGridRef } from "../internal/data-grid/data-grid.js";
import type { GridKeyEventArgs, GridMouseEventArgs } from "../internal/data-grid/event-args.js";
import type { Rectangle } from "../internal/data-grid/data-grid-types.js";

export interface DataEditorRefProps {
    appendRowRef: React.MutableRefObject<(col: number, openOverlay?: boolean) => Promise<void>>;
    appendColumnRef: React.MutableRefObject<(row: number, openOverlay?: boolean) => Promise<void>>;
    rowMarkerOffset: number;
    gridRef: React.MutableRefObject<DataGridRef | null>;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    scrollRef: React.MutableRefObject<HTMLDivElement | null>;
    onKeyDown: (e: GridKeyEventArgs) => void;
    onCopy: (e?: any, ignoreFocus?: boolean) => Promise<void>;
    onPasteInternal: (e?: any) => Promise<void>;
    scrollToRef: React.MutableRefObject<ScrollToFn>;
    normalSizeColumn: (col: number) => void;
}

export function useDataEditorRef(forwardedRef: React.ForwardedRef<DataEditorRef>, props: DataEditorRefProps) {
    const {
        appendRowRef,
        appendColumnRef,
        rowMarkerOffset,
        gridRef,
        canvasRef,
        scrollRef,
        onKeyDown,
        onCopy,
        onPasteInternal,
        scrollToRef,
        normalSizeColumn,
    } = props;

    React.useImperativeHandle(
        forwardedRef,
        () => ({
            appendRow: (col: number, openOverlay?: boolean) => appendRowRef.current(col + rowMarkerOffset, openOverlay),
            appendColumn: (row: number, openOverlay?: boolean) => appendColumnRef.current(row, openOverlay),
            updateCells: damageList => {
                if (rowMarkerOffset !== 0) {
                    damageList = damageList.map(x => ({ cell: [x.cell[0] + rowMarkerOffset, x.cell[1]] }));
                }
                return gridRef.current?.damage(damageList);
            },
            getBounds: (col, row) => {
                if (canvasRef?.current === null || scrollRef?.current === null) {
                    return undefined;
                }

                if (col === undefined && row === undefined) {
                    // Return the bounds of the entire scroll area:
                    const rect = canvasRef.current.getBoundingClientRect();
                    const scale = rect.width / scrollRef.current.clientWidth;
                    return {
                        x: rect.x - scrollRef.current.scrollLeft * scale,
                        y: rect.y - scrollRef.current.scrollTop * scale,
                        width: scrollRef.current.scrollWidth * scale,
                        height: scrollRef.current.scrollHeight * scale,
                    };
                }
                return gridRef.current?.getBounds((col ?? 0) + rowMarkerOffset, row);
            },
            focus: () => gridRef.current?.focus(),
            emit: async e => {
                switch (e) {
                    case "delete":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: false,
                            key: "Delete",
                            keyCode: 46,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "fill-right":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: true,
                            key: "r",
                            keyCode: 82,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "fill-down":
                        onKeyDown({
                            bounds: undefined,
                            cancel: () => undefined,
                            stopPropagation: () => undefined,
                            preventDefault: () => undefined,
                            ctrlKey: true,
                            key: "d",
                            keyCode: 68,
                            metaKey: false,
                            shiftKey: false,
                            altKey: false,
                            rawEvent: undefined,
                            location: undefined,
                        });
                        break;
                    case "copy":
                        await onCopy(undefined, true);
                        break;
                    case "paste":
                        await onPasteInternal();
                        break;
                }
            },
            scrollTo: scrollToRef.current,
            remeasureColumns: cols => {
                for (const col of cols) {
                    void normalSizeColumn(col + rowMarkerOffset);
                }
            },
            getMouseArgsForPosition: (
                posX: number,
                posY: number,
                ev?: MouseEvent | TouchEvent
            ): GridMouseEventArgs | undefined => {
                if (gridRef?.current === null) {
                    return undefined;
                }

                const args = gridRef.current.getMouseArgsForPosition(posX, posY, ev);
                if (args === undefined) {
                    return undefined;
                }

                return {
                    ...args,
                    location: [args.location[0] - rowMarkerOffset, args.location[1]] as any,
                };
            },
        }),
        [
            appendColumnRef,
            appendRowRef,
            canvasRef,
            gridRef,
            normalSizeColumn,
            onCopy,
            onKeyDown,
            onPasteInternal,
            rowMarkerOffset,
            scrollRef,
            scrollToRef,
        ]
    );
}
