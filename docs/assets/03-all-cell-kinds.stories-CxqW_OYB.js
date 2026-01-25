import{R as e}from"./iframe-DDTcUdjc.js";import{D as m}from"./data-editor-all-DTNR_ELW.js";import{B as C,D as p,a as u,d as g}from"./utils-BMaH_XUh.js";import{S as h}from"./story-utils-tSAhB5KM.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-Ba2dfKLx.js";import"./throttle-C2-49NaF.js";import"./marked.esm-jmFFBRfF.js";import"./flatten-BavRFQMS.js";import"./scrolling-data-grid-CqIwtj2o.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const G={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(h,null,e.createElement(C,{title:"Lotsa cell kinds",description:e.createElement(p,null,"Data grid supports plenty cell kinds. Anything under .")},e.createElement(l,null)))]},t=()=>{const{cols:l,getCellContent:s,onColumnResize:i,setCellValue:a}=u(),c=d=>s(d);return e.createElement(m,{...g,getCellContent:c,columns:l,onCellEdited:a,onPaste:!0,rowHeight:44,onColumnResize:i,highlightRegions:[{color:"#ff00ff33",range:{x:1,y:1,width:3,height:3}}],cellActivationBehavior:"second-click",editorBloom:[-4,-4],rows:1e3})};t.storyName="03. Cell";var o,n,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const getCellContentNew = (cell: Item): GridCell => {
    const ret: GridCell = getCellContent(cell);
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
