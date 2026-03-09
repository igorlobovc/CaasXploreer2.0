# Report-to-Site Sitemap

## A. Page-by-page sitemap

### Homepage `/`
- Purpose: orientation and triage, not full report consumption.
- Keep the homepage as a compact landing page with:
  - product framing and national value proposition
  - a short executive-summary block
  - one methodology strip
  - one featured state spotlight
  - one evidence teaser
  - clear navigation cards/CTAs to Analytics, Ranking, and Estados
- Avoid keeping full report depth here once deeper pages are populated.

### Analytics `/analytics`
- Purpose: executive summary and national analytical reading.
- Main sections:
  - executive summary narrative
  - national KPI strip
  - time-series trends
  - category/source composition charts
  - methodology and metric notes
  - links out to Ranking for benchmarks and Estados for local drill-down

### Ranking `/ranking`
- Purpose: benchmark reading across states and categories.
- Main sections:
  - ranking by normalized performance
  - ranking by total volume
  - ranking by category/service family
  - benchmark deltas and movement notes
  - links to corresponding state detail pages

### Estados `/estados`
- Purpose: directory and discovery layer for state exploration.
- Main sections:
  - searchable/filterable state directory
  - region segmentation
  - compact comparative cards
  - spotlight entry points for states worth reading next
  - links to each `/estados/[uf]` detail page

### Estados `/estados/[uf]`
- Purpose: full state profile page.
- Main sections:
  - state spotlight summary
  - state KPI panel
  - category/service profile
  - evidence explorer filtered to the UF
  - state trend history
  - benchmark position versus national/ranking context

## B. What content belongs in each page

### Homepage `/`
- Keep:
  - `HeroSection` as the top-level positioning layer
  - a shortened form of `ComoFuncionaSection` as a four-step methodology teaser
  - a reduced executive-summary slice derived from `ProvisionalSimulationResultsSection`
  - a featured-state teaser from `ParaibaSpotlight`
  - a small evidence teaser from `StateEvidenceView` or `EvidenciaPublicaSection`
  - `FooterSection`
- Move off homepage as deeper pages mature:
  - the full taxonomy browser from `ServicosMapeadosSection`
  - the full evidence explorer from `StateEvidenceView`
  - the full non-transactional evidence gallery from `EvidenciaPublicaSection`
  - the full comparative analytics blocks from `ProvisionalSimulationResultsSection`
  - technical implementation content from `ExemploTecnicoSection` and `TecnologiaSection`
  - delivery timeline depth from `CronogramaSection`

### Analytics `/analytics`
- Primary home for:
  - executive summary content
  - national KPI narrative
  - trend charts and category/source composition
  - concise methodology and metric definitions
- Best current component/data sources to adapt from:
  - `AnalyticsPage`
  - summary/KPI blocks inside `ProvisionalSimulationResultsSection`
  - high-level framing from `ComoFuncionaSection`
- Content families assigned here:
  - executive summary content
  - secondary benchmark context that points to `/ranking`

### Ranking `/ranking`
- Primary home for:
  - ranking/benchmark content
  - state-versus-state comparison
  - category benchmark tables
  - movement/delta reading
- Best current component/data sources to adapt from:
  - `RankingPage`
  - comparative portions of `ProvisionalSimulationResultsSection` when they are benchmark-oriented
- Content families assigned here:
  - ranking/benchmark content

### Estados `/estados`
- Primary home for:
  - state discovery
  - region filtering
  - short directory-level comparisons
  - spotlight navigation to the most important state stories
- Best current component/data sources to adapt from:
  - `EstadosPage`
  - summary/teaser form of `ParaibaSpotlight`
- Content families assigned here:
  - state spotlight content in teaser form
  - high-level taxonomy/service coverage cues only when they help discovery

### Estados `/estados/[uf]`
- Primary home for:
  - state spotlight content
  - evidence explorer content
  - taxonomy/service catalog content for that UF
  - state-specific benchmarking context
- Best current component/data sources to adapt from:
  - `EstadoDetailPage`
  - `ParaibaSpotlight`
  - `StateEvidenceView`
  - `EvidenciaPublicaSection`
  - filtered/category-aware portions of `ServicosMapeadosSection`
- Content families assigned here:
  - state spotlight content
  - evidence explorer content
  - taxonomy/service catalog content

## C. What should remain on homepage

- Hero and positioning
- One-paragraph executive summary
- One compact methodology strip
- 3-way navigation choice:
  - Analytics for the national reading
  - Ranking for benchmark tables
  - Estados for local exploration
- One featured state spotlight
- One evidence teaser proving the data is inspectable
- Only enough taxonomy preview to show breadth, not the full catalog

### Homepage should not remain the primary home for
- full taxonomy/service catalog content
- full evidence explorer content
- full ranking/benchmark content
- full state profile content
- technical schema/stack deep dives
- report-delivery timeline detail once permanent pages exist

## D. Phased implementation order

### Phase 1 — tighten homepage around orientation
- Keep homepage focused on hero, short executive summary, methodology teaser, one state spotlight, and clear CTAs.
- Remove or demote sections that duplicate deeper pages.
- Goal: homepage stops behaving like the full report.

### Phase 2 — make `/analytics` the report’s main reading surface
- Expand Analytics as the primary home for executive summary content and national charts.
- Use it as the first “report converted to site” page because the repo governance already says analytics first.

### Phase 3 — deepen `/ranking`
- Move all benchmark-heavy reading into Ranking.
- Add category/service benchmark depth here before adding more homepage comparison blocks.

### Phase 4 — refine `/estados` and `/estados/[uf]`
- Keep `/estados` as the discovery layer.
- Make `/estados/[uf]` the home for state spotlights, service catalog by UF, and evidence exploration.
- This prevents the homepage from becoming a second state directory.

### Phase 5 — prune leftovers from homepage
- Once Analytics, Ranking, and state pages carry their own depth, reduce homepage sections to teasers only.
- Keep the homepage as a stable front door, not a dumping ground for every report chapter.
