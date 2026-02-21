import { type DataEditorProps, type GridColumn } from "@glideapps/glide-data-grid";
export declare function compareSmart(a: string | number, b: string | number): number;
export declare function compareRaw(a: string | number, b: string | number): 0 | 1 | -1;
export type ColumnSort = {
    column: GridColumn;
    mode?: "default" | "raw" | "smart";
    direction?: "asc" | "desc";
};
type Props = Pick<DataEditorProps, "getCellContent" | "rows" | "columns"> & {
    sort?: ColumnSort | ColumnSort[];
};
type Result = Pick<DataEditorProps, "getCellContent"> & {
    getOriginalIndex: (index: number) => number;
};
export declare function useColumnSort(p: Props): Result;
export {};
