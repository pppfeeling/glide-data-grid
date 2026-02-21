import { assertNever } from "../common/support.js";
import { BooleanEmpty, BooleanIndeterminate, GridCellKind } from "../internal/data-grid/data-grid-types.js";
function convertCellToBuffer(cell) {
  var _cell$displayData, _cell$displayData2;
  if (cell.copyData !== undefined) {
    return {
      formatted: cell.copyData,
      rawValue: cell.copyData,
      format: "string",
      doNotEscape: true
    };
  }
  switch (cell.kind) {
    case GridCellKind.Boolean:
      return {
        formatted: cell.data === true ? "TRUE" : cell.data === false ? "FALSE" : cell.data === BooleanIndeterminate ? "INDETERMINATE" : "",
        rawValue: cell.data,
        format: "boolean"
      };
    case GridCellKind.Custom:
      return {
        formatted: cell.copyData,
        rawValue: cell.copyData,
        format: "string"
      };
    case GridCellKind.Image:
    case GridCellKind.Bubble:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string-array"
      };
    case GridCellKind.Drilldown:
      return {
        formatted: cell.data.map(x => x.text),
        rawValue: cell.data.map(x => x.text),
        format: "string-array"
      };
    case GridCellKind.Text:
      return {
        formatted: (_cell$displayData = cell.displayData) !== null && _cell$displayData !== void 0 ? _cell$displayData : cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case GridCellKind.Uri:
      return {
        formatted: (_cell$displayData2 = cell.displayData) !== null && _cell$displayData2 !== void 0 ? _cell$displayData2 : cell.data,
        rawValue: cell.data,
        format: "url"
      };
    case GridCellKind.Markdown:
    case GridCellKind.RowID:
      return {
        formatted: cell.data,
        rawValue: cell.data,
        format: "string"
      };
    case GridCellKind.Number:
      return {
        formatted: cell.displayData,
        rawValue: cell.data,
        format: "number"
      };
    case GridCellKind.Loading:
      return {
        formatted: "#LOADING",
        rawValue: "",
        format: "string"
      };
    case GridCellKind.Protected:
      return {
        formatted: "************",
        rawValue: "",
        format: "string"
      };
    default:
      assertNever(cell);
  }
}
function createBufferFromGridCells(cells, columnIndexes) {
  const copyBuffer = cells.map((row, index) => {
    const mappedIndex = columnIndexes[index];
    return row.map(cell => {
      if (cell.span !== undefined && cell.span[0] !== mappedIndex) return {
        formatted: "",
        rawValue: "",
        format: "string"
      };
      return convertCellToBuffer(cell);
    });
  });
  return copyBuffer;
}
function escapeIfNeeded(str, withComma) {
  if ((withComma ? /[\t\n",]/ : /[\t\n"]/).test(str)) {
    str = `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}
function createTextBuffer(copyBuffer) {
  const lines = [];
  for (const row of copyBuffer) {
    const line = [];
    for (const cell of row) {
      if (cell.format === "url") {
        var _cell$rawValue$toStri, _cell$rawValue;
        line.push((_cell$rawValue$toStri = (_cell$rawValue = cell.rawValue) === null || _cell$rawValue === void 0 ? void 0 : _cell$rawValue.toString()) !== null && _cell$rawValue$toStri !== void 0 ? _cell$rawValue$toStri : "");
      } else if (cell.format === "string-array") {
        line.push(cell.formatted.map(x => escapeIfNeeded(x, true)).join(","));
      } else {
        line.push(cell.doNotEscape === true ? cell.formatted : escapeIfNeeded(cell.formatted, false));
      }
    }
    lines.push(line.join("\t"));
  }
  return lines.join("\n");
}
function formatHtmlTextContent(text) {
  return text.replace(/\t/g, "    ").replace(/ {2,}/g, match => "<span> </span>".repeat(match.length));
}
function formatHtmlAttributeContent(attrText) {
  return '"' + attrText.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + '"';
}
function restoreHtmlEntities(str) {
  return str.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
}
function createHtmlBuffer(copyBuffer) {
  const lines = [];
  lines.push(`<style type="text/css"><!--br {mso-data-placement:same-cell;}--></style>`, "<table><tbody>");
  for (const row of copyBuffer) {
    lines.push("<tr>");
    for (const cell of row) {
      const formatStr = `gdg-format="${cell.format}"`;
      if (cell.format === "url") {
        lines.push(`<td ${formatStr}><a href="${cell.rawValue}">${formatHtmlTextContent(cell.formatted)}</a></td>`);
      } else {
        if (cell.format === "string-array") {
          lines.push(`<td ${formatStr}><ol>${cell.formatted.map((x, ind) => `<li gdg-raw-value=${formatHtmlAttributeContent(cell.rawValue[ind])}>` + formatHtmlTextContent(x) + "</li>").join("")}</ol></td>`);
        } else {
          var _cell$rawValue$toStri2, _cell$rawValue2;
          lines.push(`<td gdg-raw-value=${formatHtmlAttributeContent((_cell$rawValue$toStri2 = (_cell$rawValue2 = cell.rawValue) === null || _cell$rawValue2 === void 0 ? void 0 : _cell$rawValue2.toString()) !== null && _cell$rawValue$toStri2 !== void 0 ? _cell$rawValue$toStri2 : "")} ${formatStr}>${formatHtmlTextContent(cell.formatted)}</td>`);
        }
      }
    }
    lines.push("</tr>");
  }
  lines.push("</tbody></table>");
  return lines.join("");
}
export function getCopyBufferContents(cells, columnIndexes) {
  const copyBuffer = createBufferFromGridCells(cells, columnIndexes);
  const textPlain = createTextBuffer(copyBuffer);
  const textHtml = createHtmlBuffer(copyBuffer);
  return {
    textPlain,
    textHtml
  };
}
export function decodeHTML(html) {
  const fragment = document.createElement("html");
  fragment.innerHTML = html.replace(/&nbsp;/g, " ");
  const tableEl = fragment.querySelector("table");
  if (tableEl === null) return undefined;
  const walkEl = [tableEl];
  const result = [];
  let current;
  while (walkEl.length > 0) {
    const el = walkEl.pop();
    if (el === undefined) break;
    if (el instanceof HTMLTableElement || el.nodeName === "TBODY") {
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableRowElement) {
      if (current !== undefined) {
        result.push(current);
      }
      current = [];
      walkEl.push(...[...el.children].reverse());
    } else if (el instanceof HTMLTableCellElement) {
      var _clone$getAttribute;
      const clone = el.cloneNode(true);
      const firstTagIsPara = clone.children.length === 1 && clone.children[0].nodeName === "P";
      const para = firstTagIsPara ? clone.children[0] : null;
      const isAppleNumbers = (para === null || para === void 0 ? void 0 : para.children.length) === 1 && para.children[0].nodeName === "FONT";
      const brs = clone.querySelectorAll("br");
      for (const br of brs) {
        br.replaceWith("\n");
      }
      const attributeValue = clone.getAttribute("gdg-raw-value");
      const formatValue = (_clone$getAttribute = clone.getAttribute("gdg-format")) !== null && _clone$getAttribute !== void 0 ? _clone$getAttribute : "string";
      if (clone.querySelector("a") !== null) {
        var _current, _clone$querySelector$, _clone$querySelector, _clone$textContent;
        (_current = current) === null || _current === void 0 || _current.push({
          rawValue: (_clone$querySelector$ = (_clone$querySelector = clone.querySelector("a")) === null || _clone$querySelector === void 0 ? void 0 : _clone$querySelector.getAttribute("href")) !== null && _clone$querySelector$ !== void 0 ? _clone$querySelector$ : "",
          formatted: (_clone$textContent = clone.textContent) !== null && _clone$textContent !== void 0 ? _clone$textContent : "",
          format: formatValue
        });
      } else if (clone.querySelector("ol") !== null) {
        var _current2;
        const rawValues = clone.querySelectorAll("li");
        (_current2 = current) === null || _current2 === void 0 || _current2.push({
          rawValue: [...rawValues].map(x => {
            var _x$getAttribute;
            return (_x$getAttribute = x.getAttribute("gdg-raw-value")) !== null && _x$getAttribute !== void 0 ? _x$getAttribute : "";
          }),
          formatted: [...rawValues].map(x => {
            var _x$textContent;
            return (_x$textContent = x.textContent) !== null && _x$textContent !== void 0 ? _x$textContent : "";
          }),
          format: "string-array"
        });
      } else if (attributeValue !== null) {
        var _current3, _clone$textContent2;
        (_current3 = current) === null || _current3 === void 0 || _current3.push({
          rawValue: restoreHtmlEntities(attributeValue),
          formatted: (_clone$textContent2 = clone.textContent) !== null && _clone$textContent2 !== void 0 ? _clone$textContent2 : "",
          format: formatValue
        });
      } else {
        var _clone$textContent3, _current4;
        let textContent = (_clone$textContent3 = clone.textContent) !== null && _clone$textContent3 !== void 0 ? _clone$textContent3 : "";
        if (isAppleNumbers) {
          textContent = textContent.replace(/\n(?!\n)/g, "");
        }
        (_current4 = current) === null || _current4 === void 0 || _current4.push({
          rawValue: textContent !== null && textContent !== void 0 ? textContent : "",
          formatted: textContent !== null && textContent !== void 0 ? textContent : "",
          format: formatValue
        });
      }
    }
  }
  if (current !== undefined) {
    result.push(current);
  }
  return result;
}
//# sourceMappingURL=copy-paste.js.map