import React from "react";
import type { Theme } from "../../common/styles.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    GridCellKind,
    type GridCell,
    type GridColumn,
    type Item,
    isEditableGridCell,
} from "../../internal/data-grid/data-grid-types.js";
import {
    BeautifulWrapperHeight,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useStaticMockData,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { type SortConfig, multiColumnSort } from "../../data/sort.js";
import {
    type FilterConfig,
    type FilterOption,
    type FilterOperator,
    type FilterCondition,
    multiColumnFilter,
} from "../../data/filter.js";
import { groupData, type GroupSummaryRow } from "../../data/grouping.js";
import { useGridDataProcessing, type ProcessingOptions } from "../../data/useGridDataProcessing.js";
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

export const SearchDataEditor = () => {
    const { cols, getCellContent, rows } = useStaticMockData();
    const initialData = React.useMemo(() => {
        const data: any[] = [];
        for (let i = 0; i < rows; i++) {
            const row: any = { originalIndex: i };
            for (let j = 0; j < cols.length; j++) {
                const colKey = cols[j].id ?? cols[j].title;
                const cell = getCellContent([j, i]);

                if (isEditableGridCell(cell)) {
                    switch (cell.kind) {
                        case GridCellKind.Number:
                        case GridCellKind.Text:
                        case GridCellKind.Uri:
                        case GridCellKind.Markdown:
                            row[colKey] = cell.data;
                            break;
                        case GridCellKind.Boolean:
                            row[colKey] = cell.data?.toString();
                            break;
                        default:
                            row[colKey] = cell.copyData;
                    }
                }
            }
            data.push(row);
        }
        return data;
    }, [cols, getCellContent, rows]);

    const [columnInputs, setColumnInputs] = React.useState<Map<string, Partial<ColumnInput>>>(() => new Map());
    const [sortState, setSortState] = React.useState<{ key: string; order: "asc" | "desc" }[]>([]);
    const [groupingState, setGroupingState] = React.useState<string[]>([]);
    const [showTotals, setShowTotals] = React.useState(false);

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
        const labelsMap = new Map<string, string>();
        const functionsMap = new Map<string, string>();

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
                labelsMap.set(key, input.groupingLabel);
            }
            if (input.groupingFunction) {
                functionsMap.set(key, input.groupingFunction);
            }
        });

        const derivedConfigs = { filterConfig: { filterOptions }, groupingFunctions: functionsMap, groupingLabels: labelsMap };
        console.log("[SearchDataEditor] Derived Configs:", derivedConfigs);
        return derivedConfigs;
    }, [columnInputs]);

    const { processedData, totalSummaryRow } = useGridDataProcessing(initialData, {
        filterConfig,
        sortState,
        groupingState,
        groupingFunctions,
        groupingLabels,
        showTotals,
        cols,
    });

    const finalData = React.useMemo(() => {
        return totalSummaryRow ? [...processedData, totalSummaryRow] : processedData;
    }, [processedData, totalSummaryRow]);

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
            } else {
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
        const priorityText = sortState.length > 1 ? `(${priority})` : "";
        return `${orderLabel} ${priorityText}`.trim();
    };

    const getCell = React.useCallback(
        ([col, row]: Item): GridCell => {
            const rowData = finalData[row];

            if (!rowData) {
                return { kind: GridCellKind.Text, data: "", displayData: "", allowOverlay: false };
            }

            const column = cols[col];
            const colId = column.id ?? column.title;

            if ((rowData as any).isTotalSummary) {
                const summaryRowData = rowData as any;
                const totalValue = summaryRowData[colId];

                return {
                    kind: GridCellKind.Text,
                    data: totalValue !== undefined ? String(totalValue) : "",
                    displayData: totalValue !== undefined ? String(totalValue) : "",
                    allowOverlay: false,
                    readonly: true,
                    themeOverride: { bgCell: "#f7f7f7", textDark: "#000000", bgCellMedium: "#f0f0f0" },
                };
            }

            if ((rowData as any).isGroupSummary) {
                const summaryRow = rowData as GroupSummaryRow;

                const summaryValue = summaryRow[colId];
                if (summaryValue !== undefined) {
                    return {
                        kind: GridCellKind.Text,
                        data: String(summaryValue),
                        displayData: String(summaryValue),
                        allowOverlay: false,
                        readonly: true,
                        themeOverride: { bgCell: "#e0e0e0" },
                    };
                }

                return {
                    kind: GridCellKind.Text,
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
                kind: GridCellKind.Text,
                data: "Error",
                displayData: "Error",
                allowOverlay: false,
            };
        },
        [cols, getCellContent, finalData, groupingState]
    );

    const getRowThemeOverride = React.useCallback(
        (row: number): Partial<Theme> | undefined => {
            const rowData = finalData[row];
            if (rowData && (rowData as any).isGroupSummary) {
                return {
                    bgCell: "#e0e0e0",
                };
            }
            if (rowData && (rowData as any).isTotalSummary) {
                return {
                    bgCell: "#f7f7f7",
                    bgCellMedium: "#f0f0f0",
                };
            }
            return undefined;
        },
        [finalData]
    );

    return (
        <BeautifulWrapperHeight
            title="Sort, filter, grouping"
            height={"400px"}
            description={
                <>
                    <div>
                        <input type="checkbox" checked={showTotals} onChange={e => setShowTotals(e.target.checked)} />총
                        합계 보이기 (제일 마지막열)
                    </div>
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
                                    <tr key={col.id ?? col.title}>
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
                                            <button
                                                onClick={() => {
                                                    /* We dont need apply filter button anymore */
                                                }}>
                                                필터링
                                            </button>
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
                                                    handleColumnInputChange(
                                                        col.title,
                                                        "groupingFunction",
                                                        e.target.value
                                                    )
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
                rows={finalData.length}
                getRowThemeOverride={getRowThemeOverride}
                freezeTrailingRows={1}
            />
        </BeautifulWrapperHeight>
    );
};

SearchDataEditor.storyName = "05. Sort, filter, grouping";
