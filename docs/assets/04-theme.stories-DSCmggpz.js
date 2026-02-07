import{R as e}from"./iframe-BRH0sI4T.js";import{g as S}from"./image-window-loader-C07KUb0y.js";import{D as f}from"./data-editor-all-Cmfpg6eG.js";import{a as w,D as T,P as u,M as k,d as C}from"./utils-CcTSkric.js";import{S as R}from"./story-utils-Cr9WLRtl.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-CLO2z2b9.js";import"./marked.esm-C8Dy4b6m.js";import"./index-CNdQ_i0E.js";import"./flatten-DLKYwgY1.js";import"./scrolling-data-grid-DdPqTsp-.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const Q={title:"Glide-Data-Grid/DataEditor Demos",decorators:[t=>e.createElement(R,null,e.createElement(t,null))]},D={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"#b8b8b8",textLight:"#a0a0a0",textBubble:"#ffffff",bgIconHeader:"#b8b8b8",fgIconHeader:"#000000",textHeader:"#a1a1a1",textHeaderSelected:"#000000",bgCell:"#16161b",bgCellMedium:"#202027",bgHeader:"#212121",bgHeaderHasFocus:"#474747",bgHeaderHovered:"#404040",bgBubble:"#212121",bgBubbleSelected:"#000000",bgSearchResult:"#423c24",borderColor:"rgba(225,225,225,0.2)",drilldownBorder:"rgba(225,225,225,0.4)",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif"},B={accentColor:"#8c96ff",accentLight:"rgba(202, 206, 255, 0.253)",textDark:"#ffffff",textMedium:"rgba(255, 255, 255, 0.9)",textLight:"rgba(255, 255, 255, 0.7)",textBubble:"#000000",bgIconHeader:"#880000",fgIconHeader:"#ff5555",textHeader:"rgba(0, 0, 0, 0.9)",textHeaderSelected:"#000000",bgCell:"#ff0000",bgCellMedium:"#ff4d4d",bgHeader:"#f3f300",bgHeaderHasFocus:"#eeee00",bgHeaderHovered:"#e0e000",bgBubble:"#ffff00",bgBubbleSelected:"#ffff00",bgSearchResult:"#423c24",borderColor:"#ffff00",drilldownBorder:"#ffff00",linkColor:"#4F5DFF",headerFontStyle:"bold 14px",baseFontStyle:"13px",fontFamily:"Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",roundingRadius:6},p=S(),F=["accentColor","accentLight","textDark","textMedium","textLight","textBubble","bgIconHeader","fgIconHeader","textHeader","textHeaderSelected","bgCell","bgCellMedium","bgHeader","bgHeaderHasFocus","bgHeaderHovered","bgBubble","bgBubbleSelected","bgSearchResult","borderColor","drilldownBorder","linkColor","headerFontStyle","baseFontStyle","fontFamily"],I=new Set(["accentColor","accentLight","textDark","textMedium","textLight","textBubble","bgIconHeader","fgIconHeader","textHeader","textHeaderSelected","bgCell","bgCellMedium","bgHeader","bgHeaderHasFocus","bgHeaderHovered","bgBubble","bgBubbleSelected","bgSearchResult","borderColor","drilldownBorder","linkColor"]),O=t=>{if(t==null)return"#000000";if(t.startsWith("#")&&(/^#[\da-f]{6}$/i.test(t)||/^#[\da-f]{3}$/i.test(t)))return t;if(t.startsWith("rgb"))try{const r=t.match(/(\d+)/g);if(r&&r.length>=3){const a=parseInt(r[0]),c=parseInt(r[1]),i=parseInt(r[2]);if(a>=0&&a<=255&&c>=0&&c<=255&&i>=0&&i<=255){const l=n=>n.toString(16).padStart(2,"0");return`#${l(a)}${l(c)}${l(i)}`}}}catch{return"#000000"}return"#000000"},M=({theme:t,setTheme:r})=>{const[a,c]=e.useState(t);e.useEffect(()=>{c(t)},[t]);const i=(n,o)=>{r(d=>({...d,[n]:o}))},l=(n,o)=>{c(d=>({...d,[n]:o}))};return e.createElement("table",{style:{width:"100%"}},e.createElement("tbody",null,F.map(n=>e.createElement("tr",{key:n},e.createElement("td",{style:{paddingRight:"10px"}},e.createElement("label",null,n)),e.createElement("td",null,e.createElement("div",{style:{display:"flex",alignItems:"center"}},e.createElement("input",{style:{width:"100%"},type:"text",value:a[n]??"",onChange:o=>l(n,o.target.value),onBlur:o=>i(n,o.target.value)}),I.has(n)&&e.createElement("input",{type:"color",value:O(a[n]),onChange:o=>{l(n,o.target.value),i(n,o.target.value)},style:{marginLeft:"4px",minWidth:"24px"}})))))))},P=(t,r)=>{if(t==="Number")return r>50?{bgCell:"#fffce7",textDark:"#14532d"}:{bgCell:"#eeece2",textDark:"#7f1d1d"}},m=()=>{const{cols:t,getCellContent:r}=w(),a=t.map((s,b)=>b===0?{...s,themeOverride:{bgCell:"#f0f9ff",textDark:"#0c4a6e"}}:b===3?{...s,themeOverride:{bgCell:"#f0fdf4",textDark:"#14532d",accentColor:"#22c55e"}}:s),c=e.useCallback(s=>{var h;const[b,N]=s,H=(h=a[b])==null?void 0:h.title,g=r(s);if(g.kind==="number"){const y=P(H,g.data);return{...g,themeOverride:y}}return g},[r]),[i,l]=e.useState(p),[n,o]=e.useState(1e3),d=e.useCallback(s=>{if(s%3===0)return{bgCell:"#f0f9ff",textDark:"#0c4a6e",borderColor:"#4F46E5",horizontalBorderColor:"#818CF8"}},[]);return e.createElement("div",{style:{display:"flex",backgroundColor:"#2176ac"}},e.createElement("div",{style:{flexBasis:"50%",paddingRight:"10px"}},e.createElement(M,{theme:i,setTheme:l})),e.createElement("div",{style:{flexBasis:"50%"}},e.createElement(T,null,e.createElement("div",{style:{display:"flex"}},e.createElement("div",null,"01. ",e.createElement(u,null,"global")," - theme prop (object 지정)",e.createElement("br",null),"02. ",e.createElement(u,null,"row")," - getRowThemeOverride prop (object 지정)",e.createElement("br",null),"03. ",e.createElement(u,null,"column")," - cols prop (object 정의에서 themeOverride)",e.createElement("br",null),"04. ",e.createElement(u,null,"cell")," - getCellContent prop (return 값 object 에서 themeOverride)",e.createElement("br",null)," 이렇게 4곳에서 theme 변수를 이용해 style변경 가능"))),e.createElement(k,null,e.createElement("button",{onClick:()=>l(p)},"Light")," or"," ",e.createElement("button",{onClick:()=>l(D)},"Dark")," even"," ",e.createElement("button",{onClick:()=>l(B)},"Hotdog Stand")),e.createElement(f,{...C,height:"49%",theme:i,getCellContent:r,columns:a,rows:n}),e.createElement("div",{style:{height:"12px",width:"100%",backgroundColor:"#2176ac"}}),e.createElement(f,{...C,height:"49%",theme:i,getCellContent:c,columns:a,rows:n,getRowThemeOverride:d,highlightRegions:[{color:"#ffff00",range:{x:1,y:1,width:3,height:5}},{color:"#ff0000",range:{x:0,y:0,width:1,height:100}}]})))};m.storyName="04. Theme";var x,v,E;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`() => {
  const {
    cols: initialCols,
    getCellContent
  } = useAllMockedKinds();
  const cols = initialCols.map((col, index) => {
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
}`,...(E=(v=m.parameters)==null?void 0:v.docs)==null?void 0:E.source}}};const X=["ThemeS"];export{m as ThemeS,X as __namedExportsOrder,Q as default};
