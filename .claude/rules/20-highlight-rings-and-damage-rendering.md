---
paths:
  - "packages/core/src/internal/data-grid/render/data-grid.render.rings.ts"
  - "packages/core/src/internal/data-grid/render/data-grid-render.ts"
---

# 하이라이트 링 & 데미지 렌더링 분석

## 개요
- **하이라이트 링**: 포커스 셀, 선택 범위, 검색 결과 등의 테두리를 캔버스에 그리는 시스템
- **데미지 렌더링**: 변경된 셀만 부분적으로 다시 그리는 최적화 경로
- **핵심 파일**:
  - `render/data-grid.render.rings.ts` — `drawHighlightRings`, `drawFillHandle`
  - `render/data-grid-render.ts` — `drawGrid` (렌더링 파이프라인 오케스트레이터)
  - `render/data-grid-render.cells.ts` — `drawCells`, `drawCell`, `Highlight` 인터페이스
  - `data-editor/data-editor.tsx` — `highlightRegions` 생성 (useMemo)

## Highlight 인터페이스

```typescript
// data-grid-render.cells.ts:57-62
export interface Highlight {
    readonly color: string;
    readonly range: Rectangle;          // 셀 범위 (x, y, width, height)
    readonly style?: "dashed" | "solid" | "no-outline" | "solid-outline";
    readonly clipLeftPx?: number;       // 왼쪽 클리핑 (트리 셀 등에서 사용)
}
```

## highlightRegions 생성 (DataEditor)

`data-editor.tsx:542-609`에서 `useMemo`로 생성. 세 가지 소스를 병합:

| 소스 | style | 용도 |
|------|-------|------|
| `highlightRegionsIn` (사용자 prop) | 사용자 지정 | 외부에서 전달된 하이라이트 |
| `fillHighlightRegion` | `"dashed"` | 필 핸들 드래그 범위 |
| `highlightRange` | `"solid-outline"` | 선택 범위 테두리 |
| `highlightFocusCol/Row` | `"solid-outline"` | **포커스 셀 테두리 (포커스 렉트)** |

### 포커스 셀의 clipLeftPx

```typescript
// data-editor.tsx:530-540
const focusCellClipLeft = React.useMemo(() => {
    if (highlightFocusCol === undefined || highlightFocusRow === undefined) return undefined;
    const cell = getMangledCellContent([highlightFocusCol, highlightFocusRow]);
    if (cell.kind === GridCellKind.Custom) {
        const renderer = getCellRenderer(cell);
        if (renderer !== undefined && "getContentLeftOffset" in renderer) {
            return (renderer as any).getContentLeftOffset(cell, mergedTheme);
        }
    }
    return undefined;
}, [...]);

// data-editor.tsx:584-596
regions.push({
    color: mergedTheme.accentColor,
    range: { x: highlightFocusCol, y: highlightFocusRow, width: 1, height: 1 },
    style: "solid-outline",
    clipLeftPx: focusCellClipLeft,  // 커스텀 셀이 getContentLeftOffset 제공 시 적용
});
```

**중요**: `clipLeftPx`가 설정된 셀(예: tree-cell)은 포커스 링의 왼쪽 시작점이 셀 내부로 이동합니다. 이로 인해 데미지 렌더링 시 특수한 문제가 발생할 수 있습니다 (아래 참조).

## drawHighlightRings 함수

`data-grid.render.rings.ts:11-162`

### 동작 순서
1. `allHighlightRegions`에서 `"no-outline"` 스타일 필터링
2. 각 하이라이트에 대해 `computeBounds`로 픽셀 좌표 계산
3. `clipLeftPx` 적용: `rawRect.x += clipLeftPx`, `rawRect.width -= clipLeftPx`
4. `hugRectToTarget`으로 캔버스 경계에 맞춤
5. `strokeRect(x + 0.5, y + 0.5, w - 1, h - 1)`로 1px 테두리 그리기

### 스타일별 그리기
| style | 선 스타일 | 색상 |
|-------|----------|------|
| `"dashed"` | `setLineDash([5, 3])` | `withAlpha(color, 1)` |
| `"solid"` | 실선 | `withAlpha(color, 1)` |
| `"solid-outline"` | 실선 | `blend(blend(color, borderColor), bgCell)` |

### 반환값
`() => void` 콜백을 반환하여, 나중에 다시 그릴 수 있음 (전체 렌더링에서 사용).

## 두 가지 렌더링 경로

### 1. 전체 렌더링 (Full Render)

`data-grid-render.ts` — damage가 없을 때:

```
[1] overdrawStickyBoundaries
[2] drawHighlightRings → highlightRedraw 콜백 저장
[3] drawFillHandle → focusRedraw 콜백 저장
[4] 배경 채우기 (bgCell)
[5] drawCells ← 셀 내용이 [2]의 하이라이트 링 위에 그려짐
[6] drawBlanks
[7] drawExtraRowThemes
[8] drawGridLines
[9] highlightRedraw() ← 셀 위에 하이라이트 링 다시 그리기
[10] focusRedraw() ← 필 핸들 다시 그리기
```

**핵심**: [2]에서 먼저 그리고, [5]에서 셀이 덮어쓴 후, [9]에서 다시 그림. 이 "샌드위치" 패턴이 하이라이트 링이 항상 셀 위에 보이게 보장합니다.

### 2. 데미지 렌더링 (Damage Render)

`data-grid-render.ts:476-595` — damage가 있을 때 (호버 변경, 셀 업데이트 등):

```
[1] doDamage(targetCtx)
    └── drawCells (damage 셋에 포함된 셀만 재렌더)
    └── drawFillHandle (필요시)
[2] drawHighlightRings(targetCtx) ← 포커스 보더 복원
[3] drawFillHandle(targetCtx) ← 필 핸들 복원
[4] (mainCtx가 있으면 동일 과정 반복)
[5] drawHeaderTexture (헤더 damage가 있으면)
```


## 데미지 렌더링 시 셀 배경 채우기

`data-grid-render.cells.ts:407-418`:

```typescript
if (damage !== undefined) {
    // 데미지 셀 배경 채우기: cellX+1부터 시작하여 셀 왼쪽 경계 1px 보존
    ctx.fillRect(
        cellX + 1,
        cellY + 1,
        cellWidth - (isLastColumn ? 2 : 1),
        cellHeight - (isLastRow ? 2 : 1)
    );
}
```

**일반 셀**: 포커스 링이 `cellX`에서 시작 → `cellX+1` 채우기가 왼쪽 보더(1px)를 보존
**clipLeftPx 셀**: 포커스 링이 `cellX + clipLeftPx`에서 시작 → `cellX+1` 채우기가 포커스 링 왼쪽 보더를 완전히 덮어씀

이것이 데미지 렌더링 후 `drawHighlightRings`를 다시 호출해야 하는 근본 원인입니다.

## 데미지 클리핑

`data-grid-render.cells.ts:373-393`:

```typescript
if (damage !== undefined) {
    const top = drawY + 1;
    const bottom = isSticky ? top + rh - 1 : Math.min(top + rh - 1, height - freezeTrailingRowsHeight);
    const h = bottom - top;

    // 클리핑이 필요한 경우에만 적용 (성능 최적화)
    if (h !== rh - 1 || cellX + 1 <= clipX) {
        didDamageClip = true;
        ctx.save();
        ctx.rect(cellX + 1, top, cellWidth - 1, h);
        ctx.clip();
    }
}
```

**주의**: 대부분의 셀에서 `didDamageClip`은 `false`이므로, 셀의 `draw` 함수가 셀 경계 바깥에도 그릴 수 있습니다.

## 수정 시 주의사항

### 새로운 커스텀 셀에 getContentLeftOffset 추가 시
1. `getContentLeftOffset`이 반환하는 값이 `clipLeftPx`로 사용됨
2. 포커스 링의 왼쪽이 해당 값만큼 오른쪽으로 이동
3. 데미지 렌더링에서 `drawHighlightRings` 호출이 있으므로 보더가 정상 복원됨

### drawHighlightRings 수정 시
1. **전체 렌더링**: 두 번 호출됨 ([2]에서 계산+그리기, [9]에서 콜백으로 다시 그리기)
2. **데미지 렌더링**: `doDamage` 후 직접 호출 (targetCtx + mainCtx 각각)
3. 두 경로 모두에서 동작이 일관되어야 함

### 새로운 하이라이트 스타일 추가 시
1. `Highlight.style` 유니온에 새 값 추가
2. `drawHighlightRings`의 `drawCb` 함수에서 새 스타일 처리
3. 필터링 조건 확인: `"no-outline"`은 항상 필터링됨 (라인 31)

### 성능 고려사항
- `drawHighlightRings`는 `strokeRect` 몇 번으로 가벼움
- 데미지 렌더링 시 추가 호출의 성능 영향 미미
- `computeBounds`가 내부에서 호출되므로 하이라이트 수가 많으면 주의

## 관련 파일

| 파일 | 역할 |
|------|------|
| `render/data-grid.render.rings.ts` | `drawHighlightRings`, `drawFillHandle`, `drawColumnResizeOutline` |
| `render/data-grid-render.ts:476-595` | 데미지 렌더링 경로 (하이라이트 링 복원 포함) |
| `render/data-grid-render.ts:663-819` | 전체 렌더링 경로 (하이라이트 링 샌드위치 패턴) |
| `render/data-grid-render.cells.ts:57-62` | `Highlight` 인터페이스 정의 |
| `render/data-grid-render.cells.ts:373-418` | 데미지 클리핑 및 배경 채우기 |
| `render/data-grid-lib.ts` | `computeBounds` (셀 좌표 → 픽셀 좌표) |
| `data-editor/data-editor.tsx:530-609` | `highlightRegions`, `focusCellClipLeft` 생성 |
| `cells/tree-cell.tsx` | `getContentLeftOffset` 구현 예시 |
| `common/math.ts` | `hugRectToTarget`, `splitRectIntoRegions`, `intersectRect` |
