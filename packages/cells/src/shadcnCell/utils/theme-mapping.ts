// Theme mapping utilities for shadcn/ui integration
// Maps Glide Data Grid theme values to CSS variables and Tailwind classes

import type { FullTheme } from "@glideapps/glide-data-grid";

/**
 * Maps Glide Data Grid theme to CSS custom properties
 * These can be used in shadcn/ui components for consistent theming
 */
export const mapThemeToCSS = (theme: FullTheme): Record<string, string> => ({
    // Colors
    "--gdg-accent-color": theme.accentColor,
    "--gdg-accent-fg": theme.accentFg,
    "--gdg-accent-light": theme.accentLight,

    // Background colors
    "--gdg-bg-cell": theme.bgCell,
    "--gdg-bg-cell-medium": theme.bgCellMedium,
    "--gdg-bg-header": theme.bgHeader,
    "--gdg-bg-header-has-focus": theme.bgHeaderHasFocus,
    "--gdg-bg-header-hovered": theme.bgHeaderHovered,
    "--gdg-bg-bubble": theme.bgBubble,
    "--gdg-bg-bubble-selected": theme.bgBubbleSelected,

    // Text colors
    "--gdg-text-dark": theme.textDark,
    "--gdg-text-medium": theme.textMedium,
    "--gdg-text-light": theme.textLight,
    "--gdg-text-header": theme.textHeader,
    "--gdg-text-header-selected": theme.textHeaderSelected,
    "--gdg-text-bubble": theme.textBubble,

    // Border colors
    "--gdg-border-color": theme.borderColor,
    "--gdg-horizontal-border-color": theme.horizontalBorderColor || theme.borderColor,

    // Typography
    "--gdg-font-family": theme.fontFamily,
    "--gdg-header-font-family": theme.headerFontFamily,
    "--gdg-base-font-size": theme.baseFontSize,
    "--gdg-editor-font-size": theme.editorFontSize,
    "--gdg-header-font-size": theme.headerFontSize,

    // Spacing
    "--gdg-cell-horizontal-padding": `${theme.cellHorizontalPadding}px`,
    "--gdg-cell-vertical-padding": `${theme.cellVerticalPadding}px`,
    "--gdg-header-height": `${theme.headerHeight}px`,
    "--gdg-row-height": `${theme.rowHeight}px`,

    // Bubble/Badge styling
    "--gdg-bubble-height": `${theme.bubbleHeight}px`,
    "--gdg-bubble-padding": `${theme.bubblePadding}px`,
    "--gdg-bubble-margin": `${theme.bubbleMargin}px`,

    // Border radius
    "--gdg-rounding-radius": `${theme.roundingRadius || 4}px`,

    // Drilldown
    "--gdg-drilldown-border": theme.drilldownBorder,
});

/**
 * Applies theme CSS variables to a DOM element
 * Useful for setting up the theme context for shadcn/ui components
 */
export const applyThemeToElement = (element: HTMLElement, theme: FullTheme): void => {
    const cssVars = mapThemeToCSS(theme);
    Object.entries(cssVars).forEach(([property, value]) => {
        element.style.setProperty(property, value);
    });
};

/**
 * Gets Tailwind color classes based on theme values
 * Provides fallback mappings when CSS variables aren't available
 */
export const getThemeTailwindClasses = (theme: FullTheme) => ({
    // Background classes
    bgCell: "bg-background",
    bgCellMedium: "bg-muted",
    bgHeader: "bg-card",
    bgBubble: "bg-secondary",
    bgBubbleSelected: "bg-accent",

    // Text classes
    textDark: "text-foreground",
    textMedium: "text-muted-foreground",
    textLight: "text-muted-foreground",
    textHeader: "text-card-foreground",
    textBubble: "text-secondary-foreground",

    // Border classes
    border: "border-border",

    // Accent classes
    accent: "bg-accent text-accent-foreground",
    accentHover: "hover:bg-accent/80",

    // Interactive states
    hover: "hover:bg-muted/50",
    focus: "focus:ring-2 focus:ring-ring focus:ring-offset-2",

    // Spacing classes based on theme
    paddingX: `px-[${theme.cellHorizontalPadding}px]`,
    paddingY: `py-[${theme.cellVerticalPadding}px]`,

    // Border radius
    rounded: theme.roundingRadius ? `rounded-[${theme.roundingRadius}px]` : "rounded",
});

/**
 * Creates a style object for inline styles using theme values
 * Useful when Tailwind classes aren't sufficient
 */
export const getThemeInlineStyles = (theme: FullTheme) => ({
    // Colors
    accentColor: { color: theme.accentColor },
    accentBackground: { backgroundColor: theme.accentColor, color: theme.accentFg },
    cellBackground: { backgroundColor: theme.bgCell, color: theme.textDark },
    headerBackground: { backgroundColor: theme.bgHeader, color: theme.textHeader },
    bubbleBackground: { backgroundColor: theme.bgBubble, color: theme.textBubble },

    // Typography
    fontFamily: { fontFamily: theme.fontFamily },
    headerFontFamily: { fontFamily: theme.headerFontFamily },
    baseFontSize: { fontSize: theme.baseFontSize },
    editorFontSize: { fontSize: theme.editorFontSize },

    // Spacing
    cellPadding: {
        paddingLeft: theme.cellHorizontalPadding,
        paddingRight: theme.cellHorizontalPadding,
        paddingTop: theme.cellVerticalPadding,
        paddingBottom: theme.cellVerticalPadding,
    },

    // Border radius
    borderRadius: { borderRadius: theme.roundingRadius || 4 },

    // Bubble styling
    bubbleStyle: {
        height: theme.bubbleHeight,
        padding: `0 ${theme.bubblePadding}px`,
        margin: `0 ${theme.bubbleMargin}px`,
        borderRadius: theme.roundingRadius || theme.bubbleHeight / 2,
        backgroundColor: theme.bgBubble,
        color: theme.textBubble,
    },
});

/**
 * Utility to get contrasting text color based on background
 * Helps ensure readability when using dynamic theme colors
 */
export const getContrastingTextColor = (backgroundColor: string, theme: FullTheme): string => {
    // Simple luminance check - in a real implementation you might want
    // to use a more sophisticated color contrast algorithm
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? theme.textDark : "#ffffff";
};

/**
 * Merges user-provided styles with theme-based styles
 * Useful for component props that allow style customization
 */
export const mergeWithThemeStyles = (
    userStyles: React.CSSProperties | undefined,
    themeStyles: React.CSSProperties,
): React.CSSProperties => ({
    ...themeStyles,
    ...userStyles,
});

/**
 * Creates a CSS variables object that can be spread into component styles
 */
export const createThemeVariables = (theme: FullTheme) => {
    const cssVars = mapThemeToCSS(theme);
    return Object.fromEntries(
        Object.entries(cssVars).map(([key, value]) => [key, value])
    );
};