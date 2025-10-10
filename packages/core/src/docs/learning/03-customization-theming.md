# 🎨 Customization & Theming - 커스터마이징과 테마

그리드의 외관과 스타일을 커스터마이징하는 방법을 학습합니다.

---

## 📘 Theme Support - 테마 지원

### 개요
DataEditor의 전체적인 색상, 폰트, 스타일을 테마로 커스터마이징할 수 있습니다.

### 기본 테마 적용
```typescript
import { DataEditor } from "@glideapps/glide-data-grid";

function ThemedGrid() {
    const customTheme = {
        // 색상
        accentColor: "#4F46E5",
        accentLight: "#818CF8",
        bgCell: "#ffffff",
        bgCellMedium: "#f9fafb",
        bgHeader: "#f3f4f6",
        bgHeaderHasFocus: "#e5e7eb",
        bgHeaderHovered: "#e5e7eb",

        // 테두리
        borderColor: "#e5e7eb",
        horizontalBorderColor: "#f3f4f6",

        // 텍스트
        textDark: "#111827",
        textMedium: "#6b7280",
        textLight: "#9ca3af",
        textBubble: "#111827",

        // 폰트
        fontFamily: "Inter, system-ui, sans-serif",
        baseFontStyle: "14px",
        headerFontStyle: "600 14px",
        editorFontSize: "14px",

        // 간격
        cellHorizontalPadding: 8,
        cellVerticalPadding: 4,
    };

    return (
        <DataEditor
            columns={columns}
            rows={100}
            getCellContent={getCellContent}
            theme={customTheme}
        />
    );
}
```

### 다크 모드
```typescript
const darkTheme = {
    accentColor: "#6366F1",
    accentLight: "#818CF8",
    bgCell: "#1f2937",
    bgCellMedium: "#111827",
    bgHeader: "#111827",
    bgHeaderHasFocus: "#374151",
    bgHeaderHovered: "#374151",
    bgBubble: "#374151",
    bgBubbleSelected: "#4B5563",

    borderColor: "#374151",
    horizontalBorderColor: "#374151",

    textDark: "#f9fafb",
    textMedium: "#d1d5db",
    textLight: "#9ca3af",
    textHeader: "#f9fafb",
    textBubble: "#f9fafb",

    // 선택 영역
    bgSearchResult: "#4338CA",
    fgIconHeader: "#d1d5db",
};
```

### 테마 전환
```typescript
function ThemeToggleGrid() {
    const [isDark, setIsDark] = React.useState(false);

    return (
        <>
            <button onClick={() => setIsDark(!isDark)}>
                {isDark ? "🌞 라이트" : "🌙 다크"}
            </button>
            <DataEditor
                theme={isDark ? darkTheme : lightTheme}
                columns={columns}
                rows={100}
                getCellContent={getCellContent}
            />
        </>
    );
}
```

---

## 📘 Theme Per Column - 컬럼별 테마

### 개요
각 컬럼마다 다른 스타일을 적용할 수 있습니다.

### 구현 방법
```typescript
const columns: GridColumn[] = [
    {
        title: "이름",
        id: "name",
        themeOverride: {
            bgCell: "#f0f9ff",
            textDark: "#0c4a6e",
        },
    },
    {
        title: "상태",
        id: "status",
        themeOverride: {
            bgCell: "#f0fdf4",
            textDark: "#14532d",
            accentColor: "#22c55e",
        },
    },
    {
        title: "금액",
        id: "amount",
        themeOverride: {
            bgCell: "#fef3c7",
            textDark: "#78350f",
            textAlign: "right",
        },
    },
];
```

### 조건부 컬럼 스타일
```typescript
const getColumnTheme = (columnId: string, value: any) => {
    if (columnId === "status") {
        return value === "활성"
            ? { bgCell: "#dcfce7", textDark: "#14532d" }
            : { bgCell: "#fee2e2", textDark: "#7f1d1d" };
    }
    return undefined;
};
```

---

## 📘 Theme Per Row - 행별 테마

### 개요
각 행마다 다른 스타일을 적용할 수 있습니다.

### 구현 방법
```typescript
function RowThemedGrid() {
    const getCellContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const data = getData(col, row);

        // 짝수/홀수 행 구분
        const isEven = row % 2 === 0;

        // 특정 조건에 따른 하이라이트
        const isHighlighted = data.isImportant;

        let themeOverride;
        if (isHighlighted) {
            themeOverride = {
                bgCell: "#fef3c7",
                textDark: "#78350f",
            };
        } else if (isEven) {
            themeOverride = {
                bgCell: "#f9fafb",
            };
        }

        return {
            kind: GridCellKind.Text,
            data: data.value,
            displayData: data.value,
            themeOverride,
            allowOverlay: true,
        };
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

### 상태별 행 스타일
```typescript
const getRowTheme = (row: number, data: any) => {
    const status = data[row].status;

    switch (status) {
        case "성공":
            return { bgCell: "#dcfce7" };
        case "실패":
            return { bgCell: "#fee2e2" };
        case "대기":
            return { bgCell: "#fef3c7" };
        default:
            return undefined;
    }
};
```

---

## 📘 Custom Header - 커스텀 헤더

### 개요
헤더를 완전히 커스터마이징하여 특별한 렌더링을 구현합니다.

### 커스텀 헤더 렌더러
```typescript
import { type DrawHeaderCallback } from "@glideapps/glide-data-grid";

const drawHeader: DrawHeaderCallback = (args) => {
    const { ctx, rect, column, theme, isHovered } = args;

    // 배경
    ctx.fillStyle = isHovered ? theme.bgHeaderHovered : theme.bgHeader;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

    // 아이콘
    const iconSize = 16;
    ctx.font = `${iconSize}px Arial`;
    ctx.fillStyle = theme.textHeader;
    ctx.fillText("📊", rect.x + 8, rect.y + rect.height / 2 + 6);

    // 텍스트
    ctx.font = theme.headerFontStyle;
    ctx.fillStyle = theme.textHeader;
    ctx.fillText(column.title, rect.x + 30, rect.y + rect.height / 2 + 4);

    // 구분선
    ctx.strokeStyle = theme.borderColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rect.x, rect.y + rect.height);
    ctx.lineTo(rect.x + rect.width, rect.y + rect.height);
    ctx.stroke();

    return true; // 기본 렌더링 방지
};

<DataEditor
    drawHeader={drawHeader}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

---

## 📘 Custom Header Icons - 커스텀 헤더 아이콘

### 개요
컬럼 헤더에 아이콘을 추가합니다.

### 간단한 아이콘 추가
```typescript
const columns: GridColumn[] = [
    {
        title: "이름",
        id: "name",
        icon: "headerString", // 내장 아이콘
    },
    {
        title: "나이",
        id: "age",
        icon: "headerNumber",
    },
    {
        title: "활성",
        id: "active",
        icon: "headerBoolean",
    },
];
```

### 커스텀 SVG 아이콘
```typescript
const columns: GridColumn[] = [
    {
        title: "사용자",
        id: "user",
        icon: {
            type: "custom",
            content: () => (
                <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
                </svg>
            ),
        },
    },
];
```

### 정렬 아이콘
```typescript
const [sortColumn, setSortColumn] = React.useState<string | null>(null);
const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("asc");

const columns: GridColumn[] = baseColumns.map(col => ({
    ...col,
    icon: sortColumn === col.id
        ? sortDirection === "asc"
            ? "headerSortAsc"
            : "headerSortDesc"
        : undefined,
}));
```

---

## 📘 Custom Renderers - 커스텀 렌더러

### 개요
완전히 새로운 셀 타입을 만들어 특별한 데이터를 표시합니다.

### 커스텀 셀 렌더러 생성
```typescript
import { type CustomCell, type CustomRenderer } from "@glideapps/glide-data-grid";

interface StarRatingCell extends CustomCell {
    kind: "star-rating-cell";
    rating: number;
    maxRating: number;
}

const starRatingRenderer: CustomRenderer<StarRatingCell> = {
    kind: GridCellKind.Custom,
    isMatch: (cell: CustomCell): cell is StarRatingCell =>
        (cell.data as any).kind === "star-rating-cell",

    draw: (args, cell) => {
        const { ctx, rect, theme } = args;
        const { rating, maxRating } = cell.data;

        // 배경
        ctx.fillStyle = theme.bgCell;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        // 별 그리기
        const starSize = 20;
        const startX = rect.x + 10;
        const startY = rect.y + (rect.height - starSize) / 2;

        for (let i = 0; i < maxRating; i++) {
            ctx.font = `${starSize}px Arial`;
            ctx.fillStyle = i < rating ? "#fbbf24" : "#e5e7eb";
            ctx.fillText("★", startX + i * (starSize + 2), startY + starSize);
        }

        return true;
    },

    provideEditor: () => ({
        editor: (props) => {
            const [rating, setRating] = React.useState(props.value.data.rating);

            return (
                <div style={{ padding: 8 }}>
                    {Array.from({ length: props.value.data.maxRating }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setRating(i + 1)}
                            style={{
                                fontSize: 24,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: i < rating ? "#fbbf24" : "#e5e7eb",
                            }}>
                            ★
                        </button>
                    ))}
                </div>
            );
        },
        disablePadding: true,
        deletedValue: () => ({
            ...props.value,
            data: { ...props.value.data, rating: 0 },
        }),
    }),
};

// 사용
<DataEditor
    customRenderers={[starRatingRenderer]}
    getCellContent={(cell) => ({
        kind: GridCellKind.Custom,
        allowOverlay: true,
        copyData: "5",
        data: {
            kind: "star-rating-cell",
            rating: 5,
            maxRating: 5,
        },
    })}
    columns={columns}
    rows={100}
/>
```

---

## 📘 Custom Editors - 커스텀 에디터

### 개요
특정 셀 타입에 대한 커스텀 편집기를 만듭니다.

### 드롭다운 에디터
```typescript
const SelectEditor: ReturnType<ProvideEditorCallback<SelectCell>> = (p) => {
    const { value, onFinishedEditing } = p;
    const [selected, setSelected] = React.useState(value.data.value);

    return (
        <select
            value={selected}
            onChange={(e) => {
                setSelected(e.target.value);
                onFinishedEditing({
                    ...value,
                    data: { ...value.data, value: e.target.value },
                });
            }}
            autoFocus
            style={{
                width: "100%",
                height: "100%",
                border: "none",
                padding: "8px",
            }}>
            {value.data.options.map((opt) => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
};
```

### 날짜 피커 에디터
```typescript
const DatePickerEditor = (p) => {
    const { value, onFinishedEditing } = p;
    const [date, setDate] = React.useState(value.data);

    return (
        <input
            type="date"
            value={date}
            onChange={(e) => {
                setDate(e.target.value);
                onFinishedEditing({
                    ...value,
                    data: e.target.value,
                });
            }}
            autoFocus
            style={{
                width: "100%",
                height: "100%",
                border: "2px solid #4F46E5",
                padding: "8px",
            }}
        />
    );
};
```

---

## 📘 Highlight Cells - 셀 하이라이트

### 개요
특정 셀이나 영역을 강조 표시합니다.

### 영역 하이라이트
```typescript
<DataEditor
    highlightRegions={[
        {
            color: "#fef3c7",
            range: {
                x: 1,      // 시작 컬럼
                y: 5,      // 시작 행
                width: 3,  // 너비 (컬럼 수)
                height: 5, // 높이 (행 수)
            },
        },
        {
            color: "#dcfce7",
            range: {
                x: 0,
                y: 0,
                width: 1,
                height: 100,
            },
        },
    ]}
    columns={columns}
    rows={100}
    getCellContent={getCellContent}
/>
```

### 조건부 하이라이트
```typescript
const getHighlightRegions = (data: any[]): Highlight[] => {
    const regions: Highlight[] = [];

    data.forEach((row, rowIndex) => {
        if (row.isImportant) {
            regions.push({
                color: "#fee2e2",
                range: {
                    x: 0,
                    y: rowIndex,
                    width: columns.length,
                    height: 1,
                },
            });
        }
    });

    return regions;
};
```

---

## 📘 Cell Borders - 셀 테두리

### 개요
개별 셀의 테두리를 커스터마이징합니다.

### 테두리 스타일
```typescript
const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;

    return {
        kind: GridCellKind.Text,
        data: "데이터",
        displayData: "데이터",
        allowOverlay: true,
        style: "normal",
        // 테두리 설정
        contentAlign: "left",
        themeOverride: {
            borderColor: "#4F46E5",
            horizontalBorderColor: "#818CF8",
        },
    };
};
```

---

## 🎓 학습 포인트

### Customization & Theming 완료 후 할 수 있는 것
✅ 전체 테마 커스터마이징
✅ 컬럼/행별 개별 스타일링
✅ 커스텀 셀 렌더러 구현
✅ 커스텀 에디터 생성
✅ 시각적 하이라이트

### 다음 단계
**Search & Filter** 카테고리로 이동하여 검색과 필터 기능을 학습하세요!