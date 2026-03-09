# CAAsXploreer2.0 - SINGLE AI HANDOFF MASTER FILE

## Repo and execution base

- **Repo:** `igorlobovc/CaasXploreer2.0`
- **Implementation base:** GitHub repo, not Kimi
- **Reference product layer:** Kimi preview / similar structure only
- **Current important branch from prior work:** `copilot/update-project-instructions`
- **Open PR from prior work:** `#16` - homepage refactor + provisional analytics integration
- **Main working rule:** GitHub is the base implementation layer; Kimi is only reference.

## Product purpose

CAAsXploreer2.0 should become a **statewide service-intelligence site** for Brazilian CAAs, focused on:

- easy checking of services by state
- category and subcategory comparison
- raw and normalized performance
- evidence-backed linked sources
- region-by-region synthesis
- current vs predecessor comparison where relevant
- Fanpage Karma as the backbone for historical and benchmark periods
- YouScan only for the rolling pulse layer

This is **not** just a homepage polish project.

## Fixed analysis periods

### P1 - Historical / structural layer
- **Source family:** Fanpage Karma
- **Range:** `2022-03-16` to `2026-02-13`

### P2 - Leadership / benchmark layer
- **Source family:** Fanpage Karma
- **Current period:** `2025-01-01` to `2026-03-31`
- **Comparison period:** `2023-01-01` to `2024-03-31`

### P3 - Pulse layer
- **Source family:** YouScan
- **Range:** rolling last 28 days
- If missing, keep structure pending and do **not** fabricate data

## What the final useful version must contain

### Core entities
- state / UF
- region
- CAA branch
- service
- category
- subcategory
- source / evidence item
- platform
- post / content item
- period
- benchmark / comparison slice

### Final data families
- statewide service index
- category comparison tables
- subcategory comparison tables
- regional synthesis tables
- raw totals
- normalized totals per professional / lawyer base
- current vs predecessor comparison outputs
- evidence-linked source layer
- completeness / confidence / QA flags

### Evidence fields required
- source URL
- platform
- source type
- state / UF
- CAA name
- category
- subcategory
- service
- post/content title or descriptor
- date
- evidence confidence
- completeness
- analytical use
- canonical / provisional status

### Metric families required
- post volume
- interaction totals
- shared interactions
- average engagement
- normalized engagement
- normalized service performance
- service frequency
- category frequency
- subcategory frequency
- benchmark deltas
- period-over-period deltas

### QA / confidence fields required
- canonical vs provisional
- source family
- confidence score
- completeness score
- reconciliation note
- anomaly flag
- normalization source
- provenance note

## What is already known from prior work

### Homepage / app structure work already done
- modular homepage components under `app/src/components/home/`
- shared primitives under `app/src/components/shared.tsx`
- `app/src/App.tsx` reduced to thin wrapper
- provisional analytics section wired to runtime JSON files
- adapter/resolver pattern introduced

### Provisional analytics files already relevant
- `app/src/components/home/provisional/ProvisionalSimulationResultsSection.tsx`
- `app/src/components/home/provisional/realDataAdapter.ts`
- `app/src/components/home/provisional/realDataTypes.ts`
- `app/src/components/home/provisional/analyticsSourceResolver.ts`

### Runtime provisional JSONs already used
- `app/src/components/home/provisional/data/temporal-data.json`
- `app/src/components/home/provisional/data/heatmap-data.json`
- `app/src/components/home/provisional/data/engagement-categoria.json`
- `app/src/components/home/provisional/data/resumo-executivo.json`
- `app/src/components/home/provisional/data/caa-data.json`
- `app/src/components/home/provisional/data/ranking_estados_12m.json`

### Important limitation
Those provisional JSONs are **not enough** to represent the final product goal. They are only an intermediate integration layer.

## Critical external data not yet cleanly ingested into GitHub

The useful classified batch was **not yet properly added into the repo**.

Important external files:
- `MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.xlsx`
- `MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_20250308.xlsx`
- and any related canonical classified Fanpage Karma batch

This means:
- Kimi classification work may exist outside GitHub
- repo may still lack the full useful Fanpage Karma backbone
- next AI must verify what is in repo versus what is still external

## GitHub Projects / governance rules already defined

These rules are part of the project operating model and should be preserved unless explicitly changed:

- analytics first
- `/ranking` second
- homepage selective later
- preserve public/data registry files
- do not rewrite stable routes casually
- keep `/estados` and `/estados/[uf]` frozen during this cycle
- do not authorize merge if the Sudeste anomaly is unresolved

## Existing GitHub Projects task model to preserve

### Analytics
- confirm analytics package consistency
- validate Sudeste anomaly
- list trusted analytics files

### Integration
- inspect target repo structure
- map candidate package to target repo
- identify minimal live version
- prepare `/ranking` readiness checklist

### Presentation
- draft executive analytics narrative
- create service-ranking presentation table spec
- draft homepage section strategy aligned to Kimi reference structure

### Project control / governance / decision
- review README/project text
- organize GitHub project cards
- inspect Kimi package artifacts
- confirm lawyer totals source
- decide target repo for first live increment
- approve minimal live scope
- record merge policy
- consolidate 24h checkpoint

## Correct implementation direction

### Keep as implementation base
- repo structure
- branch / PR workflow
- routing
- modular homepage code
- adapter/resolver pattern where useful

### Treat as reference only
- Kimi preview structure
- Kimi filters
- Kimi enriched service browsing
- Kimi section ordering
- Kimi evidence presentation patterns

### Do NOT prioritize
- badges/icons as primary work
- homepage micro-polish first
- route rewrites
- broad visual redesign
- random doc sprawl

## Correct repo structure target

```text
data/
	raw/
		fanpagekarma/
		youscan/
		scraping/
		external_batches/
	reference/
		states/
		caa_dictionary/
		category_dictionary/
		subcategory_dictionary/
		lawyer_totals/
		source_maps/
	processed/
		period_1/
		period_2/
		period_3/
		shared/
schemas/
content/
	report/
	state_profiles/
	app/
charts/
	specs/
docs/
	methodology/
	reconciliation/
	ai_handoff/
app/
	src/
		components/
		lib/
```

## Exact ingestion principle

Do not dump external XLSX files randomly into the repo.

For each external classified batch:
1. store original source files in a raw/external source area
2. create normalized derivatives
3. create canonical processed outputs
4. add provenance / caveats / coverage note
5. define whether each output is canonical or provisional

## Files and areas the next AI should NOT touch casually

- `app/dist`
- `node_modules`
- `.vite`
- route structure in `app/src/main.tsx`
- ranking/state pages unless explicitly required:
	- `src/pages/AnalyticsPage.tsx`
	- `src/pages/RankingPage.tsx`
	- `src/pages/EstadosPage.tsx`
	- `src/pages/EstadoDetailPage.tsx`
- provisional JSON source files should not be rewritten blindly without ingestion/reconciliation logic

## Practical unknowns that must be verified first

The next AI must confirm:

1. Does the repo already contain any real Fanpage Karma-derived canonical dataset beyond provisional homepage JSONs?
2. Did any of the Kimi classification outputs actually make it into GitHub?
3. Is there already category/subcategory-ready processed data in repo?
4. Which external files are authoritative?
5. Is the Sudeste anomaly real?
6. Which lawyer totals source is fixed and authoritative?

## Single next task

### Next task
**Create a clean ingestion structure for the useful external classified Fanpage Karma batch and document provenance before any broader feature work.**

### Goal
Make the repo ready for another AI to ingest the useful classified batch in a traceable, non-chaotic way.

### Files/folders allowed to change
- `data/raw/...`
- `data/reference/...`
- `data/processed/...`
- `schemas/...`
- `docs/methodology/...`
- `docs/reconciliation/...`
- minimal helper scripts for ingestion

### Files/folders not to touch
- `app/dist`
- route files
- ranking/state pages
- visual homepage components unless directly needed for ingestion documentation

### Definition of done
- clean folder structure exists
- provenance metadata file exists
- ingestion script placeholders or first script exists
- canonical vs provisional boundary is documented

## Exact first prompts for the next AI

### Prompt 1 - verify repo reality
```text
Inspect the current repo and tell me clearly whether it already contains:
1. Fanpage Karma-derived data
2. Kimi-generated categorization/classification outputs
3. category/subcategory-ready processed files
4. only provisional homepage JSONs versus a full analytics backbone

Return only:
A. confirmed Fanpage Karma files already in repo
B. confirmed classification/categorization files already in repo
C. what is missing from repo but exists outside it
D. the single next ingestion task needed
```

### Prompt 2 - ingestion structure
```text
The useful classified batch is NOT yet cleanly in GitHub. We need to ingest it into the repo in a structured, traceable, non-chaotic way.

Return only:
A. exact target folders/files to create
B. exact filenames to use
C. what should be committed as-is versus transformed first
D. the first ingestion script(s) that should exist
E. the minimum provenance/metadata doc that should be created
F. the single safest first implementation step
```

### Prompt 3 - final product reorientation
```text
Reorient CAAsXploreer2.0 correctly.

Target product:
a statewide service-intelligence site using Fanpage Karma as backbone for P1 and P2, and YouScan only for P3.

Return only:
A. exact final data model
B. exact repo structure
C. exact implementation order in 5 phases max
D. first 8 GitHub issues/tasks to open
```

## One-line operating rule

**GitHub repo is the implementation base. Kimi is the structure/reference layer. Fanpage Karma backbone and ingestion structure come before UI polish.**
