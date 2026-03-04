# Glide Data Grid 아키텍처 & 컨벤션

캔버스 기반 고성능 React 데이터 그리드. 수백만 행 지원. `packages/core/src/`

## 빌드 및 테스트

```bash
cd packages/core && npx vitest run --reporter verbose   # 395 tests, ~10s
npx tsc --noEmit -p packages/core/tsconfig.json         # 타입 체크
cd packages/core && npm run build                        # 빌드
npm run start                                            # Storybook → http://localhost:9009
```

## 코드 컨벤션

- **Import**: `.js` 확장자 사용, barrel exports 없음
- **Hook**: 개별 파일 분리, 헬퍼 함수는 같은 파일에 co-locate
- **컬럼 순서 (mangledCols)**: `rowNumber → checkbox → rowStatus → rowId → 사용자 컬럼`, `rowMarkerOffset`으로 내부/외부 인덱스 변환
- **타입 주의**: `Slice`는 `[number, number]` (mutable), `readonly` 속성 유지 필수, 새 셀 타입 추가시 타입 가드 동기화

## 컴포넌트 계층

```
DataEditorAll (data-editor-all.tsx)
    └── DataEditor (data-editor.tsx, 1,551 LOC) ─── 24개 훅
            └── DataGridSearch (data-grid-search/)
                    └── DataGrid (data-grid.tsx, 793 LOC) ─── 6개 훅
                            └── Canvas Rendering (render/)
```

## 파일 위치 참조

### DataEditor 훅 (data-editor/)

| 파일 | LOC | 역할 |
|------|-----|------|
| `data-editor.tsx` | 1,551 | 오케스트레이터 |
| `data-editor-types.ts` | 703 | Props/타입 정의 |
| `data-editor-state.ts` | 104 | 공유 상태 인터페이스 (DataEditorCoreState) |
| `use-row-markers.ts` | 524 | 행 마커/mangledCols/getMangledCellContent |
| `use-mouse-handlers.ts` | 641 | 마우스/터치/필 이벤트 |
| `use-keyboard-handlers.ts` | 523 | 키보드 네비게이션/키바인딩 |
| `use-clipboard.ts` | 409 | 복사/붙여넣기/잘라내기 |
| `use-handle-select.ts` | 366 | 셀/헤더/행 선택 처리 |
| `use-ghost-input.ts` | 330 | IME/GhostInput 핸들러 |
| `use-selection-navigation.ts` | 305 | 셀 이동/reselect |
| `use-column-sizer.ts` | 253 | 컬럼 크기 자동 계산 |
| `use-finish-editing.ts` | 209 | 편집 완료/다음 셀 이동 |
| `use-hover-handler.ts` | 204 | 드래그 범위 선택/fill handle |
| `use-scroll-to.ts` | 192 | scrollTo 구현 |
| `use-append-handlers.ts` | 191 | 행/컬럼 append |
| `use-data-editor-ref.ts` | 164 | 외부 API (DataEditorRef) |
| `use-visible-region.ts` | 126 | visible region 갱신 |
| `use-initial-scroll-offset.ts` | 118 | 초기 스크롤 위치 |
| `use-column-callbacks.ts` | 94 | 컬럼 이동/드래그 콜백 |
| `use-selection.ts` | 91 | 선택 상태 관리 |
| `use-mangled-props.ts` | 85 | mangled 콜백 래핑 |
| `use-cells-for-selection.ts` | 72 | 범위 셀 데이터 조회 |
| `use-rem-adjuster.ts` | 56 | rem 단위 스케일링 |
| `use-overlay-editor.ts` | 50 | 편집 오버레이 상태 |
| `use-autoscroll.ts` | 41 | 드래그 시 자동 스크롤 |
| `use-cell-renderer.ts` | 40 | 셀 렌더러 조회 |
| `use-search.ts` | 27 | 검색 UI 상태 |

### DataGrid 훅 (internal/data-grid/)

| 파일 | LOC | 역할 |
|------|-----|------|
| `data-grid.tsx` | 793 | 오케스트레이터 (키보드/커서/shadow) |
| `use-canvas-renderer.ts` | 458 | 캔버스 렌더링/더블 버퍼/데미지 추적 |
| `use-grid-pointer-events.ts` | 413 | 포인터/마우스/호버/터치 |
| `use-grid-geometry.ts` | 383 | 좌표 변환/히트 감지/셀 위치 |
| `use-grid-focus-and-accessibility.tsx` | 312 | 접근성 트리/포커스/DataGridRef |
| `use-grid-drag-and-drop.ts` | 271 | HTML5 DnD/드래그 프리뷰 |
| `use-animation-queue.ts` | 42 | RAF 배치 (쓰로틀링) |
| `data-grid-types.ts` | 748 | 핵심 타입 정의 |

### 기타

| 파일 | 역할 |
|------|------|
| `common/styles.ts` | 테마 정의 (215 LOC) |
| `render/data-grid-render.ts` | 메인 렌더 진입점 |
| `render/data-grid-render.cells.ts` | 셀 렌더링 |
| `render/data-grid-render.header.ts` | 헤더 렌더링 |
| `use-selection-behavior.ts` | 선택 블렌딩 로직 |
| `event-args.ts` | 이벤트 타입 |

## 데이터 흐름

```
Props (columns, rows, getCellContent) → DataEditor (24개 훅)
    → DataGridSearch → DataGrid (6개 훅) → Canvas Rendering (render/)
콜백: onCellEdited, onGridSelectionChange 등 → 사용자 코드
```

**DataEditor 훅 의존성 패턴:**
- `coreState` 기반 (DataEditorCoreState 전체 전달): mouse-handlers, keyboard-handlers, ghost-input, clipboard
- 개별 의존성 전달: 나머지 훅들

**DataGrid 훅 호출 순서:** geometry → renderer → pointerEvents → dragAndDrop → focusAndAccessibility

## 수정 체크리스트

### 새 Props 추가시
1. `data-editor-types.ts`: DataEditorProps에 추가
2. `data-editor.tsx`: 구조 분해 할당에서 추출
3. 해당 훅 파일에 전달 또는 `coreState`에 추가

### 새 셀 타입 추가시
1. `data-grid-types.ts`: GridCellKind enum + 셀 인터페이스 + GridCell 유니온
2. `cells/`: 새 렌더러 파일 생성
3. `data-editor-all.tsx`: 렌더러 등록
4. 타입 가드 함수 업데이트

### 이벤트 핸들러 추가시
1. `event-args.ts`: 이벤트 타입 정의
2. `data-editor-types.ts`: Props에 콜백 추가
3. 해당 훅 파일에 로직 구현:
   - 마우스: `use-mouse-handlers.ts` / 키보드: `use-keyboard-handlers.ts`
   - 클립보드: `use-clipboard.ts` / IME: `use-ghost-input.ts`
   - 선택: `use-handle-select.ts` / 편집: `use-finish-editing.ts`
   - 드래그: `use-hover-handler.ts` / 컬럼: `use-column-callbacks.ts`
4. 공유 상태 필요시 `data-editor-state.ts` 수정
5. 저수준 이벤트: `use-grid-pointer-events.ts` 또는 `use-grid-drag-and-drop.ts`

### 테마 속성 추가시
1. `common/styles.ts`: Theme 인터페이스 + dataEditorBaseTheme 기본값
2. 렌더링 코드에서 사용

## AI 커스텀 기능 (원본 glide-data-grid에 없음)

1. **Row Status 컬럼** (`rowStatus`, `onRowStatus`): A/U/D 상태 표시
2. **Row ID 컬럼** (`rowId`, `onRowId`): 행 ID 표시
3. **Row Number 분리**: `showRowNumber`으로 행 번호와 체크박스 별도 컬럼
4. **GhostInput**: IME 지원을 위한 별도 textarea
5. **부모 스크롤 감지**: 부모 컨테이너 스크롤 시 오버레이 자동 닫기
6. **다중 레벨 그룹 헤더**: 3단 이상 계층적 헤더 지원
