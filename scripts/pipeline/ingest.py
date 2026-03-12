"""
scripts/pipeline/ingest.py
--------------------------
Ingest stage of the CAAsXploreer JSON export pipeline.

Responsibilities (to be implemented):
  - Resolve the registered source file path from batch_registry.csv using a batch_id.
  - Verify the file's SHA-256 checksum against the registered value.
  - Read the raw Excel workbook into a pandas DataFrame.
  - Apply minimal structural fixes (e.g. column header normalisation) without
    altering any data values — all semantic cleaning belongs in normalize.py.
  - Raise explicit, descriptive errors on any read failure; no silent fallbacks.

This file is a structure-only placeholder.
No business logic has been ported here yet.
"""

from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import pandas as pd


def resolve_batch_path(batch_id: str, registry_path: Path) -> Path:
    """
    Look up a batch_id in batch_registry.csv and return the resolved file path.

    Args:
        batch_id: The identifier of the registered batch (e.g. 'fpk_2022_2026_v2_qa').
        registry_path: Path to the batch_registry.csv file.

    Returns:
        Resolved Path to the source file.

    Raises:
        KeyError: If batch_id is not found in the registry.
        FileNotFoundError: If the registered file does not exist on disk.
    """
    # TODO: implement CSV lookup and path resolution
    raise NotImplementedError


def verify_checksum(file_path: Path, expected_sha256: str) -> None:
    """
    Verify that the file at file_path matches the expected SHA-256 checksum.

    Args:
        file_path: Path to the file to verify.
        expected_sha256: The expected SHA-256 hex digest from the registry.

    Raises:
        ValueError: If the computed checksum does not match the expected value.
    """
    # TODO: implement SHA-256 verification (reuse logic from register_external_batch.py)
    raise NotImplementedError


def read_batch(file_path: Path) -> "pd.DataFrame":
    """
    Read a registered raw Excel batch file into a pandas DataFrame.

    Args:
        file_path: Path to the validated source file.

    Returns:
        A raw DataFrame with original column names preserved.

    Raises:
        IOError: If the file cannot be read.
        ValueError: If the workbook structure is unexpected.
    """
    # TODO: implement Excel reading with openpyxl engine
    # TODO: handle multi-sheet workbooks if applicable
    # TODO: raise explicitly on read errors — no silent fallbacks
    raise NotImplementedError
