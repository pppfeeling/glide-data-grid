import * as React from "react";
import { GhostInputBox } from "./ghost-input-style.js";
const GhostInputImpl = (props, ref) => {
  const {
    onInput,
    onCompositionStart,
    onCompositionEnd,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    disabled = false
  } = props;
  const textareaRef = React.useRef(null);
  const isComposingRef = React.useRef(false);
  const minDimensionsRef = React.useRef({
    width: 0,
    height: 0
  });
  const autoResize = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el || el.style.opacity === "0") return;
    const minWidth = minDimensionsRef.current.width;
    const minHeight = minDimensionsRef.current.height;
    el.style.width = `${minWidth}px`;
    el.style.height = `${minHeight}px`;
    const newWidth = Math.max(minWidth, el.scrollWidth + 2);
    const newHeight = Math.max(minHeight, el.scrollHeight + 2);
    el.style.width = `${newWidth}px`;
    el.style.height = `${newHeight}px`;
  }, []);
  React.useImperativeHandle(ref, () => ({
    focus: () => {
      var _textareaRef$current;
      (_textareaRef$current = textareaRef.current) === null || _textareaRef$current === void 0 || _textareaRef$current.focus({
        preventScroll: true
      });
    },
    blur: () => {
      var _textareaRef$current2;
      (_textareaRef$current2 = textareaRef.current) === null || _textareaRef$current2 === void 0 || _textareaRef$current2.blur();
    },
    clear: () => {
      if (textareaRef.current) {
        textareaRef.current.value = "";
        textareaRef.current.setSelectionRange(0, 0);
      }
    },
    getValue: () => {
      var _textareaRef$current$, _textareaRef$current3;
      return (_textareaRef$current$ = (_textareaRef$current3 = textareaRef.current) === null || _textareaRef$current3 === void 0 ? void 0 : _textareaRef$current3.value) !== null && _textareaRef$current$ !== void 0 ? _textareaRef$current$ : "";
    },
    setValue: value => {
      if (textareaRef.current) {
        textareaRef.current.value = value;
        const len = value.length;
        textareaRef.current.setSelectionRange(len, len);
      }
    },
    setPosition: (x, y, width, height) => {
      const el_0 = textareaRef.current;
      if (el_0) {
        minDimensionsRef.current = {
          width,
          height
        };
        el_0.style.left = `${x}px`;
        el_0.style.top = `${y}px`;
        el_0.style.width = `${width}px`;
        el_0.style.height = `${height}px`;
      }
    },
    setVisible: visible => {
      const el_1 = textareaRef.current;
      if (el_1) {
        if (visible) {
          el_1.style.opacity = "1";
          el_1.style.pointerEvents = "auto";
          el_1.style.zIndex = "10000";
        } else {
          el_1.style.left = "-9999px";
          el_1.style.top = "0";
          el_1.style.width = "1px";
          el_1.style.height = "1px";
          el_1.style.opacity = "0";
          el_1.style.pointerEvents = "none";
          el_1.style.zIndex = "0";
        }
      }
    }
  }));
  const handleInput = React.useCallback(e => {
    const target = e.currentTarget;
    onInput(target.value, isComposingRef.current);
    autoResize();
  }, [onInput, autoResize]);
  const handleCompositionStart = React.useCallback(() => {
    isComposingRef.current = true;
    onCompositionStart();
  }, [onCompositionStart]);
  const handleCompositionEnd = React.useCallback(e_0 => {
    isComposingRef.current = false;
    onCompositionEnd(e_0.currentTarget.value);
  }, [onCompositionEnd]);
  const handleKeyDown = React.useCallback(e_1 => {
    onKeyDown(e_1);
  }, [onKeyDown]);
  const handleKeyUp = React.useCallback(e_2 => {
    onKeyUp === null || onKeyUp === void 0 || onKeyUp(e_2);
  }, [onKeyUp]);
  return React.createElement(GhostInputBox, {
    ref: textareaRef,
    defaultValue: "",
    tabIndex: disabled ? -1 : 0,
    disabled: disabled,
    onInput: handleInput,
    onCompositionStart: handleCompositionStart,
    onCompositionEnd: handleCompositionEnd,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onFocus: onFocus,
    onBlur: onBlur,
    "aria-label": "Grid input",
    wrap: "off",
    rows: 1,
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: false
  });
};
export const GhostInput = React.memo(React.forwardRef(GhostInputImpl));
//# sourceMappingURL=ghost-input.js.map