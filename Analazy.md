# Glide Data Grid 분석

이 문서는 Glide Data Grid 프로젝트의 주요 파일 및 기능에 대한 분석 내용을 기록합니다.

## `packages/core/src/internal/data-grid/render/data-grid-render.lines.ts`

이 파일은 HTML5 Canvas API를 사용하여 데이터 그리드의 선, 배경, 테마 색상 등 시각적인 요소들을 효율적으로 그리는 역할을 담당합니다.

### 주요 기능 및 로직

#### 1. `drawGridLines` (핵심 기능: 그리드 선 그리기)

이 파일에서 가장 중요한 함수로, 수직 및 수평 그리드 선을 그리는 모든 로직이 여기에 포함되어 있습니다.

-   **기본 동작**: 현재 화면에 보이는 영역(`minX`, `maxX`, `minY`, `maxY`)을 계산하여, 보이지 않는 부분은 그리지 않도록 최적화합니다.
-   **선 그리기**:
    -   **수직선**: 컬럼 정보를 순회하며 각 컬럼의 오른쪽에 수직선을 그립니다.
    -   **수평선**: 행 정보를 순회하며 각 행의 하단에 수평선을 그립니다.
-   **성능 최적화**: 선을 하나씩 바로 그리지 않고, `toDraw`라는 배열에 그릴 선의 좌표와 색상 정보를 먼저 저장합니다. 그런 다음 색상별로 그룹화하여 한 번에 여러 개의 선을 그려 성능을 향상시킵니다. (Canvas에서 색상을 변경하는 작업은 비용이 크기 때문입니다.)
-   **조건부 렌더링 (핵심 로직)**:
    -   `getCellContent` 함수가 제공되면, 각 셀의 속성을 확인하여 선을 그릴지 말지 결정합니다.
    -   **`rowGroupBorder`**: 이 속성이 `true`인 컬럼에서는 현재 셀과 아래 셀의 데이터(`currentCell.data === nextRowCell.data`)를 비교하여 같으면 선을 그리지 않습니다.
    -   **`borderBottom` / `borderTop`**: `rowGroupBorder`가 적용되지 않는 경우, 셀에 `borderBottom: false`나 `borderTop: false` 속성이 있으면 해당 선을 그리지 않습니다.
-   **셀 병합(`spans`) 처리**: 셀 병합이 적용된 영역에는 내부 그리드 선이 그려지지 않도록 렌더링 영역에서 제외합니다.

#### 2. `overdrawStickyBoundaries` (고정 영역 테두리 덧그리기)

이 함수는 '고정된(sticky)' 행과 열의 경계선을 그리는 데 특화되어 있습니다.

-   그리드의 다른 모든 요소가 그려진 *후에* 호출되어, 고정 영역의 경계선이 항상 가장 위에 보이도록 보장합니다.
-   예를 들어, 고정된 컬럼의 오른쪽 경계선과 고정된 행의 하단 경계선을 굵거나 다른 색으로 강조하여 표시하는 역할을 합니다.

#### 3. `drawBlanks` (빈 영역 배경 채우기)

그리드의 데이터가 채워지지 않은 빈 공간의 배경을 그립니다.

-   모든 컬럼의 너비를 합친 값이 그리드 전체 너비보다 작을 때 오른쪽에 남는 빈 공간을 채웁니다.
-   이 빈 공간에서도 행이 선택되거나 비활성화된 경우, 해당 테마에 맞는 배경색(`accentLight` 등)을 채워줍니다.

#### 4. `drawExtraRowThemes` (추가 테마 배경 그리기)

특정 행이나 열에 별도의 테마(`themeOverride`)가 적용된 경우, 해당 영역의 배경색을 그립니다.

-   예를 들어, 특정 행 전체에 다른 배경색을 지정했을 때, 이 함수가 해당 색상의 사각형을 먼저 그려 배경을 채우는 역할을 합니다.

### 요약

이 파일은 그리드의 선과 배경을 효율적으로 그리기 위해 **① 화면에 보이는 영역만 그리고**, **② 색상별로 묶어서 한 번에 처리**하는 최적화 전략을 사용합니다. `drawGridLines` 함수를 중심으로 다양한 조건(셀 병합, 고정 영역, 테마 등)에 맞춰 유연하게 선을 렌더링하는 복합적인 로직을 담고 있습니다.

### `border` 속성 구현 위치

`cell-borders.stories.tsx`와 같은 예제에서 사용되는 `borderBottom`, `borderTop`, `borderLeft`, `borderRight` 속성의 실제 구현은 `drawGridLines` 함수 내에 있습니다.

#### `borderLeft`와 `borderRight` (수직선)

수직선 렌더링 로직은 `drawGridLines` 함수의 첫 번째 메인 루프 (`// vertical lines`)에 위치합니다. 코드는 현재 셀의 `borderRight` 속성과 **다음** 셀의 `borderLeft` 속성을 모두 확인합니다. 두 셀 중 하나라도 해당 방향의 테두리를 원치 않으면(`false`로 설정되면) 경계선이 그려지지 않습니다.

```typescript
const shouldDrawBorder = (currentCell?.borderRight !== false) && (nextCell?.borderLeft !== false);
```

#### `borderTop`와 `borderBottom` (수평선)

수평선 렌더링 로직은 `drawGridLines` 함수 후반부의 `// horizontal lines` 주석 아래에 위치합니다. 현재 행의 셀의 `borderBottom` 속성과 **다음** 행의 셀의 `borderTop` 속성을 확인하여 두 셀 모두 테두리를 허용할 때만 선을 그립니다.

```typescript
shouldDrawBorder = (currentCell?.borderBottom !== false) && (nextRowCell?.borderTop !== false);
```

이 구조를 통해 `getCellContent` 콜백으로 특정 셀의 `border...` 속성을 `false`로 반환하게 함으로써, 그리드의 어떤 선이 그려질지를 동적으로 제어할 수 있습니다.