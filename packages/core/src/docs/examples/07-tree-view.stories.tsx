import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    GridCellKind,
    type CustomCell,
    type CustomRenderer,
    type Item,
    getMiddleCenterBias,
} from "../../index.js";
import { type RowGroupingOptions, type RowGroup } from "../../data-editor/row-grouping.js";
import { useRowGrouping, updateRowGroupingByPath, getRowGroupingForPath } from "../../data-editor/row-grouping-api.js";
import { BeautifulWrapper, Description, defaultProps } from "../stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";

export default {
    title: "Glide-Data-Grid/DataEditor Demos",
    decorators: [
        (Story: React.ComponentType) => (
            <SimpleThemeWrapper>
                <BeautifulWrapper
                    title="Tree View"
                    description={
                        <Description>
                            Tree view using rowGrouping. Flat array is converted to hierarchy via{" "}
                            <code>hierachyTransformByKey</code>, then displayed with expand/collapse icons and tree
                            lines.
                        </Description>
                    }>
                    <Story />
                </BeautifulWrapper>
            </SimpleThemeWrapper>
        ),
    ],
};

// ─── FlatTreeItem ──────────────────────────────────────────────────────────────
// Metadata attached to each row after hierarchy transform + flatten.
export interface FlatTreeItem<T> {
    readonly data: T;
    // 0-based depth (root = 0)
    readonly level: number;
    // true if this row has at least one child
    readonly child: boolean;
    // true if this is the last sibling among its parent's children
    readonly last: boolean;
    // parentContinues[d] = true when the ancestor at depth d still has more siblings below
    // → used to decide whether to draw a full-height │ at column d
    readonly parentContinues: readonly boolean[];
}

// ─── hierachyTransformByKey ────────────────────────────────────────────────────
// Step 1 – build the nested tree from a flat array.
// Step 2 – flatten the tree to a DFS-ordered array, computing level / child /
//           last / parentContinues metadata for each row.
//
// array        : source flat array
// keyName      : property that uniquely identifies each item
// superKeyName : property that points to the parent's key
// childName    : property name used to store children during building (temp)
// rootKeyValue : the superKeyName value that marks root nodes
// sortName     : sibling sort property (null = preserve insertion order)
export function hierachyTransformByKey<T extends Record<string, any>>(
    array: T[],
    keyName: string,
    superKeyName: string,
    childName: string,
    rootKeyValue: any,
    sortName: string | null
): FlatTreeItem<T>[] {
    // ── Step 1: build nested tree ──────────────────────────────────────────────
    const map = new Map<any, T & Record<string, any>>();

    for (const item of array) {
        map.set(item[keyName], { ...item, [childName]: [] });
    }

    const roots: (T & Record<string, any>)[] = [];

    for (const item of map.values()) {
        const parentKey = item[superKeyName];
        if (parentKey === rootKeyValue || !map.has(parentKey)) {
            roots.push(item);
        } else {
            const parent = map.get(parentKey)!;
            (parent[childName] as any[]).push(item);
        }
    }

    if (sortName !== null) {
        const sortNodes = (nodes: any[]) => {
            nodes.sort((a, b) => (a[sortName] ?? 0) - (b[sortName] ?? 0));
            for (const node of nodes) {
                if ((node[childName] as any[]).length > 0) sortNodes(node[childName] as any[]);
            }
        };
        sortNodes(roots);
    }

    // ── Step 2: flatten with level / child / last / parentContinues ───────────
    const result: FlatTreeItem<T>[] = [];

    const flatten = (nodes: any[], level: number, parentContinues: readonly boolean[]) => {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const last = i === nodes.length - 1;
            const children = (node[childName] as any[]) ?? [];
            const child = children.length > 0;

            result.push({ data: node, level, child, last, parentContinues });

            if (child) {
                // Ancestors at this level continue only when this node is NOT last
                flatten(children, level + 1, [...parentContinues, !last]);
            }
        }
    };

    flatten(roots, 0, []);
    return result;
}

// ─── Build RowGrouping groups ──────────────────────────────────────────────────
function buildRowGroupingGroups(flatRows: readonly FlatTreeItem<any>[]): readonly RowGroup[] {
    function getChildEnd(headerIdx: number, headerLevel: number): number {
        for (let i = headerIdx + 1; i < flatRows.length; i++) {
            if (flatRows[i].level <= headerLevel) return i;
        }
        return flatRows.length;
    }

    function buildGroups(start: number, end: number, targetLevel: number): readonly RowGroup[] {
        const groups: RowGroup[] = [];
        for (let i = start; i < end; i++) {
            const row = flatRows[i];
            if (row.level === targetLevel && row.child) {
                const childEnd = getChildEnd(i, targetLevel);
                const subGroups = buildGroups(i + 1, childEnd, targetLevel + 1);
                groups.push({
                    headerIndex: i,
                    isCollapsed: false,
                    subGroups: subGroups.length > 0 ? subGroups : undefined,
                });
            }
        }
        return groups;
    }

    return buildGroups(0, flatRows.length, 0);
}

// ─── TreeCell custom renderer ──────────────────────────────────────────────────
interface TreeCellData {
    readonly kind: "tree-cell";
    readonly text: string;
    // mirrors FlatTreeItem metadata
    readonly level: number;
    readonly child: boolean;
    readonly isExpanded: boolean;
    readonly last: boolean;
    readonly parentContinues: readonly boolean[];
}

type TreeCell = CustomCell<TreeCellData>;

const INDENT = 18;
const ICON_SIZE = 13;

const treeCellRenderer: CustomRenderer<TreeCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is TreeCell => (c.data as any).kind === "tree-cell",
    needsHover: true,
    needsHoverPosition: true,

    draw: (args, cell) => {
        const { ctx, rect, theme, hoverX, hoverY, overrideCursor } = args;
        const { text, level, child, isExpanded, last, parentContinues } = cell.data;

        const leftPad = 8;
        const x0 = rect.x + leftPad;
        const cy = rect.y + rect.height / 2;

        // Centre x of slot d
        const slotX = (d: number) => x0 + d * INDENT + INDENT / 2 + 0.5;

        // Text always starts at the slot after the current level
        const textX = x0 + (level + 1) * INDENT + 4;

        ctx.save();
        ctx.strokeStyle = "#bbb";
        ctx.lineWidth = 1;

        // ── Ancestor slots 0…level-1: draw full-height │ where ancestor continues ──
        for (let d = 0; d < level; d++) {
            if (parentContinues[d]) {
                const lx = slotX(d);
                ctx.beginPath();
                ctx.moveTo(lx, rect.y);
                ctx.lineTo(lx, rect.y + rect.height);
                ctx.stroke();
            }
        }

        // ── Current slot (level): icon for child rows, ├─ / └─ for leaf rows ──
        const connX = slotX(level);

        if (child) {
            // Box icon centred at connX
            const iconLeft = Math.round(connX - ICON_SIZE / 2 - 0.5);
            const iconTop = Math.round(cy - ICON_SIZE / 2);

            const relX = hoverX ?? -999;
            const relY = hoverY ?? -999;
            const isHovering =
                relX >= iconLeft - rect.x - 2 &&
                relX <= iconLeft - rect.x + ICON_SIZE + 2 &&
                relY >= iconTop - rect.y - 2 &&
                relY <= iconTop - rect.y + ICON_SIZE + 2;

            if (isHovering && overrideCursor !== undefined) overrideCursor("pointer");

            ctx.fillStyle = isHovering ? "#e8f0fe" : theme.bgCell;
            ctx.strokeStyle = "#888";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.rect(iconLeft + 0.5, iconTop + 0.5, ICON_SIZE, ICON_SIZE);
            ctx.fill();
            ctx.stroke();

            // − when expanded, + when collapsed
            ctx.strokeStyle = "#555";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(iconLeft + 3, cy);
            ctx.lineTo(iconLeft + ICON_SIZE - 2, cy);
            if (!isExpanded) {
                ctx.moveTo(Math.round(connX), iconTop + 3);
                ctx.lineTo(Math.round(connX), iconTop + ICON_SIZE - 2);
            }
            ctx.stroke();
        } else {
            // ├─  (last=false): vertical runs full cell height
            // └─  (last=true):  vertical runs only to row centre
            ctx.strokeStyle = "#bbb";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(connX, rect.y);
            ctx.lineTo(connX, last ? cy : rect.y + rect.height);
            ctx.moveTo(connX, cy);
            ctx.lineTo(textX - 2, cy);
            ctx.stroke();
        }

        // ── Text ────────────────────────────────────────────────────────────────
        const maxTextWidth = rect.x + rect.width - textX - 4;

        ctx.font = theme.baseFontFull;
        ctx.fillStyle = theme.textDark;
        ctx.textBaseline = "middle";
        ctx.textAlign = "left";

        ctx.beginPath();
        ctx.rect(textX, rect.y, Math.max(0, maxTextWidth), rect.height);
        ctx.clip();
        ctx.fillText(text, textX, cy + getMiddleCenterBias(ctx, theme));

        ctx.restore();
        return true;
    },

    measure: (ctx, cell, theme) => {
        const { text, level } = cell.data;
        const textStart = 8 + (level + 1) * INDENT + 4;
        return textStart + ctx.measureText(text).width + theme.cellHorizontalPadding;
    },
};

// ─── Sample menu data ──────────────────────────────────────────────────────────
interface MenuItem {
    menu_cd: string;
    up_menu_cd: string;
    menu_nm: string;
    url: string;
    sort: number;
    use_yn: boolean;
}

const MENU_DATA: MenuItem[] = [
    // ── 루트 1: 구매품목 (sort=1, 마지막 루트가 아님 → 자식들에게 parentContinues[0]=true) ──
    { menu_cd: "MST00000", up_menu_cd: "ROOT", menu_nm: "구매품목",              url: "",                                              sort: 1,  use_yn: true  },
    { menu_cd: "MST20010", up_menu_cd: "MST00000", menu_nm: "구매품목신규요청",   url: "ui/bp/cms/itemreq/em-item-req.html",            sort: 1,  use_yn: true  },
    { menu_cd: "MST20000", up_menu_cd: "MST00000", menu_nm: "구매품목신규승인",   url: "ui/bp/cms/itemreq/em-item-req-mgt.html",        sort: 2,  use_yn: true  },
    { menu_cd: "MST20040", up_menu_cd: "MST00000", menu_nm: "구매품목조회",       url: "ui/bp/cms/item/em-item.html",                   sort: 3,  use_yn: false },
    { menu_cd: "MST20100", up_menu_cd: "MST00000", menu_nm: "구매품목조회",       url: "",                                              sort: 3,  use_yn: true  },
    { menu_cd: "MST20090", up_menu_cd: "MST20100", menu_nm: "구매품목조회",       url: "ui/bp/cms/item/em-item.html",                   sort: 1,  use_yn: true  },
    { menu_cd: "MST20080", up_menu_cd: "MST20100", menu_nm: "구매품목조회(단가계약품목)", url: "ui/bp/cms/item/em-pricecontract-item.html", sort: 2, use_yn: true },
    { menu_cd: "PR060200", up_menu_cd: "MST20100", menu_nm: "구매품목단가계약현황", url: "ui/bp/pro/contract/em-pricecontract-status.html", sort: 9, use_yn: true },
    { menu_cd: "MST20060", up_menu_cd: "MST00000", menu_nm: "품목분류현황",       url: "ui/bp/cms/cate/itemcate/em-itemcate.html",      sort: 4,  use_yn: false },
    { menu_cd: "MST10000", up_menu_cd: "MST00000", menu_nm: "구매품목분류",       url: "",                                              sort: 5,  use_yn: true  },
    { menu_cd: "MST20050", up_menu_cd: "MST10000", menu_nm: "품목운영단위 연결",   url: "ui/bp/cms/item/em-item-operorg-link.html",      sort: 6,  use_yn: true  },
    { menu_cd: "MST20070", up_menu_cd: "MST10000", menu_nm: "구매품목일괄신규요청", url: "ui/bp/cms/itemreq/em-item-req-mt.html",        sort: 7,  use_yn: true  },
    { menu_cd: "MST30010", up_menu_cd: "MST10000", menu_nm: "원자재 대시보드",    url: "",                                              sort: 8,  use_yn: false },
    { menu_cd: "MST40010", up_menu_cd: "MST10000", menu_nm: "품목정보 연계 모니터링", url: "ui/bp/cms/item/em-item-send.html",            sort: 9,  use_yn: true  },
    // ── 루트 2: 구매계약 (sort=2, 마지막 루트 → 자식들에게 parentContinues[0]=false) ──
    { menu_cd: "CON00000", up_menu_cd: "ROOT",     menu_nm: "구매계약",           url: "",                                              sort: 2,  use_yn: true  },
    { menu_cd: "CON10000", up_menu_cd: "CON00000", menu_nm: "구매계약조회",        url: "ui/pur/contract/em-contract.html",              sort: 1,  use_yn: true  },
    { menu_cd: "CON20000", up_menu_cd: "CON00000", menu_nm: "단가계약관리",        url: "ui/pur/contract/em-price-contract.html",        sort: 2,  use_yn: true  },
];

const COLUMNS = [
    { title: "메뉴명",   id: "menu_nm", width: 260 },
    { title: "메뉴코드", id: "menu_cd", width: 110 },
    { title: "URL",      id: "url",     width: 350 },
    { title: "정렬",     id: "sort",    width: 60  },
    { title: "사용여부", id: "use_yn",  width: 80  },
];

// ─── Story ─────────────────────────────────────────────────────────────────────
export const TreeView = () => {
    // hierachyTransformByKey: flat array → nested tree → flat DFS rows with metadata
    const flatRows = React.useMemo(
        () => hierachyTransformByKey(MENU_DATA, "menu_cd", "up_menu_cd", "children", "ROOT", "sort"),
        []
    );

    const totalRows = flatRows.length;

    const initialGroups = React.useMemo(() => buildRowGroupingGroups(flatRows), [flatRows]);

    const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
        groups: initialGroups,
        height: 34,
        navigationBehavior: "block",
        selectionBehavior: "block-spanning",
        themeOverride: { bgCell: "#f0f4ff" },
    }));

    const { mapper } = useRowGrouping(rowGrouping, totalRows);

    const getCellContent = React.useCallback(
        ([col, row]: Item) => {
            const { originalIndex, isGroupHeader } = mapper([col, row]);
            const flatRow = flatRows[originalIndex[1]];
            if (flatRow === undefined) {
                return { kind: GridCellKind.Text, data: "", displayData: "", allowOverlay: false };
            }

            const { data: menuItem, level, child, last, parentContinues } = flatRow;
            const isExpanded = isGroupHeader
                ? !(isGroupCollapsed(rowGrouping.groups, originalIndex[1]) ?? false)
                : false;

            switch (col) {
                case 0:
                    return {
                        kind: GridCellKind.Custom,
                        allowOverlay: false,
                        readonly: true,
                        copyData: menuItem.menu_nm,
                        data: {
                            kind: "tree-cell",
                            text: menuItem.menu_nm,
                            level,
                            child,
                            isExpanded,
                            last,
                            parentContinues,
                        },
                    } as TreeCell;
                case 1:
                    return {
                        kind: GridCellKind.Text,
                        data: menuItem.menu_cd,
                        displayData: menuItem.menu_cd,
                        allowOverlay: false,
                        style: menuItem.url ? "faded" : "normal",
                        themeOverride: menuItem.url ? { textDark: "#1565c0", fontStyle: "bold" } : undefined,
                    } as any;
                case 2:
                    return {
                        kind: GridCellKind.Text,
                        data: menuItem.url,
                        displayData: menuItem.url,
                        allowOverlay: false,
                    };
                case 3:
                    return {
                        kind: GridCellKind.Number,
                        data: menuItem.sort,
                        displayData: String(menuItem.sort),
                        allowOverlay: false,
                        contentAlign: "center",
                    };
                case 4:
                    return {
                        kind: GridCellKind.Boolean,
                        data: menuItem.use_yn,
                        allowOverlay: false,
                    };
                default:
                    return { kind: GridCellKind.Text, data: "", displayData: "", allowOverlay: false };
            }
        },
        [flatRows, mapper, rowGrouping]
    );

    const onCellClicked = React.useCallback(
        (item: Item) => {
            const [col] = item;
            if (col !== 0) return;

            const { path, isGroupHeader } = mapper(item);
            if (!isGroupHeader) return;

            const group = getRowGroupingForPath(rowGrouping.groups, path);
            setRowGrouping(prev => ({
                ...prev,
                groups: updateRowGroupingByPath(prev.groups, path, {
                    isCollapsed: !group.isCollapsed,
                }),
            }));
        },
        [mapper, rowGrouping.groups]
    );

    const customRenderers = React.useMemo(() => [treeCellRenderer], []);

    return (
        <DataEditor
            {...defaultProps}
            width="100%"
            height="500px"
            columns={COLUMNS}
            rows={totalRows}
            getCellContent={getCellContent}
            rowGrouping={rowGrouping}
            onCellClicked={onCellClicked}
            customRenderers={customRenderers}
            rowMarkers="none"
            verticalBorder={true}
        />
    );
};

TreeView.storyName = "07. Tree View";

// ─── Helper: check if a group at a given headerIndex is collapsed ───────────────
function isGroupCollapsed(groups: readonly RowGroup[], headerIndex: number): boolean | undefined {
    for (const g of groups) {
        if (g.headerIndex === headerIndex) return g.isCollapsed;
        if (g.subGroups) {
            const found = isGroupCollapsed(g.subGroups, headerIndex);
            if (found !== undefined) return found;
        }
    }
    return undefined;
}
