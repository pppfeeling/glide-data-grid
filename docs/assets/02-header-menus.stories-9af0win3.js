import{S as x,s as y}from"./marked.esm-By-yLKzP.js";import{R as n}from"./iframe-CB3jNLId.js";import{u as D}from"./react-laag.esm-H02vR0vj.js";import{D as I}from"./data-editor-all-VbTXgUdc.js";import{B as O,D as E,P as L,a as $}from"./utils-CZdCQylj.js";import{a as s}from"./image-window-loader-DtBhR23y.js";import"./preload-helper-C1FmrZbK.js";import"./index-B84JjiES.js";import"./scrolling-data-grid-xxMWlw8S.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>n.createElement(x,null,n.createElement(O,{title:"02. Header menus",description:n.createElement(n.Fragment,null,n.createElement(E,null,"Headers on the data grid can be configured to support menus. We provide the events and the menu icon, you provide the menu. The menu icon can be modified via the"," ",n.createElement(L,null,"menuIcon")," prop."))},n.createElement(a,null)))]},G=y("div")({name:"SimpleMenu",class:"s319sgk",propsAsIs:!1}),i=()=>{const{cols:a,getCellContent:m}=$(),h=n.useMemo(()=>a.map((r,t)=>t===2?{...r,group:"Details",hasMenu:!0,menuIcon:"dots",overlayIcon:"rowOwnerOverlay",themeOverride:{accentColor:"red",bgHeader:"blue",bgHeaderHasFocus:"green"}}:t===3?{...r,group:"Details",overlayIcon:s.HeaderDate,icon:s.HeaderCode,hasMenu:!0,menuIcon:"headerUri"}:t===4?{...r,group:"Details",title:"CUSTOM",icon:"custom",themeOverride:{bgHeader:"#212121",textHeader:"#ffffff",fgIconHeader:"#00ff00",bgIconHeader:"#ffff00"}}:{...r,group:"General",hasMenu:!1,required:!0,themeOverride:{bgHeader:"#ff0000",textHeader:"#ffffff"}}),[a]),[e,d]=n.useState(),c=e!==void 0,{layerProps:p,renderLayer:v}=D({isOpen:c,auto:!0,placement:"bottom-end",triggerOffset:2,onOutsideClick:()=>d(void 0),trigger:{getBounds:()=>({left:(e==null?void 0:e.bounds.x)??0,top:(e==null?void 0:e.bounds.y)??0,width:(e==null?void 0:e.bounds.width)??0,height:(e==null?void 0:e.bounds.height)??0,right:((e==null?void 0:e.bounds.x)??0)+((e==null?void 0:e.bounds.width)??0),bottom:((e==null?void 0:e.bounds.y)??0)+((e==null?void 0:e.bounds.height)??0)})}}),H=n.useCallback((r,t)=>{if(t(),r.column.required!==!0)return;const{ctx:l,rect:o}=r,u=7;l.beginPath(),l.moveTo(o.x+o.width-u,o.y),l.lineTo(o.x+o.width,o.y),l.lineTo(o.x+o.width,o.y+u),l.closePath(),l.fillStyle="red",l.fill()},[]),b=n.useMemo(()=>({custom:r=>`<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.00015" y="2" width="16" height="16" rx="4" fill="${r.bgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z" fill="${r.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z" fill="${r.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z" fill="${r.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z" fill="${r.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z" fill="${r.fgColor}"/>
                    <path d="M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z" fill="${r.fgColor}"/>
                    <path d="M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z" fill="${r.fgColor}"/>
                </svg>`}),[]),M=n.useCallback((r,t)=>{d({col:r,bounds:t})},[]),w=n.useCallback(()=>{console.log("Header clicked")},[]),k=n.useCallback(r=>r==="Details"?{name:"상세",actions:[{title:"클릭테스트",icon:s.HeaderArray,onClick:t=>{console.log("click",t)}}]}:{name:r},[]);return n.createElement(n.Fragment,null,n.createElement(I,{getCellContent:m,columns:h,rows:1e3,onHeaderMenuClick:M,onHeaderClicked:w,drawHeader:H,headerIcons:b,headerHeight:40,getGroupDetails:k}),c&&v(n.createElement(G,{...p},n.createElement("div",{onClick:()=>d(void 0)},"These do nothing"),n.createElement("div",{onClick:()=>d(void 0)},"Add column right"),n.createElement("div",{onClick:()=>d(void 0)},"Add column left"),n.createElement("div",{className:"danger",onClick:()=>d(void 0)},"Delete"))))};i.storyName="02. Header Menus";var f,C,g;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent
  } = useAllMockedKinds();
  const realCols = React.useMemo((): GridColumn[] => {
    return cols.map((c, index) => {
      if (index === 2) {
        return {
          ...c,
          group: "Details",
          hasMenu: true,
          menuIcon: "dots",
          overlayIcon: "rowOwnerOverlay",
          themeOverride: {
            accentColor: "red",
            //overlayIcon text 변경
            bgHeader: "blue",
            //overlayIcon bg 변경
            bgHeaderHasFocus: "green" //select시 head색상 변경
          }
        };
      } else if (index === 3) {
        return {
          ...c,
          group: "Details",
          overlayIcon: GridColumnIcon.HeaderDate,
          icon: GridColumnIcon.HeaderCode,
          hasMenu: true,
          menuIcon: "headerUri"
        };
      } else if (index === 4) {
        return {
          ...c,
          group: "Details",
          title: "CUSTOM",
          icon: "custom",
          themeOverride: {
            bgHeader: "#212121",
            // 헤더 배경색을 짙은 회색으로
            textHeader: "#ffffff",
            // 헤더 텍스트 색상을 흰색으로
            fgIconHeader: "#00ff00",
            bgIconHeader: "#ffff00"
          }
        };
      }
      return {
        ...c,
        group: "General",
        hasMenu: false,
        required: true,
        themeOverride: {
          bgHeader: "#ff0000",
          // 헤더 배경색을 짙은 회색으로
          textHeader: "#ffffff" // 헤더 텍스트 색상을 흰색으로
        }
      };
    });
  }, [cols]);
  const [menu, setMenu] = React.useState<{
    col: number;
    bounds: Rectangle;
  }>();
  const isOpen = menu !== undefined;
  const {
    layerProps,
    renderLayer
  } = useLayer({
    isOpen,
    auto: true,
    placement: "bottom-end",
    triggerOffset: 2,
    onOutsideClick: () => setMenu(undefined),
    trigger: {
      getBounds: () => ({
        left: menu?.bounds.x ?? 0,
        top: menu?.bounds.y ?? 0,
        width: menu?.bounds.width ?? 0,
        height: menu?.bounds.height ?? 0,
        right: (menu?.bounds.x ?? 0) + (menu?.bounds.width ?? 0),
        bottom: (menu?.bounds.y ?? 0) + (menu?.bounds.height ?? 0)
      })
    }
  });
  const drawHeader: DrawHeaderCallback = React.useCallback((args, draw) => {
    // 먼저 기본 헤더를 그립니다.
    draw();

    // required 속성이 없으면 아무것도 하지 않습니다.
    if (args.column.required !== true) {
      return;
    }

    // 빨간색 삼각형을 그립니다.
    const {
      ctx,
      rect
    } = args;
    const size = 7; // 삼각형 크기

    ctx.beginPath();
    // 헤더의 오른쪽 상단 코너로 이동
    ctx.moveTo(rect.x + rect.width - size, rect.y);
    // 오른쪽 상단 코너에 삼각형 그리기
    ctx.lineTo(rect.x + rect.width, rect.y);
    ctx.lineTo(rect.x + rect.width, rect.y + size);
    ctx.closePath();

    // 삼각형을 빨간색으로 채웁니다.
    ctx.fillStyle = "red";
    ctx.fill();
  }, []);
  const headerIcons = React.useMemo<SpriteMap>(() => {
    return {
      custom: p => \`<svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2.00015" y="2" width="16" height="16" rx="4" fill="\${p.bgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.69759 6.00977C4.23735 6.00977 3.86426 6.38286 3.86426 6.8431C3.86426 7.30334 4.23735 7.67643 4.69759 7.67643H8.86426C9.3245 7.67643 9.69759 7.30334 9.69759 6.8431C9.69759 6.38286 9.32449 6.00977 8.86426 6.00977H4.69759Z" fill="\${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.61426 4.76009C7.61426 4.29985 7.24116 3.92676 6.78092 3.92676C6.32069 3.92676 5.94759 4.29985 5.94759 4.76009L5.94759 8.92676C5.94759 9.387 6.32069 9.76009 6.78092 9.76009C7.24116 9.76009 7.61426 9.38699 7.61426 8.92676L7.61426 4.76009Z" fill="\${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.0336 6.00977C10.5734 6.00977 10.2003 6.38286 10.2003 6.8431C10.2003 7.30334 10.5734 7.67643 11.0336 7.67643H15.2003C15.6605 7.67643 16.0336 7.30334 16.0336 6.8431C16.0336 6.38286 15.6605 6.00977 15.2003 6.00977H11.0336Z" fill="\${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.89704 10.9916C5.5716 10.6662 5.04397 10.6662 4.71853 10.9916C4.39309 11.317 4.39309 11.8447 4.71853 12.1701L7.66481 15.1164C7.99024 15.4418 8.51788 15.4418 8.84332 15.1164C9.16876 14.791 9.16876 14.2633 8.84332 13.9379L5.89704 10.9916Z" fill="\${p.fgColor}"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.84332 12.1703C9.16875 11.8449 9.16875 11.3172 8.84332 10.9918C8.51788 10.6664 7.99024 10.6664 7.6648 10.9918L4.71853 13.9381C4.39309 14.2635 4.39309 14.7912 4.71853 15.1166C5.04396 15.442 5.5716 15.442 5.89704 15.1166L8.84332 12.1703Z" fill="\${p.fgColor}"/>
                    <path d="M10.2003 11.804C10.2003 11.3438 10.5734 10.9707 11.0336 10.9707H15.2003C15.6605 10.9707 16.0336 11.3438 16.0336 11.804C16.0336 12.2643 15.6605 12.6374 15.2003 12.6374H11.0336C10.5734 12.6374 10.2003 12.2643 10.2003 11.804Z" fill="\${p.fgColor}"/>
                    <path d="M10.2003 14.304C10.2003 13.8438 10.5734 13.4707 11.0336 13.4707H15.2003C15.6605 13.4707 16.0336 13.8438 16.0336 14.304C16.0336 14.7643 15.6605 15.1374 15.2003 15.1374H11.0336C10.5734 15.1374 10.2003 14.7643 10.2003 14.304Z" fill="\${p.fgColor}"/>
                </svg>\`
    };
  }, []);
  const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    setMenu({
      col,
      bounds
    });
  }, []);
  const onHeaderClicked = React.useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("Header clicked");
  }, []);
  const getGroupDetails = React.useCallback((groupName: string) => {
    if (groupName === "Details") {
      return {
        name: "상세",
        actions: [{
          title: "클릭테스트",
          icon: GridColumnIcon.HeaderArray,
          onClick: (e: GridMouseGroupHeaderEventArgs) => {
            console.log("click", e);
          }
        }]
      };
    }
    return {
      name: groupName
    };
  }, []);
  return <>
            <DataEditor getCellContent={getCellContent} columns={realCols} rows={1000} onHeaderMenuClick={onHeaderMenuClick} onHeaderClicked={onHeaderClicked} drawHeader={drawHeader} headerIcons={headerIcons} headerHeight={40} getGroupDetails={getGroupDetails} />
            {isOpen && renderLayer(<SimpleMenu {...layerProps}>
                        <div onClick={() => setMenu(undefined)}>These do nothing</div>
                        <div onClick={() => setMenu(undefined)}>Add column right</div>
                        <div onClick={() => setMenu(undefined)}>Add column left</div>
                        <div className="danger" onClick={() => setMenu(undefined)}>
                            Delete
                        </div>
                    </SimpleMenu>)}
        </>;
}`,...(g=(C=i.parameters)==null?void 0:C.docs)==null?void 0:g.source}}};const B=["HeaderMenus"];export{i as HeaderMenus,B as __namedExportsOrder,z as default};
