import{R as e}from"./iframe-DVh2kt9s.js";import{D as l}from"./data-editor-all-CXanV7nX.js";import{B as m,D as i,u,d}from"./utils-BxnPbDdl.js";import{S as p}from"./story-utils-CwnIWCMi.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-BtayzUdL.js";import"./throttle-CCtt1jaX.js";import"./marked.esm-TSjxr-08.js";import"./flatten-ChsDd8w0.js";import"./scrolling-data-grid-Co3QVNwB.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(p,null,e.createElement(m,{title:"One Hundred Thousand Columns",description:e.createElement(i,null,"Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells but that's not important.")},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:a}=u(1e5);return e.createElement(l,{...d,getCellContent:a,columns:o,rows:1e3})};var r,n,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100_000);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["OneHundredThousandCols"];export{t as OneHundredThousandCols,S as __namedExportsOrder,_ as default};
