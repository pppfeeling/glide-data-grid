import{R as e}from"./iframe-BcE-c1gF.js";import{D as n}from"./data-editor-all-8E4Os2vs.js";import{B as c,D as m,P as i,u as p,d as f}from"./utils-KXRDGTSC.js";import{S as u}from"./story-utils-D7lIIpsB.js";import"./lodash-B8NtO9JE.js";import"./preload-helper-C1FmrZbK.js";import"./index-CwcCJ_pG.js";import"./image-window-loader-BfgbiBNy.js";import"./throttle-DiOeTwrO.js";import"./marked.esm-Cm6jhINK.js";import"./flatten-BzRjj1qx.js";import"./scrolling-data-grid-SYG2q29G.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(u,null,e.createElement(c,{title:"Scroll Offset",description:e.createElement(m,null,"The ",e.createElement(i,null,"rowGrouping")," prop can be used to group and even fold rows.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:l}=p(100);return e.createElement(n,{...f,height:"100%",rowMarkers:"both",scrollOffsetY:400,getCellContent:l,columns:t,rows:1e3})};var o,s,a;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const rows = 1000;
  return <DataEditor {...defaultProps} height="100%" rowMarkers="both" scrollOffsetY={400} getCellContent={getCellContent} columns={cols}
  // verticalBorder={false}
  rows={rows} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const v=["ScrollOffset"];export{r as ScrollOffset,v as __namedExportsOrder,_ as default};
