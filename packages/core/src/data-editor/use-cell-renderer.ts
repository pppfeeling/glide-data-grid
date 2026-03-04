import * as React from "react";
import {
    GridCellKind,
    type InnerGridCellKind,
    type InnerGridCell,
} from "../internal/data-grid/data-grid-types.js";
import type { CellRenderer, InternalCellRenderer, CustomRenderer } from "../cells/cell-types.js";

interface UseCellRendererArgs {
    readonly renderers: readonly InternalCellRenderer<InnerGridCell>[] | undefined;
    readonly additionalRenderers: readonly CustomRenderer<any>[] | undefined;
}

export function useCellRenderer(args: UseCellRendererArgs) {
    const { renderers, additionalRenderers } = args;

    const rendererMap = React.useMemo(() => {
        if (renderers === undefined) return {};
        const result: Partial<Record<InnerGridCellKind | GridCellKind, InternalCellRenderer<InnerGridCell>>> = {};
        for (const r of renderers) {
            result[r.kind] = r;
        }
        return result;
    }, [renderers]);

    const getCellRendererInternal: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined = React.useCallback(
        <T extends InnerGridCell>(cell: T) => {
            if (cell.kind !== GridCellKind.Custom) {
                return rendererMap[cell.kind] as unknown as CellRenderer<T>;
            }
            return additionalRenderers?.find(x => x.isMatch(cell)) as CellRenderer<T>;
        },
        [additionalRenderers, rendererMap]
    );

    return {
        rendererMap,
        getCellRenderer: getCellRendererInternal,
    };
}
