# Manual Review Dataset

This dataset captures the manually reviewed spreadsheets used to curate and validate institutional services before they are surfaced in the product. It is intentionally staged outside the UI while the ingestion pipeline is finalized.

## Current Spreadsheets

1. Candidate source
   - Raw extraction of candidate services and benefits collected during discovery.
   - Acts as the unfiltered pool for manual review.

2. Correction summary
   - Reviewer adjustments, corrections, and notes applied to the candidate pool.
   - Tracks field fixes, re-categorizations, and removals.

3. Shortlist
   - Final curated list approved for normalization and future ingestion.
   - Represents the authoritative dataset to be normalized.

## Expected Normalized Output

The normalized output is a single JSON payload written to `data/normalized/manual_review/` with this structure:

- `metadata`
  - `generatedAt` (ISO timestamp)
  - `sourceFiles` (list of input spreadsheet paths)
- `records` (array of normalized rows)
  - `uf`
  - `entidade`
  - `categoria`
  - `servico`
  - `descricao` (optional)
  - `fonte` (optional)
  - `status` (optional)

The exact field mapping rules will be documented once spreadsheet headers are finalized.
