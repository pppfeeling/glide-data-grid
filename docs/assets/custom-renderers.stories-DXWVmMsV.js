import{R as e}from"./iframe-mK_zHxtx.js";import{D as p}from"./data-editor-all-CTMqixH8.js";import{B as u,D as C,P as f,u as R,d as g}from"./utils-C90P7WNL.js";import{S as h}from"./story-utils-CkI8_29d.js";import{A as w,m as o}from"./image-window-loader-zklk82Uu.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-B3b_RoAY.js";import"./flatten-sjXy7LIL.js";import"./scrolling-data-grid-PVQcj6dx.js";import"./marked.esm-D0OAygdb.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const b={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(h,null,e.createElement(u,{title:"Custom renderers",description:e.createElement(C,null,"Override internal cell renderers by passing the "," ",e.createElement(f,null,"renderers")," prop.")},e.createElement(n,null)))]},t=()=>{const{cols:n,getCellContent:i}=R(100,!0,!0),m=e.useMemo(()=>[...w,{...o,draw:l=>{const{ctx:a,rect:r}=l;a.fillStyle="#ffe0e0",a.fillRect(r.x,r.y,r.width,r.height),o.draw(l)}}],[]);return e.createElement(p,{...g,getCellContent:i,columns:n,rows:200,rowMarkers:"both",renderers:m})};var s,c,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100, true, true);
  const renderers = React.useMemo<readonly InternalCellRenderer<InnerGridCell>[]>(() => {
    return [...AllCellRenderers, {
      ...markerCellRenderer,
      draw: args => {
        const {
          ctx,
          rect
        } = args;
        ctx.fillStyle = "#ffe0e0";
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        markerCellRenderer.draw(args as any);
      }
    } as InternalCellRenderer<InnerGridCell>];
  }, []);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={200} rowMarkers="both" renderers={renderers} />;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const v=["OverrideMarkerRenderer"];export{t as OverrideMarkerRenderer,v as __namedExportsOrder,b as default};
