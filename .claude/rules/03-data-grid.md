---
paths:
  - "packages/core/src/internal/data-grid/data-grid.tsx"
  - "packages/core/src/internal/data-grid/use-grid-geometry.ts"
  - "packages/core/src/internal/data-grid/use-canvas-renderer.ts"
  - "packages/core/src/internal/data-grid/use-grid-pointer-events.ts"
  - "packages/core/src/internal/data-grid/use-grid-drag-and-drop.ts"
  - "packages/core/src/internal/data-grid/use-grid-focus-and-accessibility.tsx"
  - "packages/core/src/internal/data-grid/use-animation-queue.ts"
---

# DataGrid 컴포넌트 분석

## 개요
- **역할**: 캔버스 기반 그리드 렌더링 및 저수준 이벤트 처리
- **위치**: `packages/core/src/internal/data-grid/data-grid.tsx`
- **LOC**: 약 793 라인 (오케스트레이터) + 5개 훅 파일 (~1,879 라인)
- **리팩토링**: 원본 ~1,950줄에서 오케스트레이터 패턴으로 분리

## 컴포넌트 구조

```
DataGrid (ForwardRef, 793 LOC) - 오케스트레이터
    ├── useGridGeometry (383 LOC) - 좌표 변환/히트 감지
    ├── useCanvasRenderer (458 LOC) - 캔버스 렌더링 파이프라인
    ├── useGridPointerEvents (413 LOC) - 마우스/포인터 이벤트
    ├── useGridDragAndDrop (271 LOC) - HTML5 드래그 앤 드롭
    ├── useGridFocusAndAccessibility (312 LOC) - 접근성/포커스
    ├── useAnimationQueue (42 LOC) - RAF 배치 처리
    ├── SpriteManager (아이콘 관리)
    ├── 키보드 이벤트 핸들러 (오케스트레이터에 유지)
    ├── 커서 로직 (오케스트레이터에 유지)
    └── Canvas 엘리먼트 + 접근성 트리
```

## 훅 파일 구조

| 파일 | LOC | 역할 | 수정 사례 |
|------|-----|------|----------|
| `use-grid-geometry.ts` | 383 | 좌표 변환, 셀 위치 계산, 히트 감지 | 컬럼 레이아웃, 좌표 계산 |
| `use-canvas-renderer.ts` | 458 | 캔버스 렌더링, 더블 버퍼, 데미지 추적 | 렌더링 최적화, 블릿 |
| `use-grid-pointer-events.ts` | 413 | 포인터/마우스 이벤트, 호버, 터치 | 클릭, 드래그, 호버 |
| `use-grid-drag-and-drop.ts` | 271 | HTML5 DnD, 드래그 프리뷰 | 드래그 앤 드롭 |
| `use-grid-focus-and-accessibility.tsx` | 312 | 접근성 트리, 포커스 관리, DataGridRef | ARIA, 포커스 |
| `use-animation-queue.ts` | 42 | RAF 배치, 애니메이션 큐 | 호버 애니메이션 |

## 의존성 관계

```
data-grid.tsx (오케스트레이터)
    │
    ├── useGridGeometry ←── columns, freezeColumns, selection, fillHandle 등
    │   ├── getBoundsForItem() → 셀 화면 좌표 계산
    │   ├── getMouseArgsForPosition() → 마우스 좌표 → 셀 정보 변환
    │   ├── mappedColumns → 컬럼 매핑 정보
    │   └── stickyX → 고정 컬럼 너비
    │
    ├── useCanvasRenderer ←── canvasRef, mappedColumns, theme, selection 등
    │   ├── damageInternal() → 특정 셀 리드로우 요청
    │   ├── damage() → 외부 데미지 API
    │   ├── drawCursorOverride → 렌더링 중 커서 오버라이드
    │   ├── renderStateProvider → DnD 프리뷰용 렌더 상태
    │   ├── lastDrawRef → 마지막 draw 함수 참조
    │   └── lastArgsRef → 이전 렌더링 인자 (블릿용)
    │
    ├── useGridPointerEvents ←── getBoundsForItem, getMouseArgsForPosition, damageInternal 등
    │   └── (void) 이벤트 리스너 등록/해제
    │
    ├── useGridDragAndDrop ←── getBoundsForItem, getMouseArgsForPosition, renderStateProvider 등
    │   └── (void) DnD 이벤트 리스너 등록/해제
    │
    └── useGridFocusAndAccessibility ←── getBoundsForItem, getMouseArgsForPosition, damage 등
        ├── accessibilityTree → 접근성 HTML 트리
        └── DataGridRef 구현 (focus, getBounds, damage, getMouseArgsForPosition)
```

## DataGridProps

### 크기/레이아웃 Props
```typescript
// data-grid.tsx:39-90
interface DataGridProps {
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number | undefined;
    readonly translateY: number | undefined;
    readonly accessibilityHeight: number;
    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly groupLevels: number;
    readonly groupHeaderHeights: readonly number[];
    readonly rowHeight: number | ((index: number) => number);
    readonly rows: number;
    readonly columns: readonly InnerGridColumn[];
    readonly enableGroups: boolean;
    readonly hasAppendRow: boolean;
    readonly firstColAccessible: boolean;
}
```

### 이벤트 콜백
```typescript
// data-grid.tsx:141-178
readonly onItemHovered: (args: GridMouseEventArgs) => void;
readonly onMouseMove: (args: GridMouseEventArgs) => void;
readonly onMouseDown: (args: GridMouseEventArgs) => void;
readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
readonly onContextMenu: (args: GridMouseEventArgs, preventDefault: () => void) => void;
readonly onMouseMoveRaw: (event: MouseEvent) => void;
readonly onKeyDown: (event: GridKeyEventArgs) => void;
readonly onKeyUp: ((event: GridKeyEventArgs) => void) | undefined;
readonly onCanvasFocused: () => void;
readonly onCanvasBlur: () => void;
readonly onCellFocused: (args: Item) => void;
readonly onDragStart: (args: GridDragEventArgs) => void;
readonly onDragEnd: () => void;
readonly onDragOverCell: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
readonly onDragLeave: (() => void) | undefined;
readonly onDrop: ((cell: Item, dataTransfer: DataTransfer | null) => void) | undefined;
```

### 렌더링 관련
```typescript
readonly getCellContent: (cell: Item, forceStrict?: boolean) => InnerGridCell;
readonly getCellRenderer: <T extends InnerGridCell>(cell: T) => CellRenderer<T> | undefined;
readonly drawHeader: DrawHeaderCallback | undefined;
readonly drawCell: DrawCellCallback | undefined;
readonly drawFocusRing: boolean;
```

## DataGridRef (외부 API)

```typescript
// data-grid.tsx:296-305
interface DataGridRef {
    focus: () => void;
    getBounds: (col?: number, row?: number) => Rectangle | undefined;
    damage: (cells: DamageUpdateList) => void;
    getMouseArgsForPosition: (
        posX: number,
        posY: number,
        ev?: MouseEvent | TouchEvent
    ) => GridMouseEventArgs | undefined;
}
```
> DataGridRef 구현은 `use-grid-focus-and-accessibility.tsx`에 위치

## 오케스트레이터 흐름 (data-grid.tsx)

```
1. Props 구조분해 + 기본값 설정
2. 로컬 상태 초기화 (hoveredItemInfo, hoveredOnEdge, lastWasTouch 등)
3. useGridGeometry() → mappedColumns, getBoundsForItem, getMouseArgsForPosition
4. SpriteManager 초기화
5. useCanvasRenderer() → damageInternal, damage, drawCursorOverride, renderStateProvider
6. useGridPointerEvents() → 포인터 이벤트 리스너 등록
7. useGridDragAndDrop() → DnD 이벤트 리스너 등록
8. useGridFocusAndAccessibility() → accessibilityTree, DataGridRef
9. 키보드 이벤트 핸들러 (onKeyDownImpl, onKeyUpImpl) - 오케스트레이터에 유지
10. 커서 로직 계산
11. JSX 렌더링 (canvas + overlay + stickyShadow)
```

## 추출된 훅 상세

### 1. useGridGeometry (좌표 변환/히트 감지)
```
use-grid-geometry.ts (383 LOC)
├── useMappedColumns() → 컬럼 매핑/메모이제이션
├── getBoundsForItem() → 셀 좌표 → 화면 Rectangle 변환
│   └── computeBounds() (data-grid-lib.js)
├── getMouseArgsForPosition() → 마우스 좌표 → GridMouseEventArgs
│   ├── getColumnIndexForX() / getRowIndexForY() → 히트 감지
│   ├── fill handle 클릭 감지
│   ├── 엣지(리사이즈) 감지
│   └── 이벤트 타입 결정 (cell, header, group-header, out-of-bounds)
└── stickyX → 고정 컬럼 너비 계산
```

### 2. useCanvasRenderer (캔버스 렌더링 파이프라인)
```
use-canvas-renderer.ts (458 LOC)
├── draw() → 메인 렌더 콜백
│   ├── DrawGridArg 구성
│   ├── drawGrid() 호출 (data-grid-render.js)
│   └── 블릿 최적화 (lastArgsRef)
├── 더블 버퍼 캔버스 생성/관리
├── 스크롤 상태 감지
├── DPR 리스케일링
├── AnimationManager 연동 (호버 애니메이션)
├── damageInternal() → 특정 셀 리드로우
├── damage() → 외부 데미지 API
└── drawCursorOverride → 렌더링 중 커서 오버라이드
```

### 3. useGridPointerEvents (포인터 이벤트)
```
use-grid-pointer-events.ts (413 LOC)
├── onPointerDown() → 마우스 다운
│   ├── 터치 감지
│   └── 헤더 메뉴/인디케이터 클릭 처리
├── onPointerUp() → 마우스 업
│   ├── Long touch 감지 (500ms)
│   └── Double click 감지 (500ms)
├── onPointerMove() → 호버 추적
│   ├── hoveredItemInfo 업데이트
│   ├── 엣지 호버 (리사이즈 커서)
│   ├── Fill handle 호버
│   └── 셀 데미지 (호버 효과)
├── onClickImpl() → 헤더 메뉴/인디케이터 활성화
├── onContextMenuImpl() → 우클릭 메뉴
├── isOverHeaderElement() → 헤더 요소 감지
└── groupHeaderActionForEvent() → 그룹 헤더 액션 감지
```

### 4. useGridDragAndDrop (HTML5 DnD)
```
use-grid-drag-and-drop.ts (271 LOC)
├── onDragStartImpl() → 드래그 시작
│   ├── 드래그 데이터 설정 (setData)
│   ├── 드래그 이미지 설정 (setDragImage)
│   └── 셀/헤더 프리뷰 캔버스 생성
├── onDragOverImpl() → 드래그 오버 타겟 추적
├── onDropImpl() → 드롭 처리 (좌표 조정)
├── onDragEndImpl() → 드래그 종료 정리
└── activeDropTarget → 현재 드롭 대상 셀
```

### 5. useGridFocusAndAccessibility (접근성/포커스)
```
use-grid-focus-and-accessibility.tsx (312 LOC)
├── DataGridRef 구현
│   ├── focus() → 캔버스 포커스
│   ├── getBounds() → 셀 화면 좌표
│   ├── damage() → 셀 리드로우 요청
│   └── getMouseArgsForPosition() → 마우스 좌표 변환
├── accessibilityTree → ARIA 테이블 구조
│   ├── <table role="grid"> + <thead> + <tbody>
│   ├── useDebouncedMemo (200ms 디바운싱)
│   └── getRowData() → 셀 내용 → 접근성 문자열
├── focusElement() → 포커스 요소 업데이트
└── 키보드 포커스 콜백
```

### 6. useAnimationQueue (RAF 배치)
```
use-animation-queue.ts (42 LOC)
├── loop() → RAF 체인 설정
├── requeue() → 쓰로틀된 RAF 재제출
└── queue → 리드로우 필요 셀 배열 (packed [col,row])
    └── 600개 초과 시 쓰로틀링
```

## 키보드 이벤트 (오케스트레이터에 유지)

```typescript
// data-grid.tsx:602-654
const onKeyDownImpl = useCallback((event: React.KeyboardEvent<HTMLCanvasElement>) => {
    const canvas = ref.current;
    if (canvas === null) return;

    let bounds: Rectangle | undefined;
    let location: Item | undefined;
    if (selection.current !== undefined) {
        bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
        location = selection.current.cell;
    }

    onKeyDown?.({
        bounds, key: event.key, keyCode: event.keyCode,
        ctrlKey: event.ctrlKey, metaKey: event.metaKey,
        shiftKey: event.shiftKey, altKey: event.altKey,
        location, rawEvent: event,
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
        cancel: () => undefined,
    });
}, [getBoundsForItem, onKeyDown, selection]);
```

## 커서 로직 (오케스트레이터에 유지)

```typescript
// data-grid.tsx:674-705
const cursor = isDragging
    ? "grabbing"
    : canDrag || isResizing
      ? "col-resize"
      : overFill || isFilling
        ? "crosshair"
        : cursorOverride !== undefined
          ? cursorOverride
          : headerHovered || clickableInnerCellHovered || editableBoolHovered || groupHeaderHovered
            ? "pointer"
            : "default";
```

## 렌더링 출력

```tsx
// data-grid.tsx:773-789
return (
    <>
        <canvas
            data-testid="data-grid-canvas"
            tabIndex={-1}
            onKeyDown={onKeyDownImpl}
            onKeyUp={onKeyUpImpl}
            onFocus={onCanvasFocused}
            onBlur={onCanvasBlur}
            ref={refImpl}
            style={style}>
            {accessibilityTree}
        </canvas>
        <canvas ref={overlayRef} style={overlayStyle} />
        {stickyShadow}
    </>
);
```

## 내부 상태 (오케스트레이터)

```typescript
// data-grid.tsx:381-399
const ref = useRef<HTMLCanvasElement | null>(null);
const overlayRef = useRef<HTMLCanvasElement | null>(null);
const [windowEventTarget, setWindowEventTarget] = useState(experimental?.eventTarget ?? window);
const [hoveredItemInfo, setHoveredItemInfo] = useState<[Item, readonly [number, number]] | undefined>();
const [hoveredOnEdge, setHoveredOnEdge] = useState<boolean>();
const [lastWasTouch, setLastWasTouch] = useState(false);
const [overFill, setOverFill] = useState(false);
const hoverValues = useRef<readonly { item: Item; hoverAmount: number }[]>([]);
```

> 기존 `scrolling`, `damageRegion`, `lastBlitData`, `canvasCtx`, `overlayCtx` 등은 `useCanvasRenderer`로 이동

## 성능 최적화

1. **useMappedColumns**: 컬럼 정보 메모이제이션 (`useGridGeometry`)
2. **damageRegion**: 변경된 셀만 다시 그리기 (`useCanvasRenderer`)
3. **useDebouncedMemo**: 접근성 트리 디바운싱 200ms (`useGridFocusAndAccessibility`)
4. **lastArgsRef**: 이전 렌더링 인자 캐싱 - 블릿용 (`useCanvasRenderer`)
5. **hoverValues**: 호버 애니메이션 상태 분리
6. **useAnimationQueue**: RAF 배치 처리, 600개 초과 시 쓰로틀링
7. **더블 버퍼 캔버스**: Safari 깜빡임 방지 (`useCanvasRenderer`)

## 수정 시 주의사항

1. **훅 분리**: 각 관심사가 별도 훅 파일로 분리됨 - 수정 대상 파일 확인
2. **좌표 변환**: scale 적용 (고DPI 디스플레이) - `useGridGeometry`
3. **캔버스 분리**: 메인 + 오버레이 (헤더) - `useCanvasRenderer`
4. **접근성**: ARIA 속성 및 키보드 네비게이션 - `useGridFocusAndAccessibility`
5. **이벤트 리스너**: `useEventListener`로 window에 등록 - `useGridPointerEvents`
6. **훅 호출 순서**: geometry → renderer → pointerEvents → dragAndDrop → focusAndAccessibility (의존성 순서)
7. **오케스트레이터에 남은 로직**: 키보드 이벤트, 커서 계산, sticky shadow, canvas ref 콜백
