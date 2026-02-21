import { assertNever } from "../../../common/support.js";
import { getSquareBB, getSquareWidth, getSquareXPosFromAlign, pointIsWithinBB } from "../../../common/utils.js";
import { BooleanEmpty, BooleanIndeterminate } from "../data-grid-types.js";
import { roundedRect } from "./data-grid-lib.js";
export function drawCheckbox(ctx, theme, checked, x, y, width, height, highlighted) {
  var _theme$roundingRadius;
  let hoverX = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : -20;
  let hoverY = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : -20;
  let maxSize = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : undefined;
  let alignment = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : "center";
  let style = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : "square";
  let disabled = arguments.length > 13 && arguments[13] !== undefined ? arguments[13] : false;
  const centerY = Math.floor(y + height / 2);
  const rectBordRadius = style === "circle" ? 10000 : (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4;
  let checkBoxWidth = getSquareWidth(maxSize !== null && maxSize !== void 0 ? maxSize : theme.checkboxMaxSize, height, theme.cellVerticalPadding);
  let checkBoxHalfWidth = checkBoxWidth / 2;
  const posX = getSquareXPosFromAlign(alignment, x, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = getSquareBB(posX, centerY, checkBoxWidth);
  const hovered = pointIsWithinBB(x + hoverX, y + hoverY, bb);
  switch (checked) {
    case true:
      {
        ctx.beginPath();
        roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        if (style === "circle") {
          checkBoxHalfWidth *= 0.8;
          checkBoxWidth *= 0.8;
        }
        ctx.fillStyle = disabled ? theme.bgCellMedium : highlighted ? theme.accentColor : theme.textMedium;
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxHalfWidth + checkBoxWidth / 4.23, centerY - checkBoxHalfWidth + checkBoxWidth / 1.97);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 2.42, centerY - checkBoxHalfWidth + checkBoxWidth / 1.44);
        ctx.lineTo(posX - checkBoxHalfWidth + checkBoxWidth / 1.29, centerY - checkBoxHalfWidth + checkBoxWidth / 3.25);
        ctx.strokeStyle = disabled ? theme.textLight : theme.bgCell;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    case BooleanEmpty:
    case false:
      {
        ctx.beginPath();
        roundedRect(ctx, posX - checkBoxWidth / 2 + 0.5, centerY - checkBoxWidth / 2 + 0.5, checkBoxWidth - 1, checkBoxWidth - 1, rectBordRadius);
        ctx.lineWidth = 1;
        ctx.strokeStyle = disabled ? theme.textLight : hovered ? theme.textDark : theme.textMedium;
        ctx.stroke();
        break;
      }
    case BooleanIndeterminate:
      {
        ctx.beginPath();
        roundedRect(ctx, posX - checkBoxWidth / 2, centerY - checkBoxWidth / 2, checkBoxWidth, checkBoxWidth, rectBordRadius);
        ctx.fillStyle = disabled ? theme.bgCellMedium : hovered ? theme.textMedium : theme.textLight;
        ctx.fill();
        if (style === "circle") {
          checkBoxHalfWidth *= 0.8;
          checkBoxWidth *= 0.8;
        }
        ctx.beginPath();
        ctx.moveTo(posX - checkBoxWidth / 3, centerY);
        ctx.lineTo(posX + checkBoxWidth / 3, centerY);
        ctx.strokeStyle = disabled ? theme.textLight : theme.bgCell;
        ctx.lineCap = "round";
        ctx.lineWidth = 1.9;
        ctx.stroke();
        break;
      }
    default:
      assertNever(checked);
  }
}
//# sourceMappingURL=draw-checkbox.js.map