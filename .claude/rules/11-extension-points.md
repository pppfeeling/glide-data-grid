---
paths:
  - "packages/core/src/data-editor/data-editor.tsx"
---

# 확장 포인트 가이드

## 개요
Glide Data Grid의 주요 확장 포인트와 커스터마이징 방법

## 1. 커스텀 셀 렌더러

### 구현 단계
```typescript
// 1. 커스텀 셀 데이터 타입 정의
interface MyRatingCellData {
    kind: "rating";
    rating: number;    // 0-5
    readonly?: boolean;
}

interface MyRatingCell extends CustomCell<MyRatingCellData> {
    readonly kind: GridCellKind.Custom;
}

// 2. 렌더러 구현
const ratingCellRenderer: CustomRenderer<MyRatingCell> = {
    kind: GridCellKind.Custom,

    // 셀 매칭
    isMatch: (cell): cell is MyRatingCell =>
        (cell.data as MyRatingCellData)?.kind === "rating",

    // 렌더링
    draw: (args, cell) => {
        const { ctx, rect, theme, hoverAmount } = args;
        const { rating } = cell.data;

        const starSize = 16;
        const startX = rect.x + theme.cellHorizontalPadding;
        const centerY = rect.y + rect.height / 2;

        for (let i = 0; i < 5; i++) {
            const filled = i < rating;
            ctx.fillStyle = filled
                ? (hoverAmount > 0 ? theme.accentColor : "#FFD700")
                : theme.textLight;
            // 별 그리기...
            drawStar(ctx, startX + i * (starSize + 2), centerY, starSize / 2, filled);
        }
    },

    // 너비 측정
    measure: (ctx, cell, theme) => {
        return 5 * 18 + theme.cellHorizontalPadding * 2;
    },

    // 호버 필요 (별 클릭용)
    needsHover: true,
    needsHoverPosition: true,

    // 클릭 처리
    onClick: (args) => {
        if (args.cell.data.readonly) return undefined;

        const { posX, bounds, theme, cell } = args;
        const relX = posX - bounds.x - theme.cellHorizontalPadding;
        const starIndex = Math.floor(relX / 18);

        if (starIndex >= 0 && starIndex < 5) {
            return {
                ...cell,
                data: {
                    ...cell.data,
                    rating: starIndex + 1,
                },
            };
        }
        return undefined;
    },

    // 붙여넣기
    onPaste: (val, data) => {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 0 && num <= 5) {
            return { ...data, rating: num };
        }
        return undefined;
    },
};

// 3. 등록
<DataEditor customRenderers={[ratingCellRenderer]} />
```

### 셀 데이터 제공
```typescript
const getCellContent = ([col, row]: Item): GridCell => {
    if (columns[col].id === "rating") {
        return {
            kind: GridCellKind.Custom,
            allowOverlay: false,
            copyData: data[row].rating.toString(),
            data: {
                kind: "rating",
                rating: data[row].rating,
            },
        };
    }
    // 다른 셀...
};
```

## 2. 커스텀 에디터

### provideEditor 사용
```typescript
// DataEditor에서 전역 설정
<DataEditor
    provideEditor={(cell) => {
        // 특정 셀 타입에 대한 커스텀 에디터
        if (cell.kind === GridCellKind.Text && cell.data?.includes("@")) {
            return {
                editor: EmailEditor,
                disablePadding: true,
                styleOverride: { minWidth: 300 },
            };
        }
        // undefined 반환시 기본 에디터 사용
        return undefined;
    }}
/>

// 에디터 컴포넌트
const EmailEditor: React.FC<EditorProps<TextCell>> = (props) => {
    const { value, onChange, onFinishedEditing, isHighlighted } = props;

    return (
        <div className="email-editor">
            <input
                autoFocus
                type="email"
                value={value.data}
                onChange={(e) => onChange({
                    ...value,
                    data: e.target.value,
                    displayData: e.target.value,
                })}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onFinishedEditing(value, [0, 1]);
                    } else if (e.key === "Escape") {
                        onFinishedEditing(undefined, [0, 0]);
                    }
                }}
            />
            {/* 이메일 자동완성 등 추가 UI */}
        </div>
    );
};
```

### 렌더러에서 에디터 제공
```typescript
const myRenderer: CustomRenderer<MyCell> = {
    // ...
    provideEditor: (cell) => ({
        editor: (props) => {
            const { value, onChange, onFinishedEditing } = props;
            return (
                <MyCustomEditor
                    data={value.data}
                    onSave={(newData) => {
                        onChange({ ...value, data: newData });
                        onFinishedEditing({ ...value, data: newData }, [0, 1]);
                    }}
                    onCancel={() => onFinishedEditing(undefined, [0, 0])}
                />
            );
        },
        disablePadding: true,
        disableStyling: true,  // 기본 스타일 제거
    }),
};
```

## 3. 커스텀 헤더 렌더링

### drawHeader 콜백
```typescript
<DataEditor
    drawHeader={(args, draw) => {
        const { ctx, column, rect, theme, isSelected, isHovered, spriteManager } = args;

        // 특정 컬럼만 커스텀 렌더링
        if (column.id === "priority") {
            // 배경
            ctx.fillStyle = isSelected ? theme.bgHeaderHasFocus : theme.bgHeader;
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

            // 커스텀 아이콘
            const iconY = rect.y + rect.height / 2 - 8;
            drawPriorityIcon(ctx, rect.x + 8, iconY);

            // 텍스트
            ctx.fillStyle = theme.textHeader;
            ctx.fillText(column.title, rect.x + 30, rect.y + rect.height / 2);

            return true;  // 기본 렌더링 건너뛰기
        }

        // 기본 렌더링 사용
        return false;
        // 또는 draw()를 호출하여 기본 렌더링 후 추가 작업
    }}
/>
```

## 4. 커스텀 셀 렌더링 (drawCell)

### drawCell 콜백
```typescript
<DataEditor
    drawCell={(args, draw) => {
        const { ctx, cell, col, row, rect, theme } = args;

        // 특정 조건의 셀에 배경 효과 추가
        if (data[row].hasWarning) {
            ctx.fillStyle = "rgba(255, 200, 0, 0.2)";
            ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        }

        // 기본 렌더링 실행
        draw();

        // 추가 오버레이 (예: 배지)
        if (data[row].isNew) {
            ctx.fillStyle = "#FF4444";
            ctx.beginPath();
            ctx.arc(rect.x + rect.width - 8, rect.y + 8, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        return true;  // 처리됨
    }}
/>
```

## 5. 커스텀 아이콘

### headerIcons prop
```typescript
const customIcons: SpriteMap = {
    // SVG 문자열 반환 함수
    customStar: (fgColor, bgColor) => `
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fill="${fgColor}" d="M10 1l2.5 6.5H19l-5 4 2 6.5-6-4.5-6 4.5 2-6.5-5-4h6.5z"/>
        </svg>
    `,

    customFlag: (fgColor, bgColor) => `
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="2" height="16" fill="${fgColor}"/>
            <path fill="${bgColor}" d="M4 2h12v8H4z"/>
        </svg>
    `,
};

<DataEditor headerIcons={customIcons} />

// 컬럼에서 사용
const columns: GridColumn[] = [
    {
        title: "Priority",
        icon: "customStar",  // 커스텀 아이콘 사용
        width: 100,
    },
];
```

## 6. 테마 확장

### 전역 테마
```typescript
const customTheme: Partial<Theme> = {
    // 색상
    accentColor: "#6366F1",
    accentFg: "#FFFFFF",
    accentLight: "rgba(99, 102, 241, 0.1)",

    // 셀
    bgCell: "#FAFAFA",
    borderColor: "rgba(0, 0, 0, 0.08)",

    // 폰트
    fontFamily: "'Noto Sans KR', sans-serif",
    baseFontStyle: "14px",
    headerFontStyle: "600 14px",

    // 간격
    cellHorizontalPadding: 12,
    cellVerticalPadding: 8,
};

<DataEditor theme={customTheme} />
```

### 조건부 테마
```typescript
// 행별 테마
const getRowThemeOverride = (row: number): Partial<Theme> | undefined => {
    const rowData = data[row];

    if (rowData.status === "error") {
        return { bgCell: "#FEE2E2" };
    }
    if (rowData.status === "warning") {
        return { bgCell: "#FEF3C7" };
    }
    if (row % 2 === 1) {
        return { bgCell: "#F9FAFB" };  // 줄무늬
    }
    return undefined;
};

// 셀별 테마
const getCellContent = ([col, row]: Item): GridCell => ({
    kind: GridCellKind.Text,
    data: value,
    displayData: value,
    allowOverlay: true,
    themeOverride: value.startsWith("-")
        ? { textDark: "#DC2626" }  // 음수는 빨간색
        : undefined,
});
```

## 7. 이벤트 확장

### 키보드 단축키 추가
```typescript
<DataEditor
    onKeyDown={(event) => {
        // Ctrl+S: 저장
        if ((event.ctrlKey || event.metaKey) && event.key === "s") {
            event.preventDefault();
            handleSave();
            return;
        }

        // Ctrl+Shift+D: 행 복제
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === "d") {
            event.preventDefault();
            duplicateSelectedRows();
            return;
        }
    }}
/>
```

### 컨텍스트 메뉴
```typescript
const [contextMenu, setContextMenu] = useState<{ x: number; y: number; cell: Item } | null>(null);

<DataEditor
    onCellContextMenu={(cell, event) => {
        event.preventDefault();
        setContextMenu({
            x: event.bounds.x + event.localEventX,
            y: event.bounds.y + event.localEventY,
            cell,
        });
    }}
/>

{contextMenu && (
    <ContextMenu
        x={contextMenu.x}
        y={contextMenu.y}
        onCopy={() => handleCopy(contextMenu.cell)}
        onDelete={() => handleDelete(contextMenu.cell)}
        onClose={() => setContextMenu(null)}
    />
)}
```

## 8. 드래그 앤 드롭

### 외부로 드래그
```typescript
<DataEditor
    isDraggable={true}
    onDragStart={(args) => {
        if (args.kind === "cell") {
            const cellData = getCellContent(args.location);
            args.setData("text/plain", cellData.data);
            args.setData("application/json", JSON.stringify({
                type: "grid-cell",
                location: args.location,
                data: cellData.data,
            }));
        }
    }}
/>
```

### 외부에서 드롭 받기
```typescript
<DataEditor
    onDragOverCell={(cell, dataTransfer) => {
        // 드롭 가능 여부 표시
        if (dataTransfer?.types.includes("Files")) {
            return true;  // 허용
        }
        return false;
    }}
    onDrop={(cell, dataTransfer) => {
        if (dataTransfer?.files.length > 0) {
            const file = dataTransfer.files[0];
            handleFileDrop(cell, file);
        }
    }}
/>
```

## 9. 검색 확장

### 커스텀 검색 UI
```typescript
const [searchValue, setSearchValue] = useState("");
const [searchResults, setSearchResults] = useState<Item[]>([]);

// 검색 로직
useEffect(() => {
    if (!searchValue) {
        setSearchResults([]);
        return;
    }

    const results: Item[] = [];
    // 커스텀 검색 로직...
    setSearchResults(results);
}, [searchValue]);

<DataEditor
    searchValue={searchValue}
    searchResults={searchResults}
    onSearchResultsChanged={(results, nav) => {
        // nav: -1 (이전), 0 (현재), 1 (다음)
        // 검색 결과 간 네비게이션
    }}
/>

// 외부 검색 UI
<SearchInput
    value={searchValue}
    onChange={setSearchValue}
    resultCount={searchResults.length}
    onNext={() => gridRef.current?.emit("scroll-to-next")}
    onPrev={() => gridRef.current?.emit("scroll-to-prev")}
/>
```

## 10. Ref API 활용

```typescript
const gridRef = useRef<DataEditorRef>(null);

// 프로그래매틱 스크롤
gridRef.current?.scrollTo(5, 100);

// 특정 셀 갱신
gridRef.current?.updateCells([
    { cell: [0, 0] },
    { cell: [1, 0] },
]);

// 포커스
gridRef.current?.focus();

// 셀 위치 가져오기
const bounds = gridRef.current?.getBounds(3, 5);

// 행 추가
await gridRef.current?.appendRow(0, true);  // 편집 모드로 열기

// 이벤트 에뮬레이션
await gridRef.current?.emit("copy");
await gridRef.current?.emit("paste");
```

## 확장 체크리스트

| 확장 영역 | 방법 | 파일 |
|----------|------|------|
| 새 셀 타입 | `customRenderers` | `cells/cell-types.ts` |
| 셀 에디터 | `provideEditor` | 컴포넌트 |
| 헤더 렌더링 | `drawHeader` | - |
| 셀 렌더링 | `drawCell` | - |
| 아이콘 | `headerIcons` | SVG |
| 테마 | `theme`, `themeOverride` | `common/styles.ts` |
| 키보드 | `onKeyDown` | - |
| 컨텍스트 메뉴 | `onCellContextMenu` | - |
| 드래그 | `onDragStart`, `onDrop` | - |
| 검색 | `searchValue`, `searchResults` | - |
