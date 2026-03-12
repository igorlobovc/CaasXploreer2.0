"""
scripts/pipeline/aggregate.py
------------------------------
Aggregation stage of the CAAsXploreer JSON export pipeline.

Responsibilities (to be implemented):
  - Build ranking outputs: by state (12-month and overall), by category,
    and by subcategory.
  - Build state-level outputs: national summary and per-UF detail records.
  - Build analytics outputs: national summary KPIs and temporal (monthly) series.
  - Build macro-regional aggregations.
  - Build taxonomy and evidence index outputs.

All functions accept a normalized pandas DataFrame and return a Python
data structure (dict or list) ready to be serialized to JSON by export.py.
No file I/O occurs in this module.

This file is a structure-only placeholder.
No business logic has been ported here yet.
"""

from __future__ import annotations

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import pandas as pd


def build_ranking_estados_12m(df: "pd.DataFrame") -> list[dict]:
    """
    Build the ranking of states by total interactions over the last 12 months,
    normalized per 1,000 lawyers.

    Returns:
        List of state ranking records → ranking_estados_12m.json
    """
    # TODO: implement ranking aggregation
    raise NotImplementedError


def build_ranking_estados_geral(df: "pd.DataFrame") -> list[dict]:
    """
    Build the overall (full-period) ranking of states by total interactions.

    Returns:
        List of state ranking records → ranking_estados_geral.json
    """
    raise NotImplementedError


def build_ranking_categorias(df: "pd.DataFrame") -> list[dict]:
    """
    Build the ranking of canonical categories by total interactions.

    Returns:
        List of category ranking records → ranking_categorias.json
    """
    raise NotImplementedError


def build_ranking_subcategorias(df: "pd.DataFrame") -> list[dict]:
    """
    Build the ranking of canonical subcategories by total interactions.

    Returns:
        List of subcategory ranking records → ranking_subcategorias.json
    """
    raise NotImplementedError


def build_estados_resumo(df: "pd.DataFrame") -> list[dict]:
    """
    Build the national summary of all states with key metrics.

    Returns:
        List of state summary records → estados_resumo.json
    """
    raise NotImplementedError


def build_estado_detalhe(df: "pd.DataFrame", uf: str) -> dict:
    """
    Build the detailed profile for a single state (UF).

    Args:
        df: Normalized DataFrame filtered or filterable by UF.
        uf: The two-letter UF code for the target state.

    Returns:
        State detail record → estado_detalhe_{uf}.json
    """
    raise NotImplementedError


def build_analytics_resumo(df: "pd.DataFrame") -> dict:
    """
    Build the national analytics summary KPIs.

    Returns:
        Summary KPI record → analytics_resumo.json
    """
    raise NotImplementedError


def build_analytics_temporal(df: "pd.DataFrame") -> list[dict]:
    """
    Build the monthly temporal series of national interactions.

    Returns:
        List of monthly data points → analytics_temporal.json
    """
    raise NotImplementedError


def build_macro_regioes(df: "pd.DataFrame") -> list[dict]:
    """
    Build aggregated metrics by macro-region (Norte, Nordeste, etc.).

    Returns:
        List of macro-region records → macro_regioes.json
    """
    raise NotImplementedError


def build_taxonomy_servicos(df: "pd.DataFrame") -> dict:
    """
    Build the canonical taxonomy of services derived from the processed data.

    Returns:
        Taxonomy structure → taxonomy_servicos.json
    """
    raise NotImplementedError


def build_evidence_index(df: "pd.DataFrame") -> list[dict]:
    """
    Build an index of evidence items (posts/services) for downstream use.

    Returns:
        List of evidence records → evidence_index.json
    """
    raise NotImplementedError


def build_all(df: "pd.DataFrame", config: dict) -> dict[str, object]:
    """
    Run all aggregation functions and return a mapping of output name → data.

    Args:
        df: Normalized DataFrame from the normalize stage.
        config: Loaded pipeline configuration dictionary.

    Returns:
        Dict mapping each JSON output name to its data structure.
        Example: {"ranking_estados_12m": [...], "analytics_resumo": {...}, ...}
    """
    # TODO: call all build_* functions and collect results
    raise NotImplementedError
