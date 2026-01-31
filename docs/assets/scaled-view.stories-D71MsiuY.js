import{R as e}from"./iframe-BCyg8ypy.js";import{D as i}from"./data-editor-all-C_BBxQFz.js";import{B as m,D as c,u as p,d}from"./utils-BlgGaLUf.js";import{S as u}from"./story-utils-Dga44QbK.js";import"./preload-helper-C1FmrZbK.js";import"./index-DkVHgzmp.js";import"./image-window-loader-CvVz5YUq.js";import"./throttle-PvXwe8rS.js";import"./marked.esm-C2vt5mN_.js";import"./flatten-DVhM32tQ.js";import"./scrolling-data-grid-Bf9EOU5a.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const V=["ScaledView"];export{t as ScaledView,V as __namedExportsOrder,b as default};
