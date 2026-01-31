import{R as e}from"./iframe-BCyg8ypy.js";import{D as n}from"./data-editor-all-C_BBxQFz.js";import{B as i,D as m,u as p,d as c}from"./utils-BlgGaLUf.js";import{S as u}from"./story-utils-Dga44QbK.js";import"./preload-helper-C1FmrZbK.js";import"./index-DkVHgzmp.js";import"./image-window-loader-CvVz5YUq.js";import"./throttle-PvXwe8rS.js";import"./marked.esm-C2vt5mN_.js";import"./flatten-DVhM32tQ.js";import"./scrolling-data-grid-Bf9EOU5a.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(i,{title:"Ten Million Cells",description:e.createElement(m,null,"Data grid supports over 10 million cells. Go nuts with it.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:a}=p(100);return e.createElement(n,{...c,rowMarkers:"number",getCellContent:a,columns:r,rows:1e5})};var o,l,s;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} columns={cols} rows={100_000} />;
}`,...(s=(l=t.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const h=["TenMillionCells"];export{t as TenMillionCells,h as __namedExportsOrder,b as default};
