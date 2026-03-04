# DataEditor 훅 추출 리팩토링 기록

## 작업 개요

`data-editor.tsx` (3,802줄)를 기능별 커스텀 훅으로 분리하여 유지보수성과 가독성을 향상시키는 리팩토링 작업.

## 작업 일자
- 시작: 2026-03-04
- 현재 상태: 1차 추출 완료, 2차 추출 계획 중

## 변경 전 상태

### data-editor.tsx (3,802줄)
기존에 이미 추출되어 있던 훅:
| 훅 | 파일 | LOC | 역할 |
|----|------|-----|------|
| useMouseHandlers | use-mouse-handlers.ts | 637 | 마우스/터치/필 이벤트 |
| useKeyboardHandlers | use-keyboard-handlers.ts | 523 | 키보드 네비게이션/키바인딩 |
| useClipboard | use-clipboard.ts | 403 | 복사/붙여넣기/잘라내기 |
| useGhostInput | use-ghost-input.ts | 329 | IME/GhostInput 핸들러 |
| useColumnSizer | use-column-sizer.ts | 200 | 컬럼 크기 계산 |
| useCellsForSelection | use-cells-for-selection.ts | 80 | 범위 데이터 가져오기 |
| useAutoscroll | use-autoscroll.ts | 35 | 자동 스크롤 |
| useInitialScrollOffset | use-initial-scroll-offset.ts | 100 | 초기 스크롤 위치 |
| useRemAdjuster | use-rem-adjuster.ts | 55 | rem 스케일링 |

## 1차 추출 작업 (현재 커밋 + 미커밋 변경사항)

### 직전 커밋 (3540f8e)
- `data-editor-types.ts` 생성 - DataEditor 관련 타입 정의 추출
- `use-row-markers.ts` 수정 - getRowMarkerConfig, useMangledCols, useGetMangledCellContent, useMangledOnCellsEdited 추출

### 미커밋 변경사항 (현재 작업중)

새로 추출한 훅 9개:

| 훅 | 파일 | LOC | 역할 |
|----|------|-----|------|
| useSearch | use-search.ts | 27 | 검색 표시 상태 (controlled/uncontrolled) |
| useSelection | use-selection.ts | 91 | 선택 상태 관리 (gridSelection, setGridSelection) |
| useMangledProps | use-mangled-props.ts | 85 | 컬럼 리사이즈/drawHeader/drawCell 좌표 변환 |
| useCellRenderer | use-cell-renderer.ts | 40 | 셀 렌더러 맵 및 getCellRenderer |
| useOverlayEditor | use-overlay-editor.ts | 50 | 오버레이 에디터 상태 및 테마 병합 |
| useScrollTo | use-scroll-to.ts | 192 | scrollTo 기능 (뷰포트 계산, 정렬) |
| useDataEditorRef | use-data-editor-ref.ts | 164 | useImperativeHandle - DataEditorRef 외부 API |
| useAppendHandlers | use-append-handlers.ts | 191 | appendRow/appendColumn 로직 |
| useSelectionNavigation | use-selection-navigation.ts | 305 | 선택 네비게이션 (adjustSelection, updateSelectedCell) |

### 수정된 기존 파일
| 파일 | 변경 내용 |
|------|----------|
| data-editor-fns.ts | `shiftSelection`, `getSpanStops` 함수 이동 (data-editor.tsx에서) |
| use-row-markers.ts | `useMangledOnCellsEdited` 추가 export |
| data-editor.tsx | 위 훅들을 import하고 인라인 코드를 훅 호출로 교체 |
| index.ts | export 경로 조정 |

### 결과
- data-editor.tsx: 3,802줄 → **2,132줄** (1,670줄 감소, 44% 축소)
- TypeScript 컴파일: **통과**

## 점검 결과

### 코드 품질 (모든 항목 통과)
- [x] 타입 안전성 - 제네릭, readonly, 유니온 타입 올바르게 사용
- [x] 좌표 변환 일관성 - rowMarkerOffset 변환이 모든 파일에서 동일
  - 외부→내부: `+ rowMarkerOffset`
  - 내부→외부: `- rowMarkerOffset`
- [x] dependency array 완전성 - 모든 useCallback/useMemo에 누락 없음
- [x] stale closure 방지 - ref를 적절히 사용 (overlayRef, ghostInputVisibleRef 등)
- [x] 미사용 import 없음
- [x] 데드 코드 없음

### 훅 인터페이스 패턴
모든 훅이 일관된 패턴 사용:
```typescript
// 파라미터: 개별 props + refs를 객체로 전달
export function useXxx(args: { prop1, prop2, ... }) {
    // 로직
    return { result1, result2 };
}
```

## 2차 추출 계획 (미착수)

data-editor.tsx에 여전히 남아있는 대형 인라인 콜백:

| 콜백 | 라인 | LOC | 우선순위 | 역할 |
|------|------|-----|---------|------|
| handleSelect | 797-1055 | 258 | HIGH | 셀/헤더/OOB 클릭 시 선택 처리 |
| onFinishEditing | 1489-1640 | 151 | HIGH | 편집 완료, GhostInput 텍스트 추출, 셀 이동 |
| onItemHoveredImpl | 1361-1457 | 96 | MEDIUM | 마우스 드래그 중 범위 선택 확장 |
| onVisibleRegionChangedImpl | 1204-1289 | 85 | MEDIUM | 스크롤 시 visible region 갱신, overlay 닫기 |
| 컬럼 이동/드래그 콜백 | 1291-1336 | 75 | LOW | onColumnMovedImpl, onDragStartImpl 등 |

### 추출하지 않는 항목 (사유)
| 콜백 | LOC | 사유 |
|------|-----|------|
| reselect | 79 | 여러 훅에서 사용, 복잡한 의존성 |
| deleteRange | 36 | 작은 크기, 단순 로직 |
| focus | 9 | 매우 작음 |
| highlightRegions useMemo | 65 | 렌더링 전용 계산, 별도 훅 불필요 |

### 2차 추출 완료 시 예상
- data-editor.tsx: 2,132줄 → **약 1,450줄**
- 새 훅 파일 5개 추가
- data-editor.tsx가 순수 오케스트레이터 역할에 집중

## 아키텍처 다이어그램 (현재 상태)

```
DataEditorImpl (data-editor.tsx, 2,132 LOC) - 오케스트레이터
│
├── Props 분배 & 상태 초기화
│
├── 유틸리티 훅:
│   ├── useSearch()              → 검색 상태
│   ├── useSelection()           → 선택 상태 관리
│   ├── useMangledProps()        → 좌표 변환된 콜백
│   ├── useCellRenderer()        → 렌더러 맵
│   ├── useOverlayEditor()       → 오버레이 상태
│   ├── useScrollTo()            → 스크롤 기능
│   ├── useAppendHandlers()      → 행/열 추가
│   ├── useSelectionNavigation() → 선택 네비게이션
│   ├── useDataEditorRef()       → 외부 API (ref)
│   ├── useMangledCols()         → 컬럼 정규화
│   ├── useGetMangledCellContent() → 셀 콘텐츠
│   ├── useMangledOnCellsEdited()  → 편집 좌표 변환
│   ├── useColumnSizer()         → 컬럼 크기
│   ├── useCellsForSelection()   → 범위 데이터
│   ├── useRemAdjuster()         → rem 스케일링
│   └── useInitialScrollOffset() → 초기 스크롤
│
├── DataEditorCoreState 생성 (공유 상태 객체)
│
├── 이벤트 핸들러 훅:
│   ├── useMouseHandlers()       → 마우스/터치/필 (637 LOC)
│   ├── useKeyboardHandlers()    → 키보드 (523 LOC)
│   ├── useGhostInput()          → IME/문자 입력 (329 LOC)
│   └── useClipboard()           → 복사/붙여넣기 (403 LOC)
│
├── 인라인 콜백 (2차 추출 대상):
│   ├── handleSelect             → 클릭 선택 처리 (258 LOC)
│   ├── onFinishEditing          → 편집 완료 처리 (151 LOC)
│   ├── onItemHoveredImpl        → 호버 선택 확장 (96 LOC)
│   ├── onVisibleRegionChangedImpl → visible region (85 LOC)
│   └── 컬럼 이동/드래그 콜백    → (75 LOC)
│
└── JSX 렌더링:
    ├── DataGridSearch (45 props)
    ├── DataGridOverlayEditor (lazy + Suspense)
    └── GhostInput Portal
```

## 파일 구조 (현재)

```
packages/core/src/data-editor/
├── data-editor.tsx              # 오케스트레이터 (2,132 LOC)
├── data-editor-types.ts         # DataEditor 타입 정의
├── data-editor-state.ts         # DataEditorCoreState 인터페이스 (104 LOC)
├── data-editor-fns.ts           # 유틸리티 함수 (251 LOC)
├── visible-region.ts            # VisibleRegion 타입
│
├── use-mouse-handlers.ts        # 마우스/터치/필 이벤트 (637 LOC)
├── use-keyboard-handlers.ts     # 키보드 네비게이션 (523 LOC)
├── use-clipboard.ts             # 복사/붙여넣기 (403 LOC)
├── use-ghost-input.ts           # IME/GhostInput (329 LOC)
│
├── use-selection-navigation.ts  # 선택 네비게이션 (305 LOC) ★NEW
├── use-scroll-to.ts             # 스크롤 기능 (192 LOC) ★NEW
├── use-append-handlers.ts       # 행/열 추가 (191 LOC) ★NEW
├── use-data-editor-ref.ts       # 외부 API ref (164 LOC) ★NEW
├── use-selection.ts             # 선택 상태 (91 LOC) ★NEW
├── use-mangled-props.ts         # 좌표 변환 콜백 (85 LOC) ★NEW
├── use-overlay-editor.ts        # 오버레이 상태 (50 LOC) ★NEW
├── use-cell-renderer.ts         # 렌더러 맵 (40 LOC) ★NEW
├── use-search.ts                # 검색 상태 (27 LOC) ★NEW
│
├── use-row-markers.ts           # 행 마커/컬럼 정규화 (524 LOC) ★MODIFIED
├── use-column-sizer.ts          # 컬럼 크기 계산 (200 LOC)
├── use-cells-for-selection.ts   # 범위 데이터 (80 LOC)
├── use-autoscroll.ts            # 자동 스크롤 (35 LOC)
├── use-initial-scroll-offset.ts # 초기 스크롤 (100 LOC)
└── use-rem-adjuster.ts          # rem 스케일링 (55 LOC)
```