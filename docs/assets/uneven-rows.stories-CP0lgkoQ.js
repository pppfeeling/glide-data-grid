import{R as e}from"./iframe-CB3jNLId.js";import{D as c}from"./data-editor-all-VbTXgUdc.js";import{B as m,D as i,P as p,u,d}from"./utils-CZdCQylj.js";import{S as w}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(w,null,e.createElement(m,{title:"Uneven Rows",description:e.createElement(i,null,"Rows can be made uneven by passing a callback to the ",e.createElement(p,null,"rowHeight")," prop")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:l}=u(6);return e.createElement(c,{...d,rowHeight:o=>o%3===0?30:o%2?50:60,getCellContent:l,columns:r,rows:1e3})};var a,n,s;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} rowHeight={r => r % 3 === 0 ? 30 : r % 2 ? 50 : 60} getCellContent={getCellContent} columns={cols} rows={1000} />;
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const P=["UnevenRows"];export{t as UnevenRows,P as __namedExportsOrder,G as default};
