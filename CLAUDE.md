# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Glide Data Grid is a canvas-based React data grid component that supports millions of rows with fast scrolling performance. The project is built using a monorepo structure with three packages:

- **`packages/core`** - Main data grid component (`@glideapps/glide-data-grid`)

## Development Commands

### Primary Commands
- **`npm run start`** - Start development environment with Storybook and watch mode
- **`npm run build`** - Build all packages and run linting


### Package-Specific Commands
```bash
# Core package
cd packages/core
npm run build        # Build the core package
```


## Architecture

### Canvas-Based Rendering
The data grid uses HTML Canvas for performance, allowing it to handle millions of rows efficiently. Canvas rendering happens in:
- `packages/core/src/internal/data-grid/render/` - Core rendering logic
- `packages/core/src/cells/` - Individual cell renderers

### Key Components
- **`DataEditor`** (`packages/core/src/data-editor/data-editor.tsx`) - Main component wrapper
- **`DataEditorAll`** (`packages/core/src/data-editor-all.tsx`) - Full-featured version with all dependencies
- **Cell Renderers** (`packages/core/src/cells/`) - Built-in cell types (text, number, image, etc.)

### Package Structure
```
packages/core/src/
├── cells/              # Built-in cell renderers
├── common/             # Shared utilities and styles
├── data-editor/        # Main DataEditor component
├── internal/           # Internal components and utilities
└── stories/            # Storybook stories
```

## Analysis Documents

코드 수정 전 `/analyze` 폴더의 관련 문서를 참조하세요:

### Quick Reference
- 전체 구조: `/analyze/00-overview.md`
- 타입 정의: `/analyze/01-types.md`
- 빠른 참조: `/analyze/quick-reference.md`

### Reference by Modification Area
| 수정 대상 | 참조 문서 |
|-----------|----------|
| DataEditor Props/이벤트 | `/analyze/02-data-editor.md` |
| 캔버스 컨트롤러 | `/analyze/03-data-grid.md` |
| 렌더링 파이프라인 | `/analyze/04-rendering.md` |
| 셀 렌더러 추가/수정 | `/analyze/05-cells.md` |
| 선택 동작 변경 | `/analyze/06-selection.md` |
| 편집/복사/붙여넣기 | `/analyze/07-editing.md` |
| 이벤트 처리 | `/analyze/08-events.md` |
| 테마 커스터마이징 | `/analyze/09-theming.md` |
| 데이터 처리 (필터/정렬/그룹) | `/analyze/10-data-processing.md` |
| 확장 포인트 | `/analyze/11-extension-points.md` |

### When to Use
1. **새 기능 추가 전**: 관련 문서에서 기존 패턴 확인
2. **버그 수정 시**: 해당 모듈의 데이터 흐름과 의존성 파악
3. **타입 에러 발생 시**: `01-types.md`에서 정확한 타입 확인
4. **코드 위치 찾기**: `quick-reference.md`의 파일:라인 참조



