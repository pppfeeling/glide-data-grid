import { c as _c } from "react/compiler-runtime";
import React from "react";
import { flattenRowGroups, mapRowIndexToPath } from "./row-grouping.js";
export function useRowGrouping(options, rows) {
  const $ = _c(7);
  let t0;
  if ($[0] !== options || $[1] !== rows) {
    t0 = options === undefined ? undefined : flattenRowGroups(options, rows);
    $[0] = options;
    $[1] = rows;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  const flattenedRowGroups = t0;
  let t1;
  if ($[3] !== flattenedRowGroups) {
    t1 = itemOrRow => {
      if (typeof itemOrRow === "number") {
        return mapRowIndexToPath(itemOrRow, flattenedRowGroups);
      }
      const r = mapRowIndexToPath(itemOrRow[1], flattenedRowGroups);
      return {
        ...r,
        originalIndex: [itemOrRow[0], r.originalIndex]
      };
    };
    $[3] = flattenedRowGroups;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  const t2 = t1;
  let t3;
  if ($[5] !== t2) {
    t3 = {
      getRowGroupingForPath,
      updateRowGroupingByPath,
      mapper: t2
    };
    $[5] = t2;
    $[6] = t3;
  } else {
    t3 = $[6];
  }
  return t3;
}
export function updateRowGroupingByPath(rowGrouping, path, update) {
  const [index, ...rest] = path;
  if (rest[0] === -1) {
    return rowGrouping.map((group, i) => i === index ? {
      ...group,
      ...update
    } : group);
  }
  return rowGrouping.map((group, i) => {
    var _group$subGroups;
    return i === index ? {
      ...group,
      subGroups: updateRowGroupingByPath((_group$subGroups = group.subGroups) !== null && _group$subGroups !== void 0 ? _group$subGroups : [], rest, update)
    } : group;
  });
}
export function getRowGroupingForPath(rowGrouping, path) {
  var _rowGrouping$index$su;
  const [index, ...rest] = path;
  if (rest[0] === -1) {
    return rowGrouping[index];
  }
  return getRowGroupingForPath((_rowGrouping$index$su = rowGrouping[index].subGroups) !== null && _rowGrouping$index$su !== void 0 ? _rowGrouping$index$su : [], rest);
}
//# sourceMappingURL=row-grouping-api.js.map