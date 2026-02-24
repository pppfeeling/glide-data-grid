import{R as e}from"./iframe-CB3jNLId.js";import{D as u}from"./data-editor-all-VbTXgUdc.js";import{B as p,D as C,P as f,u as R,d as g}from"./utils-CZdCQylj.js";import{S as h}from"./marked.esm-By-yLKzP.js";import{A as w,m as s}from"./image-window-loader-DtBhR23y.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./scrolling-data-grid-xxMWlw8S.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(h,null,e.createElement(p,{title:"Custom renderers",description:e.createElement(C,null,"Override internal cell renderers by passing the "," ",e.createElement(f,null,"renderers")," prop.")},e.createElement(n,null)))]},t=()=>{const{cols:n,getCellContent:i}=R(100,!0,!0),m=e.useMemo(()=>[...w,{...s,draw:l=>{const{ctx:a,rect:r}=l;a.fillStyle="#ffe0e0",a.fillRect(r.x,r.y,r.width,r.height),s.draw(l,l.cell)}}],[]);return e.createElement(u,{...g,getCellContent:i,columns:n,rows:200,rowMarkers:"both",renderers:m})};var o,c,d;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`() => {
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const I=["OverrideMarkerRenderer"];export{t as OverrideMarkerRenderer,I as __namedExportsOrder,A as default};
