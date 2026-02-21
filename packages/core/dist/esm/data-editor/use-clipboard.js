import { c as _c } from "react/compiler-runtime";
import * as React from "react";
import { assert } from "../common/support.js";
import range from "lodash/range.js";
import { GridCellKind, isEditableGridCell, isReadWriteCell, CompactSelection, isInnerOnlyCell, BooleanEmpty, BooleanIndeterminate } from "../internal/data-grid/data-grid-types.js";
import { useEventListener } from "../common/utils.js";
import { unquote, copyToClipboard } from "./data-editor-fns.js";
import { decodeHTML } from "./copy-paste.js";
export function useClipboard(args) {
  const $ = _c(38);
  const {
    state,
    keybindings,
    getCellsForSelection,
    coercePasteValue,
    onPaste,
    copyHeaders,
    columnsIn,
    onDelete,
    deleteRange,
    safeWindow
  } = args;
  const {
    gridSelection,
    gridRef,
    scrollRef,
    canvasRef,
    abortControllerRef,
    rowMarkerOffset,
    mangledCols,
    mangledRows,
    rows,
    getMangledCellContent,
    mangledOnCellsEdited,
    getCellRenderer
  } = state;
  let t0;
  if ($[0] !== canvasRef || $[1] !== coercePasteValue || $[2] !== getCellRenderer || $[3] !== getMangledCellContent || $[4] !== gridRef || $[5] !== gridSelection || $[6] !== keybindings.paste || $[7] !== mangledCols || $[8] !== mangledOnCellsEdited || $[9] !== mangledRows || $[10] !== onPaste || $[11] !== rowMarkerOffset || $[12] !== rows || $[13] !== scrollRef) {
    t0 = async e => {
      var _scrollRef$current, _canvasRef$current;
      if (!keybindings.paste) {
        return;
      }
      const pasteToCell = function pasteToCell(inner, target, rawValue, formatted) {
        var _rawValue$join, _rawValue$toString;
        const stringifiedRawValue = typeof rawValue === "object" ? (_rawValue$join = rawValue === null || rawValue === void 0 ? void 0 : rawValue.join("\n")) !== null && _rawValue$join !== void 0 ? _rawValue$join : "" : (_rawValue$toString = rawValue === null || rawValue === void 0 ? void 0 : rawValue.toString()) !== null && _rawValue$toString !== void 0 ? _rawValue$toString : "";
        if (!isInnerOnlyCell(inner) && isReadWriteCell(inner) && inner.readonly !== true) {
          const coerced = coercePasteValue === null || coercePasteValue === void 0 ? void 0 : coercePasteValue(stringifiedRawValue, inner);
          if (coerced !== undefined && isEditableGridCell(coerced)) {
            return {
              location: target,
              value: coerced
            };
          }
          const r = getCellRenderer(inner);
          if (r === undefined) {
            return;
          }
          if (r.kind === GridCellKind.Custom) {
            var _r$onPaste;
            assert(inner.kind === GridCellKind.Custom);
            const newVal = (_r$onPaste = r.onPaste) === null || _r$onPaste === void 0 ? void 0 : _r$onPaste.call(r, stringifiedRawValue, inner.data);
            if (newVal === undefined) {
              return;
            }
            return {
              location: target,
              value: {
                ...inner,
                data: newVal
              }
            };
          } else {
            var _r$onPaste2;
            const newVal_0 = (_r$onPaste2 = r.onPaste) === null || _r$onPaste2 === void 0 ? void 0 : _r$onPaste2.call(r, stringifiedRawValue, inner, {
              formatted,
              formattedString: typeof formatted === "string" ? formatted : formatted === null || formatted === void 0 ? void 0 : formatted.join("\n"),
              rawValue
            });
            if (newVal_0 === undefined) {
              return;
            }
            assert(newVal_0.kind === inner.kind);
            return {
              location: target,
              value: newVal_0
            };
          }
        }
      };
      const selectedColumns = gridSelection.columns;
      const selectedRows = gridSelection.rows;
      const focused = ((_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.contains(document.activeElement)) === true || ((_canvasRef$current = canvasRef.current) === null || _canvasRef$current === void 0 ? void 0 : _canvasRef$current.contains(document.activeElement)) === true;
      let target_0;
      if (gridSelection.current !== undefined) {
        target_0 = [gridSelection.current.range.x, gridSelection.current.range.y];
      } else {
        if (selectedColumns.length === 1) {
          var _selectedColumns$firs;
          target_0 = [(_selectedColumns$firs = selectedColumns.first()) !== null && _selectedColumns$firs !== void 0 ? _selectedColumns$firs : 0, 0];
        } else {
          if (selectedRows.length === 1) {
            var _selectedRows$first;
            target_0 = [rowMarkerOffset, (_selectedRows$first = selectedRows.first()) !== null && _selectedRows$first !== void 0 ? _selectedRows$first : 0];
          }
        }
      }
      if (focused && target_0 !== undefined) {
        var _gridRef$current;
        let data;
        let text;
        if (navigator.clipboard.read !== undefined) {
          const clipboardContent = await navigator.clipboard.read();
          for (const item of clipboardContent) {
            if (item.types.includes("text/html")) {
              const htmlBlob = await item.getType("text/html");
              const html = await htmlBlob.text();
              const decoded = decodeHTML(html);
              if (decoded !== undefined) {
                data = decoded;
                break;
              }
            }
            if (item.types.includes("text/plain")) {
              text = await (await item.getType("text/plain")).text();
            }
          }
        } else {
          if (navigator.clipboard.readText !== undefined) {
            text = await navigator.clipboard.readText();
          } else {
            if (e !== undefined && (e === null || e === void 0 ? void 0 : e.clipboardData) !== null) {
              if (e.clipboardData.types.includes("text/html")) {
                const html_0 = e.clipboardData.getData("text/html");
                data = decodeHTML(html_0);
              }
              if (data === undefined && e.clipboardData.types.includes("text/plain")) {
                text = e.clipboardData.getData("text/plain");
              }
            } else {
              return;
            }
          }
        }
        const [targetCol, targetRow] = target_0;
        const editList = [];
        do {
          if (onPaste === undefined) {
            var _ref, _data;
            const cellData = getMangledCellContent(target_0);
            const rawValue_0 = (_ref = text !== null && text !== void 0 ? text : (_data = data) === null || _data === void 0 ? void 0 : _data.map(_temp2).join("\t")) !== null && _ref !== void 0 ? _ref : "";
            const newVal_1 = pasteToCell(cellData, target_0, rawValue_0, undefined);
            if (newVal_1 !== undefined) {
              editList.push(newVal_1);
            }
            break;
          }
          if (data === undefined) {
            if (text === undefined) {
              return;
            }
            data = unquote(text);
          }
          if (onPaste === false || typeof onPaste === "function" && (onPaste === null || onPaste === void 0 ? void 0 : onPaste([target_0[0] - rowMarkerOffset, target_0[1]], data.map(_temp4))) !== true) {
            return;
          }
          for (const [row, dataRow] of data.entries()) {
            if (row + targetRow >= rows) {
              break;
            }
            for (const [col, dataItem] of dataRow.entries()) {
              const index = [col + targetCol, row + targetRow];
              const [writeCol, writeRow] = index;
              if (writeCol >= mangledCols.length) {
                continue;
              }
              if (writeRow >= mangledRows) {
                continue;
              }
              const cellData_0 = getMangledCellContent(index);
              const newVal_2 = pasteToCell(cellData_0, index, dataItem.rawValue, dataItem.formatted);
              if (newVal_2 !== undefined) {
                editList.push(newVal_2);
              }
            }
          }
        } while (false);
        mangledOnCellsEdited(editList);
        (_gridRef$current = gridRef.current) === null || _gridRef$current === void 0 || _gridRef$current.damage(editList.map(_temp5));
      }
    };
    $[0] = canvasRef;
    $[1] = coercePasteValue;
    $[2] = getCellRenderer;
    $[3] = getMangledCellContent;
    $[4] = gridRef;
    $[5] = gridSelection;
    $[6] = keybindings.paste;
    $[7] = mangledCols;
    $[8] = mangledOnCellsEdited;
    $[9] = mangledRows;
    $[10] = onPaste;
    $[11] = rowMarkerOffset;
    $[12] = rows;
    $[13] = scrollRef;
    $[14] = t0;
  } else {
    t0 = $[14];
  }
  const onPasteInternal = t0;
  useEventListener("paste", onPasteInternal, safeWindow, false, true);
  let t1;
  if ($[15] !== abortControllerRef || $[16] !== canvasRef || $[17] !== columnsIn || $[18] !== copyHeaders || $[19] !== getCellsForSelection || $[20] !== gridSelection || $[21] !== keybindings.copy || $[22] !== rowMarkerOffset || $[23] !== rows || $[24] !== scrollRef) {
    t1 = async (e_0, ignoreFocus) => {
      var _scrollRef$current2, _canvasRef$current2;
      if (!keybindings.copy) {
        return;
      }
      const focused_0 = ignoreFocus === true || ((_scrollRef$current2 = scrollRef.current) === null || _scrollRef$current2 === void 0 ? void 0 : _scrollRef$current2.contains(document.activeElement)) === true || ((_canvasRef$current2 = canvasRef.current) === null || _canvasRef$current2 === void 0 ? void 0 : _canvasRef$current2.contains(document.activeElement)) === true;
      const selectedColumns_0 = gridSelection.columns;
      const selectedRows_0 = gridSelection.rows;
      const copyToClipboardWithHeaders = (cells, columnIndexes) => {
        if (!copyHeaders) {
          copyToClipboard(cells, columnIndexes, e_0);
        } else {
          const headers = columnIndexes.map(index_0 => ({
            kind: GridCellKind.Text,
            data: columnsIn[index_0].title,
            displayData: columnsIn[index_0].title,
            allowOverlay: false
          }));
          copyToClipboard([headers, ...cells], columnIndexes, e_0);
        }
      };
      if (focused_0 && getCellsForSelection !== undefined) {
        if (gridSelection.current !== undefined) {
          let thunk = getCellsForSelection(gridSelection.current.range, abortControllerRef.current.signal);
          if (typeof thunk !== "object") {
            thunk = await thunk();
          }
          copyToClipboardWithHeaders(thunk, range(gridSelection.current.range.x - rowMarkerOffset, gridSelection.current.range.x + gridSelection.current.range.width - rowMarkerOffset));
        } else {
          if (selectedRows_0 !== undefined && selectedRows_0.length > 0) {
            const toCopy = [...selectedRows_0];
            const cells_0 = toCopy.map(rowIndex => {
              const thunk_0 = getCellsForSelection({
                x: rowMarkerOffset,
                y: rowIndex,
                width: columnsIn.length,
                height: 1
              }, abortControllerRef.current.signal);
              if (typeof thunk_0 === "object") {
                return thunk_0[0];
              }
              return thunk_0().then(_temp6);
            });
            if (cells_0.some(_temp7)) {
              const settled = await Promise.all(cells_0);
              copyToClipboardWithHeaders(settled, range(columnsIn.length));
            } else {
              copyToClipboardWithHeaders(cells_0, range(columnsIn.length));
            }
          } else {
            if (selectedColumns_0.length > 0) {
              const results = [];
              const cols = [];
              for (const col_0 of selectedColumns_0) {
                let thunk_1 = getCellsForSelection({
                  x: col_0,
                  y: 0,
                  width: 1,
                  height: rows
                }, abortControllerRef.current.signal);
                if (typeof thunk_1 !== "object") {
                  thunk_1 = await thunk_1();
                }
                results.push(thunk_1);
                cols.push(col_0 - rowMarkerOffset);
              }
              if (results.length === 1) {
                copyToClipboardWithHeaders(results[0], cols);
              } else {
                const toCopy_0 = results.reduce(_temp8);
                copyToClipboardWithHeaders(toCopy_0, cols);
              }
            }
          }
        }
      }
    };
    $[15] = abortControllerRef;
    $[16] = canvasRef;
    $[17] = columnsIn;
    $[18] = copyHeaders;
    $[19] = getCellsForSelection;
    $[20] = gridSelection;
    $[21] = keybindings.copy;
    $[22] = rowMarkerOffset;
    $[23] = rows;
    $[24] = scrollRef;
    $[25] = t1;
  } else {
    t1 = $[25];
  }
  const onCopy = t1;
  useEventListener("copy", onCopy, safeWindow, false, false);
  let t2;
  if ($[26] !== canvasRef || $[27] !== deleteRange || $[28] !== gridSelection || $[29] !== keybindings.cut || $[30] !== onCopy || $[31] !== onDelete || $[32] !== scrollRef) {
    t2 = async e_1 => {
      var _scrollRef$current3, _canvasRef$current3;
      if (!keybindings.cut) {
        return;
      }
      const focused_1 = ((_scrollRef$current3 = scrollRef.current) === null || _scrollRef$current3 === void 0 ? void 0 : _scrollRef$current3.contains(document.activeElement)) === true || ((_canvasRef$current3 = canvasRef.current) === null || _canvasRef$current3 === void 0 ? void 0 : _canvasRef$current3.contains(document.activeElement)) === true;
      if (!focused_1) {
        return;
      }
      await onCopy(e_1);
      if (gridSelection.current !== undefined) {
        let effectiveSelection = {
          current: {
            cell: gridSelection.current.cell,
            range: gridSelection.current.range,
            rangeStack: []
          },
          rows: CompactSelection.empty(),
          columns: CompactSelection.empty()
        };
        const onDeleteResult = onDelete === null || onDelete === void 0 ? void 0 : onDelete(effectiveSelection);
        if (onDeleteResult === false) {
          return;
        }
        effectiveSelection = onDeleteResult === undefined || onDeleteResult === true ? effectiveSelection : onDeleteResult;
        if (effectiveSelection.current === undefined) {
          return;
        }
        deleteRange(effectiveSelection.current.range);
      }
    };
    $[26] = canvasRef;
    $[27] = deleteRange;
    $[28] = gridSelection;
    $[29] = keybindings.cut;
    $[30] = onCopy;
    $[31] = onDelete;
    $[32] = scrollRef;
    $[33] = t2;
  } else {
    t2 = $[33];
  }
  const onCut = t2;
  useEventListener("cut", onCut, safeWindow, false, false);
  let t3;
  if ($[34] !== onCopy || $[35] !== onCut || $[36] !== onPasteInternal) {
    t3 = {
      onCopy,
      onCut,
      onPasteInternal
    };
    $[34] = onCopy;
    $[35] = onCut;
    $[36] = onPasteInternal;
    $[37] = t3;
  } else {
    t3 = $[37];
  }
  return t3;
}
function _temp8(pv, cv) {
  return pv.map((row_0, index_1) => [...row_0, ...cv[index_1]]);
}
function _temp7(x) {
  return x instanceof Promise;
}
function _temp6(v) {
  return v[0];
}
function _temp5(c) {
  return {
    cell: c.location
  };
}
function _temp4(r_1) {
  return r_1.map(_temp3);
}
function _temp3(cb_0) {
  var _cb_0$rawValue$toStri, _cb_0$rawValue;
  return (_cb_0$rawValue$toStri = (_cb_0$rawValue = cb_0.rawValue) === null || _cb_0$rawValue === void 0 ? void 0 : _cb_0$rawValue.toString()) !== null && _cb_0$rawValue$toStri !== void 0 ? _cb_0$rawValue$toStri : "";
}
function _temp2(r_0) {
  return r_0.map(_temp).join("\t");
}
function _temp(cb) {
  return cb.rawValue;
}
//# sourceMappingURL=use-clipboard.js.map