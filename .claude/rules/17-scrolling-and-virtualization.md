---
paths:
  - "packages/core/src/internal/scrolling-data-grid/**"
  - "packages/core/src/internal/data-grid-dnd/**"
---

# 17. 스크롤링 & 가상화 (Scrolling & Virtualization)

## 1. 개요

이 문서는 Glide Data Grid의 스크롤링, 가상화, 드래그 앤 드롭 컬럼/행 재배치를 담당하는 4개 파일을 분석한다.

| 파일 | LOC | 역할 |
|------|-----|------|
| `scrolling-data-grid.tsx` | 350 | 스크롤 오케스트레이터. 픽셀 스크롤 위치를 셀 좌표(visible region)로 변환 |
| `infinite-scroller.tsx` | 380 | DOM 스크롤 컨테이너 & 가상화. 브라우저 높이 제한(33.5M px) 초과 시 가상 스크롤 매핑 |
| `use-kinetic-scroll.ts` | 78 | Safari 모바일 관성 스크롤 성능 핵. touch 이벤트 기반 폴링 |
| `data-grid-dnd.tsx` | 449 | 컬럼/행 드래그 앤 드롭 재배치 및 컬럼 리사이즈 |

## 2. 컴포넌트 계층 구조

```
DataEditor (오케스트레이터)
  └── ScrollingDataGrid (GridScroller)      ← 픽셀→셀 좌표 변환
        └── InfiniteScroller                 ← DOM 스크롤 컨테이너 + 가상화
              ├── dvn-underlay (children)
              │     └── DataGridDnd          ← DnD + 리사이즈 래퍼
              │           └── DataGrid       ← 캔버스 렌더러
              └── dvn-scroller               ← 실제 스크롤 가능 영역
                    └── dvn-scroll-inner
                          ├── dvn-stack (padders)  ← 가상 높이 생성용 빈 div들
                          └── rightElement (선택)
```

**핵심**: `dvn-underlay`에 캔버스(DataGrid)가 `position: absolute`로 배치되고, `dvn-scroller`가 위에 겹쳐져 네이티브 스크롤바를 제공한다. 사용자는 `dvn-scroller`를 스크롤하고, 해당 스크롤 위치가 캔버스 렌더링에 반영된다.

## 3. 핵심 Props/인터페이스

### ScrollingDataGridProps (scrolling-data-grid.tsx:8-70)

```typescript
interface ScrollingDataGridProps extends Props {
  className: string | undefined;
  onVisibleRegionChanged: (range: Rectangle, clientWidth, clientHeight,
                           rightElWidth, tx, ty) => void;  // 셀 좌표 변경 콜백
  scrollRef: MutableRefObject<HTMLDivElement | null>;       // 외부 스크롤 제어용
  overscrollX: number;          // X축 추가 스크롤 여유 (컬럼 리사이즈 편의)
  overscrollY: number;          // Y축 추가 스크롤 여유
  initialSize: [width, height]; // 초기 크기 (레이아웃 전 깜빡임 방지)
  preventDiagonalScrolling: boolean;  // 대각선 스크롤 방지
  rightElement: ReactNode;      // 수평 스크롤 끝에 삽입할 DOM 노드
  rightElementProps: { sticky?, fill? };
  clientSize: [width, height, rightElSize];
  nonGrowWidth: number;         // grow 제외 실제 컬럼 너비 합
}
```

### InfiniteScroller Props (infinite-scroller.tsx:9-28)

```typescript
interface Props {
  scrollWidth: number;          // 전체 가상 콘텐츠 너비
  scrollHeight: number;         // 전체 가상 콘텐츠 높이
  clientHeight: number;         // 뷰포트 높이
  update: (region: Rectangle & { paddingRight: number }) => void;  // 스크롤 콜백
  kineticScrollPerfHack?: boolean;  // Safari 관성 스크롤 최적화
  preventDiagonalScrolling?: boolean;
  draggable: boolean;
  rightElement?: ReactNode;
  rightElementProps?: { sticky?, fill? };
  paddingRight?: number;
  paddingBottom?: number;
  scrollRef?: MutableRefObject<HTMLDivElement | null>;
  initialSize?: [width, height];
}
```

### DataGridDndProps (data-grid-dnd.tsx:13-79)

```typescript
interface DataGridDndProps extends Props {
  onRowMoved?: (startIndex, endIndex) => void;       // 행 이동 완료 콜백
  onColumnMoved?: (startIndex, endIndex) => void;     // 컬럼 이동 완료 콜백
  onColumnProposeMove?: (start, end) => boolean;      // 이동 허용 여부 판단
  onColumnResize?: (column, newSize, colIndex, newSizeWithGrow) => void;
  onColumnResizeStart?: (...) => void;
  onColumnResizeEnd?: (...) => void;
  gridRef?: MutableRefObject<DataGridRef | null>;
  maxColumnWidth: number;
  minColumnWidth: number;
  lockColumns: number;  // 드래그 불가 고정 컬럼 수
}
```

## 4. ScrollingDataGrid의 스크롤 체인

`GridScroller`는 InfiniteScroller가 보고하는 **픽셀 기반 스크롤 위치**를 **셀 좌표 기반 visible region**으로 변환하는 핵심 중간 계층이다.

### 변환 흐름

```
InfiniteScroller.onScroll
  → update({ x: scrollLeft, y: virtualY, width, height })
    → ScrollingDataGrid.onScrollUpdate (L242)
      → processArgs() (L121)
        → onVisibleRegionChanged(cellRect, clientWidth, clientHeight, rightElWidth, tx, ty)
          → DataEditor가 cellXOffset, cellYOffset 업데이트
```

### processArgs 함수 (L121-240) - 핵심 변환 로직

**X축 변환** (L125-157):
1. `stickyColWidth`: freezeColumns의 총 너비 계산
2. 각 컬럼을 순회하며 `scrollLeft`(= `args.x`)와 비교
3. `smoothScrollX` 여부에 따라 서브픽셀 오프셋 `tx` 계산
4. 결과: `cellX` (첫 보이는 셀), `cellRight` (마지막 보이는 셀), `tx` (서브픽셀 오프셋)

**Y축 변환** (L159-195):
1. `rowHeight`가 number인 경우: 단순 나눗셈 (`Math.floor`/`Math.ceil`)
2. `rowHeight`가 function인 경우: 행별로 순회하며 누적 높이 비교
3. `smoothScrollY` 여부에 따라 서브픽셀 오프셋 `ty` 계산
4. 결과: `cellY`, `cellBottom`, `ty`
5. **경계 검사** (L199-200): `cellY`와 `cellBottom`이 `rows` 범위를 초과하지 않도록 clamp

**변경 감지** (L211-239):
- 이전 값과 비교하여 실제로 변경된 경우에만 `onVisibleRegionChanged` 호출
- `last`, `lastX`, `lastY`, `lastSize` ref로 이전 상태 추적

### 콘텐츠 높이 계산 (L107-117)

```typescript
height = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
// rowHeight가 number이면 rows * rowHeight, function이면 각 행 합산
// overscrollY가 있으면 추가
```

## 5. InfiniteScroller의 가상화 메커니즘

### 브라우저 높이 제한 대응

**상수** (L74, L82):
- `BROWSER_MAX_DIV_HEIGHT = 33,554,400` — 브라우저 최대 div 높이
- `MAX_PADDER_SEGMENT_HEIGHT = 5,000,000` — 패더 세그먼트 최대 높이

**Padder 생성** (L313-324):
```typescript
const effectiveScrollHeight = Math.min(scrollHeight, BROWSER_MAX_DIV_HEIGHT);
// scrollWidth 설정용 div 1개 + 높이를 채우는 여러 div
while (h < effectiveScrollHeight) {
  const toAdd = Math.min(MAX_PADDER_SEGMENT_HEIGHT, effectiveScrollHeight - h);
  padders.push(<div style={{ width: 0, height: toAdd }} />);
  h += toAdd;
}
```

실제 콘텐츠 높이가 33.5M px를 초과하면 DOM 스크롤 영역은 33.5M px로 제한되고, 가상 스크롤 매핑이 활성화된다.

### 가상 스크롤 매핑 (onScroll L202-286)

두 가지 모드로 동작:

**1. 직접 매핑 (콘텐츠가 브라우저 제한 이내)** (L261-264):
```typescript
virtualY = newY;  // DOM scrollTop == 가상 위치
```

**2. 하이브리드 매핑 (콘텐츠가 브라우저 제한 초과)** (L246-260):

조건: `scrollHeight > el.scrollHeight + 5`

- **대점프 (스크롤바 드래그 등)**: `|delta| > 2000` 또는 양 끝단
  - 비율 기반: `scrollProgress = newY / scrollableHeight`
  - `virtualY = scrollProgress * virtualScrollableHeight`
- **소점프 (휠/터치 스크롤)**:
  - 델타 직접 적용: `virtualScrollY.current -= delta`
  - 1:1 픽셀 매핑으로 부드러운 스크롤 유지

**경계 클램핑** (L268-269):
```typescript
virtualY = Math.max(0, Math.min(virtualY, scrollHeight - cHeight));
```

### 대각선 스크롤 방지 (L215-225)

터치 디바이스에서 `preventDiagonalScrolling=true`일 때:
1. `dx`와 `dy` 동시 발생 시 (>3px) 방향 잠금
2. `ScrollLock` 타입: `[scrollLeft, undefined]` 또는 `[undefined, scrollTop]`
3. 잠금 방향의 반대축은 이전 위치로 고정
4. idle 상태 복귀 시 `useLayoutEffect`에서 스크롤 위치 보정 (L189-200)

### DPR 변경 감지 (L165-175)

브라우저 줌 변경 시 `devicePixelRatio`가 바뀌면:
- `virtualScrollY`, `lastScrollY` 초기화
- 현재 스크롤 위치로 재계산

### 리사이즈 감지 (L326-333)

`useResizeDetector`로 컨테이너 크기 변화 감지. 크기 변경 시 `setTimeout(() => onScroll(), 0)`으로 다음 틱에 스크롤 재계산.

### DOM 구조

```
div (ref=useResizeDetector)
  └── ScrollRegionStyle
        ├── div.dvn-underlay         ← children (DataGridDnd → DataGrid 캔버스)
        │     position: absolute, left:0, top:0
        └── div.dvn-scroller         ← 실제 스크롤 가능 영역 (overflow: auto/scroll)
              └── div.dvn-scroll-inner
                    ├── div.dvn-stack (padders)   ← 가상 높이 생성
                    ├── div.dvn-spacer (optional)  ← flex-grow: 1
                    └── rightElement wrapper (optional)
```

Safari에서는 `overflow: scroll` (항상 스크롤바 표시), 기타 브라우저는 `overflow: auto`.

## 6. useKineticScroll - 모바일 관성 스크롤 (use-kinetic-scroll.ts)

### 목적

Safari에서 관성 스크롤(momentum scrolling) 중 네이티브 `scroll` 이벤트가 불규칙하게 발생하는 문제를 해결한다. `experimental.kineticScrollPerfHack && browserIsSafari` 조건에서만 활성화된다.

### 동작 메커니즘

1. **touchstart** (L44-51): `isTouching = true`, 기존 폴링 타이머 취소
2. **touchend** (L53-59): 모든 터치 해제 시 `isTouching = false`, 120Hz 폴링 시작
3. **handleScroll** (L19-42): 120Hz(~8.3ms) 간격으로 `scrollLeft`/`scrollTop` 폴링
   - 위치가 변경되면 `callback(scrollLeft, scrollTop)` 호출
   - 위치가 10회 이상 동일하면 관성 스크롤 종료로 판단, 폴링 중지

### 핵심 세부사항

- `window.setTimeout` 사용 (requestAnimationFrame 아님) — 120Hz 주기 보장
- `sameCount` ref로 관성 스크롤 종료 감지 (10회 연속 동일 위치)
- `callbackRef` 패턴으로 콜백 참조 최신 상태 유지 (클로저 스테일 방지)

## 7. DataGridDnd - DnD 컬럼/행 재배치 (data-grid-dnd.tsx)

### 상태 관리

| 상태 | 용도 |
|------|------|
| `resizeCol`, `resizeColStartX` | 리사이즈 중인 컬럼 인덱스 및 시작 X좌표 |
| `dragCol`, `dropCol`, `dragColActive`, `dragStartX` | 컬럼 드래그 상태 |
| `dragRow`, `dropRow`, `dragRowActive`, `dragStartY` | 행 드래그 상태 |

### 컬럼 리사이즈 흐름

1. **시작** - `onMouseDownImpl` (L146): header의 edge 클릭 시 `resizeCol`/`resizeColStartX` 설정
2. **진행** - `onMouseMove` (L296): `(event.clientX - resizeColStartX) / scale`로 새 너비 계산
   - canvas의 `getBoundingClientRect().width / canvas.offsetWidth`로 HiDPI scale 보정
   - `offsetColumnSize` (L84)로 min/max 클램핑 및 `growOffset` 보정
   - 선택된 컬럼 그룹이면 모든 선택 컬럼에 동일 너비 적용
3. **완료** - `onMouseUpImpl` (L217): `onColumnResizeEnd` 호출, 상태 초기화

### 컬럼 드래그 앤 드롭 흐름

1. **시작** - `onMouseDownImpl` (L165-168): header 클릭 (edge 아닌 경우) + `onColumnMoved` 콜백 존재 시
2. **활성화** - `onMouseMove` (L299-303): 20px 이상 이동 시 `dragColActive = true`
3. **호버** - `onItemHoveredImpl` (L128-143): `dropCol` 업데이트, `lockColumns` 이하는 드롭 불가
4. **시각적 피드백** - `dragOffset` useMemo (L284-294): `{ src, dest }` 계산 → DataGrid에 `dragAndDropState`로 전달
5. **완료** - `onMouseUpImpl` (L255-257): `onColumnProposeMove` 확인 후 `onColumnMoved` 호출

### 행 드래그 앤 드롭 흐름

1. **시작** - `onMouseDownImpl` (L169-178): `lockColumns > 0`이고 col === 0인 셀 클릭 시
2. **활성화** - `onMouseMove` (L304-307): 20px 이상 이동 시 `dragRowActive = true`
3. **시각적 피드백** - `getMangledCellContent` (L344-360): 드래그 중 행 순서를 시각적으로 재매핑
4. **완료** - `onMouseUpImpl` (L258-260): `onRowMoved` 호출

### getMangledCellContent (L344-360)

행 드래그 중 셀 콘텐츠를 재매핑하여 드래그 행이 드롭 위치에 있는 것처럼 보이게 한다:
- `row === dropRow` → `dragRow`의 콘텐츠 반환
- `row > dropRow` → `row - 1` (한 칸 위로 당김)
- `row >= dragRow` → `row + 1` (한 칸 아래로 밀림)

### offsetColumnSize (L84-86)

```typescript
function offsetColumnSize(column, width, min, max): number {
  return clamp(Math.round(width - (column.growOffset ?? 0)), Math.ceil(min), Math.floor(max));
}
```

grow 모드에서 실제 지정 너비와 grow 추가 너비를 분리하여 min/max 클램핑 적용.

## 8. 핵심 함수 요약

| 파일 | 함수 | 라인 | 역할 |
|------|------|------|------|
| scrolling-data-grid.tsx | `processArgs` | L121-240 | 픽셀 → 셀 좌표 변환 핵심 로직 |
| scrolling-data-grid.tsx | `onScrollUpdate` | L242-248 | InfiniteScroller의 update 콜백 |
| infinite-scroller.tsx | `onScroll` | L202-286 | DOM 스크롤 → 가상 스크롤 매핑 |
| infinite-scroller.tsx | `useTouchUpDelayed` | L86-120 | 터치 상태 추적 (디바운스) |
| infinite-scroller.tsx | `setRefs` | L303-311 | 내부 scroller ref + 외부 scrollRef 동기화 |
| use-kinetic-scroll.ts | `handleScroll` | L19-42 | 120Hz 스크롤 위치 폴링 |
| use-kinetic-scroll.ts | `startTouch` | L44-51 | 터치 시작 시 폴링 중지 |
| use-kinetic-scroll.ts | `endTouch` | L53-59 | 터치 종료 시 폴링 시작 |
| data-grid-dnd.tsx | `onMouseDownImpl` | L146-183 | 리사이즈/드래그 시작 판별 |
| data-grid-dnd.tsx | `onMouseMove` | L296-342 | 드래그/리사이즈 진행 처리 |
| data-grid-dnd.tsx | `onMouseUpImpl` | L217-282 | 드래그/리사이즈 완료 처리 |
| data-grid-dnd.tsx | `getMangledCellContent` | L344-360 | 행 드래그 중 셀 콘텐츠 재매핑 |
| data-grid-dnd.tsx | `offsetColumnSize` | L84-86 | grow 보정 + min/max 클램핑 |

## 9. 데이터 흐름

### 스크롤 데이터 흐름

```
[사용자 스크롤]
  → DOM scroll event
    → InfiniteScroller.onScroll()
      ├── 대각선 스크롤 방지 (터치 시)
      ├── 가상 Y 매핑 (브라우저 제한 초과 시)
      └── update({ x, y, width, height, paddingRight })
          → ScrollingDataGrid.onScrollUpdate()
            → processArgs()
              ├── X축: 컬럼 순회 → cellX, cellRight, tx
              ├── Y축: 행 순회/계산 → cellY, cellBottom, ty
              └── onVisibleRegionChanged(rect, ...)
                  → DataEditor
                    ├── cellXOffset/cellYOffset 업데이트
                    └── translateX/translateY 설정
                        → DataGrid 캔버스 re-render
```

### 컬럼 리사이즈 데이터 흐름

```
[헤더 edge 마우스다운]
  → DataGridDnd.onMouseDownImpl → setResizeCol, setResizeColStartX
    → [마우스 이동]
      → onMouseMove → offsetColumnSize → onColumnResize(column, newSize, ...)
        → DataEditor → columns 업데이트 → re-render
    → [마우스 업]
      → onMouseUpImpl → onColumnResizeEnd → clearAll
```

## 10. 성능 최적화 기법

### 가상화
- **Padder 세그먼트 분할**: 하나의 거대한 div 대신 5M px 단위로 분할하여 브라우저 렌더링 성능 저하 방지
- **가상 스크롤 매핑**: 33.5M px DOM 제한 내에서 수십억 px 가상 콘텐츠 표현

### 변경 감지 최소화
- `processArgs`에서 이전 `Rectangle`, `tx`, `ty`, `size`를 ref로 캐시하여 실제 변경 시에만 `onVisibleRegionChanged` 호출 (L211-239)
- `lastProps` ref로 리사이즈 이벤트 중복 방지

### 스크롤 부드러움
- **smoothScrollX/Y**: 서브픽셀 오프셋 `tx`/`ty`를 통해 셀 경계에 스냅되지 않는 부드러운 스크롤
- **하이브리드 가상 매핑**: 소량 스크롤 시 1:1 델타 적용으로 부드러움 유지, 대점프 시 비율 기반 재계산

### 터치 최적화
- `useTouchUpDelayed`: 200ms 디바운스로 터치 종료 후 잠금 해제 지연
- `useKineticScroll`: Safari 관성 스크롤 중 120Hz 폴링으로 안정적 위치 추적
- 대각선 스크롤 방지로 의도치 않은 스크롤 방향 변경 차단

### 렌더링 최적화
- `dvn-scroll-inner`에 `pointer-events: none`으로 패더 영역의 불필요한 이벤트 처리 차단
- Safari에서 `overflow: scroll` 사용으로 스크롤바 표시/숨김 리플로우 방지
- `transform: translate3d(0, 0, 0)`으로 GPU 레이어 프로모션

## 11. 수정 시 주의사항

### InfiniteScroller 수정 시
- `BROWSER_MAX_DIV_HEIGHT`와 `MAX_PADDER_SEGMENT_HEIGHT` 상수는 브라우저 호환성에 직접 영향을 미침. 변경 전 Chrome, Safari, Firefox에서 테스트 필수
- `virtualScrollY` ref는 가상 매핑의 핵심 상태. 초기화 조건(DPR 변경 등)을 누락하면 스크롤 위치가 틀어질 수 있음
- `onScroll`의 하이브리드 매핑에서 `delta > 2000` 임계값은 스크롤바 드래그 vs 휠 스크롤 구분용. 이 값을 줄이면 휠 스크롤이 점프하고, 늘리면 스크롤바가 부정확해짐
- `paddingRight`/`paddingBottom`은 `update` 콜백의 `width`/`height`에서 차감됨. rightElement 관련 수정 시 이 차감을 고려해야 함

### ScrollingDataGrid 수정 시
- `processArgs`의 X/Y 변환 로직은 `smoothScrollX`/`smoothScrollY` 분기가 복잡함. 한쪽만 수정하면 다른 모드에서 오프셋이 틀어질 수 있음
- `cellY`/`cellBottom` 경계 클램핑(L199-200)은 대규모 데이터셋에서 out-of-bounds 방지용. 제거하면 100M+ 행에서 크래시 가능
- `useEffect(() => processArgs())`(L250-252)는 `columns`/`rowHeight`/`rows` 변경 시 visible region 재계산용. 의존성 배열 변경 주의

### DataGridDnd 수정 시
- `lockColumns`는 드래그 불가 영역의 기준. 이 값 이하의 컬럼은 `onItemHoveredImpl`에서 드롭 대상에서 제외됨
- 20px 드래그 임계값(L301, L306)은 클릭과 드래그를 구분하는 기준. 너무 작으면 의도치 않은 드래그, 너무 크면 반응성 저하
- `getMangledCellContent`는 행 드래그 중 시각적 피드백만 제공. 실제 데이터 이동은 `onRowMoved` 콜백에서 사용자가 처리해야 함
- `offsetColumnSize`에서 `growOffset`을 빼는 이유: grow 모드에서 추가된 너비를 제거하고 사용자 지정 너비만으로 min/max 적용
- 컬럼 리사이즈 시 선택된 컬럼 그룹에 동일 너비를 적용하는 로직(L222-235, L318-325)이 `onMouseMove`와 `onMouseUpImpl` 양쪽에 있음. 한쪽만 수정하면 불일치 발생

### HiDPI/Zoom 관련
- 컬럼 리사이즈의 scale 계산 (`rect.width / canvas.offsetWidth`)은 브라우저 줌과 devicePixelRatio를 모두 반영함
- InfiniteScroller의 DPR 변경 감지(L165-175)는 줌 레벨 변경 시 스크롤 위치 재설정용. 이 로직이 없으면 줌 후 스크롤 위치가 잘못됨
