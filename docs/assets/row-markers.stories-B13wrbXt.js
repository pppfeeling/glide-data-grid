import{R as e}from"./iframe-DDTcUdjc.js";import{D as m}from"./data-editor-all-DTNR_ELW.js";import{B as c,D as i,P as d,u as p,d as u}from"./utils-BMaH_XUh.js";import{S as b}from"./story-utils-tSAhB5KM.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-Ba2dfKLx.js";import"./throttle-C2-49NaF.js";import"./marked.esm-jmFFBRfF.js";import"./flatten-BavRFQMS.js";import"./scrolling-data-grid-CqIwtj2o.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const R={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(b,null,e.createElement(c,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Row Markers can be controlled by setting the ",e.createElement(d,null,"rowMarkers")," prop."))},e.createElement(t,null)))]},r=t=>{const{cols:l,getCellContent:n}=p(10,!1);return e.createElement(m,{...u,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:t.markers,rowNumber:t.rowNumber,checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:t.headerDisabled,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"checkbox",headerDisabled:!1,rowNumber:!0};r.argTypes={markers:{control:{type:"select"},options:["checkbox","number","none","clickable-number","checkbox-visible","both","checkbox-and-number"]},headerDisabled:{control:{type:"boolean"}},rowNumber:{control:{type:"boolean"}}};var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, false);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} verticalBorder={false} rowMarkers={{
    kind: p.markers,
    rowNumber: p.rowNumber,
    checkboxStyle: "square",
    headerAlwaysVisible: true,
    headerDisabled: p.headerDisabled,
    headerTheme: {
      textMedium: "rgba(51, 51, 51, 0.50)"
    }
  }} columns={cols} rows={400} />;
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const S=["RowMarkers"];export{r as RowMarkers,S as __namedExportsOrder,R as default};
