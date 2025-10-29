import React from "react";
import type { Theme } from "../../common/styles.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useStaticMockData,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { GridCell, Item } from "../../internal/data-grid/data-grid-types.js";
import { type SortConfig, multiColumnSort } from "../../data/sort.js";
import { type FilterConfig, type FilterOption, type FilterOperator, type FilterCondition, multiColumnFilter } from "../../data/filter.js";


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

interface FilterInputState {
    operator: FilterOperator;
    value: any;
    condition: FilterCondition;
}

export const SearchDataEditor: React.VFC = () => {
    const { cols, getCellContent, rows } = useStaticMockData();

    const [sortState, setSortState] = React.useState<{ key: string; order: "asc" | "desc" }[]>([]);
    const [filterInputState, setFilterInputState] = React.useState<Map<string, FilterInputState>>(() => new Map());
    const [activeFilterConfig, setActiveFilterConfig] = React.useState<FilterConfig<any> | null>(null);



    const [processedData, setProcessedData] = React.useState<(any | GroupSummaryRow)[]>([]);
    const [rowMap, setRowMap] = React.useState<number[]>(() => Array.from({ length: rows }, (_, i) => i));

    const getGridData = React.useCallback(() => {
        const data: any[] = [];
        for (let i = 0; i < rows; i++) {
            const row: any = { originalIndex: i };
            for (let j = 0; j < cols.length; j++) {
                row[cols[j].title] = getCellContent([j, i]).data;
            }
            data.push(row);
        }
        return data;
    }, [cols, getCellContent, rows]);

    React.useEffect(() => {
        let currentData = getGridData();


        // Apply Filtering
        if (activeFilterConfig && activeFilterConfig.filterOptions.length > 0) {
            currentData = multiColumnFilter(currentData, activeFilterConfig);
        }

        // Apply Sorting
        if (sortState.length > 0) {
            currentData = multiColumnSort(currentData, { sortOptions: sortState });
        }

        setProcessedData(currentData);
        
        const newRowMap = currentData.map((row, idx) => (row as any).originalIndex !== undefined ? (row as any).originalIndex : -(idx + 1));
        setRowMap(newRowMap);
    }, [sortState, activeFilterConfig,  getGridData]);

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

    const handleFilterChange = (columnTitle: string, field: keyof FilterInputState, value: any) => {
        setFilterInputState(prev => {
            const newState = new Map(prev);
            const current = newState.get(columnTitle) || { operator: "Contain", value: "", condition: "AND" };
            newState.set(columnTitle, { ...current, [field]: value });
            return newState;
        });
    };

    const applyFilters = () => {
        const filterOptions: FilterOption<any>[] = [];
        filterInputState.forEach((filter, key) => {
            if (filter.value !== "") {
                filterOptions.push({
                    key: key,
                    operator: filter.operator,
                    value: filter.value,
                    condition: filter.condition,
                });
            }
        });
        setActiveFilterConfig({ filterOptions });
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

    const getSortedCellContent = React.useCallback(
        ([col, row]: Item): GridCell => {
            const mappedRowIndex = rowMap[row];
            const originalRowData = processedData.find(d => (d as any).originalIndex === mappedRowIndex);

            if (originalRowData && (originalRowData as GroupSummaryRow).isGroupSummary) {
                const summaryRow = originalRowData as GroupSummaryRow;
                const colTitle = cols[col].title;
                const summaryValue = summaryRow[colTitle] || summaryRow["groupCount"];

                return {
                    kind: "text",
                    displayData: `소계: ${summaryValue}`,
                    data: `소계: ${summaryValue}`,
                    allowOverlay: false,
                    readonly: true,
                    themeOverride: {
                        bgCell: "#e0e0e0",
                    },
                };
            }

            return getCellContent([col, mappedRowIndex]);
        },
        [getCellContent, rowMap, processedData, cols]
    );

    const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
        const mappedRowIndex = rowMap[row];
        const originalRowData = processedData.find(d => (d as any).originalIndex === mappedRowIndex);
        if (originalRowData && (originalRowData as GroupSummaryRow).isGroupSummary) {
            return {
                bgCell: "#e0e0e0", // Light grey background for summary rows
            };
        }
        return undefined;
    }, [rowMap, processedData]);

    return (
        <BeautifulWrapper
            title="Search"
            description={
                <>
                    <Description>
                        01. DataGrid respects the theme provided by the <PropName>search</PropName> prop.
                        <br />
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
                                {
                                    cols.map(col => {
                                        const filter = filterInputState.get(col.title) || { operator: "Contain", value: "", condition: "AND" };
                                        return (
                                            <tr key={col.id}>
                                                <td>{col.title}</td>
                                                <td>
                                                    <select
                                                        value={filter.condition}
                                                        onChange={e => handleFilterChange(col.title, "condition", e.target.value as FilterCondition)}
                                                    >
                                                        <option value="AND">AND</option>
                                                        <option value="OR">OR</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <select
                                                        value={filter.operator}
                                                        onChange={e => handleFilterChange(col.title, "operator", e.target.value as FilterOperator)}
                                                    >
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
                                                        value={filter.value}
                                                        onChange={e => handleFilterChange(col.title, "value", e.target.value)}
                                                    ></input>
                                                </td>
                                                <td>
                                                    <button onClick={() => handleSort(col.title)}>
                                                        {getSortButtonLabel(col.title)}
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={applyFilters}>필터링</button>
                                                </td>
                                                <td>
                                                    <button >
                                                        그룹핑
                                                    </button>
                                                </td>
                                                <td>
                                                    
                                                        <input
                                                            type="text"
                                                            placeholder="그룹 레이블"
                                                        />
                                                    
                                                </td>
                                                <td>
                                                     
                                                        <select>
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
                                    })
                                }
                            </tbody>
                        </table>
                    </Description>
                    <MoreInfo></MoreInfo>
                </>
            }>
            <DataEditor {...defaultProps} getCellContent={getSortedCellContent} columns={cols} rows={processedData.length} getRowThemeOverride={getRowThemeOverride} />
        </BeautifulWrapper>
    );
};

SearchDataEditor.storyName = "05. Search";
