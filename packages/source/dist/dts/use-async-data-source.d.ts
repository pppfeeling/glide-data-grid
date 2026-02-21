import { type DataEditorProps, type DataEditorRef, type EditableGridCell, type GridCell, type Item } from "@glideapps/glide-data-grid";
import React from "react";
type Range = readonly [startIndex: number, endIndex: number];
export type RowCallback<T> = (range: Range) => Promise<readonly T[]>;
export type RowToCell<T> = (row: T, col: number) => GridCell;
export type RowEditedCallback<T> = (cell: Item, newVal: EditableGridCell, rowData: T) => T | undefined;
export declare function useAsyncDataSource<TRowType>(pageSize: number, maxConcurrency: number, getRowData: RowCallback<TRowType>, toCell: RowToCell<TRowType>, onEdited: RowEditedCallback<TRowType>, gridRef: React.MutableRefObject<DataEditorRef | null>): Pick<DataEditorProps, "getCellContent" | "onVisibleRegionChanged" | "onCellEdited" | "getCellsForSelection">;
export {};
