# AI handoff

## Purpose

This branch only adds review-support documentation. It is intended to stay useful even if another branch contains newer UI or data work.

## Safe handoff constraints

- Keep work on the currently selected visible branch
- Do not change source code, routes, UI layout, ranking/state pages, JSON source files, or `app/dist`
- Use docs here as branch-agnostic support material first, then selectively port to the active implementation branch later

## Current implementation touchpoints

- Primary app entry and most visible content: `app/src/App.tsx`
- Build command: `cd /home/runner/work/CaasXploreer2.0/CaasXploreer2.0/app && npm run build`
- Lint baseline: `npm run lint` currently reports pre-existing shared UI issues unrelated to this pass

## Analytics wording handoff note

When summarizing analytics validation on this branch:

- prefer **validation status** for `evidence_level` / `status`
- prefer **source provenance** for `data_origin` / `fontes`
- prefer **evidence type** for `evidencia`

That wording lets reviewers discuss the current branch cleanly without forcing a code rename.

## Porting guidance

If a newer implementation branch exists, port these docs only after checking whether:

1. `App.tsx` still owns the main content,
2. the same evidence/source terms still exist,
3. shared lint failures are still pre-existing rather than introduced later.
