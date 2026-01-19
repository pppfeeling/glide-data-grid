# 셀 렌더러 시스템 분석

## 개요
- **역할**: 각 셀 타입별 렌더링 및 편집 로직
- **위치**: `packages/core/src/cells/`

## 셀 렌더러 파일

| 파일 | 셀 타입 | 편집 가능 |
|------|---------|----------|
| `text-cell.tsx` | TextCell | Yes |
| `number-cell.tsx` | NumberCell | Yes |
| `boolean-cell.tsx` | BooleanCell | Yes (인라인) |
| `image-cell.tsx` | ImageCell | Yes |
| `uri-cell.tsx` | UriCell | Yes |
| `markdown-cell.tsx` | MarkdownCell | Yes |
| `bubble-cell.tsx` | BubbleCell | No |
| `drilldown-cell.tsx` | DrilldownCell | No |
| `loading-cell.tsx` | LoadingCell | No |
| `protected-cell.tsx` | ProtectedCell | No |
| `row-id-cell.tsx` | RowIDCell | No |
| `marker-cell.tsx` | MarkerCell | No (내부) |
| `new-row-cell.tsx` | NewRowCell | No (내부) |
| `row-status-cell.tsx` | RowStatusCell | No (내부) |
| `row-id-marker-cell.tsx` | RowIdCell | No (내부) |

## CellRenderer 인터페이스

### InternalCellRenderer (내장 렌더러)
```typescript
// cells/cell-types.ts:97-110
interface InternalCellRenderer<T extends InnerGridCell> extends BaseCellRenderer<T> {
    readonly useLabel?: boolean;
    readonly getAccessibilityString: (cell: T) => string;
    readonly onPaste: (
        val: string,
        cell: T,
        details: {
            readonly rawValue: string | string[] | number | boolean;
            readonly formatted?: string | string[];
            readonly formattedString?: string;
        }
    ) => T | undefined;
}
```

### CustomRenderer (커스텀 렌더러)
```typescript
// cells/cell-types.ts:113-116
interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}
```

### BaseCellRenderer (공통)
```typescript
// cells/cell-types.ts:58-94
interface BaseCellRenderer<T extends InnerGridCell> {
    readonly kind: T["kind"];
    readonly draw: DrawCallback<T>;
    readonly drawPrep?: PrepCallback;
    readonly needsHover?: boolean | ((cell: T) => boolean);
    readonly needsHoverPosition?: boolean;
    readonly measure?: (ctx: CanvasRenderingContext2D, cell: T, theme: FullTheme) => number;
    readonly provideEditor?: ProvideEditorCallback<T>;
    readonly onClick?: (args: ClickArgs<T>) => T | undefined;
    readonly onSelect?: (args: SelectArgs<T>) => void;
    readonly onDelete?: (cell: T) => T | undefined;
}
```

## 렌더러 구현 예시

### TextCell 렌더러
```typescript
// cells/text-cell.tsx:9-63
export const textCellRenderer: InternalCellRenderer<TextCell> = {
    kind: GridCellKind.Text,

    // 접근성 문자열
    getAccessibilityString: c => c.data?.toString() ?? "",

    // 호버 필요 여부
    needsHover: textCell => textCell.hoverEffect === true,
    needsHoverPosition: false,

    // 준비 단계
    drawPrep: prepTextCell,
    useLabel: true,

    // 렌더링
    draw: a => {
        const { cell, hoverAmount, ctx, rect, theme } = a;
        const { displayData, contentAlign, allowWrapping, hoverEffect } = cell;

        // 호버 효과
        if (hoverEffect === true && hoverAmount > 0) {
            drawEditHoverIndicator(ctx, theme, displayData, rect, hoverAmount);
        }

        // 텍스트 렌더링
        drawTextCell(a, displayData, contentAlign, allowWrapping);
    },

    // 너비 측정
    measure: (ctx, cell, t) => {
        const lines = cell.displayData.split("\n", 1);
        let maxWidth = 0;
        for (const line of lines) {
            maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
        }
        return maxWidth + 2 * t.cellHorizontalPadding;
    },

    // 삭제 처리
    onDelete: c => ({ ...c, data: "" }),

    // 편집기 제공
    provideEditor: cell => ({
        disablePadding: cell.allowWrapping === true,
        editor: p => (
            <GrowingEntry
                highlight={p.isHighlighted}
                autoFocus={!cell.readonly}
                value={p.value.data}
                onChange={e => p.onChange({ ...p.value, data: e.target.value })}
            />
        ),
    }),

    // 붙여넣기 처리
    onPaste: (toPaste, cell, details) =>
        toPaste === cell.data
            ? undefined
            : { ...cell, data: toPaste, displayData: details.formattedString ?? cell.displayData },
};
```

### BooleanCell 렌더러
```typescript
// cells/boolean-cell.tsx
export const booleanCellRenderer: InternalCellRenderer<BooleanCell> = {
    kind: GridCellKind.Boolean,

    getAccessibilityString: c => c.data?.toString() ?? "false",

    // 항상 호버 필요 (체크박스 애니메이션)
    needsHover: true,
    needsHoverPosition: true,

    draw: (args, cell) => {
        const { ctx, rect, theme, hoverAmount, hoverX, hoverY } = args;
        const { data, maxSize } = cell;

        // 체크박스 그리기
        drawCheckbox(ctx, theme, data, rect.x, rect.y, rect.width, rect.height, {
            hoverAmount,
            hoverX,
            hoverY,
            maxSize,
        });
    },

    // 클릭시 토글
    onClick: args => {
        const { cell } = args;
        if (cell.readonly) return undefined;
        return { ...cell, data: !cell.data };
    },

    // 삭제시 false로
    onDelete: c => ({ ...c, data: false }),

    // 붙여넣기
    onPaste: (val, cell) => {
        const lower = val.toLowerCase();
        if (lower === "true" || lower === "1") return { ...cell, data: true };
        if (lower === "false" || lower === "0") return { ...cell, data: false };
        return undefined;
    },
};
```

## DrawArgs 인터페이스

```typescript
// cells/cell-types.ts:37-43
interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
    requestAnimationFrame: (state?: any) => void;
    drawState: DrawStateTuple;
    frameTime: number;
    overrideCursor: ((cursor: CSSProperties["cursor"]) => void) | undefined;
}

// BaseDrawArgs
interface BaseDrawArgs {
    ctx: CanvasRenderingContext2D;
    theme: FullTheme;
    col: number;
    row: number;
    rect: Rectangle;
    highlighted: boolean;
    hoverAmount: number;  // 0-1 애니메이션 값
    hoverX: number | undefined;
    hoverY: number | undefined;
    cellFillColor: string;
    imageLoader: ImageWindowLoader;
    spriteManager: SpriteManager;
    hyperWrapping: boolean;
    cell: InnerGridCell;
}
```

## PrepResult 인터페이스

```typescript
// cells/cell-types.ts:47-52
interface PrepResult {
    font: string | undefined;
    fillStyle: string | undefined;
    renderer: {};
    deprep: ((args: Pick<BaseDrawArgs, "ctx">) => void) | undefined;
}
```

## 커스텀 렌더러 구현

### 기본 구조
```typescript
interface MyCustomCell extends CustomCell<{
    type: "my-custom";
    value: string;
}> {}

const myCustomRenderer: CustomRenderer<MyCustomCell> = {
    kind: GridCellKind.Custom,

    // 셀 매칭
    isMatch: (cell): cell is MyCustomCell =>
        cell.data?.type === "my-custom",

    // 렌더링
    draw: (args, cell) => {
        const { ctx, rect, theme } = args;
        const { value } = cell.data;

        // 배경
        ctx.fillStyle = theme.bgCell;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        // 내용
        ctx.fillStyle = theme.textDark;
        ctx.fillText(value, rect.x + 8, rect.y + rect.height / 2);
    },

    // 너비 측정 (선택적)
    measure: (ctx, cell, theme) => {
        return ctx.measureText(cell.data.value).width + 16;
    },

    // 편집기 (선택적)
    provideEditor: cell => ({
        editor: p => (
            <input
                value={p.value.data.value}
                onChange={e => p.onChange({
                    ...p.value,
                    data: { ...p.value.data, value: e.target.value }
                })}
            />
        ),
    }),

    // 붙여넣기 (선택적)
    onPaste: (val, data) => ({ ...data, value: val }),

    // 클릭 (선택적)
    onClick: args => {
        console.log("clicked", args.cell.data);
        return undefined; // 변경 없음
    },
};
```

### 등록
```typescript
<DataEditor
    customRenderers={[myCustomRenderer]}
    // ...
/>
```

## 내장 유틸리티 함수

### drawTextCell
```typescript
// render/data-grid-lib.ts
export function drawTextCell(
    args: BaseDrawArgs,
    displayData: string,
    contentAlign?: "left" | "right" | "center",
    allowWrapping?: boolean,
    hyperWrapping?: boolean
) {
    const { ctx, rect, theme } = args;

    // 텍스트 정렬
    ctx.textAlign = contentAlign ?? "left";
    ctx.textBaseline = "middle";

    // 텍스트 렌더링
    const x = rect.x + theme.cellHorizontalPadding;
    const y = rect.y + rect.height / 2;

    if (allowWrapping) {
        // 멀티라인 렌더링
        drawWrappedText(ctx, displayData, x, y, rect.width, theme.lineHeight);
    } else {
        // 단일 라인 (필요시 말줄임)
        const text = truncateText(ctx, displayData, rect.width - 2 * theme.cellHorizontalPadding);
        ctx.fillText(text, x, y);
    }
}
```

### drawCheckbox
```typescript
// render/draw-checkbox.ts
export function drawCheckbox(
    ctx: CanvasRenderingContext2D,
    theme: FullTheme,
    checked: boolean | null | undefined,
    x: number, y: number,
    width: number, height: number,
    options: {
        hoverAmount?: number;
        hoverX?: number;
        hoverY?: number;
        maxSize?: number;
    }
) {
    // 체크박스 크기
    const size = Math.min(theme.checkboxMaxSize, options.maxSize ?? 18);

    // 중앙 정렬
    const cx = x + width / 2;
    const cy = y + height / 2;

    // 배경
    ctx.fillStyle = checked ? theme.accentColor : theme.bgCell;
    ctx.beginPath();
    ctx.roundRect(cx - size/2, cy - size/2, size, size, 3);
    ctx.fill();

    // 체크마크
    if (checked) {
        ctx.strokeStyle = theme.accentFg;
        ctx.lineWidth = 2;
        // 체크마크 경로...
        ctx.stroke();
    }
}
```

## ProvideEditorCallback

```typescript
// 편집기 제공 콜백
type ProvideEditorCallback<T extends InnerGridCell> = (
    cell: T & { location?: Item; activation?: CellActivatedEventArgs }
) => ProvideEditorCallbackResult<T>;

// 반환 타입
type ProvideEditorCallbackResult<T> =
    | ProvideEditorComponent<T>  // 함수형 컴포넌트
    | {
        editor: ProvideEditorComponent<T>;
        deletedValue?: (toDelete: T) => T;
        styleOverride?: CSSProperties;
        disablePadding?: boolean;
        disableStyling?: boolean;
      }
    | undefined;  // 편집기 없음

// 편집기 컴포넌트 Props
interface EditorProps<T extends InnerGridCell> {
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: [-1|0|1, -1|0|1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly validatedSelection?: SelectionRange;
    readonly target: Rectangle;
    readonly forceEditMode: boolean;
    readonly isValid?: boolean;
    readonly theme: Theme;
}
```

## 셀 종류별 특징

| 셀 타입 | allowOverlay | 편집 방식 | 호버 효과 |
|---------|--------------|----------|----------|
| Text | true | 오버레이 | 선택적 |
| Number | true | 오버레이 | 선택적 |
| Boolean | false | 인라인 클릭 | 항상 |
| Image | true | 오버레이 | No |
| Uri | true | 오버레이 | 선택적 |
| Markdown | true | 오버레이 | No |
| Custom | true/false | 커스텀 | 커스텀 |
| Loading | false | N/A | No |
| Protected | false | N/A | No |

## 수정 시 주의사항

1. **draw 함수**: 순수 함수여야 함 (부작용 없음)
2. **measure 함수**: 정확한 너비 반환 (컬럼 자동 크기용)
3. **onPaste**: undefined 반환시 변경 없음으로 처리
4. **호버 애니메이션**: needsHover + hoverAmount 사용
5. **접근성**: getAccessibilityString 필수 구현
