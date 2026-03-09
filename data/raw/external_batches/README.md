# External Batch Drop Zone (Raw)

Purpose: Store original external files exactly as received (no edits), with traceable provenance.

Rules:
- Keep originals byte-for-byte in this folder.
- Do not overwrite prior versions; add dated/versioned filenames.
- Register every file in `batch_registry.csv` before downstream transformation.
- Do not treat files here as canonical processed outputs.

Registration flow:
1. Place the external file in this folder unchanged.
2. Run `python scripts/ingest/register_external_batch.py <path-to-file>`.
3. Copy the suggested CSV row into `batch_registry.csv` and fill `batch_id`, `received_date`, and `notes`.
4. Create an intake note from `docs/reconciliation/batch_intake_template.md`.

Expected current files (when available):
- `MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.xlsx`
- `MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_20250308.xlsx`

Current workspace status:
- The two expected XLSX files are not present in the repository workspace yet.
