# /evidencias MVP

## A. Minimum viable /evidencias page

- A dedicated `/evidencias` page that reuses the current StateEvidenceView evidence listing pattern.
- Default behavior: show a paginated list of evidence cards across all states.
- The page should prioritize browseability and comparability over deep analysis.
- The first version should support:
  - listing evidence items
  - basic filtering
  - pagination
  - opening the original source link
  - navigating back to the related state page when applicable

## B. Required filters

- **UF / Estado**
  - lets users narrow evidence to one or more states
- **Tipo / categoria da evidência**
  - based on the same evidence grouping already exposed in StateEvidenceView
- **Busca por texto**
  - matches title, summary, or source name

## C. Result structure

Each result card should contain only the fields needed for quick scanning:

- evidence title
- short summary/snippet
- UF / state label
- evidence type/category badge
- source/publisher name
- publication or reference date, when available
- primary action: open source
- secondary action: view state detail

## D. What stays out initially

- advanced multi-filter logic beyond the three core filters
- sorting options other than the current default ordering
- map integration
- analytics/charts for evidence results
- saved searches/favorites
- evidence comparison mode
- inline source preview
- export/download actions
- complex deduplication workflows
- user annotations or moderation flows
