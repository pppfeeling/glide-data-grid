# 편집 및 복사/붙여넣기 분석

## 개요
- **역할**: 셀 편집, 복사, 붙여넣기, 삭제 기능
- **핵심 파일**:
  - `data-editor/data-editor.tsx` (편집 상태 관리, 오버레이 관리)
  - `data-editor/use-clipboard.ts` (복사/붙여넣기/잘라내기 훅 - 리팩토링)
  - `data-editor/use-ghost-input.ts` (IME/문자 입력 핸들링 - 리팩토링)
  - `data-editor/use-keyboard-handlers.ts` (키보드 편집 시작/삭제 - 리팩토링)
  - `data-editor/data-editor-fns.ts` (편집 유틸리티)
  - `data-editor/copy-paste.ts` (클립보드 데이터 파싱)
  - `internal/data-grid-overlay-editor/` (오버레이 편집기)

## 편집 오버레이 상태

```typescript
// data-editor.tsx:812-821
const [overlay, setOverlay] = useState<{
    target: Rectangle;      // 셀 화면 위치
    content: GridCell;      // 편집할 셀 데이터
    theme: FullTheme;       // 테마
    initialValue: string | undefined;  // 초기 입력값 (타이핑 시작시)
    cell: Item;             // [col, row]
    highlight: boolean;     // 선택 하이라이트
    forceEditMode: boolean; // 강제 편집 모드
    activation: CellActivatedEventArgs;  // 활성화 정보
}>();
```

## 편집 시작 조건

### cellActivationBehavior
```typescript
// data-editor.tsx:690
type CellActivationBehavior = "double-click" | "single-click" | "second-click";

// - "double-click": 더블클릭으로 편집 시작
// - "single-click": 단일 클릭으로 편집 시작
// - "second-click": 선택된 셀 다시 클릭시 편집 (기본값)
```

### 편집 시작 흐름
```
1. 클릭/키보드 이벤트
        ↓
2. activationBehavior 확인
        ↓
3. 셀이 편집 가능한지 확인
   - allowOverlay === true
   - readonly !== true
        ↓
4. onCellActivated 콜백 호출
        ↓
5. 오버레이 상태 설정 (setOverlay)
        ↓
6. DataGridOverlayEditor 렌더링
```

### 키보드로 편집 시작
```typescript
// editOnType === true일 때
// 인쇄 가능한 문자 입력시 편집 시작
if (editOnType && isPrintableKey(event.key)) {
    setOverlay({
        target: cellBounds,
        content: cellContent,
        initialValue: event.key,  // 입력한 문자
        forceEditMode: true,
        // ...
    });
}

// Enter/F2 키: 편집 시작
if (event.key === "Enter" || event.key === "F2") {
    setOverlay({
        target: cellBounds,
        content: cellContent,
        initialValue: undefined,
        forceEditMode: true,
        // ...
    });
}
```

## DataGridOverlayEditor

### 구조
```tsx
// internal/data-grid-overlay-editor/data-grid-overlay-editor.tsx
<DataGridOverlayEditor
    target={overlay.target}
    content={overlay.content}
    theme={overlay.theme}
    initialValue={overlay.initialValue}
    onFinishEditing={onFinishEditing}
    forceEditMode={overlay.forceEditMode}
    highlight={overlay.highlight}
    imageEditorOverride={imageEditorOverride}
    markdownDivCreateNode={markdownDivCreateNode}
    provideEditor={provideEditor}
    getCellRenderer={getCellRenderer}
/>
```

### 편집기 결정 순서
```typescript
// 1. provideEditor prop (사용자 커스텀)
if (provideEditor !== undefined) {
    const result = provideEditor(cell);
    if (result !== undefined) return result;
}

// 2. 셀 렌더러의 provideEditor
const renderer = getCellRenderer(cell);
if (renderer?.provideEditor !== undefined) {
    return renderer.provideEditor(cell);
}

// 3. 기본 편집기 없음
return undefined;
```

## 편집 완료 처리

### onFinishEditing
```typescript
// data-editor.tsx
const onFinishEditing = useCallback((
    newValue: GridCell | undefined,
    movement: readonly [-1 | 0 | 1, -1 | 0 | 1]  // [deltaCol, deltaRow]
) => {
    // 1. 값 변경시 검증
    if (newValue !== undefined && validateCell !== undefined) {
        const valid = validateCell(cell, newValue, originalValue);
        if (valid === false) {
            // 검증 실패 - 편집 취소
            setOverlay(undefined);
            return;
        }
        if (typeof valid !== "boolean") {
            // 검증에서 수정된 값 사용
            newValue = valid;
        }
    }

    // 2. onCellEdited 콜백
    if (newValue !== undefined) {
        onCellEdited?.(cell, newValue);
    }

    // 3. 오버레이 닫기
    setOverlay(undefined);

    // 4. 다음 셀로 이동
    if (movement[0] !== 0 || movement[1] !== 0) {
        const newCell = [cell[0] + movement[0], cell[1] + movement[1]];
        setCurrent({ cell: newCell, range: singleCellRange }, false, false, "edit");

        // isActivationOnEnter 옵션: 다음 셀도 편집 모드로
        if (isActivationOnEnter) {
            // 다음 셀 편집 시작
        }
    }

    // 5. onFinishedEditing 콜백
    onFinishedEditing?.(newValue, movement);
}, [/* dependencies */]);
```

### movement 값
```
[-1, 0]: 왼쪽 셀 (Shift+Tab)
[1, 0]: 오른쪽 셀 (Tab)
[0, -1]: 위쪽 셀 (Shift+Enter)
[0, 1]: 아래쪽 셀 (Enter)
[0, 0]: 제자리 (Escape, 클릭)
```

## 복사 (Copy)

> **참고**: 복사/붙여넣기/잘라내기 로직은 `use-clipboard.ts`로 추출되었습니다.

### 복사 흐름
```
1. Ctrl+C 또는 onKeyDown에서 copy 이벤트
        ↓
2. useClipboard 훅의 onCopy 핸들러 실행 (use-clipboard.ts)
        ↓
3. getCellsForSelection으로 범위 데이터 가져오기
        ↓
4. 데이터 포맷팅 (TSV 형식)
        ↓
5. clipboard API로 복사
```

### copyToClipboard
```typescript
// data-editor/data-editor-fns.ts
export async function copyToClipboard(
    cells: readonly (readonly GridCell[])[],
    columnIndexes: number[],
    copyHeaders: boolean,
    columns: readonly GridColumn[]
): Promise<void> {
    // 1. 텍스트 데이터 생성 (TSV)
    let textData = "";
    if (copyHeaders) {
        textData += columnIndexes.map(i => columns[i].title).join("\t") + "\n";
    }
    for (const row of cells) {
        textData += row.map(cell => getCellCopyData(cell)).join("\t") + "\n";
    }

    // 2. HTML 데이터 생성 (테이블)
    let htmlData = "<table>";
    // ...
    htmlData += "</table>";

    // 3. 클립보드에 복사
    await navigator.clipboard.write([
        new ClipboardItem({
            "text/plain": new Blob([textData], { type: "text/plain" }),
            "text/html": new Blob([htmlData], { type: "text/html" }),
        }),
    ]);
}
```

### getCellCopyData
```typescript
// 셀의 복사 데이터 결정
function getCellCopyData(cell: GridCell): string {
    // 1. cell.copyData가 있으면 사용
    if (cell.copyData !== undefined) return cell.copyData;

    // 2. 셀 타입별 기본값
    switch (cell.kind) {
        case GridCellKind.Text:
            return cell.data;
        case GridCellKind.Number:
            return cell.data?.toString() ?? "";
        case GridCellKind.Boolean:
            return cell.data ? "true" : "false";
        // ...
    }
}
```

## 붙여넣기 (Paste)

> **참고**: 붙여넣기 로직은 `use-clipboard.ts`의 `onPasteInternal`에 위치합니다.

### 붙여넣기 흐름
```
1. Ctrl+V 또는 paste 이벤트
        ↓
2. useClipboard 훅의 onPasteInternal 핸들러 실행 (use-clipboard.ts)
        ↓
3. 클립보드 데이터 파싱 (HTML/텍스트)
        ↓
4. onPaste 콜백 확인
        ↓
5. 대상 셀에 데이터 적용 (coercePasteValue 사용)
        ↓
6. onCellEdited / onCellsEdited 호출
```

### 클립보드 데이터 파싱
```typescript
// data-editor/copy-paste.ts
export function decodeHTML(html: string): readonly (readonly string[])[] {
    // HTML 테이블 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const rows = doc.querySelectorAll("tr");

    return Array.from(rows).map(row => {
        const cells = row.querySelectorAll("td, th");
        return Array.from(cells).map(cell => cell.textContent ?? "");
    });
}

export function decodeTSV(text: string): readonly (readonly string[])[] {
    // TSV 파싱
    return text.split("\n").map(line => line.split("\t"));
}
```

### onPaste 처리
```typescript
// data-editor.tsx
const handlePaste = useCallback(async () => {
    // 1. 클립보드 읽기
    const clipboardData = await navigator.clipboard.read();
    const values = parseClipboardData(clipboardData);

    // 2. onPaste 콜백 확인
    if (onPaste === false) return;
    if (typeof onPaste === "function") {
        const handled = onPaste(targetCell, values);
        if (!handled) return;
    }

    // 3. 셀에 적용
    const edits: EditListItem[] = [];
    for (let row = 0; row < values.length; row++) {
        for (let col = 0; col < values[row].length; col++) {
            const targetCol = targetCell[0] + col;
            const targetRow = targetCell[1] + row;

            if (targetCol >= columns.length || targetRow >= rows) continue;

            const cell = getCellContent([targetCol, targetRow]);
            const renderer = getCellRenderer(cell);

            // 렌더러의 onPaste 호출
            const newCell = renderer?.onPaste?.(values[row][col], cell, details);
            if (newCell !== undefined) {
                edits.push({ location: [targetCol, targetRow], value: newCell });
            }
        }
    }

    // 4. 배치 편집 콜백
    if (onCellsEdited !== undefined) {
        onCellsEdited(edits);
    } else {
        for (const edit of edits) {
            onCellEdited?.(edit.location, edit.value);
        }
    }
}, [/* dependencies */]);
```

## 삭제 (Delete)

### 삭제 흐름
```
1. Delete/Backspace 키
        ↓
2. onDelete 콜백 확인
        ↓
3. 선택된 셀들 순회
        ↓
4. 각 셀의 삭제 값 계산
        ↓
5. onCellEdited / onCellsEdited 호출
```

### onDelete 처리
```typescript
// data-editor.tsx
const handleDelete = useCallback(() => {
    // 1. onDelete 콜백으로 삭제 허용 여부 확인
    const result = onDelete?.(gridSelection);
    if (result === false) return;

    // 결과가 GridSelection이면 해당 셀들만 삭제
    const selectionToDelete = typeof result === "object" ? result : gridSelection;

    // 2. 삭제할 셀들 수집
    const edits: EditListItem[] = [];
    for (const cell of getSelectedCells(selectionToDelete)) {
        const content = getCellContent(cell);
        const renderer = getCellRenderer(content);

        // 렌더러의 onDelete 호출
        const deletedValue = renderer?.onDelete?.(content);
        if (deletedValue !== undefined) {
            edits.push({ location: cell, value: deletedValue });
        }
    }

    // 3. 편집 콜백 호출
    if (onCellsEdited !== undefined) {
        onCellsEdited(edits);
    } else {
        for (const edit of edits) {
            onCellEdited?.(edit.location, edit.value);
        }
    }
}, [/* dependencies */]);
```

## Fill 핸들 (채우기)

### Fill 동작
```
1. 셀 선택 후 fill handle 드래그
        ↓
2. 드래그 방향 감지 (orthogonal, horizontal, vertical, any)
        ↓
3. onFillPattern 콜백 호출
        ↓
4. 패턴 소스 → 대상 영역 데이터 복사
```

### onFillPattern
```typescript
// data-editor.tsx:266
interface FillPatternEventArgs {
    patternSource: Rectangle;     // 원본 범위
    fillDestination: Rectangle;   // 대상 범위
    preventDefault: () => void;
}

// 사용 예시
onFillPattern={(event) => {
    // 기본 동작 사용
    // 또는 커스텀 패턴 로직
    // event.preventDefault(); // 기본 동작 취소
}}
```

## validateCell (셀 검증)

```typescript
// data-editor.tsx:291-295
type ValidateCell = (
    cell: Item,
    newValue: EditableGridCell,
    prevValue: GridCell
) => boolean | ValidatedGridCell;

// 반환값:
// - true: 허용
// - false: 거부 (편집 취소)
// - ValidatedGridCell: 수정된 값으로 허용
```

## 주요 편집 관련 Props

| Prop | 타입 | 설명 |
|------|------|------|
| `onCellEdited` | `(cell, newValue) => void` | 단일 셀 편집 완료 |
| `onCellsEdited` | `(edits) => boolean \| void` | 배치 편집 완료 |
| `validateCell` | `(...) => boolean \| GridCell` | 값 검증 |
| `onPaste` | `boolean \| (target, values) => boolean` | 붙여넣기 처리 |
| `onDelete` | `(selection) => boolean \| GridSelection` | 삭제 처리 |
| `onFillPattern` | `(event) => void` | 채우기 패턴 |
| `getCellsForSelection` | `true \| (rect) => cells` | 범위 데이터 제공 |
| `editOnType` | `boolean` | 타이핑시 편집 시작 |
| `cellActivationBehavior` | `string` | 편집 시작 조건 |
| `provideEditor` | `(cell) => Editor` | 커스텀 편집기 |
| `coercePasteValue` | `(val, cell) => GridCell` | 붙여넣기 값 변환 |

## 수정 시 주의사항

1. **검증 순서**: validateCell → onCellEdited 순서 보장
2. **배치 처리**: onCellsEdited가 있으면 개별 onCellEdited 건너뜀
3. **오버레이 위치**: target Rectangle은 화면 좌표
4. **movement 처리**: Tab/Enter 후 다음 셀 자동 이동
5. **클립보드 권한**: HTTPS 환경에서만 작동
6. **리팩토링된 파일 위치**: 복사/붙여넣기 로직은 `use-clipboard.ts`, 키보드 편집 시작은 `use-keyboard-handlers.ts`, IME 입력은 `use-ghost-input.ts`
7. **삭제 핸들링**: `handleFixedKeybindings` (use-keyboard-handlers.ts)에서 Delete/Backspace 처리
8. **Fill 연산**: `fillDown`/`fillRight` 함수는 `use-mouse-handlers.ts`에 위치
