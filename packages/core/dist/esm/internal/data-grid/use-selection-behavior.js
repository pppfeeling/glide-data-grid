import { c as _c } from "react/compiler-runtime";
import React from "react";
import { CompactSelection } from "./data-grid-types.js";
export function useSelectionBehavior(gridSelection, setGridSelection, rangeBehavior, columnBehavior, rowBehavior, rangeSelect, rangeSelectionColumnSpanning) {
  const $ = _c(24);
  let t0;
  if ($[0] !== columnBehavior || $[1] !== gridSelection || $[2] !== rangeBehavior || $[3] !== rangeSelect || $[4] !== rangeSelectionColumnSpanning || $[5] !== rowBehavior || $[6] !== setGridSelection) {
    t0 = (value, expand, append, trigger) => {
      var _gridSelection$curren, _gridSelection$curren2;
      if ((rangeSelect === "cell" || rangeSelect === "multi-cell") && value !== undefined) {
        value = {
          ...value,
          range: {
            x: value.cell[0],
            y: value.cell[1],
            width: 1,
            height: 1
          }
        };
      }
      if (!rangeSelectionColumnSpanning && value !== undefined && value.range.width > 1) {
        value = {
          ...value,
          range: {
            ...value.range,
            width: 1,
            x: value.cell[0]
          }
        };
      }
      const rangeMixable = rangeBehavior === "mixed" && (append || trigger === "drag") || rangeBehavior === "additive";
      const allowColumnCoSelect = (columnBehavior === "mixed" || columnBehavior === "additive") && rangeMixable;
      const allowRowCoSelect = append || (rowBehavior === "mixed" || rowBehavior === "additive") && rangeMixable;
      let newVal = {
        current: value === undefined ? undefined : {
          ...value,
          rangeStack: trigger === "drag" ? (_gridSelection$curren = (_gridSelection$curren2 = gridSelection.current) === null || _gridSelection$curren2 === void 0 ? void 0 : _gridSelection$curren2.rangeStack) !== null && _gridSelection$curren !== void 0 ? _gridSelection$curren : [] : []
        },
        columns: allowColumnCoSelect ? gridSelection.columns : CompactSelection.empty(),
        rows: allowRowCoSelect ? gridSelection.rows : CompactSelection.empty()
      };
      const addLastRange = append && (rangeSelect === "multi-rect" || rangeSelect === "multi-cell");
      if (addLastRange && newVal.current !== undefined && gridSelection.current !== undefined) {
        newVal = {
          ...newVal,
          current: {
            ...newVal.current,
            rangeStack: [...gridSelection.current.rangeStack, gridSelection.current.range]
          }
        };
      }
      setGridSelection(newVal, expand);
    };
    $[0] = columnBehavior;
    $[1] = gridSelection;
    $[2] = rangeBehavior;
    $[3] = rangeSelect;
    $[4] = rangeSelectionColumnSpanning;
    $[5] = rowBehavior;
    $[6] = setGridSelection;
    $[7] = t0;
  } else {
    t0 = $[7];
  }
  const setCurrent = t0;
  let t1;
  if ($[8] !== columnBehavior || $[9] !== gridSelection || $[10] !== rangeBehavior || $[11] !== rowBehavior || $[12] !== setGridSelection) {
    t1 = (newRows, append_0, allowMixed) => {
      newRows = newRows !== null && newRows !== void 0 ? newRows : gridSelection.rows;
      if (append_0 !== undefined) {
        newRows = newRows.add(append_0);
      }
      let newVal_0;
      if (rowBehavior === "exclusive" && newRows.length > 0) {
        newVal_0 = {
          current: undefined,
          columns: CompactSelection.empty(),
          rows: newRows
        };
      } else {
        const rangeMixed = allowMixed && rangeBehavior === "mixed" || rangeBehavior === "additive";
        const columnMixed = allowMixed && columnBehavior === "mixed" || columnBehavior === "additive";
        const current = !rangeMixed ? undefined : gridSelection.current;
        newVal_0 = {
          current,
          columns: columnMixed ? gridSelection.columns : CompactSelection.empty(),
          rows: newRows
        };
      }
      setGridSelection(newVal_0, false);
    };
    $[8] = columnBehavior;
    $[9] = gridSelection;
    $[10] = rangeBehavior;
    $[11] = rowBehavior;
    $[12] = setGridSelection;
    $[13] = t1;
  } else {
    t1 = $[13];
  }
  const setSelectedRows = t1;
  let t2;
  if ($[14] !== columnBehavior || $[15] !== gridSelection || $[16] !== rangeBehavior || $[17] !== rowBehavior || $[18] !== setGridSelection) {
    t2 = (newCols, append_1, allowMixed_0) => {
      newCols = newCols !== null && newCols !== void 0 ? newCols : gridSelection.columns;
      if (append_1 !== undefined) {
        newCols = newCols.add(append_1);
      }
      let newVal_1;
      if (columnBehavior === "exclusive" && newCols.length > 0) {
        newVal_1 = {
          current: undefined,
          rows: CompactSelection.empty(),
          columns: newCols
        };
      } else {
        const rangeMixed_0 = allowMixed_0 && rangeBehavior === "mixed" || rangeBehavior === "additive";
        const rowMixed = allowMixed_0 && rowBehavior === "mixed" || rowBehavior === "additive";
        const current_0 = !rangeMixed_0 ? undefined : gridSelection.current;
        newVal_1 = {
          current: current_0,
          rows: rowMixed ? gridSelection.rows : CompactSelection.empty(),
          columns: newCols
        };
      }
      setGridSelection(newVal_1, false);
    };
    $[14] = columnBehavior;
    $[15] = gridSelection;
    $[16] = rangeBehavior;
    $[17] = rowBehavior;
    $[18] = setGridSelection;
    $[19] = t2;
  } else {
    t2 = $[19];
  }
  const setSelectedColumns = t2;
  let t3;
  if ($[20] !== setCurrent || $[21] !== setSelectedColumns || $[22] !== setSelectedRows) {
    t3 = [setCurrent, setSelectedRows, setSelectedColumns];
    $[20] = setCurrent;
    $[21] = setSelectedColumns;
    $[22] = setSelectedRows;
    $[23] = t3;
  } else {
    t3 = $[23];
  }
  return t3;
}
//# sourceMappingURL=use-selection-behavior.js.map