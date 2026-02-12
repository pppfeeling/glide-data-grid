# ⚡ Performance - 성능 최적화

대용량 데이터를 효율적으로 처리하는 방법을 학습합니다.

---

## 📘 One Million Rows - 백만 행

### 가상화 (Virtualization)
```typescript
<DataEditor
    columns={columns}
    rows={1000000}  // 백만 행
    getCellContent={getCellContent}
    // 가상화 자동 처리
/>
```

### 핵심 원리
- 화면에 보이는 셀만 렌더링
- 스크롤 시 동적으로 렌더링
- 메모리 효율적

---

## 📘 Server Side Data - 서버 사이드 데이터

### 지연 로딩 구현
```typescript
function ServerSideGrid() {
    const [data, setData] = React.useState(new Map());
    const [loading, setLoading] = React.useState(new Set());

    const loadDataForCell = async (col: number, row: number) => {
        const key = `${col}-${row}`;

        if (data.has(key) || loading.has(key)) {
            return;
        }

        setLoading(prev => new Set(prev).add(key));

        try {
            const cellData = await fetchCellData(col, row);
            setData(prev => new Map(prev).set(key, cellData));
        } finally {
            setLoading(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        }
    };

    const getCellContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const key = `${col}-${row}`;

        if (loading.has(key)) {
            return {
                kind: GridCellKind.Loading,
                allowOverlay: false,
            };
        }

        const cellData = data.get(key);
        if (!cellData) {
            // 데이터 없으면 로딩 시작
            loadDataForCell(col, row);
            return {
                kind: GridCellKind.Loading,
                allowOverlay: false,
            };
        }

        return {
            kind: GridCellKind.Text,
            data: cellData,
            displayData: cellData,
            allowOverlay: true,
        };
    }, [data, loading]);

    return (
        <DataEditor
            columns={columns}
            rows={10000000}  // 천만 행 (서버에서 로딩)
            getCellContent={getCellContent}
        />
    );
}
```

---

## 📘 Rapid Updates - 빠른 업데이트

### 최적화된 업데이트
```typescript
function RapidUpdateGrid() {
    const [data, setData] = React.useState(initialData);

    // 배치 업데이트
    const updateCells = React.useCallback((updates: CellUpdate[]) => {
        setData(prev => {
            const next = new Map(prev);
            updates.forEach(({ cell, value }) => {
                next.set(`${cell[0]}-${cell[1]}`, value);
            });
            return next;
        });
    }, []);

    // 실시간 업데이트 시뮬레이션
    React.useEffect(() => {
        const interval = setInterval(() => {
            const updates: CellUpdate[] = [];
            for (let i = 0; i < 100; i++) {
                updates.push({
                    cell: [Math.floor(Math.random() * 10), Math.floor(Math.random() * 100)],
                    value: Math.random().toString(),
                });
            }
            updateCells(updates);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
        />
    );
}
```

---

## 🎓 학습 포인트

### Performance 완료 후 할 수 있는 것
✅ 백만 행 이상 처리
✅ 서버 사이드 데이터 로딩
✅ 실시간 업데이트 최적화
✅ 메모리 효율적 구현

### 다음 단계
**Integration & Advanced** 카테고리로 이동하세요!