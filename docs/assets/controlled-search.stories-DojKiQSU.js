import{R as e}from"./iframe-CB3jNLId.js";import{C as c,b as w}from"./image-window-loader-DtBhR23y.js";import{D as R}from"./data-editor-all-VbTXgUdc.js";import{B as y,D as E,P as V,a as v,d as D}from"./utils-CZdCQylj.js";import{S as K}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./scrolling-data-grid-xxMWlw8S.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(K,null,e.createElement(y,{title:"Controlling search results",description:e.createElement(e.Fragment,null,e.createElement(E,null,"Search results can be controlled via ",e.createElement(V,null,"searchResults"),". You can implement any search algorithm you want, even a silly one."))},e.createElement(l,null)))]},s=()=>{const{cols:l,getCellContent:m,onColumnResize:S,setCellValue:p}=v(),[d,a]=e.useState(!1),[C,g]=e.useState({rows:c.empty(),columns:c.empty()});w("keydown",e.useCallback(t=>{(t.ctrlKey||t.metaKey)&&t.code==="KeyF"&&(a(n=>!n),t.stopPropagation(),t.preventDefault())},[]),window,!1,!0);const[o,r]=e.useState(""),f=e.useMemo(()=>{const t=[];for(let n=0;n<o.length;n++)t.push([3,n]);return t},[o.length]);return e.createElement(R,{...D,searchResults:f,getCellContent:m,getCellsForSelection:!0,gridSelection:C,onGridSelectionChange:g,columns:l,onCellEdited:p,onColumnResize:S,searchValue:o,onSearchValueChange:r,showSearch:d,onSearchClose:()=>{a(!1),r("")},rows:1e4})};var u,i,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`() => {
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
  const searchResults = React.useMemo(() => {
    const result: Item[] = [];
    for (let i = 0; i < searchValue.length; i++) {
      result.push([3, i]);
    }
    return result;
  }, [searchValue.length]);
  return <DataEditor {...defaultProps} searchResults={searchResults} getCellContent={getCellContent} getCellsForSelection={true} gridSelection={selection} onGridSelectionChange={setSelection} columns={cols} onCellEdited={setCellValue} onColumnResize={onColumnResize} searchValue={searchValue} onSearchValueChange={setSearchValue} showSearch={showSearch} onSearchClose={() => {
    setShowSearch(false);
    setSearchValue("");
  }} rows={10_000} />;
}`,...(h=(i=s.parameters)==null?void 0:i.docs)==null?void 0:h.source}}};const x=["ControlledSearch"];export{s as ControlledSearch,x as __namedExportsOrder,A as default};
