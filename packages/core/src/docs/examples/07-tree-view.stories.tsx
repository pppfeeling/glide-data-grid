import React from "react";
import { DataEditorAll as DataEditor } from "../../data-editor-all.js";
import {
    GridCellKind,
    type EditableGridCell,
    type Item,
} from "../../index.js";
import { type RowGroupingOptions, type RowGroup } from "../../data-editor/row-grouping.js";
import { useRowGrouping, updateRowGroupingByPath, getRowGroupingForPath } from "../../data-editor/row-grouping-api.js";
import { BeautifulWrapper, Description, defaultProps } from "../stories/utils.js";
import { SimpleThemeWrapper } from "../../stories/story-utils.js";
import { treeCellRenderer, type TreeCell } from "../../cells/tree-cell.js";

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
    const [menuData, setMenuData] = React.useState<MenuItem[]>(() => [...MENU_DATA]);

    // hierachyTransformByKey: flat array → nested tree → flat DFS rows with metadata
    const flatRows = React.useMemo(
        () => hierachyTransformByKey(menuData, "menu_cd", "up_menu_cd", "children", "ROOT", null),
        [menuData]
    );

    const totalRows = flatRows.length;

    const initialGroups = React.useMemo(() => buildRowGroupingGroups(flatRows), [flatRows]);

    const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
        groups: initialGroups,
        height: 34,
        navigationBehavior: "normal",
        selectionBehavior: "allow-spanning",
        themeOverride: { bgCell: "#f0f4ff" },
    }));

    const { mapper } = useRowGrouping(rowGrouping, totalRows);

    const toggleGroup = React.useCallback(
        (path: readonly number[]) => {
            const group = getRowGroupingForPath(rowGrouping.groups, path);
            setRowGrouping(prev => ({
                ...prev,
                groups: updateRowGroupingByPath(prev.groups, path, {
                    isCollapsed: !group.isCollapsed,
                }),
            }));
        },
        [rowGrouping.groups]
    );

    const getCellContent = React.useCallback(
        ([col, row]: Item) => {
            const { originalIndex, isGroupHeader, path } = mapper([col, row]);
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
                        allowOverlay: true,
                        copyData: menuItem.menu_nm,
                        data: {
                            kind: "tree-cell",
                            text: menuItem.menu_nm,
                            level,
                            child,
                            isExpanded,
                            last,
                            parentContinues,
                            onToggle: isGroupHeader ? () => toggleGroup(path) : undefined,
                        },
                    } as TreeCell;
                case 1:
                    return {
                        kind: GridCellKind.Text,
                        data: menuItem.menu_cd,
                        displayData: menuItem.menu_cd,
                        allowOverlay: true,
                        style: menuItem.url ? "faded" : "normal",
                        themeOverride: menuItem.url ? { textDark: "#1565c0", fontStyle: "bold" } : undefined,
                    } as any;
                case 2:
                    return {
                        kind: GridCellKind.Text,
                        data: menuItem.url,
                        displayData: menuItem.url,
                        allowOverlay: true,
                    };
                case 3:
                    return {
                        kind: GridCellKind.Number,
                        data: menuItem.sort,
                        displayData: String(menuItem.sort),
                        allowOverlay: true,
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
        [flatRows, mapper, rowGrouping, toggleGroup]
    );

    const onCellEdited = React.useCallback(
        (item: Item, newValue: EditableGridCell) => {
            const [col, row] = item;
            const { originalIndex } = mapper([col, row]);
            const flatRow = flatRows[originalIndex[1]];
            if (flatRow === undefined) return;

            const menuCd = flatRow.data.menu_cd;
            setMenuData(prev =>
                prev.map(m => {
                    if (m.menu_cd !== menuCd) return m;
                    switch (col) {
                        case 0:
                            return { ...m, menu_nm: (newValue as any).data.text as string };
                        case 1:
                            return { ...m, menu_cd: (newValue as any).data as string };
                        case 2:
                            return { ...m, url: (newValue as any).data as string };
                        case 3:
                            return { ...m, sort: (newValue as any).data as number };
                        case 4:
                            return { ...m, use_yn: (newValue as any).data as boolean };
                        default:
                            return m;
                    }
                })
            );
        },
        [mapper, flatRows]
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
            onCellEdited={onCellEdited}
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
