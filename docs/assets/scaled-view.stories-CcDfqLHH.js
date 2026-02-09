import{R as e}from"./iframe-DfFb5Ign.js";import{D as i}from"./data-editor-all-C-BnK6SF.js";import{B as m,D as c,u as p,d}from"./utils-k_uFBkax.js";import{S as u}from"./story-utils-DlkJV70N.js";import"./preload-helper-C1FmrZbK.js";import"./index-KG-dsUoR.js";import"./image-window-loader-DuEXGL_L.js";import"./throttle-ByAiyUNP.js";import"./marked.esm-CIUALPyN.js";import"./flatten-By6_WT6j.js";import"./scrolling-data-grid-DuhwYF3j.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const V=["ScaledView"];export{t as ScaledView,V as __namedExportsOrder,b as default};
