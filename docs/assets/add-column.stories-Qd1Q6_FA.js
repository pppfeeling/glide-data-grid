import{R as e}from"./iframe-CY4oIEyF.js";import{D as i}from"./data-editor-all-BDeouGj6.js";import{B as p,D as d,M as C,u as g,d as f}from"./utils-ExfqJi2i.js";import{S as E}from"./story-utils-JLBW4KAA.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-DBY_yvGj.js";import"./throttle-Dk6FHSoP.js";import"./marked.esm--Qu6p9GT.js";import"./flatten-CwaTq5c6.js";import"./scrolling-data-grid-BIESaVDb.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const x={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(E,null,e.createElement(p,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(d,null,"You can add and remove columns at your disposal"),e.createElement(C,null,"Use the story's controls to change the number of columns"))},e.createElement(r,null)))]},o=r=>{let{cols:t,getCellContent:l,onColumnResize:m}=g(r.columnsCount);return t=t.map((u,c)=>({...u,grow:c})),e.createElement(i,{...f,rowMarkers:"number",getCellContent:l,freezeTrailingRows:1,columns:t,onColumnResize:m,rows:20})};o.args={columnsCount:10};o.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var n,a,s;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`p => {
  let {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(p.columnsCount);
  cols = cols.map((c, i) => ({
    ...c,
    grow: i
  }));
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContent} freezeTrailingRows={1} columns={cols} onColumnResize={onColumnResize} rows={20} />;
}`,...(s=(a=o.parameters)==null?void 0:a.docs)==null?void 0:s.source}}};const S=["AddColumns"];export{o as AddColumns,S as __namedExportsOrder,x as default};
