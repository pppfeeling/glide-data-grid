# Project Memory

## glide-data-grid (packages/core)
- **Test**: `cd packages/core && npx vitest run --reporter verbose` (395 tests, ~10s)
- **TypeScript check**: `npx tsc --noEmit -p packages/core/tsconfig.json`
- **Import pattern**: `.js` extension in imports, no barrel exports
- **Hook pattern**: Individual files in `src/data-editor/`, helper functions co-located

### DataEditor Refactoring (completed Phase 1-2, analyze docs updated)
- Original: `data-editor.tsx` was 5,170 lines
- After refactoring: 3,802 lines (main) + 5 extracted modules (~1,996 lines)
- Extracted hooks share state via `DataEditorCoreState` interface (data-editor-state.ts)
- Key files created:
  - `data-editor-state.ts` (104 lines) - shared types
  - `use-ghost-input.ts` (329 lines) - IME/GhostInput handlers
  - `use-clipboard.ts` (403 lines) - Copy/Paste/Cut
  - `use-keyboard-handlers.ts` (523 lines) - keybindings + key input
  - `use-mouse-handlers.ts` (637 lines) - mouse events + fill pattern

### Key Learnings
- `useKeybindingsWithDefaults()` returns `RealizedKeybinds` (strings), not `Keybinds` (boolean|string)
- `Slice` type is `[number, number]` (mutable), `readonly [number, number]` is NOT assignable to it
- When extracting hooks, shared refs between parent and hook must be defined in parent and passed as args
- Declaration order matters in React components - hooks must be called after all dependencies are defined
- `coreState` object pattern works well for grouping 20+ shared dependencies into one arg

### Analyze Docs Update Log
- 2026-02-09: All analyze docs updated to reflect DataEditor refactoring
  - `00-overview.md`: Updated LOC, module structure, dependency graph, coreState pattern
  - `02-data-editor.md`: Updated LOC, added extracted hooks section, coreState docs
  - `07-editing.md`: Added references to use-clipboard.ts, use-ghost-input.ts
  - `08-events.md`: Updated event propagation flow with extracted hooks
  - `quick-reference.md`: Updated file list, LOC, location references, checklists
  - `13-ghost-input-ime.md`: Added use-ghost-input.ts reference
  - `14-numbercell-keystroke-editing-fix.md`: Added refactoring note
  - `CLAUDE.md`: Updated architecture, package structure, reference table
  - `.claude/skills/analyze.md`: Added refactoring reference
