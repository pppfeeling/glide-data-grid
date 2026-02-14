---
paths:
  - "packages/core/src/internal/data-grid-search/**"
  - "packages/core/src/internal/data-grid-overlay-editor/**"
---

# DataGridSearch & DataGridOverlayEditor 분석

## 1. 개요

### 파일 목록 및 역할

| 파일 | 역할 | LOC |
|------|------|-----|
| `data-grid-search.tsx` | 검색 UI + ScrollingDataGrid 래퍼, prelightCells로 검색 결과 하이라이트 | ~579 |
| `data-grid-search-style.tsx` | 검색 바 스타일 (SearchWrapper), fade-in/out 애니메이션 | ~97 |
| `data-grid-overlay-editor.tsx` | 셀 편집 오버레이, 포털 기반 에디터 렌더링 | ~296 |
| `data-grid-overlay-editor-style.tsx` | 오버레이 에디터 위치/스타일, bloom 처리 | ~84 |
| `use-stay-on-screen.ts` | IntersectionObserver 기반 화면 내 위치 유지 훅 | ~62 |

### 컴포넌트 계층에서의 위치

```
DataEditorImpl (data-editor.tsx)
├── DataGridSearch (data-grid-search.tsx)  ← ScrollingDataGrid 래퍼
│   ├── ScrollingDataGrid
│   │   └── InfiniteScroller → DataGridDnd → DataGrid (Canvas)
│   └── SearchWrapper (검색 UI)
└── DataGridOverlayEditor (data-grid-overlay-editor.tsx)  ← 포털로 렌더링
    └── ClickOutsideContainer
        └── DataGridOverlayEditorStyle
            └── CustomEditor (셀 타입별 에디터)
```

---

## 2. DataGridSearch 컴포넌트 분석

**파일**: `packages/core/src/internal/data-grid-search/data-grid-search.tsx`

### 역할
ScrollingDataGrid를 감싸는 래퍼 컴포넌트로, 두 가지 핵심 기능을 제공한다:
1. **검색 UI 렌더링**: 입력창, 이전/다음/닫기 버튼, 검색 진행 상태 표시
2. **prelightCells 전달**: 검색 결과 좌표(`Item[]`)를 ScrollingDataGrid의 `prelightCells` prop으로 전달하여 셀 하이라이트

### Props 인터페이스 (L53-89)

```typescript
interface DataGridSearchProps extends Omit<ScrollingDataGridProps, "prelightCells"> {
    getCellsForSelection?: (selection: Rectangle, abortSignal: AbortSignal) => GetCellsThunk | CellArray;
    searchResults?: readonly Item[];           // 외부 제공 검색 결과
    onSearchResultsChanged?: (results: readonly Item[], navIndex: number) => void;
    showSearch?: boolean;                       // 검색 UI 표시 여부
    onSearchClose?: () => void;                 // 닫기 이벤트
    searchValue?: string;                       // 제어형 검색 값
    onSearchValueChange?: (newVal: string) => void;
    searchInputRef: React.MutableRefObject<HTMLInputElement | null>;
}
```

**핵심 설계**: `prelightCells`를 `Omit`으로 제거하고, 내부에서 `searchResults`를 `prelightCells`로 변환하여 전달한다 (L491).

### 검색 모드: 내부 vs 외부

| 모드 | 조건 | 동작 |
|------|------|------|
| **내부 검색** | `searchResults` prop 미제공 | `beginSearch()`로 비동기 셀 스캔 |
| **외부 검색** | `searchResults` prop 제공 | 외부 결과를 그대로 `prelightCells`로 전달 |

`searchValue`도 동일하게 제어형/비제어형 양쪽 모두 지원 (L111-121).

### 핵심 함수

#### `beginSearch` (L165-274) - 내부 비동기 검색 엔진
- `cellYOffset`(현재 보이는 행)부터 검색 시작
- `requestAnimationFrame` 기반 비동기 처리로 UI 블로킹 방지
- **적응적 stride 조정**: `targetSearchTimeMS`(10ms)에 맞춰 한 번에 처리하는 행 수를 동적 조정 (L259-263)
- 검색 가능 셀 종류: Text, Number(displayData), Uri, Markdown, Boolean, Image, Bubble, Custom(copyData)
- 최대 1000개 결과까지 검색 후 중단 (L265)
- `AbortController`로 취소 가능

#### `cancelSearch` (L151-161) - 검색 중단
- `cancelAnimationFrame`으로 타이머 해제
- `AbortController.abort()`로 비동기 데이터 페치 중단
- 새 `AbortController` 생성하여 다음 검색 준비

#### `onNext` / `onPrev` (L321-348) - 결과 네비게이션
- `selectedIndex`를 순환적으로 증감 (modulo 연산)
- `onSearchResultsChanged` 콜백으로 외부에 현재 인덱스 전파

#### `onSearchKeyDown` (L350-365) - 키보드 단축키
- `Ctrl/Cmd+F` 또는 `Escape`: 검색 닫기
- `Enter`: 다음 결과
- `Shift+Enter`: 이전 결과

#### `onClose` (L276-283) - 검색 닫기
- 검색 상태/결과 초기화
- `canvasRef.current.focus()`로 그리드에 포커스 복귀

### prelightCells 렌더링 경로

```
DataGridSearch.searchResults (Item[])
  → ScrollingDataGrid.prelightCells
    → DataGrid.prelightCells
      → drawCells() (data-grid-render.cells.ts:347-353)
        → 매칭 셀 배경에 theme.bgSearchResult 블렌딩
```

렌더링 시 `prelightCells`의 각 `[col, row]`를 현재 그리는 셀의 `sourceIndex`와 비교하여, 일치하면 `blend(theme.bgSearchResult, fill)`로 배경색을 혼합한다.

### 검색 UI 애니메이션 (L374-383, L385-486)

- `showSearch` 변경 시 `isAnimatingOut` 상태로 fade-out 150ms 유지
- CSS 애니메이션: `gdg-search-fadein` (translateX 400px -> 0) / `gdg-search-fadeout` (0 -> 400px)
- 마우스 이벤트 전파 차단 (`cancelEvent`, L401-403)으로 그리드 클릭 방지

---

## 3. DataGridOverlayEditor 컴포넌트 분석

**파일**: `packages/core/src/internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx`

### 역할
셀 편집 시 해당 셀 위치에 오버레이 에디터를 포털로 렌더링한다. 셀 타입별 에디터를 동적으로 선택하고, 편집 완료/취소/이동(Tab, Enter) 처리를 담당한다.

### Props 인터페이스 (L38-66)

```typescript
interface DataGridOverlayEditorProps {
    target: Rectangle;                    // 셀의 화면 좌표 (x, y, width, height)
    cell: Item;                           // [col, row] 좌표
    content: GridCell;                    // 셀 데이터
    initialValue?: string;                // 키 입력으로 편집 시작 시 초기값
    bloom?: readonly [number, number];    // 에디터 확장 여백 [x, y]
    theme: Theme;                         // 테마
    onFinishEditing: (newCell: GridCell | undefined, movement: readonly [-1|0|1, -1|0|1]) => void;
    forceEditMode: boolean;               // 강제 편집 모드 (더블클릭)
    highlight: boolean;                   // 하이라이트 여부
    portalElementRef?: React.RefObject<HTMLElement>;  // 포털 대상
    imageEditorOverride?: ImageEditorType;
    getCellRenderer: GetCellRendererCallback;
    provideEditor?: ProvideEditorCallback<GridCell>;
    activation: CellActivatedEventArgs;   // 활성화 방식 정보
    validateCell?: (cell: Item, newValue: EditableGridCell, prevValue: GridCell) => boolean | ValidatedGridCell;
    isOutsideClick?: (e: MouseEvent | TouchEvent) => boolean;
    customEventTarget?: HTMLElement | Window | Document;
    ghostValue?: string;                  // GhostInput IME 값
    isGhostMode?: boolean;                // GhostInput 모드 여부
}
```

### GhostModeContext (L28-36)

IME 지원을 위한 Context. `isGhostMode=true`일 때 오버레이 에디터는 `visibility: hidden`으로 렌더링되어 사용자에게 보이지 않으며 (L278), GhostInput이 실제 입력을 처리한다.

```typescript
export const GhostModeContext = React.createContext<GhostModeContextValue>({
    isGhostMode: false,
    ghostValue: "",
});
```

### 핵심 함수

#### 값 관리: `tempValue` / `setTempValue` (L94-126)
- `tempValue`: 편집 중인 임시 값 (`undefined`이면 원본 `content` 사용)
- `setTempValue` (L110-126): `validateCell` 호출하여 유효성 검증
  - `false` 반환 시: `isValid=false` 설정 (CSS `gdg-invalid` 클래스 추가)
  - `ValidatedGridCell` 반환 시: 보정된 값으로 대체
  - `true` 반환 시: 그대로 사용

#### `onFinishEditing` (L103-108) - 편집 완료 래퍼
- `isValid`가 `false`이면 `newCell`을 `undefined`로 대체 (편집 취소)

#### `onClickOutside` (L131-134) - 외부 클릭 처리
- 현재 `tempValue`를 저장하며 `movement=[0,0]`으로 완료

#### `onEditorFinished` (L136-146) - 에디터 자체 완료 콜백
- 커스텀 에디터가 호출하는 완료 콜백
- `customMotion.current` 또는 에디터 제공 movement 사용

#### `onKeyDown` (L148-183) - 키보드 이벤트
- `Escape`: 편집 취소 (`save=false`, `movement=[0,0]`)
- `Enter` (Shift 제외): 저장 후 아래로 이동 (`[0,1]`)
- `Tab`: 저장 후 좌우 이동 (`[1,0]` 또는 `[-1,0]`)
- `setTimeout(0)`으로 지연 실행하여 에디터의 자체 처리 후 동작

#### 에디터 선택 로직 (L187-196)
```
1. provideEditor prop (DataEditor에서 제공) 확인
2. undefined이면 getCellRenderer().provideEditor() 사용 (셀 렌더러 내장 에디터)
```

### 포털 렌더링 구조 (L265-292)

```jsx
createPortal(
    <ThemeContext.Provider>
        <GhostModeContext.Provider>
            <ClickOutsideContainer>
                <DataGridOverlayEditorStyle  // 위치/크기 설정
                    ref={ref}               // useStayOnScreen 연결
                    style={styleOverride}   // 화면 내 위치 보정
                    targetX={target.x - bloomX}
                    targetY={target.y - bloomY}
                    targetWidth={target.width + bloomX * 2}
                    targetHeight={target.height + bloomY * 2}
                >
                    <div className="gdg-clip-region" onKeyDown={onKeyDown}>
                        {editor}
                    </div>
                </DataGridOverlayEditorStyle>
            </ClickOutsideContainer>
        </GhostModeContext.Provider>
    </ThemeContext.Provider>,
    portalElement  // portalElementRef.current 또는 document.getElementById("portal")
)
```

### bloom (에디터 확장 여백)

`bloom` prop (기본값 `[1,1]`)은 에디터를 셀 영역보다 약간 크게 렌더링한다:
- `targetX = target.x - bloomX`
- `targetWidth = target.width + bloomX * 2`
- DataEditor에서 `editorBloom` prop으로 설정

### CSS 클래스 조합 (L253-260)

| 클래스 | 조건 | 효과 |
|--------|------|------|
| `gdg-style` | `disableStyling !== true` | 배경, 그림자, 애니메이션 적용 |
| `gdg-unstyle` | `disableStyling === true` | 최소 스타일 |
| `gdg-invalid` | `isValid === false` | 유효성 실패 시각 표시 |
| `gdg-pad` | `disablePadding !== true` | 셀 높이 기반 패딩 |

---

## 4. useStayOnScreen 훅 분석

**파일**: `packages/core/src/internal/data-grid-overlay-editor/use-stay-on-screen.ts`

### 목적
오버레이 에디터가 화면 오른쪽 밖으로 벗어나지 않도록 `translateX` 보정값을 계산한다.

### 동작 원리

1. **IntersectionObserver** (L18-32): `threshold: 1`로 설정하여 요소가 100% 보이지 않으면 `isIntersecting=false`
2. **위치 보정 루프** (L34-51): `isIntersecting=false`일 때 `requestAnimationFrame`으로 반복 실행
   - `ref.getBoundingClientRect().right`와 `window.innerWidth`를 비교
   - `xOffset = Math.min(cv + window.innerWidth - refRight - 10, 0)` (항상 음수 또는 0)
3. **스타일 적용** (L53-55): `{ transform: translateX(${xOffset}px) }`

### 반환 인터페이스

```typescript
interface StayOnScreen {
    ref: React.RefCallback<HTMLElement | null>;  // 에디터 요소에 연결
    style: React.CSSProperties;                   // transform 스타일
}
```

### 내부 useRefState 헬퍼 (L3-6)
`useState`를 `RefCallback` 패턴으로 변환. DOM 요소가 마운트/언마운트될 때 상태 업데이트를 트리거하여 IntersectionObserver를 재설정한다.

---

## 5. 스타일 컴포넌트 분석

### SearchWrapper (`data-grid-search-style.tsx`)

- **위치**: `position: absolute; top: 4px; right: 20px;` (그리드 우상단)
- **테마 변수**: `--gdg-bg-cell`, `--gdg-text-dark`, `--gdg-border-color`, `--gdg-editor-font-size`
- **애니메이션**: `translateX(400px)` 기반 좌우 슬라이드 (0.15s)
- **진행 바**: `.gdg-search-progress` - 하단 4px 높이 바, 너비는 검색 진행률에 비례

### DataGridOverlayEditorStyle (`data-grid-overlay-editor-style.tsx`)

- **위치**: `position: absolute`, `left`/`top`은 Props로 설정
- **크기**: `min-width/min-height`는 셀 크기, `max-width: 400px`, `max-height: calc(100vh - top - 10px)`
- **패딩**: `gdg-pad` 클래스에서 `(targetHeight - 28) / 2`로 수직 중앙 정렬
- **CSS 변수**: `--overlay-top`으로 top 값을 하위 요소에서 참조 가능
- **애니메이션**: `glide_fade_in` 60ms opacity 전환

---

## 6. DataEditor와의 상호작용

### DataGridSearch 연결 (data-editor.tsx:3384-3475)

DataEditor는 DataGridSearch를 직접 자식으로 렌더링하며, ScrollingDataGrid의 모든 prop을 중계한다:

| DataEditor prop | DataGridSearch prop | 설명 |
|----------------|---------------------|------|
| `showSearch` | `showSearch` | 검색 UI 표시 |
| `searchValue` | `searchValue` | 제어형 검색 값 |
| `onSearchValueChange` | `onSearchValueChange` | 검색 값 변경 콜백 |
| `searchResults` | `searchResults` | 외부 검색 결과 |
| `onSearchResultsChanged` | `onSearchResultsChanged` | 결과 변경 콜백 |
| `onSearchClose` | `onSearchClose` | 닫기 콜백 |
| `getCellsForSelection` | `getCellsForSelection` | 내부 검색 데이터 소스 |
| `searchInputRef` (내부 ref) | `searchInputRef` | 입력 포커스 제어 |

### DataGridOverlayEditor 연결 (data-editor.tsx:3477-3495)

- **Lazy Loading**: `React.lazy()`로 코드 스플리팅 (L85-87)
- **조건부 렌더링**: `overlay !== undefined`일 때만 `<React.Suspense>`로 래핑하여 렌더링
- **overlay 상태**: `useState<{ target, content, theme, initialValue, cell, highlight, forceEditMode, activation }>` (L803-814)
- **`setOverlaySimple`** (L1598): 셀 테마를 merge한 후 `setOverlay` 호출

### overlay 생성 트리거

| 트리거 | 위치 | 설명 |
|--------|------|------|
| 더블클릭 | `onMouseDown` (use-mouse-handlers.ts) | `forceEditMode=true`, `initialValue=undefined` |
| 키 입력 (editOnType) | `useGhostInput` | `forceEditMode=false`, `initialValue=키값` |
| Enter 키 | `useKeyboardHandlers` | `forceEditMode=true` |
| `onCellActivated` | DataEditor | 프로그래매틱 활성화 |

### overlay 해제 트리거

| 트리거 | 위치 | 설명 |
|--------|------|------|
| `onFinishEditing` 호출 | data-editor.tsx:2821 | 편집 완료 시 `setOverlay(undefined)` |
| 헤더/마커 클릭 | use-mouse-handlers.ts | `setOverlay(undefined)` |
| 그리드 외부 클릭 | use-mouse-handlers.ts | `setOverlay(undefined)` |
| 스크롤 발생 | data-editor.tsx:2388 | `setOverlay(undefined)` |
| 부모 스크롤 발생 | data-editor.tsx:2341 | `setOverlay(undefined)` |

---

## 7. 핵심 함수 요약 (파일:라인)

### data-grid-search.tsx
| 함수 | 라인 | 설명 |
|------|------|------|
| `DataGridSearch` | L93 | 메인 컴포넌트 |
| `setSearchString` | L115-121 | 검색 값 설정 (제어형/비제어형 양쪽 emit) |
| `cancelSearch` | L151-161 | 검색 중단 (RAF + AbortController) |
| `beginSearch` | L165-274 | 비동기 검색 시작 (적응적 stride) |
| `onClose` | L276-283 | 검색 닫기, 상태 초기화 |
| `onSearchChange` | L285-298 | 입력 변경 핸들러 |
| `onNext` / `onPrev` | L321-348 | 결과 네비게이션 |
| `onSearchKeyDown` | L350-365 | 키보드 단축키 |

### data-grid-overlay-editor.tsx
| 함수 | 라인 | 설명 |
|------|------|------|
| `DataGridOverlayEditor` | L68 | 메인 컴포넌트 |
| `setTempValue` | L110-126 | 값 설정 + 유효성 검증 |
| `onFinishEditing` | L103-108 | 유효성 래핑된 완료 콜백 |
| `onClickOutside` | L131-134 | 외부 클릭 시 저장 |
| `onEditorFinished` | L136-146 | 에디터 자체 완료 콜백 |
| `onKeyDown` | L148-183 | Escape/Enter/Tab 처리 |
| `editorProvider` (useMemo) | L187-196 | 에디터 선택 (provideEditor > cellRenderer) |

### use-stay-on-screen.ts
| 함수 | 라인 | 설명 |
|------|------|------|
| `useRefState` | L3-6 | RefCallback 기반 상태 |
| `useStayOnScreen` | L13-61 | IntersectionObserver + translateX 보정 |

---

## 8. 수정 시 주의사항

### DataGridSearch 관련
1. **prelightCells 성능**: 검색 결과가 많을수록 렌더링 비용 증가. `prelightCells` 배열을 매 프레임 순회하므로 1000개 제한이 존재한다 (L265).
2. **AbortController 관리**: `cancelSearch`는 항상 새 `AbortController`를 생성한다. `getCellsForSelection`이 `AbortSignal`을 무시하면 메모리 누수 가능.
3. **검색 시작 위치**: `cellYOffsetRef.current`(현재 보이는 행)부터 시작하므로, 사용자에게 가까운 결과가 먼저 나타난다.
4. **외부 검색 모드**: `searchResultsIn`이 제공되면 `beginSearch`를 호출하지 않는다 (L288). 외부 모드에서 `onSearchChange`는 값만 전파한다.
5. **이벤트 전파 차단**: SearchWrapper의 mouse 이벤트가 전파되면 그리드 셀 선택이 발생할 수 있다. `cancelEvent`(L401)이 이를 방지한다.

### DataGridOverlayEditor 관련
1. **포털 필수**: `portalElementRef` 또는 `<div id="portal" />`이 DOM에 없으면 에디터가 렌더링되지 않는다 (L244-251).
2. **GhostMode 처리**: `isGhostMode=true`이면 `visibility: hidden`이 적용된다 (L278). 에디터 DOM은 존재하지만 보이지 않으며, GhostInput이 실제 입력을 담당한다.
3. **finished 플래그**: `finished.current` (L128)로 중복 완료 방지. `onKeyDown`의 `setTimeout(0)`과 에디터 자체 완료 콜백이 동시에 호출되는 것을 방지한다.
4. **validateCell 흐름**: `setTempValue` -> `validateCell` -> `isValid` 설정 -> `onFinishEditing`에서 `isValid` 체크. 유효하지 않으면 `newCell=undefined`로 편집 취소.
5. **bloom 좌표**: target 좌표에서 bloom 값을 빼므로, bloom 변경 시 에디터 위치가 달라진다. 기본값은 `[1,1]`.
6. **useStayOnScreen 제한**: X축(우측 넘침)만 보정한다. Y축 넘침은 CSS `max-height: calc(100vh - top - 10px)`로 처리.
7. **에디터 선택 우선순위**: `provideEditor` prop > `getCellRenderer().provideEditor()`. 커스텀 에디터 제공 시 기본 에디터를 완전히 대체한다.
8. **Lazy Loading**: `DataGridOverlayEditor`는 `React.lazy`로 로드되므로 (data-editor.tsx:85), 첫 편집 시 로딩 지연이 발생할 수 있다. `<Suspense fallback={null}>`로 대응.

### 상호작용 관련
1. **스크롤 시 오버레이 닫힘**: DataEditor에서 `onVisibleRegionChanged`에서 스크롤 감지 시 `setOverlay(undefined)` 호출 (data-editor.tsx:2388). 부모 컨테이너 스크롤도 동일 (data-editor.tsx:2341).
2. **검색과 편집 동시 사용**: 검색 중 셀 편집이 가능하다. 검색 결과 하이라이트(prelightCells)와 편집 오버레이는 독립적으로 동작한다.
3. **onFinishEditing 데이터 흐름**: DataGridOverlayEditor -> DataEditor.onFinishEditing -> GhostInput 값 병합 -> 셀 업데이트 -> overlay 해제 -> 커서 이동. Custom Cell은 GhostInput 값을 무시한다 (data-editor.tsx:2836-2857).
