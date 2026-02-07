import{R as e}from"./iframe-BRH0sI4T.js";import{D as n}from"./data-editor-all-Cmfpg6eG.js";import{B as i,D as m,u as p,d as c}from"./utils-CcTSkric.js";import{S as u}from"./story-utils-Cr9WLRtl.js";import"./preload-helper-C1FmrZbK.js";import"./index-CNdQ_i0E.js";import"./image-window-loader-C07KUb0y.js";import"./throttle-CLO2z2b9.js";import"./marked.esm-C8Dy4b6m.js";import"./flatten-DLKYwgY1.js";import"./scrolling-data-grid-DdPqTsp-.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(i,{title:"Ten Million Cells",description:e.createElement(m,null,"Data grid supports over 10 million cells. Go nuts with it.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:a}=p(100);return e.createElement(n,{...c,rowMarkers:"number",getCellContent:a,columns:r,rows:1e5})};var o,l,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} columns={cols} rows={100_000} />;
}`,...(s=(l=t.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const h=["TenMillionCells"];export{t as TenMillionCells,h as __namedExportsOrder,b as default};
