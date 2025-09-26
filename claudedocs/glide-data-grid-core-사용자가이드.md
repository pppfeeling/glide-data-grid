# Glide Data Grid Core 사용자 가이드

## 목차
1. [개요](#개요)
2. [설치 및 설정](#설치-및-설정)
3. [기본 사용법](#기본-사용법)
4. [DataEditor 컴포넌트](#dataeditor-컴포넌트)
5. [셀 타입 및 렌더러](#셀-타입-및-렌더러)
6. [이벤트 처리](#이벤트-처리)
7. [테마 및 스타일링](#테마-및-스타일링)
8. [성능 최적화](#성능-최적화)
9. [고급 기능](#고급-기능)
10. [실제 예제](#실제-예제)

---

## 개요

Glide Data Grid Core는 Canvas 기반의 React 데이터 그리드 컴포넌트로, 수백만 행의 데이터를 빠른 스크롤 성능으로 처리할 수 있습니다.

### 주요 특징
- ⚡ **고성능**: HTML Canvas를 사용한 가상화로 수백만 행 지원
- 🎨 **커스터마이징**: 완전 커스터마이징 가능한 셀 렌더러
- 📱 **반응형**: 다양한 화면 크기 지원
- ♿ **접근성**: 스크린 리더 및 키보드 네비게이션 지원
- 🔧 **TypeScript**: 완전한 TypeScript 지

---

## 설치 및 설정

### NPM으로 설치
```bash
npm install @glideapps/glide-data-grid
```

### Yarn으로 설치
```bash
yarn add @glideapps/glide-data-grid
```

### 기본 import
```typescript
import { DataEditor, GridCellKind, GridColumn, Item } from "@glideapps/glide-data-grid";
```

---

## 기본 사용법

### 최소 구성 예제
```typescript
import React, { useCallback } from "react";
import { DataEditor, GridCellKind, GridColumn, Item, GridCell } from "@glideapps/glide-data-grid";

// 데이터 정의
const data = [
    ["홍길동", 30, "개발자"],
    ["김철수", 25, "디자이너"],
    ["이영희", 28, "기획자"]
];

// 컬럼 정의
const columns: GridColumn[] = [
    { title: "이름", width: 120 },
    { title: "나이", width: 80 },
    { title: "직책", width: 150 }
];

function BasicGrid() {
    const getCellContent = useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const dataRow = data[row];

        if (col === 0) {
            return {
                kind: GridCellKind.Text,
                data: dataRow[0],
                displayData: dataRow[0],
                allowOverlay: true
            };
        } else if (col === 1) {
            return {
                kind: GridCellKind.Number,
                data: dataRow[1],
                displayData: dataRow[1].toString(),
                allowOverlay: true
            };
        } else {
            return {
                kind: GridCellKind.Text,
                data: dataRow[2],
                displayData: dataRow[2],
                allowOverlay: true
            };
        }
    }, []);

    return (
        <DataEditor
            getCellContent={getCellContent}
            columns={columns}
            rows={data.length}
            width={400}
            height={300}
        />
    );
}
```

---

## DataEditor 컴포넌트

### DataEditorAll vs DataEditor
- **`DataEditor`**: 기본 컴포넌트 (선택적 의존성 포함하지 않음)
- **`DataEditorAll`**: 모든 기능이 포함된 컴포넌트 (권장)

```typescript
// 모든 기능이 포함된 버전 (권장)
import { DataEditor } from "@glideapps/glide-data-grid";

// 기본 버전 (더 작은 번들 크기)
import { DataEditorCore } from "@glideapps/glide-data-grid";
```

### 주요 Props

#### 필수 Props
```typescript
interface DataEditorProps {
    getCellContent: (cell: Item) => GridCell;  // 셀 데이터 제공 함수
    columns: readonly GridColumn[];            // 컬럼 정의 배열
    rows: number;                              // 총 행 수
}
```

#### 일반적인 선택적 Props
```typescript
interface DataEditorProps {
    width?: number;                    // 그리드 너비 (기본값: 자동)
    height?: number;                   // 그리드 높이 (기본값: 자동)
    smoothScrollX?: boolean;           // 수평 부드러운 스크롤 (기본값: true)
    smoothScrollY?: boolean;           // 수직 부드러운 스크롤 (기본값: true)
    cellActivationBehavior?: CellActivationBehavior; // 셀 활성화 동작
    getCellsForSelection?: boolean;    // 선택 영역 셀 가져오기 (기본값: false)
    gridSelection?: GridSelection;     // 현재 선택 상태
    onGridSelectionChange?: (selection: GridSelection) => void; // 선택 변경 핸들러
}
```

### 컬럼 정의 (GridColumn)
```typescript
interface GridColumn {
    title: string;          // 컬럼 제목
    width: number;          // 컬럼 너비 (픽셀)
    id?: string;            // 고유 식별자 (선택사항)
    icon?: HeaderIcon;      // 헤더 아이콘 (선택사항)
    hasMenu?: boolean;      // 컨텍스트 메뉴 여부 (선택사항)
    style?: "normal" | "highlight"; // 스타일 (선택사항)
    themeOverride?: Partial<Theme>;  // 테마 오버라이드 (선택사항)
}
```

---

## 셀 타입 및 렌더러

### 기본 제공 셀 타입

#### 1. 텍스트 셀 (Text Cell)
```typescript
const textCell: GridCell = {
    kind: GridCellKind.Text,
    data: "안녕하세요",
    displayData: "안녕하세요",
    allowOverlay: true,    // 편집 가능 여부
    readonly: false        // 읽기 전용 여부
};
```

#### 2. 숫자 셀 (Number Cell)
```typescript
const numberCell: GridCell = {
    kind: GridCellKind.Number,
    data: 12345,
    displayData: "12,345",
    allowOverlay: true,
    fixedDecimals: 2,      // 소수점 자릿수
    allowNegative: true    // 음수 허용 여부
};
```

#### 3. 불린 셀 (Boolean Cell)
```typescript
const booleanCell: GridCell = {
    kind: GridCellKind.Boolean,
    data: true,
    allowOverlay: false,
    showUnchecked: true    // 체크되지 않은 상태도 표시
};
```

#### 4. 이미지 셀 (Image Cell)
```typescript
const imageCell: GridCell = {
    kind: GridCellKind.Image,
    data: ["https://example.com/image.jpg"],
    allowOverlay: true,
    allowAdd: false        // 이미지 추가 허용 여부
};
```

#### 5. URI 셀 (URI Cell)
```typescript
const uriCell: GridCell = {
    kind: GridCellKind.Uri,
    data: "https://example.com",
    allowOverlay: true
};
```

#### 6. 마크다운 셀 (Markdown Cell)
```typescript
const markdownCell: GridCell = {
    kind: GridCellKind.Markdown,
    data: "**굵은 텍스트**와 *기울임 텍스트*",
    allowOverlay: true
};
```

#### 7. 버블 셀 (Bubble Cell)
```typescript
const bubbleCell: GridCell = {
    kind: GridCellKind.Bubble,
    data: ["태그1", "태그2", "태그3"],
    allowOverlay: false
};
```

#### 8. 드릴다운 셀 (Drilldown Cell)
```typescript
const drilldownCell: GridCell = {
    kind: GridCellKind.Drilldown,
    data: [{ text: "상세보기", img: "icon-url" }],
    allowOverlay: false
};
```

#### 9. 로딩 셀 (Loading Cell)
```typescript
const loadingCell: GridCell = {
    kind: GridCellKind.Loading,
    allowOverlay: false
};
```

#### 10. 보호된 셀 (Protected Cell)
```typescript
const protectedCell: GridCell = {
    kind: GridCellKind.Protected,
    allowOverlay: false
};
```

### 커스텀 셀 렌더러

커스텀 셀 렌더러를 만들어 독특한 셀 타입을 구현할 수 있습니다:

```typescript
import { CustomCell, CustomRenderer } from "@glideapps/glide-data-grid";

// 커스텀 셀 데이터 정의
interface MyCustomCell extends CustomCell {
    readonly kind: "my-custom-cell";
    readonly data: {
        value: number;
        color: string;
    };
}

// 커스텀 렌더러 구현
const myCustomRenderer: CustomRenderer<MyCustomCell> = {
    kind: "my-custom-cell",
    isMatch: (c): c is MyCustomCell => c.kind === "my-custom-cell",
    draw: (args, cell) => {
        const { ctx, rect, theme } = args;
        const { value, color } = cell.data;

        // 배경 그리기
        ctx.fillStyle = color;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        // 텍스트 그리기
        ctx.fillStyle = theme.textDark;
        ctx.font = theme.baseFontFull;
        ctx.textAlign = "center";
        ctx.fillText(
            value.toString(),
            rect.x + rect.width / 2,
            rect.y + rect.height / 2
        );
    },
    provideEditor: undefined, // 편집기 없음
};

// 사용
<DataEditor
    getCellContent={getCellContent}
    columns={columns}
    rows={rows}
    customRenderers={[myCustomRenderer]}
/>
```

---

## 이벤트 처리

### 셀 클릭 이벤트
```typescript
const onCellClicked = useCallback((cell: Item, event: CellClickedEventArgs) => {
    const [col, row] = cell;
    console.log(`셀 클릭: (${col}, ${row})`, event);
}, []);

<DataEditor
    onCellClicked={onCellClicked}
    // ... 다른 props
/>
```

### 셀 편집 이벤트
```typescript
const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;
    console.log(`셀 편집: (${col}, ${row})`, newValue);

    // 데이터 업데이트 로직
    updateData(col, row, newValue);
}, []);

<DataEditor
    onCellEdited={onCellEdited}
    // ... 다른 props
/>
```

### 선택 변경 이벤트
```typescript
const [gridSelection, setGridSelection] = useState<GridSelection>();

const onGridSelectionChange = useCallback((selection: GridSelection) => {
    setGridSelection(selection);
    console.log("선택 변경:", selection);
}, []);

<DataEditor
    gridSelection={gridSelection}
    onGridSelectionChange={onGridSelectionChange}
    // ... 다른 props
/>
```

### 헤더 클릭 이벤트
```typescript
const onHeaderClicked = useCallback((colIndex: number, event: HeaderClickedEventArgs) => {
    console.log(`헤더 클릭: 컬럼 ${colIndex}`, event);

    // 정렬 로직 등
    handleSort(colIndex);
}, []);

<DataEditor
    onHeaderClicked={onHeaderClicked}
    // ... 다른 props
/>
```

---

## 테마 및 스타일링

### 기본 테마 사용
```typescript
import { getDefaultTheme } from "@glideapps/glide-data-grid";

const theme = getDefaultTheme();

<DataEditor
    theme={theme}
    // ... 다른 props
/>
```

### 커스텀 테마 만들기
```typescript
import { Theme } from "@glideapps/glide-data-grid";

const customTheme: Partial<Theme> = {
    accentColor: "#4F46E5",
    accentFg: "#FFFFFF",
    accentLight: "#E0E7FF",
    textDark: "#111827",
    textMedium: "#6B7280",
    textLight: "#9CA3AF",
    textBubble: "#FFFFFF",
    bgIconHeader: "#F9FAFB",
    fgIconHeader: "#6B7280",
    textHeader: "#111827",
    textHeaderSelected: "#4F46E5",
    bgCell: "#FFFFFF",
    bgCellMedium: "#F9FAFB",
    bgHeader: "#F9FAFB",
    bgHeaderHasFocus: "#F3F4F6",
    bgHeaderHovered: "#F3F4F6",
    bgBubble: "#EEF2FF",
    bgBubbleSelected: "#4F46E5",
    bgSearchResult: "#FEF3C7",
    borderColor: "#E5E7EB",
    drilldownBorder: "#D1D5DB",
    linkColor: "#2563EB",
    cellHorizontalPadding: 8,
    cellVerticalPadding: 3,
    headerFontStyle: "600 13px Inter, sans-serif",
    baseFontStyle: "13px Inter, sans-serif",
    fontFamily: "Inter, sans-serif"
};

<DataEditor
    theme={customTheme}
    // ... 다른 props
/>
```

### 다크 테마 적용
```typescript
const darkTheme: Partial<Theme> = {
    accentColor: "#3B82F6",
    textDark: "#F9FAFB",
    textMedium: "#D1D5DB",
    textLight: "#9CA3AF",
    bgCell: "#1F2937",
    bgCellMedium: "#374151",
    bgHeader: "#111827",
    bgHeaderHasFocus: "#374151",
    bgHeaderHovered: "#374151",
    borderColor: "#374151",
    // ... 더 많은 다크 색상들
};
```

---

## 성능 최적화

### 1. 가상화 설정
```typescript
// 더 나은 스크롤 성능을 위한 설정
<DataEditor
    smoothScrollX={true}
    smoothScrollY={true}
    isDraggable={false}     // 드래그 비활성화로 성능 향상
    allowResize={false}     // 리사이징 비활성화
    // ... 다른 props
/>
```

### 2. getCellContent 최적화
```typescript
// ❌ 나쁜 예: 매번 새로운 객체 생성
const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;
    return {
        kind: GridCellKind.Text,
        data: data[row][col],
        displayData: data[row][col],
        allowOverlay: true
    };
};

// ✅ 좋은 예: useMemo와 useCallback 사용
const getCellContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;
    const cellData = data[row][col];

    // 캐싱된 셀 객체 반환
    return cellCache[`${col}-${row}`] || {
        kind: GridCellKind.Text,
        data: cellData,
        displayData: cellData,
        allowOverlay: true
    };
}, [data, cellCache]);
```

### 3. 대용량 데이터 처리
```typescript
// 지연 로딩을 위한 패턴
const getCellContent = useCallback((cell: Item): GridCell => {
    const [col, row] = cell;

    // 해당 행이 로드되지 않은 경우
    if (!loadedRows.has(row)) {
        // 로딩 셀 표시
        loadRowData(row); // 비동기로 데이터 로드
        return {
            kind: GridCellKind.Loading,
            allowOverlay: false
        };
    }

    // 로드된 데이터 반환
    return getLoadedCellData(col, row);
}, [loadedRows]);
```

---

## 고급 기능

### 1. 검색 기능
```typescript
import { DataGridSearch } from "@glideapps/glide-data-grid";

const [showSearch, setShowSearch] = useState(false);
const [searchValue, setSearchValue] = useState("");

<DataEditor
    // ... 다른 props
    getCellsForSelection={true}
    searchResults={searchResults}
    onSearchResultsChanged={setSearchResults}
/>

{showSearch && (
    <DataGridSearch
        canSearch={col => col < 3} // 처음 3개 컬럼만 검색 가능
        searchValue={searchValue}
        onSearchValueChange={setSearchValue}
        onClose={() => setShowSearch(false)}
    />
)}
```

### 2. 컬럼 리사이징
```typescript
const [columns, setColumns] = useState<GridColumn[]>(initialColumns);

const onColumnResize = useCallback((column: GridColumn, newSize: number) => {
    setColumns(prev => prev.map(c =>
        c === column ? { ...c, width: newSize } : c
    ));
}, []);

<DataEditor
    columns={columns}
    onColumnResize={onColumnResize}
    allowResize={true}
    // ... 다른 props
/>
```

### 3. 행 그룹핑
```typescript
import { useRowGrouping } from "@glideapps/glide-data-grid";

const {
    rows: groupedRows,
    getRowInfo
} = useRowGrouping({
    data: originalData,
    groupBy: "category", // 그룹핑 기준 컬럼
    sortBy: "name"       // 정렬 기준
});

<DataEditor
    rows={groupedRows}
    getCellContent={getCellContent}
    getRowInfo={getRowInfo}  // 그룹 정보 제공
    // ... 다른 props
/>
```

### 4. 복사/붙여넣기
```typescript
import { copyToClipboard, pasteFromClipboard } from "@glideapps/glide-data-grid";

const onCopy = useCallback((selection: GridSelection) => {
    const copied = copyToClipboard(selection, getCellContent);
    console.log("복사됨:", copied);
}, [getCellContent]);

const onPaste = useCallback(async (target: Item, values: readonly (readonly string[])[]) => {
    // 붙여넣기 로직 구현
    await pasteFromClipboard(target, values, setCellContent);
}, []);

<DataEditor
    onCopy={onCopy}
    onPaste={onPaste}
    // ... 다른 props
/>
```

---

## 실제 예제

### 완전한 데이터 테이블 예제
```typescript
import React, { useState, useCallback, useMemo } from "react";
import {
    DataEditor,
    GridCellKind,
    GridColumn,
    Item,
    GridCell,
    GridSelection,
    EditableGridCell
} from "@glideapps/glide-data-grid";

interface Employee {
    id: number;
    name: string;
    age: number;
    position: string;
    salary: number;
    active: boolean;
    photo?: string;
    email: string;
}

const mockData: Employee[] = [
    { id: 1, name: "홍길동", age: 30, position: "개발자", salary: 50000000, active: true, email: "hong@example.com" },
    { id: 2, name: "김철수", age: 25, position: "디자이너", salary: 40000000, active: true, email: "kim@example.com" },
    { id: 3, name: "이영희", age: 28, position: "기획자", salary: 45000000, active: false, email: "lee@example.com" }
];

export function EmployeeGrid() {
    const [data, setData] = useState<Employee[]>(mockData);
    const [selection, setSelection] = useState<GridSelection>();

    const columns: GridColumn[] = useMemo(() => [
        { title: "ID", width: 60 },
        { title: "이름", width: 120 },
        { title: "나이", width: 80 },
        { title: "직책", width: 150 },
        { title: "연봉", width: 120 },
        { title: "활성상태", width: 100 },
        { title: "이메일", width: 200 }
    ], []);

    const getCellContent = useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const employee = data[row];

        switch (col) {
            case 0:
                return {
                    kind: GridCellKind.Number,
                    data: employee.id,
                    displayData: employee.id.toString(),
                    allowOverlay: false,
                    readonly: true
                };
            case 1:
                return {
                    kind: GridCellKind.Text,
                    data: employee.name,
                    displayData: employee.name,
                    allowOverlay: true
                };
            case 2:
                return {
                    kind: GridCellKind.Number,
                    data: employee.age,
                    displayData: employee.age.toString(),
                    allowOverlay: true
                };
            case 3:
                return {
                    kind: GridCellKind.Text,
                    data: employee.position,
                    displayData: employee.position,
                    allowOverlay: true
                };
            case 4:
                return {
                    kind: GridCellKind.Number,
                    data: employee.salary,
                    displayData: employee.salary.toLocaleString('ko-KR') + '원',
                    allowOverlay: true
                };
            case 5:
                return {
                    kind: GridCellKind.Boolean,
                    data: employee.active,
                    allowOverlay: true
                };
            case 6:
                return {
                    kind: GridCellKind.Uri,
                    data: employee.email,
                    allowOverlay: true
                };
            default:
                throw new Error("잘못된 컬럼 인덱스");
        }
    }, [data]);

    const onCellEdited = useCallback((cell: Item, newValue: EditableGridCell) => {
        const [col, row] = cell;

        setData(prevData => {
            const newData = [...prevData];
            const employee = { ...newData[row] };

            switch (col) {
                case 1:
                    if (newValue.kind === GridCellKind.Text) {
                        employee.name = newValue.data;
                    }
                    break;
                case 2:
                    if (newValue.kind === GridCellKind.Number) {
                        employee.age = newValue.data;
                    }
                    break;
                case 3:
                    if (newValue.kind === GridCellKind.Text) {
                        employee.position = newValue.data;
                    }
                    break;
                case 4:
                    if (newValue.kind === GridCellKind.Number) {
                        employee.salary = newValue.data;
                    }
                    break;
                case 5:
                    if (newValue.kind === GridCellKind.Boolean) {
                        employee.active = newValue.data;
                    }
                    break;
                case 6:
                    if (newValue.kind === GridCellKind.Uri) {
                        employee.email = newValue.data;
                    }
                    break;
            }

            newData[row] = employee;
            return newData;
        });
    }, []);

    const customTheme = useMemo(() => ({
        accentColor: "#4F46E5",
        accentFg: "#FFFFFF",
        textDark: "#111827",
        bgCell: "#FFFFFF",
        bgHeader: "#F9FAFB",
        borderColor: "#E5E7EB",
        fontFamily: "system-ui, -apple-system, sans-serif"
    }), []);

    return (
        <div style={{ padding: "20px" }}>
            <h2>직원 관리 시스템</h2>
            <div style={{ height: "400px", width: "100%" }}>
                <DataEditor
                    getCellContent={getCellContent}
                    columns={columns}
                    rows={data.length}
                    onCellEdited={onCellEdited}
                    gridSelection={selection}
                    onGridSelectionChange={setSelection}
                    theme={customTheme}
                    smoothScrollX={true}
                    smoothScrollY={true}
                    allowResize={true}
                    getCellsForSelection={true}
                />
            </div>

            {selection?.current && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#f0f0f0" }}>
                    선택된 셀: ({selection.current.cell[0]}, {selection.current.cell[1]})
                </div>
            )}
        </div>
    );
}
```

### 비동기 데이터 로딩 예제
```typescript
import React, { useState, useCallback, useEffect } from "react";
import { DataEditor, GridCellKind, GridColumn, Item, GridCell } from "@glideapps/glide-data-grid";

interface AsyncDataItem {
    id: number;
    name: string;
    description: string;
}

export function AsyncDataGrid() {
    const [loadedData, setLoadedData] = useState<Map<number, AsyncDataItem>>(new Map());
    const [loadingRows, setLoadingRows] = useState<Set<number>>(new Set());
    const totalRows = 10000; // 전체 데이터 행 수

    const columns: GridColumn[] = [
        { title: "ID", width: 80 },
        { title: "이름", width: 150 },
        { title: "설명", width: 300 }
    ];

    // 데이터 로드 함수 (실제로는 API 호출)
    const loadRowData = useCallback(async (row: number) => {
        if (loadedData.has(row) || loadingRows.has(row)) {
            return;
        }

        setLoadingRows(prev => new Set([...prev, row]));

        try {
            // 가상의 API 호출 시뮬레이션
            await new Promise(resolve => setTimeout(resolve, 500));

            const data: AsyncDataItem = {
                id: row + 1,
                name: `항목 ${row + 1}`,
                description: `이것은 ${row + 1}번째 항목의 설명입니다.`
            };

            setLoadedData(prev => new Map([...prev, [row, data]]));
        } catch (error) {
            console.error(`행 ${row} 로드 실패:`, error);
        } finally {
            setLoadingRows(prev => {
                const newSet = new Set([...prev]);
                newSet.delete(row);
                return newSet;
            });
        }
    }, [loadedData, loadingRows]);

    const getCellContent = useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        const data = loadedData.get(row);

        if (!data) {
            // 데이터가 로드되지 않은 경우 로딩 시작
            loadRowData(row);

            return {
                kind: GridCellKind.Loading,
                allowOverlay: false
            };
        }

        switch (col) {
            case 0:
                return {
                    kind: GridCellKind.Number,
                    data: data.id,
                    displayData: data.id.toString(),
                    allowOverlay: false
                };
            case 1:
                return {
                    kind: GridCellKind.Text,
                    data: data.name,
                    displayData: data.name,
                    allowOverlay: true
                };
            case 2:
                return {
                    kind: GridCellKind.Text,
                    data: data.description,
                    displayData: data.description,
                    allowOverlay: true
                };
            default:
                return {
                    kind: GridCellKind.Text,
                    data: "",
                    displayData: "",
                    allowOverlay: false
                };
        }
    }, [loadedData, loadRowData]);

    return (
        <div style={{ padding: "20px" }}>
            <h2>비동기 데이터 그리드</h2>
            <p>로딩 중인 행: {loadingRows.size}개</p>
            <p>로드된 행: {loadedData.size}개 / {totalRows}개</p>

            <div style={{ height: "500px", width: "100%" }}>
                <DataEditor
                    getCellContent={getCellContent}
                    columns={columns}
                    rows={totalRows}
                    smoothScrollY={true}
                    smoothScrollX={true}
                />
            </div>
        </div>
    );
}
```

---

## 마무리

Glide Data Grid Core는 강력하고 유연한 데이터 그리드 솔루션을 제공합니다. 이 가이드를 통해 기본적인 사용법부터 고급 기능까지 학습하셨기를 바랍니다.

### 추가 리소스
- [공식 GitHub 저장소](https://github.com/glideapps/glide-data-grid)
- [Storybook 데모](https://glide-data-grid.com)
- [API 레퍼런스](https://glide-data-grid.com/docs)

### 도움이 필요하시면
- GitHub Issues에 문제를 제기하세요
- 커뮤니티 디스카션에 참여하세요
- 문서를 지속적으로 확인하세요

즐거운 개발되세요! 🚀