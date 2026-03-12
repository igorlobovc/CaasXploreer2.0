"""
scripts/pipeline/main.py
------------------------
Orchestration entry point for the CAAsXploreer JSON export pipeline.

Pipeline stages (executed in order):
  1. ingest     — resolve batch, verify checksum, read Excel → raw DataFrame
  2. normalize  — canonicalize UF / CAA / categories, reconcile interactions  [Step 3]
  3. aggregate  — build all JSON output data structures                        [Step 4]
  4. export     — write JSON files + provenance + run report                   [Step 5]

Steps 2–4 are not yet implemented; their calls are stubbed with clear
NotImplementedError messages so the pipeline fails loudly rather than silently.

Usage examples (from repo root):

  # List all registered batches:
  python -m scripts.pipeline.main --list-batches

  # Run the full pipeline for a specific batch:
  python -m scripts.pipeline.main \\
      --batch-id fpk_2022_2026_v2_qa_pending \\
      --output-dir data/processed/period_1 \\
      --config scripts/pipeline/config.yaml

  # Dry-run: ingest only, print DataFrame shape, do not write outputs:
  python -m scripts.pipeline.main \\
      --batch-id fpk_2022_2026_v2_qa_pending \\
      --dry-run
"""

from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path

# ---------------------------------------------------------------------------
# Logging setup
# ---------------------------------------------------------------------------

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(name)s  %(message)s",
    datefmt="%Y-%m-%dT%H:%M:%S",
)
logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Default paths (relative to repo root)
# ---------------------------------------------------------------------------

REPO_ROOT = Path(__file__).resolve().parents[2]
DEFAULT_REGISTRY = REPO_ROOT / "data" / "raw" / "external_batches" / "batch_registry.csv"
DEFAULT_CONFIG = REPO_ROOT / "scripts" / "pipeline" / "config.yaml"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "data" / "processed" / "period_1"


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="python -m scripts.pipeline.main",
        description="CAAsXploreer JSON export pipeline",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )

    parser.add_argument(
        "--batch-id",
        metavar="BATCH_ID",
        help="batch_id to process (as registered in batch_registry.csv)",
    )
    parser.add_argument(
        "--output-dir",
        metavar="PATH",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"directory for processed JSON outputs (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--config",
        metavar="PATH",
        type=Path,
        default=DEFAULT_CONFIG,
        help=f"path to config.yaml (default: {DEFAULT_CONFIG})",
    )
    parser.add_argument(
        "--registry",
        metavar="PATH",
        type=Path,
        default=DEFAULT_REGISTRY,
        help=f"path to batch_registry.csv (default: {DEFAULT_REGISTRY})",
    )
    parser.add_argument(
        "--sheet",
        metavar="SHEET",
        default=0,
        help="Excel sheet name or zero-based index to read (default: 0)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="ingest only: print DataFrame shape and exit without writing outputs",
    )
    parser.add_argument(
        "--list-batches",
        action="store_true",
        help="list all registered batches and exit",
    )
    parser.add_argument(
        "--verbose",
        action="store_true",
        help="enable DEBUG-level logging",
    )

    return parser


# ---------------------------------------------------------------------------
# Stage stubs (Steps 3–5 — not yet implemented)
# ---------------------------------------------------------------------------

def _run_normalize(df, config):  # type: ignore[no-untyped-def]
    """Normalization stage — to be implemented in Step 3."""
    raise NotImplementedError(
        "normalize stage not yet implemented (Step 3). "
        "Use --dry-run to test the ingest stage only."
    )


def _run_aggregate(df, config):  # type: ignore[no-untyped-def]
    """Aggregation stage — to be implemented in Step 4."""
    raise NotImplementedError(
        "aggregate stage not yet implemented (Step 4)."
    )


def _run_export(outputs, output_dir, record, config):  # type: ignore[no-untyped-def]
    """Export stage — to be implemented in Step 5."""
    raise NotImplementedError(
        "export stage not yet implemented (Step 5)."
    )


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main(argv: list[str] | None = None) -> int:
    """
    Pipeline entry point.

    Returns:
        0 on success, non-zero on failure.
    """
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.verbose:
        logging.getLogger().setLevel(logging.DEBUG)

    # ------------------------------------------------------------------
    # --list-batches: print registry and exit
    # ------------------------------------------------------------------
    if args.list_batches:
        from scripts.pipeline.ingest import list_available_batches  # noqa: PLC0415

        try:
            records = list_available_batches(args.registry)
        except FileNotFoundError as exc:
            logger.error("%s", exc)
            return 1

        if not records:
            print("No batches registered.")
            return 0

        header = f"{'batch_id':<45} {'status':<20} {'canonical_status':<18} source_filename"
        print(header)
        print("-" * len(header))
        for r in records:
            print(
                f"{r.batch_id:<45} {r.status:<20} {r.canonical_status:<18} {r.source_filename}"
            )
        return 0

    # ------------------------------------------------------------------
    # Require --batch-id for all other operations
    # ------------------------------------------------------------------
    if not args.batch_id:
        parser.error("--batch-id is required unless --list-batches is specified.")

    # ------------------------------------------------------------------
    # Stage 1: Ingest
    # ------------------------------------------------------------------
    logger.info("=== Stage 1: Ingest (batch_id=%s) ===", args.batch_id)

    from scripts.pipeline.ingest import ingest  # noqa: PLC0415

    sheet: str | int = args.sheet
    try:
        sheet = int(sheet)
    except (ValueError, TypeError):
        pass  # keep as string sheet name

    try:
        df, record = ingest(
            batch_id=args.batch_id,
            registry_path=args.registry,
            sheet_name=sheet,
        )
    except (FileNotFoundError, KeyError, RuntimeError, ValueError) as exc:
        logger.error("Ingest failed: %s", exc)
        return 1

    logger.info(
        "Ingest complete: %d rows × %d columns | period %s → %s",
        len(df),
        len(df.columns),
        record.period_start,
        record.period_end,
    )
    logger.info("Columns: %s", list(df.columns))

    # ------------------------------------------------------------------
    # Dry-run: stop after ingest
    # ------------------------------------------------------------------
    if args.dry_run:
        print(f"\n[dry-run] Ingest successful.")
        print(f"  batch_id  : {record.batch_id}")
        print(f"  file      : {record.source_filename}")
        print(f"  rows      : {len(df)}")
        print(f"  columns   : {len(df.columns)}")
        print(f"  period    : {record.period_start} → {record.period_end}")
        print(f"  status    : {record.status} / {record.canonical_status}")
        print(f"\nColumn names:")
        for col in df.columns:
            print(f"  {col}")
        return 0

    # ------------------------------------------------------------------
    # Stage 2: Normalize  (Step 3 — not yet implemented)
    # ------------------------------------------------------------------
    logger.info("=== Stage 2: Normalize ===")
    try:
        df_clean, qa_issues = _run_normalize(df, config=None)
    except NotImplementedError as exc:
        logger.warning("%s", exc)
        logger.warning("Pipeline stopped after ingest. Re-run with --dry-run to test ingest only.")
        return 2

    # ------------------------------------------------------------------
    # Stage 3: Aggregate  (Step 4 — not yet implemented)
    # ------------------------------------------------------------------
    logger.info("=== Stage 3: Aggregate ===")
    try:
        outputs = _run_aggregate(df_clean, config=None)
    except NotImplementedError as exc:
        logger.warning("%s", exc)
        return 2

    # ------------------------------------------------------------------
    # Stage 4: Export  (Step 5 — not yet implemented)
    # ------------------------------------------------------------------
    logger.info("=== Stage 4: Export ===")
    args.output_dir.mkdir(parents=True, exist_ok=True)
    try:
        _run_export(outputs, args.output_dir, record, config=None)
    except NotImplementedError as exc:
        logger.warning("%s", exc)
        return 2

    logger.info("Pipeline complete. Outputs written to: %s", args.output_dir)
    return 0


if __name__ == "__main__":
    sys.exit(main())
