---
description: Glide Data Grid 분석 문서 조회 - 코드 수정 전 관련 문서를 빠르게 찾아 컨텍스트를 제공합니다
---

# /analyze Skill

Glide Data Grid의 사전 분석 문서를 조회하여 코드 수정에 필요한 컨텍스트를 제공합니다.

## 사용법

- `/analyze` - 전체 개요 및 문서 목록 표시
- `/analyze types` - 핵심 타입 시스템 (GridCell, GridSelection 등)
- `/analyze cells` - 셀 렌더러 구현 방법
- `/analyze selection` - 선택 및 네비게이션 로직
- `/analyze editing` - 편집 및 복사/붙여넣기
- `/analyze events` - 이벤트 시스템
- `/analyze theme` - 테마 커스터마이징
- `/analyze rendering` - 캔버스 렌더링 파이프라인
- `/analyze extension` - 확장 포인트 가이드
- `/analyze [키워드]` - 키워드로 관련 문서 검색

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
     - `selection`, `선택` → `/analyze/06-selection.md`
     - `edit`, `편집`, `paste`, `copy` → `/analyze/07-editing.md`
     - `event`, `이벤트` → `/analyze/08-events.md`
     - `theme`, `테마`, `style` → `/analyze/09-theming.md`
     - `data`, `filter`, `sort`, `group` → `/analyze/10-data-processing.md`
     - `extension`, `확장`, `custom` → `/analyze/11-extension-points.md`
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

## 문서 목록

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
| `quick-reference.md` | 파일 위치, 타입 빠른 조회, 체크리스트 |
