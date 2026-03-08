# Review Readiness: Homepage Analytics

## A. Changed files overview
Review scope (source + docs):
- `app/src/components/home/provisional/realDataAdapter.ts`
- `app/src/components/home/provisional/analyticsSourceResolver.ts`
- `docs/validate-homepage-analytics-source-of-truth.md`
- `docs/ai-execution-note-homepage-analytics.md`
- `docs/homepage-analytics-next-work-buckets.md`
- `docs/agent-handoff-homepage-analytics.md`
- `docs/homepage-analytics-validation-report.md`
- `docs/homepage-kpi-source-priority-matrix.md`
- `docs/adapter-diagnostics-homepage-analytics.md`
- `docs/homepage-analytics-implementation-state.md`

Out-of-scope noise in worktree (do not review as product changes):
- `app/dist/*`
- `app/node_modules/.tmp/*`
- `app/node_modules/.vite/*`

## B. What is safe and stable
- Homepage continues to render with existing adapter outputs.
- Route structure and page layout behavior were not changed.
- Diagnostics are non-breaking (`console.warn` only, no throw paths for mismatches).
- Validation logic is centralized in `analyticsSourceResolver.ts` and reused by adapter diagnostics.

## C. What is intentionally provisional
- Sentiment output remains inferred (no canonical sentiment source file yet).
- Source/channel distribution remains inferred (no canonical channel breakdown file yet).
- KPI source hierarchy is documented but still pending formal analytics certification.

## D. What reviewers should focus on
- Correctness and clarity of source-priority rules in `analyticsSourceResolver.ts`.
- Diagnostic coverage for:
  - total posts cross-check (`resumo` vs `temporal`)
  - CAA coverage mismatch (`caa-data` vs `ranking`)
  - taxonomy mismatch (`heatmap` vs `engagement-categoria`)
- Confirmation that adapter rendering logic is unchanged and diagnostics are read-only.
- Documentation consistency with current implementation state and next-step sequencing.

## E. What should not be debated yet
- UI redesign or section layout changes.
- Route or navigation changes.
- Ranking/state page feature changes.
- Final KPI truth claims before source reconciliation and normalization are approved.

## F. Tiny cleanup still worth doing before PR review
- Decide whether to remove `app/src/components/home/provisional/simulatedData.ts` (currently unused) or keep it intentionally as a fallback reference; either choice should be explicit in PR notes.
