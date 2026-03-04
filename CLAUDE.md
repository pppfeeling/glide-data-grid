# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Glide Data Grid is a canvas-based React data grid component that supports millions of rows with fast scrolling performance. The project is built using a monorepo structure with three packages:

- **`packages/core`** - Main data grid component (`@glideapps/glide-data-grid`)

## Development Commands

### Test Command (Storybook 시각적 테스트)
새로운 기능을 구현한 후 Storybook 예제를 작성하여 시각적으로 확인합니다.

```bash
# 루트 디렉토리에서 Storybook 실행
pnpm start
```

packages/core/src/docs/ - 문서화된 예제
packages/core/src/stories/ - 일반 스토리
예제 파일 작성 후:

Storybook 실행 (npm run start)
브라우저에서 http://localhost:9009 접속
사이드바에서 새로 추가한 스토리 선택하여 확인


### build Commands
```bash
pnpm build        # Build the core package
```


## Architecture

### Canvas-Based Rendering
The data grid uses HTML Canvas for performance, allowing it to handle millions of rows efficiently. Canvas rendering happens in:
- `packages/core/src/internal/data-grid/render/` - Core rendering logic
- `packages/core/src/cells/` - Individual cell renderers

### Key Components
- **`DataEditor`** (`packages/core/src/data-editor/data-editor.tsx`) - Main component orchestrator (1,551 LOC)
- **`DataEditorAll`** (`packages/core/src/data-editor-all.tsx`) - Full-featured version with all dependencies
- **Cell Renderers** (`packages/core/src/cells/`) - Built-in cell types (text, number, image, etc.)

### DataEditor Refactored Architecture
DataEditor는 오케스트레이터 패턴으로 리팩토링되어, 로직이 24개의 커스텀 훅 파일로 추출됨:

**공유 상태/타입:**
- `data-editor-state.ts` (104 LOC) - 공유 상태 인터페이스 (`DataEditorCoreState`)
- `data-editor-types.ts` (703 LOC) - DataEditor Props/타입 정의

**이벤트 핸들러 훅:**
- `use-mouse-handlers.ts` (641 LOC) - 마우스/터치/필 이벤트
- `use-keyboard-handlers.ts` (523 LOC) - 키보드 네비게이션/키바인딩
- `use-clipboard.ts` (409 LOC) - 복사/붙여넣기/잘라내기
- `use-ghost-input.ts` (330 LOC) - IME/GhostInput 핸들러
- `use-handle-select.ts` (366 LOC) - 셀/헤더/행 선택 처리
- `use-finish-editing.ts` (209 LOC) - 편집 완료/값 추출/다음 셀 이동
- `use-hover-handler.ts` (204 LOC) - 드래그 범위 선택/fill handle
- `use-column-callbacks.ts` (94 LOC) - 컬럼 이동/드래그 콜백

**상태/데이터 훅:**
- `use-selection.ts` (91 LOC) - 선택 상태 관리/setGridSelection
- `use-selection-navigation.ts` (305 LOC) - updateSelectedCell/reselect 등 셀 이동
- `use-mangled-props.ts` (85 LOC) - mangledOnCellsEdited/mangledGetGroupDetails
- `use-row-markers.ts` (524 LOC) - 행 마커 설정 파싱/mangledCols/getMangledCellContent
- `use-append-handlers.ts` (191 LOC) - appendRow/appendColumn 처리
- `use-visible-region.ts` (126 LOC) - visible region 갱신/freeze 계산

**UI/렌더링 훅:**
- `use-cell-renderer.ts` (40 LOC) - getCellRenderer 조회
- `use-overlay-editor.ts` (50 LOC) - 편집 오버레이 상태/활성화
- `use-search.ts` (27 LOC) - 검색 UI 상태 관리
- `use-scroll-to.ts` (192 LOC) - scrollTo 함수 구현
- `use-data-editor-ref.ts` (164 LOC) - DataEditorRef (외부 API) 구현

**유틸리티 훅:**
- `use-column-sizer.ts` (253 LOC) - 컬럼 크기 자동 계산
- `use-autoscroll.ts` (41 LOC) - 드래그 시 자동 스크롤
- `use-rem-adjuster.ts` (56 LOC) - rem 단위 스케일링
- `use-initial-scroll-offset.ts` (118 LOC) - 초기 스크롤 위치 설정
- `use-cells-for-selection.ts` (72 LOC) - 범위 셀 데이터 조회

### Package Structure
```
packages/core/src/
├── cells/              # Built-in cell renderers
├── common/             # Shared utilities and styles
├── data-editor/        # Main DataEditor component (refactored)
│   ├── data-editor.tsx           # Orchestrator (1,551 LOC)
│   ├── data-editor-state.ts      # Shared state interfaces (104 LOC)
│   ├── data-editor-types.ts      # Props/type definitions (703 LOC)
│   ├── data-editor-fns.ts        # Editing utilities (251 LOC)
│   ├── use-mouse-handlers.ts     # Mouse/touch/fill events (641 LOC)
│   ├── use-keyboard-handlers.ts  # Keyboard navigation (523 LOC)
│   ├── use-clipboard.ts          # Copy/paste/cut (409 LOC)
│   ├── use-ghost-input.ts        # IME/character input (330 LOC)
│   ├── use-handle-select.ts      # Cell/header/row selection (366 LOC)
│   ├── use-finish-editing.ts     # Edit completion, next cell (209 LOC)
│   ├── use-hover-handler.ts      # Drag range selection (204 LOC)
│   ├── use-column-callbacks.ts   # Column move/drag (94 LOC)
│   ├── use-selection.ts          # Selection state management (91 LOC)
│   ├── use-selection-navigation.ts # Cell navigation/reselect (305 LOC)
│   ├── use-mangled-props.ts      # Mangled callbacks (85 LOC)
│   ├── use-row-markers.ts        # Row markers/mangledCols (524 LOC)
│   ├── use-append-handlers.ts    # Row/column append (191 LOC)
│   ├── use-visible-region.ts     # Visible region updates (126 LOC)
│   ├── use-cell-renderer.ts      # Cell renderer lookup (40 LOC)
│   ├── use-overlay-editor.ts     # Edit overlay state (50 LOC)
│   ├── use-search.ts             # Search UI state (27 LOC)
│   ├── use-scroll-to.ts          # ScrollTo implementation (192 LOC)
│   ├── use-data-editor-ref.ts    # External API (DataEditorRef) (164 LOC)
│   ├── use-column-sizer.ts       # Column auto-sizing (253 LOC)
│   ├── use-autoscroll.ts         # Auto-scroll on drag (41 LOC)
│   ├── use-rem-adjuster.ts       # Rem unit scaling (56 LOC)
│   ├── use-initial-scroll-offset.ts # Initial scroll position (118 LOC)
│   └── use-cells-for-selection.ts # Range cell data (72 LOC)
├── internal/           # Internal components and utilities
└── stories/            # Storybook stories
```

## Analysis Documents

분석 문서는 `.claude/rules/`에 위치하며 `paths` frontmatter를 통해 관련 소스 파일 작업 시 **자동으로 로드**됩니다.

### 항상 로드되는 문서
- `.claude/rules/00-overview.md` - 아키텍처, 컨벤션, 파일 위치, 체크리스트 (통합)

### 조건부 로드 (관련 파일 작업 시 자동)
| 수정 대상 | 참조 문서 |
|-----------|----------|
| DataEditor Props/상태/오케스트레이션 | `02-data-editor.md` |
| 캔버스 컨트롤러 | `03-data-grid.md` |
| 렌더링 파이프라인 | `04-rendering.md` |
| 셀 렌더러 추가/수정 | `05-cells.md` |
| 선택 동작 변경 | `06-selection.md` |
| 편집/복사/붙여넣기 | `07-editing.md` |
| 이벤트 처리 (마우스/키보드) | `08-events.md` |
| 테마 커스터마이징 | `09-theming.md` |
| 데이터 처리 (그룹) | `10-data-processing.md` |
| 확장 포인트 | `11-extension-points.md` |
| 다중 레벨 그룹 헤더 | `12-multi-level-header.md` |
| IME/한글 입력 (GhostInput) | `13-ghost-input-ime.md` |
| NumberCell 키 입력 편집 | `14-numbercell-keystroke-editing-fix.md` |
| 커스텀 렌더러 가이드 | `15-custom-renderer-guide.md` |
| Row Markers (행 마커/상태/ID) | `16-row-markers.md` |
| 스크롤링/가상화/DnD | `17-scrolling-and-virtualization.md` |
| 검색 UI/오버레이 에디터 | `18-search-and-overlay-editor.md` |
| 애니메이션/Blit/성능 | `19-animation-and-performance.md` |

### analyze/에 남아있는 참고 자료
- `analyze/API.md` - 전체 API 레퍼런스 (대용량, 필요 시 직접 참조)
- `analyze/glide-data-grid-core-사용자가이드.md` - 사용자 가이드
- `analyze/learning/` - 튜토리얼 콘텐츠

### When to Use
1. **새 기능 추가 전**: 관련 문서에서 기존 패턴 확인 (자동 로드됨)
2. **버그 수정 시**: 해당 모듈의 데이터 흐름과 의존성 파악
3. **타입 에러 발생 시**: `01-types.md`에서 정확한 타입 확인
4. **코드 위치 찾기**: `00-overview.md`의 파일 위치 참조