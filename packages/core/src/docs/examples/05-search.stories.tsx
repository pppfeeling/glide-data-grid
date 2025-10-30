import React from "react";
import type { Theme } from "../../common/styles.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapperHeight,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useStaticMockData,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GridCell, GridColumn, Item } from "../../internal/data-grid/data-grid-types.js";
import { type SortConfig, multiColumnSort } from "../../data/sort.js";
import {
    type FilterConfig,
    type FilterOption,
    type FilterOperator,
    type FilterCondition,
    multiColumnFilter,
} from "../../data/filter.js";
import { groupData, type GroupSummaryRow } from "../../data/grouping.js";
import {useGridDataProcessing,  type ProcessingOptions } from "../../data/useGridDataProcessing.ts";
import type { RowGroupingOptions } from "../../data-editor/row-grouping.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};



interface ColumnInput {
    filterCondition: FilterCondition;
    filterOperator: FilterOperator;
    filterValue: any;
    groupingLabel: string;
    groupingFunction: string;
}

export const SearchDataEditor: React.VFC = () => {
    const { cols, getCellContent, rows } = useStaticMockData();
    const initialData = React.useMemo(
        () => {
            const data: any[] = [];
            for (let i = 0; i < rows; i++) {
                const row: any = { originalIndex: i };
                for (let j = 0; j < cols.length; j++) {
                    const colKey = cols[j].id ?? cols[j].title;
                    row[colKey] = getCellContent([j, i]).data;
                }
                data.push(row);
            }
            return data;
        },
        [cols, getCellContent, rows]
    );

    const [columnInputs, setColumnInputs] = React.useState<Map<string, Partial<ColumnInput>>>(() => new Map());
    const [sortState, setSortState] = React.useState<{ key: string; order: "asc" | "desc" }[]>([]);
    const [groupingState, setGroupingState] = React.useState<string[]>([]);

    const handleColumnInputChange = (columnTitle: string, field: keyof ColumnInput, value: any) => {
        setColumnInputs(prev => {
            const newInputs = new Map(prev);
            const current = newInputs.get(columnTitle) || {};
            newInputs.set(columnTitle, { ...current, [field]: value });
            return newInputs;
        });
    };

    const { filterConfig, groupingFunctions, groupingLabels } = React.useMemo(() => {
        const filterOptions: FilterOption<any>[] = [];
        const groupingLabels = new Map<string, string>();
        const groupingFunctions = new Map<string, string>();

        columnInputs.forEach((input, key) => {
            if (input.filterValue) {
                filterOptions.push({
                    key: key,
                    operator: input.filterOperator ?? "Contain",
                    value: input.filterValue,
                    condition: input.filterCondition ?? "AND",
                });
            }
            if (input.groupingLabel) {
                groupingLabels.set(key, input.groupingLabel);
            }
            if (input.groupingFunction) {
                groupingFunctions.set(key, input.groupingFunction);
            }
        });

        const derivedConfigs = { filterConfig: { filterOptions }, groupingFunctions, groupingLabels };
        console.log("[SearchDataEditor] Derived Configs:", derivedConfigs);
        return derivedConfigs;
    }, [columnInputs]);

    const { processedData } = useGridDataProcessing(initialData, {
        filterConfig,
        sortState,
        groupingState,
        groupingFunctions,
        groupingLabels,
        cols,
    });
   

    const handleSort = (columnTitle: string) => {
        setSortState(currentSortState => {
            const existingSortIndex = currentSortState.findIndex(s => s.key === columnTitle);
            const newSortState = [...currentSortState];

            if (existingSortIndex !== -1) {
                const existingSort = newSortState[existingSortIndex];
                if (existingSort.order === "asc") {
                    existingSort.order = "desc";
                } else {
                    newSortState.splice(existingSortIndex, 1);
                }
            } else {
                newSortState.push({ key: columnTitle, order: "asc" });
            }
            return newSortState;
        });
    };

    const handleGroupingClick = (columnTitle: string) => {
        setGroupingState(currentGroupingState => {
            const newGroupingState = [...currentGroupingState];
            const existingIndex = newGroupingState.indexOf(columnTitle);

            if (existingIndex !== -1) {
                newGroupingState.splice(existingIndex, 1);
            }
            else {
                newGroupingState.push(columnTitle);
            }
            return newGroupingState;
        });
    };

    const getGroupingButtonLabel = (columnTitle: string): string => {
        const groupIndex = groupingState.indexOf(columnTitle);
        if (groupIndex === -1) {
            return "그룹핑";
        }
        const priority = groupIndex + 1;
        return `그룹핑 (${priority})`;
    };

    const getSortButtonLabel = (columnTitle: string): string => {
        const sortIndex = sortState.findIndex(s => s.key === columnTitle);
        if (sortIndex === -1) {
            return "정렬";
        }
        const sortOption = sortState[sortIndex];
        const orderLabel = sortOption.order === "asc" ? "오름차순" : "내림차순";
        const priority = sortIndex + 1;
        return `${orderLabel} ${sortState.length > 1 ? `(${priority})` : ""}`.trim();
    };

    const getCell = React.useCallback(
        ([col, row]: Item): GridCell => {
            const rowData = processedData[row];

            if (!rowData) {
                return { kind: "text", data: "", displayData: "", allowOverlay: false };
            }

            const column = cols[col];
            const colId = column.id ?? column.title;

            if ((rowData as any).isGroupSummary) {
                const summaryRow = rowData as GroupSummaryRow;

                const summaryValue = summaryRow[colId];
                if (summaryValue !== undefined) {
                    return {
                        kind: "text",
                        data: String(summaryValue),
                        displayData: String(summaryValue),
                        allowOverlay: false,
                        readonly: true,
                        themeOverride: { bgCell: "#e0e0e0" },
                    };
                }

                return {
                    kind: "text",
                    data: "",
                    displayData: "",
                    allowOverlay: false,
                    readonly: true,
                    themeOverride: { bgCell: "#e0e0e0" },
                };
            }

            const originalIndex = (rowData as any).originalIndex;
            if (originalIndex !== undefined) {
                return getCellContent([col, originalIndex]);
            }

            return {
                kind: "text",
                data: "Error",
                displayData: "Error",
                allowOverlay: false,
            };
        },
        [cols, getCellContent, processedData, groupingState]
    );

    const getRowThemeOverride = React.useCallback(
        (row: number): Partial<Theme> | undefined => {
            const rowData = processedData[row];
            if (rowData && (rowData as any).isGroupSummary) {
                return {
                    bgCell: "#e0e0e0",
                };
            }
            return undefined;
        },
        [processedData]
    );

    return (
        <BeautifulWrapperHeight
            height={500}
            title="Search"
            description={
                <>
                    <Description>
                        01. DataGrid respects the theme provided by the <PropName>search</PropName> prop.
                    </Description>
                    <table>
                        <thead>
                            <tr>
                                <td>컬럼명</td>
                                <td>조건</td>
                                <td>연산자</td>
                                <td>값</td>
                                <td>정렬</td>
                                <td>필터링</td>
                                <td>그룹핑</td>
                                <td>그룹핑 레이블</td>
                                <td>그룹핑 함수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cols.map(col => {
                                const inputs = columnInputs.get(col.title) || {};
                                return (
                                    <tr key={col.id}>
                                        <td>{col.title}</td>
                                        <td>
                                            <select
                                                value={inputs.filterCondition ?? "AND"}
                                                onChange={e =>
                                                    handleColumnInputChange(
                                                        col.title,
                                                        "filterCondition",
                                                        e.target.value as FilterCondition
                                                    )
                                                }>
                                                <option value="AND">AND</option>
                                                <option value="OR">OR</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={inputs.filterOperator ?? "Contain"}
                                                onChange={e =>
                                                    handleColumnInputChange(
                                                        col.title,
                                                        "filterOperator",
                                                        e.target.value as FilterOperator
                                                    )
                                                }>
                                                <option value="Contain">Contain</option>
                                                <option value="Not Contain">Not Contain</option>
                                                <option value="Equals">Equals</option>
                                                <option value="NotEqual">NotEqual</option>
                                                <option value="StartWith">StartWith</option>
                                                <option value="EndWith">EndWith</option>
                                                <option value="Great">Great</option>
                                                <option value="GreatWithEqual">GreatWithEqual</option>
                                                <option value="Less">Less</option>
                                                <option value="LessWithEqual">LessWithEqual</option>
                                                <option value="Between">Between</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={inputs.filterValue ?? ""}
                                                onChange={e =>
                                                    handleColumnInputChange(col.title, "filterValue", e.target.value)
                                                }></input>
                                        </td>
                                        <td>
                                            <button onClick={() => handleSort(col.title)}>
                                                {getSortButtonLabel(col.title)}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => { /* We dont need apply filter button anymore */ }}>필터링</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleGroupingClick(col.title)}>
                                                {getGroupingButtonLabel(col.title)}
                                            </button>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                placeholder="그룹 레이블"
                                                value={inputs.groupingLabel ?? ""}
                                                onChange={e =>
                                                    handleColumnInputChange(col.title, "groupingLabel", e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            <select
                                                value={inputs.groupingFunction ?? ""}
                                                onChange={e =>
                                                    handleColumnInputChange(col.title, "groupingFunction", e.target.value)
                                                }>
                                                <option value="">없음</option>
                                                <option value="label">label</option>
                                                <option value="sum">Sum</option>
                                                <option value="count">Count</option>
                                                <option value="avg">Avg</option>
                                                <option value="min">Min</option>
                                                <option value="max">Max</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <MoreInfo></MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                height="100%"
                getCellContent={getCell}
                columns={cols}
                rows={processedData.length}
                getRowThemeOverride={getRowThemeOverride}
            />
        </BeautifulWrapperHeight>
    );
};

SearchDataEditor.storyName = "05. Search";