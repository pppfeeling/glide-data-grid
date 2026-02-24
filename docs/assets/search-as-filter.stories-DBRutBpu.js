import{R as e}from"./iframe-CB3jNLId.js";import{C as r,b as w}from"./image-window-loader-DtBhR23y.js";import{D as f}from"./data-editor-all-VbTXgUdc.js";import{B as V,D as y,a as E,d as R}from"./utils-CZdCQylj.js";import{S as D}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./scrolling-data-grid-xxMWlw8S.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(D,null,e.createElement(V,{title:"Filtering down to search results",description:e.createElement(e.Fragment,null,e.createElement(y,null,"You can update your grid however you want based on search inputs."))},e.createElement(o,null)))]},a=()=>{const{cols:o,getCellContent:h,onColumnResize:m,setCellValue:S}=E(),[d,s]=e.useState(!1),[p,C]=e.useState({rows:r.empty(),columns:r.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(s(g=>!g),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[n,l]=e.useState("");return e.createElement(f,{...R,searchResults:[],getCellContent:h,getCellsForSelection:!0,gridSelection:p,onGridSelectionChange:C,columns:o,onCellEdited:S,onColumnResize:m,searchValue:n,onSearchValueChange:l,showSearch:d,onSearchClose:()=>{s(!1),l("")},rows:n.length===0?1e4:n.length})};var c,i,u;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
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
}`,...(u=(i=a.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};const _=["SearchAsFilter"];export{a as SearchAsFilter,_ as __namedExportsOrder,P as default};
