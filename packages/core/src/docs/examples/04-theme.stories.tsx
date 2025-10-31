import React from "react";
import { getDataEditorTheme, type Theme } from "../../common/styles.js";
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

const darkTheme: Partial<Theme> = {
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
};

const hotdogStand: Partial<Theme> = {
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
};

const lightTheme = getDataEditorTheme();

const themeKeys = [
    "accentColor",
    "accentLight",
    "textDark",
    "textMedium",
    "textLight",
    "textBubble",
    "bgIconHeader",
    "fgIconHeader",
    "textHeader",
    "textHeaderSelected",
    "bgCell",
    "bgCellMedium",
    "bgHeader",
    "bgHeaderHasFocus",
    "bgHeaderHovered",
    "bgBubble",
    "bgBubbleSelected",
    "bgSearchResult",
    "borderColor",
    "drilldownBorder",
    "linkColor",
    "headerFontStyle",
    "baseFontStyle",
    "fontFamily",
];

const colorThemeKeys = [
    "accentColor",
    "accentLight",
    "textDark",
    "textMedium",
    "textLight",
    "textBubble",
    "bgIconHeader",
    "fgIconHeader",
    "textHeader",
    "textHeaderSelected",
    "bgCell",
    "bgCellMedium",
    "bgHeader",
    "bgHeaderHasFocus",
    "bgHeaderHovered",
    "bgBubble",
    "bgBubbleSelected",
    "bgSearchResult",
    "borderColor",
    "drilldownBorder",
    "linkColor",
];

interface ThemeEditorProps {
    theme: Partial<Theme>;
    setTheme: React.Dispatch<React.SetStateAction<Partial<Theme>>>;
}

const ThemeEditor: React.FC<ThemeEditorProps> = ({ theme, setTheme }) => {
    const [localTheme, setLocalTheme] = React.useState(theme);

    React.useEffect(() => {
        setLocalTheme(theme);
    }, [theme]);

    const handleBlur = (key: string, value: any) => {
        setTheme(prevTheme => ({ ...prevTheme, [key]: value }));
    };

    const handleChange = (key: string, value: string) => {
        setLocalTheme(prevTheme => ({ ...prevTheme, [key]: value }));
    };

    const getColorPickerValue = (val: string | undefined): string => {
        if (val === undefined || val === null) return "#000000";
        if (val.startsWith("#")) {
            if (/^#[0-9A-F]{6}$/i.test(val) || /^#[0-9A-F]{3}$/i.test(val)) {
                return val;
            }
        }
        if (val.startsWith("rgb")) {
            try {
                const parts = val.match(/(\d+)/g);
                if (parts && parts.length >= 3) {
                    const r = parseInt(parts[0]);
                    const g = parseInt(parts[1]);
                    const b = parseInt(parts[2]);
                    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
                        const toHex = (c: number) => c.toString(16).padStart(2, "0");
                        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
                    }
                }
            } catch (e) {
                return "#000000";
            }
        }
        return "#000000"; // default for invalid values or formats like color names
    };

    return (
        <table style={{ width: "100%" }}>
            <tbody>
                {themeKeys.map(key => (
                    <tr key={key}>
                        <td style={{ paddingRight: "10px" }}>
                            <label>{key}</label>
                        </td>
                        <td>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <input
                                    style={{ width: "100%" }}
                                    type="text"
                                    value={(localTheme as any)[key] ?? ""}
                                    onChange={e => handleChange(key, e.target.value)}
                                    onBlur={e => handleBlur(key, e.target.value)}
                                />
                                {colorThemeKeys.includes(key) && (
                                    <input
                                        type="color"
                                        value={getColorPickerValue((localTheme as any)[key])}
                                        onChange={e => {
                                            handleChange(key, e.target.value);
                                            handleBlur(key, e.target.value);
                                        }}
                                        style={{ marginLeft: "4px", minWidth: "24px" }}
                                    />
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
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

    const [theme, setTheme] = React.useState<Partial<Theme>>(lightTheme);

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
        <div style={{ display: "flex", backgroundColor: "#2176ac" }}>
                <div style={{ flexBasis: "50%", paddingRight: "10px" }}>
                    <ThemeEditor theme={theme} setTheme={setTheme} />
                </div>
                <div style={{ flexBasis: "50%"  }}>
                    <Description>
                        <div style={{ display: "flex" }}>
                            <div >
                                01. <PropName>global</PropName> - theme prop (object 지정)
                                <br />
                                02. <PropName>row</PropName> - getRowThemeOverride prop (object 지정)
                                <br />
                                03. <PropName>column</PropName> - cols prop (object 정의에서 themeOverride)
                                <br />
                                04. <PropName>cell</PropName> - getCellContent prop (return 값 object 에서
                                themeOverride)
                                <br /> 이렇게 4곳에서 theme 변수를 이용해 style변경 가능
                            </div>
                           
                        </div>
                    </Description>
                    <MoreInfo>
                        <button onClick={() => setTheme(lightTheme)}>Light</button> or{" "}
                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{" "}
                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>
                    </MoreInfo>
                     <DataEditor
                        {...defaultProps}
                        height={"49%"}
                        theme={theme}
                        getCellContent={getCellContent}
                        columns={cols}
                        rows={numRows}
                    />
                    <div style={{ height: "12px", width: "100%", backgroundColor: "#2176ac" }}></div>
                    <DataEditor
                        {...defaultProps}
                        height={"49%"}
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
                </div>
            
           
        </div>
    );
};

ThemeS.storyName = "04. Theme";
