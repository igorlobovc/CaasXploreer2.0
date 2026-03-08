# Analytics validation wording

## Recommended reviewer-facing terms

| Current branch term | Recommended wording in reviews | Note |
| --- | --- | --- |
| `evidence_level` | validation status | Used in runtime data objects |
| `status` | validation status | Used in the technical example/schema block |
| `data_origin` | source provenance | Used in runtime data objects |
| `fontes` | source provenance | Used in the technical example/schema block |
| `evidencia` | evidence type | Used in the technical example/schema block |

## Current branch reality

- Runtime examples currently use `evidence_level: 'confirmado'`
- The technical schema also documents the broader ladder `confirmado | parcial | não_confirmado`
- Runtime examples currently list source provenance values such as `site`, `notícia`, `registro`, and `app`

## Review note

For this branch, describe the mixed terminology as a **documentation alignment opportunity**, not as a routing, UI, or data-model blocker. That keeps review feedback precise and low risk.
