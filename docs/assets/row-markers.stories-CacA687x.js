import{R as e}from"./iframe-DelEik1u.js";import{D as m}from"./data-editor-all-W_a42_hL.js";import{B as c,D as i,P as d,u as p,d as u}from"./utils-D33IJOVP.js";import{S as b}from"./story-utils-BAgllxwQ.js";import"./preload-helper-C1FmrZbK.js";import"./index-DDKwlnpI.js";import"./image-window-loader-DnW574Gd.js";import"./throttle-B8GU50-r.js";import"./marked.esm-RnuSlOMI.js";import"./flatten-C5fNT6Z1.js";import"./scrolling-data-grid-CGxIGIry.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const S={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(b,null,e.createElement(c,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Row Markers can be controlled by setting the ",e.createElement(d,null,"rowMarkers")," prop."))},e.createElement(t,null)))]},r=t=>{const{cols:l,getCellContent:n}=p(10,!1);return e.createElement(m,{...u,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:t.markers,rowNumber:t.rowNumber,checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:t.headerDisabled,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"checkbox",headerDisabled:!1,rowNumber:!0};r.argTypes={markers:{control:{type:"select"},options:["checkbox","number","none","clickable-number","checkbox-visible","both","checkbox-and-number"]},headerDisabled:{control:{type:"boolean"}},rowNumber:{control:{type:"boolean"}}};var a,o,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`p => {
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
