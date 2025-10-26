import React from "react";
import type { Theme } from "../../common/styles.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    defaultProps,
    useAllMockedKinds,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { Item } from "../../internal/data-grid/data-grid-types.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <Story />
            </SimpleThemeWrapper>
        ),
    ],
};

const darkTheme = {
    accentColor: "#8c96ff",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "#b8b8b8",
    textLight: "#a0a0a0",
    textBubble: "#ffffff",

    bgIconHeader: "#b8b8b8",
    fgIconHeader: "#000000",
    textHeader: "#a1a1a1",
    textHeaderSelected: "#000000",

    bgCell: "#16161b",
    bgCellMedium: "#202027",
    bgHeader: "#212121",
    bgHeaderHasFocus: "#474747",
    bgHeaderHovered: "#404040",

    bgBubble: "#212121",
    bgBubbleSelected: "#000000",

    bgSearchResult: "#423c24",

    borderColor: "rgba(225,225,225,0.2)",
    drilldownBorder: "rgba(225,225,225,0.4)",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
    checkboxMaxSize: 18,
};

const hotdogStand = {
    accentColor: "#8c96ff",
    accentLight: "rgba(202, 206, 255, 0.253)",

    textDark: "#ffffff",
    textMedium: "rgba(255, 255, 255, 0.9)",
    textLight: "rgba(255, 255, 255, 0.7)",
    textBubble: "#000000",

    bgIconHeader: "#880000",
    fgIconHeader: "#ff5555",
    textHeader: "rgba(0, 0, 0, 0.9)",
    textHeaderSelected: "#000000",

    bgCell: "#ff0000",
    bgCellMedium: "#ff4d4d",
    bgHeader: "#f3f300",
    bgHeaderHasFocus: "#eeee00",
    bgHeaderHovered: "#e0e000",

    bgBubble: "#ffff00",
    bgBubbleSelected: "#ffff00",

    bgSearchResult: "#423c24",

    borderColor: "#ffff00",
    drilldownBorder: "#ffff00",

    linkColor: "#4F5DFF",

    headerFontStyle: "bold 14px",
    baseFontStyle: "13px",
    fontFamily:
        "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
    roundingRadius: 6,
    checkboxMaxSize: 40,
};

export const ThemeS: React.VFC = () => {
    let { cols, getCellContent, onColumnResize, setCellValue } = useAllMockedKinds();

    cols = cols.map((col, index) => {
        if (index === 0) {
            return {
                ...col,
                themeOverride: {
                    bgCell: "#f0f9ff",
                    textDark: "#0c4a6e",
                },
            };
        } else if (index === 3) {
            return {
                ...col,
                themeOverride: {
                    bgCell: "#f0fdf4",
                    textDark: "#14532d",
                    accentColor: "#22c55e",
                },
            };
        }
        return col;
    });

    const getValueTheme = (columnId: string, value: any) => {
        if (columnId === "Number") {
            return value > 50 ? { bgCell: "#fffce7", textDark: "#14532d" } : { bgCell: "#eeece2", textDark: "#7f1d1d" };
        }
        return undefined;
    };

    const getCellContentWithTheme = React.useCallback(
        (item: Item) => {
            const [col, row] = item;
            const colId = cols[col]?.title as string;
            const baseCell = getCellContent(item);

            if (baseCell.kind === "number") {
                const theme = getValueTheme(colId, baseCell.data as number);
                return {
                    ...baseCell,
                    themeOverride: theme,
                };
            }

            return baseCell;
        },
        [getCellContent]
    );

    const [theme, setTheme] = React.useState<Partial<Theme>>({});

    const [numRows, setNumRows] = React.useState(1000);

    const getRowThemeOverride = React.useCallback((row: number) => {
        if (row % 3 === 0) {
            return {
                bgCell: "#f0f9ff",
                textDark: "#0c4a6e",
                borderColor: "#4F46E5",
                horizontalBorderColor: "#818CF8",
            };
        }
        return undefined;
    }, []);

    return (
        <BeautifulWrapper
            title="Theme"
            description={
                <>
                    <Description>
                        01. DataGrid respects the theme provided by the <PropName>theme</PropName> prop.
                        <br />
                        02. Theme Per Column, 조건부 컬럼 스타일, 03. 조건부 컬럼 스타일
                    </Description>
                    <MoreInfo>
                        <button onClick={() => setTheme({})}>Light</button> or{" "}
                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{" "}
                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>
                    </MoreInfo>
                </>
            }>
            <DataEditor
                {...defaultProps}
                theme={theme}
                getCellContent={getCellContentWithTheme}
                columns={cols}
                rows={numRows}
                getRowThemeOverride={getRowThemeOverride}
                highlightRegions={[
                    {
                        color: "#ffff00",
                        range: {
                            x: 1, // 시작 컬럼
                            y: 1, // 시작 행
                            width: 3, // 너비 (컬럼 수)
                            height: 5, // 높이 (행 수)
                        },
                    },
                    {
                        color: "#ff0000",
                        range: {
                            x: 0,
                            y: 0,
                            width: 1,
                            height: 100,
                        },
                    },
                ]}
            />
        </BeautifulWrapper>
    );
};

ThemeS.storyName = "04. Theme";
