import React from "react";
import { whenDefined } from "../common/utils.js";
export function expandRowGroups(groups) {
  function processGroup(group, depth, path) {
    if (typeof group === "number") {
      return {
        headerIndex: group,
        isCollapsed: false,
        depth,
        path
      };
    }
    const expandedGroup = {
      headerIndex: group.headerIndex,
      isCollapsed: group.isCollapsed,
      depth,
      path
    };
    if (group.subGroups !== undefined) {
      expandedGroup.subGroups = group.subGroups.map((x, ind) => processGroup(x, depth + 1, [...path, ind])).sort((a, b) => a.headerIndex - b.headerIndex);
    }
    return expandedGroup;
  }
  const expanded = groups.map((group, i) => processGroup(group, 0, [i]));
  return expanded.sort((a, b) => a.headerIndex - b.headerIndex);
}
export function flattenRowGroups(rowGrouping, rows) {
  const flattened = [];
  function processGroup(group, nextHeaderIndex) {
    let skipChildren = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    let rowsInGroup = nextHeaderIndex !== null ? nextHeaderIndex - group.headerIndex : rows - group.headerIndex;
    if (group.subGroups !== undefined) {
      rowsInGroup = group.subGroups[0].headerIndex - group.headerIndex;
    }
    rowsInGroup--;
    flattened.push({
      rowIndex: -1,
      headerIndex: group.headerIndex,
      contentIndex: -1,
      skip: skipChildren,
      isCollapsed: group.isCollapsed,
      depth: group.depth,
      path: group.path,
      rows: rowsInGroup
    });
    if (group.subGroups) {
      for (let i = 0; i < group.subGroups.length; i++) {
        const nextSubHeaderIndex = i < group.subGroups.length - 1 ? group.subGroups[i + 1].headerIndex : nextHeaderIndex;
        processGroup(group.subGroups[i], nextSubHeaderIndex, skipChildren || group.isCollapsed);
      }
    }
  }
  const expandedGroups = expandRowGroups(rowGrouping.groups);
  for (let i = 0; i < expandedGroups.length; i++) {
    const nextHeaderIndex = i < expandedGroups.length - 1 ? expandedGroups[i + 1].headerIndex : null;
    processGroup(expandedGroups[i], nextHeaderIndex);
  }
  let rowIndex = 0;
  let contentIndex = 0;
  for (const g of flattened) {
    g.contentIndex = contentIndex;
    contentIndex += g.rows;
    g.rowIndex = rowIndex;
    rowIndex += g.isCollapsed ? 1 : g.rows + 1;
  }
  return flattened.filter(x => x.skip === false).map(x => {
    const {
      skip,
      ...rest
    } = x;
    return rest;
  });
}
export function mapRowIndexToPath(row, flattenedRowGroups) {
  if (flattenedRowGroups === undefined || flattenRowGroups.length === 0) return {
    path: [row],
    originalIndex: row,
    isGroupHeader: false,
    groupIndex: row,
    contentIndex: row,
    groupRows: -1
  };
  let toGo = row;
  for (const group of flattenedRowGroups) {
    if (toGo === 0) return {
      path: [...group.path, -1],
      originalIndex: group.headerIndex,
      isGroupHeader: true,
      groupIndex: -1,
      contentIndex: -1,
      groupRows: group.rows
    };
    if (!group.isCollapsed) {
      if (toGo <= group.rows) return {
        path: [...group.path, toGo - 1],
        originalIndex: group.headerIndex + toGo,
        isGroupHeader: false,
        groupIndex: toGo - 1,
        contentIndex: group.contentIndex + toGo - 1,
        groupRows: group.rows
      };
      toGo = toGo - group.rows - 1;
    } else {
      toGo--;
    }
  }
  return {
    path: [row],
    originalIndex: row,
    isGroupHeader: false,
    groupIndex: row,
    contentIndex: row,
    groupRows: -1
  };
}
export function useRowGroupingInner(options, rows, rowHeightIn, getRowThemeOverrideIn) {
  const flattenedRowGroups = options === undefined ? undefined : flattenRowGroups(options, rows);
  const flattenedRowGroupsMap = flattenedRowGroups === null || flattenedRowGroups === void 0 ? void 0 : flattenedRowGroups.reduce((acc, group) => {
    acc[group.rowIndex] = group;
    return acc;
  }, {});
  const effectiveRows = (() => {
    if (flattenedRowGroups === undefined) return rows;
    return flattenedRowGroups.reduce((acc, group) => acc + (group.isCollapsed ? 1 : group.rows + 1), 0);
  })();
  const rowHeight = (() => {
    if (options === undefined) return rowHeightIn;
    if (typeof rowHeightIn === "number" && options.height === rowHeightIn) return rowHeightIn;
    return rowIndex => {
      if (flattenedRowGroupsMap !== null && flattenedRowGroupsMap !== void 0 && flattenedRowGroupsMap[rowIndex]) return options.height;
      return typeof rowHeightIn === "number" ? rowHeightIn : rowHeightIn(rowIndex);
    };
  })();
  const rowNumberMapperOut = row => {
    if (flattenedRowGroups === undefined) return row;
    let toGo = row;
    for (const group of flattenedRowGroups) {
      if (toGo === 0) return undefined;
      toGo--;
      if (!group.isCollapsed) {
        if (toGo < group.rows) return group.contentIndex + toGo;
        toGo -= group.rows;
      }
    }
    return row;
  };
  const getRowThemeOverride = whenDefined(getRowThemeOverrideIn !== null && getRowThemeOverrideIn !== void 0 ? getRowThemeOverrideIn : options === null || options === void 0 ? void 0 : options.themeOverride, row => {
    if (options === undefined) return getRowThemeOverrideIn === null || getRowThemeOverrideIn === void 0 ? void 0 : getRowThemeOverrideIn(row, row, row);
    if (getRowThemeOverrideIn === undefined && (options === null || options === void 0 ? void 0 : options.themeOverride) === undefined) return undefined;
    const {
      isGroupHeader,
      contentIndex,
      groupIndex
    } = mapRowIndexToPath(row, flattenedRowGroups);
    if (isGroupHeader) return options.themeOverride;
    return getRowThemeOverrideIn === null || getRowThemeOverrideIn === void 0 ? void 0 : getRowThemeOverrideIn(row, groupIndex, contentIndex);
  });
  if (options === undefined) return {
    rowHeight,
    rows: rows,
    rowNumberMapper: rowNumberMapperOut,
    getRowThemeOverride
  };
  return {
    rowHeight,
    rows: effectiveRows,
    rowNumberMapper: rowNumberMapperOut,
    getRowThemeOverride
  };
}
//# sourceMappingURL=row-grouping.js.map