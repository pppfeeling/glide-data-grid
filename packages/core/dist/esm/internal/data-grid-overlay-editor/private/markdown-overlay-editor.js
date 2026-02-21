import { c as _c } from "react/compiler-runtime";
import * as React from "react";
import MarkdownDiv from "../../markdown-div/markdown-div.js";
import { GrowingEntry } from "../../growing-entry/growing-entry.js";
import { MarkdownOverlayEditorStyle } from "./markdown-overlay-editor-style.js";
import { EditPencil, Checkmark } from "../../../common/utils.js";
import { GhostModeContext } from "../data-grid-overlay-editor.js";
export const MarkdownOverlayEditor = p => {
  const $ = _c(52);
  const {
    value,
    onChange,
    forceEditMode,
    createNode,
    targetRect,
    onFinish,
    validatedSelection
  } = p;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  const markdown = value.data;
  const readonly = value.readonly === true;
  const [editMode, setEditMode] = React.useState(markdown === "" || forceEditMode);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      setEditMode(_temp);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onEditClick = t0;
  const addLeftPad = markdown ? "gdg-ml-6" : "";
  if (editMode) {
    let t1;
    if ($[1] !== addLeftPad || $[2] !== isGhostMode || $[3] !== markdown || $[4] !== onChange || $[5] !== onFinish || $[6] !== targetRect.width || $[7] !== validatedSelection || $[8] !== value) {
      const t2 = targetRect.width - 20;
      let t3;
      if ($[10] !== t2) {
        t3 = {
          targetWidth: t2
        };
        $[10] = t2;
        $[11] = t3;
      } else {
        t3 = $[11];
      }
      let t4;
      if ($[12] !== isGhostMode || $[13] !== markdown || $[14] !== onChange || $[15] !== validatedSelection) {
        const t5 = !isGhostMode;
        let t6;
        if ($[17] !== markdown || $[18] !== onChange || $[19] !== t5 || $[20] !== validatedSelection) {
          t6 = {
            autoFocus: t5,
            highlight: false,
            validatedSelection,
            value: markdown,
            onKeyDown: _temp2,
            onChange
          };
          $[17] = markdown;
          $[18] = onChange;
          $[19] = t5;
          $[20] = validatedSelection;
          $[21] = t6;
        } else {
          t6 = $[21];
        }
        t4 = React.createElement(GrowingEntry, t6);
        $[12] = isGhostMode;
        $[13] = markdown;
        $[14] = onChange;
        $[15] = validatedSelection;
        $[16] = t4;
      } else {
        t4 = $[16];
      }
      let t5;
      if ($[22] !== addLeftPad || $[23] !== onFinish || $[24] !== value) {
        const t6 = `gdg-edit-icon gdg-checkmark-hover ${addLeftPad}`;
        let t7;
        if ($[26] !== onFinish || $[27] !== value) {
          t7 = () => onFinish(value);
          $[26] = onFinish;
          $[27] = value;
          $[28] = t7;
        } else {
          t7 = $[28];
        }
        let t8;
        if ($[29] !== t6 || $[30] !== t7) {
          t8 = {
            className: t6,
            onClick: t7
          };
          $[29] = t6;
          $[30] = t7;
          $[31] = t8;
        } else {
          t8 = $[31];
        }
        let t9;
        if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
          t9 = React.createElement(Checkmark, null);
          $[32] = t9;
        } else {
          t9 = $[32];
        }
        t5 = React.createElement("div", t8, t9);
        $[22] = addLeftPad;
        $[23] = onFinish;
        $[24] = value;
        $[25] = t5;
      } else {
        t5 = $[25];
      }
      t1 = React.createElement(MarkdownOverlayEditorStyle, t3, t4, t5);
      $[1] = addLeftPad;
      $[2] = isGhostMode;
      $[3] = markdown;
      $[4] = onChange;
      $[5] = onFinish;
      $[6] = targetRect.width;
      $[7] = validatedSelection;
      $[8] = value;
      $[9] = t1;
    } else {
      t1 = $[9];
    }
    return t1;
  }
  let t1;
  if ($[33] !== addLeftPad || $[34] !== createNode || $[35] !== isGhostMode || $[36] !== markdown || $[37] !== readonly || $[38] !== targetRect.width) {
    let t2;
    if ($[40] !== targetRect.width) {
      t2 = {
        targetWidth: targetRect.width
      };
      $[40] = targetRect.width;
      $[41] = t2;
    } else {
      t2 = $[41];
    }
    let t3;
    if ($[42] !== createNode || $[43] !== markdown) {
      t3 = React.createElement(MarkdownDiv, {
        contents: markdown,
        createNode
      });
      $[42] = createNode;
      $[43] = markdown;
      $[44] = t3;
    } else {
      t3 = $[44];
    }
    let t4;
    if ($[45] !== addLeftPad || $[46] !== readonly) {
      t4 = !readonly && React.createElement(React.Fragment, null, React.createElement("div", {
        className: "spacer"
      }), React.createElement("div", {
        className: `gdg-edit-icon gdg-edit-hover ${addLeftPad}`,
        onClick: onEditClick
      }, React.createElement(EditPencil, null)));
      $[45] = addLeftPad;
      $[46] = readonly;
      $[47] = t4;
    } else {
      t4 = $[47];
    }
    let t5;
    if ($[48] !== isGhostMode) {
      const t6 = !isGhostMode;
      let t7;
      if ($[50] !== t6) {
        t7 = {
          className: "gdg-md-edit-textarea gdg-input",
          autoFocus: t6
        };
        $[50] = t6;
        $[51] = t7;
      } else {
        t7 = $[51];
      }
      t5 = React.createElement("textarea", t7);
      $[48] = isGhostMode;
      $[49] = t5;
    } else {
      t5 = $[49];
    }
    t1 = React.createElement(MarkdownOverlayEditorStyle, t2, t3, t4, t5);
    $[33] = addLeftPad;
    $[34] = createNode;
    $[35] = isGhostMode;
    $[36] = markdown;
    $[37] = readonly;
    $[38] = targetRect.width;
    $[39] = t1;
  } else {
    t1 = $[39];
  }
  return t1;
};
function _temp(e) {
  return !e;
}
function _temp2(e_0) {
  if (e_0.key === "Enter") {
    e_0.stopPropagation();
  }
}
//# sourceMappingURL=markdown-overlay-editor.js.map