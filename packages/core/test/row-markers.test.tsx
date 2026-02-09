/* eslint-disable sonarjs/no-duplicate-string */
import * as React from "react";
import { render } from "@testing-library/react";
import { DataEditor } from "../src/index.js";
import type { RowMarkerOptions } from "../src/data-editor/data-editor.js";
import { vi, expect, describe, test, beforeEach, afterEach } from "vitest";
import {
    EventedDataEditor,
    basicProps,
    prep,
    sendClick,
    Context,
    standardBeforeEach,
    standardAfterEach,
} from "./test-utils.js";

describe("Row Markers", () => {
    vi.mock("../src/common/resize-detector", () => {
        return {
            useResizeDetector: () => ({ ref: undefined, width: 1000, height: 1000 }),
        };
    });

    beforeEach(() => {
        standardBeforeEach();
    });

    afterEach(() => {
        standardAfterEach();
    });

    describe("RowMarkerOptions object API", () => {
        test("rowMarkers with object API renders correctly", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox" }}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // Click on the checkbox marker area (left side)
            sendClick(scroller, { clientX: 10, clientY: 36 + 16 });

            // Should trigger selection change with the row selected
            expect(spy).toHaveBeenCalled();
        });

        test("rowMarkers kind checkbox with rowNumber shows two marker columns", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", rowNumber: true }}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // The rowMarkerOffset should be 2 (rowNumber + checkbox), so clicking at
            // a position that would normally hit col 0 should hit a marker column instead.
            // Click on the checkbox column (second marker column)
            sendClick(scroller, { clientX: 40, clientY: 36 + 16 });

            expect(spy).toHaveBeenCalled();
        });

        test("backward compat: 'both' kind normalizes to checkbox + rowNumber", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "both" } as RowMarkerOptions}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // 'both' normalizes to checkbox + rowNumber = 2 marker columns
            // Click on the checkbox area
            sendClick(scroller, { clientX: 40, clientY: 36 + 16 });

            expect(spy).toHaveBeenCalled();
        });

        test("rowMarkers with custom width", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", width: 60 }}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // Click within the custom width marker area
            sendClick(scroller, { clientX: 30, clientY: 36 + 16 });

            expect(spy).toHaveBeenCalled();
        });
    });

    describe("Row Status", () => {
        test("rowStatus column calls onRowStatus callback", async () => {
            const onRowStatus = vi.fn((_row: number) => "A" as const);

            vi.useFakeTimers();
            render(
                <DataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", rowStatus: true }}
                    onRowStatus={onRowStatus}
                />,
                {
                    wrapper: Context,
                }
            );
            prep();

            // onRowStatus should have been called during rendering
            expect(onRowStatus).toHaveBeenCalled();
        });

        test("rowStatus column renders without callback (no crash)", async () => {
            vi.useFakeTimers();
            // Should not crash when rowStatus is true but onRowStatus is not provided
            expect(() => {
                render(
                    <DataEditor
                        {...basicProps}
                        rowMarkers={{ kind: "checkbox", rowStatus: true }}
                    />,
                    {
                        wrapper: Context,
                    }
                );
                prep();
            }).not.toThrow();
        });

        test("rowMarkers with rowStatus increases rowMarkerOffset", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", rowStatus: true }}
                    onRowStatus={() => "U"}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // With checkbox (1) + rowStatus (1) = rowMarkerOffset 2
            // Click far enough right to hit a data column
            sendClick(scroller, { clientX: 200, clientY: 36 + 16 });

            // Should select a data cell, not a marker
            expect(spy).toHaveBeenCalled();
            const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
            const selection = lastCall[0];
            // current cell should exist and have a non-negative column
            if (selection.current !== undefined) {
                expect(selection.current.cell[0]).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe("Row ID", () => {
        test("rowId column calls onRowId callback", async () => {
            const onRowId = vi.fn((_row: number) => `ID-${_row}`);

            vi.useFakeTimers();
            render(
                <DataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", rowId: true }}
                    onRowId={onRowId}
                />,
                {
                    wrapper: Context,
                }
            );
            prep();

            // onRowId should have been called during rendering
            expect(onRowId).toHaveBeenCalled();
        });

        test("rowId column renders without callback (no crash)", async () => {
            vi.useFakeTimers();
            // Should not crash when rowId is true but onRowId is not provided
            expect(() => {
                render(
                    <DataEditor
                        {...basicProps}
                        rowMarkers={{ kind: "checkbox", rowId: true }}
                    />,
                    {
                        wrapper: Context,
                    }
                );
                prep();
            }).not.toThrow();
        });

        test("rowMarkers with rowId increases rowMarkerOffset", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers={{ kind: "checkbox", rowId: true }}
                    onRowId={row => `ID-${row}`}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // With checkbox (1) + rowId (1) = rowMarkerOffset 2
            // Click far enough right to hit a data column
            sendClick(scroller, { clientX: 200, clientY: 36 + 16 });

            expect(spy).toHaveBeenCalled();
            const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
            const selection = lastCall[0];
            if (selection.current !== undefined) {
                expect(selection.current.cell[0]).toBeGreaterThanOrEqual(0);
            }
        });
    });

    describe("Disabled Rows", () => {
        test("disabledRows prevents row selection on click", async () => {
            const spy = vi.fn();

            vi.useFakeTimers();
            render(
                <EventedDataEditor
                    {...basicProps}
                    rowMarkers="checkbox"
                    disabledRows={row => row === 0}
                    onGridSelectionChange={spy}
                />,
                {
                    wrapper: Context,
                }
            );
            const scroller = prep();

            expect(scroller).not.toBeNull();
            if (scroller === null) return;

            // Click on disabled row 0's marker
            sendClick(scroller, { clientX: 10, clientY: 36 + 16 });

            // Even if spy is called, the disabled row should not be selected
            if (spy.mock.calls.length > 0) {
                const lastCall = spy.mock.calls[spy.mock.calls.length - 1];
                const selection = lastCall[0];
                // Row 0 should NOT be in the selection
                expect(selection.rows.hasIndex(0)).toBe(false);
            }
        });

        test("disabledRows callback is called with correct row index", async () => {
            const disabledRows = vi.fn((_row: number) => false);

            vi.useFakeTimers();
            render(
                <DataEditor
                    {...basicProps}
                    rowMarkers="checkbox"
                    disabledRows={disabledRows}
                />,
                {
                    wrapper: Context,
                }
            );
            prep();

            // disabledRows should have been called during rendering
            expect(disabledRows).toHaveBeenCalled();
            // Should be called with numeric row indices
            for (const call of disabledRows.mock.calls) {
                expect(typeof call[0]).toBe("number");
            }
        });
    });

    describe("Combined markers", () => {
        test("all marker types enabled together renders correctly", async () => {
            const onRowStatus = vi.fn(() => "A" as const);
            const onRowId = vi.fn((row: number) => `ID-${row}`);
            const spy = vi.fn();

            vi.useFakeTimers();
            expect(() => {
                render(
                    <EventedDataEditor
                        {...basicProps}
                        rowMarkers={{
                            kind: "checkbox",
                            rowNumber: true,
                            rowStatus: true,
                            rowStatusWidth: 40,
                            rowId: true,
                            rowIdWidth: 80,
                        }}
                        onRowStatus={onRowStatus}
                        onRowId={onRowId}
                        onGridSelectionChange={spy}
                    />,
                    {
                        wrapper: Context,
                    }
                );
                prep();
            }).not.toThrow();

            // All callbacks should have been invoked during rendering
            expect(onRowStatus).toHaveBeenCalled();
            expect(onRowId).toHaveBeenCalled();
        });
    });
});
