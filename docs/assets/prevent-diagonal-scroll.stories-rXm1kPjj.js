import{R as e}from"./iframe-CB3jNLId.js";import{D as s}from"./data-editor-all-VbTXgUdc.js";import{B as c,D as i,P as m,u as p,d as u}from"./utils-CZdCQylj.js";import{S as g}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(g,null,e.createElement(c,{title:"Prevent Diagonal Scroll",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Diagonal scrolling can be prevented by setting"," ",e.createElement(m,null,"preventDiagonalScrolling"),"."))},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:n}=p(200);return e.createElement(s,{...u,getCellContent:n,columns:r,preventDiagonalScrolling:!0,rows:5e3})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(200);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} preventDiagonalScrolling={true} rows={5000} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const _=["PreventDiagonalScroll"];export{t as PreventDiagonalScroll,_ as __namedExportsOrder,G as default};
