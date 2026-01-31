import{R as o}from"./iframe-BCyg8ypy.js";import{G as w}from"./image-window-loader-CvVz5YUq.js";import{D as h}from"./data-editor-all-C_BBxQFz.js";import{B as S,D}from"./utils-BlgGaLUf.js";import{u as R}from"./useGridDataProcessing-CURa-1aA.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-PvXwe8rS.js";import"./marked.esm-C2vt5mN_.js";import"./index-DkVHgzmp.js";import"./flatten-DVhM32tQ.js";import"./scrolling-data-grid-Bf9EOU5a.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const T={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>o.createElement(S,{title:"Row Group Spanning",description:o.createElement(D,null,o.createElement("p",null,"By providing a ",o.createElement("code",null,"rowspan")," property on cells, the grid can be instructed to merge them visually by omitting the grid lines between them."))},o.createElement(a,null))]},l="Company",f=[{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Canopus",company:"Canis Major",email:"canopus@canismajor.com",phone:"",address:""},{name:"Arcturus",company:"Boötes",email:"arcturus@bootes.com",phone:"",address:""},{name:"Vega",company:"Lyra",email:"vega@lyra.com",phone:"",address:""},{name:"Capella",company:"Auriga",email:"capella@auriga.com",phone:"",address:""},{name:"Rigel",company:"Orion",email:"rigel@orion.com",phone:"",address:""},{name:"Procyon",company:"Canis Major",email:"procyon@canisminor.com",phone:"",address:""},{name:"Procyon",company:"zzz",email:"procyon@canisminor.com",phone:"",address:""}],r=()=>{const a=o.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company",group:l},{title:"Email",id:"email",group:l}],[]),{processedData:n}=R(f,{groupingState:["company"],cols:a}),y=o.useCallback(C=>{var c;const[g,s]=C,e=n[s],t=((c=a[g])==null?void 0:c.id)??"",i=e[t],m={kind:w.Text,data:String(i??""),allowOverlay:!0,displayData:String(i??"")};return t==="company"&&(console.log("dataRow",s,e.company,e.rowspan),Object.hasOwn(e,"rowspan"))?{...m,rowspan:e.rowspan,rowSpanPosition:"middle"}:m},[a,n]);return o.createElement(h,{getCellContent:y,columns:a,rows:n.length,rowMarkers:"number"})};var p,d,u;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`() => {
  const customCols = React.useMemo<GridColumn[]>(() => {
    return [{
      title: "Name",
      id: "name"
    }, {
      title: "Company",
      id: "company",
      group: groupColumn
    }, {
      title: "Email",
      id: "email",
      group: groupColumn
    }];
  }, []);
  const {
    processedData
  } = useGridDataProcessing(groupData, {
    // sortState:[{key:'company',order:"asc"}],
    groupingState: ['company'],
    cols: customCols
  });
  const customGetCellContent = React.useCallback((item: Item): GridCell => {
    const [col, row] = item;
    const dataRow = processedData[row];
    const field = customCols[col]?.id ?? "";
    const data = dataRow[field as keyof typeof dataRow];
    const basicCell: TextCell = {
      kind: GridCellKind.Text,
      data: String(data ?? ""),
      allowOverlay: true,
      displayData: String(data ?? "")
    };
    if (field === "company") {
      console.log("dataRow", row, dataRow.company, dataRow.rowspan);
      if (Object.hasOwn(dataRow, "rowspan")) {
        return {
          ...basicCell,
          rowspan: dataRow.rowspan,
          rowSpanPosition: "middle"
        };
      }
    }
    return basicCell;
  }, [customCols, processedData]);
  return <DataEditor getCellContent={customGetCellContent} columns={customCols} rows={processedData.length} rowMarkers={"number"} />;
}`,...(u=(d=r.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const _=["RowGroupSpanning"];export{r as RowGroupSpanning,_ as __namedExportsOrder,T as default};
