const cache = {};
let div = null;
function createDiv() {
  const d = document.createElement("div");
  d.style.opacity = "0";
  d.style.pointerEvents = "none";
  d.style.position = "fixed";
  document.body.append(d);
  return d;
}
export function parseToRgba(color) {
  const normalizedColor = color.toLowerCase().trim();
  if (cache[normalizedColor] !== undefined) return cache[normalizedColor];
  div = div || createDiv();
  div.style.color = "#000";
  div.style.color = normalizedColor;
  const control = getComputedStyle(div).color;
  div.style.color = "#fff";
  div.style.color = normalizedColor;
  const computedColor = getComputedStyle(div).color;
  if (computedColor !== control) return [0, 0, 0, 1];
  let result = computedColor.replace(/[^\d.,]/g, "").split(",").map(Number.parseFloat);
  if (result.length < 4) {
    result.push(1);
  }
  result = result.map(x => {
    const isNaN = Number.isNaN(x);
    if (process.env.NODE_ENV !== "production" && isNaN) {
      console.warn("Could not parse color", color);
    }
    return isNaN ? 0 : x;
  });
  cache[normalizedColor] = result;
  return result;
}
export function withAlpha(color, alpha) {
  const [r, g, b] = parseToRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const blendResultCache = new Map();
export function blendCache(color, background) {
  const cacheKey = `${color}-${background}`;
  const maybe = blendResultCache.get(cacheKey);
  if (maybe !== undefined) return maybe;
  const result = blend(color, background);
  blendResultCache.set(cacheKey, result);
  return result;
}
export function blend(color, background) {
  if (background === undefined) return color;
  const [r, g, b, a] = parseToRgba(color);
  if (a === 1) return color;
  const [br, bg, bb, ba] = parseToRgba(background);
  const ao = a + ba * (1 - a);
  const ro = (a * r + ba * br * (1 - a)) / ao;
  const go = (a * g + ba * bg * (1 - a)) / ao;
  const bo = (a * b + ba * bb * (1 - a)) / ao;
  return `rgba(${ro}, ${go}, ${bo}, ${ao})`;
}
export function interpolateColors(leftColor, rightColor, val) {
  if (val <= 0) return leftColor;
  if (val >= 1) return rightColor;
  const [lr, lg, lb, la] = parseToRgba(leftColor);
  const [rr, rg, rb, ra] = parseToRgba(rightColor);
  const leftR = lr * la;
  const leftG = lg * la;
  const leftB = lb * la;
  const rightR = rr * ra;
  const rightG = rg * ra;
  const rightB = rb * ra;
  const hScaler = val;
  const nScaler = 1 - val;
  const a = la * nScaler + ra * hScaler;
  if (a === 0) return "rgba(0, 0, 0, 0)";
  const r = Math.floor((leftR * nScaler + rightR * hScaler) / a);
  const g = Math.floor((leftG * nScaler + rightG * hScaler) / a);
  const b = Math.floor((leftB * nScaler + rightB * hScaler) / a);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
export function getLuminance(color) {
  if (color === "transparent") return 0;
  function f(x) {
    const channel = x / 255;
    return channel <= 0.04045 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4);
  }
  const [r, g, b] = parseToRgba(color);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}
//# sourceMappingURL=color-parser.js.map