import{R as e}from"./iframe-DfFb5Ign.js";import{D as n}from"./data-editor-all-C-BnK6SF.js";import{f as m,D as c,u,d as a}from"./utils-k_uFBkax.js";import{S as p}from"./story-utils-DlkJV70N.js";import"./preload-helper-C1FmrZbK.js";import"./index-KG-dsUoR.js";import"./image-window-loader-DuEXGL_L.js";import"./throttle-ByAiyUNP.js";import"./marked.esm-CIUALPyN.js";import"./flatten-By6_WT6j.js";import"./scrolling-data-grid-DuhwYF3j.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(p,null,e.createElement(m,null,e.createElement("h1",null,"Layout Integration"),e.createElement(c,null,"Trying the grid in different situations"),e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:o}=u(1e3,!0,!0);return e.createElement(e.Fragment,null,e.createElement(n,{...a,getCellContent:o,columns:t,rows:10,rowMarkers:"both",height:200}),e.createElement(n,{...a,getCellContent:o,columns:t,rows:10,rowMarkers:"both"}),e.createElement("div",{style:{display:"flex",height:"300px"}},e.createElement(n,{...a,getCellContent:o,columns:t,rows:10,rowMarkers:"both"}),e.createElement("div",{style:{flexShrink:0}},"This is some text what happens here?")))};var l,s,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(1000, true, true);
  return <>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers="both" height={200} />
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers="both" />
            <div style={{
      display: "flex",
      height: "300px"
    }}>
                <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={10} rowMarkers="both" />
                <div style={{
        flexShrink: 0
      }}>This is some text what happens here?</div>
            </div>
        </>;
}`,...(i=(s=r.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const S=["LayoutIntegration"];export{r as LayoutIntegration,S as __namedExportsOrder,v as default};
