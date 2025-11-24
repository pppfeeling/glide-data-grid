import{R as n}from"./iframe-Cdn7Weob.js";import{D as L}from"./data-editor-all-CCXuWirP.js";import{C as k,G as c,i as M}from"./image-window-loader-CDJX2pm9.js";import{B as _,D as $,u as q,d as z}from"./utils-Cs_JJNhb.js";import{S as J}from"./story-utils-NdpI15u4.js";import{y as w}from"./index-D_kXk1yT.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-BQPBlX3O.js";import"./flatten-DaOm-iAz.js";import"./scrolling-data-grid-8nsunyS7.js";import"./marked.esm-Bd9Q6jcK.js";import"./throttle--dN168Gr.js";const ce={title:"Glide-Data-Grid/DataEditor Demos",decorators:[h=>n.createElement(J,null,n.createElement(_,{title:"Add data",description:n.createElement(n.Fragment,null,n.createElement($,null,"rowSelection 관련 prop : rowSelec(single, multi), rowSelectionMode - (rowSelect가 multi일때 선택방법), rowMarker (모양설정),",n.createElement("br",null),"rowSelection 제어 prop :gridSelection, onGridSelectionChange"))},n.createElement(h,null)))]},u=[{title:"First name",id:"First name"},{title:"Last name",id:"Last name"},{title:"Avatar",id:"Avatar"},{title:"Email",id:"Email"},{title:"Title",id:"Title"},{title:"More Info",id:"More Info"},{title:"Date",id:"Date",width:200}],Q=h=>{switch(h){case 0:return{kind:c.Text,displayData:w.name.firstName(),data:w.name.firstName(),allowOverlay:!0,readonly:!1};case 1:return{kind:c.Text,displayData:w.name.lastName(),data:w.name.lastName(),allowOverlay:!0,readonly:!0};case 2:return{kind:c.Image,data:[`https://picsum.photos/id/${Math.round(Math.random()*100)}/900/900`],displayData:[`https://picsum.photos/id/${Math.round(Math.random()*100)}/40/40`],allowOverlay:!0,readonly:!0};case 3:return{kind:c.Number,displayData:w.datatype.number().toLocaleString(),data:w.datatype.number(),allowOverlay:!0,readonly:!1,contentAlign:"right"};case 4:return{kind:c.Boolean,displayData:w.datatype.boolean(),data:w.datatype.boolean(),allowOverlay:!1,readonly:!1};case 5:return{kind:c.Uri,displayData:w.internet.url(),data:w.internet.url(),hoverEffect:!0,allowOverlay:!0,readonly:!0,onClickUri:m=>{alert(JSON.stringify(m)),m.preventDefault()}};default:return{kind:c.Text,displayData:w.date.recent().toISOString().slice(0,10),data:w.date.recent().toISOString().slice(0,10),allowOverlay:!0,readonly:!1,contentAlign:"center"}}},y=h=>h.map((m,b)=>Q(b)),S=()=>{const h=n.useRef(null),[m,b]=n.useState({columns:k.empty(),rows:k.empty()});q(6);const I=10,[g,D]=n.useState(()=>{const t=[];for(let e=0;e<I;e++)t.push(y(u));return t}),[T,G]=n.useState(I),[N,A]=n.useState(new Set),C=n.useCallback(t=>{var r,i;const e=(r=g[t])==null?void 0:r[0],o=(i=g[t])==null?void 0:i[3];e&&"data"in e&&e.data;const s=o&&"data"in o?o.data+"":"";s!=null&&s.includes("gmail")?A(l=>new Set(l).add(t)):A(l=>{const a=new Set(l);return a.delete(t),a})},[g]),v=n.useCallback(([t,e])=>{var s;const o=(s=g[e])==null?void 0:s[t];return o===void 0?{kind:c.Text,displayData:"",data:"",allowOverlay:!0,readonly:!1}:N.has(e)?{...o,themeOverride:{bgCell:"#fff2b2"}}:o},[g,N]),V=n.useCallback(([t,e],o)=>{D(s=>{const r=[...s],i=[...r[e]||[]];return i[t]=o,r[e]=i,r}),C(e)},[C]),j=n.useCallback(t=>{const{patternSource:e,fillDestination:o}=t,s=[];for(let i=0;i<e.height;i++){const l=[];for(let a=0;a<e.width;a++)l.push(v([e.x+a,e.y+i]));s.push(l)}const r=new Set;D(i=>{const l=[...i];for(let a=0;a<o.height;a++){const d=o.y+a;l[d]||(l[d]=y(u));const p=[...l[d]];for(let f=0;f<o.width;f++){const R=s[a%e.height][f%e.width],x=o.x+f;M(R)&&(p[x]=R,r.add(d))}l[d]=p}return l}),r.forEach(i=>C(i))},[u,v,C]);n.useCallback((t,e)=>{const[o,s]=t,r=new Set;return D(i=>{const l=[...i];return e.forEach((a,d)=>{const p=s+d;l[p]||(l[p]=y(u));const f=[...l[p]];a.forEach((R,x)=>{const E=o+x;if(E<u.length){const O=f[E];if(M(O)){const W={...O,data:R};f[E]=W,r.add(p)}}}),l[p]=f}),l}),r.forEach(i=>C(i)),!1},[u.length,u,C]);const K=n.useCallback(()=>{D(t=>{const e=[...t],o=y(u),s=m.rows.first();return s!==void 0?e.splice(s+1,0,o):e.push(o),G(e.length),e})},[u,m.rows]),B=n.useCallback(()=>{m.rows.length!==0&&(D(t=>t.filter((e,o)=>!m.rows.hasIndex(o))),G(t=>t-m.rows.length),b({columns:k.empty(),rows:k.empty()}))},[m.rows]),U=n.useCallback(()=>{if(g.length===0)return;const t=u.map(l=>l.title).join(","),e=g.map(l=>l.map(a=>{var f,R;let d="";return a.kind===c.Text||a.kind===c.Number||a.kind===c.Uri||a.kind===c.Markdown?d=a.displayData??((f=a.data)==null?void 0:f.toString())??"":a.kind===c.Image||a.kind===c.Drilldown||a.kind===c.Bubble?d=Array.isArray(a.data)?a.data.join(";"):"":a.kind===c.Boolean&&(d=((R=a.data)==null?void 0:R.toString())??"false"),`"${d.replace(/"/g,'""')}"`}).join(",")),o="\uFEFF"+[t,...e].join(`
`),s=new Blob([o],{type:"text/csv;charset=utf-8;"}),r=document.createElement("a"),i=URL.createObjectURL(s);r.setAttribute("href",i),r.setAttribute("download","grid-data.csv"),r.style.visibility="hidden",document.body.appendChild(r),r.click(),document.body.removeChild(r)},[g,u]);return n.createElement(n.Fragment,null,n.createElement("div",null,n.createElement("button",{onClick:K},"열추가"),n.createElement("button",{onClick:B},"열삭제"),n.createElement("button",{onClick:U},"CSV다운로드")),n.createElement(L,{...z,ref:h,columns:u,rows:T,getCellContent:v,isActivationOnEnter:!0,rowSelect:"single",rowSelectionMode:"multi",rowMarkers:{kind:"checkbox-visible",checkboxStyle:"square",headerAlwaysVisible:!0,headerDisabled:!1,headerTheme:{textMedium:"rgba(51, 51, 51, 0.50)"}},fillHandle:{size:6},onCellEdited:(t,e)=>{V(t,e)},onFillPattern:j,onPaste:!0,onGridSelectionChange:b,gridSelection:m,disabledRows:t=>t%3===0}))};S.storyName="06. Add Data";var F,H,P;S.parameters={...S.parameters,docs:{...(F=S.parameters)==null?void 0:F.docs,source:{originalSource:`() => {
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
      initialData.push(generateNewRow(cols));
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
          newData[targetRowIndex] = generateNewRow(cols);
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
          newData[writeRowIndex] = generateNewRow(cols);
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
      const newRow = generateNewRow(cols);
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
}`,...(P=(H=S.parameters)==null?void 0:H.docs)==null?void 0:P.source}}};const de=["AddData"];export{S as AddData,de as __namedExportsOrder,ce as default};
