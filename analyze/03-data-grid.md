# DataGrid 컴포넌트 분석

## 개요
- **역할**: 캔버스 기반 그리드 렌더링 및 저수준 이벤트 처리
- **위치**: `packages/core/src/internal/data-grid/data-grid.tsx`
- **LOC**: 약 1,950 라인

## 컴포넌트 구조

```
DataGrid (ForwardRef)
    ├── 캔버스 참조 (ref, overlayRef)
    ├── 상태 (scrolling, hoveredItemInfo, drawCursorOverride)
    ├── SpriteManager (아이콘 관리)
    ├── AnimationManager (호버 애니메이션)
    ├── 이벤트 리스너 (pointer, keyboard, drag)
    ├── draw() 함수 (렌더링)
    └── Canvas 엘리먼트 + 접근성 트리
```

## DataGridProps

### 크기/레이아웃 Props
```typescript
// data-grid.tsx:63-108
interface DataGridProps {
    readonly width: number;
    readonly height: number;
    readonly cellXOffset: number;
    readonly cellYOffset: number;
    readonly translateX: number | undefined;
    readonly translateY: number | undefined;
    readonly freezeColumns: number;
    readonly freezeTrailingRows: number;
    readonly headerHeight: number;
    readonly groupHeaderHeight: number;
    readonly rowHeight: number | ((index: number) => number);
    readonly rows: number;
    readonly columns: readonly InnerGridColumn[];
}
```

### 이벤트 콜백
```typescript
// data-grid.tsx:163-184
readonly onItemHovered: (args: GridMouseEventArgs) => void;
readonly onMouseMove: (args: GridMouseEventArgs) => void;
readonly onMouseDown: (args: GridMouseEventArgs) => void;
readonly onMouseUp: (args: GridMouseEventArgs, isOutside: boolean) => void;
readonly onContextMenu: (args: GridMouseEventArgs, preventDefault: () => void) => void;
readonly onKeyDown: (event: GridKeyEventArgs) => void;
readonly onKeyUp: ((event: GridKeyEventArgs) => void) | undefined;
readonly onCanvasFocused: () => void;
readonly onCanvasBlur: () => void;
readonly onCellFocused: (args: Item) => void;
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
// data-grid.tsx:319-328
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

## 내부 상태

### 주요 Ref
```typescript
// data-grid.tsx:408-419
const ref = useRef<HTMLCanvasElement | null>(null);
const overlayRef = useRef<HTMLCanvasElement | null>(null);
const damageRegion = useRef<CellSet | undefined>();
const hoverValues = useRef<readonly { item: Item; hoverAmount: number }[]>([]);
const lastBlitData = useRef<BlitData | undefined>();
const lastArgsRef = useRef<DrawGridArg>();
const canvasCtx = useRef<CanvasRenderingContext2D | null>(null);
const overlayCtx = useRef<CanvasRenderingContext2D | null>(null);
```

### 주요 State
```typescript
// data-grid.tsx:414-420
const [scrolling, setScrolling] = useState<boolean>(false);
const [hoveredItemInfo, setHoveredItemInfo] = useState<[Item, readonly [number, number]] | undefined>();
const [hoveredOnEdge, setHoveredOnEdge] = useState<boolean>();
const [drawCursorOverride, setDrawCursorOverride] = useState<CSSProperties["cursor"] | undefined>();
const [lastWasTouch, setLastWasTouch] = useState(false);
```

## 핵심 함수

### 1. getBoundsForItem (셀 위치 계산)
```typescript
// data-grid.tsx:459-514
const getBoundsForItem = useCallback(
    (canvas: HTMLCanvasElement, col: number, row: number): Rectangle | undefined => {
        // computeBounds 호출하여 셀의 화면 좌표 계산
        const result = computeBounds(
            col, row, width, height,
            groupHeaderHeight, totalHeaderHeight,
            cellXOffset, cellYOffset,
            translateX, translateY,
            rows, freezeColumns, freezeTrailingRows,
            mappedColumns, rowHeight
        );
        return result;
    },
    [/* dependencies */]
);
```

### 2. getMouseArgsForPosition (마우스 위치 → 셀 정보)
```typescript
// data-grid.tsx:516-727
const getMouseArgsForPosition = useCallback(
    (canvas, posX, posY, ev): GridMouseEventArgs => {
        // 1. 화면 좌표 → 그리드 좌표 변환
        const x = (posX - rect.left) / scale;
        const y = (posY - rect.top) / scale;

        // 2. 컬럼/행 인덱스 계산
        const col = getColumnIndexForX(x, effectiveCols, translateX);
        const row = getRowIndexForY(y, height, ...);

        // 3. 이벤트 타입 결정 (cell, header, group-header, out-of-bounds)
        // 4. fill handle 클릭 감지
        // 5. 엣지(리사이즈) 감지

        return result;
    },
    [/* dependencies */]
);
```

### 3. draw (메인 렌더링 함수)
```typescript
// data-grid.tsx:768-916
const draw = useCallback(() => {
    const canvas = ref.current;
    const overlay = overlayRef.current;

    // 캔버스 컨텍스트 초기화
    if (canvasCtx.current === null) {
        canvasCtx.current = canvas.getContext("2d", { alpha: false });
    }

    // 커서 오버라이드 콜백
    const overrideCursor = (cursor) => {
        setDrawCursorOverride(cursor);
    };

    // DrawGridArg 구성
    const current = {
        canvasCtx: canvasCtx.current,
        headerCanvasCtx: overlayCtx.current,
        width, height,
        cellXOffset, cellYOffset,
        translateX, translateY,
        mappedColumns,
        theme,
        selection,
        // ... 기타 속성
    };

    // drawGrid 호출
    if (current.damage === undefined) {
        lastArgsRef.current = current;
        drawGrid(current, last);
    } else {
        drawGrid(current, undefined);
    }
}, [/* dependencies */]);
```

## 이벤트 처리

### 1. Pointer 이벤트
```typescript
// data-grid.tsx:1076-1133 (onPointerDown)
const onPointerDown = useCallback((ev: PointerEvent) => {
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

    // 터치 여부 감지
    if (args.isTouch) {
        downTime.current = Date.now();
    }

    // 헤더 메뉴/인디케이터 클릭 처리
    if (args.kind === headerKind) {
        const headerElement = isOverHeaderElement(canvas, args.location[0], clientX, clientY);
        if (headerElement !== undefined) return;
    }

    onMouseDown?.(args);
}, [/* dependencies */]);
useEventListener("pointerdown", onPointerDown, windowEventTarget, false);
```

```typescript
// data-grid.tsx:1138-1197 (onPointerUp)
const onPointerUp = useCallback((ev: PointerEvent) => {
    let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

    // Long touch 감지
    if (args.isTouch && Date.now() - downTime.current > 500) {
        args = { ...args, isLongTouch: true };
    }

    // Double click 감지
    if (Date.now() - lastUpTimeValue < 500) {
        args = { ...args, isDoubleClick: true };
    }

    onMouseUp(args, isOutside);
}, [/* dependencies */]);
```

### 2. Pointer Move
```typescript
// data-grid.tsx:1291-1373 (onPointerMove)
const onPointerMove = useCallback((ev: MouseEvent) => {
    const args = getMouseArgsForPosition(canvas, ev.clientX, ev.clientY, ev);

    // 호버 정보 업데이트
    onItemHovered?.(args);
    setHoveredItemInfo([args.location, [args.localEventX, args.localEventY]]);

    // 엣지 호버 (리사이즈 커서)
    setHoveredOnEdge(args.kind === headerKind && args.isEdge && allowResize);

    // Fill handle 호버
    setOverFill(args.kind === "cell" && args.isFillHandle);

    // 셀 데미지 (호버 효과용)
    if (needsDamageCell) {
        damageInternal(new CellSet([args.location]));
    }
}, [/* dependencies */]);
```

### 3. 키보드 이벤트
```typescript
// data-grid.tsx:1376-1434 (onKeyDownImpl, onKeyUpImpl)
const onKeyDownImpl = useCallback((event: React.KeyboardEvent) => {
    let bounds: Rectangle | undefined;
    let location: Item | undefined;

    if (selection.current !== undefined) {
        bounds = getBoundsForItem(canvas, selection.current.cell[0], selection.current.cell[1]);
        location = selection.current.cell;
    }

    onKeyDown?.({
        bounds,
        key: event.key,
        keyCode: event.keyCode,
        ctrlKey: event.ctrlKey,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        location,
        // ...
    });
}, [/* dependencies */]);
```

### 4. 드래그 앤 드롭
```typescript
// data-grid.tsx:1457-1613 (onDragStartImpl)
const onDragStartImpl = useCallback((event: DragEvent) => {
    // 드래그 데이터 설정
    const setData = (mime: string, payload: string) => { ... };

    // 드래그 이미지 설정
    const setDragImage = (image: Element, x: number, y: number) => { ... };

    onDragStart?.({
        ...args,
        setData,
        setDragImage,
        preventDefault: () => (prevented = true),
    });

    // 기본 드래그 이미지 생성 (셀/헤더 스냅샷)
}, [/* dependencies */]);
```

## 애니메이션 시스템

### AnimationManager
```typescript
// data-grid.tsx:1266-1288
const onAnimationFrame = useCallback<StepCallback>(values => {
    damageRegion.current = new CellSet(values.map(x => x.item));
    hoverValues.current = values;
    lastDrawRef.current();
    damageRegion.current = undefined;
}, []);

const animManagerValue = useMemo(
    () => new AnimationManager(onAnimationFrame),
    [onAnimationFrame]
);

// 호버된 셀 설정
useLayoutEffect(() => {
    const cell = getCellContent(hoveredItem);
    const cellNeedsHover = renderer?.needsHover !== undefined;
    am.setHovered(cellNeedsHover ? hoveredItem : undefined);
}, [hoveredItem, getCellContent, getCellRenderer]);
```

## 접근성 트리

```typescript
// data-grid.tsx:1738-1877
const accessibilityTree = useDebouncedMemo(() => {
    return (
        <table role="grid" aria-rowcount={rows + 1}>
            <thead role="rowgroup">
                <tr role="row">
                    {effectiveCols.map(c => (
                        <th role="columnheader" aria-colindex={c.sourceIndex + 1}>
                            {c.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody role="rowgroup">
                {visibleRows.map(row => (
                    <tr role="row" aria-rowindex={row + 2}>
                        {effectiveCols.map(c => (
                            <td role="gridcell" tabIndex={-1}>
                                {getRowData(cellContent)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}, [/* dependencies */], 200);
```

## 커서 로직

```typescript
// data-grid.tsx:962-984
const cursor = isDragging
    ? "grabbing"
    : canDrag || isResizing
      ? "col-resize"
      : overFill || isFilling
        ? "crosshair"
        : cursorOverride !== undefined
          ? cursorOverride
          : headerHovered || clickableInnerCellHovered || editableBoolHovered
            ? "pointer"
            : "default";
```

## 렌더링 출력

```tsx
// data-grid.tsx:1931-1946
return (
    <>
        <canvas
            data-testid="data-grid-canvas"
            tabIndex={0}
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

## 성능 최적화

1. **useMappedColumns**: 컬럼 정보 메모이제이션
2. **damageRegion**: 변경된 셀만 다시 그리기
3. **useDebouncedMemo**: 접근성 트리 디바운싱 (200ms)
4. **lastArgsRef**: 이전 렌더링 인자 캐싱 (블릿용)
5. **hoverValues**: 호버 애니메이션 상태 분리

## 수정 시 주의사항

1. **이벤트 리스너**: `useEventListener`로 window에 등록
2. **좌표 변환**: scale 적용 (고DPI 디스플레이)
3. **캔버스 분리**: 메인 + 오버레이 (헤더)
4. **접근성**: ARIA 속성 및 키보드 네비게이션 유지
5. **메모리**: 버퍼 캔버스는 document에 추가됨
