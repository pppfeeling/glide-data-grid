import * as React from "react";
import { styled } from "@linaria/react";
import Select, { components } from "react-select";
import { getMiddleCenterBias, useTheme, GridCellKind, TextCellEntry } from "@glideapps/glide-data-grid";
const CustomMenu = p => {
  const {
    Menu
  } = components;
  const {
    children,
    ...rest
  } = p;
  return React.createElement(Menu, {
    ...rest
  }, children);
};
const Wrap = /*#__PURE__*/styled('div')({
  name: "Wrap",
  class: "gdg-wghi2zc",
  propsAsIs: false
});
const PortalWrap = /*#__PURE__*/styled('div')({
  name: "PortalWrap",
  class: "gdg-p13nj8j0",
  propsAsIs: false
});
const ReadOnlyWrap = /*#__PURE__*/styled('div')({
  name: "ReadOnlyWrap",
  class: "gdg-r6sia3g",
  propsAsIs: false
});
const Editor = p => {
  var _portalElementRef$cur;
  const {
    value: cell,
    onFinishedEditing,
    initialValue,
    portalElementRef
  } = p;
  const {
    allowedValues,
    value: valueIn
  } = cell.data;
  const [value, setValue] = React.useState(valueIn);
  const [inputValue, setInputValue] = React.useState(initialValue !== null && initialValue !== void 0 ? initialValue : "");
  const theme = useTheme();
  const values = React.useMemo(() => {
    return allowedValues.map(option => {
      if (typeof option === "string" || option === null || option === undefined) {
        var _option$toString;
        return {
          value: option,
          label: (_option$toString = option === null || option === void 0 ? void 0 : option.toString()) !== null && _option$toString !== void 0 ? _option$toString : ""
        };
      }
      return option;
    });
  }, [allowedValues]);
  if (cell.readonly) {
    return React.createElement(ReadOnlyWrap, null, React.createElement(TextCellEntry, {
      highlight: true,
      autoFocus: false,
      disabled: true,
      value: value !== null && value !== void 0 ? value : "",
      onChange: () => undefined
    }));
  }
  return React.createElement(Wrap, null, React.createElement(Select, {
    className: "glide-select",
    inputValue: inputValue,
    onInputChange: setInputValue,
    menuPlacement: "auto",
    value: values.find(x => x.value === value),
    styles: {
      control: base => ({
        ...base,
        border: 0,
        boxShadow: "none"
      }),
      option: (base_0, _ref) => {
        let {
          isFocused
        } = _ref;
        return {
          ...base_0,
          fontSize: theme.editorFontSize,
          fontFamily: theme.fontFamily,
          cursor: isFocused ? "pointer" : undefined,
          paddingLeft: theme.cellHorizontalPadding,
          paddingRight: theme.cellHorizontalPadding,
          ":active": {
            ...base_0[":active"],
            color: theme.accentFg
          },
          ":empty::after": {
            content: '"&nbsp;"',
            visibility: "hidden"
          }
        };
      }
    },
    theme: t => {
      return {
        ...t,
        colors: {
          ...t.colors,
          neutral0: theme.bgCell,
          neutral5: theme.bgCell,
          neutral10: theme.bgCell,
          neutral20: theme.bgCellMedium,
          neutral30: theme.bgCellMedium,
          neutral40: theme.bgCellMedium,
          neutral50: theme.textLight,
          neutral60: theme.textMedium,
          neutral70: theme.textMedium,
          neutral80: theme.textDark,
          neutral90: theme.textDark,
          neutral100: theme.textDark,
          primary: theme.accentColor,
          primary75: theme.accentColor,
          primary50: theme.accentColor,
          primary25: theme.accentLight
        }
      };
    },
    menuPortalTarget: (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal"),
    autoFocus: true,
    openMenuOnFocus: true,
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Menu: props => React.createElement(PortalWrap, null, React.createElement(CustomMenu, {
        className: "click-outside-ignore",
        ...props
      }))
    },
    options: values,
    onChange: async e => {
      if (e === null) return;
      setValue(e.value);
      await new Promise(r => window.requestAnimationFrame(r));
      onFinishedEditing({
        ...cell,
        data: {
          ...cell.data,
          value: e.value
        }
      });
    }
  }));
};
const renderer = {
  kind: GridCellKind.Custom,
  isMatch: c => c.data.kind === "dropdown-cell",
  draw: (args, cell) => {
    var _foundOption$label;
    const {
      ctx,
      theme,
      rect
    } = args;
    const {
      value
    } = cell.data;
    const foundOption = cell.data.allowedValues.find(opt => {
      if (typeof opt === "string" || opt === null || opt === undefined) {
        return opt === value;
      }
      return opt.value === value;
    });
    const displayText = typeof foundOption === "string" ? foundOption : (_foundOption$label = foundOption === null || foundOption === void 0 ? void 0 : foundOption.label) !== null && _foundOption$label !== void 0 ? _foundOption$label : "";
    if (displayText) {
      ctx.fillStyle = theme.textDark;
      ctx.fillText(displayText, rect.x + theme.cellHorizontalPadding, rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme));
    }
    return true;
  },
  measure: (ctx, cell, theme) => {
    const {
      value
    } = cell.data;
    return (value ? ctx.measureText(value).width : 0) + theme.cellHorizontalPadding * 2;
  },
  provideEditor: () => ({
    editor: Editor,
    disablePadding: true,
    deletedValue: v => ({
      ...v,
      copyData: "",
      data: {
        ...v.data,
        value: ""
      }
    })
  }),
  onPaste: (v, d) => ({
    ...d,
    value: d.allowedValues.some(option => {
      if (option === null || option === undefined) return false;
      if (typeof option === "string") return option === v;
      return option.value === v;
    }) ? v : d.value
  })
};
export default renderer;

