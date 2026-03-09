# Chart governance matrix

Date: 2026-03-09
Branch reviewed: `feature/state-highlights-paraiba`

## Scope reviewed

- Homepage chart/KPI usage in `app/src/components/home/HomePage.tsx`
- Provisional homepage analytics adapter and source rules in:
  - `app/src/components/home/provisional/ProvisionalSimulationResultsSection.tsx`
  - `app/src/components/home/provisional/realDataAdapter.ts`
  - `app/src/components/home/provisional/analyticsSourceResolver.ts`
- National analytics data in `app/src/data/analytics.ts`
- Ranking data in `app/src/data/ranking.ts`
- State detail data in `app/src/data/estados.ts`

## Decision summary

### Homepage-safe charts

- `Menções Totais` KPI card
- `Intensidade Média por Tema` KPI card

### Analytics-page charts

- `Total de Interações` KPI
- `Interações Compartilhadas` KPI
- `Média por 1.000 advogados` KPI
- `Crescimento no período` KPI
- `CAAs ativas` KPI
- `Categorias ativas` KPI
- `Últ. atualização` KPI
- `Evolução Mensal de Interações`
- `Interações por Categoria`
- `Evolução Temporal de Menções por Tema`
- `Categorias por volume`

### Provisional charts requiring caveat

- `Intensidade Média por Tema`
- `Interações Compartilhadas`
- `Média por 1.000 advogados`
- `Crescimento no período`
- `CAAs ativas`
- `Categorias ativas`
- `Evolução Mensal de Interações`
- `Interações por Categoria`
- `Evolução Temporal de Menções por Tema`
- `Categorias por volume`

### Do not show yet

- `Densidade de Sinais`
- `Sentimento Predominante`
- `Volume Relativo por Janela de Consulta`
- `Distribuição de Fontes por Entidade`
- `Serviços mapeados`
- `Distribuição de Fontes`
- `Interações por 1.000 advogados`
- `Total absoluto de interações`
- `Histórico Mensal`
- `Interações por Categoria` (`/estados/:uf`)

## Governance matrix

| Surface | Current visual | Current source path(s) | Confidence | Target page | Governance note |
|---|---|---|---|---|---|
| Homepage | `Menções Totais` KPI card | `resumo-executivo.json::total_posts`, validated against `temporal-data.json::sum(dados[].quantidade)` | canonical | homepage | Safe as executive headline metric. Existing source-priority docs already treat this as the strongest homepage KPI candidate. |
| Homepage | `Intensidade Média por Tema` KPI card | `realDataAdapter.ts` computes `totalMentions / categoryCount`; category count comes from aggregated `heatmap-data.json` with fallback to engagement categories | usable with caveat | homepage | Acceptable only if labeled as derived from aggregate category coverage, not as a direct observed metric. |
| Homepage | `Densidade de Sinais` KPI card | `realDataAdapter.ts::classifySignalDensity(postsPerCaa, medianSharedPer1000)` using threshold buckets | do not show yet | /analytics | This is a qualitative bucket produced by local rules, not a source-backed field. Keep out of headline surfaces until a canonical density definition exists. |
| Homepage | `Sentimento Predominante` KPI card | `realDataAdapter.ts::buildPredominantSentimentLabel(sentimentVolumeByWindow)` | do not show yet | /analytics | `analyticsSourceResolver.ts` explicitly marks sentiment as inferred because no canonical sentiment dataset exists. |
| Homepage | `Volume Relativo por Janela de Consulta` | `realDataAdapter.ts::buildSentimentVolumeByWindow()` using engagement baseline, momentum and clamp rules | do not show yet | /analytics | The chart looks precise but is fully proxy-based. Hold until a real sentiment/source dataset lands. |
| Homepage | `Evolução Temporal de Menções por Tema` | Canonical monthly totals from `temporal-data.json`, split proportionally by aggregate theme shares from `heatmap-data.json` in `buildTopicTimeline()` | usable with caveat | /analytics | Useful directional chart, but each monthly series is inferred from a national split, not observed per-month topic counts. |
| Homepage | `Distribuição de Fontes por Entidade` | `realDataAdapter.ts::buildEntitySourceDistribution()` using category mix, ranking top service and engagement as proxies | do not show yet | /analytics | The implementation comments explicitly say there are no canonical source-channel fields yet and the mapping is a weak proxy. |
| Analytics | `Total de Interações` KPI | `analytics.ts::totalMentions`, sourced from `resumo-executivo.json` or temporal sum fallback | canonical | /analytics | Strong national total; safe as the top analytics KPI. |
| Analytics | `Interações Compartilhadas` KPI | `analytics.ts` derives value from `sharedRatio = totalRankingShared / totalRankingInteractions` and applies it to totals | usable with caveat | /analytics | Derived from ranking-level shared ratios rather than a canonical monthly shared-interaction series. |
| Analytics | `Média por 1.000 advogados` KPI | `analytics.ts` computes `(totalMentions / totalAdvogadosMapeados) * 1000` | usable with caveat | /analytics | Solid normalization, but still a computed ratio that mixes total mentions with mapped-advocate counts from another dataset. |
| Analytics | `Crescimento no período` KPI | `AnalyticsPage.tsx` computes growth from `historicoNacional` | usable with caveat | /analytics | Good as an analytics KPI, but it is a derived rate rather than a source field. |
| Analytics | `CAAs ativas` KPI | `analytics.ts` uses `resumo-executivo.total_caas` or `uniqueCaas.size` from heatmap fallback | usable with caveat | /analytics | Coverage varies by dataset, so the label should stay in a deeper analytics context rather than homepage. |
| Analytics | `Categorias ativas` KPI | `analytics.ts::categoryTotals.size` from `heatmap-data.json` | usable with caveat | /analytics | Straightforward count, but still dependent on current taxonomy coverage. |
| Analytics | `Serviços mapeados` KPI | `analytics.ts` counts unique `${caa}:${categoria}` pairs | do not show yet | /analytics | The current implementation is not actually counting services; it counts CAA-category combinations, so the label is misleading. |
| Analytics | `Últ. atualização` KPI | End of `temporal-data.json` window | canonical | /analytics | Safe metadata field for the national dashboard. |
| Analytics | `Evolução Mensal de Interações` | `historicoNacional` from `temporal-data.json`, with shared interactions derived by ratio | usable with caveat | /analytics | Keep on analytics. The total-interactions line is strong; the shared line should be treated as derived. |
| Analytics | `Interações por Categoria` | `categoriesNacional` aggregated from `heatmap-data.json`, with trend/service annotations from `engagement-categoria.json` | usable with caveat | /analytics | Good for exploration, but category trend/service semantics are proxy-based rather than canonical service inventory. |
| Analytics | `Distribuição de Fontes` | `analytics.ts::rawSourceWeights` heuristics normalized to 100% | do not show yet | /analytics | Same issue as the homepage source chart: the percentages are heuristic, not observed. |
| Ranking | `Interações por 1.000 advogados` | `ranking.ts` sorts `estadosData`, which is a hand-authored static array in `estados.ts` | do not show yet | /ranking | This page should eventually use `ranking_estados_12m.json`, but it currently does not. |
| Ranking | `Total absoluto de interações` | `ranking.ts` sorts `estadosData.totalInteracoes` | do not show yet | /ranking | Same governance issue as above: rendered ranking is not sourced from the canonical ranking JSON. |
| Ranking | `Categorias por volume` | `ranking.ts` ranks `categoriesNacional` from aggregated heatmap totals | usable with caveat | /ranking | The ranking behavior is sound enough for a ranking page, but still inherits caveats from the category aggregation layer. |
| Estado detail | `Histórico Mensal` | `estados.ts::monthlyHistory()` synthesizes each state series with `deterministicFactor()` | do not show yet | /estados/[uf] | This is generated data, not observed state history. It should not appear until real state timelines exist. |
| Estado detail | `Interações por Categoria` | Hard-coded category values inside each `estadosData` entry | do not show yet | /estados/[uf] | Current state detail categories are local mock values rather than imported state-level analytics. |

## Notes behind the strongest calls

1. `analyticsSourceResolver.ts` already records `Sentimento Predominante` and `Distribuição de Fontes por Canal` as inferred use cases, so those visuals should not be promoted as current truth.
2. The homepage provisional adapter is honest in naming (`ProvisionalSimulationResultsSection`), but the governance move should now split that block into:
   - safe executive metrics,
   - deeper analytics charts,
   - inferred charts that stay hidden until source upgrades arrive.
3. `ranking_estados_12m.json` exists and looks much stronger than the current ranking/state page implementation, but `RankingPage` and `EstadoDetailPage` do not render from it yet.
