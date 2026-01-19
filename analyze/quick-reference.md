# Glide Data Grid 빠른 참조 가이드

## 자주 수정되는 파일

### 핵심 파일 (빈번한 수정)
| 파일 | LOC | 용도 | 수정 사례 |
|------|-----|------|----------|
| `data-editor/data-editor.tsx` | 4,762 | 메인 컴포넌트 | Props 추가, 이벤트 핸들링 |
| `internal/data-grid/data-grid-types.ts` | 748 | 타입 정의 | 새 셀 타입, 속성 추가 |
| `internal/data-grid/data-grid.tsx` | 1,950 | 캔버스 컨트롤러 | 마우스/키보드 이벤트 |
| `common/styles.ts` | 215 | 테마 정의 | 색상, 폰트 변경 |

### 렌더링 파일
| 파일 | 용도 |
|------|------|
| `render/data-grid-render.ts` | 메인 렌더 진입점 |
| `render/data-grid-render.cells.ts` | 셀 렌더링 |
| `render/data-grid-render.header.ts` | 헤더 렌더링 |
| `render/data-grid-render.lines.ts` | 그리드 라인 |
| `render/data-grid.render.rings.ts` | 선택 영역 표시 |

### 셀 렌더러 파일
| 파일 | 셀 타입 |
|------|--------|
| `cells/text-cell.tsx` | TextCell |
| `cells/number-cell.tsx` | NumberCell |
| `cells/boolean-cell.tsx` | BooleanCell |
| `cells/image-cell.tsx` | ImageCell |
| `cells/uri-cell.tsx` | UriCell |
| `cells/markdown-cell.tsx` | MarkdownCell |
| `cells/marker-cell.tsx` | MarkerCell (행 마커) |

## 주요 타입 빠른 조회

### 셀 생성
```typescript
// TextCell
{ kind: GridCellKind.Text, data: "value", displayData: "value", allowOverlay: true }

// NumberCell
{ kind: GridCellKind.Number, data: 123, displayData: "123", allowOverlay: true }

// BooleanCell
{ kind: GridCellKind.Boolean, data: true, allowOverlay: false }

// CustomCell
{ kind: GridCellKind.Custom, data: { ... }, copyData: "text", allowOverlay: true }
```

### 컬럼 정의
```typescript
// 고정 너비
{ title: "Name", width: 200 }

// 자동 너비
{ title: "Name", id: "name-col" }

// 전체 옵션
{
    title: "Name",
    width: 200,
    icon: GridColumnIcon.HeaderString,
    hasMenu: true,
    grow: 1,
    themeOverride: { bgCell: "#f0f0f0" }
}
```

### 선택 상태
```typescript
// 빈 선택
{ current: undefined, columns: CompactSelection.empty(), rows: CompactSelection.empty() }

// 단일 셀 선택
{
    current: {
        cell: [col, row],
        range: { x: col, y: row, width: 1, height: 1 },
        rangeStack: []
    },
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty()
}

// 행 선택
{
    current: undefined,
    columns: CompactSelection.empty(),
    rows: CompactSelection.fromSingleSelection([0, 5])  // 0-4행 선택
}
```

## 핵심 Props 체크리스트

### 필수 Props
```typescript
<DataEditor
    columns={columns}           // GridColumn[]
    rows={rowCount}             // number
    getCellContent={callback}   // (cell: Item) => GridCell
/>
```

### 선택 관련
```typescript
gridSelection={selection}
onGridSelectionChange={setSelection}
rowSelect="multi"               // "none" | "single" | "multi"
columnSelect="multi"            // "none" | "single" | "multi"
rangeSelect="multi-rect"        // "none" | "cell" | "rect" | "multi-cell" | "multi-rect"
rangeSelectionBlending="exclusive"  // "exclusive" | "mixed" | "additive"
```

### 편집 관련
```typescript
onCellEdited={(cell, newValue) => { ... }}
onCellsEdited={(newValues) => { ... }}
getCellsForSelection={true}     // 복사/붙여넣기 활성화
onPaste={(target, values) => true}
```

### 스타일 관련
```typescript
theme={{ bgCell: "#fff", ... }}
rowHeight={34}
headerHeight={36}
rowMarkers="checkbox"           // "none" | "checkbox" | "number" | "both"
freezeColumns={1}
```

## 자주 사용하는 패턴

### 1. 셀 데이터 제공
```typescript
const getCellContent = React.useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const column = columns[col];
    const rowData = data[row];

    return {
        kind: GridCellKind.Text,
        data: rowData[column.id] ?? "",
        displayData: rowData[column.id] ?? "",
        allowOverlay: true,
    };
}, [columns, data]);
```

### 2. 선택 제어
```typescript
const [selection, setSelection] = React.useState<GridSelection>({
    current: undefined,
    columns: CompactSelection.empty(),
    rows: CompactSelection.empty(),
});

<DataEditor
    gridSelection={selection}
    onGridSelectionChange={setSelection}
/>
```

### 3. 셀 편집 처리
```typescript
const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;
    setData(prev => {
        const newData = [...prev];
        newData[row] = { ...newData[row], [columns[col].id]: newValue.data };
        return newData;
    });
}, [columns]);
```

### 4. 커스텀 렌더러 등록
```typescript
const customRenderers: CustomRenderer[] = [
    {
        kind: GridCellKind.Custom,
        isMatch: (cell): cell is MyCustomCell => cell.data?.type === "myType",
        draw: (args, cell) => {
            // 캔버스에 그리기
        },
        provideEditor: (cell) => ({
            editor: MyEditor,
            disablePadding: true,
        }),
    },
];

<DataEditor customRenderers={customRenderers} />
```

## 디버깅 팁

### 1. 셀 렌더링 확인
```typescript
// data-grid-render.cells.ts의 drawCell 함수에 브레이크포인트
// 또는 drawCellCallback prop 사용
drawCell={(args, drawContent) => {
    console.log('Drawing cell:', args.col, args.row);
    drawContent();
}}
```

### 2. 선택 상태 추적
```typescript
onGridSelectionChange={(newSelection) => {
    console.log('Selection changed:', newSelection);
    setSelection(newSelection);
}}
```

### 3. 성능 프로파일링
```typescript
// data-grid-render.ts:115의 drawGrid 함수 시작/끝에 타이밍 추가
console.time('drawGrid');
// ... 렌더링 코드
console.timeEnd('drawGrid');
```

## 수정 체크리스트

### 새 셀 타입 추가시
- [ ] `data-grid-types.ts`: GridCellKind enum에 추가
- [ ] `data-grid-types.ts`: 셀 인터페이스 정의
- [ ] `data-grid-types.ts`: GridCell 유니온에 추가
- [ ] `cells/`: 새 렌더러 파일 생성
- [ ] `data-editor-all.tsx`: 렌더러 등록
- [ ] 타입 가드 함수 업데이트

### 새 Props 추가시
- [ ] `data-editor.tsx`: Props 타입에 추가
- [ ] `data-editor.tsx`: 구조 분해 할당에서 추출
- [ ] 기본값 설정 (필요시)
- [ ] 하위 컴포넌트로 전달 (필요시)
- [ ] JSDoc 주석 추가

### 이벤트 핸들러 추가시
- [ ] `event-args.ts`: 이벤트 타입 정의
- [ ] `data-editor.tsx`: Props에 콜백 추가
- [ ] `data-grid.tsx`: 이벤트 발생 로직 (필요시)
- [ ] 문서 업데이트

### 테마 속성 추가시
- [ ] `common/styles.ts`: Theme 인터페이스에 추가
- [ ] `common/styles.ts`: dataEditorBaseTheme에 기본값 추가
- [ ] `common/styles.ts`: makeCSSStyle에 CSS 변수 추가 (필요시)
- [ ] 렌더링 코드에서 사용

## 주요 위치 참조

| 기능 | 파일:라인 |
|------|----------|
| DataEditor Props | `data-editor.tsx:219-735` |
| DataEditorRef | `data-editor.tsx:751-796` |
| getCellContent 호출 | `data-grid.tsx:114` |
| 마우스 이벤트 처리 | `data-grid.tsx:516-727` |
| 키보드 이벤트 처리 | `data-grid.tsx:1376-1434` |
| 셀 렌더링 | `render/data-grid-render.cells.ts` |
| 헤더 렌더링 | `render/data-grid-render.header.ts` |
| 선택 로직 | `use-selection-behavior.ts:16-153` |
| 테마 기본값 | `common/styles.ts:103-151` |
