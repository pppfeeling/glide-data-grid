import{R as t}from"./iframe-WMPUn1pL.js";import{D as l}from"./data-editor-all-G-wcXuTe.js";import{B as c,D as g,P as o,u,d as h}from"./utils-5yjwV-T1.js";import{S as E}from"./story-utils-nqnjxCk5.js";import"./preload-helper-C1FmrZbK.js";import"./index-VmO6qoem.js";import"./image-window-loader-DJOs-Z_J.js";import"./throttle-Bd7MXYl9.js";import"./marked.esm-09Xzqy-J.js";import"./flatten-CfNc2yDy.js";import"./scrolling-data-grid-DQxfRL_g.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>t.createElement(E,null,t.createElement(c,{title:"Padding",description:t.createElement(t.Fragment,null,t.createElement(g,null,"You can add padding at the ends of the grid by setting the"," ",t.createElement(o,null,"paddingRight")," and ",t.createElement(o,null,"paddingBottom")," props"))},t.createElement(r,null)))]},e=r=>{const{paddingRight:d,paddingBottom:p}=r,{cols:s,getCellContent:m}=u(20);return t.createElement(l,{...h,getCellContent:m,columns:s,rowMarkers:"both",experimental:{paddingRight:d,paddingBottom:p},rows:50})};e.argTypes={paddingRight:{control:{type:"range",min:0,max:600}},paddingBottom:{control:{type:"range",min:0,max:600}}};e.args={paddingRight:200,paddingBottom:200};var a,n,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
  const {
    paddingRight,
    paddingBottom
  } = p;
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(20);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers={"both"} experimental={{
    paddingRight,
    paddingBottom
  }} rows={50} />;
}`,...(i=(n=e.parameters)==null?void 0:n.docs)==null?void 0:i.source}}};const _=["Padding"];export{e as Padding,_ as __namedExportsOrder,S as default};
