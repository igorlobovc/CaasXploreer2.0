# PR Review Checklist: Homepage Analytics

Date: 2026-03-08
Branch: `copilot/update-project-instructions`

## Scope guardrails
- [ ] No homepage UI redesign changes are being proposed in this review-prep pass.
- [ ] No route changes in `app/src/main.tsx` are part of this pass.
- [ ] No ranking/state page behavior changes are part of this pass.
- [ ] No JSON analytics data edits are part of this pass.
- [ ] `app/dist` artifacts are excluded from review/commit scope.

## Analytics validation consistency
- [ ] Docs consistently reflect diagnostics ownership: resolver computes, adapter logs.
- [ ] KPI source-priority references use current resolver terminology.
- [ ] Validation dataset list is consistent across docs (includes `engagement-categoria.json`).
- [ ] “Next safest implementation step” is consistent (CAA code/taxonomy normalization in resolver).

## Implementation risk checks
- [ ] Adapter diagnostics are read-only (`console.warn`) and do not change rendered KPI/chart behavior.
- [ ] Inferred outputs are explicitly documented as provisional (sentiment + source/channel split).

## Follow-up decision (post-PR)
- [ ] `app/src/components/home/provisional/simulatedData.ts` is confirmed unused and scheduled for removal in a separate low-risk cleanup PR.
