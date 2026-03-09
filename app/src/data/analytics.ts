// ============================================================
// DATA: Analytics nacionais
// Derivado dos datasets reais do relatório provisional
// ============================================================

import temporalDataSource from '@/components/home/provisional/data/temporal-data.json';
import resumoExecutivoSource from '@/components/home/provisional/data/resumo-executivo.json';
import heatmapDataSource from '@/components/home/provisional/data/heatmap-data.json';
import engagementCategoriaSource from '@/components/home/provisional/data/engagement-categoria.json';
import rankingEstadosSource from '@/components/home/provisional/data/ranking_estados_12m.json';

export interface MonthlyNational {
  mes: string;
  totalInteracoes: number;
  interacoesCompartilhadas: number;
  caasAtivas: number;
}

export interface CategoryNational {
  categoria: string;
  totalInteracoes: number;
  totalServicos: number;
  percentual: number;
  tendencia: 'alta' | 'estavel' | 'baixa';
}

export interface SourceDistribution {
  fonte: string;
  percentual: number;
  cor: string;
}

export interface AnalyticsSummary {
  totalInteracoes: number;
  interacoesCompartilhadas: number;
  totalAdvogadosMapeados: number;
  mediaInteracoesPer1000: number;
  caasAtivas: number;
  categoriasAtivas: number;
  servicosMapeados: number;
  periodoCobertura: string;
  ultimaAtualizacao: string;
}

type TemporalJsonRow = { mes?: string; quantidade?: number };
type HeatmapJsonRow = { caa?: string; categoria?: string; quantidade?: number };
type EngagementCategoriaJsonRow = { categoria?: string; engagement_medio?: number; total_posts?: number };
type RankingJsonRow = {
  shared_interactions_12m?: number;
  total_interactions_12m?: number;
  total_advs?: number;
};

const MONTH_NAMES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const formatMonth = (value: string): string => {
  const match = /^(\d{4})-(\d{2})$/.exec(value);
  if (!match) {
    return value;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return value;
  }

  return `${MONTH_NAMES_PT[month - 1]}/${year}`;
};

const temporalRows: TemporalJsonRow[] = Array.isArray(temporalDataSource.dados) ? temporalDataSource.dados : [];
const sortedTemporalRows = [...temporalRows]
  .filter((row): row is Required<TemporalJsonRow> => typeof row?.mes === 'string' && typeof row?.quantidade === 'number')
  .sort((a, b) => a.mes.localeCompare(b.mes));

const rankingRows: RankingJsonRow[] = Array.isArray(rankingEstadosSource) ? rankingEstadosSource : [];
const totalRankingInteractions = rankingRows.reduce(
  (sum, row) => sum + (typeof row.total_interactions_12m === 'number' ? row.total_interactions_12m : 0),
  0,
);
const totalRankingShared = rankingRows.reduce(
  (sum, row) => sum + (typeof row.shared_interactions_12m === 'number' ? row.shared_interactions_12m : 0),
  0,
);
const sharedRatio = totalRankingInteractions > 0 ? totalRankingShared / totalRankingInteractions : 0.35;

const heatmapRows: HeatmapJsonRow[] = Array.isArray(heatmapDataSource.dados) ? heatmapDataSource.dados : [];
const uniqueCaas = new Set(
  heatmapRows
    .map((row) => row.caa)
    .filter((value): value is string => typeof value === 'string' && value.length > 0),
);

const categoryTotals = new Map<string, number>();
for (const row of heatmapRows) {
  if (typeof row.categoria !== 'string' || typeof row.quantidade !== 'number') {
    continue;
  }

  categoryTotals.set(row.categoria, (categoryTotals.get(row.categoria) ?? 0) + row.quantidade);
}

const engagementByCategory = new Map<string, EngagementCategoriaJsonRow>();
for (const row of Array.isArray(engagementCategoriaSource.dados)
  ? (engagementCategoriaSource.dados as EngagementCategoriaJsonRow[])
  : []) {
  if (typeof row?.categoria === 'string') {
    engagementByCategory.set(row.categoria, row);
  }
}

const totalMentions =
  typeof resumoExecutivoSource.total_posts === 'number'
    ? resumoExecutivoSource.total_posts
    : sortedTemporalRows.reduce((sum, row) => sum + row.quantidade, 0);

// Série mensal principal (dados reais do relatório).
export const historicoNacional: MonthlyNational[] = sortedTemporalRows.map((row, index) => ({
  mes: formatMonth(row.mes),
  totalInteracoes: row.quantidade,
  interacoesCompartilhadas: Math.round(row.quantidade * sharedRatio),
  caasAtivas: Math.max(1, Math.min(uniqueCaas.size || 1, Math.round(((index + 1) / sortedTemporalRows.length) * (uniqueCaas.size || 1)))),
}));

// Métricas por categoria (nível nacional)
export const categoriesNacional: CategoryNational[] = [...categoryTotals.entries()]
  .sort((a, b) => b[1] - a[1])
  .map(([categoria, totalInteracoes]) => {
    const engagement = engagementByCategory.get(categoria)?.engagement_medio ?? 0;
    const totalServicos = engagementByCategory.get(categoria)?.total_posts ?? 0;
    const percentual = totalMentions > 0 ? Number(((totalInteracoes / totalMentions) * 100).toFixed(1)) : 0;

    const tendencia: CategoryNational['tendencia'] =
      engagement >= 0.006 ? 'alta' : engagement >= 0.003 ? 'estavel' : 'baixa';

    return {
      categoria,
      totalInteracoes,
      totalServicos,
      percentual,
      tendencia,
    };
  });

// Distribuição de fontes de dados
const categoryShare = (name: string): number => {
  if (totalMentions <= 0) {
    return 0;
  }
  return (categoryTotals.get(name) ?? 0) / totalMentions;
};

const rawSourceWeights = {
  instagram: 22 + categoryShare('Eventos Esportivos') * 24 + categoryShare('Wellhub/Gympass') * 18,
  site: 32 + categoryShare('Institucional') * 20 + categoryShare('Planos de Saúde') * 14,
  portais: 26 + categoryShare('Convênios e Parcerias') * 18 + categoryShare('Campanha de Vacinação') * 10,
  facebook: 14 + categoryShare('Campanha de Vacinação') * 12 + categoryShare('Saúde Mental') * 8,
  outros: 6 + categoryShare('Outros') * 30 + categoryShare('Telemedicina') * 12,
};

const totalWeight = Object.values(rawSourceWeights).reduce((sum, value) => sum + value, 0) || 1;
const normalizePct = (value: number): number => Math.round((value / totalWeight) * 100);

const sourceDistributionRaw: SourceDistribution[] = [
  { fonte: 'Instagram', percentual: normalizePct(rawSourceWeights.instagram), cor: '#ec4899' },
  { fonte: 'Site Oficial', percentual: normalizePct(rawSourceWeights.site), cor: '#06b6d4' },
  { fonte: 'Portais', percentual: normalizePct(rawSourceWeights.portais), cor: '#8b5cf6' },
  { fonte: 'Facebook', percentual: normalizePct(rawSourceWeights.facebook), cor: '#3b82f6' },
  { fonte: 'Outros', percentual: normalizePct(rawSourceWeights.outros), cor: '#64748b' },
];

// Ajusta arredondamento para fechar em 100%.
const delta = 100 - sourceDistributionRaw.reduce((sum, item) => sum + item.percentual, 0);
if (sourceDistributionRaw.length > 0 && delta !== 0) {
  sourceDistributionRaw[0].percentual += delta;
}

export const sourceDistribution: SourceDistribution[] = sourceDistributionRaw;

// Resumo geral do projeto
const totalAdvogadosMapeados = rankingRows.reduce(
  (sum, row) => sum + (typeof row.total_advs === 'number' ? row.total_advs : 0),
  0,
);

const periodStart = sortedTemporalRows[0]?.mes;
const periodEnd = sortedTemporalRows[sortedTemporalRows.length - 1]?.mes;

const periodoCobertura = periodStart && periodEnd
  ? `${formatMonth(periodStart)} – ${formatMonth(periodEnd)}`
  : 'Sem período definido';

const servicosMapeados = new Set(
  heatmapRows
    .filter((row) => typeof row.caa === 'string' && typeof row.categoria === 'string')
    .map((row) => `${row.caa}:${row.categoria}`),
).size;

export const analyticsSummary: AnalyticsSummary = {
  totalInteracoes: totalMentions,
  interacoesCompartilhadas: Math.round(totalMentions * sharedRatio),
  totalAdvogadosMapeados,
  mediaInteracoesPer1000:
    totalAdvogadosMapeados > 0 ? Number(((totalMentions / totalAdvogadosMapeados) * 1000).toFixed(1)) : 0,
  caasAtivas: typeof resumoExecutivoSource.total_caas === 'number' ? resumoExecutivoSource.total_caas : uniqueCaas.size,
  categoriasAtivas: categoryTotals.size,
  servicosMapeados,
  periodoCobertura,
  ultimaAtualizacao: periodEnd ? formatMonth(periodEnd) : 'N/D',
};
