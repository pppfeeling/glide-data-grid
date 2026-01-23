import{R as e}from"./iframe-CI-U1wEL.js";import{D as l}from"./data-editor-all-rOHfFJK2.js";import{B as m,D as i,u,d}from"./utils-DQR6eLVF.js";import{S as p}from"./story-utils-BfT7B3IX.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-DSpFIgLX.js";import"./throttle-CrC0zd7y.js";import"./marked.esm-BmZ9459z.js";import"./flatten-Cjd8EGAb.js";import"./scrolling-data-grid-CsWNz2CK.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const _={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(p,null,e.createElement(m,{title:"One Hundred Thousand Columns",description:e.createElement(i,null,"Data grid supports way more columns than you will ever need. Also this is rendering 10 million cells but that's not important.")},e.createElement(o,null)))]},t=()=>{const{cols:o,getCellContent:a}=u(1e5);return e.createElement(l,{...d,getCellContent:a,columns:o,rows:1e3})};var r,n,s;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100_000);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} />;
}`,...(s=(n=t.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};const S=["OneHundredThousandCols"];export{t as OneHundredThousandCols,S as __namedExportsOrder,_ as default};
