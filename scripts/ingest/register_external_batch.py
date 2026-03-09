#!/usr/bin/env python3
"""Register an external batch file by hashing and printing a suggested CSV row."""

from __future__ import annotations

import argparse
import hashlib
from pathlib import Path


def sha256_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as infile:
        for chunk in iter(lambda: infile.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Compute sha256 for an external batch file and print a suggested registry CSV row."
    )
    parser.add_argument(
        "input_file",
        help="Path to the external batch file (for example: data/raw/external_batches/file.xlsx)",
    )
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    input_path = Path(args.input_file).expanduser().resolve()
    if not input_path.exists() or not input_path.is_file():
        parser.error(f"Input file not found or not a regular file: {input_path}")

    file_hash = sha256_file(input_path)
    filename = input_path.name

    print("Suggested registry CSV row:")
    print(
        "batch_id,source_filename,source_family,received_date,sha256,period_start,period_end,status,canonical_status,notes"
    )
    print(
        f"TODO_BATCH_ID,{filename},Fanpage Karma,YYYY-MM-DD,{file_hash},2022-03-16,2026-02-13,raw_received,pending,fill_notes"
    )

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
