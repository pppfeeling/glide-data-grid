import{R as e}from"./iframe-CB3jNLId.js";import{D as i}from"./data-editor-all-VbTXgUdc.js";import{B as d,D as m,u as c,d as p}from"./utils-CZdCQylj.js";import{S as u}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const k={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(d,{title:"Editable Grid",description:e.createElement(m,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=c(6,!1);return e.createElement(i,{...p,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var a,o,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const h=["SmallEditableGrid"];export{t as SmallEditableGrid,h as __namedExportsOrder,k as default};
