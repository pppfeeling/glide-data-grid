import{R as e}from"./iframe-BRH0sI4T.js";import{D as f}from"./data-editor-all-Cmfpg6eG.js";import{B as p,D as w,P as v,a as R,d as g}from"./utils-CcTSkric.js";import{S as C}from"./story-utils-Cr9WLRtl.js";import"./preload-helper-C1FmrZbK.js";import"./index-CNdQ_i0E.js";import"./image-window-loader-C07KUb0y.js";import"./throttle-CLO2z2b9.js";import"./marked.esm-C8Dy4b6m.js";import"./flatten-DLKYwgY1.js";import"./scrolling-data-grid-DdPqTsp-.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(C,null,e.createElement(p,{title:"Row Hover Effect",description:e.createElement(w,null,"Through careful usage of the ",e.createElement(v,null,"onItemHovered")," callback it is possible to easily create a row hover effect.")},e.createElement(t,null)))]},r=()=>{const{cols:t,getCellContent:i}=R(),[n,c]=e.useState(void 0),m=e.useCallback(o=>{const[h,u]=o.location;c(o.kind!=="cell"?void 0:u)},[]),d=e.useCallback(o=>{if(o===n)return{bgCell:"#f7f7f7",bgCellMedium:"#f0f0f0"}},[n]);return e.createElement(f,{...g,rowMarkers:"both",onItemHovered:m,getCellContent:i,getRowThemeOverride:d,columns:t,rows:300})};var a,l,s;r.parameters={...r.parameters,docs:{...(a=r.parameters)==null?void 0:a.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useAllMockedKinds();
  const [hoverRow, setHoverRow] = React.useState<number | undefined>(undefined);
  const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
    const [_, row] = args.location;
    setHoverRow(args.kind !== "cell" ? undefined : row);
  }, []);
  const getRowThemeOverride = React.useCallback<GetRowThemeCallback>(row => {
    if (row !== hoverRow) return undefined;
    return {
      bgCell: "#f7f7f7",
      bgCellMedium: "#f0f0f0"
    };
  }, [hoverRow]);
  return <DataEditor {...defaultProps} rowMarkers="both" onItemHovered={onItemHovered} getCellContent={getCellContent} getRowThemeOverride={getRowThemeOverride} columns={cols} rows={300} />;
}`,...(s=(l=r.parameters)==null?void 0:l.docs)==null?void 0:s.source}}};const x=["RowHover"];export{r as RowHover,x as __namedExportsOrder,P as default};
