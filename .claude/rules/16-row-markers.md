---
paths:
  - "packages/core/src/cells/marker-cell.tsx"
  - "packages/core/src/cells/row-status-cell.tsx"
  - "packages/core/src/cells/row-id-cell.tsx"
  - "packages/core/src/cells/row-id-marker-cell.tsx"
---

# Row Markers 시스템 분석

## 개요
- **역할**: 행 번호, 체크박스, 행 상태(A/U/D), 행 ID 등 행 관련 마커 컬럼 제공
- **핵심 파일**:
  - `data-editor/data-editor.tsx:92-115` (RowMarkerOptions 인터페이스)
  - `data-editor/data-editor.tsx:340-358` (Props 정의)
  - `data-editor/data-editor.tsx:952-1030` (옵션 정규화 및 오프셋 계산)
  - `data-editor/data-editor.tsx:1233-1318` (mangledCols 생성)
  - `data-editor/data-editor.tsx:1461-1578` (getMangledCellContent 매핑)
  - `cells/marker-cell.tsx` (MarkerCell 렌더러)
  - `cells/row-status-cell.tsx` (RowStatusCell 렌더러)
  - `cells/row-id-marker-cell.tsx` (RowIdCell 렌더러)
  - `internal/data-grid/data-grid-types.ts:526-567` (내부 셀 타입)

---

## 1. RowMarkerOptions 인터페이스

```typescript
// data-editor.tsx:92-115
export interface RowMarkerOptions {
    kind: "checkbox" | "number" | "clickable-number" | "checkbox-visible"
        | "both" | "checkbox-and-number" | "none";
    checkboxStyle?: "circle" | "square";       // 체크박스 모양 (기본: "square")
    rowNumber?: boolean;                        // 행 번호 별도 컬럼 표시
    rowStatus?: boolean;                        // 행 상태(A/U/D) 컬럼 표시
    rowStatusWidth?: number;                    // 상태 컬럼 너비 (기본: 40px)
    rowStatusTheme?: Partial<Theme>;            // 상태 컬럼 테마
    rowId?: boolean;                            // 행 ID 컬럼 표시
    rowIdWidth?: number;                        // ID 컬럼 너비 (기본: 80px)
    rowIdTheme?: Partial<Theme>;                // ID 컬럼 테마
    startIndex?: number;                        // 행 번호 시작 값 (기본: 1)
    width?: number;                             // 마커 컬럼 너비 (자동 계산)
    theme?: Partial<Theme>;                     // 마커 컬럼 테마
    headerTheme?: Partial<Theme>;               // 헤더 마커 테마
    headerAlwaysVisible?: boolean;              // 헤더 마커 항상 표시
    headerDisabled?: boolean;                   // 헤더 마커 비활성화
}
```

### Props 정의

```typescript
// data-editor.tsx:340
readonly rowMarkers?: RowMarkerOptions["kind"] | RowMarkerOptions;

// 관련 콜백 (data-editor.tsx:709-725)
readonly disabledRows?: (row: number) => boolean;
readonly onRowStatus?: (rowIndex: number) => "A" | "U" | "D" | undefined;
readonly onRowId?: (rowIndex: number) => string | undefined;
```

### Deprecated Props (하위 호환)
```typescript
// data-editor.tsx:342-358
readonly rowMarkerWidth?: number;          // → rowMarkers.width
readonly rowMarkerStartIndex?: number;     // → rowMarkers.startIndex
readonly rowMarkerTheme?: Partial<Theme>;  // → rowMarkers.theme
```

---

## 2. kind 옵션 상세

| kind | 설명 | 호버 동작 |
|------|------|----------|
| `"none"` | 마커 없음 | - |
| `"checkbox"` | 체크박스 (호버 시 표시) | 호버 시 체크박스 나타남 |
| `"checkbox-visible"` | 체크박스 항상 표시 (투명도 0.6) | 호버 시 투명도 1.0 |
| `"number"` | 행 번호만 표시 | - |
| `"clickable-number"` | 클릭 가능한 행 번호 (pointer 커서) | - |
| `"both"` | 체크박스 + 행 번호 (deprecated) | 호버 시 번호→체크박스 전환 |
| `"checkbox-and-number"` | "both"의 별칭 (deprecated) | 동일 |

### 하위 호환 정규화
```typescript
// data-editor.tsx:959-963
// "both"와 "checkbox-and-number"는 "checkbox" + rowNumber: true로 변환
if (normalizedKind === "both" || normalizedKind === "checkbox-and-number") {
    normalizedKind = "checkbox";
    showRowNumber = true;
}
```

---

## 3. 컬럼 순서 및 오프셋

### mangledCols 컬럼 순서
```
[rowNumber] → [checkbox] → [rowStatus] → [rowId] → [사용자 컬럼...]
```

모든 마커 기능이 활성화된 경우:

| 인덱스 | 컬럼 타입 | 활성 조건 | 기본 너비 |
|--------|----------|----------|----------|
| 0 | Row Number | `hasRowMarkers && showRowNumber` | 자동 (32-48px) |
| 1 | Checkbox | `hasRowMarkers` | 자동 (32-48px) |
| 2 | Row Status | `rowMarkers.rowStatus === true` | 40px |
| 3 | Row ID | `rowMarkers.rowId === true` | 80px |
| 4+ | 사용자 컬럼 | 항상 | 사용자 정의 |

### rowMarkerOffset (컬럼 수 오프셋)
```typescript
// data-editor.tsx:1020-1023
const rowMarkerOffset =
    (hasRowMarkers ? (showRowNumber ? 2 : 1) : 0) +
    (hasRowStatus ? 1 : 0) +
    (hasRowId ? 1 : 0);
```

**용도**: 외부(사용자) 컬럼 인덱스 ↔ 내부(마커 포함) 컬럼 인덱스 변환
- 외부 → 내부: `col + rowMarkerOffset`
- 내부 → 외부: `col - rowMarkerOffset`

### totalMarkerWidth (픽셀 너비 합계)
```typescript
// data-editor.tsx:1027-1030
const totalMarkerWidth =
    (hasRowMarkers ? (showRowNumber ? 2 : 1) * rowMarkerWidth : 0) +
    (hasRowStatus ? rowStatusWidth : 0) +
    (hasRowId ? rowIdWidth : 0);
```

**용도**: 모든 마커 컬럼의 실제 픽셀 너비 합계. 레이아웃 계산에 사용.
`rowMarkerOffset`(컬럼 수)과 구분됨 - 각 컬럼 너비가 다를 수 있기 때문.

### 마커 컬럼 너비 자동 계산
```typescript
// data-editor.tsx:1014
const rowMarkerWidth = rowMarkerWidthRaw ?? (
    rowsIn > 10_000 ? 48 :
    rowsIn > 1_000  ? 44 :
    rowsIn > 100    ? 36 : 32
);
```

---

## 4. 내부 셀 타입

### InnerGridCellKind (data-grid-types.ts:526-531)
```typescript
export enum InnerGridCellKind {
    NewRow = "new-row",
    Marker = "marker",
    RowStatus = "row-status",
    RowId = "row-id",
}
```

### MarkerCell (data-grid-types.ts:544-553)
```typescript
export interface MarkerCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.Marker;
    readonly allowOverlay: false;
    readonly row: number;              // 표시할 행 번호 (startIndex + mappedRow)
    readonly drawHandle: boolean;      // 드래그 핸들 표시 (onRowMoved가 설정된 경우)
    readonly checked: boolean;         // 체크 상태 (gridSelection.rows)
    readonly checkboxStyle: "square" | "circle";
    readonly markerKind: "checkbox" | "number" | "both" | "checkbox-visible";
    readonly disabled?: boolean;       // disabledRows 콜백 결과
}
```

### RowStatusCell (data-grid-types.ts:556-560)
```typescript
export interface RowStatusCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.RowStatus;
    readonly allowOverlay: false;
    readonly status?: "A" | "U" | "D";  // onRowStatus 콜백 결과
}
```

### RowIdCell (data-grid-types.ts:563-567)
```typescript
export interface RowIdCell extends BaseGridCell {
    readonly kind: InnerGridCellKind.RowId;
    readonly allowOverlay: false;
    readonly rowId?: string;            // onRowId 콜백 결과
}
```

---

## 5. 셀 렌더러

### MarkerCell 렌더러 (cells/marker-cell.tsx)

```typescript
export const markerCellRenderer: InternalCellRenderer<MarkerCell> = {
    kind: InnerGridCellKind.Marker,
    needsHover: true,          // 호버 애니메이션 필요
    needsHoverPosition: false,
    measure: () => 44,         // 기본 측정 너비
    // ...
};
```

**렌더링 동작**:
- `"checkbox"`: 호버 시 `hoverAmount` 알파로 체크박스 표시
- `"checkbox-visible"`: 항상 표시 (기본 알파 0.6, 호버 시 1.0)
- `"number"`: 행 번호 텍스트 (theme.textLight 색상)
- `"both"`: 체크 안됨 → 번호 표시, 호버 시 체크박스로 전환 (fade)
- `drawHandle`: 왼쪽에 드래그 점 패턴 (6개 점, 2x3 그리드)
- `disabled`: 투명도 0.4, 클릭 비활성화

**클릭 처리**: 체크박스 중심에서 반경 10px 이내 클릭 시 `checked` 토글

### RowStatusCell 렌더러 (cells/row-status-cell.tsx)

```typescript
export const rowStatusCellRenderer: InternalCellRenderer<RowStatusCell> = {
    kind: InnerGridCellKind.RowStatus,
    needsHover: false,
    measure: () => 40,
    // ...
};
```

**상태별 색상**:
| 상태 | 의미 | 색상 |
|------|------|------|
| `"A"` | Added (추가됨) | `#2e7d32` (녹색) |
| `"U"` | Updated (수정됨) | `#f9a825` (노란색) |
| `"D"` | Deleted (삭제됨) | `#c62828` (빨간색) |

**렌더링**: bold 14px sans-serif, 중앙 정렬, status가 undefined이면 미표시

### RowIdCell 렌더러 (cells/row-id-marker-cell.tsx)

```typescript
export const rowIdMarkerCellRenderer: InternalCellRenderer<RowIdCell> = {
    kind: InnerGridCellKind.RowId,
    needsHover: false,
    measure: () => 80,
    // ...
};
```

**렌더링**: 12px sans-serif, 좌측 정렬 (padding 8px), theme.textDark 색상

---

## 6. getMangledCellContent 매핑

```typescript
// data-editor.tsx:1461-1578
// 동적 인덱스 계산으로 활성화된 컬럼만 순서대로 매핑
let currentColIndex = 0;

// 1. rowNumber (선택적)
if (hasRowMarkers && showRowNumber)  rowNumberColIndex = currentColIndex++;
// 2. checkbox (선택적)
if (hasRowMarkers)                   checkboxColIndex = currentColIndex++;
// 3. rowStatus (선택적)
if (hasRowStatus)                    rowStatusColIndex = currentColIndex++;
// 4. rowId (선택적)
if (hasRowId)                        rowIdColIndex = currentColIndex++;
```

### Row Number 컬럼 반환 (col === rowNumberColIndex)
```typescript
{
    kind: InnerGridCellKind.Marker,
    markerKind: "number",
    row: rowMarkerStartIndex + mappedRow,
    checked: false,
    drawHandle: false,
    disabled: disabledRows?.(row),
}
```

### Checkbox 컬럼 반환 (col === checkboxColIndex)
```typescript
{
    kind: InnerGridCellKind.Marker,
    markerKind: /* showRowNumber 여부에 따라 결정 */,
    row: rowMarkerStartIndex + mappedRow,
    checked: gridSelection?.rows.hasIndex(row),
    drawHandle: onRowMoved !== undefined,
    disabled: disabledRows?.(row),
}
```

### Row Status 컬럼 반환 (col === rowStatusColIndex)
```typescript
{
    kind: InnerGridCellKind.RowStatus,
    status: onRowStatus?.(row),
    themeOverride: rowStatusTheme,
}
```

### Row ID 컬럼 반환 (col === rowIdColIndex)
```typescript
{
    kind: InnerGridCellKind.RowId,
    rowId: onRowId?.(row),
    themeOverride: rowIdTheme,
}
```

---

## 7. 헤더 선택 상태

```typescript
// data-editor.tsx:1230-1231
const numSelectedRows = gridSelection.rows.length;
const rowMarkerChecked =
    rowMarkers === "none" ? undefined :
    numSelectedRows === 0 ? false :
    numSelectedRows === rows ? true :
    undefined;  // 부분 선택 (indeterminate)
```

- `false`: 아무 행도 선택 안됨
- `true`: 모든 행 선택됨
- `undefined`: 일부 행만 선택 (indeterminate 체크박스 표시)

---

## 8. DataGrid 연동

```typescript
// data-editor.tsx:3699-3700
<DataGridSearch
    lockColumns={rowMarkerOffset}        // 마커 컬럼 고정 (수평 스크롤 시)
    firstColAccessible={rowMarkerOffset === 0}  // 마커가 없으면 첫 컬럼 접근 가능
    // ...
/>
```

---

## 9. 사용 예시

### 기본 체크박스
```typescript
<DataEditor
    rowMarkers="checkbox"
    // ...
/>
```

### 전체 옵션
```typescript
<DataEditor
    rowMarkers={{
        kind: "checkbox",
        rowNumber: true,
        checkboxStyle: "square",
        rowStatus: true,
        rowStatusWidth: 40,
        rowId: true,
        rowIdWidth: 80,
        startIndex: 1,
        headerAlwaysVisible: true,
        headerDisabled: false,
        headerTheme: { textMedium: "rgba(51, 51, 51, 0.50)" },
    }}
    onRowStatus={rowIndex => {
        // "A" | "U" | "D" | undefined
        return rowData[rowIndex]?.status;
    }}
    onRowId={rowIndex => {
        return rowData[rowIndex]?.id;
    }}
    disabledRows={row => row === 0}  // 첫 행 체크박스 비활성화
    // ...
/>
```

### 하위 호환 (deprecated)
```typescript
// 이전 방식 (deprecated)
<DataEditor
    rowMarkers="both"
    rowMarkerWidth={44}
    rowMarkerStartIndex={0}
    rowMarkerTheme={{ textLight: "#999" }}
/>

// 현재 권장 방식
<DataEditor
    rowMarkers={{
        kind: "checkbox",
        rowNumber: true,
        width: 44,
        startIndex: 0,
        theme: { textLight: "#999" },
    }}
/>
```

---

## 10. 수정 시 주의사항

1. **rowMarkerOffset 좌표 변환**: 외부 콜백(onCellEdited 등)에는 마커 컬럼이 제외된 인덱스가 전달됨. 내부적으로는 `col + rowMarkerOffset`으로 변환.

2. **mangledCols 순서**: 새 마커 컬럼 추가시 `mangledCols` memo, `getMangledCellContent`, `rowMarkerOffset` 계산 모두 수정 필요.

3. **totalMarkerWidth**: `rowMarkerOffset`(컬럼 수)과 `totalMarkerWidth`(픽셀)을 혼동하지 말것. 각 마커 컬럼의 너비가 다를 수 있음.

4. **lockColumns**: 마커 컬럼은 `lockColumns={rowMarkerOffset}`으로 수평 스크롤 시 고정됨.

5. **하위 호환**: `"both"`, `"checkbox-and-number"`는 정규화 단계에서 `"checkbox" + rowNumber: true`로 변환됨. deprecated props(`rowMarkerWidth`, `rowMarkerStartIndex`, `rowMarkerTheme`)도 정규화 시 RowMarkerOptions로 병합됨.

6. **셀 렌더러 등록**: `cells/index.ts`의 `AllCellRenderers` 배열에 `markerCellRenderer`, `rowStatusCellRenderer`, `rowIdMarkerCellRenderer`가 모두 등록되어야 함.

7. **선택과의 연동**: 체크박스 checked 상태는 `gridSelection.rows.hasIndex(row)`로 결정됨. 헤더 체크박스는 전체/부분/없음 3가지 상태.
