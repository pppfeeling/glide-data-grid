/* eslint-disable sonarjs/no-duplicate-string */
import { expect, describe, it } from "vitest";
import {
    getGroupName,
    getGroupAtLevel,
    isGroupEqual,
    isGroupEqualAtLevel,
    computeBounds,
    getRowIndexForY,
    type MappedGridColumn,
} from "../src/internal/data-grid/render/data-grid-lib.js";

describe("Multi-Level Header Helper Functions", () => {
    describe("getGroupName", () => {
        it("should return empty string for undefined group", () => {
            expect(getGroupName(undefined)).toBe("");
        });

        it("should return the string as-is for string group", () => {
            expect(getGroupName("Personal")).toBe("Personal");
        });

        it("should return empty string for empty string group", () => {
            expect(getGroupName("")).toBe("");
        });

        it("should return last element for array group without level", () => {
            expect(getGroupName(["Location", "Geography", "Area"])).toBe("Area");
        });

        it("should return empty string for empty array group", () => {
            expect(getGroupName([])).toBe("");
        });

        it("should return specific level when level is provided", () => {
            const group = ["Location", "Geography", "Area"];
            expect(getGroupName(group, 0)).toBe("Location");
            expect(getGroupName(group, 1)).toBe("Geography");
            expect(getGroupName(group, 2)).toBe("Area");
        });

        it("should return last element when level is out of range", () => {
            const group = ["Location", "Geography", "Area"];
            expect(getGroupName(group, 3)).toBe("Area");
            expect(getGroupName(group, -1)).toBe("Area");
        });

        it("should return string as-is even when level is provided (string type)", () => {
            expect(getGroupName("Personal", 0)).toBe("Personal");
            expect(getGroupName("Personal", 1)).toBe("Personal");
        });

        it("should handle single-element array", () => {
            expect(getGroupName(["Only"])).toBe("Only");
            expect(getGroupName(["Only"], 0)).toBe("Only");
        });
    });

    describe("getGroupAtLevel", () => {
        it("should return undefined for undefined group", () => {
            expect(getGroupAtLevel(undefined, 0, 3)).toBeUndefined();
            expect(getGroupAtLevel(undefined, 1, 3)).toBeUndefined();
        });

        it("should return string group only at the bottom level (totalLevels - 1)", () => {
            expect(getGroupAtLevel("Personal", 0, 3)).toBeUndefined();
            expect(getGroupAtLevel("Personal", 1, 3)).toBeUndefined();
            expect(getGroupAtLevel("Personal", 2, 3)).toBe("Personal");
        });

        it("should return string group at level 0 when totalLevels is 1", () => {
            expect(getGroupAtLevel("Personal", 0, 1)).toBe("Personal");
        });

        it("should return correct group for array at each level", () => {
            const group = ["Location", "Geography", "Area"];
            expect(getGroupAtLevel(group, 0, 3)).toBe("Location");
            expect(getGroupAtLevel(group, 1, 3)).toBe("Geography");
            expect(getGroupAtLevel(group, 2, 3)).toBe("Area");
        });

        it("should return undefined for level beyond array length", () => {
            const group = ["Location", "Geography"];
            expect(getGroupAtLevel(group, 2, 3)).toBeUndefined();
            expect(getGroupAtLevel(group, 3, 4)).toBeUndefined();
        });

        it("should handle empty array", () => {
            expect(getGroupAtLevel([], 0, 1)).toBeUndefined();
        });

        it("should handle single-element array", () => {
            expect(getGroupAtLevel(["Only"], 0, 3)).toBe("Only");
            expect(getGroupAtLevel(["Only"], 1, 3)).toBeUndefined();
        });

        it("should handle mixed columns with different group depths", () => {
            // 3-level column
            const deepGroup = ["Location", "Geography", "Area"];
            // 2-level column (shorter than total levels)
            const shallowGroup = ["Product", "Details"];

            // totalLevels = 3 (determined by the deepest column)
            expect(getGroupAtLevel(deepGroup, 0, 3)).toBe("Location");
            expect(getGroupAtLevel(deepGroup, 1, 3)).toBe("Geography");
            expect(getGroupAtLevel(deepGroup, 2, 3)).toBe("Area");

            expect(getGroupAtLevel(shallowGroup, 0, 3)).toBe("Product");
            expect(getGroupAtLevel(shallowGroup, 1, 3)).toBe("Details");
            expect(getGroupAtLevel(shallowGroup, 2, 3)).toBeUndefined();
        });
    });

    describe("isGroupEqual", () => {
        it("should return true for both undefined", () => {
            expect(isGroupEqual(undefined, undefined)).toBe(true);
        });

        it("should return true for equal strings", () => {
            expect(isGroupEqual("Personal", "Personal")).toBe(true);
        });

        it("should return false for different strings", () => {
            expect(isGroupEqual("Personal", "Contact")).toBe(false);
        });

        it("should return true when arrays have the same last element", () => {
            expect(isGroupEqual(["A", "B", "Same"], ["X", "Y", "Same"])).toBe(true);
        });

        it("should return false when arrays have different last elements", () => {
            expect(isGroupEqual(["A", "B", "Area"], ["A", "B", "Place"])).toBe(false);
        });

        it("should compare string with array's last element", () => {
            expect(isGroupEqual("Area", ["Location", "Geography", "Area"])).toBe(true);
            expect(isGroupEqual("Geography", ["Location", "Geography", "Area"])).toBe(false);
        });

        it("should handle undefined vs string", () => {
            expect(isGroupEqual(undefined, "Personal")).toBe(false);
            expect(isGroupEqual("Personal", undefined)).toBe(false);
        });

        it("should handle undefined vs empty string", () => {
            // undefined -> "", empty string -> ""
            expect(isGroupEqual(undefined, "")).toBe(true);
        });

        it("should handle empty arrays", () => {
            expect(isGroupEqual([], [])).toBe(true);
            expect(isGroupEqual([], undefined)).toBe(true);
        });
    });

    describe("isGroupEqualAtLevel", () => {
        const totalLevels = 3;

        it("should return true for same groups at all levels", () => {
            const group = ["Location", "Geography", "Area"];
            expect(isGroupEqualAtLevel(group, group, 0, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(group, group, 1, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(group, group, 2, totalLevels)).toBe(true);
        });

        it("should return true at level 0 when top-level matches", () => {
            const left = ["Location", "Geography", "Area"];
            const right = ["Location", "Geography", "Place"];
            expect(isGroupEqualAtLevel(left, right, 0, totalLevels)).toBe(true);
        });

        it("should return true at level 1 when levels 0 and 1 match", () => {
            const left = ["Location", "Geography", "Area"];
            const right = ["Location", "Geography", "Place"];
            expect(isGroupEqualAtLevel(left, right, 1, totalLevels)).toBe(true);
        });

        it("should return false at level 2 when level 2 differs", () => {
            const left = ["Location", "Geography", "Area"];
            const right = ["Location", "Geography", "Place"];
            expect(isGroupEqualAtLevel(left, right, 2, totalLevels)).toBe(false);
        });

        it("should return false at level 0 when top-level differs", () => {
            const left = ["Location", "Geography", "Area"];
            const right = ["Product Info", "Details", "Item"];
            expect(isGroupEqualAtLevel(left, right, 0, totalLevels)).toBe(false);
        });

        it("should return false at level 1 when level 1 differs", () => {
            const left = ["Location", "Geography", "Area"];
            const right = ["Location", "Demographics", "People"];
            expect(isGroupEqualAtLevel(left, right, 1, totalLevels)).toBe(false);
        });

        it("should handle undefined groups", () => {
            expect(isGroupEqualAtLevel(undefined, undefined, 0, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(undefined, ["A", "B", "C"], 0, totalLevels)).toBe(false);
        });

        it("should handle string vs array comparison", () => {
            // string "Area" appears at level 2 (totalLevels - 1) only
            // array ["Location", "Geography", "Area"] has all levels
            const str = "Area";
            const arr: readonly string[] = ["Location", "Geography", "Area"];

            // At level 0: string has undefined, array has "Location" -> false
            expect(isGroupEqualAtLevel(str, arr, 0, totalLevels)).toBe(false);

            // At level 2: string has "Area", array has "Area" -> but level 0 still needs to match
            // string at level 0 = undefined, array at level 0 = "Location" -> false
            expect(isGroupEqualAtLevel(str, arr, 2, totalLevels)).toBe(false);
        });

        it("should handle two identical string groups at bottom level", () => {
            // Both strings appear at level totalLevels - 1 only
            expect(isGroupEqualAtLevel("Same", "Same", totalLevels - 1, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel("A", "B", totalLevels - 1, totalLevels)).toBe(false);
        });

        it("should handle groups with different lengths", () => {
            const short: readonly string[] = ["Location"];
            const long: readonly string[] = ["Location", "Geography", "Area"];

            // At level 0: both have "Location" -> true
            expect(isGroupEqualAtLevel(short, long, 0, totalLevels)).toBe(true);

            // At level 1: short has undefined, long has "Geography" -> false
            expect(isGroupEqualAtLevel(short, long, 1, totalLevels)).toBe(false);
        });

        it("should correctly compare for group header click selection", () => {
            // Simulating the Geography group click scenario from the bug fix
            const col1 = ["Location", "Geography", "Area"];
            const col2 = ["Location", "Geography", "Area"];
            const col3 = ["Location", "Geography", "Place"];
            const col4 = ["Product Info", "Details", "Item"];

            // Clicking "Geography" (level 1): col1, col2, col3 should match
            expect(isGroupEqualAtLevel(col1, col2, 1, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(col1, col3, 1, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(col1, col4, 1, totalLevels)).toBe(false);

            // Clicking "Area" (level 2): only col1 and col2 should match
            expect(isGroupEqualAtLevel(col1, col2, 2, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(col1, col3, 2, totalLevels)).toBe(false);

            // Clicking "Location" (level 0): col1, col2, col3 should match
            expect(isGroupEqualAtLevel(col1, col2, 0, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(col1, col3, 0, totalLevels)).toBe(true);
            expect(isGroupEqualAtLevel(col1, col4, 0, totalLevels)).toBe(false);
        });
    });
});

// Helper to create MappedGridColumn for computeBounds tests
function makeCol(
    title: string,
    sourceIndex: number,
    sticky: boolean,
    width: number,
    group?: string | readonly string[]
): MappedGridColumn {
    return {
        title, sourceIndex, sticky, width, group,
        grow: undefined, headerRowMarkerAlwaysVisible: undefined,
        headerRowMarkerTheme: undefined, headerRowMarkerDisabled: undefined,
        hasMenu: undefined, icon: undefined, id: undefined, menuIcon: undefined,
        indicatorIcon: undefined, overlayIcon: undefined, style: undefined,
        themeOverride: undefined, trailingRowOptions: undefined, growOffset: undefined,
        rowMarker: undefined, rowMarkerChecked: undefined, rowGroupBorder: undefined,
        required: undefined,
    };
}

describe("computeBounds - Multi-Level Header Regression", () => {
    // 3 levels, each 32px high, headerHeight = 36
    const groupHeaderHeights = [32, 32, 32] as const;
    const groupLevels = 3;
    const headerHeight = 36;
    const totalGroupHeaderHeight = 96; // 32 * 3
    const totalHeaderHeight = headerHeight + totalGroupHeaderHeight; // 132

    const cols: MappedGridColumn[] = [
        makeCol("Region", 0, false, 100, ["Location", "Geography", "Area"]),
        makeCol("Country", 1, false, 100, ["Location", "Geography", "Area"]),
        makeCol("City", 2, false, 100, ["Location", "Geography", "Place"]),
        makeCol("Product", 3, false, 100, ["Product Info", "Details", "Item"]),
    ];

    it("should compute correct bounds for column header (row -1) with multi-level groups", () => {
        const bounds = computeBounds(
            0, -1, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        // Column header should start after all group headers
        expect(bounds.y).toBe(totalGroupHeaderHeight); // 96
        expect(bounds.height).toBe(headerHeight); // 36, NOT negative!
    });

    it("should compute correct bounds for group header level 0 (row -2)", () => {
        const bounds = computeBounds(
            0, -2, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        expect(bounds.y).toBe(0);
        expect(bounds.height).toBe(32);
        // Level 0 "Location" spans cols 0-3
        expect(bounds.width).toBeGreaterThan(100);
    });

    it("should compute correct bounds for group header level 1 (row -3)", () => {
        const bounds = computeBounds(
            0, -3, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        expect(bounds.y).toBe(32); // After level 0
        expect(bounds.height).toBe(32);
    });

    it("should compute correct bounds for group header level 2 (row -4)", () => {
        const bounds = computeBounds(
            0, -4, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        expect(bounds.y).toBe(64); // After levels 0 and 1
        expect(bounds.height).toBe(32);
        // Level 2 "Area" spans cols 0-1 only
        expect(bounds.width).toBe(201); // 100 + 100 + 1 (includes +1 for border)
    });

    it("should compute correct y for data cells with multi-level groups", () => {
        const bounds = computeBounds(
            0, 0, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        // Data row 0 starts at totalHeaderHeight = 132
        expect(bounds.y).toBe(totalHeaderHeight); // 132, NOT 68!
    });

    it("should compute correct group span at level 2 for different subgroups", () => {
        // Col 2 (City) has group "Place" at level 2, different from cols 0-1 "Area"
        const bounds = computeBounds(
            2, -4, 1000, 1000, totalGroupHeaderHeight, totalHeaderHeight,
            0, 0, 0, 0, 100, 0, 0, cols, 32, groupLevels, [...groupHeaderHeights]
        );
        expect(bounds.y).toBe(64);
        expect(bounds.height).toBe(32);
        // "Place" only spans col 2
        expect(bounds.width).toBe(101); // 100 + 1
    });
});

describe("getRowIndexForY - Multi-Level Header Regression", () => {
    const groupHeaderHeights = [32, 32, 32];
    const groupLevels = 3;
    const headerHeight = 36;

    it("should return level 0 group header for y in first group header area", () => {
        const row = getRowIndexForY(
            15, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-2); // level 0
    });

    it("should return level 1 group header for y in second group header area", () => {
        const row = getRowIndexForY(
            45, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-3); // level 1
    });

    it("should return level 2 group header for y in third group header area", () => {
        const row = getRowIndexForY(
            70, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-4); // level 2
    });

    it("should return column header (-1) for y in column header area", () => {
        // totalGroupHeaderHeight = 96, column header: 96 to 132
        const row = getRowIndexForY(
            110, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-1);
    });

    it("should return data row 0 for y just below total header", () => {
        // totalHeaderHeight = 132
        const row = getRowIndexForY(
            133, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(0);
    });

    it("should correctly handle boundary between group levels", () => {
        // Exactly at boundary between level 0 (0-32) and level 1 (32-64)
        const row = getRowIndexForY(
            32, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-2); // level 0 (<=32 includes boundary)
    });

    it("should return level 1 for y just past level 0 boundary", () => {
        const row = getRowIndexForY(
            33, 1000, true, headerHeight, 32, 100, 32, 0, 0, 0,
            groupLevels, groupHeaderHeights
        );
        expect(row).toBe(-3); // level 1
    });
});
