# Data Pipeline Architecture — CAAsXploreer 2.0

> **Status**: Reference document · Last updated: 2026-03  
> **Scope**: Full data lifecycle from external source ingestion to frontend rendering

---

## Table of Contents

1. [Overview](#1-overview)
2. [Structural Inconsistencies Identified](#2-structural-inconsistencies-identified)
3. [Duplicated Data Modules Detected](#3-duplicated-data-modules-detected)
4. [Proposed Clean Architecture](#4-proposed-clean-architecture)
5. [Ingestion Flow](#5-ingestion-flow)
6. [Normalization Layer](#6-normalization-layer)
7. [Processed Analytics Layer](#7-processed-analytics-layer)
8. [Frontend Data Layer](#8-frontend-data-layer)
9. [Migration Roadmap](#9-migration-roadmap)

---

## 1. Overview

CAAsXploreer 2.0 is a Brazilian CAA service-intelligence platform. It processes social-media and web data from **Fanpage Karma** and **YouScan** across three fixed analysis periods, producing interactive analytics for all 27 Brazilian states.

The data lifecycle has four distinct stages:

```
External Sources
      │
      ▼
[1] RAW INGEST          data/raw/
      │
      ▼
[2] NORMALIZATION        data/normalized/
      │
      ▼
[3] PROCESSED ANALYTICS  data/processed/
      │
      ▼
[4] FRONTEND DATA LAYER  app/src/data/
      │
      ▼
    React UI             app/src/components/ + app/src/pages/
```

Each layer has a clear owner, a defined contract, and a one-way dependency: upstream layers must never import from downstream layers.

---

## 2. Structural Inconsistencies Identified

### 2.1 Missing `data/normalized/` Directory

The `docs/methodology/ingestion-architecture.md` documents a four-step pipeline where **step 2 is normalization** ("convert to typed intermediates under source-specific raw folders"). However, no `data/normalized/` directory existed in the repository — the pipeline jumped directly from `data/raw/` to `data/processed/`. This gap has been corrected in this PR by adding:

```
data/normalized/
├── fanpagekarma/   # typed NDJSON/Parquet intermediates from Fanpage Karma XLSX
├── youscan/        # typed intermediates from YouScan exports
└── scraping/       # typed intermediates from web-scraping pipelines
```

### 2.2 Provisional JSON Data Embedded in the Component Tree

Six JSON dataset files live inside the UI component hierarchy:

```
app/src/components/home/provisional/data/
├── caa-data.json
├── engagement-categoria.json
├── heatmap-data.json
├── ranking_estados_12m.json
├── resumo-executivo.json
└── temporal-data.json
```

These files are **analytical datasets**, not UI assets. Storing them inside `components/` blurs the boundary between the view layer and the data layer, and makes it impossible to swap in canonical data without touching component code.

**Target location:** `app/src/data/provisional/` (see §4.3).

### 2.3 Cross-Layer Import in `app/src/data/analytics.ts`

`app/src/data/analytics.ts` — which is part of the frontend data layer — imports directly from the component tree:

```typescript
// analytics.ts — CURRENT (incorrect coupling)
import temporalDataSource    from '@/components/home/provisional/data/temporal-data.json';
import resumoExecutivoSource from '@/components/home/provisional/data/resumo-executivo.json';
import heatmapDataSource     from '@/components/home/provisional/data/heatmap-data.json';
import engagementCategoriaSource from '@/components/home/provisional/data/engagement-categoria.json';
import rankingEstadosSource  from '@/components/home/provisional/data/ranking_estados_12m.json';
```

The data layer must not depend on component-level assets. After the migration in §4.3, these imports will resolve to `app/src/data/provisional/`.

### 2.4 Analytics Business Logic Inside `components/home/provisional/`

The following files contain **data transformation and diagnostic logic** — they belong in the data or lib layer, not inside a UI component folder:

| File | Current location | Correct layer |
|------|-----------------|---------------|
| `realDataAdapter.ts` | `components/home/provisional/` | `app/src/data/` |
| `analyticsSourceResolver.ts` | `components/home/provisional/` | `app/src/lib/` |
| `realDataTypes.ts` | `components/home/provisional/` | `app/src/data/` |
| `simulatedData.ts` | `components/home/provisional/` | `app/src/data/provisional/` |

`ProvisionalSimulationResultsSection.tsx` is the only legitimate UI component in `provisional/` — it should remain in `components/home/`.

### 2.5 `data/` Has No `normalized/` Layer But `ingestion-architecture.md` Defines One

As noted in §2.1, the methodology document describes a four-stage pipeline, but the directory tree skips normalization entirely. This creates an ambiguity: where do scripts write their typed intermediate output before period-specific processing?

### 2.6 Ad-hoc Analytics Documents Scattered at `docs/` Root

Eleven markdown files sit at the top level of `docs/` with no subdirectory grouping:

```
docs/adapter-diagnostics-homepage-analytics.md
docs/agent-handoff-homepage-analytics.md
docs/ai-execution-note-homepage-analytics.md
docs/homepage-analytics-implementation-state.md
docs/homepage-analytics-next-work-buckets.md
docs/homepage-analytics-validation-report.md
docs/homepage-kpi-source-priority-matrix.md
docs/pr-review-checklist-homepage-analytics.md
docs/review-readiness-homepage-analytics.md
docs/validate-homepage-analytics-source-of-truth.md
```

These belong in a `docs/analytics/` or `docs/implementation/` subdirectory for discoverability and long-term maintenance.

---

## 3. Duplicated Data Modules Detected

### 3.1 `MONTH_NAMES_PT` Constant Defined Twice

The Portuguese month-names array is copy-pasted verbatim in two independent modules:

| File | Line |
|------|------|
| `app/src/data/analytics.ts` | 54 |
| `app/src/components/home/provisional/realDataAdapter.ts` | 42 |

**Fix:** Extract to a shared constant in `app/src/lib/utils.ts` or a new `app/src/lib/format.ts`.

### 3.2 `totalMentions` Computation Duplicated

Both `analytics.ts` (lines 112–115) and `realDataAdapter.ts` independently compute the total post/mention count by falling back from `resumoExecutivoSource.total_posts` to a temporal-sum aggregate. The fallback logic is structurally identical in both modules.

**Fix:** Expose a single `resolveTotalMentions(resumo, temporalRows)` helper in `app/src/lib/analytics.ts`.

### 3.3 `sharedRatio` Heuristic Duplicated

The `sharedRatio` metric (shared interactions ÷ total interactions, defaulting to `0.35`) is computed inline in `analytics.ts` (line 85) and in `realDataAdapter.ts`. This magic default must live in a single place.

**Fix:** Export `DEFAULT_SHARED_RATIO = 0.35` and `calcSharedRatio()` from `app/src/lib/analytics.ts`.

### 3.4 CAA-Coverage and Category-Coverage Validation Logic

`analyticsSourceResolver.ts` contains `getSetDifferences()` and `toSortedUnique()` — generic set-utility helpers that are not analytics-specific and could appear in future scripts.

**Fix:** Move to `app/src/lib/utils.ts` (already present for other utilities).

---

## 4. Proposed Clean Architecture

### 4.1 Repository Directory Tree (Target State)

```
CaasXploreer2.0/
├── data/
│   ├── raw/                        # [LAYER 1] Immutable originals
│   │   ├── external_batches/       # Drop zone; register in batch_registry.csv
│   │   ├── fanpagekarma/           # Fanpage Karma exports (.xlsx / .csv)
│   │   ├── youscan/                # YouScan exports
│   │   └── scraping/               # Raw scraping dumps
│   ├── normalized/                 # [LAYER 2] Typed intermediates  ← ADDED
│   │   ├── fanpagekarma/           # Post-wall rows → typed NDJSON
│   │   ├── youscan/                # YouScan events → typed NDJSON
│   │   └── scraping/               # Scraping records → typed NDJSON
│   ├── processed/                  # [LAYER 3] Period-specific analytics outputs
│   │   ├── period_1/               # Historical/structural (2022-03-16 → 2026-02-13)
│   │   ├── period_2/               # Leadership/benchmark (2025 vs 2023 YoY)
│   │   ├── period_3/               # Pulse (rolling 28 days, YouScan)
│   │   └── shared/                 # Cross-period lookup tables
│   └── reference/                  # Static reference tables (never pipeline output)
│       ├── states/
│       ├── caa_dictionary/
│       ├── category_dictionary/
│       ├── subcategory_dictionary/
│       ├── lawyer_totals/
│       └── source_maps/
│
├── schemas/                        # JSON Schema contracts per layer
│   ├── raw_fanpagekarma_post.schema.json
│   ├── normalized_post.schema.json
│   ├── processed_period_1_service_index.schema.json
│   ├── processed_period_2_benchmark.schema.json
│   ├── processed_period_3_pulse.schema.json
│   └── evidence_item.schema.json
│
├── scripts/
│   └── ingest/
│       ├── register_external_batch.py   # Hash + register raw files
│       ├── normalize_fanpagekarma.py    # XLSX → typed NDJSON (normalized/)
│       ├── normalize_youscan.py         # YouScan export → typed NDJSON
│       └── process_periods.py           # Normalized → period analytics outputs
│
├── app/
│   └── src/
│       ├── data/                        # [LAYER 4] Frontend data layer
│       │   ├── provisional/             # Provisional JSON snapshots  ← MOVED
│       │   │   ├── caa-data.json
│       │   │   ├── engagement-categoria.json
│       │   │   ├── heatmap-data.json
│       │   │   ├── ranking_estados_12m.json
│       │   │   ├── resumo-executivo.json
│       │   │   ├── temporal-data.json
│       │   │   └── simulatedData.ts     # Simulated fallback data
│       │   ├── types/                   # Shared data type definitions  ← MOVED
│       │   │   └── analyticsTypes.ts    # (from provisional/realDataTypes.ts)
│       │   ├── analytics.ts             # National analytics (imports from data/provisional/)
│       │   ├── estados.ts               # State data
│       │   └── ranking.ts               # Rankings
│       │
│       ├── lib/
│       │   ├── analytics.ts             # Computation helpers + resolver  ← EXPANDED
│       │   ├── format.ts                # Formatting helpers (MONTH_NAMES_PT etc.)  ← NEW
│       │   └── utils.ts                 # Generic utilities (incl. set helpers)
│       │
│       ├── components/
│       │   ├── home/
│       │   │   ├── provisional/
│       │   │   │   └── ProvisionalSimulationResultsSection.tsx  ← KEEP (UI only)
│       │   │   ├── HomePage.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   └── ...
│       │   ├── ui/                      # Shadcn/ui primitives (untouched)
│       │   └── shared.tsx
│       │
│       └── pages/                       # Route pages (frozen during current cycle)
│           ├── AnalyticsPage.tsx
│           ├── RankingPage.tsx
│           ├── EstadosPage.tsx
│           └── EstadoDetailPage.tsx
│
└── docs/
    ├── architecture/                    # Architecture docs  ← NEW
    │   └── data_pipeline_architecture.md
    ├── analytics/                       # Analytics-specific implementation docs  ← NEW
    │   ├── adapter-diagnostics-homepage-analytics.md
    │   ├── homepage-analytics-implementation-state.md
    │   ├── homepage-analytics-validation-report.md
    │   ├── homepage-analytics-next-work-buckets.md
    │   ├── homepage-kpi-source-priority-matrix.md
    │   └── validate-homepage-analytics-source-of-truth.md
    ├── ai_handoff/
    │   └── CAAsXploreer2_SINGLE_AI_HANDOFF_MASTER_FILE.md
    ├── methodology/
    │   └── ingestion-architecture.md
    └── reconciliation/
        ├── batch_intake_template.md
        └── fanpagekarma_batch_provenance.md
```

### 4.2 Datasets Layer (`data/`)

| Directory | Role | Mutability |
|-----------|------|------------|
| `data/raw/` | Immutable originals — byte-for-byte copies of every received file | Append-only |
| `data/normalized/` | Source-converted typed intermediates (NDJSON, Parquet) — one schema per source family | Written by normalization scripts |
| `data/processed/` | Period-specific analytics outputs ready for product decisions | Written by processing scripts; read by frontend data layer |
| `data/reference/` | Static lookup tables (states, CAA codes, OAB lawyer totals) — not pipeline output | Human-maintained |

### 4.3 Frontend Data Layer (`app/src/data/`)

The frontend data layer is the **only** part of the application that may read data files. Component code must import data through this layer — never directly from `provisional/data/` or from `data/processed/`.

```
app/src/data/
├── provisional/          # Provisional JSON snapshots (until canonical processed/ data is ready)
│   ├── *.json            # Moved from components/home/provisional/data/
│   └── simulatedData.ts
├── types/
│   └── analyticsTypes.ts # Shared TypeScript interfaces (moved from realDataTypes.ts)
├── analytics.ts          # Derives national analytics from provisional/ or processed/
├── estados.ts            # Per-state metrics
└── ranking.ts            # Derived rankings
```

The import path in `analytics.ts` changes from:

```typescript
// BEFORE (crosses layer boundary)
import temporalDataSource from '@/components/home/provisional/data/temporal-data.json';
```

to:

```typescript
// AFTER (correct layer)
import temporalDataSource from './provisional/temporal-data.json';
```

### 4.4 Processed Analytics Layer (`data/processed/`)

Each period directory holds one or more JSON output files produced by the processing scripts. The canonical schema for each is defined in `schemas/`.

```
data/processed/
├── period_1/
│   └── service_index.json          # CAA × category × month interaction matrix (P1)
├── period_2/
│   └── benchmark.json              # YoY leadership benchmark outputs (P2)
├── period_3/
│   └── pulse.json                  # Rolling 28-day YouScan signal (P3)
└── shared/
    └── estado_ranking.json         # Cross-period state ranking with lawyer normalization
```

When canonical processed outputs exist, the frontend data layer (`app/src/data/analytics.ts`) must switch its import source from `data/provisional/` to `data/processed/`. The `analyticsSourceResolver.ts` logic (priority rules) governs this switching.

---

## 5. Ingestion Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SOURCES                           │
│  Fanpage Karma (XLSX)   YouScan (export)   Web scraping (CSV/JSON)  │
└──────────────┬─────────────────┬──────────────────┬────────────────┘
               │                 │                  │
               ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 1 — RAW INGEST                           data/raw/            │
│                                                                     │
│  1. Place file in data/raw/external_batches/ (unchanged)            │
│  2. Run: python scripts/ingest/register_external_batch.py <file>    │
│  3. Append CSV row to data/raw/external_batches/batch_registry.csv  │
│  4. Create intake note from docs/reconciliation/batch_intake_template.md │
│                                                                     │
│  Status after step: batch_registry row status = "raw_received"      │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 2 — NORMALIZATION                    data/normalized/         │
│                                                                     │
│  Script: scripts/ingest/normalize_fanpagekarma.py                   │
│  Script: scripts/ingest/normalize_youscan.py                        │
│                                                                     │
│  Transforms:                                                        │
│  • XLSX rows → typed NDJSON records (one line = one post)           │
│  • Validate fields against schemas/raw_fanpagekarma_post.schema.json│
│  • Apply reference lookups (CAA codes, category taxonomy)           │
│  • Emit: data/normalized/fanpagekarma/<batch_id>.ndjson             │
│                                                                     │
│  Status after step: batch_registry row status = "normalized"        │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 3 — PERIOD PROCESSING                   data/processed/       │
│                                                                     │
│  Script: scripts/ingest/process_periods.py                         │
│                                                                     │
│  Reads: data/normalized/**/*.ndjson                                 │
│  Reads: data/reference/lawyer_totals/                               │
│                                                                     │
│  Produces:                                                          │
│  • data/processed/period_1/service_index.json  (P1: 2022–2026)      │
│  • data/processed/period_2/benchmark.json      (P2: YoY comparison) │
│  • data/processed/period_3/pulse.json          (P3: 28-day pulse)   │
│  • data/processed/shared/estado_ranking.json                        │
│                                                                     │
│  Status after step: batch_registry row status = "processed"         │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│  STEP 4 — RECONCILIATION & CANONICAL PROMOTION                      │
│                                                                     │
│  • QA analyst or AI reviews diagnostics from analyticsSourceResolver│
│  • Checks for: Sudeste anomaly, CAA-coverage mismatches, taxonomy   │
│    drift between heatmap and engagement sources                     │
│  • Documents decision in docs/reconciliation/<batch_id>_intake.md  │
│  • Updates batch_registry.csv: canonical_status = "canonical"       │
│                                                                     │
│  Only after canonical_status = "canonical":                         │
│  • Frontend data layer switches imports from provisional/ → processed/│
└─────────────────────────────────────────────────────────────────────┘
```

### Ingestion Status State Machine

```
raw_received → normalized → processed → canonical
                                     ↘ provisional  (interim usable state)
                   ↑
              (anomaly detected — hold in normalized, do not promote)
```

| Status | Meaning | Can feed frontend? |
|--------|---------|-------------------|
| `pending` | File expected but not yet received | No |
| `raw_received` | File present, registered, not yet normalized | No |
| `normalized` | Typed intermediates exist | No (not yet aggregated) |
| `processed` | Period outputs exist, under review | As `provisional` with explicit caveat |
| `canonical` | QA-approved, anomaly-free | Yes — primary source |
| `provisional` | Used while canonical is pending | Yes — with caveat banner |

---

## 6. Normalization Layer

### Purpose

The normalization layer converts source-specific binary/tabular formats into a **uniform typed record format** that is independent of the source system. It is the only layer that understands the raw file format (XLSX column names, encoding, date formats).

### Input Contract

- **Fanpage Karma XLSX**: Each row is one post, columns include `CAA`, `date`, `platform`, `likes`, `shares`, `comments`, `category_classified`, `subcategory_classified`.
- **YouScan export**: Each row is one mention/signal with `source_url`, `date`, `state_code`, `topic`, `sentiment`.

### Output Contract

Normalized files are written to `data/normalized/<source_family>/<batch_id>.ndjson`. Each line is a JSON object conforming to the schema in `schemas/normalized_post.schema.json`. Minimum required fields:

```jsonc
{
  "batch_id": "fpk_2022_2026_v2_20250308",
  "source_family": "fanpagekarma",
  "post_date": "2024-06-15",
  "caa_code": "CASAG",
  "state_uf": "SP",
  "platform": "instagram",
  "category": "Campanha de Vacinação",
  "subcategory": "Vacina HPV",
  "likes": 142,
  "shares": 31,
  "comments": 8,
  "engagement_rate": 0.0065,
  "period_tags": ["P1", "P2"]   // derived from post_date
}
```

### Reference Enrichment

The normalization script resolves:
- `caa_code` → `state_uf` via `data/reference/caa_dictionary/`
- raw category strings → canonical taxonomy via `data/reference/category_dictionary/`
- `platform` label normalisation (e.g. "FB" → "facebook") via `data/reference/source_maps/`

---

## 7. Processed Analytics Layer

### Purpose

The processed analytics layer materializes **period-specific aggregate outputs** that are ready for product consumption. Scripts read from `data/normalized/` and `data/reference/`, and write to `data/processed/`.

### Three Fixed Analysis Periods

| Period | Identifier | Source | Date Range | Output File |
|--------|-----------|--------|------------|-------------|
| P1 | `period_1` | Fanpage Karma | 2022-03-16 → 2026-02-13 | `service_index.json` |
| P2 | `period_2` | Fanpage Karma | 2025-01-01 → 2026-03-31 vs 2023-01-01 → 2024-03-31 | `benchmark.json` |
| P3 | `period_3` | YouScan | Rolling last 28 days | `pulse.json` |

### Output Schemas

**`data/processed/period_1/service_index.json`**

```jsonc
{
  "generated_at": "2026-03-01T00:00:00Z",
  "batch_ids": ["fpk_2022_2026_v2_20250308"],
  "period": { "start": "2022-03-16", "end": "2026-02-13" },
  "temporal_series": [{ "mes": "2022-03", "total_posts": 45 }, ...],
  "caa_matrix": [{ "caa_code": "CASAG", "categoria": "Saúde Mental", "total": 88 }, ...],
  "category_totals": [{ "categoria": "Campanha de Vacinação", "total": 1464 }, ...],
  "estado_ranking": [{ "uf": "SP", "total_interactions": 14200, "total_advs": 380000 }, ...]
}
```

**`data/processed/period_2/benchmark.json`**

```jsonc
{
  "generated_at": "2026-03-01T00:00:00Z",
  "current_period": { "start": "2025-01-01", "end": "2026-03-31" },
  "comparison_period": { "start": "2023-01-01", "end": "2024-03-31" },
  "caa_benchmark": [
    { "caa_code": "CASAG", "current_total": 312, "prior_total": 256, "yoy_delta_pct": 21.9 }
  ]
}
```

**`data/processed/period_3/pulse.json`**

```jsonc
{
  "generated_at": "2026-03-09T00:00:00Z",
  "window_days": 28,
  "signals": [
    { "date": "2026-02-10", "topic": "Planos de Saúde", "volume": 34, "sentiment_score": 0.62 }
  ]
}
```

---

## 8. Frontend Data Layer

### Purpose

The frontend data layer (`app/src/data/`) is the **single entry point** through which the React application accesses data. It must:

1. Import only from `app/src/data/provisional/` (current state) or `app/src/data/processed/` (future canonical state).
2. Never import directly from `app/src/components/`.
3. Export typed TypeScript interfaces and constants consumed by pages and components.

### Current State vs Target State

| Concern | Current (inconsistent) | Target (clean) |
|---------|----------------------|----------------|
| Provisional JSON location | `app/src/components/home/provisional/data/` | `app/src/data/provisional/` |
| Data types | `components/home/provisional/realDataTypes.ts` | `app/src/data/types/analyticsTypes.ts` |
| Adapter logic | `components/home/provisional/realDataAdapter.ts` | `app/src/data/provisionalAdapter.ts` |
| Source resolver | `components/home/provisional/analyticsSourceResolver.ts` | `app/src/lib/analyticsSourceResolver.ts` |
| Simulated fallback | `components/home/provisional/simulatedData.ts` | `app/src/data/provisional/simulatedData.ts` |
| Month formatting | Duplicated in `analytics.ts` and `realDataAdapter.ts` | `app/src/lib/format.ts` (single source) |

### Import Graph (Target State)

```
app/src/pages/AnalyticsPage.tsx
    └── imports from app/src/data/analytics.ts
            └── imports from app/src/data/provisional/*.json   (until canonical)
                   OR from app/src/data/processed/*.json        (when canonical)
            └── imports from app/src/lib/analytics.ts          (helpers)
            └── imports from app/src/lib/format.ts             (formatMonth etc.)

app/src/pages/RankingPage.tsx
    └── imports from app/src/data/ranking.ts
            └── imports from app/src/data/analytics.ts
            └── imports from app/src/data/estados.ts

app/src/components/home/HomePage.tsx
    └── imports from app/src/data/analytics.ts
    └── contains app/src/components/home/provisional/
            └── ProvisionalSimulationResultsSection.tsx
                    └── imports from app/src/data/provisionalAdapter.ts
```

### Canonical vs Provisional Switching

The source resolver (`app/src/lib/analyticsSourceResolver.ts`) defines a priority rule table. Each use-case has a `level` field:

- `canonical` — imports from `data/processed/` outputs
- `provisional` — imports from `data/provisional/` JSON snapshots
- `inferred` — derived from proxies; must display a data-quality caveat in the UI

The switching strategy is **import-level**, not runtime: when a canonical processed output is ready and QA-approved, the import statement in `analytics.ts` is updated and the `level` upgraded to `canonical`. No runtime feature-flags are needed for the current scale.

---

## 9. Migration Roadmap

The following tasks resolve the inconsistencies in §2 and §3 in priority order. Each task is independent and can be executed separately.

| Priority | Task | Files affected | Effort |
|----------|------|---------------|--------|
| **P0** | Add `data/normalized/` directory structure | `data/normalized/` (new) | Done ✅ |
| **P1** | Move provisional JSON files from `components/home/provisional/data/` to `app/src/data/provisional/` | 6 JSON files + imports in `analytics.ts` and `realDataAdapter.ts` | Small |
| **P1** | Move `realDataTypes.ts` to `app/src/data/types/analyticsTypes.ts` | 1 file + import updates | Small |
| **P2** | Move `realDataAdapter.ts` to `app/src/data/provisionalAdapter.ts` | 1 file + import updates | Small |
| **P2** | Move `analyticsSourceResolver.ts` to `app/src/lib/` | 1 file + import updates | Small |
| **P3** | Extract `MONTH_NAMES_PT` and `formatMonth` to `app/src/lib/format.ts` | 2 files | Small |
| **P3** | Deduplicate `resolveTotalMentions` and `calcSharedRatio` helpers into `app/src/lib/analytics.ts` | 2 files | Small |
| **P4** | Move `simulatedData.ts` to `app/src/data/provisional/` | 1 file + import updates | Small |
| **P5** | Reorganise `docs/` root — move ad-hoc analytics docs to `docs/analytics/` | 11 files | Trivial |
| **P5** | Add normalization and processing scripts stubs | `scripts/ingest/normalize_fanpagekarma.py`, `normalize_youscan.py`, `process_periods.py` | Medium |

> **Note:** P0 is complete (this PR). P1–P5 are recommended as a follow-up cycle once the first canonical Fanpage Karma batch has been ingested and the Sudeste anomaly is resolved.

---

*This document was generated as part of the Architecture Health Task. For ingestion boundary rules, see also `docs/methodology/ingestion-architecture.md`. For batch provenance, see `docs/reconciliation/`.*
