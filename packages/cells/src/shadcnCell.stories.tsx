import React from "react";
import { DataEditorAll as DataEditor } from "@glideapps/glide-data-grid";
import {
    BeautifulWrapper,
    Description,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "@glideapps/glide-data-grid/dist/js/data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "@glideapps/glide-data-grid/dist/js/stories/story-utils.js";

// Import shadcn/ui cell renderers as they are created
// import { ShadcnButtonCell } from "./shadcnCell/shadcn-button-cell.js";
// import { ShadcnDropdownCell } from "./shadcnCell/shadcn-dropdown-cell.js";
// import { ShadcnDatePickerCell } from "./shadcnCell/shadcn-date-picker-cell.js";

export default {
    title: "Glide-Data-Grid/shadcn/ui Cells",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="shadcn/ui Cell Renderers"
                    description={
                        <Description>
                            Custom cell renderers built with {" "}
                            <PropName>shadcn/ui</PropName> components for modern UI consistency.
                            These cells demonstrate the migration from Linaria CSS-in-JS to Tailwind CSS
                            while maintaining Canvas rendering performance.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

// Temporary mock data generator for testing
const useShadcnMockData = (numCols: number = 6, numRows: number = 20) => {
    const cols = React.useMemo(() => [
        {
            title: "shadcn Button",
            id: "shadcn-button",
            width: 120,
        },
        {
            title: "shadcn Dropdown",
            id: "shadcn-dropdown",
            width: 150,
        },
        {
            title: "shadcn DatePicker",
            id: "shadcn-datepicker",
            width: 160,
        },
        {
            title: "shadcn Tags",
            id: "shadcn-tags",
            width: 200,
        },
        {
            title: "shadcn MultiSelect",
            id: "shadcn-multiselect",
            width: 200,
        },
        {
            title: "Text Column",
            id: "text",
            width: 120,
        },
    ].slice(0, numCols), [numCols]);

    const getCellContent = React.useCallback((cell: [number, number]) => {
        const [col, row] = cell;
        const columnId = cols[col]?.id;

        switch (columnId) {
            case "shadcn-button":
                return {
                    kind: "custom" as const,
                    allowOverlay: true,
                    copyData: `Button ${row}`,
                    data: {
                        kind: "shadcn-button-cell",
                        title: `Action ${row}`,
                        variant: row % 3 === 0 ? "default" : row % 3 === 1 ? "outline" : "secondary",
                        onClick: () => alert(`Button ${row} clicked!`),
                    },
                };

            case "shadcn-dropdown":
                const options = ["Option A", "Option B", "Option C", "Option D"];
                return {
                    kind: "custom" as const,
                    allowOverlay: true,
                    copyData: options[row % options.length],
                    data: {
                        kind: "shadcn-dropdown-cell",
                        value: options[row % options.length],
                        options: options,
                    },
                };

            case "shadcn-datepicker":
                const date = new Date(2025, 0, 1 + (row % 30));
                return {
                    kind: "custom" as const,
                    allowOverlay: true,
                    copyData: date.toLocaleDateString(),
                    data: {
                        kind: "shadcn-datepicker-cell",
                        date: date,
                        format: "date" as const,
                    },
                };

            case "shadcn-tags":
                const allTags = ["React", "TypeScript", "shadcn/ui", "Tailwind", "Vite"];
                const selectedTags = allTags.slice(0, (row % 3) + 1);
                return {
                    kind: "custom" as const,
                    allowOverlay: true,
                    copyData: selectedTags.join(", "),
                    data: {
                        kind: "shadcn-tags-cell",
                        tags: selectedTags,
                        availableTags: allTags,
                    },
                };

            case "shadcn-multiselect":
                const values = ["Value 1", "Value 2", "Value 3", "Value 4"];
                const selected = values.slice(0, (row % 2) + 1);
                return {
                    kind: "custom" as const,
                    allowOverlay: true,
                    copyData: selected.join(", "),
                    data: {
                        kind: "shadcn-multiselect-cell",
                        values: selected,
                        options: values,
                        allowCreation: true,
                    },
                };

            default:
                return {
                    kind: "text" as const,
                    data: `Cell ${col}, ${row}`,
                    displayData: `Cell ${col}, ${row}`,
                    allowOverlay: true,
                };
        }
    }, [cols]);

    return { cols, getCellContent };
};

// Story for showing all shadcn/ui cells together
export const AllShadcnCells: React.VFC = () => {
    const { cols, getCellContent } = useShadcnMockData();

    // Custom renderers array - will be populated as components are created
    const customRenderers = React.useMemo(() => [
        // ShadcnButtonCell,
        // ShadcnDropdownCell,
        // ShadcnDatePickerCell,
        // Add other renderers as they are implemented
    ], []);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            columns={cols}
            rows={100}
            customRenderers={customRenderers}
            smoothScrollX={true}
            smoothScrollY={true}
            width={800}
            height={400}
        />
    );
};

// Individual component stories (will be uncommented as components are created)

// export const ShadcnButtonCellStory: React.VFC = () => {
//     const cols = [{ title: "shadcn Button", id: "button", width: 150 }];
//
//     const getCellContent = React.useCallback((cell: [number, number]) => {
//         const [, row] = cell;
//         return {
//             kind: "custom" as const,
//             allowOverlay: true,
//             copyData: `Button ${row}`,
//             data: {
//                 kind: "shadcn-button-cell",
//                 title: `Action ${row}`,
//                 variant: row % 2 === 0 ? "default" : "outline",
//                 onClick: () => alert(`Button ${row} clicked!`),
//             },
//         };
//     }, []);

//     return (
//         <DataEditor
//             {...defaultProps}
//             getCellContent={getCellContent}
//             columns={cols}
//             rows={50}
//             customRenderers={[ShadcnButtonCell]}
//             width={400}
//             height={300}
//         />
//     );
// };

// export const ShadcnDropdownCellStory: React.VFC = () => {
//     const cols = [{ title: "shadcn Dropdown", id: "dropdown", width: 200 }];
//
//     const getCellContent = React.useCallback((cell: [number, number]) => {
//         const [, row] = cell;
//         const options = ["First Option", "Second Option", "Third Option", "Fourth Option"];
//         return {
//             kind: "custom" as const,
//             allowOverlay: true,
//             copyData: options[row % options.length],
//             data: {
//                 kind: "shadcn-dropdown-cell",
//                 value: options[row % options.length],
//                 options: options,
//             },
//         };
//     }, []);

//     return (
//         <DataEditor
//             {...defaultProps}
//             getCellContent={getCellContent}
//             columns={cols}
//             rows={50}
//             customRenderers={[ShadcnDropdownCell]}
//             width={400}
//             height={300}
//         />
//     );
// };

// export const ShadcnDatePickerCellStory: React.VFC = () => {
//     const cols = [{ title: "shadcn DatePicker", id: "datepicker", width: 180 }];
//
//     const getCellContent = React.useCallback((cell: [number, number]) => {
//         const [, row] = cell;
//         const date = new Date(2025, (row % 12), (row % 28) + 1);
//         return {
//             kind: "custom" as const,
//             allowOverlay: true,
//             copyData: date.toLocaleDateString(),
//             data: {
//                 kind: "shadcn-datepicker-cell",
//                 date: date,
//                 format: "date" as const,
//             },
//         };
//     }, []);

//     return (
//         <DataEditor
//             {...defaultProps}
//             getCellContent={getCellContent}
//             columns={cols}
//             rows={50}
//             customRenderers={[ShadcnDatePickerCell]}
//             width={400}
//             height={300}
//         />
//     );
// };

// Placeholder story to show migration progress
export const MigrationProgress: React.VFC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">shadcn/ui Migration Progress</h2>

            <div className="space-y-4">
                <div className="bg-card rounded-lg p-4 border">
                    <h3 className="text-lg font-semibold mb-2">Phase 1: Environment Setup</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span>shadcnCell directory created</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-500"></div>
                            <span>Storybook testing framework setup</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                            <span>shadcn/ui components installation (pending)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-lg p-4 border">
                    <h3 className="text-lg font-semibold mb-2">Phase 2: Simple Components</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Button Cell (Priority 1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Date Picker Cell (Priority 2)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Dropdown Cell (Priority 3)</span>
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-lg p-4 border">
                    <h3 className="text-lg font-semibold mb-2">Phase 3: Complex Components</h3>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Tags Cell (Priority 4)</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                            <span>Multi-Select Cell (Priority 5)</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
                <ol className="list-decimal list-inside space-y-1 text-blue-800">
                    <li>Install shadcn/ui CLI and required components</li>
                    <li>Create shadcn-button-cell.tsx (simplest component)</li>
                    <li>Test Canvas rendering + shadcn/ui editor integration</li>
                    <li>Establish theme mapping utilities</li>
                    <li>Proceed with remaining components in priority order</li>
                </ol>
            </div>
        </div>
    );
};

// Set default export for easy testing
AllShadcnCells.displayName = "AllShadcnCells";
// ShadcnButtonCellStory.displayName = "ShadcnButtonCell";
// ShadcnDropdownCellStory.displayName = "ShadcnDropdownCell";
// ShadcnDatePickerCellStory.displayName = "ShadcnDatePickerCell";
MigrationProgress.displayName = "MigrationProgress";