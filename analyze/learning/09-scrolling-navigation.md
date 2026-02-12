# 🚄 Scrolling & Navigation - 스크롤링과 네비게이션

그리드의 스크롤과 네비게이션을 제어하는 방법을 학습합니다.

---

## 📘 Smooth Scrolling - 부드러운 스크롤

### 활성화
```typescript
<DataEditor
    smoothScrollX={true}  // 가로 스크롤
    smoothScrollY={true}  // 세로 스크롤
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Imperative Scroll - 프로그래밍 방식 스크롤

### 구현
```typescript
function ScrollControlGrid() {
    const gridRef = React.useRef<DataEditorRef>(null);

    const scrollToTop = () => {
        gridRef.current?.scrollTo(0, 0);
    };

    const scrollToBottom = () => {
        gridRef.current?.scrollTo(0, 99999);
    };

    const scrollToCell = (col: number, row: number) => {
        gridRef.current?.scrollTo(col, row);
    };

    return (
        <>
            <button onClick={scrollToTop}>맨 위로</button>
            <button onClick={scrollToBottom}>맨 아래로</button>
            <button onClick={() => scrollToCell(5, 50)}>셀 (5, 50)으로</button>

            <DataEditor
                ref={gridRef}
                columns={columns}
                rows={100}
                getCellContent={getCellContent}
            />
        </>
    );
}
```

---

## 📘 Scroll Shadows - 스크롤 그림자

### 활성화
```typescript
<DataEditor
    scrollIndicators={{
        left: true,
        right: true,
        top: true,
        bottom: true,
    }}
    theme={{
        scrollShadowColor: "rgba(0, 0, 0, 0.1)",
    }}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Overscroll - 오버스크롤

### 설정
```typescript
<DataEditor
    overscrollX={200}  // 오른쪽 여백
    overscrollY={100}  // 아래쪽 여백
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Observe Visible Region - 가시 영역 관찰

### 구현
```typescript
function VisibleRegionGrid() {
    const [visibleRegion, setVisibleRegion] = React.useState<Rectangle>();

    const onVisibleRegionChanged = React.useCallback((range: Rectangle) => {
        setVisibleRegion(range);
        console.log(`보이는 영역: ${range.x}, ${range.y}, ${range.width}, ${range.height}`);

        // 지연 로딩
        loadDataForRegion(range);
    }, []);

    return (
        <>
            <div>
                가시 영역: 컬럼 {visibleRegion?.x} ~ {visibleRegion?.x + visibleRegion?.width},
                행 {visibleRegion?.y} ~ {visibleRegion?.y + visibleRegion?.height}
            </div>

            <DataEditor
                columns={columns}
                rows={100000}
                getCellContent={getCellContent}
                onVisibleRegionChanged={onVisibleRegionChanged}
            />
        </>
    );
}
```

---

## 🎓 학습 포인트

### Scrolling & Navigation 완료 후 할 수 있는 것
✅ 부드러운 스크롤 효과
✅ 프로그래밍 방식 스크롤 제어
✅ 스크롤 그림자 표시
✅ 가시 영역 추적 및 지연 로딩

### 다음 단계
**Performance** 카테고리로 이동하세요!