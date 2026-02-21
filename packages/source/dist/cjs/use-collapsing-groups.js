import React from "react";
// Helper function to get the group name as a string
function getGroupNameString(group) {
    if (group === undefined)
        return "";
    if (typeof group === "string")
        return group;
    return group.length > 0 ? group[group.length - 1] : "";
}
export function useCollapsingGroups(props) {
    const [collapsed, setCollapsed] = React.useState([]);
    const [gridSelectionInner, setGridSelectionsInner] = React.useState(undefined);
    const { columns: columnsIn, onGroupHeaderClicked: onGroupHeaderClickedIn, onGridSelectionChange: onGridSelectionChangeIn, getGroupDetails: getGroupDetailsIn, gridSelection: gridSelectionIn, freezeColumns = 0, theme, } = props;
    const gridSelection = gridSelectionIn ?? gridSelectionInner;
    const spans = React.useMemo(() => {
        const result = [];
        let current = [-1, -1];
        let lastGroup;
        for (let i = freezeColumns; i < columnsIn.length; i++) {
            const c = columnsIn[i];
            const group = getGroupNameString(c.group);
            const isCollapsed = collapsed.includes(group);
            if (lastGroup !== group && current[0] !== -1) {
                result.push(current);
                current = [-1, -1];
            }
            if (isCollapsed && current[0] !== -1) {
                current[1] += 1;
            }
            else if (isCollapsed) {
                current = [i, 1];
            }
            else if (current[0] !== -1) {
                result.push(current);
                current = [-1, -1];
            }
            lastGroup = getGroupNameString(c.group);
        }
        if (current[0] !== -1)
            result.push(current);
        return result;
    }, [collapsed, columnsIn, freezeColumns]);
    const columns = React.useMemo(() => {
        if (spans.length === 0)
            return columnsIn;
        return columnsIn.map((c, index) => {
            for (const [start, length] of spans) {
                if (index >= start && index < start + length) {
                    let width = 8;
                    if (index === start + length - 1) {
                        width = 36;
                    }
                    return {
                        ...c,
                        width,
                        themeOverride: { bgCell: theme.bgCellMedium },
                    };
                }
            }
            return c;
        });
    }, [columnsIn, spans, theme.bgCellMedium]);
    const onGroupHeaderClicked = React.useCallback((index, a) => {
        onGroupHeaderClickedIn?.(index, a);
        const group = getGroupNameString(columns[index]?.group);
        if (group === "")
            return;
        a.preventDefault();
        setCollapsed(cv => (cv.includes(group) ? cv.filter(x => x !== group) : [...cv, group]));
    }, [columns, onGroupHeaderClickedIn]);
    const onGridSelectionChange = React.useCallback(s => {
        if (s.current !== undefined) {
            const col = s.current.cell[0];
            const column = columns[col];
            const groupName = getGroupNameString(column?.group);
            setCollapsed(cv => {
                if (cv.includes(groupName)) {
                    return cv.filter(g => g !== groupName);
                }
                return cv;
            });
        }
        if (onGridSelectionChangeIn !== undefined) {
            onGridSelectionChangeIn(s);
        }
        else {
            setGridSelectionsInner(s);
        }
    }, [columns, onGridSelectionChangeIn]);
    const getGroupDetails = React.useCallback(group => {
        const result = getGroupDetailsIn?.(group);
        const groupStr = group ?? "";
        return {
            ...result,
            name: groupStr,
            overrideTheme: collapsed.includes(groupStr)
                ? {
                    bgHeader: theme.bgHeaderHasFocus,
                }
                : undefined,
        };
    }, [collapsed, getGroupDetailsIn, theme.bgHeaderHasFocus]);
    return {
        columns,
        onGroupHeaderClicked,
        onGridSelectionChange,
        getGroupDetails,
        gridSelection,
    };
}
//# sourceMappingURL=use-collapsing-groups.js.map