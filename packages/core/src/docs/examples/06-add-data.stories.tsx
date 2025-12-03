import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    CompactSelection,
    type EditableGridCell,
    type GridCell,
    GridCellKind,
    GridColumnIcon,
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



const cols = [
    {
        title: "First name",
        id: "First name",
    },
    {
        title: "Last name",
        id: "Last name",
    },
    {
        title: "Avatar",
        id: "Avatar",
    },
    {
        title: "Email",
        id: "Email",
    },
    {
        title: "Title",
        id: "Title",
    },
    {
        title: "More Info",
        id: "More Info",
    },
    {
        title: "Date",
        id: "Date",
        width: 200,
    },
];

const sampleFirstNames = ["John", "Jane", "Bob", "Alice", "Charlie", "Diana", "Evan", "Fiona", "George", "Hannah"];
const sampleLastNames = ["Doe", "Smith", "Johnson", "Brown", "Williams", "Jones", "Miller", "Davis", "Garcia", "Rodriguez"];
const sampleImages = [
    "https://picsum.photos/id/10/900/900",
    "https://picsum.photos/id/20/900/900",
    "https://picsum.photos/id/30/900/900",
    "https://picsum.photos/id/40/900/900",
    "https://picsum.photos/id/50/900/900",
];
const sampleTitles = ["Engineer", "Designer", "Manager", "Director", "Sales", "Marketing", "Support", "HR", "Finance", "Legal"];

const generateNewCell = (colIndex: number, rowIndex: number = 0): GridCell => {
    switch (colIndex) {
        case 0: return { kind: GridCellKind.Text, displayData: sampleFirstNames[rowIndex % sampleFirstNames.length], data: sampleFirstNames[rowIndex % sampleFirstNames.length], allowOverlay: true, readonly: false };
        case 1: return { kind: GridCellKind.Text, displayData: sampleLastNames[rowIndex % sampleLastNames.length], data: sampleLastNames[rowIndex % sampleLastNames.length], allowOverlay: true, readonly: false };
        case 2: return { kind: GridCellKind.Number, displayData: (1000 + rowIndex * 100).toLocaleString(), data: 1000 + rowIndex * 100, allowOverlay: true, readonly: false, contentAlign: 'right' };
        default: return { kind: GridCellKind.Text, displayData: "2024-01-01", data: "2024-01-01", allowOverlay: true, readonly: false, contentAlign: 'center' };
    }
};

const generateNewRow = (cols: any[], rowIndex: number = 0): GridCell[] => {
    return cols.map((_, colIndex) => generateNewCell(colIndex, rowIndex));
};

export const AddData = () => {
    const gridRef = React.useRef<DataEditorRef>(null);

    const [gridSelection, setGridSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    const { onColumnResize } = useMockDataGenerator(4); // 6 columns for the example

    const initialRows = 100;
    const [data, setData] = React.useState<GridCell[][]>(() => {
        const initialData: GridCell[][] = [];
        for (let r = 0; r < initialRows; r++) {
            initialData.push(generateNewRow(cols, r));
        }
        return initialData;
    });

    const [numRows, setNumRows] = React.useState(initialRows);

    // FirstName이 'D'로 시작하고 Email에 'gmail'이 포함된 행의 인덱스를 저장하는 Set
    const [highlightedRows, setHighlightedRows] = React.useState<Set<number>>(new Set());

    // Row status tracking: A (Added), U (Updated), D (Deleted)
    const [rowStatuses, setRowStatuses] = React.useState<Map<number, "A" | "U" | "D">>(new Map());

    // 1. 데이터 처리 로직
    const processRow = React.useCallback(
        (row: number) => {
            const firstNameCell = data[row]?.[0];
            const emailCell = data[row]?.[3];

            const firstName = firstNameCell && "data" in firstNameCell ? (firstNameCell.data as string) : "";
            const email = emailCell && "data" in emailCell ? (emailCell.data + "") : "";

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

            // Mark row as Updated (unless it's already Added)
            setRowStatuses(prev => {
                const newStatuses = new Map(prev);
                if (newStatuses.get(row) !== "A") {
                    newStatuses.set(row, "U");
                }
                return newStatuses;
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
                const row: GridCell[] = [];
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
                        newData[targetRowIndex] = generateNewRow(cols, targetRowIndex);
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
                        newData[writeRowIndex] = generateNewRow(cols, writeRowIndex);
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
            const newRow = generateNewRow(cols, newData.length);
            const firstSelectedIndex = gridSelection.rows.first();

            let insertIndex: number;
            if (firstSelectedIndex !== undefined) {
                insertIndex = firstSelectedIndex + 1;
                newData.splice(insertIndex, 0, newRow);
            } else {
                insertIndex = newData.length;
                newData.push(newRow);
            }

            // Mark the new row as Added
            setRowStatuses(prev => {
                const newStatuses = new Map(prev);
                // Shift statuses for rows after the insert point
                if (firstSelectedIndex !== undefined) {
                    const shiftedStatuses = new Map<number, "A" | "U" | "D">();
                    prev.forEach((status, row) => {
                        if (row >= insertIndex) {
                            shiftedStatuses.set(row + 1, status);
                        } else {
                            shiftedStatuses.set(row, status);
                        }
                    });
                    shiftedStatuses.set(insertIndex, "A");
                    return shiftedStatuses;
                } else {
                    newStatuses.set(insertIndex, "A");
                    return newStatuses;
                }
            });

            setNumRows(newData.length);
            return newData;
        });
    }, [cols, gridSelection.rows]);

    const onDeleteRow = React.useCallback(() => {
        if (gridSelection.rows.length === 0) return;

        // Mark selected rows as Deleted (or remove if they were Added)
        setRowStatuses(prev => {
            const newStatuses = new Map(prev);
            gridSelection.rows.toArray().forEach(rowIndex => {
                const currentStatus = prev.get(rowIndex);
                if (currentStatus === "A") {
                    // If row was just added, remove it completely
                    newStatuses.delete(rowIndex);
                } else {
                    // Otherwise mark as Deleted
                    newStatuses.set(rowIndex, "D");
                }
            });
            return newStatuses;
        });

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
                if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number ) {
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
    }, [data, cols]);

    // Callback to provide row status for each row
    const onRowStatus = React.useCallback(
        (rowIndex: number): "A" | "U" | "D" | undefined => {
            return rowStatuses.get(rowIndex);
        },
        [rowStatuses]
    );


    return (
        <>
            <div>
                <button onClick={onAddRow}>열추가</button>
                <button onClick={onDeleteRow}>열삭제</button>
                <button onClick={onCsvDownload}>CSV다운로드</button>
            </div>
            
            <DataEditor
                {...defaultProps}
                width="100%"
                height="500px"
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
                    rowNumber: true,
                    rowStatus: true,
                    rowStatusWidth: 40,
                    rowStatusTheme: {
                        bgCell: "#f5f5f5",
                        textDark: "#333",
                    }
                }}
                fillHandle={{ size: 6 }}
                onCellEdited={(cell, newValue) => {
                    setCellValue(cell, newValue);
                }}
                onFillPattern={onFillPattern}
                onPaste={onPaste}
                onGridSelectionChange={setGridSelection}
                gridSelection={gridSelection}
                onRowStatus={onRowStatus}

            />
            
        </>
    );
};

AddData.storyName = "06. Add Data";
