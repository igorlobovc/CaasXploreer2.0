# Current Repository Tracks

This note captures the **current state** of the repository on the `copilot/inspect-repo-analytics-status` base branch, focusing on the active work surfaced in `app/`, `README.md`, and the directories requested for inspection.

## Scope inspected

- `app/`
- `data/` *(not present at repository root)*
- `docs/` *(created here for this note; no prior root docs tree was present)*
- `schemas/` *(not present at repository root)*
- `scripts/` *(not present at repository root)*

## Current repository shape

- The repository currently consists of a single deployable Vite/React app in `app/`.
- Routing is defined in `app/src/main.tsx` and exposes five active routes: `/`, `/analytics`, `/ranking`, `/estados`, and `/estados/:uf`.
- Analytics, state, and ranking data are stored as static TypeScript modules under `app/src/data/`, not as root-level JSON datasets.
- The root `README.md` acts as the current operational brief and sprint board, including the merge policy: analytics first, `/ranking` second, homepage selective later, while `/estados` and `/estados/[uf]` remain frozen.

## Active track 1 — State highlights / institutional UI

**Status:** Active in production-facing UI.

**What exists now**

- The homepage (`app/src/App.tsx`) includes a concrete `acoesInstitucionais` dataset with state-tagged institutional actions such as vaccination campaigns, sports events, and member benefits.
- `EvidenciaPublicaSection` renders those records as the “Ações Institucionais e Evidência Pública” experience, including UF filtering and source links.
- The state routes `/estados` and `/estados/:uf` remain active and are explicitly frozen for the current cycle by the root `README.md`.

**Why this track is active**

- It is the most mature “institutional” surface in the repo: it has real UI, specific records, and dedicated state-focused routes.
- The `README.md` governance text treats these routes as stable enough to freeze rather than rework.

## Active track 2 — Manual review taxonomy extraction

**Status:** Active conceptually and structurally, but still represented in-app rather than through a visible standalone extraction pipeline in this repo.

**What exists now**

- `app/src/App.tsx` defines the current canonical service buckets in `servicosPorCategoria`: Saúde, Benefícios, Financeiro, Esporte e Bem-estar, and Infraestrutura.
- The homepage timeline marks “Consolidação Conceitual” as completed and “Base Operacional” as current, describing a validated taxonomy and operational data pipeline.
- The analytics and state data modules reuse this same category model across national totals, state breakdowns, and rankings.

**What is missing from the repo root**

- There is no root-level `scripts/` or `schemas/` directory implementing or documenting a visible manual-review extraction process here.
- There is also no root-level `data/` directory containing canonical generated outputs.

**Current interpretation**

- The taxonomy work is active and central to the product narrative, but the repository currently exposes it mainly through UI copy and static TypeScript data structures rather than through checked-in ingestion/extraction assets in the root.

## Active track 3 — Provisional homepage analytics

**Status:** Active and visible, but clearly provisional.

**What exists now**

- `/analytics` is a live route wired in `app/src/main.tsx`.
- `app/src/pages/AnalyticsPage.tsx` renders KPI cards and charts using `analyticsSummary`, `historicoNacional`, `categoriesNacional`, and `sourceDistribution` from `app/src/data/analytics.ts`.
- The homepage in `app/src/App.tsx` also includes analytical sections describing the operating model, taxonomy, and simulated repercussion views.

**Why this track is provisional**

- The UI repeatedly labels key sections as “Dados simulados para demonstração analítica”.
- `app/src/data/analytics.ts` is a static hand-authored dataset covering Mar/2024–Fev/2025.
- `README.md` prioritizes analytics as the first live increment, which indicates the current repo is already oriented around getting this layer into a trusted merge-ready shape.

## Active track 4 — Fanpage Karma canonical ingestion

**Status:** Not yet implemented as a root-level ingestion pipeline; currently represented as a provisional external-signal concept in the UI.

**What exists now**

- The homepage section labeled “SINAL EXTERNO” in `app/src/App.tsx` describes repercussão externa from media and social networks.
- That section shows simulated KPIs such as “Menções Totais”, sentiment mix, and comparative charts.
- The technical copy later on the page references pipeline, schema versioning, and auditability as intended system capabilities.

**What is not present**

- No root-level `scripts/`, `schemas/`, or `data/` implementation exists for Fanpage Karma ingestion or canonical normalization in this repository snapshot.
- No checked-in ingestion code or canonical output files were found outside the app’s static TypeScript demo data.

**Current interpretation**

- This track is best understood as an intended future ingestion/canonicalization stream whose current visible footprint is a placeholder UI and architecture language, not an active checked-in ingestion subsystem.

## Supporting files by area

### `app/`

- Active application surface and the source of all current tracks.
- Key files:
  - `app/src/main.tsx`
  - `app/src/App.tsx`
  - `app/src/pages/AnalyticsPage.tsx`
  - `app/src/pages/RankingPage.tsx`
  - `app/src/pages/EstadosPage.tsx`
  - `app/src/pages/EstadoDetailPage.tsx`
  - `app/src/data/analytics.ts`
  - `app/src/data/estados.ts`
  - `app/src/data/ranking.ts`

### `data/`

- No root-level directory exists.
- The effective current data layer lives in `app/src/data/` as static TypeScript modules.

### `docs/`

- No root-level docs tree existed before this note.
- This file establishes `docs/architecture/` as the current documentation location for repository architecture notes.

### `schemas/`

- No root-level directory exists.
- Schema/versioning is referenced in homepage technical copy, but not materialized as standalone schema files here.

### `scripts/`

- No root-level directory exists.
- Pipeline language appears in the UI narrative, but not as repository-root automation in the current snapshot.

## Bottom line

The repository is currently an **app-first presentation and analytics prototype**. The active, visible tracks are:

1. **State highlights / institutional UI** — live and stable in the homepage and state routes.
2. **Manual review taxonomy extraction** — active as the organizing model for categories and operational narrative, but not exposed here as a root-level extraction pipeline.
3. **Provisional homepage analytics** — live and prioritized, backed by static TypeScript datasets and explicitly marked as simulated/provisional.
4. **Fanpage Karma canonical ingestion** — not yet implemented in checked-in root infrastructure; currently represented as an external-signal placeholder concept in the UI.
