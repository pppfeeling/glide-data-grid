# 완료된 작업
  1. `filter.ts` 파일 생성: 필터링 로직을 위한 `filter.ts` 파일을 `data` 폴더에 생성했습니다.
  2. 필터 타입 정의: `FilterOption`, `FilterConfig`, `FilterOperator`, `FilterCondition` 등 필터 관련 타입을 정의했습니다.
  3. `multiColumnFilter` 함수 구현: 데이터와 필터 설정을 받아 필터링된 데이터를 반환하는 `multiColumnFilter` 함수를 구현했습니다.
  4. `SearchDataEditor` 통합:
     - 필터 상태(`filterInputState`, `activeFilterConfig`)를 추가했습니다.
     - `useEffect`를 업데이트하여 필터링 로직을 포함시켰습니다.
     - 필터 조건, 연산자, 값 입력을 위한 UI 요소를 테이블에 추가했습니다.
     - 필터 적용을 위한 "필터링" 버튼을 추가했습니다.
     - `handleFilterChange` 및 `applyFilters` 함수를 구현하여 필터 상태를 관리하고 적용합니다.