import * as React from "react";
import type { DataEditorProps } from "./data-editor-types.js";
import type { GridColumn } from "../internal/data-grid/data-grid-types.js";
import { whenDefined } from "../common/utils.js";
import type { DataGridProps } from "../internal/data-grid/data-grid.js";

interface MangledPropsArgs {
    readonly onColumnResize: DataEditorProps["onColumnResize"];
    readonly onColumnResizeEnd: DataEditorProps["onColumnResizeEnd"];
    readonly onColumnResizeStart: DataEditorProps["onColumnResizeStart"];
    readonly drawHeader: DataEditorProps["drawHeader"];
    readonly drawCell: DataEditorProps["drawCell"];
    readonly rowMarkerOffset: number;
    readonly columnsIn: readonly GridColumn[];
}

export function useMangledProps(args: MangledPropsArgs) {
    const {
        onColumnResize: onColumnResizeIn,
        onColumnResizeEnd: onColumnResizeEndIn,
        onColumnResizeStart: onColumnResizeStartIn,
        drawHeader: drawHeaderIn,
        drawCell: drawCellIn,
        rowMarkerOffset,
        columnsIn,
    } = args;

    const onColumnResize = whenDefined(
        onColumnResizeIn,
        React.useCallback<NonNullable<typeof onColumnResizeIn>>(
            (_, w, ind, wg) => {
                onColumnResizeIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeIn, rowMarkerOffset, columnsIn]
        )
    );

    const onColumnResizeEnd = whenDefined(
        onColumnResizeEndIn,
        React.useCallback<NonNullable<typeof onColumnResizeEndIn>>(
            (_, w, ind, wg) => {
                onColumnResizeEndIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeEndIn, rowMarkerOffset, columnsIn]
        )
    );

    const onColumnResizeStart = whenDefined(
        onColumnResizeStartIn,
        React.useCallback<NonNullable<typeof onColumnResizeStartIn>>(
            (_, w, ind, wg) => {
                onColumnResizeStartIn?.(columnsIn[ind - rowMarkerOffset], w, ind - rowMarkerOffset, wg);
            },
            [onColumnResizeStartIn, rowMarkerOffset, columnsIn]
        )
    );

    const drawHeader = whenDefined(
        drawHeaderIn,
        React.useCallback<NonNullable<DataGridProps["drawHeader"]>>(
            (drawArgs, draw) => {
                return drawHeaderIn?.({ ...drawArgs, columnIndex: drawArgs.columnIndex - rowMarkerOffset }, draw) ?? false;
            },
            [drawHeaderIn, rowMarkerOffset]
        )
    );

    const drawCell = whenDefined(
        drawCellIn,
        React.useCallback<NonNullable<DataGridProps["drawCell"]>>(
            (drawArgs, draw) => {
                return drawCellIn?.({ ...drawArgs, col: drawArgs.col - rowMarkerOffset }, draw) ?? false;
            },
            [drawCellIn, rowMarkerOffset]
        )
    );

    return {
        onColumnResize,
        onColumnResizeEnd,
        onColumnResizeStart,
        drawHeader,
        drawCell,
    };
}
