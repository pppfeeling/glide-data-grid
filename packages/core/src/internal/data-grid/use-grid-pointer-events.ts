import * as React from "react";
import type { FullTheme } from "../../common/styles.js";
import type { Rectangle, GridSelection, InnerGridCell, Item } from "./data-grid-types.js";
import { GridCellKind } from "./data-grid-types.js";
import { useEventListener, direction } from "../../common/utils.js";
import {
    type GridMouseEventArgs,
    outOfBoundsKind,
    groupHeaderKind,
    headerKind,
    mouseEventArgsAreEqual,
} from "./event-args.js";
import { pointInRect } from "../../common/math.js";
import { getActionBoundsForGroup, computeHeaderLayout } from "./render/data-grid-render.header.js";
import { assert } from "../../common/support.js";
import { CellSet } from "./cell-set.js";
import type { MappedGridColumn } from "./render/data-grid-lib.js";
import type { GroupDetailsCallback } from "./render/data-grid-render.cells.js";
import type { GetCellRendererCallback } from "../../cells/cell-types.js";

export interface GridPointerEventsArgs {
    // Canvas refs
    readonly canvasRef: React.RefObject<HTMLCanvasElement | null>;
    readonly windowEventTarget: HTMLElement | Window | Document;
    readonly eventTargetRef: React.RefObject<HTMLDivElement | null> | undefined;

    // Geometry
    readonly getBoundsForItem: (canvas: HTMLCanvasElement, col: number, row: number) => Rectangle | undefined;
    readonly getMouseArgsForPosition: (
        canvas: HTMLCanvasElement,
        posX: number,
        posY: number,
        ev?: PointerEvent | MouseEvent | TouchEvent
    ) => GridMouseEventArgs;
    readonly mappedColumns: readonly MappedGridColumn[];

    // State
    readonly hoveredOnEdge: boolean | undefined;
    readonly setHoveredItemInfo: React.Dispatch<React.SetStateAction<[Item, readonly [number, number]] | undefined>>;
    readonly setHoveredOnEdge: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    readonly setOverFill: React.Dispatch<React.SetStateAction<boolean>>;
    readonly lastWasTouchRef: React.RefObject<boolean>;
    readonly setLastWasTouch: React.Dispatch<React.SetStateAction<boolean>>;
    readonly setDrawCursorOverride: React.Dispatch<React.SetStateAction<React.CSSProperties["cursor"] | undefined>>;
    readonly hoverInfoRef: React.MutableRefObject<[Item, readonly [number, number]] | undefined>;

    // Callbacks
    readonly onMouseDown: (args: GridMouseEventArgs) => void;
    readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
    readonly onMouseMove: (args: GridMouseEventArgs) => void;
    readonly onMouseMoveRaw: (event: MouseEvent) => void;
    readonly onItemHovered: (args: GridMouseEventArgs) => void;
    readonly onContextMenu: ((args: GridMouseEventArgs, preventDefault: () => void) => void) | undefined;
    readonly onHeaderMenuClick: ((col: number, screenPosition: Rectangle) => void) | undefined;
    readonly onHeaderIndicatorClick: ((col: number, screenPosition: Rectangle) => void) | undefined;

    // Props
    readonly isDraggable: boolean | "cell" | "header";
    readonly isDragging: boolean;
    readonly isResizing: boolean;
    readonly allowResize: boolean | undefined;
    readonly firstColAccessible: boolean;
    readonly theme: FullTheme;
    readonly selection: GridSelection;
    readonly rows: number;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    readonly getCellRenderer: GetCellRendererCallback;
    readonly getGroupDetails: GroupDetailsCallback | undefined;

    // Damage
    readonly damageInternal: (locations: CellSet) => void;
}

export function useGridPointerEvents(args: GridPointerEventsArgs): void {
    const {
        canvasRef,
        windowEventTarget,
        eventTargetRef,
        getBoundsForItem,
        getMouseArgsForPosition,
        mappedColumns,
        hoveredOnEdge,
        setHoveredItemInfo,
        setHoveredOnEdge,
        setOverFill,
        lastWasTouchRef,
        setLastWasTouch,
        setDrawCursorOverride,
        hoverInfoRef,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onMouseMoveRaw,
        onItemHovered,
        onContextMenu,
        onHeaderMenuClick,
        onHeaderIndicatorClick,
        isDraggable,
        isDragging,
        isResizing,
        allowResize,
        firstColAccessible,
        theme,
        getCellContent,
        getCellRenderer,
        getGroupDetails,
        damageInternal,
    } = args;

    const groupHeaderActionForEvent = (group: string, bounds: Rectangle, localEventX: number, localEventY: number) => {
        if (getGroupDetails === undefined) return undefined;
        const groupDesc = getGroupDetails(group);
        if (groupDesc.actions !== undefined) {
            const boxes = getActionBoundsForGroup(bounds, groupDesc.actions);
            for (const [i, box] of boxes.entries()) {
                if (pointInRect(box, localEventX + bounds.x, localEventY + box.y)) {
                    return groupDesc.actions[i];
                }
            }
        }
        return undefined;
    };

    const isOverHeaderElement = (
        canvas: HTMLCanvasElement,
        col: number,
        clientX: number,
        clientY: number
    ):
        | {
              area: "menu" | "indicator";
              bounds: Rectangle;
          }
        | undefined => {
        const header = mappedColumns[col];

        if (!isDragging && !isResizing && !(hoveredOnEdge ?? false)) {
            const headerBounds = getBoundsForItem(canvas, col, -1);
            assert(headerBounds !== undefined);
            const headerLayout = computeHeaderLayout(
                undefined,
                header,
                headerBounds.x,
                headerBounds.y,
                headerBounds.width,
                headerBounds.height,
                theme,
                direction(header.title) === "rtl"
            );
            if (
                header.hasMenu === true &&
                headerLayout.menuBounds !== undefined &&
                pointInRect(headerLayout.menuBounds, clientX, clientY)
            ) {
                return {
                    area: "menu",
                    bounds: headerLayout.menuBounds,
                };
            } else if (
                header.indicatorIcon !== undefined &&
                headerLayout.indicatorIconBounds !== undefined &&
                pointInRect(headerLayout.indicatorIconBounds, clientX, clientY)
            ) {
                return {
                    area: "indicator",
                    bounds: headerLayout.indicatorIconBounds,
                };
            }
        }
        return undefined;
    };

    const downTime = React.useRef(0);
    const downPosition = React.useRef<Item | undefined>(undefined);
    const mouseDown = React.useRef(false);

    const onPointerDown = (ev: PointerEvent) => {
        const canvas = canvasRef.current;
        const eventTarget = eventTargetRef?.current;
        if (canvas === null || (ev.target !== canvas && ev.target !== eventTarget)) return;
        mouseDown.current = true;

        const clientX = ev.clientX;
        const clientY = ev.clientY;

        if (ev.target === eventTarget && eventTarget !== null) {
            const bounds = eventTarget.getBoundingClientRect();
            if (clientX > bounds.right || clientY > bounds.bottom) return;
        }

        const mouseArgs = getMouseArgsForPosition(canvas, clientX, clientY, ev);
        downPosition.current = mouseArgs.location;

        if (mouseArgs.isTouch) {
            downTime.current = Date.now();
        }
        if (lastWasTouchRef.current !== mouseArgs.isTouch) {
            setLastWasTouch(mouseArgs.isTouch);
        }

        if (
            mouseArgs.kind === headerKind &&
            isOverHeaderElement(canvas, mouseArgs.location[0], clientX, clientY) !== undefined
        ) {
            return;
        } else if (mouseArgs.kind === groupHeaderKind) {
            const action = groupHeaderActionForEvent(mouseArgs.group, mouseArgs.bounds, mouseArgs.localEventX, mouseArgs.localEventY);
            if (action !== undefined) {
                return;
            }
        }

        onMouseDown?.(mouseArgs);
        if (
            !mouseArgs.isTouch &&
            isDraggable !== true &&
            isDraggable !== mouseArgs.kind &&
            mouseArgs.button < 3 &&
            mouseArgs.button !== 1
        ) {
            ev.preventDefault();
        }
    };
    useEventListener("pointerdown", onPointerDown, windowEventTarget, false);

    const lastUpTime = React.useRef(0);

    const onPointerUp = (ev: PointerEvent) => {
        const lastUpTimeValue = lastUpTime.current;
        lastUpTime.current = Date.now();
        const canvas = canvasRef.current;
        mouseDown.current = false;
        if (onMouseUp === undefined || canvas === null) return;
        const eventTarget = eventTargetRef?.current;

        const isOutside = ev.target !== canvas && ev.target !== eventTarget;
        const clientX = ev.clientX;
        const clientY = ev.clientY;
        const canCancel = ev.pointerType === "mouse" ? ev.button < 3 : true;

        let mouseArgs = getMouseArgsForPosition(canvas, clientX, clientY, ev);

        if (mouseArgs.isTouch && downTime.current !== 0 && Date.now() - downTime.current > 500) {
            mouseArgs = {
                ...mouseArgs,
                isLongTouch: true,
            };
        }

        if (lastUpTimeValue !== 0 && Date.now() - lastUpTimeValue < (mouseArgs.isTouch ? 1000 : 500)) {
            mouseArgs = {
                ...mouseArgs,
                isDoubleClick: true,
            };
        }

        if (lastWasTouchRef.current !== mouseArgs.isTouch) {
            setLastWasTouch(mouseArgs.isTouch);
        }

        if (!isOutside && ev.cancelable && canCancel) {
            ev.preventDefault();
        }

        const [col] = mouseArgs.location;
        const headerBounds = isOverHeaderElement(canvas, col, clientX, clientY);
        if (mouseArgs.kind === headerKind && headerBounds !== undefined) {
            if (mouseArgs.button !== 0 || downPosition.current?.[0] !== col || downPosition.current?.[1] !== -1) {
                onMouseUp(mouseArgs, true);
            }
            return;
        } else if (mouseArgs.kind === groupHeaderKind) {
            const action = groupHeaderActionForEvent(mouseArgs.group, mouseArgs.bounds, mouseArgs.localEventX, mouseArgs.localEventY);
            if (action !== undefined) {
                if (mouseArgs.button === 0) {
                    action.onClick(mouseArgs);
                }
                return;
            }
        }

        onMouseUp(mouseArgs, isOutside);
    };
    useEventListener("pointerup", onPointerUp, windowEventTarget, false);

    const onClickImpl = (ev: MouseEvent | TouchEvent) => {
        const canvas = canvasRef.current;
        if (canvas === null) return;
        const eventTarget = eventTargetRef?.current;

        const isOutside = ev.target !== canvas && ev.target !== eventTarget;

        let clientX: number;
        let clientY: number;
        let canCancel = true;
        if (ev instanceof MouseEvent) {
            clientX = ev.clientX;
            clientY = ev.clientY;
            canCancel = ev.button < 3;
        } else {
            clientX = ev.changedTouches[0].clientX;
            clientY = ev.changedTouches[0].clientY;
        }

        const mouseArgs = getMouseArgsForPosition(canvas, clientX, clientY, ev);

        if (lastWasTouchRef.current !== mouseArgs.isTouch) {
            setLastWasTouch(mouseArgs.isTouch);
        }

        if (!isOutside && ev.cancelable && canCancel) {
            ev.preventDefault();
        }

        const [col] = mouseArgs.location;
        if (mouseArgs.kind === headerKind) {
            const headerBounds = isOverHeaderElement(canvas, col, clientX, clientY);
            if (
                headerBounds !== undefined &&
                mouseArgs.button === 0 &&
                downPosition.current?.[0] === col &&
                downPosition.current?.[1] === -1
            ) {
                if (headerBounds.area === "menu") {
                    onHeaderMenuClick?.(col, headerBounds.bounds);
                } else if (headerBounds.area === "indicator") {
                    onHeaderIndicatorClick?.(col, headerBounds.bounds);
                }
            }
        }
    };
    useEventListener("click", onClickImpl, windowEventTarget, false);

    const onContextMenuImpl = (ev: MouseEvent) => {
        const canvas = canvasRef.current;
        const eventTarget = eventTargetRef?.current;
        if (canvas === null || (ev.target !== canvas && ev.target !== eventTarget) || onContextMenu === undefined)
            return;
        const mouseArgs = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
        onContextMenu(mouseArgs, () => {
            if (ev.cancelable) ev.preventDefault();
        });
    };
    useEventListener("contextmenu", onContextMenuImpl, eventTargetRef ?? null, false);

    const maybeSetHoveredInfo = React.useCallback(
        (newVal: typeof hoverInfoRef.current, needPosition: boolean) => {
            setHoveredItemInfo(cv => {
                if (cv === newVal) return cv;
                if (cv !== undefined && newVal !== undefined) {
                    const sameCol = cv[0][0] === newVal[0][0];
                    const sameRow = cv[0][1] === newVal[0][1];
                    const samePos = cv[1][0] === newVal[1][0] && cv[1][1] === newVal[1][1];
                    if (sameCol && sameRow && (samePos || !needPosition)) {
                        return cv;
                    }
                }
                return newVal;
            });
        },
        [hoverInfoRef, setHoveredItemInfo]
    );

    const hoveredRef = React.useRef<GridMouseEventArgs | undefined>(undefined);
    const onPointerMove = (ev: MouseEvent) => {
        const canvas = canvasRef.current;
        if (canvas === null) return;

        const eventTarget = eventTargetRef?.current;
        const isIndirect = ev.target !== canvas && ev.target !== eventTarget;

        const mouseArgs = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);
        if (mouseArgs.kind !== "out-of-bounds" && isIndirect && !mouseDown.current && !mouseArgs.isTouch) {
            return;
        }

        if (!mouseEventArgsAreEqual(mouseArgs, hoveredRef.current)) {
            setDrawCursorOverride(undefined);
            onItemHovered?.(mouseArgs);
            maybeSetHoveredInfo(
                mouseArgs.kind === outOfBoundsKind ? undefined : [mouseArgs.location, [mouseArgs.localEventX, mouseArgs.localEventY]],
                true
            );
            hoveredRef.current = mouseArgs;
        } else if (mouseArgs.kind === "cell" || mouseArgs.kind === headerKind || mouseArgs.kind === groupHeaderKind) {
            let needsDamageCell = false;
            let needsHoverPosition = true;

            if (mouseArgs.kind === "cell") {
                const toCheck = getCellContent(mouseArgs.location);
                const rendererNeeds = getCellRenderer(toCheck)?.needsHoverPosition;
                needsHoverPosition = rendererNeeds ?? toCheck.kind === GridCellKind.Custom;
                needsDamageCell = needsHoverPosition;
            } else {
                needsDamageCell = true;
            }

            const newInfo: typeof hoverInfoRef.current = [mouseArgs.location, [mouseArgs.localEventX, mouseArgs.localEventY]];
            maybeSetHoveredInfo(newInfo, needsHoverPosition);
            hoverInfoRef.current = newInfo;
            if (needsDamageCell) {
                damageInternal(new CellSet([mouseArgs.location]));
            }
        }

        const notRowMarkerCol = mouseArgs.location[0] >= (firstColAccessible ? 0 : 1);
        setHoveredOnEdge(mouseArgs.kind === headerKind && mouseArgs.isEdge && notRowMarkerCol && allowResize === true);

        setOverFill(mouseArgs.kind === "cell" && mouseArgs.isFillHandle);

        onMouseMoveRaw?.(ev);
        onMouseMove(mouseArgs);
    };
    useEventListener("pointermove", onPointerMove, windowEventTarget, true);
}
