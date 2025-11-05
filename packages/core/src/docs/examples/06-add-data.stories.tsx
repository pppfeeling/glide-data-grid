import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    CompactSelection,
    type EditableGridCell,
    type GridCell,
    GridCellKind,
    type GridSelection,
    type Item,
    isEditableGridCell,
} from "../../internal/data-grid/data-grid-types.js";
import {
    BeautifulWrapper,
    Description,
    defaultProps,
    useMockDataGenerator,
} from "../../data-editor/stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import type { FillPatternEventArgs } from "../../internal/data-grid/event-args.js";
import type { DataEditorRef } from "../../data-editor/data-editor.js";
import { faker } from "@faker-js/faker";

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

const generateNewCell = (colIndex: number): GridCell => {
    switch (colIndex) {
        case 0: return { kind: GridCellKind.Text, displayData: faker.name.firstName(), data: faker.name.firstName(), allowOverlay: true, readonly: false };
        case 1: return { kind: GridCellKind.Text, displayData: faker.name.lastName(), data: faker.name.lastName(), allowOverlay: true, readonly: true };
        case 2: return { kind: GridCellKind.Image, data: [`https://picsum.photos/id/${Math.round(Math.random() * 100)}/900/900`], displayData: [`https://picsum.photos/id/${Math.round(Math.random() * 100)}/40/40`], allowOverlay: true, readonly: true };
        case 3: return { kind: GridCellKind.Text, displayData: faker.internet.email(), data: faker.internet.email(), allowOverlay: true, readonly: true };
        case 4: return { kind: GridCellKind.Text, displayData: faker.name.jobTitle(), data: faker.name.jobTitle(), allowOverlay: true, readonly: true };
        case 5: return { kind: GridCellKind.Uri, displayData: faker.internet.url(), data: faker.internet.url(), hoverEffect: true, allowOverlay: true, readonly: true, onClickUri: a => { window.open(faker.internet.url(), "_blank"); a.preventDefault(); } };
        default: return { kind: GridCellKind.Text, displayData: "", data: "", allowOverlay: true, readonly: false };
    }
};

const generateNewRow = (cols: any[]): GridCell[] => {
    return cols.map((_, colIndex) => generateNewCell(colIndex));
};

export const AddData = () => {
    const gridRef = React.useRef<DataEditorRef>(null);

    const [gridSelection, setGridSelection] = React.useState<GridSelection>({
                columns: CompactSelection.empty(),
                rows: CompactSelection.empty(),
            });

    const { cols, onColumnResize } = useMockDataGenerator(6); // 6 columns for the example

    const initialRows = 10;
    const [data, setData] = React.useState<GridCell[][]>(() => {
        const initialData: GridCell[][] = [];
        for (let r = 0; r < initialRows; r++) {
            initialData.push(generateNewRow(cols));
        }
        return initialData;
    });

    const [numRows, setNumRows] = React.useState(initialRows);

    // FirstName이 'D'로 시작하고 Email에 'gmail'이 포함된 행의 인덱스를 저장하는 Set
    const [highlightedRows, setHighlightedRows] = React.useState<Set<number>>(new Set());

    // 1. 데이터 처리 로직
    const processRow = React.useCallback(
        (row: number) => {
            const firstNameCell = data[row]?.[0];
            const emailCell = data[row]?.[3];

            const firstName = firstNameCell && "data" in firstNameCell ? (firstNameCell.data as string) : "";
            const email = emailCell && "data" in emailCell ? (emailCell.data as string) : "";

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
        [data]
    );

     // 4. getCellContentWithHighlight 수정
     const getCellContentWithHighlight = React.useCallback(
        ([col, row]: Item): GridCell => {
            const content = data[row]?.[col];
            if (content === undefined) {
                return { kind: GridCellKind.Text, displayData: "", data: "", allowOverlay: true, readonly: false };
            }
            if (highlightedRows.has(row)) {
                return { ...content, themeOverride: { bgCell: "#fff2b2" } };
            }
            return content;
        },
        [data, highlightedRows]
    );

    const setCellValue = React.useCallback(
        ([col, row]: Item, newValue: EditableGridCell) => {
            setData(prevData => {
                const newData = [...prevData];
                const newRow = [...(newData[row] || [])];
                newRow[col] = newValue;
                newData[row] = newRow;
                return newData;
            });
            processRow(row);
        },
        [processRow]
    );

    // 2. onFillPattern 구현
    const onFillPattern = React.useCallback(
        (event: FillPatternEventArgs) => {
            const { patternSource, fillDestination } = event;

            const sourceData: GridCell[][] = [];
            for (let r = 0; r < patternSource.height; r++) {
                const row = [];
                for (let c = 0; c < patternSource.width; c++) {
                    row.push(getCellContentWithHighlight([patternSource.x + c, patternSource.y + r]));
                }
                sourceData.push(row);
            }

            const affectedRows = new Set<number>();
            setData(prevData => {
                const newData = [...prevData];
                for (let r = 0; r < fillDestination.height; r++) {
                    const targetRowIndex = fillDestination.y + r;
                    if (!newData[targetRowIndex]) {
                        newData[targetRowIndex] = generateNewRow(cols);
                    }
                    const newRow = [...newData[targetRowIndex]];
                    for (let c = 0; c < fillDestination.width; c++) {
                        const d = sourceData[r % patternSource.height][c % patternSource.width];
                        const targetCol = fillDestination.x + c;
                        if (isEditableGridCell(d)) {
                            newRow[targetCol] = d;
                            affectedRows.add(targetRowIndex);
                        }
                    }
                    newData[targetRowIndex] = newRow;
                }
                return newData;
            });

            // 채우기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
            affectedRows.forEach(row => processRow(row));
        },
        [cols, getCellContentWithHighlight, processRow]
    );

    // 3. onPaste 구현
    const onPaste = React.useCallback(
        (target: Item, values: readonly (readonly string[])[]): boolean => {
            const [targetCol, targetRow] = target;
            const affectedRows = new Set<number>();

            setData(prevData => {
                const newData = [...prevData];
                values.forEach((row, rowIndex) => {
                    const writeRowIndex = targetRow + rowIndex;
                    if (!newData[writeRowIndex]) {
                        newData[writeRowIndex] = generateNewRow(cols);
                    }
                    const newRow = [...newData[writeRowIndex]];
                    row.forEach((val, colIndex) => {
                        const writeCol = targetCol + colIndex;
                        if (writeCol < cols.length) {
                            const template = newRow[writeCol];
                            if (isEditableGridCell(template)) {
                                const newCell = { ...template, data: val };
                                newRow[writeCol] = newCell as EditableGridCell;
                                affectedRows.add(writeRowIndex);
                            }
                        }
                    });
                    newData[writeRowIndex] = newRow;
                });
                return newData;
            });

            // 붙여넣기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
            affectedRows.forEach(row => processRow(row));

            return false; // 내부 붙여넣기 로직을 막고 직접 처리했음을 알림
        },
        [cols.length, cols, processRow]
    );

    const onAddRow = React.useCallback(() => {
        setData(prevData => {
            const newData = [...prevData];
            const newRow = generateNewRow(cols);
            const firstSelectedIndex = gridSelection.rows.first();

            if (firstSelectedIndex !== undefined) {
                newData.splice(firstSelectedIndex + 1, 0, newRow);
            } else {
                newData.push(newRow);
            }
            setNumRows(newData.length);
            return newData;
        });
    }, [cols, gridSelection.rows]);

    const onDeleteRow = React.useCallback(() => {
        if (gridSelection.rows.length === 0) return;

        setData(prevData => prevData.filter((_, index) => !gridSelection.rows.hasIndex(index)));
        setNumRows(prevNum => prevNum - gridSelection.rows.length);
        setGridSelection({
            columns: CompactSelection.empty(),
            rows: CompactSelection.empty(),
        });
    }, [gridSelection.rows]);

     const onCsvDownload = React.useCallback(() => {
        if (data.length === 0) return;

        const headers = cols.map(c => c.title).join(",");
        const csvRows = data.map(row =>
            row.map(cell => {
                let cellData = "";
                if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number || cell.kind === GridCellKind.Uri || cell.kind === GridCellKind.Markdown) {
                    cellData = cell.displayData ?? cell.data?.toString() ?? "";
                } else if (cell.kind === GridCellKind.Image || cell.kind === GridCellKind.Drilldown || cell.kind === GridCellKind.Bubble) {
                    cellData = Array.isArray(cell.data) ? cell.data.join(";") : "";
                } else if (cell.kind === GridCellKind.Boolean) {
                    cellData = cell.data?.toString() ?? "false";
                }
                // Escape commas and quotes
                const escaped = cellData.replace(/"/g, '""');
                return `"${escaped}"`;
            }).join(",")
        );

        const csvString = "\uFEFF" + [headers, ...csvRows].join("\n");

        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "grid-data.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
     },[data, cols])


    return (
        <>
            <div>
                <button onClick={onAddRow}>열추가</button>
                <button onClick={onDeleteRow}>열삭제</button>
                <button onClick={onCsvDownload}>CSV다운로드</button>
            </div>
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
                }}
                onFillPattern={onFillPattern}
                onPaste={true}
                onGridSelectionChange={setGridSelection}
                gridSelection={gridSelection}
                disabledRows={(row) => {
                  return row % 3 === 0
                }}
            />
        </>
    );
};

AddData.storyName = "06. Add Data";
