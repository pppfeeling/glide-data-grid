import{R as e}from"./iframe-DfFb5Ign.js";import{D as i}from"./data-editor-all-C-BnK6SF.js";import{B as u,D as d,P as t,u as v,d as g}from"./utils-k_uFBkax.js";import{S as E}from"./story-utils-DlkJV70N.js";import"./preload-helper-C1FmrZbK.js";import"./index-KG-dsUoR.js";import"./image-window-loader-DuEXGL_L.js";import"./throttle-ByAiyUNP.js";import"./marked.esm-CIUALPyN.js";import"./flatten-By6_WT6j.js";import"./scrolling-data-grid-DuhwYF3j.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const k={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(E,null,e.createElement(u,{title:"Overscroll",description:e.createElement(e.Fragment,null,e.createElement(d,null,"You can allocate extra space at the ends of the grid by setting the"," ",e.createElement(t,null,"overscrollX")," and ",e.createElement(t,null,"overscrollY")," props"))},e.createElement(o,null)))]},r=o=>{const{overscrollX:n,overscrollY:c}=o,{cols:m,getCellContent:p}=v(20);return e.createElement(i,{...g,getCellContent:p,columns:m,overscrollX:n,overscrollY:c,rows:50})};r.argTypes={overscrollX:{control:{type:"range",min:0,max:600}},overscrollY:{control:{type:"range",min:0,max:600}}};r.args={overscrollX:200,overscrollY:200};var l,s,a;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`p => {
  const {
    overscrollX,
    overscrollY
  } = p;
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(20);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} overscrollX={overscrollX} overscrollY={overscrollY} rows={50} />;
}`,...(a=(s=r.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const w=["Overscroll"];export{r as Overscroll,w as __namedExportsOrder,k as default};
