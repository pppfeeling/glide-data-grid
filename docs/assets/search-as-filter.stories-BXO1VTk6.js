import{R as e}from"./iframe-DNtM7szx.js";import{C as r,u as w}from"./image-window-loader-V3wfVhga.js";import{D as f}from"./data-editor-all-NenJfBez.js";import{B as V,D as y,a as E,d as R}from"./utils-B2SM65BO.js";import{S as D}from"./story-utils-7kNrYx-7.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-DwxcRZC0.js";import"./marked.esm-Bk15hlo4.js";import"./flatten-Cfvwb28E.js";import"./scrolling-data-grid-Cva-q6bk.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const L={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>e.createElement(D,null,e.createElement(V,{title:"Filtering down to search results",description:e.createElement(e.Fragment,null,e.createElement(y,null,"You can update your grid however you want based on search inputs."))},e.createElement(a,null)))]},o=()=>{const{cols:a,getCellContent:m,onColumnResize:h,setCellValue:S}=E(),[p,s]=e.useState(!1),[d,C]=e.useState({rows:r.empty(),columns:r.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(s(g=>!g),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[n,l]=e.useState("");return e.createElement(f,{...R,searchResults:[],getCellContent:m,getCellsForSelection:!0,gridSelection:d,onGridSelectionChange:C,columns:a,onCellEdited:S,onColumnResize:h,searchValue:n,onSearchValueChange:l,showSearch:p,onSearchClose:()=>{s(!1),l("")},rows:n.length===0?1e4:n.length})};var c,i,u;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  const [showSearch, setShowSearch] = React.useState(false);
  const [selection, setSelection] = React.useState<GridSelection>({
    rows: CompactSelection.empty(),
    columns: CompactSelection.empty()
  });
  useEventListener("keydown", React.useCallback(event => {
    if ((event.ctrlKey || event.metaKey) && event.code === "KeyF") {
      setShowSearch(cv => !cv);
      event.stopPropagation();
      event.preventDefault();
    }
  }, []), window, false, true);
  const [searchValue, setSearchValue] = React.useState("");
  return <DataEditor {...defaultProps} searchResults={[]} getCellContent={getCellContent} getCellsForSelection={true} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} searchValue={searchValue} onSearchValueChange={setSearchValue} showSearch={showSearch} onSearchClose={() => {
    setShowSearch(false);
    setSearchValue("");
  }} rows={searchValue.length === 0 ? 10_000 : searchValue.length} />;
}`,...(u=(i=o.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const M=["SearchAsFilter"];export{o as SearchAsFilter,M as __namedExportsOrder,L as default};
