import React from "react";
import type { FilterConfig } from "./filter.js";
import type { GridColumn } from "../internal/data-grid/data-grid-types.js";
import { type SortConfig, multiColumnSort } from "./sort.js";
import { multiColumnFilter } from "./filter.js";
import { groupData, type GroupSummaryRow } from "./grouping.js";

export interface ProcessingOptions {
    filterConfig: FilterConfig<any> | null;
    sortState: { key: string; order: "asc" | "desc" }[];
    groupingState: string[];
    groupingFunctions: Map<string, string>;
    groupingLabels: Map<string, string>;
    cols: readonly GridColumn[];
}

export const useGridDataProcessing = (initialData: readonly any[], options: ProcessingOptions) => {
    const { filterConfig, sortState, groupingState, groupingFunctions, groupingLabels, cols } = options;

    const processedData = React.useMemo(() => {
        console.log("[useGridDataProcessing] Options:", options);
        let currentData = [...initialData];

        // 1. Filtering
        if (filterConfig && filterConfig.filterOptions.length > 0) {
            currentData = multiColumnFilter(currentData, filterConfig);
        }

        // 2. Sorting
        const groupSortOptions = groupingState.map(gKey => {
            const existingSort = sortState.find(s => s.key === gKey);
            return { key: gKey, order: existingSort?.order ?? "asc" };
        });

        const otherSortOptions = sortState.filter(s => !groupingState.includes(s.key));
        const finalSortOptions = [...groupSortOptions, ...otherSortOptions];

        if (finalSortOptions.length > 0) {
            currentData = multiColumnSort(currentData, { sortOptions: finalSortOptions });
        }

        // 3. Grouping
        if (groupingState.length > 0) {
            const aggregation = cols
                .map(c => {
                    const func = groupingFunctions.get(c.title);
                    if (func) {
                        if (func === "label") {
                            return {
                                id: c.id ?? c.title,
                                column: c.id ?? c.title,
                                type: "label",
                                label: groupingLabels.get(c.title),
                            };
                        }
                        return {
                            id: c.id ?? c.title,
                            column: c.id ?? c.title,
                            type: func as "sum" | "avg" | "min" | "max" | "count",
                        };
                    }
                    return null;
                })
                .filter(x => x !== null) as {
                id: string;
                column: string;
                type: "sum" | "avg" | "min" | "max" | "count" | "label";
                label?: string;
            }[];

            console.log("[useGridDataProcessing] Aggregation Config:", aggregation);
            const { groupedData } = groupData(currentData, groupingState, aggregation);
            console.log("[useGridDataProcessing] Grouped Data:", groupedData);
            return groupedData;
        }

        return currentData;
    }, [initialData, filterConfig, sortState, groupingState, groupingFunctions, groupingLabels, cols]);

    return { processedData };
};