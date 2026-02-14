# Project Memory

> **NOTE**: 핵심 내용은 `.claude/rules/conventions.md`로 이관되었습니다.
> 이 파일은 이관 이력만 유지합니다.

## 이관 완료

- 프로젝트 빌드/테스트 명령어 → `.claude/rules/conventions.md`
- DataEditor 리팩토링 이력 → `.claude/rules/conventions.md`
- Key Learnings (타입 주의사항, 훅 패턴) → `.claude/rules/conventions.md`
- AI 커스텀 기능 목록 → `.claude/rules/conventions.md`
- 분석 문서 (00-16, 보조 fix 문서) → `.claude/rules/` (paths 기반 자동 로드)
- 새 분석 문서 (17-19) → `.claude/rules/` (paths 기반 자동 로드)
- analaze/ 유용한 내용 → 번호 문서에 머지 후 `.claude/rules/`로 이관

## Analyze Docs Update Log

- 2026-02-09: All analyze docs updated to reflect DataEditor refactoring
- 2026-02-15: All analyze docs migrated to `.claude/rules/` with paths frontmatter
  - analaze/ 4개 파일 머지 (data_editor→02, row-grouping→10, header→12, rowspan→04)
  - 신규 문서 3개 작성 (17-scrolling, 18-search, 19-animation)
  - conventions.md 신규 작성 (항상 로드)
  - CLAUDE.md, skills/analyze.md 경로 업데이트
