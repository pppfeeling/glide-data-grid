import { intersectRect, pointInRect } from "../../../common/math.js";
import { mergeAndRealizeTheme } from "../../../common/styles.js";
import { direction } from "../../../common/utils.js";
import { withAlpha } from "../color-parser.js";
import { GridColumnMenuIcon } from "../data-grid-types.js";
import { drawMenuDots, getMeasuredTextCache, getMiddleCenterBias, measureTextCached, roundedPoly, getGroupName } from "./data-grid-lib.js";
import { walkColumns, walkGroups, walkMultiLevelGroups } from "./data-grid-render.walk.js";
import { drawCheckbox } from "./draw-checkbox.js";
export function drawGridHeaders(ctx, effectiveCols, allColumns, enableGroups, hovered, width, translateX, headerHeight, groupHeaderHeight, dragAndDropState, isResizing, selection, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage, drawHeaderCallback, touchMode, groupLevels, groupHeaderHeights) {
  var _hovered$, _hovered$2, _hovered$3, _hovered$4;
  const effectiveGroupLevels = groupLevels !== null && groupLevels !== void 0 ? groupLevels : enableGroups ? 1 : 0;
  const effectiveGroupHeaderHeights = groupHeaderHeights !== null && groupHeaderHeights !== void 0 ? groupHeaderHeights : enableGroups ? [groupHeaderHeight] : [];
  const totalGroupHeaderHeight = effectiveGroupHeaderHeights.reduce((a, b) => a + b, 0);
  const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
  if (totalHeaderHeight <= 0) return;
  ctx.fillStyle = outerTheme.bgHeader;
  if (damage !== undefined && enableGroups && (groupLevels !== null && groupLevels !== void 0 ? groupLevels : 1) > 1) {
    ctx.fillRect(0, totalGroupHeaderHeight, width, headerHeight);
  } else {
    ctx.fillRect(0, 0, width, totalHeaderHeight);
  }
  const hCol = hovered === null || hovered === void 0 || (_hovered$ = hovered[0]) === null || _hovered$ === void 0 ? void 0 : _hovered$[0];
  const hRow = hovered === null || hovered === void 0 || (_hovered$2 = hovered[0]) === null || _hovered$2 === void 0 ? void 0 : _hovered$2[1];
  const hPosX = hovered === null || hovered === void 0 || (_hovered$3 = hovered[1]) === null || _hovered$3 === void 0 ? void 0 : _hovered$3[0];
  const hPosY = hovered === null || hovered === void 0 || (_hovered$4 = hovered[1]) === null || _hovered$4 === void 0 ? void 0 : _hovered$4[1];
  const font = outerTheme.headerFontFull;
  ctx.font = font;
  walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
    var _hoverValues$find$hov, _hoverValues$find;
    if (damage !== undefined && !damage.has([c.sourceIndex, -1])) return;
    const diff = Math.max(0, clipX - x);
    ctx.save();
    ctx.beginPath();
    ctx.rect(x + diff, totalGroupHeaderHeight, c.width - diff, headerHeight);
    ctx.clip();
    const groupTheme = getGroupDetails(getGroupName(c.group)).overrideTheme;
    const theme = c.themeOverride === undefined && groupTheme === undefined ? outerTheme : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);
    if (theme.bgHeader !== outerTheme.bgHeader) {
      ctx.fillStyle = theme.bgHeader;
      ctx.fill();
    }
    if (theme !== outerTheme) {
      ctx.font = theme.headerFontFull;
    }
    const selected = selection.columns.hasIndex(c.sourceIndex);
    const noHover = dragAndDropState !== undefined || isResizing || c.headerRowMarkerDisabled === true;
    const hoveredBoolean = !noHover && hRow === -1 && hCol === c.sourceIndex;
    const hover = noHover ? 0 : (_hoverValues$find$hov = (_hoverValues$find = hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)) === null || _hoverValues$find === void 0 ? void 0 : _hoverValues$find.hoverAmount) !== null && _hoverValues$find$hov !== void 0 ? _hoverValues$find$hov : 0;
    const hasSelectedCell = (selection === null || selection === void 0 ? void 0 : selection.current) !== undefined && selection.current.cell[0] === c.sourceIndex;
    const bgFillStyle = selected ? theme.accentColor : hasSelectedCell ? theme.bgHeaderHasFocus : theme.bgHeader;
    const y = enableGroups ? totalGroupHeaderHeight : 0;
    const xOffset = c.sourceIndex === 0 ? 0 : 1;
    if (selected) {
      ctx.fillStyle = bgFillStyle;
      ctx.fillRect(x + xOffset, y, c.width - xOffset, headerHeight);
    } else if (hasSelectedCell || hover > 0) {
      ctx.beginPath();
      ctx.rect(x + xOffset, y, c.width - xOffset, headerHeight);
      if (hasSelectedCell) {
        ctx.fillStyle = theme.bgHeaderHasFocus;
        ctx.fill();
      }
      if (hover > 0) {
        ctx.globalAlpha = hover;
        ctx.fillStyle = theme.bgHeaderHovered;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
    drawHeader(ctx, x, y, c.width, headerHeight, c, selected, theme, hoveredBoolean, hoveredBoolean ? hPosX : undefined, hoveredBoolean ? hPosY : undefined, hasSelectedCell, hover, spriteManager, drawHeaderCallback, touchMode);
    ctx.restore();
  });
  if (enableGroups) {
    if (effectiveGroupLevels > 1) {
      drawMultiLevelGroups(ctx, effectiveCols, width, translateX, effectiveGroupHeaderHeights, effectiveGroupLevels, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
    } else {
      drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, outerTheme, spriteManager, hoverValues, verticalBorder, getGroupDetails, damage);
    }
  }
  if (enableGroups && (groupLevels !== null && groupLevels !== void 0 ? groupLevels : 1) > 1) {
    ctx.beginPath();
    ctx.moveTo(0, totalGroupHeaderHeight + 0.5);
    ctx.lineTo(width, totalGroupHeaderHeight + 0.5);
    ctx.strokeStyle = outerTheme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
export function drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$5;
  const [hCol, hRow] = (_hovered$5 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$5 !== void 0 ? _hovered$5 : [];
  let finalX = 0;
  walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
    var _groupTheme$bgGroupHe, _groupTheme$bgGroupHe2, _groupTheme$textGroup;
    if (damage !== undefined && !damage.hasItemInRectangle({
      x: span[0],
      y: -2,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === undefined ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
    const isHovered = hRow === -2 && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? (_groupTheme$bgGroupHe = groupTheme.bgGroupHeaderHovered) !== null && _groupTheme$bgGroupHe !== void 0 ? _groupTheme$bgGroupHe : groupTheme.bgHeaderHovered : (_groupTheme$bgGroupHe2 = groupTheme.bgGroupHeader) !== null && _groupTheme$bgGroupHe2 !== void 0 ? _groupTheme$bgGroupHe2 : groupTheme.bgHeader;
    if (fillColor !== theme.bgHeader) {
      ctx.fillStyle = fillColor;
      ctx.fill();
    }
    ctx.fillStyle = (_groupTheme$textGroup = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup !== void 0 ? _groupTheme$textGroup : groupTheme.textHeader;
    if (group !== undefined) {
      const displayName = group.name;
      const textMetrics = ctx.measureText(displayName);
      const textWidth = textMetrics.width;
      const iconWidth = group.icon !== undefined ? 26 : 0;
      const totalContentWidth = iconWidth + textWidth;
      const centerX = x + (w - totalContentWidth) / 2;
      if (group.icon !== undefined) {
        spriteManager.drawSprite(group.icon, "normal", ctx, centerX, (groupHeaderHeight - 20) / 2, 20, groupTheme);
      }
      ctx.fillText(displayName, centerX + iconWidth, groupHeaderHeight / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
      if (group.actions !== undefined && isHovered) {
        var _hovered$6;
        const actionBoxes = getActionBoundsForGroup({
          x,
          y,
          width: w,
          height: h
        }, group.actions);
        ctx.beginPath();
        const fadeStartX = actionBoxes[0].x - 10;
        const fadeWidth = x + w - fadeStartX;
        ctx.rect(fadeStartX, 0, fadeWidth, groupHeaderHeight);
        const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
        const trans = withAlpha(fillColor, 0);
        grad.addColorStop(0, trans);
        grad.addColorStop(10 / fadeWidth, fillColor);
        grad.addColorStop(1, fillColor);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.globalAlpha = 0.6;
        const [mouseX, mouseY] = (_hovered$6 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$6 !== void 0 ? _hovered$6 : [-1, -1];
        for (let i = 0; i < group.actions.length; i++) {
          const action = group.actions[i];
          const box = actionBoxes[i];
          const actionHovered = pointInRect(box, mouseX + x, mouseY);
          if (actionHovered) {
            ctx.globalAlpha = 1;
          }
          spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
          if (actionHovered) {
            ctx.globalAlpha = 0.6;
          }
        }
        ctx.globalAlpha = 1;
      }
    }
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, groupHeaderHeight);
      ctx.strokeStyle = theme.borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();
    finalX = x + w;
  });
  ctx.beginPath();
  ctx.moveTo(finalX + 0.5, 0);
  ctx.lineTo(finalX + 0.5, groupHeaderHeight);
  ctx.moveTo(0, groupHeaderHeight + 0.5);
  ctx.lineTo(width, groupHeaderHeight + 0.5);
  ctx.strokeStyle = theme.borderColor;
  ctx.lineWidth = 1;
  ctx.stroke();
}
export function drawMultiLevelGroups(ctx, effectiveCols, width, translateX, groupHeaderHeights, groupLevels, hovered, theme, spriteManager, _hoverValues, verticalBorder, getGroupDetails, damage) {
  var _hovered$7;
  const xPad = 8;
  const [hCol, hRow] = (_hovered$7 = hovered === null || hovered === void 0 ? void 0 : hovered[0]) !== null && _hovered$7 !== void 0 ? _hovered$7 : [];
  ctx.font = theme.headerFontFull;
  const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);
  if (damage === undefined) {
    ctx.fillStyle = theme.bgHeader;
    ctx.fillRect(0, 0, width, totalGroupHeaderHeight);
  }
  let finalX = 0;
  walkMultiLevelGroups(effectiveCols, width, translateX, groupHeaderHeights, groupLevels, (span, groupName, x, y, w, h, level) => {
    var _groupTheme$bgGroupHe3, _groupTheme$bgGroupHe4, _groupTheme$textGroup2, _group$name;
    const damageRow = -(level + 2);
    if (damage !== undefined && !damage.hasItemInRectangle({
      x: span[0],
      y: damageRow,
      width: span[1] - span[0] + 1,
      height: 1
    })) return;
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
    const group = getGroupDetails(groupName);
    const groupTheme = (group === null || group === void 0 ? void 0 : group.overrideTheme) === undefined ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
    const isHovered = hRow === damageRow && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
    const fillColor = isHovered ? (_groupTheme$bgGroupHe3 = groupTheme.bgGroupHeaderHovered) !== null && _groupTheme$bgGroupHe3 !== void 0 ? _groupTheme$bgGroupHe3 : groupTheme.bgHeaderHovered : (_groupTheme$bgGroupHe4 = groupTheme.bgGroupHeader) !== null && _groupTheme$bgGroupHe4 !== void 0 ? _groupTheme$bgGroupHe4 : groupTheme.bgHeader;
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = (_groupTheme$textGroup2 = groupTheme.textGroupHeader) !== null && _groupTheme$textGroup2 !== void 0 ? _groupTheme$textGroup2 : groupTheme.textHeader;
    const displayName = (_group$name = group === null || group === void 0 ? void 0 : group.name) !== null && _group$name !== void 0 ? _group$name : groupName;
    const textMetrics = ctx.measureText(displayName);
    const textWidth = textMetrics.width;
    const iconWidth = (group === null || group === void 0 ? void 0 : group.icon) !== undefined ? 26 : 0;
    const totalContentWidth = iconWidth + textWidth;
    const centerX = x + (w - totalContentWidth) / 2;
    if ((group === null || group === void 0 ? void 0 : group.icon) !== undefined) {
      spriteManager.drawSprite(group.icon, "normal", ctx, centerX, y + (h - 20) / 2, 20, groupTheme);
    }
    ctx.fillText(displayName, centerX + iconWidth, y + h / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
    if (group !== undefined && group.actions !== undefined && isHovered) {
      var _hovered$8;
      const actionBoxes = getActionBoundsForGroup({
        x,
        y,
        width: w,
        height: h
      }, group.actions);
      ctx.beginPath();
      const fadeStartX = actionBoxes[0].x - 10;
      const fadeWidth = x + w - fadeStartX;
      ctx.rect(fadeStartX, y, fadeWidth, h);
      const grad = ctx.createLinearGradient(fadeStartX, 0, fadeStartX + fadeWidth, 0);
      const trans = withAlpha(fillColor, 0);
      grad.addColorStop(0, trans);
      grad.addColorStop(10 / fadeWidth, fillColor);
      grad.addColorStop(1, fillColor);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.globalAlpha = 0.6;
      const [mouseX, mouseY] = (_hovered$8 = hovered === null || hovered === void 0 ? void 0 : hovered[1]) !== null && _hovered$8 !== void 0 ? _hovered$8 : [-1, -1];
      for (let i = 0; i < group.actions.length; i++) {
        const action = group.actions[i];
        const box = actionBoxes[i];
        const actionHovered = pointInRect(box, mouseX + x, mouseY);
        if (actionHovered) {
          ctx.globalAlpha = 1;
        }
        spriteManager.drawSprite(action.icon, "normal", ctx, box.x + box.width / 2 - 10, box.y + box.height / 2 - 10, 20, groupTheme);
        if (actionHovered) {
          ctx.globalAlpha = 0.6;
        }
      }
      ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    if (x !== 0 && verticalBorder(span[0])) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, y);
      ctx.lineTo(x + 0.5, y + h);
      ctx.stroke();
    }
    if (level < groupLevels - 1 || damage === undefined) {
      ctx.beginPath();
      ctx.moveTo(x, y + h + 0.5);
      ctx.lineTo(x + w, y + h + 0.5);
      ctx.stroke();
    }
    ctx.restore();
    finalX = Math.max(finalX, x + w);
  });
  if (damage === undefined) {
    ctx.beginPath();
    ctx.moveTo(finalX + 0.5, 0);
    ctx.lineTo(finalX + 0.5, totalGroupHeaderHeight);
    let borderY = 0;
    for (let level = 0; level < groupLevels - 1; level++) {
      borderY += groupHeaderHeights[level];
      ctx.moveTo(0, borderY + 0.5);
      ctx.lineTo(width, borderY + 0.5);
    }
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
const menuButtonSize = 30;
function getHeaderMenuBounds(x, y, width, height, isRtl) {
  if (isRtl) return {
    x,
    y,
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
  return {
    x: x + width - menuButtonSize,
    y: Math.max(y, y + height / 2 - menuButtonSize / 2),
    width: menuButtonSize,
    height: Math.min(menuButtonSize, height)
  };
}
export function getActionBoundsForGroup(box, actions) {
  const result = [];
  let x = box.x + box.width - 26 * actions.length;
  const y = box.y + box.height / 2 - 13;
  const height = 26;
  const width = 26;
  for (let i = 0; i < actions.length; i++) {
    result.push({
      x,
      y,
      width,
      height
    });
    x += 26;
  }
  return result;
}
function flipHorizontal(toFlip, mirrorX, isRTL) {
  if (!isRTL || toFlip === undefined) return toFlip;
  toFlip.x = mirrorX - (toFlip.x - mirrorX) - toFlip.width;
  return toFlip;
}
export function computeHeaderLayout(ctx, c, x, y, width, height, theme, isRTL) {
  var _getMeasuredTextCache, _getMeasuredTextCache2;
  const xPad = theme.cellHorizontalPadding;
  const headerIconSize = theme.headerIconSize;
  const menuBounds = getHeaderMenuBounds(x, y, width, height, false);
  const textWidth = ctx === undefined ? (_getMeasuredTextCache = (_getMeasuredTextCache2 = getMeasuredTextCache(c.title, theme.headerFontFull)) === null || _getMeasuredTextCache2 === void 0 ? void 0 : _getMeasuredTextCache2.width) !== null && _getMeasuredTextCache !== void 0 ? _getMeasuredTextCache : 0 : measureTextCached(c.title, ctx, theme.headerFontFull).width;
  const iconAreaWidth = c.icon !== undefined ? Math.ceil(headerIconSize * 1.3) : 0;
  const coreContentWidth = iconAreaWidth + textWidth;
  const centerStartX = x + Math.max(xPad, (width - coreContentWidth) / 2);
  const iconBounds = c.icon === undefined ? undefined : {
    x: centerStartX,
    y: y + (height - headerIconSize) / 2,
    width: headerIconSize,
    height: headerIconSize
  };
  const iconOverlayBounds = iconBounds === undefined || c.overlayIcon === undefined ? undefined : {
    x: iconBounds.x + 9,
    y: iconBounds.y + 6,
    width: 18,
    height: 18
  };
  const textBounds = {
    x: centerStartX + iconAreaWidth,
    y: y,
    width: textWidth,
    height: height
  };
  let indicatorIconBounds = undefined;
  if (c.indicatorIcon !== undefined) {
    indicatorIconBounds = {
      x: textBounds.x + textWidth + xPad,
      y: y + (height - headerIconSize) / 2,
      width: headerIconSize,
      height: headerIconSize
    };
  }
  const mirrorPoint = x + width / 2;
  return {
    menuBounds: flipHorizontal(menuBounds, mirrorPoint, isRTL),
    iconBounds: flipHorizontal(iconBounds, mirrorPoint, isRTL),
    iconOverlayBounds: flipHorizontal(iconOverlayBounds, mirrorPoint, isRTL),
    textBounds: flipHorizontal(textBounds, mirrorPoint, isRTL),
    indicatorIconBounds: flipHorizontal(indicatorIconBounds, mirrorPoint, isRTL)
  };
}
function drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout) {
  if (c.rowMarker !== undefined && c.headerRowMarkerDisabled !== true) {
    const checked = c.rowMarkerChecked;
    if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
      ctx.globalAlpha = hoverAmount;
    }
    const markerTheme = c.headerRowMarkerTheme !== undefined ? mergeAndRealizeTheme(theme, c.headerRowMarkerTheme) : theme;
    drawCheckbox(ctx, markerTheme, checked, x, y, width, height, false, undefined, undefined, theme.checkboxMaxSize, "center", c.rowMarker);
    if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
      ctx.globalAlpha = 1;
    }
    return;
  }
  const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;
  const shouldDrawMenu = c.hasMenu === true && (isHovered || touchMode && selected) && headerLayout.menuBounds !== undefined;
  if (c.icon !== undefined && headerLayout.iconBounds !== undefined) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    spriteManager.drawSprite(c.icon, variant, ctx, headerLayout.iconBounds.x, headerLayout.iconBounds.y, headerLayout.iconBounds.width, theme);
    if (c.overlayIcon !== undefined && headerLayout.iconOverlayBounds !== undefined) {
      spriteManager.drawSprite(c.overlayIcon, selected ? "selected" : "special", ctx, headerLayout.iconOverlayBounds.x, headerLayout.iconOverlayBounds.y, headerLayout.iconOverlayBounds.width, theme);
    }
  }
  if (shouldDrawMenu && width > 35) {
    const fadeWidth = 35;
    const fadeStart = isRtl ? fadeWidth : width - fadeWidth;
    const fadeEnd = isRtl ? fadeWidth * 0.7 : width - fadeWidth * 0.7;
    const fadeStartPercent = fadeStart / width;
    const fadeEndPercent = fadeEnd / width;
    const grad = ctx.createLinearGradient(x, 0, x + width, 0);
    const trans = withAlpha(fillStyle, 0);
    grad.addColorStop(isRtl ? 1 : 0, fillStyle);
    grad.addColorStop(fadeStartPercent, fillStyle);
    grad.addColorStop(fadeEndPercent, trans);
    grad.addColorStop(isRtl ? 0 : 1, trans);
    ctx.fillStyle = grad;
  } else {
    ctx.fillStyle = fillStyle;
  }
  if (isRtl) {
    ctx.textAlign = "right";
  }
  if (headerLayout.textBounds !== undefined) {
    ctx.fillText(c.title, isRtl ? headerLayout.textBounds.x + headerLayout.textBounds.width : headerLayout.textBounds.x, y + height / 2 + getMiddleCenterBias(ctx, theme.headerFontFull));
  }
  if (isRtl) {
    ctx.textAlign = "left";
  }
  if (c.indicatorIcon !== undefined && headerLayout.indicatorIconBounds !== undefined && (!shouldDrawMenu || !intersectRect(headerLayout.menuBounds.x, headerLayout.menuBounds.y, headerLayout.menuBounds.width, headerLayout.menuBounds.height, headerLayout.indicatorIconBounds.x, headerLayout.indicatorIconBounds.y, headerLayout.indicatorIconBounds.width, headerLayout.indicatorIconBounds.height))) {
    let variant = selected ? "selected" : "normal";
    if (c.style === "highlight") {
      variant = selected ? "selected" : "special";
    }
    spriteManager.drawSprite(c.indicatorIcon, variant, ctx, headerLayout.indicatorIconBounds.x, headerLayout.indicatorIconBounds.y, headerLayout.indicatorIconBounds.width, theme);
  }
  if (shouldDrawMenu && headerLayout.menuBounds !== undefined) {
    const menuBounds = headerLayout.menuBounds;
    const hovered = posX !== undefined && posY !== undefined && pointInRect(menuBounds, posX + x, posY + y);
    if (!hovered) {
      ctx.globalAlpha = 0.7;
    }
    if (c.menuIcon === undefined || c.menuIcon === GridColumnMenuIcon.Triangle) {
      ctx.beginPath();
      const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
      const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
      roundedPoly(ctx, [{
        x: triangleX,
        y: triangleY
      }, {
        x: triangleX + 11,
        y: triangleY
      }, {
        x: triangleX + 5.5,
        y: triangleY + 6
      }], 1);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else if (c.menuIcon === GridColumnMenuIcon.Dots) {
      ctx.beginPath();
      const dotsX = menuBounds.x + menuBounds.width / 2;
      const dotsY = menuBounds.y + menuBounds.height / 2;
      drawMenuDots(ctx, dotsX, dotsY);
      ctx.fillStyle = fillStyle;
      ctx.fill();
    } else {
      const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
      const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
      spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
    }
    if (!hovered) {
      ctx.globalAlpha = 1;
    }
  }
}
export function drawHeader(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hasSelectedCell, hoverAmount, spriteManager, drawHeaderCallback, touchMode) {
  const isRtl = direction(c.title) === "rtl";
  const headerLayout = computeHeaderLayout(ctx, c, x, y, width, height, theme, isRtl);
  if (drawHeaderCallback !== undefined) {
    var _headerLayout$menuBou;
    drawHeaderCallback({
      ctx,
      theme,
      rect: {
        x,
        y,
        width,
        height
      },
      column: c,
      columnIndex: c.sourceIndex,
      isSelected: selected,
      hoverAmount,
      isHovered,
      hasSelectedCell,
      spriteManager,
      menuBounds: (_headerLayout$menuBou = headerLayout === null || headerLayout === void 0 ? void 0 : headerLayout.menuBounds) !== null && _headerLayout$menuBou !== void 0 ? _headerLayout$menuBou : {
        x: 0,
        y: 0,
        height: 0,
        width: 0
      },
      hoverX: posX,
      hoverY: posY
    }, () => drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout));
  } else {
    drawHeaderInner(ctx, x, y, width, height, c, selected, theme, isHovered, posX, posY, hoverAmount, spriteManager, touchMode, isRtl, headerLayout);
  }
}
//# sourceMappingURL=data-grid-render.header.js.map