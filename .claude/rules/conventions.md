# 프로젝트 컨벤션 및 핵심 참고사항

## 빌드 및 테스트

- **Test**: `cd packages/core && npx vitest run --reporter verbose` (395 tests, ~10s)
- **TypeScript check**: `npx tsc --noEmit -p packages/core/tsconfig.json`
- **Build**: `cd packages/core && npm run build`
- **Storybook**: `npm run start` → http://localhost:9009

## 코드 컨벤션

### Import 패턴
- `.js` 확장자 사용 (TypeScript에서도)
- barrel exports 사용하지 않음
- 예: `import { GridCellKind } from "../internal/data-grid/data-grid-types.js"`

### Hook 패턴
- 개별 파일로 분리 (`src/data-editor/use-*.ts`)
- 헬퍼 함수는 같은 파일에 co-locate
- 훅 간 공유 상태는 `DataEditorCoreState` 인터페이스를 통해 전달

### 컬럼 순서 (mangledCols)
- `rowNumber → checkbox → rowStatus → rowId → 사용자 컬럼`
- `rowMarkerOffset`으로 내부/외부 인덱스 변환

## 타입 주의사항

- `useKeybindingsWithDefaults()` → `RealizedKeybinds` (strings) 반환, `Keybinds` (boolean|string) 아님
- `Slice` 타입은 `[number, number]` (mutable), `readonly [number, number]`는 할당 불가
- `readonly` 속성 유지 필수 (불변성 보장)
- 새 셀 타입 추가시 타입 가드 함수 동기화 필수

## 리팩토링 이력

### DataEditor 오케스트레이터 패턴 (완료)
- 원본: `data-editor.tsx` 5,170줄 → 현재: 3,802줄 (메인) + 5개 추출 모듈 (~1,996줄)
- 추출된 훅:
  - `data-editor-state.ts` (104줄) - 공유 상태 타입
  - `use-ghost-input.ts` (329줄) - IME/GhostInput
  - `use-clipboard.ts` (403줄) - 복사/붙여넣기
  - `use-keyboard-handlers.ts` (523줄) - 키보드
  - `use-mouse-handlers.ts` (637줄) - 마우스/터치/필
- 훅 간 공유 refs는 부모에서 정의, args로 전달
- 선언 순서 중요: hooks는 모든 의존성 정의 후 호출
- `coreState` 객체 패턴으로 20+ 공유 의존성을 하나의 arg로 그룹화

## AI 커스텀 기능 (원본 glide-data-grid에 없음)

1. **Row Status 컬럼** (`rowStatus`, `onRowStatus`): A(Added)/U(Updated)/D(Deleted) 상태 표시
2. **Row ID 컬럼** (`rowId`, `onRowId`): 행 ID 표시
3. **Row Number 분리**: `showRowNumber` 옵션으로 행 번호와 체크박스 별도 컬럼
4. **GhostInput**: IME 지원을 위한 별도 textarea 입력 요소
5. **부모 스크롤 감지**: 부모 컨테이너 스크롤 시 오버레이 자동 닫기
6. **다중 레벨 그룹 헤더**: 3단 이상 계층적 헤더 지원


