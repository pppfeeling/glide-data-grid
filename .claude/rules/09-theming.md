---
paths:
  - "packages/core/src/common/styles.ts"
---

# 테마 시스템 분석

## 개요
- **역할**: 그리드의 색상, 폰트, 크기 등 스타일링
- **위치**: `packages/core/src/common/styles.ts`

## Theme 인터페이스

```typescript
// styles.ts:57-101
interface Theme {
    // 강조색
    accentColor: string;         // 선택 영역, 포커스 링
    accentFg: string;            // 강조 배경 위 텍스트
    accentLight: string;         // 연한 강조 (호버, 하이라이트)

    // 텍스트 색상
    textDark: string;            // 기본 텍스트
    textMedium: string;          // 보조 텍스트
    textLight: string;           // 약한 텍스트
    textBubble: string;          // 버블 셀 텍스트

    // 아이콘
    bgIconHeader: string;        // 아이콘 배경
    fgIconHeader: string;        // 아이콘 전경

    // 헤더
    textHeader: string;          // 헤더 텍스트
    textGroupHeader?: string;    // 그룹 헤더 텍스트
    textHeaderSelected: string;  // 선택된 헤더 텍스트

    // 셀 배경
    bgCell: string;              // 기본 셀 배경
    bgCellMedium: string;        // 대체 셀 배경 (줄무늬)

    // 헤더 배경
    bgHeader: string;            // 기본 헤더 배경
    bgHeaderHasFocus: string;    // 포커스 헤더 배경
    bgHeaderHovered: string;     // 호버 헤더 배경
    bgGroupHeader?: string;      // 그룹 헤더 배경
    bgGroupHeaderHovered?: string; // 호버 그룹 헤더

    // 버블 셀
    bgBubble: string;            // 버블 배경
    bgBubbleSelected: string;    // 선택된 버블 배경
    bubbleHeight: number;        // 버블 높이 (px)
    bubblePadding: number;       // 버블 패딩 (px)
    bubbleMargin: number;        // 버블 간격 (px)

    // 검색
    bgSearchResult: string;      // 검색 결과 하이라이트

    // 경계선
    borderColor: string;         // 기본 경계선
    horizontalBorderColor?: string; // 수평 경계선 (별도 지정시)
    headerBottomBorderColor?: string; // 헤더 하단 경계선

    // 기타
    drilldownBorder: string;     // Drilldown 셀 경계
    linkColor: string;           // 링크 색상

    // 간격
    cellHorizontalPadding: number;  // 셀 수평 패딩 (px)
    cellVerticalPadding: number;    // 셀 수직 패딩 (px)

    // 폰트
    headerFontStyle: string;     // 헤더 폰트 (예: "600 13px")
    baseFontStyle: string;       // 기본 폰트 (예: "13px")
    markerFontStyle: string;     // 마커 폰트 (예: "9px")
    fontFamily: string;          // 폰트 패밀리
    editorFontSize: string;      // 편집기 폰트 크기
    lineHeight: number;          // 줄 높이 (배율)

    // 아이콘/체크박스
    headerIconSize: number;      // 헤더 아이콘 크기 (px)
    checkboxMaxSize: number;     // 체크박스 최대 크기 (px)

    // 선택적 속성
    resizeIndicatorColor?: string;  // 리사이즈 인디케이터
    roundingRadius?: number;        // 둥근 모서리 반경
}
```

## 기본 테마 값

```typescript
// styles.ts:103-151
const dataEditorBaseTheme: Theme = {
    accentColor: "#4F5DFF",
    accentFg: "#FFFFFF",
    accentLight: "rgba(62, 116, 253, 0.1)",

    textDark: "#313139",
    textMedium: "#737383",
    textLight: "#B2B2C0",
    textBubble: "#313139",

    bgIconHeader: "#737383",
    fgIconHeader: "#FFFFFF",
    textHeader: "#313139",
    textGroupHeader: "#313139BB",
    textHeaderSelected: "#FFFFFF",

    bgCell: "#FFFFFF",
    bgCellMedium: "#FAFAFB",
    bgHeader: "#F7F7F8",
    bgHeaderHasFocus: "#E9E9EB",
    bgHeaderHovered: "#EFEFF1",

    bgBubble: "#EDEDF3",
    bgBubbleSelected: "#FFFFFF",
    bubbleHeight: 20,
    bubblePadding: 6,
    bubbleMargin: 4,

    bgSearchResult: "#fff9e3",

    borderColor: "rgba(115, 116, 131, 0.16)",
    drilldownBorder: "rgba(0, 0, 0, 0)",

    linkColor: "#353fb5",

    cellHorizontalPadding: 8,
    cellVerticalPadding: 3,

    headerIconSize: 18,

    headerFontStyle: "600 13px",
    baseFontStyle: "13px",
    markerFontStyle: "9px",
    fontFamily: "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
    editorFontSize: "13px",
    lineHeight: 1.4,
    checkboxMaxSize: 18,
};
```

## FullTheme (확장 테마)

```typescript
// styles.ts:153-157
interface FullTheme extends Theme {
    headerFontFull: string;   // "600 13px Inter, ..."
    baseFontFull: string;     // "13px Inter, ..."
    markerFontFull: string;   // "9px Inter, ..."
}
```

## 테마 적용

### DataEditor에서 테마 설정
```tsx
<DataEditor
    theme={{
        accentColor: "#0066CC",
        bgCell: "#F5F5F5",
        // 일부 속성만 오버라이드 가능
    }}
/>
```

### 테마 병합 (mergeAndRealizeTheme)
```typescript
// styles.ts:171-214
function mergeAndRealizeTheme(theme: Theme, ...overlays: Partial<Theme>[]): FullTheme {
    const merged = { ...theme };

    for (const overlay of overlays) {
        if (overlay !== undefined) {
            for (const key in overlay) {
                if (key === "bgCell") {
                    // bgCell은 블렌딩 처리
                    merged[key] = blend(overlay[key], merged[key]);
                } else {
                    merged[key] = overlay[key];
                }
            }
        }
    }

    // Full 폰트 문자열 생성
    merged.headerFontFull = `${merged.headerFontStyle} ${merged.fontFamily}`;
    merged.baseFontFull = `${merged.baseFontStyle} ${merged.fontFamily}`;
    merged.markerFontFull = `${merged.markerFontStyle} ${merged.fontFamily}`;

    return merged;
}
```

## 계층별 테마 오버라이드

### 1. 전역 테마 (DataEditor)
```tsx
<DataEditor theme={{ accentColor: "#0066CC" }} />
```

### 2. 컬럼별 테마
```typescript
const columns: GridColumn[] = [
    {
        title: "Name",
        width: 200,
        themeOverride: {
            bgCell: "#F0F0FF",
            textDark: "#0000CC",
        },
    },
];
```

### 3. 그룹별 테마
```typescript
const getGroupDetails = (groupName: string): GroupDetails => ({
    name: groupName,
    overrideTheme: {
        bgGroupHeader: "#FFE0E0",
        textGroupHeader: "#CC0000",
    },
});
```

### 4. 행별 테마
```typescript
const getRowThemeOverride = (row: number): Partial<Theme> | undefined => {
    if (row % 2 === 0) {
        return { bgCell: "#F8F8F8" };
    }
    return undefined;
};
```

### 5. 셀별 테마
```typescript
const getCellContent = (cell: Item): GridCell => ({
    kind: GridCellKind.Text,
    data: "value",
    displayData: "value",
    allowOverlay: true,
    themeOverride: {
        bgCell: "#FFFFE0",  // 개별 셀 배경
    },
});
```

## 테마 우선순위

```
셀 themeOverride (가장 높음)
    ↓
행 getRowThemeOverride
    ↓
컬럼 themeOverride
    ↓
그룹 overrideTheme
    ↓
전역 theme (가장 낮음)
    ↓
기본 테마 (dataEditorBaseTheme)
```

## CSS 변수 생성

```typescript
// styles.ts:7-54
function makeCSSStyle(theme: Theme): Record<string, string> {
    return {
        "--gdg-accent-color": theme.accentColor,
        "--gdg-accent-fg": theme.accentFg,
        "--gdg-accent-light": theme.accentLight,
        "--gdg-text-dark": theme.textDark,
        "--gdg-text-medium": theme.textMedium,
        "--gdg-text-light": theme.textLight,
        "--gdg-bg-cell": theme.bgCell,
        "--gdg-bg-header": theme.bgHeader,
        "--gdg-border-color": theme.borderColor,
        "--gdg-font-family": theme.fontFamily,
        // ... 기타 변수
    };
}
```

## ThemeContext

```typescript
// styles.ts:165-169
const ThemeContext = React.createContext<Theme>(dataEditorBaseTheme);

function useTheme(): Theme {
    return React.useContext(ThemeContext);
}
```

## 다크 모드 예시

```typescript
const darkTheme: Partial<Theme> = {
    accentColor: "#6B8AFF",
    accentFg: "#FFFFFF",
    accentLight: "rgba(107, 138, 255, 0.2)",

    textDark: "#E0E0E0",
    textMedium: "#A0A0A0",
    textLight: "#707070",

    bgCell: "#1E1E1E",
    bgCellMedium: "#252525",
    bgHeader: "#2D2D2D",
    bgHeaderHasFocus: "#3D3D3D",
    bgHeaderHovered: "#353535",

    borderColor: "rgba(255, 255, 255, 0.1)",
    linkColor: "#8AA8FF",
};

<DataEditor theme={darkTheme} />
```

## rem 스케일링

```typescript
// data-editor.tsx:671
<DataEditor
    scaleToRem={true}  // rem 단위로 자동 스케일링
/>

// 내부적으로 remSize를 계산하여 적용
const remSize = Number.parseFloat(docStyle.fontSize);
// rowHeight, headerHeight 등에 적용
```

## 커스텀 헤더 아이콘

```typescript
// DataEditor의 headerIcons prop
const headerIcons: SpriteMap = {
    myIcon: (fgColor, bgColor) => `
        <svg width="20" height="20" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="8" fill="${fgColor}"/>
        </svg>
    `,
};

<DataEditor headerIcons={headerIcons} />

// 컬럼에서 사용
{
    title: "Column",
    icon: "myIcon",  // 또는 GridColumnIcon.HeaderString
}
```

## 수정 시 주의사항

1. **색상 포맷**: hex, rgb, rgba 모두 지원
2. **폰트 문자열**: fontStyle + fontFamily 조합
3. **bgCell 블렌딩**: 중첩시 blend 함수로 혼합
4. **성능**: 테마 변경시 전체 리렌더링 발생
5. **CSS 변수**: 오버레이 에디터에서 사용됨
