import{R as e}from"./iframe-BBVv1qwH.js";import{D as c}from"./data-editor-all-BrMm-f5K.js";import{u as g,B as p,D as u,P as b,M as d,K as t,d as h}from"./utils-BNg1pfbs.js";import{S as R}from"./story-utils-Dz-7Z1sN.js";import"./preload-helper-C1FmrZbK.js";import"./image-window-loader-TvKVynZF.js";import"./throttle-BWM2Hfn4.js";import"./marked.esm-Dpoy3p6v.js";import"./flatten-O_wH4wmD.js";import"./scrolling-data-grid-NosQBjoQ.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const P={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(R,null,e.createElement(o,null))]},n=()=>{const{cols:o,getCellContent:l}=g(100),[i,m]=e.useState({x:0,y:0,width:0,height:0});return e.createElement(p,{title:"Observe Visible Region",description:e.createElement(e.Fragment,null,e.createElement(u,null,"The visible region can be observed using ",e.createElement(b,null,"onVisibleRegionChanged")),e.createElement(d,null,"Then current visible region is x:",e.createElement(t,null,i.x)," y:",e.createElement(t,null,i.y)," width:",e.createElement(t,null,i.width)," height:",e.createElement(t,null,i.height)))},e.createElement(c,{...h,getCellContent:l,columns:o,rows:1e3,onVisibleRegionChanged:m}))};var r,s,a;n.parameters={...n.parameters,docs:{...(r=n.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useMockDataGenerator(100);
  const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  return <BeautifulWrapper title="Observe Visible Region" description={<>
                    <Description>
                        The visible region can be observed using <PropName>onVisibleRegionChanged</PropName>
                    </Description>
                    <MoreInfo>
                        Then current visible region is x:<KeyName>{visibleRegion.x}</KeyName> y:
                        <KeyName>{visibleRegion.y}</KeyName> width:
                        <KeyName>{visibleRegion.width}</KeyName> height:<KeyName>{visibleRegion.height}</KeyName>
                    </MoreInfo>
                </>}>
            <DataEditor {...defaultProps} getCellContent={getCellContent} columns={cols} rows={1000} onVisibleRegionChanged={setVisibleRegion} />
        </BeautifulWrapper>;
}`,...(a=(s=n.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const O=["ObserveVisibleRegion"];export{n as ObserveVisibleRegion,O as __namedExportsOrder,P as default};
