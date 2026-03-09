# Phased build roadmap by page

## A. Phased rollout by page

### Phase 1

| A. Page | B. Page purpose | C. Required data source by page | D. What should stay off each page initially |
| --- | --- | --- | --- |
| `/` Homepage | Executive-first landing page with the core story: what CAAs are doing well, where the strongest signals are, and where to go next. Keep it lean, summary-led, and decision-oriented. | `app/src/data/analytics.ts` for headline KPIs, `app/src/data/ranking.ts` for top winners, and at most a small curated proof point from `app/src/data/manualReviewEvidence.ts` or `app/src/components/home/data.ts`. | Full taxonomy browser, full evidence explorer, long technical explanations, Paraíba deep dive, public-initiatives gallery, technology/stack section, and delivery timeline. |
| `/analytics` | National dashboard for the monitored window, focused on KPI validation and macro trends. | `app/src/data/analytics.ts`, backed by `app/src/components/home/provisional/data/resumo-executivo.json`, `temporal-data.json`, `heatmap-data.json`, `engagement-categoria.json`, and `ranking_estados_12m.json`. | Long narrative copy, state-by-state evidence browsing, service taxonomy exploration, and technical implementation details. |
| `/ranking` | Fast answer to “who is leading?” with normalized, absolute, and category views. | `app/src/data/ranking.ts`, `app/src/data/analytics.ts`, and derived state inputs from `app/src/data/estados.ts`. | Download center, methodology appendix per row, evidence cards, and editorial state spotlights. |
| `/estados` | Coverage index for all mapped states, optimized for discovery and routing into a detail page. | `app/src/data/estados.ts`. | Full evidence records, public initiatives catalog, cross-state comparison builder, and methodology content. |
| `/estados/:uf` | State detail page with KPI snapshot, monthly history, and category mix for one UF. | `app/src/data/estados.ts` (`estadoByUF` / `estadosData`). | Manual-review evidence table, public-initiative gallery, multi-state compare, and long editorial storytelling. |

### Phase 2

| A. Page | B. Page purpose | C. Required data source by page | D. What should stay off each page initially |
| --- | --- | --- | --- |
| `/servicos` | Dedicated taxonomy page for browsing mapped services by category without overloading the homepage. | `app/src/components/home/data.ts` (`SERVICOS_POR_CATEGORIA`) now; later expand with `data/reference/category_dictionary/categories.json`, `data/reference/subcategory_dictionary/subcategories.json`, and `data/reference/service_dictionary/services.json`. | Personalized recommendations, advanced filters, benchmark scoring, and evidence-level drilldowns. |
| `/destaques/paraiba` | First state-highlight page that turns the current Paraíba spotlight into a reusable editorial template. | `app/src/components/state/stateSpotlights.ts`, `app/src/components/state/paraibaSpotlight.data`, and supporting context from `app/src/data/estados.ts`. | Rollout to every state, comparative benchmarking across states, and dense chart packs. |
| `/evidencias` | Searchable evidence explorer for normalized manual-review records by UF, category, service, and entity. | `app/src/data/manualReviewEvidence.ts`, which loads `data/normalized/manual_review/manual_review.preview.json`. | Full raw dataset downloads, analyst tooling, and narrative homepage copy. |
| `/iniciativas-publicas` | Curated gallery of high-signal non-transactional institutional initiatives with source links. | `app/src/components/home/data.ts` (`ACOES_INSTITUCIONAIS`). | Exhaustive archive coverage, scoring models, and technical schema explanations. |

### Phase 3

| A. Page | B. Page purpose | C. Required data source by page | D. What should stay off each page initially |
| --- | --- | --- | --- |
| `/metodologia/exemplo-tecnico` | Show the canonical record shape, sample query logic, and schema conventions for technical reviewers. | `app/src/components/home/ExemploTecnicoSection.tsx`, `schemas/`, and related ingestion assumptions in `scripts/ingest/`. | Broad product marketing copy and large dashboard embeds. |
| `/metodologia/tecnologia` | Explain the ingestion, taxonomy, auditability, and export stack for operators and reviewers. | `docs/methodology/ingestion-architecture.md`, `scripts/ingest/`, and `data/reference/`. | Executive narrative, ranking tables, and state-by-state storytelling. |
| `/entrega` | Delivery roadmap / implementation status page for what is done, what is next, and what remains blocked. | `app/src/components/home/data.ts` (`TIMELINE_EVENTS`), `README.md`, and supporting implementation notes in `docs/`. | Analytics deep dives, evidence browsing, and service exploration. |
