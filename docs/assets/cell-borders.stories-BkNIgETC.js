import{R as e}from"./iframe-QSgyaTSL.js";import{D as v}from"./data-editor-all-13Jmgajl.js";import{B,D as G,P as t,d as S}from"./utils-BDQcuhjS.js";import{S as x}from"./story-utils-C0WGvR4k.js";import{G as D}from"./image-window-loader-mAwE-o6S.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-D5BQUbsm.js";import"./flatten-6ap-20C_.js";import"./scrolling-data-grid-CgRtQxLN.js";import"./marked.esm-GckP92zN.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const A={title:"Glide-Data-Grid/DataEditor Demos",decorators:[l=>e.createElement(x,null,e.createElement(B,{title:"Cell Borders Control",description:e.createElement(G,null,"Demonstrates selective cell border control. Compare the"," ",e.createElement(t,null,'"Department (Original)"')," column with the"," ",e.createElement(t,null,'"Department (Merged)"')," column. The merged column uses"," ",e.createElement(t,null,"borderBottom: false"),"to hide borders between cells of the same department, and ",e.createElement(t,null,"displayData")," ","is set to empty string for duplicate entries to create a grouped appearance. This shows how individual cells can control their",e.createElement(t,null,"borderTop"),", ",e.createElement(t,null,"borderLeft"),","," ",e.createElement(t,null,"borderRight"),", and ",e.createElement(t,null,"borderBottom")," properties.")},e.createElement(l,null)))]},n=[{name:"1. Alice Johnson",email:"alice@company.com",department:"Engineering",salary:95e3},{name:"2. Bob Smith",email:"bob@company.com",department:"Engineering",salary:87e3},{name:"3. Carol Davis",email:"carol@company.com",department:"Engineering",salary:92e3},{name:"4. David Wilson",email:"david@company.com",department:"Marketing",salary:75e3},{name:"5. Eve Brown",email:"eve@company.com",department:"Marketing",salary:78e3},{name:"6. Frank Miller",email:"frank@company.com",department:"Sales",salary:82e3},{name:"7. Grace Lee",email:"grace@company.com",department:"Sales",salary:85e3},{name:"8. Henry Taylor",email:"henry@company.com",department:"Sales",salary:89e3}],k=[{title:"Name",width:150,icon:"headerString"},{title:"Email",width:200,icon:"headerString"},{title:"Department (Original)",width:140,icon:"headerString"},{title:"Department (Merged)",width:140,icon:"headerString"},{title:"Salary",width:100,icon:"headerNumber"}],o=()=>{const l=y=>{var c,p;const[i,r]=y,a=n[r];if(!a)return{kind:D.Text,data:"",displayData:"",allowOverlay:!1};const s=(()=>{switch(i){case 0:return a.name;case 1:return a.email;case 2:return a.department;case 3:return a.department;case 4:return a.salary.toString();default:return""}})();let m=!0,d=s;if(i===3){const f=r>0?(c=n[r-1])==null?void 0:c.department:void 0,b=r<n.length-1?(p=n[r+1])==null?void 0:p.department:void 0,u=a.department,E=r===0||f!==u,C=r===n.length-1||b!==u;i===3&&!E&&(d=""),m=C}return{kind:D.Text,data:s,displayData:d,allowOverlay:!0,borderBottom:m}};return e.createElement(v,{...S,getCellContent:l,columns:k,rows:n.length})};var g,h,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
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
          return rowData.department;
        // Merged department (with grouping effects)
        case 4:
          return rowData.salary.toString();
        default:
          return "";
      }
    })();

    // Group rows by department and show merged appearance
    let borderBottom = true;
    let displayData = cellData;

    // For department columns (both original and merged), control borders
    if (col === 3) {
      // Check if this is the first row of a department group
      const prevDept = row > 0 ? data[row - 1]?.department : undefined;
      const nextDept = row < data.length - 1 ? data[row + 1]?.department : undefined;
      const currentDept = rowData.department;
      const isFirstInGroup = row === 0 || prevDept !== currentDept;
      const isLastInGroup = row === data.length - 1 || nextDept !== currentDept;

      // For merged department column (col 3), hide text except first in group
      if (col === 3 && !isFirstInGroup) {
        displayData = "";
      }

      // Only show bottom border for the last row of each group (both columns)
      borderBottom = isLastInGroup;
    }
    return {
      kind: GridCellKind.Text,
      data: cellData,
      displayData: displayData,
      allowOverlay: true,
      borderBottom: borderBottom
    };
  };
  return <DataEditor {...defaultProps} getCellContent={getCellContent} columns={columns} rows={data.length} />;
}`,...(w=(h=o.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};const H=["CellBorders"];export{o as CellBorders,H as __namedExportsOrder,A as default};
