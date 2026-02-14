---
paths:
  - "packages/core/src/internal/data-grid/render/data-grid-render.header.ts"
---

# Multi-Level Header (다중 레벨 그룹 헤더)

## 개요

glide-data-grid의 기본 그룹 헤더는 1단계로 제한되어 있습니다. 이 기능은 2개 이상의 계층적 그룹 헤더를 지원하도록 확장합니다.


## 구현 완료 상태 

### 완료된 기능
- [x] 타입 시스템 (`group: string | readonly string[]`)
- [x] Props 체인 (DataEditor → DataGrid)
- [x] 멀티 레벨 그룹 헤더 렌더링
- [x] 그룹 헤더 클릭 시 컬럼 선택
- [x] 마우스 이벤트 처리
- [x] 스크롤 시 헤더 고정
- [x] 셀 선택 시 하이라이트 링

---

## 타입 시스템

### 파일: `packages/core/src/internal/data-grid/data-grid-types.ts`

#### GroupPath 타입 (새로 추가)
```typescript
/**
 * Represents a hierarchical group path from topmost to innermost level.
 * Example: ["Region", "Country", "City"] creates 3 levels of group headers.
 * @category Types
 */
export type GroupPath = readonly string[];
```

#### BaseGridColumn.group 확장
```typescript
interface BaseGridColumn {
    /**
     * Group name for column grouping. Can be a single string for one level of grouping,
     * or an array of strings for multi-level hierarchical grouping.
     *
     * @example
     * // Single level (backward compatible)
     * { title: "Name", group: "Personal" }
     *
     * // Multi-level grouping
     * { title: "Name", group: ["Region", "Country", "Personal"] }
     * // Level 0 (topmost): "Region"
     * // Level 1: "Country"
     * // Level 2 (closest to column header): "Personal"
     */
    readonly group?: string | readonly string[];
}
```

#### Item 타입 row 값 규칙
```typescript
/**
 * - `-1`: Column Header
 * - `-2`: Group header level 0 (topmost, closest to top of screen)
 * - `-3`: Group header level 1
 * - `-(n+2)`: Group header level n
 * - `0 and higher`: Row index
 */
export type Item = readonly [col: number, row: number];
```

---

## 핵심 헬퍼 함수

### 파일: `packages/core/src/internal/data-grid/render/data-grid-lib.ts`

#### getGroupName()
그룹 값을 문자열로 정규화합니다. 하위 호환성을 위해 필수적입니다.
```typescript
export function getGroupName(
    group: string | readonly string[] | undefined,
    level?: number
): string {
    if (group === undefined) return "";
    if (typeof group === "string") return group;
    if (level !== undefined && level >= 0 && level < group.length) {
        return group[level];
    }
    return group.length > 0 ? group[group.length - 1] : "";
}
```

#### getGroupAtLevel()
특정 레벨의 그룹 이름을 반환합니다.
```typescript
export function getGroupAtLevel(
    group: string | readonly string[] | undefined,
    level: number,
    totalLevels: number
): string | undefined {
    if (group === undefined) return undefined;
    if (typeof group === "string") {
        // 단일 문자열은 가장 하위 레벨에만 표시
        return level === totalLevels - 1 ? group : undefined;
    }
    return level < group.length ? group[level] : undefined;
}
```

#### isGroupEqual()
두 그룹 값이 같은지 비교합니다 (마지막 레벨만).
```typescript
export function isGroupEqual(
    left: string | readonly string[] | undefined,
    right: string | readonly string[] | undefined
): boolean {
    const leftStr = getGroupName(left);
    const rightStr = getGroupName(right);
    return leftStr === rightStr;
}
```

#### isGroupEqualAtLevel() - 중요!
특정 레벨까지 같은 그룹인지 비교합니다. 그룹 헤더 클릭 시 컬럼 선택에 필수.
```typescript
export function isGroupEqualAtLevel(
    left: string | readonly string[] | undefined,
    right: string | readonly string[] | undefined,
    level: number,
    totalLevels: number
): boolean {
    // Check all levels from 0 to the current level
    for (let l = 0; l <= level; l++) {
        const leftStr = getGroupAtLevel(left, l, totalLevels) ?? "";
        const rightStr = getGroupAtLevel(right, l, totalLevels) ?? "";
        if (leftStr !== rightStr) {
            return false;
        }
    }
    return true;
}
```

---

## Props 체인

다중 레벨 헤더를 위해 추가된 props가 컴포넌트 체인을 통해 전달됩니다:

```
DataEditor
    ↓ groupLevels, groupHeaderHeights
DataGridSearch
    ↓
ScrollingDataGrid
    ↓
DataGridDnd
    ↓
DataGrid (캔버스 렌더링)
```

### 추가된 Props

| Prop | 타입 | 설명 |
|------|------|------|
| `groupLevels` | `number` | 그룹 헤더 레벨 수 (0 = 그룹 없음) |
| `groupHeaderHeights` | `readonly number[]` | 각 레벨별 헤더 높이 배열 |

### DataEditor에서의 계산 로직

```typescript
// packages/core/src/data-editor/data-editor.tsx

const groupLevels = React.useMemo(() => {
    let maxLevel = 0;
    for (const col of columns) {
        if (col.group === undefined) continue;
        if (typeof col.group === "string") {
            maxLevel = Math.max(maxLevel, 1);
        } else {
            maxLevel = Math.max(maxLevel, col.group.length);
        }
    }
    return maxLevel;
}, [columns]);

const enableGroups = groupLevels > 0;

const groupHeaderHeights = React.useMemo(() => {
    if (groupLevels === 0) return [];
    return Array(groupLevels).fill(groupHeaderHeight) as number[];
}, [groupLevels, groupHeaderHeight]);

const totalGroupHeaderHeight = groupHeaderHeights.reduce((a, b) => a + b, 0);
const totalHeaderHeight = headerHeight + totalGroupHeaderHeight;
```

---

## 수정된 파일 목록 (전체)

### 타입 정의
| 파일 | 변경 내용 |
|------|----------|
| `data-grid-types.ts` | `group` 타입 확장, `GroupPath` 타입 추가 |

### 컴포넌트 Props 체인
| 파일 | 변경 내용 |
|------|----------|
| `data-editor.tsx` | `groupLevels` 계산, props 전달, `handleGroupHeaderSelection` 수정 |
| `data-grid-search.tsx` | props 전달 |
| `scrolling-data-grid.tsx` | props 전달 |
| `data-grid-dnd.tsx` | props 전달 |
| `data-grid.tsx` | `DataGridProps` 인터페이스 확장, `overlayStyle` 수정 |

### 렌더링 로직
| 파일 | 변경 내용 |
|------|----------|
| `data-grid-lib.ts` | 헬퍼 함수 추가 (`getGroupName`, `getGroupAtLevel`, `isGroupEqual`, `isGroupEqualAtLevel`), `getRowIndexForY`, `computeBounds` 수정 |
| `data-grid-render.walk.ts` | `walkMultiLevelGroups()` 함수 추가 |
| `data-grid-render.header.ts` | `drawMultiLevelGroups()` 함수 추가, `drawGridHeaders` 수정 |
| `data-grid-render.ts` | `clipHeaderDamage`, `drawHeaderTexture`, `drawHighlightRings` 호출 수정 |
| `data-grid.render.rings.ts` | `totalGroupHeaderHeight` 파라미터 추가 |

### Storybook 예제
| 파일 | 내용 |
|------|------|
| `packages/core/src/docs/08-multi-level-header.stories.tsx` | 다중 레벨 헤더 예제 |

---

## 해결된 버그들

### 1. 데이터 셀 클릭 시 그룹 헤더에 파란색 border 표시

**증상**: 데이터 영역의 셀을 클릭하면 그룹 헤더 영역에도 파란색 선택 border가 나타남

**원인**: `clipHeaderDamage`와 `drawHighlightRings`에서 `groupHeaderHeight` (단일 레벨 높이) 대신 `totalGroupHeaderHeight` (전체 그룹 헤더 높이)를 사용해야 함

**해결 파일**:
- `data-grid-render.ts`: `clipHeaderDamage` 함수 수정
- `data-grid.render.rings.ts`: `drawHighlightRings` 파라미터 수정

**수정 내용**:
```typescript
// data-grid-render.ts - clipHeaderDamage 함수
function clipHeaderDamage(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    width: number,
    totalGroupHeaderHeight: number,  // groupHeaderHeight → totalGroupHeaderHeight
    totalHeaderHeight: number,
    ...
) {
    // Column header 영역만 클립 (그룹 헤더 제외)
    ctx.rect(finalX, totalGroupHeaderHeight, finalWidth, totalHeaderHeight - totalGroupHeaderHeight);
}
```

### 2. 스크롤 시 그룹 헤더에 그라디언트 나타남

**증상**: 스크롤을 하단으로 이동하면 Level 2 그룹 헤더 영역에 그라디언트/투명도 문제 발생

**원인**: overlay canvas (헤더 캔버스)가 메인 캔버스 위에 제대로 위치하지 않아 메인 캔버스 내용이 비침

**해결 파일**:
- `data-grid.tsx`: `overlayStyle` 수정
- `data-grid-render.ts`: `drawHeaderTexture` 수정

**수정 내용**:
```typescript
// data-grid.tsx - overlayStyle
const overlayStyle = React.useMemo<React.CSSProperties>(
    () => ({
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,           // 추가: 메인 캔버스 위에 위치
        pointerEvents: "none", // 추가
    }),
    []
);

// data-grid-render.ts - drawHeaderTexture
const drawHeaderTexture = () => {
    // 투명하게 지우지 않고 불투명 배경으로 채움
    overlayCtx.fillStyle = theme.bgHeader;
    overlayCtx.fillRect(0, 0, width, totalHeaderHeight + 1);
    // ...
};
```

### 3. 그룹 헤더 클릭 시 잘못된 컬럼 선택

**증상**: "Geography" (Level 1) 클릭 시 Region, Country, City 3개가 아닌 Region, Country 2개만 선택됨

**원인**: `handleGroupHeaderSelection`에서 `isGroupEqual` (마지막 레벨만 비교) 대신 `isGroupEqualAtLevel` (해당 레벨까지 비교)을 사용해야 함

**해결 파일**: `data-editor.tsx`

**수정 내용**:
```typescript
const handleGroupHeaderSelection = React.useCallback(
    (args: GridMouseEventArgs) => {
        // ...
        const [col, row] = args.location;

        // 클릭한 레벨 계산: row -2 = level 0, row -3 = level 1, ...
        const clickedLevel = row <= -2 ? -(row + 2) : 0;
        const totalLevels = Array.isArray(needle.group) ? needle.group.length : 1;

        // 레벨 기반 그룹 비교 함수
        const compareGroups = (g1, g2) => {
            if (totalLevels > 1) {
                return isGroupEqualAtLevel(g1, g2, clickedLevel, totalLevels);
            }
            return isGroupEqual(g1, g2);
        };

        // 그룹 범위 계산에 compareGroups 사용
        for (let i = col - 1; i >= rowMarkerOffset; i--) {
            if (!compareGroups(needle.group, mangledCols[i].group)) break;
            start--;
        }
        // ...
    },
    [/* dependencies */]
);
```

---

## 주요 렌더링 함수

### walkMultiLevelGroups()
**파일**: `data-grid-render.walk.ts`

각 레벨의 그룹을 순회하며 콜백을 호출합니다.
```typescript
export function walkMultiLevelGroups(
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeights: readonly number[],
    groupLevels: number,
    cb: WalkMultiLevelGroupsCallback
): void
```

### drawMultiLevelGroups()
**파일**: `data-grid-render.header.ts`

멀티 레벨 그룹 헤더를 캔버스에 그립니다.
```typescript
export function drawMultiLevelGroups(
    ctx: CanvasRenderingContext2D,
    effectiveCols: readonly MappedGridColumn[],
    width: number,
    translateX: number,
    groupHeaderHeights: readonly number[],
    groupLevels: number,
    hovered: HoverInfo | undefined,
    theme: FullTheme,
    spriteManager: SpriteManager,
    hoverValues: HoverValues,
    verticalBorder: (col: number) => boolean,
    getGroupDetails: GroupDetailsCallback,
    damage: CellSet | undefined
): void
```

---

## 하위 호환성

1. **group 속성**: `string` 타입 그대로 사용 가능 (기존 코드 변경 불필요)
2. **groupHeaderHeight prop**: 단일 값 제공 시 모든 레벨에 동일 적용
3. **기존 API**: 모든 기존 API가 그대로 동작

---

## 사용 예시

### 단일 레벨 (기존 방식)
```typescript
const columns: GridColumn[] = [
    { title: "Name", group: "Personal" },
    { title: "Email", group: "Contact" },
];
```

### 다중 레벨 (새로운 방식)
```typescript
const columns: GridColumn[] = [
    { title: "Region", group: ["Location", "Geography", "Area"] },
    { title: "Country", group: ["Location", "Geography", "Area"] },
    { title: "City", group: ["Location", "Geography", "Place"] },
    { title: "Product", group: ["Product Info", "Details", "Item"] },
    { title: "Category", group: ["Product Info", "Details", "Item"] },
    { title: "Sales", group: ["Financial", "Metrics", "Revenue"] },
    { title: "Profit", group: ["Financial", "Metrics", "Revenue"] },
    { title: "Quantity", group: ["Financial", "Metrics", "Volume"] },
];
```

### 예상 헤더 구조
```
┌────────────────────────────────┬────────────────────────┬──────────────────────────────┐
│          Location              │     Product Info       │          Financial           │  ← Level 0
├────────────────────────────────┼────────────────────────┼──────────────────────────────┤
│          Geography             │        Details         │           Metrics            │  ← Level 1
├───────────────────────┬────────┼────────────────────────┼─────────────────┬────────────┤
│          Area         │ Place  │          Item          │     Revenue     │   Volume   │  ← Level 2
├─────────┬─────────────┼────────┼───────────┬────────────┼────────┬────────┼────────────┤
│ Region  │   Country   │  City  │  Product  │  Category  │ Sales  │ Profit │  Quantity  │  ← Column Headers
└─────────┴─────────────┴────────┴───────────┴────────────┴────────┴────────┴────────────┘
```

---

## 디버깅 팁

### 1. 그룹 헤더 레벨 확인
```typescript
// 클릭한 row 값으로 레벨 계산
const level = row <= -2 ? -(row + 2) : -1;
// row -2 → level 0
// row -3 → level 1
// row -4 → level 2
```

### 2. 캔버스 렌더링 문제
- overlay canvas의 z-index 확인
- `drawHeaderTexture()`에서 배경이 불투명하게 채워지는지 확인
- `totalGroupHeaderHeight` vs `groupHeaderHeight` 혼동 주의

### 3. 컬럼 선택 문제
- `isGroupEqual` vs `isGroupEqualAtLevel` 사용 구분
- 클릭한 레벨에 맞는 비교 함수 사용

---

## 관련 문서

- [04-rendering.md](./04-rendering.md) - 렌더링 파이프라인
- [01-types.md](./01-types.md) - 타입 정의
- [02-data-editor.md](./02-data-editor.md) - DataEditor Props

---

## 기본 헤더 시스템 배경

현재 아키텍처는 최대 2단계 헤더(그룹 헤더 + 컬럼 헤더) 설계. 다중 레벨 헤더는 이 기본 구조를 확장한 것.

### 높이 계산 흐름 (data-editor.tsx)
- `enableGroups`: columns 중 `group` 속성이 하나라도 있으면 `true`
- `totalHeaderHeight`: `enableGroups ? headerHeight + groupHeaderHeight : headerHeight`

### 렌더링 순서 (data-grid-render.header.ts → drawGridHeaders)
1. 전체 헤더 영역 배경 채우기
2. 컬럼 헤더 그리기 (y = `groupHeaderHeight`부터, height = `headerHeight`)
3. 그룹 헤더 그리기 (y = 0, height = `groupHeaderHeight`, `enableGroups`일 때만)

### 그룹화 메커니즘
- `GridColumn.group?: string` 속성으로 그룹 지정
- `walkGroups`: 동일 `group` 이름의 연속 컬럼을 하나의 그룹으로 묶음
- 단일 레벨 그룹핑만 기본 지원, 중첩 그룹은 다중 레벨 헤더 확장 필요
