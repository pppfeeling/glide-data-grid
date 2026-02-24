# Step 1: package.json의 "exports" 필드 추가
루트 package.json에 다음을 추가하세요:
```json
{
  "name": "root",
  "version": "6.1.0",
  "private": true,
  "main": "./packages/core/dist/cjs/index.js",
  "module": "./packages/core/dist/esm/index.js",
  "types": "./packages/core/dist/dts/index.d.ts",
  "exports": {
    ".": {
      "types": "./packages/core/dist/dts/index.d.ts",
      "import": "./packages/core/dist/esm/index.js",
      "require": "./packages/core/dist/cjs/index.js"
    },
    "./index.css": {
      "import": "./packages/core/dist/index.css"
    }
  },
  ...
}
```

# Step 2: 커밋 & 푸시
```bash
git add package.json
git commit -m "fix: add exports field to root package.json for GitHub distribution"
git push origin main
```

# Step 3: Release 재생성
```bash
# 기존 release/tag 삭제
gh release delete v6.1.0 --yes
git tag -d v6.1.0
git push origin --delete v6.1.0

# 새 tag 및 release 생성
git tag v6.1.0
git push origin v6.1.0
gh release create v6.1.0 --generate-notes
```


# Step 4: glide-data-grid를 사용하는 project에서 재설치
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm store prune
pnpm install

# dist 폴더 확인
ls -la node_modules/@glideapps/glide-data-grid/packages/core/dist/

# 안되면 Vite 캐시도 제거
rm -rf node_modules/.vite
```


# Step 5: glide-data-grid를 사용하는 project에서 package.json에 추가
{
  "dependencies": {
    "@glideapps/glide-data-grid": "github:pppfeeling/glide-data-grid#v6.1.0",
    "@linaria/react": "^6.3.0",
    "canvas-hypertxt": "^1.0.3",
    "marked": "^16.0.10",
    "react-number-format": "^5.4.4",
    "react-responsive-carousel": "^3.2.7",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
