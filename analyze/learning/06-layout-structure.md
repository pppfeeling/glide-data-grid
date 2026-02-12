# 📐 Layout & Structure - 레이아웃과 구조

그리드의 레이아웃과 구조를 제어하는 방법을 학습합니다.

---

## 📘 Row and Header Sizes - 행과 헤더 크기

### 행 높이 설정
```typescript
<DataEditor
    rowHeight={44}        // 모든 행 높이
    headerHeight={36}     // 헤더 높이
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

### 동적 행 높이
```typescript
const getRowThemeOverride = (row: number) => {
    if (row % 10 === 0) {
        return { rowHeight: 60 }; // 10번째 행마다 높이 증가
    }
    return undefined;
};
```

---

## 📘 Uneven Rows - 가변 행 높이

### 구현
```typescript
function UnevenRowsGrid() {
    const rowHeights = React.useRef<Map<number, number>>(new Map());

    // 각 행마다 다른 높이 설정
    React.useEffect(() => {
        for (let i = 0; i < 1000; i++) {
            const height = 30 + Math.random() * 40; // 30-70px
            rowHeights.current.set(i, height);
        }
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={1000}
            getCellContent={getCellContent}
            rowHeight={(row) => rowHeights.current.get(row) ?? 34}
        />
    );
}
```

---

## 📘 Column Groups - 컬럼 그룹

### 기본 그룹화
```typescript
const columns: GridColumn[] = [
    {
        title: "이름",
        id: "name",
        group: "개인정보",
    },
    {
        title: "이메일",
        id: "email",
        group: "개인정보",
    },
    {
        title: "부서",
        id: "department",
        group: "회사정보",
    },
    {
        title: "직급",
        id: "position",
        group: "회사정보",
    },
];

<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    groupHeaderHeight={32}
/>
```

---

## 📘 Column Group Collapse - 컬럼 그룹 접기

### 구현
```typescript
function CollapsibleGroupsGrid() {
    const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set());

    const toggleGroup = (group: string) => {
        setCollapsedGroups(prev => {
            const next = new Set(prev);
            if (next.has(group)) {
                next.delete(group);
            } else {
                next.add(group);
            }
            return next;
        });
    };

    const visibleColumns = columns.filter(col =>
        !collapsedGroups.has(col.group ?? "")
    );

    return (
        <DataEditor
            columns={visibleColumns}
            rows={100}
            getCellContent={getCellContent}
            onGroupHeaderClicked={toggleGroup}
        />
    );
}
```

---

## 📘 Freeze Columns - 컬럼 고정

### 왼쪽 고정
```typescript
<DataEditor
    freezeColumns={2}  // 왼쪽 2개 컬럼 고정
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Freeze Rows - 행 고정

### 상단 고정
```typescript
<DataEditor
    freezeRows={3}  // 상단 3개 행 고정
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Row Markers - 행 마커

### 마커 타입
```typescript
// 숫자만
<DataEditor rowMarkers="number" />

// 체크박스만
<DataEditor rowMarkers="checkbox" />

// 둘 다
<DataEditor rowMarkers="both" />

// 없음
<DataEditor rowMarkers="none" />
```

---

## 📘 Resizable Columns - 크기 조절 가능 컬럼

### 구현
```typescript
function ResizableGrid() {
    const [columns, setColumns] = React.useState(initialColumns);

    const onColumnResize = React.useCallback((column: GridColumn, newSize: number) => {
        setColumns(prev =>
            prev.map(c => c.id === column.id ? { ...c, width: newSize } : c)
        );
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            onColumnResize={onColumnResize}
            overscrollX={200}  // 마지막 컬럼 리사이징 용이
        />
    );
}
```

---

## 📘 Rearrange Columns - 컬럼 재배치

### 드래그 앤 드롭
```typescript
function RearrangeColumnsGrid() {
    const [columns, setColumns] = React.useState(initialColumns);

    const onColumnMoved = React.useCallback((startIndex: number, endIndex: number) => {
        setColumns(prev => {
            const result = [...prev];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        });
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            onColumnMoved={onColumnMoved}
        />
    );
}
```

---

## 📘 Reorder Rows - 행 재배치

### 구현
```typescript
function ReorderRowsGrid() {
    const [data, setData] = React.useState(initialData);

    const onRowMoved = React.useCallback((startIndex: number, endIndex: number) => {
        setData(prev => {
            const result = [...prev];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return result;
        });
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={data.length}
            getCellContent={getCellContent}
            onRowMoved={onRowMoved}
            rowMarkers="both"
        />
    );
}
```

---

## 📘 Span Cell - 셀 병합

### 셀 병합 구현
```typescript
const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;

    // 병합할 셀
    if (col === 0 && row === 5) {
        return {
            kind: GridCellKind.Text,
            data: "병합된 셀",
            displayData: "병합된 셀",
            allowOverlay: true,
            span: [0, 2], // [열, 행] 스팬
        };
    }

    return normalCell;
};
```

---

## 📘 Wrapping Text - 텍스트 줄바꿈

### 구현
```typescript
<DataEditor
    columns={columns}
    rows={100}
    getCellContent={(cell) => ({
        kind: GridCellKind.Text,
        data: "긴 텍스트...",
        displayData: "긴 텍스트...",
        allowOverlay: true,
        allowWrapping: true,  // 줄바꿈 허용
    })}
    rowHeight={60}  // 여러 줄을 위한 높이
/>
```

---

## 🎓 학습 포인트

### Layout & Structure 완료 후 할 수 있는 것
✅ 행/컬럼 크기 제어
✅ 컬럼 그룹화 및 접기
✅ 행/컬럼 고정
✅ 드래그 앤 드롭 재배치
✅ 셀 병합
✅ 텍스트 줄바꿈

### 다음 단계
**Copy, Paste & Drag** 카테고리로 이동하세요!