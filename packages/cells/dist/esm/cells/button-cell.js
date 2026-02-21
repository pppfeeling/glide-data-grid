import { getMiddleCenterBias, GridCellKind, interpolateColors } from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns.js";
function unpackColor(color, theme, hoverAmount) {
  if (typeof color === "string") {
    if (theme[color] !== undefined) return theme[color];
    return color;
  }
  let [normal, hover] = color;
  if (theme[normal] !== undefined) normal = theme[normal];
  if (theme[hover] !== undefined) hover = theme[hover];
  return interpolateColors(normal, hover, hoverAmount);
}
function getIsHovered(bounds, posX, posY, theme) {
  const x = Math.floor(bounds.x + theme.cellHorizontalPadding + 1);
  const y = Math.floor(bounds.y + theme.cellVerticalPadding + 1);
  const width = Math.ceil(bounds.width - theme.cellHorizontalPadding * 2 - 1);
  const height = Math.ceil(bounds.height - theme.cellVerticalPadding * 2 - 1);
  return posX !== undefined && posY !== undefined && posX + bounds.x >= x && posX + bounds.x < x + width && posY + bounds.y >= y && posY + bounds.y < y + height;
}
const renderer = {
  kind: GridCellKind.Custom,
  isMatch: c => c.data.kind === "button-cell",
  needsHoverPosition: true,
  needsHover: true,
  onSelect: a => a.preventDefault(),
  onClick: a => {
    var _cell$data$onClick, _cell$data;
    const {
      cell,
      theme,
      bounds,
      posX,
      posY
    } = a;
    if (getIsHovered(bounds, posX, posY, theme)) (_cell$data$onClick = (_cell$data = cell.data).onClick) === null || _cell$data$onClick === void 0 || _cell$data$onClick.call(_cell$data);
    return undefined;
  },
  drawPrep: args => {
    const {
      ctx
    } = args;
    ctx.textAlign = "center";
    return {
      deprep: a => {
        a.ctx.textAlign = "start";
      }
    };
  },
  draw: (args, cell) => {
    var _args$overrideCursor, _args$requestAnimatio;
    const {
      ctx,
      theme,
      rect,
      hoverX,
      hoverY,
      frameTime,
      drawState
    } = args;
    const {
      title,
      backgroundColor,
      color,
      borderColor,
      borderRadius
    } = cell.data;
    const x = Math.floor(rect.x + theme.cellHorizontalPadding + 1);
    const y = Math.floor(rect.y + theme.cellVerticalPadding + 1);
    const width = Math.ceil(rect.width - theme.cellHorizontalPadding * 2 - 1);
    const height = Math.ceil(rect.height - theme.cellVerticalPadding * 2 - 1);
    if (width <= 0 || height <= 0) return true;
    const isHovered = getIsHovered(rect, hoverX, hoverY, theme);
    let [state, setState] = drawState;
    if (isHovered) (_args$overrideCursor = args.overrideCursor) === null || _args$overrideCursor === void 0 || _args$overrideCursor.call(args, "pointer");
    state !== null && state !== void 0 ? state : state = {
      hovered: false,
      animationStartTime: 0
    };
    if (isHovered !== state.hovered) {
      state = {
        ...state,
        hovered: isHovered,
        animationStartTime: frameTime
      };
      setState(state);
    }
    const progress = Math.min(1, (frameTime - state.animationStartTime) / 200);
    const hoverAmount = isHovered ? progress : 1 - progress;
    if (progress < 1) (_args$requestAnimatio = args.requestAnimationFrame) === null || _args$requestAnimatio === void 0 || _args$requestAnimatio.call(args);
    if (backgroundColor !== undefined) {
      var _ref;
      ctx.beginPath();
      roundedRect(ctx, x, y, width, height, (_ref = borderRadius !== null && borderRadius !== void 0 ? borderRadius : theme.roundingRadius) !== null && _ref !== void 0 ? _ref : 0);
      ctx.fillStyle = unpackColor(backgroundColor, theme, hoverAmount);
      ctx.fill();
    }
    if (borderColor !== undefined) {
      var _ref2;
      ctx.beginPath();
      roundedRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, (_ref2 = borderRadius !== null && borderRadius !== void 0 ? borderRadius : theme.roundingRadius) !== null && _ref2 !== void 0 ? _ref2 : 0);
      ctx.strokeStyle = unpackColor(borderColor, theme, hoverAmount);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.fillStyle = unpackColor(color !== null && color !== void 0 ? color : theme.accentColor, theme, hoverAmount);
    ctx.fillText(title, x + width / 2, y + height / 2 + getMiddleCenterBias(ctx, theme.baseFontFull));
    return true;
  },
  provideEditor: undefined
};
export default renderer;
//# sourceMappingURL=button-cell.js.map