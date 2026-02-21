import{R as e}from"./iframe-DXOPYGgQ.js";import{D as i}from"./data-editor-all-BGRnDIOA.js";import{B as m,D as c,u as p,d}from"./utils-B2dbRHif.js";import{S as u}from"./marked.esm-CZUX9RwD.js";import"./preload-helper-C1FmrZbK.js";import"./index-ngu0pMN8.js";import"./image-window-loader-DNV8iqrv.js";import"./throttle-BQcim7ej.js";import"./index-bI8WdHuM.js";import"./flatten-B5nYkQZa.js";import"./scrolling-data-grid-DzF-1NV7.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(u,null,e.createElement(m,{title:"Scaled view",description:e.createElement(c,null,"The data editor supports being scaled."),scale:"0.5"},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:n,onColumnResize:l}=p(60);return e.createElement(i,{...d,getCellContent:n,columns:o,rowMarkers:"both",rows:500,onColumnResize:l})};var r,a,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" rows={500} onColumnResize={onColumnResize} />;
}`,...(s=(a=t.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const V=["ScaledView"];export{t as ScaledView,V as __namedExportsOrder,b as default};
