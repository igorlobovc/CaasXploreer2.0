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

## Expected Input Path

Primary workbook (source of truth):

- `data/raw/manual_review/MERGED_POST_WALL_2022_2026_CLASSIFIED_V3_CORRECTED_CANDIDATE.xlsx`

Support files:

- `data/raw/manual_review/MERGED_POST_WALL_2022_2026_CORRECTION_SUMMARY.xlsx`
- `data/raw/manual_review/MERGED_POST_WALL_2022_2026_FINAL_MANUAL_REVIEW_SHORTLIST.xlsx`

## How To Run Preview

From the repository root:

```bash
npx tsx scripts/ingest/normalize_manual_review_dataset.ts data/raw/manual_review/MERGED_POST_WALL_2022_2026_CLASSIFIED_V3_CORRECTED_CANDIDATE.xlsx
```

## Preview Output

The preview file is written to:

- `data/normalized/manual_review/manual_review.preview.json`
