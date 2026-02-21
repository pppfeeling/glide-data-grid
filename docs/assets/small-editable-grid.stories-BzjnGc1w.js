import{R as e}from"./iframe-DXOPYGgQ.js";import{D as i}from"./data-editor-all-BGRnDIOA.js";import{B as m,D as d,u as p,d as c}from"./utils-B2dbRHif.js";import{S as u}from"./marked.esm-CZUX9RwD.js";import"./preload-helper-C1FmrZbK.js";import"./index-ngu0pMN8.js";import"./image-window-loader-DNV8iqrv.js";import"./throttle-BQcim7ej.js";import"./index-bI8WdHuM.js";import"./flatten-B5nYkQZa.js";import"./scrolling-data-grid-DzF-1NV7.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["SmallEditableGrid"];export{t as SmallEditableGrid,x as __namedExportsOrder,v as default};
