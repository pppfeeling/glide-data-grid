# Glide Data Grid 핵심 타입 및 인터페이스

## 개요
- **역할**: 그리드 전반에서 사용되는 핵심 타입 정의
- **위치**: `packages/core/src/internal/data-grid/data-grid-types.ts`

## 셀 관련 타입

### GridCell (기본 셀 타입)
```typescript
// data-grid-types.ts:282-289
type GridCell =
    | EditableGridCell
    | BubbleCell
    | RowIDCell
    | LoadingCell
    | ProtectedCell
    | DrilldownCell
    | CustomCell;
```

### GridCellKind (셀 종류 열거형)
```typescript
// data-grid-types.ts:79-92
enum GridCellKind {
    Uri = "uri",
    Text = "text",
    Image = "image",
    RowID = "row-id",
    Number = "number",
    Bubble = "bubble",
    Boolean = "boolean",
    Loading = "loading",
    Markdown = "markdown",
    Drilldown = "drilldown",
    Protected = "protected",
    Custom = "custom",
}
```

### BaseGridCell (공통 셀 속성)
```typescript
// data-grid-types.ts:315-327
interface BaseGridCell {
    readonly allowOverlay: boolean;        // 편집 오버레이 허용
    readonly lastUpdated?: number;         // 업데이트 타임스탬프
    readonly style?: "normal" | "faded";   // 표시 스타일
    readonly themeOverride?: Partial<Theme>; // 개별 테마
    readonly span?: readonly [start: number, end: number]; // 컬럼 병합
    readonly rowspan?: readonly [start: number, end: number]; // 행 병합
    readonly contentAlign?: "left" | "right" | "center";
    readonly cursor?: CSSProperties["cursor"];
    readonly copyData?: string;            // 복사시 사용할 데이터
    readonly activationBehaviorOverride?: CellActivationBehavior;
}
```

### 주요 셀 타입

#### TextCell
```typescript
// data-grid-types.ts:348-356
interface TextCell extends BaseGridCell {
    readonly kind: GridCellKind.Text;
    readonly displayData: string;          // 화면 표시 텍스트
    readonly data: string;                 // 실제 데이터
    readonly readonly?: boolean;
    readonly allowWrapping?: boolean;      // 텍스트 줄바꿈
    readonly hoverEffect?: boolean;
    readonly hoverEffectTheme?: HoverEffectTheme;
}
```

#### NumberCell
```typescript
// data-grid-types.ts:359-370
interface NumberCell extends BaseGridCell {
    readonly kind: GridCellKind.Number;
    readonly displayData: string;
    readonly data: number | undefined;
    readonly readonly?: boolean;
    readonly fixedDecimals?: number;       // 소수점 자릿수
    readonly allowNegative?: boolean;
    readonly thousandSeparator?: boolean | string;
    readonly decimalSeparator?: string;
    readonly hoverEffect?: boolean;
}
```

#### BooleanCell
```typescript
// data-grid-types.ts:463-470
interface BooleanCell extends BaseGridCell {
    readonly kind: GridCellKind.Boolean;
    readonly data: boolean | BooleanEmpty | BooleanIndeterminate;
    readonly readonly?: boolean;
    readonly allowOverlay: false;          // 항상 인라인 편집
    readonly maxSize?: number;             // 체크박스 최대 크기
    readonly hoverEffectIntensity?: number;
}
```

#### CustomCell
```typescript
// data-grid-types.ts:443-448
interface CustomCell<T extends {} = {}> extends BaseGridCell {
    readonly kind: GridCellKind.Custom;
    readonly data: T;                      // 사용자 정의 데이터
    readonly copyData: string;
    readonly readonly?: boolean;
}
```

## 선택 관련 타입

### GridSelection (선택 상태)
```typescript
// data-grid-types.ts:17-25
interface GridSelection {
    readonly current?: {
        readonly cell: Item;                    // 현재 활성 셀
        readonly range: Readonly<Rectangle>;    // 선택 범위
        readonly rangeStack: readonly Readonly<Rectangle>[]; // 다중 선택
    };
    readonly columns: CompactSelection;         // 선택된 컬럼들
    readonly rows: CompactSelection;            // 선택된 행들
}
```

### Item (셀 좌표)
```typescript
// data-grid-types.ts:148
type Item = readonly [col: number, row: number];

// row 값 의미:
// -1: 헤더
// -2: 그룹 헤더
// 0 이상: 데이터 행
```

### Rectangle (영역)
```typescript
// data-grid-types.ts:299-304
interface Rectangle {
    x: number;      // 시작 컬럼
    y: number;      // 시작 행
    width: number;  // 컬럼 수
    height: number; // 행 수
}
```

### CompactSelection (압축 선택)
```typescript
// data-grid-types.ts:613-747
class CompactSelection {
    readonly items: CompactSelectionRanges;  // [start, end][] 형태

    // 정적 메서드
    static create(items: CompactSelectionRanges): CompactSelection;
    static empty(): CompactSelection;
    static fromSingleSelection(selection: number | Slice): CompactSelection;
    static fromArray(items: readonly number[]): CompactSelection;

    // 인스턴스 메서드
    add(selection: number | Slice): CompactSelection;
    remove(selection: number | Slice): CompactSelection;
    hasIndex(index: number): boolean;
    hasAll(index: Slice): boolean;
    offset(amount: number): CompactSelection;
    first(): number | undefined;
    last(): number | undefined;
    toArray(): number[];
    get length(): number;
}
```

## 컬럼 관련 타입

### GridColumn (컬럼 정의)
```typescript
// data-grid-types.ts:198
type GridColumn = SizedGridColumn | AutoGridColumn;
```

### BaseGridColumn (컬럼 공통 속성)
```typescript
// data-grid-types.ts:150-170
interface BaseGridColumn {
    readonly title: string;                    // 헤더 텍스트
    readonly group?: string;                   // 그룹 이름
    readonly icon?: GridColumnIcon | string;   // 헤더 아이콘
    readonly overlayIcon?: GridColumnIcon | string;
    readonly menuIcon?: GridColumnMenuIcon | string;
    readonly indicatorIcon?: GridColumnIcon | string;
    readonly hasMenu?: boolean;                // 메뉴 표시
    readonly grow?: number;                    // flex grow
    readonly style?: "normal" | "highlight";
    readonly themeOverride?: Partial<Theme>;
    readonly trailingRowOptions?: {            // 추가 행 옵션
        readonly hint?: string;
        readonly addIcon?: string;
        readonly targetColumn?: number | GridColumn;
        readonly themeOverride?: Partial<Theme>;
        readonly disabled?: boolean;
    };
    readonly rowGroupBorder?: boolean;
    readonly required?: boolean;
}
```

### SizedGridColumn (고정 너비)
```typescript
// data-grid-types.ts:178-181
interface SizedGridColumn extends BaseGridColumn {
    readonly width: number;    // 픽셀 단위 너비
    readonly id?: string;      // 선택적 ID
}
```

### AutoGridColumn (자동 너비)
```typescript
// data-grid-types.ts:184-186
interface AutoGridColumn extends BaseGridColumn {
    readonly id: string;       // 필수 ID
}
```

### InnerGridColumn (내부 확장)
```typescript
// data-grid-types.ts:200-210
type InnerGridColumn = SizedGridColumn & {
    growOffset?: number;
    rowMarker?: "square" | "circle";
    rowMarkerChecked?: BooleanIndeterminate | boolean;
    headerRowMarkerTheme?: Partial<Theme>;
    headerRowMarkerAlwaysVisible?: boolean;
    headerRowMarkerDisabled?: boolean;
};
```

## 렌더러 관련 타입

### CellRenderer (셀 렌더러)
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
    readonly onClick?: (...) => T | undefined;
    readonly onSelect?: (...) => void;
    readonly onDelete?: (cell: T) => T | undefined;
}
```

### DrawArgs (렌더링 인자)
```typescript
// cells/cell-types.ts:37-43
interface DrawArgs<T extends InnerGridCell> extends BaseDrawArgs {
    cell: T;
    requestAnimationFrame: (state?: any) => void;
    drawState: DrawStateTuple;
    frameTime: number;
    overrideCursor: ((cursor: CSSProperties["cursor"]) => void) | undefined;
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

## 이벤트 관련 타입

### GridMouseEventArgs
```typescript
// event-args.ts:86-90
type GridMouseEventArgs =
    | GridMouseCellEventArgs     // 셀 클릭
    | GridMouseHeaderEventArgs   // 헤더 클릭
    | GridMouseOutOfBoundsEventArgs  // 영역 외 클릭
    | GridMouseGroupHeaderEventArgs; // 그룹 헤더 클릭
```

### BaseGridMouseEventArgs
```typescript
// event-args.ts:4-15
interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isLongTouch?: boolean;
    readonly isDoubleClick?: boolean;
    readonly isEdge: boolean;
    readonly button: number;
    readonly buttons: number;
    readonly scrollEdge: readonly [xDir: -1 | 0 | 1, yDir: -1 | 0 | 1];
}
```

### GridKeyEventArgs
```typescript
// event-args.ts:70-83
interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;
    readonly key: string;
    readonly keyCode: number;
    readonly altKey: boolean;
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly cancel: () => void;
    readonly stopPropagation: () => void;
    readonly preventDefault: () => void;
    readonly rawEvent: React.KeyboardEvent<HTMLElement> | undefined;
    readonly location: Item | undefined;
}
```

## 테마 관련 타입

### Theme (테마 인터페이스)
```typescript
// common/styles.ts:57-101
interface Theme {
    accentColor: string;         // 강조색
    accentFg: string;            // 강조 전경색
    accentLight: string;         // 연한 강조색
    textDark: string;            // 진한 텍스트
    textMedium: string;          // 중간 텍스트
    textLight: string;           // 연한 텍스트
    textBubble: string;          // 버블 텍스트
    bgIconHeader: string;        // 아이콘 배경
    fgIconHeader: string;        // 아이콘 전경
    textHeader: string;          // 헤더 텍스트
    textHeaderSelected: string;  // 선택된 헤더 텍스트
    bgCell: string;              // 셀 배경
    bgCellMedium: string;        // 중간 셀 배경
    bgHeader: string;            // 헤더 배경
    bgHeaderHasFocus: string;    // 포커스 헤더 배경
    bgHeaderHovered: string;     // 호버 헤더 배경
    borderColor: string;         // 경계선 색
    linkColor: string;           // 링크 색
    cellHorizontalPadding: number;
    cellVerticalPadding: number;
    headerFontStyle: string;
    baseFontStyle: string;
    fontFamily: string;
    // ... 추가 속성
}
```

## 유틸리티 타입

### FillHandle (채우기 핸들 설정)
```typescript
// data-grid-types.ts:562-570
type FillHandleConfig = {
    readonly shape: "square" | "circle";
    readonly size: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly outline: number;
};
type FillHandle = boolean | Partial<FillHandleConfig>;
```

### SelectionBlending (선택 혼합 모드)
```typescript
// use-selection-behavior.ts:12
type SelectionBlending = "exclusive" | "mixed" | "additive";
```

## 타입 가드 함수

```typescript
// data-grid-types.ts

// 편집 가능한 셀인지 확인
function isEditableGridCell(cell: GridCell): cell is ValidatedGridCell;

// 텍스트 편집 가능한 셀인지 확인
function isTextEditableGridCell(cell: GridCell): cell is ReadWriteGridCell;

// 읽기/쓰기 가능한 셀인지 확인
function isReadWriteCell(cell: GridCell): cell is ReadWriteGridCell;

// 내부 전용 셀인지 확인 (Marker, NewRow 등)
function isInnerOnlyCell(cell: InnerGridCell): cell is InnerOnlyGridCell;

// Boolean 셀 편집 가능 여부
function booleanCellIsEditable(cell: BooleanCell): boolean;

// 고정 너비 컬럼인지 확인
function isSizedGridColumn(c: GridColumn): c is SizedGridColumn;
```

## 내부 전용 셀 타입

```typescript
// data-grid-types.ts:503-544
enum InnerGridCellKind {
    NewRow = "new-row",     // 새 행 추가용
    Marker = "marker",      // 행 마커 (체크박스/번호)
    RowStatus = "row-status", // 행 상태 (A/U/D)
    RowId = "row-id",       // 행 ID
}

interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly row: number;
    readonly drawHandle: boolean;
    readonly checked: boolean;
    readonly checkboxStyle: "square" | "circle";
    readonly markerKind: "checkbox" | "number" | "both" | "checkbox-visible";
    readonly disabled?: boolean;
}
```

## 수정 시 주의사항

1. **타입 변경 영향**: 핵심 타입(GridCell, GridSelection 등) 변경시 광범위한 영향
2. **readonly 유지**: 불변성 보장을 위해 readonly 속성 유지 필요
3. **타입 가드 동기화**: 새 셀 타입 추가시 관련 타입 가드 업데이트 필수
4. **후방 호환성**: 기존 API와의 호환성 고려
