import{R as e}from"./iframe-Cdn7Weob.js";import{D as m}from"./data-editor-all-CCXuWirP.js";import{B as C,D as p,a as u,d as g}from"./utils-Cs_JJNhb.js";import{S as h}from"./story-utils-NdpI15u4.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-CDJX2pm9.js";import"./throttle-BQPBlX3O.js";import"./marked.esm-Bd9Q6jcK.js";import"./flatten-DaOm-iAz.js";import"./scrolling-data-grid-8nsunyS7.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(h,null,e.createElement(C,{title:"Lotsa cell kinds",description:e.createElement(p,null,"Data grid supports plenty cell kinds. Anything under .")},e.createElement(l,null)))]},t=()=>{const{cols:l,getCellContent:i,onColumnResize:s,setCellValue:a}=u(),c=d=>i(d);return e.createElement(m,{...g,getCellContent:c,columns:l,onCellEdited:a,onPaste:!0,rowHeight:44,onColumnResize:s,highlightRegions:[{color:"#ff00ff33",range:{x:1,y:1,width:3,height:3}}],cellActivationBehavior:"second-click",editorBloom:[-4,-4],rows:1e3})};t.storyName="03. Cell";var o,n,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const getCellContentNew = (cell: Item): GridCell => {
    let ret: GridCell = getCellContent(cell);
    return ret;
  };
  return <DataEditor {...defaultProps} getCellContent={getCellContentNew} columns={cols} onCellEdited={setCellValue} onPaste={true} rowHeight={44} onColumnResize={onColumnResize} highlightRegions={[{
    color: "#ff00ff33",
    range: {
      x: 1,
      y: 1,
      width: 3,
      height: 3
    }
  }]} cellActivationBehavior="second-click" editorBloom={[-4, -4]} rows={1000} />;
}`,...(r=(n=t.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const N=["AllCellKinds"];export{t as AllCellKinds,N as __namedExportsOrder,G as default};
