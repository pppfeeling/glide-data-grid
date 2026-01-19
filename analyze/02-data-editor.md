# DataEditor 컴포넌트 분석

## 개요
- **역할**: Glide Data Grid의 메인 컴포넌트, 모든 Props와 이벤트 처리
- **위치**: `packages/core/src/data-editor/data-editor.tsx`
- **LOC**: 약 4,762 라인

## 컴포넌트 구조

```
DataEditor (ForwardRef)
    ├── 상태 관리 (useState, useRef)
    ├── Props 정규화
    ├── 컬럼/행 계산
    ├── 이벤트 핸들러
    ├── DataGridSearch 렌더링
    └── DataGridOverlayEditor (편집 오버레이)
```

## 핵심 Props

### 필수 Props
| Prop | 타입 | 설명 | 라인 |
|------|------|------|------|
| `columns` | `GridColumn[]` | 컬럼 정의 | 300 |
| `rows` | `number` | 총 행 수 | 332 |
| `getCellContent` | `(cell: Item) => GridCell` | 셀 데이터 제공 | 560 |

### 선택 관련 Props
| Prop | 기본값 | 설명 | 라인 |
|------|--------|------|------|
| `gridSelection` | - | 제어 선택 상태 | 514 |
| `onGridSelectionChange` | - | 선택 변경 콜백 | 524 |
| `rowSelect` | `"multi"` | 행 선택 모드 | 417 |
| `columnSelect` | `"multi"` | 컬럼 선택 모드 | 412 |
| `rangeSelect` | `"rect"` | 범위 선택 모드 | 407 |
| `rangeSelectionBlending` | `"exclusive"` | 범위 선택 혼합 | 390 |
| `columnSelectionBlending` | `"exclusive"` | 컬럼 선택 혼합 | 394 |
| `rowSelectionBlending` | `"exclusive"` | 행 선택 혼합 | 398 |

### 편집 관련 Props
| Prop | 설명 | 라인 |
|------|------|------|
| `onCellEdited` | 셀 편집 완료 콜백 | 227 |
| `onCellsEdited` | 배치 편집 콜백 | 230 |
| `validateCell` | 셀 값 검증 | 291-295 |
| `onPaste` | 붙여넣기 처리 | 651 |
| `getCellsForSelection` | 복사/붙여넣기용 데이터 | 618 |
| `editOnType` | 타이핑시 편집 시작 | 595 |

### 스타일 Props
| Prop | 기본값 | 설명 | 라인 |
|------|--------|------|------|
| `theme` | 기본 테마 | 테마 오버라이드 | 657 |
| `rowHeight` | `34` | 행 높이 | 440 |
| `headerHeight` | `36` | 헤더 높이 | 318 |
| `rowMarkers` | `"none"` | 행 마커 옵션 | 345 |
| `freezeColumns` | `0` | 고정 컬럼 수 | 625 |

## 내부 상태

### 주요 상태 변수
```typescript
// data-editor.tsx:809-824
const [gridSelectionInner, setGridSelectionInner] = useState<GridSelection>(emptyGridSelection);
const [overlay, setOverlay] = useState<{
    target: Rectangle;
    content: GridCell;
    theme: FullTheme;
    initialValue: string | undefined;
    cell: Item;
    highlight: boolean;
    forceEditMode: boolean;
    activation: CellActivatedEventArgs;
}>();
const [mouseState, setMouseState] = useState<MouseState>();
```

### Ref 변수
```typescript
const searchInputRef = useRef<HTMLInputElement | null>(null);
const canvasRef = useRef<HTMLCanvasElement | null>(null);
const lastSent = useRef<[number, number]>(undefined);
const abortControllerRef = useRef<AbortController>(new AbortController());
```

## 주요 함수/로직

### 1. 컬럼 정규화 (mangledCols)
```typescript
// data-editor.tsx:1207-1292
const mangledCols = useMemo(() => {
    // 컬럼 순서: rowNumber → checkbox → rowStatus → rowId → 사용자 컬럼
    const markerColumns: any[] = [];

    // 1. rowMarker 컬럼들
    if (rowMarkers !== "none") {
        if (showRowNumber) { /* 번호 컬럼 */ }
        /* 체크박스 컬럼 */
    }
    // 2. rowStatus 컬럼
    if (hasRowStatus) { /* 상태 컬럼 */ }
    // 3. rowId 컬럼
    if (hasRowId) { /* ID 컬럼 */ }

    return [...markerColumns, ...columns];
}, [...dependencies]);
```

### 2. 선택 관리 (useSelectionBehavior)
```typescript
// data-editor.tsx:1148-1156
const [setCurrent, setSelectedRows, setSelectedColumns] = useSelectionBehavior(
    gridSelection,
    setGridSelection,
    rangeSelectionBlending,
    columnSelectionBlending,
    rowSelectionBlending,
    rangeSelect,
    rangeSelectionColumnSpanning
);
```

### 3. 셀 콘텐츠 가져오기 (getMangledCellContent)
```typescript
// 내부 컬럼(마커, 상태 등) vs 사용자 컬럼 분기
const getMangledCellContent = useCallback(([col, row]: Item): InnerGridCell => {
    // rowMarker 컬럼 처리
    if (col < rowMarkerOffset) {
        // MarkerCell, RowStatusCell, RowIdCell 반환
    }
    // 사용자 데이터 컬럼
    return getCellContent([col - rowMarkerOffset, row]);
}, [rowMarkerOffset, getCellContent, ...]);
```

### 4. 이벤트 핸들러

#### 셀 클릭 처리
```typescript
// onCellClicked 로직 (약 2200 라인 부근)
const handleCellClick = useCallback((cell: Item, event: GridMouseCellEventArgs) => {
    // 1. 선택 업데이트
    // 2. Boolean 셀 토글
    // 3. 편집 오버레이 활성화 결정
}, [...]);
```

#### 키보드 네비게이션
```typescript
// onKeyDown 핸들러
// - Arrow 키: 셀 이동
// - Enter/Tab: 편집 완료 및 다음 셀
// - Escape: 편집 취소
// - Delete: 셀 삭제
// - Ctrl+C/V: 복사/붙여넣기
```

## 데이터 흐름

```
1. Props 수신
   columns, rows, getCellContent 등
         ↓
2. 컬럼 정규화 (mangledCols)
   rowMarker 컬럼 추가
         ↓
3. 렌더러 설정 (getCellRenderer)
   built-in + customRenderers
         ↓
4. DataGridSearch로 전달
   정규화된 컬럼, 셀 콘텐츠 함수
         ↓
5. 이벤트 수신
   클릭, 키보드, 드래그 등
         ↓
6. 콜백 호출
   onCellEdited, onGridSelectionChange 등
```

## rowMarkerOffset 계산

```typescript
// data-editor.tsx:1016-1021
const rowMarkerOffset =
    (hasRowMarkers ? (showRowNumber ? 2 : 1) : 0) +
    (hasRowStatus ? 1 : 0) +
    (hasRowId ? 1 : 0);
```

컬럼 인덱스 변환:
- 외부 → 내부: `col + rowMarkerOffset`
- 내부 → 외부: `col - rowMarkerOffset`

## DataEditorRef (외부 API)

```typescript
// data-editor.tsx:751-796
interface DataEditorRef {
    appendRow(col: number, openOverlay?: boolean): Promise<void>;
    appendColumn(row: number, openOverlay?: boolean): Promise<void>;
    updateCells: DataGridRef["damage"];
    getBounds: DataGridRef["getBounds"];
    focus: DataGridRef["focus"];
    emit(eventName: EmitEvents): Promise<void>;
    scrollTo: ScrollToFn;
    remeasureColumns(cols: CompactSelection): void;
    getMouseArgsForPosition(...): GridMouseEventArgs | undefined;
}
```

## 주요 커스텀 훅 사용

| 훅 | 목적 | 파일 |
|----|------|------|
| `useSelectionBehavior` | 선택 로직 | `use-selection-behavior.ts` |
| `useColumnSizer` | 컬럼 크기 계산 | `use-column-sizer.ts` |
| `useCellsForSelection` | 범위 데이터 가져오기 | `use-cells-for-selection.ts` |
| `useAutoscroll` | 자동 스크롤 | `use-autoscroll.ts` |
| `useRowGroupingInner` | 행 그룹핑 | `row-grouping.ts` |
| `useRemAdjuster` | rem 스케일링 | `use-rem-adjuster.ts` |

## 편집 오버레이 로직

```typescript
// 오버레이 상태 (overlay)
{
    target: Rectangle;      // 셀 위치
    content: GridCell;      // 편집할 셀
    theme: FullTheme;       // 테마
    initialValue: string;   // 초기값
    cell: Item;             // [col, row]
    highlight: boolean;     // 하이라이트 여부
    forceEditMode: boolean; // 강제 편집 모드
    activation: CellActivatedEventArgs;
}

// 편집 완료시
onFinishedEditing(newValue, [deltaX, deltaY]);
// - deltaX, deltaY: 다음 셀 이동 방향
```

## 수정 시 주의사항

1. **rowMarkerOffset**: 내부/외부 인덱스 변환 주의
2. **선택 혼합 모드**: 여러 선택 타입 동시 존재 가능
3. **편집 오버레이**: lazy loading으로 성능 최적화됨
4. **이벤트 순서**: mouseDown → selection → mouseUp → click
5. **컬럼 순서**: rowNumber → checkbox → rowStatus → rowId → 사용자 컬럼

## 확장 포인트

| 확장 | 방법 |
|------|------|
| 커스텀 셀 | `customRenderers` prop |
| 커스텀 에디터 | `provideEditor` prop |
| 셀 검증 | `validateCell` prop |
| 드래그 | `isDraggable` + `onDragStart` |
| 테마 | `theme` prop |
