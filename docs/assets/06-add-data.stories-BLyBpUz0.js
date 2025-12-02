import{R as t}from"./iframe-CZO0vn9F.js";import{D as J}from"./data-editor-all-DDHTqgPo.js";import{C as b,G as m,i as M}from"./image-window-loader-RbnO5SH5.js";import{B as U,D as q,u as $,d as Q}from"./utils-DRCGzv-2.js";import{S as X}from"./story-utils-C5OIDpnz.js";import"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-CQSe6QBF.js";import"./flatten-DWMtsgcZ.js";import"./scrolling-data-grid-CX_GCxE4.js";import"./marked.esm-BlDfTzuu.js";import"./throttle--dN168Gr.js";const we={title:"Glide-Data-Grid/DataEditor Demos",decorators:[f=>t.createElement(X,null,t.createElement(U,{title:"Add data",description:t.createElement(t.Fragment,null,t.createElement(q,null,"rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가 multi일때 선택방법), rowMarker (모양설정),",t.createElement("br",null),"rowSelection 제어 prop :gridSelection, onGridSelectionChange"))},t.createElement(f,null)))]},w=[{title:"First name",id:"First name"},{title:"Last name",id:"Last name"},{title:"Avatar",id:"Avatar"},{title:"Email",id:"Email"},{title:"Title",id:"Title"},{title:"More Info",id:"More Info"},{title:"Date",id:"Date",width:200}],k=["John","Jane","Bob","Alice","Charlie","Diana","Evan","Fiona","George","Hannah"],v=["Doe","Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez"],Y=(f,c=0)=>{switch(f){case 0:return{kind:m.Text,displayData:k[c%k.length],data:k[c%k.length],allowOverlay:!0,readonly:!1};case 1:return{kind:m.Text,displayData:v[c%v.length],data:v[c%v.length],allowOverlay:!0,readonly:!1};case 2:return{kind:m.Number,displayData:(1e3+c*100).toLocaleString(),data:1e3+c*100,allowOverlay:!0,readonly:!1,contentAlign:"right"};default:return{kind:m.Text,displayData:"2024-01-01",data:"2024-01-01",allowOverlay:!0,readonly:!1,contentAlign:"center"}}},y=(f,c=0)=>f.map((x,S)=>Y(S,c)),D=()=>{const f=t.useRef(null),[c,x]=t.useState({columns:b.empty(),rows:b.empty()});$(4);const S=100,[g,C]=t.useState(()=>{const a=[];for(let e=0;e<S;e++)a.push(y(w,e));return a}),[V,A]=t.useState(S),[N,F]=t.useState(new Set),R=t.useCallback(a=>{var r,i;const e=(r=g[a])==null?void 0:r[0],o=(i=g[a])==null?void 0:i[3];e&&"data"in e&&e.data;const s=o&&"data"in o?o.data+"":"";s!=null&&s.includes("gmail")?F(l=>new Set(l).add(a)):F(l=>{const n=new Set(l);return n.delete(a),n})},[g]),E=t.useCallback(([a,e])=>{var s;const o=(s=g[e])==null?void 0:s[a];return o===void 0?{kind:m.Text,displayData:"",data:"",allowOverlay:!0,readonly:!1}:N.has(e)?{...o,themeOverride:{bgCell:"#fff2b2"}}:o},[g,N]),j=t.useCallback(([a,e],o)=>{C(s=>{const r=[...s],i=[...r[e]||[]];return i[a]=o,r[e]=i,r}),R(e)},[R]),B=t.useCallback(a=>{const{patternSource:e,fillDestination:o}=a,s=[];for(let i=0;i<e.height;i++){const l=[];for(let n=0;n<e.width;n++)l.push(E([e.x+n,e.y+i]));s.push(l)}const r=new Set;C(i=>{const l=[...i];for(let n=0;n<o.height;n++){const d=o.y+n;l[d]||(l[d]=y(w,d));const h=[...l[d]];for(let u=0;u<o.width;u++){const p=s[n%e.height][u%e.width],G=o.x+u;M(p)&&(h[G]=p,r.add(d))}l[d]=h}return l}),r.forEach(i=>R(i))},[w,E,R]),W=t.useCallback((a,e)=>{const[o,s]=a,r=new Set;return C(i=>{const l=[...i];return e.forEach((n,d)=>{const h=s+d;l[h]||(l[h]=y(w,h));const u=[...l[h]];n.forEach((p,G)=>{const I=o+G;if(I<w.length){const H=u[I];if(M(H)){const z={...H,data:p};u[I]=z,r.add(h)}}}),l[h]=u}),l}),r.forEach(i=>R(i)),!1},[w.length,w,R]),K=t.useCallback(()=>{C(a=>{const e=[...a],o=y(w,e.length),s=c.rows.first();return s!==void 0?e.splice(s+1,0,o):e.push(o),A(e.length),e})},[w,c.rows]),L=t.useCallback(()=>{c.rows.length!==0&&(C(a=>a.filter((e,o)=>!c.rows.hasIndex(o))),A(a=>a-c.rows.length),x({columns:b.empty(),rows:b.empty()}))},[c.rows]),_=t.useCallback(()=>{if(g.length===0)return;const a=w.map(l=>l.title).join(","),e=g.map(l=>l.map(n=>{var u,p;let d="";return n.kind===m.Text||n.kind===m.Number?d=n.displayData??((u=n.data)==null?void 0:u.toString())??"":n.kind===m.Image||n.kind===m.Drilldown||n.kind===m.Bubble?d=Array.isArray(n.data)?n.data.join(";"):"":n.kind===m.Boolean&&(d=((p=n.data)==null?void 0:p.toString())??"false"),`"${d.replace(/"/g,'""')}"`}).join(",")),o="\uFEFF"+[a,...e].join(`
`),s=new Blob([o],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a"),i=URL.createObjectURL(s);r.setAttribute("href",i),r.setAttribute("download","grid-data.csv"),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)},[g,w]);return t.createElement(t.Fragment,null,t.createElement("div",null,t.createElement("button",{onClick:K},"열추가"),t.createElement("button",{onClick:L},"열삭제"),t.createElement("button",{onClick:_},"CSV다운로드")),t.createElement(J,{...Q,width:"100%",height:"500px",ref:f,columns:w,rows:V,getCellContent:E,isActivationOnEnter:!0,rowSelect:"single",rowSelectionMode:"multi",rowMarkers:{kind:"checkbox-visible",checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:!1,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"},rowNumber:!0},fillHandle:{size:6},onCellEdited:(a,e)=>{j(a,e)},onFillPattern:B,onPaste:W,onGridSelectionChange:x,gridSelection:c}))};D.storyName="06. Add Data";var O,P,T;D.parameters={...D.parameters,docs:{...(O=D.parameters)==null?void 0:O.docs,source:{originalSource:`() => {
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
      if (firstSelectedIndex !== undefined) {
        newData.splice(firstSelectedIndex + 1, 0, newRow);
      } else {
        newData.push(newRow);
      }
      setNumRows(newData.length);
      return newData;
    });
  }, [cols, gridSelection.rows]);
  const onDeleteRow = React.useCallback(() => {
    if (gridSelection.rows.length === 0) return;
    setData(prevData => prevData.filter((_, index) => !gridSelection.rows.hasIndex(index)));
    setNumRows(prevNum => prevNum - gridSelection.rows.length);
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
      rowNumber: true
    }} fillHandle={{
      size: 6
    }} onCellEdited={(cell, newValue) => {
      setCellValue(cell, newValue);
    }} onFillPattern={onFillPattern} onPaste={onPaste} onGridSelectionChange={setGridSelection} gridSelection={gridSelection} />
            
        </>;
}`,...(T=(P=D.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};const ue=["AddData"];export{D as AddData,ue as __namedExportsOrder,we as default};
