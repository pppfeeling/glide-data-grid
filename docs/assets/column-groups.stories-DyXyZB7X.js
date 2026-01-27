import{R as e}from"./iframe-WMPUn1pL.js";import{D as i}from"./data-editor-all-G-wcXuTe.js";import{B as p,D as u,P as d,u as c,d as g}from"./utils-5yjwV-T1.js";import{a as C}from"./image-window-loader-DJOs-Z_J.js";import{S as G}from"./story-utils-nqnjxCk5.js";import"./preload-helper-C1FmrZbK.js";import"./index-VmO6qoem.js";import"./throttle-Bd7MXYl9.js";import"./flatten-CfNc2yDy.js";import"./scrolling-data-grid-DQxfRL_g.js";import"./marked.esm-09Xzqy-J.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const $={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(G,null,e.createElement(p,{title:"Column Grouping",description:e.createElement(u,null,"Columns in the data grid may be grouped by setting their ",e.createElement(d,null,"group")," ","property.")},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:l}=c(20,!0,!0);return e.createElement(i,{...g,getCellContent:l,onGroupHeaderRenamed:(r,m)=>window.alert(`Please rename group ${r} to ${m}`),columns:t,rows:1e3,getGroupDetails:r=>({name:r,icon:r===""?void 0:C.HeaderCode}),rowMarkers:"both"})};var a,n,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(20, true, true);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} onGroupHeaderRenamed={(x, y) => window.alert(\`Please rename group \${x} to \${y}\`)} columns={cols} rows={1000} getGroupDetails={g => ({
    name: g,
    icon: g === "" ? undefined : GridColumnIcon.HeaderCode
  })} rowMarkers="both" />;
}`,...(s=(n=o.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["ColumnGroups"];export{o as ColumnGroups,S as __namedExportsOrder,$ as default};
