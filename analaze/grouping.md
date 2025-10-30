### 워크플로우

grouping 할 컬럼에 대해, 각 그룹의 인원수(count)나 특정 숫자 컬럼의 합계(sum)를 그룹 헤더에 표시하려면 다음과 같은 단계를 거쳐야 합니다.

1. 데이터 사전 처리 (Data Pre-processing)

    - 가장 먼저, 그리드에 표시할 전체 데이터를 그룹화하려는 기준컬럼으로 정렬(sort)해야 합니다.
    - 정렬된 데이터를 순회하면서 그룹이 바뀌는 지점을 찾고, 각 그룹에 대한 집계 데이터(count, sum 등)를 미리 계산합니다.

2. 데이터 재구성 (Data Restructuring)

    - 원본 데이터 배열을 수정하여, 각 그룹의 시작 지점에 집계 데이터를 담은 '그룹 헤더용 데이터 객체'를 삽입(insert)합니다.

3. `rowGrouping` Prop 생성

    - 재구성된 데이터 배열에서 '그룹 헤더용 데이터 객체'가 위치한 인덱스들을 뽑아 rowGrouping prop의 groups 배열을 생성합니다. 이 인덱스들이 바로 headerIndex가 됩니다.

4. 커스텀 렌더링 (`getCellContent`)
    - getCellContent 함수 내에서 rowGrouping prop를 이용해@ㅎgrouping에 적합한 theme나 표시를 만든다.
    - 그룹 헤더라면: 재구성된 데이터 배열에서 해당 '그룹 헤더용 데이터 객체'를 찾아, 미리 계산해 둔 집계 값(count, sum)을 셀에 표시합니다. 필요하다면 span 옵션을 사용해 여러 열을 병합하여 보기 좋게 만들 수 있습니다.
    - 일반 데이터 행이라면: 원본 데이터를 그대로 표시합니다.

## story 파일 처리사항
### 그룹핑 버튼
- 그룹핑을 위한 button을 클릭하면 그룹핑중 + 순서를 표시,  다시 클릭하면 그룹핑 이라는 레이블 표시
- 이 버튼을 클릭한것이 그룹핑을 위한 컬럼으로 사용

###  그룹핑 레이블
- 이 input에 값이 입력되어 있으면 그룹핑이 된 row의 이 컬럼 위치에 input에 입력한 값이 표시됨

### 그룹핑 함수
- 선택한 col에 그룹핑 함수 계산한 값이 그룹핑 row, col에 표시됨.

### 각 입력값은 각각의 state가 아닌 하나의 state에서 map형태로 관리해 주십시오
 

## 데이터 처리 방식 예시
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

