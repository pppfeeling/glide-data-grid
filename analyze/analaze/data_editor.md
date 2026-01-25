  ## 편집모드에서 enter, tab키 입력시 다음셀로 이동한 후 바로 펹집모드로 변경로직 설명

   1. 편집 완료 및 이동 방향 감지:
       * 사용자가 오버레이 편집기(셀 위에서 텍스트 등을 입력하는 창)에서 편집을 마치면(예: Enter 입력, 포커스 잃음) `onFinishEditing` 함수가 호출됩니다.
       * 이 함수는 movement라는 인자를 받는데, Enter 키를 누르면 [0, 1] (x:0, y:1 즉, 아래로 한 칸) 값이 전달됩니다.

   2. 다음 셀로 선택 이동:
       * `onFinishEditing` 함수는 전달받은 movement 값을 사용하여 다음에 선택될 셀의 좌표( newCol, newRow)를 계산합니다.
       * updateSelectedCell 함수를 호출하여 해당 좌표로 그리드의 선택을 이동시킵니다.

   3. 다음 셀 편집 모드 활성화 (핵심 로직):
       * `onFinishEditing` 함수 내에서, movX === 0 && movY === 1 조건을 통해 "Enter 키로 아래로 이동했는지"를 확인합니다.
       * 이 조건이 참일 경우, window.setTimeout을 사용하여 아주 짧은 지연(50ms) 후에 다음 동작을 실행합니다. (지연을 주는 이유는 선택 상태가 완전히 업데이트된 후 편집기를 열기 
         위함입니다.)
       * `setOverlaySimple` 함수를 호출하여, 새로 선택된 셀의 위치에 새로운 오버레이 편집기를 즉시 띄웁니다. 이때 forceEditMode: true 옵션을 주어 바로 편집 모드가 되도록 합니다. 

## 문자 편집모드 금지 어디서 막았는지 확인
   - packages/core/src/data-editor/data-editor.tsx 파일의 onKeyDown 함수 내에서 해당 코드 블록의 주석
   
```tsx
    /** Emitted when a cell is activated, by pressing Enter, Space or double clicking it.
     * @group Events
     */
    readonly onCellActivated?: (cell: Item, event: CellActivatedEventArgs) => void;
```


  # DataEditor 컴포넌트 구조 및 역할

   1 DataEditorImpl
   2 └─ DataEditorContainer
   3    └─ DataGridSearch
   3    └─ DataGridOverlayEditor
   4       └─ ScrollingDataGrid
   5          └─ InfiniteScroller
   6             └─ DataGridDnd
   7                └─ DataGrid

   1. DataEditorImpl (`data-editor.tsx`)
       * 역할: DataEditor의 최상위 컴포넌트로, 전체 데이터 그리드의 상태와 동작을 총괄합니다.
       * 주요 기능:
           * 사용자로부터 받은 props (columns, rows, getCellContent 등)를 하위 컴포넌트에 전달합니다.
           * 그리드의 선택(selection), 편집(overlay), 키보드 입력(onKeyDown), 복사/붙여넣기 등 핵심 비즈니스 로직을 처리합니다.
           * useColumnSizer, useSelectionBehavior 등 다양한 React Hook을 사용하여 그리드의 상태를 관리합니다.
           * 하위 컴포넌트에서 발생한 이벤트를 받아 상위로 전달(onCellEdited, onGridSelectionChange 등)하는 역할을 합니다.

   2. DataEditorContainer (`data-grid-container.tsx`)
       * 역할: 데이터 그리드의 기본 스타일과 레이아웃을 제공하는 래퍼(Wrapper) 컴포넌트입니다.
       * 주요 기능:
           * 그리드 컴포넌트를 감싸는 <div> 컨테이너를 생성합니다.
           * width, height 등의 스타일 속성을 적용하여 그리드의 전체적인 크기와 형태를 결정합니다.

   3. DataGridSearch (`data-grid-search.tsx`)
       * 역할: 그리드 내의 검색 기능을 담당하는 UI 및 로직을 처리합니다.
       * 주요 기능:
           * 검색창 UI(input)를 렌더링합니다.
           * 사용자가 입력한 검색어(searchValue)를 관리하고, 검색 결과(searchResults)를 하이라이트하는 로직을 수행합니다.
           * onSearchValueChange와 같은 콜백을 통해 검색 관련 이벤트를 상위 컴포넌트로 전달합니다.

   4. ScrollingDataGrid (`scrolling-data-grid.tsx`)
       * 역할: 스크롤 동작과 관련된 로직을 통합 관리합니다.
       * 주y요 기능:
           * InfiniteScroller와 DataGridDnd 컴포넌트를 결합하여 스크롤 및 드래그 앤 드롭 기능을 함께 제공합니다.
           * 모바일 환경에서의 관성 스크롤(useKineticScroll)과 같은 고급 스크롤 동작을 구현합니다.

   5. InfiniteScroller (`infinite-scroller.tsx`)
       * 역할: 가상 스크롤(Virtual Scrolling)을 구현하여 대용량 데이터를 효율적으로 렌더링합니다.
       * 주요 기능:
           * 수백만 개의 행이 있어도 브라우저의 DOM 요소 높이 제한을 초과하지 않도록 스크롤 영역을 가상으로 생성합니다.
           * 실제 화면에 보이는 영역만큼의 DOM만 생성하고, 스크롤에 따라 필요한 DOM을 동적으로 교체하여 성능을 최적화합니다.

   6. DataGridDnd (`data-grid-dnd.tsx`)
       * 역할: 그리드 내의 드래그 앤 드롭(Drag and Drop) 기능을 처리합니다.
       * 주요 기능:
           * 컬럼 순서 변경, 행 순서 변경, 컬럼 너비 조절 등 사용자의 드래그 제스처를 감지하고 상태를 업데이트합니다.
           * 드래그 중인 요소의 시각적 피드백을 제공합니다.

   7. DataGrid (`data-grid.tsx`)
       * 역할: 그리드의 가장 핵심적인 렌더링 엔진으로, 실제 셀과 헤더를 Canvas에 그리는 역할을 합니다.
       * 주요 기능:
           * HTML Canvas 엘리먼트를 사용하여 셀, 헤더, 구분선, 포커스 링 등 그리드의 모든 시각적 요소를 직접 그립니다.
           * 마우스 클릭, 키보드 입력과 같은 로우 레벨(low-level)의 사용자 입력 이벤트를 직접 처리하고, 관련 이벤트 인자(EventArgs)를 생성하여 상위 컴포넌트로 전달합니다.
           * render 디렉토리의 함수들(data-grid-render.ts, data-grid-render.cells.ts 등)을 호출하여 실제 렌더링을 수행합니다.
