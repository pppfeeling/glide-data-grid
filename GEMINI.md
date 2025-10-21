# GEMINI.md

- This file provides guidance to gemini when working with code in this repository.
- 답변은 용어는 영어로 나머지 설명은  **한국어**로 해주세요


## Project Overview

Glide Data Grid is a canvas-based React data grid component that supports millions of rows with fast scrolling performance. The project is built using a monorepo structure with three packages:

- **`packages/core`** - Main data grid component (`@glideapps/glide-data-grid`)
- **`packages/cells`** - Additional cell renderers (`@glideapps/glide-data-grid-cells`)
- **`packages/source`** - Data source utilities (`@glideapps/glide-data-grid-source`)

## Development Commands

### Primary Commands

- **`npm run storybook`** - Start development environment with Storybook and watch mode
- **`npm run build`** - Build all packages and run linting
- **`npm test`** - Run tests for core package
- **`npm run test-18`** - Run tests with React 18
- **`npm run test-19`** - Run tests with React 19

### Package-Specific Commands

```bash
# Core package
cd packages/core
npm run build        # Build the core package
npm run lint         # Run ESLint and cycle checks
npm run test         # Run tests with Vitest
npm run watch        # Watch for changes and rebuild

# Cells package
cd packages/cells
npm run build        # Build cells package
npm run lint         # Run ESLint
npm run test         # Run tests

# Source package
cd packages/source
npm run build        # Build source package
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Testing Commands

- **`npm run test-source`** - Test source package
- **`npm run test-cells`** - Test cells package
- **`npm run test-projects`** - Test integration projects

## Architecture

### Canvas-Based Rendering

The data grid uses HTML Canvas for performance, allowing it to handle millions of rows efficiently. Canvas rendering happens in:

- `packages/core/src/internal/data-grid/render/` - Core rendering logic
- `packages/core/src/cells/` - Individual cell renderers

### Key Components

- **`DataEditor`** (`packages/core/src/data-editor/data-editor.tsx`) - Main component wrapper
- **`DataEditorAll`** (`packages/core/src/data-editor-all.tsx`) - Full-featured version with all dependencies
- **Cell Renderers** (`packages/core/src/cells/`) - Built-in cell types (text, number, image, etc.)

### Package Structure

```
packages/core/src/
├── cells/              # Built-in cell renderers
├── common/             # Shared utilities and styles
├── data-editor/        # Main DataEditor component
├── internal/           # Internal components and utilities
└── stories/            # Storybook stories
```
#### packages/core/src 파일 분석

  - cells

   - boolean-cell.tsx: boolean 타입 셀의 렌더링 및 상호작용(클릭, 편집) 로직을 정의합니다.
   - bubble-cell.tsx: 여러 개의 텍스트 버블을 표시하는 bubble 타입 셀의 렌더링 로직을 정의합니다.
   - cell-types.ts: 모든 셀 렌더러가 구현해야 하는 CellRenderer 인터페이스와 관련 타입을 정의합니다.
   - drilldown-cell.tsx: 이미지와 텍스트로 구성된 계층 구조(drilldown) 셀의 렌더링 로직을 정의합니다.
   - image-cell.tsx: 이미지 갤러리 형태의 image 타입 셀 렌더링 및 편집 로직을 정의합니다.
   - index.ts: 모든 내장 셀 렌더러를 AllCellRenderers 배열로 모아서 내보냅니다.
   - loading-cell.tsx: 데이터 로딩 중임을 나타내는 스켈레톤 UI를 그리는 loading 타입 셀을 정의합니다.
   - markdown-cell.tsx: 마크다운 텍스트를 렌더링하고 편집하는 markdown 타입 셀을 정의합니다.
   - marker-cell.tsx: 행 번호나 체크박스를 표시하는 행 마커 셀의 렌더링 및 상호작용 로직을 정의합니다.
   - new-row-cell.tsx: 새로운 행 추가를 위한 UI를 표시하는 특수 목적의 셀을 정의합니다.
   - number-cell.tsx: 숫자 데이터의 렌더링 및 편집을 처리하는 number 타입 셀을 정의합니다.
   - protected-cell.tsx: 읽기 전용의 보호된 데이터를 시각적으로 표시하는 protected 타입 셀을 정의합니다.
   - row-id-cell.tsx: 고유 행 ID를 표시하는 row-id 타입 셀의 렌더링 및 편집 로직을 정의합니다.
   - text-cell.tsx: 가장 기본적인 text 타입 셀의 렌더링, 편집, 줄 바꿈 처리 로직을 정의합니다.
   - uri-cell.tsx: 클릭 가능한 하이퍼링크를 표시하는 uri 타입 셀의 렌더링 및 상호작용 로직을 정의합니다.

  - common

   - browser-detect.ts: 지연 평가(lazy evaluation)를 사용하여 브라우저(Firefox, Safari) 및 운영 체제(OSX)를 감지하는 유틸리티를 제공합니다.
   - image-window-loader.ts: 그리드의 보이는 영역 내의 이미지만 효율적으로 로드하고 캐시 및 해제하는 클래스를 구현합니다.
   - is-hotkey.ts: 키보드 이벤트가 지정된 단축키 조합과 일치하는지 확인하는 유틸리티 함수를 제공합니다.
   - math.ts: 사각형(Rectangle)의 교차, 포함, 결합 등 기하학적 계산 관련 유틸리티 함수들을 제공합니다.
   - render-state-provider.ts: 셀의 렌더링 상태를 관리하고, 보이는 영역 밖의 상태를 정리하여 메모리를 최적화하는 클래스를 제공합니다.
   - resize-detector.ts: ResizeObserver를 사용하여 DOM 요소의 크기 변화를 감지하는 React Hook을 제공합니다.
   - styles.ts: 그리드의 기본 테마와 커스텀 테마를 생성하고 관리하는 함수 및 React Context를 정의합니다.
   - support.ts: assert, deepEqual 등 개발 편의성을 위한 타입 검사 및 유틸리티 함수를 제공합니다.
   - utils.tsx: 이벤트 리스너 등록, 디바운스된 메모이제이션, 스크롤바 너비 계산 등 다양한 React Hook과 유틸리티 함수를 제공합니다.

  - data-editor

   - data-editor-all.tsx: 모든 내장 셀 렌더러와 아이콘을 포함하여 DataEditor를 감싸는 완전한 기능의 컴포넌트를 제공합니다.
   - copy-paste.ts: 그리드 셀 데이터를 텍스트 및 HTML 형식으로 클립보드에 복사하고 붙여넣기 위한 인코딩/디코딩 로직을 처리합니다.
   - data-editor-fns.ts: 그리드 선택 영역 확장, 붙여넣기 데이터 파싱, 클립보드 복사 등 데이터 편집과 관련된 헬퍼 함수들을 제공합니다.
   - data-editor-keybindings.ts: 그리드의 다양한 동작(이동, 선택, 편집 등)에 대한 기본 및 사용자 정의 키보드 단축키를 관리합니다.
   - data-editor.tsx: 그리드의 핵심 로직을 포함하는 메인 DataEditor 컴포넌트로, 상태 관리, 이벤트 처리, 렌더링 오케스트레이션을 담당합니다.
   - group-rename.tsx: 컬럼 그룹의 이름을 변경할 때 나타나는 입력 오버레이 컴포넌트를 정의합니다.
   - row-grouping-api.ts: 행 그룹화 상태를 관리하고, 특정 경로의 그룹을 업데이트하거나 가져오는 API를 제공하는 React Hook을 구현합니다.
   - row-grouping.ts: 행 그룹화 옵션을 기반으로 계층적인 그룹 구조를 평탄화하고, 그리드 인덱스와 실제 데이터 인덱스를 매핑하는 로직을 처리합니다.
   - use-autoscroll.ts: 마우스 드래그 시 그리드 가장자리에서 자동으로 스크롤되는 동작을 구현하는 React Hook입니다.
   - use-cells-for-selection.ts: 사용자가 선택한 영역의 셀 데이터를 가져오는 로직을 관리하며, 필요 시 getCellContent를 이용한 기본 구현을 제공합니다.
   - use-column-sizer.ts: 컬럼의 내용물을 측정하여 자동으로 컬럼 너비를 계산하고 조절하는 React Hook을 구현합니다.
   - use-initial-scroll-offset.ts: 그리드가 처음 렌더링될 때 지정된 스크롤 오프셋으로 위치를 설정하는 React Hook입니다.
   - use-rem-adjuster.ts: rem 단위에 맞춰 그리드의 주요 UI 요소(행 높이, 헤더 높이 등) 크기를 동적으로 조절하는 React Hook입니다.
   - visible-region.ts: 현재 화면에 보이는 그리드 영역의 좌표와 크기를 정의하는 타입을 명시합니다.

  -  docs

   - 00-faq.stories.tsx: 그리드 사용 시 자주 묻는 질문(FAQ)에 대한 Storybook 문서 페이지를 정의합니다.
   - 01-getting-started.stories.tsx: 그리드의 기본적인 사용법을 안내하는 Storybook 문서 페이지를 정의합니다.
   - 02-editing-data.stories.tsx: 데이터 편집 방법을 안내하는 Storybook 문서 페이지를 정의합니다.
   - 03-grid-column.stories.tsx: GridColumn의 기본 속성과 아이콘, 테마 적용 방법을 설명하는 Storybook 문서 페이지를 정의합니다.
   - 04-streaming-data.stories.tsx: 실시간 데이터 업데이트 및 시각적 하이라이트 방법을 설명하는 Storybook 문서 페이지를 정의합니다.
   - 05-copy-paste.stories.tsx: 복사 및 붙여넣기 기능 활성화 및 사용법을 안내하는 Storybook 문서 페이지를 정의합니다.
   - 06-search.stories.tsx: 내장 검색 기능의 활성화 및 사용법을 안내하는 Storybook 문서 페이지를 정의합니다.
   - 07-column-grouping.stories.tsx: 컬럼을 그룹으로 묶는 방법을 설명하는 Storybook 문서 페이지를 정의합니다.
   - 08-theming.stories.tsx: 그리드의 다양한 레벨(전역, 컬럼, 행, 셀)에 테마를 적용하는 방법을 설명하는 Storybook 문서 페이지를 정의합니다.
   - 09-menus.stories.tsx: 헤더 메뉴를 추가하고 이벤트를 처리하는 방법을 설명하는 Storybook 문서 페이지를 정의합니다.
   - LEARNING_PLATFORM_GUIDE.md: Storybook에 구축된 인터랙티브 학습 플랫폼의 구조, 기능, 사용법을 안내하는 마크다운 문서입니다.
   - doc-wrapper.tsx: Storybook 문서 페이지의 일관된 레이아웃과 스타일을 제공하는 래퍼 컴포넌트들을 정의합니다.
   - examples/add-column.stories.tsx: 동적으로 컬럼을 추가하고 제거하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/add-data-to-middle.stories.tsx: 그리드 중간에 새로운 행을 삽입하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/add-data-to-top.stories.tsx: 그리드 상단에 새로운 행을 추가하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/add-data.stories.tsx: 트레일링 로우를 사용하여 그리드에 데이터를 추가하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/all-cell-kinds.stories.tsx: 지원되는 모든 종류의 셀 타입을 시연하는 Storybook 스토리입니다.
   - examples/append-row-handle.stories.tsx: 외부 핸들을 통해 프로그래밍 방식으로 행을 추가하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/automatic-row-markers.stories.tsx: 자동 행 마커 및 관련 선택 동작을 시연하는 Storybook 스토리입니다.
   - examples/built-in-search.stories.tsx: 내장된 검색 UI의 활성화 및 사용법을 보여주는 Storybook 스토리입니다.
   - examples/cell-activated-event.stories.tsx: 셀 활성화 이벤트(onCellActivated)의 동작을 시연하는 Storybook 스토리입니다.
   - examples/cell-borders.stories.tsx: 셀 테두리를 수동 또는 자동으로 제어하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/column-group-collapse.stories.tsx: 컬럼 그룹을 접고 펼치는 기능을 구현한 예제를 보여주는 Storybook 스토리입니다.
   - examples/column-groups.stories.tsx: 컬럼을 그룹으로 묶어 계층적인 헤더를 만드는 방법을 보여주는 Storybook 스토리입니다.
   - examples/content-alignment.stories.tsx: 셀 내부 콘텐츠의 가로 정렬(왼쪽, 중앙, 오른쪽) 방법을 보여주는 Storybook 스토리입니다.
   - examples/controlled-search.stories.tsx: 검색 결과를 외부에서 제어하여 커스텀 검색 로직을 구현하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/controlled-selection.stories.tsx: 그리드의 선택 상태를 외부에서 제어하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/copy-support.stories.tsx: 클립보드로 데이터를 복사하는 기능을 시연하는 Storybook 스토리입니다.
   - examples/custom-editors.stories.tsx: 특정 셀에 대한 사용자 정의 편집기를 제공하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/custom-event-target.stories.tsx: 기본 window 대신 커스텀 DOM 요소를 이벤트 타겟으로 사용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/custom-header-icons.stories.tsx: 헤더에 사용자 정의 아이콘을 등록하고 사용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/custom-header.stories.tsx: drawHeader 콜백을 사용하여 헤더를 직접 그려 커스터마이징하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/custom-renderers.stories.tsx: 기본 셀 렌더러를 오버라이드하여 커스텀 렌더링을 구현하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/drag-source.stories.tsx: 그리드 셀 또는 헤더를 HTML 드래그 앤 드롭 소스로 사용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/drop-events.stories.tsx: 파일 등 외부 데이터를 그리드 셀 위로 드롭할 때의 이벤트를 처리하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/fill-handle.stories.tsx: Excel처럼 셀의 채우기 핸들을 드래그하여 데이터를 복사하는 기능을 시연하는 Storybook 스토리입니다.
   - examples/freeze-columns.stories.tsx: 스크롤 시 특정 컬럼들을 왼쪽에 고정시키는 방법을 보여주는 Storybook 스토리입니다.
   - examples/freeze-rows.stories.tsx: 스크롤 시 특정 행들을 하단에 고정시키는 방법을 보여주는 Storybook 스토리입니다.
   - examples/get-mouse-args.stories.tsx: 마우스 좌표를 그리드 내의 위치 정보로 변환하는 getMouseArgsForPosition API 사용법을 보여주는 Storybook 스토리입니다.
   - examples/header-menus.stories.tsx: 헤더에 메뉴 버튼을 표시하고 클릭 이벤트를 처리하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/highlight-cells.stories.tsx: 특정 셀 영역을 시각적으로 강조하는 highlightRegions prop의 사용법을 보여주는 Storybook 스토리입니다.
   - examples/imperative-scroll.stories.tsx: scrollTo API를 사용하여 특정 셀로 프로그래밍 방식으로 스크롤하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/input-blending.stories.tsx: 행, 열, 범위 선택 간의 혼합 동작을 제어하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/keybindings.stories.tsx: 그리드의 키보드 단축키를 사용자 정의하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/layout-integration.stories.tsx: 다양한 웹 페이지 레이아웃에 그리드를 통합하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/multi-select-columns.stories.tsx: 여러 컬럼을 동시에 선택하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/new-column-button.stories.tsx: 그리드 오른쪽에 '새 컬럼 추가' 버튼과 같은 커스텀 UI를 추가하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/obscured-grid.stories.tsx: 다른 UI 요소에 의해 일부가 가려진 상태에서의 그리드 동작을 테스트하는 Storybook 스토리입니다.
   - examples/observe-visible-region.stories.tsx: 스크롤에 따라 현재 화면에 보이는 셀의 범위를 추적하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/one-hundred-thousand-columns.stories.tsx: 10만 개의 많은 컬럼을 렌더링하는 성능을 시연하는 Storybook 스토리입니다.
   - examples/one-million-rows.stories.tsx: 100만 개의 많은 행을 렌더링하는 성능을 시연하는 Storybook 스토리입니다.
   - examples/overscroll.stories.tsx: 그리드의 끝을 넘어서 스크롤할 수 있는 추가 공간을 설정하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/padding.stories.tsx: 그리드의 오른쪽과 하단에 내부 여백을 추가하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/paste-support.stories.tsx: 클립보드의 데이터를 그리드에 붙여넣는 기능을 시연하는 Storybook 스토리입니다.
   - examples/prevent-diagonal-scroll.stories.tsx: 대각선 스크롤을 방지하여 수직 또는 수평 스크롤만 가능하게 하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/rapid-updates.stories.tsx: 대량의 셀 데이터를 실시간으로 빠르게 업데이트하는 성능을 시연하는 Storybook 스토리입니다.
   - examples/rearrange-columns.stories.tsx: 드래그 앤 드롭으로 컬럼 순서를 변경하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/reorder-rows.stories.tsx: 드래그 앤 드롭으로 행 순서를 변경하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/resizable-columns.stories.tsx: 사용자가 컬럼의 너비를 조절할 수 있게 하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/right-element.stories.tsx: 그리드 오른쪽에 고정되거나 스크롤되는 커스텀 UI 요소를 추가하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/right-to-left.stories.tsx: 오른쪽에서 왼쪽으로 쓰는 언어(RTL)를 지원하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/row-and-header-sizes.stories.tsx: 행과 헤더의 높이를 조절하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/row-grouping.stories.tsx: 행을 그룹으로 묶고 접는 기능을 구현하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/row-hover.stories.tsx: 마우스를 올렸을 때 해당 행을 강조하는 효과를 구현하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/row-markers.stories.tsx: 행의 시작 부분에 숫자나 체크박스 같은 마커를 표시하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/row-selections.stories.tsx: 단일 또는 다중 행 선택 기능을 활성화하고 제어하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/scaled-view.stories.tsx: CSS transform을 사용하여 그리드 전체를 확대/축소하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/scroll-offset.stories.tsx: 그리드가 로드될 때 초기 스크롤 위치를 설정하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/scroll-shadows.stories.tsx: 스크롤 시 그리드 가장자리에 그림자 효과를 표시하거나 숨기는 방법을 보여주는 Storybook 스토리입니다.
   - examples/search-as-filter.stories.tsx: 검색 기능을 사용하여 그리드의 데이터를 필터링하는 예제를 보여주는 Storybook 스토리입니다.
   - examples/selection-serialization.stories.tsx: 그리드의 선택 상태를 직렬화하여 저장하고 복원하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/server-side-data.stories.tsx: 서버로부터 데이터를 페이지 단위로 비동기적으로 로드하는 방법을 구현한 예제를 보여주는 Storybook 스토리입니다.
   - examples/shadow-dom.stories.tsx: Shadow DOM 내에서 그리드를 렌더링하고 사용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/silly-numbers.stories.tsx: 1억 개의 행과 같이 매우 큰 데이터셋을 다루는 그리드의 한계와 성능을 테스트하는 Storybook 스토리입니다.
   - examples/small-editable-grid.stories.tsx: 기본적인 편집 기능이 활성화된 작은 크기의 그리드 예제를 보여주는 Storybook 스토리입니다.
   - examples/smooth-scrolling-grid.stories.tsx: 부드러운 스크롤링 효과를 활성화/비활성화하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/span-cell.stories.tsx: 여러 셀을 병합하여 하나의 큰 셀처럼 보이게 하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/stretch-column-size.stories.tsx: 컬럼이 그리드의 가용 너비에 맞게 자동으로 늘어나는 'grow' 속성 사용법을 보여주는 Storybook 스토리입니다.
   - examples/ten-million-cells.stories.tsx: 천만 개의 셀을 렌더링하는 성능을 시연하는 Storybook 스토리입니다.
   - examples/theme-per-column.stories.tsx: 각 컬럼별로 다른 테마를 적용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/theme-per-row.stories.tsx: 각 행별로 다른 테마를 적용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/theme-support.stories.tsx: 그리드에 라이트/다크 등 다양한 테마를 적용하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/tooltips.stories.tsx: 셀에 마우스를 올렸을 때 툴팁을 표시하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/trailing-row-options.stories.tsx: 그리드 마지막의 '새 행 추가' 영역을 컬럼별로 커스터마이징하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/uneven-rows.stories.tsx: 각 행의 높이를 다르게 설정하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/validate-data.stories.tsx: 셀 편집 시 입력된 데이터의 유효성을 검사하는 방법을 보여주는 Storybook 스토리입니다.
   - examples/wrapping-text.stories.tsx: 셀 안의 텍스트가 길어질 때 자동으로 줄바꿈하는 방법을 보여주는 Storybook 스토리입니다.
   - learning/01-getting-started.md: 그리드 기본 개념과 필수 기능을 학습하기 위한 마크다운 문서입니다.
   - learning/02-data-manipulation.md: 데이터 추가, 수정, 검증 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/03-customization-theming.md: 그리드 외관과 스타일 커스터마이징 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/04-search-filter.md: 데이터 검색 및 필터링 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/05-selection-interaction.md: 사용자 선택 및 상호작용 처리 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/06-layout-structure.md: 그리드 레이아웃과 구조 제어 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/07-copy-paste-drag.md: 클립보드 및 드래그 앤 드롭 기능 학습을 위한 마크다운 문서입니다.
   - learning/08-advanced-controls.md: 그리드의 고급 컨트롤 기능 학습을 위한 마크다운 문서입니다.
   - learning/09-scrolling-navigation.md: 스크롤 및 네비게이션 제어 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/10-performance.md: 대용량 데이터 처리 및 성능 최적화 방법을 학습하기 위한 마크다운 문서입니다.
   - learning/11-integration-advanced.md: 고급 통합 시나리오 및 특수 사용 사례 학습을 위한 마크다운 문서입니다.
   - template.tsx: Storybook 문서 페이지를 만들기 위한 템플릿 파일입니다.

  - internal

   - click-outside-container.tsx: 특정 요소의 외부 클릭을 감지하여 콜백을 실행하는 React 컴포넌트를 구현합니다.
   - data-editor-container/data-grid-container.tsx: 그리드 컴포넌트를 감싸는 기본 컨테이너 스타일을 정의합니다.
   - data-grid-dnd/data-grid-dnd.tsx: 그리드의 드래그 앤 드롭(행/컬럼 이동, 리사이즈) 관련 로직과 상태를 관리하는 컴포넌트입니다.
   - data-grid-overlay-editor/data-grid-overlay-editor-style.tsx: 셀 편집 시 나타나는 오버레이 에디터의 기본 스타일을 정의합니다.
   - data-grid-overlay-editor/data-grid-overlay-editor.tsx: 셀 편집을 위한 오버레이를 생성하고, 커스텀 에디터를 렌더링하며, 편집 완료 및 취소 로직을 처리합니다.
   - data-grid-overlay-editor/private/bubbles-overlay-editor-style.tsx: 버블 셀 오버레이 에디터의 스타일을 정의합니다.
   - data-grid-overlay-editor/private/bubbles-overlay-editor.tsx: 버블 셀의 읽기 전용 오버레이 에디터 컴포넌트를 구현합니다.
   - data-grid-overlay-editor/private/drilldown-overlay-editor.tsx: 드릴다운 셀의 읽기 전용 오버레이 에디터 컴포넌트를 구현합니다.
   - data-grid-overlay-editor/private/image-overlay-editor-style.tsx: 이미지 셀 오버레이 에디터의 스타일을 정의합니다.
   - data-grid-overlay-editor/private/image-overlay-editor.tsx: 이미지 셀의 오버레이 에디터로, 캐러셀을 사용하여 여러 이미지를 보여줍니다.
   - data-grid-overlay-editor/private/markdown-overlay-editor-style.tsx: 마크다운 셀 오버레이 에디터의 스타일을 정의합니다.
   - data-grid-overlay-editor/private/markdown-overlay-editor.tsx: 마크다운 셀의 편집 및 미리보기 모드를 전환할 수 있는 오버레이 에디터를 구현합니다.
   - data-grid-overlay-editor/private/number-overlay-editor-style.tsx: 숫자 셀 오버레이 에디터의 스타일을 정의합니다.
   - data-grid-overlay-editor/private/number-overlay-editor.tsx: 숫자 형식 입력을 위한 오버레이 에디터 컴포넌트를 구현합니다.
   - data-grid-overlay-editor/private/uri-overlay-editor-style.tsx: URI 셀 오버레이 에디터의 스타일을 정의합니다.
   - data-grid-overlay-editor/private/uri-overlay-editor.tsx: URI(링크)를 편집하거나 열 수 있는 오버레이 에디터를 구현합니다.
   - data-grid-overlay-editor/use-stay-on-screen.ts: 오버레이 에디터가 화면을 벗어나지 않도록 위치를 동적으로 조절하는 React Hook입니다.
   - data-grid-search/data-grid-search-style.tsx: 그리드 내장 검색창의 스타일을 정의합니다.
   - data-grid-search/data-grid-search.tsx: 그리드 내장 검색 기능의 UI 및 상태 관리, 검색 로직 실행을 담당하는 컴포넌트입니다.
   - data-grid/animation-manager.ts: 셀 호버(hover) 시의 애니메이션 효과를 관리하는 클래스를 구현합니다.
   - data-grid/cell-set.ts: 그리드 셀의 집합을 효율적으로 관리하기 위한 Set 기반의 자료구조를 제공합니다.
   - data-grid/color-parser.ts: CSS 색상 문자열을 파싱하고, 색상을 혼합하거나 투명도를 조절하는 유틸리티 함수를 제공합니다.
   - data-grid/data-grid-sprites.ts: 헤더 아이콘과 같은 SVG 스프라이트를 관리하고 캔버스에 그리는 SpriteManager 클래스를 구현합니다.
   - data-grid/data-grid-types.ts: 그리드에서 사용되는 핵심적인 타입(GridCell, GridColumn, GridSelection 등)들을 정의합니다.
   - data-grid/data-grid.stories.tsx: 내부 DataGrid 컴포넌트의 다양한 상태를 테스트하기 위한 Storybook 스토리입니다.
   - data-grid/data-grid.tsx: 스크롤링, 렌더링, 이벤트 처리 등 그리드의 핵심 로우레벨 로직을 담당하는 주 캔버스 렌더링 컴포넌트입니다.
   - data-grid/event-args.ts: 그리드에서 발생하는 다양한 마우스 및 키보드 이벤트의 인자 타입을 정의합니다.
   - data-grid/image-window-loader-interface.ts: 이미지 로더가 구현해야 할 인터페이스를 정의합니다.
   - data-grid/render/data-grid-lib.ts: 그리드 렌더링에 필요한 좌표 계산, 텍스트 측정, 도형 그리기 등 핵심 유틸리티 함수들을 제공합니다.
   - data-grid/render/data-grid-render.blit.ts: 스크롤 시 화면의 일부를 복사하여 다시 그리는 'blit' 최적화 관련 함수들을 구현합니다.
   - data-grid/render/data-grid-render.cells.ts: 개별 셀을 그리고, 상태에 따라 스타일(배경색, 하이라이트 등)을 적용하는 로직을 담당합니다.
   - data-grid/render/data-grid-render.header.ts: 그리드의 컬럼 및 그룹 헤더를 그리는 로직을 담당합니다.
   - data-grid/render/data-grid-render.lines.ts: 그리드의 수평 및 수직 구분선을 그리는 로직을 담당합니다.
   - data-grid/render/data-grid-render.ts: 그리드의 전체 렌더링 과정을 총괄하며, 헤더, 셀, 라인, 오버레이 등을 순서대로 그립니다.
   - data-grid/render/data-grid.render.rings.ts: 포커스 링, 하이라이트 영역, 채우기 핸들 등 그리드 위에 그려지는 외곽선 및 링 관련 렌더링을 담당합니다.
   - data-grid/render/draw-checkbox.ts: boolean 및 marker 셀에서 사용되는 체크박스를 그리는 함수를 제공합니다.
   - data-grid/render/draw-edit-hover-indicator.ts: 편집 가능한 셀에 마우스를 올렸을 때 나타나는 시각적 표시기를 그리는 함수를 제공합니다.
   - data-grid/sprites.ts: 그리드에서 사용되는 모든 기본 SVG 아이콘의 정의를 포함합니다.
   - data-grid/use-animation-queue.ts: 셀의 애니메이션 업데이트를 효율적으로 처리하기 위한 큐를 관리하는 React Hook입니다.
   - data-grid/use-selection-behavior.ts: 다양한 선택 모드(단일, 다중, 혼합)에 따른 그리드의 선택 동작을 관리하는 React Hook입니다.
   - growing-entry/growing-entry-style.tsx: 텍스트 입력에 따라 자동으로 크기가 조절되는 GrowingEntry 컴포넌트의 스타일을 정의합니다.
   - growing-entry/growing-entry.tsx: 여러 줄 텍스트 편집 시 내용에 따라 높이가 자동으로 조절되는 텍스트 입력 컴포넌트를 구현합니다.
   - markdown-div/markdown-div.tsx: 마크다운 문자열을 HTML로 변환하여 안전하게 렌더링하는 React 컴포넌트입니다.
   - markdown-div/private/markdown-container.tsx: 마크다운 콘텐츠를 담는 컨테이너의 스타일을 정의합니다.
   - scrolling-data-grid/infinite-scroller.tsx: 브라우저의 DOM 요소 높이 제한을 초과하는 매우 큰 데이터셋을 지원하기 위한 가상 스크롤 로직을 구현합니다.
   - scrolling-data-grid/scrolling-data-grid.stories.tsx: 내부 ScrollingDataGrid 컴포넌트의 스크롤 동작을 테스트하기 위한 Storybook 스토리입니다.
   - scrolling-data-grid/scrolling-data-grid.tsx: InfiniteScroller와 DataGridDnd를 결합하여 스크롤 가능한 그리드 환경을 구성하는 컴포넌트입니다.
   - scrolling-data-grid/use-kinetic-scroll.ts: 모바일 환경 등에서 터치 스크롤 시 관성 효과를 구현하는 React Hook입니다.


### Build System

- Uses **TypeScript** with dual ESM/CJS output
- **Linaria** for CSS-in-JS with zero-runtime CSS extraction
- **Vitest** for testing
- Custom build scripts in `config/build-util.sh` for parallel ESM/CJS compilation

### Cell System

Custom cells must use Canvas rendering. Built-in cells include:

- Text, Number, Boolean, Image
- Markdown, URI, Drilldown
- Bubble, Loading, Protected
- Row ID, Marker, New Row

New cells should be added to the `packages/cells` package with React.lazy for code splitting when requiring third-party dependencies.

## Code Style

### Linting

- **ESLint** with TypeScript, React, SonarJS, and Unicorn plugins
- **Prettier** with 4-space indentation, 120 character line width
- Strict TypeScript configuration with `noImplicitAny` and `strict: true`

### Key ESLint Rules

- `@typescript-eslint/no-floating-promises: error` - Async promises must be handled
- `@typescript-eslint/strict-boolean-expressions: error` - Strict boolean checks
- `eqeqeq: always` - Always use strict equality
- `no-console: warn` - Console usage discouraged

## Testing

The project uses **Vitest** for testing with **React Testing Library**. Canvas rendering tests use `vitest-canvas-mock`.

### Test Structure

```bash
# Run all tests
npm test

# Test specific React versions
npm run test-18  # React 18
npm run test-19  # React 19

# Test individual packages
npm run test-source
npm run test-cells
```

## Integration Projects

Test projects demonstrate integration with different frameworks:

- `test-projects/cra5-gdg` - Create React App 5
- `test-projects/next-gdg` - Next.js integration

Run with: `npm run test-projects`

## Debugging with Storybook

When `npm run storybook` is not available, visual verification can be done by assuming the Storybook server is running on `http://localhost:9009`.

Use a Chrome DevTools debugging instance to view stories. The URL for a story can be constructed from its title. For example, the `add-columns` story can be viewed at:

`http://localhost:9009/?path=/story/glide-data-grid-dataeditor-demos--add-columns`

To debug a different story, replace `add-columns` with the story's name in the URL.

## Analysis

For a detailed analysis of specific files and features, please see [Analazy.md](./Analazy.md).

# API 문서
For a detailed analysis of specific features, please see
**[api.md](C:\workspace\glide-data-grid\packages\core\API.md)**