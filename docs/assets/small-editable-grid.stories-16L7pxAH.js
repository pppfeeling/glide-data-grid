import{R as e}from"./iframe-BcE-c1gF.js";import{D as i}from"./data-editor-all-8E4Os2vs.js";import{B as m,D as d,u as p,d as c}from"./utils-KXRDGTSC.js";import{S as u}from"./story-utils-D7lIIpsB.js";import"./preload-helper-C1FmrZbK.js";import"./index-CwcCJ_pG.js";import"./image-window-loader-BfgbiBNy.js";import"./throttle-DiOeTwrO.js";import"./marked.esm-Cm6jhINK.js";import"./flatten-BzRjj1qx.js";import"./scrolling-data-grid-SYG2q29G.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["SmallEditableGrid"];export{t as SmallEditableGrid,x as __namedExportsOrder,v as default};
