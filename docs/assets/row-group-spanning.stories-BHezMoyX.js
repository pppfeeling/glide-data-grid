import{R as o}from"./iframe-mK_zHxtx.js";import{G as g}from"./image-window-loader-zklk82Uu.js";import{D as w}from"./data-editor-all-CTMqixH8.js";import{B as h,D as S}from"./utils-C90P7WNL.js";import{u as D}from"./useGridDataProcessing-DuBGb1Pl.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-B3b_RoAY.js";import"./marked.esm-D0OAygdb.js";import"./flatten-sjXy7LIL.js";import"./scrolling-data-grid-PVQcj6dx.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const z={title:"Glide-Data-Grid/DataEditor Demos",decorators:[a=>o.createElement(h,{title:"Row Group Spanning",description:o.createElement(S,null,o.createElement("p",null,"By providing a ",o.createElement("code",null,"rowspan")," property on cells, the grid can be instructed to merge them visually by omitting the grid lines between them."))},o.createElement(a,null))]},c="Company",R=[{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Mercury",company:"Sol",email:"mercury@sol.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Sirius",company:"Canis Major",email:"sirius@canismajor.com",phone:"",address:""},{name:"Canopus",company:"Canis Major",email:"canopus@canismajor.com",phone:"",address:""},{name:"Arcturus",company:"Boötes",email:"arcturus@bootes.com",phone:"",address:""},{name:"Vega",company:"Lyra",email:"vega@lyra.com",phone:"",address:""},{name:"Capella",company:"Auriga",email:"capella@auriga.com",phone:"",address:""},{name:"Rigel",company:"Orion",email:"rigel@orion.com",phone:"",address:""},{name:"Procyon",company:"Canis Major",email:"procyon@canisminor.com",phone:"",address:""},{name:"Procyon",company:"zzz",email:"procyon@canisminor.com",phone:"",address:""}],n=()=>{const a=o.useMemo(()=>[{title:"Name",id:"name"},{title:"Company",id:"company",group:c},{title:"Email",id:"email",group:c}],[]),{processedData:s}=D(R,{groupingState:["company"],cols:a}),u=o.useCallback(y=>{const[C,t]=y,e=s[t],i=a[C].id,m=e[i],r={kind:g.Text,data:m??"",allowOverlay:!0,displayData:m??""};return i==="company"&&(console.log("dataRow",t,e.company,e.rowspan),e.hasOwnProperty("rowspan"))&&(r.rowspan=e.rowspan,r.rowSpanPosition="center"),r},[a,s]);return o.createElement(w,{getCellContent:u,columns:a,rows:s.length,rowMarkers:"number"})};var l,p,d;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
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
    const field = customCols[col].id;
    const data = dataRow[field];
    const basicCell = {
      kind: GridCellKind.Text,
      data: data ?? "",
      allowOverlay: true,
      displayData: data ?? ""
    };
    if (field === "company") {
      console.log("dataRow", row, dataRow.company, dataRow.rowspan);
      if (dataRow.hasOwnProperty("rowspan")) {
        basicCell.rowspan = dataRow.rowspan;
        basicCell.rowSpanPosition = "center";
        return basicCell;
      }
    }
    return basicCell;
  }, [customCols, processedData]);
  return <DataEditor getCellContent={customGetCellContent} columns={customCols} rows={processedData.length} rowMarkers={"number"} />;
}`,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const A=["RowGroupSpanning"];export{n as RowGroupSpanning,A as __namedExportsOrder,z as default};
