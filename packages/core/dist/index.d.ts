import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import * as React_2 from 'react';

export declare const AllCellRenderers: InternalCellRenderer<InnerGridCell>[];

/** @category Columns */
export declare interface AutoGridColumn extends BaseGridColumn {
    readonly id: string;
}

declare interface BackCompatKeybinds {
    readonly pageUp: boolean;
    readonly pageDown: boolean;
    readonly first: boolean;
    readonly last: boolean;
}

declare interface BaseCellActivatedEvent {
}

declare interface BaseCellRenderer<T extends InnerGridCell> {
    readonly kind: T["kind"];
    readonly draw: DrawCallback<T>;
    readonly drawPrep?: PrepCallback;
    readonly needsHover?: boolean | ((cell: T) => boolean);
    readonly needsHoverPosition?: boolean;
    readonly measure?: (ctx: CanvasRenderingContext2D, cell: T, theme: FullTheme) => number;
    readonly provideEditor?: ProvideEditorCallback<T>;
    readonly onClick?: (args: {
        readonly cell: T;
        readonly posX: number;
        readonly posY: number;
        readonly bounds: Rectangle;
        readonly location: Item;
        readonly theme: FullTheme;
        readonly preventDefault: () => void;
    } & BaseGridMouseEventArgs) => T | undefined;
    readonly onSelect?: (args: {
        readonly cell: T;
        readonly posX: number;
        readonly posY: number;
        readonly bounds: Rectangle;
        readonly theme: FullTheme;
        readonly preventDefault: () => void;
    } & BaseGridMouseEventArgs) => void;
    readonly onDelete?: (cell: T) => T | undefined;
}

export declare interface BaseDrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: FullTheme;
    col: number;
    row: number;
    rect: Rectangle;
    highlighted: boolean;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    cellFillColor: string;
    imageLoader: ImageWindowLoader;
    spriteManager: SpriteManager;
    hyperWrapping: boolean;
    cell: InnerGridCell;
}

/** @category Cells */
export declare interface BaseGridCell {
    readonly allowOverlay: boolean;
    readonly lastUpdated?: number;
    readonly style?: "normal" | "faded";
    readonly themeOverride?: Partial<Theme>;
    readonly span?: readonly [start: number, end: number];
    readonly rowspan?: readonly [start: number, end: number];
    readonly rowSpanPosition?: "top" | "middle" | "bottom";
    readonly contentAlign?: "left" | "right" | "center";
    readonly cursor?: CSSProperties["cursor"];
    readonly copyData?: string;
    readonly activationBehaviorOverride?: CellActivationBehavior;
}

export declare interface BaseGridColumn {
    readonly title: string;
    /**
     * Group name for column grouping. Can be a single string for one level of grouping,
     * or an array of strings for multi-level hierarchical grouping.
     *
     * @example
     * // Single level (backward compatible)
     * { title: "Name", group: "Personal" }
     *
     * // Multi-level grouping
     * { title: "Name", group: ["Region", "Country", "Personal"] }
     * // Level 0 (topmost): "Region"
     * // Level 1: "Country"
     * // Level 2 (closest to column header): "Personal"
     */
    readonly group?: string | readonly string[];
    readonly icon?: GridColumnIcon | string;
    readonly overlayIcon?: GridColumnIcon | string;
    readonly menuIcon?: GridColumnMenuIcon | string;
    readonly indicatorIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;
    readonly grow?: number;
    readonly style?: "normal" | "highlight";
    readonly themeOverride?: Partial<Theme>;
    readonly trailingRowOptions?: {
        readonly hint?: string;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
        readonly themeOverride?: Partial<Theme>;
        readonly disabled?: boolean;
    };
    readonly rowGroupBorder?: boolean;
    readonly required?: boolean;
}

/** @category Types */
export declare interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isLongTouch?: boolean;
    readonly isDoubleClick?: boolean;
    readonly isEdge: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly scrollEdge: readonly [xDir: -1 | 0 | 1, yDir: -1 | 0 | 1];
}

declare type BasicCellBuffer = {
    formatted: string;
    rawValue: string | number | boolean | BooleanEmpty | BooleanIndeterminate | undefined;
    format: "string" | "number" | "boolean" | "url";
    doNotEscape?: boolean;
};

/** @category Drawing */
export declare function blend(color: string, background: string | undefined): string;

/** @category Cells */
export declare interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly data: boolean | BooleanEmpty | BooleanIndeterminate;
    readonly readonly?: boolean;
    readonly allowOverlay: false;
    readonly maxSize?: number;
    readonly hoverEffectIntensity?: number;
}

/** @category Cells */
export declare function booleanCellIsEditable(cell: BooleanCell): boolean;

export declare const booleanCellRenderer: InternalCellRenderer<BooleanCell>;

/** @category Types */
export declare const BooleanEmpty: null;

/** @category Types */
export declare type BooleanEmpty = null;

/** @category Types */
export declare const BooleanIndeterminate: undefined;

/** @category Types */
export declare type BooleanIndeterminate = undefined;

/** @category Cells */
export declare interface BubbleCell extends BaseGridCell {
    readonly kind: GridCellKind.Bubble;
    readonly data: string[];
}

export declare const bubbleCellRenderer: InternalCellRenderer<BubbleCell>;

/** The public event type the grid emits */
export declare type CellActivatedEventArgs = KeyboardCellActivatedEvent | PointerCellActivatedEvent;

export declare type CellActivationBehavior = "double-click" | "single-click" | "second-click";

/** @category Types */
export declare type CellArray = readonly (readonly GridCell[])[];

export declare type CellBuffer = StringArrayCellBuffer | BasicCellBuffer;

/** @category Types */
export declare interface CellClickedEventArgs extends GridMouseCellEventArgs, PreventableEvent {
}

/** @category Cells */
export declare type CellList = readonly Item[];

/** @category Renderers */
declare type CellRenderer<T extends InnerGridCell> = [T] extends [CustomCell<infer DataType>] ? CustomRenderer<CustomCell<DataType>> : InternalCellRenderer<T>;

export declare class CellSet {
    private readonly cells;
    constructor(items?: Item[]);
    add(cell: Item): void;
    has(cell: Item | undefined): boolean;
    remove(cell: Item): void;
    clear(): void;
    get size(): number;
    hasHeader(): boolean;
    hasItemInRectangle(rect: Rectangle): boolean;
    hasItemInRegion(rect: readonly (Rectangle & {
        when?: boolean;
    })[]): boolean;
    values(): IterableIterator<Item>;
}

/** @category Selection */
export declare class CompactSelection {
    readonly items: CompactSelectionRanges;
    private constructor();
    static create: (items: CompactSelectionRanges) => CompactSelection;
    static empty: () => CompactSelection;
    static fromSingleSelection: (selection: number | Slice) => CompactSelection;
    static fromArray: (items: readonly number[]) => CompactSelection;
    offset(amount: number): CompactSelection;
    add(selection: number | Slice): CompactSelection;
    remove(selection: number | Slice): CompactSelection;
    first(): number | undefined;
    last(): number | undefined;
    hasIndex(index: number): boolean;
    hasAll(index: Slice): boolean;
    some(predicate: (index: number) => boolean): boolean;
    equals(other: CompactSelection): boolean;
    toArray(): number[];
    get length(): number;
    [Symbol.iterator](): Generator<number, void, unknown>;
}

/** @category Selection */
export declare type CompactSelectionRanges = readonly Slice[];

declare interface ConfigurableKeybinds {
    readonly downFill: Keybind;
    readonly rightFill: Keybind;
    readonly clear: Keybind;
    readonly closeOverlay: Keybind;
    readonly acceptOverlayDown: Keybind;
    readonly acceptOverlayUp: Keybind;
    readonly acceptOverlayLeft: Keybind;
    readonly acceptOverlayRight: Keybind;
    readonly search: Keybind;
    readonly delete: Keybind;
    readonly activateCell: Keybind;
    readonly scrollToSelectedCell: Keybind;
    readonly goToFirstColumn: Keybind;
    readonly goToLastColumn: Keybind;
    readonly goToFirstCell: Keybind;
    readonly goToLastCell: Keybind;
    readonly goToFirstRow: Keybind;
    readonly goToLastRow: Keybind;
    readonly goToNextPage: Keybind;
    readonly goToPreviousPage: Keybind;
    readonly goUpCell: Keybind;
    readonly goDownCell: Keybind;
    readonly goLeftCell: Keybind;
    readonly goRightCell: Keybind;
    readonly goUpCellRetainSelection: Keybind;
    readonly goDownCellRetainSelection: Keybind;
    readonly goLeftCellRetainSelection: Keybind;
    readonly goRightCellRetainSelection: Keybind;
    readonly selectToFirstColumn: Keybind;
    readonly selectToLastColumn: Keybind;
    readonly selectToFirstCell: Keybind;
    readonly selectToLastCell: Keybind;
    readonly selectToFirstRow: Keybind;
    readonly selectToLastRow: Keybind;
    readonly selectGrowUp: Keybind;
    readonly selectGrowDown: Keybind;
    readonly selectGrowLeft: Keybind;
    readonly selectGrowRight: Keybind;
    readonly selectAll: Keybind;
    readonly selectRow: Keybind;
    readonly selectColumn: Keybind;
}

export declare type CopyBuffer = CellBuffer[][];

declare interface CornerRadius {
    tl: number;
    tr: number;
    bl: number;
    br: number;
}

/** @category Cells */
export declare interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;
    readonly copyData: string;
    readonly readonly?: boolean;
}

/** @category Renderers */
export declare interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}

declare type DamageUpdateList = readonly {
    cell: Item;
}[];

declare const DataEditorAll: React_2.ForwardRefExoticComponent<DataEditorProps & React_2.RefAttributes<DataEditorRef>>;
export { DataEditorAll as DataEditor }
export default DataEditorAll;

/**
 * The primary component of Glide Data Grid.
 * @category DataEditor
 * @param {DataEditorProps} props
 */
export declare const DataEditorCore: React_2.ForwardRefExoticComponent<DataEditorCoreProps & React_2.RefAttributes<DataEditorRef>>;

/**
 * @category DataEditor
 */
export declare interface DataEditorCoreProps extends Props_4, Pick<DataGridSearchProps, "imageWindowLoader"> {
    /** Emitted whenever the user has requested the deletion of the selection.
     * @group Editing
     */
    readonly onDelete?: (selection: GridSelection) => boolean | GridSelection;
    /** Emitted whenever a cell edit is completed.
     * @group Editing
     */
    readonly onCellEdited?: (cell: Item, newValue: EditableGridCell) => void;
    /** Emitted whenever a cell mutation is completed and provides all edits inbound as a single batch.
     * @group Editing
     */
    readonly onCellsEdited?: (newValues: readonly EditListItem[]) => boolean | void;
    /** Emitted whenever a row append operation is requested. Append location can be set in callback.
     * @group Editing
     */
    readonly onRowAppended?: () => Promise<"top" | "bottom" | number | undefined> | void;
    /** Emitted whenever a column append operation is requested. Append location can be set in callback.
     * @group Editing
     */
    readonly onColumnAppended?: () => Promise<"left" | "right" | number | undefined> | void;
    /** Emitted when a column header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onHeaderClicked?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    /** Emitted when a group header is clicked.
     * @group Events
     */
    readonly onGroupHeaderClicked?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    /** Emitted whe the user wishes to rename a group.
     * @group Events
     */
    readonly onGroupHeaderRenamed?: (groupName: string, newVal: string) => void;
    /** Emitted when a cell is clicked.
     * @group Events
     */
    readonly onCellClicked?: (cell: Item, event: CellClickedEventArgs) => void;
    /** Emitted when a cell is activated, by pressing Enter, Space or double clicking it.
     * @group Events
     */
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
    /**
     * Emitted whenever the user initiats a pattern fill using the fill handle. This event provides both
     * a patternSource region and a fillDestination region, and can be prevented.
     * @group Editing
     */
    readonly onFillPattern?: (event: FillPatternEventArgs) => void;
    /** Emitted when editing has finished, regardless of data changing or not.
     * @group Editing
     */
    readonly onFinishedEditing?: (newValue: GridCell | undefined, movement: Item) => void;
    /** Emitted when a column header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onHeaderContextMenu?: (colIndex: number, event: HeaderClickedEventArgs) => void;
    /** Emitted when a group header should show a context menu. Usually right click.
     * @group Events
     */
    readonly onGroupHeaderContextMenu?: (colIndex: number, event: GroupHeaderClickedEventArgs) => void;
    /** Emitted when a cell should show a context menu. Usually right click.
     * @group Events
     */
    readonly onCellContextMenu?: (cell: Item, event: CellClickedEventArgs) => void;
    /** Used for validating cell values during editing.
     * @group Editing
     * @param cell The cell which is being validated.
     * @param newValue The new value being proposed.
     * @param prevValue The previous value before the edit.
     * @returns A return of false indicates the value will not be accepted. A value of
     * true indicates the value will be accepted. Returning a new GridCell will immediately coerce the value to match.
     */
    readonly validateCell?: (cell: Item, newValue: EditableGridCell, prevValue: GridCell) => boolean | ValidatedGridCell;
    /** The columns to display in the data grid.
     * @group Data
     */
    readonly columns: readonly GridColumn[];
    /** Controls the trailing row used to insert new data into the grid.
     * @group Editing
     */
    readonly trailingRowOptions?: {
        /** If the trailing row should be tinted */
        readonly tint?: boolean;
        /** A hint string displayed on hover. Usually something like "New row" */
        readonly hint?: string;
        /** When set to true, the trailing row is always visible. */
        readonly sticky?: boolean;
        /** The icon to use for the cell. Either a GridColumnIcon or a member of the passed headerIcons */
        readonly addIcon?: string;
        /** Overrides the column to focus when a new row is created. */
        readonly targetColumn?: number | GridColumn;
    };
    /** Controls the height of the header row
     * @defaultValue 36
     * @group Style
     */
    readonly headerHeight?: number;
    /** Controls the header of the group header row
     * @defaultValue `headerHeight`
     * @group Style
     */
    readonly groupHeaderHeight?: number;
    /**
     * The number of rows in the grid.
     * @group Data
     */
    readonly rows: number;
    /** Determines if row markers should be automatically added to the grid.
     * Interactive row markers allow the user to select a row.
     *
     * - "clickable-number" renders a number that can be clicked to
     *   select the row
     * - "both" causes the row marker to show up as a number but
     *   reveal a checkbox when the marker is hovered.
     *
     * @defaultValue `none`
     * @group Style
     */
    readonly rowMarkers?: RowMarkerOptions["kind"] | RowMarkerOptions;
    /**
     * Sets the width of row markers in pixels, if unset row markers will automatically size.
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerWidth?: number;
    /** Changes the starting index for row markers.
     * @defaultValue 1
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerStartIndex?: number;
    /** Changes the theme of the row marker column
     * @group Style
     * @deprecated Use `rowMarkers` instead.
     */
    readonly rowMarkerTheme?: Partial<Theme>;
    /** Sets the width of the data grid.
     * @group Style
     */
    readonly width?: number | string;
    /** Sets the height of the data grid.
     * @group Style
     */
    readonly height?: number | string;
    /** Custom classname for data grid wrapper.
     * @group Style
     */
    readonly className?: string;
    /** If set to `default`, `gridSelection` will be coerced to always include full spans.
     * @group Selection
     * @defaultValue `default`
     */
    readonly spanRangeBehavior?: "default" | "allowPartial";
    /** Controls which types of selections can exist at the same time in the grid. If selection blending is set to
     * exclusive, the grid will clear other types of selections when the exclusive selection is made. By default row,
     * column, and range selections are exclusive.
     * @group Selection
     * @defaultValue `exclusive`
     * */
    readonly rangeSelectionBlending?: SelectionBlending;
    /** {@inheritDoc rangeSelectionBlending}
     * @group Selection
     */
    readonly columnSelectionBlending?: SelectionBlending;
    /** {@inheritDoc rangeSelectionBlending}
     * @group Selection
     */
    readonly rowSelectionBlending?: SelectionBlending;
    /** Controls if multi-selection is allowed. If disabled, shift/ctrl/command clicking will work as if no modifiers
     * are pressed.
     *
     * When range select is set to cell, only one cell may be selected at a time. When set to rect one one rect at a
     * time. The multi variants allow for multiples of the rect or cell to be selected.
     * @group Selection
     * @defaultValue `rect`
     */
    readonly rangeSelect?: "none" | "cell" | "rect" | "multi-cell" | "multi-rect";
    /** {@inheritDoc rangeSelect}
     * @group Selection
     * @defaultValue `multi`
     */
    readonly columnSelect?: "none" | "single" | "multi";
    /** {@inheritDoc rangeSelect}
     * @group Selection
     * @defaultValue `multi`
     */
    readonly rowSelect?: "none" | "single" | "multi";
    /** Controls if range selection is allowed to span columns.
     * @group Selection
     * @defaultValue `true`
     */
    readonly rangeSelectionColumnSpanning?: boolean;
    /** Sets the initial scroll Y offset.
     * @see {@link scrollOffsetX}
     * @group Advanced
     */
    readonly scrollOffsetY?: number;
    /** Sets the initial scroll X offset
     * @see {@link scrollOffsetY}
     * @group Advanced
     */
    readonly scrollOffsetX?: number;
    /** Determins the height of each row.
     * @group Style
     * @defaultValue 34
     */
    readonly rowHeight?: DataGridSearchProps["rowHeight"];
    /** Fires whenever the mouse moves
     * @group Events
     * @param args
     */
    readonly onMouseMove?: DataGridSearchProps["onMouseMove"];
    /**
     * The minimum width a column can be resized to.
     * @defaultValue 50
     * @group Style
     */
    readonly minColumnWidth?: DataGridSearchProps["minColumnWidth"];
    /**
     * The maximum width a column can be resized to.
     * @defaultValue 500
     * @group Style
     */
    readonly maxColumnWidth?: DataGridSearchProps["maxColumnWidth"];
    /**
     * The maximum width a column can be automatically sized to.
     * @defaultValue `maxColumnWidth`
     * @group Style
     */
    readonly maxColumnAutoWidth?: number;
    /**
     * Used to provide an override to the default image editor for the data grid. `provideEditor` may be a better
     * choice for most people.
     * @group Advanced
     * */
    readonly imageEditorOverride?: ImageEditorType;
    /**
     * If specified, it will be used to render Markdown, instead of the default Markdown renderer used by the Grid.
     * You'll want to use this if you need to process your Markdown for security purposes, or if you want to use a
     * renderer with different Markdown features.
     * @group Advanced
     */
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    /**
     * Allows overriding the theme of any row
     * @param row represents the row index of the row, increasing by 1 for every represented row. Collapsed rows are not included.
     * @param groupRow represents the row index of the group row. Only distinct when row grouping enabled.
     * @param contentRow represents the index of the row excluding group headers. Only distinct when row grouping enabled.
     * @returns
     */
    readonly getRowThemeOverride?: (row: number, groupRow: number, contentRow: number) => Partial<Theme> | undefined;
    /** Callback for providing a custom editor for a cell.
     * @group Editing
     */
    readonly provideEditor?: ProvideEditorCallback<GridCell>;
    /**
     * Allows coercion of pasted values.
     * @group Editing
     * @param val The pasted value
     * @param cell The cell being pasted into
     * @returns `undefined` to accept default behavior or a `GridCell` which should be used to represent the pasted value.
     */
    readonly coercePasteValue?: (val: string, cell: GridCell) => GridCell | undefined;
    /**
     * Emitted when the grid selection is cleared.
     * @group Selection
     */
    readonly onSelectionCleared?: () => void;
    /**
     * The current selection of the data grid. Contains all selected cells, ranges, rows, and columns.
     * Used in conjunction with {@link onGridSelectionChange}
     * method to implement a controlled selection.
     * @group Selection
     */
    readonly gridSelection?: GridSelection;
    /**
     * Emitted whenever the grid selection changes. Specifying
     * this function will make the grid’s selection controlled, so
     * so you will need to specify {@link gridSelection} as well. See
     * the "Controlled Selection" example for details.
     *
     * @param newSelection The new gridSelection as created by user input.
     * @group Selection
     */
    readonly onGridSelectionChange?: (newSelection: GridSelection) => void;
    /**
     * Emitted whenever the visible cells change, usually due to scrolling.
     * @group Events
     * @param range An inclusive range of all visible cells. May include cells obscured by UI elements such
     * as headers.
     * @param tx The x transform of the cell region.
     * @param ty The y transform of the cell region.
     * @param extras Contains information about the selected cell and
     * any visible freeze columns.
     */
    readonly onVisibleRegionChanged?: (range: Rectangle, tx: number, ty: number, extras: {
        /** The selected item if visible */
        selected?: Item;
        /** A selection of visible freeze columns
         * @deprecated
         */
        freezeRegion?: Rectangle;
        /**
         * All visible freeze regions
         */
        freezeRegions?: readonly Rectangle[];
    }) => void;
    /**
     * The primary callback for getting cell data into the data grid.
     * @group Data
     * @param cell The location of the cell being requested.
     * @returns A valid GridCell to be rendered by the Grid.
     */
    readonly getCellContent: (cell: Item) => GridCell;
    /**
     * Determines if row selection requires a modifier key to enable multi-selection or not. In auto mode it adapts to
     * touch or mouse environments automatically, in multi-mode it always acts as if the multi key (Ctrl) is pressed.
     * @group Editing
     * @defaultValue `auto`
     */
    readonly rowSelectionMode?: "auto" | "multi";
    /**
     * Determines if column selection requires a modifier key to enable multi-selection or not. In auto mode it adapts to
     * touch or mouse environments automatically, in multi-mode it always acts as if the multi key (Ctrl) is pressed.
     * @group Editing
     * @defaultValue `auto`
     */
    readonly columnSelectionMode?: "auto" | "multi";
    /**
     * Add table headers to copied data.
     * @group Editing
     * @defaultValue `false`
     */
    readonly copyHeaders?: boolean;
    /**
     * Determins which keybindings are enabled.
     * @group Editing
     */
    readonly keybindings?: Partial<Keybinds>;
    /**
     * Determines if the data editor should immediately begin editing when the user types on a selected cell
     * @group Editing
     */
    readonly editOnType?: boolean;
    /**
     * Used to fetch large amounts of cells at once. Used for copy/paste, if unset copy will not work.
     *
     * `getCellsForSelection` is called when the user copies a selection to the clipboard or the data editor needs to
     * inspect data which may be outside the curently visible range. It must return a two-dimensional array (an array of
     * rows, where each row is an array of cells) of the cells in the selection's rectangle. Note that the rectangle can
     * include cells that are not currently visible.
     *
     * If `true` is passed instead of a callback, the data grid will internally use the `getCellContent` callback to
     * provide a basic implementation of `getCellsForSelection`. This can make it easier to light up more data grid
     * functionality, but may have negative side effects if your data source is not able to handle being queried for
     * data outside the normal window.
     *
     * If `getCellsForSelection` returns a thunk, the data may be loaded asynchronously, however the data grid may be
     * unable to properly react to column spans when performing range selections. Copying large amounts of data out of
     * the grid will depend on the performance of the thunk as well.
     * @group Data
     * @param {Rectangle} selection The range of requested cells
     * @param {AbortSignal} abortSignal A signal indicating the requested cells are no longer needed
     * @returns A row-major collection of cells or an async thunk which returns a row-major collection.
     */
    readonly getCellsForSelection?: DataGridSearchProps["getCellsForSelection"] | true;
    /** The number of columns which should remain in place when scrolling horizontally. The row marker column, if
     * enabled is always frozen and is not included in this count.
     * @defaultValue 0
     * @group Style
     */
    readonly freezeColumns?: DataGridSearchProps["freezeColumns"];
    /**
     * Controls the drawing of the left hand vertical border of a column. If set to a boolean value it controls all
     * borders.
     * @defaultValue `true`
     * @group Style
     */
    readonly verticalBorder?: DataGridSearchProps["verticalBorder"] | boolean;
    /**
     * Controls the grouping of rows to be drawn in the grid.
     */
    readonly rowGrouping?: RowGroupingOptions;
    /**
     * Called when data is pasted into the grid. If left undefined, the `DataEditor` will operate in a
     * fallback mode and attempt to paste the text buffer into the current cell assuming the current cell is not
     * readonly and can accept the data type. If `onPaste` is set to false or the function returns false, the grid will
     * simply ignore paste. If `onPaste` evaluates to true the grid will attempt to split the data by tabs and newlines
     * and paste into available cells.
     *
     * The grid will not attempt to add additional rows if more data is pasted then can fit. In that case it is
     * advisable to simply return false from onPaste and handle the paste manually.
     * @group Editing
     */
    readonly onPaste?: ((target: Item, values: readonly (readonly string[])[]) => boolean) | boolean;
    /**
     * The theme used by the data grid to get all color and font information
     * @group Style
     */
    readonly theme?: Partial<Theme>;
    readonly renderers?: readonly InternalCellRenderer<InnerGridCell>[];
    /**
     * An array of custom renderers which can be used to extend the data grid.
     * @group Advanced
     */
    readonly customRenderers?: readonly CustomRenderer<any>[];
    /**
     * Scales most elements in the theme to match rem scaling automatically
     * @defaultValue false
     */
    readonly scaleToRem?: boolean;
    /**
     * Custom predicate function to decide whether the click event occurred outside the grid
     * Especially used when custom editor is opened with the portal and is outside the grid, but there is no possibility
     * to add a class "click-outside-ignore"
     * If this function is supplied and returns false, the click event is ignored
     */
    readonly isOutsideClick?: (e: MouseEvent | TouchEvent) => boolean;
    /**
     * Controls which directions fill is allowed in.
     */
    readonly allowedFillDirections?: FillHandleDirection;
    /**
     * Determines when a cell is considered activated and will emit the `onCellActivated` event. Generally an activated
     * cell will open to edit mode.
     */
    readonly cellActivationBehavior?: CellActivationBehavior;
    /**
     * Controls if focus will trap inside the data grid when doing tab and caret navigation.
     */
    readonly trapFocus?: boolean;
    /**
     * Allows overriding the default amount of bloom (the size growth of the overlay editor)
     */
    readonly editorBloom?: readonly [number, number];
    /**
     * If set to true, the data grid will attempt to scroll to keep the selction in view
     */
    readonly scrollToActiveCell?: boolean;
    readonly drawFocusRing?: boolean | "no-editor";
    /**
     * Allows overriding the default portal element.
     */
    readonly portalElementRef?: React_2.RefObject<HTMLElement>;
    readonly disabledRows?: (row: number) => boolean;
    /**
     * Callback to get the row status for a given row index.
     * Only called when rowMarkers.rowStatus is true.
     * @param rowIndex - The row index
     * @returns "A" (Added), "U" (Updated), "D" (Deleted), or undefined (no status)
     */
    readonly onRowStatus?: (rowIndex: number) => "A" | "U" | "D" | undefined;
    /**
     * Callback to get the row ID for a given row index.
     * Only called when rowMarkers.rowId is true.
     * @param rowIndex - The row index
     * @returns Row ID string or undefined
     */
    readonly onRowId?: (rowIndex: number) => string | undefined;
}

export declare interface DataEditorProps extends Omit<DataEditorCoreProps, "imageWindowLoader"> {
    imageWindowLoader?: ImageWindowLoader;
}

/** @category DataEditor */
export declare interface DataEditorRef {
    /**
     * Programatically appends a row.
     * @param col The column index to focus in the new row.
     * @returns A promise which waits for the append to complete.
     */
    appendRow: (col: number, openOverlay?: boolean, behavior?: ScrollBehavior) => Promise<void>;
    /**
     * Programatically appends a column.
     * @param row The row index to focus in the new column.
     * @returns A promise which waits for the append to complete.
     */
    appendColumn: (row: number, openOverlay?: boolean) => Promise<void>;
    /**
     * Triggers cells to redraw.
     */
    updateCells: DataGridRef["damage"];
    /**
     * Gets the screen space bounds of the requested item.
     */
    getBounds: DataGridRef["getBounds"];
    /**
     * Triggers the data grid to focus itself or the correct accessibility element.
     */
    focus: DataGridRef["focus"];
    /**
     * Generic API for emitting events as if they had been triggered via user interaction.
     */
    emit: (eventName: EmitEvents) => Promise<void>;
    /**
     * Scrolls to the desired cell or location in the grid.
     */
    scrollTo: ScrollToFn;
    /**
     * Causes the columns in the selection to have their natural size recomputed and re-emitted as a resize event.
     */
    remeasureColumns: (cols: CompactSelection) => void;
    /**
     * Gets the mouse args from pointer event position.
     */
    getMouseArgsForPosition: (posX: number, posY: number, ev?: MouseEvent | TouchEvent) => GridMouseEventArgs | undefined;
}

declare interface DataGridDndProps extends Props_3 {
    /**
     * Called whenever a row re-order operation is completed. Setting the callback enables re-ordering by dragging the
     * first column of a row.
     * @group Drag and Drop
     */
    readonly onRowMoved?: (startIndex: number, endIndex: number) => void;
    /**
     * Called when the user finishes moving a column. `startIndex` is the index of the column that was moved, and
     * `endIndex` is the index at which it should end up. Note that you have to effect the move of the column, and pass
     * the reordered columns back in the `columns` property.
     * @group Drag and Drop
     */
    readonly onColumnMoved?: (startIndex: number, endIndex: number) => void;
    /**
     * Called when the user is dragging a column and proposes to move it to a new location. Return `false` to prevent
     * @param startIndex
     * @param endIndex
     * @group Drag and Drop
     */
    readonly onColumnProposeMove?: (startIndex: number, endIndex: number) => boolean;
    /**
     * Called when the user is resizing a column. `newSize` is the new size of the column. Note that you have change
     * the size of the column in the `GridColumn` and pass it back to the grid in the `columns` property.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResize?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    /**
     * Called when the user starts resizing a column. `newSize` is the new size of the column.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResizeStart?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    /**
     * Called when the user finishes resizing a column. `newSize` is the new size of the column.
     * @group Drag and Drop
     * @param column The `GridColumn` being resized
     * @param newSize The new size of the grid column
     * @param colIndex The index of the column
     * @param newSizeWithGrow The new size of the column including any addition pixels added by the grow parameter
     */
    readonly onColumnResizeEnd?: (column: GridColumn, newSize: number, colIndex: number, newSizeWithGrow: number) => void;
    readonly gridRef?: React_2.MutableRefObject<DataGridRef | null>;
    readonly maxColumnWidth: number;
    readonly minColumnWidth: number;
    readonly lockColumns: number;
}

declare interface DataGridProps {
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number | undefined;
    readonly translateY: number | undefined;
    readonly accessibilityHeight: number;
    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly hasAppendRow: boolean;
    readonly firstColAccessible: boolean;
    /**
     * Enables or disables the overlay shadow when scrolling horizontally
     * @group Style
     */
    readonly fixedShadowX: boolean | undefined;
    /**
     * Enables or disables the overlay shadow when scrolling vertical
     * @group Style
     */
    readonly fixedShadowY: boolean | undefined;
    readonly allowResize: boolean | undefined;
    readonly isResizing: boolean;
    readonly resizeColumn: number | undefined;
    readonly isDragging: boolean;
    readonly isFilling: boolean;
    readonly isFocused: boolean;
    readonly columns: readonly InnerGridColumn[];
    /**
     * The number of rows in the grid.
     * @group Data
     */
    readonly rows: number;
    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly enableGroups: boolean;
    readonly groupLevels: number;
    readonly groupHeaderHeights: readonly number[];
    readonly rowHeight: number | ((index: number) => number);
    readonly canvasRef: React_2.MutableRefObject<HTMLCanvasElement | null> | undefined;
    readonly eventTargetRef: React_2.MutableRefObject<HTMLDivElement | null> | undefined;
    readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
    /**
     * Provides additional details about groups to extend group functionality.
     * @group Data
     */
    readonly getGroupDetails: GroupDetailsCallback | undefined;
    /**
     * Provides per row theme overrides.
     * @group Style
     */
    readonly getRowThemeOverride: GetRowThemeCallback | undefined;
    /**
     * Emitted when a header menu disclosure indicator is clicked.
     * @group Events
     */
    readonly onHeaderMenuClick: ((col: number, screenPosition: Rectangle) => void) | undefined;
    /**
     * Emitted when a header indicator icon is clicked.
     * @group Events
     */
    readonly onHeaderIndicatorClick: ((col: number, screenPosition: Rectangle) => void) | undefined;
    readonly selection: GridSelection;
    readonly prelightCells: readonly Item[] | undefined;
    /**
     * Highlight regions provide hints to users about relations between cells and selections.
     * @group Selection
     */
    readonly highlightRegions: readonly Highlight_2[] | undefined;
    /**
     * Enabled/disables the fill handle.
     * @defaultValue false
     * @group Editing
     */
    readonly fillHandle: FillHandle | undefined;
    readonly disabledRows: CompactSelection | undefined;
    /**
     * Allows passing a custom image window loader.
     * @group Advanced
     */
    readonly imageWindowLoader: ImageWindowLoader;
    /**
     * Emitted when an item is hovered.
     * @group Events
     */
    readonly onItemHovered: (args: GridMouseEventArgs) => void;
    readonly onMouseMove: (args: GridMouseEventArgs) => void;
    readonly onMouseDown: (args: GridMouseEventArgs) => void;
    readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
    readonly onContextMenu: (args: GridMouseEventArgs, preventDefault: () => void) => void;
    readonly onCanvasFocused: () => void;
    readonly onCanvasBlur: () => void;
    readonly onCellFocused: (args: Item) => void;
    readonly onMouseMoveRaw: (event: MouseEvent) => void;
    /**
     * Emitted when the canvas receives a key down event.
     * @group Events
     */
    readonly onKeyDown: (event: GridKeyEventArgs) => void;
    /**
     * Emitted when the canvas receives a key up event.
     * @group Events
     */
    readonly onKeyUp: ((event: GridKeyEventArgs) => void) | undefined;
    readonly verticalBorder: (col: number) => boolean;
    /**
     * Determines what can be dragged using HTML drag and drop
     * @defaultValue false
     * @group Drag and Drop
     */
    readonly isDraggable: boolean | "cell" | "header" | undefined;
    /**
     * If `isDraggable` is set, the grid becomes HTML draggable, and `onDragStart` will be called when dragging starts.
     * You can use this to build a UI where the user can drag the Grid around.
     * @group Drag and Drop
     */
    readonly onDragStart: (args: GridDragEventArgs) => void;
    readonly onDragEnd: () => void;
    /** @group Drag and Drop */
    readonly onDragOverCell: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
    /** @group Drag and Drop */
    readonly onDragLeave: (() => void) | undefined;
    /**
     * Called when a HTML Drag and Drop event is ended on the data grid.
     * @group Drag and Drop
     */
    readonly onDrop: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
    /**
     * Overrides the rendering of a header. The grid will call this for every header it needs to render. Header
     * rendering is not as well optimized because they do not redraw as often, but very heavy drawing methods can
     * negatively impact horizontal scrolling performance.
     *
     * It is possible to return `false` after rendering just a background and the regular foreground rendering
     * will happen.
     * @group Drawing
     * @returns `false` if default header rendering should still happen, `true` to cancel rendering.
     */
    readonly drawHeader: DrawHeaderCallback | undefined;
    readonly drawCell: DrawCellCallback | undefined;
    /**
     * Controls the drawing of the focus ring.
     * @defaultValue true
     * @group Style
     */
    readonly drawFocusRing: boolean;
    readonly dragAndDropState: {
        src: number;
        dest: number;
    } | undefined;
    /**
     * Experimental features
     * @group Advanced
     * @experimental
     */
    readonly experimental: {
        readonly disableAccessibilityTree?: boolean;
        readonly disableMinimumCellWidth?: boolean;
        readonly paddingRight?: number;
        readonly paddingBottom?: number;
        readonly enableFirefoxRescaling?: boolean;
        readonly enableSafariRescaling?: boolean;
        readonly kineticScrollPerfHack?: boolean;
        readonly isSubGrid?: boolean;
        readonly strict?: boolean;
        readonly scrollbarWidthOverride?: number;
        readonly hyperWrapping?: boolean;
        readonly renderStrategy?: "single-buffer" | "double-buffer" | "direct";
        /**
         * Allows providing a custom event target for event listeners.
         * If not provided, the grid will use the window as the event target.
         */
        readonly eventTarget?: HTMLElement | Window | Document;
    } | undefined;
    /**
     * Additional header icons for use by `GridColumn`.
     *
     * Providing custom header icons to the data grid must be done with a somewhat non-standard mechanism to allow
     * theming and scaling. The `headerIcons` property takes a dictionary which maps icon names to functions which can
     * take a foreground and background color and returns back a string representation of an svg. The svg should contain
     * a header similar to this `<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">` and
     * interpolate the fg/bg colors into the string.
     *
     * We recognize this process is not fantastic from a graphics workflow standpoint, improvements are very welcome
     * here.
     *
     * @group Style
     */
    readonly headerIcons: SpriteMap | undefined;
    /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
     * aligned.
     * @defaultValue `false`
     * @group Style
     */
    readonly smoothScrollX: boolean | undefined;
    /** Controls smooth scrolling in the data grid. If smooth scrolling is not enabled the grid will always be cell
     * aligned.
     * @defaultValue `false`
     * @group Style
     */
    readonly smoothScrollY: boolean | undefined;
    readonly theme: FullTheme;
    readonly getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;
    /**
     * Controls the resize indicator behavior.
     *
     * - `full` will show the resize indicator on the full height.
     * - `header` will show the resize indicator only on the header.
     * - `none` will not show the resize indicator.
     *
     * @defaultValue "full"
     * @group Style
     */
    readonly resizeIndicator: "full" | "header" | "none" | undefined;
}

declare interface DataGridRef {
    focus: () => void;
    getBounds: (col?: number, row?: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
    getMouseArgsForPosition: (posX: number, posY: number, ev?: MouseEvent | TouchEvent) => GridMouseEventArgs | undefined;
}

declare interface DataGridSearchProps extends Omit<ScrollingDataGridProps, "prelightCells"> {
    readonly getCellsForSelection?: (selection: Rectangle, abortSignal: AbortSignal) => GetCellsThunk | CellArray;
    /**
     * The search results to display. If not provided glide will use its own internal search provider.
     */
    readonly searchResults?: readonly Item[];
    /**
     * Emitted whenever the search results for the current search field changes.
     * @param results The new search results
     * @param navIndex  The currents selected search result
     */
    readonly onSearchResultsChanged?: (results: readonly Item[], navIndex: number) => void;
    /**
     * Controls the visibility of the search overlay.
     * @group Search
     */
    readonly showSearch?: boolean;
    /**
     * Emitted when the search window close event is triggered.
     * @group Search
     */
    readonly onSearchClose?: () => void;
    /**
     * The current search value.
     * @group Search
     */
    readonly searchValue?: string;
    /**
     * Emitted when the search value changes.
     * @group Search
     * @param newVal The new search value
     */
    readonly onSearchValueChange?: (newVal: string) => void;
    readonly searchInputRef: React_2.MutableRefObject<HTMLInputElement | null>;
}

export declare function decodeHTML(html: string): CopyBuffer | undefined;

/**
 * Default configuration used when `fillHandle` is simply `true`.
 */
export declare const DEFAULT_FILL_HANDLE: Readonly<FillHandleConfig>;

export declare interface DragHandler {
    readonly setData: (mime: string, payload: string) => void;
    readonly setDragImage: (image: Element, x: number, y: number) => void;
    readonly preventDefault: () => void;
    readonly defaultPrevented: () => boolean;
}

export declare interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
    requestAnimationFrame: (state?: any) => void;
    drawState: DrawStateTuple;
    frameTime: number;
    overrideCursor: ((cursor: default_2.CSSProperties["cursor"]) => void) | undefined;
}

/** @category Renderers */
declare type DrawCallback<T extends InnerGridCell> = (args: DrawArgs<T>, cell: T) => void;

/** @category Types */
export declare type DrawCellCallback = (args: {
    ctx: CanvasRenderingContext2D;
    cell: GridCell;
    theme: Theme;
    rect: Rectangle;
    col: number;
    row: number;
    hoverAmount: number;
    hoverX: number | undefined;
    hoverY: number | undefined;
    highlighted: boolean;
    imageLoader: ImageWindowLoader;
}, drawContent: () => void) => void;

/** @category Types */
export declare type DrawHeaderCallback = (args: {
    ctx: CanvasRenderingContext2D;
    column: GridColumn;
    columnIndex: number;
    theme: Theme;
    rect: Rectangle;
    hoverAmount: number;
    isSelected: boolean;
    isHovered: boolean;
    hasSelectedCell: boolean;
    spriteManager: SpriteManager;
    menuBounds: Rectangle;
    hoverX: number | undefined;
    hoverY: number | undefined;
}, drawContent: () => void) => void;

/** @category Drawing */
declare type DrawStateTuple = [any, (state: any) => void];

/** @category Drawing */
export declare function drawTextCell(args: BaseDrawArgs, data: string, contentAlign?: BaseGridCell["contentAlign"], allowWrapping?: boolean, hyperWrapping?: boolean): void;

/** @category Cells */
export declare interface DrilldownCell extends BaseGridCell {
    readonly kind: GridCellKind.Drilldown;
    readonly data: readonly DrilldownCellData[];
}

/** @category Cells */
export declare interface DrilldownCellData {
    readonly text: string;
    readonly img?: string;
}

export declare const drilldownCellRenderer: InternalCellRenderer<DrilldownCell>;

/** @category Cells */
export declare type EditableGridCell = TextCell | ImageCell | BooleanCell | MarkdownCell | UriCell | NumberCell | CustomCell;

/** @category Cells */
export declare type EditableGridCellKind = EditableGridCell["kind"];

export declare type EditListItem = {
    location: Item;
    value: EditableGridCell;
};

declare type EmitEvents = "copy" | "paste" | "delete" | "fill-right" | "fill-down";

export declare const emptyGridSelection: GridSelection;

export declare type FillHandle = boolean | Partial<FillHandleConfig>;

/**
 * Configuration options for the fill-handle (the little drag square in the bottom-right of a selection).
 *
 *  `shape`   – Either a square or a circle. Default is `square`.
 *  `size`    – Width/height (or diameter) in CSS pixels. Default is `4`.
 *  `offsetX` – Horizontal offset from the bottom-right corner of the cell (positive is →). Default is `-2`.
 *  `offsetY` – Vertical offset from the bottom-right corner of the cell (positive is ↓). Default is `-2`.
 *  `outline` – Width of the outline stroke in CSS pixels. Default is `0`.
 */
export declare type FillHandleConfig = {
    readonly shape: "square" | "circle";
    readonly size: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly outline: number;
};

export declare type FillHandleDirection = "horizontal" | "vertical" | "orthogonal" | "any";

export declare interface FillPatternEventArgs extends PreventableEvent {
    patternSource: Rectangle;
    fillDestination: Rectangle;
}

declare interface ForcedKeybinds {
    copy: boolean;
    cut: boolean;
    paste: boolean;
}

declare interface FullTheme extends Theme {
    headerFontFull: string;
    baseFontFull: string;
    markerFontFull: string;
}

/** @category Renderers */
declare type GetCellRendererCallback = <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;

/** @category Types */
export declare type GetCellsThunk = () => Promise<CellArray>;

export declare function getCopyBufferContents(cells: readonly (readonly GridCell[])[], columnIndexes: readonly number[]): {
    readonly textPlain: string;
    readonly textHtml: string;
};

/** @category Theme */
export declare function getDefaultTheme(): Theme;

export declare function getEmHeight(ctx: CanvasRenderingContext2D, fontStyle: string): number;

/**
 * Returns a number (float) representing the luminance of a color.
 *
 * @category Drawing
 */
export declare function getLuminance(color: string): number;

/** @category Drawing */
export declare function getMiddleCenterBias(ctx: CanvasRenderingContext2D, font: string | FullTheme): number;

export declare type GetRowThemeCallback = (row: number) => Partial<Theme> | undefined;

/** @category Cells */
export declare type GridCell = EditableGridCell | BubbleCell | RowIDCell | LoadingCell | ProtectedCell | DrilldownCell | CustomCell;

/** @category Cells */
export declare enum GridCellKind {
    Uri = "uri",
    Text = "text",
    Image = "image",
    RowID = "row-id",
    Number = "number",
    Bubble = "bubble",
    Boolean = "boolean",
    Loading = "loading",
    Markdown = "markdown",
    Drilldown = "drilldown",
    Protected = "protected",
    Custom = "custom"
}

/** @category Columns */
export declare type GridColumn = SizedGridColumn | AutoGridColumn;

/** @category Columns */
export declare enum GridColumnIcon {
    HeaderRowID = "headerRowID",
    HeaderCode = "headerCode",
    HeaderNumber = "headerNumber",
    HeaderString = "headerString",
    HeaderBoolean = "headerBoolean",
    HeaderAudioUri = "headerAudioUri",
    HeaderVideoUri = "headerVideoUri",
    HeaderEmoji = "headerEmoji",
    HeaderImage = "headerImage",
    HeaderUri = "headerUri",
    HeaderPhone = "headerPhone",
    HeaderMarkdown = "headerMarkdown",
    HeaderDate = "headerDate",
    HeaderTime = "headerTime",
    HeaderEmail = "headerEmail",
    HeaderReference = "headerReference",
    HeaderIfThenElse = "headerIfThenElse",
    HeaderSingleValue = "headerSingleValue",
    HeaderLookup = "headerLookup",
    HeaderTextTemplate = "headerTextTemplate",
    HeaderMath = "headerMath",
    HeaderRollup = "headerRollup",
    HeaderJoinStrings = "headerJoinStrings",
    HeaderSplitString = "headerSplitString",
    HeaderGeoDistance = "headerGeoDistance",
    HeaderArray = "headerArray",
    RowOwnerOverlay = "rowOwnerOverlay",
    ProtectedColumnOverlay = "protectedColumnOverlay",
    HeaderArrowDown = "headerArrowDown",
    HeaderArrowUp = "headerArrowUp"
}

/** @category Columns */
export declare enum GridColumnMenuIcon {
    Triangle = "triangle",
    Dots = "dots"
}

/** @category Types */
export declare type GridDragEventArgs = GridMouseEventArgs & DragHandler;

/** @category Types */
export declare interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;
    readonly key: string;
    readonly keyCode: number;
    readonly altKey: boolean;
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly cancel: () => void;
    readonly stopPropagation: () => void;
    readonly preventDefault: () => void;
    readonly rawEvent: React.KeyboardEvent<HTMLElement> | undefined;
    readonly location: Item | undefined;
}

/** @category Types */
export declare interface GridMouseCellEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "cell";
    readonly location: Item;
    readonly bounds: Rectangle;
    readonly isFillHandle: boolean;
}

/** @category Types */
export declare type GridMouseEventArgs = GridMouseCellEventArgs | GridMouseHeaderEventArgs | GridMouseOutOfBoundsEventArgs | GridMouseGroupHeaderEventArgs;

/** @category Types */
export declare interface GridMouseGroupHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: typeof groupHeaderKind;
    /** [col, row] where row is -(level + 2): -2 for level 0, -3 for level 1, etc. */
    readonly location: readonly [number, number];
    readonly bounds: Rectangle;
    readonly group: string;
}

/** @category Types */
export declare interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: typeof headerKind;
    readonly location: readonly [number, -1];
    readonly bounds: Rectangle;
    readonly group: string;
}

export declare interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: typeof outOfBoundsKind;
    readonly location: Item;
    readonly isMaybeScrollbar: boolean;
    readonly region: readonly [OutOfBoundsRegionAxis, OutOfBoundsRegionAxis];
}

/** @category Selection */
export declare interface GridSelection {
    readonly current?: {
        readonly cell: Item;
        readonly range: Readonly<Rectangle>;
        readonly rangeStack: readonly Readonly<Rectangle>[];
    };
    readonly columns: CompactSelection;
    readonly rows: CompactSelection;
}

declare interface GroupDetails {
    readonly name: string;
    readonly icon?: string;
    readonly overrideTheme?: Partial<Theme>;
    readonly actions?: readonly {
        readonly title: string;
        readonly onClick: (e: GridMouseGroupHeaderEventArgs) => void;
        readonly icon: GridColumnIcon | string;
    }[];
}

declare type GroupDetailsCallback = (groupName: string) => GroupDetails;

/** @category Types */
export declare interface GroupHeaderClickedEventArgs extends GridMouseGroupHeaderEventArgs, PreventableEvent {
}

/** @category Types */
declare const groupHeaderKind: "group-header";

/**
 * Represents a hierarchical group path from topmost to innermost level.
 * Example: ["Region", "Country", "City"] creates 3 levels of group headers.
 * @category Types
 */
export declare type GroupPath = readonly string[];

/** @category Types */
export declare interface HeaderClickedEventArgs extends GridMouseHeaderEventArgs, PreventableEvent {
}

/**
 * A known icon identifier
 *
 * @category Columns
 */
export declare type HeaderIcon = keyof HeaderIconMap;

declare type HeaderIconMap = Readonly<typeof sprites>;

/** @category Types */
declare const headerKind: "header";

declare interface Highlight_2 {
    readonly color: string;
    readonly range: Rectangle;
    readonly style?: "dashed" | "solid" | "no-outline" | "solid-outline";
}
export { Highlight_2 as Highlight }

export declare interface HoverEffectTheme {
    bgColor: string;
    fullSize: boolean;
}

/** @category Cells */
export declare interface ImageCell extends BaseGridCell {
    readonly kind: GridCellKind.Image;
    readonly data: string[];
    readonly rounding?: number;
    readonly displayData?: string[];
    readonly readonly?: boolean;
}

export declare const imageCellRenderer: InternalCellRenderer<ImageCell>;

/** @category Types */
export declare type ImageEditorType = default_2.ComponentType<OverlayImageEditorProps>;

/** @category Renderers */
export declare const ImageOverlayEditor: React_2.FunctionComponent<OverlayImageEditorProps>;

/** @category Types */
export declare interface ImageWindowLoader {
    setWindow(newWindow: Rectangle, freezeCols: number, freezeRows: number[]): void;
    loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | ImageBitmap | undefined;
    setCallback(imageLoaded: (locations: CellSet) => void): void;
}

export declare class ImageWindowLoaderImpl extends WindowingTrackerBase implements ImageWindowLoader {
    private imageLoaded;
    private loadedLocations;
    private cache;
    setCallback(imageLoaded: (locations: CellSet) => void): void;
    private sendLoaded;
    protected clearOutOfWindow: () => void;
    private loadImage;
    loadOrGetImage(url: string, col: number, row: number): HTMLImageElement | ImageBitmap | undefined;
}

export declare type InnerColumnExtension = {
    growOffset?: number;
    rowMarker?: "square" | "circle";
    rowMarkerChecked?: BooleanIndeterminate | boolean;
    headerRowMarkerTheme?: Partial<Theme>;
    headerRowMarkerAlwaysVisible?: boolean;
    headerRowMarkerDisabled?: boolean;
};

/** @category Cells */
export declare type InnerGridCell = GridCell | InnerOnlyGridCell;

/** @category Cells */
export declare enum InnerGridCellKind {
    NewRow = "new-row",
    Marker = "marker",
    RowStatus = "row-status",
    RowId = "row-id"
}

/** @category Columns */
export declare type InnerGridColumn = SizedGridColumn & InnerColumnExtension;

declare type InnerOnlyGridCell = NewRowCell | MarkerCell | RowStatusCell | RowIdCell;

/** @category Renderers */
export declare interface InternalCellRenderer<T extends InnerGridCell> extends BaseCellRenderer<T> {
    readonly useLabel?: boolean;
    readonly getAccessibilityString: (cell: T) => string;
    readonly onPaste: (val: string, cell: T, details: {
        readonly rawValue: string | string[] | number | boolean | BooleanEmpty | BooleanIndeterminate;
        readonly formatted?: string | string[];
        readonly formattedString?: string;
    }) => T | undefined;
}

/** @category Drawing */
export declare function interpolateColors(leftColor: string, rightColor: string, val: number): string;

/** @category Cells */
export declare function isEditableGridCell(cell: GridCell): cell is ValidatedGridCell;

/** @category Cells */
export declare function isInnerOnlyCell(cell: InnerGridCell): cell is InnerOnlyGridCell;

/** @category Renderers */
export declare function isObjectEditorCallbackResult<T extends InnerGridCell>(obj: ProvideEditorCallbackResult<T>): obj is ObjectEditorCallbackResult<T>;

/** @category Cells */
export declare function isReadWriteCell(cell: GridCell): cell is ReadWriteGridCell;

export declare function isRectangleEqual(a: Rectangle | undefined, b: Rectangle | undefined): boolean;

/** @category Columns */
export declare function isSizedGridColumn(c: GridColumn): c is SizedGridColumn;

/** @category Cells */
export declare function isTextEditableGridCell(cell: GridCell): cell is ReadWriteGridCell;

/**
 * This type is used to specify the coordinates of
 * a cell or header within the dataset: positive row
 * numbers identify cells.
 *
 * - `-1`: Column Header
 * - `-2`: Group header level 0 (topmost, closest to top of screen)
 * - `-3`: Group header level 1
 * - `-(n+2)`: Group header level n
 * - `0 and higher`: Row index
 *
 * @category Types
 */
export declare type Item = readonly [col: number, row: number];

declare type Keybind = boolean | string;

declare type Keybinds = ConfigurableKeybinds & ForcedKeybinds & Partial<BackCompatKeybinds>;

/** Keyboard-initiated activation */
export declare interface KeyboardCellActivatedEvent extends BaseCellActivatedEvent {
    readonly inputType: "keyboard";
    readonly key: string;
}

/** @category Cells */
export declare interface LoadingCell extends BaseGridCell {
    readonly kind: GridCellKind.Loading;
    readonly skeletonWidth?: number;
    readonly skeletonHeight?: number;
    readonly skeletonWidthVariability?: number;
}

export declare const loadingCellRenderer: InternalCellRenderer<LoadingCell>;

declare interface MapResult {
    readonly path: readonly number[];
    readonly isGroupHeader: boolean;
    readonly originalIndex: number;
    readonly groupIndex: number;
    readonly groupRows: number;
    readonly contentIndex: number;
}

/** @category Cells */
export declare interface MarkdownCell extends BaseGridCell {
    readonly kind: GridCellKind.Markdown;
    readonly data: string;
    readonly readonly?: boolean;
}

export declare const markdownCellRenderer: InternalCellRenderer<MarkdownCell>;

/** @category Renderers */
export declare class MarkdownDiv<TProps extends MarkdownDivProps, TState> extends default_2.PureComponent<TProps, TState> {
    private targetElement;
    private renderMarkdownIntoDiv;
    private containerRefHook;
    render(): default_2.JSX.Element;
}

/** @category Renderers */
export declare interface MarkdownDivProps {
    contents: string;
    createNode?: (content: string) => DocumentFragment;
}

/** @category Cells */
export declare interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;
    readonly drawHandle: boolean;
    readonly checked: boolean;
    readonly checkboxStyle: "square" | "circle";
    readonly markerKind: "checkbox" | "number" | "both" | "checkbox-visible";
    readonly disabled?: boolean;
}

export declare const markerCellRenderer: InternalCellRenderer<MarkerCell>;

/** @category Drawing */
export declare function measureTextCached(s: string, ctx: CanvasRenderingContext2D, font?: string, baseline?: "middle" | "alphabetic"): TextMetrics;

/** @category Cells */
export declare interface NewRowCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.NewRow;
    readonly hint: string;
    readonly allowOverlay: false;
    readonly icon?: string;
}

export declare const newRowCellRenderer: InternalCellRenderer<NewRowCell>;

/** @category Cells */
export declare interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
    readonly readonly?: boolean;
    readonly fixedDecimals?: number;
    readonly allowNegative?: boolean;
    readonly thousandSeparator?: boolean | string;
    readonly decimalSeparator?: string;
    readonly hoverEffect?: boolean;
    readonly hoverEffectTheme?: HoverEffectTheme;
}

export declare const numberCellRenderer: InternalCellRenderer<NumberCell>;

declare type ObjectEditorCallbackResult<T extends InnerGridCell> = {
    editor: ProvideEditorComponent<T>;
    deletedValue?: (toDelete: T) => T;
    styleOverride?: CSSProperties;
    disablePadding?: boolean;
    disableStyling?: boolean;
};

/** @category Types */
declare const outOfBoundsKind: "out-of-bounds";

/** @category Types */
export declare enum OutOfBoundsRegionAxis {
    Start = -2,
    StartPadding = -1,
    Center = 0,
    EndPadding = 1,
    End = 2
}

/** @category Types */
export declare interface OverlayImageEditorProps {
    readonly urls: readonly string[];
    readonly canWrite: boolean;
    readonly onCancel: () => void;
    readonly onChange: (newImage: string) => void;
    readonly onEditClick?: () => void;
    readonly renderImage?: (url: string) => React_2.ReactNode;
}

/** @category Drawing */
export declare function parseToRgba(color: string): readonly [number, number, number, number];

declare interface Point {
    x: number;
    y: number;
    radius?: number;
}

/** Pointer-initiated activation */
export declare interface PointerCellActivatedEvent extends BaseCellActivatedEvent {
    readonly inputType: "pointer";
    readonly pointerActivation: CellActivationBehavior;
    readonly pointerType?: "mouse" | "touch" | "pen";
}

export declare interface PositionableMouseEventArgs {
    readonly localEventX: number;
    readonly localEventY: number;
}

declare type PrepCallback = (args: BaseDrawArgs, lastPrep?: PrepResult) => Partial<PrepResult>;

/** @category Drawing */
declare interface PrepResult {
    font: string | undefined;
    fillStyle: string | undefined;
    renderer: {};
    deprep: ((args: Pick<BaseDrawArgs, "ctx">) => void) | undefined;
}

export declare interface PreventableEvent {
    preventDefault: () => void;
}

declare interface Props extends React_2.DetailedHTMLProps<React_2.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    readonly placeholder?: string;
    readonly highlight: boolean;
    readonly altNewline?: boolean;
    readonly validatedSelection?: SelectionRange;
}

declare type Props_2 = Omit<DataGridDndProps, "width" | "height" | "eventTargetRef">;

declare type Props_3 = Omit<DataGridProps, "dragAndDropState" | "isResizing" | "isDragging" | "onMouseMoveRaw" | "allowResize" | "resizeColumn">;

declare type Props_4 = Partial<Omit<DataGridSearchProps, "accessibilityHeight" | "canvasRef" | "cellXOffset" | "cellYOffset" | "className" | "clientSize" | "columns" | "disabledRows" | "drawFocusRing" | "enableGroups" | "firstColAccessible" | "firstColSticky" | "freezeColumns" | "hasAppendRow" | "getCellContent" | "getCellRenderer" | "getCellsForSelection" | "getRowThemeOverride" | "gridRef" | "groupHeaderHeight" | "headerHeight" | "isFilling" | "isFocused" | "imageWindowLoader" | "lockColumns" | "maxColumnWidth" | "minColumnWidth" | "nonGrowWidth" | "onCanvasBlur" | "onCanvasFocused" | "onCellFocused" | "onContextMenu" | "onDragEnd" | "onMouseDown" | "onMouseMove" | "onMouseUp" | "onVisibleRegionChanged" | "rowHeight" | "rows" | "scrollRef" | "searchInputRef" | "selectedColumns" | "selection" | "theme" | "translateX" | "translateY" | "verticalBorder">>;

/** @category Cells */
export declare interface ProtectedCell extends BaseGridCell {
    readonly kind: GridCellKind.Protected;
}

export declare const protectedCellRenderer: InternalCellRenderer<ProtectedCell>;

/** @category Renderers */
export declare type ProvideEditorCallback<T extends InnerGridCell> = (cell: T & {
    location?: Item;
    activation?: CellActivatedEventArgs;
}) => ProvideEditorCallbackResult<T>;

/** @category Renderers */
export declare type ProvideEditorCallbackResult<T extends InnerGridCell> = (ProvideEditorComponent<T> & {
    disablePadding?: boolean;
    disableStyling?: boolean;
}) | ObjectEditorCallbackResult<T> | undefined;

/** @category Renderers */
export declare type ProvideEditorComponent<T extends InnerGridCell> = default_2.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly validatedSelection?: SelectionRange;
    readonly imageEditorOverride?: ImageEditorType;
    readonly markdownDivCreateNode?: (content: string) => DocumentFragment;
    readonly target: Rectangle;
    readonly forceEditMode: boolean;
    readonly isValid?: boolean;
    readonly theme: Theme;
    readonly portalElementRef?: default_2.RefObject<HTMLElement>;
    readonly activation?: CellActivatedEventArgs;
}>;

/** @category Cells */
export declare type ReadWriteGridCell = TextCell | NumberCell | MarkdownCell | UriCell | CustomCell | BooleanCell;

/** @category Types */
export declare interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** @category Types */
export declare function resolveCellsThunk(thunk: GetCellsThunk | CellArray): Promise<CellArray>;

export declare function roundedPoly(ctx: CanvasRenderingContext2D, points: Point[], radiusAll: number): void;

export declare function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number | CornerRadius): void;

export declare type RowGroup = {
    /**
     * The index of the header if the groups are all flattened and expanded
     */
    readonly headerIndex: number;
    readonly isCollapsed: boolean;
    readonly subGroups?: readonly RowGroup[];
};

export declare type RowGroupingMapper = {
    (itemOrRow: number): RowGroupingMapperResult<number>;
    (itemOrRow: Item): RowGroupingMapperResult<Item>;
};

export declare interface RowGroupingMapperResult<T> extends Omit<MapResult, 'originalIndex'> {
    path: readonly number[];
    originalIndex: T;
    isGroupHeader: boolean;
    groupRows: number;
}

export declare interface RowGroupingOptions {
    /**
     * The indexes of the rows of the grid which are group headers and their collapse state. If a number is provided
     * instead of an object, the group header will not be collapsed.
     */
    readonly groups: readonly RowGroup[];
    /**
     * Causes the group headers to collect at the top of the grid. Each replacing the last.
     */
    /**
     * The height of the group headers. All group headers must have the same height.
     */
    readonly height: number;
    /**
     * Enables or disables the drawing of borders inside of group headers.
     * @defaultValue true
     */
    /**
     * Overrides the default theme of the group headers.
     */
    readonly themeOverride?: Partial<Theme>;
    /**
     * Controls the navigation behavior of the grid. If `skip` is provided the grid will skip over the group headers
     * when the user selects a new cell. If `skip-up` or `skip-down` is provided the grid will skip over the group
     * headers when the user navigates up or down.
     *
     * If a group header is marked block, it will act like skip, but clicking on it will also not result in selection
     *  a cell when clicked.
     */
    readonly navigationBehavior?: "normal" | "skip" | "skip-up" | "skip-down" | "block";
    /**
     * Controls the selection behavior of the grid. If spanning is allowed group headers act like any other cells. If
     * spanning is not allowed selections will be unable to span group headers.
     */
    readonly selectionBehavior?: "allow-spanning" | "block-spanning";
}

/** @category Cells */
export declare interface RowIDCell extends BaseGridCell {
    readonly kind: GridCellKind.RowID;
    readonly data: string;
    readonly readonly?: boolean;
}

/** @category Cells */
export declare interface RowIdCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.RowId;
    readonly allowOverlay: false;
    readonly rowId?: string;
}

export declare const rowIDCellRenderer: InternalCellRenderer<RowIdCell>;

declare interface RowMarkerOptions {
    kind: "checkbox" | "number" | "clickable-number" | "checkbox-visible" | "both" | "checkbox-and-number" | "none";
    checkboxStyle?: "circle" | "square";
    /** When true, displays row numbers alongside the primary marker (checkbox, etc.) */
    rowNumber?: boolean;
    /** When true, displays row status (A/U/D) column */
    rowStatus?: boolean;
    /** Width of the row status column in pixels */
    rowStatusWidth?: number;
    /** Theme override for the row status column */
    rowStatusTheme?: Partial<Theme>;
    /** When true, displays row ID column */
    rowId?: boolean;
    /** Width of the row ID column in pixels */
    rowIdWidth?: number;
    /** Theme override for the row ID column */
    rowIdTheme?: Partial<Theme>;
    startIndex?: number;
    width?: number;
    theme?: Partial<Theme>;
    headerTheme?: Partial<Theme>;
    headerAlwaysVisible?: boolean;
    headerDisabled?: boolean;
}

/** @category Cells */
export declare interface RowStatusCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.RowStatus;
    readonly allowOverlay: false;
    readonly status?: "A" | "U" | "D";
}

export declare const rowStatusCellRenderer: InternalCellRenderer<RowStatusCell>;

declare interface ScrollingDataGridProps extends Props_2 {
    readonly className: string | undefined;
    readonly onVisibleRegionChanged: ((range: Rectangle, clientWidth: number, clientHeight: number, rightElWidth: number, tx: number, ty: number) => void) | undefined;
    readonly scrollRef: React_2.MutableRefObject<HTMLDivElement | null> | undefined;
    /**
     * The overscroll properties are used to allow the grid to scroll past the logical end of the content by a fixed
     * number of pixels. This is useful particularly on the X axis if you allow for resizing columns as it can make
     * resizing the final column significantly easier.
     *
     * @group Advanced
     */
    readonly overscrollX: number | undefined;
    /** {@inheritDoc overscrollX}
     * @group Advanced
     */
    readonly overscrollY: number | undefined;
    /**
     * Provides an initial size for the grid which can prevent a flicker on load if the initial size is known prior to
     * layout.
     *
     * @group Advanced
     */
    readonly initialSize: readonly [width: number, height: number] | undefined;
    /**
     * Set to true to prevent any diagonal scrolling.
     * @group Advanced
     */
    readonly preventDiagonalScrolling: boolean | undefined;
    /**
     * If `rightElementProps.sticky` is set to true the right element will be visible at all times, otherwise the user
     * will need to scroll to the end to reveal it.
     *
     * If `rightElementProps.fill` is set, the right elements container will fill to consume all remaining space (if
     * any) at the end of the grid. This does not play nice with growing columns.
     *
     * @group Advanced
     */
    readonly rightElementProps: {
        readonly sticky?: boolean;
        readonly fill?: boolean;
    } | undefined;
    /**
     * The right element is a DOM node which can be inserted at the end of the horizontal scroll region. This can be
     * used to create a right handle panel, make a big add button, or display messages.
     * @group Advanced
     */
    readonly rightElement: React_2.ReactNode | undefined;
    readonly clientSize: readonly [number, number, number];
    readonly nonGrowWidth: number;
}

declare type ScrollToFn = (col: number | {
    amount: number;
    unit: "cell" | "px";
}, row: number | {
    amount: number;
    unit: "cell" | "px";
}, dir?: "horizontal" | "vertical" | "both", paddingX?: number, paddingY?: number, options?: {
    hAlign?: "start" | "center" | "end";
    vAlign?: "start" | "center" | "end";
    behavior?: ScrollBehavior;
}) => void;

/**
 * The type of selection blending to use:
 * - `exclusive`: Only one type of selection can be made at a time.
 * - `mixed`: Multiple types of selection can be made at a time, but only when a multi-key (e.g., Cmd/Ctrl) is held.
 * - `additive`: Multiple types of selection can be made at a time, and selections accumulate without a modifier.
 */
export declare type SelectionBlending = "exclusive" | "mixed" | "additive";

/** @category Renderers */
export declare type SelectionRange = number | readonly [number, number];

/** @category Columns */
export declare interface SizedGridColumn extends BaseGridColumn {
    readonly width: number;
    readonly id?: string;
}

/** @category Selection */
export declare type Slice = [start: number, end: number];

/**
 * A method that produces an SVG array from
 * an SVG icon configuration.
 *
 * @category Columns
 */
export declare type Sprite = (props: SpriteProps) => string;

/** @category Columns */
declare class SpriteManager {
    private onSettled;
    private spriteMap;
    private headerIcons;
    private inFlight;
    constructor(headerIcons: SpriteMap | undefined, onSettled: () => void);
    drawSprite(sprite: HeaderIcon | string, variant: SpriteVariant, ctx: CanvasRenderingContext2D, x: number, y: number, size: number, theme: Theme, alpha?: number): void;
}

/**
 * A method that maps from icon names to functions
 * that return SVG strings.
 *
 * @category Columns
 */
export declare type SpriteMap = Record<string | HeaderIcon, Sprite>;

/**
 * The input provided to a sprite function.
 *
 * @category Columns
 */
export declare interface SpriteProps {
    fgColor: string;
    bgColor: string;
}

export declare const sprites: {
    headerRowID: (props: SpriteProps) => string;
    headerNumber: (props: SpriteProps) => string;
    headerCode: (props: SpriteProps) => string;
    headerString: (props: SpriteProps) => string;
    headerBoolean: (props: SpriteProps) => string;
    headerAudioUri: (props: SpriteProps) => string;
    headerVideoUri: (props: SpriteProps) => string;
    headerEmoji: (props: SpriteProps) => string;
    headerImage: (props: SpriteProps) => string;
    headerUri: (props: SpriteProps) => string;
    headerPhone: (props: SpriteProps) => string;
    headerMarkdown: (props: SpriteProps) => string;
    headerDate: (props: SpriteProps) => string;
    headerTime: (props: SpriteProps) => string;
    headerEmail: (props: SpriteProps) => string;
    headerReference: (props: SpriteProps) => string;
    headerIfThenElse: (props: SpriteProps) => string;
    headerSingleValue: (props: SpriteProps) => string;
    headerLookup: (props: SpriteProps) => string;
    headerTextTemplate: (props: SpriteProps) => string;
    headerMath: (props: SpriteProps) => string;
    headerRollup: (props: SpriteProps) => string;
    headerJoinStrings: (props: SpriteProps) => string;
    headerSplitString: (props: SpriteProps) => string;
    headerGeoDistance: (props: SpriteProps) => string;
    headerArray: (props: SpriteProps) => string;
    rowOwnerOverlay: (props: SpriteProps) => string;
    protectedColumnOverlay: (props: SpriteProps) => string;
    renameIcon: (props: SpriteProps) => string;
    headerArrowDown: (props: SpriteProps) => string;
    headerArrowUp: (props: SpriteProps) => string;
};

/** @category Columns */
declare type SpriteVariant = "normal" | "selected" | "special";

declare type StringArrayCellBuffer = {
    formatted: string[];
    rawValue: string[];
    format: "string-array";
    doNotEscape?: boolean;
};

/** @category Cells */
export declare interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;
    readonly data: string;
    readonly readonly?: boolean;
    readonly allowWrapping?: boolean;
    readonly hoverEffect?: boolean;
    readonly hoverEffectTheme?: HoverEffectTheme;
}

/** @category Renderers */
export declare const TextCellEntry: React_2.FunctionComponent<Props>;

export declare const textCellRenderer: InternalCellRenderer<TextCell>;

/** @category Theme */
export declare interface Theme {
    accentColor: string;
    accentFg: string;
    accentLight: string;
    textDark: string;
    textMedium: string;
    textLight: string;
    textBubble: string;
    bgIconHeader: string;
    fgIconHeader: string;
    textHeader: string;
    textGroupHeader?: string;
    bgGroupHeader?: string;
    bgGroupHeaderHovered?: string;
    textHeaderSelected: string;
    bgCell: string;
    bgCellMedium: string;
    bgHeader: string;
    bgHeaderHasFocus: string;
    bgHeaderHovered: string;
    bgBubble: string;
    bgBubbleSelected: string;
    bubbleHeight: number;
    bubblePadding: number;
    bubbleMargin: number;
    bgSearchResult: string;
    borderColor: string;
    drilldownBorder: string;
    linkColor: string;
    cellHorizontalPadding: number;
    cellVerticalPadding: number;
    headerFontStyle: string;
    headerIconSize: number;
    baseFontStyle: string;
    markerFontStyle: string;
    fontFamily: string;
    editorFontSize: string;
    lineHeight: number;
    checkboxMaxSize: number;
    resizeIndicatorColor?: string;
    horizontalBorderColor?: string;
    headerBottomBorderColor?: string;
    roundingRadius?: number;
}

/** @category Cells */
export declare interface UriCell extends BaseGridCell {
    readonly kind: GridCellKind.Uri;
    readonly data: string;
    readonly displayData?: string;
    readonly readonly?: boolean;
    readonly onClickUri?: (args: BaseGridMouseEventArgs & {
        readonly preventDefault: () => void;
    }) => void;
    readonly hoverEffect?: boolean;
}

export declare const uriCellRenderer: InternalCellRenderer<UriCell>;

/** @category Hooks */
export declare function useColumnSizer(columns: readonly GridColumn[], rows: number, getCellsForSelection: DataGridSearchProps["getCellsForSelection"], clientWidth: number, minColumnWidth: number, maxColumnWidth: number, theme: FullTheme, getCellRenderer: GetCellRendererCallback, abortController: AbortController): {
    readonly sizedColumns: readonly InnerGridColumn[];
    readonly nonGrowWidth: number;
};

export declare function useRowGrouping(options: RowGroupingOptions | undefined, rows: number): UseRowGroupingResult;

export declare interface UseRowGroupingResult {
    readonly mapper: RowGroupingMapper;
    readonly updateRowGroupingByPath: (rowGrouping: readonly RowGroup[], path: readonly number[], update: Partial<RowGroup>) => readonly RowGroup[];
    readonly getRowGroupingForPath: (rowGrouping: readonly RowGroup[], path: readonly number[]) => RowGroup;
}

/** @category Hooks */
export declare function useTheme(): Theme;

/** @category Cells */
export declare type ValidatedGridCell = EditableGridCell & {
    selectionRange?: SelectionRange;
};

declare abstract class WindowingTrackerBase {
    visibleWindow: Rectangle;
    freezeCols: number;
    freezeRows: number[];
    protected isInWindow: (packed: number) => boolean;
    protected abstract clearOutOfWindow: () => void;
    setWindow(newWindow: Rectangle, freezeCols: number, freezeRows: number[]): void;
}

/** @category Drawing */
export declare function withAlpha(color: string, alpha: number): string;

export { }
