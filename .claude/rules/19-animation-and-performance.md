---
paths:
  - "packages/core/src/internal/data-grid/animation-manager.ts"
  - "packages/core/src/internal/data-grid/render/data-grid-render.blit.ts"
  - "packages/core/src/internal/data-grid/render/data-grid.render.rings.ts"
---

# 애니메이션 및 렌더링 성능 최적화 분석

## 개요

이 문서는 glide-data-grid의 애니메이션 시스템과 렌더링 성능 최적화를 담당하는 핵심 파일들을 분석한다.

| 파일 | 역할 | LOC |
|------|------|-----|
| `animation-manager.ts` | 셀 호버 애니메이션 관리 (fade-in/out) | ~119 |
| `data-grid-render.blit.ts` | 이전 프레임 재사용(blit) 및 스크롤 최적화 | ~292 |
| `data-grid.render.rings.ts` | 선택 영역 하이라이트 링, fill handle, 컬럼 리사이즈 아웃라인 | ~355 |
| `use-animation-queue.ts` | 셀 단위 비동기 렌더링 큐 (이미지 로딩 등) | ~42 |

## AnimationManager 분석

### 역할
셀 위에 마우스가 올라갔을 때(hover) 부드러운 fade-in/fade-out 애니메이션을 구현한다. `requestAnimationFrame`을 사용하여 프레임 단위로 hoverAmount 값을 보간하고, 변경된 셀만 다시 그리도록 damage 영역을 설정한다.

### 핵심 타입 (animation-manager.ts:5-7)

```typescript
type StateItem = { item: Item; hoverAmount: number };  // 셀 좌표 + 호버 진행도(0~1)
export type HoverValues = readonly Readonly<StateItem>[];  // 현재 애니메이션 중인 셀 목록
export type StepCallback = (values: HoverValues) => void;  // 매 프레임 호출되는 콜백
```

### 상수 및 이징 함수

- `hoverTime = 80` (라인 9): 애니메이션 지속 시간(ms). 80ms로 매우 빠른 반응성 제공.
- `easeOutCubic` (라인 11-14): `(x-1)^3 + 1` - 감속 곡선. leaving 상태의 셀에만 적용되며, 시작이 빠르고 끝이 부드럽게 감속.

### 클래스 구조 (AnimationManager, 라인 16-118)

**상태 필드:**
- `currentHoveredItem` - 현재 호버 중인 셀 (최대 1개)
- `leavingItems` - 호버를 떠나 fade-out 중인 셀 목록 (여러 개 가능)
- `lastAnimationTime` - 마지막 애니메이션 타임스탬프 (`undefined`이면 애니메이션 미실행)

**핵심 메서드:**

| 메서드 | 라인 | 역할 |
|--------|------|------|
| `setHovered(item)` | 96-118 | 공개 API. 호버 셀 변경 시 호출. 기존 셀은 leavingItems로 이동, 새 셀은 currentHoveredItem으로 설정 |
| `step(timestamp)` | 67-94 | rAF 콜백. delta 시간 기반으로 hoverAmount 갱신 후 callback 호출 |
| `addToLeavingItems(item)` | 24-32 | 중복 방지하며 leaving 목록에 추가 |
| `removeFromLeavingItems(item)` | 37-43 | leaving에서 제거하고 잔여 hoverAmount 반환 (재진입 시 이어서 fade-in) |
| `shouldStep()` | 49-55 | 애니메이션 지속 필요 여부 판단 |
| `getAnimatingItems()` | 57-65 | 현재 애니메이션 중인 모든 셀 반환 |

### 애니메이션 흐름

```
setHovered(새 셀)
  ├── 기존 hoveredItem → leavingItems에 추가 (fade-out 시작)
  ├── 새 셀 → currentHoveredItem으로 설정 (fade-in 시작)
  │   └── leavingItems에 있었다면 잔여 hoverAmount로 이어서 시작
  └── lastAnimationTime === undefined이면 rAF 시작
          │
          ▼
      step(timestamp)
        ├── delta = (timestamp - lastAnimationTime) / hoverTime
        ├── leavingItems: hoverAmount -= delta (0으로 감소)
        ├── currentHoveredItem: hoverAmount += delta (1로 증가)
        ├── callback(animatingItems) → damage + redraw
        ├── cleanUpLeavingElements() (hoverAmount <= 0인 것 제거)
        └── shouldStep()이면 다음 rAF 예약, 아니면 종료
```

### data-grid.tsx와의 연결 (data-grid.tsx:1288-1309)

```typescript
// 콜백: 애니메이션 프레임마다 변경된 셀을 damage로 등록하고 다시 그린다
const onAnimationFrame = useCallback<StepCallback>(values => {
    damageRegion.current = new CellSet(values.map(x => x.item));
    hoverValues.current = values;
    lastDrawRef.current();  // drawGrid() 재호출
    damageRegion.current = undefined;
}, []);

// hoveredItem 변경 시 AnimationManager에 전달
// needsHover가 true인 셀만 애니메이션 적용
useLayoutEffect(() => {
    const cellNeedsHover = r?.needsHover !== undefined && ...;
    am.setHovered(cellNeedsHover ? hoveredItem : undefined);
}, [hoveredItem, getCellContent, getCellRenderer]);
```

## use-animation-queue.ts 분석

### 역할
이미지 로딩 완료 등 비동기 셀 업데이트를 위한 큐 시스템. 여러 셀의 업데이트 요청을 모아서 한 프레임에 일괄 처리한다.

### 핵심 함수: `useAnimationQueue` (라인 8-41)

```typescript
export function useAnimationQueue(draw: (items: CellSet) => void): EnqueueCallback
```

**동작 방식:**
1. `enqueue(item)` 호출 시 큐에 셀 좌표를 packed number로 추가
2. 큐가 비어있었으면 `requestAnimationFrame`으로 처리 예약
3. rAF 콜백에서 큐의 모든 셀을 `CellSet`으로 변환하여 `draw()` 호출
4. 처리 중 새 항목이 추가되면 `seq` 카운터 증가 후 다음 프레임 예약
5. `seq > 600`이면 이중 rAF (`requeue`)로 한 프레임 쉬어 과부하 방지

**사용처:** `data-grid.tsx:962`에서 `damageInternal`을 감싸 이미지 로더 콜백에 활용.

## Blit 알고리즘 상세

### 개념
Blit(Block Image Transfer)는 이전 프레임의 캔버스 내용을 재사용하여 스크롤 시 전체 다시 그리기를 피하는 최적화 기법이다. 변경된 영역(새로 나타난 행/열)만 다시 그린다.

### computeCanBlit (라인 233-291)

```typescript
export function computeCanBlit(current: DrawGridArg, last: DrawGridArg | undefined): boolean | number
```

**반환값:**
- `false` - blit 불가, 전체 다시 그리기 필요
- `true` - blit 가능, 스크롤 오프셋만 변경됨
- `number` - 단일 컬럼 리사이즈됨 (해당 컬럼 인덱스 반환)

**blit 불가 조건 (라인 234-256):**
- `last`가 `undefined` (첫 렌더링)
- 캔버스 크기(`width`/`height`) 변경
- `theme` 변경
- `headerHeight`, `rowHeight` 변경
- `rows` 수 변경
- `freezeColumns` 변경
- `selection` 변경
- `getCellContent` 참조 변경
- `highlightRegions` 변경
- `dragAndDropState` 변경
- `prelightCells` 변경
- `isFocused`, `isResizing`, `touchMode`, `maxScaleFactor` 변경

**컬럼 변경 감지 (라인 257-289):**
- `mappedColumns` 참조가 다르면 개별 비교 수행
- 100개 초과 컬럼이면 비교 포기 → `false`
- 정확히 하나의 컬럼만 width가 변경되었으면 → 해당 인덱스 반환
- 2개 이상 변경 또는 width 외 속성 변경 → `false`

### blitLastFrame (라인 21-191)

```typescript
export function blitLastFrame(
    ctx, blitSource, blitSourceScroll, targetScroll,
    last, cellXOffset, cellYOffset, translateX, translateY,
    freezeTrailingRows, width, height, rows, totalHeaderHeight,
    dpr, mappedColumns, effectiveCols, getRowHeight, doubleBuffer
): { regions: Rectangle[] }
```

**핵심 로직:**

1. **deltaY 계산 (라인 47-60):** 이전/현재 `cellYOffset` 차이를 행 높이 합으로 변환
2. **deltaX 계산 (라인 62-71):** 이전/현재 `cellXOffset` 차이를 컬럼 너비 합으로 변환
3. **대각 스크롤 차단 (라인 75-79):** `deltaX !== 0 && deltaY !== 0`이면 blit 불가 (빈 regions 반환)
4. **최소 크기 검증 (라인 87):** `blitWidth > 150 && blitHeight > 150`이어야 blit 수행
5. **영역 복사 (라인 88-184):**
   - sticky 컬럼 영역(`stickyWidth`)과 freeze trailing rows 영역은 blit 영역에서 제외
   - Y 스크롤: 위/아래 방향에 따라 source/dest Y 오프셋 조정
   - X 스크롤: 좌/우 방향에 따라 source/dest X 오프셋 조정
   - DPR 적용: 모든 좌표에 `dpr` 곱셈
   - 더블 버퍼링 시 freeze 영역 동기화 (라인 158-182)
6. **drawRegions 반환:** 새로 그려야 할 직사각형 영역 목록

**스크롤 방향별 drawRegion:**

```
[위로 스크롤 (deltaY > 0)]       [아래로 스크롤 (deltaY < 0)]
┌─────────────────────┐          ┌─────────────────────┐
│ header              │          │ header              │
├─────────────────────┤          ├─────────────────────┤
│ ██새로 그릴 영역██  │          │                     │
│                     │          │  blit된 영역        │
│  blit된 영역        │          │                     │
│                     │          ├─────────────────────┤
│                     │          │ ██새로 그릴 영역██  │
└─────────────────────┘          └─────────────────────┘
```

### blitResizedCol (라인 193-231)

단일 컬럼 리사이즈 시 해당 컬럼 오른쪽 영역만 다시 그리도록 drawRegion을 계산한다. 스크롤 오프셋이 변경되었으면 빈 배열을 반환하여 전체 다시 그리기로 폴백.

## Ring 렌더링

### drawHighlightRings (라인 11-160)

선택 영역, 검색 결과 등의 하이라이트 테두리를 그린다.

**매개변수 주요 항목:**
- `allHighlightRegions: readonly Highlight[]` - 하이라이트 영역 목록 (색상, 범위, 스타일)
- 스타일: `"dashed"` (점선), `"solid"` (실선), `"solid-outline"` (배경 블렌딩된 실선), `"no-outline"` (테두리 없음)

**렌더링 흐름:**

1. `"no-outline"` 스타일 필터링 (라인 31)
2. freeze 컬럼/행 경계에서 영역 분할: `splitRectIntoRegions()` (라인 44)
3. 각 분할 영역의 화면 좌표 계산: `computeBounds()` (라인 46-86)
4. 화면 바깥으로 나가는 영역 잘라내기: `hugRectToTarget()` (라인 98-108)
5. 클로저 `drawCb` 반환 (라인 113-156):
   - `intersectRect`로 화면 내 영역만 그리기
   - 필요 시 `clip()`으로 freeze 영역 경계 처리
   - 스타일에 따라 `setLineDash` 전환
   - `strokeRect`으로 테두리 그리기
6. `drawCb`를 즉시 실행하고, 나중에 재실행할 수 있도록 반환 (라인 158-159)

**반환값이 함수인 이유:** blit 후 셀 렌더링이 링 위에 덮어쓸 수 있으므로, 셀 렌더링 후 `highlightRedraw?.()`로 다시 그린다 (data-grid-render.ts:729).

### drawFillHandle (라인 181-354)

선택 영역 우하단에 표시되는 채우기 핸들(fill handle)을 그린다. Excel/Google Sheets의 자동 채우기 기능과 유사.

**핵심 로직:**
- 선택 영역의 우하단 셀 좌표 계산 (라인 209)
- `walkColumns` + `walkRowsInCol`로 해당 셀의 화면 좌표 탐색 (라인 230-336)
- span(셀 병합) 처리: `getSpanBounds`로 정확한 셀 경계 계산 (라인 266)
- 핸들 모양: `fill.shape`에 따라 원(`"circle"`) 또는 사각형(`"square"`) (라인 295-299)
- 아웃라인: `fill.outline > 0`이면 배경색(`bgCell`) 테두리 추가 (라인 306-327)
- sticky row 영역 클리핑 처리 (라인 341-344)

**FillHandle 설정 (DEFAULT_FILL_HANDLE):**
- `size`: 핸들 크기 (px)
- `offsetX`, `offsetY`: 셀 모서리로부터의 오프셋
- `shape`: `"circle"` | `"square"`
- `outline`: 아웃라인 두께

### drawColumnResizeOutline (라인 162-179)

컬럼 리사이즈 중 표시되는 수직 가이드 라인. `lineWidth: 2`로 그리며, 오버레이 캔버스(헤더)와 메인 캔버스(본문) 양쪽에 그려질 수 있다.

## 핵심 인터페이스/타입

### BlitData (data-grid-render.blit.ts:9-19)
```typescript
export interface BlitData {
    readonly cellXOffset: number;        // 이전 프레임의 X 셀 오프셋
    readonly cellYOffset: number;        // 이전 프레임의 Y 셀 오프셋
    readonly translateX: number;         // 이전 프레임의 X 서브픽셀 오프셋
    readonly translateY: number;         // 이전 프레임의 Y 서브픽셀 오프셋
    readonly mustDrawFocusOnHeader: boolean;
    readonly mustDrawHighlightRingsOnHeader: boolean;
    readonly lastBuffer: "a" | "b" | undefined;   // 더블 버퍼링 시 마지막 사용 버퍼
    aBufferScroll: [boolean, boolean] | undefined; // [X스크롤여부, Y스크롤여부]
    bBufferScroll: [boolean, boolean] | undefined;
}
```

### Highlight (data-grid-render.cells.ts에서 정의)
```typescript
interface Highlight {
    readonly color: string;
    readonly range: Rectangle;  // {x, y, width, height} 셀 좌표 기준
    readonly style?: "dashed" | "solid" | "solid-outline" | "no-outline";
}
```

### CellSet (cell-set.ts)
damage 영역을 효율적으로 관리하는 Set 기반 자료구조. 셀 좌표 `[col, row]`를 단일 number로 pack하여 O(1) 조회.

## 핵심 함수 요약

| 함수 | 파일:라인 | 역할 |
|------|-----------|------|
| `AnimationManager.setHovered` | animation-manager.ts:96 | 호버 셀 변경 진입점 |
| `AnimationManager.step` | animation-manager.ts:67 | rAF 기반 프레임 업데이트 |
| `easeOutCubic` | animation-manager.ts:11 | 감속 이징 함수 |
| `useAnimationQueue` | use-animation-queue.ts:8 | 비동기 셀 업데이트 큐 |
| `computeCanBlit` | blit.ts:233 | blit 가능 여부 판단 |
| `blitLastFrame` | blit.ts:21 | 이전 프레임 복사 및 drawRegion 계산 |
| `blitResizedCol` | blit.ts:193 | 컬럼 리사이즈 시 부분 다시 그리기 |
| `drawHighlightRings` | rings.ts:11 | 선택/하이라이트 테두리 렌더링 |
| `drawFillHandle` | rings.ts:181 | 채우기 핸들 렌더링 |
| `drawColumnResizeOutline` | rings.ts:162 | 컬럼 리사이즈 가이드 라인 |

## 메인 렌더 파이프라인과의 통합

`drawGrid()` (data-grid-render.ts:105) 내에서의 호출 순서:

```
drawGrid(arg, lastArg)
│
├── [1] computeCanBlit(arg, lastArg) → canBlit
│
├── [2] damage !== undefined일 때 (셀 단위 업데이트)
│   ├── drawCells() - 변경된 셀만 그리기
│   ├── drawFillHandle() - fill handle이 damage에 포함되면 다시 그리기
│   └── return (blit/전체 렌더 건너뜀)
│
├── [3] drawHeaderTexture() - 헤더 렌더링
│   ├── drawGridHeaders()
│   ├── drawGridLines() (헤더 영역)
│   ├── drawHighlightRings() (헤더에 걸치는 경우)
│   └── drawFillHandle() (헤더에 걸치는 경우)
│
├── [4] canBlit === true → blitLastFrame() → drawRegions
│   canBlit === number → blitResizedCol() → drawRegions
│   canBlit === false → drawRegions = [] (전체 그리기)
│
├── [5] drawHighlightRings() → highlightRedraw 클로저 획득
├── [6] drawFillHandle() → focusRedraw 클로저 획득
│
├── [7] drawRegions으로 clip 설정 후 bgCell로 채우기
├── [8] drawCells() - 셀 내용 렌더링
├── [9] drawBlanks() - 빈 영역 렌더링
├── [10] drawExtraRowThemes() - 행별 테마 오버라이드
├── [11] drawGridLines() - 그리드 라인
│
├── [12] highlightRedraw?.() - 링 재렌더링 ← 셀 위에 다시 그림
├── [13] focusRedraw?.() - fill handle 재렌더링
│
├── [14] 컬럼 리사이즈 아웃라인 (isResizing일 때)
│   └── drawColumnResizeOutline()
│
├── [15] 더블 버퍼링 시 target → main 캔버스 복사
└── [16] lastBlitData 업데이트
```

**핵심 포인트:** 하이라이트 링과 fill handle은 셀 렌더링 **전**에 한 번, **후**에 한 번 총 두 번 그려진다. 첫 번째는 blit된 영역에 대한 것이고, 두 번째(`highlightRedraw`, `focusRedraw`)는 새로 그려진 셀 위에 덮어쓰기 위한 것이다.

## 성능 패턴 및 최적화 기법

### 1. Damage Region 패턴
변경된 셀만 다시 그리는 핵심 최적화. `CellSet`에 변경 셀 좌표를 등록하면 `drawCells()`가 해당 셀만 렌더링한다. 호버 애니메이션, 이미지 로딩 완료 시 활용.

### 2. 더블 버퍼링 (Double Buffering)
`renderStrategy: "double-buffer"` 시 bufferA/bufferB 두 개의 오프스크린 캔버스를 번갈아 사용. blit 시 이전 버퍼에서 현재 버퍼로 복사하여 화면 깜빡임 방지.

### 3. 이징 함수의 선택적 적용
`easeOutCubic`은 leaving 상태(fade-out)에만 적용. 현재 호버 중인 셀은 선형 보간으로 즉각적인 반응성 제공.

### 4. rAF 스로틀링 (use-animation-queue.ts)
`seq > 600`이면 이중 `requestAnimationFrame`으로 한 프레임 건너뛰기. 대량 이미지 로딩 시 메인 스레드 과부하 방지.

### 5. Packed Number 기반 셀 조회
`CellSet`은 `[col, row]` 튜플을 단일 number로 pack하여 `Set<number>`로 관리. 배열 비교 대비 O(1) 조회 성능.

### 6. 클로저 기반 지연 실행
`drawHighlightRings`와 `drawFillHandle`은 계산 결과를 클로저에 캡처하여 반환. 이후 재실행 시 좌표 계산을 반복하지 않는다.

### 7. 대각 스크롤 폴백
X, Y 동시 스크롤(대각선)시 blit 불가로 판단하여 전체 다시 그리기. 두 방향 동시 blit의 복잡성을 피한다.

### 8. 최소 blit 크기 검증
`blitWidth > 150 && blitHeight > 150` 조건으로 blit할 영역이 너무 작으면 전체 다시 그리기. `drawImage()` 호출 오버헤드 대비 이득이 없을 때 방지.

## 수정 시 주의사항

1. **DPR 처리 필수**: blit 좌표 계산 시 모든 값에 `dpr`을 곱해야 한다. `blitLastFrame`의 `args.sx/sy/sw/sh/dx/dy/dw/dh` 참조.

2. **imageSmoothingEnabled**: blit 시 `false`로 설정하여 픽셀 보간 방지 (라인 46). 완료 후 `true`로 복원 (라인 186).

3. **Ring 재렌더링 순서**: `drawHighlightRings`/`drawFillHandle`의 반환 클로저는 반드시 `drawCells()` 이후에 호출해야 한다. 순서가 바뀌면 셀 내용이 링 위에 덮어쓴다.

4. **computeCanBlit 조건 확장**: 새로운 DrawGridArg 속성을 추가하면 `computeCanBlit`에도 비교 조건을 추가해야 한다. 누락 시 변경이 반영되지 않는 렌더링 버그 발생.

5. **AnimationManager 메모리**: `leavingItems` 배열은 `cleanUpLeavingElements`로 정리되지만, 빠른 마우스 이동 시 일시적으로 커질 수 있다. 배열 복사(`getAnimatingItems`의 spread)가 매 프레임 발생하므로 주의.

6. **hoverTime 변경 영향**: 값을 늘리면 애니메이션이 부드러워지지만 damage 영역 업데이트가 길어져 성능에 영향. 80ms는 체감 지연 없이 시각적 부드러움을 제공하는 균형점.

7. **더블 버퍼링 freeze 영역 동기화**: blit 시 freeze 컬럼/trailing row가 두 버퍼 간 Y/X 오프셋이 다를 수 있다. `blitLastFrame`의 라인 158-182에서 별도 복사 처리. 이 로직 변경 시 freeze 영역 깨짐 주의.

8. **splitRectIntoRegions**: 하이라이트 링이 freeze 컬럼 경계를 걸칠 때 영역을 분할하여 별도 클리핑 적용. freeze 관련 수정 시 이 분할 로직도 함께 확인.

9. **useAnimationQueue의 seq 임계값**: `seq > 600`은 약 10초(60fps 기준)의 연속 큐 처리를 의미. 이미지가 매우 많은 그리드에서 이 값을 조정해야 할 수 있다.

10. **fill handle 좌표 계산**: `cellX + cellWidth + fill.offsetX`로 셀 우하단에 배치. span 셀의 경우 `getSpanBounds`로 실제 병합 영역 크기를 사용해야 정확한 위치에 표시된다.
