import * as React from "react";
import {
    type GridSelection,
    isEditableGridCell,
    type Rectangle,
    isReadWriteCell,
    CompactSelection,
    isInnerOnlyCell,
    type GridColumn,
    type Item,
    type Slice,
    type EditListItem,
    type InnerGridCell,
    type CellActivationBehavior,
} from "../internal/data-grid/data-grid-types.js";
import {
    type GridMouseEventArgs,
    type GridMouseCellEventArgs,
    type CellActivatedEventArgs,
    type HeaderClickedEventArgs,
    type GroupHeaderClickedEventArgs,
    type CellClickedEventArgs,
    type FillPatternEventArgs,
    groupHeaderKind,
    headerKind,
} from "../internal/data-grid/event-args.js";
import { browserIsOSX } from "../common/browser-detect.js";
import {
    isGroupEqual,
    isGroupEqualAtLevel,
    itemsAreEqual,
    itemIsInRect,
} from "../internal/data-grid/render/data-grid-lib.js";
import { combineRects } from "../common/math.js";
import { measureColumn } from "./use-column-sizer.js";
import type { FullTheme } from "../common/styles.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";
import type { DataEditorCoreState, MouseHandlers } from "./data-editor-state.js";
import type { VisibleRegion } from "./visible-region.js";

interface MouseState {
    readonly previousSelection?: GridSelection;
    readonly fillHandle?: boolean;
}

interface UseMouseHandlersArgs {
    readonly state: DataEditorCoreState;

    // Mouse state (managed in parent, used across boundaries)
    readonly mouseState: MouseState | undefined;
    readonly setMouseState: React.Dispatch<React.SetStateAction<MouseState | undefined>>;
    readonly fillHighlightRegion: Rectangle | undefined;
    readonly setFillHighlightRegion: React.Dispatch<React.SetStateAction<Rectangle | undefined>>;
    readonly setScrollDir: React.Dispatch<React.SetStateAction<GridMouseEventArgs["scrollEdge"] | undefined>>;

    // Event callbacks (from props)
    readonly handleSelect: (args: GridMouseEventArgs) => void;
    readonly onMouseMove?: (args: GridMouseEventArgs) => void;
    readonly onCellClicked?: (cell: Item, event: CellClickedEventArgs) => void;
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    readonly onCellContextMenu?: (cell: Item, event: CellClickedEventArgs) => void;
    readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    readonly onColumnResize?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    readonly onFillPattern?: (event: FillPatternEventArgs) => void;

    // Configuration values
    readonly cellActivationBehavior: CellActivationBehavior;
    readonly columnSelect: "none" | "single" | "multi";
    readonly columnSelectionMode: "auto" | "multi";
    readonly columns: readonly GridColumn[];
    readonly groupLevels: number;
    readonly mergedTheme: FullTheme;
    readonly minColumnWidth: number;
    readonly maxColumnWidth: number;

    // Utilities
    readonly themeForCell: (cell: InnerGridCell, pos: Item) => FullTheme;
    readonly getCellsForSelection: DataGridSearchProps["getCellsForSelection"] | undefined;
    readonly setSelectedColumns: (
        newColumns: CompactSelection | undefined,
        grow: Slice | number | undefined,
        expand: boolean
    ) => void;
    readonly visibleRegion: VisibleRegion;
    readonly lastMouseSelectLocation: React.MutableRefObject<readonly [number, number] | undefined>;
}

export function useMouseHandlers(args: UseMouseHandlersArgs): MouseHandlers {
    const {
        state,
        mouseState,
        setMouseState,
        fillHighlightRegion,
        setFillHighlightRegion,
        setScrollDir,
        handleSelect,
        onMouseMove,
        onCellClicked,
        onCellActivated,
        onCellContextMenu,
        onHeaderContextMenu,
        onGroupHeaderContextMenu,
        onHeaderClicked,
        onGroupHeaderClicked,
        onColumnResize,
        onFillPattern,
        cellActivationBehavior,
        columnSelect,
        columnSelectionMode,
        columns,
        groupLevels,
        mergedTheme,
        minColumnWidth,
        maxColumnWidth,
        themeForCell,
        getCellsForSelection,
        setSelectedColumns,
        visibleRegion,
        lastMouseSelectLocation,
    } = args;

    const {
        gridSelection,
        gridRef,
        visibleRegionRef,
        abortControllerRef,
        rowMarkerOffset,
        mangledCols,
        rows,
        setGridSelection,
        getMangledCellContent,
        mangledOnCellsEdited,
        reselect,
        focus,
        getCellRenderer,
    } = state;

    const isActivelyDraggingHeader = React.useRef(false);
    const touchDownArgs = React.useRef(visibleRegion);
    const mouseDownData = React.useRef<{
        readonly time: number;
        readonly button: number;
        readonly location: Item;
    }>(undefined);
    const isPrevented = React.useRef(false);

    const onMouseDown = (mouseArgs: GridMouseEventArgs) => {
        isPrevented.current = false;
        touchDownArgs.current = visibleRegionRef.current;
        if (mouseArgs.button !== 0 && mouseArgs.button !== 1) {
            mouseDownData.current = undefined;
            return;
        }

        const time = performance.now();
        mouseDownData.current = {
            button: mouseArgs.button,
            time,
            location: mouseArgs.location,
        };

        if (mouseArgs?.kind === "header") {
            isActivelyDraggingHeader.current = true;
        }

        const fh = mouseArgs.kind === "cell" && mouseArgs.isFillHandle;

        if (!fh && mouseArgs.kind !== "cell" && mouseArgs.isEdge) return;

        setMouseState({
            previousSelection: gridSelection,
            fillHandle: fh,
        });
        lastMouseSelectLocation.current = undefined;

        if (!mouseArgs.isTouch && mouseArgs.button === 0 && !fh) {
            handleSelect(mouseArgs);
        } else if (!mouseArgs.isTouch && mouseArgs.button === 1) {
            lastMouseSelectLocation.current = mouseArgs.location;
        }
    };

    const handleGroupHeaderSelection = (mouseArgs: GridMouseEventArgs) => {
        if (mouseArgs.kind !== groupHeaderKind || columnSelect !== "multi") {
            return;
        }
        const isMultiKey = browserIsOSX.value ? mouseArgs.metaKey : mouseArgs.ctrlKey;
        const [col, row] = mouseArgs.location;
        const selectedColumns = gridSelection.columns;

        if (col < rowMarkerOffset) return;

        const needle = mangledCols[col];
        let start = col;
        let end = col;

        // For multi-level groups, determine which level was clicked
        // row -2 = level 0, row -3 = level 1, etc.
        const clickedLevel = row <= -2 ? -(row + 2) : 0;

        // Use level-aware comparison for multi-level groups
        // groupLevels is the global max level count across all columns
        const compareGroups = (g1: string | readonly string[] | undefined, g2: string | readonly string[] | undefined) => {
            if (groupLevels > 1) {
                return isGroupEqualAtLevel(g1, g2, clickedLevel, groupLevels);
            }
            return isGroupEqual(g1, g2);
        };

        for (let i = col - 1; i >= rowMarkerOffset; i--) {
            if (!compareGroups(needle.group, mangledCols[i].group)) break;
            start--;
        }

        for (let i = col + 1; i < mangledCols.length; i++) {
            if (!compareGroups(needle.group, mangledCols[i].group)) break;
            end++;
        }

        focus();

        if (isMultiKey || mouseArgs.isTouch || columnSelectionMode === "multi") {
            if (selectedColumns.hasAll([start, end + 1])) {
                let newVal = selectedColumns;
                for (let index = start; index <= end; index++) {
                    newVal = newVal.remove(index);
                }
                setSelectedColumns(newVal, undefined, isMultiKey);
            } else {
                setSelectedColumns(undefined, [start, end + 1], isMultiKey);
            }
        } else {
            setSelectedColumns(CompactSelection.fromSingleSelection([start, end + 1]), undefined, isMultiKey);
        }
    };

    const normalSizeColumn = async (col: number): Promise<void> => {
        if (getCellsForSelection !== undefined && onColumnResize !== undefined) {
            const start = visibleRegionRef.current.y;
            const end = visibleRegionRef.current.height;
            let cells = getCellsForSelection(
                {
                    x: col,
                    y: start,
                    width: 1,
                    height: Math.min(end, rows - start),
                },
                abortControllerRef.current.signal
            );
            if (typeof cells !== "object") {
                cells = await cells();
            }
            const inputCol = columns[col - rowMarkerOffset];
            const offscreen = document.createElement("canvas");
            const ctx = offscreen.getContext("2d", { alpha: false });
            if (ctx !== null) {
                ctx.font = mergedTheme.baseFontFull;
                const newCol = measureColumn(
                    ctx,
                    mergedTheme,
                    inputCol,
                    0,
                    cells,
                    minColumnWidth,
                    maxColumnWidth,
                    false,
                    getCellRenderer
                );
                onColumnResize?.(inputCol, newCol.width, col, newCol.width);
            }
        }
    };

    const fillPattern = async (previousSelection: GridSelection, currentSelection: GridSelection) => {
        const patternRange = previousSelection.current?.range;

        if (
            patternRange === undefined ||
            getCellsForSelection === undefined ||
            currentSelection.current === undefined
        ) {
            return;
        }
        const currentRange = currentSelection.current.range;

        if (onFillPattern !== undefined) {
            let canceled = false;
            onFillPattern({
                fillDestination: { ...currentRange, x: currentRange.x - rowMarkerOffset },
                patternSource: { ...patternRange, x: patternRange.x - rowMarkerOffset },
                preventDefault: () => (canceled = true),
            });
            if (canceled) return;
        }

        let cells = getCellsForSelection(patternRange, abortControllerRef.current.signal);
        if (typeof cells !== "object") cells = await cells();

        const pattern = cells;

        // loop through all cells in currentSelection.current.range
        const editItemList: EditListItem[] = [];
        for (let x = 0; x < currentRange.width; x++) {
            for (let y = 0; y < currentRange.height; y++) {
                const cell: Item = [currentRange.x + x, currentRange.y + y];
                if (itemIsInRect(cell, patternRange)) continue;
                const patternCell = pattern[y % patternRange.height][x % patternRange.width];
                if (isInnerOnlyCell(patternCell) || !isReadWriteCell(patternCell)) continue;
                editItemList.push({
                    location: cell,
                    value: { ...patternCell },
                });
            }
        }
        mangledOnCellsEdited(editItemList);

        gridRef.current?.damage(
            editItemList.map(c => ({
                cell: c.location,
            }))
        );
    };

    const fillRight = () => {
        if (gridSelection.current === undefined || gridSelection.current.range.width <= 1) return;

        const firstColSelection = {
            ...gridSelection,
            current: {
                ...gridSelection.current,
                range: {
                    ...gridSelection.current.range,
                    width: 1,
                },
            },
        };

        void fillPattern(firstColSelection, gridSelection);
    };

    const fillDown = () => {
        if (gridSelection.current === undefined || gridSelection.current.range.height <= 1) return;

        const firstRowSelection = {
            ...gridSelection,
            current: {
                ...gridSelection.current,
                range: {
                    ...gridSelection.current.range,
                    height: 1,
                },
            },
        };

        void fillPattern(firstRowSelection, gridSelection);
    };

    const onMouseUp = (mouseArgs: GridMouseEventArgs, isOutside: boolean) => {
        const mouse = mouseState;
        setMouseState(undefined);
        setFillHighlightRegion(undefined);
        setScrollDir(undefined);
        isActivelyDraggingHeader.current = false;

        if (isOutside) return;

        if (
            mouse?.fillHandle === true &&
            gridSelection.current !== undefined &&
            mouse.previousSelection?.current !== undefined
        ) {
            if (fillHighlightRegion === undefined) return;
            const newRange = {
                ...gridSelection,
                current: {
                    ...gridSelection.current,
                    range: combineRects(mouse.previousSelection.current.range, fillHighlightRegion),
                },
            };
            void fillPattern(mouse.previousSelection, newRange);
            setGridSelection(newRange, true);
            return;
        }

        const [col, row] = mouseArgs.location;
        const [lastMouseDownCol, lastMouseDownRow] = lastMouseSelectLocation.current ?? [];

        // eslint-disable-next-line unicorn/consistent-function-scoping
        const preventDefault = () => {
            isPrevented.current = true;
        };

        const handleMaybeClick = (a: GridMouseCellEventArgs): boolean => {
            const isValidClick = a.isTouch || (lastMouseDownCol === col && lastMouseDownRow === row);
            if (isValidClick) {
                onCellClicked?.([col - rowMarkerOffset, row], {
                    ...a,
                    preventDefault,
                });
            }
            if (a.button === 1) return !isPrevented.current;
            if (!isPrevented.current) {
                const c = getMangledCellContent(mouseArgs.location);
                const r = getCellRenderer(c);
                if (r !== undefined && r.onClick !== undefined && isValidClick) {
                    const newVal = r.onClick({
                        ...a,
                        cell: c,
                        posX: a.localEventX,
                        posY: a.localEventY,
                        bounds: a.bounds,
                        theme: themeForCell(c, mouseArgs.location),
                        preventDefault,
                    });
                    if (newVal !== undefined && !isInnerOnlyCell(newVal) && isEditableGridCell(newVal)) {
                        mangledOnCellsEdited([{ location: a.location, value: newVal }]);
                        gridRef.current?.damage([
                            {
                                cell: a.location,
                            },
                        ]);
                    }
                }
                if (isPrevented.current || gridSelection.current === undefined) return false;

                let shouldActivate = false;
                switch (c.activationBehaviorOverride ?? cellActivationBehavior) {
                    case "double-click":
                    case "second-click": {
                        if (mouse?.previousSelection?.current?.cell === undefined) break;
                        const [selectedCol, selectedRow] = gridSelection.current.cell;
                        const [prevCol, prevRow] = mouse.previousSelection.current.cell;
                        const isClickOnSelected =
                            col === selectedCol && col === prevCol && row === selectedRow && row === prevRow;
                        shouldActivate =
                            isClickOnSelected &&
                            (a.isDoubleClick === true || cellActivationBehavior === "second-click");
                        break;
                    }
                    case "single-click": {
                        shouldActivate = true;
                        break;
                    }
                }
                if (shouldActivate) {
                    const act =
                        a.isDoubleClick === true
                            ? "double-click"
                            : (c.activationBehaviorOverride ?? cellActivationBehavior);
                    const activationEvent: CellActivatedEventArgs = {
                        inputType: "pointer",
                        pointerActivation: act,
                        pointerType: a.isTouch ? "touch" : "mouse",
                    };
                    onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
                    reselect(a.bounds, activationEvent);
                    return true;
                }
            }
            return false;
        };

        const clickLocation = mouseArgs.location[0] - rowMarkerOffset;
        if (mouseArgs.isTouch) {
            const vr = visibleRegionRef.current;
            const touchVr = touchDownArgs.current;
            if (vr.x !== touchVr.x || vr.y !== touchVr.y) {
                // we scrolled, abort
                return;
            }
            // take care of context menus first if long pressed item is already selected
            if (mouseArgs.isLongTouch === true) {
                if (mouseArgs.kind === "cell" && itemsAreEqual(gridSelection.current?.cell, mouseArgs.location)) {
                    onCellContextMenu?.([clickLocation, mouseArgs.location[1]], {
                        ...mouseArgs,
                        preventDefault,
                    });
                    return;
                } else if (mouseArgs.kind === "header" && gridSelection.columns.hasIndex(col)) {
                    onHeaderContextMenu?.(clickLocation, { ...mouseArgs, preventDefault });
                    return;
                } else if (mouseArgs.kind === groupHeaderKind) {
                    if (clickLocation < 0) {
                        return;
                    }

                    onGroupHeaderContextMenu?.(clickLocation, { ...mouseArgs, preventDefault });
                    return;
                }
            }
            if (mouseArgs.kind === "cell") {
                // click that cell
                if (!handleMaybeClick(mouseArgs)) {
                    handleSelect(mouseArgs);
                }
            } else if (mouseArgs.kind === groupHeaderKind) {
                onGroupHeaderClicked?.(clickLocation, { ...mouseArgs, preventDefault });
            } else {
                if (mouseArgs.kind === headerKind) {
                    onHeaderClicked?.(clickLocation, {
                        ...mouseArgs,
                        preventDefault,
                    });
                }
                handleSelect(mouseArgs);
            }
            return;
        }

        if (mouseArgs.kind === "header") {
            if (clickLocation < 0) {
                return;
            }

            if (mouseArgs.isEdge) {
                if (mouseArgs.isDoubleClick === true) {
                    void normalSizeColumn(col);
                }
            } else if (mouseArgs.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                onHeaderClicked?.(clickLocation, { ...mouseArgs, preventDefault });
            }
        }

        if (mouseArgs.kind === groupHeaderKind) {
            if (clickLocation < 0) {
                return;
            }

            if (mouseArgs.button === 0 && col === lastMouseDownCol && row === lastMouseDownRow) {
                onGroupHeaderClicked?.(clickLocation, { ...mouseArgs, preventDefault });
                if (!isPrevented.current) {
                    handleGroupHeaderSelection(mouseArgs);
                }
            }
        }

        if (mouseArgs.kind === "cell" && (mouseArgs.button === 0 || mouseArgs.button === 1)) {
            handleMaybeClick(mouseArgs);
        }

        lastMouseSelectLocation.current = undefined;
    };

    const onMouseMoveImpl = (mouseArgs: GridMouseEventArgs) => {
        const a: GridMouseEventArgs = {
            ...mouseArgs,
            location: [mouseArgs.location[0] - rowMarkerOffset, mouseArgs.location[1]] as any,
        };
        onMouseMove?.(a);

        if (mouseState !== undefined && mouseArgs.buttons === 0) {
            setMouseState(undefined);
            setFillHighlightRegion(undefined);
            setScrollDir(undefined);
            isActivelyDraggingHeader.current = false;
        }

        setScrollDir(cv => {
            if (isActivelyDraggingHeader.current) return [mouseArgs.scrollEdge[0], 0];
            if (mouseArgs.scrollEdge[0] === cv?.[0] && mouseArgs.scrollEdge[1] === cv[1]) return cv;
            return mouseState === undefined || (mouseDownData.current?.location[0] ?? 0) < rowMarkerOffset
                ? undefined
                : mouseArgs.scrollEdge;
        });
    };

    return {
        onMouseDown,
        onMouseUp,
        onMouseMoveImpl,
        handleGroupHeaderSelection,
        normalSizeColumn,
        fillDown,
        fillRight,
        mouseDownData,
        isActivelyDraggingHeader,
    };
}
