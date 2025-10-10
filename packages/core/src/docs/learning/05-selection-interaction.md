# 🎯 Selection & Interaction - 선택과 상호작용

사용자가 그리드와 상호작용하는 다양한 방법을 학습합니다.

---

## 📘 Row Selections - 행 선택

### 개요
체크박스를 사용하여 여러 행을 선택할 수 있습니다.

### 기본 구현
```typescript
function RowSelectionGrid() {
    const [selection, setSelection] = React.useState<CompactSelection>(
        CompactSelection.empty()
    );

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            rowMarkers="both"  // 체크박스 표시
            rowSelect="multi"  // 다중 선택
            gridSelection={selection}
            onGridSelectionChange={setSelection}
        />
    );
}
```

### 선택 모드
```typescript
// 단일 선택
<DataEditor rowSelect="single" />

// 다중 선택
<DataEditor rowSelect="multi" />

// 선택 비활성화
<DataEditor rowSelect="none" />
```

### 선택된 행 가져오기
```typescript
const getSelectedRows = (): number[] => {
    return [...selection.rows].map(range => {
        const rows: number[] = [];
        for (let i = range[0]; i <= range[1]; i++) {
            rows.push(i);
        }
        return rows;
    }).flat();
};

const selectedRows = getSelectedRows();
console.log(`${selectedRows.length}개 행 선택됨`);
```

### 프로그래밍 방식 선택
```typescript
const selectRows = (rows: number[]) => {
    const newSelection = CompactSelection.empty().add(rows);
    setSelection(newSelection);
};

// 처음 10개 행 선택
selectRows([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

// 모두 선택
const selectAll = () => {
    const allRows = Array.from({ length: numRows }, (_, i) => i);
    selectRows(allRows);
};

// 선택 해제
const clearSelection = () => {
    setSelection(CompactSelection.empty());
};
```

---

## 📘 Controlled Selection - 제어된 선택

### 개요
선택 상태를 완전히 제어하여 커스텀 동작을 구현합니다.

### 완전 제어 선택
```typescript
function ControlledSelectionGrid() {
    const [gridSelection, setGridSelection] = React.useState({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
        current: undefined,
    });

    const onGridSelectionChange = React.useCallback((newSelection) => {
        // 선택 변경 전 검증
        const selectedRowCount = newSelection.rows.length;

        if (selectedRowCount > 10) {
            alert("최대 10개 행만 선택할 수 있습니다");
            return; // 변경 거부
        }

        setGridSelection(newSelection);
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            gridSelection={gridSelection}
            onGridSelectionChange={onGridSelectionChange}
        />
    );
}
```

### 조건부 선택 허용
```typescript
const onGridSelectionChange = React.useCallback((newSelection) => {
    // 특정 행은 선택 불가
    const protectedRows = [0, 1, 2]; // 헤더 행 보호

    const filteredRows = newSelection.rows.filter(range => {
        return !protectedRows.some(pr => pr >= range[0] && pr <= range[1]);
    });

    setGridSelection({
        ...newSelection,
        rows: CompactSelection.fromRange(filteredRows),
    });
}, []);
```

---

## 📘 Multi Select Columns - 다중 컬럼 선택

### 개요
여러 컬럼을 동시에 선택할 수 있습니다.

### 기본 구현
```typescript
<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    columnSelect="multi"  // 다중 컬럼 선택
    rangeSelect="rect"    // 사각형 영역 선택
    gridSelection={gridSelection}
    onGridSelectionChange={setGridSelection}
/>
```

### 선택된 컬럼 처리
```typescript
const getSelectedColumns = (): number[] => {
    return [...gridSelection.columns];
};

// 선택된 컬럼의 데이터 추출
const getSelectedData = (): any[][] => {
    const selectedCols = getSelectedColumns();
    const selectedRows = getSelectedRows();

    return selectedRows.map(row =>
        selectedCols.map(col => getCellContent([col, row]).data)
    );
};
```

---

## 📘 Selection Serialization - 선택 직렬화

### 개요
선택 상태를 저장하고 복원합니다.

### 선택 저장 및 로드
```typescript
function SerializedSelectionGrid() {
    const [gridSelection, setGridSelection] = React.useState<GridSelection>({
        columns: CompactSelection.empty(),
        rows: CompactSelection.empty(),
    });

    // 선택 상태 저장
    const saveSelection = () => {
        const serialized = {
            columns: [...gridSelection.columns],
            rows: [...gridSelection.rows.items()],
        };
        localStorage.setItem("gridSelection", JSON.stringify(serialized));
        console.log("선택 상태 저장됨");
    };

    // 선택 상태 복원
    const loadSelection = () => {
        const saved = localStorage.getItem("gridSelection");
        if (saved) {
            const parsed = JSON.parse(saved);
            setGridSelection({
                columns: CompactSelection.fromSingleSelection(parsed.columns),
                rows: CompactSelection.fromRanges(parsed.rows),
            });
            console.log("선택 상태 복원됨");
        }
    };

    return (
        <>
            <button onClick={saveSelection}>선택 저장</button>
            <button onClick={loadSelection}>선택 로드</button>

            <DataEditor
                columns={columns}
                rows={100}
                getCellContent={getCellContent}
                gridSelection={gridSelection}
                onGridSelectionChange={setGridSelection}
            />
        </>
    );
}
```

---

## 📘 Cell Activated Event - 셀 활성화 이벤트

### 개요
셀 클릭 및 활성화 이벤트를 처리합니다.

### 클릭 이벤트
```typescript
function CellClickGrid() {
    const onCellClicked = React.useCallback((cell: Item) => {
        const [col, row] = cell;
        console.log(`셀 클릭: 컬럼 ${col}, 행 ${row}`);

        // 특정 컬럼 클릭 시 동작
        if (col === 0) {
            // 첫 번째 컬럼 클릭 시 상세 정보 표시
            showDetailModal(row);
        }
    }, []);

    const onCellActivated = React.useCallback((cell: Item) => {
        const [col, row] = cell;
        console.log(`셀 활성화 (더블클릭): 컬럼 ${col}, 행 ${row}`);
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            onCellClicked={onCellClicked}
            onCellActivated={onCellActivated}
        />
    );
}
```

### 우클릭 메뉴
```typescript
const onCellContextMenu = React.useCallback((cell: Item, event: CellClickedEventArgs) => {
    const [col, row] = cell;

    event.preventDefault();

    showContextMenu({
        x: event.bounds.x,
        y: event.bounds.y,
        items: [
            {
                title: "복사",
                onClick: () => copyCell(cell),
            },
            {
                title: "삭제",
                onClick: () => deleteCell(cell),
            },
            {
                title: "행 삭제",
                onClick: () => deleteRow(row),
            },
        ],
    });
}, []);
```

---

## 📘 Row Hover - 행 호버

### 개요
마우스를 올렸을 때 행을 강조 표시합니다.

### 기본 호버 효과
```typescript
<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    theme={{
        bgCell: "#ffffff",
        bgCellMedium: "#f9fafb",
        // 호버 시 배경색
        accentLight: "#e0e7ff",
    }}
    rowMarkers="both"
/>
```

### 커스텀 호버 효과
```typescript
function CustomHoverGrid() {
    const [hoveredRow, setHoveredRow] = React.useState<number | undefined>();

    const getCellContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const isHovered = row === hoveredRow;

        return {
            kind: GridCellKind.Text,
            data: getData(col, row),
            displayData: getData(col, row),
            allowOverlay: true,
            themeOverride: isHovered ? {
                bgCell: "#e0e7ff",
                textDark: "#3730a3",
            } : undefined,
        };
    }, [hoveredRow]);

    const onItemHovered = React.useCallback((args: GridMouseEventArgs) => {
        if (args.kind === "cell") {
            const [, row] = args.location;
            setHoveredRow(row);
        } else {
            setHoveredRow(undefined);
        }
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            onItemHovered={onItemHovered}
        />
    );
}
```

---

## 🎓 학습 포인트

### Selection & Interaction 완료 후 할 수 있는 것
✅ 행/컬럼 선택 구현
✅ 선택 상태 제어
✅ 클릭 이벤트 처리
✅ 선택 상태 저장/복원
✅ 호버 효과 커스터마이징

### 다음 단계
**Layout & Structure** 카테고리로 이동하여 그리드 레이아웃을 학습하세요!