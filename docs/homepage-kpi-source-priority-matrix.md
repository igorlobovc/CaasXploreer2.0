# Homepage KPI Source Priority Matrix

Date: 2026-03-08

| Homepage KPI / Use case | Primary source | Secondary/validation source | Status | Notes |
|---|---|---|---|---|
| Menções Totais (global) | `resumo-executivo.total_posts` | `sum(temporal-data.dados.quantidade)` | Canonical candidate | Currently exact match: `6357`. |
| Volume temporal por mês | `temporal-data.dados` | `resumo.periodo` (range sanity) | Canonical candidate | 26 months from `2024-01` to `2026-02`. |
| Top CAAs (resumo cards) | `resumo-executivo.top_caas` | `caa-data.dados`, aggregated `heatmap` | Canonical candidate | Top 5 values align exactly. |
| Distribuição completa por CAA | Aggregated `heatmap-data` | `caa-data.dados` (subset check) | Provisional canonical | `caa-data.dados` is a 15-CAA subset of heatmap totals. |
| Distribuição por categoria (volume) | Aggregated `heatmap-data` | `resumo.top_categorias` (highlight only) | Provisional canonical | Category names align; totals diverge materially. |
| Engagement médio por categoria | `engagement-categoria.dados` | none | Provisional canonical | Coverage appears partial (`total_posts=2972`). |
| Densidade de sinais per capita | `ranking_estados_12m` | none | Provisional canonical | Requires CAA code/taxonomy normalization. |
| Sentimento predominante | none in current files | inferred only | Inferred (non-canonical) | Replace when canonical sentiment dataset exists. |
| Fontes por canal (Instagram/Facebook/Portais/Blogs/Outros) | none in current files | inferred only | Inferred (non-canonical) | Replace when canonical source-by-channel dataset exists. |
