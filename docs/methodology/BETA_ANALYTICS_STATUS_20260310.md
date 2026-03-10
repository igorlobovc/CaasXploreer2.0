## Current app routes in use
- /
- /analytics
- /ranking
- /estados
- /estados/:uf
- /evidencias
- /servicos

## Current data fixes already applied
- authoritative lawyer totals source added and wired into normalized metrics
- PB now resolves to 24,226 lawyers
- per-1000-lawyers metrics now reflect the authoritative totals source

## Current charts/pages live in app

### Homepage
- Hero / positioning
- compact taxonomy summary
- evidence teaser
- services teaser
- state spotlight still present in current real branch state unless later removed

### /analytics
- KPI/context block
- Top Subcategorias por Engajamento Médio
- Top Macrocategorias por Engajamento Médio
- Heatmap Estado/Região × Subcategoria (proxy/caveated)
- supporting time-series block

### /ranking
- state ranking by normalized and other current ranking metrics

### /estados
- state overview and access to state detail

### /estados/:uf
- state detail cards
- total interactions
- shared interactions
- per-1000-lawyers metric
- lawyer count
- monthly history

### /evidencias
- evidence explorer with filters and pagination

### /servicos
- services/taxonomy browsing surface

## Current caveats
- some analytics still use provisional or proxy logic
- heatmap is still proxy-based, not canonical geo-engagement
- lawyer totals source is now fixed, but downstream metric validation still needs review
- chart contrast/readability recently improved, but further polish may still help

## Beta objective for client delivery
Deliver a visually coherent, navigable beta showing:
- what services/subcategories appear strongest
- where states differ
- normalized lawyer-aware comparisons
- evidence browsing
- a clear path for future refinement

## What should be added only if fast and safe
- 1 to 3 additional high-value charts from current uploaded dataset
- improved chart titles/subtitles
- small explanatory captions
- no major redesign
- no major data model rewrite

## What should NOT be attempted before client beta
- full methodological refactor
- broad new routing architecture
- large-scale design overhaul
- new complex data ingestion pipelines unless essential
EOF

git add docs/methodology/BETA_ANALYTICS_STATUS_20260310.md
git commit -m "docs: add beta analytics status snapshot" || true
git push -u origin feature/state-highlights-paraiba
