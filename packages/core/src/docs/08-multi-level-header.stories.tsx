import * as React from "react";

import { type GridCell, GridCellKind, type GridColumn, type Item } from "../internal/data-grid/data-grid-types.js";
import { DataEditorAll as DataEditor } from "../data-editor-all.js";
import { SimpleThemeWrapper } from "../stories/story-utils.js";
import { DocWrapper, Highlight, Marked, Wrapper } from "./doc-wrapper.js";

export default {
    title: "Glide-Data-Grid/Docs",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

interface SalesData {
    region: string;
    country: string;
    city: string;
    product: string;
    category: string;
    sales: number;
    quantity: number;
    profit: number;
}

const data: SalesData[] = [
    { region: "North America", country: "USA", city: "New York", product: "Laptop", category: "Electronics", sales: 1500, quantity: 10, profit: 300 },
    { region: "North America", country: "USA", city: "Los Angeles", product: "Phone", category: "Electronics", sales: 800, quantity: 20, profit: 160 },
    { region: "North America", country: "Canada", city: "Toronto", product: "Tablet", category: "Electronics", sales: 600, quantity: 15, profit: 90 },
    { region: "Europe", country: "UK", city: "London", product: "Laptop", category: "Electronics", sales: 1200, quantity: 8, profit: 240 },
    { region: "Europe", country: "Germany", city: "Berlin", product: "Phone", category: "Electronics", sales: 900, quantity: 18, profit: 180 },
    { region: "Europe", country: "France", city: "Paris", product: "Tablet", category: "Electronics", sales: 700, quantity: 12, profit: 105 },
    { region: "Asia", country: "Japan", city: "Tokyo", product: "Laptop", category: "Electronics", sales: 1800, quantity: 12, profit: 360 },
    { region: "Asia", country: "Korea", city: "Seoul", product: "Phone", category: "Electronics", sales: 1100, quantity: 25, profit: 220 },
    { region: "Asia", country: "China", city: "Shanghai", product: "Tablet", category: "Electronics", sales: 950, quantity: 30, profit: 142 },
    { region: "North America", country: "USA", city: "Chicago", product: "Monitor", category: "Electronics", sales: 450, quantity: 5, profit: 67 },
    { region: "Europe", country: "Spain", city: "Madrid", product: "Keyboard", category: "Accessories", sales: 150, quantity: 50, profit: 45 },
    { region: "Asia", country: "India", city: "Mumbai", product: "Mouse", category: "Accessories", sales: 80, quantity: 100, profit: 24 },
];

export const MultiLevelHeader: React.FC = () => {
    const getContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];
        const indexes: (keyof SalesData)[] = ["region", "country", "city", "product", "category", "sales", "profit", "quantity"];
        const d = dataRow[indexes[col]];
        const displayValue = typeof d === "number" ? d.toLocaleString() : d;
        return {
            kind: GridCellKind.Text,
            allowOverlay: true,
            displayData: String(displayValue),
            data: String(d),
        };
    }, []);

    // Multi-level group headers using array syntax
    // Level 0 (top): "Location" or "Product Info" or "Financial"
    // Level 1 (middle): "Geography", "Details", "Metrics"
    // Level 2 (bottom): specific group names
    const [columns1, setColumns11] = React.useState<GridColumn[]>([
        {
            title: "Region",
            id: "region",
            width: 120,
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "Country",
            id: "country",
            width: 100,
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "City",
            id: "city",
            width: 100,
            group: ["Location", "Geography", "Place"],
        },
        {
            title: "Product",
            id: "product",
            width: 100,
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Category",
            id: "category",
            width: 100,
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Sales",
            id: "sales",
            width: 100,
            group: ["Financial", "Metrics", "Revenue"],
        },
        {
            title: "Profit",
            id: "profit",
            width: 100,
            group: ["Financial", "Metrics", "Revenue"],
        },
        {
            title: "Quantity",
            id: "quantity",
            width: 80,
            group: ["Financial", "Metrics", "Volume"],
        },
    ]);

    const [columns, setColumns] = React.useState<GridColumn[]>([
        {
            title: "Region",
            id: "region",
            width: 120,
            group: ["Financial",  "Area"],
        },
        {
            title: "Country",
            id: "country",
            width: 100,
            group: ["Financial",  "Area"],
        },
        {
            title: "City",
            id: "city",
            width: 100,
            group: ["Financial",  "Place"],
        },
        {
            title: "Product",
            id: "product",
            width: 100,
            group: ["Financial",  "Item"],
        },
        {
            title: "Category",
            id: "category",
            width: 100,
            group: ["Financial",  "Item"],
        },
        {
            title: "Sales",
            id: "sales",
            width: 100,
            group: ["Financial",  "Revenue"],
        },
        {
            title: "Profit",
            id: "profit",
            width: 100,
            group: ["Financial",  "Revenue"],
        },
        {
            title: "Quantity",
            id: "quantity",
            width: 80,
            group: ["Financial",  "Volume"],
        },
    ]);

    // Column resize handler
    const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
        setColumns(prevCols => {
            const index = prevCols.findIndex(c => c.id === column.id);
            if (index === -1) return prevCols;
            const newCols = [...prevCols];
            newCols[index] = { ...newCols[index], width: newSize };
            return newCols;
        });
    }, []);

    return (
        <DocWrapper>
            <Marked>
                {`
# Multi-Level Column Grouping

Columns can now have multiple levels of grouping by using an array of strings for the \`group\` property.
This creates a hierarchical header structure with multiple rows of group headers.

## Usage

Instead of a single string, provide an array of group names from top level to bottom level:

\`\`\`typescript
group: ["Top Level", "Middle Level", "Bottom Level"]
\`\`\`

The array index corresponds to the header level:
- Index 0 = Topmost group header row
- Index 1 = Second group header row
- Index n = nth group header row

Columns with the same group values at each level will be visually grouped together.

**Note:** You can resize columns by dragging the column header borders.
`}
            </Marked>
            <Highlight>
                {`
const columns = React.useMemo<GridColumn[]>(() => {
    return [
        {
            title: "Region",
            id: "region",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "Country",
            id: "country",
            group: ["Location", "Geography", "Area"],
        },
        {
            title: "City",
            id: "city",
            group: ["Location", "Geography", "Place"],
        },
        {
            title: "Product",
            id: "product",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Category",
            id: "category",
            group: ["Product Info", "Details", "Item"],
        },
        {
            title: "Sales",
            id: "sales",
            group: ["Financial", "Metrics", "Revenue"],
        },
        {
            title: "Quantity",
            id: "quantity",
            group: ["Financial", "Metrics", "Volume"],
        },
        {
            title: "Profit",
            id: "profit",
            group: ["Financial", "Metrics", "Revenue"],
        },
    ];
}, []);
`}
            </Highlight>
            <Marked>
                {`
## Expected Header Structure

\`\`\`
┌────────────────────────────────┬────────────────────────┬──────────────────────────────┐
│          Location              │     Product Info       │          Financial           │  ← Level 0
├────────────────────────────────┼────────────────────────┼──────────────────────────────┤
│          Geography             │        Details         │           Metrics            │  ← Level 1
├───────────────────────┬────────┼────────────────────────┼─────────────────┬────────────┤
│          Area         │ Place  │          Item          │     Revenue     │   Volume   │  ← Level 2
├─────────┬─────────────┼────────┼───────────┬────────────┼────────┬────────┼────────────┤
│ Region  │   Country   │  City  │  Product  │  Category  │ Sales  │ Profit │  Quantity  │  ← Column Headers
└─────────┴─────────────┴────────┴───────────┴────────────┴────────┴────────┴────────────┘
\`\`\`

## Backward Compatibility

The existing single-string \`group\` property still works:

\`\`\`typescript
{ title: "Name", group: "Personal" }  // Still works!
\`\`\`
`}
            </Marked>
            <Wrapper height={300}>
                <DataEditor
                    getCellContent={getContent}
                    columns={columns}
                    rows={data.length}
                    onColumnResize={onColumnResize}
                />
            </Wrapper>
        </DocWrapper>
    );
};
(MultiLevelHeader as any).storyName = "08. Multi-Level Header";
