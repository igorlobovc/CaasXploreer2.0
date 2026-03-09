# Current Repo Tracks — CAAsXploreer2.0

> **One-line operating rule:** GitHub repo is the implementation base. Kimi is the structure/reference layer. Fanpage Karma backbone and ingestion structure come before UI polish.

---

## 1. Product purpose

CAAsXploreer2.0 is a **statewide service-intelligence site** for Brazilian CAAs (Caixas de Assistência dos Advogados). Its core goals are:

- Easy checking of services by state (UF)
- Category and subcategory comparison
- Raw and normalised performance metrics
- Evidence-backed linked sources
- Region-by-region synthesis
- Current-vs-predecessor period comparisons
- Fanpage Karma as the backbone for P1 and P2 historical/benchmark layers
- YouScan only for the rolling P3 pulse layer

---

## 2. Analysis periods (fixed)

| ID | Name | Source family | Range / window |
|----|------|---------------|----------------|
| **P1** | Historical / structural | Fanpage Karma | 2022-03-16 → 2026-02-13 |
| **P2** | Leadership / benchmark | Fanpage Karma | Current: 2025-01-01 → 2026-03-31 · Comparison: 2023-01-01 → 2024-03-31 |
| **P3** | Pulse | YouScan | Rolling last 28 days (pending; do not fabricate) |

---

## 3. Data pipeline tracks

### 3.1 Ingestion pipeline

```
data/raw/external_batches/   ← original source files (XLSX, CSV)
data/raw/fanpagekarma/       ← normalised FPK intermediates
data/raw/youscan/            ← normalised YouScan intermediates
data/raw/scraping/           ← web-scraping outputs
↓
data/processed/period_1/     ← P1 service-index outputs
data/processed/period_2/     ← P2 benchmark outputs
data/processed/period_3/     ← P3 pulse outputs (pending)
data/processed/shared/       ← cross-period shared derivatives
↓
data/reference/              ← canonical dictionaries & look-ups
  states/
  caa_dictionary/
  category_dictionary/       ← 12 categories
  subcategory_dictionary/    ← 41 subcategories
  lawyer_totals/
  source_maps/
```

Status codes used throughout:
- **canonical** — approved for product decisions
- **provisional** — usable with explicit caveats
- **pending** — structure exists, data not yet ingested

### 3.2 Taxonomy reference

Generated from the QA manual review CSV via:

```bash
python3 scripts/ingest/generate_service_taxonomy.py
```

Current counts: **12 categories · 41 subcategories · 46 services · 8 clusters/themes**

### 3.3 Schemas

Planned contracts in `schemas/`:

| Schema file | Covers |
|-------------|--------|
| `raw_fanpagekarma_post.schema.json` | Raw FPK post record |
| `processed_period_1_service_index.schema.json` | P1 service index row |
| `processed_period_2_benchmark.schema.json` | P2 benchmark row |
| `processed_period_3_pulse.schema.json` | P3 pulse row |
| `evidence_item.schema.json` | Evidence / source record |

---

## 4. Application tracks

### 4.1 Tech stack

- **Framework:** React 18 + Vite + TypeScript
- **Routing:** HashRouter (react-router-dom v7) — GitHub Pages compatible
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages from `app/dist`; base path `/CaasXploreer2.0/`

### 4.2 Routes

| Path | Component | Status |
|------|-----------|--------|
| `/` | `HomePage` | Active |
| `/analytics` | `AnalyticsPage` | Active |
| `/ranking` | `RankingPage` | Active |
| `/estados` | `EstadosPage` | **Frozen this cycle** |
| `/estados/:uf` | `EstadoDetailPage` | **Frozen this cycle** |

### 4.3 App component structure

```
app/src/
  App.tsx                  ← thin wrapper, renders <HomePage>
  main.tsx                 ← HashRouter + route definitions
  components/
    home/                  ← modular homepage sections
      HeroSection.tsx
      ServicosMapeadosSection.tsx
      EvidenciaPublicaSection.tsx
      ComoFuncionaSection.tsx
      TecnologiaSection.tsx
      CronogramaSection.tsx
      ExemploTecnicoSection.tsx
      FooterSection.tsx
      HomeBackground.tsx
      provisional/         ← provisional analytics integration layer
        ProvisionalSimulationResultsSection.tsx
        realDataAdapter.ts
        realDataTypes.ts
        analyticsSourceResolver.ts
        data/              ← runtime provisional JSONs
    shared.tsx             ← shared UI primitives
    ui/                    ← shared UI components
  data/
    analytics.ts
    estados.ts
    ranking.ts
  lib/
    analytics.ts           ← analytics helpers
  pages/
    AnalyticsPage.tsx
    RankingPage.tsx
    EstadosPage.tsx
    EstadoDetailPage.tsx
```

### 4.4 Provisional analytics layer

Runtime JSONs consumed by `ProvisionalSimulationResultsSection`:

- `temporal-data.json`
- `heatmap-data.json`
- `engagement-categoria.json`
- `resumo-executivo.json`
- `caa-data.json`
- `ranking_estados_12m.json`

> These provisional JSONs are **not** the final product backbone — they are an intermediate integration layer only.

---

## 5. Documentation tracks

| Folder | Contents |
|--------|----------|
| `docs/methodology/` | Ingestion architecture, pipeline rules |
| `docs/reconciliation/` | Anomaly & reconciliation notes |
| `docs/ai_handoff/` | Cross-session AI handoff master file |
| `docs/architecture/` | This file and future architectural records |

---

## 6. Governance rules

- **Analytics first** → `/ranking` second → homepage selective later
- Preserve `data/` registry files; do not overwrite without ingestion/reconciliation logic
- Do **not** rewrite stable routes casually
- Keep `/estados` and `/estados/:uf` frozen during the current cycle
- **Do not authorise merge** if the Sudeste anomaly is unresolved
- Do not dump external XLSX files randomly into the repo; follow the 5-step ingestion principle

---

## 7. Known gaps / pending work

1. **Main classified batch not yet ingested** — `MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.xlsx` and related files are outside the repo
2. **P3 (YouScan pulse)** — structure present, data pending
3. **All `data/processed/` folders** are currently empty (`.gitkeep` only)
4. **Sudeste anomaly** — must be validated before any merge touching analytics
5. **Schema files** — planned but not yet created
6. **Lawyer totals source** — authoritative source not yet confirmed

---

## 8. Immediate next task

> **Create a clean ingestion structure for the useful external classified Fanpage Karma batch and document provenance before any broader feature work.**

Files and folders allowed to change in this task:
- `data/raw/…`
- `data/reference/…`
- `data/processed/…`
- `schemas/…`
- `docs/methodology/…`
- `docs/reconciliation/…`
- Minimal helper scripts in `scripts/ingest/`

Files and folders **not** to touch:
- `app/dist`
- Route files (`app/src/main.tsx`)
- Ranking / state pages
- Visual homepage components (unless directly required for ingestion documentation)
