import * as React from "react";
import { GrowingEntryStyle, ShadowBox, InputBox } from "./growing-entry-style.js";
import { assert } from "../../common/support.js";
import { GhostModeContext } from "../data-grid-overlay-editor/data-grid-overlay-editor.js";
let globalInputID = 0;
export const GrowingEntry = props => {
  const {
    placeholder,
    value,
    onKeyDown,
    highlight,
    altNewline,
    validatedSelection,
    autoFocus: _autoFocus,
    ...rest
  } = props;
  const {
    onChange,
    className
  } = rest;
  const inputRef = React.useRef(null);
  const {
    isGhostMode,
    ghostValue
  } = React.useContext(GhostModeContext);
  const useText = isGhostMode && ghostValue ? ghostValue : value !== null && value !== void 0 ? value : "";
  assert(onChange !== undefined, "GrowingEntry must be a controlled input area");
  const [inputID] = React.useState(() => "input-box-" + (globalInputID = (globalInputID + 1) % 10000000));
  React.useEffect(() => {
    if (isGhostMode) return;
    const ta = inputRef.current;
    if (ta === null) return;
    if (ta.disabled) return;
    const length = useText.toString().length;
    ta.focus();
    ta.setSelectionRange(highlight ? 0 : length, length);
  }, [isGhostMode]);
  React.useLayoutEffect(() => {
    if (validatedSelection !== undefined) {
      var _inputRef$current;
      const range = typeof validatedSelection === "number" ? [validatedSelection, null] : validatedSelection;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.setSelectionRange(range[0], range[1]);
    }
  }, [validatedSelection]);
  const onKeyDownInner = React.useCallback(e => {
    if (e.key === "Enter" && e.shiftKey && altNewline === true) {
      return;
    }
    onKeyDown === null || onKeyDown === void 0 || onKeyDown(e);
  }, [altNewline, onKeyDown]);
  const inputStyle = isGhostMode ? {
    visibility: "hidden"
  } : undefined;
  return React.createElement(GrowingEntryStyle, {
    className: "gdg-growing-entry"
  }, React.createElement(ShadowBox, {
    className: className
  }, useText + "\n"), React.createElement(InputBox, {
    ...rest,
    className: (className !== null && className !== void 0 ? className : "") + " gdg-input",
    id: inputID,
    ref: inputRef,
    onKeyDown: onKeyDownInner,
    value: useText,
    placeholder: placeholder,
    dir: "auto",
    style: inputStyle
  }));
};
//# sourceMappingURL=growing-entry.js.map