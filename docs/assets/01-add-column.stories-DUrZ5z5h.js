import{R as e}from"./iframe-DR0htr12.js";import{D as A}from"./data-editor-all-h35TPI70.js";import{B as y,D as E,M as H,u as I,d as D}from"./utils-bdJIrvhN.js";import{S as O}from"./story-utils-BqPiYSah.js";import{u as z}from"./image-window-loader-CRAGQmiw.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-DxPOdbKn.js";import"./flatten-Cxl3d27c.js";import"./scrolling-data-grid-DH2GRZHx.js";import"./marked.esm-u7llhJro.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const{fn:w}=__STORYBOOK_MODULE_TEST__,j={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(O,null,e.createElement(y,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(E,null,"You can add and remove columns at your disposal"),e.createElement(H,null,"Use the story's controls to change the number of columns 컬럼추가삭제, 컬럼고정, 컬럼리사이즈, 컬러정의"))},e.createElement(s,null)))]},r=s=>{const a=z(),{cols:u,getCellContent:m}=I(s.columnsCount),[d,C]=e.useState(()=>u.map((n,o)=>({...n}))),k=e.useCallback((n,o)=>{C(l=>{const t=l.findIndex(S=>S.title===n.title),c=[...l];return c.splice(t,1,{...l[t],width:o}),c})},[]),[p,i]=e.useState(null),x=e.useCallback((n,o)=>{C(l=>{const t=[...l],[c]=t.splice(n,1);return t.splice(o,0,c),t}),i(o)},[]),b=e.useCallback(n=>{const[o,l]=n,t=u.findIndex(c=>c.title===d[o].title);return m([t,l])},[u,m,d]),h=e.useCallback(n=>{i(n)},[]),M=e.useCallback(n=>{i(null),s.onCellClicked(n)},[s]),R=e.useMemo(()=>d.map((n,o)=>{const{themeOverride:l,...t}=n;return o===p?{...t,themeOverride:{bgHeader:a.accentColor,bgHeaderHovered:a.accentColor,textHeader:a.accentFg}}:{...t,themeOverride:void 0}}),[d,p,a]);return e.createElement(A,{...D,rowMarkers:"number",getCellContent:b,rows:200,freezeColumns:1,columns:R,onColumnResize:k,onColumnMoved:x,onHeaderClicked:h,onCellClicked:M,onCellActivated:s.onCellActivated,freezeTrailingRows:1})};r.storyName="01. Column";r.args={columnsCount:10,onCellClicked:w(),onCellActivated:w()};r.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var g,v,f;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`(p: AddColumnsProps) => {
  const theme = useTheme();
  const {
    cols: rawCols,
    getCellContent
  } = useMockDataGenerator(p.columnsCount);
  const [cols, setCols] = React.useState(() => rawCols.map((c, index): GridColumn => {
    /**
    if(index === 0) {
    return {...c, grow: 1}
    } else if(index === 1) {
    return {...c, width: 400}
    }
    */
    return {
      ...c
    };
  }));
  const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
    setCols(prevColsMap => {
      const index = prevColsMap.findIndex(ci => ci.title === column.title);
      const newArray = [...prevColsMap];
      newArray.splice(index, 1, {
        ...prevColsMap[index],
        width: newSize
      });
      return newArray;
    });
  }, []);
  const [selectedColumn, setSelectedColumn] = React.useState<number | null>(null);
  const onColumnMoved = React.useCallback((startIndex: number, endIndex: number): void => {
    setCols(old => {
      const newCols = [...old];
      const [toMove] = newCols.splice(startIndex, 1);
      newCols.splice(endIndex, 0, toMove);
      return newCols;
    });
    setSelectedColumn(endIndex);
  }, []);
  const getCellContentMangled = React.useCallback((item: any): any => {
    const [col, row] = item;
    const remappedCol = rawCols.findIndex(c => c.title === cols[col].title);
    return getCellContent([remappedCol, row]);
  }, [rawCols, getCellContent, cols]);
  const onHeaderClicked = React.useCallback((colIndex: number) => {
    setSelectedColumn(colIndex);
  }, []);
  const onCellClicked = React.useCallback((cell: Item) => {
    setSelectedColumn(null);
    p.onCellClicked(cell);
  }, [p]);
  const displayCols = React.useMemo(() => {
    return cols.map((c, i) => {
      const {
        themeOverride,
        ...rest
      } = c;
      if (i === selectedColumn) {
        return {
          ...rest,
          themeOverride: {
            bgHeader: theme.accentColor,
            bgHeaderHovered: theme.accentColor,
            textHeader: theme.accentFg
          }
        };
      }
      return {
        ...rest,
        themeOverride: undefined
      };
    });
  }, [cols, selectedColumn, theme]);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContentMangled} rows={200} freezeColumns={1} columns={displayCols} onColumnResize={onColumnResize} onColumnMoved={onColumnMoved} onHeaderClicked={onHeaderClicked} onCellClicked={onCellClicked} onCellActivated={p.onCellActivated} freezeTrailingRows={1} />;
}`,...(f=(v=r.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};const q=["AddColumns"];export{r as AddColumns,q as __namedExportsOrder,j as default};
