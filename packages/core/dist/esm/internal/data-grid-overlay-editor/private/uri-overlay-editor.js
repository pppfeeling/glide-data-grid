import { c as _c } from "react/compiler-runtime";
import { EditPencil } from "../../../common/utils.js";
import * as React from "react";
import { GrowingEntry } from "../../growing-entry/growing-entry.js";
import { UriOverlayEditorStyle } from "./uri-overlay-editor-style.js";
import { GhostModeContext } from "../data-grid-overlay-editor.js";
const UriOverlayEditor = p => {
  const $ = _c(27);
  const {
    uri,
    onChange,
    forceEditMode,
    readonly,
    validatedSelection,
    preview
  } = p;
  const {
    isGhostMode
  } = React.useContext(GhostModeContext);
  const [editMode, setEditMode] = React.useState(!readonly && (uri === "" || forceEditMode));
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = () => {
      setEditMode(true);
    };
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  const onEditClick = t0;
  if (editMode) {
    let t1;
    if ($[1] !== isGhostMode || $[2] !== onChange || $[3] !== uri || $[4] !== validatedSelection) {
      const t2 = !isGhostMode;
      let t3;
      if ($[6] !== onChange || $[7] !== t2 || $[8] !== uri || $[9] !== validatedSelection) {
        t3 = {
          validatedSelection,
          highlight: true,
          autoFocus: t2,
          value: uri,
          onChange
        };
        $[6] = onChange;
        $[7] = t2;
        $[8] = uri;
        $[9] = validatedSelection;
        $[10] = t3;
      } else {
        t3 = $[10];
      }
      t1 = React.createElement(GrowingEntry, t3);
      $[1] = isGhostMode;
      $[2] = onChange;
      $[3] = uri;
      $[4] = validatedSelection;
      $[5] = t1;
    } else {
      t1 = $[5];
    }
    return t1;
  }
  let t1;
  if ($[11] !== isGhostMode || $[12] !== preview || $[13] !== readonly || $[14] !== uri) {
    let t2;
    if ($[16] !== preview || $[17] !== uri) {
      let t3;
      if ($[19] !== uri) {
        t3 = {
          className: "gdg-link-area",
          href: uri,
          target: "_blank",
          rel: "noopener noreferrer"
        };
        $[19] = uri;
        $[20] = t3;
      } else {
        t3 = $[20];
      }
      t2 = React.createElement("a", t3, preview);
      $[16] = preview;
      $[17] = uri;
      $[18] = t2;
    } else {
      t2 = $[18];
    }
    let t3;
    if ($[21] !== readonly) {
      t3 = !readonly && React.createElement("div", {
        className: "gdg-edit-icon",
        onClick: onEditClick
      }, React.createElement(EditPencil, null));
      $[21] = readonly;
      $[22] = t3;
    } else {
      t3 = $[22];
    }
    let t4;
    if ($[23] !== isGhostMode) {
      const t5 = !isGhostMode;
      let t6;
      if ($[25] !== t5) {
        t6 = {
          className: "gdg-input",
          autoFocus: t5
        };
        $[25] = t5;
        $[26] = t6;
      } else {
        t6 = $[26];
      }
      t4 = React.createElement("textarea", t6);
      $[23] = isGhostMode;
      $[24] = t4;
    } else {
      t4 = $[24];
    }
    t1 = React.createElement(UriOverlayEditorStyle, null, t2, t3, t4);
    $[11] = isGhostMode;
    $[12] = preview;
    $[13] = readonly;
    $[14] = uri;
    $[15] = t1;
  } else {
    t1 = $[15];
  }
  return t1;
};
export default UriOverlayEditor;
//# sourceMappingURL=uri-overlay-editor.js.map