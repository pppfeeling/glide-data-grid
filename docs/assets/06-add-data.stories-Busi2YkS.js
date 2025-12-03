import{R as n}from"./iframe-DlpsAO35.js";import{D as $}from"./data-editor-all-DHfb4Rvn.js";import{C as b,G as h,i as T}from"./image-window-loader-CwWhRr5p.js";import{B as Q,D as X,u as Y,d as Z}from"./utils--OiNEAu3.js";import{S as ee}from"./story-utils-rV01aGTY.js";import"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-CM-aqTNZ.js";import"./flatten-BhtxsdD9.js";import"./scrolling-data-grid-DqL_tIBg.js";import"./marked.esm-C2nOZsb8.js";import"./throttle--dN168Gr.js";const he={title:"Glide-Data-Grid/DataEditor Demos",decorators:[g=>n.createElement(ee,null,n.createElement(Q,{title:"Add data",description:n.createElement(n.Fragment,null,n.createElement(X,null,"rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가 multi일때 선택방법), rowMarker (모양설정),",n.createElement("br",null),"rowSelection 제어 prop :gridSelection, onGridSelectionChange"))},n.createElement(g,null)))]},u=[{title:"First name",id:"First name"},{title:"Last name",id:"Last name"},{title:"Avatar",id:"Avatar"},{title:"Email",id:"Email"},{title:"Title",id:"Title"},{title:"More Info",id:"More Info"},{title:"Date",id:"Date",width:200}],k=["John","Jane","Bob","Alice","Charlie","Diana","Evan","Fiona","George","Hannah"],v=["Doe","Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez"],te=(g,d=0)=>{switch(g){case 0:return{kind:h.Text,displayData:k[d%k.length],data:k[d%k.length],allowOverlay:!0,readonly:!1};case 1:return{kind:h.Text,displayData:v[d%v.length],data:v[d%v.length],allowOverlay:!0,readonly:!1};case 2:return{kind:h.Number,displayData:(1e3+d*100).toLocaleString(),data:1e3+d*100,allowOverlay:!0,readonly:!1,contentAlign:"right"};default:return{kind:h.Text,displayData:"2024-01-01",data:"2024-01-01",allowOverlay:!0,readonly:!1,contentAlign:"center"}}},x=(g,d=0)=>g.map((y,C)=>te(C,d)),R=()=>{const g=n.useRef(null),[d,y]=n.useState({columns:b.empty(),rows:b.empty()});Y(4);const C=100,[m,D]=n.useState(()=>{const o=[];for(let e=0;e<C;e++)o.push(x(u,e));return o}),[j,V]=n.useState(C),[M,N]=n.useState(new Set),[F,E]=n.useState(new Map),S=n.useCallback(o=>{var t,i;const e=(t=m[o])==null?void 0:t[0],s=(i=m[o])==null?void 0:i[3];e&&"data"in e&&e.data;const l=s&&"data"in s?s.data+"":"";l!=null&&l.includes("gmail")?N(r=>new Set(r).add(o)):N(r=>{const a=new Set(r);return a.delete(o),a})},[m]),A=n.useCallback(([o,e])=>{var l;const s=(l=m[e])==null?void 0:l[o];return s===void 0?{kind:h.Text,displayData:"",data:"",allowOverlay:!0,readonly:!1}:M.has(e)?{...s,themeOverride:{bgCell:"#fff2b2"}}:s},[m,M]),W=n.useCallback(([o,e],s)=>{D(l=>{const t=[...l],i=[...t[e]||[]];return i[o]=s,t[e]=i,t}),E(l=>{const t=new Map(l);return t.get(e)!=="A"&&t.set(e,"U"),t}),S(e)},[S]),B=n.useCallback(o=>{const{patternSource:e,fillDestination:s}=o,l=[];for(let i=0;i<e.height;i++){const r=[];for(let a=0;a<e.width;a++)r.push(A([e.x+a,e.y+i]));l.push(r)}const t=new Set;D(i=>{const r=[...i];for(let a=0;a<s.height;a++){const c=s.y+a;r[c]||(r[c]=x(u,c));const w=[...r[c]];for(let f=0;f<s.width;f++){const p=l[a%e.height][f%e.width],I=s.x+f;T(p)&&(w[I]=p,t.add(c))}r[c]=w}return r}),t.forEach(i=>S(i))},[u,A,S]),K=n.useCallback((o,e)=>{const[s,l]=o,t=new Set;return D(i=>{const r=[...i];return e.forEach((a,c)=>{const w=l+c;r[w]||(r[w]=x(u,w));const f=[...r[w]];a.forEach((p,I)=>{const G=s+I;if(G<u.length){const O=f[G];if(T(O)){const q={...O,data:p};f[G]=q,t.add(w)}}}),r[w]=f}),r}),t.forEach(i=>S(i)),!1},[u.length,u,S]),L=n.useCallback(()=>{D(o=>{const e=[...o],s=x(u,e.length),l=d.rows.first();let t;return l!==void 0?(t=l+1,e.splice(t,0,s)):(t=e.length,e.push(s)),E(i=>{const r=new Map(i);if(l!==void 0){const a=new Map;return i.forEach((c,w)=>{w>=t?a.set(w+1,c):a.set(w,c)}),a.set(t,"A"),a}else return r.set(t,"A"),r}),V(e.length),e})},[u,d.rows]),_=n.useCallback(()=>{d.rows.length!==0&&(E(o=>{const e=new Map(o);return d.rows.toArray().forEach(s=>{o.get(s)==="A"?e.delete(s):e.set(s,"D")}),e}),y({columns:b.empty(),rows:b.empty()}))},[d.rows]),z=n.useCallback(()=>{if(m.length===0)return;const o=u.map(r=>r.title).join(","),e=m.map(r=>r.map(a=>{var f,p;let c="";return a.kind===h.Text||a.kind===h.Number?c=a.displayData??((f=a.data)==null?void 0:f.toString())??"":a.kind===h.Image||a.kind===h.Drilldown||a.kind===h.Bubble?c=Array.isArray(a.data)?a.data.join(";"):"":a.kind===h.Boolean&&(c=((p=a.data)==null?void 0:p.toString())??"false"),`"${c.replace(/"/g,'""')}"`}).join(",")),s="\uFEFF"+[o,...e].join(`
`),l=new Blob([s],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a"),i=URL.createObjectURL(l);t.setAttribute("href",i),t.setAttribute("download","grid-data.csv"),t.style.visibility="hidden",document.body.appendChild(t),t.click(),document.body.removeChild(t)},[m,u]),J=n.useCallback(o=>F.get(o),[F]);return n.createElement(n.Fragment,null,n.createElement("div",null,n.createElement("button",{onClick:L},"열추가"),n.createElement("button",{onClick:_},"열삭제"),n.createElement("button",{onClick:z},"CSV다운로드")),n.createElement($,{...Z,width:"100%",height:"500px",ref:g,columns:u,rows:j,getCellContent:A,isActivationOnEnter:!0,rowSelect:"single",rowSelectionMode:"multi",rowMarkers:{kind:"checkbox-visible",checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:!1,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"},rowNumber:!0,rowStatus:!0,rowStatusWidth:40,rowStatusTheme:{bgCell:"#f5f5f5",textDark:"#333"}},fillHandle:{size:6},onCellEdited:(o,e)=>{W(o,e)},onFillPattern:B,onPaste:K,onGridSelectionChange:y,gridSelection:d,onRowStatus:J}))};R.storyName="06. Add Data";var H,P,U;R.parameters={...R.parameters,docs:{...(H=R.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
  const gridRef = React.useRef<DataEditorRef>(null);
  const [gridSelection, setGridSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const {
    onColumnResize
  } = useMockDataGenerator(4); // 6 columns for the example

  const initialRows = 100;
  const [data, setData] = React.useState<GridCell[][]>(() => {
    const initialData: GridCell[][] = [];
    for (let r = 0; r < initialRows; r++) {
      initialData.push(generateNewRow(cols, r));
    }
    return initialData;
  });
  const [numRows, setNumRows] = React.useState(initialRows);

  // FirstName이 'D'로 시작하고 Email에 'gmail'이 포함된 행의 인덱스를 저장하는 Set
  const [highlightedRows, setHighlightedRows] = React.useState<Set<number>>(new Set());

  // Row status tracking: A (Added), U (Updated), D (Deleted)
  const [rowStatuses, setRowStatuses] = React.useState<Map<number, "A" | "U" | "D">>(new Map());

  // 1. 데이터 처리 로직
  const processRow = React.useCallback((row: number) => {
    const firstNameCell = data[row]?.[0];
    const emailCell = data[row]?.[3];
    const firstName = firstNameCell && "data" in firstNameCell ? firstNameCell.data as string : "";
    const email = emailCell && "data" in emailCell ? emailCell.data + "" : "";
    if (email?.includes("gmail")) {
      setHighlightedRows(prev => new Set(prev).add(row));
    } else {
      setHighlightedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(row);
        return newSet;
      });
    }
  }, [data]);

  // 4. getCellContentWithHighlight 수정
  const getCellContentWithHighlight = React.useCallback(([col, row]: Item): GridCell => {
    const content = data[row]?.[col];
    if (content === undefined) {
      return {
        kind: GridCellKind.Text,
        displayData: "",
        data: "",
        allowOverlay: true,
        readonly: false
      };
    }
    if (highlightedRows.has(row)) {
      return {
        ...content,
        themeOverride: {
          bgCell: "#fff2b2"
        }
      };
    }
    return content;
  }, [data, highlightedRows]);
  const setCellValue = React.useCallback(([col, row]: Item, newValue: EditableGridCell) => {
    setData(prevData => {
      const newData = [...prevData];
      const newRow = [...(newData[row] || [])];
      newRow[col] = newValue;
      newData[row] = newRow;
      return newData;
    });

    // Mark row as Updated (unless it's already Added)
    setRowStatuses(prev => {
      const newStatuses = new Map(prev);
      if (newStatuses.get(row) !== "A") {
        newStatuses.set(row, "U");
      }
      return newStatuses;
    });
    processRow(row);
  }, [processRow]);

  // 2. onFillPattern 구현
  const onFillPattern = React.useCallback((event: FillPatternEventArgs) => {
    const {
      patternSource,
      fillDestination
    } = event;
    const sourceData: GridCell[][] = [];
    for (let r = 0; r < patternSource.height; r++) {
      const row: GridCell[] = [];
      for (let c = 0; c < patternSource.width; c++) {
        row.push(getCellContentWithHighlight([patternSource.x + c, patternSource.y + r]));
      }
      sourceData.push(row);
    }
    const affectedRows = new Set<number>();
    setData(prevData => {
      const newData = [...prevData];
      for (let r = 0; r < fillDestination.height; r++) {
        const targetRowIndex = fillDestination.y + r;
        if (!newData[targetRowIndex]) {
          newData[targetRowIndex] = generateNewRow(cols, targetRowIndex);
        }
        const newRow = [...newData[targetRowIndex]];
        for (let c = 0; c < fillDestination.width; c++) {
          const d = sourceData[r % patternSource.height][c % patternSource.width];
          const targetCol = fillDestination.x + c;
          if (isEditableGridCell(d)) {
            newRow[targetCol] = d;
            affectedRows.add(targetRowIndex);
          }
        }
        newData[targetRowIndex] = newRow;
      }
      return newData;
    });

    // 채우기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
    affectedRows.forEach(row => processRow(row));
  }, [cols, getCellContentWithHighlight, processRow]);

  // 3. onPaste 구현
  const onPaste = React.useCallback((target: Item, values: readonly (readonly string[])[]): boolean => {
    const [targetCol, targetRow] = target;
    const affectedRows = new Set<number>();
    setData(prevData => {
      const newData = [...prevData];
      values.forEach((row, rowIndex) => {
        const writeRowIndex = targetRow + rowIndex;
        if (!newData[writeRowIndex]) {
          newData[writeRowIndex] = generateNewRow(cols, writeRowIndex);
        }
        const newRow = [...newData[writeRowIndex]];
        row.forEach((val, colIndex) => {
          const writeCol = targetCol + colIndex;
          if (writeCol < cols.length) {
            const template = newRow[writeCol];
            if (isEditableGridCell(template)) {
              const newCell = {
                ...template,
                data: val
              };
              newRow[writeCol] = newCell as EditableGridCell;
              affectedRows.add(writeRowIndex);
            }
          }
        });
        newData[writeRowIndex] = newRow;
      });
      return newData;
    });

    // 붙여넣기 작업 후, 영향을 받은 모든 행에 대해 데이터 처리 로직 실행
    affectedRows.forEach(row => processRow(row));
    return false; // 내부 붙여넣기 로직을 막고 직접 처리했음을 알림
  }, [cols.length, cols, processRow]);
  const onAddRow = React.useCallback(() => {
    setData(prevData => {
      const newData = [...prevData];
      const newRow = generateNewRow(cols, newData.length);
      const firstSelectedIndex = gridSelection.rows.first();
      let insertIndex: number;
      if (firstSelectedIndex !== undefined) {
        insertIndex = firstSelectedIndex + 1;
        newData.splice(insertIndex, 0, newRow);
      } else {
        insertIndex = newData.length;
        newData.push(newRow);
      }

      // Mark the new row as Added
      setRowStatuses(prev => {
        const newStatuses = new Map(prev);
        // Shift statuses for rows after the insert point
        if (firstSelectedIndex !== undefined) {
          const shiftedStatuses = new Map<number, "A" | "U" | "D">();
          prev.forEach((status, row) => {
            if (row >= insertIndex) {
              shiftedStatuses.set(row + 1, status);
            } else {
              shiftedStatuses.set(row, status);
            }
          });
          shiftedStatuses.set(insertIndex, "A");
          return shiftedStatuses;
        } else {
          newStatuses.set(insertIndex, "A");
          return newStatuses;
        }
      });
      setNumRows(newData.length);
      return newData;
    });
  }, [cols, gridSelection.rows]);
  const onDeleteRow = React.useCallback(() => {
    if (gridSelection.rows.length === 0) return;

    // Mark selected rows as Deleted (or remove if they were Added)
    setRowStatuses(prev => {
      const newStatuses = new Map(prev);
      gridSelection.rows.toArray().forEach(rowIndex => {
        const currentStatus = prev.get(rowIndex);
        if (currentStatus === "A") {
          // If row was just added, remove it completely
          newStatuses.delete(rowIndex);
        } else {
          // Otherwise mark as Deleted
          newStatuses.set(rowIndex, "D");
        }
      });
      return newStatuses;
    });
    setGridSelection({
      columns: CompactSelection.empty(),
      rows: CompactSelection.empty()
    });
  }, [gridSelection.rows]);
  const onCsvDownload = React.useCallback(() => {
    if (data.length === 0) return;
    const headers = cols.map(c => c.title).join(",");
    const csvRows = data.map(row => row.map(cell => {
      let cellData = "";
      if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number) {
        cellData = cell.displayData ?? cell.data?.toString() ?? "";
      } else if (cell.kind === GridCellKind.Image || cell.kind === GridCellKind.Drilldown || cell.kind === GridCellKind.Bubble) {
        cellData = Array.isArray(cell.data) ? cell.data.join(";") : "";
      } else if (cell.kind === GridCellKind.Boolean) {
        cellData = cell.data?.toString() ?? "false";
      }
      // Escape commas and quotes
      const escaped = cellData.replace(/"/g, '""');
      return \`"\${escaped}"\`;
    }).join(","));
    const csvString = "\\uFEFF" + [headers, ...csvRows].join("\\n");
    const blob = new Blob([csvString], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "grid-data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data, cols]);

  // Callback to provide row status for each row
  const onRowStatus = React.useCallback((rowIndex: number): "A" | "U" | "D" | undefined => {
    return rowStatuses.get(rowIndex);
  }, [rowStatuses]);
  return <>
            <div>
                <button onClick={onAddRow}>열추가</button>
                <button onClick={onDeleteRow}>열삭제</button>
                <button onClick={onCsvDownload}>CSV다운로드</button>
            </div>
            
            <DataEditor {...defaultProps} width="100%" height="500px" ref={gridRef} columns={cols} rows={numRows} getCellContent={getCellContentWithHighlight} isActivationOnEnter={true} rowSelect="single" rowSelectionMode="multi" rowMarkers={{
      kind: "checkbox-visible",
      checkboxStyle: "square",
      headerAlwaysVisible: true,
      headerDisabled: false,
      headerTheme: {
        textMedium: "rgba(51, 51, 51, 0.50)"
      },
      rowNumber: true,
      rowStatus: true,
      rowStatusWidth: 40,
      rowStatusTheme: {
        bgCell: "#f5f5f5",
        textDark: "#333"
      }
    }} fillHandle={{
      size: 6
    }} onCellEdited={(cell, newValue) => {
      setCellValue(cell, newValue);
    }} onFillPattern={onFillPattern} onPaste={onPaste} onGridSelectionChange={setGridSelection} gridSelection={gridSelection} onRowStatus={onRowStatus} />
            
        </>;
}`,...(U=(P=R.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};const me=["AddData"];export{R as AddData,me as __namedExportsOrder,he as default};
