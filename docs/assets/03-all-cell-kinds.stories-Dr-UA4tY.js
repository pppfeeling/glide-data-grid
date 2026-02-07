import{R as e}from"./iframe-ey5Dtog6.js";import{D as d}from"./data-editor-all-CDfZm3qY.js";import{B as p,D as C,a as u,d as g}from"./utils-EddAIe-q.js";import{S as h}from"./story-utils-DfKRaPNL.js";import"./preload-helper-C1FmrZbK.js";import"./index-D62X44zt.js";import"./image-window-loader-Dk75Znu1.js";import"./throttle-CTAHWGOq.js";import"./marked.esm-C0N8jT3i.js";import"./flatten-D4WOz0LH.js";import"./scrolling-data-grid-CuqDAz7c.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const N={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(h,null,e.createElement(p,{title:"Lotsa cell kinds",description:e.createElement(C,null,"Data grid supports plenty cell kinds. Anything under .")},e.createElement(l,null)))]},t=()=>{const{cols:l,getCellContent:i,onColumnResize:s,setCellValue:a}=u(),c=m=>i(m);return e.createElement(d,{...g,getCellContent:c,columns:l,onCellEdited:a,onPaste:!0,rowHeight:44,onColumnResize:s,highlightRegions:[{color:"#ff00ff33",range:{x:1,y:1,width:3,height:3}}],cellActivationBehavior:"second-click",editorBloom:[-4,-4],rows:1e3})};t.storyName="03. Cell";var o,n,r;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
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
}`,...(r=(n=t.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};const P=["AllCellKinds"];export{t as AllCellKinds,P as __namedExportsOrder,N as default};
