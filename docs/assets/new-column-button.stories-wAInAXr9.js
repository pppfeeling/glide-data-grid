import{R as e}from"./iframe-CB3jNLId.js";import{D as c}from"./data-editor-all-VbTXgUdc.js";import{B as u,D as i,P as d,u as p,d as C,C as E}from"./utils-CZdCQylj.js";import{S as w}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const M={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(w,null,e.createElement(u,{title:"New column button",description:e.createElement(i,null,"A new column button can be created using the ",e.createElement(d,null,"rightElement"),".")},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:a}=p(10,!0),s=e.useMemo(()=>t.map(m=>({...m,grow:1})),[t]);return e.createElement(c,{...C,getCellContent:a,columns:s,rightElement:e.createElement(E,null,e.createElement("button",{onClick:()=>window.alert("Add a column!")},"+")),rightElementProps:{fill:!1,sticky:!1},rows:3e3,rowMarkers:"both"})};var n,r,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(10, true);
  const columns = React.useMemo(() => cols.map(c => ({
    ...c,
    grow: 1
  })), [cols]);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rightElement={<ColumnAddButton>
                    <button onClick={() => window.alert("Add a column!")}>+</button>
                </ColumnAddButton>} rightElementProps={{
    fill: false,
    sticky: false
  }} rows={3000} rowMarkers="both" />;
}`,...(l=(r=o.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const P=["NewColumnButton"];export{o as NewColumnButton,P as __namedExportsOrder,M as default};
