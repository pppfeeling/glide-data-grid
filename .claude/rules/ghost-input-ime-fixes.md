---
paths:
  - "packages/core/src/internal/ghost-input/**"
---

# GhostInput 및 IME 입력 관련 수정 사항

## 개요

네비게이션 모드에서 키보드 입력 시 편집 모드 전환과 관련된 버그 수정 및 CustomCell의 IME(한글/일본어/중국어) 입력 처리 개선.

## 수정된 파일

### 1. packages/core/src/data-editor/data-editor.tsx

#### 수정 1: 스페이스 키로 편집 모드 전환 방지
- **위치**: `onGhostInput` 함수 (약 4103-4104 라인)
- **문제**: 네비게이션 모드에서 스페이스 키를 누르면 편집 모드로 전환됨
- **해결**: `value.trim().length > 0` 조건 추가로 공백만 있는 경우 편집 모드 전환 방지

```typescript
// 수정 전
if (!composing && value.length > 0 && gridSelection.current !== undefined) {

// 수정 후
if (!composing && value.length > 0 && value.trim().length > 0 && gridSelection.current !== undefined) {
```

#### 수정 2: CustomCell에서 GhostInput 입력으로 편집 모드 전환 방지
- **위치**: `onGhostInput` 함수 (약 4108-4112 라인)
- **문제**: DropdownCell 등 CustomCell에서 영문 입력 시 GhostInput이 편집 모드를 열지만, CustomCell은 자체 에디터(react-select 등)를 사용하므로 입력값이 전달되지 않음
- **해결**: CustomCell인 경우 GhostInput 입력을 무시

```typescript
// CustomCell - 자체 에디터 사용 (예: DropdownCell의 react-select)
if (cell.kind === GridCellKind.Custom) {
    return;
}
```

#### 수정 3: CustomCell에서 IME Composition으로 편집 모드 전환 방지
- **위치**: `onGhostCompositionStart` 함수 (약 4166-4170 라인)
- **문제**: DropdownCell에서 한글 입력 시 IME composition이 시작되면 편집 모드가 열리지만, GhostInput의 값이 react-select로 전달되지 않아 빈 상태로 에디터가 열림
- **해결**: CustomCell인 경우 IME composition으로 편집 모드를 열지 않음

```typescript
// CustomCell - 자체 에디터 사용 (예: DropdownCell의 react-select)
if (cell.kind === GridCellKind.Custom) {
    return;
}
```

### 2. packages/cells/src/cells/multi-select-cell.tsx

#### 수정: IME Composition 중 Enter 키 처리
- **위치**: `handleKeyDown` 함수 (약 313-318 라인)
- **문제**: 한글 입력 후 Enter를 누르면 첫 번째 Enter가 한글 조합 완성과 옵션 선택을 동시에 처리하여 정상 동작하지 않음
- **해결**: `event.nativeEvent.isComposing`이 true인 경우 키 이벤트 무시

```typescript
const handleKeyDown: React.KeyboardEventHandler = event => {
    // IME composition 중에는 키 이벤트 무시
    // 첫 번째 Enter는 조합 완성, 두 번째 Enter가 실제 동작
    if (event.nativeEvent.isComposing) {
        return;
    }
    // ... 나머지 처리
};
```

## 동작 변경 요약

### 네비게이션 모드에서 키 입력
| 입력 | 수정 전 | 수정 후 |
|------|---------|---------|
| 스페이스 | 편집 모드 전환 | 무시 (네비게이션 유지) |
| 영문 (일반 셀) | 편집 모드 전환 + 입력 | 동일 (정상 동작) |
| 영문 (CustomCell) | 편집 모드 전환 (입력 안됨) | 무시 (네비게이션 유지) |
| 한글 (일반 셀) | 편집 모드 전환 + 입력 | 동일 (정상 동작) |
| 한글 (CustomCell) | 편집 모드 전환 (입력 안됨) | 무시 (네비게이션 유지) |

### CustomCell 편집 모드 진입 방법
CustomCell은 GhostInput을 사용하지 않으므로 다음 방법으로 편집 모드에 진입해야 함:
- **더블클릭**: 셀을 더블클릭
- **Enter 키**: 셀 선택 후 Enter 키
- **F2 키**: 셀 선택 후 F2 키

### MultiSelectCell 한글 입력
| 동작 | 수정 전 | 수정 후 |
|------|---------|---------|
| 한글 입력 + Enter | 조합 완성과 동시에 onFinishedEditing 호출 | 첫 Enter: 조합 완성, 두번째 Enter: 옵션 생성 |

## 관련 파일 참조

- GhostInput 컴포넌트: `packages/core/src/internal/data-grid-overlay-editor/private/ghost-input.tsx`
- 이벤트 처리: `/analyze/08-events.md`
- 편집 처리: `/analyze/07-editing.md`
- 셀 렌더러: `/analyze/05-cells.md`

## 테스트 방법

1. Storybook 실행: `npm run start`
2. `packages/cells/src/cell.stories.tsx`의 DropdownCell, MultiSelectCell 스토리 확인
3. 테스트 케이스:
   - 네비게이션 모드에서 스페이스 키 → 편집 모드로 전환되지 않아야 함
   - DropdownCell에서 한글/영문 입력 → 편집 모드로 전환되지 않아야 함
   - DropdownCell에서 Enter/더블클릭 → 편집 모드로 전환 후 정상 입력
   - MultiSelectCell에서 한글 입력 후 Enter → 옵션이 정상적으로 생성되어야 함
