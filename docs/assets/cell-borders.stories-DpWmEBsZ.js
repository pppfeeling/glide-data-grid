import{R as e}from"./iframe-Dr4aLc4D.js";import{D as E}from"./data-editor-all-D1VXsty6.js";import{d as B,B as S,D as T,P as s}from"./utils-BqmYcZHm.js";import{S as b}from"./story-utils-CaNNXQbC.js";import{G as l}from"./image-window-loader-fvODNUT0.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-CLbTe-Xc.js";import"./flatten-DC3F6-pr.js";import"./scrolling-data-grid-B9UCzY8b.js";import"./marked.esm-GcHhUwQF.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const J={title:"Glide-Data-Grid/DataEditor Demos"},a=[{name:"1. Alice Johnson",email:"alice@company.com",department:"Engineering",salary:95e3},{name:"2. Bob Smith",email:"bob@company.com",department:"Engineering",salary:87e3},{name:"3. Carol Davis",email:"carol@company.com",department:"Engineering",salary:92e3},{name:"4. David Wilson",email:"david@company.com",department:"Marketing",salary:75e3},{name:"5. Eve Brown",email:"eve@company.com",department:"Marketing",salary:78e3},{name:"6. Frank Miller",email:"frank@company.com",department:"Sales",salary:82e3},{name:"7. Grace Lee",email:"grace@company.com",department:"Sales",salary:85e3},{name:"8. Henry Taylor",email:"henry@company.com",department:"Sales",salary:89e3}],O=[{title:"Name",width:150,icon:"headerString"},{title:"Email",width:200,icon:"headerString"},{title:"Department (Original)",width:140,icon:"headerString"},{title:"Department (Merged)",width:140,icon:"headerString"},{title:"Salary",width:100,icon:"headerNumber"},{title:"Department (rowGroupBorder)",width:180,icon:"headerString",rowGroupBorder:!0}],m=()=>{const o=h=>{var w,D;const[i,n]=h,r=a[n];if(!r)return{kind:l.Text,data:"",displayData:"",allowOverlay:!1};const t=(()=>{switch(i){case 0:return r.name;case 1:return r.email;case 2:return r.department;case 3:case 5:return r.department;case 4:return r.salary.toString();default:return""}})(),d=n>0?(w=a[n-1])==null?void 0:w.department:void 0,c=r.department,p=n===0||d!==c;if(i===3){const x=n<a.length-1?(D=a[n+1])==null?void 0:D.department:void 0,k=n===a.length-1||x!==c;return{kind:l.Text,data:t,displayData:p?t:"",allowOverlay:!0,borderBottom:k}}else if(i===5||i===2)return{kind:l.Text,data:t,displayData:p?t:"",allowOverlay:!0};return{kind:l.Text,data:t,displayData:t,allowOverlay:!0}};return e.createElement(E,{...B,getCellContent:o,columns:O,rows:a.length})};m.decorators=[o=>e.createElement(b,null,e.createElement(S,{title:"Cell Borders Control",description:e.createElement(T,null,"Demonstrates selective cell border control. Compare the"," ",e.createElement(s,null,'"Department (Original)"')," column with the other department columns. The"," ",e.createElement(s,null,'"Department (Merged)"')," column uses"," ",e.createElement(s,null,"borderBottom: false")," to manually hide borders. The"," ",e.createElement(s,null,'"Department (rowGroupBorder)"')," column uses the"," ",e.createElement(s,null,"rowGroupBorder: true")," prop on the column definition to automatically achieve the same effect.")},e.createElement(o,null)))];const u=()=>{const o=[{title:"Name",width:150,icon:"headerString"},{title:"Email",width:200,icon:"headerString"},{title:"Department",width:180,icon:"headerString",rowGroupBorder:!0},{title:"Salary",width:100,icon:"headerNumber"}],h=i=>{var c;const[n,r]=i,t=a[r];if(!t)return{kind:l.Text,data:"",displayData:"",allowOverlay:!1};const d=(()=>{switch(n){case 0:return t.name;case 1:return t.email;case 2:return t.department;case 3:return t.salary.toString();default:return""}})();if(n===2){const p=r>0?(c=a[r-1])==null?void 0:c.department:void 0,w=t.department,D=r===0||p!==w;return{kind:l.Text,data:d,displayData:D?d:"",allowOverlay:!0}}return{kind:l.Text,data:d,displayData:d,allowOverlay:!0}};return e.createElement(E,{...B,getCellContent:h,columns:o,rows:a.length})};u.decorators=[o=>e.createElement(b,null,e.createElement(S,{title:"Row Group Border",description:e.createElement(T,null,"The ",e.createElement(s,null,"rowGroupBorder")," prop on a column will automatically draw a bottom border on the last row of a group. This is useful for visually grouping rows based on the content of a column.")},e.createElement(o,null)))];var y,g,f;m.parameters={...m.parameters,docs:{...(y=m.parameters)==null?void 0:y.docs,source:{originalSource:`() => {
  const getCellContent = (cell: Item): EditableGridCell => {
    const [col, row] = cell;
    const rowData = data[row];
    if (!rowData) {
      return {
        kind: GridCellKind.Text,
        data: "",
        displayData: "",
        allowOverlay: false
      };
    }
    const cellData = (() => {
      switch (col) {
        case 0:
          return rowData.name;
        case 1:
          return rowData.email;
        case 2:
          return rowData.department;
        // Original department (always visible)
        case 3:
        case 5:
          return rowData.department;
        // Merged department columns
        case 4:
          return rowData.salary.toString();
        default:
          return "";
      }
    })();
    const prevDept = row > 0 ? data[row - 1]?.department : undefined;
    const currentDept = rowData.department;
    const isFirstInGroup = row === 0 || prevDept !== currentDept;
    if (col === 3) {
      const nextDept = row < data.length - 1 ? data[row + 1]?.department : undefined;
      const isLastInGroup = row === data.length - 1 || nextDept !== currentDept;
      return {
        kind: GridCellKind.Text,
        data: cellData,
        displayData: isFirstInGroup ? cellData : "",
        allowOverlay: true,
        borderBottom: isLastInGroup
      };
    } else if (col === 5 || col === 2) {
      // Apply merging logic to col 2 as well
      // For the rowGroupBorder column, we let the grid handle the border.
      return {
        kind: GridCellKind.Text,
        data: cellData,
        displayData: isFirstInGroup ? cellData : "",
        allowOverlay: true
      };
    }
    return {
      kind: GridCellKind.Text,
      data: cellData,
      displayData: cellData,
      allowOverlay: true
    };
  };
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rows={data.length} />;
}`,...(f=(g=m.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var G,C,v;u.parameters={...u.parameters,docs:{...(G=u.parameters)==null?void 0:G.docs,source:{originalSource:`() => {
  const rowGroupBorderColumns: GridColumn[] = [{
    title: "Name",
    width: 150,
    icon: "headerString"
  }, {
    title: "Email",
    width: 200,
    icon: "headerString"
  }, {
    title: "Department",
    width: 180,
    icon: "headerString",
    rowGroupBorder: true
  }, {
    title: "Salary",
    width: 100,
    icon: "headerNumber"
  }];
  const getCellContent = (cell: Item): EditableGridCell => {
    const [col, row] = cell;
    const rowData = data[row];
    if (!rowData) {
      return {
        kind: GridCellKind.Text,
        data: "",
        displayData: "",
        allowOverlay: false
      };
    }
    const cellData = (() => {
      switch (col) {
        case 0:
          return rowData.name;
        case 1:
          return rowData.email;
        case 2:
          return rowData.department;
        case 3:
          return rowData.salary.toString();
        default:
          return "";
      }
    })();
    if (col === 2) {
      const prevDept = row > 0 ? data[row - 1]?.department : undefined;
      const currentDept = rowData.department;
      const isFirstInGroup = row === 0 || prevDept !== currentDept;

      // For the rowGroupBorder column, we let the grid handle the border.
      return {
        kind: GridCellKind.Text,
        data: cellData,
        displayData: isFirstInGroup ? cellData : "",
        allowOverlay: true
      };
    }
    return {
      kind: GridCellKind.Text,
      data: cellData,
      displayData: cellData,
      allowOverlay: true
    };
  };
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={rowGroupBorderColumns} rows={data.length} />;
}`,...(v=(C=u.parameters)==null?void 0:C.docs)==null?void 0:v.source}}};const j=["CellBorders","RowGroupBorder"];export{m as CellBorders,u as RowGroupBorder,j as __namedExportsOrder,J as default};
