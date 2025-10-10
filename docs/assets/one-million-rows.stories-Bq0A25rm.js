import{R as e}from"./iframe-7QFbj4DX.js";import{D as l}from"./data-editor-all-TDxSNQ8i.js";import{B as i,D as m,u as p,d as c}from"./utils-QhOxE83m.js";import{S as u}from"./story-utils-CA-9zPg8.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-D7akL7Le.js";import"./throttle-B0oupUkB.js";import"./marked.esm-CK3iDAu6.js";import"./flatten-B3FTK4Mq.js";import"./scrolling-data-grid-CIymcOsQ.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const O={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(i,{title:"One Million Rows",description:e.createElement(m,null,"Data grid supports over 1 million rows. Your limit is mostly RAM.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:n}=p(6);return e.createElement(l,{...c,getCellContent:n,columns:t,rowHeight:31,rows:1e6,rowMarkers:"number"})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowHeight={31} rows={1_000_000} rowMarkers="number" />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const h=["OneMillionRows"];export{r as OneMillionRows,h as __namedExportsOrder,O as default};
