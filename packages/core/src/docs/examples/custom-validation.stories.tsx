import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    PropName,
    useMockDataGenerator,
    defaultProps,
} from "../../data-editor/stories/utils.js";
import { GridCellKind,type Item, type EditableGridCell, type GridCell } from "../../internal/data-grid/data-grid-types.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Custom Validation with onCellEdited"
                    description={
                        <>
                            <Description>
                                This story demonstrates custom cell validation directly within the <PropName>onCellEdited</PropName> callback,
                                including error highlighting.
                            </Description>
                            <MoreInfo>
                                <ul>
                                    <li><b>Number Column:</b> Only accepts numeric input.</li>
                                    <li><b>Email Column:</b> Validates for a basic email format.</li>
                                    <li><b>Text Column:</b> Coerces input to uppercase.</li>
                                </ul>
                            </MoreInfo>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const CustomValidation: React.VFC = () => {
    const { cols, getCellContent, setCellValue } = useMockDataGenerator(60, false);
    const [errors, setErrors] = React.useState<Map<string, string>>(new Map());

    const customCols = React.useMemo(() => [
        { ...cols[0], title: "Number Column", id: "number" },
        { ...cols[1], title: "Email Column", id: "email" },
        { ...cols[2], title: "Text Column", id: "text" },
        ...cols.slice(3),
    ], [cols]);

    const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
        const [col, row] = cell;
        const columnId = customCols[col].id;
        const errorKey = `${col}-${row}`;

        let isValid = true;
        let finalValue: EditableGridCell = newValue;

        if (newValue.kind === GridCellKind.Text) { // Only validate text cells
            switch (columnId) {
                case "number":
                    if (!/^-?\d*\.?\d*$/.test(newValue.data)) {
                        isValid = false;
                    }
                    break;
                case "email":
                    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$/.test(newValue.data)) {
                        isValid = false;
                    }
                    break;
                case "text":
                    if (newValue.data !== newValue.data.toUpperCase()) {
                        finalValue = {
                            ...newValue,
                            data: newValue.data.toUpperCase(),
                        };
                    }
                    break;
                default:
                    // No specific validation for other columns
                    break;
            }
        }
        
        setCellValue(cell, finalValue);
        if (!isValid) {
            // Validation failed, add error and ignore change
            setErrors(prev => new Map(prev).set(errorKey, "Invalid input"));
            return;
        }


        // Clear error if any
        setErrors(prev => {
            const newErrors = new Map(prev);
            newErrors.delete(errorKey);
            return newErrors;
        });
    }, [setCellValue, customCols]);

    const getCellContentWithValidation = React.useCallback((cell: Item): GridCell => {
        const content = getCellContent(cell);
        const [col, row] = cell;
        const errorKey = `${col}-${row}`;

        if (errors.has(errorKey)) {
            return {
                ...content,
                themeOverride: {
                    bgCell: "#fee",
                    textDark: "#c00",
                },
            };
        }
        return content;
    }, [getCellContent, errors]);

    return (
        <DataEditor
            {...defaultProps}
            getCellContent={getCellContentWithValidation}
            columns={customCols}
            rowMarkers={"both"}
            onPaste={true}
            onCellEdited={onCellEdited}
            rows={100}
        />
    );
};
