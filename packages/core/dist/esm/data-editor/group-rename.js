import { c as _c } from "react/compiler-runtime";
import React from "react";
import { styled } from "@linaria/react";
import ClickOutsideContainer from "../internal/click-outside-container/click-outside-container.js";
const _exp = /*#__PURE__*/() => p => Math.max(16, p.targetHeight - 10);
const RenameInput = /*#__PURE__*/styled('input')({
  name: "RenameInput",
  class: "gdg-r17m35ur",
  propsAsIs: false,
  vars: {
    "r17m35ur-0": [_exp(), "px"]
  }
});
export const GroupRename = p => {
  const $ = _c(37);
  const {
    bounds,
    group,
    onClose,
    canvasBounds,
    onFinish
  } = p;
  const [value, setValue] = React.useState(group);
  let t0;
  if ($[0] !== bounds.height || $[1] !== bounds.width || $[2] !== bounds.x || $[3] !== bounds.y || $[4] !== canvasBounds.left || $[5] !== canvasBounds.top || $[6] !== onClose || $[7] !== onFinish || $[8] !== value) {
    const t1 = bounds.x - canvasBounds.left + 1;
    const t2 = bounds.y - canvasBounds.top;
    const t3 = bounds.width - 2;
    let t4;
    if ($[10] !== bounds.height || $[11] !== t1 || $[12] !== t2 || $[13] !== t3) {
      t4 = {
        position: "absolute",
        left: t1,
        top: t2,
        width: t3,
        height: bounds.height
      };
      $[10] = bounds.height;
      $[11] = t1;
      $[12] = t2;
      $[13] = t3;
      $[14] = t4;
    } else {
      t4 = $[14];
    }
    let t5;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
      t5 = "gdg-g1tqibwd";
      $[15] = t5;
    } else {
      t5 = $[15];
    }
    let t6;
    if ($[16] !== onClose || $[17] !== t4) {
      t6 = {
        style: t4,
        className: t5,
        onClickOutside: onClose
      };
      $[16] = onClose;
      $[17] = t4;
      $[18] = t6;
    } else {
      t6 = $[18];
    }
    let t7;
    if ($[19] !== bounds.height || $[20] !== onClose || $[21] !== onFinish || $[22] !== value) {
      let t8;
      if ($[24] !== value) {
        t8 = e => e.target.setSelectionRange(0, value.length);
        $[24] = value;
        $[25] = t8;
      } else {
        t8 = $[25];
      }
      let t9;
      if ($[26] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = e_0 => setValue(e_0.target.value);
        $[26] = t9;
      } else {
        t9 = $[26];
      }
      let t10;
      if ($[27] !== onClose || $[28] !== onFinish || $[29] !== value) {
        t10 = e_1 => {
          if (e_1.key === "Enter") {
            onFinish(value);
          } else {
            if (e_1.key === "Escape") {
              onClose();
            }
          }
        };
        $[27] = onClose;
        $[28] = onFinish;
        $[29] = value;
        $[30] = t10;
      } else {
        t10 = $[30];
      }
      let t11;
      if ($[31] !== bounds.height || $[32] !== onClose || $[33] !== t10 || $[34] !== t8 || $[35] !== value) {
        t11 = {
          targetHeight: bounds.height,
          "data-testid": "group-rename-input",
          value,
          onBlur: onClose,
          onFocus: t8,
          onChange: t9,
          onKeyDown: t10,
          autoFocus: true
        };
        $[31] = bounds.height;
        $[32] = onClose;
        $[33] = t10;
        $[34] = t8;
        $[35] = value;
        $[36] = t11;
      } else {
        t11 = $[36];
      }
      t7 = React.createElement(RenameInput, t11);
      $[19] = bounds.height;
      $[20] = onClose;
      $[21] = onFinish;
      $[22] = value;
      $[23] = t7;
    } else {
      t7 = $[23];
    }
    t0 = React.createElement(ClickOutsideContainer, t6, t7);
    $[0] = bounds.height;
    $[1] = bounds.width;
    $[2] = bounds.x;
    $[3] = bounds.y;
    $[4] = canvasBounds.left;
    $[5] = canvasBounds.top;
    $[6] = onClose;
    $[7] = onFinish;
    $[8] = value;
    $[9] = t0;
  } else {
    t0 = $[9];
  }
  return t0;
};

