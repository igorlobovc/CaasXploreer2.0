// ============================================================
// DATA: Manual Review Dataset – aggregated counts
// Source: data/raw/manual_review/MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.csv
// Generated: 2026-03-09
// Total records: 15175
// ============================================================

export interface UfCount {
  uf: string;
  count: number;
}

export interface CategoriaCount {
  categoria: string;
  count: number;
}

export interface ServicoCount {
  servico: string;
  count: number;
}

export interface FonteCount {
  fonte: string;
  count: number;
}

export interface ManualReviewSummary {
  totalRecords: number;
  distinctUFs: number;
  distinctCategorias: number;
  distinctServicos: number;
  distinctFontes: number;
}

// ── UF list (28 states/regions) ──────────────────────────────
// Note: 'BR' (count: 1) is a national-level entity in the source data, not a state.
export const ufDistribution: UfCount[] = [
  { uf: 'AC', count: 758 },
  { uf: 'AL', count: 473 },
  { uf: 'AM', count: 925 },
  { uf: 'AP', count: 287 },
  { uf: 'BA', count: 573 },
  { uf: 'BR', count: 1 }, // national-level entity
  { uf: 'CE', count: 404 },
  { uf: 'DF', count: 1296 },
  { uf: 'ES', count: 1543 },
  { uf: 'GO', count: 767 },
  { uf: 'MA', count: 447 },
  { uf: 'MG', count: 20 },
  { uf: 'MS', count: 217 },
  { uf: 'MT', count: 154 },
  { uf: 'PA', count: 291 },
  { uf: 'PB', count: 269 },
  { uf: 'PE', count: 484 },
  { uf: 'PI', count: 971 },
  { uf: 'PR', count: 474 },
  { uf: 'RJ', count: 688 },
  { uf: 'RN', count: 370 },
  { uf: 'RO', count: 912 },
  { uf: 'RR', count: 423 },
  { uf: 'RS', count: 613 },
  { uf: 'SC', count: 422 },
  { uf: 'SE', count: 224 },
  { uf: 'SP', count: 784 },
  { uf: 'TO', count: 384 },
];

// ── Categorias (12 distinct) ──────────────────────────────────
export const categoriaDistribution: CategoriaCount[] = [
  { categoria: 'Ações Institucionais', count: 6423 },
  { categoria: 'Convênios e Benefícios', count: 2763 },
  { categoria: 'Saúde', count: 2223 },
  { categoria: 'Esporte e Treino', count: 1059 },
  { categoria: 'Social e Eventos', count: 714 },
  { categoria: 'Financeiro', count: 432 },
  { categoria: 'Evidência Pública', count: 392 },
  { categoria: 'Bem-estar Estético', count: 374 },
  { categoria: 'Sorteios e Promoções', count: 363 },
  { categoria: 'Infraestrutura e Serviços', count: 346 },
  { categoria: 'Identidade e Cultura', count: 67 },
  { categoria: 'Família e Maternidade', count: 19 },
];

// ── Serviços (8 distinct) ─────────────────────────────────────
export const servicoDistribution: ServicoCount[] = [
  { servico: 'Eventos', count: 5526 },
  { servico: 'Benefícios', count: 3346 },
  { servico: 'Saúde', count: 2597 },
  { servico: 'Atendimento Institucional', count: 1710 },
  { servico: 'Esporte e Bem-Estar', count: 1059 },
  { servico: 'Digital', count: 480 },
  { servico: 'Educação', count: 237 },
  { servico: 'Infraestrutura', count: 220 },
];

// ── Fontes (1 distinct) ───────────────────────────────────────
export const fonteDistribution: FonteCount[] = [
  { fonte: 'INSTAGRAM', count: 15175 },
];

// ── Derived lists for filter/select UI ───────────────────────
export const ufs: string[] = ufDistribution.map((d) => d.uf);
export const categorias: string[] = categoriaDistribution.map((d) => d.categoria);
export const servicos: string[] = servicoDistribution.map((d) => d.servico);
export const fontes: string[] = fonteDistribution.map((d) => d.fonte);

// ── Aggregate summary ─────────────────────────────────────────
export const manualReviewSummary: ManualReviewSummary = {
  totalRecords: 15175,
  distinctUFs: ufDistribution.length,
  distinctCategorias: categoriaDistribution.length,
  distinctServicos: servicoDistribution.length,
  distinctFontes: fonteDistribution.length,
};
