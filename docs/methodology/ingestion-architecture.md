# Ingestion Architecture (Fanpage Karma / YouScan)

Operating rule:
- GitHub repo is implementation base.
- Kimi is reference only.
- Fanpage Karma backbone comes before UI polish.

Pipeline boundary:
1. Raw ingest: store originals in `data/raw/external_batches/`.
2. Normalize: convert to typed intermediates under source-specific raw folders.
3. Process: materialize period outputs in `data/processed/period_1`, `period_2`, `period_3`.
4. Reconcile: capture caveats, anomalies, and canonical/provisional decisions.

Status policy:
- `canonical`: approved for product decisions.
- `provisional`: usable with explicit caveats.
- `pending`: structure exists but data not ingested yet.
