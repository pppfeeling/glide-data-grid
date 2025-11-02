import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    CompactSelection,
    type EditableGridCell,
    type GridSelection,
    type Item,
    isEditableGridCell,
} from "../../internal/data-grid/data-grid-types.js";
import {
    BeautifulWrapper,
    Description,
    MoreInfo,
    useMockDataGenerator,
    KeyName,
    defaultProps,
    clearCell,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { FillPatternEventArgs } from "../../internal/data-grid/event-args.js";
import type { DataGridRef } from "../../internal/data-grid/data-grid.js";
import type { DataEditorRef } from "../../data-editor/data-editor.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",

    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Add data"
                    description={
                        <>
                            <Description>
                                rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가
                                multi일때 선택방법), rowMarker (모양설정),
                                <br />
                                rowSelection 제어 prop :gridSelection, onGridSelectionChange
                            </Description>
                        </>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

export const AddData = () => {
    const gridRef = React.useRef<DataEditorRef>(null);

    const { cols, getCellContent, setCellValueRaw, setCellValue } = useMockDataGenerator(60, false);

    const [numRows, setNumRows] = React.useState(50);

    // FirstName이 'D'로 시작하고 Email에 'gmail'이 포함된 행의 인덱스를 저장하는 Set
    const [highlightedRows, setHighlightedRows] = React.useState<Set<number>>(new Set());

    // 1. 데이터 처리 로직
    const processRow = React.useCallback(
        (row: number) => {
            const firstNameCell = getCellContent([0, row]);
            const emailCell = getCellContent([3, row]);

            const firstName = "data" in firstNameCell ? (firstNameCell.data as string) : "";
            const email = "data" in emailCell ? (emailCell.data as string) : "";

            if (email?.includes("gmail")) {
                setHighlightedRows(prev => new Set(prev).add(row));
            } else {
                setHighlightedRows(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(row);
                    return newSet;
                });
            }
        },
        [getCellContent]
    );

    // 4. getCellContent 수정
    const getCellContentWithHighlight = React.useCallback(
        (cell: Item) => {
            const content = getCellContent(cell);
            const [, row] = cell;
            if (highlightedRows.has(row)) {
                return { ...content, themeOverride: { bgCell: "#fff2b2" } };
            }
            return content;
        },
        [getCellContent, highlightedRows]
    );

    // 2. onFillPattern 구현
    const onFillPattern = React.useCallback(
        (event: FillPatternEventArgs) => {
            const { patternSource, fillDestination } = event;

            const sourceData = [];
            for (let r = 0; r < patternSource.height; r++) {
                const row = [];
                for (let c = 0; c < patternSource.width; c++) {
                    row.push(getCellContent([patternSource.x + c, patternSource.y + r]));
                }
                sourceData.push(row);
            }

            const affectedRows = new Set<number>();
            for (let r = 0; r < fillDestination.height; r++) {
                for (let c = 0; c < fillDestination.width; c++) {
                    const d = sourceData[r % patternSource.height][c % patternSource.width];
                    const targetCol = fillDestination.x + c;
                    const targetRow = fillDestination.y + r;
                    if (isEditableGridCell(d)) {
                        setCellValue([targetCol, targetRow], d);
                        affectedRows.add(targetRow);
                    }
                }
            }

            // 채우기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
            affectedRows.forEach(row => processRow(row));
        },
        [getCellContent, setCellValue, processRow]
    );

    // 3. onPaste 구현
    const onPaste = React.useCallback(
        (target: Item, values: readonly (readonly string[])[]): boolean => {
            const [targetCol, targetRow] = target;
            const affectedRows = new Set<number>();

            values.forEach((row, rowIndex) => {
                row.forEach((val, colIndex) => {
                    const writeCol = targetCol + colIndex;
                    const writeRow = targetRow + rowIndex;
                    if (writeCol < cols.length && writeRow < numRows) {
                        const template = getCellContent([writeCol, writeRow]);
                        if (isEditableGridCell(template)) {
                            const newCell = { ...template, data: val };
                            setCellValue([writeCol, writeRow], newCell as EditableGridCell);
                            affectedRows.add(writeRow);
                        }
                    }
                });
            });

            // 붙여넣기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
            affectedRows.forEach(row => processRow(row));

            return false; // 내부 붙여넣기 로직을 막고 직접 처리했음을 알림
        },
        [cols.length, numRows, getCellContent, setCellValue, processRow]
    );

    return (
        <DataEditor
            {...defaultProps}
            ref={gridRef}
            columns={cols}
            rows={numRows}
            getCellContent={getCellContentWithHighlight}
            isActivationOnEnter={true}
            rowSelect="single"
            rowSelectionMode="multi"
            rowMarkers={{
                kind: "checkbox-visible",
                checkboxStyle: "square",
                headerAlwaysVisible: true,
                headerDisabled: false,
                headerTheme: {
                    textMedium: "rgba(51, 51, 51, 0.50)",
                },
            }}
            fillHandle={{ size: 6 }}
            onCellEdited={(cell, newValue) => {
                setCellValue(cell, newValue);
                processRow(cell[1]); // 개별 셀 수정 후에도 로직 실행
            }}
            onFillPattern={onFillPattern}
            onPaste={onPaste}
        />
    );
};

AddData.storyName = "06. Add Data";
