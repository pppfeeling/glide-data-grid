# ✏️ Data Manipulation - 데이터 조작

그리드에서 데이터를 추가, 수정, 검증하는 방법을 학습합니다.

---

## 📘 Add Data - 데이터 추가

### 개요
트레일링 로우(Trailing Row)를 사용하여 그리드 하단에 새로운 데이터를 추가하는 방법입니다.

### 핵심 기능
- 그리드 마지막에 특별한 행 표시
- 클릭 또는 키보드로 새 행 추가
- 커스텀 힌트 텍스트 설정

### 기본 구현
```typescript
function AddDataGrid() {
    const [numRows, setNumRows] = React.useState(50);
    const [data, setData] = React.useState(/* 초기 데이터 */);

    const onRowAppended = React.useCallback(() => {
        const newRow = numRows;

        // 새 행 초기화
        for (let c = 0; c < columns.length; c++) {
            // 빈 셀로 초기화
            data[newRow][c] = "";
        }

        setNumRows(prev => prev + 1);
    }, [numRows, data]);

    return (
        <DataEditor
            columns={columns}
            rows={numRows}
            getCellContent={getCellContent}
            onCellEdited={onCellEdited}
            trailingRowOptions={{
                sticky: true,        // 스크롤 시 고정
                tint: true,          // 배경색 구분
                hint: "새 행 추가...", // 힌트 텍스트
            }}
            onRowAppended={onRowAppended}
        />
    );
}
```

### trailingRowOptions 속성
```typescript
interface TrailingRowOptions {
    sticky: boolean;    // 하단 고정 여부
    tint: boolean;      // 배경색 다르게 표시
    hint: string;       // 표시할 힌트 텍스트
    addIcon?: string;   // 커스텀 추가 아이콘
    targetColumn?: number | GridColumn; // 특정 컬럼에만 표시
}
```

### 키보드 사용
- 마지막 행에서 **아래 화살표** - 트레일링 로우로 이동
- 트레일링 로우에서 **Enter** - 새 행 추가

---

## 📘 Add Data to Top - 상단에 데이터 추가

### 개요
새로운 행을 그리드 맨 위에 추가하는 방법입니다.

### 구현 방법
```typescript
function AddToTopGrid() {
    const [data, setData] = React.useState([...initialData]);

    const addRowToTop = React.useCallback(() => {
        setData(prev => [
            createEmptyRow(), // 새 빈 행 생성
            ...prev,          // 기존 데이터
        ]);
    }, []);

    return (
        <>
            <button onClick={addRowToTop}>상단에 추가</button>
            <DataEditor
                columns={columns}
                rows={data.length}
                getCellContent={getCellContent}
                onCellEdited={onCellEdited}
            />
        </>
    );
}
```

### 스크롤 위치 유지
```typescript
const gridRef = React.useRef<DataEditorRef>(null);

const addRowToTop = React.useCallback(() => {
    setData(prev => [createEmptyRow(), ...prev]);

    // 스크롤 위치 조정 (선택사항)
    setTimeout(() => {
        gridRef.current?.scrollTo(0, 0);
    }, 0);
}, []);
```

---

## 📘 Add Data to Middle - 중간에 데이터 삽입

### 개요
특정 위치에 새로운 행을 삽입하는 방법입니다.

### 구현 예시
```typescript
function InsertRowGrid() {
    const [data, setData] = React.useState([...initialData]);

    const insertRowAt = React.useCallback((position: number) => {
        setData(prev => [
            ...prev.slice(0, position),
            createEmptyRow(),
            ...prev.slice(position),
        ]);
    }, []);

    // 선택된 행 다음에 삽입
    const onRowContext = React.useCallback((row: number, bounds: Rectangle) => {
        const menuItems = [
            {
                label: "위에 행 삽입",
                onClick: () => insertRowAt(row),
            },
            {
                label: "아래에 행 삽입",
                onClick: () => insertRowAt(row + 1),
            },
        ];

        showContextMenu(bounds, menuItems);
    }, [insertRowAt]);

    return (
        <DataEditor
            columns={columns}
            rows={data.length}
            getCellContent={getCellContent}
            onRowContext={onRowContext}
        />
    );
}
```

### 활용 시나리오
- 우클릭 메뉴로 행 삽입
- 버튼으로 특정 위치 삽입
- 드래그 앤 드롭으로 이동 후 삽입

---

## 📘 Add Column - 컬럼 추가

### 개요
동적으로 새로운 컬럼을 추가하는 방법입니다.

### 기본 구현
```typescript
function AddColumnGrid() {
    const [columns, setColumns] = React.useState<GridColumn[]>([
        { title: "이름", id: "name", width: 150 },
        { title: "이메일", id: "email", width: 200 },
    ]);

    const addColumn = React.useCallback(() => {
        const newColumn: GridColumn = {
            title: "새 컬럼",
            id: `col_${Date.now()}`,
            width: 150,
        };

        setColumns(prev => [...prev, newColumn]);
    }, []);

    return (
        <>
            <button onClick={addColumn}>컬럼 추가</button>
            <DataEditor
                columns={columns}
                rows={100}
                getCellContent={getCellContent}
                onColumnResize={(col, width) => {
                    setColumns(prev => {
                        const newCols = [...prev];
                        newCols[col.pos].width = width;
                        return newCols;
                    });
                }}
            />
        </>
    );
}
```

### 새 컬럼 버튼
```typescript
<DataEditor
    rightElement={
        <button onClick={addColumn} style={buttonStyle}>
            ➕ 컬럼 추가
        </button>
    }
    rightElementProps={{
        fill: false,
        sticky: true,
    }}
    columns={columns}
    rows={100}
/>
```

### 주의사항
- 컬럼 추가 시 기존 데이터의 `getCellContent` 로직 업데이트 필요
- 컬럼 ID는 고유해야 함
- 새 컬럼의 기본값 설정 고려

---

## 📘 Validate Data - 데이터 검증

### 개요
사용자 입력을 검증하고 잘못된 데이터를 방지하는 방법입니다.

### 실시간 검증
```typescript
function ValidateGrid() {
    const [errors, setErrors] = React.useState<Map<string, string>>(new Map());

    const validateCell = (cell: Item, value: EditableGridCell): boolean => {
        const [col, row] = cell;

        // 이메일 검증
        if (col === 2) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.data as string)) {
                setErrors(prev => new Map(prev).set(`${col}-${row}`, "유효하지 않은 이메일"));
                return false;
            }
        }

        // 나이 검증
        if (col === 3) {
            const age = value.data as number;
            if (age < 0 || age > 150) {
                setErrors(prev => new Map(prev).set(`${col}-${row}`, "나이는 0-150 사이여야 합니다"));
                return false;
            }
        }

        return true;
    };

    const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
        if (!validateCell(cell, newValue)) {
            // 검증 실패 - 변경사항 무시
            return;
        }

        // 검증 성공 - 데이터 업데이트
        const [col, row] = cell;
        setData(prev => {
            const newData = [...prev];
            newData[row][col] = newValue.data;
            return newData;
        });

        // 에러 제거
        setErrors(prev => {
            const newErrors = new Map(prev);
            newErrors.delete(`${col}-${row}`);
            return newErrors;
        });
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={data.length}
            getCellContent={(cell) => {
                const content = getCellContent(cell);
                const [col, row] = cell;
                const errorKey = `${col}-${row}`;

                // 에러가 있으면 셀 스타일 변경
                if (errors.has(errorKey)) {
                    return {
                        ...content,
                        themeOverride: {
                            bgCell: "#fee",
                            textDark: "#c00",
                        },
                    };
                }

                return content;
            }}
            onCellEdited={onCellEdited}
        />
    );
}
```

### 검증 유형

#### 1. 필수 입력 검증
```typescript
if (!value.data || value.data.toString().trim() === "") {
    return false; // 빈 값 거부
}
```

#### 2. 형식 검증
```typescript
// 이메일
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 전화번호
const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;

// URL
const urlRegex = /^https?:\/\/.+/;
```

#### 3. 범위 검증
```typescript
// 숫자 범위
if (value.data < min || value.data > max) {
    return false;
}

// 문자열 길이
if (value.data.length < 3 || value.data.length > 100) {
    return false;
}
```

#### 4. 중복 검증
```typescript
const isDuplicate = data.some((row, idx) =>
    idx !== rowIndex && row[colIndex] === value.data
);

if (isDuplicate) {
    showError("이미 존재하는 값입니다");
    return false;
}
```

### 에러 표시 방법

#### 셀 배경색 변경
```typescript
getCellContent: (cell) => ({
    ...baseContent,
    themeOverride: hasError ? {
        bgCell: "#fee",
        textDark: "#c00",
    } : undefined,
})
```

#### 툴팁 표시
```typescript
<DataEditor
    onCellsEdited={(newValues) => {
        for (const { location, value } of newValues) {
            if (!validate(location, value)) {
                showTooltip(location, "검증 실패 메시지");
            }
        }
    }}
/>
```

### 비동기 검증
```typescript
const onCellEdited = async (cell: Item, newValue: EditableGridCell) => {
    const [col, row] = cell;

    if (col === emailColumnIndex) {
        // 서버에 이메일 중복 확인
        const isDuplicate = await checkEmailDuplicate(newValue.data);

        if (isDuplicate) {
            showError("이미 사용 중인 이메일입니다");
            return;
        }
    }

    // 데이터 업데이트
    updateData(cell, newValue);
};
```

---

## 🎓 학습 포인트

### Data Manipulation 카테고리 완료 후 할 수 있는 것
✅ 다양한 위치에 데이터 추가 (상단/중간/하단)
✅ 동적으로 컬럼 추가
✅ 실시간 데이터 검증
✅ 사용자 입력 제어

### 실전 활용
- 사용자가 직접 데이터를 입력하는 폼 구현
- Excel과 유사한 동적 테이블
- 데이터 무결성 보장

### 다음 단계
**Customization & Theming** 카테고리로 이동하여 그리드의 외관을 커스터마이징하는 방법을 학습하세요!