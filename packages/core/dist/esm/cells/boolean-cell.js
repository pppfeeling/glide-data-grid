import { getSquareWidth, getSquareXPosFromAlign, getSquareBB, pointIsWithinBB } from "../common/utils.js";
import { toggleBoolean } from "../data-editor/data-editor-fns.js";
import { GridCellKind, booleanCellIsEditable, BooleanEmpty, BooleanIndeterminate } from "../internal/data-grid/data-grid-types.js";
import { drawCheckbox } from "../internal/data-grid/render/draw-checkbox.js";
function isOverEditableRegion(e) {
  var _cell$maxSize, _cell$contentAlign;
  const {
    cell,
    posX: pointerX,
    posY: pointerY,
    bounds,
    theme
  } = e;
  const {
    width,
    height,
    x: cellX,
    y: cellY
  } = bounds;
  const maxWidth = (_cell$maxSize = cell.maxSize) !== null && _cell$maxSize !== void 0 ? _cell$maxSize : theme.checkboxMaxSize;
  const cellCenterY = Math.floor(bounds.y + height / 2);
  const checkBoxWidth = getSquareWidth(maxWidth, height, theme.cellVerticalPadding);
  const posX = getSquareXPosFromAlign((_cell$contentAlign = cell.contentAlign) !== null && _cell$contentAlign !== void 0 ? _cell$contentAlign : "center", cellX, width, theme.cellHorizontalPadding, checkBoxWidth);
  const bb = getSquareBB(posX, cellCenterY, checkBoxWidth);
  const checkBoxClicked = pointIsWithinBB(cellX + pointerX, cellY + pointerY, bb);
  return booleanCellIsEditable(cell) && checkBoxClicked;
}
export const booleanCellRenderer = {
  getAccessibilityString: c => {
    var _c$data$toString, _c$data;
    return (_c$data$toString = (_c$data = c.data) === null || _c$data === void 0 ? void 0 : _c$data.toString()) !== null && _c$data$toString !== void 0 ? _c$data$toString : "false";
  },
  kind: GridCellKind.Boolean,
  needsHover: true,
  useLabel: false,
  needsHoverPosition: true,
  measure: () => 50,
  draw: a => {
    var _a$cell$maxSize, _a$cell$hoverEffectIn;
    return drawBoolean(a, a.cell.data, booleanCellIsEditable(a.cell), (_a$cell$maxSize = a.cell.maxSize) !== null && _a$cell$maxSize !== void 0 ? _a$cell$maxSize : a.theme.checkboxMaxSize, (_a$cell$hoverEffectIn = a.cell.hoverEffectIntensity) !== null && _a$cell$hoverEffectIn !== void 0 ? _a$cell$hoverEffectIn : 0.35);
  },
  onDelete: c => ({
    ...c,
    data: false
  }),
  onSelect: e => {
    if (isOverEditableRegion(e)) {
      e.preventDefault();
    }
  },
  onClick: e => {
    if (isOverEditableRegion(e)) {
      return {
        ...e.cell,
        data: toggleBoolean(e.cell.data)
      };
    }
    return undefined;
  },
  onPaste: (toPaste, cell) => {
    let newVal = BooleanEmpty;
    if (toPaste.toLowerCase() === "true") {
      newVal = true;
    } else if (toPaste.toLowerCase() === "false") {
      newVal = false;
    } else if (toPaste.toLowerCase() === "indeterminate") {
      newVal = BooleanIndeterminate;
    }
    return newVal === cell.data ? undefined : {
      ...cell,
      data: newVal
    };
  }
};
function drawBoolean(args, data, canEdit, maxSize, hoverEffectIntensity) {
  if (!canEdit && data === BooleanEmpty) {
    return;
  }
  const {
    ctx,
    hoverAmount,
    theme,
    rect,
    highlighted,
    hoverX,
    hoverY,
    cell: {
      contentAlign
    }
  } = args;
  const {
    x,
    y,
    width: w,
    height: h
  } = rect;
  let shouldRestoreAlpha = false;
  if (hoverEffectIntensity > 0) {
    let alpha = canEdit ? 1 - hoverEffectIntensity + hoverEffectIntensity * hoverAmount : 0.4;
    if (data === BooleanEmpty) {
      alpha *= hoverAmount;
    }
    if (alpha === 0) {
      return;
    }
    if (alpha < 1) {
      shouldRestoreAlpha = true;
      ctx.globalAlpha = alpha;
    }
  }
  drawCheckbox(ctx, theme, data, x, y, w, h, highlighted, hoverX, hoverY, maxSize, contentAlign);
  if (shouldRestoreAlpha) {
    ctx.globalAlpha = 1;
  }
}
//# sourceMappingURL=boolean-cell.js.map