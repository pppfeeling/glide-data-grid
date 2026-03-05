import * as React from "react";
import type { Rectangle } from "../internal/data-grid/data-grid-types.js";
import type { VisibleRegion } from "./visible-region.js";
import type { OverlayState } from "./data-editor-state.js";

interface UseVisibleRegionArgs {
    readonly currentCell: readonly [number, number] | undefined;
    readonly overlay: OverlayState | undefined;
    readonly rowMarkerOffset: number;
    readonly showTrailingBlankRow: boolean;
    readonly rows: number;
    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly visibleRegionRef: React.MutableRefObject<VisibleRegion>;
    readonly hasJustScrolled: React.MutableRefObject<boolean>;

    readonly setOverlay: (overlay: OverlayState | undefined) => void;
    readonly setVisibleRegion: (region: VisibleRegion) => void;
    readonly setClientSize: (size: readonly [number, number, number]) => void;
    readonly onVisibleRegionChanged: ((region: any, tx: number, ty: number, extras: any) => void) | undefined;
}

export function useVisibleRegionCallback(args: UseVisibleRegionArgs) {
    const {
        currentCell,
        overlay,
        rowMarkerOffset,
        showTrailingBlankRow,
        rows,
        freezeColumns,
        freezeTrailingRows,
        visibleRegionRef,
        hasJustScrolled,
        setOverlay,
        setVisibleRegion,
        setClientSize,
        onVisibleRegionChanged,
    } = args;

    return React.useCallback(
        (
            region: Rectangle,
            clientWidth: number,
            clientHeight: number,
            rightElWidth: number,
            tx: number,
            ty: number
        ) => {
            hasJustScrolled.current = false;

            // Close overlay editor when scrolling
            if (overlay !== undefined) {
                const prevRegion = visibleRegionRef.current;
                const hasScrolled = prevRegion.x !== region.x || prevRegion.y !== region.y;
                if (hasScrolled) {
                    setOverlay(undefined);
                }
            }

            let selected = currentCell;
            if (selected !== undefined) {
                selected = [selected[0] - rowMarkerOffset, selected[1]];
            }

            const freezeRegion =
                freezeColumns === 0
                    ? undefined
                    : {
                        x: 0,
                        y: region.y,
                        width: freezeColumns,
                        height: region.height,
                    };

            const freezeRegions: Rectangle[] = [];
            if (freezeRegion !== undefined) freezeRegions.push(freezeRegion);
            if (freezeTrailingRows > 0) {
                freezeRegions.push({
                    x: region.x - rowMarkerOffset,
                    y: rows - freezeTrailingRows,
                    width: region.width,
                    height: freezeTrailingRows,
                });

                if (freezeColumns > 0) {
                    freezeRegions.push({
                        x: 0,
                        y: rows - freezeTrailingRows,
                        width: freezeColumns,
                        height: freezeTrailingRows,
                    });
                }
            }

            const newRegion = {
                x: region.x - rowMarkerOffset,
                y: region.y,
                width: region.width,
                height: showTrailingBlankRow && region.y + region.height >= rows ? region.height - 1 : region.height,
                tx,
                ty,
                extras: {
                    selected,
                    freezeRegion,
                    freezeRegions,
                },
            };
            visibleRegionRef.current = newRegion;
            setVisibleRegion(newRegion);
            setClientSize([clientWidth, clientHeight, rightElWidth]);
            onVisibleRegionChanged?.(newRegion, newRegion.tx, newRegion.ty, newRegion.extras);
        },
        [
            currentCell,
            overlay,
            rowMarkerOffset,
            showTrailingBlankRow,
            rows,
            freezeColumns,
            freezeTrailingRows,
            setOverlay,
            setVisibleRegion,
            onVisibleRegionChanged,
        ]
    );
}
