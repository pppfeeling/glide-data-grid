# Boolean Cell Keyboard Navigation 구현 분석

## 작업 개요
- **작업일**: 2026-01-28
- **목표**: `GridCellKind.Boolean` 셀에서 Space 키는 토글, Enter 키는 아래로 이동하도록 구현
- **상태**: 완료

---

## 문제 분석

### 기존 동작
- Boolean 셀에서 키보드 활성화(Space, Enter 모두) 시 값이 토글됨
- `activateCell` 키바인딩이 `" |Enter|shift+Enter"` (Space, Enter, Shift+Enter)에 매핑됨

### 요구 사항
- **Space 키**: Boolean 값 토글 (true ↔ false)
- **Enter 키**: 아래 셀로 이동 (토글 없음)

---

## 수정 파일

### data-editor.tsx
**경로**: `packages/core/src/data-editor/data-editor.tsx`

#### 변경 위치: handleFixedKeybindings 함수 (Lines 3776-3800)

```typescript
// For Boolean cells: Space toggles, Enter moves down
const cellContent = getMangledCellContent([col, row]);
if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {
    onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
    if (event.key === " ") {
        // Space on Boolean cell: toggle value
        mangledOnCellsEdited([
            {
                location: [col, row],
                value: {
                    ...cellContent,
                    data: toggleBoolean(cellContent.data),
                },
            },
        ]);
        gridRef.current?.damage([{ cell: [col, row] }]);
    } else if (event.key === "Enter") {
        // Enter on Boolean cell: move down
        row += 1;
    }
} else {
    onCellActivated?.([col - rowMarkerOffset, row], activationEvent);
    reselect(bounds, activationEvent);
}
```

#### 변경 위치: handleFixedKeybindings 종속성 배열 (Lines 3968-3969)

```typescript
[
    // ... 기타 종속성
    adjustSelection,
    getMangledCellContent,
    mangledOnCellsEdited,  // 추가됨
]
```

---

## 동작 흐름

### Space 키 입력 시 (`event.key === " "`)
1. `isHotkey(keys.activateCell, ...)` 매칭
2. `cellContent.kind === GridCellKind.Boolean` 확인
3. `cellContent.readonly !== true` 확인
4. `event.key === " "` 조건 충족
5. `mangledOnCellsEdited` 호출하여 값 토글
6. `gridRef.current?.damage` 호출하여 UI 갱신

### Enter 키 입력 시 (`event.key === "Enter"`)
1. `isHotkey(keys.activateCell, ...)` 매칭
2. `cellContent.kind === GridCellKind.Boolean` 확인
3. `cellContent.readonly !== true` 확인
4. `event.key === "Enter"` 조건 충족
5. `row += 1` 실행 (아래로 이동)
6. 함수 후반부에서 `updateSelectedCell(col, row, ...)` 호출되어 셀 이동

---

## 키 동작 정의

| 키 입력 | 동작 | 비고 |
|---------|------|------|
| **Space** | Boolean 값 토글 | true ↔ false |
| **Enter** | 아래 셀로 이동 | 토글 없음 |
| Shift+Enter | 아래 셀로 이동 | Enter와 동일 (activateCell에 포함) |

---

## 주요 함수/변수

### toggleBoolean
```typescript
// data-editor-fns.ts
export function toggleBoolean(data: boolean | null | undefined): boolean | null | undefined {
    // true → false → true 순환
}
```

### mangledOnCellsEdited
- 셀 편집 내용을 저장하는 콜백
- `onCellsEdited` 또는 `onCellEdited` 호출

### gridRef.current?.damage
- 변경된 셀의 UI를 다시 그리도록 요청

---

## 테스트 시나리오

1. Boolean 셀 선택
2. **Space 키 입력** → 값이 토글됨 (true ↔ false)
3. **Enter 키 입력** → 아래 셀로 이동 (값 변경 없음)

### 추가 테스트
- 마지막 행에서 Enter: 범위 내에서 유지
- readonly Boolean 셀: Space/Enter 모두 동작 안 함 (일반 활성화 로직 수행)

---

## 추가 수정 사항 (2026-01-28)

### 문제: Space 키가 GhostInput에서 차단됨

#### 증상
- Boolean 셀에서 Space 키를 눌러도 값이 토글되지 않음
- 콘솔 로그: `[onGhostKeyDown] key: " "` 출력됨
- `handleFixedKeybindings`까지 이벤트가 전달되지 않음

#### 원인 분석
`onGhostKeyDown` 함수에서 Space 키(`" "`)가 "printable character"로 간주되어 early return됨:

```typescript
// data-editor.tsx (기존 코드)
const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

if (isPrintable) {
    return;  // Space 키가 여기서 차단됨
}
```

Space 키는 `key.length === 1`이므로 printable로 판단되어 `handleFixedKeybindings`에 전달되지 않았음.

#### 해결 방법

**파일**: `packages/core/src/data-editor/data-editor.tsx`
**위치**: `onGhostKeyDown` 함수 (Lines 4204-4225)

Boolean 셀에서 Space 키는 예외 처리하여 `handleFixedKeybindings`로 전달:

```typescript
// Printable characters should NEVER be passed to the grid's key handler.
// EXCEPTION: Space key on Boolean cells should be passed through for toggle functionality.
{
    const key = event.key;
    const isPrintable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

    if (isPrintable) {
        // Space key on Boolean cell should pass through to handleFixedKeybindings for toggle
        if (key === " " && gridSelection.current !== undefined) {
            const cell = gridSelection.current.cell;
            const cellContent = getMangledCellContent(cell);
            if (cellContent.kind === GridCellKind.Boolean && cellContent.readonly !== true) {
                // Don't return - let Space pass through to handleFixedKeybindings
            } else {
                return;
            }
        } else {
            return;
        }
    }
}
```

#### 의존성 배열 수정

```typescript
// onGhostKeyDown 의존성 배열에 getMangledCellContent 추가
[gridSelection, onKeyDown, onFinishEditing, getMangledCellContent]
```

---

## 최종 이벤트 흐름

### Boolean 셀에서 Space 키 입력 시

```
1. 사용자가 Space 키 입력
2. onGhostKeyDown 호출
3. isPrintable 체크 → Space는 printable
4. Boolean 셀 예외 처리 → pass through
5. handleFixedKeybindings 호출
6. isHotkey(keys.activateCell, ...) 매칭
7. cellContent.kind === GridCellKind.Boolean 확인
8. event.key === " " 확인
9. mangledOnCellsEdited 호출 → 값 토글
10. gridRef.current?.damage 호출 → UI 갱신
```

### Boolean 셀에서 Enter 키 입력 시

```
1. 사용자가 Enter 키 입력
2. onGhostKeyDown 호출
3. isPrintable 체크 → Enter는 printable 아님
4. handleFixedKeybindings 호출
5. isHotkey(keys.activateCell, ...) 매칭
6. cellContent.kind === GridCellKind.Boolean 확인
7. event.key === "Enter" 확인
8. row += 1 실행
9. updateSelectedCell 호출 → 아래 셀로 이동
```
