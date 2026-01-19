# 데이터 처리 (필터/정렬/그룹) 분석

## 개요
Glide Data Grid는 데이터 처리(필터, 정렬)를 직접 수행하지 않습니다.
데이터는 외부에서 관리하고, 그리드는 `getCellContent` 콜백을 통해 표시만 합니다.

## 아키텍처 원칙

```
[외부 데이터 소스] ← 필터/정렬 적용
        ↓
    rows (총 행 수)
        ↓
getCellContent(cell) → 셀 데이터 반환
        ↓
    [Glide Data Grid] → 표시
```

## 데이터 제공 패턴

### 기본 패턴
```typescript
// 외부에서 데이터 관리
const [data, setData] = useState<RowData[]>(initialData);
const [filteredData, setFilteredData] = useState<RowData[]>(initialData);

// 필터 적용
const applyFilter = (filter: FilterCondition) => {
    setFilteredData(data.filter(row => matchesFilter(row, filter)));
};

// 정렬 적용
const applySort = (column: string, direction: "asc" | "desc") => {
    setFilteredData([...filteredData].sort((a, b) => {
        return direction === "asc"
            ? a[column].localeCompare(b[column])
            : b[column].localeCompare(a[column]);
    }));
};

// 그리드에 제공
<DataEditor
    rows={filteredData.length}
    getCellContent={([col, row]) => {
        const rowData = filteredData[row];
        return {
            kind: GridCellKind.Text,
            data: rowData[columns[col].id],
            displayData: rowData[columns[col].id],
            allowOverlay: true,
        };
    }}
/>
```

### 가상화된 데이터 (대용량)
```typescript
// 필요한 데이터만 로드
const getCellContent = useCallback(([col, row]: Item): GridCell => {
    // 캐시 확인
    const cached = cache.get(row);
    if (cached) {
        return createCell(cached, col);
    }

    // 로딩 셀 반환 & 비동기 로드
    loadRowAsync(row).then(data => {
        cache.set(row, data);
        gridRef.current?.updateCells([{ cell: [col, row] }]);
    });

    return { kind: GridCellKind.Loading, allowOverlay: false };
}, [cache]);
```

## 행 그룹핑 (Row Grouping)

### RowGroupingOptions
```typescript
// data-editor/row-grouping.ts
interface RowGroupingOptions {
    // 그룹 정보 제공
    readonly getGroupDetails: (rowIndex: number) => {
        readonly group: string;      // 그룹 ID
        readonly isCollapsed?: boolean;
    };

    // 그룹 헤더 높이
    readonly groupHeaderHeight?: number;

    // 접기/펼치기 콜백
    readonly onGroupCollapsedChanged?: (group: string, collapsed: boolean) => void;

    // 그룹 렌더링 커스터마이징
    readonly drawGroupHeader?: (args: DrawGroupHeaderArgs) => void;
}
```

### useRowGroupingInner 훅
```typescript
// data-editor/row-grouping.ts
function useRowGroupingInner(
    rowGrouping: RowGroupingOptions | undefined,
    rowsIn: number,
    rowHeightIn: number | ((index: number) => number),
    getRowThemeOverrideIn: GetRowThemeCallback | undefined
): {
    rows: number;
    rowNumberMapper: (row: number) => number;
    rowHeight: (row: number) => number;
    getRowThemeOverride: GetRowThemeCallback | undefined;
}
```

### 그룹핑 사용 예시
```typescript
const [groupState, setGroupState] = useState<Record<string, boolean>>({});

<DataEditor
    rows={data.length}
    rowGrouping={{
        getGroupDetails: (rowIndex) => ({
            group: data[rowIndex].category,
            isCollapsed: groupState[data[rowIndex].category] ?? false,
        }),
        onGroupCollapsedChanged: (group, collapsed) => {
            setGroupState(prev => ({ ...prev, [group]: collapsed }));
        },
    }}
    getCellContent={getCellContent}
/>
```

## 검색 기능

### 내장 검색
```typescript
<DataEditor
    showSearch={true}
    onSearchClose={() => setShowSearch(false)}
    searchValue={searchValue}
    onSearchValueChange={setSearchValue}
    searchResults={searchResults}  // [col, row][] 형태
    onSearchResultsChanged={setSearchResults}
/>
```

### 검색 결과 계산 (외부)
```typescript
const calculateSearchResults = useCallback((query: string) => {
    if (!query) {
        setSearchResults([]);
        return;
    }

    const results: Item[] = [];
    const lowerQuery = query.toLowerCase();

    for (let row = 0; row < data.length; row++) {
        for (let col = 0; col < columns.length; col++) {
            const value = data[row][columns[col].id];
            if (value?.toString().toLowerCase().includes(lowerQuery)) {
                results.push([col, row]);
            }
        }
    }

    setSearchResults(results);
}, [data, columns]);
```

## 하이라이트 영역

### Highlight 타입
```typescript
// render/data-grid-render.cells.ts:56-60
interface Highlight {
    readonly color: string;
    readonly range: Rectangle;
    readonly style?: "dashed" | "solid" | "no-outline" | "solid-outline";
}
```

### 사용 예시
```typescript
// 특정 영역 강조
const highlightRegions: Highlight[] = [
    {
        color: "rgba(255, 200, 0, 0.2)",
        range: { x: 2, y: 5, width: 3, height: 2 },
        style: "solid",
    },
    {
        color: "rgba(255, 0, 0, 0.1)",
        range: { x: 0, y: 10, width: 10, height: 1 },
        style: "dashed",
    },
];

<DataEditor highlightRegions={highlightRegions} />
```

## 행 상태 표시 (A/U/D)

### rowMarkers.rowStatus 옵션
```typescript
<DataEditor
    rowMarkers={{
        kind: "checkbox",
        rowStatus: true,
        rowStatusWidth: 40,
        rowStatusTheme: {
            textDark: "#666",
        },
    }}
    onRowStatus={(rowIndex) => {
        // "A": Added
        // "U": Updated
        // "D": Deleted
        // undefined: 표시 안함
        return data[rowIndex].status;
    }}
/>
```

## 비활성화된 행

### disabledRows
```typescript
<DataEditor
    disabledRows={(row) => {
        // true: 비활성화 (선택/편집 불가)
        return data[row].isLocked;
    }}
/>
```

### CompactSelection으로 전달
```typescript
// 내부적으로 CompactSelection 사용
const disabledRowsSelection = useMemo(() => {
    const disabled: number[] = [];
    for (let i = 0; i < rows; i++) {
        if (isRowDisabled(i)) {
            disabled.push(i);
        }
    }
    return CompactSelection.fromArray(disabled);
}, [rows, isRowDisabled]);
```

## 컬럼 자동 크기

### useColumnSizer 훅
```typescript
// data-editor/use-column-sizer.ts
const { sizedColumns, nonGrowWidth } = useColumnSizer(
    columnsIn,
    rows,
    getCellsForSelection,
    availableWidth,
    minColumnWidth,
    maxColumnAutoWidth,
    theme,
    getCellRenderer,
    abortController
);
```

### measureColumn 함수
```typescript
// 셀 내용 기반 컬럼 너비 계산
function measureColumn(
    ctx: CanvasRenderingContext2D,
    column: GridColumn,
    rows: number,
    getCellContent: (cell: Item) => GridCell,
    theme: FullTheme,
    getCellRenderer: GetCellRendererCallback
): number {
    let maxWidth = 0;

    // 샘플 행 측정
    for (let row = 0; row < Math.min(rows, 1000); row++) {
        const cell = getCellContent([colIndex, row]);
        const renderer = getCellRenderer(cell);
        if (renderer?.measure) {
            maxWidth = Math.max(maxWidth, renderer.measure(ctx, cell, theme));
        }
    }

    return maxWidth;
}
```

## onVisibleRegionChanged

```typescript
// 가시 영역 변경시 호출 (가상 스크롤링용)
<DataEditor
    onVisibleRegionChanged={(range, tx, ty, extras) => {
        // range: 보이는 셀 범위 { x, y, width, height }
        // tx, ty: 스크롤 오프셋
        // extras.selected: 선택된 셀 (보이는 경우)
        // extras.freezeRegions: 고정 컬럼 영역

        // 보이는 데이터만 로드
        loadDataRange(range.y, range.y + range.height);
    }}
/>
```

## 데이터 갱신

### updateCells (부분 갱신)
```typescript
const gridRef = useRef<DataEditorRef>(null);

// 특정 셀만 갱신
const updateSpecificCells = (cells: Item[]) => {
    gridRef.current?.updateCells(
        cells.map(cell => ({ cell }))
    );
};

// 전체 갱신 (데이터 변경 후)
useEffect(() => {
    // React가 리렌더링하면 자동으로 갱신됨
}, [data]);
```

## 수정 시 주의사항

1. **불변성**: data 배열 변경시 새 참조 생성
2. **가상화**: 대용량 데이터는 보이는 부분만 로드
3. **캐싱**: getCellContent가 자주 호출되므로 메모이제이션 권장
4. **정렬/필터**: 그리드 외부에서 처리, rows와 getCellContent만 업데이트
5. **그룹핑**: rowNumberMapper로 논리적 행 번호 매핑
