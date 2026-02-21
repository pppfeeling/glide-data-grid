import { c as _c } from "react/compiler-runtime";
import * as React from "react";
import { BubblesOverlayEditorStyle } from "./bubbles-overlay-editor-style.js";
import { GhostModeContext } from "../data-grid-overlay-editor.js";
const BubblesOverlayEditor = p => {
  const $ = _c(9);
  const {
    bubbles
  } = p;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  let t0;
  if ($[0] !== bubbles || $[1] !== isGhostMode) {
    let t1;
    if ($[3] !== bubbles) {
      t1 = bubbles.map(_temp);
      $[3] = bubbles;
      $[4] = t1;
    } else {
      t1 = $[4];
    }
    let t2;
    if ($[5] !== isGhostMode) {
      const t3 = !isGhostMode;
      let t4;
      if ($[7] !== t3) {
        t4 = {
          className: "gdg-input",
          autoFocus: t3
        };
        $[7] = t3;
        $[8] = t4;
      } else {
        t4 = $[8];
      }
      t2 = React.createElement("textarea", t4);
      $[5] = isGhostMode;
      $[6] = t2;
    } else {
      t2 = $[6];
    }
    t0 = React.createElement(BubblesOverlayEditorStyle, null, t1, t2);
    $[0] = bubbles;
    $[1] = isGhostMode;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  return t0;
};
export default BubblesOverlayEditor;
function _temp(b, i) {
  return React.createElement("div", {
    key: i,
    className: "boe-bubble"
  }, b);
}
//# sourceMappingURL=bubbles-overlay-editor.js.map