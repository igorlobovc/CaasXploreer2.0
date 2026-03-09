# Analytics Page MVP — 2026-03-09

## Goal
Define the minimum viable scope for the new `/analytics` page based on the analytics-style visuals currently living on the homepage.

## Current homepage analytics inventory
Homepage analytics currently live in `app/src/components/home/provisional/ProvisionalSimulationResultsSection.tsx` and are presented under **Evidência de Repercussão**.

Current homepage visuals:
1. **KPI cards**
   - Menções Totais
   - Intensidade Média por Tema
   - Densidade de Sinais
   - Sentimento Predominante
2. **Volume Relativo por Janela de Consulta**
   - stacked visual for neutro / positivo / negativo by query window
3. **Evolução Temporal de Menções por Tema**
   - comparative timeline for Saúde & Bem-Estar vs Benefícios & Convênios
4. **Distribuição de Fontes por Entidade**
   - stacked source mix by entidade
5. **Closing interpretation card**
   - one paragraph explaining how to read the comparisons

## MVP decision
The first `/analytics` page should be a **focused read-only summary page**, not a complete analytics laboratory.

It should answer only three questions:
1. **How much signal exists?**
2. **How is that signal evolving over time?**
3. **What is the safest high-level interpretation a user can take away today?**

## Minimum viable `/analytics` structure

### 1. Header / framing
- Title: `Analytics`
- Short deck: explain that this page centralizes the external repercussion signals that are currently previewed on the homepage.
- One short methodology note: data is aggregated nationally and should be read as directional monitoring, not causal proof.

Suggested explanatory text:
- `Painel analítico com leitura consolidada da repercussão externa associada aos temas de assistência das CAAs.`
- `Nesta primeira versão, a página prioriza métricas nacionais de fácil leitura e comparativos temporais de menor ambiguidade.`

### 2. Executive summary KPIs
Keep a compact first row of homepage-derived KPIs, but only the ones that are easy to understand without extra methodological burden.

Include first:
- **Menções Totais**
- **Intensidade Média por Tema**
- **Densidade de Sinais**

Leave out initially:
- **Sentimento Predominante** as a headline KPI, because it depends on inferred sentiment construction and invites over-interpretation.

Suggested explanatory text:
- `Resumo rápido do volume e da intensidade do sinal observado na janela monitorada.`

### 3. Main chart: Evolução Temporal de Menções por Tema
This should be the first full chart on the page.

Why it belongs in MVP:
- it tells the clearest story
- it is easy to read in isolation
- it supports the page's main job: show whether attention is rising, stable, or shifting between major themes
- it is easier to explain than sentiment or source-mix visuals

Suggested explanatory text:
- `Comparativo temporal das menções agregadas por grandes temas, permitindo identificar aceleração, estabilidade ou perda de tração ao longo da janela observada.`
- `Leitura recomendada: observar tendência e distância relativa entre os temas, não apenas picos isolados.`

### 4. Secondary chart: Volume Relativo por Janela de Consulta
This can appear second, below the timeline, as a supporting chart.

Why it belongs in MVP:
- it adds nuance after the user already understands the main trend
- it helps explain quality/composition of signal over time
- it is still useful if clearly labeled as a directional, comparative visualization

Required explanatory text:
- `Distribuição relativa do volume por janela de consulta, com leitura comparativa entre neutro, positivo e negativo.`
- `Nesta fase inicial, o gráfico deve ser lido como indicador exploratório de composição do sinal, e não como mensuração definitiva de sentimento.`

### 5. Closing note / interpretation block
End the page with a short text block explaining how to use the page.

Suggested explanatory text:
- `O objetivo desta versão é oferecer uma leitura rápida e confiável do nível e da evolução da repercussão externa.`
- `Recortes mais interpretativos ou dependentes de inferência metodológica ficarão para uma etapa posterior.`

## Charts included first
1. **Executive KPI summary**
   - Menções Totais
   - Intensidade Média por Tema
   - Densidade de Sinais
2. **Evolução Temporal de Menções por Tema**
3. **Volume Relativo por Janela de Consulta**
4. **Short interpretation / methodology note**

## What stays out initially
Do not include in the MVP:

1. **Distribuição de Fontes por Entidade**
   - lower priority for first release
   - more complex to read
   - source/channel composition is explicitly inference-heavy in current adapter logic
   - better added only after stronger source-of-truth clarification

2. **Sentimento Predominante as a headline decision metric**
   - acceptable as supporting context later
   - not strong enough to anchor the first version of the page

3. **Entity-level comparisons, deep filters, rankings, or segmentation controls**
   - these make the page heavier before the national narrative is established

4. **Anything that duplicates ranking/estado pages**
   - `/analytics` MVP should stay national and summary-oriented
   - state/entity drill-down belongs in dedicated pages, not in the first analytics release

## Recommended section order
1. Header + framing
2. KPI summary row
3. Evolução Temporal de Menções por Tema
4. Volume Relativo por Janela de Consulta
5. Closing interpretation / methodology note

## Final scope statement
The MVP `/analytics` page should launch as a **national summary page with one KPI row and two charts**. It should prioritize the clearest and least ambiguous story already present on the homepage, while explicitly postponing source-by-entity and stronger sentiment claims until the underlying methodology is ready to support them.
