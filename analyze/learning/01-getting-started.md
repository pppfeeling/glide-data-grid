# 🚀 Getting Started - 시작하기

DataEditor의 기본 개념과 필수 기능을 학습합니다.

---

## 📘 All Cell Kinds - 모든 셀 타입

### 개요
DataEditor에서 지원하는 모든 내장 셀 타입을 한눈에 확인할 수 있습니다.

### 지원하는 셀 타입
1. **Text** - 기본 텍스트
2. **Number** - 숫자 (포맷팅 지원)
3. **Boolean** - 체크박스
4. **Image** - 이미지 URL
5. **Markdown** - 마크다운 렌더링
6. **URI** - 클릭 가능한 링크
7. **Bubble** - 태그/뱃지
8. **Drilldown** - 드릴다운 아이콘
9. **Loading** - 로딩 상태
10. **Protected** - 보호된 셀 (읽기 전용)
11. **Row ID** - 행 식별자
12. **Marker** - 마커 표시

### 사용 예시
```typescript
import { GridCellKind } from "@glideapps/glide-data-grid";

const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;

    // 텍스트 셀
    if (col === 0) {
        return {
            kind: GridCellKind.Text,
            data: "Hello World",
            displayData: "Hello World",
            allowOverlay: true,
        };
    }

    // 숫자 셀
    if (col === 1) {
        return {
            kind: GridCellKind.Number,
            data: 1234.56,
            displayData: "$1,234.56",
            allowOverlay: true,
        };
    }

    // 불린 셀
    if (col === 2) {
        return {
            kind: GridCellKind.Boolean,
            data: true,
            allowOverlay: false,
        };
    }
};
```

### 주요 속성
- `kind` - 셀 타입 지정
- `data` - 실제 데이터 값
- `displayData` - 화면에 표시될 값
- `allowOverlay` - 편집 오버레이 허용 여부
- `readonly` - 읽기 전용 여부

### 활용 팁
- 각 셀 타입마다 고유한 렌더링과 편집 방식 제공
- `allowOverlay: true`로 설정 시 더블클릭으로 편집 가능
- 커스텀 셀 타입도 추가 가능 (Custom Renderers 참고)

---

## 📘 Small Editable Grid - 간단한 편집 가능 그리드

### 개요
가장 기본적인 편집 가능한 데이터 그리드 구현 예제입니다.

### 핵심 기능
- 셀 더블클릭으로 편집
- 다양한 셀 타입의 전용 에디터
- Enter/Escape 키로 편집 완료/취소

### 기본 구현
```typescript
import { DataEditor } from "@glideapps/glide-data-grid";

function MyGrid() {
    const [data, setData] = React.useState(/* 초기 데이터 */);

    const columns: GridColumn[] = [
        { title: "이름", id: "name" },
        { title: "나이", id: "age" },
        { title: "이메일", id: "email" },
    ];

    const getCellContent = React.useCallback((cell: Item): GridCell => {
        const [col, row] = cell;
        return {
            kind: GridCellKind.Text,
            data: data[row][col],
            displayData: data[row][col],
            allowOverlay: true, // 편집 허용
        };
    }, [data]);

    const onCellEdited = React.useCallback((cell: Item, newValue: EditableGridCell) => {
        const [col, row] = cell;
        // 데이터 업데이트 로직
        setData(prev => {
            const newData = [...prev];
            newData[row][col] = newValue.data;
            return newData;
        });
    }, []);

    return (
        <DataEditor
            columns={columns}
            rows={data.length}
            getCellContent={getCellContent}
            onCellEdited={onCellEdited}
        />
    );
}
```

### 필수 Props
- `columns` - 컬럼 정의 배열
- `rows` - 총 행 수
- `getCellContent` - 셀 데이터 제공 함수
- `onCellEdited` - 셀 편집 완료 핸들러

### 편집 모드
1. **더블클릭** - 셀 편집 시작
2. **Enter** - 편집 완료 및 다음 행 이동
3. **Tab** - 편집 완료 및 다음 열 이동
4. **Escape** - 편집 취소
5. **타이핑** - 직접 입력 시작 (기존 값 덮어쓰기)

### 주의사항
- `getCellContent`는 반드시 `React.useCallback`으로 메모이제이션
- 셀 타입에 따라 다른 에디터 자동 제공
- `allowOverlay: false`시 편집 불가능

---

## 📘 Content Alignment - 콘텐츠 정렬

### 개요
셀 내부의 텍스트와 콘텐츠를 정렬하는 방법을 학습합니다.

### 정렬 옵션
DataEditor는 가로/세로 정렬을 모두 지원합니다.

#### 1. 텍스트 가로 정렬
```typescript
const getCellContent = (cell: Item): GridCell => {
    return {
        kind: GridCellKind.Text,
        data: "중앙 정렬",
        displayData: "중앙 정렬",
        contentAlign: "center", // "left" | "center" | "right"
    };
};
```

#### 2. 컬럼 단위 정렬
```typescript
const columns: GridColumn[] = [
    {
        title: "이름",
        id: "name",
        themeOverride: {
            textAlign: "left", // 왼쪽 정렬
        },
    },
    {
        title: "금액",
        id: "amount",
        themeOverride: {
            textAlign: "right", // 오른쪽 정렬 (숫자에 적합)
        },
    },
];
```

### 정렬 타입별 활용
- **left** - 기본값, 텍스트에 적합
- **center** - 상태, 아이콘, 짧은 텍스트
- **right** - 숫자, 통화, 날짜

### 세로 정렬
```typescript
// 행 높이가 큰 경우 세로 정렬 설정
const theme = {
    cellVerticalPadding: 10,
    cellHorizontalPadding: 8,
};
```

### 실전 예시
```typescript
const getCellContent = (cell: Item): GridCell => {
    const [col, row] = cell;

    // 첫 번째 열: 왼쪽 정렬 (이름)
    if (col === 0) {
        return {
            kind: GridCellKind.Text,
            data: "홍길동",
            displayData: "홍길동",
            contentAlign: "left",
        };
    }

    // 두 번째 열: 오른쪽 정렬 (금액)
    if (col === 1) {
        return {
            kind: GridCellKind.Number,
            data: 50000,
            displayData: "₩50,000",
            contentAlign: "right",
        };
    }

    // 세 번째 열: 중앙 정렬 (상태)
    if (col === 2) {
        return {
            kind: GridCellKind.Boolean,
            data: true,
            contentAlign: "center",
        };
    }
};
```

### 활용 팁
- 숫자와 금액은 항상 오른쪽 정렬 권장
- 상태 표시나 아이콘은 중앙 정렬
- 긴 텍스트는 왼쪽 정렬이 가독성 좋음
- 컬럼별로 일관된 정렬 유지

---

## 🎓 학습 포인트

### Getting Started 카테고리 완료 후 할 수 있는 것
✅ 다양한 셀 타입 사용
✅ 기본 편집 가능한 그리드 구현
✅ 셀 콘텐츠 정렬
✅ 데이터 바인딩과 업데이트

### 다음 단계
이제 **Data Manipulation** 카테고리로 이동하여 데이터 추가, 삭제, 검증 방법을 학습하세요!