import{R as e}from"./iframe-CB3jNLId.js";import{D as c}from"./data-editor-all-VbTXgUdc.js";import{B as m,D as i,P as d,u,d as p}from"./utils-CZdCQylj.js";import{S as b}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const x={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(b,null,e.createElement(m,{title:"Row markers",description:e.createElement(e.Fragment,null,e.createElement(i,null,"Row Markers can be controlled by setting the ",e.createElement(d,null,"rowMarkers")," prop."))},e.createElement(a,null)))]},r=a=>{const{cols:l,getCellContent:n}=u(10,!1);return e.createElement(c,{...p,getCellContent:n,verticalBorder:!1,rowMarkers:{kind:a.markers,rowNumber:a.rowNumber,checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:a.headerDisabled,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},columns:l,rows:400})};r.args={markers:"checkbox",headerDisabled:!1,rowNumber:!0};r.argTypes={markers:{control:{type:"select"},options:["checkbox","number","none","clickable-number","checkbox-visible","both","checkbox-and-number"]},headerDisabled:{control:{type:"boolean"}},rowNumber:{control:{type:"boolean"}}};var t,o,s;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`p => {
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
}`,...(s=(o=r.parameters)==null?void 0:o.docs)==null?void 0:s.source}}};const y=["RowMarkers"];export{r as RowMarkers,y as __namedExportsOrder,x as default};
