class Lazy {
  constructor(fn) {
    this.fn = void 0;
    this.val = void 0;
    this.fn = fn;
  }
  get value() {
    var _this$val;
    return (_this$val = this.val) !== null && _this$val !== void 0 ? _this$val : this.val = this.fn();
  }
}
function lazy(fn) {
  return new Lazy(fn);
}
export const browserIsFirefox = lazy(() => window.navigator.userAgent.includes("Firefox"));
export const browserIsSafari = lazy(() => window.navigator.userAgent.includes("Mac OS") && window.navigator.userAgent.includes("Safari") && !window.navigator.userAgent.includes("Chrome"));
export const browserIsOSX = lazy(() => window.navigator.platform.toLowerCase().startsWith("mac"));
//# sourceMappingURL=browser-detect.js.map