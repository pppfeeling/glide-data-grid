# 완료된 작업
  1. `grouping.ts` 파일 생성: 그룹화 로직을 위한 `grouping.ts` 파일을 `data` 폴더에 생성했습니다.
  2. 그룹 타입 정의: `GroupingColumn`, `GroupSummaryRow`, `AggregateFunction` 등 그룹 관련 타입을 정의했습니다.
  3. `multiColumnGroup` 함수 구현: 데이터와 그룹화 설정을 받아 그룹화된 데이터를 소계 행과 함께 반환하는 `multiColumnGroup` 함수를 구현했습니다.
     - `GroupSummaryRow`에 `groupValues`를 추가하여 그룹화 컬럼의 개별 값을 저장하도록 했습니다.
     - `GroupingColumn`에 선택적 `label` 속성을 추가했습니다.
  4. `SearchDataEditor` 통합:
     - 그룹화 상태(`groupingState`)를 추가했습니다.
     - `processedData` 상태를 추가하여 그룹화, 필터링, 정렬된 데이터를 관리합니다.
     - `useEffect`를 업데이트하여 그룹화 로직을 포함시켰습니다. (그룹화 -> 필터링 -> 정렬 순서)
     - `handleGroupingChange` 함수를 구현하여 그룹화 컬럼을 추가/제거합니다.
     - `handleGroupingLabelChange` 함수를 구현하여 그룹화 컬럼의 레이블을 업데이트합니다.
     - `handleGroupingAggregateChange` 함수를 구현하여 그룹화 컬럼에 대한 집계 함수를 설정합니다.
     - `getSortedCellContent`를 수정하여 `GroupSummaryRow`를 처리하고, 그룹화 컬럼의 값/레이블 및 집계 값을 표시하도록 했습니다.
       - 그룹화 컬럼 자체에는 `groupingState`의 `label` 또는 `summaryRow.groupValues`의 실제 값을 표시합니다.
       - 집계된 숫자 값에 대해 `contentAlign: "right"`를 적용했습니다.
       - 첫 번째 컬럼에 특정 집계가 없는 경우 `그룹 개수`를 표시합니다.
     - `getRowThemeOverride`를 사용하여 `GroupSummaryRow`에 다른 배경색을 적용했습니다.
     - 그룹화 컬럼 선택 및 레이블 입력을 위한 UI 요소를 테이블에 추가했습니다.
       - `<td>그룹핑 레이블</td>` 헤더와 해당 `input` 필드를 추가했습니다.
     - 그룹화 함수 선택을 위한 UI 요소를 테이블에 추가했습니다.
       - `<td>그룹핑 함수</td>` 헤더와 해당 `select` 요소를 추가했습니다.