# Homepage final core — 2026-03-09

## Goal
Define the long-term homepage core after analytics depth moves to `/analytics`.

## Sources reviewed
- `app/src/components/home/HomePage.tsx`
- `app/src/main.tsx`
- `docs/report-to-site-sitemap.md`
- `docs/phased-build-roadmap.md`
- `docs/homepage-executive-chart-audit.md`
- `docs/homepage-analytics-implementation-state.md`
- `docs/homepage-analytics-next-work-buckets.md`
- `docs/agent-handoff-homepage-analytics.md`

## Current homepage baseline
`HomePage.tsx` currently renders, in order:
1. `HeroSection`
2. `ComoFuncionaSection`
3. `ServiceTaxonomySection`
4. `EvidenceTeaserSection`
5. `ServicosTeaserSection`
6. `EvidenciaPublicaSection`
7. `ProvisionalSimulationResultsSection`
8. `ParaibaSpotlight`
9. `ExemploTecnicoSection`
10. `TecnologiaSection`
11. `CronogramaSection`
12. `FooterSection`

The latest planning docs are consistent on one direction:
- homepage becomes an orientation/front-door surface
- `/analytics` becomes the primary home for national analytical reading
- deeper taxonomy, evidence, technical, and delivery detail should leave the homepage as dedicated pages mature

## Long-term homepage core
These are the sections/content types that should remain on the homepage long-term:

1. **Hero and positioning**
   - keep `HeroSection`
   - preserve the product framing and national value proposition

2. **Compact executive summary**
   - keep a one-paragraph executive summary
   - keep a compact KPI strip / executive snapshot derived from the current analytics block
   - keep only framing that explains the numbers at a high level

3. **Compact methodology teaser**
   - keep a shortened `ComoFuncionaSection`
   - use it as a quick “how this works” strip, not a long explainer

4. **Primary navigation / CTAs**
   - keep clear handoffs to `/analytics`, `/ranking`, and `/estados`
   - homepage should route users to the deeper pages instead of duplicating them

5. **One featured state teaser**
   - keep one featured-state spotlight in teaser form
   - current source is `ParaibaSpotlight`, but long-term it should read as a teaser, not a full state narrative

6. **One evidence teaser**
   - keep one compact evidence proof point showing the data is inspectable
   - this should be teaser-level only

7. **Minimal taxonomy preview**
   - keep only enough taxonomy/service preview to show breadth
   - do not keep the full taxonomy browser on the homepage

8. **Footer**
   - keep `FooterSection`

## Must stay on homepage
- `HeroSection`
- shortened `ComoFuncionaSection`
- compact executive-summary paragraph
- compact KPI/executive snapshot from the current analytics section
- CTA/navigation layer to `/analytics`, `/ranking`, and `/estados`
- teaser version of `ParaibaSpotlight`
- one evidence teaser (`EvidenceTeaserSection` or a reduced evidence slice)
- minimal taxonomy preview (`ServicosTeaserSection` or a reduced slice)
- `FooterSection`

## Temporary sections still allowed for now
These are acceptable during the transition, but they are not part of the final long-term core:

- `ProvisionalSimulationResultsSection` **temporarily**, while `/analytics` fully absorbs the comparative charts and certified narrative
- fuller `ServiceTaxonomySection` **temporarily**, until `/servicos` becomes the real home for taxonomy depth
- fuller `ParaibaSpotlight` **temporarily**, until the state-detail / state-highlight flow is mature
- fuller `EvidenciaPublicaSection` **temporarily**, until `/evidencias` and `/estados/:uf` absorb the deeper evidence reading
- `ExemploTecnicoSection`, `TecnologiaSection`, and `CronogramaSection` **temporarily**, only as transition leftovers until their dedicated methodology / delivery destinations are established

## Sections that must leave later
These should not remain as permanent homepage residents:

### Move to `/analytics`
- the comparative charts inside `ProvisionalSimulationResultsSection`
  - `Volume Relativo por Janela de Consulta`
  - `Evolução Temporal de Menções por Tema`
  - `Distribuição de Fontes por Entidade`
- the closing comparative-analysis paragraph tied to those charts
- any deeper national analytics narrative beyond the compact executive summary/KPI teaser

### Move to `/servicos`
- the full taxonomy browser / full service-catalog depth from `ServiceTaxonomySection`

### Move to `/evidencias` and/or `/estados/:uf`
- the full evidence explorer behavior
- the full non-transactional evidence gallery from `EvidenciaPublicaSection`
- full state-storytelling depth from `ParaibaSpotlight`

### Move to methodology / delivery pages
- `ExemploTecnicoSection`
- `TecnologiaSection`
- `CronogramaSection`

## Final decision
The long-term homepage should be a **lean orientation page**:
- positioning
- compact executive snapshot
- quick methodology cue
- one state teaser
- one evidence teaser
- minimal taxonomy preview
- strong handoff to deeper pages

It should **stop behaving like the full report** once `/analytics` owns the analytical depth.
