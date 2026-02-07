import{R as e}from"./iframe-ey5Dtog6.js";import{D as g}from"./data-editor-all-CDfZm3qY.js";import{u as f,B as v,D as M,P as E,d as D}from"./utils-EddAIe-q.js";import{S as P}from"./story-utils-DfKRaPNL.js";import"./preload-helper-C1FmrZbK.js";import"./index-D62X44zt.js";import"./image-window-loader-Dk75Znu1.js";import"./throttle-CTAHWGOq.js";import"./marked.esm-C0N8jT3i.js";import"./flatten-D4WOz0LH.js";import"./scrolling-data-grid-CuqDAz7c.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const N={title:"Glide-Data-Grid/DataEditor Demos",decorators:[n=>e.createElement(P,null,e.createElement(n,null))]},o=()=>{const{cols:n,getCellContent:m}=f(6),i=e.useRef(null),[p,r]=e.useState("Move the mouse over the grid"),d=e.useCallback(s=>{var a;const t=(a=i.current)==null?void 0:a.getMouseArgsForPosition(s.clientX,s.clientY,s.nativeEvent);t===void 0?r("Outside grid"):t.kind==="cell"?r(`Cell ${t.location[0]}, ${t.location[1]}`):r(t.kind)},[]);return e.createElement(v,{title:"getMouseArgsForPosition",description:e.createElement(M,null,"Use ",e.createElement(E,null,"getMouseArgsForPosition")," to translate pointer coordinates into grid locations.")},e.createElement("div",{onMouseMove:d},e.createElement(g,{...D,ref:i,columns:n,getCellContent:m,rows:1e3})),e.createElement("div",{style:{marginTop:8}},p))};var l,c,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(6);
  const ref = React.useRef<DataEditorRef>(null);
  const [info, setInfo] = React.useState<string>("Move the mouse over the grid");
  const onMouseMove = React.useCallback((ev: React.MouseEvent<HTMLDivElement>) => {
    const args = ref.current?.getMouseArgsForPosition(ev.clientX, ev.clientY, ev.nativeEvent);
    if (args === undefined) {
      setInfo("Outside grid");
    } else if (args.kind === "cell") {
      setInfo(\`Cell \${args.location[0]}, \${args.location[1]}\`);
    } else {
      setInfo(args.kind);
    }
  }, []);
  return <BeautifulWrapper title="getMouseArgsForPosition" description={<Description>
                    Use <PropName>getMouseArgsForPosition</PropName> to translate
                    pointer coordinates into grid locations.
                </Description>}>
            <div onMouseMove={onMouseMove}>
                <DataEditor {...defaultProps} ref={ref} columns={cols} getCellContent={getCellContent} rows={1000} />
            </div>
            <div style={{
      marginTop: 8
    }}>{info}</div>
        </BeautifulWrapper>;
}`,...(u=(c=o.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};const O=["GetMouseArgsForPosition"];export{o as GetMouseArgsForPosition,O as __namedExportsOrder,N as default};
