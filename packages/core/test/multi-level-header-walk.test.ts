/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, it, vi } from "vitest";
import type { MappedGridColumn } from "../src/internal/data-grid/render/data-grid-lib.js";
import {
    walkGroups,
    walkMultiLevelGroups,
    type WalkGroupsCallback,
    type WalkMultiLevelGroupsCallback,
} from "../src/internal/data-grid/render/data-grid-render.walk.js";

function makeCol(
    title: string,
    sourceIndex: number,
    sticky: boolean,
    width: number,
    group?: string | readonly string[]
): MappedGridColumn {
    return {
        title,
        sourceIndex,
        sticky,
        width,
        group,
        grow: undefined,
        headerRowMarkerAlwaysVisible: undefined,
        headerRowMarkerTheme: undefined,
        headerRowMarkerDisabled: undefined,
        hasMenu: undefined,
        icon: undefined,
        id: undefined,
        menuIcon: undefined,
        indicatorIcon: undefined,
        overlayIcon: undefined,
        style: undefined,
        themeOverride: undefined,
        trailingRowOptions: undefined,
        growOffset: undefined,
        rowMarker: undefined,
        rowMarkerChecked: undefined,
        rowGroupBorder: undefined,
        required: undefined,
    };
}

describe("walkGroups (single-level)", () => {
    it("should call callback for each group span", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, "Group1"),
            makeCol("B", 1, false, 100, "Group1"),
            makeCol("C", 2, false, 100, "Group2"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, 0, 32, cb);

        expect(cb).toHaveBeenCalledTimes(2);

        // Group1: cols 0-1, x=0, width=200
        expect(cb).toHaveBeenCalledWith([0, 1], "Group1", 0, 0, 200, 32);
        // Group2: col 2, x=200, width=100
        expect(cb).toHaveBeenCalledWith([2, 2], "Group2", 200, 0, 100, 32);
    });

    it("should handle single column groups", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, "G1"),
            makeCol("B", 1, false, 150, "G2"),
            makeCol("C", 2, false, 200, "G3"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, 0, 32, cb);

        expect(cb).toHaveBeenCalledTimes(3);
        expect(cb).toHaveBeenCalledWith([0, 0], "G1", 0, 0, 100, 32);
        expect(cb).toHaveBeenCalledWith([1, 1], "G2", 100, 0, 150, 32);
        expect(cb).toHaveBeenCalledWith([2, 2], "G3", 250, 0, 200, 32);
    });

    it("should handle all columns in the same group", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, "Same"),
            makeCol("B", 1, false, 100, "Same"),
            makeCol("C", 2, false, 100, "Same"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, 0, 32, cb);

        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith([0, 2], "Same", 0, 0, 300, 32);
    });

    it("should handle columns with no group (undefined)", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, undefined),
            makeCol("B", 1, false, 100, undefined),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, 0, 32, cb);

        // undefined groups still get walked as empty string group
        expect(cb).toHaveBeenCalledTimes(1);
        expect(cb).toHaveBeenCalledWith([0, 1], "", 0, 0, 200, 32);
    });

    it("should apply translateX to non-sticky columns", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, "G1"),
            makeCol("B", 1, false, 100, "G2"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, -50, 32, cb);

        // translateX = -50: localX = 0 + (-50) = -50
        // delta = max(0, clipX - localX) = max(0, 0 - (-50)) = 50
        // final x = localX + delta = -50 + 50 = 0, w = min(100-50, 1000-0) = 50
        expect(cb).toHaveBeenCalledWith([0, 0], "G1", 0, 0, 50, 32);
        expect(cb).toHaveBeenCalledWith([1, 1], "G2", 50, 0, 100, 32);
    });

    it("should not apply translateX to sticky columns", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, true, 100, "G1"),
            makeCol("B", 1, false, 100, "G2"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, -50, 32, cb);

        // Sticky column: translateX not applied
        expect(cb.mock.calls[0][2]).toBe(0); // G1 x=0 (sticky)
    });

    it("should separate groups when sticky changes", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, true, 100, "Same"),
            makeCol("B", 1, false, 100, "Same"),
        ];

        const cb = vi.fn<Parameters<WalkGroupsCallback>, ReturnType<WalkGroupsCallback>>();
        walkGroups(cols, 1000, 0, 32, cb);

        // Even though same group name, sticky boundary separates them
        expect(cb).toHaveBeenCalledTimes(2);
    });
});

describe("walkMultiLevelGroups", () => {
    it("should not call callback when groupLevels is 0", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["L0", "L1", "L2"]),
        ];

        const cb = vi.fn<Parameters<WalkMultiLevelGroupsCallback>, ReturnType<WalkMultiLevelGroupsCallback>>();
        walkMultiLevelGroups(cols, 1000, 0, [32, 32, 32], 0, cb);

        expect(cb).not.toHaveBeenCalled();
    });

    it("should walk all levels for a single column", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["Location", "Geography", "Area"]),
        ];

        const cb = vi.fn<Parameters<WalkMultiLevelGroupsCallback>, ReturnType<WalkMultiLevelGroupsCallback>>();
        walkMultiLevelGroups(cols, 1000, 0, [30, 30, 30], 3, cb);

        expect(cb).toHaveBeenCalledTimes(3);

        // Level 0: "Location", y=0, height=30
        expect(cb).toHaveBeenCalledWith([0, 0], "Location", 0, 0, 100, 30, 0);
        // Level 1: "Geography", y=30, height=30
        expect(cb).toHaveBeenCalledWith([0, 0], "Geography", 0, 30, 100, 30, 1);
        // Level 2: "Area", y=60, height=30
        expect(cb).toHaveBeenCalledWith([0, 0], "Area", 0, 60, 100, 30, 2);
    });

    it("should merge columns with same group at each level", () => {
        const cols: MappedGridColumn[] = [
            makeCol("Region", 0, false, 100, ["Location", "Geography", "Area"]),
            makeCol("Country", 1, false, 100, ["Location", "Geography", "Area"]),
            makeCol("City", 2, false, 100, ["Location", "Geography", "Place"]),
        ];

        const results: Array<{span: readonly [number, number], group: string, level: number, width: number}> = [];
        const cb: WalkMultiLevelGroupsCallback = (span, group, _x, _y, width, _h, level) => {
            results.push({ span: span as [number, number], group, level, width });
        };

        walkMultiLevelGroups(cols, 1000, 0, [30, 30, 30], 3, cb);

        // Level 0: All 3 cols share "Location" -> 1 span
        const level0 = results.filter(r => r.level === 0);
        expect(level0).toHaveLength(1);
        expect(level0[0].group).toBe("Location");
        expect(level0[0].span).toEqual([0, 2]);
        expect(level0[0].width).toBe(300);

        // Level 1: All 3 cols share "Geography" -> 1 span
        const level1 = results.filter(r => r.level === 1);
        expect(level1).toHaveLength(1);
        expect(level1[0].group).toBe("Geography");
        expect(level1[0].span).toEqual([0, 2]);
        expect(level1[0].width).toBe(300);

        // Level 2: "Area" (cols 0-1) and "Place" (col 2) -> 2 spans
        const level2 = results.filter(r => r.level === 2);
        expect(level2).toHaveLength(2);
        expect(level2[0].group).toBe("Area");
        expect(level2[0].span).toEqual([0, 1]);
        expect(level2[0].width).toBe(200);
        expect(level2[1].group).toBe("Place");
        expect(level2[1].span).toEqual([2, 2]);
        expect(level2[1].width).toBe(100);
    });

    it("should handle complex multi-group structure", () => {
        // This replicates the example from the documentation
        const cols: MappedGridColumn[] = [
            makeCol("Region", 0, false, 100, ["Location", "Geography", "Area"]),
            makeCol("Country", 1, false, 100, ["Location", "Geography", "Area"]),
            makeCol("City", 2, false, 100, ["Location", "Geography", "Place"]),
            makeCol("Product", 3, false, 100, ["Product Info", "Details", "Item"]),
            makeCol("Category", 4, false, 100, ["Product Info", "Details", "Item"]),
        ];

        const results: Array<{span: readonly [number, number], group: string, level: number}> = [];
        const cb: WalkMultiLevelGroupsCallback = (span, group, _x, _y, _w, _h, level) => {
            results.push({ span: span as [number, number], group, level });
        };

        walkMultiLevelGroups(cols, 1000, 0, [30, 30, 30], 3, cb);

        // Level 0: "Location" (0-2), "Product Info" (3-4)
        const level0 = results.filter(r => r.level === 0);
        expect(level0).toHaveLength(2);
        expect(level0[0]).toEqual({ span: [0, 2], group: "Location", level: 0 });
        expect(level0[1]).toEqual({ span: [3, 4], group: "Product Info", level: 0 });

        // Level 1: "Geography" (0-2), "Details" (3-4)
        const level1 = results.filter(r => r.level === 1);
        expect(level1).toHaveLength(2);
        expect(level1[0]).toEqual({ span: [0, 2], group: "Geography", level: 1 });
        expect(level1[1]).toEqual({ span: [3, 4], group: "Details", level: 1 });

        // Level 2: "Area" (0-1), "Place" (2), "Item" (3-4)
        const level2 = results.filter(r => r.level === 2);
        expect(level2).toHaveLength(3);
        expect(level2[0]).toEqual({ span: [0, 1], group: "Area", level: 2 });
        expect(level2[1]).toEqual({ span: [2, 2], group: "Place", level: 2 });
        expect(level2[2]).toEqual({ span: [3, 4], group: "Item", level: 2 });
    });

    it("should calculate correct y offsets for each level", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["Top", "Mid", "Bot"]),
        ];

        const heights = [40, 30, 20];
        const yResults: number[] = [];
        const cb: WalkMultiLevelGroupsCallback = (_span, _group, _x, y, _w, _h, _level) => {
            yResults.push(y);
        };

        walkMultiLevelGroups(cols, 1000, 0, heights, 3, cb);

        expect(yResults).toEqual([0, 40, 70]); // 0, 40, 40+30
    });

    it("should skip columns with no group at a specific level", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["Top", "Mid"]),
            makeCol("B", 1, false, 100, undefined),
            makeCol("C", 2, false, 100, ["Top", "Mid"]),
        ];

        const results: Array<{span: readonly [number, number], group: string, level: number}> = [];
        const cb: WalkMultiLevelGroupsCallback = (span, group, _x, _y, _w, _h, level) => {
            results.push({ span: span as [number, number], group, level });
        };

        walkMultiLevelGroups(cols, 1000, 0, [30, 30], 2, cb);

        // Column B has no group, so it should break the span
        const level0 = results.filter(r => r.level === 0);
        expect(level0.length).toBeGreaterThanOrEqual(1);

        // Column B should not appear in any group
        for (const result of results) {
            expect(result.group).not.toBe("");
        }
    });

    it("should handle translateX for non-sticky columns", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["G1"]),
            makeCol("B", 1, false, 100, ["G2"]),
        ];

        const xResults: number[] = [];
        const cb: WalkMultiLevelGroupsCallback = (_span, _group, x, _y, _w, _h, _level) => {
            xResults.push(x);
        };

        walkMultiLevelGroups(cols, 1000, -50, [30], 1, cb);

        // localX = 0 + (-50) = -50, delta = max(0, 0 - (-50)) = 50
        // final x = -50 + 50 = 0
        expect(xResults[0]).toBe(0);
        expect(xResults[1]).toBe(50);  // 100 + (-50) = 50
    });

    it("should not apply translateX to sticky columns", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, true, 100, ["G1"]),
            makeCol("B", 1, false, 100, ["G2"]),
        ];

        const xResults: number[] = [];
        const cb: WalkMultiLevelGroupsCallback = (_span, _group, x, _y, _w, _h, _level) => {
            xResults.push(x);
        };

        walkMultiLevelGroups(cols, 1000, -50, [30], 1, cb);

        // Sticky column should have x=0 (not affected by translateX)
        expect(xResults[0]).toBe(0);
    });

    it("should handle different group header heights per level", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["L0", "L1", "L2"]),
        ];

        const heights = [50, 35, 25]; // Different heights for each level
        const heightResults: number[] = [];
        const cb: WalkMultiLevelGroupsCallback = (_span, _group, _x, _y, _w, height, _level) => {
            heightResults.push(height);
        };

        walkMultiLevelGroups(cols, 1000, 0, heights, 3, cb);

        expect(heightResults).toEqual([50, 35, 25]);
    });

    it("should separate groups at sticky boundary even with same group name", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, true, 100, ["Same"]),
            makeCol("B", 1, false, 100, ["Same"]),
        ];

        const results: Array<{span: readonly [number, number], group: string}> = [];
        const cb: WalkMultiLevelGroupsCallback = (span, group) => {
            results.push({ span: span as [number, number], group });
        };

        walkMultiLevelGroups(cols, 1000, 0, [30], 1, cb);

        // Sticky boundary should separate even same-named groups
        expect(results).toHaveLength(2);
        expect(results[0].span).toEqual([0, 0]);
        expect(results[1].span).toEqual([1, 1]);
    });

    it("should not emit groups with zero or negative width", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["G1"]),
        ];

        const cb = vi.fn<Parameters<WalkMultiLevelGroupsCallback>, ReturnType<WalkMultiLevelGroupsCallback>>();
        // width=50 is less than column width, but localX=0 so w = min(100, 50-0) = 50
        walkMultiLevelGroups(cols, 50, 0, [30], 1, cb);

        expect(cb).toHaveBeenCalledTimes(1);
        // The width should be clamped to viewport
        expect(cb.mock.calls[0][4]).toBe(50);
    });

    it("should handle mixed single-string and array groups", () => {
        const cols: MappedGridColumn[] = [
            makeCol("A", 0, false, 100, ["Location", "Geography"]),
            makeCol("B", 1, false, 100, "Geography"), // Legacy single-string group
        ];

        const results: Array<{span: readonly [number, number], group: string, level: number}> = [];
        const cb: WalkMultiLevelGroupsCallback = (span, group, _x, _y, _w, _h, level) => {
            results.push({ span: span as [number, number], group, level });
        };

        walkMultiLevelGroups(cols, 1000, 0, [30, 30], 2, cb);

        // Level 0: A has "Location", B has undefined (string only at bottom) -> separate
        const level0 = results.filter(r => r.level === 0);
        expect(level0).toHaveLength(1);
        expect(level0[0].group).toBe("Location");
        expect(level0[0].span).toEqual([0, 0]);

        // Level 1: A has "Geography", B has "Geography" (string at bottom level)
        const level1 = results.filter(r => r.level === 1);
        expect(level1.some(r => r.group === "Geography")).toBe(true);
    });

    it("should handle empty column list", () => {
        const cb = vi.fn<Parameters<WalkMultiLevelGroupsCallback>, ReturnType<WalkMultiLevelGroupsCallback>>();
        walkMultiLevelGroups([], 1000, 0, [30, 30], 2, cb);

        expect(cb).not.toHaveBeenCalled();
    });
});
