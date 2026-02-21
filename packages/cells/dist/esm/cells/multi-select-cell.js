import * as React from "react";
import { measureTextCached, getMiddleCenterBias, useTheme, GridCellKind, roundedRect, getLuminance } from "@glideapps/glide-data-grid";
import { styled } from "@linaria/react";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
const VALUE_PREFIX = "__value";
const VALUE_PREFIX_REGEX = new RegExp(`^${VALUE_PREFIX}\\d+__`);
const Wrap = /*#__PURE__*/styled('div')({
  name: "Wrap",
  class: "gdg-w1i61rz",
  propsAsIs: false
});
const PortalWrap = /*#__PURE__*/styled('div')({
  name: "PortalWrap",
  class: "gdg-phbadu4",
  propsAsIs: false
});
export const prepareOptions = options => {
  return options.map(option => {
    var _ref, _option$label, _option$color;
    if (typeof option === "string" || option === null || option === undefined) {
      return {
        value: option,
        label: option !== null && option !== void 0 ? option : "",
        color: undefined
      };
    }
    return {
      value: option.value,
      label: (_ref = (_option$label = option.label) !== null && _option$label !== void 0 ? _option$label : option.value) !== null && _ref !== void 0 ? _ref : "",
      color: (_option$color = option.color) !== null && _option$color !== void 0 ? _option$color : undefined
    };
  });
};
export const resolveValues = (values, options, allowDuplicates) => {
  if (values === undefined || values === null) {
    return [];
  }
  return values.map((value, index) => {
    const valuePrefix = allowDuplicates ? `${VALUE_PREFIX}${index}__` : "";
    const matchedOption = options.find(option => {
      return option.value === value;
    });
    if (matchedOption) {
      return {
        ...matchedOption,
        value: `${valuePrefix}${matchedOption.value}`
      };
    }
    return {
      value: `${valuePrefix}${value}`,
      label: value
    };
  });
};
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
const Editor = p => {
  var _portalElementRef$cur;
  const {
    value: cell,
    initialValue,
    onChange,
    onFinishedEditing,
    portalElementRef
  } = p;
  const {
    options: optionsIn,
    values: valuesIn,
    allowCreation,
    allowDuplicates
  } = cell.data;
  const theme = useTheme();
  const [value, setValue] = React.useState(valuesIn);
  const [menuOpen, setMenuOpen] = React.useState(true);
  const [inputValue, setInputValue] = React.useState(initialValue !== null && initialValue !== void 0 ? initialValue : "");
  const options = React.useMemo(() => {
    return prepareOptions(optionsIn !== null && optionsIn !== void 0 ? optionsIn : []);
  }, [optionsIn]);
  const menuDisabled = allowCreation && allowDuplicates && options.length === 0;
  const onKeyDown = React.useCallback(e => {
    if (menuOpen) {
      e.stopPropagation();
    }
  }, [menuOpen]);
  const colorStyles = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      backgroundColor: theme.bgCell,
      pointerEvents: state.isDisabled ? "auto" : base.pointerEvents,
      cursor: state.isDisabled ? "default" : base.cursor
    }),
    valueContainer: base_0 => {
      var _base_0$flexWrap;
      return {
        ...base_0,
        flexWrap: (_base_0$flexWrap = base_0.flexWrap) !== null && _base_0$flexWrap !== void 0 ? _base_0$flexWrap : "wrap",
        overflowX: "auto",
        overflowY: "hidden"
      };
    },
    menu: styles => ({
      ...styles,
      backgroundColor: theme.bgCell
    }),
    option: (styles_0, state_0) => {
      return {
        ...styles_0,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textDark,
        ...(state_0.isFocused ? {
          backgroundColor: theme.accentLight,
          cursor: "pointer"
        } : {}),
        ":active": {
          ...styles_0[":active"],
          color: theme.accentFg,
          backgroundColor: theme.accentColor
        }
      };
    },
    input: (styles_1, _ref2) => {
      let {
        isDisabled
      } = _ref2;
      if (isDisabled) {
        return {
          display: "none"
        };
      }
      return {
        ...styles_1,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textDark
      };
    },
    placeholder: styles_2 => {
      return {
        ...styles_2,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textLight
      };
    },
    noOptionsMessage: styles_3 => {
      return {
        ...styles_3,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        color: theme.textLight
      };
    },
    clearIndicator: styles_4 => {
      return {
        ...styles_4,
        color: theme.textLight,
        ":hover": {
          color: theme.textDark,
          cursor: "pointer"
        }
      };
    },
    multiValue: (styles_5, _ref3) => {
      var _data$color, _theme$roundingRadius;
      let {
        data
      } = _ref3;
      return {
        ...styles_5,
        backgroundColor: (_data$color = data.color) !== null && _data$color !== void 0 ? _data$color : theme.bgBubble,
        borderRadius: `${(_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : theme.bubbleHeight / 2}px`,
        flexShrink: 0,
        whiteSpace: "nowrap"
      };
    },
    multiValueLabel: (styles_6, _ref4) => {
      let {
        data: data_0,
        isDisabled: isDisabled_0
      } = _ref4;
      return {
        ...styles_6,
        paddingRight: isDisabled_0 ? theme.bubblePadding : 0,
        paddingLeft: theme.bubblePadding,
        paddingTop: 0,
        paddingBottom: 0,
        color: data_0.color ? getLuminance(data_0.color) > 0.5 ? "black" : "white" : theme.textBubble,
        fontSize: theme.editorFontSize,
        fontFamily: theme.fontFamily,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        height: theme.bubbleHeight,
        whiteSpace: "nowrap"
      };
    },
    multiValueRemove: (styles_7, _ref5) => {
      var _theme$roundingRadius2;
      let {
        data: data_1,
        isDisabled: isDisabled_1,
        isFocused
      } = _ref5;
      if (isDisabled_1) {
        return {
          display: "none"
        };
      }
      return {
        ...styles_7,
        color: data_1.color ? getLuminance(data_1.color) > 0.5 ? "black" : "white" : theme.textBubble,
        backgroundColor: undefined,
        borderRadius: isFocused ? `${(_theme$roundingRadius2 = theme.roundingRadius) !== null && _theme$roundingRadius2 !== void 0 ? _theme$roundingRadius2 : theme.bubbleHeight / 2}px` : undefined,
        ":hover": {
          cursor: "pointer"
        }
      };
    }
  };
  const submitValues = React.useCallback(values => {
    const mappedValues = values.map(v => {
      return allowDuplicates && v.startsWith(VALUE_PREFIX) ? v.replace(new RegExp(VALUE_PREFIX_REGEX), "") : v;
    });
    setValue(mappedValues);
    onChange({
      ...cell,
      data: {
        ...cell.data,
        values: mappedValues
      }
    });
  }, [cell, onChange, allowDuplicates]);
  const handleKeyDown = event => {
    if (event.nativeEvent.isComposing) {
      return;
    }
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (!inputValue) {
          onFinishedEditing(cell, [0, 1]);
          return;
        }
        if (allowDuplicates && allowCreation) {
          setInputValue("");
          submitValues([...(value !== null && value !== void 0 ? value : []), inputValue]);
          setMenuOpen(false);
          event.preventDefault();
        }
    }
  };
  const SelectComponent = allowCreation ? CreatableSelect : Select;
  return React.createElement(Wrap, {
    onKeyDown: onKeyDown,
    "data-testid": "multi-select-cell"
  }, React.createElement(SelectComponent, {
    className: "gdg-multi-select",
    isMulti: true,
    isDisabled: cell.readonly,
    isClearable: true,
    isSearchable: true,
    inputValue: inputValue,
    onInputChange: setInputValue,
    options: options,
    placeholder: cell.readonly ? "" : allowCreation ? "Add..." : undefined,
    noOptionsMessage: input => {
      return allowCreation && allowDuplicates && input.inputValue ? `Create "${input.inputValue}"` : undefined;
    },
    menuIsOpen: cell.readonly ? false : menuOpen,
    onMenuOpen: () => setMenuOpen(true),
    onMenuClose: () => setMenuOpen(false),
    value: resolveValues(value, options, allowDuplicates),
    onKeyDown: cell.readonly ? undefined : handleKeyDown,
    menuPlacement: "auto",
    menuPortalTarget: (_portalElementRef$cur = portalElementRef === null || portalElementRef === void 0 ? void 0 : portalElementRef.current) !== null && _portalElementRef$cur !== void 0 ? _portalElementRef$cur : document.getElementById("portal"),
    autoFocus: true,
    openMenuOnFocus: true,
    openMenuOnClick: true,
    closeMenuOnSelect: true,
    backspaceRemovesValue: true,
    escapeClearsValue: false,
    styles: colorStyles,
    components: {
      DropdownIndicator: () => null,
      IndicatorSeparator: () => null,
      Menu: props => {
        if (menuDisabled) {
          return null;
        }
        return React.createElement(PortalWrap, null, React.createElement(CustomMenu, {
          className: "click-outside-ignore",
          ...props
        }));
      }
    },
    onChange: async e_0 => {
      if (e_0 === null) {
        return;
      }
      submitValues(e_0.map(x => x.value));
    }
  }));
};
const renderer = {
  kind: GridCellKind.Custom,
  isMatch: c => c.data.kind === "multi-select-cell",
  draw: (args, cell) => {
    const {
      ctx,
      theme,
      rect,
      highlighted
    } = args;
    const {
      values,
      options: optionsIn
    } = cell.data;
    if (values === undefined || values === null) {
      return true;
    }
    const options = prepareOptions(optionsIn !== null && optionsIn !== void 0 ? optionsIn : []);
    const drawArea = {
      x: rect.x + theme.cellHorizontalPadding,
      y: rect.y + theme.cellVerticalPadding,
      width: rect.width - 2 * theme.cellHorizontalPadding,
      height: rect.height - 2 * theme.cellVerticalPadding
    };
    const rows = Math.max(1, Math.floor(drawArea.height / (theme.bubbleHeight + theme.bubblePadding)));
    let {
      x
    } = drawArea;
    let row = 1;
    let y = rows === 1 ? drawArea.y + (drawArea.height - theme.bubbleHeight) / 2 : drawArea.y + (drawArea.height - rows * theme.bubbleHeight - (rows - 1) * theme.bubblePadding) / 2;
    for (const value of values) {
      var _matchedOption$color, _matchedOption$label, _theme$roundingRadius3;
      const matchedOption = options.find(t => t.value === value);
      const color = (_matchedOption$color = matchedOption === null || matchedOption === void 0 ? void 0 : matchedOption.color) !== null && _matchedOption$color !== void 0 ? _matchedOption$color : highlighted ? theme.bgBubbleSelected : theme.bgBubble;
      const displayText = (_matchedOption$label = matchedOption === null || matchedOption === void 0 ? void 0 : matchedOption.label) !== null && _matchedOption$label !== void 0 ? _matchedOption$label : value;
      const metrics = measureTextCached(displayText, ctx);
      const width = metrics.width + theme.bubblePadding * 2;
      const textY = theme.bubbleHeight / 2;
      if (x !== drawArea.x && x + width > drawArea.x + drawArea.width && row < rows) {
        row++;
        y += theme.bubbleHeight + theme.bubblePadding;
        x = drawArea.x;
      }
      ctx.fillStyle = color;
      ctx.beginPath();
      roundedRect(ctx, x, y, width, theme.bubbleHeight, (_theme$roundingRadius3 = theme.roundingRadius) !== null && _theme$roundingRadius3 !== void 0 ? _theme$roundingRadius3 : theme.bubbleHeight / 2);
      ctx.fill();
      ctx.fillStyle = matchedOption !== null && matchedOption !== void 0 && matchedOption.color ? getLuminance(color) > 0.5 ? "#000000" : "#ffffff" : theme.textBubble;
      ctx.fillText(displayText, x + theme.bubblePadding, y + textY + getMiddleCenterBias(ctx, theme));
      x += width + theme.bubbleMargin;
      if (x > drawArea.x + drawArea.width + theme.cellHorizontalPadding && row >= rows) {
        break;
      }
    }
    return true;
  },
  measure: (ctx, cell, theme) => {
    const {
      values,
      options
    } = cell.data;
    if (!values) {
      return theme.cellHorizontalPadding * 2;
    }
    const labels = resolveValues(values, prepareOptions(options !== null && options !== void 0 ? options : []), cell.data.allowDuplicates).map(x => {
      var _x$label;
      return (_x$label = x.label) !== null && _x$label !== void 0 ? _x$label : x.value;
    });
    const bubblesWidth = labels.reduce((acc, data) => ctx.measureText(data).width + acc + theme.bubblePadding * 2 + theme.bubbleMargin, 0);
    if (labels.length === 0) {
      return theme.cellHorizontalPadding * 2;
    }
    return bubblesWidth + 2 * theme.cellHorizontalPadding - theme.bubbleMargin;
  },
  provideEditor: () => ({
    editor: Editor,
    disablePadding: true,
    deletedValue: v => ({
      ...v,
      copyData: "",
      data: {
        ...v.data,
        values: []
      }
    })
  }),
  onPaste: (val, cell) => {
    if (!val || !val.trim()) {
      return {
        ...cell,
        values: []
      };
    }
    let values = val.split(",").map(s => s.trim());
    if (!cell.allowDuplicates) {
      values = values.filter((v, index) => values.indexOf(v) === index);
    }
    if (!cell.allowCreation) {
      var _cell$options;
      const options = prepareOptions((_cell$options = cell.options) !== null && _cell$options !== void 0 ? _cell$options : []);
      values = values.filter(v => options.find(o => o.value === v));
    }
    if (values.length === 0) {
      return undefined;
    }
    return {
      ...cell,
      values
    };
  }
};
export default renderer;

