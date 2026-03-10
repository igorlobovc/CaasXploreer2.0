# A. keep on homepage
- `ProvisionalSimulationResultsSection` headline KPI cards (`kpis`)
- The section-level framing that explains the homepage is showing an executive external-signal snapshot, not a full analytical workspace

# B. move to analytics later
- `Volume Relativo por Janela de Consulta`
- `Evolução Temporal de Menções por Tema`
- `Distribuição de Fontes por Entidade`
- The closing comparative-analysis paragraph under `Comparativos Analíticos`

# C. move to state detail later
- `ParaibaSpotlight`
- `StateEvidenceView`
- `EvidenciaPublicaSection`

# D. rationale for each move
- **Homepage KPI cards → keep on homepage**
  - They are the fastest executive read on scale and signal strength.
  - They preserve the homepage’s role as a decision-maker summary before the user clicks deeper.
  - They are also the least cognitively heavy analytical block currently on the homepage.

- **Section framing copy → keep on homepage**
  - The homepage still needs one short explanation of what the signal means.
  - Keeping the framing avoids dropping users directly into numbers without context.

- **Volume Relativo por Janela de Consulta → move to analytics later**
  - It asks the homepage reader to interpret sentiment composition over time, which is already a deeper analytical task.
  - Current source notes mark sentiment-related outputs as inferred rather than canonical, so this is not the strongest executive chart to foreground on the homepage.

- **Evolução Temporal de Menções por Tema → move to analytics later**
  - Theme-by-theme time comparison is useful, but it is exploratory rather than headline-level.
  - It fits better beside the broader charts already on `/analytics`, where users expect trend comparison and method caveats.

- **Distribuição de Fontes por Entidade → move to analytics later**
  - This is the most detailed current homepage chart and requires the most explanation to read well.
  - Source/channel distribution is also documented as inferred, so it should live in the deeper analytics layer instead of the executive surface.

- **Comparative-analysis closing paragraph → move to analytics later**
  - The paragraph only makes sense once the comparative charts stay on the page.
  - If the deeper comparison moves off the homepage, the interpretation should move with it.

- **ParaibaSpotlight → move to state detail later**
  - It is a state-specific narrative block, not a national executive summary.
  - As state pages mature, this content becomes a better teaser or first panel inside `/estados/:uf` than a permanent homepage section.

- **StateEvidenceView → move to state detail later**
  - It is explicitly filterable by UF, category, service, and entity, which makes it a drill-down tool.
  - That interaction model is valuable after a user chooses a state, but too heavy for the homepage reading flow.

- **EvidenciaPublicaSection → move to state detail later**
  - The content is organized around state-coded institutional actions and becomes more meaningful when attached to a chosen UF.
  - It supports state storytelling better than homepage executive scanning, especially once dedicated state pages already exist.
