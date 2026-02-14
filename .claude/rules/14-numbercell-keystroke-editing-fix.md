---
paths:
  - "packages/core/src/cells/number-cell.tsx"
---

# NumberCell Keystroke Editing 문제 해결 분석

## 문제 개요

NumberCell에서 키 입력(숫자 타이핑)으로 편집 모드에 진입한 후, Enter 키를 눌러도 편집 모드가 종료되지 않는 문제.

### 증상
1. 숫자 입력 → 편집 모드 진입 → Enter 입력 → **편집 모드가 종료되지 않음**
2. 더블클릭으로 편집 모드 진입한 경우는 정상 동작
3. 키 입력으로 시작한 편집에서 Enter 시 줄바꿈이 추가됨 (GhostInput에서 처리)

### 원인 분석

#### 핵심 원인: GhostInput의 키 이벤트 가로채기

키 입력으로 편집 모드가 시작될 때, glide-data-grid는 `GhostInput`이라는 숨겨진 textarea를 사용하여 IME 입력을 지원합니다. 문제는 Custom Cell(NumberCell)의 경우에도 GhostInput이 활성화되어 키보드 이벤트를 가로챈다는 것입니다.

```
[키 입력 흐름 - 문제 상황]
1. 사용자가 숫자 입력 (예: "5")
2. DataEditor.reselect() 호출 → GhostInput 활성화 및 값 설정
3. Custom Editor (NumberInput) 렌더링
4. 사용자가 Enter 입력
5. GhostInput의 onGhostKeyDown이 먼저 이벤트 수신
6. GhostInput이 Enter를 처리하려 하지만 Custom Cell용 처리 로직 없음
7. NumberInput의 handleInputKeyDown에 이벤트가 도달하지 않음
8. 편집 모드가 종료되지 않음
```

## 수정 내용

> **참고**: 리팩토링 후 GhostInput 관련 로직은 `use-ghost-input.ts`로, 키보드 핸들링은 `use-keyboard-handlers.ts`로 추출되었습니다. 아래 코드 위치 참조 시 해당 파일을 확인하세요.

### 1. data-editor.tsx - reselect 함수 수정

Custom Cell의 경우 GhostInput을 비활성화하도록 수정:

```typescript
// reselect 함수 내부
const isCustomCell = content.kind === GridCellKind.Custom;
const useGhostMode = initialValue !== undefined && !isCustomCell;

if (useGhostMode) {
    // 기존 GhostInput 활성화 로직 (Text, Number 등 기본 셀용)
    ghostInputRef.current?.setPosition(bounds.x, bounds.y, bounds.width, bounds.height);
    if (initialValue.length > 0) {
        ghostInputRef.current?.setValue(initialValue);
    }
    ghostInputRef.current?.setVisible(true);
    setGhostInputVisible(true);
} else if (isCustomCell && initialValue !== undefined) {
    // Custom Cell의 경우: GhostInput 완전 비활성화
    ghostInputRef.current?.clear();
    ghostInputRef.current?.setVisible(false);
    ghostInputRef.current?.blur();
    setGhostInputVisible(false);
}
```

**의도**: Custom Cell은 자체 에디터(NumberInput)가 키보드 이벤트를 직접 처리해야 하므로 GhostInput의 간섭을 제거.

### 2. data-editor.tsx - onGhostKeyDown 함수 수정

Custom Cell의 경우 GhostInput에서 키 이벤트 처리를 건너뛰도록 수정:

```typescript
const onGhostKeyDown = React.useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // ... 생략 ...

    // Custom Cell의 경우 GhostInput에서 키 이벤트를 처리하지 않음
    if (cellContent.kind === GridCellKind.Custom) {
        const key = event.key;
        if (key === "Enter" || key === "Tab" || key === "Escape") {
            event.preventDefault();
            event.stopPropagation();
        }
        return; // 조기 리턴 - 이후 처리 건너뜀
    }

    // ... 기존 로직 ...
}, [...]);
```

**의도**: Enter/Tab/Escape 키가 GhostInput에서 처리되지 않도록 하여 Custom Editor로 이벤트가 전달되도록 함.

### 3. data-editor.tsx - onFinishEditing 함수 수정

Custom Cell의 경우 newValue를 직접 사용하도록 수정:

```typescript
const onFinishEditing = React.useCallback<OverlayCallback["onFinishEditing"]>(
    (newValue, movement) => {
        // ... 생략 ...

        const isCustomCell = currentOverlay?.content?.kind === GridCellKind.Custom;

        if (currentOverlay?.cell !== undefined &&
            ghostText.length > 0 &&
            currentOverlay.content !== undefined &&
            !isCustomCell) {
            // 기존 로직: ghostText로부터 finalValue 생성 (기본 셀용)
            // ...
        } else if (isCustomCell) {
            // Custom Cell: newValue를 직접 사용
            console.log("[onFinishEditing] Custom cell - using newValue directly:", newValue);
            finalValue = newValue;
        }

        // ... 생략 ...
    },
    [...]
);
```

**의도**: Custom Cell은 GhostInput의 ghostText가 아닌, Custom Editor에서 전달한 newValue를 사용해야 함.

### 4. NumberInput.tsx - 유효한 초기값 검증

숫자가 아닌 문자로 편집 시작 시 포커스 손실 방지:

```typescript
const isValidNumericInitial = (val: string | undefined): boolean => {
    if (val === undefined || val === '') return false;
    // 허용: 숫자, 마이너스, 점, 콤마, 달러, 퍼센트
    return /^[-\d.,\$%]+$/.test(val);
};

const validInitialValue = isValidNumericInitial(initialValue) ? initialValue : undefined;
```

### 5. NumberInput.tsx - 포커스 강화

GhostInput과의 포커스 경쟁 해결:

```typescript
useEffect(() => {
    const focusAndSelect = () => {
        if (inputRef.current) {
            inputRef.current.focus({ preventScroll: true });

            if (validInitialValue !== undefined) {
                const len = inputRef.current.value.length;
                inputRef.current.setSelectionRange(len, len);
            } else {
                inputRef.current.select();
            }
        }
    };

    requestAnimationFrame(() => {
        focusAndSelect();
        window.setTimeout(focusAndSelect, 10); // 두 번째 시도
    });
}, [validInitialValue]);
```

### 6. NumberCell.tsx - Stale Closure 문제 해결

cellRef를 사용하여 최신 cell 값 참조:

```typescript
const cellRef = useRef(cell);
cellRef.current = cell;

const handleFinish = useCallback((movement: readonly [0 | 1 | -1, 0 | 1 | -1] = [0, 1]) => {
    const finalValue = currentValueRef.current;
    const currentCell = cellRef.current; // 최신 값 사용

    const finalCell = {
        ...currentCell,
        copyData: displayData,
        data: { ...currentCell.data, data: finalValue, displayData },
    };

    onChange(finalCell);
    onFinishedEditing(finalCell, movement);
}, [onChange, onFinishedEditing, format, rounding]);
```

## 현재 상태 및 미해결 문제

### 적용된 수정사항
- [x] GhostInput 비활성화 (Custom Cell)
- [x] onGhostKeyDown에서 Custom Cell 조기 리턴
- [x] onFinishEditing에서 newValue 직접 사용
- [x] NumberInput 초기값 검증
- [x] NumberInput 포커스 강화
- [x] NumberCell stale closure 수정



## 파일 위치

### 수정된 파일
- `/Users/pppfeeling/workspace/glide-data-grid/packages/core/src/data-editor/data-editor.tsx`
- `/Users/pppfeeling/workspace/datagrid/src/components/grid/cell/NumberInput.tsx`
- `/Users/pppfeeling/workspace/datagrid/src/components/grid/cell/NumberCell.tsx`

### 관련 파일
- `/Users/pppfeeling/workspace/glide-data-grid/packages/core/src/data-editor/ghost-input.tsx` - GhostInput 컴포넌트
- `/Users/pppfeeling/workspace/datagrid/src/components/grid/utils/numberUtils.ts` - 숫자 포맷/파싱 유틸

## 참고 자료

### Movement 벡터
- `[0, 0]` - 현재 위치 유지
- `[0, 1]` - 아래로 이동
- `[0, -1]` - 위로 이동
- `[1, 0]` - 오른쪽으로 이동
- `[-1, 0]` - 왼쪽으로 이동

### Console 로그 키워드
- `📝 NumberInput` - NumberInput 관련 로그
- `🔢 NumberCell` - NumberCell 관련 로그
- `⌨️` - 키보드 이벤트 로그
- `🏁` - 편집 완료 로그
- `[onFinishEditing]` - data-editor.tsx의 편집 완료 로그

## 작성일
2025-02-01
