---
paths:
  - "packages/core/src/internal/data-grid/render/**"
---

# 캔버스 렌더링 파이프라인 분석

## 개요
- **역할**: HTML Canvas를 사용한 고성능 그리드 렌더링
- **위치**: `packages/core/src/internal/data-grid/render/`

## 파일 구조

| 파일 | 역할 | LOC |
|------|------|-----|
| `data-grid-render.ts` | 메인 렌더링 진입점 | ~500 |
| `data-grid-render.cells.ts` | 셀 렌더링 | ~600 |
| `data-grid-render.header.ts` | 헤더 렌더링 | ~500 |
| `data-grid-render.lines.ts` | 그리드 라인 | ~300 |
| `data-grid-render.blit.ts` | 블릿 최적화 | ~200 |
| `data-grid-render.walk.ts` | 셀 순회 유틸 | ~300 |
| `data-grid.render.rings.ts` | 선택 영역 표시 | ~200 |
| `data-grid-lib.ts` | 렌더링 유틸리티 | ~800 |

## 렌더링 파이프라인

```
drawGrid() [data-grid-render.ts:115]
    │
    ├─── [1] 캔버스 크기 설정
    │    canvas.width = width * dpr
    │    canvas.height = height * dpr
    │
    ├─── [2] 블릿 가능 여부 확인
    │    computeCanBlit(arg, lastArg)
    │
    ├─── [Blit 가능시]
    │    └── blitLastFrame()
    │        - 이전 프레임 영역 복사
    │        - 변경된 부분만 다시 그리기
    │
    ├─── [전체 렌더링]
    │    │
    │    ├── drawGridHeaders()
    │    │   ├── 그룹 헤더 영역
    │    │   └── 컬럼 헤더 영역
    │    │
    │    ├── drawCells()
    │    │   ├── walkColumns() 컬럼 순회
    │    │   ├── walkRowsInCol() 행 순회
    │    │   └── drawCell() 개별 셀
    │    │
    │    ├── drawGridLines()
    │    │   ├── 수직선
    │    │   └── 수평선
    │    │
    │    └── drawHighlightRings()
    │        ├── 선택 영역 테두리
    │        └── 포커스 링
    │
    └─── [3] drawFillHandle()
         - 채우기 핸들 (선택 영역 모서리)
```

## 핵심 함수

### 1. drawGrid (메인 진입점)
```typescript
// data-grid-render.ts:115
export function drawGrid(arg: DrawGridArg, lastArg: DrawGridArg | undefined) {
    const {
        canvasCtx, headerCanvasCtx,
        width, height,
        cellXOffset, cellYOffset,
        translateX, translateY,
        mappedColumns,
        theme,
        selection,
        rows,
        getCellContent,
        // ... 기타
    } = arg;

    // DPR 설정
    const dpr = Math.min(maxScaleFactor, Math.ceil(window.devicePixelRatio ?? 1));

    // 블릿 가능 여부
    const canBlit = computeCanBlit(arg, lastArg);

    // 캔버스 크기 조정
    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    }

    // 렌더링 실행
    // ...
}
```

### 2. drawCells (셀 렌더링)
```typescript
// data-grid-render.cells.ts:75-111
export function drawCells(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    allColumns: readonly MappedGridColumn[],
    height: number,
    totalHeaderHeight: number,
    translateX: number,
    translateY: number,
    cellYOffset: number,
    rows: number,
    getRowHeight: (row: number) => number,
    getCellContent: (cell: Item) => InnerGridCell,
    // ... 기타 매개변수
): Rectangle[] | undefined {
    // 데미지 영역 체크
    let toDraw = damage?.size ?? Number.MAX_SAFE_INTEGER;

    // 컬럼 순회
    walkColumns(effectiveColumns, cellYOffset, translateX, translateY, totalHeaderHeight,
        (c, drawX, colDrawY, clipX, startRow) => {
            // 클리핑 영역 설정
            ctx.save();
            ctx.beginPath();
            ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
            ctx.clip();

            // 행 순회
            walkRowsInCol(startRow, colDrawY, height, rows, getRowHeight, ...,
                (drawY, row, rh, isSticky, isTrailingRow) => {
                    // 셀 렌더링
                    const cell = getCellContent([c.sourceIndex, row]);
                    drawCell(ctx, cell, ...);
                }
            );

            ctx.restore();
        }
    );
}
```

### 3. drawCell (개별 셀 렌더링)
```typescript
// data-grid-render.cells.ts (내부)
export function drawCell(
    ctx: CanvasRenderingContext2D,
    cell: InnerGridCell,
    col: number,
    row: number,
    // ...
) {
    // 1. 배경색 결정
    const bgColor = getCellBackgroundColor(cell, theme, selection, ...);

    // 2. 배경 그리기
    ctx.fillStyle = bgColor;
    ctx.fillRect(x, y, width, height);

    // 3. 셀 렌더러 가져오기
    const renderer = getCellRenderer(cell);

    // 4. 준비 단계 (prep)
    if (renderer.drawPrep !== undefined) {
        prepResult = renderer.drawPrep(args, lastPrep);
    }

    // 5. 셀 내용 그리기
    renderer.draw(args, cell);

    // 6. 정리 단계 (deprep)
    if (prepResult?.deprep !== undefined) {
        prepResult.deprep({ ctx });
    }
}
```

### 4. walkColumns / walkRowsInCol (셀 순회)
```typescript
// data-grid-render.walk.ts
export function walkColumns(
    effectiveColumns: readonly MappedGridColumn[],
    cellYOffset: number,
    translateX: number,
    translateY: number,
    totalHeaderHeight: number,
    callback: (
        c: MappedGridColumn,
        drawX: number,
        colDrawY: number,
        clipX: number,
        startRow: number
    ) => boolean | void
) {
    let x = 0;
    for (const c of effectiveColumns) {
        const drawX = c.sticky ? x : x + translateX;
        // ...
        const result = callback(c, drawX, colDrawY, clipX, startRow);
        if (result === true) return; // early exit
        x += c.width;
    }
}

export function walkRowsInCol(
    startRow: number,
    colDrawStartY: number,
    height: number,
    rows: number,
    getRowHeight: (row: number) => number,
    freezeTrailingRows: number,
    hasAppendRow: boolean,
    skipPoint: number | undefined,
    callback: (
        drawY: number,
        row: number,
        rh: number,
        isSticky: boolean,
        isTrailingRow: boolean
    ) => boolean | void
) {
    let y = colDrawStartY;
    for (let row = startRow; row < rows; row++) {
        const rh = getRowHeight(row);
        callback(y, row, rh, isSticky, isTrailingRow);
        y += rh;
        if (y > height) break;
    }
}
```

## 블릿 최적화

### computeCanBlit (블릿 가능 여부)
```typescript
// data-grid-render.blit.ts
export function computeCanBlit(arg: DrawGridArg, lastArg: DrawGridArg | undefined): boolean {
    // 조건 확인:
    // 1. 이전 렌더링 인자 존재
    // 2. 동일한 캔버스 크기
    // 3. 테마 변경 없음
    // 4. 선택 변경 없음 (또는 최소 변경)
    // 5. 데미지 리전이 있는 경우

    if (lastArg === undefined) return false;
    if (damage === undefined) return false;
    // ...
    return true;
}
```

### blitLastFrame (프레임 복사)
```typescript
// data-grid-render.blit.ts
export function blitLastFrame(
    ctx: CanvasRenderingContext2D,
    lastBlitData: BlitData,
    cellXOffset: number,
    cellYOffset: number,
    translateX: number,
    translateY: number,
    // ...
) {
    // 1. 이전 프레임의 유효 영역 계산
    // 2. 현재 프레임에 복사
    // 3. 새로 그려야 할 영역 반환

    ctx.drawImage(
        lastBlitData.canvas,
        srcX, srcY, srcWidth, srcHeight,
        destX, destY, destWidth, destHeight
    );

    return damageRegions; // 다시 그려야 할 영역
}
```

## 헤더 렌더링

### drawGridHeaders
```typescript
// data-grid-render.header.ts
export function drawGridHeaders(
    ctx: CanvasRenderingContext2D,
    effectiveColumns: readonly MappedGridColumn[],
    // ...
) {
    // 그룹 헤더 그리기
    if (enableGroups) {
        walkGroups(effectiveColumns, width, translateX, groupHeaderHeight,
            (span, group, x, y, w, h) => {
                drawGroupHeader(ctx, group, x, y, w, h, theme);
            }
        );
    }

    // 컬럼 헤더 그리기
    walkColumns(effectiveColumns, ...
        (c, drawX, drawY, clipX) => {
            drawHeader(ctx, drawX, drawY, c.width, headerHeight, c, theme);
        }
    );
}
```

### drawHeader (개별 헤더)
```typescript
// data-grid-render.header.ts
export function drawHeader(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    column: MappedGridColumn,
    // ...
) {
    // 1. 배경
    ctx.fillStyle = isSelected ? theme.bgHeaderHasFocus : theme.bgHeader;
    ctx.fillRect(x, y, width, height);

    // 2. 아이콘
    if (column.icon !== undefined) {
        spriteManager.drawSprite(column.icon, "normal", ctx, iconX, iconY, iconSize);
    }

    // 3. 텍스트
    ctx.fillStyle = theme.textHeader;
    ctx.fillText(column.title, textX, textY);

    // 4. 메뉴 아이콘
    if (column.hasMenu) {
        drawMenuIcon(ctx, menuX, menuY);
    }
}
```

## 선택 영역 렌더링

### drawHighlightRings
```typescript
// data-grid.render.rings.ts
export function drawHighlightRings(
    ctx: CanvasRenderingContext2D,
    selection: GridSelection,
    // ...
) {
    // 선택 범위 테두리
    if (selection.current !== undefined) {
        const { range, rangeStack } = selection.current;

        // 현재 선택 범위
        drawSelectionRing(ctx, range, theme.accentColor);

        // 다중 선택 범위
        for (const r of rangeStack) {
            drawSelectionRing(ctx, r, theme.accentLight);
        }
    }

    // 하이라이트 영역
    for (const highlight of highlightRegions) {
        drawHighlightRing(ctx, highlight.range, highlight.color, highlight.style);
    }
}
```

### drawFillHandle (채우기 핸들)
```typescript
// data-grid.render.rings.ts
export function drawFillHandle(
    ctx: CanvasRenderingContext2D,
    selection: GridSelection,
    fillHandle: FillHandleConfig,
    // ...
) {
    if (selection.current === undefined) return;

    const { range } = selection.current;
    const [bottomRightCol, bottomRightRow] = rectBottomRight(range);
    const bounds = getBoundsForItem(bottomRightCol, bottomRightRow);

    // 핸들 위치 계산
    const handleX = bounds.x + bounds.width + fillHandle.offsetX;
    const handleY = bounds.y + bounds.height + fillHandle.offsetY;

    // 핸들 그리기
    ctx.fillStyle = theme.accentColor;
    if (fillHandle.shape === "circle") {
        ctx.beginPath();
        ctx.arc(handleX, handleY, fillHandle.size / 2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(handleX, handleY, fillHandle.size, fillHandle.size);
    }
}
```

## 최적화 기법

### 1. 데미지 리전 (Damage Region)
```typescript
// 변경된 셀만 다시 그리기
if (damage !== undefined && !damage.has(cellIndex)) {
    return; // 스킵
}
```

### 2. 클리핑 (Clipping)
```typescript
// 컬럼별 클리핑 영역 설정
ctx.save();
ctx.beginPath();
ctx.rect(colDrawX, colDrawY, colWidth, colHeight);
ctx.clip();
// 셀 그리기...
ctx.restore();
```

### 3. 준비/정리 단계 (Prep/Deprep)
```typescript
// 동일 타입 셀들의 공통 설정 재사용
if (renderer.drawPrep !== undefined) {
    prepResult = renderer.drawPrep(args, lastPrep);
    // font, fillStyle 등 설정
}
// 여러 셀 그리기...
if (prepResult?.deprep !== undefined) {
    prepResult.deprep({ ctx });
}
```

### 4. 스킵 포인트 (Skip Point)
```typescript
// 보이지 않는 영역 건너뛰기
const skipPoint = getSkipPoint(drawRegions);
if (y < skipPoint) continue;
```

## DrawGridArg 인터페이스

```typescript
// draw-grid-arg.ts
interface DrawGridArg {
    canvasCtx: CanvasRenderingContext2D;
    headerCanvasCtx: CanvasRenderingContext2D;
    bufferACtx: CanvasRenderingContext2D;
    bufferBCtx: CanvasRenderingContext2D;
    width: number;
    height: number;
    cellXOffset: number;
    cellYOffset: number;
    translateX: number;
    translateY: number;
    mappedColumns: readonly MappedGridColumn[];
    enableGroups: boolean;
    freezeColumns: number;
    theme: FullTheme;
    selection: GridSelection;
    rows: number;
    getCellContent: (cell: Item) => InnerGridCell;
    getCellRenderer: GetCellRendererCallback;
    damage: CellSet | undefined;
    // ... 기타
}
```

## 수정 시 주의사항

1. **DPR 처리**: 모든 좌표에 devicePixelRatio 적용
2. **클리핑**: ctx.save()/restore() 쌍으로 사용
3. **블릿 무효화**: 대규모 변경시 canBlit = false
4. **성능**: 불필요한 fillRect 호출 최소화
5. **스팬 처리**: 셀 병합시 중복 렌더링 방지

---

## rowSpan 렌더링 상세

### rowSpan + span 통합 로직 (drawCells)

rowspan과 span(열 병합)이 동시 적용될 때의 처리:

1. **통합 지오메트리 계산**: rowspan/span 감지 시 최종 위치와 크기(`cellX`, `cellY`, `cellWidth`, `cellHeight`)를 먼저 계산
2. **단일 클리핑**: `drawingSpan` 통합 플래그로 rowspan+span을 한 번에 `clip()` 처리
3. **스크롤 대응**: rowspan 영역 시작점이 화면 밖으로 스크롤되어도 정확한 y좌표/height 계산

### rowSpanPosition (수직 정렬)

셀 렌더러는 기본적으로 주어진 rect의 수직 중앙에 내용 정렬. rowspan으로 높이가 커지면 Canvas `translate`로 보정:

- **`"top"`** (기본값): `vtrans = rh/2 - cellHeight/2` → 첫 번째 행 중앙에 위치
- **`"middle"`**: `vtrans = 0` → 병합 영역 정중앙
- **`"bottom"`**: `vtrans = cellHeight/2 - lastRowHeight/2` → 마지막 행 중앙에 위치

`drawCell` 내부에서 `ctx.save() → ctx.translate(0, vtrans) → 내용 그리기 → ctx.restore()` 순서로 적용.
