import { expect, describe, it } from "vitest";
import { markerCellRenderer } from "../src/cells/marker-cell.js";
import { rowStatusCellRenderer } from "../src/cells/row-status-cell.js";
import { rowIdMarkerCellRenderer } from "../src/cells/row-id-marker-cell.js";
import { InnerGridCellKind } from "../src/internal/data-grid/data-grid-types.js";
import type { MarkerCell, RowStatusCell, RowIdCell, Rectangle } from "../src/internal/data-grid/data-grid-types.js";
import { mergeAndRealizeTheme } from "../src/common/styles.js";
import { getDefaultTheme } from "../src/index.js";
import type { BaseGridMouseEventArgs } from "../src/internal/data-grid/event-args.js";

function get2dContext(): CanvasRenderingContext2D {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (ctx === null) {
        throw new Error("Cannot get a 2d context");
    }
    return ctx;
}

function makeBounds(): Rectangle {
    return { x: 0, y: 0, width: 44, height: 32 };
}

function makeBaseMouseEventArgs(): BaseGridMouseEventArgs {
    return {
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
        isTouch: false,
        isLongTouch: false,
        isEdge: false,
        button: 0,
        buttons: 0,
        scrollEdge: [0, 0],
    };
}

describe("MarkerCell renderer", () => {
    const makeMarkerCell = (overrides?: Partial<MarkerCell>): MarkerCell => ({
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        row: 1,
        drawHandle: false,
        checked: false,
        checkboxStyle: "square",
        markerKind: "checkbox",
        ...overrides,
    });

    it("returns correct accessibility string (row number)", () => {
        const cell = makeMarkerCell({ row: 5 });
        const result = markerCellRenderer.getAccessibilityString(cell);
        expect(result).toBe("5");
    });

    it("measures correct size (44px)", () => {
        const cell = makeMarkerCell();
        const ctx = get2dContext();
        const size = markerCellRenderer.measure?.(ctx, cell, mergeAndRealizeTheme(getDefaultTheme()));
        expect(size).toBe(44);
    });

    it("onClick toggles checked state within hit area", () => {
        const cell = makeMarkerCell({ checked: false });
        const bounds = makeBounds();
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width / 2,
            posY: bounds.height / 2,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeDefined();
        expect((result as MarkerCell).checked).toBe(true);
    });

    it("onClick returns undefined outside hit area", () => {
        const cell = makeMarkerCell({ checked: false });
        const bounds = makeBounds();
        // Click far away from center
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width + 50,
            posY: bounds.height + 50,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });

    it("onClick returns undefined when disabled", () => {
        const cell = makeMarkerCell({ checked: false, disabled: true });
        const bounds = makeBounds();
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width / 2,
            posY: bounds.height / 2,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });
});

describe("MarkerCell renderer (markerKind: number)", () => {
    // rowNumber: true 일 때 DataEditor가 생성하는 셀 형태를 재현
    // data-editor.tsx:1502-1512 참고
    const makeNumberCell = (row: number, disabled?: boolean): MarkerCell => ({
        kind: InnerGridCellKind.Marker,
        allowOverlay: false,
        row,
        drawHandle: false,
        checked: false,
        checkboxStyle: "square",
        markerKind: "number",
        disabled,
    });

    it("returns row number as accessibility string", () => {
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(1))).toBe("1");
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(100))).toBe("100");
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(0))).toBe("0");
    });

    it("respects startIndex via row field", () => {
        // startIndex=0 → row=0 for first row
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(0))).toBe("0");
        // startIndex=1 (default) → row=1 for first row
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(1))).toBe("1");
        // startIndex=1, 10th row → row=11
        expect(markerCellRenderer.getAccessibilityString(makeNumberCell(11))).toBe("11");
    });

    it("measures same size as checkbox (44px)", () => {
        const cell = makeNumberCell(1);
        const ctx = get2dContext();
        const size = markerCellRenderer.measure?.(ctx, cell, mergeAndRealizeTheme(getDefaultTheme()));
        expect(size).toBe(44);
    });

    it("onClick within hit area still returns toggled cell", () => {
        // onClick 핸들러는 markerKind를 구분하지 않음 — 히트 영역 내 클릭은 항상 토글 반환
        const cell = makeNumberCell(1);
        const bounds = makeBounds();
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width / 2,
            posY: bounds.height / 2,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeDefined();
        expect((result as MarkerCell).checked).toBe(true);
        expect((result as MarkerCell).markerKind).toBe("number");
    });

    it("onClick returns undefined outside hit area", () => {
        const cell = makeNumberCell(1);
        const bounds = makeBounds();
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width + 50,
            posY: bounds.height + 50,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });

    it("onClick returns undefined when disabled", () => {
        const cell = makeNumberCell(1, true);
        const bounds = makeBounds();
        const result = markerCellRenderer.onClick?.({
            cell,
            posX: bounds.width / 2,
            posY: bounds.height / 2,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });
});

describe("RowStatusCell renderer", () => {
    const makeRowStatusCell = (status?: "A" | "U" | "D"): RowStatusCell => ({
        kind: InnerGridCellKind.RowStatus,
        allowOverlay: false,
        status,
    });

    it("returns correct accessibility string", () => {
        expect(rowStatusCellRenderer.getAccessibilityString(makeRowStatusCell("A"))).toBe("A");
        expect(rowStatusCellRenderer.getAccessibilityString(makeRowStatusCell("U"))).toBe("U");
        expect(rowStatusCellRenderer.getAccessibilityString(makeRowStatusCell("D"))).toBe("D");
        expect(rowStatusCellRenderer.getAccessibilityString(makeRowStatusCell(undefined))).toBe("");
    });

    it("measures correct size (40px)", () => {
        const cell = makeRowStatusCell("A");
        const ctx = get2dContext();
        const size = rowStatusCellRenderer.measure?.(ctx, cell, mergeAndRealizeTheme(getDefaultTheme()));
        expect(size).toBe(40);
    });

    it("onClick returns undefined (read-only)", () => {
        const cell = makeRowStatusCell("A");
        const bounds: Rectangle = { x: 0, y: 0, width: 40, height: 32 };
        const result = rowStatusCellRenderer.onClick?.({
            cell,
            posX: 20,
            posY: 16,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });
});

describe("RowIdCell renderer", () => {
    const makeRowIdCell = (rowId?: string): RowIdCell => ({
        kind: InnerGridCellKind.RowId,
        allowOverlay: false,
        rowId,
    });

    it("returns correct accessibility string", () => {
        expect(rowIdMarkerCellRenderer.getAccessibilityString(makeRowIdCell("ABC-123"))).toBe("ABC-123");
        expect(rowIdMarkerCellRenderer.getAccessibilityString(makeRowIdCell(undefined))).toBe("");
    });

    it("measures correct size (80px)", () => {
        const cell = makeRowIdCell("ABC-123");
        const ctx = get2dContext();
        const size = rowIdMarkerCellRenderer.measure?.(ctx, cell, mergeAndRealizeTheme(getDefaultTheme()));
        expect(size).toBe(80);
    });

    it("onClick returns undefined (read-only)", () => {
        const cell = makeRowIdCell("ABC-123");
        const bounds: Rectangle = { x: 0, y: 0, width: 80, height: 32 };
        const result = rowIdMarkerCellRenderer.onClick?.({
            cell,
            posX: 40,
            posY: 16,
            bounds,
            location: [0, 0],
            theme: mergeAndRealizeTheme(getDefaultTheme()),
            preventDefault: () => {},
            ...makeBaseMouseEventArgs(),
        });
        expect(result).toBeUndefined();
    });
});
