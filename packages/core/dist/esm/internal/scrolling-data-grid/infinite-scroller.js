import { c as _c } from "react/compiler-runtime";
import { styled } from "@linaria/react";
import * as React from "react";
import { useResizeDetector } from "../../common/resize-detector.js";
import { browserIsSafari } from "../../common/browser-detect.js";
import { useEventListener } from "../../common/utils.js";
import useKineticScroll from "./use-kinetic-scroll.js";
const _exp = /*#__PURE__*/() => p => p.isSafari ? "scroll" : "auto";
const ScrollRegionStyle = /*#__PURE__*/styled('div')({
  name: "ScrollRegionStyle",
  class: "gdg-s1dgczr6",
  propsAsIs: false,
  vars: {
    "s1dgczr6-0": [_exp()]
  }
});
const BROWSER_MAX_DIV_HEIGHT = 33554400;
const MAX_PADDER_SEGMENT_HEIGHT = 5000000;
function useTouchUpDelayed(delay) {
  const $ = _c(3);
  const [hasTouches, setHasTouches] = React.useState(false);
  const safeWindow = typeof window === "undefined" ? null : window;
  const cbTimer = React.useRef(0);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      window.clearTimeout(cbTimer.current);
      setHasTouches(true);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  useEventListener("touchstart", t0, safeWindow, true, false);
  let t1;
  if ($[1] !== delay) {
    t1 = e => {
      if (e.touches.length === 0) {
        cbTimer.current = window.setTimeout(() => setHasTouches(false), delay);
      }
    };
    $[1] = delay;
    $[2] = t1;
  } else {
    t1 = $[2];
  }
  useEventListener("touchend", t1, safeWindow, true, false);
  return hasTouches;
}
export const InfiniteScroller = p => {
  var _rightElementProps$st, _rightElementProps$fi, _lastProps$current, _lastProps$current2;
  const {
    children,
    clientHeight,
    scrollHeight,
    scrollWidth,
    update,
    draggable,
    className,
    preventDiagonalScrolling = false,
    paddingBottom = 0,
    paddingRight = 0,
    rightElement,
    rightElementProps,
    kineticScrollPerfHack = false,
    scrollRef,
    initialSize
  } = p;
  const padders = [];
  const rightElementSticky = (_rightElementProps$st = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.sticky) !== null && _rightElementProps$st !== void 0 ? _rightElementProps$st : false;
  const rightElementFill = (_rightElementProps$fi = rightElementProps === null || rightElementProps === void 0 ? void 0 : rightElementProps.fill) !== null && _rightElementProps$fi !== void 0 ? _rightElementProps$fi : false;
  const virtualScrollY = React.useRef(0);
  const lastScrollY = React.useRef(0);
  const scroller = React.useRef(null);
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio;
  const lastDpr = React.useRef(dpr);
  React.useEffect(() => {
    if (lastDpr.current !== dpr) {
      virtualScrollY.current = 0;
      lastScrollY.current = 0;
      lastDpr.current = dpr;
      const el = scroller.current;
      if (el !== null) {
        onScrollRef.current(el.scrollLeft, el.scrollTop);
      }
    }
  }, [dpr]);
  const lastScrollPosition = React.useRef({
    scrollLeft: 0,
    scrollTop: 0,
    lockDirection: undefined
  });
  const rightWrapRef = React.useRef(null);
  const hasTouches = useTouchUpDelayed(200);
  const [isIdle, setIsIdle] = React.useState(true);
  const idleTimer = React.useRef(0);
  React.useLayoutEffect(() => {
    if (!isIdle || hasTouches || lastScrollPosition.current.lockDirection === undefined) return;
    const el_0 = scroller.current;
    if (el_0 === null) return;
    const [lx, ly] = lastScrollPosition.current.lockDirection;
    if (lx !== undefined) {
      el_0.scrollLeft = lx;
    } else if (ly !== undefined) {
      el_0.scrollTop = ly;
    }
    lastScrollPosition.current.lockDirection = undefined;
  }, [hasTouches, isIdle]);
  const onScroll = React.useCallback((scrollLeft, scrollTop) => {
    var _lock$, _lock$2, _rightWrapRef$current, _rightWrapRef$current2;
    const el_1 = scroller.current;
    if (el_1 === null) return;
    scrollTop = scrollTop !== null && scrollTop !== void 0 ? scrollTop : el_1.scrollTop;
    scrollLeft = scrollLeft !== null && scrollLeft !== void 0 ? scrollLeft : el_1.scrollLeft;
    const lastScrollTop = lastScrollPosition.current.scrollTop;
    const lastScrollLeft = lastScrollPosition.current.scrollLeft;
    const dx = scrollLeft - lastScrollLeft;
    const dy = scrollTop - lastScrollTop;
    if (hasTouches && dx !== 0 && dy !== 0 && (Math.abs(dx) > 3 || Math.abs(dy) > 3) && preventDiagonalScrolling && lastScrollPosition.current.lockDirection === undefined) {
      lastScrollPosition.current.lockDirection = Math.abs(dx) < Math.abs(dy) ? [lastScrollLeft, undefined] : [undefined, lastScrollTop];
    }
    const lock = lastScrollPosition.current.lockDirection;
    scrollLeft = (_lock$ = lock === null || lock === void 0 ? void 0 : lock[0]) !== null && _lock$ !== void 0 ? _lock$ : scrollLeft;
    scrollTop = (_lock$2 = lock === null || lock === void 0 ? void 0 : lock[1]) !== null && _lock$2 !== void 0 ? _lock$2 : scrollTop;
    lastScrollPosition.current.scrollLeft = scrollLeft;
    lastScrollPosition.current.scrollTop = scrollTop;
    const cWidth = el_1.clientWidth;
    const cHeight = el_1.clientHeight;
    const newY = scrollTop;
    const delta = lastScrollY.current - newY;
    const scrollableHeight = el_1.scrollHeight - cHeight;
    lastScrollY.current = newY;
    let virtualY;
    if (scrollableHeight > 0 && scrollHeight > el_1.scrollHeight + 5) {
      if (Math.abs(delta) > 2000 || newY === 0 || newY === scrollableHeight) {
        const scrollProgress = Math.max(0, Math.min(1, newY / scrollableHeight));
        const virtualScrollableHeight = scrollHeight - cHeight;
        virtualY = scrollProgress * virtualScrollableHeight;
        virtualScrollY.current = virtualY;
      } else {
        virtualScrollY.current -= delta;
        virtualY = virtualScrollY.current;
      }
    } else {
      virtualY = newY;
      virtualScrollY.current = virtualY;
    }
    virtualY = Math.max(0, Math.min(virtualY, scrollHeight - cHeight));
    virtualScrollY.current = virtualY;
    if (lock !== undefined) {
      window.clearTimeout(idleTimer.current);
      setIsIdle(false);
      idleTimer.current = window.setTimeout(() => setIsIdle(true), 200);
    }
    update({
      x: scrollLeft,
      y: virtualY,
      width: cWidth - paddingRight,
      height: cHeight - paddingBottom,
      paddingRight: (_rightWrapRef$current = (_rightWrapRef$current2 = rightWrapRef.current) === null || _rightWrapRef$current2 === void 0 ? void 0 : _rightWrapRef$current2.clientWidth) !== null && _rightWrapRef$current !== void 0 ? _rightWrapRef$current : 0
    });
  }, [paddingBottom, paddingRight, scrollHeight, update, preventDiagonalScrolling, hasTouches]);
  useKineticScroll(kineticScrollPerfHack && browserIsSafari.value, onScroll, scroller);
  const onScrollRef = React.useRef(onScroll);
  onScrollRef.current = onScroll;
  const lastProps = React.useRef();
  const didFirstScroll = React.useRef(false);
  React.useLayoutEffect(() => {
    if (didFirstScroll.current) onScroll();else didFirstScroll.current = true;
  }, [onScroll, paddingBottom, paddingRight]);
  const setRefs = React.useCallback(instance => {
    scroller.current = instance;
    if (scrollRef !== undefined) {
      scrollRef.current = instance;
    }
  }, [scrollRef]);
  let key = 0;
  let h = 0;
  const effectiveScrollHeight = Math.min(scrollHeight, BROWSER_MAX_DIV_HEIGHT);
  padders.push(React.createElement("div", {
    key: key++,
    style: {
      width: scrollWidth,
      height: 0
    }
  }));
  while (h < effectiveScrollHeight) {
    const toAdd = Math.min(MAX_PADDER_SEGMENT_HEIGHT, effectiveScrollHeight - h);
    padders.push(React.createElement("div", {
      key: key++,
      style: {
        width: 0,
        height: toAdd
      }
    }));
    h += toAdd;
  }
  const {
    ref,
    width,
    height
  } = useResizeDetector(initialSize);
  if (typeof window !== "undefined" && (((_lastProps$current = lastProps.current) === null || _lastProps$current === void 0 ? void 0 : _lastProps$current.height) !== height || ((_lastProps$current2 = lastProps.current) === null || _lastProps$current2 === void 0 ? void 0 : _lastProps$current2.width) !== width)) {
    window.setTimeout(() => onScrollRef.current(), 0);
    lastProps.current = {
      width,
      height
    };
  }
  if ((width !== null && width !== void 0 ? width : 0) === 0 || (height !== null && height !== void 0 ? height : 0) === 0) return React.createElement("div", {
    ref: ref
  });
  return React.createElement("div", {
    ref: ref
  }, React.createElement(ScrollRegionStyle, {
    isSafari: browserIsSafari.value
  }, React.createElement("div", {
    className: "dvn-underlay"
  }, children), React.createElement("div", {
    ref: setRefs,
    style: lastProps.current,
    draggable: draggable,
    onDragStart: e => {
      if (!draggable) {
        e.stopPropagation();
        e.preventDefault();
      }
    },
    className: "dvn-scroller " + (className !== null && className !== void 0 ? className : ""),
    onScroll: () => onScroll()
  }, React.createElement("div", {
    className: "dvn-scroll-inner" + (rightElement === undefined ? " dvn-hidden" : "")
  }, React.createElement("div", {
    className: "dvn-stack"
  }, padders), rightElement !== undefined && React.createElement(React.Fragment, null, !rightElementFill && React.createElement("div", {
    className: "dvn-spacer"
  }), React.createElement("div", {
    ref: rightWrapRef,
    style: {
      height,
      maxHeight: clientHeight - Math.ceil(dpr % 1),
      position: "sticky",
      top: 0,
      paddingLeft: 1,
      marginBottom: -40,
      marginRight: paddingRight,
      flexGrow: rightElementFill ? 1 : undefined,
      right: rightElementSticky ? paddingRight !== null && paddingRight !== void 0 ? paddingRight : 0 : undefined,
      pointerEvents: "auto"
    }
  }, rightElement))))));
};

