# 이벤트 시스템 분석

## 개요
- **역할**: 마우스, 키보드, 드래그 이벤트 처리
- **핵심 파일**:
  - `internal/data-grid/event-args.ts` (이벤트 타입 정의)
  - `internal/data-grid/data-grid.tsx` (저수준 이벤트 처리)
  - `data-editor/data-editor.tsx` (이벤트 오케스트레이션)
  - `data-editor/use-mouse-handlers.ts` (고수준 마우스 이벤트 - 리팩토링)
  - `data-editor/use-keyboard-handlers.ts` (고수준 키보드 이벤트 - 리팩토링)
  - `data-editor/use-ghost-input.ts` (IME/문자 입력 이벤트 - 리팩토링)
  - `data-editor/use-clipboard.ts` (클립보드 이벤트 - 리팩토링)

## 이벤트 타입

### BaseGridMouseEventArgs
```typescript
// event-args.ts:4-15
interface BaseGridMouseEventArgs {
    readonly shiftKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly isTouch: boolean;
    readonly isLongTouch?: boolean;    // 500ms 이상 터치
    readonly isDoubleClick?: boolean;  // 500ms 내 두 번 클릭
    readonly isEdge: boolean;          // 컬럼 경계 (리사이즈)
    readonly button: number;           // 0: 좌, 1: 중, 2: 우
    readonly buttons: number;          // 비트마스크
    readonly scrollEdge: readonly [-1|0|1, -1|0|1]; // 스크롤 영역 접근
}
```

### GridMouseEventArgs (통합 타입)
```typescript
// event-args.ts:86-90
type GridMouseEventArgs =
    | GridMouseCellEventArgs        // 셀 영역
    | GridMouseHeaderEventArgs      // 헤더 영역
    | GridMouseGroupHeaderEventArgs // 그룹 헤더 영역
    | GridMouseOutOfBoundsEventArgs; // 그리드 외부
```

### GridMouseCellEventArgs
```typescript
// event-args.ts:23-28
interface GridMouseCellEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "cell";
    readonly location: Item;         // [col, row]
    readonly bounds: Rectangle;      // 셀 화면 좌표
    readonly isFillHandle: boolean;  // fill handle 클릭
}
```

### GridMouseHeaderEventArgs
```typescript
// event-args.ts:33-38
interface GridMouseHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "header";
    readonly location: readonly [number, -1];  // [col, -1]
    readonly bounds: Rectangle;
    readonly group: string;
}
```

### GridMouseGroupHeaderEventArgs
```typescript
// event-args.ts:43-48
interface GridMouseGroupHeaderEventArgs extends BaseGridMouseEventArgs, PositionableMouseEventArgs {
    readonly kind: "group-header";
    readonly location: readonly [number, -2];  // [col, -2]
    readonly bounds: Rectangle;
    readonly group: string;
}
```

### GridMouseOutOfBoundsEventArgs
```typescript
// event-args.ts:62-67
interface GridMouseOutOfBoundsEventArgs extends BaseGridMouseEventArgs {
    readonly kind: "out-of-bounds";
    readonly location: Item;
    readonly isMaybeScrollbar: boolean;  // 스크롤바 영역
    readonly region: readonly [OutOfBoundsRegionAxis, OutOfBoundsRegionAxis];
}

enum OutOfBoundsRegionAxis {
    Start = -2,       // 왼쪽/위쪽 완전 바깥
    StartPadding = -1, // 왼쪽/위쪽 패딩
    Center = 0,        // 그리드 내부
    EndPadding = 1,    // 오른쪽/아래쪽 패딩
    End = 2,           // 오른쪽/아래쪽 완전 바깥
}
```

### GridKeyEventArgs
```typescript
// event-args.ts:70-83
interface GridKeyEventArgs {
    readonly bounds: Rectangle | undefined;  // 현재 셀 위치
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
    readonly location: Item | undefined;  // 현재 셀
}
```

## DataEditor 이벤트 콜백

### 셀 이벤트
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onCellClicked` | `(cell: Item, event: CellClickedEventArgs)` | 셀 클릭 |
| `onCellActivated` | `(cell: Item, event: CellActivatedEventArgs)` | 셀 활성화 (편집 시작) |
| `onCellContextMenu` | `(cell: Item, event: CellClickedEventArgs)` | 셀 우클릭 |

### 헤더 이벤트
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onHeaderClicked` | `(colIndex: number, event: HeaderClickedEventArgs)` | 헤더 클릭 |
| `onHeaderContextMenu` | `(colIndex: number, event: HeaderClickedEventArgs)` | 헤더 우클릭 |
| `onHeaderMenuClick` | `(col: number, screenPosition: Rectangle)` | 헤더 메뉴 아이콘 |
| `onHeaderIndicatorClick` | `(col: number, screenPosition: Rectangle)` | 헤더 인디케이터 |

### 그룹 헤더 이벤트
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onGroupHeaderClicked` | `(colIndex: number, event: GroupHeaderClickedEventArgs)` | 그룹 헤더 클릭 |
| `onGroupHeaderContextMenu` | `(colIndex: number, event: GroupHeaderClickedEventArgs)` | 그룹 헤더 우클릭 |
| `onGroupHeaderRenamed` | `(groupName: string, newVal: string)` | 그룹 이름 변경 |

### 호버/이동 이벤트
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onMouseMove` | `(args: GridMouseEventArgs)` | 마우스 이동 |
| `onItemHovered` | `(args: GridMouseEventArgs)` | 아이템 호버 |

### 키보드 이벤트
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onKeyDown` | `(event: GridKeyEventArgs)` | 키 다운 |
| `onKeyUp` | `(event: GridKeyEventArgs)` | 키 업 |

### 드래그 앤 드롭
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onDragStart` | `(args: GridDragEventArgs)` | 드래그 시작 |
| `onDragOverCell` | `(cell: Item, dataTransfer: DataTransfer \| null)` | 셀 위 드래그 |
| `onDrop` | `(cell: Item, dataTransfer: DataTransfer \| null)` | 드롭 |
| `onDragLeave` | `()` | 그리드 밖으로 드래그 |

### 컬럼 조작
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onColumnResize` | `(column, newSize, colIndex, newSizeWithGrow)` | 컬럼 리사이즈 중 |
| `onColumnResizeEnd` | `(column, newSize, colIndex, newSizeWithGrow)` | 리사이즈 완료 |
| `onColumnResizeStart` | `(column, newSize, colIndex, newSizeWithGrow)` | 리사이즈 시작 |
| `onColumnMoved` | `(startIndex, endIndex)` | 컬럼 이동 |
| `onColumnProposeMove` | `(start, end) => boolean` | 이동 허용 여부 |

### 행 조작
| 콜백 | 인자 타입 | 설명 |
|------|----------|------|
| `onRowAppended` | `() => Promise<"top" \| "bottom" \| number>` | 행 추가 |
| `onRowMoved` | `(startIndex, endIndex)` | 행 이동 |

## DataGrid 저수준 이벤트 처리

### 포인터 이벤트
```typescript
// data-grid.tsx:1076-1133
const onPointerDown = useCallback((ev: PointerEvent) => {
    // 1. 위치 → 셀 정보 변환
    const args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

    // 2. 터치/마우스 구분
    if (args.isTouch) {
        downTime.current = Date.now();
    }

    // 3. 헤더 메뉴/인디케이터 클릭 처리
    if (args.kind === headerKind) {
        const element = isOverHeaderElement(canvas, args.location[0], clientX, clientY);
        if (element !== undefined) return;  // 메뉴 클릭은 별도 처리
    }

    // 4. 콜백 호출
    onMouseDown?.(args);
}, [/* deps */]);

useEventListener("pointerdown", onPointerDown, windowEventTarget, false);
```

```typescript
// data-grid.tsx:1138-1197
const onPointerUp = useCallback((ev: PointerEvent) => {
    let args = getMouseArgsForPosition(canvas, clientX, clientY, ev);

    // Long touch 감지 (500ms)
    if (args.isTouch && Date.now() - downTime.current > 500) {
        args = { ...args, isLongTouch: true };
    }

    // Double click 감지
    if (Date.now() - lastUpTimeValue < 500) {
        args = { ...args, isDoubleClick: true };
    }

    onMouseUp(args, isOutside);
}, [/* deps */]);
```

### 키보드 이벤트
```typescript
// data-grid.tsx:1376-1404
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
        stopPropagation: () => event.stopPropagation(),
        preventDefault: () => event.preventDefault(),
        cancel: () => undefined,
        rawEvent: event,
    });
}, [/* deps */]);
```

### 드래그 앤 드롭
```typescript
// data-grid.tsx:1457-1613
const onDragStartImpl = useCallback((event: DragEvent) => {
    // 드래그 데이터 설정 콜백
    const setData = (mime: string, payload: string) => {
        dragMime = mime;
        dragData = payload;
    };

    // 드래그 이미지 설정 콜백
    const setDragImage = (image: Element, x: number, y: number) => {
        dragImage = image;
        dragImageX = x;
        dragImageY = y;
    };

    // 콜백 호출
    onDragStart?.({
        ...args,
        setData,
        setDragImage,
        preventDefault: () => (prevented = true),
        defaultPrevented: () => prevented,
    });

    // 클립보드 데이터 설정
    if (!prevented && dragMime !== undefined) {
        event.dataTransfer.setData(dragMime, dragData);
        event.dataTransfer.effectAllowed = "copyLink";
    }
}, [/* deps */]);
```

## 이벤트 전파 경로

```
1. DOM 이벤트 (Canvas / GhostInput)
        ↓
2. DataGrid 핸들러 (data-grid.tsx)
   - 좌표 → 셀 변환
   - 이벤트 타입 결정
        ↓
3. 추출된 훅 핸들러 (리팩토링된 구조)
   ├── 마우스 이벤트 → useMouseHandlers (use-mouse-handlers.ts)
   │   - 셀 클릭, 드래그, 필 패턴
   │   - 컨텍스트 메뉴, 터치 이벤트
   ├── 키보드 이벤트 → useKeyboardHandlers (use-keyboard-handlers.ts)
   │   - 네비게이션, 키바인딩
   │   - 셀 활성화, 삭제
   ├── 문자 입력 → useGhostInput (use-ghost-input.ts)
   │   - IME 조합, 인쇄 가능 문자
   │   - GhostInput textarea 이벤트
   └── 클립보드 → useClipboard (use-clipboard.ts)
       - 복사/붙여넣기/잘라내기
        ↓
4. DataEditor 상태 업데이트 (data-editor.tsx)
   - 선택 상태 업데이트
   - 오버레이 관리
        ↓
5. 사용자 콜백
   - onCellClicked
   - onGridSelectionChange
   - 등
```

## CellActivatedEventArgs

```typescript
// event-args.ts:104-122
type CellActivatedEventArgs =
    | KeyboardCellActivatedEvent
    | PointerCellActivatedEvent;

interface KeyboardCellActivatedEvent {
    readonly inputType: "keyboard";
    readonly key: string;  // 활성화 키
}

interface PointerCellActivatedEvent {
    readonly inputType: "pointer";
    readonly pointerActivation: CellActivationBehavior;  // "double-click" | "single-click" | "second-click"
    readonly pointerType?: "mouse" | "touch" | "pen";
}
```

## 이벤트 preventDefault

### PreventableEvent
```typescript
interface PreventableEvent {
    preventDefault: () => void;
}

// 사용 예시
onCellClicked={(cell, event) => {
    if (shouldPrevent(cell)) {
        event.preventDefault();  // 기본 선택 동작 취소
    }
}}
```

## Keybindings 설정

```typescript
// data-editor/data-editor-keybindings.ts
interface Keybinds {
    selectAll: boolean;       // Ctrl+A
    selectRow: boolean;       // Shift+Space
    selectColumn: boolean;    // Ctrl+Space
    downFill: boolean;        // Ctrl+D
    rightFill: boolean;       // Ctrl+R
    pageUp: boolean;          // PageUp
    pageDown: boolean;        // PageDown
    first: boolean;           // Ctrl+Home
    last: boolean;            // Ctrl+End
    search: boolean;          // Ctrl+F
    delete: boolean;          // Delete/Backspace
    copy: boolean;            // Ctrl+C
    paste: boolean;           // Ctrl+V
    cut: boolean;             // Ctrl+X
    undo: boolean;            // Ctrl+Z
    redo: boolean;            // Ctrl+Y
}

// 사용
<DataEditor
    keybindings={{
        selectAll: true,
        copy: true,
        paste: false,  // 붙여넣기 비활성화
    }}
/>
```

## 수정 시 주의사항

1. **이벤트 타입 구분**: kind 필드로 이벤트 영역 확인
2. **rowMarkerOffset**: 콜백의 cell 인덱스는 외부 기준
3. **preventDefault**: 기본 동작 취소 시점 주의
4. **터치 이벤트**: isTouch, isLongTouch 구분 처리
5. **드래그**: isDraggable prop과 함께 사용
6. **리팩토링된 파일 위치**: 이벤트 핸들러 수정시 해당 훅 파일을 직접 수정
   - 마우스 이벤트: `use-mouse-handlers.ts`
   - 키보드 이벤트: `use-keyboard-handlers.ts`
   - IME/입력: `use-ghost-input.ts`
   - 클립보드: `use-clipboard.ts`
7. **DataEditorCoreState**: 훅에 새 상태를 전달해야 하면 `data-editor-state.ts`의 인터페이스 수정 필요
