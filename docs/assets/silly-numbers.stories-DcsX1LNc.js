import{R as e}from"./iframe-CB3jNLId.js";import{D as n}from"./data-editor-all-VbTXgUdc.js";import{B as i,D as m,u as c,d as u}from"./utils-CZdCQylj.js";import{S as p}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const h={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(p,null,e.createElement(i,{title:"100 Million Rows",description:e.createElement(m,null,"100 million rows is silly. Once we cross about 33 million pixels in height we can no longer trust the browser to scroll accurately.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:a}=c(6);return e.createElement(n,{...u,getCellContent:a,columns:t,rowHeight:31,rows:1e8,rowMarkers:"number"})};var o,s,l;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowHeight={31} rows={100_000_000} rowMarkers="number" />;
}`,...(l=(s=r.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};const y=["SillyNumbers"];export{r as SillyNumbers,y as __namedExportsOrder,h as default};
