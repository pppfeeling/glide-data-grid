# 📚 DataEditor 인터랙티브 학습 플랫폼 가이드

## 개요

Glide Data Grid의 모든 예제를 체계적으로 학습할 수 있는 통합 인터랙티브 플랫폼을 Storybook에 생성했습니다.

## 🎯 주요 기능

### 1. **카테고리별 정리** (11개 카테고리)
- 🚀 Getting Started - 기본 개념
- ✏️ Data Manipulation - 데이터 조작
- 🎨 Customization & Theming - 커스터마이징
- 🔍 Search & Filter - 검색과 필터링
- 🎯 Selection & Interaction - 선택과 상호작용
- 📐 Layout & Structure - 레이아웃
- 📋 Copy, Paste & Drag - 클립보드와 드래그
- 🎮 Advanced Controls - 고급 컨트롤
- 🚄 Scrolling & Navigation - 스크롤링
- ⚡ Performance - 성능 최적화
- 🔧 Integration & Advanced - 통합과 고급 기능

### 2. **난이도 필터링**
- 초급 (Beginner) - 기본적인 기능과 개념
- 중급 (Intermediate) - 실전 활용 기능
- 고급 (Advanced) - 복잡한 시나리오와 최적화

### 3. **검색 기능**
- 제목, 설명, 키워드로 실시간 검색
- 한글/영어 모두 지원

### 4. **인터랙티브 UI**
- 카드 기반 레이아웃
- 호버 효과와 시각적 피드백
- 원클릭으로 예제 접근

## 📂 파일 위치

- **메인 스토리**: `packages/core/src/docs/10-interactive-learning.stories.tsx`
- **예제 폴더**: `packages/core/src/docs/examples/`
- **총 예제 수**: 74개

## 🚀 사용 방법

### 1. Storybook 실행
```bash
npm run storybook
```

### 2. 학습 플랫폼 접근
브라우저에서 http://localhost:9009 접속 후:
1. 좌측 사이드바에서 "Glide-Data-Grid" → "Docs" 선택
2. "10. 📚 Interactive Learning Platform" 클릭

### 3. 예제 탐색
- **난이도별**: 상단 필터 버튼으로 난이도 선택
- **검색**: 검색창에 키워드 입력
- **카테고리별**: 스크롤하여 관심 카테고리 탐색
- **예제 실행**: 각 카드 클릭 시 해당 예제로 이동

## 📊 포함된 예제 통계

| 카테고리 | 예제 수 |
|---------|--------|
| Getting Started | 3 |
| Data Manipulation | 5 |
| Customization & Theming | 9 |
| Search & Filter | 3 |
| Selection & Interaction | 6 |
| Layout & Structure | 16 |
| Copy, Paste & Drag | 5 |
| Advanced Controls | 7 |
| Scrolling & Navigation | 7 |
| Performance | 5 |
| Integration & Advanced | 8 |
| **총계** | **74** |

## 💡 학습 경로 추천

### 초보자 (Beginner)
1. All Cell Kinds - 셀 타입 이해
2. Small Editable Grid - 기본 편집
3. Row Selections - 행 선택
4. Theme Support - 테마 적용
5. Copy Support - 복사 기능

### 중급자 (Intermediate)
1. Add Data - 데이터 추가
2. Custom Header Icons - 헤더 커스터마이징
3. Controlled Search - 검색 구현
4. Column Groups - 컬럼 그룹화
5. Fill Handle - 드래그 채우기

### 고급 사용자 (Advanced)
1. Custom Renderers - 커스텀 렌더러
2. One Million Rows - 대용량 데이터
3. Server Side Data - 서버 사이드 로딩
4. Column Group Collapse - 그룹 접기
5. Shadow DOM - 고급 통합

## 🎨 UI 특징

### 카테고리 카드
- **헤더**: 이모지 + 카테고리명
- **설명**: 카테고리 목적 요약
- **예제 리스트**: 그리드 레이아웃

### 예제 카드
- **제목**: 예제명 + 난이도 배지
- **설명**: 기능 설명
- **키워드**: 검색 가능한 태그
- **호버 효과**: 색상 변경 + 이동 애니메이션

### 색상 시스템
- **초급**: 초록색 (#2e7d32)
- **중급**: 주황색 (#ef6c00)
- **고급**: 분홍색 (#c2185b)
- **링크**: 파란색 (#2196f3)

## 🔧 커스터마이징

### 새 예제 추가
`learningPath` 배열에 새 항목 추가:

```typescript
{
    title: "예제 제목",
    description: "예제 설명",
    path: "/story/glide-data-grid-dataeditor-demos--story-name",
    difficulty: "beginner" | "intermediate" | "advanced",
    keywords: ["키워드1", "키워드2"],
}
```

### 새 카테고리 추가
`learningPath` 배열에 새 카테고리 추가:

```typescript
{
    name: "🎉 새 카테고리",
    description: "카테고리 설명",
    examples: [
        // 예제 배열
    ],
}
```

## 📱 반응형 지원

- 데스크탑: 전체 레이아웃
- 태블릿: 적응형 그리드
- 모바일: 단일 컬럼 (DocWrapper 제공)

## 🌐 다국어 지원

현재 한국어로 작성되었으며, 필요시 다음을 수정:
- 카테고리명과 설명
- UI 텍스트 (검색, 필터 등)
- 난이도 배지 텍스트

영어 버전 추가 예시:
```typescript
const i18n = {
    ko: { beginner: "초급", ... },
    en: { beginner: "Beginner", ... },
};
```

## 🔗 관련 리소스

- [Storybook 공식 문서](https://storybook.js.org/)
- [Glide Data Grid GitHub](https://github.com/glideapps/glide-data-grid)
- [Glide Data Grid API](https://github.com/glideapps/glide-data-grid/blob/main/packages/core/API.md)
- [공식 웹사이트](https://grid.glideapps.com)

## 🤝 기여 가이드

새 예제나 개선 사항 추가 시:
1. 적절한 카테고리 선택
2. 명확한 제목과 설명 작성
3. 관련 키워드 추가
4. 난이도 설정
5. 스토리 경로 확인

## 📝 라이센스

이 학습 플랫폼은 Glide Data Grid와 동일한 MIT 라이센스를 따릅니다.