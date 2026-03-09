# A. Top 3 homepage chart candidates

1. **Evolução mensal de menções nacionais**
   - **Source file:** `app/src/components/home/provisional/data/temporal-data.json`
   - **Chart type:** line chart
   - **Key metric:** `dados[].quantidade` by `dados[].mes`
   - **Caveat:** safest when anchored to the same global total already confirmed in `resumo-executivo.json`; this is volume, not sentiment or engagement quality.
   - **Why useful for executive reading:** gives the clearest “is visibility growing or cooling?” signal in one glance and is the most stable time-series already available to the frontend.

2. **Top categorias por volume de menções**
   - **Source file:** `app/src/components/home/provisional/data/heatmap-data.json`
   - **Chart type:** horizontal bar chart
   - **Key metric:** aggregated `quantidade` by `categoria`
   - **Caveat:** category totals do not fully reconcile with `resumo-executivo.top_categorias`, so this should be presented as the best available distribution view, not as the single source for all headline totals.
   - **Why useful for executive reading:** shows where assistance demand and public-facing attention are concentrated, which helps leadership prioritize the biggest themes fast.

3. **Top CAAs por volume observado**
   - **Source file:** `app/src/components/home/provisional/data/resumo-executivo.json`
   - **Chart type:** ranked horizontal bar chart
   - **Key metric:** `top_caas[].quantidade`
   - **Caveat:** best kept to the summary/top slice only; it should not be stretched into a full-state ranking because broader ranking files use mismatched CAA/state coverage and naming.
   - **Why useful for executive reading:** provides an immediate benchmark of where visible activity is concentrated without forcing the homepage into a dense analytics or ranking experience.

# B. Source file for each

- Monthly trend: `app/src/components/home/provisional/data/temporal-data.json`
- Category distribution: `app/src/components/home/provisional/data/heatmap-data.json`
- Top CAA summary: `app/src/components/home/provisional/data/resumo-executivo.json`

# C. Caveats

- `temporal-data.json` is the strongest canonical chart source, but it supports **volume trend** only.
- `heatmap-data.json` is the best available category-distribution source, but its totals do **not** fully match summary totals.
- `resumo-executivo.json` is reliable for **headline/top-5 storytelling**, but not for a complete comparative ranking model.

# D. What should not be shown on homepage

- **Sentiment split** should not be shown on the homepage, because there is no canonical sentiment dataset in the repo and the current values are inferred.
- **Source/channel mix** (Instagram / Facebook / Portais / etc.), because the current distribution is inferred rather than sourced from a canonical channel dataset.
- **Per-capita rankings** from `ranking_estados_12m.json`, because state/CAA coverage and identifier taxonomy still need normalization.
- **Deep state drill-down metrics** from `app/src/data/estados.ts`, because they are better suited to `/estados` and state detail pages than to executive homepage storytelling.
- **Manual review evidence tables** from `app/src/data/manualReviewEvidence.ts`, because they are useful for validation and exploration, not for a concise homepage executive read.
