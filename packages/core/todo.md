

### 1단계: `DataGrid.tsx` - "마스터 입력기(Ghost Input)" 상주
캔버스 자체가 포커스를 받는 현재 구조를 변경하여, 보이지 않는 `textarea`가 항상 포커스를 들고 있게 합니다.

*   **구현 내용:** `DataGrid` 컴포넌트 내부에 `GhostInput`(`textarea`)을 추가합니다.
*   **핵심 로직:** 
    *   평소에는 `opacity: 0` 상태로 캔버스 뒤나 구석에 숨어 있습니다.
    *   사용자가 셀을 클릭하거나 방향키로 이동할 때 이 `GhostInput`은 항상 `focus()` 상태를 유지합니다.
    *   `DataGrid`는 이 `GhostInput`의 위치, 크기, 투명도를 조절할 수 있는 `props`를 외부(`DataEditor`)로부터 받습니다.

### 2단계: `DataEditor.tsx` - 상태 제어 및 좌표 전달
그리드의 전체 상태를 관리하는 이 컴포넌트에서 "편집 중인 셀의 위치"와 "입력값"을 `DataGrid`로 다시 내려보냅니다.

*   **구현 내용:** `overlay` 상태가 활성화되면, 해당 셀의 `Rectangle`(x, y, width, height) 정보를 `DataGrid`에 전달합니다.
*   **핵심 로직:**
    *   문자 입력이 감지되면 `setIsEditing(true)`와 함께 현재 셀의 좌표를 계산합니다.
    *   `DataGrid`에 "마스터 입력기를 이 좌표로 이동시키고 `opacity: 1`로 만들어라"라는 신호를 보냅니다.

### 3단계: `DataGridOverlayEditor.tsx` - 시각적 레이아웃 제공
오버레이 에디터는 더 이상 스스로 `input`을 렌더링하여 포커스를 뺏어오지 않습니다.

*   **구현 내용:** 텍스트 기반 에디터(`GrowingEntry` 등)일 경우, 실제 `input`이나 `textarea`는 `visibility: hidden` 처리하여 자리만 잡게 합니다.
*   **핵심 로직:** 
    *   오버레이는 테두리, 그림자, 배경색 등 "에디터처럼 보이는 디자인"만 출력합니다.
    *   그 빈 자리(Hidden 처리된 영역) 바로 위에 `DataGrid`에서 보낸 `GhostInput`이 물리적으로 위치하게 됩니다.
    *   사용자는 오버레이를 보고 있다고 느끼지만, 실제 타이핑은 처음부터 포커스를 잡고 있던 `DataGrid`의 `GhostInput`에 계속 기록됩니다.

### 4단계: 한글 합성(IME) 세션 유지의 핵심 (Handshake)
이 방식의 가장 중요한 디테일입니다.

1.  **포커스 이동 방지:** `OverlayEditor`가 마운트될 때 절대 내부 요소에 `autofocus`를 주지 않습니다.
2.  **값의 동기화:** `GhostInput`에 입력되는 값은 React 상태(`tempValue`)를 통해 `OverlayEditor`의 레이아웃(예: 글자 길이에 따라 늘어나는 에디터 크기)에 반영됩니다.
3.  **이벤트 전달:** `GhostInput`에서 발생하는 `Enter`, `Tab`, `Escape` 등의 키 이벤트는 `DataEditor`의 편집 완료 로직으로 연결합니다.

---

### 시각적 구조도

```text
[ Portal Layer (Top) ]
      ↑
      | (Ghost Input 이동: 선택된 셀 좌표로)
      |
[ DataGrid Layer ]
   - Canvas (데이터 렌더링)
   - Master Ghost Input (textarea) <--- [실제 포커스 및 한글 합성 지점]
      |
[ Overlay Editor Layer ]
   - Editor Frame (디자인)
   - Invisible Proxy Input (자리 확보용)
```

