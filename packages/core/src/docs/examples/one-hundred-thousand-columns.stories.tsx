import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import { GridCellKind, type GridCell, type GridColumn, type Item } from "../../internal/data-grid/data-grid-types.js";
import { BeautifulWrapper, Description, defaultProps } from "../stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="One Hundred Thousand Columns"
                    description={
                        <Description>
                            Data grid supports way more columns than you will ever need. Also this is rendering 10
                            million cells but that&apos;s not important.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const OneHundredThousandCols: React.FC = () => {
    const cols = React.useMemo<GridColumn[]>(() => {
        return Array.from({ length: 100_000 }, (_, index) => ({
            id: `col-${index}`,
            title: `Col ${index + 1}`,
            width: 120,
        }));
    }, []);

    const getCellContent = React.useCallback(([col, row]: Item): GridCell => {
        const display = `R${row + 1} C${col + 1}`;
        return {
            kind: GridCellKind.Text,
            data: display,
            displayData: display,
            allowOverlay: true,
            readonly: true,
        };
    }, []);

    return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;
};
