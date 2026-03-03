import * as React from "react";
import type { FullTheme } from "../../common/styles.js";
import type { Rectangle, InnerGridCell, Item, DrawHeaderCallback } from "./data-grid-types.js";
import { useEventListener } from "../../common/utils.js";
import type { GridMouseEventArgs, GridDragEventArgs } from "./event-args.js";
import { assert } from "../../common/support.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";
import type { SpriteManager } from "./data-grid-sprites.js";
import type { RenderStateProvider } from "../../common/render-state-provider.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";
import type { ImageWindowLoader } from "./image-window-loader-interface.js";
import { drawHeader } from "./render/data-grid-render.header.js";
import { drawCell } from "./render/data-grid-render.cells.js";

export interface GridDragAndDropArgs {
    // Canvas ref
    readonly canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
    readonly eventTargetRef: React.MutableRefObject<HTMLDivElement | null> | undefined;

    // Geometry
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: PointerEvent | MouseEvent | TouchEvent
    ) => GridMouseEventArgs;
    readonly mappedColumns: readonly MappedGridColumn[];

    // Props
    readonly isDraggable: boolean | "cell" | "header";
    readonly isResizing: boolean;
    readonly firstColAccessible: boolean;
    readonly theme: FullTheme;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getCellRenderer: GetCellRendererCallback;

    // Rendering helpers
    readonly spriteManager: SpriteManager;
    readonly renderStateProvider: RenderStateProvider;
    readonly imageLoader: ImageWindowLoader;
    readonly drawHeaderCallback: DrawHeaderCallback | undefined;

    // Callbacks
    readonly onDragStart: (args: GridDragEventArgs) => void;
    readonly onDragEnd: () => void;
    readonly onDragOverCell: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
    readonly onDrop: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
    readonly onDragLeave: (() => void) | undefined;
}

export function useGridDragAndDrop(args: GridDragAndDropArgs): void {
    const {
        canvasRef,
        eventTargetRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        isDraggable,
        isResizing,
        firstColAccessible,
        theme,
        getCellContent,
        getCellRenderer,
        spriteManager,
        renderStateProvider,
        imageLoader,
        drawHeaderCallback,
        onDragStart,
        onDragEnd,
        onDragOverCell,
        onDrop,
        onDragLeave,
    } = args;

    const onDragStartImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (canvas === null || isDraggable === false || isResizing) {
                event.preventDefault();
                return;
            }

            let dragMime: string | undefined;
            let dragData: string | undefined;

            const mouseArgs = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            if (isDraggable !== true && mouseArgs.kind !== isDraggable) {
                event.preventDefault();
                return;
            }

            const setData = (mime: string, payload: string) => {
                dragMime = mime;
                dragData = payload;
            };

            let dragImage: Element | undefined;
            let dragImageX: number | undefined;
            let dragImageY: number | undefined;
            const setDragImage = (image: Element, x: number, y: number) => {
                dragImage = image;
                dragImageX = x;
                dragImageY = y;
            };

            let prevented = false;

            onDragStart?.({
                ...mouseArgs,
                setData,
                setDragImage,
                preventDefault: () => (prevented = true),
                defaultPrevented: () => prevented,
            });
            if (!prevented && dragMime !== undefined && dragData !== undefined && event.dataTransfer !== null) {
                event.dataTransfer.setData(dragMime, dragData);
                event.dataTransfer.effectAllowed = "copyLink";

                if (dragImage !== undefined && dragImageX !== undefined && dragImageY !== undefined) {
                    event.dataTransfer.setDragImage(dragImage, dragImageX, dragImageY);
                } else {
                    const [col, row] = mouseArgs.location;
                    if (row !== undefined) {
                        const offscreen = document.createElement("canvas");
                        const boundsForDragTarget = getBoundsForItem(canvas, col, row);

                        assert(boundsForDragTarget !== undefined);
                        const dpr = Math.ceil(window.devicePixelRatio ?? 1);
                        offscreen.width = boundsForDragTarget.width * dpr;
                        offscreen.height = boundsForDragTarget.height * dpr;

                        const ctx = offscreen.getContext("2d");
                        if (ctx !== null) {
                            ctx.scale(dpr, dpr);
                            ctx.textBaseline = "middle";
                            if (row === -1) {
                                ctx.font = theme.headerFontFull;
                                ctx.fillStyle = theme.bgHeader;
                                ctx.fillRect(0, 0, offscreen.width, offscreen.height);
                                drawHeader(
                                    ctx,
                                    0,
                                    0,
                                    boundsForDragTarget.width,
                                    boundsForDragTarget.height,
                                    mappedColumns[col],
                                    false,
                                    theme,
                                    false,
                                    undefined,
                                    undefined,
                                    false,
                                    0,
                                    spriteManager,
                                    drawHeaderCallback,
                                    false
                                );
                            } else {
                                ctx.font = theme.baseFontFull;
                                ctx.fillStyle = theme.bgCell;
                                ctx.fillRect(0, 0, offscreen.width, offscreen.height);
                                drawCell(
                                    ctx,
                                    getCellContent([col, row]),
                                    0,
                                    row,
                                    false,
                                    false,
                                    0,
                                    0,
                                    boundsForDragTarget.width,
                                    boundsForDragTarget.height,
                                    false,
                                    theme,
                                    theme.bgCell,
                                    imageLoader,
                                    spriteManager,
                                    1,
                                    undefined,
                                    false,
                                    0,
                                    undefined,
                                    undefined,
                                    undefined,
                                    renderStateProvider,
                                    getCellRenderer,
                                    () => undefined,
                                    0
                                );
                            }
                        }

                        offscreen.style.left = "-100%";
                        offscreen.style.position = "absolute";
                        offscreen.style.width = `${boundsForDragTarget.width}px`;
                        offscreen.style.height = `${boundsForDragTarget.height}px`;

                        document.body.append(offscreen);

                        event.dataTransfer.setDragImage(
                            offscreen,
                            boundsForDragTarget.width / 2,
                            boundsForDragTarget.height / 2
                        );

                        window.setTimeout(() => {
                            offscreen.remove();
                        }, 0);
                    }
                }
            } else {
                event.preventDefault();
            }
        },
        [
            canvasRef,
            isDraggable,
            isResizing,
            getMouseArgsForPosition,
            onDragStart,
            getBoundsForItem,
            theme,
            mappedColumns,
            spriteManager,
            drawHeaderCallback,
            getCellContent,
            imageLoader,
            renderStateProvider,
            getCellRenderer,
        ]
    );
    useEventListener("dragstart", onDragStartImpl, eventTargetRef?.current ?? null, false, false);

    const activeDropTarget = React.useRef<Item | undefined>(undefined);

    const onDragOverImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (onDrop !== undefined) {
                event.preventDefault();
            }

            if (canvas === null || onDragOverCell === undefined) {
                return;
            }

            const mouseArgs = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const [rawCol, row] = mouseArgs.location;
            const col = rawCol - (firstColAccessible ? 0 : 1);
            const [activeCol, activeRow] = activeDropTarget.current ?? [];

            if (activeCol !== col || activeRow !== row) {
                activeDropTarget.current = [col, row];
                onDragOverCell([col, row], event.dataTransfer);
            }
        },
        [canvasRef, firstColAccessible, getMouseArgsForPosition, onDragOverCell, onDrop]
    );
    useEventListener("dragover", onDragOverImpl, eventTargetRef?.current ?? null, false, false);

    const onDragEndImpl = React.useCallback(() => {
        activeDropTarget.current = undefined;
        onDragEnd?.();
    }, [onDragEnd]);
    useEventListener("dragend", onDragEndImpl, eventTargetRef?.current ?? null, false, false);

    const onDropImpl = React.useCallback(
        (event: DragEvent) => {
            const canvas = canvasRef.current;
            if (canvas === null || onDrop === undefined) {
                return;
            }

            event.preventDefault();

            const mouseArgs = getMouseArgsForPosition(canvas, event.clientX, event.clientY);

            const [rawCol, row] = mouseArgs.location;
            const col = rawCol - (firstColAccessible ? 0 : 1);

            onDrop([col, row], event.dataTransfer);
        },
        [canvasRef, firstColAccessible, getMouseArgsForPosition, onDrop]
    );
    useEventListener("drop", onDropImpl, eventTargetRef?.current ?? null, false, false);

    const onDragLeaveImpl = React.useCallback(() => {
        onDragLeave?.();
    }, [onDragLeave]);
    useEventListener("dragleave", onDragLeaveImpl, eventTargetRef?.current ?? null, false, false);
}
