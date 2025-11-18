import{R as t}from"./iframe-BiMpfC1x.js";import{D as K}from"./data-editor-all-D0YZoO_n.js";import{i as B,G as u}from"./image-window-loader-DCZwJCoB.js";import{b as A,c as $,M as j,d as P}from"./utils-CZDpDWvW.js";import{S as _}from"./story-utils-Dj9cimTO.js";import{u as H}from"./useGridDataProcessing-DtL0CKsg.js";import"./preload-helper-C1FmrZbK.js";import"./throttle-D1BBloZG.js";import"./flatten-B48GLVnS.js";import"./scrolling-data-grid-W_4ADNho.js";import"./marked.esm-junou-0M.js";import"./index-D_kXk1yT.js";import"./throttle--dN168Gr.js";const rt={title:"Glide-Data-Grid/DataEditor Demos",decorators:[i=>t.createElement(_,null,t.createElement(i,null))]},g=()=>{const{cols:i,getCellContent:m,rows:y}=A(),D=t.useMemo(()=>{var o;const e=[];for(let n=0;n<y;n++){const l={originalIndex:n};for(let a=0;a<i.length;a++){const r=i[a].id??i[a].title,c=m([a,n]);if(B(c))switch(c.kind){case u.Number:case u.Text:case u.Uri:case u.Markdown:l[r]=c.data;break;case u.Boolean:l[r]=(o=c.data)==null?void 0:o.toString();break;default:l[r]=c.copyData}}e.push(l)}return e},[i,m,y]),[C,I]=t.useState(()=>new Map),[f,k]=t.useState([]),[S,G]=t.useState([]),[w,O]=t.useState(!1),d=(e,o,n)=>{I(l=>{const a=new Map(l),r=a.get(e)||{};return a.set(e,{...r,[o]:n}),a})},{filterConfig:T,groupingFunctions:R,groupingLabels:L}=t.useMemo(()=>{const e=[],o=new Map,n=new Map;C.forEach((a,r)=>{a.filterValue&&e.push({key:r,operator:a.filterOperator??"Contain",value:a.filterValue,condition:a.filterCondition??"AND"}),a.groupingLabel&&o.set(r,a.groupingLabel),a.groupingFunction&&n.set(r,a.groupingFunction)});const l={filterConfig:{filterOptions:e},groupingFunctions:n,groupingLabels:o};return console.log("[SearchDataEditor] Derived Configs:",l),l},[C]),{processedData:h,totalSummaryRow:v}=H(D,{filterConfig:T,sortState:f,groupingState:S,groupingFunctions:R,groupingLabels:L,showTotals:w,cols:i}),p=t.useMemo(()=>v?[...h,v]:h,[h,v]),M=e=>{k(o=>{const n=o.findIndex(a=>a.key===e),l=[...o];if(n!==-1){const a=l[n];a.order==="asc"?a.order="desc":l.splice(n,1)}else l.push({key:e,order:"asc"});return l})},W=e=>{G(o=>{const n=[...o],l=n.indexOf(e);return l!==-1?n.splice(l,1):n.push(e),n})},F=e=>{const o=S.indexOf(e);return o===-1?"그룹핑":`그룹핑 (${o+1})`},N=e=>{const o=f.findIndex(r=>r.key===e);if(o===-1)return"정렬";const l=f[o].order==="asc"?"오름차순":"내림차순",a=o+1;return`${l} ${f.length>1?`(${a})`:""}`.trim()},V=t.useCallback(([e,o])=>{const n=p[o];if(!n)return{kind:u.Text,data:"",displayData:"",allowOverlay:!1};const l=i[e],a=l.id??l.title;if(n.isTotalSummary){const s=n[a];return{kind:u.Text,data:s!==void 0?String(s):"",displayData:s!==void 0?String(s):"",allowOverlay:!1,readonly:!0,themeOverride:{bgCell:"#f7f7f7",textDark:"#000000",bgCellMedium:"#f0f0f0"}}}if(n.isGroupSummary){const s=n[a];return s!==void 0?{kind:u.Text,data:String(s),displayData:String(s),allowOverlay:!1,readonly:!0,themeOverride:{bgCell:"#e0e0e0"}}:{kind:u.Text,data:"",displayData:"",allowOverlay:!1,readonly:!0,themeOverride:{bgCell:"#e0e0e0"}}}const r=n.originalIndex;return r!==void 0?m([e,r]):{kind:u.Text,data:"Error",displayData:"Error",allowOverlay:!1}},[i,m,p,S]),q=t.useCallback(e=>{const o=p[e];if(o&&o.isGroupSummary)return{bgCell:"#e0e0e0"};if(o&&o.isTotalSummary)return{bgCell:"#f7f7f7",bgCellMedium:"#f0f0f0"}},[p]);return t.createElement($,{title:"Sort, filter, grouping",height:"400px",description:t.createElement(t.Fragment,null,t.createElement("div",null,t.createElement("input",{type:"checkbox",checked:w,onChange:e=>O(e.target.checked)}),"총 합계 보이기 (제일 마지막열)"),t.createElement("table",null,t.createElement("thead",null,t.createElement("tr",null,t.createElement("td",null,"컬럼명"),t.createElement("td",null,"조건"),t.createElement("td",null,"연산자"),t.createElement("td",null,"값"),t.createElement("td",null,"정렬"),t.createElement("td",null,"필터링"),t.createElement("td",null,"그룹핑"),t.createElement("td",null,"그룹핑 레이블"),t.createElement("td",null,"그룹핑 함수"))),t.createElement("tbody",null,i.map(e=>{const o=C.get(e.title)||{};return t.createElement("tr",{key:e.id},t.createElement("td",null,e.title),t.createElement("td",null,t.createElement("select",{value:o.filterCondition??"AND",onChange:n=>d(e.title,"filterCondition",n.target.value)},t.createElement("option",{value:"AND"},"AND"),t.createElement("option",{value:"OR"},"OR"))),t.createElement("td",null,t.createElement("select",{value:o.filterOperator??"Contain",onChange:n=>d(e.title,"filterOperator",n.target.value)},t.createElement("option",{value:"Contain"},"Contain"),t.createElement("option",{value:"Not Contain"},"Not Contain"),t.createElement("option",{value:"Equals"},"Equals"),t.createElement("option",{value:"NotEqual"},"NotEqual"),t.createElement("option",{value:"StartWith"},"StartWith"),t.createElement("option",{value:"EndWith"},"EndWith"),t.createElement("option",{value:"Great"},"Great"),t.createElement("option",{value:"GreatWithEqual"},"GreatWithEqual"),t.createElement("option",{value:"Less"},"Less"),t.createElement("option",{value:"LessWithEqual"},"LessWithEqual"),t.createElement("option",{value:"Between"},"Between"))),t.createElement("td",null,t.createElement("input",{type:"text",value:o.filterValue??"",onChange:n=>d(e.title,"filterValue",n.target.value)})),t.createElement("td",null,t.createElement("button",{onClick:()=>M(e.title)},N(e.title))),t.createElement("td",null,t.createElement("button",{onClick:()=>{}},"필터링")),t.createElement("td",null,t.createElement("button",{onClick:()=>W(e.title)},F(e.title))),t.createElement("td",null,t.createElement("input",{type:"text",placeholder:"그룹 레이블",value:o.groupingLabel??"",onChange:n=>d(e.title,"groupingLabel",n.target.value)})),t.createElement("td",null,t.createElement("select",{value:o.groupingFunction??"",onChange:n=>d(e.title,"groupingFunction",n.target.value)},t.createElement("option",{value:""},"없음"),t.createElement("option",{value:"label"},"label"),t.createElement("option",{value:"sum"},"Sum"),t.createElement("option",{value:"count"},"Count"),t.createElement("option",{value:"avg"},"Avg"),t.createElement("option",{value:"min"},"Min"),t.createElement("option",{value:"max"},"Max"))))}))),t.createElement(j,null))},t.createElement(K,{...P,height:"100%",getCellContent:V,columns:i,rows:p.length,getRowThemeOverride:q,freezeTrailingRows:1}))};g.storyName="05. Sort, filter, grouping";var E,b,x;g.parameters={...g.parameters,docs:{...(E=g.parameters)==null?void 0:E.docs,source:{originalSource:`() => {
  const {
    cols,
    getCellContent,
    rows
  } = useStaticMockData();
  const initialData = React.useMemo(() => {
    const data: any[] = [];
    for (let i = 0; i < rows; i++) {
      const row: any = {
        originalIndex: i
      };
      for (let j = 0; j < cols.length; j++) {
        const colKey = cols[j].id ?? cols[j].title;
        const cell = getCellContent([j, i]);
        if (isEditableGridCell(cell)) {
          switch (cell.kind) {
            case GridCellKind.Number:
            case GridCellKind.Text:
            case GridCellKind.Uri:
            case GridCellKind.Markdown:
              row[colKey] = cell.data;
              break;
            case GridCellKind.Boolean:
              row[colKey] = cell.data?.toString();
              break;
            default:
              row[colKey] = cell.copyData;
          }
        }
      }
      data.push(row);
    }
    return data;
  }, [cols, getCellContent, rows]);
  const [columnInputs, setColumnInputs] = React.useState<Map<string, Partial<ColumnInput>>>(() => new Map());
  const [sortState, setSortState] = React.useState<{
    key: string;
    order: "asc" | "desc";
  }[]>([]);
  const [groupingState, setGroupingState] = React.useState<string[]>([]);
  const [showTotals, setShowTotals] = React.useState(false);
  const handleColumnInputChange = (columnTitle: string, field: keyof ColumnInput, value: any) => {
    setColumnInputs(prev => {
      const newInputs = new Map(prev);
      const current = newInputs.get(columnTitle) || {};
      newInputs.set(columnTitle, {
        ...current,
        [field]: value
      });
      return newInputs;
    });
  };
  const {
    filterConfig,
    groupingFunctions,
    groupingLabels
  } = React.useMemo(() => {
    const filterOptions: FilterOption<any>[] = [];
    const groupingLabels = new Map<string, string>();
    const groupingFunctions = new Map<string, string>();
    columnInputs.forEach((input, key) => {
      if (input.filterValue) {
        filterOptions.push({
          key: key,
          operator: input.filterOperator ?? "Contain",
          value: input.filterValue,
          condition: input.filterCondition ?? "AND"
        });
      }
      if (input.groupingLabel) {
        groupingLabels.set(key, input.groupingLabel);
      }
      if (input.groupingFunction) {
        groupingFunctions.set(key, input.groupingFunction);
      }
    });
    const derivedConfigs = {
      filterConfig: {
        filterOptions
      },
      groupingFunctions,
      groupingLabels
    };
    console.log("[SearchDataEditor] Derived Configs:", derivedConfigs);
    return derivedConfigs;
  }, [columnInputs]);
  const {
    processedData,
    totalSummaryRow
  } = useGridDataProcessing(initialData, {
    filterConfig,
    sortState,
    groupingState,
    groupingFunctions,
    groupingLabels,
    showTotals,
    cols
  });
  const finalData = React.useMemo(() => {
    return totalSummaryRow ? [...processedData, totalSummaryRow] : processedData;
  }, [processedData, totalSummaryRow]);
  const handleSort = (columnTitle: string) => {
    setSortState(currentSortState => {
      const existingSortIndex = currentSortState.findIndex(s => s.key === columnTitle);
      const newSortState = [...currentSortState];
      if (existingSortIndex !== -1) {
        const existingSort = newSortState[existingSortIndex];
        if (existingSort.order === "asc") {
          existingSort.order = "desc";
        } else {
          newSortState.splice(existingSortIndex, 1);
        }
      } else {
        newSortState.push({
          key: columnTitle,
          order: "asc"
        });
      }
      return newSortState;
    });
  };
  const handleGroupingClick = (columnTitle: string) => {
    setGroupingState(currentGroupingState => {
      const newGroupingState = [...currentGroupingState];
      const existingIndex = newGroupingState.indexOf(columnTitle);
      if (existingIndex !== -1) {
        newGroupingState.splice(existingIndex, 1);
      } else {
        newGroupingState.push(columnTitle);
      }
      return newGroupingState;
    });
  };
  const getGroupingButtonLabel = (columnTitle: string): string => {
    const groupIndex = groupingState.indexOf(columnTitle);
    if (groupIndex === -1) {
      return "그룹핑";
    }
    const priority = groupIndex + 1;
    return \`그룹핑 (\${priority})\`;
  };
  const getSortButtonLabel = (columnTitle: string): string => {
    const sortIndex = sortState.findIndex(s => s.key === columnTitle);
    if (sortIndex === -1) {
      return "정렬";
    }
    const sortOption = sortState[sortIndex];
    const orderLabel = sortOption.order === "asc" ? "오름차순" : "내림차순";
    const priority = sortIndex + 1;
    return \`\${orderLabel} \${sortState.length > 1 ? \`(\${priority})\` : ""}\`.trim();
  };
  const getCell = React.useCallback(([col, row]: Item): GridCell => {
    const rowData = finalData[row];
    if (!rowData) {
      return {
        kind: GridCellKind.Text,
        data: "",
        displayData: "",
        allowOverlay: false
      };
    }
    const column = cols[col];
    const colId = column.id ?? column.title;
    if ((rowData as any).isTotalSummary) {
      const totalSummaryRow = rowData as any;
      const totalValue = totalSummaryRow[colId];
      return {
        kind: GridCellKind.Text,
        data: totalValue !== undefined ? String(totalValue) : "",
        displayData: totalValue !== undefined ? String(totalValue) : "",
        allowOverlay: false,
        readonly: true,
        themeOverride: {
          bgCell: "#f7f7f7",
          textDark: "#000000",
          bgCellMedium: "#f0f0f0"
        }
      };
    }
    if ((rowData as any).isGroupSummary) {
      const summaryRow = rowData as GroupSummaryRow;
      const summaryValue = summaryRow[colId];
      if (summaryValue !== undefined) {
        return {
          kind: GridCellKind.Text,
          data: String(summaryValue),
          displayData: String(summaryValue),
          allowOverlay: false,
          readonly: true,
          themeOverride: {
            bgCell: "#e0e0e0"
          }
        };
      }
      return {
        kind: GridCellKind.Text,
        data: "",
        displayData: "",
        allowOverlay: false,
        readonly: true,
        themeOverride: {
          bgCell: "#e0e0e0"
        }
      };
    }
    const originalIndex = (rowData as any).originalIndex;
    if (originalIndex !== undefined) {
      return getCellContent([col, originalIndex]);
    }
    return {
      kind: GridCellKind.Text,
      data: "Error",
      displayData: "Error",
      allowOverlay: false
    };
  }, [cols, getCellContent, finalData, groupingState]);
  const getRowThemeOverride = React.useCallback((row: number): Partial<Theme> | undefined => {
    const rowData = finalData[row];
    if (rowData && (rowData as any).isGroupSummary) {
      return {
        bgCell: "#e0e0e0"
      };
    }
    if (rowData && (rowData as any).isTotalSummary) {
      return {
        bgCell: "#f7f7f7",
        bgCellMedium: "#f0f0f0"
      };
    }
    return undefined;
  }, [finalData]);
  return <BeautifulWrapperHeight title="Sort, filter, grouping" height={"400px"} description={<>
                    <div>
                        <input type="checkbox" checked={showTotals} onChange={e => setShowTotals(e.target.checked)} />총
                        합계 보이기 (제일 마지막열)
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>컬럼명</td>
                                <td>조건</td>
                                <td>연산자</td>
                                <td>값</td>
                                <td>정렬</td>
                                <td>필터링</td>
                                <td>그룹핑</td>
                                <td>그룹핑 레이블</td>
                                <td>그룹핑 함수</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cols.map(col => {
          const inputs = columnInputs.get(col.title) || {};
          return <tr key={col.id}>
                                        <td>{col.title}</td>
                                        <td>
                                            <select value={inputs.filterCondition ?? "AND"} onChange={e => handleColumnInputChange(col.title, "filterCondition", e.target.value as FilterCondition)}>
                                                <option value="AND">AND</option>
                                                <option value="OR">OR</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select value={inputs.filterOperator ?? "Contain"} onChange={e => handleColumnInputChange(col.title, "filterOperator", e.target.value as FilterOperator)}>
                                                <option value="Contain">Contain</option>
                                                <option value="Not Contain">Not Contain</option>
                                                <option value="Equals">Equals</option>
                                                <option value="NotEqual">NotEqual</option>
                                                <option value="StartWith">StartWith</option>
                                                <option value="EndWith">EndWith</option>
                                                <option value="Great">Great</option>
                                                <option value="GreatWithEqual">GreatWithEqual</option>
                                                <option value="Less">Less</option>
                                                <option value="LessWithEqual">LessWithEqual</option>
                                                <option value="Between">Between</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="text" value={inputs.filterValue ?? ""} onChange={e => handleColumnInputChange(col.title, "filterValue", e.target.value)}></input>
                                        </td>
                                        <td>
                                            <button onClick={() => handleSort(col.title)}>
                                                {getSortButtonLabel(col.title)}
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => {
                /* We dont need apply filter button anymore */
              }}>
                                                필터링
                                            </button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleGroupingClick(col.title)}>
                                                {getGroupingButtonLabel(col.title)}
                                            </button>
                                        </td>
                                        <td>
                                            <input type="text" placeholder="그룹 레이블" value={inputs.groupingLabel ?? ""} onChange={e => handleColumnInputChange(col.title, "groupingLabel", e.target.value)} />
                                        </td>
                                        <td>
                                            <select value={inputs.groupingFunction ?? ""} onChange={e => handleColumnInputChange(col.title, "groupingFunction", e.target.value)}>
                                                <option value="">없음</option>
                                                <option value="label">label</option>
                                                <option value="sum">Sum</option>
                                                <option value="count">Count</option>
                                                <option value="avg">Avg</option>
                                                <option value="min">Min</option>
                                                <option value="max">Max</option>
                                            </select>
                                        </td>
                                    </tr>;
        })}
                        </tbody>
                    </table>
                    <MoreInfo></MoreInfo>
                </>}>
            <DataEditor {...defaultProps} height="100%" getCellContent={getCell} columns={cols} rows={finalData.length} getRowThemeOverride={getRowThemeOverride} freezeTrailingRows={1} />
        </BeautifulWrapperHeight>;
}`,...(x=(b=g.parameters)==null?void 0:b.docs)==null?void 0:x.source}}};const it=["SearchDataEditor"];export{g as SearchDataEditor,it as __namedExportsOrder,rt as default};
