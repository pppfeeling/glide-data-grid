# Number Cell Enter Key Navigation 구현 분석

## 작업 개요
- **작업일**: 2026-01-28
- **목표**: `GridCellKind.Number` 셀에서 편집 모드 중 Enter 키를 누르면 아래 셀로 이동하도록 구현
- **상태**: 완료

---

## 문제 분석

### 기존 동작
- Text 셀(`GridCellKind.Text`)은 편집 후 Enter 입력 시 아래로 정상 이동
- Number 셀(`GridCellKind.Number`)은 Enter 입력 시 아래로 이동하지 않음

### 원인 분석
1. **이벤트 버블링 구조**
   - `data-grid-overlay-editor.tsx`의 `div.gdg-clip-region`에 `onKeyDown` 핸들러가 있음
   - Enter 키 입력 시 `[0, 1]` (아래로 이동) 동작이 정의되어 있음
   - 하위 컴포넌트에서 이벤트가 버블링되어야 이 핸들러가 실행됨

2. **Text 셀 vs Number 셀 차이점**
   - Text 셀: `GrowingEntry` 컴포넌트 사용 → `onKeyDown` 이벤트 정상 버블링
   - Number 셀: `react-number-format`의 `NumericFormat` 컴포넌트 사용 → `onKeyDown` 핸들러 없음

3. **react-number-format 라이브러리 특성**
   - `NumericFormat` 컴포넌트가 내부적으로 Enter 키를 처리할 가능성
   - 명시적인 `onKeyDown` 핸들러 없이는 이벤트 버블링이 보장되지 않음

---

## 수정 파일

### 1. number-overlay-editor.tsx
**경로**: `packages/core/src/internal/data-grid-overlay-editor/private/number-overlay-editor.tsx`

#### 변경 내용
```typescript
// Props 인터페이스에 onKeyDown 추가 (Line 12)
interface Props {
    readonly value: number | undefined;
    readonly disabled?: boolean;
    readonly onChange: (values: NumberFormatValues) => void;
    readonly onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;  // 추가
    readonly highlight: boolean;
    // ... 기타 props
}

// props에서 onKeyDown 추출 (Line 38)
const {
    value,
    onChange,
    onKeyDown,  // 추가
    // ... 기타 props
} = p;

// NumericFormat에 onKeyDown 전달 (Line 71)
<NumericFormat
    // ... 기타 props
    onKeyDown={onKeyDown}  // 추가
    // ...
/>
```

### 2. number-cell.tsx
**경로**: `packages/core/src/cells/number-cell.tsx`

#### 변경 내용
```typescript
provideEditor: () => p => {
    // onFinishedEditing 추가 (Line 34)
    const { isHighlighted, onChange, onFinishedEditing, value, validatedSelection } = p;

    return (
        <React.Suspense fallback={null}>
            <NumberOverlayEditor
                // ... 기존 props

                // onKeyDown 핸들러 추가 (Lines 52-63)
                onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onFinishedEditing(value, [0, 1]);  // 아래로 이동
                    } else if (e.key === "Tab") {
                        e.preventDefault();
                        onFinishedEditing(value, [e.shiftKey ? -1 : 1, 0]);  // 좌/우 이동
                    } else if (e.key === "Escape") {
                        e.preventDefault();
                        onFinishedEditing(undefined, [0, 0]);  // 편집 취소
                    }
                }}
            />
        </React.Suspense>
    );
},
```

---

## 키 동작 정의

| 키 입력 | 동작 | Movement Vector |
|---------|------|-----------------|
| Enter | 편집 완료 후 아래 셀로 이동 | `[0, 1]` |
| Shift+Enter | (Number 셀에서는 Enter와 동일하게 처리됨) | - |
| Tab | 편집 완료 후 오른쪽 셀로 이동 | `[1, 0]` |
| Shift+Tab | 편집 완료 후 왼쪽 셀로 이동 | `[-1, 0]` |
| Escape | 편집 취소 (변경 사항 저장 안 함) | `[0, 0]` |

---

## 기술적 세부 사항

### Movement Vector 설명
- 형식: `[column_delta, row_delta]`
- `[0, 1]`: 현재 열 유지, 1행 아래로 이동
- `[1, 0]`: 1열 오른쪽으로 이동, 현재 행 유지
- `[-1, 0]`: 1열 왼쪽으로 이동, 현재 행 유지
- `[0, 0]`: 이동 없음

### onFinishedEditing 콜백
- **시그니처**: `(newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void`
- **newValue**: 저장할 셀 값 (undefined면 저장 안 함)
- **movement**: 편집 완료 후 이동 방향

### 관련 타입 정의
```typescript
// packages/core/src/internal/data-grid/data-grid-types.ts
export type ProvideEditorComponent<T extends InnerGridCell> = React.FunctionComponent<{
    readonly onChange: (newValue: T) => void;
    readonly onFinishedEditing: (newValue?: T, movement?: readonly [-1 | 0 | 1, -1 | 0 | 1]) => void;
    readonly isHighlighted: boolean;
    readonly value: T;
    readonly initialValue?: string;
    readonly validatedSelection?: SelectionRange;
    // ... 기타 props
}>;
```

---

## 참고 파일

| 파일 | 역할 |
|------|------|
| `data-grid-overlay-editor.tsx` | 오버레이 에디터의 키 이벤트 처리 (기본 Enter 핸들러 위치) |
| `growing-entry.tsx` | Text 셀에서 사용하는 에디터 컴포넌트 (참조용) |
| `text-cell.tsx` | Text 셀 렌더러 (참조용) |
| `data-editor-keybindings.ts` | 키바인딩 정의 |

---

## 테스트 시나리오

1. Number 셀 더블클릭하여 편집 모드 진입
2. 숫자 입력
3. Enter 키 입력
4. **예상 결과**: 값이 저장되고 아래 셀로 포커스 이동

### 추가 테스트
- Tab 키: 오른쪽 셀로 이동 확인
- Shift+Tab: 왼쪽 셀로 이동 확인
- Escape: 편집 취소 및 원래 값 유지 확인

---

## 추가 수정 사항 (2026-01-28)

### 문제: 편집 없이 Enter 시 rowStatus가 "U"로 변경됨

#### 증상
- Number 셀에서 편집 모드 진입 후, 값을 변경하지 않고 Enter 입력
- `rowMarkers`의 `rowStatus`가 "U" (Updated)로 변경됨
- Text 셀에서는 같은 동작을 해도 rowStatus가 변경되지 않음 (정상)

#### 원인 분석

1. **Number 셀의 onKeyDown 핸들러**:
```typescript
// number-cell.tsx
if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    onFinishedEditing(value, [0, 1]);  // value를 전달
}
```
Enter 키 입력 시 현재 `value`를 `onFinishedEditing`에 전달함.

2. **onFinishEditing 함수**:
```typescript
// data-editor.tsx (기존 코드)
if (currentOverlay?.cell !== undefined && finalValue !== undefined && isEditableGridCell(finalValue)) {
    mangledOnCellsEdited([{ location: currentOverlay.cell, value: finalValue }]);
}
```
`finalValue !== undefined`이면 무조건 `mangledOnCellsEdited` 호출 → 값이 변경되지 않아도 `onCellEdited` 트리거됨.

3. **Story의 onCellEdited**:
```typescript
onCellEdited={(cell, newValue) => {
    setCellValue(cell, newValue);  // rowStatus를 "U"로 설정
}}
```

#### 해결 방법

**파일**: `packages/core/src/data-editor/data-editor.tsx`
**위치**: `onFinishEditing` 함수 (Lines 3517-3548)

원본 값과 최종 값을 비교하여 **실제로 변경된 경우에만** `mangledOnCellsEdited` 호출:

```typescript
// Check if the value actually changed by comparing data fields
const originalContent = currentOverlay?.content;
const hasValueChanged = (): boolean => {
    if (finalValue === undefined || originalContent === undefined) return false;
    if (finalValue.kind !== originalContent.kind) return true;

    // Compare based on cell type
    switch (finalValue.kind) {
        case GridCellKind.Text:
        case GridCellKind.Uri:
        case GridCellKind.Markdown:
            return (finalValue as any).data !== (originalContent as any).data;
        case GridCellKind.Number:
            return (finalValue as any).data !== (originalContent as any).data;
        case GridCellKind.Boolean:
            return (finalValue as any).data !== (originalContent as any).data;
        default:
            // For other cell types, assume changed
            return true;
    }
};

// Only call mangledOnCellsEdited if value actually changed
if (currentOverlay?.cell !== undefined && finalValue !== undefined &&
    isEditableGridCell(finalValue) && hasValueChanged()) {
    mangledOnCellsEdited([{ location: currentOverlay.cell, value: finalValue }]);
    window.requestAnimationFrame(() => {
        gridRef.current?.damage([{ cell: currentOverlay.cell }]);
    });
}
```

---

## 수정 후 동작

### Number 셀에서 값 변경 없이 Enter 입력 시

```
1. 편집 모드 진입 (더블클릭 또는 타이핑)
2. 값 변경 없이 Enter 입력
3. onFinishedEditing(value, [0, 1]) 호출
4. hasValueChanged() 호출 → false 반환
5. mangledOnCellsEdited 호출 안 함 ✓
6. rowStatus 변경 없음 ✓
7. 아래 셀로 이동
```

### Number 셀에서 값 변경 후 Enter 입력 시

```
1. 편집 모드 진입
2. 값 변경 (예: 1000 → 2000)
3. Enter 입력
4. onFinishedEditing(value, [0, 1]) 호출
5. hasValueChanged() 호출 → true 반환
6. mangledOnCellsEdited 호출 → 값 저장
7. rowStatus "U"로 변경 ✓
8. 아래 셀로 이동
```

---

## 영향 받는 셀 타입

| 셀 타입 | 비교 필드 | 비고 |
|---------|----------|------|
| Text | `data` | 문자열 비교 |
| Number | `data` | 숫자 비교 |
| Uri | `data` | 문자열 비교 |
| Markdown | `data` | 문자열 비교 |
| Boolean | `data` | boolean 비교 |
| Custom | - | 항상 변경된 것으로 처리 |
