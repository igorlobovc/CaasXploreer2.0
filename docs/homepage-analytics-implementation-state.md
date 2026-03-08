# 1. CURRENT IMPLEMENTATION STATUS
- Homepage refactor is complete and integrated.
- Provisional real-data adapter is active.
- `analyticsSourceResolver.ts` centralizes source-priority and validation diagnostics.
- Build currently passes.
- Rendered KPI/chart behavior is intentionally unchanged (diagnostics-only follow-ups so far).

# 2. FILES NOW ACTING AS SOURCE OF TRUTH
- Integration/runtime logic:
  - `app/src/components/home/provisional/realDataAdapter.ts`
  - `app/src/components/home/provisional/analyticsSourceResolver.ts`
- Provisional data candidates:
  - `app/src/components/home/provisional/data/resumo-executivo.json`
  - `app/src/components/home/provisional/data/temporal-data.json`
  - `app/src/components/home/provisional/data/caa-data.json`
  - `app/src/components/home/provisional/data/heatmap-data.json`
  - `app/src/components/home/provisional/data/ranking_estados_12m.json`
  - `app/src/components/home/provisional/data/engagement-categoria.json`

# 3. WHAT IS IMPLEMENTATION-VALID VS NOT YET ANALYTICS-CERTIFIED
- Implementation-valid:
  - Homepage renders using adapter-backed real-data flow.
  - Defensive parsing/fallback behavior is in place.
  - Diagnostics run without breaking UI.
- Not yet analytics-certified:
  - Final KPI source hierarchy is not formally approved.
  - Cross-dataset totals/coverage are not fully reconciled.
  - Canonical sentiment and source-channel datasets are not confirmed.

# 4. ACTIVE DIAGNOSTICS NOW IN PLACE
- `resumo.total_posts` vs `sum(temporal.dados[].quantidade)` mismatch check.
- CAA coverage mismatch check: `caa-data` vs `ranking_estados_12m`.
- Category taxonomy mismatch check: `heatmap-data` vs `engagement-categoria`.
- Explicit inferred-signal diagnostic flags.

# 5. WHAT REMAINS INFERRED
- Sentiment-related homepage signal(s).
- Source/channel distribution signal(s) (Instagram/Facebook/Portais/Blogs/Outros).

# 6. DO NOT TOUCH
- Do not redesign homepage UI/layout.
- Do not change routes (`app/src/main.tsx`).
- Do not modify ranking/state pages unless explicitly requested.
- Do not edit JSON source contents during certification planning.
- Do not include `app/dist` artifacts in commits.

# 7. SINGLE SAFEST NEXT SOURCE-CODE TASK
- Add a read-only normalization layer for CAA identifiers/taxonomy in `analyticsSourceResolver.ts` (mapping + validation output only), then consume it in diagnostics without changing rendered KPI/chart values.
