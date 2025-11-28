import{R as n}from"./iframe-mK_zHxtx.js";import{D as J}from"./data-editor-all-CTMqixH8.js";import{C as k,G as d,i as H}from"./image-window-loader-zklk82Uu.js";import{B as z,D as $,u as q,d as Q}from"./utils-C90P7WNL.js";import{S as X}from"./story-utils-CkI8_29d.js";import"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-B3b_RoAY.js";import"./flatten-sjXy7LIL.js";import"./scrolling-data-grid-PVQcj6dx.js";import"./marked.esm-D0OAygdb.js";import"./throttle--dN168Gr.js";const we={title:"Glide-Data-Grid/DataEditor Demos",decorators:[g=>n.createElement(X,null,n.createElement(z,{title:"Add data",description:n.createElement(n.Fragment,null,n.createElement($,null,"rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가 multi일때 선택방법), rowMarker (모양설정),",n.createElement("br",null),"rowSelection 제어 prop :gridSelection, onGridSelectionChange"))},n.createElement(g,null)))]},u=[{title:"First name",id:"First name"},{title:"Last name",id:"Last name"},{title:"Avatar",id:"Avatar"},{title:"Email",id:"Email"},{title:"Title",id:"Title"},{title:"More Info",id:"More Info"},{title:"Date",id:"Date",width:200}],v=["John","Jane","Bob","Alice","Charlie","Diana","Evan","Fiona","George","Hannah"],y=["Doe","Smith","Johnson","Brown","Williams","Jones","Miller","Davis","Garcia","Rodriguez"],E=["https://picsum.photos/id/10/900/900","https://picsum.photos/id/20/900/900","https://picsum.photos/id/30/900/900","https://picsum.photos/id/40/900/900","https://picsum.photos/id/50/900/900"],Y=(g,l=0)=>{switch(g){case 0:return{kind:d.Text,displayData:v[l%v.length],data:v[l%v.length],allowOverlay:!0,readonly:!1};case 1:return{kind:d.Text,displayData:y[l%y.length],data:y[l%y.length],allowOverlay:!0,readonly:!0};case 2:return{kind:d.Image,data:[E[l%E.length]],displayData:[E[l%E.length]],allowOverlay:!0,readonly:!0};case 3:return{kind:d.Number,displayData:(1e3+l*100).toLocaleString(),data:1e3+l*100,allowOverlay:!0,readonly:!1,contentAlign:"right"};case 4:return{kind:d.Boolean,displayData:l%2===0,data:l%2===0,allowOverlay:!1,readonly:!1};case 5:return{kind:d.Uri,displayData:`https://example.com/${l}`,data:`https://example.com/${l}`,hoverEffect:!0,allowOverlay:!0,readonly:!0,onClickUri:R=>{alert(JSON.stringify(R)),R.preventDefault()}};default:return{kind:d.Text,displayData:"2024-01-01",data:"2024-01-01",allowOverlay:!0,readonly:!1,contentAlign:"center"}}},x=(g,l=0)=>g.map((R,b)=>Y(b,l)),S=()=>{const g=n.useRef(null),[l,R]=n.useState({columns:k.empty(),rows:k.empty()});q(6);const b=10,[p,D]=n.useState(()=>{const t=[];for(let e=0;e<b;e++)t.push(x(u,e));return t}),[V,I]=n.useState(b),[F,O]=n.useState(new Set),C=n.useCallback(t=>{var i,s;const e=(i=p[t])==null?void 0:i[0],o=(s=p[t])==null?void 0:s[3];e&&"data"in e&&e.data;const c=o&&"data"in o?o.data+"":"";c!=null&&c.includes("gmail")?O(r=>new Set(r).add(t)):O(r=>{const a=new Set(r);return a.delete(t),a})},[p]),G=n.useCallback(([t,e])=>{var c;const o=(c=p[e])==null?void 0:c[t];return o===void 0?{kind:d.Text,displayData:"",data:"",allowOverlay:!0,readonly:!1}:F.has(e)?{...o,themeOverride:{bgCell:"#fff2b2"}}:o},[p,F]),j=n.useCallback(([t,e],o)=>{D(c=>{const i=[...c],s=[...i[e]||[]];return s[t]=o,i[e]=s,i}),C(e)},[C]),K=n.useCallback(t=>{const{patternSource:e,fillDestination:o}=t,c=[];for(let s=0;s<e.height;s++){const r=[];for(let a=0;a<e.width;a++)r.push(G([e.x+a,e.y+s]));c.push(r)}const i=new Set;D(s=>{const r=[...s];for(let a=0;a<o.height;a++){const w=o.y+a;r[w]||(r[w]=x(u,w));const h=[...r[w]];for(let m=0;m<o.width;m++){const f=c[a%e.height][m%e.width],A=o.x+m;H(f)&&(h[A]=f,i.add(w))}r[w]=h}return r}),i.forEach(s=>C(s))},[u,G,C]);n.useCallback((t,e)=>{const[o,c]=t,i=new Set;return D(s=>{const r=[...s];return e.forEach((a,w)=>{const h=c+w;r[h]||(r[h]=x(u,h));const m=[...r[h]];a.forEach((f,A)=>{const N=o+A;if(N<u.length){const M=m[N];if(H(M)){const _={...M,data:f};m[N]=_,i.add(h)}}}),r[h]=m}),r}),i.forEach(s=>C(s)),!1},[u.length,u,C]);const W=n.useCallback(()=>{D(t=>{const e=[...t],o=x(u,e.length),c=l.rows.first();return c!==void 0?e.splice(c+1,0,o):e.push(o),I(e.length),e})},[u,l.rows]),L=n.useCallback(()=>{l.rows.length!==0&&(D(t=>t.filter((e,o)=>!l.rows.hasIndex(o))),I(t=>t-l.rows.length),R({columns:k.empty(),rows:k.empty()}))},[l.rows]),U=n.useCallback(()=>{if(p.length===0)return;const t=u.map(r=>r.title).join(","),e=p.map(r=>r.map(a=>{var m,f;let w="";return a.kind===d.Text||a.kind===d.Number||a.kind===d.Uri||a.kind===d.Markdown?w=a.displayData??((m=a.data)==null?void 0:m.toString())??"":a.kind===d.Image||a.kind===d.Drilldown||a.kind===d.Bubble?w=Array.isArray(a.data)?a.data.join(";"):"":a.kind===d.Boolean&&(w=((f=a.data)==null?void 0:f.toString())??"false"),`"${w.replace(/"/g,'""')}"`}).join(",")),o="\uFEFF"+[t,...e].join(`
`),c=new Blob([o],{type:"text/csv;charset=utf-8;"}),i=document.createElement("a"),s=URL.createObjectURL(c);i.setAttribute("href",s),i.setAttribute("download","grid-data.csv"),i.style.visibility="hidden",document.body.appendChild(i),i.click(),document.body.removeChild(i)},[p,u]);return n.createElement(n.Fragment,null,n.createElement("div",null,n.createElement("button",{onClick:W},"열추가"),n.createElement("button",{onClick:L},"열삭제"),n.createElement("button",{onClick:U},"CSV다운로드")),n.createElement(J,{...Q,ref:g,columns:u,rows:V,getCellContent:G,isActivationOnEnter:!0,rowSelect:"single",rowSelectionMode:"multi",rowMarkers:{kind:"checkbox-visible",checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:!1,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},fillHandle:{size:6},onCellEdited:(t,e)=>{j(t,e)},onFillPattern:K,onPaste:!0,onGridSelectionChange:R,gridSelection:l,disabledRows:t=>t%3===0}))};S.storyName="06. Add Data";var P,T,B;S.parameters={...S.parameters,docs:{...(P=S.parameters)==null?void 0:P.docs,source:{originalSource:`() => {
  const gridRef = React.useRef<DataEditorRef>(null);
  const [gridSelection, setGridSelection] = React.useState<GridSelection>({
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
  });
  const {
    onColumnResize
  } = useMockDataGenerator(6); // 6 columns for the example

  const initialRows = 10;
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
      const row = [];
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
      if (cell.kind === GridCellKind.Text || cell.kind === GridCellKind.Number || cell.kind === GridCellKind.Uri || cell.kind === GridCellKind.Markdown) {
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
            <DataEditor {...defaultProps} ref={gridRef} columns={cols} rows={numRows} getCellContent={getCellContentWithHighlight} isActivationOnEnter={true} rowSelect="single" rowSelectionMode="multi" rowMarkers={{
      kind: "checkbox-visible",
      checkboxStyle: "square",
      headerAlwaysVisible: true,
      headerDisabled: false,
      headerTheme: {
        textMedium: "rgba(51, 51, 51, 0.50)"
      }
    }} fillHandle={{
      size: 6
    }} onCellEdited={(cell, newValue) => {
      setCellValue(cell, newValue);
    }} onFillPattern={onFillPattern} onPaste={true} onGridSelectionChange={setGridSelection} gridSelection={gridSelection} disabledRows={row => {
      return row % 3 === 0;
    }} />
        </>;
}`,...(B=(T=S.parameters)==null?void 0:T.docs)==null?void 0:B.source}}};const ue=["AddData"];export{S as AddData,ue as __namedExportsOrder,we as default};
