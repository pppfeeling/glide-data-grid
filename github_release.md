# Step 1: 새 릴리즈 태그 만들기 (최신 커밋 반영)

  현재 v6.1.0 이후로 여러 변경사항(vite 마이그레이션, 빌드 최적화, 린트 수정 등)이 있으므로 새 버전을 만드는 것을 권장합니다. 같은 버전으로 덮어쓰거나 새
   버전을 만들 수 있습니다.

  옵션 A: 기존 v6.1.0 태그 갱신

  ## 기존 release/tag 삭제
  gh release delete v6.1.0 --yes
  git tag -d v6.1.0
  git push origin --delete v6.1.0

  ## 빌드 (dist 파일이 최신인지 확인)
  npm run build

  ## dist 변경사항 커밋
  git add packages/core/dist/
  git commit -m "chore: rebuild dist"

  ## 새 tag 및 release 생성
  git tag v6.1.0
  git push origin v6.1.0
  gh release create v6.1.0 --generate-notes

  옵션 B: 새 버전 v6.2.0으로 릴리즈

  ## 빌드
  npm run build

  ## dist 변경사항 커밋 (필요시)
  git add packages/core/dist/
  git commit -m "chore: rebuild dist for v6.2.0"
  git push

  ## 태그 & 릴리즈
  git tag v6.2.0
  git push origin v6.2.0
  gh release create v6.2.0 --generate-notes

  ---
# Step 2: 사용하는 프로젝트 package.json 설정

  {
    "dependencies": {
      "@glideapps/glide-data-grid": "github:pppfeeling/glide-data-grid#v6.1.0",

      "@linaria/react": "^6.3.0",
      "canvas-hypertxt": "^1.0.3",
      "react-number-format": "^5.4.4",

      "lodash": "^4.17.21",
      "marked": "^16.0.10",
      "react-responsive-carousel": "^3.2.7",
      "react": "^18.0.0",
      "react-dom": "^18.0.0"
    }
  }

  ## v6.1.0 대신 항상 최신 코드를 쓰려면 #main 사용 가능

  ---
  Step 3: CSS import 추가

  사용하는 프로젝트의 진입점 파일(main.tsx 등)에:

  import "@glideapps/glide-data-grid/index.css";

  ---
# Step 4: 설치 및 캐시 초기화

  # pnpm 사용시
  rm -rf node_modules pnpm-lock.yaml

  # 패키지 저장소 정리
  pnpm store prune 
  pnpm install

  ## 설치 확인
  ls node_modules/@glideapps/glide-data-grid/packages/core/dist/
  # 출력: index.css  index.d.ts  index.js  index.js.map

  # Vite 캐시 문제 발생시
  rm -rf node_modules/.vite