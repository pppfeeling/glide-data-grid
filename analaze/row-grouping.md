1.  rowGrouping Prop

rowGrouping은 <DataEditor /> 컴포넌트에 전달하는 설정 객체(prop) 입니다. 이 객체를 통해 행 그룹의 구조와 동작, 스타일을 정의합니다.

주요 속성은 다음과 같습니다.

- groups: 어떤 행이 그룹 헤더가 될지를 정의하는 배열입니다. 각 그룹 객체는 다음을 포함합니다.
    - headerIndex: 원본 데이터에서 그룹 헤더로 사용할 행의 인덱스(index)입니다.
    - isCollapsed: 그룹이 현재 접혀 있는지 여부 (true/false).
- height: 그룹 헤더 행의 높이를 픽셀 단위로 지정합니다.
- themeOverride: 그룹 헤더에만 적용할 별도의 테마를 지정하여 일반 데이터 행과 시각적으로 구분할 수 있습니다. (예: 배경색 변경)
- navigationBehavior: 키보드 탐색 시 그룹 헤더를 건너뛸지 여부 등을 설정합니다.
- selectionBehavior: 셀 선택 시 그룹 헤더를 가로지르는 범위 선택을 막을지 등을 설정합니다.

예제 코드 (`row-grouping.stories.tsx`)

```tsx
const [rowGrouping, setRowGrouping] = React.useState<RowGroupingOptions>(() => ({
    groups: [
        { headerIndex: 0, isCollapsed: false }, // 0번 행을 그룹 헤더로 지정
        { headerIndex: 30, isCollapsed: false }, // 30번 행을 그룹 헤더로 지정
    ],
    height: 55, // 그룹 헤더의 높이는 55px
    themeOverride: {
        // 그룹 헤더의 배경색을 변경
        bgCell: "rgba(0, 100, 255, 0.1)",
    },
}));

<DataEditor
    {...defaultProps}
    rowGrouping={rowGrouping} // 설정 객체를 DataEditor에 전달
    rows={rows}
/>;
```

2. useRowGrouping Hook

useRowGrouping은 rowGrouping 설정을 기반으로 그리드와 상호작용하는 로직을 쉽게 구현하도록 돕는 헬퍼(helper) Hook입니다.

이 Hook은 다음과 같은 유용한 값과 함수들을 반환합니다.

- `mapper` 함수: 가장 중요한 함수입니다. 그리드의 시각적 행 인덱스(visual index) 와 원본 데이터 인덱스(original index) 사이를 변환해주는 역할을 합니다.
    - 그룹이 접히거나 펼쳐지면 화면에 보이는 행의 순서가 계속 바뀝니다. mapper 함수에 현재 보이는 행의 위치(item)를 전달하면, 그 행이 그룹 헤더인지, 만약 데이터 행이라면 원본 데이터에서는 몇 번째 행인지 등의 정보를 알려줍니다.
- updateRowGroupingByPath: 특정 그룹의 상태(예: isCollapsed)를 불변성(immutability)을 유지하며 업데이트한 새로운 groups 배열을 반환합니다. React의 상태를 업데이트할 때 매우 유용합니다.
- getRowGroupingForPath: 특정 그룹의 현재 설정 정보를 가져옵니다.

### 어떻게 함께 동작하는가? (예제 분석)

row-grouping.stories.tsx 예제는 이 둘이 어떻게 함께 동작하는지 잘 보여줍니다.

1. 그룹 헤더 클릭 시 접고 펴기 (onCellClicked)

```tsx
const { mapper, getRowGroupingForPath, updateRowGroupingByPath } = useRowGrouping(rowGrouping, rows);

const onCellClicked = React.useCallback(
    (item: Item) => {
        // 1. mapper로 클릭된 셀의 정보를 가져옵니다.
        const { path, isGroupHeader } = mapper(item);

        // 2. 그룹 헤더가 클릭되었는지 확인합니다.
        if (isGroupHeader && item[0] === 0) {
            // 3. 현재 그룹의 상태를 가져옵니다.

            const group = getRowGroupingForPath(rowGrouping.groups, path);
            11;
            // 4. updateRowGroupingByPath로 isCollapsed 상태를 뒤집은 새 배열을 만듭니다.
            setRowGrouping(prev => ({
                ...prev,
                groups: updateRowGroupingByPath(prev.groups, path, { isCollapsed: !group.isCollapsed }),
            }));
        }
    },
    [
        /* ... */
    ]
);
```

2. 올바른 데이터 표시하기 (getCellContentMangled)

그룹이 접히면 50번째에 보이던 행이 20번째로 당겨져 보일 수 있습니다. mapper는 이 문제를 해결합니다.

```tsx
const getCellContentMangled = React.useCallback<DataEditorAllProps["getCellContent"]>(
    item => {
        // 1. mapper로 현재 셀의 정보를 변환합니다.
        const { isGroupHeader, originalIndex } = mapper(item);

        // 2. 그룹 헤더라면, 그룹 헤더용 셀을 반환합니다.
        if (isGroupHeader) {
            return {
                kind: GridCellKind.Text,
                data: `I am a group header`,

                // ...
            };
        }

        // 3. 일반 데이터 행이라면, 변환된 originalIndex를 사용해
        // 원본 데이터에서 올바른 내용을 가져와 반환합니다.
        return getCellContent(originalIndex);
    },
    [getCellContent, mapper]
);
```

요약

- `rowGrouping` (Prop): "어떻게 그룹을 만들고 보여줄 것인가?"에 대한 정적인 설정입니다.
- `useRowGrouping` (Hook): rowGrouping 설정을 바탕으로 "사용자 인터랙션(클릭, 데이터 요청 등)을 어떻게 처리할 것인가?"에 대한 동적인 로직을 제공합니다.
- `mapper` (함수): 이 둘을 연결하는 핵심적인 다리 역할로, 시각적 위치와 실제 데이터 위치 사이의 변환을 책임집니다.

headerIndex를 10과 30으로 지정하면, 그룹 헤더는 실제로 화면의 0번째와 20번째 행에 나타나는 것이 올바른 동작입니다.

이유는 rowGrouping 기능의 핵심 동작 방식 때문입니다.

rowGrouping이 활성화되면, 그리드는 정의된 그룹에 속한 데이터만을 보여주는 새로운 뷰(view)를 생성합니다. groups 배열에 정의된 첫 번째 그룹부터 렌더링을 시작하며, 그 이전의 데이터 행(이 경우 0~9번 행)은 화면에 표시되지 않습니다.

### 동작 방식 상세 설명

- `headerIndex`의 의미: 이 값은 화면에 표시되는 위치가 아니라, 그룹화되지 않은 원본 데이터에서의 인덱스를 의미합니다.
- 렌더링 시작점: groups 배열의 첫 번째 항목인 { headerIndex: }이 화면의 첫 번째 행(visual index 0)이 됩니다. 원본 데이터의 0~9번 행은 그룹 정의에 포함되지 않았으므로 무시됩니다.
- 다음 그룹 위치 계산:
    1. 첫 번째 그룹 헤더(원본 인덱스 10)가 화면의 0번째 행에 표시됩니다.
    2. 첫 번째 그룹의 내용물은 원본 데이터의 11번부터 29번까지입니다. (총 - - = 19개 행)
    3. 따라서 두 번째 그룹 헤더(원본 인덱스 30)는 화면상에서 20번째 행 (헤더 1개 + 내용 19개)에 위치하게 됩니다.

고객님께서 설명하신 시나리오는 rowGrouping의 핵심적인 활용 방법이라고 할 수 있습니다. 다만 한 가지 중요한 점은, rowGrouping 기능 자체가 데이터를 분석하고 집계(sum, count)하는 로직을 포함하고 있지는 않다는 것입니다.

rowGrouping은 순수하게 시각적인 표현(Presentation Layer)을 담당합니다. 즉, 개발자가 미리 계산하고 정렬해놓은 데이터를 바탕으로 특정 행을 '그룹 헤더'로 지정하여 시각적으로 묶어주고, 접고 펴는 인터랙션을 제공하는 역할만 합니다.

### 올바른 구현 워크플로우

"First Name"으로 그룹을 묶고, 각 그룹의 인원수(count)나 특정 숫자 컬럼의 합계(sum)를 그룹 헤더에 표시하려면 다음과 같은 단계를 거쳐야 합니다.

1. 데이터 사전 처리 (Data Pre-processing)

    - 가장 먼저, 그리드에 표시할 전체 데이터를 그룹화하려는 기준(예: "First Name")으로 정렬(sort)해야 합니다.
    - 정렬된 데이터를 순회하면서 그룹이 바뀌는 지점을 찾고, 각 그룹에 대한 집계 데이터(count, sum 등)를 미리 계산합니다.

2. 데이터 재구성 (Data Restructuring)

    - 원본 데이터 배열을 수정하여, 각 그룹의 시작 지점에 집계 데이터를 담은 '그룹 헤더용 데이터 객체'를 삽입(insert)합니다.
    - 이렇게 하면 새로운 데이터 배열은 [그룹 헤더 1, 데이터 1-1, 데이터 1-2, 그룹 헤더 2, 데이터 2-1, ...] 와 같은 구조를 갖게 됩니다.

3. `rowGrouping` Prop 생성

    - 재구성된 데이터 배열에서 '그룹 헤더용 데이터 객체'가 위치한 인덱스들을 뽑아 rowGrouping prop의 groups 배열을 생성합니다. 이 인덱스들이 바로 headerIndex가 됩니다.

4. 커스텀 렌더링 (`getCellContent`)
    - getCellContent 함수 내에서 useRowGrouping의 mapper를 사용해 현재 렌더링할 행이 그룹 헤더인지 일반 데이터 행인지 판별합니다.
    - 그룹 헤더라면: 재구성된 데이터 배열에서 해당 '그룹 헤더용 데이터 객체'를 찾아, 미리 계산해 둔 집계 값(count, sum)을 셀에 표시합니다. 필요하다면 span 옵션을 사용해 여러 열을 병합하여 보기 좋게 만들 수 있습니다.
    - 일반 데이터 행이라면: 원본 데이터를 그대로 표시합니다.

### 요약

고객님께서 질문하신 "First Name으로 그룹화하고 합계/개수 표시"는 rowGrouping의 이상적인 활용 사례가 맞습니다.

다만, `rowGrouping`은 계산된 결과를 시각적으로 보여주는 도구일 뿐이며, 실제 데이터 정렬, 그룹화, 집계 계산은 개발자가 그리드에 데이터를 전달하기 전에 직접 처리해야 합니다. 이 두 가지 역할을 명확히 구분하면 원하시는 기능을 효과적으로 구현하실 수
있습니다.

## 예제 데이터

물론입니다. "First Name"으로 그룹화하고, 각 그룹의 판매량 합계를 그룹 헤더에 표시하는 시나리오를 단계별 예시 데이터와 함께 설명해 드리겠습니다.

시나리오

- 목표: 영업 사원의 이름(firstName)으로 데이터를 그룹화하고, 각 그룹 헤더에 해당 사원의 총 판매 건수(count)와 총 판매액(totalSales)을 표시합니다.
- 컬럼: First Name, Last Name, Sales

---

1. 원본 데이터 (Original Data)

가장 먼저, 그리드에 표시할 가공되지 않은 원본 데이터가 있습니다. 이 데이터는 아직 정렬되지 않은 상태입니다.

```tsx
// 1. 원본 데이터 (정렬되지 않음)
const originalData = [
    { firstName: "John", lastName: "Doe", sales: 150 },
    { firstName: "Jane", lastName: "Smith", sales: 200 },
    { firstName: "John", lastName: "Doe", sales: 100 },
    { firstName: "Peter", lastName: "Jones", sales: 50 },
    { firstName: "Jane", lastName: "Smith", sales: 250 },
];
```

---

2. 데이터 사전 처리 (Data Pre-processing)

rowGrouping을 사용하려면 그룹화 기준이 되는 데이터가 연속적으로 모여 있어야 합니다. 따라서 데이터를 재구성하기 전에, 그룹화 기준인 firstName으로 데이터를 정렬하고, 각 그룹의 집계 값을 계산합니다.

2-1. 데이터 정렬

```tsx
// 2-1. 'firstName'으로 데이터 정렬
const sortedData = [
    { firstName: "Jane", lastName: "Smith", sales: 200 },
    { firstName: "Jane", lastName: "Smith", sales: 250 },
    { firstName: "John", lastName: "Doe", sales: 150 },
    { firstName: "John", lastName: "Doe", sales: 100 },
    { firstName: "Peter", lastName: "Jones", sales: 50 },
];
```

2-2. 집계 값 계산 (로직)

정렬된 데이터를 순회하며 각 그룹(Jane, John, Peter)의 판매 건수와 합계를 계산합니다. 이 단계는 보통 Lodash와 같은 라이브러리를 사용하거나, 직접 순회 로직을 구현하여 처리합니다.

- Jane: count = 2, totalSales = 200 + 250 = 450
- John: count = 2, totalSales = 150 + 100 = 250
- Peter: count = 1, totalSales = 50

---

3. 데이터 재구성 (Data Restructuring)

사전 처리 단계에서 계산한 집계 값을 그룹 헤더 행으로 만들어, 정렬된 데이터 배열의 각 그룹 시작점에 삽입합니다. 이렇게 하면 그리드가 렌더링할 최종 데이터 구조가 완성됩니다.

- type: 'header'와 같은 속성을 추가하여 그룹 헤더 행과 일반 데이터 행을 구분하는 것이 일반적입니다.

```tsx
// 3. 그룹 헤더 행을 삽입하여 데이터 재구성
const restructuredData = [
    // --- Jane 그룹 ---
    { type: "header", groupName: "Jane", count: 2, totalSales: 450 }, // index 0 (그룹 헤더)
    { firstName: "Jane", lastName: "Smith", sales: 200 }, // index 1
    { firstName: "Jane", lastName: "Smith", sales: 250 }, // index 2

    // --- John 그룹 ---
    { type: "header", groupName: "John", count: 2, totalSales: 250 }, // index 3 (그룹 헤더)
    { firstName: "John", lastName: "Doe", sales: 150 }, // index 4
    { firstName: "John", lastName: "Doe", sales: 100 }, // index 5

    // --- Peter 그룹 ---
    { type: "header", groupName: "Peter", count: 1, totalSales: 50 }, // index 6 (그룹 헤더)
    { firstName: "Peter", lastName: "Jones", sales: 50 }, // index 7
];
```

이제 restructuredData는 그리드에 필요한 모든 정보(그룹 헤더 + 원본 데이터)를 담고 있습니다.

---

4. rowGrouping Prop 생성

마지막으로, 재구성된 데이터(restructuredData)에서 그룹 헤더 행(type: 'header')이 위치한 인덱스를 찾아 rowGrouping prop을 생성합니다.

- Jane 그룹 헤더의 인덱스: 0
- John 그룹 헤더의 인덱스: 3
- Peter 그룹 헤더의 인덱스: 6

이 인덱스들을 headerIndex로 사용하여 groups 배열을 만듭니다.

```tsx
// 4. 재구성된 데이터의 헤더 인덱스를 기반으로 rowGrouping prop 생성
const rowGroupingOptions = {
    groups: [
        { headerIndex: 0, isCollapsed: false }, // Jane 그룹
        { headerIndex: 3, isCollapsed: false }, // John 그룹
        { headerIndex: 6, isCollapsed: false }, // Peter 그룹
    ],
    height: 40, // 그룹 헤더의 높이
    themeOverride: {
        bgCell: "#f2f8ff", // 그룹 헤더 배경색
    },
};

// 이제 이 rowGroupingOptions 객체를 <DataEditor>의 prop으로 전달하면 됩니다.
// <DataEditor rowGrouping={rowGroupingOptions} ... />
```

이후 getCellContent 함수에서는 mapper를 통해 현재 행이 그룹 헤더인지 확인하고, 그룹 헤더라면 restructuredData에서 집계 데이터를, 일반 행이라면 firstName, sales 등의 데이터를 꺼내어 표시해주면 원하시는 기능이 완성됩니다.

대안: 하단 요약 행을 직접 구현하는 방법

만약 그룹의 마지막에 요약 행을 표시하는 기능이 꼭 필요하다면, rowGrouping 기능을 사용하지 않고 직접 유사한 기능을 구현해야 합니다. 방법은 위에서 설명드린 데이터 재구성 방식과 매우 유사합니다.

1. 데이터 사전 처리 및 재구성:
    - 그룹화 기준으로 데이터를 정렬합니다.
    - 각 그룹의 집계 값(합계, 평균 등)을 계산합니다.
    - 각 그룹의 마지막 데이터 행 바로 다음에 요약 정보를 담은 '요약 행(summary row)' 객체를 삽입하여 데이터를 재구성합니다.


    1     // '요약 행'을 그룹 하단에 추가하여 데이터 재구성
    2     const restructuredDataWithSummary = [
    3         // --- Jane 그룹 ---
    4         { firstName: "Jane", lastName: "Smith", sales: 200 },
    5         { firstName: "Jane", lastName: "Smith", sales: 250 },
    6         { type: 'summary', groupName: 'Jane', count: 2, totalSales: 450 }, // Jane 그룹 요약 행
    7
    8         // --- John 그룹 ---
    9         { firstName: "John", lastName: "Doe", sales: 150 },

10 { firstName: "John", lastName: "Doe", sales: 100 },
11 { type: 'summary', groupName: 'John', count: 2, totalSales: 250 }, // John 그룹 요약 행
12
13 // ...
14 ];

2. 커스텀 렌더링 및 스타일링:
    - 이 방식에서는 <DataEditor>의 rowGrouping prop을 사용하지 않습니다.
    - 대신 getCellContent 함수에서 현재 행의 데이터 객체가 '요약 행'인지(item.type === 'summary') 확인합니다.
    - 만약 요약 행이라면, 집계 데이터를 표시하고 span 옵션을 사용해 여러 셀을 병합하는 등 원하는 스타일로 렌더링합니다.
    - getRowThemeOverride prop을 사용하여 요약 행에 특별한 배경색이나 스타일을 적용하여 시각적으로 구분해 줄 수 있습니다.

이 방법의 한계

이 대안은 시각적으로는 그룹 하단에 요약 행을 표시할 수 있지만, rowGrouping이 제공하는 핵심 기능인 그룹 접기/펴기(collapsing) 기능은 직접 구현해야 하는 복잡함이 있습니다. 이 기능을 구현하려면 상태 관리(예: useState)를 통해 각 그룹의 접힘 상태를
추적하고, 상태에 따라 restructuredDataWithSummary 배열을 동적으로 필터링하여 그리드에 전달해야 합니다.

결론

- 기본 기능: rowGrouping은 그룹 헤더를 상단에만 표시할 수 있습니다.
- 대안: 그룹 요약 행을 하단에 표시하려면 rowGrouping prop을 사용하지 않고, 데이터를 직접 재구성하고 커스텀 렌더링을 통해 구현해야 합니다.
- 트레이드오프: 대안을 사용할 경우, 그룹 접기/펴기 기능은 직접 구현해야 하는 추가적인 개발 비용이 발생합니다.
