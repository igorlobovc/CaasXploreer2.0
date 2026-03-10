# Current state snapshot — 2026-03-09

This snapshot is based on the actual files present in the repository at inspection time. It does **not** rely on older PR summaries when those summaries differ from the current checked-out files.

## 1. Branch checkpoint

- Current checked-out branch at inspection time: `copilot/featurecreate-current-state-snapshot`
- Requested branch name from prior notes: `feature/state-highlights-paraiba`
- Reality check: no local or remote ref named `feature/state-highlights-paraiba` was present during inspection; the actual checked-out branch was the copilot branch above.
- Current HEAD commit: `8b171a69907ebe11456d6adbb4ca44c9bab2905b` (`8b171a6`)
- Working tree clean at inspection time before this snapshot file was created: **yes**

## 2. Current routed pages that actually exist

Routes come from `app/src/main.tsx`.

- `/` → `App` → `HomePage`
- `/analytics` → `AnalyticsPage`
- `/evidencias` → `EvidenciasPage`
- `/servicos` → `ServicosPage`
- `/ranking` → `RankingPage`
- `/estados` → `EstadosPage`
- `/estados/:uf` → `EstadoDetailPage`

Explicit note on `/destaques/paraiba`:

- `/destaques/paraiba` does **not** exist as a live route in the current branch state.
- The only current mention of `/destaques/paraiba` is roadmap/planning text in `docs/phased-build-roadmap.md`.
- Paraíba content currently exists only as the homepage section `ParaibaSpotlight`.

## 3. Homepage current composition

`app/src/components/home/HomePage.tsx` currently renders the following, in this exact order:

1. `HomeBackground`
2. `HeroSection`
3. `ComoFuncionaSection`
4. `ParaibaSpotlight`
5. `EvidenceTeaserSection`
6. `ServicosTeaserSection`
7. `FooterSection`

Important current-state note:

- `ParaibaSpotlight` is still embedded directly on `/`.
- There is no separate Paraíba highlight route yet.

## 4. What has already been extracted off homepage

The homepage now keeps only teaser blocks for some deeper experiences, while the full experiences live on dedicated pages:

- Full evidence exploration is no longer rendered on the homepage.
  - Homepage keeps only `EvidenceTeaserSection`.
  - The actual explorer now lives on `/evidencias` via `StateEvidenceView` in `app/src/pages/EvidenciasPage.tsx`.
- Full service taxonomy browsing is no longer rendered on the homepage.
  - Homepage keeps only `ServicosTeaserSection`.
  - The full taxonomy now lives on `/servicos` via `ServiceTaxonomySection` in `app/src/pages/ServicosPage.tsx`.
- The provisional deep-dive analytics block is no longer rendered on the homepage.
  - `HomePage.tsx` does not render `ProvisionalSimulationResultsSection`.
  - That section currently lives on `/analytics`, where `AnalyticsPage.tsx` renders `ProvisionalSimulationResultsSection` after the main analytics dashboard.

What has **not** been extracted yet:

- `ParaibaSpotlight` is still on the homepage and has **not** been moved to `/destaques/paraiba`.

## 5. Analytics current MVP

Current live `/analytics` structure is defined by `app/src/pages/AnalyticsPage.tsx` plus the appended `ProvisionalSimulationResultsSection`.

### 5.1 Current live structure actually rendered on `/analytics`

1. Header/context block
   - page label `PAINEL ANALÍTICO`
   - title `Analytics`
   - descriptive paragraph with `analyticsSummary.periodoCobertura`

2. First KPI row
   - `Total de Interações`
   - `Interações Compartilhadas`
   - `Média por 1.000 advogados`
   - `Crescimento no período`

3. Second KPI row
   - `CAAs ativas`
   - `Categorias ativas`
   - `Serviços mapeados`
   - `Últ. atualização`

4. Canonical-style chart block in `AnalyticsPage.tsx`
   - `Evolução Mensal de Interações` (line chart)
   - `Interações por Categoria` (horizontal bar chart)
   - `Distribuição de Fontes` (pie chart)

5. Appended provisional analytics section
   - section label `SINAL EXTERNO`
   - title `Evidência de Repercussão`
   - context note `Base Operacional`
   - provisional KPI cards:
     - `Menções Totais`
     - `Intensidade Média por Tema`
     - `Densidade de Sinais`
     - `Sentimento Predominante`
   - provisional chart-like blocks:
     - `Volume Relativo por Janela de Consulta`
     - `Evolução Temporal de Menções por Tema`
     - `Distribuição de Fontes por Entidade`

### 5.2 Requested MVP items vs actual branch state

The actual branch state does **not** yet match a newer/narrower analytics MVP shaped around subcategory heatmaps and average engagement rankings.

- KPI/context block: **yes, exists**
  - implemented as the page header plus two KPI rows in `AnalyticsPage.tsx`

- Top subcategories by average engagement: **not implemented on the live `/analytics` page**
  - there is no rendered chart/table for top subcategories by average engagement in `AnalyticsPage.tsx`

- Top categories by average engagement: **not implemented as a dedicated live chart on `/analytics`**
  - `engagement-categoria.json` exists and is consumed in data preparation, but the page renders `Interações por Categoria` by total interactions, not a dedicated average-engagement ranking

- Heatmap state/region × subcategory: **not implemented on the live `/analytics` page**
  - `heatmap-data.json` exists as a source, but no heatmap visualization is rendered in `AnalyticsPage.tsx`

- Time series support: **yes, but in two different forms**
  - canonical national monthly line chart: `Evolução Mensal de Interações`
  - provisional/inferred thematic timeline: `Evolução Temporal de Menções por Tema`

### 5.3 What has been demoted, removed, or is still out of sync with the intended MVP

Based on actual files plus the governance docs currently present:

- Demoted off homepage and now only on `/analytics`
  - `ProvisionalSimulationResultsSection`

- Planned/desired MVP items not yet implemented on the live page
  - top subcategories by average engagement
  - top categories by average engagement
  - heatmap state/region × subcategory

- Items the governance docs say should not be treated as strong/canonical MVP truth, but that are still rendered in the current branch
  - `Serviços mapeados` KPI
  - `Distribuição de Fontes`
  - `Densidade de Sinais`
  - `Sentimento Predominante`
  - `Volume Relativo por Janela de Consulta`
  - `Distribuição de Fontes por Entidade`

In short: the actual `/analytics` page is currently a hybrid of a simpler national dashboard plus an older provisional deep-dive block; it has **not** yet been tightened to a heatmap/engagement-led MVP.

## 6. Data reliability / caveats

### Canonical or strongest current anchors

- Global total posts:
  - `resumo-executivo.json::total_posts`
  - validated by `sum(temporal-data.json::dados[].quantidade)`
- Monthly time series window:
  - `temporal-data.json`
- Last-update / period metadata derived from temporal coverage:
  - `app/src/data/analytics.ts`

### Usable with caveat

- Full category distribution:
  - aggregated from `heatmap-data.json`
- Category engagement:
  - from `engagement-categoria.json`
- Per-1,000 and shared-interaction context:
  - derived in part from `ranking_estados_12m.json`
- `CAAs ativas` and `Categorias ativas`
  - usable as analytics context, but still depend on current dataset coverage and reconciliation choices

### Still provisional / inferred

- Sentiment outputs
  - no canonical sentiment dataset is present in the repo; sentiment remains inferred
- Source/channel distribution outputs
  - no canonical source-by-channel dataset is present in the repo; channel splits remain inferred
- State-detail monthly history and category mix
  - current `/estados/:uf` data is generated/static, not canonical imported state analytics
- Ranking page truth claims
  - live ranking pages still render from `app/src/data/estados.ts` / `app/src/data/ranking.ts`, not directly from the stronger provisional ranking JSON

Lawyer totals reference status:

- The repository still does **not** contain a populated lawyer totals reference file under `data/reference/lawyer_totals/`.
- The directory exists, but currently only as `.gitkeep`.
- So the authoritative lawyer totals reference is still missing from the repo in actual branch state.

## 7. Current docs already created

Important docs already present under `docs/research/` and still worth treating as active references:

- `docs/research/chart_governance_matrix_20260309.md`
  - active reference for what should be homepage-safe, analytics-only, caveated, or hidden
- `docs/research/performance_followup_plan_20260309.md`
  - active reference for route splitting, homepage de-loading, and bundle-size follow-up

## 8. Next recommended work order

Based on the current real branch state only, the next work should happen in this order:

1. Align branch reality before further planning: treat this checked-out copilot branch as the real baseline unless the missing `feature/state-highlights-paraiba` branch is restored explicitly.
2. Split non-home routes from `app/src/main.tsx` so homepage no longer eagerly loads analytics/ranking/state pages.
3. Move `ParaibaSpotlight` off the homepage into a real dedicated route/page (`/destaques/paraiba`) only after route-level work is ready.
4. Tighten `/analytics` to the intended MVP by removing or demoting inferred visuals and implementing the missing engagement/heatmap-oriented views if those are still the target.
5. Reconcile analytics source-of-truth gaps next, especially CAA normalization and the still-missing authoritative lawyer totals reference.
