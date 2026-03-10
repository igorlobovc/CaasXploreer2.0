# Performance follow-up plan — 2026-03-09

## Current context

- The production app still ships as a single main JavaScript bundle because `app/src/main.tsx` eagerly imports every route page up front (`App`, `AnalyticsPage`, `EvidenciasPage`, `RankingPage`, `ServicosPage`, `EstadosPage`, `EstadoDetailPage`).
- The latest production build from `app/` completed with a Vite chunk-size warning:
  - `dist/assets/index-4Ot4BMqy.js` → **994.52 kB** minified / **275.61 kB** gzip
  - Vite warning: “Some chunks are larger than 500 kB after minification. Consider using dynamic import() to code-split the application.”
- The heaviest analytic/chart surface is concentrated in pages that are already separated by route:
  - `app/src/pages/AnalyticsPage.tsx` imports `recharts` for line, bar, and pie charts.
  - `app/src/pages/EstadoDetailPage.tsx` imports `recharts` for line and bar charts.
- The homepage still renders deeper analytical/editorial sections directly:
  - `ProvisionalSimulationResultsSection`
  - `ParaibaSpotlight`
- Existing architecture docs already recommend keeping `/` lean and moving deeper analytics/state storytelling to dedicated routes.

## Best next low-risk performance improvements

### 1) Route-based splitting for non-home routes

**What to do**

- Convert route page imports in `app/src/main.tsx` to `React.lazy()` + `Suspense`.
- Split at minimum:
  - `/analytics`
  - `/ranking`
  - `/servicos`
  - `/evidencias`
  - `/estados`
  - `/estados/:uf`

**Why this is the best next step**

- It directly addresses the current build warning’s root cause: all route code is bundled into one initial chunk.
- The pages are already clean route boundaries, so this is a low-risk structural change with limited behavioral impact.
- It isolates the chart-heavy routes from the homepage without changing content or data logic.

**Expected outcome**

- The homepage stops paying the first-load cost for analytics/state/detail pages.
- `recharts` can move out of the main landing-page bundle automatically once chart pages are split.

## 2) Lazy-load or move homepage-heavy deep-dive sections

**What to do**

- Treat these homepage sections as optional/deeper content instead of eager first-load content:
  - `ProvisionalSimulationResultsSection`
  - `ParaibaSpotlight`
- Preferred low-risk path:
  - move them fully to dedicated pages already implied by the roadmap, or
  - lazy-load them behind interaction / below-the-fold suspense boundaries if they must remain on `/`.

**Why it matters**

- The homepage roadmap explicitly says `/` should stay executive-first and keep deeper analytical/state storytelling off the initial experience.
- `ProvisionalSimulationResultsSection` pulls in a large provisional analytics data stack and animated chart-like rendering even before the user chooses a deeper page.
- This is a content-aligned performance cleanup, not just a technical optimization.

**Expected outcome**

- Lower homepage execution/render cost after the main route split.
- Faster initial render for the executive landing page.

## 3) Reduce chart-related bundle cost

**What to do**

- After route splitting, make chart code even more selective:
  - keep `recharts` confined to analytics/detail routes
  - defer secondary charts on analytics/detail pages until visible
  - move provisional homepage comparative charts off `/`
  - consider a dedicated manual chunk for chart libraries only if route splitting alone does not reduce the warning enough

**Why it matters**

- `recharts` is only used in `AnalyticsPage` and `EstadoDetailPage`, so it should not influence the homepage bundle.
- The analytics page currently renders multiple chart families at once (line + bar + pie), which makes it the right place for the next layer of deferral after route splitting.
- This is lower priority than route splitting because its benefit compounds most cleanly once routes are no longer eager-loaded.

## Priority recommendation

### Top 3 actions

1. **Route-based splitting for all non-home routes**
2. **Lazy-load or move homepage-heavy deep-dive sections**
3. **Chart-related bundle reduction inside analytics/detail experiences**

### Which one should happen first

**Route-based splitting should happen first.**

### Why it should happen first

- It is the most direct response to the current Vite chunk warning.
- It is the lowest-risk change because the route boundaries already exist.
- It gives the biggest likely reduction in initial homepage cost without redesigning content.
- It also unlocks the other two improvements:
  - homepage deep dives become optional follow-ups instead of compensating for a monolithic route bundle
  - chart reductions become more targeted because chart code is no longer mixed into the first-load path
