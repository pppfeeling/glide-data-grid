import * as React from "react";
import { createPortal } from "react-dom";
import ClickOutsideContainer from "../click-outside-container/click-outside-container.js";
import { makeCSSStyle, ThemeContext } from "../../common/styles.js";
import { isEditableGridCell, isInnerOnlyCell, isObjectEditorCallbackResult } from "../data-grid/data-grid-types.js";
import { DataGridOverlayEditorStyle } from "./data-grid-overlay-editor-style.js";
import { useStayOnScreen } from "./use-stay-on-screen.js";
export const GhostModeContext = React.createContext({
  isGhostMode: false,
  ghostValue: ""
});
const DataGridOverlayEditor = p => {
  var _portalElementRef$cur, _bloom$, _bloom$2;
  const {
    target,
    content,
    onFinishEditing: onFinishEditingIn,
    forceEditMode,
    initialValue,
    imageEditorOverride,
    markdownDivCreateNode,
    highlight,
    className,
    theme,
    id,
    cell,
    bloom,
    portalElementRef,
    validateCell,
    getCellRenderer,
    provideEditor,
    isOutsideClick,
    customEventTarget,
    activation,
    ghostValue,
    isGhostMode
  } = p;
  const [tempValue, setTempValueRaw] = React.useState(forceEditMode ? content : undefined);
  const lastValueRef = React.useRef(tempValue !== null && tempValue !== void 0 ? tempValue : content);
  lastValueRef.current = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [isValid, setIsValid] = React.useState(() => {
    if (validateCell === undefined) return true;
    return !(isEditableGridCell(content) && (validateCell === null || validateCell === void 0 ? void 0 : validateCell(cell, content, lastValueRef.current)) === false);
  });
  const onFinishEditing = React.useCallback((newCell, movement) => {
    onFinishEditingIn(isValid ? newCell : undefined, movement);
  }, [isValid, onFinishEditingIn]);
  const setTempValue = React.useCallback(newVal => {
    if (validateCell !== undefined && newVal !== undefined && isEditableGridCell(newVal)) {
      const validResult = validateCell(cell, newVal, lastValueRef.current);
      if (validResult === false) {
        setIsValid(false);
      } else if (typeof validResult === "object") {
        newVal = validResult;
        setIsValid(true);
      } else {
        setIsValid(true);
      }
    }
    setTempValueRaw(newVal);
  }, [cell, validateCell]);
  const finished = React.useRef(false);
  const customMotion = React.useRef(undefined);
  const onClickOutside = React.useCallback(() => {
    onFinishEditing(tempValue, [0, 0]);
    finished.current = true;
  }, [tempValue, onFinishEditing]);
  const onEditorFinished = React.useCallback((newValue, movement_0) => {
    var _ref;
    console.log('[onEditorFinished] newValue:', newValue);
    console.log('[onEditorFinished] movement:', movement_0);
    console.log('[onEditorFinished] calling onFinishEditing');
    onFinishEditing(newValue, (_ref = movement_0 !== null && movement_0 !== void 0 ? movement_0 : customMotion.current) !== null && _ref !== void 0 ? _ref : [0, 0]);
    console.log('[onEditorFinished] onFinishEditing called');
    finished.current = true;
  }, [onFinishEditing]);
  const onKeyDown = React.useCallback(async event => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    let save = false;
    if (event.key === "Escape") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 0];
    } else if (event.key === "Enter" && !event.shiftKey) {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [0, 1];
      save = true;
    } else if (event.key === "Tab") {
      event.stopPropagation();
      event.preventDefault();
      customMotion.current = [event.shiftKey ? -1 : 1, 0];
      save = true;
    }
    window.setTimeout(() => {
      if (!finished.current && customMotion.current !== undefined) {
        onFinishEditing(save ? tempValue : undefined, customMotion.current);
        finished.current = true;
      }
    }, 0);
  }, [onFinishEditing, tempValue]);
  const targetValue = tempValue !== null && tempValue !== void 0 ? tempValue : content;
  const [editorProvider, useLabel] = React.useMemo(() => {
    var _getCellRenderer, _getCellRenderer$prov;
    if (isInnerOnlyCell(content)) return [];
    const cellWithLocation = {
      ...content,
      location: cell,
      activation
    };
    const external = provideEditor === null || provideEditor === void 0 ? void 0 : provideEditor(cellWithLocation);
    if (external !== undefined) return [external, false];
    return [(_getCellRenderer = getCellRenderer(content)) === null || _getCellRenderer === void 0 || (_getCellRenderer$prov = _getCellRenderer.provideEditor) === null || _getCellRenderer$prov === void 0 ? void 0 : _getCellRenderer$prov.call(_getCellRenderer, cellWithLocation), false];
  }, [cell, content, getCellRenderer, provideEditor, activation]);
  const {
    ref,
    style: stayOnScreenStyle
  } = useStayOnScreen();
  let pad = true;
  let editor;
  let style = true;
  let styleOverride;
  if (editorProvider !== undefined) {
    pad = editorProvider.disablePadding !== true;
    style = editorProvider.disableStyling !== true;
    const isObjectEditor = isObjectEditorCallbackResult(editorProvider);
    if (isObjectEditor) {
      styleOverride = editorProvider.styleOverride;
    }
    const CustomEditor = isObjectEditor ? editorProvider.editor : editorProvider;
    editor = React.createElement(CustomEditor, {
      portalElementRef: portalElementRef,
      isHighlighted: highlight,
      activation: activation,
      onChange: setTempValue,
      value: targetValue,
      initialValue: initialValue,
      onFinishedEditing: onEditorFinished,
      validatedSelection: isEditableGridCell(targetValue) ? targetValue.selectionRange : undefined,
      forceEditMode: forceEditMode,
      target: target,
      imageEditorOverride: imageEditorOverride,
      markdownDivCreateNode: markdownDivCreateNode,
      isValid: isValid,
      theme: theme
    });
  }
  styleOverride = {
    ...styleOverride,
    ...stayOnScreenStyle
  };
  const ghostModeContextValue = React.useMemo(() => ({
    isGhostMode: isGhostMode !== null && isGhostMode !== void 0 ? isGhostMode : false,
    ghostValue: ghostValue !== null && ghostValue !== void 0 ? ghostValue : ""
  }), [isGhostMode, ghostValue]);
  const portalElement = (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal");
  if (portalElement === null) {
    console.error('Cannot open Data Grid overlay editor, because portal not found. Please, either provide a portalElementRef or add `<div id="portal" />` as the last child of your `<body>`.');
    return null;
  }
  let classWrap = style ? "gdg-style" : "gdg-unstyle";
  if (!isValid) {
    classWrap += " gdg-invalid";
  }
  if (pad) {
    classWrap += " gdg-pad";
  }
  const bloomX = (_bloom$ = bloom === null || bloom === void 0 ? void 0 : bloom[0]) !== null && _bloom$ !== void 0 ? _bloom$ : 1;
  const bloomY = (_bloom$2 = bloom === null || bloom === void 0 ? void 0 : bloom[1]) !== null && _bloom$2 !== void 0 ? _bloom$2 : 1;
  return createPortal(React.createElement(ThemeContext.Provider, {
    value: theme
  }, React.createElement(GhostModeContext.Provider, {
    value: ghostModeContextValue
  }, React.createElement(ClickOutsideContainer, {
    style: makeCSSStyle(theme),
    className: className,
    onClickOutside: onClickOutside,
    isOutsideClick: isOutsideClick,
    customEventTarget: customEventTarget
  }, React.createElement(DataGridOverlayEditorStyle, {
    ref: ref,
    id: id,
    className: classWrap,
    style: isGhostMode ? {
      ...styleOverride,
      visibility: "hidden"
    } : styleOverride,
    as: useLabel === true ? "label" : undefined,
    targetX: target.x - bloomX,
    targetY: target.y - bloomY,
    targetWidth: target.width + bloomX * 2,
    targetHeight: target.height + bloomY * 2
  }, React.createElement("div", {
    className: "gdg-clip-region",
    onKeyDown: onKeyDown
  }, editor))))), portalElement);
};
export default DataGridOverlayEditor;
//# sourceMappingURL=data-grid-overlay-editor.js.map