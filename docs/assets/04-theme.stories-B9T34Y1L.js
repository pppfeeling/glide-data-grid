import{R as e}from"./iframe-BiMpfC1x.js";import{g as T}from"./image-window-loader-DCZwJCoB.js";import{D as p}from"./data-editor-all-D0YZoO_n.js";import{a as k,D as w,P as h,M as R,d as x}from"./utils-CZDpDWvW.js";import{S as D}from"./story-utils-Dj9cimTO.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-D1BBloZG.js";import"./marked.esm-junou-0M.js";import"./flatten-B48GLVnS.js";import"./scrolling-data-grid-W_4ADNho.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const U={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(D,null,e.createElement(l,null))]},F={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"#b8b8b8",textLight:"#a0a0a0",textBubble:"#ffffff",bgIconHeader:"#b8b8b8",fgIconHeader:"#000000",textHeader:"#a1a1a1",textHeaderSelected:"#000000",bgCell:"#16161b",bgCellMedium:"#202027",bgHeader:"#212121",bgHeaderHasFocus:"#474747",bgHeaderHovered:"#404040",bgBubble:"#212121",bgBubbleSelected:"#000000",bgSearchResult:"#423c24",borderColor:"rgba(225,225,225,0.2)",drilldownBorder:"rgba(225,225,225,0.4)",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},B={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"rgba(255, 255, 255, 0.9)",textLight:"rgba(255, 255, 255, 0.7)",textBubble:"#000000",bgIconHeader:"#880000",fgIconHeader:"#ff5555",textHeader:"rgba(0, 0, 0, 0.9)",textHeaderSelected:"#000000",bgCell:"#ff0000",bgCellMedium:"#ff4d4d",bgHeader:"#f3f300",bgHeaderHasFocus:"#eeee00",bgHeaderHovered:"#e0e000",bgBubble:"#ffff00",bgBubbleSelected:"#ffff00",bgSearchResult:"#423c24",borderColor:"#ffff00",drilldownBorder:"#ffff00",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",roundingRadius:6},v=T(),I=["accentColor","accentLight","textDark","textMedium","textLight","textBubble","bgIconHeader","fgIconHeader","textHeader","textHeaderSelected","bgCell","bgCellMedium","bgHeader","bgHeaderHasFocus","bgHeaderHovered","bgBubble","bgBubbleSelected","bgSearchResult","borderColor","drilldownBorder","linkColor","headerFontStyle","baseFontStyle","fontFamily"],O=["accentColor","accentLight","textDark","textMedium","textLight","textBubble","bgIconHeader","fgIconHeader","textHeader","textHeaderSelected","bgCell","bgCellMedium","bgHeader","bgHeaderHasFocus","bgHeaderHovered","bgBubble","bgBubbleSelected","bgSearchResult","borderColor","drilldownBorder","linkColor"],M=({theme:l,setTheme:d})=>{const[u,b]=e.useState(l);e.useEffect(()=>{b(l)},[l]);const c=(t,n)=>{d(r=>({...r,[t]:n}))},a=(t,n)=>{b(r=>({...r,[t]:n}))},g=t=>{if(t==null)return"#000000";if(t.startsWith("#")&&(/^#[0-9A-F]{6}$/i.test(t)||/^#[0-9A-F]{3}$/i.test(t)))return t;if(t.startsWith("rgb"))try{const n=t.match(/(\d+)/g);if(n&&n.length>=3){const r=parseInt(n[0]),o=parseInt(n[1]),f=parseInt(n[2]);if(r>=0&&r<=255&&o>=0&&o<=255&&f>=0&&f<=255){const s=i=>i.toString(16).padStart(2,"0");return`#${s(r)}${s(o)}${s(f)}`}}}catch{return"#000000"}return"#000000"};return e.createElement("table",{style:{width:"100%"}},e.createElement("tbody",null,I.map(t=>e.createElement("tr",{key:t},e.createElement("td",{style:{paddingRight:"10px"}},e.createElement("label",null,t)),e.createElement("td",null,e.createElement("div",{style:{display:"flex",alignItems:"center"}},e.createElement("input",{style:{width:"100%"},type:"text",value:u[t]??"",onChange:n=>a(t,n.target.value),onBlur:n=>c(t,n.target.value)}),O.includes(t)&&e.createElement("input",{type:"color",value:g(u[t]),onChange:n=>{a(t,n.target.value),c(t,n.target.value)},style:{marginLeft:"4px",minWidth:"24px"}})))))))},m=()=>{let{cols:l,getCellContent:d}=k();l=l.map((r,o)=>o===0?{...r,themeOverride:{bgCell:"#f0f9ff",textDark:"#0c4a6e"}}:o===3?{...r,themeOverride:{bgCell:"#f0fdf4",textDark:"#14532d",accentColor:"#22c55e"}}:r);const u=(r,o)=>{if(r==="Number")return o>50?{bgCell:"#fffce7",textDark:"#14532d"}:{bgCell:"#eeece2",textDark:"#7f1d1d"}},b=e.useCallback(r=>{var C;const[o,f]=r,s=(C=l[o])==null?void 0:C.title,i=d(r);if(i.kind==="number"){const S=u(s,i.data);return{...i,themeOverride:S}}return i},[d]),[c,a]=e.useState(v),[g,t]=e.useState(1e3),n=e.useCallback(r=>{if(r%3===0)return{bgCell:"#f0f9ff",textDark:"#0c4a6e",borderColor:"#4F46E5",horizontalBorderColor:"#818CF8"}},[]);return e.createElement("div",{style:{display:"flex",backgroundColor:"#2176ac"}},e.createElement("div",{style:{flexBasis:"50%",paddingRight:"10px"}},e.createElement(M,{theme:c,setTheme:a})),e.createElement("div",{style:{flexBasis:"50%"}},e.createElement(w,null,e.createElement("div",{style:{display:"flex"}},e.createElement("div",null,"01. ",e.createElement(h,null,"global")," - theme prop (object 지정)",e.createElement("br",null),"02. ",e.createElement(h,null,"row")," - getRowThemeOverride prop (object 지정)",e.createElement("br",null),"03. ",e.createElement(h,null,"column")," - cols prop (object 정의에서 themeOverride)",e.createElement("br",null),"04. ",e.createElement(h,null,"cell")," - getCellContent prop (return 값 object 에서 themeOverride)",e.createElement("br",null)," 이렇게 4곳에서 theme 변수를 이용해 style변경 가능"))),e.createElement(R,null,e.createElement("button",{onClick:()=>a(v)},"Light")," or"," ",e.createElement("button",{onClick:()=>a(F)},"Dark")," even"," ",e.createElement("button",{onClick:()=>a(B)},"Hotdog Stand")),e.createElement(p,{...x,height:"49%",theme:c,getCellContent:d,columns:l,rows:g}),e.createElement("div",{style:{height:"12px",width:"100%",backgroundColor:"#2176ac"}}),e.createElement(p,{...x,height:"49%",theme:c,getCellContent:b,columns:l,rows:g,getRowThemeOverride:n,highlightRegions:[{color:"#ffff00",range:{x:1,y:1,width:3,height:5}},{color:"#ff0000",range:{x:0,y:0,width:1,height:100}}]})))};m.storyName="04. Theme";var E,y,H;m.parameters={...m.parameters,docs:{...(E=m.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  let {
    cols,
    getCellContent,
    onColumnResize,
    setCellValue
  } = useAllMockedKinds();
  cols = cols.map((col, index) => {
    if (index === 0) {
      return {
        ...col,
        themeOverride: {
          bgCell: "#f0f9ff",
          textDark: "#0c4a6e"
        }
      };
    } else if (index === 3) {
      return {
        ...col,
        themeOverride: {
          bgCell: "#f0fdf4",
          textDark: "#14532d",
          accentColor: "#22c55e"
        }
      };
    }
    return col;
  });
  const getValueTheme = (columnId: string, value: any) => {
    if (columnId === "Number") {
      return value > 50 ? {
        bgCell: "#fffce7",
        textDark: "#14532d"
      } : {
        bgCell: "#eeece2",
        textDark: "#7f1d1d"
      };
    }
    return undefined;
  };
  const getCellContentWithTheme = React.useCallback((item: Item) => {
    const [col, row] = item;
    const colId = cols[col]?.title as string;
    const baseCell = getCellContent(item);
    if (baseCell.kind === "number") {
      const theme = getValueTheme(colId, baseCell.data as number);
      return {
        ...baseCell,
        themeOverride: theme
      };
    }
    return baseCell;
  }, [getCellContent]);
  const [theme, setTheme] = React.useState<Partial<Theme>>(lightTheme);
  const [numRows, setNumRows] = React.useState(1000);
  const getRowThemeOverride = React.useCallback((row: number) => {
    if (row % 3 === 0) {
      return {
        bgCell: "#f0f9ff",
        textDark: "#0c4a6e",
        borderColor: "#4F46E5",
        horizontalBorderColor: "#818CF8"
      };
    }
    return undefined;
  }, []);
  return <div style={{
    display: "flex",
    backgroundColor: "#2176ac"
  }}>
                <div style={{
      flexBasis: "50%",
      paddingRight: "10px"
    }}>
                    <ThemeEditor theme={theme} setTheme={setTheme} />
                </div>
                <div style={{
      flexBasis: "50%"
    }}>
                    <Description>
                        <div style={{
          display: "flex"
        }}>
                            <div>
                                01. <PropName>global</PropName> - theme prop (object 지정)
                                <br />
                                02. <PropName>row</PropName> - getRowThemeOverride prop (object 지정)
                                <br />
                                03. <PropName>column</PropName> - cols prop (object 정의에서 themeOverride)
                                <br />
                                04. <PropName>cell</PropName> - getCellContent prop (return 값 object 에서
                                themeOverride)
                                <br /> 이렇게 4곳에서 theme 변수를 이용해 style변경 가능
                            </div>
                           
                        </div>
                    </Description>
                    <MoreInfo>
                        <button onClick={() => setTheme(lightTheme)}>Light</button> or{" "}
                        <button onClick={() => setTheme(darkTheme)}>Dark</button> even{" "}
                        <button onClick={() => setTheme(hotdogStand)}>Hotdog Stand</button>
                    </MoreInfo>
                     <DataEditor {...defaultProps} height={"49%"} theme={theme} getCellContent={getCellContent} columns={cols} rows={numRows} />
                    <div style={{
        height: "12px",
        width: "100%",
        backgroundColor: "#2176ac"
      }}></div>
                    <DataEditor {...defaultProps} height={"49%"} theme={theme} getCellContent={getCellContentWithTheme} columns={cols} rows={numRows} getRowThemeOverride={getRowThemeOverride} highlightRegions={[{
        color: "#ffff00",
        range: {
          x: 1,
          // 시작 컬럼
          y: 1,
          // 시작 행
          width: 3,
          // 너비 (컬럼 수)
          height: 5 // 높이 (행 수)
        }
      }, {
        color: "#ff0000",
        range: {
          x: 0,
          y: 0,
          width: 1,
          height: 100
        }
      }]} />
                </div>
            
           
        </div>;
}`,...(H=(y=m.parameters)==null?void 0:y.docs)==null?void 0:H.source}}};const q=["ThemeS"];export{m as ThemeS,q as __namedExportsOrder,U as default};
