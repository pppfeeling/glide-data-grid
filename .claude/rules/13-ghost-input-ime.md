---
paths:
  - "packages/core/src/data-editor/use-ghost-input.ts"
  - "packages/core/src/internal/ghost-input/**"
---

# Ghost Input IME 구현 분석

## 1. 배경 및 목표

glide-data-grid는 Canvas 기반 데이터 그리드로, 셀 편집 시 Overlay Editor(HTML 요소)를 Canvas 위에 띄운다. 문제는 한글(Korean) IME 입력 시 발생한다:

- 기존 흐름: Canvas(포커스) → 키 입력 → Overlay 열기 → Overlay 내부 textarea로 포커스 이동
- **문제**: 포커스가 Canvas → textarea로 이동하면서 IME 조합(composition) 세션이 끊김
- **결과**: 한글 첫 글자가 누락되거나 자소 분리 현상 발생

**목표**: 엑셀처럼 네비게이션 모드에서 문자를 입력하면 자연스럽게 편집 모드로 전환되면서 한글 IME가 정상 동작하도록 구현

---

## 2. 핵심 설계: "포커스를 절대 옮기지 않는다"

### GhostInput 패턴

숨겨진 `<textarea>`(GhostInput)가 **항상** 포커스를 유지한다. Overlay Editor가 열려도 포커스는 GhostInput에 남아있어 IME 세션이 끊기지 않는다.

```
[네비게이션 모드]
GhostInput(포커스) → 화살표/Tab → 셀 이동
                  → 문자 입력 → IME compositionstart → Overlay 열기

[편집 모드]
GhostInput(포커스 유지) → input 이벤트 → ghostValue 업데이트 → Overlay에 표시
                       → Enter/Escape → Overlay 닫기 → 값 저장/취소
```

### GhostMode 상태

- `isGhostMode = true`: GhostInput이 활성화된 상태. Overlay 내부 에디터들은 autoFocus를 비활성화하고, visibility: hidden으로 숨겨진다.
- `isGhostMode = false`: 마우스 더블클릭이나 직접 Overlay를 열었을 때. 기존 동작 그대로.

---

## 3. 아키텍처

### 신규 파일

| 파일 | 역할 |
|------|------|
| `internal/ghost-input/ghost-input.tsx` | GhostInput 컴포넌트. useImperativeHandle로 명령형 API 제공 |
| `internal/ghost-input/ghost-input-style.tsx` | Linaria styled 컴포넌트. 위치/크기는 직접 DOM 조작으로 변경 |

### 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `data-editor/data-editor.tsx` | GhostInput 통합, 오버레이 관리, displayData 동기화 |
| `data-editor/use-ghost-input.ts` | GhostInput 이벤트 핸들러 (리팩토링으로 추출됨) |
| `data-editor/use-keyboard-handlers.ts` | 키보드 네비게이션/키바인딩 (리팩토링으로 추출됨) |
| `internal/data-grid/data-grid.tsx` | Canvas tabIndex 변경 (`0` → `-1`) |
| `internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx` | GhostModeContext 제공, ghost mode시 visibility hidden |
| `internal/growing-entry/growing-entry.tsx` | GhostModeContext 소비, autoFocus 제거, ghostValue 표시 |
| `internal/data-grid-overlay-editor/private/number-overlay-editor.tsx` | GhostModeContext 소비, autoFocus 제어 |
| `internal/data-grid-overlay-editor/private/uri-overlay-editor.tsx` | GhostModeContext 소비, autoFocus 제어 |
| `internal/data-grid-overlay-editor/private/markdown-overlay-editor.tsx` | GhostModeContext 소비, autoFocus 제어 |
| `internal/data-grid-overlay-editor/private/bubbles-overlay-editor.tsx` | GhostModeContext 소비, autoFocus 제어 |

### GhostInputRef 명령형 API

```typescript
interface GhostInputRef {
    focus(): void;
    setValue(value: string): void;
    getValue(): string;
    setPosition(rect: { left: number; top: number; width: number; height: number }): void;
    setVisible(visible: boolean): void;
    clear(): void;
}
```

직접 DOM 조작을 사용하여 React 리렌더링 없이 위치/가시성 변경. IME 조합 중 리렌더링이 일어나면 조합이 깨질 수 있기 때문.

### GhostModeContext

```typescript
export const GhostModeContext = React.createContext<{
    isGhostMode: boolean;
    ghostValue: string;
}>({ isGhostMode: false, ghostValue: "" });
```

DataGridOverlayEditor에서 Provider로 제공, 하위 모든 에디터 컴포넌트에서 소비.

---

## 4. 이벤트 흐름 상세

### 4.1 문자 입력으로 편집 시작 (Ghost Mode)

1. GhostInput `keydown` → `onGhostKeyDown` 호출
2. printable character 감지 → `return` (grid handler에 전달하지 않음)
3. GhostInput `compositionstart` (한글) 또는 `input` (영문) 이벤트 발생
4. `onGhostInput` 호출 → overlay가 없으면 `handleKeyDownForOverlay` 호출하여 overlay 열기
5. GhostInput 위치를 셀 위치로 이동, visible로 설정
6. Overlay 내부 에디터는 `isGhostMode=true`로 autoFocus 비활성화, visibility hidden
7. GhostInput의 `input` 이벤트 → `ghostValue` 업데이트 → GrowingEntry에서 표시

### 4.2 Enter/더블클릭으로 편집 시작 (일반 모드)

1. Overlay 열기 → `isGhostMode=false`
2. Overlay 내부 에디터의 autoFocus가 정상 동작
3. GhostInput은 비활성 상태

### 4.3 편집 완료 (onFinishEditing)

1. Enter/Tab/Escape → overlay 닫기
2. `ghostText` 값으로 셀 데이터 구성
3. **displayData 동기화**:
   - Text 셀: `displayData = data`
   - Number 셀: `displayData = numVal.toLocaleString()` (천단위 콤마)
   - URI 셀: `displayData = data`
4. GhostInput clear, 위치 초기화, 포커스 유지

---

## 5. 해결한 문제들과 잘못된 접근

### 5.1 긴 텍스트 입력이 표시/저장되지 않는 문제

**증상**: 한글 긴 텍스트는 편집 모드에서 보이지만 저장 후 네비게이션 모드에서 안 보임. 영문 긴 텍스트는 편집 모드에서도 안 보임.

**원인 1 (CSS)**: GhostInput 스타일에 `overflow: hidden` + `white-space: nowrap`이 텍스트를 클리핑

**수정**: `overflow: visible` + `white-space: pre`로 변경

**원인 2 (displayData 불일치)**: 그리드는 네비게이션 모드에서 `displayData`를 표시하는데, 편집 완료 시 `data`만 업데이트하고 `displayData`는 이전 값 그대로였음

**수정**: `onFinishEditing`에서 `displayData`를 `data`와 동기화하는 로직 추가

### 5.2 Backspace가 동작하지 않는 문제

**증상**: 편집 모드에서 Backspace로 글자 삭제 불가

**잘못된 가정**: printable character 체크(`key.length === 1`)가 Backspace도 막아줄 것이라 생각

**실제 원인**: Backspace의 `key`는 `"Backspace"` (length > 1)이므로 printable check를 통과, grid handler(`handleFixedKeybindings`)로 전달되어 셀 삭제 동작 수행

**수정**: overlay가 열려있을 때 editing key(Backspace, Delete)와 cursor key(Arrow, Home, End)도 grid handler에 전달하지 않도록 추가 체크

```typescript
if (overlayRef.current !== undefined && ghostInputVisibleRef.current) {
    const isEditingKey = key === "Backspace" || key === "Delete";
    const isCursorKey = key === "ArrowLeft" || key === "ArrowRight" || ...;
    if (isEditingKey || isCursorKey) return;
}
```

### 5.3 Number 셀에서 한 글자만 입력되는 문제

**증상**: Number 컬럼에서 숫자를 하나만 입력하면 더 이상 입력 불가, 입력이 이중으로 보임

**잘못된 접근 1**: printable character 블로킹을 overlay 체크 이전으로 이동. → 효과 없음

**실제 원인**: `NumberOverlayEditor`의 `<NumericFormat autoFocus={true}>`가 overlay가 열릴 때 GhostInput에서 포커스를 빼앗음. 포커스가 이동하면서 IME 세션 종료, 이후 입력이 GhostInput이 아닌 NumericFormat으로 감.

**수정**: 모든 overlay 에디터에 GhostModeContext를 적용하여 `autoFocus={!isGhostMode}`로 변경. GrowingEntry에서도 `autoFocus`를 rest props에서 분리하여 내부 InputBox에 전달하지 않도록 함.

### 5.4 이중 표시 문제 (Overlay + GhostInput 둘 다 보임)

**증상**: GhostInput 아래에 overlay editor 프레임(border/shadow)이 보임

**원인**: GhostInput은 visible, overlay editor도 visible → 두 개의 입력 영역이 겹쳐 보임

**수정**: `DataGridOverlayEditorStyle`에 `isGhostMode`일 때 `visibility: hidden` 적용

### 5.5 천단위 콤마 미표시

**증상**: Number 셀에 300 입력 후 저장하면 "300"으로 표시 (콤마 없음, 큰 숫자에서 문제)

**원인**: `displayData`를 raw `ghostText` (예: "300")로 설정

**수정**: `numVal.toLocaleString()`으로 포맷팅하여 `displayData` 설정

---

## 6. 디버깅 팁

### Console.log 포인트

편집 흐름 디버깅 시 유용한 로그 위치:

1. **`onGhostInput`**: ghostText 값, overlay 상태, 셀 종류 확인
2. **`onFinishEditing`**: finalValue 구성 확인 (data vs displayData)
3. **`onGhostKeyDown`**: 키 이벤트가 grid handler로 전달되는지 확인
4. **`mangledOnCellsEdited`**: 최종적으로 셀에 저장되는 값 확인

### 이중 입력 경로 문제 디버깅

가장 흔한 문제 패턴:
- `keydown` 이벤트 → `handleFixedKeybindings` → overlay 열기 시도
- `input` 이벤트 → `onGhostInput` → overlay 열기 시도
- 두 경로가 동시에 실행되면 이중 처리 발생

해결 원칙: printable character는 **항상** `onGhostKeyDown`에서 `return`하여 grid handler에 도달하지 않도록 한다.

### 포커스 추적

```javascript
document.addEventListener('focus', (e) => console.log('focus:', e.target), true);
document.addEventListener('blur', (e) => console.log('blur:', e.target), true);
```

overlay 열릴 때 포커스가 GhostInput에서 다른 요소로 이동하면 IME가 깨진다. 위 이벤트로 포커스 이동을 추적할 수 있다.

---

## 7. isActivationOnEnter 제거

Ghost Input 구현 과정에서 `isActivationOnEnter` 기능을 제거했다.

### 제거된 항목
- `DataEditorProps` 인터페이스에서 prop 정의 제거
- props destructuring에서 제거
- `onFinishEditing`의 Tab 네비게이션 및 `shouldActivateNextCell` 로직 (~55줄) 단순화
- `handleFixedKeybindings`의 Tab 키 특수 처리 (~20줄) 제거
- Tab trapping 로직 제거

### 단순화된 셀 이동 로직

```typescript
// 이전: shouldActivateNextCell, Tab 방향 계산 등 복잡한 분기
// 이후: 단순한 clamp + updateSelectedCell
if (updateSelected) {
    const newCol = clamp(col + movX, rowMarkerOffset, mangledCols.length - 1);
    const newRow = clamp(row + movY, 0, mangledRows - 1);
    updateSelectedCell(newCol, newRow, isEditingLastRow, false);
    window.requestAnimationFrame(() => {
        ghostInputRef.current?.focus();
    });
}
```

---

## 8. 구현 시 주의사항

1. **React 리렌더링 회피**: GhostInput의 위치/가시성 변경은 반드시 직접 DOM 조작 사용. `useState`로 관리하면 IME 조합 중 리렌더링 → 조합 깨짐.

2. **autoFocus 관리**: 새 overlay 에디터를 추가할 때 반드시 `GhostModeContext`를 소비하여 `autoFocus={!isGhostMode}` 적용. 그렇지 않으면 포커스 탈취 발생.

3. **displayData 동기화**: 셀 값을 저장할 때 `data`와 `displayData`를 모두 업데이트해야 한다. 그리드는 네비게이션 모드에서 `displayData`를 표시한다.

4. **키 이벤트 분리**: printable character는 항상 GhostInput이 처리, editing/cursor key는 overlay가 열려있을 때만 GhostInput이 처리, 나머지(Enter, Escape, Tab, 방향키 등)는 grid handler가 처리.

5. **리팩토링 후 파일 위치**: GhostInput 관련 이벤트 핸들러는 `use-ghost-input.ts`에 위치. `onGhostInput`, `onGhostKeyDown` 등 핸들러 수정시 이 파일을 참조. `data-editor.tsx`에는 오버레이 관리와 상태 초기화만 남아있음.
