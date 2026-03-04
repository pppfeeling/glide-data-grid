import * as React from "react";
import { type GridSelection, CompactSelection } from "../internal/data-grid/data-grid-types.js";
import { expandSelection, shiftSelection } from "./data-editor-fns.js";
import { useSelectionBehavior, type SelectionBlending } from "../internal/data-grid/use-selection-behavior.js";
import type { DataGridSearchProps } from "../internal/data-grid-search/data-grid-search.js";

export const emptyGridSelection: GridSelection = {
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
    current: undefined,
};

interface UseSelectionProps {
    gridSelectionOuter: GridSelection | undefined;
    onGridSelectionChange: ((newVal: GridSelection) => void) | undefined;
    rowMarkerOffset: number;
    getCellsForSelection: DataGridSearchProps["getCellsForSelection"] | undefined;
    spanRangeBehavior: "allowPartial" | "default";
    abortControllerRef: React.MutableRefObject<AbortController>;
    rangeSelectionBlending: SelectionBlending;
    columnSelectionBlending: SelectionBlending;
    rowSelectionBlending: SelectionBlending;
    rangeSelect: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    rangeSelectionColumnSpanning: boolean;
}

export function useSelection(props: UseSelectionProps) {
    const {
        gridSelectionOuter,
        onGridSelectionChange,
        rowMarkerOffset,
        getCellsForSelection,
        spanRangeBehavior,
        abortControllerRef,
        rangeSelectionBlending,
        columnSelectionBlending,
        rowSelectionBlending,
        rangeSelect,
        rangeSelectionColumnSpanning,
    } = props;

    const [gridSelectionInner, setGridSelectionInner] = React.useState<GridSelection>(emptyGridSelection);

    const gridSelectionOuterMangled: GridSelection | undefined = React.useMemo((): GridSelection | undefined => {
        return gridSelectionOuter === undefined ? undefined : shiftSelection(gridSelectionOuter, rowMarkerOffset);
    }, [gridSelectionOuter, rowMarkerOffset]);

    const gridSelection = gridSelectionOuterMangled ?? gridSelectionInner;

    const expectedExternalGridSelection = React.useRef<GridSelection | undefined>(gridSelectionOuter);

    const setGridSelection = React.useCallback(
        (newVal: GridSelection, expand: boolean): void => {
            if (expand && getCellsForSelection !== undefined) {
                newVal = expandSelection(
                    newVal,
                    getCellsForSelection,
                    rowMarkerOffset,
                    spanRangeBehavior,
                    abortControllerRef.current
                );
            }
            if (onGridSelectionChange !== undefined) {
                expectedExternalGridSelection.current = shiftSelection(newVal, -rowMarkerOffset);
                onGridSelectionChange(expectedExternalGridSelection.current);
            } else {
                setGridSelectionInner(newVal);
            }
        },
        [getCellsForSelection, onGridSelectionChange, rowMarkerOffset, spanRangeBehavior, abortControllerRef]
    );

    const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(
        gridSelection,
        setGridSelection,
        rangeSelectionBlending,
        columnSelectionBlending,
        rowSelectionBlending,
        rangeSelect,
        rangeSelectionColumnSpanning
    );

    return {
        gridSelection,
        setGridSelection,
        setCurrent,
        setSelectedRows,
        setSelectedColumns,
        expectedExternalGridSelection,
    };
}
