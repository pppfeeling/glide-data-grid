import{R as e}from"./iframe-Cdn7Weob.js";import{D as R}from"./data-editor-all-CCXuWirP.js";import{B as S,D,M as y,u as E,d as H}from"./utils-Cs_JJNhb.js";import{S as O}from"./story-utils-NdpI15u4.js";import{u as z}from"./image-window-loader-CDJX2pm9.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-BQPBlX3O.js";import"./flatten-DaOm-iAz.js";import"./scrolling-data-grid-8nsunyS7.js";import"./marked.esm-Bd9Q6jcK.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const{fn:w}=__STORYBOOK_MODULE_TEST__,j={title:"Glide-Data-Grid/DataEditor Demos",decorators:[s=>e.createElement(O,null,e.createElement(S,{title:"Add and remove columns",description:e.createElement(e.Fragment,null,e.createElement(D,null,"You can add and remove columns at your disposal"),e.createElement(y,null,"Use the story's controls to change the number of columns 컬럼추가삭제, 컬럼고정, 컬럼리사이즈, 컬러정의"))},e.createElement(s,null)))]},r=s=>{const a=z(),{cols:i,getCellContent:m}=E(s.columnsCount),[d,C]=e.useState(()=>i.map((n,t)=>({...n}))),f=e.useCallback((n,t)=>{C(l=>{const o=l.findIndex(I=>I.title===n.title),c=[...l];return c.splice(o,1,{...l[o],width:t}),c})},[]),[p,u]=e.useState(null),k=e.useCallback((n,t)=>{C(l=>{const o=[...l],[c]=o.splice(n,1);return o.splice(t,0,c),o}),u(t)},[]),x=e.useCallback(n=>{const[t,l]=n,o=i.findIndex(c=>c.title===d[t].title);return m([o,l])},[i,m,d]),M=e.useCallback(n=>{u(n)},[]),b=e.useCallback(n=>{u(null),s.onCellClicked(n)},[s]),A=e.useMemo(()=>d.map((n,t)=>{const{themeOverride:l,...o}=n;return t===p?{...o,themeOverride:{bgHeader:a.accentColor,bgHeaderHovered:a.accentColor,textHeader:a.accentFg},indicatorIcon:"headerArrowDown"}:{...o,themeOverride:void 0,hasMenu:!0,menuIcon:"dots",indicatorIcon:"headerArrowDown"}}),[d,p,a]);return e.createElement(R,{...H,rowMarkers:"number",getCellContent:x,rows:200,freezeColumns:1,columns:A,onColumnResize:f,onColumnMoved:k,onHeaderClicked:M,onCellClicked:b,onCellActivated:s.onCellActivated,freezeTrailingRows:1})};r.storyName="01. Column";r.args={columnsCount:10,onCellClicked:w(),onCellActivated:w()};r.argTypes={columnsCount:{control:{type:"range",min:2,max:200}}};var g,h,v;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`(p: AddColumnsProps) => {
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
          },
          indicatorIcon: "headerArrowDown"
        };
      }
      return {
        ...rest,
        themeOverride: undefined,
        hasMenu: true,
        menuIcon: "dots",
        indicatorIcon: "headerArrowDown"
      };
    });
  }, [cols, selectedColumn, theme]);
  return <DataEditor {...defaultProps} rowMarkers="number" getCellContent={getCellContentMangled} rows={200} freezeColumns={1} columns={displayCols} onColumnResize={onColumnResize} onColumnMoved={onColumnMoved} onHeaderClicked={onHeaderClicked} onCellClicked={onCellClicked} onCellActivated={p.onCellActivated} freezeTrailingRows={1} />;
}`,...(v=(h=r.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const q=["AddColumns"];export{r as AddColumns,q as __namedExportsOrder,j as default};
