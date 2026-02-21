import { c as _c } from "react/compiler-runtime";
import * as React from "react";
import { Editor, Viewer } from "@toast-ui/react-editor";
import { styled } from "@linaria/react";
const Wrapper = /*#__PURE__*/styled('div')({
  name: "Wrapper",
  class: "gdg-w1hnqk7o",
  propsAsIs: false
});
const ArticleCellEditor = p => {
  const $ = _c(24);
  const [tempValue, setTempValue] = React.useState(p.value.data.markdown);
  const onKeyDown = _temp;
  let t0;
  if ($[0] !== p || $[1] !== tempValue) {
    t0 = () => {
      p.onFinishedEditing({
        ...p.value,
        data: {
          ...p.value.data,
          markdown: tempValue
        }
      });
    };
    $[0] = p;
    $[1] = tempValue;
    $[2] = t0;
  } else {
    t0 = $[2];
  }
  const onSave = t0;
  let t1;
  if ($[3] !== p) {
    t1 = () => {
      p.onFinishedEditing(undefined);
    };
    $[3] = p;
    $[4] = t1;
  } else {
    t1 = $[4];
  }
  const onClose = t1;
  if (p.value.readonly) {
    let t2;
    if ($[5] !== p.value.data.markdown) {
      let t3;
      if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
          id: "gdg-markdown-readonly",
          onKeyDown,
          style: {
            height: "75vh",
            padding: "35px"
          }
        };
        $[7] = t3;
      } else {
        t3 = $[7];
      }
      t2 = React.createElement(Wrapper, t3, React.createElement(Viewer, {
        initialValue: p.value.data.markdown,
        usageStatistics: false
      }));
      $[5] = p.value.data.markdown;
      $[6] = t2;
    } else {
      t2 = $[6];
    }
    return t2;
  }
  let t2;
  if ($[8] !== onClose || $[9] !== onSave || $[10] !== p.value.data.markdown) {
    let t3;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
      t3 = {
        id: "gdg-markdown-wysiwyg",
        onKeyDown
      };
      $[12] = t3;
    } else {
      t3 = $[12];
    }
    let t4;
    if ($[13] !== p.value.data.markdown) {
      let t5;
      if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = [["heading", "bold", "italic", "strike"], ["hr", "quote"], ["ul", "ol", "task", "indent", "outdent"], ["table", "link"], ["code", "codeblock"]];
        $[15] = t5;
      } else {
        t5 = $[15];
      }
      t4 = React.createElement(Editor, {
        initialEditType: "wysiwyg",
        autofocus: true,
        initialValue: p.value.data.markdown,
        hideModeSwitch: true,
        onChange: setTempValue,
        height: "75vh",
        usageStatistics: false,
        toolbarItems: t5
      });
      $[13] = p.value.data.markdown;
      $[14] = t4;
    } else {
      t4 = $[14];
    }
    let t5;
    if ($[16] !== onClose || $[17] !== onSave) {
      let t6;
      if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
          className: "gdg-footer"
        };
        $[19] = t6;
      } else {
        t6 = $[19];
      }
      let t7;
      if ($[20] !== onClose) {
        t7 = React.createElement("button", {
          className: "gdg-close-button",
          onClick: onClose
        }, "Close");
        $[20] = onClose;
        $[21] = t7;
      } else {
        t7 = $[21];
      }
      let t8;
      if ($[22] !== onSave) {
        t8 = React.createElement("button", {
          className: "gdg-save-button",
          onClick: onSave
        }, "Save");
        $[22] = onSave;
        $[23] = t8;
      } else {
        t8 = $[23];
      }
      t5 = React.createElement("div", t6, t7, t8);
      $[16] = onClose;
      $[17] = onSave;
      $[18] = t5;
    } else {
      t5 = $[18];
    }
    t2 = React.createElement(Wrapper, t3, t4, t5);
    $[8] = onClose;
    $[9] = onSave;
    $[10] = p.value.data.markdown;
    $[11] = t2;
  } else {
    t2 = $[11];
  }
  return t2;
};
export default ArticleCellEditor;
function _temp(e) {
  e.stopPropagation();
}

