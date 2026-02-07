import{R as e}from"./iframe-ey5Dtog6.js";import{D as i}from"./data-editor-all-CDfZm3qY.js";import{B as c,D as u,P as r,M as p,u as d,d as h}from"./utils-EddAIe-q.js";import{S as C}from"./story-utils-DfKRaPNL.js";import"./preload-helper-C1FmrZbK.js";import"./index-D62X44zt.js";import"./image-window-loader-Dk75Znu1.js";import"./throttle-CTAHWGOq.js";import"./marked.esm-C0N8jT3i.js";import"./flatten-D4WOz0LH.js";import"./scrolling-data-grid-CuqDAz7c.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const v={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(c,{title:"Resizable columns",description:e.createElement(e.Fragment,null,e.createElement(u,null,"You can resize columns by dragging their edges, as long as you respond to the"," ",e.createElement(r,null,"onColumnResize")," prop."),e.createElement(p,null,"By setting the ",e.createElement(r,null,"overscrollX")," property extra space can be allocated at the end of the grid to allow for easier resizing of the final column. You can highlight multiple columns to resize them all at once."))},e.createElement(t,null)))]},o=()=>{const{cols:t,getCellContent:s,onColumnResize:m}=d(60);return e.createElement(i,{...h,getCellContent:s,columns:t,rowMarkers:"both",overscrollX:200,overscrollY:200,maxColumnAutoWidth:500,maxColumnWidth:2e3,rows:50,scaleToRem:!0,theme:e.useMemo(()=>({baseFontStyle:"0.8125rem",headerFontStyle:"600 0.8125rem",editorFontSize:"0.8125rem"}),[]),onColumnResize:m})};var l,n,a;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize
  } = useMockDataGenerator(60);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rowMarkers="both" overscrollX={200} overscrollY={200} maxColumnAutoWidth={500} maxColumnWidth={2000} rows={50} scaleToRem={true} theme={React.useMemo(() => ({
    baseFontStyle: "0.8125rem",
    headerFontStyle: "600 0.8125rem",
    editorFontSize: "0.8125rem"
  }), [])} onColumnResize={onColumnResize} />;
}`,...(a=(n=o.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const w=["ResizableColumns"];export{o as ResizableColumns,w as __namedExportsOrder,v as default};
