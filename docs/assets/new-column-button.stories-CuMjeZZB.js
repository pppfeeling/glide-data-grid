import{R as t}from"./iframe-wuTHgR8b.js";import{D as c}from"./data-editor-all-DkZpxm7q.js";import{B as u,D as i,P as p,u as d,d as C,C as E}from"./utils-DLI4bqvr.js";import{S as w}from"./story-utils-nH4nq9e6.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-gW0cWdGd.js";import"./throttle-D_inFnPf.js";import"./marked.esm-semV_bLq.js";import"./flatten-C618VRh1.js";import"./scrolling-data-grid-biWknnU7.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const R={title:"Glide-Data-Grid/DataEditor Demos",decorators:[e=>t.createElement(w,null,t.createElement(u,{title:"New column button",description:t.createElement(i,null,"A new column button can be created using the ",t.createElement(p,null,"rightElement"),".")},t.createElement(e,null)))]},o=()=>{const{cols:e,getCellContent:a}=d(10,!0),s=t.useMemo(()=>e.map(m=>({...m,grow:1})),[e]);return t.createElement(c,{...C,getCellContent:a,columns:s,rightElement:t.createElement(E,null,t.createElement("button",{onClick:()=>window.alert("Add a column!")},"+")),rightElementProps:{fill:!1,sticky:!1},rows:3e3,rowMarkers:"both"})};var n,r,l;o.parameters={...o.parameters,docs:{...(n=o.parameters)==null?void 0:n.docs,source:{originalSource:`() => {
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
}`,...(l=(r=o.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};const S=["NewColumnButton"];export{o as NewColumnButton,S as __namedExportsOrder,R as default};
