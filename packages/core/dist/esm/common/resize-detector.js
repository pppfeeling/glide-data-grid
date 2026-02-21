import { useLayoutEffect, useState, useRef } from "react";
export function useResizeDetector(initialSize) {
  const ref = useRef(null);
  const [size, setSize] = useState({
    width: initialSize === null || initialSize === void 0 ? void 0 : initialSize[0],
    height: initialSize === null || initialSize === void 0 ? void 0 : initialSize[1]
  });
  useLayoutEffect(() => {
    const resizeCallback = entries => {
      for (const entry of entries) {
        const {
          width,
          height
        } = entry && entry.contentRect || {};
        setSize(cv => cv.width === width && cv.height === height ? cv : {
          width,
          height
        });
      }
    };
    const resizeObserver = new window.ResizeObserver(resizeCallback);
    if (ref.current) {
      resizeObserver.observe(ref.current, undefined);
    }
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref.current]);
  return {
    ref,
    ...size
  };
}
//# sourceMappingURL=resize-detector.js.map