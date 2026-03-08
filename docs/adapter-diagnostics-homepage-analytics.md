# Adapter Diagnostics: Homepage Analytics

Status: read-only documentation for the diagnostics added in `app/src/components/home/provisional/realDataAdapter.ts`.

## 1) Diagnostics added
- Added explicit source-priority metadata (`KPI_SOURCE_PRIORITY_RULES`) with levels: `canonical`, `provisional`, `inferred`.
- Added non-breaking validation diagnostics (`console.warn`) via `runSourcePriorityValidationDiagnostics`.
- Diagnostics run once per adapter load and never throw runtime errors.

## 2) Mismatches now checked
- `resumo-executivo.total_posts` vs `sum(temporal-data.dados[].quantidade)`.
- CAA coverage/count mismatch between:
  - `caa-data.json`
  - `ranking_estados_12m.json`
- Category taxonomy mismatch between:
  - `heatmap-data.json`
  - `engagement-categoria.json`

## 3) Signals still inferred (not canonical)
- Sentiment-related homepage signal(s).
- Source/channel distribution signal(s) (Instagram/Facebook/Portais/Blogs/Outros).

## 4) Why rendered outputs were left unchanged
- This pass is diagnostics-only to reduce risk and preserve the current implementation baseline.
- No KPI/chart rendering logic was altered; warnings are informational for certification workflow only.

## 5) What must be validated before KPIs are final
- Approved canonical source hierarchy per KPI.
- Reconciled totals across summary, temporal, CAA, and category datasets.
- CAA identifier normalization across ranking and homepage datasets.
- Confirmation (or addition) of canonical sentiment and source-channel datasets.

## 6) Single safest next source-code task
- Implement a read-only `analyticsSourceResolver` utility module that centralizes KPI source precedence and validation assertions (without changing UI values), then wire adapter diagnostics to that resolver.
