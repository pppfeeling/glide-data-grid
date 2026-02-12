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


const renderers = React.useMemo<readonly InternalCellRenderer<InnerGridCell>[]>(() => {
        return [
            ...AllCellRenderers,
            {
                myCustomRenderer
            } as InternalCellRenderer<InnerGridCell>,
        ];
    }, []);

// 사용
<DataEditor
    getCellContent={getCellContent}
    columns={columns}
    rows={rows}
    renderers={[renderers]}
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
| 속성명              | 타입                          | 설명                                                                  |
| ---------------- | --------------------------- | ------------------------------------------------------------------- |
| `kind`           | `"header"`                  | 이벤트가 발생한 위치의 종류를 나타냅니다. 항상 `"header"` 값을 가집니다.                      |
| `location`       | `readonly [number, number]` | 클릭된 헤더의 그리드 내 좌표입니다. `[컬럼 인덱스, -1]` 형식이며, 헤더 영역이므로 행 인덱스는 항상 -1입니다. |
| `bounds`         | `Rectangle`                 | 클릭된 헤더 셀의 화면상 위치와 크기 정보입니다. `{ x, y, width, height }` 형태의 객체입니다.    |
| `group`          | `string`                    | 헤더가 속한 그룹의 이름입니다. 그룹이 없으면 빈 문자열일 수 있습니다.                            |
| `localEventX`    | `number`                    | 클릭된 헤더 셀 내부에서의 마우스 X 좌표입니다. (셀의 왼쪽 상단 기준)                           |
| `localEventY`    | `number`                    | 클릭된 헤더 셀 내부에서의 마우스 Y 좌표입니다. (셀의 왼쪽 상단 기준)                           |
| `button`         | `number`                    | 클릭된 마우스 버튼을 나타냅니다. (0: 왼쪽, 1: 가운데, 2: 오른쪽)                          |
| `isTouch`        | `boolean`                   | 터치 이벤트로 인해 발생했는지 여부입니다.                                             |
| `isDoubleClick`  | `boolean`                   | 더블 클릭 이벤트인지 여부입니다.                                                  |
| `shiftKey`       | `boolean`                   | Shift 키가 함께 눌렸는지 여부입니다.                                             |
| `ctrlKey`        | `boolean`                   | Ctrl 키가 함께 눌렸는지 여부입니다.                                              |
| `metaKey`        | `boolean`                   | Meta 키(Mac의 Command, Windows의 Win 키)가 함께 눌렸는지 여부입니다.                |
| `preventDefault` | `() => void`                | 호출 시, 해당 클릭 이벤트의 기본 동작(예: 정렬)을 막습니다.                                |
 
  
```typescript
//colInde : 컬럼 인덱스(0부터 시작)
/*

*/
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


### 헤더  menu click
```typescript
const onHeaderMenuClick = React.useCallback((col: number, bounds: Rectangle) => {
        setMenu({ col, bounds });
    }, []);
    
<DataEditor
		onHeaderMenuClick={onHeaderMenuClick}
		
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


---

## 성능 최적화

### 1. 가상화 설정
```typescript
// 더 나은 스크롤 성능을 위한 설정
<DataEditor
    smoothScrollX={true}
    smoothScrollY={true}
    isDraggable={false}     // 드래그 비활성화 boolean | "header" | "cell"
    // ... 다른 props
/>
```

### 2. getCellContent 사용
```typescript


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

### 3. 비동기 데이터 처리
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

// 검색 결과를 수작업으로 제어 하는데 사용됨. 
// 아래 result는 3컬럼의 검색어 입력에 따른 row가 선탣된다.
const searchResults = React.useMemo(() => {
		const result: Item[] = [];
		for (let i = 0; i < searchValue.length; i++) {
				result.push([3, i]);
		}
		return result;
}, [searchValue.length]);


return (
	<>
		 <Hotkey keys="mod+f" onAction={() => setShowSearch(cv => !cv)} />
	   <DataEditor
	        searchResults={searchResults}
	        searchValue={searchValue}
	        onSearchValueChange={setSearchValue}
	        showSearch={showSearch}
	        onSearchClose={() => {
							setShowSearch(false);
							setSearchValue("");
					}}
	   />
	</>
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
    // ... 다른 props
/>
```

### 3. 행 그룹핑
- useRowGrouping
	- 그룹화 설정 객체(rowGrouping)와 전체 행의 수(rows)를 입력
	- return 값
		1. mapper
				   * 역할: 그리드에 보이는 셀의 좌표(item)를 그룹화 정보로 변환해주는 매핑 함수입니다.
		   * 입력: [column, row] 형태의 셀 좌표(Item).
		   * 반환: 다음과 같은 정보가 담긴 객체.
		       * isGroupHeader: 해당 행이 그룹 헤더인지 여부 (boolean).
		       * originalIndex: 그룹화를 무시했을 때의 원본 데이터 행 인덱스. 그룹 헤더가 아닐 경우, 이 인덱스를 사용해 실제  데이터를 가져옵니다.
		       * path: 그룹 계층 구조 내에서의 경로. (예: [0]은 첫 번째 최상위 그룹, [0, 1]은 첫 번째 그룹의 두 번째 하위 그룹)
		 2.  getRowGroupingForPath
				   * 역할: path를 이용해 전체 그룹 설정(groups 배열)에서 특정 그룹의 정보를 찾아주는 탐색 함수입니다.
			   * 사용: onCellClicked 함수에서 클릭된 그룹 헤더의 현재 상태(isCollapsed 등)를 확인할 때 사용됩니다.
		
			3.updateRowGroupingByPath
				   * 역할: 특정 path에 해당하는 그룹의 상태를 불변성(immutability)을 유지하며 업데이트한 새로운 groups 배열을 반환하는 업데이트 함수입니다.
		   * 사용: onCellClicked 함수에서 그룹 헤더를 클릭했을 때, 해당 그룹의 isCollapsed 상태를 토글(toggle)하여 새로운 groups 배열을 만들고, 이를 setRowGrouping을 통해 상태에 반영할 때 사용됩니다. React에서 상태를 직접 수정하지 않고 새로운  객체를 생성하여 업데이트하는 패턴을 쉽게 구현하도록 도와줍니다

```typescript
import { useRowGrouping } from "@glideapps/glide-data-grid";

const { cols, getCellContent } = useMockDataGenerator(100);
    const rows = 100_000;

    const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
        groups: [
            {
                headerIndex: 10,
                isCollapsed: true,
                subGroups: [
                    {
                        headerIndex: 15,
                        isCollapsed: false,
                    },
                    {
                        headerIndex: 20,
                        isCollapsed: false,
                    },
                ],
            },
            {
                headerIndex: 30,
                isCollapsed: false,
            },
            ...Array.from({ length: 100 }, (_value, i): RowGroupingOptions["groups"][number] => {
                return {
                    headerIndex: (rows / 100) * i,
                    isCollapsed: false,
                };
            }),
        ],
        height: 55,
        navigationBehavior: "block",
        selectionBehavior: "block-spanning",
        themeOverride: {
            bgCell: "rgba(0, 100, 255, 0.1)",
        },
    }));

    const { mapper, getRowGroupingForPath, updateRowGroupingByPath } = useRowGrouping(rowGrouping, rows);

    const onCellClicked = React.useCallback(
        (item: Item) => {
            const { path, isGroupHeader } = mapper(item);

            if (isGroupHeader && item[0] === 0) {
                const group = getRowGroupingForPath(rowGrouping.groups, path);

                setRowGrouping(prev => {
                    const result: RowGroupingOptions = {
                        ...prev,
                        groups: updateRowGroupingByPath(prev.groups, path, { isCollapsed: !group.isCollapsed }),
                    };

                    return result;
                });
            }
        },
        [getRowGroupingForPath, mapper, rowGrouping.groups, updateRowGroupingByPath]
    );

<DataEditor
    rows={groupedRows}
    getCellContent={getCellContent}
    getRowInfo={getRowInfo}  // 그룹 정보 제공
    // ... 다른 props
/>
```

### 4. 붙여넣기
 1. `onPaste` Prop 처리: 이벤트가 발생하면, DataEditor는 사용자로부터 전달받은 onPaste prop의 값을 확인합니다.
       * `onPaste={true}` (예제와 동일): DataEditor가 붙여넣기 이벤트를 직접 처리하도록 지시합니다. 브라우저의 기본 동작을 막고(event.preventDefault()) 내부 붙여넣기 로직을 실행합니다.
	       * onCellEdited를 실행해 paste한 데이터를 넣도셀 마다 계속 호출되면서 처리되기 때문에 많은 셀을 처리한다면 onPaste를 함수로 구현해 한번에 처리하도록 한다.
       * onPaste가 함수일 경우: 사용자가 제공한 커스텀 함수를 실행하여 붙여넣기 동작을 직접 제어할 수 있게 합니다.
       * onPaste={false} 또는 undefined: 붙여넣기 기능을 비활성화하거나, 제한적인 기본 동작(현재 선택된 단일 셀에만 텍스트 붙여넣기)을 수행합니다.
	       * onPaste?: ((target: Item, values: string[][]) => boolean) | boolean;
2. 처리순서
	1.  사용자가 붙여넣기를 시도하면 onPaste 이벤트를 가로챕니다.
	2.  클립보드에서 탭(tab)으로 구분된 텍스트 데이터를 읽어옵니다.
	3.  data-editor-fns.ts의 헬퍼 함수를 사용해 이 텍스트를 2차원 배열로 파싱합니다.
	4.  현재 선택된 셀부터 시작하여, 파싱된 데이터를 그리드에 하나씩 채워 넣습니다. 이 과정에서 각 셀의 변경 사항을 알리기 위해 onCellEdited 콜백을 호출합니다
	5. 처리후 selection을 처리된 데이터 만큼 확장한다.

```typescript

const getCellsForSelection = React.useCallback(
        (selection: Rectangle): CellArray => {
            const result: GridCell[][] = [];

            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
	                 const dataRow = myBigData[y];
	                const field = columns[x].id; // 'name', 'title' 등
	                const cellData = dataRow[field];
                    row.push(
                    {
		                    kind: "text",
		                    data: cellData,
		                    displayData: String(cellData),
		                    allowOverlay: false,
		                })
                }
                result.push(row);
            }

            return result;
        },
        []
    );

<DataEditor
    onPaste={true}
    onCellEdited={setCellValue}
    // ... 다른 props
/>
```

### 5. 복사하기
- getCellsForSelection={true} 일때 copy한 cell에 대해 getCellContent가 호출되면서 처리한다.
	- getCellContent는 한개씩 호출됨으로 많은 셀을 복사할때는 느려진다. 이때 이 prop를 구현해 한번에 처리 하도록 한다.
- getCellsForSelection이 없으면 copy가 동작하지 않는다.
- getCellsForSelection= function일때 이 function에서 return한 값이 copy한 cell이 처리된다.

```typescript

const getCellsForSelection = React.useCallback(
        (selection: Rectangle): CellArray => {
            const result: GridCell[][] = [];

            for (let y = selection.y; y < selection.y + selection.height; y++) {
                const row: GridCell[] = [];
                for (let x = selection.x; x < selection.x + selection.width; x++) {
	                 const dataRow = myBigData[y];
	                const field = columns[x].id; // 'name', 'title' 등
	                const cellData = dataRow[field];
                    row.push(
                    {
		                    kind: "text",
		                    data: cellData,
		                    displayData: String(cellData),
		                    allowOverlay: false,
		                })
                }
                result.push(row);
            }

            return result;
        },
        []
    );

<DataEditor
    onCellEdited={setCellValue}
    // ... 다른 props
/>
```

### 6. Cell Validate


### 7. Add/Update/Delete row

### add/delete column

### 8. freeze column / row

### Drag

### Drop

### alignment

### provideEditor