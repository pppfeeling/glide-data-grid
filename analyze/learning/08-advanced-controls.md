# 🎮 Advanced Controls - 고급 컨트롤

그리드의 고급 컨트롤과 기능을 학습합니다.

---

## 📘 Header Menus - 헤더 메뉴

### 구현
```typescript
const columns: GridColumn[] = [
    {
        title: "이름",
        id: "name",
        hasMenu: true,
    },
];

const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
    showMenu({
        x: bounds.x,
        y: bounds.y + bounds.height,
        items: [
            { title: "정렬 (오름차순)", onClick: () => sortAsc(col) },
            { title: "정렬 (내림차순)", onClick: () => sortDesc(col) },
            { title: "필터", onClick: () => showFilter(col) },
            { title: "숨기기", onClick: () => hideColumn(col) },
        ],
    });
}, []);

<DataEditor
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
    onHeaderMenuClick={onHeaderMenuClick}
/>
```

---

## 📘 Tooltips - 툴팁

### 구현
```typescript
const getCellContent = (cell: Item): GridCell => {
    return {
        kind: GridCellKind.Text,
        data: "데이터",
        displayData: "데이터",
        tooltip: "이 셀에 대한 추가 정보",  // 툴팁 설정
        allowOverlay: true,
    };
};
```

---

## 📘 Keybindings - 키바인딩

### 커스텀 키보드 단축키
```typescript
const onKeyDown = React.useCallback((event: React.KeyboardEvent) => {
    // Ctrl+S: 저장
    if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        saveData();
        return;
    }

    // Delete: 삭제
    if (event.key === "Delete") {
        deleteSelectedCells();
        return;
    }
}, []);

<DataEditor
    onKeyDown={onKeyDown}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Trailing Row Options - 트레일링 로우 옵션

### 커스터마이징
```typescript
<DataEditor
    trailingRowOptions={{
        sticky: true,
        tint: true,
        hint: "새 행 추가하려면 클릭...",
        addIcon: "➕",
        targetColumn: 0,  // 특정 컬럼에만 표시
    }}
    onRowAppended={() => {
        addNewRow();
    }}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Right Element - 오른쪽 요소

### 커스텀 요소 추가
```typescript
<DataEditor
    rightElement={
        <div style={{ padding: 16 }}>
            <button onClick={addColumn}>➕ 컬럼 추가</button>
            <button onClick={exportData}>📥 내보내기</button>
        </div>
    }
    rightElementProps={{
        fill: false,
        sticky: true,
    }}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 🎓 학습 포인트

### Advanced Controls 완료 후 할 수 있는 것
✅ 헤더 메뉴 구현
✅ 툴팁 표시
✅ 커스텀 키바인딩
✅ 트레일링 로우 커스터마이징
✅ 오른쪽 요소 추가

### 다음 단계
**Scrolling & Navigation** 카테고리로 이동하세요!