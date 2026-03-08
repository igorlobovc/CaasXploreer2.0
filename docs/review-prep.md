# Review prep

## Scope of this branch pass

- Docs-only review-prep pass
- No source code, route, ranking, state-page, JSON, or `app/dist` changes
- Safe to compare independently from newer implementation branches

## Current branch facts worth preserving in review

- The shipped app lives under `app/` and builds with `npm run build`
- `npm run lint` currently fails in shared UI component files outside this docs pass
- There is no dedicated automated test runner configured on this branch
- Analytics-related wording currently appears in two shapes in `app/src/App.tsx`:
  - runtime fields: `evidence_level`, `data_origin`
  - technical example/schema: `status`, `fontes`

## Reviewer checklist

- Confirm this PR only changes markdown under `docs/` plus minimal root README wording
- Review wording guidance before discussing analytics validation terminology
- Treat backlog buckets as follow-up work, not as in-scope implementation promises
- If comparing against a newer branch, port only the docs that still match the active implementation

## Known non-blockers for this pass

- Existing lint failures in `app/src/components/ui/*`
- Boilerplate `app/README.md` remains untouched to avoid widening scope
