# 🔍 Search & Filter - 검색과 필터

그리드 내에서 데이터를 검색하고 필터링하는 방법을 학습합니다.

---

## 📘 Built-in Search - 내장 검색

### 개요
DataEditor에 내장된 검색 기능을 사용하여 빠르게 데이터를 찾을 수 있습니다.

### 기본 사용법
```typescript
<DataEditor
    columns={columns}
    rows={1000}
    getCellContent={getCellContent}
    showSearch={true}              // 검색 UI 표시
    getCellsForSelection={true}    // 검색 최적화
    onSearchClose={() => {
        console.log("검색 닫힘");
    }}
/>
```

### 키보드 단축키
- **Ctrl+F** (Windows) / **Cmd+F** (Mac) - 검색 열기
- **Enter** - 다음 결과로 이동
- **Shift+Enter** - 이전 결과로 이동
- **Escape** - 검색 닫기

### 검색 결과 커스터마이징
```typescript
const theme = {
    bgSearchResult: "#fef3c7",      // 검색 결과 배경색
    textBubble: "#78350f",          // 검색 카운터 텍스트
};

<DataEditor
    theme={theme}
    showSearch={true}
    columns={columns}
    rows={1000}
    getCellContent={getCellContent}
/>
```

---

## 📘 Controlled Search - 제어된 검색

### 개요
검색 상태를 직접 제어하여 커스텀 검색 UI를 구현합니다.

### 완전 제어 검색
```typescript
function ControlledSearchGrid() {
    const [searchValue, setSearchValue] = React.useState("");
    const [showSearch, setShowSearch] = React.useState(false);

    return (
        <>
            <div style={{ padding: 16 }}>
                <input
                    type="text"
                    placeholder="검색..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{
                        padding: "8px 12px",
                        border: "2px solid #4F46E5",
                        borderRadius: 4,
                        width: 300,
                    }}
                />
                <button onClick={() => setShowSearch(!showSearch)}>
                    {showSearch ? "검색 숨기기" : "검색 표시"}
                </button>
            </div>

            <DataEditor
                columns={columns}
                rows={1000}
                getCellContent={getCellContent}
                showSearch={showSearch}
                onSearchClose={() => setShowSearch(false)}
                searchValue={searchValue}
                onSearchValueChange={setSearchValue}
            />
        </>
    );
}
```

### 검색 결과 처리
```typescript
const [searchResults, setSearchResults] = React.useState<Item[]>([]);

const onSearchResultsChanged = React.useCallback((results: readonly Item[]) => {
    setSearchResults([...results]);
    console.log(`${results.length}개의 결과 찾음`);
}, []);

<DataEditor
    showSearch={true}
    onSearchResultsChanged={onSearchResultsChanged}
    columns={columns}
    rows={1000}
    getCellContent={getCellContent}
/>
```

---

## 📘 Search as Filter - 필터로서의 검색

### 개요
검색 결과를 사용하여 행을 필터링합니다.

### 필터 구현
```typescript
function FilteredGrid() {
    const [allData, setAllData] = React.useState(/* 전체 데이터 */);
    const [filterText, setFilterText] = React.useState("");

    // 필터링된 데이터
    const filteredData = React.useMemo(() => {
        if (!filterText) return allData;

        return allData.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [allData, filterText]);

    // 필터링된 데이터의 인덱스 매핑
    const rowMap = React.useMemo(() => {
        const map = new Map<number, number>();
        let filteredIndex = 0;

        allData.forEach((row, originalIndex) => {
            if (filteredData.includes(row)) {
                map.set(filteredIndex++, originalIndex);
            }
        });

        return map;
    }, [allData, filteredData]);

    const getCellContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const originalRow = rowMap.get(row) ?? row;
        const data = allData[originalRow];

        return {
            kind: GridCellKind.Text,
            data: data[columns[col].id],
            displayData: data[columns[col].id],
            allowOverlay: true,
        };
    }, [allData, rowMap]);

    return (
        <>
            <input
                type="text"
                placeholder="필터..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                style={{ padding: 8, margin: 16, width: 300 }}
            />
            <div style={{ padding: 16, color: "#666" }}>
                {filteredData.length} / {allData.length} 행 표시 중
            </div>

            <DataEditor
                columns={columns}
                rows={filteredData.length}
                getCellContent={getCellContent}
            />
        </>
    );
}
```

### 다중 필터
```typescript
interface FilterState {
    column?: string;
    value: string;
    operator: "equals" | "contains" | "startsWith";
}

function MultiFilterGrid() {
    const [filters, setFilters] = React.useState<FilterState[]>([]);

    const applyFilters = (data: any[]) => {
        return data.filter((row) =>
            filters.every((filter) => {
                const cellValue = String(row[filter.column ?? ""]).toLowerCase();
                const filterValue = filter.value.toLowerCase();

                switch (filter.operator) {
                    case "equals":
                        return cellValue === filterValue;
                    case "contains":
                        return cellValue.includes(filterValue);
                    case "startsWith":
                        return cellValue.startsWith(filterValue);
                    default:
                        return true;
                }
            })
        );
    };

    const filteredData = applyFilters(allData);

    return (
        <>
            <FilterUI filters={filters} setFilters={setFilters} />
            <DataEditor
                columns={columns}
                rows={filteredData.length}
                getCellContent={getCellContentFromFiltered(filteredData)}
            />
        </>
    );
}
```

### 컬럼별 필터
```typescript
function ColumnFilterGrid() {
    const [columnFilters, setColumnFilters] = React.useState<Record<string, string>>({});

    const columns: GridColumn[] = baseColumns.map((col) => ({
        ...col,
        headerMenu: (colIndex) => ({
            items: [
                {
                    title: "필터",
                    onClick: () => showFilterDialog(col.id),
                },
                {
                    title: "필터 초기화",
                    onClick: () => {
                        setColumnFilters((prev) => {
                            const next = { ...prev };
                            delete next[col.id];
                            return next;
                        });
                    },
                },
            ],
        }),
    }));

    const filteredData = React.useMemo(() => {
        return allData.filter((row) =>
            Object.entries(columnFilters).every(
                ([columnId, filterValue]) =>
                    String(row[columnId]).toLowerCase().includes(filterValue.toLowerCase())
            )
        );
    }, [allData, columnFilters]);

    return (
        <DataEditor
            columns={columns}
            rows={filteredData.length}
            getCellContent={getCellContentFromFiltered(filteredData)}
        />
    );
}
```

---

## 🎓 학습 포인트

### Search & Filter 카테고리 완료 후 할 수 있는 것
✅ 내장 검색 기능 사용
✅ 커스텀 검색 UI 구현
✅ 검색 결과로 데이터 필터링
✅ 다중 필터 조건 적용
✅ 컬럼별 개별 필터

### 실전 활용
- 대용량 데이터에서 빠른 검색
- Excel과 유사한 필터 기능
- 사용자 정의 검색 인터페이스

### 다음 단계
**Selection & Interaction** 카테고리로 이동하여 사용자 상호작용을 학습하세요!