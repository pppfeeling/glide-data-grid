import { intersectRect, pointInRect } from "../../../common/math.js";
import { mergeAndRealizeTheme, type FullTheme } from "../../../common/styles.js";
import { direction } from "../../../common/utils.js";
import type { HoverValues } from "../animation-manager.js";
import type { CellSet } from "../cell-set.js";
import { withAlpha } from "../color-parser.js";
import type { SpriteManager, SpriteVariant } from "../data-grid-sprites.js";
import { GridColumnMenuIcon, type DrawHeaderCallback, type GridSelection, type Rectangle } from "../data-grid-types.js";
import {
    drawMenuDots,
    getMeasuredTextCache,
    getMiddleCenterBias,
    measureTextCached,
    roundedPoly,
    type MappedGridColumn,
    getGroupName,
} from "./data-grid-lib.js";
import type { GroupDetails, GroupDetailsCallback } from "./data-grid-render.cells.js";
import { walkColumns, walkGroups, walkMultiLevelGroups } from "./data-grid-render.walk.js";
import { drawCheckbox } from "./draw-checkbox.js";
import type { DragAndDropState, HoverInfo } from "./draw-grid-arg.js";

export function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    enableGroups: boolean,
    hovered: HoverInfo | undefined,
    width: number,
    translateX: number,
    headerHeight: number,
    groupHeaderHeight: number,
    dragAndDropState: DragAndDropState | undefined,
    isResizing: boolean,
    selection: GridSelection,
    outerTheme: FullTheme,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean,
    groupLevels?: number,
    groupHeaderHeights?: readonly number[]
) {
    // Calculate total group header height
    const effectiveGroupLevels = groupLevels ?? (enableGroups ? 1 : 0);
    const effectiveGroupHeaderHeights = groupHeaderHeights ?? (enableGroups ? [groupHeaderHeight] : []);
    const totalGroupHeaderHeight = effectiveGroupHeaderHeights.reduce((a, b) => a + b, 0);
    const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;

    if (totalHeaderHeight <= 0) return;

    ctx.fillStyle = outerTheme.bgHeader;
    // Only fill the column header area when damage is defined (partial redraw)
    // to avoid overwriting the group header text
    if (damage !== undefined && enableGroups && (groupLevels ?? 1) > 1) {
        // For multi-level groups, only fill column header area to preserve group headers
        // Start from totalGroupHeaderHeight (not +1) to cover the bottom border of group headers
        ctx.fillRect(0, totalGroupHeaderHeight, width, headerHeight);
    } else {
        ctx.fillRect(0, 0, width, totalHeaderHeight);
    }

    const hCol = hovered?.[0]?.[0];
    const hRow = hovered?.[0]?.[1];
    const hPosX = hovered?.[1]?.[0];
    const hPosY = hovered?.[1]?.[1];

    const font = outerTheme.headerFontFull;
    // Assinging the context font too much can be expensive, it can be worth it to minimze this
    ctx.font = font;
    walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x, _y, clipX) => {
        if (damage !== undefined && !damage.has([c.sourceIndex, -1])) return;
        const diff = Math.max(0, clipX - x);
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + diff, totalGroupHeaderHeight, c.width - diff, headerHeight);
        ctx.clip();

        const groupTheme = getGroupDetails(getGroupName(c.group)).overrideTheme;
        const theme =
            c.themeOverride === undefined && groupTheme === undefined
                ? outerTheme
                : mergeAndRealizeTheme(outerTheme, groupTheme, c.themeOverride);

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
        const hover = noHover
            ? 0
            : (hoverValues.find(s => s.item[0] === c.sourceIndex && s.item[1] === -1)?.hoverAmount ?? 0);

        const hasSelectedCell = selection?.current !== undefined && selection.current.cell[0] === c.sourceIndex;

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

        drawHeader(
            ctx,
            x,
            y,
            c.width,
            headerHeight,
            c,
            selected,
            theme,
            hoveredBoolean,
            hoveredBoolean ? hPosX : undefined,
            hoveredBoolean ? hPosY : undefined,
            hasSelectedCell,
            hover,
            spriteManager,
            drawHeaderCallback,
            touchMode
        );
        ctx.restore();
    });

    if (enableGroups) {
        if (effectiveGroupLevels > 1) {
            // Multi-level groups
            drawMultiLevelGroups(
                ctx,
                effectiveCols,
                width,
                translateX,
                effectiveGroupHeaderHeights,
                effectiveGroupLevels,
                hovered,
                outerTheme,
                spriteManager,
                hoverValues,
                verticalBorder,
                getGroupDetails,
                damage
            );

        } else {
            // Single-level groups (backward compatible)
            drawGroups(
                ctx,
                effectiveCols,
                width,
                translateX,
                groupHeaderHeight,
                hovered,
                outerTheme,
                spriteManager,
                hoverValues,
                verticalBorder,
                getGroupDetails,
                damage
            );
        }
    }

    // Draw border between group headers and column headers for multi-level groups
    // This must be drawn last to ensure it's visible after partial redraws
    if (enableGroups && (groupLevels ?? 1) > 1) {
        ctx.beginPath();
        ctx.moveTo(0, totalGroupHeaderHeight + 0.5);
        ctx.lineTo(width, totalGroupHeaderHeight + 0.5);
        ctx.strokeStyle = outerTheme.borderColor;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

export function drawGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeight: number,
    hovered: HoverInfo | undefined,
    theme: FullTheme,
    spriteManager: SpriteManager,
    _hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined
) {
    const xPad = 8;
    const [hCol, hRow] = hovered?.[0] ?? [];

    let finalX = 0;
    walkGroups(effectiveCols, width, translateX, groupHeaderHeight, (span, groupName, x, y, w, h) => {
        if (
            damage !== undefined &&
            !damage.hasItemInRectangle({
                x: span[0],
                y: -2,
                width: span[1] - span[0] + 1,
                height: 1,
            })
        )
            return;
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        const group = getGroupDetails(groupName);
        const groupTheme =
            group?.overrideTheme === undefined ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);
        const isHovered = hRow === -2 && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
        const fillColor = isHovered
            ? (groupTheme.bgGroupHeaderHovered ?? groupTheme.bgHeaderHovered)
            : (groupTheme.bgGroupHeader ?? groupTheme.bgHeader);

        if (fillColor !== theme.bgHeader) {
            ctx.fillStyle = fillColor;
            ctx.fill();
        }

        ctx.fillStyle = groupTheme.textGroupHeader ?? groupTheme.textHeader;
        if (group !== undefined) {
            let drawX = x;
            if (group.icon !== undefined) {
                spriteManager.drawSprite(
                    group.icon,
                    "normal",
                    ctx,
                    drawX + xPad,
                    (groupHeaderHeight - 20) / 2,
                    20,
                    groupTheme
                );
                drawX += 26;
            }
            ctx.fillText(
                group.name,
                drawX + xPad,
                groupHeaderHeight / 2 + getMiddleCenterBias(ctx, theme.headerFontFull)
            );

            if (group.actions !== undefined && isHovered) {
                const actionBoxes = getActionBoundsForGroup({ x, y, width: w, height: h }, group.actions);

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

                // eslint-disable-next-line prefer-const
                const [mouseX, mouseY] = hovered?.[1] ?? [-1, -1];
                for (let i = 0; i < group.actions.length; i++) {
                    const action = group.actions[i];
                    const box = actionBoxes[i];
                    const actionHovered = pointInRect(box, mouseX + x, mouseY);
                    if (actionHovered) {
                        ctx.globalAlpha = 1;
                    }
                    spriteManager.drawSprite(
                        action.icon,
                        "normal",
                        ctx,
                        box.x + box.width / 2 - 10,
                        box.y + box.height / 2 - 10,
                        20,
                        groupTheme
                    );
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

export function drawMultiLevelGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeights: readonly number[],
    groupLevels: number,
    hovered: HoverInfo | undefined,
    theme: FullTheme,
    spriteManager: SpriteManager,
    _hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined
) {
    const xPad = 8;
    const [hCol, hRow] = hovered?.[0] ?? [];

    // Set font for text rendering
    ctx.font = theme.headerFontFull;

    // Calculate total group header height for border drawing
    const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);

    // Fill the entire group header area with background color first (when not doing partial redraw)
    if (damage === undefined) {
        ctx.fillStyle = theme.bgHeader;
        ctx.fillRect(0, 0, width, totalGroupHeaderHeight);
    }

    // Track the rightmost x position for final border
    let finalX = 0;

    walkMultiLevelGroups(effectiveCols, width, translateX, groupHeaderHeights, groupLevels, (span, groupName, x, y, w, h, level) => {
        // Check damage for this group area
        // Group header level n corresponds to row = -(n+2)
        const damageRow = -(level + 2);
        if (
            damage !== undefined &&
            !damage.hasItemInRectangle({
                x: span[0],
                y: damageRow,
                width: span[1] - span[0] + 1,
                height: 1,
            })
        )
            return;

        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.clip();

        const group = getGroupDetails(groupName);
        const groupTheme =
            group?.overrideTheme === undefined ? theme : mergeAndRealizeTheme(theme, group.overrideTheme);

        // Check if this group cell is hovered
        // hRow === -(level + 2) means this level is hovered
        const isHovered = hRow === damageRow && hCol !== undefined && hCol >= span[0] && hCol <= span[1];
        const fillColor = isHovered
            ? (groupTheme.bgGroupHeaderHovered ?? groupTheme.bgHeaderHovered)
            : (groupTheme.bgGroupHeader ?? groupTheme.bgHeader);

        // Always fill background to ensure proper rendering
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);

        ctx.fillStyle = groupTheme.textGroupHeader ?? groupTheme.textHeader;
        const displayName = group?.name ?? groupName;
        const textMetrics = ctx.measureText(displayName);
        const textWidth = textMetrics.width;
        const iconWidth = group?.icon !== undefined ? 26 : 0;
        const totalContentWidth = iconWidth + textWidth;
        const centerX = x + (w - totalContentWidth) / 2;

        if (group?.icon !== undefined) {
            spriteManager.drawSprite(
                group.icon,
                "normal",
                ctx,
                centerX,
                y + (h - 20) / 2,
                20,
                groupTheme
            );
        }
        ctx.fillText(
            displayName,
            centerX + iconWidth,
            y + h / 2 + getMiddleCenterBias(ctx, theme.headerFontFull)
        );

        if (group !== undefined) {

            // Draw actions if hovered (similar to single-level groups)
            if (group.actions !== undefined && isHovered) {
                const actionBoxes = getActionBoundsForGroup({ x, y, width: w, height: h }, group.actions);

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

                const [mouseX, mouseY] = hovered?.[1] ?? [-1, -1];
                for (let i = 0; i < group.actions.length; i++) {
                    const action = group.actions[i];
                    const box = actionBoxes[i];
                    const actionHovered = pointInRect(box, mouseX + x, mouseY);
                    if (actionHovered) {
                        ctx.globalAlpha = 1;
                    }
                    spriteManager.drawSprite(
                        action.icon,
                        "normal",
                        ctx,
                        box.x + box.width / 2 - 10,
                        box.y + box.height / 2 - 10,
                        20,
                        groupTheme
                    );
                    if (actionHovered) {
                        ctx.globalAlpha = 0.6;
                    }
                }

                ctx.globalAlpha = 1;
            }
        }

        // Draw borders for this cell
        ctx.strokeStyle = theme.borderColor;
        ctx.lineWidth = 1;

        // Left vertical border
        if (x !== 0 && verticalBorder(span[0])) {
            ctx.beginPath();
            ctx.moveTo(x + 0.5, y);
            ctx.lineTo(x + 0.5, y + h);
            ctx.stroke();
        }

        // Bottom horizontal border
        // For the last level, only draw when not doing partial redraw (damage === undefined)
        // to avoid border appearing when hovering column headers
        if (level < groupLevels - 1 || damage === undefined) {
            ctx.beginPath();
            ctx.moveTo(x, y + h + 0.5);
            ctx.lineTo(x + w, y + h + 0.5);
            ctx.stroke();
        }

        ctx.restore();

        finalX = Math.max(finalX, x + w);
    });

    // Draw borders (only when not doing partial redraw to avoid drawing over column headers)
    if (damage === undefined) {
        ctx.beginPath();

        // Right border
        ctx.moveTo(finalX + 0.5, 0);
        ctx.lineTo(finalX + 0.5, totalGroupHeaderHeight);

        // Horizontal borders between levels (not at the bottom - that's handled by column header area)
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
function getHeaderMenuBounds(x: number, y: number, width: number, height: number, isRtl: boolean): Rectangle {
    if (isRtl) return { x, y, width: menuButtonSize, height: Math.min(menuButtonSize, height) };
    return {
        x: x + width - menuButtonSize, // right align
        y: Math.max(y, y + height / 2 - menuButtonSize / 2), // center vertically
        width: menuButtonSize,
        height: Math.min(menuButtonSize, height),
    };
}

export function getActionBoundsForGroup(
    box: Rectangle,
    actions: NonNullable<GroupDetails["actions"]>
): readonly Rectangle[] {
    const result: Rectangle[] = [];
    let x = box.x + box.width - 26 * actions.length;
    const y = box.y + box.height / 2 - 13;
    const height = 26;
    const width = 26;
    for (let i = 0; i < actions.length; i++) {
        result.push({
            x,
            y,
            width,
            height,
        });
        x += 26;
    }
    return result;
}

type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};

interface HeaderLayout {
    readonly textBounds: Rectangle | undefined;
    readonly iconBounds: Rectangle | undefined;
    readonly iconOverlayBounds: Rectangle | undefined;
    readonly indicatorIconBounds: Rectangle | undefined;
    readonly menuBounds: Rectangle | undefined;
}

function flipHorizontal(
    toFlip: Mutable<Rectangle> | undefined,
    mirrorX: number,
    isRTL: boolean
): Mutable<Rectangle> | undefined {
    if (!isRTL || toFlip === undefined) return toFlip;
    toFlip.x = mirrorX - (toFlip.x - mirrorX) - toFlip.width;
    return toFlip;
}

export function computeHeaderLayout(
    ctx: CanvasRenderingContext2D | undefined,
    c: MappedGridColumn,
    x: number,
    y: number,
    width: number,
    height: number,
    theme: FullTheme,
    isRTL: boolean
): HeaderLayout {
    const xPad = theme.cellHorizontalPadding;
    const headerIconSize = theme.headerIconSize;
    const menuBounds = getHeaderMenuBounds(x, y, width, height, false);

    let drawX = x + xPad;
    const iconBounds =
        c.icon === undefined
            ? undefined
            : {
                  x: drawX,
                  y: y + (height - headerIconSize) / 2,
                  width: headerIconSize,
                  height: headerIconSize,
              };

    const iconOverlayBounds =
        iconBounds === undefined || c.overlayIcon === undefined
            ? undefined
            : {
                  x: iconBounds.x + 9,
                  y: iconBounds.y + 6,
                  width: 18,
                  height: 18,
              };

    if (iconBounds !== undefined) {
        drawX += Math.ceil(headerIconSize * 1.3);
    }

    // 텍스트 너비 측정
    const textWidth =
        ctx === undefined
            ? (getMeasuredTextCache(c.title, theme.headerFontFull)?.width ?? 0)
            : measureTextCached(c.title, ctx, theme.headerFontFull).width;

    // 메뉴가 있는 경우 오른쪽 공간 확보
    const menuWidth = c.hasMenu === true ? 35 : 0;
    const indicatorWidth = c.indicatorIcon !== undefined ? headerIconSize + xPad : 0;

    // 텍스트+indicator를 중앙 정렬하기 위한 계산
    const contentWidth = textWidth + indicatorWidth;
    const availableWidth = width - (iconBounds !== undefined ? Math.ceil(headerIconSize * 1.3) + xPad : xPad) - menuWidth - xPad;
    const centeredStartX = x + (iconBounds !== undefined ? Math.ceil(headerIconSize * 1.3) + xPad : xPad) + (availableWidth - contentWidth) / 2;

    // textBounds를 중앙 정렬된 위치로 설정
    const textBounds = {
        x: Math.max(drawX, centeredStartX),  // 아이콘과 겹치지 않도록
        y: y,
        width: textWidth,
        height: height,
    };

    let indicatorIconBounds: Rectangle | undefined = undefined;
    if (c.indicatorIcon !== undefined) {
        indicatorIconBounds = {
            x: textBounds.x + textWidth + xPad,
            y: y + (height - headerIconSize) / 2,
            width: headerIconSize,
            height: headerIconSize,
        };
    }

    const mirrorPoint = x + width / 2;

    return {
        menuBounds: flipHorizontal(menuBounds, mirrorPoint, isRTL),
        iconBounds: flipHorizontal(iconBounds, mirrorPoint, isRTL),
        iconOverlayBounds: flipHorizontal(iconOverlayBounds, mirrorPoint, isRTL),
        textBounds: flipHorizontal(textBounds, mirrorPoint, isRTL),
        indicatorIconBounds: flipHorizontal(indicatorIconBounds, mirrorPoint, isRTL),
    };
}

function drawHeaderInner(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    c: MappedGridColumn,
    selected: boolean,
    theme: FullTheme,
    isHovered: boolean,
    posX: number | undefined,
    posY: number | undefined,
    hoverAmount: number,
    spriteManager: SpriteManager,
    touchMode: boolean,
    isRtl: boolean,
    headerLayout: HeaderLayout
) {
    if (c.rowMarker !== undefined && c.headerRowMarkerDisabled !== true) {
        const checked = c.rowMarkerChecked;
        if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
            ctx.globalAlpha = hoverAmount;
        }
        const markerTheme =
            c.headerRowMarkerTheme !== undefined ? mergeAndRealizeTheme(theme, c.headerRowMarkerTheme) : theme;
        drawCheckbox(
            ctx,
            markerTheme,
            checked,
            x,
            y,
            width,
            height,
            false,
            undefined,
            undefined,
            theme.checkboxMaxSize,
            "center",
            c.rowMarker
        );
        if (checked !== true && c.headerRowMarkerAlwaysVisible !== true) {
            ctx.globalAlpha = 1;
        }
        return;
    }

    const fillStyle = selected ? theme.textHeaderSelected : theme.textHeader;

    const shouldDrawMenu =
        c.hasMenu === true && (isHovered || (touchMode && selected)) && headerLayout.menuBounds !== undefined;

    if (c.icon !== undefined && headerLayout.iconBounds !== undefined) {
        let variant: SpriteVariant = selected ? "selected" : "normal";
        if (c.style === "highlight") {
            variant = selected ? "selected" : "special";
        }
        spriteManager.drawSprite(
            c.icon,
            variant,
            ctx,
            headerLayout.iconBounds.x,
            headerLayout.iconBounds.y,
            headerLayout.iconBounds.width,
            theme
        );

        if (c.overlayIcon !== undefined && headerLayout.iconOverlayBounds !== undefined) {
            spriteManager.drawSprite(
                c.overlayIcon,
                selected ? "selected" : "special",
                ctx,
                headerLayout.iconOverlayBounds.x,
                headerLayout.iconOverlayBounds.y,
                headerLayout.iconOverlayBounds.width,
                theme
            );
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
        ctx.fillText(
            c.title,
            isRtl ? headerLayout.textBounds.x + headerLayout.textBounds.width : headerLayout.textBounds.x,
            y + height / 2 + getMiddleCenterBias(ctx, theme.headerFontFull)
        );
    }

    if (isRtl) {
        ctx.textAlign = "left";
    }

    if (
        c.indicatorIcon !== undefined &&
        headerLayout.indicatorIconBounds !== undefined &&
        (!shouldDrawMenu ||
            !intersectRect(
                headerLayout.menuBounds.x,
                headerLayout.menuBounds.y,
                headerLayout.menuBounds.width,
                headerLayout.menuBounds.height,
                headerLayout.indicatorIconBounds.x,
                headerLayout.indicatorIconBounds.y,
                headerLayout.indicatorIconBounds.width,
                headerLayout.indicatorIconBounds.height
            ))
    ) {
        let variant: SpriteVariant = selected ? "selected" : "normal";
        if (c.style === "highlight") {
            variant = selected ? "selected" : "special";
        }
        spriteManager.drawSprite(
            c.indicatorIcon,
            variant,
            ctx,
            headerLayout.indicatorIconBounds.x,
            headerLayout.indicatorIconBounds.y,
            headerLayout.indicatorIconBounds.width,
            theme
        );
    }

    if (shouldDrawMenu && headerLayout.menuBounds !== undefined) {
        const menuBounds = headerLayout.menuBounds;

        const hovered = posX !== undefined && posY !== undefined && pointInRect(menuBounds, posX + x, posY + y);

        if (!hovered) {
            ctx.globalAlpha = 0.7;
        }

        if (c.menuIcon === undefined || c.menuIcon === GridColumnMenuIcon.Triangle) {
            // Draw the default triangle menu icon:
            ctx.beginPath();
            const triangleX = menuBounds.x + menuBounds.width / 2 - 5.5;
            const triangleY = menuBounds.y + menuBounds.height / 2 - 3;
            roundedPoly(
                ctx,
                [
                    {
                        x: triangleX,
                        y: triangleY,
                    },
                    {
                        x: triangleX + 11,
                        y: triangleY,
                    },
                    {
                        x: triangleX + 5.5,
                        y: triangleY + 6,
                    },
                ],
                1
            );
            ctx.fillStyle = fillStyle;
            ctx.fill();
        } else if (c.menuIcon === GridColumnMenuIcon.Dots) {
            // Draw the three dots menu icon:
            ctx.beginPath();
            const dotsX = menuBounds.x + menuBounds.width / 2;
            const dotsY = menuBounds.y + menuBounds.height / 2;
            drawMenuDots(ctx, dotsX, dotsY);
            ctx.fillStyle = fillStyle;
            ctx.fill();
        } else {
            // Assume that the user has specified a valid sprite image as header icon:
            const iconX = menuBounds.x + (menuBounds.width - theme.headerIconSize) / 2;
            const iconY = menuBounds.y + (menuBounds.height - theme.headerIconSize) / 2;
            spriteManager.drawSprite(c.menuIcon, "normal", ctx, iconX, iconY, theme.headerIconSize, theme);
        }

        if (!hovered) {
            ctx.globalAlpha = 1;
        }
    }
}

export function drawHeader(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    c: MappedGridColumn,
    selected: boolean,
    theme: FullTheme,
    isHovered: boolean,
    posX: number | undefined,
    posY: number | undefined,
    hasSelectedCell: boolean,
    hoverAmount: number,
    spriteManager: SpriteManager,
    drawHeaderCallback: DrawHeaderCallback | undefined,
    touchMode: boolean
) {
    const isRtl = direction(c.title) === "rtl";
    const headerLayout = computeHeaderLayout(ctx, c, x, y, width, height, theme, isRtl);

    if (drawHeaderCallback !== undefined) {
        drawHeaderCallback(
            {
                ctx,
                theme,
                rect: { x, y, width, height },
                column: c,
                columnIndex: c.sourceIndex,
                isSelected: selected,
                hoverAmount,
                isHovered,
                hasSelectedCell,
                spriteManager,
                menuBounds: headerLayout?.menuBounds ?? { x: 0, y: 0, height: 0, width: 0 },
                hoverX: posX,
                hoverY: posY,
            },
            () =>
                drawHeaderInner(
                    ctx,
                    x,
                    y,
                    width,
                    height,
                    c,
                    selected,
                    theme,
                    isHovered,
                    posX,
                    posY,
                    hoverAmount,
                    spriteManager,
                    touchMode,
                    isRtl,
                    headerLayout
                )
        );
    } else {
        drawHeaderInner(
            ctx,
            x,
            y,
            width,
            height,
            c,
            selected,
            theme,
            isHovered,
            posX,
            posY,
            hoverAmount,
            spriteManager,
            touchMode,
            isRtl,
            headerLayout
        );
    }
}
