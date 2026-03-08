# Validate homepage analytics source of truth after adapter integration

## Current state
- Homepage provisional analytics render correctly using a defensive real-data adapter.
- Integration is implementation-valid, but analytics semantics are not yet final truth.

## Validation still needed
1. Confirm official KPI source priority across:
   - `resumo-executivo.json`
   - `temporal-data.json`
   - `caa-data.json`
   - `heatmap-data.json`
   - `ranking_estados_12m.json`
   - `engagement-categoria.json`
2. Replace inferred sentiment logic if canonical sentiment data exists.
3. Replace inferred source/channel distribution if canonical source-by-channel data exists.
4. Reconcile mismatched totals across datasets before certifying homepage KPIs as final.

## Exit condition for this follow-up
- KPI source hierarchy is documented and approved.
- Sentiment and channel charts use canonical data (or explicitly approved fallback rules).
- Final homepage KPI values are reconciled and certified.
