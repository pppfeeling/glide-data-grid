import * as React from "react";
import type { GridCell, Rectangle, Item, InnerGridColumn } from "../internal/data-grid/data-grid-types.js";
import type { FullTheme } from "../common/styles.js";
import type { CellActivatedEventArgs } from "../internal/data-grid/event-args.js";
import { mergeAndRealizeTheme } from "../common/styles.js";
import type { DataGridProps } from "../internal/data-grid/data-grid.js";
import type { GroupDetailsCallback } from "../internal/data-grid/render/data-grid-render.cells.js";

interface OverlayState {
    target: Rectangle;
    content: GridCell;
    theme: FullTheme;
    initialValue: string | undefined;
    cell: Item;
    highlight: boolean;
    forceEditMode: boolean;
    activation: CellActivatedEventArgs;
}

export function useOverlayEditor(
    mangledCols: readonly InnerGridColumn[],
    mangledGetGroupDetails: GroupDetailsCallback,
    getRowThemeOverride: DataGridProps["getRowThemeOverride"],
    mergedTheme: FullTheme
) {
    const [overlay, setOverlay] = React.useState<OverlayState>();

    const setOverlaySimple = React.useCallback(
        (val: Omit<OverlayState, "theme">) => {
            const [col, row] = val.cell;
            const column = mangledCols[col];
            const groupTheme =
                column?.group !== undefined ? mangledGetGroupDetails(column.group as string)?.overrideTheme : undefined;
            const colTheme = column?.themeOverride;
            const rowTheme = getRowThemeOverride?.(row);

            setOverlay({
                ...val,
                theme: mergeAndRealizeTheme(mergedTheme, groupTheme, colTheme, rowTheme, val.content.themeOverride),
            });
        },
        [getRowThemeOverride, mangledCols, mangledGetGroupDetails, mergedTheme]
    );

    return {
        overlay,
        setOverlay,
        setOverlaySimple,
    };
}
