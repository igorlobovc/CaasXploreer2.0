# Homepage Analytics Validation Report

Date: 2026-03-08  
Mode: Read-only validation (no source-code or data-file changes)

Scope analyzed:
- `app/src/components/home/provisional/data/resumo-executivo.json`
- `app/src/components/home/provisional/data/temporal-data.json`
- `app/src/components/home/provisional/data/caa-data.json`
- `app/src/components/home/provisional/data/heatmap-data.json`
- `app/src/components/home/provisional/data/ranking_estados_12m.json`
- `app/src/components/home/provisional/data/engagement-categoria.json`

## A. File-by-file summary

### `resumo-executivo.json`
- Shape: summary object with headline totals, top lists, and period bounds.
- Key fields: `total_posts=6357`, `total_caas=20`, `periodo.inicio=2024-01-31 13:24:03`, `periodo.fim=2026-02-27 21:00:00`.
- Provides: global totals + top-5 categories + top-5 CAAs + textual insights.
- Limitation: category totals are partial (`top_categorias` only), not full category breakdown.

### `temporal-data.json`
- Shape: monthly time series object (`dados[]` of `{mes, quantidade}`).
- Coverage: 26 months (`2024-01` to `2026-02`).
- Sum of monthly `quantidade`: `6357`.
- Strong overlap: exactly matches `resumo-executivo.total_posts`.

### `caa-data.json`
- Shape: CAA activity list (`dados[]`) + CAA engagement list (`engagement[]`).
- `dados`: 15 CAAs, sum `4145`.
- `engagement`: 15 CAAs; `total_posts` sum `2831`.
- Strong internal clue: `dados` values exactly match a subset of `heatmap-data` CAA totals (15 of 20 CAAs).
- Limitation: appears subset/filtered for CAA coverage, not full universe.

### `heatmap-data.json`
- Shape: granular rows by `{caa, categoria, quantidade}`.
- Coverage: 129 rows, 20 CAAs, 9 categories.
- Sum of `quantidade`: `4450`.
- Categories match exactly with `engagement-categoria` category names.
- Limitation: global total does not match `resumo/temporal` total posts.

### `ranking_estados_12m.json`
- Shape: array of 21 ranking rows with per-1000 interaction metrics and `top_servico`.
- Coverage: 21 CAAs (`rank_absoluto` 1..21).
- Provides comparative interaction intensity metrics (`shared_interactions_per_1000_advs`).
- Limitation: CAA code namespace and service taxonomy differ from other files (e.g., `CAASE` vs `CAAES`, and labels like `Eventos Sociais` / `Vacinação`).

### `engagement-categoria.json`
- Shape: category engagement object (`dados[]` of `{categoria, engagement_medio, total_posts}`).
- Coverage: 9 categories (same names as `heatmap`).
- Sum of `total_posts`: `2972`.
- Provides useful engagement rate per category.
- Limitation: totals suggest subset coverage compared with global totals.

## B. Metric overlap map

| Metric/use case | Available in | Observed alignment |
|---|---|---|
| Global total posts | `resumo.total_posts`, `sum(temporal.dados.quantidade)` | Exact match: `6357` vs `6357` |
| Time-series volume | `temporal.dados` | Canonical monthly series present (26 months) |
| Top 5 CAAs by volume | `resumo.top_caas`, `caa.dados`, aggregated `heatmap` | Exact count match for the top 5 CAAs |
| Full CAA volume distribution | aggregated `heatmap` (20 CAAs), `caa.dados` (15 CAAs) | `caa.dados` is exact subset of `heatmap` |
| Category volume distribution | aggregated `heatmap`, `resumo.top_categorias` | Category names align, totals do not |
| Category engagement rates | `engagement-categoria.dados`, `caa.engagement` | Both are engagement-specific, but on different groupings and partial coverage |
| Per-capita signal density | `ranking_estados_12m` | Present, but CAA/taxonomy normalization needed |
| Sentiment | none canonical | Currently inferred only |
| Source/channel split | none canonical | Currently inferred only |

## C. Inconsistencies found

1. Global totals diverge by dataset family:
- `resumo.total_posts = 6357`
- `sum(temporal) = 6357`
- `sum(caa.dados) = 4145`
- `sum(heatmap) = 4450`
- `sum(engagement-categoria.total_posts) = 2972`
- `sum(caa.engagement.total_posts) = 2831`

2. CAA coverage diverges:
- `resumo.total_caas = 20`
- `heatmap` has 20 CAAs
- `caa.dados` has 15 CAAs
- `ranking` has 21 CAAs

3. CAA code namespace mismatch across files:
- Example: `CAAES` appears in `caa/heatmap`, while `CAASE` appears in `ranking`.
- Additional ranking-only codes appear without direct peers in `heatmap/caa` (e.g., `CAAPR`, `CAAMT`, `CAAAL`, `CAAAP`, `CAABA`).

4. Taxonomy mismatch in service labels:
- `heatmap/engagement-categoria` categories: 9-theme taxonomy.
- `ranking.top_servico` introduces labels not in heatmap taxonomy (`Eventos Sociais`, `Vacinação`).

5. Category totals mismatch between summary and granular sources:
- `resumo.top_categorias` counts are materially higher than heatmap totals for same labels.
- Therefore, `resumo.top_categorias` and `heatmap` are not directly interchangeable as one canonical category-total source.

## D. Proposed KPI source priority

Detailed matrix: `docs/homepage-kpi-source-priority-matrix.md`.

Operational proposal:
- Menções Totais (global):
  - Primary: `resumo-executivo.total_posts`
  - Validation check: `sum(temporal-data.dados.quantidade)` must match
- Janela Temporal / Evolução mensal:
  - Primary: `temporal-data.dados`
- Top CAAs (cards/highlights):
  - Primary: `resumo-executivo.top_caas`
  - Validation check: values must match `caa-data.dados` or aggregated `heatmap` for those CAAs
- Distribuição completa por CAA (if needed):
  - Primary: aggregated `heatmap-data` (20 CAAs)
  - Fallback: `caa-data.dados` only where explicit 15-CAA subset is acceptable
- Distribuição por Categoria (volume):
  - Primary (provisional): aggregated `heatmap-data`
  - `resumo.top_categorias` should be treated as summary highlight, not full-distribution authority
- Densidade de Sinais / intensidade per capita:
  - Primary: `ranking_estados_12m` after CAA code normalization
- Engagement por Categoria:
  - Primary: `engagement-categoria`
- Sentimento predominante:
  - No canonical source available; keep as inferred/provisional
- Fontes por canal:
  - No canonical source available; keep as inferred/provisional

## E. Confidence level by KPI

| KPI/use case | Confidence | Why |
|---|---|---|
| Menções Totais | High | Exact cross-file match (`resumo` and `temporal`) |
| Série temporal mensal | High | Direct monthly canonical structure in `temporal-data` |
| Top 5 CAAs | High | Exact numeric alignment across `resumo`, `caa`, and `heatmap` for those entries |
| Full CAA distribution | Medium | Available in `heatmap`, but conflicts with ranking namespace and global totals |
| Category distribution (volume) | Medium-Low | Category names align, but totals conflict with summary counts |
| Category engagement | Medium | Structured and consistent taxonomy, but partial total coverage |
| Per-capita signal density | Medium-Low | Useful ranking metrics, but requires CAA/taxonomy normalization |
| Sentiment | Low | No canonical sentiment dataset present |
| Source/channel distribution | Low | No canonical source-channel dataset present |

## F. Unresolved questions

1. What is the official semantic definition of `quantidade` in each file (posts, interactions, or filtered events)?
2. Should homepage global totals always be anchored to `resumo/temporal`, regardless of lower totals in heatmap/caa/engagement datasets?
3. Is `caa-data.dados` intentionally a 15-CAA curated subset, and if so, what inclusion rule was used?
4. Should ranking CAA identifiers be normalized to the same namespace used in heatmap/caa/resumo?
5. Which taxonomy is canonical for `top_servico` labels (`heatmap` 9-category taxonomy vs ranking labels)?
6. Is there an official sentiment dataset and an official source-by-channel dataset not yet included in repo?

## G. Safest next implementation step after validation

Implement a **non-UI, read-only source resolver specification** (documentation + optional utility draft) that:
- codifies canonical source precedence per KPI,
- defines validation checks (hard/soft assertions),
- defines CAA code normalization map for ranking alignment,
- and blocks adapter behavior changes until those rules are approved.
