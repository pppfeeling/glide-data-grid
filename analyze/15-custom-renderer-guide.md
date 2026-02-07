# Custom Renderer 생성 가이드

## 개요

glide-data-grid는 커스텀 셀 렌더러를 통해 기본 셀 타입을 확장할 수 있습니다. 커스텀 셀을 만드는 과정은 크게 **두 부분**으로 나뉩니다:

1. **셀 데이터 구조 정의 (`CustomCell`)**: 셀이 가질 데이터의 형태를 정의
2. **셀 렌더러 정의 (`CustomRenderer`)**: 데이터를 어떻게 그리고 편집할지 정의

이 문서는 커스텀 렌더러 생성 방법과 DataGrid와의 연결 방법을 설명합니다.

## 1. 커스텀 셀 데이터 구조 (`CustomCell`)

커스텀 셀은 기본적으로 `CustomCell<T>` 타입을 확장합니다. `T`는 해당 셀이 가질 실제 데이터의 인터페이스입니다.

### 주요 속성

**필수 속성:**
- **`kind`**: 항상 `GridCellKind.Custom`으로 설정해야 합니다.
- **`data`**: 셀에 들어갈 실제 사용자 정의 데이터 객체입니다.
  - `data` 내부에는 반드시 고유한 `kind` 문자열이 있어야 렌더러가 매칭할 수 있습니다.

**선택 속성:**
- **`copyData`**: 사용자가 복사(Ctrl+C)했을 때 클립보드에 들어갈 텍스트 값입니다.
- **`readonly`**: 셀의 편집 가능 여부를 결정합니다.
- **`allowOverlay`**: 셀을 더블 클릭하거나 Enter를 쳤을 때 편집기(Overlay)를 띄울지 여부입니다.

### 예제

```typescript
// 데이터 타입 정의
interface ArticleCellData {
    readonly kind: "article-cell";  // 렌더러가 이 값으로 매칭
    readonly markdown: string;
}

// 셀 타입 정의
export type ArticleCell = CustomCell<ArticleCellData>;

// 실제 사용 (getCellContent에서)
const cell: ArticleCell = {
    kind: GridCellKind.Custom,
    allowOverlay: true,
    copyData: "Article text",
    data: {
        kind: "article-cell",
        markdown: "# Hello World",
    },
};
```

## 2. 커스텀 렌더러 (`CustomRenderer`)

커스텀 셀을 어떻게 그리고 편집할지 정의하는 객체입니다.

### 핵심 타입 정의

**CustomRenderer 인터페이스** (packages/core/src/cells/cell-types.ts:113-116)

```typescript
export interface CustomRenderer<T extends CustomCell = CustomCell> extends BaseCellRenderer<T> {
    readonly isMatch: (cell: CustomCell) => cell is T;
    readonly onPaste?: (val: string, cellData: T["data"]) => T["data"] | undefined;
}
```

### CustomRenderer 속성 분류

렌더러의 속성들은 다음과 같이 분류됩니다:

#### A. 필수 및 식별 속성

- **`kind`**: `GridCellKind.Custom`으로 고정입니다.
- **`isMatch`**: 전달된 셀이 이 렌더러로 처리해야 하는 셀인지 확인하는 타입 가드 함수입니다.
  ```typescript
  isMatch: (c): c is YourCell => (c.data as any).kind === "your-cell-kind"
  ```

#### B. 그리기 및 측정 (Drawing & Measurement)

- **`draw`**: HTML5 Canvas API를 사용하여 셀을 직접 그리는 함수입니다.
  - `args.ctx`: Canvas 2D 컨텍스트
  - `args.rect`: 셀의 좌표와 크기 (`x, y, width, height`)
  - `args.theme`: 현재 적용된 테마 정보
  - `args.hoverAmount`: 마우스 호버 시 애니메이션 수치 (0~1)

- **`measure`** (선택): 셀의 내용에 따라 적절한 너비를 계산하여 반환합니다. 컬럼 자동 크기 조절 시 사용됩니다.

- **`drawPrep`** (선택): 여러 셀을 그리기 전에 폰트 설정 등 공통 작업을 미리 수행하여 성능을 최적화할 때 사용합니다.

#### C. 편집 및 이벤트 (Editing & Events)

- **`provideEditor`** (선택): 셀 편집 시 나타날 React 컴포넌트를 제공합니다.
  - `disablePadding`: 편집기 주위의 여백 제거 여부
  - `editor`: 실제 React 컴포넌트를 반환하는 콜백
  - `deletedValue`: Delete 키를 눌렀을 때 데이터를 어떻게 변경할지 정의

- **`onClick`** (선택): 셀 클릭 시 커스텀 동작을 정의합니다 (예: 버튼 클릭).

- **`onSelect`** (선택): 셀 선택 시 커스텀 동작을 정의합니다.

- **`onDelete`** (선택): Delete 키를 눌렀을 때 데이터를 어떻게 변경할지 정의합니다.

- **`onPaste`** (선택): 클립보드 데이터를 붙여넣었을 때 셀 데이터를 어떻게 업데이트할지 정의합니다.

#### D. 호버 기능 (Hover)

- **`needsHover`** (선택): 셀이 마우스 호버 상태를 감지해야 하는지 여부입니다. `true`일 경우 `draw` 함수에 `hoverAmount`가 전달됩니다.

- **`needsHoverPosition`** (선택): 셀 내부에서 마우스의 정확한 좌표 (`hoverX`, `hoverY`)가 필요한 경우 `true`로 설정합니다.
  - 예: `button-cell`에서 버튼 영역 위에 있는지 확인 시 사용

### 타입 인터페이스 전체

**BaseCellRenderer 인터페이스** (packages/core/src/cells/cell-types.ts:58-94)

```typescript
interface BaseCellRenderer<T extends InnerGridCell> {
    // A. 필수 및 식별
    readonly kind: T["kind"];

    // B. 그리기 및 측정
    readonly draw: DrawCallback<T>;
    readonly drawPrep?: PrepCallback;
    readonly measure?: (ctx: CanvasRenderingContext2D, cell: T, theme: FullTheme) => number;

    // C. 편집 및 이벤트
    readonly provideEditor?: ProvideEditorCallback<T>;
    readonly onClick?: (args: {...}) => T | undefined;
    readonly onSelect?: (args: {...}) => void;
    readonly onDelete?: (cell: T) => T | undefined;

    // D. 호버
    readonly needsHover?: boolean | ((cell: T) => boolean);
    readonly needsHoverPosition?: boolean;
}
```

## 단계별 생성 가이드

### Step 1: 셀 데이터 타입 정의

먼저 셀이 가질 데이터 구조를 정의합니다. `data` 객체 내부에는 반드시 고유한 `kind` 문자열이 있어야 합니다.

**예제: Button Cell** (packages/cells/src/cells/button-cell.tsx:12-24)

```typescript
// 1. 데이터 인터페이스 정의
interface ButtonCellProps {
    readonly kind: "button-cell";  // 필수: 렌더러 매칭용 고유 ID
    readonly title: string;
    readonly onClick?: () => void;
    readonly backgroundColor?: PackedColor;
    readonly color?: PackedColor;
    readonly borderColor?: PackedColor;
    readonly borderRadius?: number;
}

// 2. CustomCell 타입으로 확장
export type ButtonCell = CustomCell<ButtonCellProps> & { readonly: true };
```

**간단한 예제:**

```typescript
interface StarCellProps {
    readonly kind: "star-cell";
    readonly rating: number;  // 0-5
}

export type StarCell = CustomCell<StarCellProps>;
```

### Step 2: 렌더러 객체 생성

렌더러는 `CustomRenderer<T>` 타입의 객체입니다. 최소한 `kind`, `isMatch`, `draw` 속성이 필요합니다.

**최소 구현:**

```typescript
const renderer: CustomRenderer<YourCell> = {
    // A. 필수 및 식별
    kind: GridCellKind.Custom,
    isMatch: (c): c is YourCell => (c.data as any).kind === "your-cell-kind",

    // B. 그리기
    draw: (args, cell) => {
        // Canvas 렌더링 로직
        const { ctx, theme, rect } = args;
        const { yourData } = cell.data;  // cell.data로 데이터 접근

        // 캔버스에 그리기
        ctx.fillStyle = theme.textDark;
        ctx.fillText(yourData, rect.x, rect.y + rect.height / 2);

        return true;  // 성공적으로 그렸음을 반환
    },

    // C. 편집 (선택)
    provideEditor: undefined,  // 읽기 전용인 경우
};

export default renderer;
```

### Step 3: Draw 함수 구현

**간단한 예제: Star Cell** (packages/cells/src/cells/star-cell.tsx:79-95)

```typescript
draw: (args, cell) => {
    const { ctx, theme, rect, hoverAmount } = args;
    const { rating } = cell.data;

    const padX = theme.cellHorizontalPadding;
    let drawX = rect.x + padX + 8;
    const stars = Math.min(5, Math.ceil(rating));

    ctx.beginPath();
    for (let i = 0; i < stars; i++) {
        pathStar(ctx, [drawX, rect.y + rect.height / 2], 16);
        drawX += 18;
    }

    ctx.fillStyle = theme.textDark;
    ctx.globalAlpha = 0.6 + 0.4 * hoverAmount;
    ctx.fill();
    ctx.globalAlpha = 1;

    return true;
},
```

**DrawArgs 파라미터** (packages/core/src/cells/cell-types.ts:37-43)

```typescript
interface DrawArgs<T extends InnerGridCell> {
    ctx: CanvasRenderingContext2D;      // Canvas 컨텍스트
    theme: FullTheme;                    // 테마 객체
    col: number;                         // 열 인덱스
    row: number;                         // 행 인덱스
    rect: Rectangle;                     // 셀 영역
    highlighted: boolean;                // 선택 여부
    hoverAmount: number;                 // 호버 진행도 (0-1)
    hoverX: number | undefined;          // 마우스 X 위치
    hoverY: number | undefined;          // 마우스 Y 위치
    requestAnimationFrame: (state?: any) => void;  // 애니메이션 요청
    drawState: DrawStateTuple;           // 상태 관리
    frameTime: number;                   // 현재 프레임 시간
    overrideCursor: ((cursor: React.CSSProperties["cursor"]) => void) | undefined;
}
```

### Step 4: 에디터 구현 (옵션)

**간단한 에디터: Star Cell** (packages/cells/src/cells/star-cell.tsx:97-119)

```typescript
provideEditor: () => {
    return p => (
        <EditorWrap>
            {[0, 1, 2, 3, 4].map(index => (
                <div
                    key={index}
                    className={p.value.data.rating < index + 1 ? "gdg-inactive" : "gdg-active"}
                    onClick={() => {
                        p.onChange({
                            ...p.value,
                            data: {
                                ...p.value.data,
                                rating: index + 1,
                            },
                        });
                    }}>
                    <StarSVG />
                </div>
            ))}
        </EditorWrap>
    );
},
```

**복잡한 에디터: Dropdown Cell** (packages/cells/src/cells/dropdown-cell.tsx:64-182)

```typescript
provideEditor: () => ({
    editor: Editor,           // React 컴포넌트
    disablePadding: true,     // 패딩 비활성화
    deletedValue: v => ({     // Delete 키 처리
        ...v,
        copyData: "",
        data: { ...v.data, value: "" },
    }),
}),
```

**에디터 Props**

```typescript
interface EditorProps<T extends GridCell> {
    value: T;
    onFinishedEditing: (newValue?: T, movement?: [number, number]) => void;
    initialValue?: string;
    validatedSelection?: {
        start: number;
        end: number;
    };
    portalElementRef?: React.RefObject<HTMLElement>;
}
```

### Step 5: 추가 기능 구현

#### 5.1 Paste 처리

**Star Cell 예제** (packages/cells/src/cells/star-cell.tsx:120-126)

```typescript
onPaste: (val, d) => {
    const num = Number.parseInt(val);
    return {
        ...d,
        rating: Number.isNaN(num) ? 0 : num,
    };
},
```

#### 5.2 Click 이벤트 처리

**Button Cell 예제** (packages/cells/src/cells/button-cell.tsx:60-64)

```typescript
onClick: a => {
    const { cell, theme, bounds, posX, posY } = a;
    if (getIsHovered(bounds, posX, posY, theme)) {
        cell.data.onClick?.();
    }
    return undefined;
},
```

#### 5.3 Selection 처리

```typescript
onSelect: a => a.preventDefault(),
```

#### 5.4 애니메이션

**Button Cell 호버 애니메이션** (packages/cells/src/cells/button-cell.tsx:89-110)

```typescript
interface DrawState {
    readonly hovered: boolean;
    readonly animationStartTime: number;
}

let [state, setState] = drawState as [DrawState | undefined, (state: DrawState) => void];
const isHovered = getIsHovered(rect, hoverX, hoverY, theme);

state ??= { hovered: false, animationStartTime: 0 };

if (isHovered !== state.hovered) {
    state = { ...state, hovered: isHovered, animationStartTime: frameTime };
    setState(state);
}

const progress = Math.min(1, (frameTime - state.animationStartTime) / 200);
const hoverAmount = isHovered ? progress : 1 - progress;

if (progress < 1) args.requestAnimationFrame?.();
```

#### 5.5 Draw 최적화 (drawPrep)

**Button Cell 예제** (packages/cells/src/cells/button-cell.tsx:65-75)

```typescript
drawPrep: args => {
    const { ctx } = args;
    ctx.textAlign = "center";

    return {
        deprep: a => {
            a.ctx.textAlign = "start";
        },
    };
},
```

## Renderer와 Editor에서 데이터 접근

커스텀 셀을 개발할 때, **Renderer**는 데이터를 읽어서 캔버스에 그리는 역할을 하고, **Editor**는 그 데이터를 수정하는 인터페이스를 제공합니다.

### Renderer에서 데이터 접근

Renderer의 함수들은 보통 두 번째 인자로 셀 객체 자체를 전달받습니다. 이 객체의 `.data` 속성에 커스텀 데이터가 들어 있습니다.

**대상 함수**: `draw`, `measure`, `onClick`, `onSelect` 등

**접근 방법**: `cell.data.속성명`

**예제 (article-cell.tsx):**

```typescript
const renderer: CustomRenderer<ArticleCell> = {
    draw: (args, cell) => {
        const { ctx, rect, theme } = args;
        // 1. cell.data에서 실제 필요한 값을 꺼냅니다.
        const { markdown } = cell.data;

        // 2. 꺼낸 데이터를 화면에 그리는 로직에 사용합니다.
        let data = markdown;
        if (data.includes("\n")) {
            data = data.split(/\r?\n/)[0];
        }
        const max = rect.width / 4;
        if (data.length > max) {
            data = data.slice(0, max);
        }

        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            data,
            rect.x + theme.cellHorizontalPadding,
            rect.y + rect.height / 2
        );

        return true;
    },
    measure: (ctx, cell, theme) => {
        // 너비를 측정할 때도 cell.data에 접근합니다.
        const { markdown } = cell.data;
        return ctx.measureText(markdown).width + theme.cellHorizontalPadding * 2;
    }
};
```

### Editor에서 데이터 접근 및 수정

Editor는 React 컴포넌트 형태로 구현되며, Props를 통해 데이터와 수정 함수를 전달받습니다.

**데이터 읽기**: `p.value.data`

**데이터 수정**:
- **수정 중**: `p.onChange` - 에디터 내에서 값이 바뀔 때마다 호출하여 그리드에 반영
- **수정 완료**: `p.onFinishedEditing` - 에디터를 닫고 최종 값을 확정할 때 호출

**예제 (article-cell-editor.tsx 패턴):**

```typescript
const ArticleCellEditor: ProvideEditorComponent<ArticleCell> = p => {
    // 1. 초기 데이터 로드: p.value.data를 사용하여 상태 초기화
    const [tempValue, setTempValue] = React.useState(p.value.data.markdown);

    const onSave = React.useCallback(() => {
        // 2. 데이터 수정 완료: p.onFinishedEditing 호출
        // 새로운 셀 객체를 만들어서 보냅니다. 이때 .data를 업데이트합니다.
        p.onFinishedEditing({
            ...p.value,           // 기존 셀 속성 복사 (kind, allowOverlay 등)
            data: {
                ...p.value.data,  // 기존 데이터 속성 복사
                markdown: tempValue,  // 변경된 값 적용
            },
        });
    }, [p, tempValue]);

    return (
        <Wrapper>
            <Editor
                initialValue={tempValue}
                onChange={setTempValue}  // 입력할 때마다 상태 업데이트
            />
            <button onClick={onSave}>Save</button>
        </Wrapper>
    );
};
```

### copyData와 onPaste

**`copyData`**: 렌더러 외부에서 데이터에 접근할 때 (예: 복사하기 기능)는 `cell.data`가 아니라 `cell.copyData` 문자열을 사용합니다.

**`onPaste`**: 사용자가 텍스트를 붙여넣을 때, 렌더러의 `onPaste` 함수가 호출됩니다.

```typescript
onPaste: (val, d) => {
    // val: 붙여넣은 문자열
    // d: 현재 cell.data
    return {
        ...d,
        markdown: val,  // 변경된 데이터 반환
    };
},
```

## 데이터 흐름 전체

커스텀 셀의 데이터는 다음과 같은 주기로 움직입니다:

```
1. getCellContent
   ↓
   사용자가 DataEditor에 제공한 함수가
   kind: GridCellKind.Custom과
   사용자 정의 객체가 담긴 data를 반환

2. Renderer (draw)
   ↓
   그리드가 화면을 그릴 때 렌더러의 draw 함수에
   이 cell 객체를 넘김
   렌더러는 cell.data를 읽어서 캔버스에 그림

3. Editor 열기
   ↓
   사용자가 셀을 더블 클릭하면
   provideEditor를 통해 에디터 컴포넌트가 생성됨
   현재 셀 정보가 value prop으로 전달

4. 수정 및 저장
   ↓
   에디터 컴포넌트 안에서 데이터를 수정하고
   onFinishedEditing(updatedCell)을 호출

5. onCellEdited
   ↓
   그리드는 에디터에서 받은 updatedCell을 가지고
   최종적으로 사용자가 정의한 onCellEdited 콜백을 호출하여
   원본 데이터 소스를 업데이트하게 함
```

## 실례: Article Cell 분석

**article-cell.tsx** (packages/cells/src/cells/article-cell.tsx)

```typescript
const renderer: CustomRenderer<ArticleCell> = {
    kind: GridCellKind.Custom,

    // 1. 렌더러 매칭
    isMatch: (c): c is ArticleCell => (c.data as any).kind === "article-cell",

    // 2. 그리기: 마크다운 텍스트의 첫 줄만 잘라서 캔버스에 그림
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { markdown } = cell.data;

        let data = markdown;
        if (data.includes("\n")) {
            // 새 줄이 있으면 첫 줄만 표시
            data = data.split(/\r?\n/)[0];
        }
        const max = rect.width / 4;
        if (data.length > max) {
            data = data.slice(0, max);
        }

        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            data,
            rect.x + theme.cellHorizontalPadding,
            rect.y + rect.height / 2 + getMiddleCenterBias(ctx, theme)
        );

        return true;
    },

    // 3. 편집기: Toast UI Editor 같은 무거운 라이브러리를 React.lazy로 로드
    provideEditor: () => ({
        editor: p => (
            <React.Suspense fallback={null}>
                <ArticleCellEditor {...p} />
            </React.Suspense>
        ),
        styleOverride: {
            // 편집기 위치/크기 조정
            position: "fixed",
            left: "12.5vw",
            top: "12.5vh",
            width: "75vw",
            borderRadius: "9px",
            maxWidth: "unset",
            maxHeight: "unset",
        },
        disablePadding: true,
    }),

    // 4. 붙여넣기: 붙여넣은 텍스트를 마크다운 데이터로 수락
    onPaste: (val, d) => ({
        ...d,
        markdown: val,
    }),
};
```

## DataGrid와의 연결

### 1. 렌더러 등록 메커니즘

**getCellRenderer 함수** (packages/core/src/data-editor/data-editor.tsx:1182-1190)

```typescript
const getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined =
    React.useCallback(
        <T extends InnerGridCell>(cell: T) => {
            // 기본 셀 타입은 내장 렌더러 맵에서 찾기
            if (cell.kind !== GridCellKind.Custom) {
                return rendererMap[cell.kind] as unknown as CellRenderer<T>;
            }
            // 커스텀 셀은 additionalRenderers에서 isMatch로 찾기
            return additionalRenderers?.find(x => x.isMatch(cell)) as CellRenderer<T>;
        },
        [additionalRenderers, rendererMap]
    );
```

### 2. DataEditor Props로 전달

**customRenderers prop** (packages/core/src/data-editor/data-editor.tsx:663-668)

```typescript
const MyComponent = () => {
    return (
        <DataEditor
            customRenderers={[
                MyCustomRenderer1,
                MyCustomRenderer2,
            ]}
            getCellContent={(cell) => {
                const [col, row] = cell;
                if (col === 0) {
                    return {
                        kind: GridCellKind.Custom,
                        allowOverlay: true,
                        copyData: "data",
                        data: {
                            kind: "my-custom-cell",
                            // ... 커스텀 데이터
                        },
                    };
                }
                // ...
            }}
        />
    );
};
```

### 3. 렌더링 파이프라인

**drawCell 함수** (packages/core/src/internal/data-grid/render/data-grid-render.cells.ts:109-478)

```
1. getCellRenderer(cell) 호출
   ↓
2. renderer?.drawPrep() 호출 (있는 경우)
   ↓
3. renderer?.draw() 호출
   ↓
4. prepResult?.deprep() 호출 (있는 경우)
```

### 4. 호버 처리

**needsHover 체크** (packages/core/src/internal/data-grid/data-grid.tsx:1302-1307)

```typescript
const cellNeedsHover =
    (r === undefined && cell.kind === GridCellKind.Custom) ||
    (r?.needsHover !== undefined &&
     (typeof r.needsHover === "boolean" ? r.needsHover : r.needsHover(cell)));
```

**needsHoverPosition 체크** (packages/core/src/internal/data-grid/data-grid.tsx:1355-1359)

```typescript
const rendererNeeds = getCellRenderer(toCheck)?.needsHoverPosition;
// custom cells는 기본적으로 위치가 필요하다고 가정
needsHoverPosition = rendererNeeds ?? toCheck.kind === GridCellKind.Custom;
```

## 실전 예제

### 예제 1: 간단한 Badge Cell

```typescript
import {
    type CustomCell,
    type CustomRenderer,
    GridCellKind,
    type Theme,
} from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns.js";

interface BadgeCellProps {
    readonly kind: "badge-cell";
    readonly text: string;
    readonly color?: string;
}

export type BadgeCell = CustomCell<BadgeCellProps>;

const renderer: CustomRenderer<BadgeCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is BadgeCell => (c.data as any).kind === "badge-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { text, color } = cell.data;

        const x = rect.x + theme.cellHorizontalPadding;
        const y = rect.y + theme.cellVerticalPadding;
        const width = ctx.measureText(text).width + 16;
        const height = rect.height - theme.cellVerticalPadding * 2;

        // 배경 그리기
        ctx.beginPath();
        roundedRect(ctx, x, y, width, height, 4);
        ctx.fillStyle = color ?? theme.accentColor;
        ctx.globalAlpha = 0.2;
    ctx.fill();
        ctx.globalAlpha = 1;

        // 테두리 그리기
        ctx.beginPath();
        roundedRect(ctx, x + 0.5, y + 0.5, width - 1, height - 1, 4);
        ctx.strokeStyle = color ?? theme.accentColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // 텍스트 그리기
        ctx.fillStyle = color ?? theme.accentColor;
        ctx.fillText(text, x + 8, rect.y + rect.height / 2 + 0.5);

        return true;
    },
    provideEditor: undefined,
};

export default renderer;
```

### 예제 2: 진행률 바 Cell (에디터 포함)

```typescript
import * as React from "react";
import {
    type CustomCell,
    type CustomRenderer,
    GridCellKind,
    getMiddleCenterBias,
} from "@glideapps/glide-data-grid";
import { roundedRect } from "../draw-fns.js";

interface ProgressCellProps {
    readonly kind: "progress-cell";
    readonly progress: number; // 0-100
    readonly label?: string;
}

export type ProgressCell = CustomCell<ProgressCellProps>;

const renderer: CustomRenderer<ProgressCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is ProgressCell => (c.data as any).kind === "progress-cell",
    draw: (args, cell) => {
        const { ctx, theme, rect } = args;
        const { progress, label } = cell.data;

        const barHeight = 20;
        const x = rect.x + theme.cellHorizontalPadding;
        const y = rect.y + (rect.height - barHeight) / 2;
        const width = rect.width - theme.cellHorizontalPadding * 2;

        // 배경 바
        ctx.beginPath();
        roundedRect(ctx, x, y, width, barHeight, 4);
        ctx.fillStyle = theme.bgCellMedium;
        ctx.fill();

        // 진행률 바
        if (progress > 0) {
            const progressWidth = Math.max(8, (width * progress) / 100);
            ctx.beginPath();
            roundedRect(ctx, x, y, progressWidth, barHeight, 4);
            ctx.fillStyle = theme.accentColor;
            ctx.fill();
        }

        // 레이블 또는 퍼센트
        const text = label ?? `${Math.round(progress)}%`;
        ctx.fillStyle = theme.textDark;
        ctx.fillText(
            text,
            x + width / 2,
            y + barHeight / 2 + getMiddleCenterBias(ctx, theme.baseFontFull)
        );

        return true;
    },
    provideEditor: () => ({
        editor: p => {
            const [value, setValue] = React.useState(p.value.data.progress);

            return (
                <div style={{ padding: 8 }}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={e => setValue(Number(e.target.value))}
                        onBlur={() => {
                            p.onFinishedEditing({
                                ...p.value,
                                data: {
                                    ...p.value.data,
                                    progress: value,
                                },
                            });
                        }}
                        style={{ width: "100%" }}
                    />
                    <div style={{ textAlign: "center", marginTop: 4 }}>
                        {value}%
                    </div>
                </div>
            );
        },
    }),
    onPaste: (val, d) => {
        const num = Number.parseFloat(val);
        if (Number.isNaN(num)) return d;
        return {
            ...d,
            progress: Math.max(0, Math.min(100, num)),
        };
    },
};

export default renderer;
```

## 패키지 구조 (packages/cells 참고)

### 파일 구조

```
packages/cells/src/
├── cells/
│   ├── your-cell.tsx          # 렌더러 구현
│   ├── your-cell-editor.tsx   # 에디터 (분리된 경우)
│   └── your-cell-types.ts     # 타입 정의 (분리된 경우)
├── draw-fns.ts                # 공통 드로잉 함수
├── index.ts                   # Export
└── cell.stories.tsx           # Storybook 예제
```

### index.ts에 등록

**packages/cells/src/index.ts**

```typescript
import YourCellRenderer, { type YourCell } from "./cells/your-cell.js";

const cells = [
    // ... 기존 렌더러들
    YourCellRenderer,
];

export {
    YourCellRenderer as YourCell,
    cells as allCells,
};

export type {
    YourCell as YourCellType,
};
```

## 공통 유틸리티

### roundedRect (packages/cells/src/draw-fns.ts:8-43)

```typescript
export function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number | CornerRadius
) {
    // 둥근 사각형 그리기
}
```

### 텍스트 중앙 정렬

```typescript
import { getMiddleCenterBias } from "@glideapps/glide-data-grid";

ctx.fillText(
    text,
    x + width / 2,
    y + height / 2 + getMiddleCenterBias(ctx, theme.baseFontFull)
);
```

### 색상 보간

```typescript
import { interpolateColors } from "@glideapps/glide-data-grid";

const color = interpolateColors(normalColor, hoverColor, hoverAmount);
```

## 베스트 프랙티스

### 1. 성능 최적화

```typescript
// ✅ Good: 조건부로 비싼 연산 수행
draw: (args, cell) => {
    if (width <= 0 || height <= 0) return true;
    // ... 렌더링
}

// ❌ Bad: 매 프레임마다 복잡한 계산
draw: (args, cell) => {
    const complexResult = expensiveCalculation();
    // ...
}
```

### 2. 상태 관리

```typescript
// ✅ Good: drawState 사용
interface DrawState {
    readonly hovered: boolean;
    readonly animationStartTime: number;
}

let [state, setState] = drawState as [DrawState | undefined, (state: DrawState) => void];
state ??= { hovered: false, animationStartTime: 0 };
```

### 3. Canvas 상태 복원

```typescript
// ✅ Good: drawPrep/deprep 사용
drawPrep: args => {
    args.ctx.textAlign = "center";
    return {
        deprep: a => {
            a.ctx.textAlign = "start";
        },
    };
},

// 또는 수동 저장/복원
draw: (args, cell) => {
    const { ctx } = args;
    ctx.save();
    // ... 렌더링
    ctx.restore();
    return true;
}
```

### 4. 호버 최적화

```typescript
// ✅ Good: 필요한 경우만 호버 활성화
const renderer: CustomRenderer<MyCell> = {
    needsHover: true,              // 호버 애니메이션이 필요한 경우
    needsHoverPosition: true,      // 마우스 위치가 필요한 경우 (클릭 감지 등)
    // ...
};

// ✅ Good: 조건부 호버
const renderer: CustomRenderer<MyCell> = {
    needsHover: (cell) => cell.data.interactive,  // 셀에 따라 다르게
    // ...
};
```

### 5. 에디터 최적화

```typescript
// ✅ Good: Lazy loading
const Editor = React.lazy(async () => await import("./your-cell-editor.js"));

provideEditor: () => ({
    editor: p => (
        <React.Suspense fallback={null}>
            <Editor {...p} />
        </React.Suspense>
    ),
}),
```

## 디버깅 팁

### 1. Draw 함수 디버깅

```typescript
draw: (args, cell) => {
    const { ctx, rect } = args;

    // 셀 경계 시각화
    ctx.strokeStyle = "red";
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);

    // 데이터 콘솔 출력
    console.log("Cell data:", cell.data);

    return true;
}
```

### 2. 렌더러 매칭 확인

```typescript
isMatch: (c): c is YourCell => {
    const isMatch = (c.data as any).kind === "your-cell-kind";
    if (!isMatch && c.kind === GridCellKind.Custom) {
        console.log("Not matched:", c.data);
    }
    return isMatch;
}
```

## 빠른 요약

### 커스텀 셀 만들기 체크리스트

**1단계: 데이터 타입 정의**
```typescript
interface MyCellProps {
    readonly kind: "my-cell";  // 고유 ID
    readonly myData: string;
}
export type MyCell = CustomCell<MyCellProps>;
```

**2단계: 렌더러 생성**
```typescript
const renderer: CustomRenderer<MyCell> = {
    kind: GridCellKind.Custom,
    isMatch: (c): c is MyCell => (c.data as any).kind === "my-cell",
    draw: (args, cell) => {
        // cell.data.myData 접근
        // Canvas로 그리기
        return true;
    },
};
```

**3단계: DataEditor에 등록**
```typescript
<DataEditor
    customRenderers={[renderer]}
    getCellContent={(cell) => ({
        kind: GridCellKind.Custom,
        data: { kind: "my-cell", myData: "..." },
        copyData: "...",
    })}
/>
```

### 핵심 포인트

1. **데이터 접근**
   - Renderer: `cell.data.속성명`
   - Editor: `p.value.data.속성명`

2. **매칭 메커니즘**
   - `data.kind` (문자열)로 렌더러를 찾음
   - `isMatch` 함수가 `true`를 반환하면 해당 렌더러 사용

3. **필수 속성**
   - `kind`: `GridCellKind.Custom`
   - `isMatch`: 타입 가드 함수
   - `draw`: Canvas 렌더링 함수

4. **선택 속성**
   - `provideEditor`: 편집 UI
   - `onClick`, `onSelect`: 이벤트 처리
   - `onPaste`: 붙여넣기 처리
   - `needsHover`, `needsHoverPosition`: 호버 기능
   - `measure`: 자동 크기 조절
   - `drawPrep`: 렌더링 최적화

## 관련 파일

### 핵심 파일
- `packages/core/src/cells/cell-types.ts` - 타입 정의
- `packages/core/src/data-editor/data-editor.tsx:1182-1190` - 렌더러 매칭
- `packages/core/src/internal/data-grid/render/data-grid-render.cells.ts` - 렌더링 로직

### 참고 구현
- `packages/cells/src/cells/button-cell.tsx` - 간단한 렌더러
- `packages/cells/src/cells/star-cell.tsx` - 에디터 포함
- `packages/cells/src/cells/dropdown-cell.tsx` - 복잡한 에디터
- `packages/cells/src/cells/article-cell.tsx` - Lazy loading
- `packages/cells/src/cell.stories.tsx` - 사용 예제

### 유틸리티
- `packages/cells/src/draw-fns.ts` - 공통 드로잉 함수
- `packages/cells/src/index.ts` - Export 패턴
