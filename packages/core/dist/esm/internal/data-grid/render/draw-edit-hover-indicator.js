import { roundedRect, measureTextCached } from "./data-grid-lib.js";
import { withAlpha } from "../color-parser.js";
export function drawEditHoverIndicator(ctx, theme, effectTheme, displayData, rect, hoverAmount, overrideCursor) {
  var _effectTheme$fullSize, _theme$roundingRadius, _effectTheme$bgColor;
  ctx.textBaseline = "alphabetic";
  const effectRect = getHoverEffectRect(ctx, rect, displayData, theme, (_effectTheme$fullSize = effectTheme === null || effectTheme === void 0 ? void 0 : effectTheme.fullSize) !== null && _effectTheme$fullSize !== void 0 ? _effectTheme$fullSize : false);
  ctx.beginPath();
  roundedRect(ctx, effectRect.x, effectRect.y, effectRect.width, effectRect.height, (_theme$roundingRadius = theme.roundingRadius) !== null && _theme$roundingRadius !== void 0 ? _theme$roundingRadius : 4);
  ctx.globalAlpha = hoverAmount;
  ctx.fillStyle = (_effectTheme$bgColor = effectTheme === null || effectTheme === void 0 ? void 0 : effectTheme.bgColor) !== null && _effectTheme$bgColor !== void 0 ? _effectTheme$bgColor : withAlpha(theme.textDark, 0.1);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.fillStyle = theme.textDark;
  ctx.textBaseline = "middle";
  overrideCursor === null || overrideCursor === void 0 || overrideCursor("text");
}
function getHoverEffectRect(ctx, cellRect, displayData, theme, fullSize) {
  const padX = theme.cellHorizontalPadding;
  const padY = theme.cellVerticalPadding;
  if (fullSize) {
    return {
      x: cellRect.x + padX / 2,
      y: cellRect.y + padY / 2 + 1,
      width: cellRect.width - padX,
      height: cellRect.height - padY - 1
    };
  }
  const m = measureTextCached(displayData, ctx, theme.baseFontFull, "alphabetic");
  const maxH = cellRect.height - padY;
  const h = Math.min(maxH, m.actualBoundingBoxAscent * 2.5);
  return {
    x: cellRect.x + padX / 2,
    y: cellRect.y + (cellRect.height - h) / 2 + 1,
    width: m.width + padX * 3,
    height: h - 1
  };
}
//# sourceMappingURL=draw-edit-hover-indicator.js.map