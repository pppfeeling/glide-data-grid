import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { BeautifulWrapper, Description, PropName, defaultProps } from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { GridCellKind, type GridColumn, type Item, type EditableGridCell } from "../../index.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Cell Borders Control"
                    description={
                        <Description>
                            Demonstrates selective cell border control. Compare the{" "}
                            <PropName>"Department (Original)"</PropName> column with the{" "}
                            <PropName>"Department (Merged)"</PropName> column. The merged column uses{" "}
                            <PropName>borderBottom: false</PropName>
                            to hide borders between cells of the same department, and <PropName>
                                displayData
                            </PropName>{" "}
                            is set to empty string for duplicate entries to create a grouped appearance. This shows how
                            individual cells can control their
                            <PropName>borderTop</PropName>, <PropName>borderLeft</PropName>,{" "}
                            <PropName>borderRight</PropName>, and <PropName>borderBottom</PropName> properties.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
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
                    return rowData.department; // Merged department (with grouping effects)
                case 4:
                    return rowData.salary.toString();
                default:
                    return "";
            }
        })();

        // Group rows by department and show merged appearance
        let borderBottom = true;
        let displayData = cellData;

        // For department columns (both original and merged), control borders
        if (col === 3) {
            // Check if this is the first row of a department group
            const prevDept = row > 0 ? data[row - 1]?.department : undefined;
            const nextDept = row < data.length - 1 ? data[row + 1]?.department : undefined;
            const currentDept = rowData.department;

            const isFirstInGroup = row === 0 || prevDept !== currentDept;
            const isLastInGroup = row === data.length - 1 || nextDept !== currentDept;

            // For merged department column (col 3), hide text except first in group
            if (col === 3 && !isFirstInGroup) {
                displayData = "";
            }

            // Only show bottom border for the last row of each group (both columns)
            borderBottom = isLastInGroup;
        }

        return {
            kind: GridCellKind.Text,
            data: cellData,
            displayData: displayData,
            allowOverlay: true,
            borderBottom: borderBottom,
        };
    };

    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rows={data.length} />;
};
