"""
scripts/pipeline/ingest.py
--------------------------
Ingest stage of the CAAsXploreer JSON export pipeline.

Responsibilities:
  - Resolve the registered source file path from batch_registry.csv using a batch_id.
  - Verify the file's SHA-256 checksum against the registered value.
  - Read the raw Excel workbook into a pandas DataFrame.
  - Apply minimal structural fixes (column header strip/lowercase) without
    altering any data values — all semantic cleaning belongs in normalize.py.
  - Raise explicit, descriptive errors on any failure; no silent fallbacks.

Expected batch_registry.csv columns:
  batch_id, source_filename, source_family, received_date, sha256,
  period_start, period_end, status, canonical_status, notes

Expected raw file location:
  data/raw/external_batches/<source_filename>

Usage (from repo root):
  python -m scripts.pipeline.main --batch-id fpk_2022_2026_v2_qa_pending \\
      --output-dir data/processed/period_1 --config scripts/pipeline/config.yaml
"""

from __future__ import annotations

import csv
import hashlib
import logging
from dataclasses import dataclass
from pathlib import Path

import pandas as pd

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Registry record
# ---------------------------------------------------------------------------

@dataclass(frozen=True)
class BatchRecord:
    """A single row from batch_registry.csv."""

    batch_id: str
    source_filename: str
    source_family: str
    received_date: str
    sha256: str
    period_start: str
    period_end: str
    status: str
    canonical_status: str
    notes: str


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def resolve_batch_record(batch_id: str, registry_path: Path) -> BatchRecord:
    """
    Look up a batch_id in batch_registry.csv and return its BatchRecord.

    Args:
        batch_id: The identifier of the registered batch
                  (e.g. 'fpk_2022_2026_v2_qa_pending').
        registry_path: Path to the batch_registry.csv file.

    Returns:
        The matching BatchRecord.

    Raises:
        FileNotFoundError: If registry_path does not exist.
        KeyError: If batch_id is not found in the registry.
    """
    if not registry_path.exists():
        raise FileNotFoundError(
            f"Batch registry not found: {registry_path}\n"
            "Expected location: data/raw/external_batches/batch_registry.csv"
        )

    with registry_path.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            if row.get("batch_id", "").strip() == batch_id.strip():
                return BatchRecord(
                    batch_id=row["batch_id"].strip(),
                    source_filename=row["source_filename"].strip(),
                    source_family=row.get("source_family", "").strip(),
                    received_date=row.get("received_date", "").strip(),
                    sha256=row.get("sha256", "").strip(),
                    period_start=row.get("period_start", "").strip(),
                    period_end=row.get("period_end", "").strip(),
                    status=row.get("status", "").strip(),
                    canonical_status=row.get("canonical_status", "").strip(),
                    notes=row.get("notes", "").strip(),
                )

    raise KeyError(
        f"batch_id '{batch_id}' not found in registry: {registry_path}\n"
        f"Available batch IDs can be listed with: "
        f"python -m scripts.pipeline.main --list-batches"
    )


def resolve_batch_path(batch_id: str, registry_path: Path) -> tuple[Path, BatchRecord]:
    """
    Look up a batch_id in batch_registry.csv and return the resolved file path
    alongside its full BatchRecord.

    Args:
        batch_id: The identifier of the registered batch.
        registry_path: Path to the batch_registry.csv file.

    Returns:
        Tuple of (resolved file Path, BatchRecord).

    Raises:
        FileNotFoundError: If the registry or the source file does not exist.
        KeyError: If batch_id is not found in the registry.
        RuntimeError: If the batch status indicates the file is not yet available.
    """
    record = resolve_batch_record(batch_id, registry_path)

    # Guard: refuse to process batches that are not yet received
    if record.status in ("awaiting_file", "pending"):
        raise RuntimeError(
            f"Batch '{batch_id}' has status '{record.status}'.\n"
            f"The source file '{record.source_filename}' has not been placed in "
            f"data/raw/external_batches/ yet.\n"
            f"Register the file first with: "
            f"python scripts/ingest/register_external_batch.py <path_to_file>"
        )

    raw_dir = registry_path.parent
    file_path = raw_dir / record.source_filename

    if not file_path.exists():
        raise FileNotFoundError(
            f"Source file registered but not found on disk: {file_path}\n"
            f"Expected at: data/raw/external_batches/{record.source_filename}\n"
            f"Batch record status: {record.status}"
        )

    logger.info("Resolved batch '%s' → %s", batch_id, file_path)
    return file_path, record


def _sha256_file(path: Path) -> str:
    """Compute the SHA-256 hex digest of a file in streaming chunks."""
    digest = hashlib.sha256()
    with path.open("rb") as fh:
        for chunk in iter(lambda: fh.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def verify_checksum(file_path: Path, expected_sha256: str) -> None:
    """
    Verify that the file at file_path matches the expected SHA-256 checksum.

    If the registry entry contains 'TBD' as the checksum (i.e. the file was
    registered before the hash was computed), this function logs a warning
    and skips verification rather than failing.

    Args:
        file_path: Path to the file to verify.
        expected_sha256: The expected SHA-256 hex digest from the registry.

    Raises:
        ValueError: If the computed checksum does not match the expected value.
    """
    if not expected_sha256 or expected_sha256.upper() in ("TBD", "UNKNOWN", ""):
        logger.warning(
            "Checksum for '%s' is not yet registered (value: '%s'). "
            "Skipping verification — update batch_registry.csv with the real hash.",
            file_path.name,
            expected_sha256,
        )
        return

    actual = _sha256_file(file_path)
    if actual != expected_sha256.lower():
        raise ValueError(
            f"SHA-256 mismatch for '{file_path.name}'.\n"
            f"  Expected : {expected_sha256.lower()}\n"
            f"  Computed : {actual}\n"
            f"The file may have been modified after registration. "
            f"Do not process a file with a checksum mismatch."
        )

    logger.info("Checksum verified for '%s' ✓", file_path.name)


def _normalise_headers(df: pd.DataFrame) -> pd.DataFrame:
    """
    Apply minimal structural normalisation to column headers:
      - Strip leading/trailing whitespace.
      - Convert to lowercase.
      - Replace spaces and hyphens with underscores.

    This is the only transformation applied in the ingest stage.
    No data values are altered here.
    """
    df.columns = [
        str(c).strip().lower().replace(" ", "_").replace("-", "_")
        for c in df.columns
    ]
    return df


def read_batch(file_path: Path, sheet_name: str | int = 0) -> pd.DataFrame:
    """
    Read a registered raw Excel batch file into a pandas DataFrame.

    The function reads the first sheet by default. If the workbook contains
    multiple sheets, pass the desired sheet name or zero-based index via
    sheet_name.

    Column headers are normalised (stripped, lowercased, underscored) before
    the DataFrame is returned. No data values are altered.

    Args:
        file_path: Path to the validated source file (.xlsx or .xls).
        sheet_name: Sheet name or index to read (default: 0 = first sheet).

    Returns:
        A raw DataFrame with normalised column headers and original data values.

    Raises:
        FileNotFoundError: If file_path does not exist.
        ValueError: If the workbook cannot be parsed or the sheet is not found.
        IOError: If the file cannot be opened.
    """
    if not file_path.exists():
        raise FileNotFoundError(f"Source file not found: {file_path}")

    suffix = file_path.suffix.lower()
    if suffix not in (".xlsx", ".xls"):
        raise ValueError(
            f"Unsupported file type '{suffix}' for '{file_path.name}'. "
            f"Expected .xlsx or .xls."
        )

    logger.info("Reading workbook: %s (sheet=%s)", file_path.name, sheet_name)

    try:
        df = pd.read_excel(
            file_path,
            sheet_name=sheet_name,
            engine="openpyxl" if suffix == ".xlsx" else "xlrd",
            dtype=str,          # read everything as string; casting is normalize's job
            keep_default_na=False,
        )
    except Exception as exc:
        raise ValueError(
            f"Failed to read workbook '{file_path.name}' "
            f"(sheet={sheet_name!r}): {exc}"
        ) from exc

    if df.empty:
        raise ValueError(
            f"Workbook '{file_path.name}' sheet '{sheet_name}' is empty. "
            f"Verify the source file is correct."
        )

    df = _normalise_headers(df)

    logger.info(
        "Loaded %d rows × %d columns from '%s'",
        len(df),
        len(df.columns),
        file_path.name,
    )
    return df


def list_available_batches(registry_path: Path) -> list[BatchRecord]:
    """
    Return all BatchRecords from the registry, regardless of status.

    Useful for the --list-batches CLI flag in main.py.

    Args:
        registry_path: Path to the batch_registry.csv file.

    Returns:
        List of BatchRecord objects.

    Raises:
        FileNotFoundError: If registry_path does not exist.
    """
    if not registry_path.exists():
        raise FileNotFoundError(
            f"Batch registry not found: {registry_path}"
        )

    records: list[BatchRecord] = []
    with registry_path.open(newline="", encoding="utf-8") as fh:
        reader = csv.DictReader(fh)
        for row in reader:
            records.append(
                BatchRecord(
                    batch_id=row.get("batch_id", "").strip(),
                    source_filename=row.get("source_filename", "").strip(),
                    source_family=row.get("source_family", "").strip(),
                    received_date=row.get("received_date", "").strip(),
                    sha256=row.get("sha256", "").strip(),
                    period_start=row.get("period_start", "").strip(),
                    period_end=row.get("period_end", "").strip(),
                    status=row.get("status", "").strip(),
                    canonical_status=row.get("canonical_status", "").strip(),
                    notes=row.get("notes", "").strip(),
                )
            )
    return records


def ingest(
    batch_id: str,
    registry_path: Path,
    sheet_name: str | int = 0,
) -> tuple[pd.DataFrame, BatchRecord]:
    """
    Full ingest pipeline: resolve → verify checksum → read → return.

    This is the single entry point called by main.py for the ingest stage.

    Args:
        batch_id: The batch_id to process.
        registry_path: Path to batch_registry.csv.
        sheet_name: Sheet name or index to read from the workbook (default: 0).

    Returns:
        Tuple of (raw normalised-header DataFrame, BatchRecord).

    Raises:
        FileNotFoundError: If the registry or source file is missing.
        KeyError: If batch_id is not in the registry.
        RuntimeError: If the batch is not yet available for processing.
        ValueError: If the checksum fails or the workbook cannot be parsed.
    """
    file_path, record = resolve_batch_path(batch_id, registry_path)
    verify_checksum(file_path, record.sha256)
    df = read_batch(file_path, sheet_name=sheet_name)
    return df, record
