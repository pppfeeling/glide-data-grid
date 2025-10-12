# CLAUDE.md

This file provides guidance to gemini when working with code in this repository.

## Project Overview

Glide Data Grid is a canvas-based React data grid component that supports millions of rows with fast scrolling performance. The project is built using a monorepo structure with three packages:

- **`packages/core`** - Main data grid component (`@glideapps/glide-data-grid`)
- **`packages/cells`** - Additional cell renderers (`@glideapps/glide-data-grid-cells`)
- **`packages/source`** - Data source utilities (`@glideapps/glide-data-grid-source`)

## Development Commands

### Primary Commands

- **`npm run storybook`** - Start development environment with Storybook and watch mode
- **`npm run build`** - Build all packages and run linting
- **`npm test`** - Run tests for core package
- **`npm run test-18`** - Run tests with React 18
- **`npm run test-19`** - Run tests with React 19

### Package-Specific Commands

```bash
# Core package
cd packages/core
npm run build        # Build the core package
npm run lint         # Run ESLint and cycle checks
npm run test         # Run tests with Vitest
npm run watch        # Watch for changes and rebuild

# Cells package
cd packages/cells
npm run build        # Build cells package
npm run lint         # Run ESLint
npm run test         # Run tests

# Source package
cd packages/source
npm run build        # Build source package
npm run lint         # Run ESLint
npm run test         # Run tests
```

### Testing Commands

- **`npm run test-source`** - Test source package
- **`npm run test-cells`** - Test cells package
- **`npm run test-projects`** - Test integration projects

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

### Build System

- Uses **TypeScript** with dual ESM/CJS output
- **Linaria** for CSS-in-JS with zero-runtime CSS extraction
- **Vitest** for testing
- Custom build scripts in `config/build-util.sh` for parallel ESM/CJS compilation

### Cell System

Custom cells must use Canvas rendering. Built-in cells include:

- Text, Number, Boolean, Image
- Markdown, URI, Drilldown
- Bubble, Loading, Protected
- Row ID, Marker, New Row

New cells should be added to the `packages/cells` package with React.lazy for code splitting when requiring third-party dependencies.

## Code Style

### Linting

- **ESLint** with TypeScript, React, SonarJS, and Unicorn plugins
- **Prettier** with 4-space indentation, 120 character line width
- Strict TypeScript configuration with `noImplicitAny` and `strict: true`

### Key ESLint Rules

- `@typescript-eslint/no-floating-promises: error` - Async promises must be handled
- `@typescript-eslint/strict-boolean-expressions: error` - Strict boolean checks
- `eqeqeq: always` - Always use strict equality
- `no-console: warn` - Console usage discouraged

## Testing

The project uses **Vitest** for testing with **React Testing Library**. Canvas rendering tests use `vitest-canvas-mock`.

### Test Structure

```bash
# Run all tests
npm test

# Test specific React versions
npm run test-18  # React 18
npm run test-19  # React 19

# Test individual packages
npm run test-source
npm run test-cells
```

## Integration Projects

Test projects demonstrate integration with different frameworks:

- `test-projects/cra5-gdg` - Create React App 5
- `test-projects/next-gdg` - Next.js integration

Run with: `npm run test-projects`

## Debugging with Storybook

When `npm run storybook` is not available, visual verification can be done by assuming the Storybook server is running on `http://localhost:9009`.

Use a Chrome DevTools debugging instance to view stories. The URL for a story can be constructed from its title. For example, the `add-columns` story can be viewed at:

`http://localhost:9009/?path=/story/glide-data-grid-dataeditor-demos--add-columns`

To debug a different story, replace `add-columns` with the story's name in the URL.

## Analysis

For a detailed analysis of specific files and features, please see [Analazy.md](./Analazy.md).