import { measureTextCached, getMiddleCenterBias, GridCellKind, getEmHeight } from "@glideapps/glide-data-grid";
import * as React from "react";
import { roundedRect } from "../draw-fns.js";
function adaptFontSize(font, percentage) {
  const regex = /(\d+\.?\d*)\s*(px|rem|em|%|pt)/;
  const match = font.match(regex);
  if (match) {
    const value = parseFloat(match[1]);
    const unit = match[2];
    const scaledValue = value * percentage;
    return font.replace(regex, `${Number(scaledValue.toPrecision(3))}${unit}`);
  }
  return font;
}
const inputStyle = {
  marginRight: 8
};
const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  flexGrow: 1
};
const renderer = {
  kind: GridCellKind.Custom,
  isMatch: c => c.data.kind === "range-cell",
  draw: (args, cell) => {
    const {
      ctx,
      theme,
      rect
    } = args;
    const {
      min,
      max,
      value,
      label,
      measureLabel
    } = cell.data;
    const x = rect.x + theme.cellHorizontalPadding;
    const yMid = rect.y + rect.height / 2;
    const rangeSize = max - min;
    const fillRatio = (value - min) / rangeSize;
    const labelFont = `${adaptFontSize(theme.baseFontStyle, 0.9)} ${theme.fontFamily}`;
    const emHeight = getEmHeight(ctx, labelFont);
    const rangeHeight = emHeight / 2;
    ctx.save();
    let labelWidth = 0;
    if (label !== undefined) {
      ctx.font = labelFont;
      labelWidth = measureTextCached(measureLabel !== null && measureLabel !== void 0 ? measureLabel : label, ctx, labelFont).width + theme.cellHorizontalPadding;
    }
    const rangeWidth = rect.width - theme.cellHorizontalPadding * 2 - labelWidth;
    if (rangeWidth >= rangeHeight) {
      const gradient = ctx.createLinearGradient(x, yMid, x + rangeWidth, yMid);
      gradient.addColorStop(0, theme.accentColor);
      gradient.addColorStop(fillRatio, theme.accentColor);
      gradient.addColorStop(fillRatio, theme.bgBubble);
      gradient.addColorStop(1, theme.bgBubble);
      ctx.beginPath();
      ctx.fillStyle = gradient;
      roundedRect(ctx, x, yMid - rangeHeight / 2, rangeWidth, rangeHeight, rangeHeight / 2);
      ctx.fill();
      ctx.beginPath();
      roundedRect(ctx, x + 0.5, yMid - rangeHeight / 2 + 0.5, rangeWidth - 1, rangeHeight - 1, (rangeHeight - 1) / 2);
      ctx.strokeStyle = theme.accentLight;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    if (label !== undefined) {
      ctx.textAlign = "right";
      ctx.fillStyle = theme.textDark;
      ctx.fillText(label, rect.x + rect.width - theme.cellHorizontalPadding, yMid + getMiddleCenterBias(ctx, labelFont));
    }
    ctx.restore();
    return true;
  },
  provideEditor: () => {
    return p => {
      const {
        data,
        readonly
      } = p.value;
      const strValue = data.value.toString();
      const strMin = data.min.toString();
      const strMax = data.max.toString();
      const strStep = data.step.toString();
      const onChange = e => {
        p.onChange({
          ...p.value,
          data: {
            ...data,
            value: Number(e.target.value)
          }
        });
      };
      return React.createElement("label", {
        style: wrapperStyle
      }, React.createElement("input", {
        style: inputStyle,
        type: "range",
        value: strValue,
        min: strMin,
        max: strMax,
        step: strStep,
        onChange: onChange,
        disabled: readonly
      }), strValue);
    };
  },
  onPaste: (v, d) => {
    let num = Number.parseFloat(v);
    num = Number.isNaN(num) ? d.value : Math.max(d.min, Math.min(d.max, num));
    return {
      ...d,
      value: num
    };
  }
};
export default renderer;
//# sourceMappingURL=range-cell.js.map