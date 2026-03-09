# Homepage extraction candidates

Documents the first three sections removed from `HomePage.tsx` and the target page each section will become once it has its own route.

## 1. EvidenciaPublicaSection → /iniciativas-publicas

**Component:** `app/src/components/home/EvidenciaPublicaSection.tsx`  
**Current data source:** `app/src/components/home/data.ts` (`ACOES_INSTITUCIONAIS`)  
**Target route:** `/iniciativas-publicas`

**Why it was extracted from the homepage:**  
The section lists every non-transactional institutional initiative with UF filtering. That level of detail is useful for targeted research but adds scroll weight to the executive landing page.

**What the target page should do:**  
- Display the full curated gallery of high-signal institutional initiatives  
- Preserve the UF filter chip row  
- Link each card to its original source  
- Stay out of: scoring models, exhaustive archive coverage, and technical schema explanations

---

## 2. ExemploTecnicoSection → /metodologia/exemplo-tecnico

**Component:** `app/src/components/home/ExemploTecnicoSection.tsx`  
**Current data source:** inline constants inside the component (canonical JSON record, sample query, and schema notes)  
**Target route:** `/metodologia/exemplo-tecnico`

**Why it was extracted from the homepage:**  
Technical audiences need the record shape, query logic, and schema conventions — general users do not. Keeping it on the homepage conflates the executive narrative with implementation detail.

**What the target page should do:**  
- Show the canonical record shape (JSON tab)  
- Show the sample boolean query logic (Query tab)  
- Show schema conventions and ingestion assumptions  
- Reference `schemas/` and `scripts/ingest/` for deeper context  
- Stay out of: product marketing copy and large dashboard embeds

---

## 3. CronogramaSection → /entrega

**Component:** `app/src/components/home/CronogramaSection.tsx`  
**Current data source:** `app/src/components/home/data.ts` (`TIMELINE_EVENTS`)  
**Target route:** `/entrega`

**Why it was extracted from the homepage:**  
The delivery timeline answers "what is done / what is next / what is blocked" — a project-status question that belongs on a dedicated page, not the top-level landing view.

**What the target page should do:**  
- Render the full `TIMELINE_EVENTS` list with status indicators  
- Optionally pull supporting implementation notes from `docs/` and `README.md`  
- Stay out of: analytics deep dives, evidence browsing, and service exploration
