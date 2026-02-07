import{R as o}from"./iframe-DB4XqYnF.js";import{D as Y}from"./data-editor-all-DxD1qKN2.js";import{C as b,G as f,i as T}from"./image-window-loader-Ce11dqI5.js";import{B as Z,D as ee,u as te,d as ae}from"./utils-B2bhh9kE.js";import{S as ne}from"./story-utils-pxLbAniP.js";import"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./index-DlpFMiw3.js";import"./throttle-BB6hEv_h.js";import"./flatten-Hif-LLO8.js";import"./scrolling-data-grid-BuDRV0BM.js";import"./marked.esm-B2lddrDO.js";import"./throttle--dN168Gr.js";const Se={title:"Glide-Data-Grid/DataEditor Demos",decorators:[g=>o.createElement(ne,null,o.createElement(Z,{title:"Add data",description:o.createElement(o.Fragment,null,o.createElement(ee,null,"rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가 multi일때 선택방법), rowMarker (모양설정),",o.createElement("br",null),"rowSelection 제어 prop :gridSelection, onGridSelectionChange"))},o.createElement(g,null)))]},h=[{title:"First name",id:"First name"},{title:"Last name",id:"Last name"},{title:"Avatar",id:"Avatar"},{title:"Email",id:"Email"},{title:"Title",id:"Title"},{title:"More Info",id:"More Info"},{title:"Date",id:"Date",width:200}],I=["John","Jane","Bob","Alice","Charlie","Diana","Evan","Fiona","George","Hannah"],k=["Doe","Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez"],oe=(g,u=0)=>{switch(g){case 0:return{kind:f.Text,displayData:I[u%I.length],data:I[u%I.length],allowOverlay:!0,readonly:!1};case 1:return{kind:f.Text,displayData:k[u%k.length],data:k[u%k.length],allowOverlay:!0,readonly:!1};case 2:return{kind:f.Number,displayData:(1e3+u*100).toLocaleString(),data:1e3+u*100,allowOverlay:!0,readonly:!1,contentAlign:"right"};case 3:return{kind:f.Boolean,data:!1,allowOverlay:!1,readonly:!1,contentAlign:"center"};case 4:return{kind:f.Markdown,data:"**굵은 텍스트**와 *기울임 텍스트*",allowOverlay:!0,readonly:!1};default:return{kind:f.Text,displayData:"2024-01-01",data:"2024-01-01",allowOverlay:!0,readonly:!1,contentAlign:"center"}}},v=(g,u=0)=>g.map((x,R)=>oe(R,u)),D=()=>{const g=o.useRef(null),[u,x]=o.useState({columns:b.empty(),rows:b.empty()});te(4);const R=100,[p,C]=o.useState(()=>{const n=[];for(let e=0;e<R;e++)n.push(v(h,e));return n}),[j,B]=o.useState(R),[G,N]=o.useState(new Set),[O,y]=o.useState(new Map),[F,V]=o.useState(()=>{const n=new Map;for(let e=0;e<R;e++)n.set(e,`ROW-${String(e+1).padStart(4,"0")}`);return n}),S=o.useCallback(n=>{var t,s;const e=(t=p[n])==null?void 0:t[0],l=(s=p[n])==null?void 0:s[3];e&&"data"in e&&e.data;const i=l&&"data"in l?l.data+"":"";i!=null&&i.includes("gmail")?N(r=>new Set(r).add(n)):N(r=>{const a=new Set(r);return a.delete(n),a})},[p]),E=o.useCallback(([n,e])=>{var i;const l=(i=p[e])==null?void 0:i[n];return l===void 0?{kind:f.Text,displayData:"",data:"",allowOverlay:!0,readonly:!1}:G.has(e)?{...l,themeOverride:{bgCell:"#fff2b2"}}:l},[p,G]),K=o.useCallback(([n,e],l)=>{C(i=>{const t=[...i],s=[...t[e]||[]];return s[n]=l,t[e]=s,t}),y(i=>{const t=new Map(i);return t.get(e)!=="A"&&t.set(e,"U"),t}),S(e)},[S]),L=o.useCallback(n=>{const{patternSource:e,fillDestination:l}=n,i=[];for(let s=0;s<e.height;s++){const r=[];for(let a=0;a<e.width;a++)r.push(E([e.x+a,e.y+s]));i.push(r)}const t=new Set;C(s=>{const r=[...s];for(let a=0;a<l.height;a++){const d=l.y+a;r[d]||(r[d]=v(h,d));const c=[...r[d]];for(let w=0;w<l.width;w++){const m=i[a%e.height][w%e.width],A=l.x+w;T(m)&&(c[A]=m,t.add(d))}r[d]=c}return r}),t.forEach(s=>S(s))},[h,E,S]),$=o.useCallback((n,e)=>{const[l,i]=n,t=new Set;return C(s=>{const r=[...s];return e.forEach((a,d)=>{const c=i+d;r[c]||(r[c]=v(h,c));const w=[...r[c]];a.forEach((m,A)=>{const M=l+A;if(M<h.length){const W=w[M];if(T(W)){const X={...W,data:m};w[M]=X,t.add(c)}}}),r[c]=w}),r}),t.forEach(s=>S(s)),!1},[h.length,h,S]),_=o.useCallback(()=>{C(n=>{const e=[...n],l=v(h,e.length),i=u.rows.first();let t;return i!==void 0?(t=i+1,e.splice(t,0,l)):(t=e.length,e.push(l)),y(s=>{const r=new Map(s);if(i!==void 0){const a=new Map;return s.forEach((d,c)=>{c>=t?a.set(c+1,d):a.set(c,d)}),a.set(t,"A"),a}else return r.set(t,"A"),r}),V(s=>{const r=new Map(s),a=Math.max(0,...[...s.values()].map(c=>{const w=c.match(/ROW-(\d+)/);return w?parseInt(w[1]):0})),d=`ROW-${String(a+1).padStart(4,"0")}`;if(i!==void 0){const c=new Map;return s.forEach((w,m)=>{m>=t?c.set(m+1,w):c.set(m,w)}),c.set(t,d),c}else return r.set(t,d),r}),B(e.length),e})},[h,u.rows]),q=o.useCallback(()=>{u.rows.length!==0&&(y(n=>{const e=new Map(n);return u.rows.toArray().forEach(l=>{n.get(l)==="A"?e.delete(l):e.set(l,"D")}),e}),x({columns:b.empty(),rows:b.empty()}))},[u.rows]),z=o.useCallback(()=>{if(p.length===0)return;const n=h.map(r=>r.title).join(","),e=p.map(r=>r.map(a=>{var w,m;let d="";return a.kind===f.Text||a.kind===f.Number?d=a.displayData??((w=a.data)==null?void 0:w.toString())??"":a.kind===f.Image||a.kind===f.Drilldown||a.kind===f.Bubble?d=Array.isArray(a.data)?a.data.join(";"):"":a.kind===f.Boolean&&(d=((m=a.data)==null?void 0:m.toString())??"false"),`"${d.replace(/"/g,'""')}"`}).join(",")),l="\uFEFF"+[n,...e].join(`
`),i=new Blob([l],{type:"text/csv;charset=utf-8;"}),t=document.createElement("a"),s=URL.createObjectURL(i);t.setAttribute("href",s),t.setAttribute("download","grid-data.csv"),t.style.visibility="hidden",document.body.append(t),t.click(),t.remove()},[p,h]),J=o.useCallback(n=>O.get(n),[O]),Q=o.useCallback(n=>F.get(n),[F]);return o.createElement(o.Fragment,null,o.createElement("div",null,o.createElement("button",{onClick:_},"열추가"),o.createElement("button",{onClick:q},"열삭제"),o.createElement("button",{onClick:z},"CSV다운로드")),o.createElement(Y,{...ae,width:"100%",height:"500px",ref:g,columns:h,rows:j,getCellContent:E,rowSelect:"multi",rowSelectionMode:"multi",rowMarkers:{kind:"checkbox-visible",checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:!1,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"},rowNumber:!0,rowStatus:!0,rowStatusWidth:40,rowStatusTheme:{bgCell:"#f5f5f5",textDark:"#333"},rowId:!0,rowIdWidth:100,rowIdTheme:{bgCell:"#f0f8ff",textDark:"#0066cc"}},fillHandle:{size:6},onCellEdited:(n,e)=>{K(n,e)},onFillPattern:L,onPaste:$,onGridSelectionChange:x,gridSelection:u,onRowStatus:J,onRowId:Q}))};D.storyName="06. Add Data";var H,P,U;D.parameters={...D.parameters,docs:{...(H=D.parameters)==null?void 0:H.docs,source:{originalSource:`() => {
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

  // Row ID tracking: Generate unique ID for each row
  const [rowIds, setRowIds] = React.useState<Map<number, string>>(() => {
    const ids = new Map<number, string>();
    for (let i = 0; i < initialRows; i++) {
      ids.set(i, \`ROW-\${String(i + 1).padStart(4, '0')}\`);
    }
    return ids;
  });

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

      // Generate new row ID
      setRowIds(prev => {
        const newIds = new Map(prev);
        const maxId = Math.max(0, ...[...prev.values()].map(id => {
          const match = id.match(/ROW-(\\d+)/);
          return match ? parseInt(match[1]) : 0;
        }));
        const newId = \`ROW-\${String(maxId + 1).padStart(4, '0')}\`;

        // Shift IDs for rows after the insert point
        if (firstSelectedIndex !== undefined) {
          const shiftedIds = new Map<number, string>();
          prev.forEach((id, row) => {
            if (row >= insertIndex) {
              shiftedIds.set(row + 1, id);
            } else {
              shiftedIds.set(row, id);
            }
          });
          shiftedIds.set(insertIndex, newId);
          return shiftedIds;
        } else {
          newIds.set(insertIndex, newId);
          return newIds;
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
    document.body.append(link);
    link.click();
    link.remove();
  }, [data, cols]);

  // Callback to provide row status for each row
  const onRowStatus = React.useCallback((rowIndex: number): "A" | "U" | "D" | undefined => {
    return rowStatuses.get(rowIndex);
  }, [rowStatuses]);

  // Callback to provide row ID for each row
  const onRowId = React.useCallback((rowIndex: number): string | undefined => {
    return rowIds.get(rowIndex);
  }, [rowIds]);
  return <>
            <div>
                <button onClick={onAddRow}>열추가</button>
                <button onClick={onDeleteRow}>열삭제</button>
                <button onClick={onCsvDownload}>CSV다운로드</button>
            </div>
            
            <DataEditor {...defaultProps} width="100%" height="500px" ref={gridRef} columns={cols} rows={numRows} getCellContent={getCellContentWithHighlight} rowSelect="multi" rowSelectionMode="multi" rowMarkers={{
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
      },
      rowId: true,
      rowIdWidth: 100,
      rowIdTheme: {
        bgCell: "#f0f8ff",
        textDark: "#0066cc"
      }
    }} fillHandle={{
      size: 6
    }} onCellEdited={(cell, newValue) => {
      setCellValue(cell, newValue);
    }} onFillPattern={onFillPattern} onPaste={onPaste} onGridSelectionChange={setGridSelection} gridSelection={gridSelection} onRowStatus={onRowStatus} onRowId={onRowId} />
            
        </>;
}`,...(U=(P=D.parameters)==null?void 0:P.docs)==null?void 0:U.source}}};const Re=["AddData"];export{D as AddData,Re as __namedExportsOrder,Se as default};
