---
description: |
  Glide Data Grid 분석 문서 조회.
  **PROACTIVE 사용**: 코드 수정/버그 수정/기능 추가 작업 시 자동으로 관련 문서를 먼저 읽어야 합니다.
  키워드: cell, selection, editing, event, theme, rendering, IME, 한글, boolean, number, header
---

# /analyze Skill

Glide Data Grid의 사전 분석 문서를 조회하여 코드 수정에 필요한 컨텍스트를 제공합니다.

## 자동 사용 조건 (Proactive Triggers)

다음 상황에서는 **반드시** 관련 분석 문서를 먼저 읽어야 합니다:

1. **코드 수정 요청 시**: 수정 대상 영역의 분석 문서를 먼저 Read
2. **버그 수정 시**: 해당 모듈의 분석 문서로 데이터 흐름 파악
3. **새 기능 구현 시**: 관련 확장 포인트 문서 확인
4. **키보드/마우스 이벤트 관련**: `08-events.md` 필수 확인
5. **IME/한글 입력 관련**: `13-ghost-input-ime.md`, `ghost-input-ime-fixes.md` 필수 확인
6. **셀 편집 관련**: `07-editing.md` 필수 확인

## 빠른 문서 매핑

| 작업 영역 | 문서 |
|-----------|------|
| DataEditor Props/상태/오케스트레이션 | `/analyze/02-data-editor.md` |
| 캔버스/저수준 이벤트 | `/analyze/03-data-grid.md` |
| 셀 렌더러 | `/analyze/05-cells.md` |
| **커스텀 렌더러 생성** | `/analyze/15-custom-renderer-guide.md` |
| 선택/네비게이션 | `/analyze/06-selection.md` |
| 편집/복사/붙여넣기 | `/analyze/07-editing.md` |
| 이벤트 핸들링 (마우스/키보드) | `/analyze/08-events.md` |
| IME/한글 입력 | `/analyze/13-ghost-input-ime.md` |
| Boolean 셀 키보드 | `/analyze/boolean-cell-keyboard-navigation.md` |
| Number 셀 Enter | `/analyze/number-cell-enter-key-navigation.md` |
| 다중 레벨 헤더 | `/analyze/12-multi-level-header.md` |
| **Row Markers (마커/상태/ID)** | `/analyze/16-row-markers.md` |

**리팩토링 참고**: DataEditor의 이벤트 처리 로직은 다음 파일들로 추출됨:
- 마우스/터치/필: `use-mouse-handlers.ts`
- 키보드/키바인딩: `use-keyboard-handlers.ts`
- 클립보드: `use-clipboard.ts`
- IME/GhostInput: `use-ghost-input.ts`
- 공유 상태 타입: `data-editor-state.ts`



## 동작 지침

1. 인자 없이 호출된 경우:
   - `/analyze/00-overview.md` 읽기
   - 전체 문서 목록과 각 문서의 역할 요약 제공

2. 특정 키워드로 호출된 경우:
   - 키워드에 맞는 문서 매핑:
     - `types`, `타입` → `/analyze/01-types.md`
     - `editor`, `데이터에디터` → `/analyze/02-data-editor.md`
     - `grid`, `그리드` → `/analyze/03-data-grid.md`
     - `render`, `렌더링` → `/analyze/04-rendering.md`
     - `cell`, `셀` → `/analyze/05-cells.md`
     - `custom renderer`, `커스텀렌더러`, `customcell` → `/analyze/15-custom-renderer-guide.md`
     - `selection`, `선택` → `/analyze/06-selection.md`
     - `edit`, `편집`, `paste`, `copy` → `/analyze/07-editing.md`
     - `event`, `이벤트` → `/analyze/08-events.md`
     - `theme`, `테마`, `style` → `/analyze/09-theming.md`
     - `data`, `filter`, `sort`, `group` → `/analyze/10-data-processing.md`
     - `extension`, `확장`, `custom` → `/analyze/11-extension-points.md`
     - `header`, `multi-level`, `그룹헤더` → `/analyze/12-multi-level-header.md`
     - `ghost`, `ime`, `한글`, `composition` → `/analyze/13-ghost-input-ime.md`, `/analyze/ghost-input-ime-fixes.md`
     - `boolean`, `체크박스`, `toggle` → `/analyze/boolean-cell-keyboard-navigation.md`
     - `number`, `숫자셀` → `/analyze/number-cell-enter-key-navigation.md`
     - `rowMarker`, `marker`, `rowStatus`, `rowId`, `행마커` → `/analyze/16-row-markers.md`
     - `quick`, `빠른`, `reference` → `/analyze/quick-reference.md`
   - 해당 문서 읽기
   - 핵심 내용 요약 제공 (주요 타입, 함수, 파일 위치)

3. 키워드 매칭이 안되는 경우:
   - `/analyze` 폴더 내 모든 문서에서 키워드 검색
   - 관련 섹션 찾아서 제공

## 출력 형식

```
## [문서 제목]

### 핵심 요약
- [주요 내용 3-5개]

### 관련 파일
| 파일 | 위치 | 용도 |
|------|------|------|

### 자주 사용하는 패턴
[코드 예시]

### 수정 시 주의사항
- [주의점]
```

## 전체 문서 목록

| 문서 | 내용 |
|------|------|
| `00-overview.md` | 전체 아키텍처, 컴포넌트 계층, 데이터 흐름 |
| `01-types.md` | GridCell, GridSelection, GridColumn 등 핵심 타입 |
| `02-data-editor.md` | DataEditor Props, 상태, 이벤트 처리 |
| `03-data-grid.md` | DataGrid 캔버스 컨트롤러, 마우스/키보드 |
| `04-rendering.md` | drawGrid, drawCells, 최적화 기법 |
| `05-cells.md` | 17개 셀 렌더러, 커스텀 렌더러 구현 |
| `06-selection.md` | GridSelection, CompactSelection |
| `07-editing.md` | 셀 편집, 복사/붙여넣기, 오버레이 |
| `08-events.md` | 마우스/키보드 이벤트, 콜백 |
| `09-theming.md` | Theme 인터페이스, CSS 변수 |
| `10-data-processing.md` | 필터, 정렬, 그룹화, 가상화 |
| `11-extension-points.md` | 커스텀 셀, 테마, 이벤트 확장 |
| `12-multi-level-header.md` | 다중 레벨 그룹 헤더, 계층적 헤더 구현 |
| `13-ghost-input-ime.md` | GhostInput 패턴, IME 입력 처리 설계 |
| `14-numbercell-keystroke-editing-fix.md` | NumberCell 키 입력 즉시 편집 모드 진입 수정 |
| `15-custom-renderer-guide.md` | 커스텀 렌더러 생성 가이드: CustomCell, CustomRenderer, 데이터 접근, 에디터, 이벤트, 애니메이션, DataGrid 연결 |
| `16-row-markers.md` | Row Markers: RowMarkerOptions, 마커 컬럼 종류, rowMarkerOffset, totalMarkerWidth, RowStatus/RowId, 셀 렌더러 |
| `quick-reference.md` | 파일 위치, 타입 빠른 조회, 체크리스트 |
| `boolean-cell-keyboard-navigation.md` | Boolean 셀 Space 토글, Enter 이동 구현 |
| `number-cell-enter-key-navigation.md` | Number 셀 Enter 키 아래 이동 구현 |
| `ghost-input-ime-fixes.md` | GhostInput 버그 수정, 스페이스 키, CustomCell 편집 모드 |
