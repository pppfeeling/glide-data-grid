import * as React from "react";
import { useStateWithReactiveInput } from "../common/utils.js";
function useCallbackRef(initialValue, callback) {
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
      }
    }
  }));
  ref.callback = callback;
  return ref.facade;
}
export function useInitialScrollOffset(scrollOffsetX, scrollOffsetY, rowHeight, visibleRegionRef, onDidScroll) {
  var _visibleRegionRef$cur, _visibleRegionRef$cur2, _visibleRegion$height, _visibleRegion$width;
  const [visibleRegionY, visibleRegionTy] = [scrollOffsetY !== undefined && typeof rowHeight === "number" ? Math.floor(scrollOffsetY / rowHeight) : 0, scrollOffsetY !== undefined && typeof rowHeight === "number" ? -(scrollOffsetY % rowHeight) : 0];
  const visibleRegionInput = {
    x: visibleRegionRef.current.x,
    y: visibleRegionY,
    width: (_visibleRegionRef$cur = visibleRegionRef.current.width) !== null && _visibleRegionRef$cur !== void 0 ? _visibleRegionRef$cur : 1,
    height: (_visibleRegionRef$cur2 = visibleRegionRef.current.height) !== null && _visibleRegionRef$cur2 !== void 0 ? _visibleRegionRef$cur2 : 1,
    ty: visibleRegionTy
  };
  const [visibleRegion, setVisibleRegion, empty] = useStateWithReactiveInput(visibleRegionInput);
  const onDidScrollRef = React.useRef(onDidScroll);
  onDidScrollRef.current = onDidScroll;
  const scrollRef = useCallbackRef(null, newVal => {
    if (newVal !== null && scrollOffsetY !== undefined) {
      newVal.scrollTop = scrollOffsetY;
    } else if (newVal !== null && scrollOffsetX !== undefined) {
      newVal.scrollLeft = scrollOffsetX;
    }
  });
  const vScrollReady = ((_visibleRegion$height = visibleRegion.height) !== null && _visibleRegion$height !== void 0 ? _visibleRegion$height : 1) > 1;
  React.useLayoutEffect(() => {
    if (scrollOffsetY !== undefined && scrollRef.current !== null && vScrollReady) {
      if (scrollRef.current.scrollTop === scrollOffsetY) return;
      scrollRef.current.scrollTop = scrollOffsetY;
      if (scrollRef.current.scrollTop !== scrollOffsetY) {
        empty();
      }
      onDidScrollRef.current();
    }
  }, [scrollOffsetY, vScrollReady, empty, scrollRef]);
  const hScrollReady = ((_visibleRegion$width = visibleRegion.width) !== null && _visibleRegion$width !== void 0 ? _visibleRegion$width : 1) > 1;
  React.useLayoutEffect(() => {
    if (scrollOffsetX !== undefined && scrollRef.current !== null && hScrollReady) {
      if (scrollRef.current.scrollLeft === scrollOffsetX) return;
      scrollRef.current.scrollLeft = scrollOffsetX;
      if (scrollRef.current.scrollLeft !== scrollOffsetX) {
        empty();
      }
      onDidScrollRef.current();
    }
  }, [scrollOffsetX, hScrollReady, empty, scrollRef]);
  return {
    visibleRegion,
    setVisibleRegion,
    scrollRef
  };
}
//# sourceMappingURL=use-initial-scroll-offset.js.map