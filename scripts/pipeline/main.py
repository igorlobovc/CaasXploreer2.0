"""
scripts/pipeline/main.py
------------------------
Future orchestration entry point for the CAAsXploreer JSON export pipeline.

Responsibilities (to be implemented in subsequent steps):
  1. Parse command-line arguments (batch_id, output directory, config path).
  2. Load and validate pipeline configuration from config.yaml.
  3. Look up the registered source file in data/raw/external_batches/batch_registry.csv.
  4. Orchestrate the four pipeline stages in order:
       ingest → normalize → aggregate → export
  5. Emit a provenance/QA report alongside the processed JSON outputs.

This file is a structure-only placeholder.
No business logic has been ported here yet.
"""

from __future__ import annotations


def main() -> None:
    """Pipeline entry point — placeholder only."""
    # TODO: parse arguments (batch_id, output_dir, config_path)
    # TODO: load config from config.yaml
    # TODO: resolve source file from batch_registry.csv
    # TODO: call ingest.read_batch(...)
    # TODO: call normalize.canonicalize(...)
    # TODO: call aggregate.build_all(...)
    # TODO: call export.write_outputs(...)
    pass


if __name__ == "__main__":
    main()
