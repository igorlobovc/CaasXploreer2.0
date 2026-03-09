// ============================================================
// DATA: Manual Review Dataset – aggregated for frontend usage
// Derived from data/normalized/manual_review/manual_review.preview.json
// Source: MERGED_POST_WALL_2022_2026_CLASSIFIED_V2_QA.csv
// ============================================================

export interface UfDistributionItem {
  uf: string;
  count: number;
}

export interface CategoriaDistributionItem {
  categoria: string;
  count: number;
}

export interface ServicoDistributionItem {
  servico: string;
  count: number;
}

export interface FonteDistributionItem {
  fonte: string;
  count: number;
}

export interface EntidadeDistributionItem {
  entidade: string;
  count: number;
}

export interface ManualReviewSummary {
  totalRows: number;
  sampleSize: number;
  generatedAt: string;
  distinctUFs: number;
  distinctCategorias: number;
  distinctServicos: number;
  distinctFontes: number;
  distinctEntidades: number;
}

// ── Aggregated counts (from 200-row preview sample of 15,175 total rows) ──────

export const ufDistribution: UfDistributionItem[] = [
  { uf: 'ES', count: 69 },
  { uf: 'TO', count: 40 },
  { uf: 'DF', count: 40 },
  { uf: 'SC', count: 23 },
  { uf: 'GO', count: 15 },
  { uf: 'RJ', count: 12 },
  { uf: 'MS', count: 1 },
];

export const categoriaDistribution: CategoriaDistributionItem[] = [
  { categoria: 'Ações Institucionais', count: 69 },
  { categoria: 'Convênios e Benefícios', count: 62 },
  { categoria: 'Esporte e Treino', count: 28 },
  { categoria: 'Saúde', count: 12 },
  { categoria: 'Social e Eventos', count: 11 },
  { categoria: 'Evidência Pública', count: 9 },
  { categoria: 'Bem-estar Estético', count: 6 },
  { categoria: 'Infraestrutura e Serviços', count: 2 },
  { categoria: 'Financeiro', count: 1 },
];

export const servicoDistribution: ServicoDistributionItem[] = [
  { servico: 'Benefícios', count: 60 },
  { servico: 'Eventos', count: 58 },
  { servico: 'Esporte e Bem-Estar', count: 28 },
  { servico: 'Atendimento Institucional', count: 24 },
  { servico: 'Saúde', count: 18 },
  { servico: 'Digital', count: 7 },
  { servico: 'Educação', count: 3 },
  { servico: 'Infraestrutura', count: 2 },
];

export const fonteDistribution: FonteDistributionItem[] = [
  { fonte: 'INSTAGRAM', count: 200 },
];

export const topEntidades: EntidadeDistributionItem[] = [
  { entidade: 'CAAES', count: 69 },
  { entidade: 'CAATO', count: 40 },
  { entidade: 'CAADF', count: 40 },
  { entidade: 'CAASC', count: 23 },
  { entidade: 'CASAG', count: 15 },
  { entidade: 'CAARJ', count: 12 },
  { entidade: 'CAAMS', count: 1 },
];

// ── Derived lists (for filters / dropdowns) ────────────────────────────────────

/** Distinct UF codes present in the dataset */
export const ufs: string[] = ufDistribution.map((item) => item.uf);

/** Distinct categoria labels present in the dataset */
export const categorias: string[] = categoriaDistribution.map((item) => item.categoria);

/** Distinct servico labels present in the dataset */
export const servicos: string[] = servicoDistribution.map((item) => item.servico);

/** Distinct fonte labels present in the dataset */
export const fontes: string[] = fonteDistribution.map((item) => item.fonte);

// ── Dataset summary ────────────────────────────────────────────────────────────

export const manualReviewSummary: ManualReviewSummary = {
  totalRows: 15175,
  sampleSize: 200,
  generatedAt: '2026-03-09T16:53:20.081Z',
  distinctUFs: ufs.length,
  distinctCategorias: categorias.length,
  distinctServicos: servicos.length,
  distinctFontes: fontes.length,
  distinctEntidades: topEntidades.length,
};
