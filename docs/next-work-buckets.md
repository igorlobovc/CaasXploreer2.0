# Next-work buckets

## 1. Validation vocabulary alignment

- Decide whether runtime and technical-example fields should share one canonical naming set
- Align reviewer wording, dataset notes, and technical examples in one follow-up pass
- Keep this separate from UI or route changes

## 2. Provenance and evidence methodology

- Document how evidence is considered `confirmado`, `parcial`, or `não_confirmado`
- Clarify how source provenance types such as `site`, `notícia`, `registro`, and `app` should be interpreted
- Add examples only after the active implementation branch is confirmed

## 3. Review support hardening

- Replace branch-specific assumptions with stable reviewer notes where possible
- Add PR templates or reviewer checklists only if the active branch still needs them
- Keep docs portable so they can be cherry-picked without app changes

## 4. Separate engineering hygiene follow-up

- Address pre-existing shared UI lint failures in a dedicated code-focused PR
- Revisit tracked build artifacts and repository hygiene separately from docs work
- Add tests only when the active branch introduces or confirms a supported test setup
