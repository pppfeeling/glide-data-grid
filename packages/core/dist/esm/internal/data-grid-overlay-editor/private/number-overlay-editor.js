import * as React from "react";
import { NumberOverlayEditorStyle } from "./number-overlay-editor-style.js";
import { NumericFormat } from "react-number-format";
import { GhostModeContext } from "../data-grid-overlay-editor.js";
function getDecimalSeparator() {
  var _Intl$NumberFormat;
  const numberWithDecimalSeparator = 1.1;
  const result = (_Intl$NumberFormat = Intl.NumberFormat()) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.formatToParts(numberWithDecimalSeparator)) === null || _Intl$NumberFormat === void 0 || (_Intl$NumberFormat = _Intl$NumberFormat.find(part => part.type === "decimal")) === null || _Intl$NumberFormat === void 0 ? void 0 : _Intl$NumberFormat.value;
  return result !== null && result !== void 0 ? result : ".";
}
function getThousandSeprator() {
  return getDecimalSeparator() === "." ? "," : ".";
}
const NumberOverlayEditor = p => {
  const {
    value,
    onChange,
    onKeyDown,
    disabled,
    highlight,
    validatedSelection,
    fixedDecimals,
    allowNegative,
    thousandSeparator,
    decimalSeparator
  } = p;
  const inputRef = React.useRef();
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  React.useLayoutEffect(() => {
    if (validatedSelection !== undefined) {
      var _inputRef$current;
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  const ghostStyle = isGhostMode ? {
    visibility: "hidden"
  } : undefined;
  return React.createElement(NumberOverlayEditorStyle, {
    style: ghostStyle
  }, React.createElement(NumericFormat, {
    autoFocus: !isGhostMode,
    getInputRef: inputRef,
    className: "gdg-input",
    onFocus: e => e.target.setSelectionRange(highlight ? 0 : e.target.value.length, e.target.value.length),
    onKeyDown: onKeyDown,
    disabled: disabled === true,
    decimalScale: fixedDecimals,
    allowNegative: allowNegative,
    thousandSeparator: thousandSeparator !== null && thousandSeparator !== void 0 ? thousandSeparator : getThousandSeprator(),
    decimalSeparator: decimalSeparator !== null && decimalSeparator !== void 0 ? decimalSeparator : getDecimalSeparator(),
    value: Object.is(value, -0) ? "-" : value !== null && value !== void 0 ? value : "",
    onValueChange: onChange
  }));
};
export default NumberOverlayEditor;
//# sourceMappingURL=number-overlay-editor.js.map