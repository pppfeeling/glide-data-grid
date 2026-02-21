import{R as e}from"./iframe-DXOPYGgQ.js";import{D as n}from"./data-editor-all-BGRnDIOA.js";import{B as c,D as m,P as i,u as p,d as f}from"./utils-B2dbRHif.js";import{S as u}from"./marked.esm-CZUX9RwD.js";import"./lodash-CYfepZKI.js";import"./preload-helper-C1FmrZbK.js";import"./index-ngu0pMN8.js";import"./image-window-loader-DNV8iqrv.js";import"./throttle-BQcim7ej.js";import"./index-bI8WdHuM.js";import"./flatten-B5nYkQZa.js";import"./scrolling-data-grid-DzF-1NV7.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(c,{title:"Scroll Offset",description:e.createElement(m,null,"The ",e.createElement(i,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:l}=p(100);return e.createElement(n,{...f,height:"100%",rowMarkers:"both",scrollOffsetY:400,getCellContent:l,columns:t,rows:1e3})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  return <DataEditor {...defaultProps} height="100%" rowMarkers="both" scrollOffsetY={400} getCellContent={getCellContent} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const v=["ScrollOffset"];export{r as ScrollOffset,v as __namedExportsOrder,_ as default};
