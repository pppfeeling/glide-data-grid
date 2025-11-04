
export interface GroupSummaryRow {
    readonly isGroupSummary: true;
    readonly groupName: string;
    readonly count: number;
    readonly level: number;
    [key: string]: any;
}

export interface TotalSummaryRow {
    readonly isTotalSummary: true;
    [key: string]: any;
}

function recursiveGroup<T extends Record<string, any>>(
    data: readonly T[],
    groupKeys: (keyof T & string)[],
    aggregation: { id: string; column: string; type: "sum" | "count" | "label" | "avg" | "min" | "max"; label?: string }[],
    level: number,
    offset: number
): (T | GroupSummaryRow)[] {
    if (groupKeys.length === 0 || data.length === 0) {
        if (data.length >= 2) {
            return data.map((row, index) => ({
                ...row,
                rowspan: [offset, offset + data.length],
            }));
        }
        return [...data];
    }

    const [currentKey, ...remainingKeys] = groupKeys;
    const result: (T | GroupSummaryRow)[] = [];

    const groups = new Map<any, T[]>(); //group value를 key로 한 row[]
    for (const row of data) {
        const groupVal = row[currentKey];
        if (!groups.has(groupVal)) {
            groups.set(groupVal, []);
        }
        groups.get(groupVal)!.push(row);
    }

    let currentLocalOffset = 0;
    for (const groupRows of groups.values()) {
        const groupStart = offset + currentLocalOffset;
        const recursiveResult = recursiveGroup(groupRows, remainingKeys, aggregation, level + 1, groupStart);

        if (groupRows.length >= 2) {
            const groupEnd = groupStart + recursiveResult.length;
            for (const r of recursiveResult) {
                if (!("isGroupSummary" in r) && (r as any).rowspan === undefined) {
                    (r as any).rowspan = [groupStart, groupEnd];
                }
            }
        }

        result.push(...recursiveResult);

        const summary = createSummary(groupRows, currentKey, aggregation, level);
        result.push(summary);
        currentLocalOffset = result.length;
    }

    return result;
}

export function groupData<T extends Record<string, any>>(
    data: readonly T[],
    groupKeys: (keyof T & string)[],
    aggregation: { id: string; column: string; type: "sum" | "count" | "label" | "avg" | "min" | "max"; label?: string }[]
): { groupedData: (T | GroupSummaryRow)[]; groupHeaderIndexes: number[] } {
    if (groupKeys.length === 0 || data.length === 0) {
        return { groupedData: [...data], groupHeaderIndexes: [] };
    }

    const groupedData = recursiveGroup(data, groupKeys, aggregation, 0, 0);
    const groupHeaderIndexes: number[] = [];
    for (let i = 0; i < groupedData.length; i++) {
        const row = groupedData[i];
        if ("isGroupSummary" in row && row.isGroupSummary) {
            if (row.level === 0) {
                groupHeaderIndexes.push(i);
            }
        }
    }

    return { groupedData, groupHeaderIndexes };
}

function createSummary<T extends Record<string, any>>(
    group: readonly T[],
    groupKey: string,
    aggregation: { id: string; column: string; type: "sum" | "count" | "label" | "avg" | "min" | "max"; label?: string }[],
    level: number
): GroupSummaryRow {
    const groupName = String(group[0][groupKey]);

    const summary: any = {
        isGroupSummary: true,
        groupName: groupName,
        count: group.length,
        level: level,
    };

    for (const agg of aggregation) {
        const values = group.map(x => x[agg.column]);
        const numericValues = values.filter(x => typeof x === "number") as number[];

        if (agg.type === "sum") {
            summary[agg.id] = numericValues.reduce((a, b) => a + b, 0);
        } else if (agg.type === "avg") {
            if (numericValues.length > 0) {
                summary[agg.id] = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
            } else {
                summary[agg.id] = 0;
            }
        } else if (agg.type === "min") {
            summary[agg.id] = Math.min(...numericValues);
        } else if (agg.type === "max") {
            summary[agg.id] = Math.max(...numericValues);
        } else if (agg.type === "count") {
            summary[agg.id] = group.length;
        } else if (agg.type === "label") {
            summary[agg.id] = agg.label ?? groupName;
        }
    }

    return summary as GroupSummaryRow;
}

export function createTotalSummary<T extends Record<string, any>>(
    data: readonly T[],
    aggregation: { id: string; column: string; type: "sum" | "count" | "label" | "avg" | "min" | "max"; label?: string }[]
): TotalSummaryRow {
    const summary: any = {
        isTotalSummary: true,
    };

    
    for (const agg of aggregation) {
        if (agg.type === "label") {
          summary[agg.id] = agg.label ?? "총합계"
        } else if (agg.type === "sum" || agg.type === "avg" || agg.type === "min" || agg.type === "max") {
            const numericValues = data.map(x => x[agg.column]).filter(x => typeof x === "number") as number[];
            if (numericValues.length > 0) {
                if (agg.type === "sum") summary[agg.id] = numericValues.reduce((a, b) => a + b, 0);
                if (agg.type === "avg")
                    summary[agg.id] = numericValues.reduce((a, b) => a + b, 0) / numericValues.length;
                if (agg.type === "min") summary[agg.id] = Math.min(...numericValues);
                if (agg.type === "max") summary[agg.id] = Math.max(...numericValues);
            }
        } else if (agg.type === "count") {
            summary[agg.id] = data.length;
        }
    }

    return summary as TotalSummaryRow;
}
