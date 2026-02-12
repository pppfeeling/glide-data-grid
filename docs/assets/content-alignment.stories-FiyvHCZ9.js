import{R as e}from"./iframe-SpIYWlQu.js";import{D as u}from"./data-editor-all-DO8vaUGp.js";import{B as C,D as g,P as l,a as p,d}from"./utils-CJEVcps7.js";import{S as f}from"./story-utils-DUSKwXLh.js";import"./preload-helper-C1FmrZbK.js";import"./index-5fyN_W5p.js";import"./image-window-loader-JZRW7-3J.js";import"./throttle-gxQeCm-B.js";import"./marked.esm-3CTxDRZU.js";import"./flatten-BeTbcY17.js";import"./scrolling-data-grid-OdoyeK0h.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const B={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(f,null,e.createElement(C,{title:"Content Alignment",description:e.createElement(g,null,"You can customize the content alignment by setting ",e.createElement(l,null,"contentAlign")," of a cell to ",e.createElement(l,null,"left"),", ",e.createElement(l,null,"right")," or ",e.createElement(l,null,"center"),".")},e.createElement(r,null)))]},o=()=>{const{cols:r,getCellContent:t}=p(),m=e.useCallback(n=>{const[c,A]=n;return c===3?{...t(n),contentAlign:"center"}:c===4?{...t(n),contentAlign:"right"}:c===5?{...t(n),contentAlign:"left"}:t(n)},[t]);return e.createElement(u,{...d,getCellContent:m,columns:r,rows:300})};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useAllMockedKinds();
  const mangledGetCellContent = React.useCallback<typeof getCellContent>(cell => {
    const [col, _row] = cell;
    if (col === 3) {
      return {
        ...getCellContent(cell),
        contentAlign: "center"
      };
    }
    if (col === 4) {
      return {
        ...getCellContent(cell),
        contentAlign: "right"
      };
    }
    if (col === 5) {
      return {
        ...getCellContent(cell),
        contentAlign: "left"
      };
    }
    return getCellContent(cell);
  }, [getCellContent]);
  return <DataEditor {...defaultProps} getCellContent={mangledGetCellContent} columns={cols} rows={300} />;
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const K=["ContentAlignment"];export{o as ContentAlignment,K as __namedExportsOrder,B as default};
