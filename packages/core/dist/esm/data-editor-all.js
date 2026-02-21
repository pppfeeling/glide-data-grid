import * as React from "react";
import { DataEditor } from "./data-editor/data-editor.js";
import { AllCellRenderers } from "./cells/index.js";
import { sprites } from "./internal/data-grid/sprites.js";
import ImageWindowLoaderImpl from "./common/image-window-loader.js";
const DataEditorAllImpl = (p, ref) => {
  const allSprites = React.useMemo(() => {
    return {
      ...sprites,
      ...p.headerIcons
    };
  }, [p.headerIcons]);
  const renderers = React.useMemo(() => {
    var _p$renderers;
    return (_p$renderers = p.renderers) !== null && _p$renderers !== void 0 ? _p$renderers : AllCellRenderers;
  }, [p.renderers]);
  const imageWindowLoader = React.useMemo(() => {
    var _p$imageWindowLoader;
    return (_p$imageWindowLoader = p.imageWindowLoader) !== null && _p$imageWindowLoader !== void 0 ? _p$imageWindowLoader : new ImageWindowLoaderImpl();
  }, [p.imageWindowLoader]);
  return React.createElement(DataEditor, {
    ...p,
    renderers: renderers,
    headerIcons: allSprites,
    ref: ref,
    imageWindowLoader: imageWindowLoader
  });
};
export const DataEditorAll = React.forwardRef(DataEditorAllImpl);
//# sourceMappingURL=data-editor-all.js.map