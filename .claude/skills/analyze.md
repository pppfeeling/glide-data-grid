---
description: |
  Glide Data Grid 분석 문서 조회.
  참고: 대부분의 분석 문서는 `.claude/rules/`로 이관되어 paths 기반으로 자동 로드됩니다.
  이 skill은 자동 로드되지 않는 문서(API.md, 사용자가이드)나 특정 문서를 명시적으로 조회할 때 사용합니다.
  키워드: cell, selection, editing, event, theme, rendering, IME, 한글, boolean, number, header, scroll, animation
---

# /analyze Skill

Glide Data Grid의 분석 문서를 조회합니다. 대부분의 문서는 `.claude/rules/`에서 `paths` 기반으로 **자동 로드**되므로, 이 skill의 사용 빈도는 낮습니다. 자동 로드되지 않는 대용량 참고 자료나 특정 문서를 명시적으로 조회할 때 사용하세요.

## 빠른 문서 매핑

| 작업 영역 | 문서 위치 | 자동 로드 |
|-----------|----------|----------|
| DataEditor Props/상태 | `.claude/rules/02-data-editor.md` | O |
| 캔버스/저수준 이벤트 | `.claude/rules/03-data-grid.md` | O |
| 셀 렌더러 | `.claude/rules/05-cells.md` | O |
| 커스텀 렌더러 | `.claude/rules/15-custom-renderer-guide.md` | O |
| 선택/네비게이션 | `.claude/rules/06-selection.md` | O |
| 편집/복사/붙여넣기 | `.claude/rules/07-editing.md` | O |
| 이벤트 핸들링 | `.claude/rules/08-events.md` | O |
| IME/한글 입력 | `.claude/rules/13-ghost-input-ime.md` | O |
| Boolean 셀 키보드 | `.claude/rules/boolean-cell-keyboard-navigation.md` | O |
| Number 셀 Enter | `.claude/rules/number-cell-enter-key-navigation.md` | O |
| 다중 레벨 헤더 | `.claude/rules/12-multi-level-header.md` | O |
| Row Markers | `.claude/rules/16-row-markers.md` | O |
| 스크롤/가상화/DnD | `.claude/rules/17-scrolling-and-virtualization.md` | O |
| 검색/오버레이 에디터 | `.claude/rules/18-search-and-overlay-editor.md` | O |
| 애니메이션/Blit/성능 | `.claude/rules/19-animation-and-performance.md` | O |
| **API 레퍼런스** | `analyze/API.md` | X (대용량) |
| **사용자 가이드** | `analyze/glide-data-grid-core-사용자가이드.md` | X |

## 동작 지침

1. 인자 없이 호출된 경우:
   - `.claude/rules/00-overview.md` 읽기
   - 전체 문서 목록과 역할 요약 제공

2. 특정 키워드로 호출된 경우:
   - 키워드에 맞는 문서 매핑:
     - `types`, `타입` → `.claude/rules/01-types.md`
     - `editor`, `데이터에디터` → `.claude/rules/02-data-editor.md`
     - `grid`, `그리드` → `.claude/rules/03-data-grid.md`
     - `render`, `렌더링` → `.claude/rules/04-rendering.md`
     - `cell`, `셀` → `.claude/rules/05-cells.md`
     - `custom renderer`, `커스텀렌더러` → `.claude/rules/15-custom-renderer-guide.md`
     - `selection`, `선택` → `.claude/rules/06-selection.md`
     - `edit`, `편집`, `paste`, `copy` → `.claude/rules/07-editing.md`
     - `event`, `이벤트` → `.claude/rules/08-events.md`
     - `theme`, `테마`, `style` → `.claude/rules/09-theming.md`
     - `data`, `group`, `그룹` → `.claude/rules/10-data-processing.md`
     - `extension`, `확장` → `.claude/rules/11-extension-points.md`
     - `header`, `multi-level`, `그룹헤더` → `.claude/rules/12-multi-level-header.md`
     - `ghost`, `ime`, `한글` → `.claude/rules/13-ghost-input-ime.md`, `.claude/rules/ghost-input-ime-fixes.md`
     - `boolean`, `체크박스` → `.claude/rules/boolean-cell-keyboard-navigation.md`
     - `number`, `숫자셀` → `.claude/rules/number-cell-enter-key-navigation.md`
     - `rowMarker`, `marker`, `rowStatus`, `rowId`, `행마커` → `.claude/rules/16-row-markers.md`
     - `scroll`, `스크롤`, `virtualization`, `dnd` → `.claude/rules/17-scrolling-and-virtualization.md`
     - `search`, `검색`, `overlay`, `오버레이` → `.claude/rules/18-search-and-overlay-editor.md`
     - `animation`, `blit`, `ring`, `성능` → `.claude/rules/19-animation-and-performance.md`
     - `api` → `analyze/API.md`
     - `quick`, `빠른`, `reference` → `.claude/rules/quick-reference.md`
   - 해당 문서 읽기
   - 핵심 내용 요약 제공

3. 키워드 매칭이 안되는 경우:
   - `.claude/rules/` 폴더 내 모든 문서에서 키워드 검색
   - 관련 섹션 찾아서 제공

## 출력 형식

```
## [문서 제목]

### 핵심 요약
- [주요 내용 3-5개]

### 관련 파일
| 파일 | 위치 | 용도 |
|------|------|------|

### 수정 시 주의사항
- [주의점]
```

## 전체 문서 목록 (`.claude/rules/`)

| 문서 | 내용 |
|------|------|
| `00-overview.md` | 전체 아키텍처, 컴포넌트 계층, 데이터 흐름 |
| `01-types.md` | GridCell, GridSelection, GridColumn 등 핵심 타입 |
| `02-data-editor.md` | DataEditor Props, 상태, 이벤트 처리 |
| `03-data-grid.md` | DataGrid 캔버스 컨트롤러, 마우스/키보드 |
| `04-rendering.md` | drawGrid, drawCells, 최적화 기법 |
| `05-cells.md` | 셀 렌더러, 커스텀 렌더러 구현 |
| `06-selection.md` | GridSelection, CompactSelection |
| `07-editing.md` | 셀 편집, 복사/붙여넣기, 오버레이 |
| `08-events.md` | 마우스/키보드 이벤트, 콜백 |
| `09-theming.md` | Theme 인터페이스, CSS 변수 |
| `10-data-processing.md` | 그룹화, rowGrouping 아키텍처 |
| `11-extension-points.md` | 커스텀 셀, 테마, 이벤트 확장 |
| `12-multi-level-header.md` | 다중 레벨 그룹 헤더 |
| `13-ghost-input-ime.md` | GhostInput, IME 입력 처리 |
| `14-numbercell-keystroke-editing-fix.md` | NumberCell 키 입력 편집 |
| `15-custom-renderer-guide.md` | 커스텀 렌더러 생성 가이드 |
| `16-row-markers.md` | Row Markers 시스템 |
| `17-scrolling-and-virtualization.md` | 스크롤링, 가상화, DnD |
| `18-search-and-overlay-editor.md` | 검색 UI, 오버레이 에디터 |
| `19-animation-and-performance.md` | 애니메이션, Blit, 성능 최적화 |
| `quick-reference.md` | 파일 위치, 타입 빠른 조회, 체크리스트 |
| `conventions.md` | 프로젝트 컨벤션, 핵심 참고사항 |
| `boolean-cell-keyboard-navigation.md` | Boolean 셀 키보드 네비게이션 |
| `number-cell-enter-key-navigation.md` | Number 셀 Enter 키 네비게이션 |
| `ghost-input-ime-fixes.md` | GhostInput 버그 수정 |
