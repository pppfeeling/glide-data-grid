import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, PropName, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { GridCellKind, type GridColumn, type Item, type EditableGridCell } from "../../index.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",
};

interface BorderDemoRow {
    name: string;
    email: string;
    department: string;
    salary: number;
}

const data: BorderDemoRow[] = [
    { name: "1. Alice Johnson", email: "alice@company.com", department: "Engineering", salary: 95000 },
    { name: "2. Bob Smith", email: "bob@company.com", department: "Engineering", salary: 87000 },
    { name: "3. Carol Davis", email: "carol@company.com", department: "Engineering", salary: 92000 },
    { name: "4. David Wilson", email: "david@company.com", department: "Marketing", salary: 75000 },
    { name: "5. Eve Brown", email: "eve@company.com", department: "Marketing", salary: 78000 },
    { name: "6. Frank Miller", email: "frank@company.com", department: "Sales", salary: 82000 },
    { name: "7. Grace Lee", email: "grace@company.com", department: "Sales", salary: 85000 },
    { name: "8. Henry Taylor", email: "henry@company.com", department: "Sales", salary: 89000 },
];

const columns: GridColumn[] = [
    { title: "Name", width: 150, icon: "headerString" },
    { title: "Email", width: 200, icon: "headerString" },
    { title: "Department (Original)", width: 140, icon: "headerString" },
    { title: "Department (Merged)", width: 140, icon: "headerString" },
    { title: "Salary", width: 100, icon: "headerNumber" },
    { title: "Department (rowGroupBorder)", width: 180, icon: "headerString", rowGroupBorder: true },
];

export const CellBorders: React.VFC = () => {
    const getCellContent = (cell: Item): EditableGridCell => {
        const [col, row] = cell;
        const rowData = data[row];

        if (!rowData) {
            return {
                kind: GridCellKind.Text,
                data: "",
                displayData: "",
                allowOverlay: false,
            };
        }

        const cellData = (() => {
            switch (col) {
                case 0:
                    return rowData.name;
                case 1:
                    return rowData.email;
                case 2:
                    return rowData.department; // Original department (always visible)
                case 3:
                case 5:
                    return rowData.department; // Merged department columns
                case 4:
                    return rowData.salary.toString();
                default:
                    return "";
            }
        })();

        const prevDept = row > 0 ? data[row - 1]?.department : undefined;
        const currentDept = rowData.department;
        const isFirstInGroup = row === 0 || prevDept !== currentDept;

        if (col === 3) {
            const nextDept = row < data.length - 1 ? data[row + 1]?.department : undefined;
            const isLastInGroup = row === data.length - 1 || nextDept !== currentDept;

            return {
                kind: GridCellKind.Text,
                data: cellData,
                displayData: isFirstInGroup ? cellData : "",
                allowOverlay: true,
                borderBottom: isLastInGroup,
            };
        } else if (col === 5 || col === 2) { // Apply merging logic to col 2 as well
            // For the rowGroupBorder column, we let the grid handle the border.
            return {
                kind: GridCellKind.Text,
                data: cellData,
                displayData: isFirstInGroup ? cellData : "",
                allowOverlay: true,
            };
        }

        return {
            kind: GridCellKind.Text,
            data: cellData,
            displayData: cellData,
            allowOverlay: true,
        };
    };

    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rows={data.length} />;
};
(CellBorders as any).decorators = [
    (Story: React.ComponentType) => (
        <SimpleThemeWrapper>
            <BeautifulWrapper
                title="Cell Borders Control"
                description={
                    <Description>
                        Demonstrates selective cell border control. Compare the{" "}
                        <PropName>"Department (Original)"</PropName> column with the other department columns. The{" "}
                        <PropName>"Department (Merged)"</PropName> column uses{" "}
                        <PropName>borderBottom: false</PropName> to manually hide borders. The{" "}
                        <PropName>"Department (rowGroupBorder)"</PropName> column uses the{" "}
                        <PropName>rowGroupBorder: true</PropName> prop on the column definition to automatically
                        achieve the same effect.
                    </Description>
                }>
                <Story />
            </BeautifulWrapper>
        </SimpleThemeWrapper>
    ),
];

export const RowGroupBorder: React.VFC = () => {
    const rowGroupBorderColumns: GridColumn[] = [
        { title: "Name", width: 150, icon: "headerString" },
        { title: "Email", width: 200, icon: "headerString" },
        { title: "Department", width: 180, icon: "headerString", rowGroupBorder: true },
        { title: "Salary", width: 100, icon: "headerNumber" },
    ];

    const getCellContent = (cell: Item): EditableGridCell => {
        const [col, row] = cell;
        const rowData = data[row];

        if (!rowData) {
            return {
                kind: GridCellKind.Text,
                data: "",
                displayData: "",
                allowOverlay: false,
            };
        }

        const cellData = (() => {
            switch (col) {
                case 0:
                    return rowData.name;
                case 1:
                    return rowData.email;
                case 2:
                    return rowData.department;
                case 3:
                    return rowData.salary.toString();
                default:
                    return "";
            }
        })();

        if (col === 2) {
            const prevDept = row > 0 ? data[row - 1]?.department : undefined;
            const currentDept = rowData.department;
            const isFirstInGroup = row === 0 || prevDept !== currentDept;

            // For the rowGroupBorder column, we let the grid handle the border.
            return {
                kind: GridCellKind.Text,
                data: cellData,
                displayData: isFirstInGroup ? cellData : "",
                allowOverlay: true,
            };
        }

        return {
            kind: GridCellKind.Text,
            data: cellData,
            displayData: cellData,
            allowOverlay: true,
        };
    };

    return (
        <DataEditor {...defaultProps} getCellContent={getCellContent} columns={rowGroupBorderColumns} rows={data.length} />
    );
};
(RowGroupBorder as any).decorators = [
    (Story: React.ComponentType) => (
        <SimpleThemeWrapper>
            <BeautifulWrapper
                title="Row Group Border"
                description={
                    <Description>
                        The <PropName>rowGroupBorder</PropName> prop on a column will automatically draw a bottom
                        border on the last row of a group. This is useful for visually grouping rows based on the
                        content of a column.
                    </Description>
                }>
                <Story />
            </BeautifulWrapper>
        </SimpleThemeWrapper>
    ),
];