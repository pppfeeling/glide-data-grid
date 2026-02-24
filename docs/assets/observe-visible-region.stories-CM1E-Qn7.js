import{R as e}from"./iframe-CB3jNLId.js";import{D as c}from"./data-editor-all-VbTXgUdc.js";import{u as g,B as u,D as p,P as b,M as d,K as i,d as h}from"./utils-CZdCQylj.js";import{S as R}from"./marked.esm-By-yLKzP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./image-window-loader-DtBhR23y.js";import"./scrolling-data-grid-xxMWlw8S.js";const K={title:"Glide-Data-Grid/DataEditor Demos",decorators:[o=>e.createElement(R,null,e.createElement(o,null))]},t=()=>{const{cols:o,getCellContent:l}=g(100),[n,m]=e.useState({x:0,y:0,width:0,height:0});return e.createElement(u,{title:"Observe Visible Region",description:e.createElement(e.Fragment,null,e.createElement(p,null,"The visible region can be observed using ",e.createElement(b,null,"onVisibleRegionChanged")),e.createElement(d,null,"Then current visible region is x:",e.createElement(i,null,n.x)," y:",e.createElement(i,null,n.y)," width:",e.createElement(i,null,n.width)," height:",e.createElement(i,null,n.height)))},e.createElement(c,{...h,getCellContent:l,columns:o,rows:1e3,onVisibleRegionChanged:m}))};var r,s,a;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
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
}`,...(a=(s=t.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};const w=["ObserveVisibleRegion"];export{t as ObserveVisibleRegion,w as __namedExportsOrder,K as default};
