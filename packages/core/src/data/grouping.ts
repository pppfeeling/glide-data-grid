
export interface GroupSummaryRow {
    readonly isGroupSummary: true;
    readonly groupName: string;
    readonly level: number;
    [key: string]: any;
}

function recursiveGroup<T extends Record<string, any>>(
    data: readonly T[],
    groupKeys: (keyof T & string)[],
    aggregation: { id: string; column: string; type: "sum" | "count" | "label" | "avg" | "min" | "max"; label?: string }[],
    level: number
): (T | GroupSummaryRow)[] {
    if (groupKeys.length === 0 || data.length === 0) {
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

    for (const groupRows of groups.values()) {
        const summary = createSummary(groupRows, currentKey, aggregation, level);
        result.push(summary);

        const recursiveResult = recursiveGroup(groupRows, remainingKeys, aggregation, level + 1);
        result.push(...recursiveResult);
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

    const groupedData = recursiveGroup(data, groupKeys, aggregation, 0);

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
