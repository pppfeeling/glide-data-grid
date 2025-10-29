import type { GridCell } from "../internal/data-grid/data-grid-types";

export type FilterOperator = "Contain" | "Not Contain" | "Equals" | "NotEqual" | "StartWith" | "EndWith" | "Great" | "GreatWithEqual" | "Less" | "LessWithEqual" | "Between";
export type FilterCondition = "AND" | "OR";

export interface FilterOption<T> {
    key: keyof T;
    operator: FilterOperator;
    value: any;
    condition?: FilterCondition;
}

export interface FilterConfig<T> {
    filterOptions: FilterOption<T>[];
}

const evaluateCondition = (cellValue: any, operator: FilterOperator, filterValue: any): boolean => {
    if (cellValue === null || cellValue === undefined) {
        return false;
    }

    const cellValueString = String(cellValue).toLowerCase();
    const filterValueString = String(filterValue).toLowerCase();

    switch (operator) {
        case "Contain":
            return cellValueString.includes(filterValueString);
        case "Not Contain":
            return !cellValueString.includes(filterValueString);
        case "Equals":
            return cellValueString === filterValueString;
        case "NotEqual":
            return cellValueString !== filterValueString;
        case "StartWith":
            return cellValueString.startsWith(filterValueString);
        case "EndWith":
            return cellValueString.endsWith(filterValueString);
        case "Great":
            return parseFloat(cellValue) > parseFloat(filterValue);
        case "GreatWithEqual":
            return parseFloat(cellValue) >= parseFloat(filterValue);
        case "Less":
            return parseFloat(cellValue) < parseFloat(filterValue);
        case "LessWithEqual":
            return parseFloat(cellValue) <= parseFloat(filterValue);
        case "Between":
            // Assuming filterValue for "Between" is an array [min, max]
            if (Array.isArray(filterValue) && filterValue.length === 2) {
                const numCellValue = parseFloat(cellValue);
                const numMin = parseFloat(filterValue[0]);
                const numMax = parseFloat(filterValue[1]);
                return numCellValue >= numMin && numCellValue <= numMax;
            }
            return false;
        default:
            return false;
    }
};

export const multiColumnFilter = <T extends Record<string, any>>(
    data: T[],
    config: FilterConfig<T>
): T[] => {
    const { filterOptions } = config;

    if (!filterOptions || filterOptions.length === 0) {
        return data;
    }

    return data.filter(row => {
        let result = true;
        let lastCondition: FilterCondition = "AND";

        for (let i = 0; i < filterOptions.length; i++) {
            const option = filterOptions[i];
            const { key, operator, value, condition = "AND" } = option;

            const currentEvaluation = evaluateCondition(row[key], operator, value);

            if (i === 0) {
                result = currentEvaluation;
            } else {
                if (lastCondition === "AND") {
                    result = result && currentEvaluation;
                } else {
                    result = result || currentEvaluation;
                }
            }
            lastCondition = condition;
        }
        return result;
    });
};