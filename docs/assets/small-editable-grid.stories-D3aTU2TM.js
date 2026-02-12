import{R as e}from"./iframe-C1adrrhA.js";import{D as i}from"./data-editor-all-gJeFUSLn.js";import{B as m,D as d,u as p,d as c}from"./utils-D7W4V8XM.js";import{S as u}from"./story-utils-Bv0N71rq.js";import"./preload-helper-C1FmrZbK.js";import"./index-BXP72RLD.js";import"./image-window-loader-CSosr3OK.js";import"./throttle-BbvBCwfb.js";import"./marked.esm-BsrRDEkT.js";import"./flatten-B9xqSffn.js";import"./scrolling-data-grid-CAQLaDn6.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[r=>e.createElement(u,null,e.createElement(m,{title:"Editable Grid",description:e.createElement(d,null,"Data grid supports overlay editors for changing values. There are bespoke editors for numbers, strings, images, booleans, markdown, and uri.")},e.createElement(r,null)))]},t=()=>{const{cols:r,getCellContent:s,setCellValue:n}=p(6,!1);return e.createElement(i,{...c,getCellContent:s,columns:r,rows:20,onCellEdited:n})};var o,a,l;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    setCellValue
  } = useMockDataGenerator(6, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={20} onCellEdited={setCellValue} />;
}`,...(l=(a=t.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["SmallEditableGrid"];export{t as SmallEditableGrid,x as __namedExportsOrder,v as default};
