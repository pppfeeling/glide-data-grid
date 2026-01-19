# 선택 및 네비게이션 분석

## 개요
- **역할**: 셀, 행, 컬럼 선택 및 키보드/마우스 네비게이션
- **핵심 파일**:
  - `internal/data-grid/use-selection-behavior.ts`
  - `internal/data-grid/data-grid-types.ts` (GridSelection, CompactSelection)
  - `data-editor/data-editor.tsx` (선택 Props 처리)

## 선택 데이터 구조

### GridSelection
```typescript
// data-grid-types.ts:17-25
interface GridSelection {
    readonly current?: {
        readonly cell: Item;           // 현재 활성 셀 [col, row]
        readonly range: Rectangle;     // 선택 범위 {x, y, width, height}
        readonly rangeStack: readonly Rectangle[]; // 다중 선택시 이전 범위들
    };
    readonly columns: CompactSelection;  // 선택된 컬럼 인덱스들
    readonly rows: CompactSelection;     // 선택된 행 인덱스들
}
```

### CompactSelection
```typescript
// data-grid-types.ts:613-747
class CompactSelection {
    readonly items: CompactSelectionRanges;  // [[start, end], ...] 형태

    // 생성
    static empty(): CompactSelection;
    static fromSingleSelection(selection: number | Slice): CompactSelection;
    static fromArray(items: readonly number[]): CompactSelection;

    // 조작
    add(selection: number | Slice): CompactSelection;
    remove(selection: number | Slice): CompactSelection;
    offset(amount: number): CompactSelection;

    // 조회
    hasIndex(index: number): boolean;
    hasAll(index: Slice): boolean;
    first(): number | undefined;
    last(): number | undefined;
    toArray(): number[];
    get length(): number;
}
```

## 선택 모드

### 범위 선택 (rangeSelect)
```typescript
// data-editor.tsx:407
type RangeSelect = "none" | "cell" | "rect" | "multi-cell" | "multi-rect";

// 동작:
// - "none": 범위 선택 비활성화
// - "cell": 단일 셀만 선택
// - "rect": 단일 직사각형 범위
// - "multi-cell": 다중 개별 셀 (Ctrl+클릭)
// - "multi-rect": 다중 직사각형 범위 (Ctrl+드래그)
```

### 컬럼/행 선택
```typescript
// data-editor.tsx:412-417
type ColumnRowSelect = "none" | "single" | "multi";

// columnSelect, rowSelect Props
// - "none": 선택 비활성화
// - "single": 단일 선택
// - "multi": 다중 선택 (Shift/Ctrl 키 사용)
```

### 선택 블렌딩 (Blending)
```typescript
// use-selection-behavior.ts:12
type SelectionBlending = "exclusive" | "mixed" | "additive";

// rangeSelectionBlending, columnSelectionBlending, rowSelectionBlending
// - "exclusive": 한 종류의 선택만 유지
// - "mixed": Ctrl 키와 함께 여러 선택 공존
// - "additive": 항상 여러 선택 공존
```

## useSelectionBehavior 훅

```typescript
// use-selection-behavior.ts:16-153
function useSelectionBehavior(
    gridSelection: GridSelection,
    setGridSelection: SetCallback,
    rangeBehavior: SelectionBlending,
    columnBehavior: SelectionBlending,
    rowBehavior: SelectionBlending,
    rangeSelect: RangeSelect,
    rangeSelectionColumnSpanning: boolean
): [setCurrent, setSelectedRows, setSelectedColumns]
```

### setCurrent (범위 선택)
```typescript
const setCurrent = useCallback(
    (
        value: { cell: Item; range: Rectangle } | undefined,
        expand: boolean,      // Shift 키 확장
        append: boolean,      // Ctrl 키 추가
        trigger: SelectionTrigger  // "click" | "drag" | "keyboard-nav" | "keyboard-select" | "edit"
    ) => {
        // 1. cell/multi-cell 모드시 범위를 단일 셀로 제한
        if (rangeSelect === "cell" || rangeSelect === "multi-cell") {
            value = { ...value, range: { x: cell[0], y: cell[1], width: 1, height: 1 } };
        }

        // 2. 컬럼 스패닝 비활성화시 너비 1로 제한
        if (!rangeSelectionColumnSpanning && value.range.width > 1) {
            value = { ...value, range: { ...value.range, width: 1, x: cell[0] } };
        }

        // 3. 블렌딩 규칙에 따라 기존 선택 유지/초기화
        const rangeMixable = (rangeBehavior === "mixed" && append) || rangeBehavior === "additive";
        const allowColumnCoSelect = columnBehavior !== "exclusive" && rangeMixable;
        const allowRowCoSelect = append || rowBehavior !== "exclusive" && rangeMixable;

        // 4. 새 선택 상태 구성
        let newVal: GridSelection = {
            current: value,
            columns: allowColumnCoSelect ? gridSelection.columns : CompactSelection.empty(),
            rows: allowRowCoSelect ? gridSelection.rows : CompactSelection.empty(),
        };

        // 5. multi-rect 모드시 rangeStack에 이전 범위 추가
        if (append && rangeSelect === "multi-rect" && gridSelection.current !== undefined) {
            newVal.current.rangeStack = [...gridSelection.current.rangeStack, gridSelection.current.range];
        }

        setGridSelection(newVal, expand);
    },
    [/* dependencies */]
);
```

### setSelectedRows (행 선택)
```typescript
const setSelectedRows = useCallback(
    (
        newRows: CompactSelection | undefined,
        append: Slice | number | undefined,  // 추가할 행
        allowMixed: boolean                   // Ctrl 키 상태
    ) => {
        newRows = newRows ?? gridSelection.rows;
        if (append !== undefined) {
            newRows = newRows.add(append);
        }

        // exclusive 모드시 다른 선택 초기화
        if (rowBehavior === "exclusive" && newRows.length > 0) {
            newVal = {
                current: undefined,
                columns: CompactSelection.empty(),
                rows: newRows,
            };
        } else {
            // mixed/additive 모드
            const rangeMixed = allowMixed && rangeBehavior !== "exclusive";
            const columnMixed = allowMixed && columnBehavior !== "exclusive";
            newVal = {
                current: rangeMixed ? gridSelection.current : undefined,
                columns: columnMixed ? gridSelection.columns : CompactSelection.empty(),
                rows: newRows,
            };
        }

        setGridSelection(newVal, false);
    },
    [/* dependencies */]
);
```

## 키보드 네비게이션

### 방향키 이동
```typescript
// data-editor.tsx 내 키보드 핸들러
// Arrow keys: 인접 셀로 이동
// - ArrowUp: row - 1
// - ArrowDown: row + 1
// - ArrowLeft: col - 1
// - ArrowRight: col + 1

// Shift + Arrow: 선택 범위 확장
// - 현재 셀 고정, range 확장

// Ctrl/Cmd + Arrow: 데이터 끝까지 이동
// - 다음 빈 셀 또는 끝까지
```

### Tab/Enter 네비게이션
```typescript
// Tab: 다음 셀 (오른쪽 → 다음 행 첫 컬럼)
// Shift + Tab: 이전 셀

// Enter: 아래 셀 (또는 편집 완료 후 이동)
// Shift + Enter: 위 셀
```

### Home/End/Page
```typescript
// Home: 현재 행의 첫 컬럼
// End: 현재 행의 마지막 컬럼
// Ctrl + Home: (0, 0)
// Ctrl + End: 마지막 셀

// PageUp/PageDown: 화면 단위 이동
```

## 마우스 선택

### 단일 셀 클릭
```typescript
// data-grid.tsx 마우스 핸들러
onMouseDown -> setCurrent({ cell, range: singleCellRange }, false, false, "click")
```

### Shift 클릭 (범위 확장)
```typescript
// 시작 셀(current.cell)에서 클릭 위치까지 범위 확장
onMouseDown + shiftKey -> setCurrent({ cell, range: expandedRange }, true, false, "click")
```

### Ctrl 클릭 (다중 선택)
```typescript
// 기존 선택 유지하고 새 범위 추가
onMouseDown + ctrlKey -> setCurrent({ cell, range }, false, true, "click")
```

### 드래그 선택
```typescript
// mouseDown에서 시작, mouseMove에서 범위 확장
onMouseMove (while dragging) -> setCurrent({ cell: startCell, range: dragRange }, true, false, "drag")
```

## 행 마커 선택

### 체크박스 클릭
```typescript
// 행 마커 컬럼 클릭시
if (col === markerColumn) {
    const isSelected = gridSelection.rows.hasIndex(row);
    if (isSelected) {
        setSelectedRows(gridSelection.rows.remove(row), undefined, ctrlKey);
    } else {
        setSelectedRows(undefined, row, ctrlKey);
    }
}
```

### 헤더 체크박스 (전체 선택)
```typescript
// 헤더의 행 마커 클릭
if (row === -1 && col === markerColumn) {
    if (gridSelection.rows.length === rows) {
        // 전체 해제
        setSelectedRows(CompactSelection.empty(), undefined, false);
    } else {
        // 전체 선택
        setSelectedRows(CompactSelection.fromSingleSelection([0, rows]), undefined, false);
    }
}
```

## 선택 상태 흐름

```
1. 사용자 입력 (클릭, 키보드)
        ↓
2. 이벤트 핸들러 (data-grid.tsx)
        ↓
3. useSelectionBehavior 호출
   - setCurrent / setSelectedRows / setSelectedColumns
        ↓
4. 블렌딩 규칙 적용
        ↓
5. setGridSelection 콜백
        ↓
6. onGridSelectionChange (외부) 또는
   setGridSelectionInner (내부)
        ↓
7. 리렌더링
```

## 선택 관련 유틸리티

### gridSelectionHasItem
```typescript
// 특정 셀이 선택 범위에 포함되는지
function gridSelectionHasItem(sel: GridSelection, item: Item): boolean {
    return itemIsInRect(item, sel.current?.range) ||
           sel.current?.rangeStack.some(r => itemIsInRect(item, r));
}
```

### cellIsSelected / cellIsInRange
```typescript
// 셀 선택 상태 확인
function cellIsSelected(location: Item, cell: InnerGridCell, selection: GridSelection): boolean;
function cellIsInRange(location: Item, cell: InnerGridCell, selection: GridSelection): boolean;
```

## 주요 Props 요약

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `gridSelection` | `GridSelection` | - | 제어 선택 상태 |
| `onGridSelectionChange` | `(sel) => void` | - | 선택 변경 콜백 |
| `rangeSelect` | `string` | `"rect"` | 범위 선택 모드 |
| `columnSelect` | `string` | `"multi"` | 컬럼 선택 모드 |
| `rowSelect` | `string` | `"multi"` | 행 선택 모드 |
| `rangeSelectionBlending` | `string` | `"exclusive"` | 범위 선택 블렌딩 |
| `columnSelectionBlending` | `string` | `"exclusive"` | 컬럼 선택 블렌딩 |
| `rowSelectionBlending` | `string` | `"exclusive"` | 행 선택 블렌딩 |
| `rowSelectionMode` | `"auto" \| "multi"` | `"auto"` | 행 다중 선택 모드 |

## 수정 시 주의사항

1. **rowMarkerOffset**: 내부/외부 인덱스 변환 필수
2. **블렌딩 규칙**: 복잡한 조합 가능, 테스트 필수
3. **rangeStack**: 다중 선택시 이전 범위 유지
4. **스팬 처리**: 병합된 셀의 선택 범위 확장
5. **불변성**: CompactSelection은 항상 새 인스턴스 반환
