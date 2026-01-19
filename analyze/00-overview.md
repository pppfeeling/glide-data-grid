# Glide Data Grid 전체 아키텍처 개요

## 개요
- **역할**: 캔버스 기반 고성능 React 데이터 그리드
- **핵심 특징**: 수백만 행 지원, 빠른 스크롤 성능
- **위치**: `packages/core/src/`

## 컴포넌트 계층 구조

```
DataEditorAll (data-editor-all.tsx)
    └── DataEditor (data-editor/data-editor.tsx)
            └── DataGridSearch (internal/data-grid-search/)
                    └── DataGrid (internal/data-grid/data-grid.tsx)
                            └── Canvas Rendering (internal/data-grid/render/)
```

### 계층별 역할

| 컴포넌트 | 파일 | 역할 |
|---------|------|------|
| `DataEditorAll` | `data-editor-all.tsx` | 모든 셀 렌더러 포함 완전한 버전 |
| `DataEditor` | `data-editor/data-editor.tsx:1-4762` | Props 처리, 이벤트 핸들링, 상태 관리 |
| `DataGridSearch` | `internal/data-grid-search/` | 검색 기능 래퍼 |
| `DataGrid` | `internal/data-grid/data-grid.tsx:1-1950` | 캔버스 직접 제어, 마우스/키보드 이벤트 |

## 핵심 모듈 구조

```
packages/core/src/
├── cells/                    # 셀 렌더러 (15개 타입)
│   ├── cell-types.ts         # 렌더러 인터페이스
│   ├── text-cell.tsx
│   ├── number-cell.tsx
│   ├── boolean-cell.tsx
│   └── ...
├── common/                   # 공유 유틸리티
│   ├── styles.ts             # Theme 정의
│   ├── utils.ts              # 유틸 함수
│   └── support.ts            # 타입 헬퍼
├── data-editor/              # 메인 컴포넌트
│   ├── data-editor.tsx       # DataEditor (4,762 LOC)
│   ├── use-column-sizer.ts   # 컬럼 크기 계산
│   ├── use-autoscroll.ts     # 자동 스크롤
│   └── data-editor-fns.ts    # 편집 유틸리티
└── internal/                 # 내부 구현
    └── data-grid/
        ├── data-grid.tsx         # 캔버스 컨트롤러
        ├── data-grid-types.ts    # 핵심 타입 정의 (748 LOC)
        ├── event-args.ts         # 이벤트 타입
        ├── use-selection-behavior.ts  # 선택 로직
        └── render/               # 렌더링 파이프라인
            ├── data-grid-render.ts        # 메인 렌더 함수
            ├── data-grid-render.cells.ts  # 셀 렌더링
            ├── data-grid-render.header.ts # 헤더 렌더링
            ├── data-grid-render.lines.ts  # 그리드 라인
            ├── data-grid-render.blit.ts   # 블릿 최적화
            └── data-grid-render.walk.ts   # 셀 순회
```

## 데이터 흐름

```
1. 사용자 입력
   ├── Props 전달 (columns, rows, getCellContent)
   └── 이벤트 콜백 등록 (onCellEdited, onGridSelectionChange)

2. DataEditor 처리 (data-editor.tsx)
   ├── Props 정규화 및 검증
   ├── 내부 상태 관리 (selection, scroll position)
   ├── 이벤트 핸들링 (클릭, 키보드, 드래그)
   └── 편집 오버레이 관리

3. DataGrid 렌더링 (data-grid.tsx)
   ├── 캔버스 컨텍스트 관리
   ├── 마우스 위치 추적
   ├── 애니메이션 관리
   └── draw() 호출

4. Canvas Rendering (render/)
   ├── drawGrid() - 메인 진입점
   ├── blitLastFrame() - 가능시 이전 프레임 재사용
   ├── drawGridHeaders() - 헤더 렌더링
   ├── drawCells() - 셀 렌더링
   ├── drawGridLines() - 경계선
   └── drawHighlightRings() - 선택 영역 표시
```

## 렌더링 파이프라인

```
drawGrid() [data-grid-render.ts:115]
    │
    ├── computeCanBlit() - 블릿 가능 여부 확인
    │
    ├── [Blit 가능시]
    │   └── blitLastFrame() - 이전 프레임 복사
    │
    ├── [전체 렌더링]
    │   ├── drawGridHeaders() - 헤더 영역
    │   │   ├── drawHeader() - 개별 헤더
    │   │   └── drawGroupHeaders() - 그룹 헤더
    │   │
    │   ├── drawCells() - 셀 영역
    │   │   ├── walkColumns() - 컬럼 순회
    │   │   ├── walkRowsInCol() - 행 순회
    │   │   └── drawCell() - 개별 셀
    │   │
    │   ├── drawGridLines() - 그리드 라인
    │   │
    │   └── drawHighlightRings() - 선택 표시
    │
    └── drawFillHandle() - 채우기 핸들
```

## 핵심 상태

### GridSelection (선택 상태)
```typescript
interface GridSelection {
    current?: {
        cell: Item;           // [col, row] - 현재 활성 셀
        range: Rectangle;     // 선택 범위
        rangeStack: Rectangle[]; // 다중 선택시 이전 범위들
    };
    columns: CompactSelection;  // 선택된 컬럼
    rows: CompactSelection;     // 선택된 행
}
```

### 주요 Props 흐름
```
columns (GridColumn[])      → 컬럼 정의
rows (number)               → 총 행 수
getCellContent(cell)        → 셀 데이터 제공
onGridSelectionChange()     → 선택 변경 알림
onCellEdited()              → 편집 완료 알림
theme                       → 스타일링
```

## 성능 최적화 기법

1. **블릿(Blit) 렌더링**: 변경되지 않은 영역 재사용
2. **데미지 리전**: 변경된 셀만 다시 그리기
3. **가상화**: 보이는 셀만 렌더링
4. **더블 버퍼링**: Safari에서 깜빡임 방지
5. **호버 애니메이션**: requestAnimationFrame 기반

## 확장 포인트

| 확장 영역 | 방법 | 파일 |
|----------|------|------|
| 커스텀 셀 | `customRenderers` prop | `cells/cell-types.ts` |
| 테마 | `theme` prop | `common/styles.ts` |
| 커스텀 헤더 | `drawHeader` callback | `data-grid.tsx:223` |
| 커스텀 셀 렌더링 | `drawCell` callback | `data-grid.tsx:225` |
| 편집기 | `provideEditor` prop | `data-editor.tsx:492` |

## 의존성 관계

```
data-editor.tsx
    ├── data-grid-types.ts (타입)
    ├── styles.ts (테마)
    ├── use-selection-behavior.ts (선택)
    ├── data-grid-search.tsx
    │   └── data-grid.tsx
    │       ├── data-grid-render.ts
    │       └── cell renderers (cells/)
    └── data-grid-overlay-editor.tsx (편집 오버레이)
```

## 수정 시 주의사항

1. **data-editor.tsx**: 4,762줄의 대형 파일, 수정 전 관련 섹션 파악 필수
2. **data-grid-types.ts**: 타입 변경시 광범위한 영향
3. **렌더링 파이프라인**: 성능에 민감, 불필요한 리렌더링 주의
4. **선택 로직**: `use-selection-behavior.ts`의 블렌딩 규칙 이해 필요
5. **이벤트 처리**: `event-args.ts`의 타입 구조 준수
