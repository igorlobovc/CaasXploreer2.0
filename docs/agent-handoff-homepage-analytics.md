# Agent Handoff: Homepage Analytics

## Active repo target
- `CaasXploreer2.0` homepage analytics validation flow.

## Active branch
- `copilot/update-project-instructions`

## Just completed
- Homepage refactor is in branch history.
- Provisional real-data adapter is integrated and rendering.
- Build/preview path has been previously validated.
- Validation/planning artifacts were added to `docs/` for the next execution cycle.

## Not settled yet
- Canonical KPI source hierarchy across JSON datasets.
- Canonical sentiment source (adapter currently uses inferred fallback logic).
- Canonical source/channel distribution source (adapter currently uses inferred fallback logic).
- Dataset total reconciliation required before final KPI certification.

## Next safest implementation step
- Implement and document a source-priority resolver that computes each homepage KPI from approved canonical dataset precedence, then verify values against all five datasets.

## Do not change
- Do not redesign homepage UI.
- Do not change routes in `app/src/main.tsx`.
- Do not modify ranking/state pages unless explicitly requested.
- Do not include `app/dist` artifacts in commits.
