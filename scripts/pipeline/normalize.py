"""
scripts/pipeline/normalize.py
------------------------------
Estágio de normalização do pipeline de exportação JSON do CAAsXploreer.

Responsabilidades:
  - Canonicalizar códigos de UF e mapear para regiões usando o arquivo de referência.
  - Canonicalizar identificadores de CAA para suas formas padronizadas.
  - Canonicalizar valores de categoria e subcategoria usando a taxonomia de referência.
  - Reconciliar campos de interação (resolver colunas ambíguas ou duplicadas).
  - Converter tipos de coluna (datas, inteiros, floats) com tratamento explícito de erros.
  - Sinalizar linhas com problemas de qualidade de dados para inclusão no relatório QA.

Todas as funções aceitam um pandas DataFrame e retornam um novo DataFrame limpo.
O DataFrame de entrada nunca é mutado diretamente.

Uso (chamado por main.py):
  from scripts.pipeline.normalize import normalize
  df_clean, qa_issues = normalize(df_raw, config)
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any

import pandas as pd

logger = logging.getLogger(__name__)

_INTERACTION_COLS_PRIORITY = ["interações","interacoes","total_interacoes","total_interactions","interactions","engagement"]
_SHARE_COLS_PRIORITY = ["compartilhamentos","shares","shared_interactions","compartilhamento"]
_DATE_COLS_PRIORITY = ["data","date","data_publicacao","published_date","post_date"]
_CAA_COLS_PRIORITY = ["caa","caa_nome","caa_id","organizacao","pagina","page"]
_UF_COLS_PRIORITY = ["uf","estado","state","uf_estado"]
_CATEGORY_COLS_PRIORITY = ["categoria","category","tema","topic"]
_SUBCATEGORY_COLS_PRIORITY = ["subcategoria","subcategory","subtema"]


def _find_col(df: pd.DataFrame, candidates: list) -> str | None:
    for c in candidates:
        if c in df.columns:
            return c
    return None


def _strip_str(s: Any) -> str:
    if pd.isna(s):
        return ""
    return str(s).strip()


def _qa_record(stage: str, row_index, coluna: str, valor_raw: Any, problema: str) -> dict:
    return {"estagio": stage, "linha": row_index, "coluna": coluna, "valor_raw": str(valor_raw), "problema": problema}


def canonicalize_uf(df: pd.DataFrame, uf_region_map_path: Path) -> tuple[pd.DataFrame, list[dict]]:
    """Mapeia UFs brutas para códigos canônicos e adiciona região."""
    qa: list[dict] = []
    if not uf_region_map_path.exists():
        raise FileNotFoundError(f"Arquivo de mapeamento UF não encontrado: {uf_region_map_path}")
    ref = pd.read_csv(uf_region_map_path, dtype=str).fillna("")
    uf_map = {row["uf"].strip().upper(): row for _, row in ref.iterrows()}
    uf_col = _find_col(df, _UF_COLS_PRIORITY)
    if uf_col is None:
        logger.warning("Nenhuma coluna de UF encontrada. Colunas: %s", list(df.columns))
        return df, qa
    df = df.copy()
    canonical_ufs, estados, regioes, regioes_sigla = [], [], [], []
    for idx, raw in df[uf_col].items():
        val = _strip_str(raw).upper()
        if val in uf_map:
            r = uf_map[val]
            canonical_ufs.append(r["uf"]); estados.append(r["estado_nome"]); regioes.append(r["regiao"]); regioes_sigla.append(r["regiao_sigla"])
        else:
            canonical_ufs.append(val or "DESCONHECIDO"); estados.append(""); regioes.append(""); regioes_sigla.append("")
            if val:
                qa.append(_qa_record("canonicalize_uf", idx, uf_col, raw, f"UF '{val}' não encontrada no mapa de referência"))
    df["uf"] = canonical_ufs; df["estado_nome"] = estados; df["regiao"] = regioes; df["regiao_sigla"] = regioes_sigla
    logger.info("canonicalize_uf: %d/%d mapeadas (%d anomalias)", sum(1 for u in canonical_ufs if u != "DESCONHECIDO"), len(df), len(qa))
    return df, qa


def canonicalize_caa(df: pd.DataFrame, caa_dict_path: Path) -> tuple[pd.DataFrame, list[dict]]:
    """Mapeia variantes de CAA para identificadores canônicos."""
    qa: list[dict] = []
    dict_file = caa_dict_path / "caa_dictionary.csv" if caa_dict_path.is_dir() else caa_dict_path
    if not dict_file.exists():
        raise FileNotFoundError(f"Dicionário de CAAs não encontrado: {dict_file}")
    ref = pd.read_csv(dict_file, dtype=str).fillna("")
    caa_map = {_strip_str(row["variante_raw"]).upper(): row.to_dict() for _, row in ref.iterrows()}
    caa_col = _find_col(df, _CAA_COLS_PRIORITY)
    if caa_col is None:
        logger.warning("Nenhuma coluna de CAA encontrada. Colunas: %s", list(df.columns))
        return df, qa
    df = df.copy()
    canonical_caas, nomes_completos = [], []
    for idx, raw in df[caa_col].items():
        val = _strip_str(raw).upper()
        if val in caa_map:
            canonical_caas.append(caa_map[val]["caa_canonico"]); nomes_completos.append(caa_map[val]["nome_completo"])
        else:
            found = next((r for k, r in caa_map.items() if k and (k in val or val in k)), None)
            if found:
                canonical_caas.append(found["caa_canonico"]); nomes_completos.append(found["nome_completo"])
            else:
                canonical_caas.append(val or "DESCONHECIDO"); nomes_completos.append("")
                if val:
                    qa.append(_qa_record("canonicalize_caa", idx, caa_col, raw, f"CAA '{val}' não encontrado no dicionário"))
    df["caa"] = canonical_caas; df["caa_nome_completo"] = nomes_completos
    logger.info("canonicalize_caa: %d/%d mapeadas (%d anomalias)", sum(1 for c in canonical_caas if c != "DESCONHECIDO"), len(df), len(qa))
    return df, qa


def canonicalize_categories(df: pd.DataFrame, taxonomy_path: Path) -> tuple[pd.DataFrame, list[dict]]:
    """Mapeia categorias brutas para a taxonomia canônica."""
    qa: list[dict] = []
    if not taxonomy_path.exists():
        raise FileNotFoundError(f"Taxonomia não encontrada: {taxonomy_path}")
    ref = pd.read_csv(taxonomy_path, dtype=str).fillna("")
    tax_map = {_strip_str(row["variante_raw"]).lower(): row.to_dict() for _, row in ref.iterrows()}
    cat_col = _find_col(df, _CATEGORY_COLS_PRIORITY)
    sub_col = _find_col(df, _SUBCATEGORY_COLS_PRIORITY)
    if cat_col is None:
        logger.warning("Nenhuma coluna de categoria encontrada. Colunas: %s", list(df.columns))
        return df, qa
    df = df.copy()
    canonical_cats, canonical_subs, pilares = [], [], []
    for idx, raw in df[cat_col].items():
        val = _strip_str(raw).lower()
        if val in tax_map:
            e = tax_map[val]; canonical_cats.append(e["categoria_canonica"]); canonical_subs.append(e["subcategoria_canonica"]); pilares.append(e["pilar_editorial"])
        else:
            found = next((e for k, e in tax_map.items() if k and (k in val or val in k)), None)
            if found:
                canonical_cats.append(found["categoria_canonica"]); canonical_subs.append(found["subcategoria_canonica"]); pilares.append(found["pilar_editorial"])
            else:
                canonical_cats.append(_strip_str(raw) or "Outros"); canonical_subs.append(""); pilares.append("Outros")
                if val:
                    qa.append(_qa_record("canonicalize_categories", idx, cat_col, raw, f"Categoria '{raw}' não encontrada na taxonomia"))
    df["categoria"] = canonical_cats; df["pilar_editorial"] = pilares
    df["subcategoria"] = df[sub_col].fillna("").astype(str) if (sub_col and sub_col != "subcategoria") else canonical_subs
    logger.info("canonicalize_categories: %d/%d mapeadas (%d anomalias)", sum(1 for c in canonical_cats if c != "Outros"), len(df), len(qa))
    return df, qa


def reconcile_interactions(df: pd.DataFrame) -> tuple[pd.DataFrame, list[dict]]:
    """Reconcilia campos de interação em métricas autoritativas."""
    qa: list[dict] = []
    df = df.copy()
    int_col = _find_col(df, _INTERACTION_COLS_PRIORITY)
    share_col = _find_col(df, _SHARE_COLS_PRIORITY)

    def _safe_int(val, idx, col):
        try:
            v = str(val).strip().replace(",", "").replace(".", "")
            return int(float(v)) if v else 0
        except (ValueError, TypeError):
            qa.append(_qa_record("reconcile_interactions", idx, col, val, f"Valor '{val}' não convertível para inteiro; substituído por 0"))
            return 0

    df["total_interacoes"] = [_safe_int(v, idx, int_col or "?") for idx, v in (df[int_col].items() if int_col else enumerate([0]*len(df)))]
    df["compartilhamentos"] = [_safe_int(v, idx, share_col or "?") for idx, v in (df[share_col].items() if share_col else enumerate([0]*len(df)))]
    if not int_col:
        logger.warning("Nenhuma coluna de interações encontrada. 'total_interacoes' será 0.")
    if not share_col:
        logger.warning("Nenhuma coluna de compartilhamentos encontrada. 'compartilhamentos' será 0.")
    logger.info("reconcile_interactions: soma_interacoes=%d, soma_compartilhamentos=%d (%d anomalias)", df["total_interacoes"].sum(), df["compartilhamentos"].sum(), len(qa))
    return df, qa


def cast_types(df: pd.DataFrame) -> tuple[pd.DataFrame, list[dict]]:
    """Converte colunas para tipos corretos e deriva colunas de data."""
    qa: list[dict] = []
    df = df.copy()
    date_col = _find_col(df, _DATE_COLS_PRIORITY)
    if date_col:
        parsed_dates = []
        for idx, raw in df[date_col].items():
            val = _strip_str(raw)
            if not val:
                parsed_dates.append(pd.NaT); continue
            parsed = None
            for fmt in ("%Y-%m-%d", "%d/%m/%Y", "%Y/%m/%d", "%d-%m-%Y"):
                try:
                    parsed = pd.to_datetime(val, format=fmt); break
                except (ValueError, TypeError):
                    continue
            if parsed is None:
                try:
                    parsed = pd.to_datetime(val, infer_datetime_format=True)
                except (ValueError, TypeError):
                    qa.append(_qa_record("cast_types", idx, date_col, raw, f"Data '{raw}' não interpretável; definida como NaT"))
            parsed_dates.append(parsed)
        df["data"] = pd.to_datetime(parsed_dates, errors="coerce")
        df["ano_mes"] = df["data"].dt.to_period("M").astype(str)
        df["ano"] = df["data"].dt.year.astype("Int64")
        df["mes"] = df["data"].dt.month.astype("Int64")
        logger.info("cast_types: %d/%d datas convertidas (%d anomalias)", df["data"].notna().sum(), len(df), len(qa))
    for col in ["caa", "uf", "categoria", "subcategoria", "pilar_editorial", "regiao"]:
        if col in df.columns:
            df[col] = df[col].fillna("").astype(str).str.strip()
    return df, qa


def normalize(df: pd.DataFrame, config: dict) -> tuple[pd.DataFrame, list[dict]]:
    """
    Executa o pipeline completo de normalização na ordem correta.

    Ordem: canonicalize_uf → canonicalize_caa → canonicalize_categories
           → reconcile_interactions → cast_types

    Args:
        df: DataFrame bruto do estágio de ingestão.
        config: Dicionário de configuração carregado do config.yaml.

    Returns:
        Tupla de (DataFrame limpo, lista consolidada de registros QA).
    """
    all_qa: list[dict] = []
    repo_root = Path(__file__).resolve().parents[2]
    ref = config.get("reference", {}) if config else {}
    uf_map_path = Path(ref.get("uf_region_map", repo_root / "data" / "reference" / "uf_region_map.csv"))
    caa_dict_path = Path(ref.get("caa_dictionary", repo_root / "data" / "reference" / "caa_dictionary"))
    taxonomy_path = Path(ref.get("category_taxonomy", repo_root / "data" / "reference" / "category_taxonomy.csv"))

    logger.info("=== Normalização: início (%d linhas × %d colunas) ===", len(df), len(df.columns))
    df, qa = canonicalize_uf(df, uf_map_path); all_qa.extend(qa)
    df, qa = canonicalize_caa(df, caa_dict_path); all_qa.extend(qa)
    df, qa = canonicalize_categories(df, taxonomy_path); all_qa.extend(qa)
    df, qa = reconcile_interactions(df); all_qa.extend(qa)
    df, qa = cast_types(df); all_qa.extend(qa)
    logger.info("=== Normalização: concluída. %d linhas limpas, %d problemas QA ===", len(df), len(all_qa))
    return df, all_qa
