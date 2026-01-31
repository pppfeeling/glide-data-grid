import{R as e}from"./iframe-BCyg8ypy.js";import{D as m}from"./data-editor-all-C_BBxQFz.js";import{B as c,D as i,P as d,u as p,d as u}from"./utils-BlgGaLUf.js";import{S as b}from"./story-utils-Dga44QbK.js";import"./preload-helper-C1FmrZbK.js";import"./index-DkVHgzmp.js";import"./image-window-loader-CvVz5YUq.js";import"./throttle-PvXwe8rS.js";import"./marked.esm-C2vt5mN_.js";import"./flatten-DVhM32tQ.js";import"./scrolling-data-grid-Bf9EOU5a.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(b,null,e.createElement(c,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Row Markers can be controlled by setting the ",e.createElement(d,null,"rowMarkers")," prop."))},e.createElement(t,null)))]},r=t=>{const{cols:l,getCellContent:n}=p(10,!1);return e.createElement(m,{...u,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:t.markers,rowNumber:t.rowNumber,checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:t.headerDisabled,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"checkbox",headerDisabled:!1,rowNumber:!0};r.argTypes={markers:{control:{type:"select"},options:["checkbox","number","none","clickable-number","checkbox-visible","both","checkbox-and-number"]},headerDisabled:{control:{type:"boolean"}},rowNumber:{control:{type:"boolean"}}};var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
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
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const B=["RowMarkers"];export{r as RowMarkers,B as __namedExportsOrder,S as default};
