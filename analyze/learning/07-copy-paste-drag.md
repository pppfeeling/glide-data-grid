# 📋 Copy, Paste & Drag - 복사, 붙여넣기 및 드래그

클립보드 작업과 드래그 앤 드롭 기능을 학습합니다.

---

## 📘 Copy Support - 복사 지원

### 기본 복사
```typescript
<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    getCellsForSelection={true}  // 선택 영역 복사 활성화
/>
```

### 커스텀 복사 데이터
```typescript
const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;
    const data = getData(col, row);

    return {
        kind: GridCellKind.Text,
        data: data,
        displayData: data,
        copyData: `${data}\t추가정보`,  // 복사할 데이터 커스터마이징
        allowOverlay: true,
    };
};
```

---

## 📘 Paste Support - 붙여넣기 지원

### 기본 붙여넣기
```typescript
function PasteGrid() {
    const onPaste = React.useCallback((target: Item, values: string[][]) => {
        const [col, row] = target;

        // 붙여넣기 데이터 처리
        values.forEach((rowData, rowOffset) => {
            rowData.forEach((cellData, colOffset) => {
                const targetCol = col + colOffset;
                const targetRow = row + rowOffset;

                // 데이터 업데이트
                updateCell([targetCol, targetRow], cellData);
            });
        });

        return true; // 붙여넣기 성공
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            onPaste={onPaste}
        />
    );
}
```

---

## 📘 Fill Handle - 채우기 핸들

### Excel 스타일 채우기
```typescript
<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    fillHandle={true}  // 채우기 핸들 활성화
    onCellsEdited={(newValues) => {
        newValues.forEach(({ location, value }) => {
            updateCell(location, value);
        });
    }}
/>
```

---

## 📘 Drag Source - 드래그 소스

### 드래그 시작
```typescript
const onDragStart = React.useCallback((args: DragStartArgs) => {
    const { location } = args;
    const [col, row] = location;
    const cellData = getCellContent(location);

    // 드래그 데이터 설정
    args.setData("text/plain", cellData.displayData);
    args.setData("application/json", JSON.stringify({
        col,
        row,
        data: cellData.data,
    }));
}, []);

<DataEditor
    onDragStart={onDragStart}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Drop Events - 드롭 이벤트

### 드롭 처리
```typescript
const onDrop = React.useCallback((cell: Item, dataTransfer: DataTransfer | null) => {
    if (!dataTransfer) return;

    const [col, row] = cell;

    // 텍스트 드롭
    const text = dataTransfer.getData("text/plain");
    if (text) {
        updateCell(cell, text);
        return;
    }

    // 파일 드롭
    const files = dataTransfer.files;
    if (files.length > 0) {
        handleFileUpload(cell, files[0]);
    }
}, []);

<DataEditor
    onDrop={onDrop}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 🎓 학습 포인트

### Copy, Paste & Drag 완료 후 할 수 있는 것
✅ 복사/붙여넣기 구현
✅ Excel 스타일 채우기
✅ 드래그 앤 드롭
✅ 파일 드롭 처리

### 다음 단계
**Advanced Controls** 카테고리로 이동하세요!