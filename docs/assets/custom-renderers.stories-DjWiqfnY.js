import{R as e}from"./iframe-BCyg8ypy.js";import{D as p}from"./data-editor-all-C_BBxQFz.js";import{B as u,D as C,P as f,u as R,d as g}from"./utils-BlgGaLUf.js";import{S as h}from"./story-utils-Dga44QbK.js";import{S as w,Z as o}from"./image-window-loader-CvVz5YUq.js";import"./preload-helper-C1FmrZbK.js";import"./index-DkVHgzmp.js";import"./throttle-PvXwe8rS.js";import"./flatten-DVhM32tQ.js";import"./scrolling-data-grid-Bf9EOU5a.js";import"./marked.esm-C2vt5mN_.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(h,null,e.createElement(u,{title:"Custom renderers",description:e.createElement(C,null,"Override internal cell renderers by passing the "," ",e.createElement(f,null,"renderers")," prop.")},e.createElement(n,null)))]},t=()=>{const{cols:n,getCellContent:i}=R(100,!0,!0),m=e.useMemo(()=>[...w,{...o,draw:l=>{const{ctx:a,rect:r}=l;a.fillStyle="#ffe0e0",a.fillRect(r.x,r.y,r.width,r.height),o.draw(l,l.cell)}}],[]);return e.createElement(p,{...g,getCellContent:i,columns:n,rows:200,rowMarkers:"both",renderers:m})};var s,c,d;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`() => {
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
        markerCellRenderer.draw(args as any, args.cell as any);
      }
    } as InternalCellRenderer<InnerGridCell>];
  }, []);
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={200} rowMarkers="both" renderers={renderers} />;
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const _=["OverrideMarkerRenderer"];export{t as OverrideMarkerRenderer,_ as __namedExportsOrder,A as default};
