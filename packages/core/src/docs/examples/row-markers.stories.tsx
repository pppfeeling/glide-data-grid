import React from "react";
import { type RowMarkerOptions } from "../../data-editor/data-editor.js";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Row markers"
                    description={
                        <>
                            <Description>
                                Row Markers can be controlled by setting the <PropName>rowMarkers</PropName> prop.
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

interface RowMarkersProps {
    markers: RowMarkerOptions["kind"];
    headerDisabled: boolean;
    rowNumber: boolean;
}

export const RowMarkers: React.FC<RowMarkersProps> = p => {
    const { cols, getCellContent } = useMockDataGenerator(10, false);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContent}
            verticalBorder={false}
            rowMarkers={{
                kind: p.markers,
                rowNumber: p.rowNumber,
                checkboxStyle: "square",
                headerAlwaysVisible: true,
                headerDisabled: p.headerDisabled,
                headerTheme: {
                    textMedium: "rgba(51, 51, 51, 0.50)",
                },
            }}
            columns={cols}
            rows={400}
        />
    );
};
(RowMarkers as any).args = {
    markers: "checkbox",
    headerDisabled: false,
    rowNumber: true,
};
(RowMarkers as any).argTypes = {
    markers: {
        control: { type: "select" },
        options: ["checkbox", "number", "none", "clickable-number", "checkbox-visible", "both", "checkbox-and-number"],
    },
    headerDisabled: {
        control: { type: "boolean" },
    },
    rowNumber: {
        control: { type: "boolean" },
    },
};
