import { browserIsOSX } from "./browser-detect.js";
function checkKey(key, args) {
  if (key === undefined) return false;
  if (key.length > 1 && key.startsWith("_")) {
    const keycode = Number.parseInt(key.slice(1));
    return keycode === args.keyCode;
  }
  if (key.length === 1 && key >= "a" && key <= "z") {
    return key.toUpperCase().codePointAt(0) === args.keyCode;
  }
  return key === args.key;
}
export function isHotkey(hotkey, args, details) {
  const result = isHotkeyInner(hotkey, args);
  if (result) details.didMatch = true;
  return result;
}
function isHotkeyInner(hotkey, args) {
  if (hotkey.length === 0) return false;
  if (hotkey.includes("|")) {
    const parts = hotkey.split("|");
    for (const part of parts) {
      if (isHotkeyInner(part, args)) return true;
    }
    return false;
  }
  let wantCtrl = false;
  let wantShift = false;
  let wantAlt = false;
  let wantMeta = false;
  const split = hotkey.split("+");
  const key = split.pop();
  if (!checkKey(key, args)) return false;
  if (split[0] === "any") return true;
  for (const accel of split) {
    switch (accel) {
      case "ctrl":
        wantCtrl = true;
        break;
      case "shift":
        wantShift = true;
        break;
      case "alt":
        wantAlt = true;
        break;
      case "meta":
        wantMeta = true;
        break;
      case "primary":
        if (browserIsOSX.value) {
          wantMeta = true;
        } else {
          wantCtrl = true;
        }
        break;
    }
  }
  return args.altKey === wantAlt && args.ctrlKey === wantCtrl && args.shiftKey === wantShift && args.metaKey === wantMeta;
}
//# sourceMappingURL=is-hotkey.js.map