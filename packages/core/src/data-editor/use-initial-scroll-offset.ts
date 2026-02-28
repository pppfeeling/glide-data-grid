import * as React from "react";
import type { VisibleRegion } from "./visible-region.js";
import type { DataEditorCoreProps } from "../index.js";
import { useStateWithReactiveInput } from "../common/utils.js";

// shamelessly stolen and modified from: https://github.com/theKashey/use-callback-ref
// MIT License https://github.com/theKashey/use-callback-ref/tree/master?tab=MIT-1-ov-file#readme
function useCallbackRef<T>(
    initialValue: T | null,
    callback: (newValue: T | null, lastValue: T | null) => void
): React.MutableRefObject<T | null> {
    const [ref] = React.useState(() => ({
        value: initialValue,
        callback,
        facade: {
            get current() {
                return ref.value;
            },
            set current(value) {
                const last = ref.value;

                if (last !== value) {
                    ref.value = value;
                    ref.callback(value, last);
                }
            },
        },
    }));
    ref.callback = callback;

    return ref.facade;
}

export function useInitialScrollOffset(
    scrollOffsetX: number | undefined,
    scrollOffsetY: number | undefined,
    rowHeight: NonNullable<DataEditorCoreProps["rowHeight"]>,
    visibleRegionRef: React.MutableRefObject<VisibleRegion>,
    onDidScroll: () => void
) {
    const [visibleRegionY, visibleRegionTy] = [
        scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0,
        scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0,
    ];

    const visibleRegionInput: VisibleRegion = {
        x: visibleRegionRef.current.x,
        y: visibleRegionY,
        width: visibleRegionRef.current.width ?? 1,
        height: visibleRegionRef.current.height ?? 1,
        // tx: 'TODO',
        ty: visibleRegionTy,
    };

    const [visibleRegion, setVisibleRegion, empty] = useStateWithReactiveInput<VisibleRegion>(visibleRegionInput);

    const onDidScrollRef = React.useRef(onDidScroll);
    onDidScrollRef.current = onDidScroll;

    const scrollElRef = React.useRef<HTMLDivElement | null>(null);

    const scrollRef = useCallbackRef<HTMLDivElement | null>(null, newVal => {
        scrollElRef.current = newVal;
        if (newVal !== null && scrollOffsetY !== undefined) {
            newVal.scrollTop = scrollOffsetY;
        } else if (newVal !== null && scrollOffsetX !== undefined) {
            newVal.scrollLeft = scrollOffsetX;
        }
    });

    const vScrollReady = (visibleRegion.height ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetY !== undefined && vScrollReady) {
            const el = scrollElRef.current;
            if (el === null) return;
            if (el.scrollTop === scrollOffsetY) return;
            el.scrollTop = scrollOffsetY;
            if (el.scrollTop !== scrollOffsetY) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetY, vScrollReady, empty]);

    const hScrollReady = (visibleRegion.width ?? 1) > 1;
    React.useLayoutEffect(() => {
        if (scrollOffsetX !== undefined && hScrollReady) {
            const el = scrollElRef.current;
            if (el === null) return;
            if (el.scrollLeft === scrollOffsetX) return;
            el.scrollLeft = scrollOffsetX;
            if (el.scrollLeft !== scrollOffsetX) {
                empty();
            }
            onDidScrollRef.current();
        }
    }, [scrollOffsetX, hScrollReady, empty]);

    return {
        visibleRegion,
        setVisibleRegion,
        scrollRef,
    };
}
