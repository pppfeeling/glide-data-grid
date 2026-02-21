import { c as _c } from "react/compiler-runtime";
import * as React from "react";
function useRefState() {
  const $ = _c(2);
  const [refState, setRefState] = React.useState();
  const t0 = refState !== null && refState !== void 0 ? refState : undefined;
  let t1;
  if ($[0] !== t0) {
    t1 = [t0, setRefState];
    $[0] = t0;
    $[1] = t1;
  } else {
    t1 = $[1];
  }
  return t1;
}
export function useStayOnScreen() {
  const $ = _c(12);
  const [ref, setRef] = useRefState();
  const [xOffset, setXOffset] = React.useState(0);
  const [isIntersecting, setIsIntersecting] = React.useState(true);
  let t0;
  let t1;
  if ($[0] !== ref) {
    t0 = () => {
      if (ref === undefined) {
        return;
      }
      if (!("IntersectionObserver" in window)) {
        return;
      }
      const observer = new IntersectionObserver(ents => {
        if (ents.length === 0) {
          return;
        }
        setIsIntersecting(ents[0].isIntersecting);
      }, {
        threshold: 1
      });
      observer.observe(ref);
      return () => observer.disconnect();
    };
    t1 = [ref];
    $[0] = ref;
    $[1] = t0;
    $[2] = t1;
  } else {
    t0 = $[1];
    t1 = $[2];
  }
  React.useLayoutEffect(t0, t1);
  let t2;
  let t3;
  if ($[3] !== isIntersecting || $[4] !== ref) {
    t2 = () => {
      if (isIntersecting || ref === undefined) {
        return;
      }
      let rafHandle;
      const fn = () => {
        const {
          right: refRight
        } = ref.getBoundingClientRect();
        setXOffset(cv => Math.min(cv + window.innerWidth - refRight - 10, 0));
        rafHandle = requestAnimationFrame(fn);
      };
      rafHandle = requestAnimationFrame(fn);
      return () => {
        if (rafHandle !== undefined) {
          cancelAnimationFrame(rafHandle);
        }
      };
    };
    t3 = [ref, isIntersecting];
    $[3] = isIntersecting;
    $[4] = ref;
    $[5] = t2;
    $[6] = t3;
  } else {
    t2 = $[5];
    t3 = $[6];
  }
  React.useEffect(t2, t3);
  const t4 = `translateX(${xOffset}px)`;
  let t5;
  if ($[7] !== t4) {
    t5 = {
      transform: t4
    };
    $[7] = t4;
    $[8] = t5;
  } else {
    t5 = $[8];
  }
  const style = t5;
  let t6;
  if ($[9] !== setRef || $[10] !== style) {
    t6 = {
      ref: setRef,
      style
    };
    $[9] = setRef;
    $[10] = style;
    $[11] = t6;
  } else {
    t6 = $[11];
  }
  return t6;
}
//# sourceMappingURL=use-stay-on-screen.js.map