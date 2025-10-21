import * as React from "react";
import { DataEditor, GridCellKind, CompactSelection } from "@glideapps/glide-data-grid";
import type { GridCell, GridColumn, GridSelection, Item } from "@glideapps/glide-data-grid";
import { DocWrapper } from "../doc-wrapper";
// Removed Storybook imports: import { ComponentStoryObj, ComponentMeta } from "@storybook/react";

interface RowData {
    [key: string]: string;
}

const initialData: RowData[] = [
    { col1: "Row 0, Col 1", col2: "Row 0, Col 2" },
    { col1: "Row 1, Col 1", col2: "Row 1, Col 2" },
    { col1: "Row 2, Col 1", col2: "Row 2, Col 2" },
];

const columns: GridColumn[] = [
    { id: "col1", title: "Column 1", width: 150 },
    { id: "col2", title: "Column 2", width: 150 },
];

const AddRowBelowSelectionComponent: React.VFC = () => { // Renamed for clarity in Storybook
    const [gridData, setGridData] = React.useState<RowData[]>(initialData);
    const [selection, setSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const getCellContent = React.useCallback(([col, row]: Item): GridCell => {
        const dataRow = gridData[row];
        const columnKey = columns[col].id;
        const value = dataRow ? dataRow[columnKey] : "";

        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: value,
            data: value,
        };
    }, [gridData]);

    const handleAddRowBelowSelection = React.useCallback(() => {
        
        let insertIndex = gridData.length; // Default to append at the end

        if (selection.current) {
          insertIndex = selection.current.cell[1] + 1;
          const newRow: RowData = { col1: "New Row", col2: "New Data" + insertIndex };

            setGridData(prevData => {
              const newData = [...prevData];
              newData.splice(insertIndex, 0, newRow);
              return newData;
            });
        } 
    }, [gridData, selection]);

    return (
        <DocWrapper>
            <button onClick={handleAddRowBelowSelection} style={{ marginBottom: 10, padding: "8px 16px" }}>
                Add Row Below Selection
            </button>
            <DataEditor
                getCellContent={getCellContent}
                columns={columns}
                rows={gridData.length}
                onGridSelectionChange={setSelection}
                gridSelection={selection}
                rowMarkers="both"
            />
        </DocWrapper>
    );
};

export default {
    title: "Glide-Data-Grid/DataEditor-Demos/Add Row Below Selection",
};

export const AddRowBelowSelection = AddRowBelowSelectionComponent;