# 헤더의 중요로직
 현재 아키텍처는 최대 2단계의 헤더(그룹 헤더 + 컬럼 헤더)를 갖도록 설계되어 있습니다. 더 많은 계층의 헤더를 지원하려면 핵심 렌더링 로직의 수정이 필요합니다.

  주요 로직은 다음과 같은 파일들에 걸쳐 구현되어 있습니다.

   1. `packages/core/src/data-editor/data-editor.tsx`: 헤더 높이를 계산하고 관련 속성을 하위 컴포넌트로 전달합니다.
   2. `packages/core/src/internal/data-grid/data-grid.tsx`: 실제 캔버스 렌더링을 준비합니다.
   3. `packages/core/src/internal/data-grid/render/data-grid-render.header.ts`: 헤더를 캔버스에 그리는 실제 로직을 포함합니다.
   4. `packages/core/src/internal/data-grid/data-grid-types.ts`: 컬럼 및 그룹 관련 타입을 정의합니다.

  이제 각 부분의 핵심 로직을 자세히 살펴보겠습니다.

  1. 헤더 높이 계산 (data-editor.tsx)

  DataEditor 컴포넌트는 headerHeight와 groupHeaderHeight라는 두 가지 속성을 사용하여 전체 헤더의 높이를 결정합니다.

   - enableGroups 플래그: columns 배열에 group 속성이 하나라도 정의되어 있으면 true가 됩니다.
   - totalHeaderHeight: enableGroups가 true이면 headerHeight + groupHeaderHeight가 되고, 아니면 headerHeight가 됩니다.

```ts
   1 // packages/core/src/data-editor/data-editor.tsx
   2 
   3 // 컬럼 정의에 'group' 속성이 있는지 확인하여 그룹 기능 활성화 여부 결정
   4 const enableGroups = React.useMemo(() => {
   5     return columns.some(c => c.group !== undefined);
   6 }, [columns]);
   7 
   8 // 전체 헤더 높이 계산
   9 const totalHeaderHeight = enableGroups ? headerHeight + groupHeaderHeight : headerHeight;
```   

  이 계산 방식은 헤더가 최대 두 줄(그룹 + 컬럼)이라는 것을 명확히 보여줍니다.

  2. 헤더 렌더링 오케스트레이션 (data-grid.tsx -> data-grid-render.ts)

  DataGrid 컴포넌트는 계산된 totalHeaderHeight를 받아 drawGrid 함수(data-grid-render.ts)를 호출합니다. drawGrid는 헤더, 셀, 라인 등을 순서대로 그리는 역할을 하며, 헤더를 그리기
  위해 drawGridHeaders 함수를 호출합니다.

  3. 실제 헤더 드로잉 로직 (data-grid-render.header.ts)

  이 파일에 두 개의 헤더 행을 그리는 핵심 로직이 있습니다.

   - `drawGridHeaders` 함수:
       1. 먼저 groupHeaderHeight 만큼의 공간에 그룹 헤더를 그리기 위해 drawGroups 함수를 호출합니다. (그룹이 활성화된 경우)
       2. 그 다음, headerHeight 만큼의 공간에 개별 컬럼 헤더를 그립니다.

   - `drawGroups` 함수:
       - walkGroups 유틸리티를 사용하여 동일한 group 이름을 가진 연속된 컬럼들을 찾아 하나의 그룹으로 묶습니다.
       - 계산된 그룹 영역(x, y, width, height)에 그룹명과 아이콘 등을 그립니다. y 좌표는 0으로, height는 groupHeaderHeight로 고정되어 첫 번째 헤더 행을 형성합니다.

   - 컬럼 헤더 드로잉:
       - walkColumns 유틸리티를 사용하여 각 컬럼을 순회합니다.
       - 각 컬럼 헤더는 y 좌표가 groupHeaderHeight에서 시작하여 headerHeight 만큼의 높이를 갖는 공간에 그려집니다. 이것이 두 번째 헤더 행을 형성합니다.
```ts
    1 // packages/core/src/internal/data-grid/render/data-grid-render.header.ts
    2 
    3 export function drawGridHeaders(
    4     // ...
    5 ) {
    6     const totalHeaderHeight = headerHeight + groupHeaderHeight;
    7     if (totalHeaderHeight <= 0) return;
    8 
    9     // 전체 헤더 영역 배경색 채우기
   10     ctx.fillStyle = outerTheme.bgHeader;
   11     ctx.fillRect(0, 0, width, totalHeaderHeight);
   12 
   13     // 1. 컬럼 헤더 그리기 (두 번째 줄)
   14     walkColumns(effectiveCols, 0, translateX, 0, totalHeaderHeight, (c, x) => {
   15         // ...
   16         const y = enableGroups ? groupHeaderHeight : 0; // y 위치가 groupHeaderHeight 부터 시작
   17         drawHeader(ctx, x, y, c.width, headerHeight, ...);
   18         // ...
   19     });
   20 
   21     // 2. 그룹 헤더 그리기 (첫 번째 줄)
   22     if (enableGroups) {
   23         drawGroups(ctx, effectiveCols, width, translateX, groupHeaderHeight, ...);
   24     }
   25 }
```

  4. 데이터 구조 (data-grid-types.ts)

  컬럼을 그룹화하는 것은 GridColumn 타입에 정의된 group?: string; 속성을 통해 이루어집니다.

```ts
   1 // packages/core/src/internal/data-grid/data-grid-types.ts
   2 export interface BaseGridColumn {
   3     readonly title: string;
   4     readonly group?: string; // 이 속성이 그룹 헤더를 활성화시킵니다.
   5     // ...
   6 }
```

  group 속성에 동일한 문자열을 가진 연속된 컬럼들이 하나의 그룹으로 묶여 렌더링됩니다. 이 구조는 단일 레벨의 그룹핑만 지원하며, 중첩된 그룹 구조는 고려하지 않습니다.

  ## 결론
  Glide Data Grid의 헤더 시스템은 의도적으로 그룹 헤더와 컬럼 헤더라는 명확한 두 가지 역할로 나뉘어 설계되었습니다. headerHeight와 groupHeaderHeight라는 두 개의 분리된 높이 값을
  사용하고, 렌더링 로직 또한 이 두 영역을 각각 순차적으로 그리는 방식으로 구현되어 있어 현재로서는 2단 헤더 구조에 최적화되어 있습니다. 3단 이상의 계층적 헤더를 구현하려면 이
  높이 계산 및 렌더링 로직 전반에 대한 수정이 필요합니다.

