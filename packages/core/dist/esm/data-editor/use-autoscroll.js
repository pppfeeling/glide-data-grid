import { c as _c } from "react/compiler-runtime";
import React from "react";
const maxPxPerMs = 2;
const msToFullSpeed = 1300;
export function useAutoscroll(scrollDirection, scrollRef, onScroll) {
  const $ = _c(8);
  const speedScalar = React.useRef(0);
  let t0;
  if ($[0] !== scrollDirection) {
    t0 = scrollDirection !== null && scrollDirection !== void 0 ? scrollDirection : [0, 0];
    $[0] = scrollDirection;
    $[1] = t0;
  } else {
    t0 = $[1];
  }
  const [xDir, yDir] = t0;
  let t1;
  let t2;
  if ($[2] !== onScroll || $[3] !== scrollRef || $[4] !== xDir || $[5] !== yDir) {
    t1 = () => {
      if (xDir === 0 && yDir === 0) {
        speedScalar.current = 0;
        return;
      }
      let cancelled = false;
      let lastTime = 0;
      const scrollFn = curTime => {
        if (cancelled) {
          return;
        }
        if (lastTime === 0) {
          lastTime = curTime;
        } else {
          var _scrollRef$current;
          const step = curTime - lastTime;
          speedScalar.current = Math.min(1, speedScalar.current + step / msToFullSpeed);
          const motion = speedScalar.current ** 1.618 * step * maxPxPerMs;
          (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 || _scrollRef$current.scrollBy(xDir * motion, yDir * motion);
          lastTime = curTime;
          onScroll === null || onScroll === void 0 || onScroll();
        }
        window.requestAnimationFrame(scrollFn);
      };
      window.requestAnimationFrame(scrollFn);
      return () => {
        cancelled = true;
      };
    };
    t2 = [scrollRef, xDir, yDir, onScroll];
    $[2] = onScroll;
    $[3] = scrollRef;
    $[4] = xDir;
    $[5] = yDir;
    $[6] = t1;
    $[7] = t2;
  } else {
    t1 = $[6];
    t2 = $[7];
  }
  React.useEffect(t1, t2);
}
//# sourceMappingURL=use-autoscroll.js.map