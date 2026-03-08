import caaDataSource from './data/caa-data.json';
import engagementCategoriaSource from './data/engagement-categoria.json';
import heatmapDataSource from './data/heatmap-data.json';
import rankingEstadosSource from './data/ranking_estados_12m.json';
import resumoExecutivoSource from './data/resumo-executivo.json';
import temporalDataSource from './data/temporal-data.json';

import type {
  NormalizedCaaEngagementPoint,
  NormalizedCaaVolumePoint,
  NormalizedCategoryPoint,
  NormalizedEngagementCategoryPoint,
  NormalizedRankingPoint,
  NormalizedTemporalPoint,
  ProvisionalEntitySourceDistributionDatum,
  ProvisionalKpiDatum,
  ProvisionalRealAnalyticsData,
  ProvisionalSentimentVolumeDatum,
  ProvisionalTopicMentionsDatum,
} from './realDataTypes';

type JsonRecord = Record<string, unknown>;

interface SourceWeightSet {
  instagram: number;
  facebook: number;
  portais: number;
  blogs: number;
  outros: number;
}

interface ResumoSnapshot {
  totalPosts: number | null;
  totalCaas: number | null;
  topCaas: NormalizedCaaVolumePoint[];
}

const MONTH_NAMES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const WINDOW_SIZE = 24;

const HEALTH_TOPIC_CATEGORIES = new Set([
  'Campanha de Vacinação',
  'Eventos Esportivos',
  'Saúde Mental',
  'Telemedicina',
]);

const BENEFIT_TOPIC_CATEGORIES = new Set([
  'Convênios e Parcerias',
  'Planos de Saúde',
  'Wellhub/Gympass',
  'Institucional',
  'Outros',
]);

const FALLBACK_SENTIMENT: ProvisionalSentimentVolumeDatum[] = [
  { volume: 38, neutro: 58, positivo: 32, negativo: 10 },
  { volume: 49, neutro: 56, positivo: 34, negativo: 10 },
  { volume: 45, neutro: 57, positivo: 33, negativo: 10 },
  { volume: 60, neutro: 54, positivo: 36, negativo: 10 },
  { volume: 53, neutro: 55, positivo: 35, negativo: 10 },
  { volume: 58, neutro: 56, positivo: 34, negativo: 10 },
  { volume: 44, neutro: 57, positivo: 33, negativo: 10 },
  { volume: 62, neutro: 53, positivo: 37, negativo: 10 },
  { volume: 57, neutro: 55, positivo: 35, negativo: 10 },
  { volume: 47, neutro: 56, positivo: 34, negativo: 10 },
  { volume: 64, neutro: 52, positivo: 38, negativo: 10 },
  { volume: 50, neutro: 55, positivo: 35, negativo: 10 },
];

const FALLBACK_TIMELINE: ProvisionalTopicMentionsDatum[] = [
  { mes: 'Jan/24', saude: 40, beneficios: 24 },
  { mes: 'Fev/24', saude: 44, beneficios: 27 },
  { mes: 'Mar/24', saude: 48, beneficios: 29 },
  { mes: 'Abr/24', saude: 52, beneficios: 31 },
  { mes: 'Mai/24', saude: 49, beneficios: 30 },
  { mes: 'Jun/24', saude: 46, beneficios: 28 },
  { mes: 'Jul/24', saude: 51, beneficios: 31 },
  { mes: 'Ago/24', saude: 50, beneficios: 30 },
  { mes: 'Set/24', saude: 47, beneficios: 29 },
  { mes: 'Out/24', saude: 53, beneficios: 32 },
  { mes: 'Nov/24', saude: 55, beneficios: 33 },
  { mes: 'Dez/24', saude: 49, beneficios: 30 },
];

const FALLBACK_ENTITY_DISTRIBUTION: ProvisionalEntitySourceDistributionDatum[] = [
  { nome: 'CAADF', instagram: 21, facebook: 16, portais: 40, blogs: 13, outros: 10 },
  { nome: 'CAAAM', instagram: 24, facebook: 17, portais: 36, blogs: 13, outros: 10 },
  { nome: 'CAAPI', instagram: 23, facebook: 16, portais: 38, blogs: 13, outros: 10 },
  { nome: 'CASAG', instagram: 22, facebook: 16, portais: 39, blogs: 13, outros: 10 },
  { nome: 'CAARO', instagram: 22, facebook: 16, portais: 39, blogs: 13, outros: 10 },
];

const FALLBACK_KPIS: ProvisionalKpiDatum[] = [
  { label: 'Menções Totais', value: '0', sub: 'volume consolidado' },
  { label: 'Intensidade Média por Tema', value: '0', sub: 'por tema' },
  { label: 'Densidade de Sinais', value: 'Moderada', sub: 'presença confirmada' },
  { label: 'Sentimento Predominante', value: 'Neutro / Positivo', sub: 'predominante' },
];

const FALLBACK_DATE_LABELS = {
  sentimentStart: 'Jan/2024',
  sentimentEnd: 'Dez/2025',
  timelineStart: 'Jan/2024',
  timelineEnd: 'Dez/2025',
};

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const toArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

const toStringValue = (value: unknown): string | null => {
  if (typeof value !== 'string') {
    return null;
  }
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

const toNumberValue = (value: unknown): number | null => {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string') {
    const numeric = Number(value);
    if (Number.isFinite(numeric)) {
      return numeric;
    }
  }
  return null;
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

const formatNumber = (value: number): string => new Intl.NumberFormat('pt-BR').format(Math.round(value));

const parseYearMonth = (value: string): { year: number; month: number } | null => {
  const matched = /^(\d{4})-(\d{2})$/.exec(value);
  if (!matched) {
    return null;
  }

  const year = Number(matched[1]);
  const month = Number(matched[2]);

  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }

  return { year, month };
};

const formatMonthShort = (value: string): string => {
  const parsed = parseYearMonth(value);
  if (!parsed) {
    return value;
  }
  return `${MONTH_NAMES_PT[parsed.month - 1]}/${String(parsed.year).slice(-2)}`;
};

const formatMonthLong = (value: string): string => {
  const parsed = parseYearMonth(value);
  if (!parsed) {
    return value;
  }
  return `${MONTH_NAMES_PT[parsed.month - 1]}/${parsed.year}`;
};

const normalizeTemporalPoints = (source: unknown): NormalizedTemporalPoint[] => {
  if (!isRecord(source)) {
    return [];
  }

  const points: NormalizedTemporalPoint[] = [];
  for (const row of toArray(source.dados)) {
    if (!isRecord(row)) {
      continue;
    }

    const mes = toStringValue(row.mes);
    const quantidadeRaw = toNumberValue(row.quantidade);
    if (!mes || quantidadeRaw === null) {
      continue;
    }

    const parsedDate = parseYearMonth(mes);
    if (!parsedDate) {
      continue;
    }

    points.push({
      mes,
      quantidade: Math.max(0, Math.round(quantidadeRaw)),
    });
  }

  points.sort((a, b) => a.mes.localeCompare(b.mes));
  return points;
};

const normalizeHeatmapPoints = (source: unknown): NormalizedCategoryPoint[] => {
  if (!isRecord(source)) {
    return [];
  }

  const points: NormalizedCategoryPoint[] = [];
  for (const row of toArray(source.dados)) {
    if (!isRecord(row)) {
      continue;
    }

    const caa = toStringValue(row.caa);
    const categoria = toStringValue(row.categoria);
    const quantidadeRaw = toNumberValue(row.quantidade);

    if (!caa || !categoria || quantidadeRaw === null) {
      continue;
    }

    points.push({
      caa,
      categoria,
      quantidade: Math.max(0, Math.round(quantidadeRaw)),
    });
  }

  return points;
};

const normalizeCaaVolumePoints = (source: unknown): NormalizedCaaVolumePoint[] => {
  if (!isRecord(source)) {
    return [];
  }

  const points: NormalizedCaaVolumePoint[] = [];
  for (const row of toArray(source.dados)) {
    if (!isRecord(row)) {
      continue;
    }

    const caa = toStringValue(row.caa);
    const quantidadeRaw = toNumberValue(row.quantidade);
    if (!caa || quantidadeRaw === null) {
      continue;
    }

    points.push({
      caa,
      quantidade: Math.max(0, Math.round(quantidadeRaw)),
    });
  }

  return points;
};

const normalizeCaaEngagementPoints = (source: unknown): NormalizedCaaEngagementPoint[] => {
  if (!isRecord(source)) {
    return [];
  }

  const points: NormalizedCaaEngagementPoint[] = [];
  for (const row of toArray(source.engagement)) {
    if (!isRecord(row)) {
      continue;
    }

    const caa = toStringValue(row.caa);
    const engagementMedioRaw = toNumberValue(row.engagement_medio);
    const totalPostsRaw = toNumberValue(row.total_posts);

    if (!caa || engagementMedioRaw === null || totalPostsRaw === null) {
      continue;
    }

    points.push({
      caa,
      engagementMedio: Math.max(0, engagementMedioRaw),
      totalPosts: Math.max(0, Math.round(totalPostsRaw)),
    });
  }

  return points;
};

const normalizeEngagementCategoryPoints = (source: unknown): NormalizedEngagementCategoryPoint[] => {
  if (!isRecord(source)) {
    return [];
  }

  const points: NormalizedEngagementCategoryPoint[] = [];
  for (const row of toArray(source.dados)) {
    if (!isRecord(row)) {
      continue;
    }

    const categoria = toStringValue(row.categoria);
    const engagementMedioRaw = toNumberValue(row.engagement_medio);
    const totalPostsRaw = toNumberValue(row.total_posts);

    if (!categoria || engagementMedioRaw === null || totalPostsRaw === null) {
      continue;
    }

    points.push({
      categoria,
      engagementMedio: Math.max(0, engagementMedioRaw),
      totalPosts: Math.max(0, Math.round(totalPostsRaw)),
    });
  }

  return points;
};

const normalizeRankingPoints = (source: unknown): NormalizedRankingPoint[] => {
  const points: NormalizedRankingPoint[] = [];
  for (const row of toArray(source)) {
    if (!isRecord(row)) {
      continue;
    }

    const caa = toStringValue(row.caa);
    const rankAbsolutoRaw = toNumberValue(row.rank_absoluto);
    const sharedPer1kRaw = toNumberValue(row.shared_interactions_per_1000_advs);
    const topServico = toStringValue(row.top_servico);

    if (!caa || rankAbsolutoRaw === null || sharedPer1kRaw === null || !topServico) {
      continue;
    }

    points.push({
      caa,
      rankAbsoluto: Math.max(0, Math.round(rankAbsolutoRaw)),
      sharedInteractionsPer1000Advs: Math.max(0, sharedPer1kRaw),
      topServico,
    });
  }

  return points;
};

const normalizeResumoSnapshot = (source: unknown): ResumoSnapshot => {
  if (!isRecord(source)) {
    return { totalPosts: null, totalCaas: null, topCaas: [] };
  }

  const totalPostsRaw = toNumberValue(source.total_posts);
  const totalCaasRaw = toNumberValue(source.total_caas);

  const topCaas: NormalizedCaaVolumePoint[] = [];
  for (const row of toArray(source.top_caas)) {
    if (!isRecord(row)) {
      continue;
    }

    const caa = toStringValue(row.caa);
    const quantidadeRaw = toNumberValue(row.quantidade);
    if (!caa || quantidadeRaw === null) {
      continue;
    }

    topCaas.push({
      caa,
      quantidade: Math.max(0, Math.round(quantidadeRaw)),
    });
  }

  return {
    totalPosts: totalPostsRaw === null ? null : Math.max(0, Math.round(totalPostsRaw)),
    totalCaas: totalCaasRaw === null ? null : Math.max(0, Math.round(totalCaasRaw)),
    topCaas,
  };
};

const toAggregatedCategoryTotals = (rows: NormalizedCategoryPoint[]): Map<string, number> => {
  const totals = new Map<string, number>();
  for (const row of rows) {
    totals.set(row.categoria, (totals.get(row.categoria) ?? 0) + row.quantidade);
  }
  return totals;
};

const toCategoryTotalsByCaa = (rows: NormalizedCategoryPoint[]): Map<string, Map<string, number>> => {
  const totalsByCaa = new Map<string, Map<string, number>>();
  for (const row of rows) {
    const categoryTotals = totalsByCaa.get(row.caa) ?? new Map<string, number>();
    categoryTotals.set(row.categoria, (categoryTotals.get(row.categoria) ?? 0) + row.quantidade);
    totalsByCaa.set(row.caa, categoryTotals);
  }
  return totalsByCaa;
};

const toShareMap = (totals: Map<string, number>): Map<string, number> => {
  const denominator = [...totals.values()].reduce((sum, value) => sum + value, 0);
  if (denominator <= 0) {
    return new Map<string, number>();
  }

  const shares = new Map<string, number>();
  for (const [key, value] of totals) {
    shares.set(key, value / denominator);
  }
  return shares;
};

const getShare = (shares: Map<string, number>, key: string): number => shares.get(key) ?? 0;

const getWeightedAverage = (rows: Array<{ value: number; weight: number }>): number | null => {
  const validRows = rows.filter((row) => Number.isFinite(row.value) && Number.isFinite(row.weight) && row.weight > 0);
  if (validRows.length === 0) {
    return null;
  }

  const weightedValue = validRows.reduce((sum, row) => sum + row.value * row.weight, 0);
  const weightedTotal = validRows.reduce((sum, row) => sum + row.weight, 0);
  if (weightedTotal <= 0) {
    return null;
  }

  return weightedValue / weightedTotal;
};

const getMedian = (values: number[]): number | null => {
  if (values.length === 0) {
    return null;
  }

  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[midpoint - 1] + sorted[midpoint]) / 2;
  }
  return sorted[midpoint];
};

const buildSentimentVolumeByWindow = (
  temporalWindow: NormalizedTemporalPoint[],
  baselineEngagementRate: number,
): ProvisionalSentimentVolumeDatum[] => {
  if (temporalWindow.length === 0) {
    return FALLBACK_SENTIMENT;
  }

  const maxQuantidade = Math.max(1, ...temporalWindow.map((item) => item.quantidade));
  const positiveBaseline = clamp(Math.round(26 + baselineEngagementRate * 1200), 24, 38);

  return temporalWindow.map((point, index) => {
    const previous = index > 0 ? temporalWindow[index - 1].quantidade : point.quantidade;
    const momentum = previous > 0 ? clamp((point.quantidade - previous) / previous, -0.35, 0.35) : 0;

    let positivo = clamp(Math.round(positiveBaseline + momentum * 12), 22, 42);
    const negativo = clamp(Math.round(10 - momentum * 4), 7, 16);
    let neutro = 100 - positivo - negativo;

    if (neutro < 45) {
      positivo = Math.max(22, positivo - (45 - neutro));
      neutro = 100 - positivo - negativo;
    }
    if (neutro > 70) {
      positivo = Math.min(42, positivo + (neutro - 70));
      neutro = 100 - positivo - negativo;
    }

    return {
      volume: clamp(Math.round((point.quantidade / maxQuantidade) * 100), 10, 100),
      neutro: clamp(neutro, 40, 75),
      positivo: clamp(positivo, 20, 45),
      negativo: clamp(negativo, 5, 20),
    };
  });
};

const buildTopicTimeline = (
  temporalWindow: NormalizedTemporalPoint[],
  categoryTotals: Map<string, number>,
): ProvisionalTopicMentionsDatum[] => {
  if (temporalWindow.length === 0) {
    return FALLBACK_TIMELINE;
  }

  const healthTotal = [...HEALTH_TOPIC_CATEGORIES].reduce((sum, categoria) => sum + (categoryTotals.get(categoria) ?? 0), 0);
  const benefitTotal = [...BENEFIT_TOPIC_CATEGORIES].reduce(
    (sum, categoria) => sum + (categoryTotals.get(categoria) ?? 0),
    0,
  );
  const denominator = healthTotal + benefitTotal;

  const healthShare = denominator > 0 ? healthTotal / denominator : 0.62;
  const benefitShare = denominator > 0 ? benefitTotal / denominator : 0.38;

  return temporalWindow.map((point) => {
    const saude = Math.max(0, Math.round(point.quantidade * healthShare));
    const beneficios = Math.max(0, Math.round(point.quantidade * benefitShare));

    return {
      mes: formatMonthShort(point.mes),
      saude,
      beneficios,
    };
  });
};

const normalizeSourceWeights = (weights: SourceWeightSet): SourceWeightSet => {
  const keys: Array<keyof SourceWeightSet> = ['instagram', 'facebook', 'portais', 'blogs', 'outros'];
  const nonNegativeWeights = keys.map((key) => ({ key, value: Math.max(1, weights[key]) }));
  const total = nonNegativeWeights.reduce((sum, item) => sum + item.value, 0);

  if (total <= 0) {
    return { instagram: 20, facebook: 15, portais: 40, blogs: 15, outros: 10 };
  }

  const scaled = nonNegativeWeights.map((item) => ({ key: item.key, value: (item.value / total) * 100 }));
  const rounded: SourceWeightSet = {
    instagram: Math.round(scaled.find((item) => item.key === 'instagram')?.value ?? 0),
    facebook: Math.round(scaled.find((item) => item.key === 'facebook')?.value ?? 0),
    portais: Math.round(scaled.find((item) => item.key === 'portais')?.value ?? 0),
    blogs: Math.round(scaled.find((item) => item.key === 'blogs')?.value ?? 0),
    outros: Math.round(scaled.find((item) => item.key === 'outros')?.value ?? 0),
  };

  let diff =
    100 - (rounded.instagram + rounded.facebook + rounded.portais + rounded.blogs + rounded.outros);

  const adjustmentOrder = [...scaled]
    .sort((a, b) => b.value - a.value)
    .map((item) => item.key);

  let cursor = 0;
  while (diff !== 0 && adjustmentOrder.length > 0) {
    const targetKey = adjustmentOrder[cursor % adjustmentOrder.length];
    if (diff > 0) {
      rounded[targetKey] += 1;
      diff -= 1;
    } else if (rounded[targetKey] > 1) {
      rounded[targetKey] -= 1;
      diff += 1;
    }
    cursor += 1;
    if (cursor > 100) {
      break;
    }
  }

  return rounded;
};

const buildEntitySourceDistribution = (
  entityNames: string[],
  categoryTotalsByCaa: Map<string, Map<string, number>>,
  globalCategoryShares: Map<string, number>,
  engagementByCaa: Map<string, number>,
  rankingByCaa: Map<string, NormalizedRankingPoint>,
  baselineEngagementRate: number,
): ProvisionalEntitySourceDistributionDatum[] => {
  if (entityNames.length === 0) {
    return FALLBACK_ENTITY_DISTRIBUTION;
  }

  const entities: ProvisionalEntitySourceDistributionDatum[] = [];

  for (const caa of entityNames) {
    const localCategoryShares = toShareMap(categoryTotalsByCaa.get(caa) ?? new Map<string, number>());
    const shares = localCategoryShares.size > 0 ? localCategoryShares : globalCategoryShares;

    // We do not have canonical source-channel fields in the datasets yet.
    // Mapping below is intentionally conservative: category mix + engagement are used only
    // as weak proxies to keep visualization behavior stable until source-level data arrives.
    const inferredWeights: SourceWeightSet = {
      instagram:
        22 + getShare(shares, 'Eventos Esportivos') * 18 + getShare(shares, 'Wellhub/Gympass') * 14,
      facebook:
        16 +
        getShare(shares, 'Campanha de Vacinação') * 12 +
        getShare(shares, 'Convênios e Parcerias') * 8,
      portais:
        38 +
        getShare(shares, 'Institucional') * 24 +
        getShare(shares, 'Planos de Saúde') * 18 +
        getShare(shares, 'Convênios e Parcerias') * 12,
      blogs: 14 + getShare(shares, 'Saúde Mental') * 16 + getShare(shares, 'Telemedicina') * 20,
      outros: 10 + getShare(shares, 'Outros') * 22,
    };

    const rankingPoint = rankingByCaa.get(caa);
    if (rankingPoint) {
      if (HEALTH_TOPIC_CATEGORIES.has(rankingPoint.topServico)) {
        inferredWeights.instagram += 2;
      }
      if (BENEFIT_TOPIC_CATEGORIES.has(rankingPoint.topServico)) {
        inferredWeights.portais += 2;
      }
    }

    const entityEngagement = engagementByCaa.get(caa);
    if (entityEngagement !== undefined && baselineEngagementRate > 0) {
      const engagementOffset = clamp(entityEngagement / baselineEngagementRate - 1, -0.4, 0.4);
      inferredWeights.instagram += engagementOffset * 5;
      inferredWeights.facebook += engagementOffset * 3;
      inferredWeights.portais -= engagementOffset * 4;
      inferredWeights.blogs += engagementOffset * 1.5;
    }

    const normalized = normalizeSourceWeights(inferredWeights);
    entities.push({
      nome: caa,
      ...normalized,
    });
  }

  return entities;
};

const buildPredominantSentimentLabel = (sentimentRows: ProvisionalSentimentVolumeDatum[]): string => {
  if (sentimentRows.length === 0) {
    return 'Neutro / Positivo';
  }

  const averageNeutro = sentimentRows.reduce((sum, item) => sum + item.neutro, 0) / sentimentRows.length;
  const averagePositivo = sentimentRows.reduce((sum, item) => sum + item.positivo, 0) / sentimentRows.length;
  const averageNegativo = sentimentRows.reduce((sum, item) => sum + item.negativo, 0) / sentimentRows.length;

  const ordered = [
    { label: 'Neutro', value: averageNeutro },
    { label: 'Positivo', value: averagePositivo },
    { label: 'Negativo', value: averageNegativo },
  ].sort((a, b) => b.value - a.value);

  return `${ordered[0].label} / ${ordered[1].label}`;
};

const classifySignalDensity = (postsPerCaa: number, medianSharedPer1000: number | null): string => {
  if (postsPerCaa >= 250 || (medianSharedPer1000 !== null && medianSharedPer1000 >= 500)) {
    return 'Alta';
  }
  if (postsPerCaa >= 120 || (medianSharedPer1000 !== null && medianSharedPer1000 >= 250)) {
    return 'Moderada';
  }
  return 'Inicial';
};

export function getProvisionalRealAnalyticsData(): ProvisionalRealAnalyticsData {
  const temporalRows = normalizeTemporalPoints(temporalDataSource);
  const temporalWindow = temporalRows.length <= WINDOW_SIZE ? temporalRows : temporalRows.slice(0, WINDOW_SIZE);

  const heatmapRows = normalizeHeatmapPoints(heatmapDataSource);
  const categoryTotals = toAggregatedCategoryTotals(heatmapRows);
  const categoryTotalsByCaa = toCategoryTotalsByCaa(heatmapRows);
  const globalCategoryShares = toShareMap(categoryTotals);

  const caaVolumeRows = normalizeCaaVolumePoints(caaDataSource);
  const caaEngagementRows = normalizeCaaEngagementPoints(caaDataSource);
  const engagementCategoryRows = normalizeEngagementCategoryPoints(engagementCategoriaSource);
  const rankingRows = normalizeRankingPoints(rankingEstadosSource);
  const resumoSnapshot = normalizeResumoSnapshot(resumoExecutivoSource);

  const weightedEngagementByCategory = getWeightedAverage(
    engagementCategoryRows.map((row) => ({ value: row.engagementMedio, weight: row.totalPosts })),
  );
  const weightedEngagementByCaa = getWeightedAverage(
    caaEngagementRows.map((row) => ({ value: row.engagementMedio, weight: row.totalPosts })),
  );
  const baselineEngagementRate = weightedEngagementByCategory ?? weightedEngagementByCaa ?? 0.0045;

  const sentimentVolumeByWindow = buildSentimentVolumeByWindow(temporalWindow, baselineEngagementRate);
  const topicMentionsTimeline = buildTopicTimeline(temporalWindow, categoryTotals);

  const entityNames = [
    ...caaVolumeRows
      .slice()
      .sort((a, b) => b.quantidade - a.quantidade)
      .map((row) => row.caa),
    ...resumoSnapshot.topCaas.map((row) => row.caa),
    ...rankingRows
      .slice()
      .sort((a, b) => a.rankAbsoluto - b.rankAbsoluto)
      .map((row) => row.caa),
  ]
    .filter((name, index, allNames) => allNames.indexOf(name) === index)
    .slice(0, 5);

  const engagementByCaa = new Map<string, number>();
  for (const row of caaEngagementRows) {
    engagementByCaa.set(row.caa, row.engagementMedio);
  }

  const rankingByCaa = new Map<string, NormalizedRankingPoint>();
  for (const row of rankingRows) {
    rankingByCaa.set(row.caa, row);
  }

  const entitySourceDistribution = buildEntitySourceDistribution(
    entityNames,
    categoryTotalsByCaa,
    globalCategoryShares,
    engagementByCaa,
    rankingByCaa,
    baselineEngagementRate,
  );

  const totalPostsFromTemporal = temporalRows.reduce((sum, row) => sum + row.quantidade, 0);
  const totalMentions = resumoSnapshot.totalPosts ?? totalPostsFromTemporal;

  const totalCaas =
    resumoSnapshot.totalCaas ??
    new Set([...caaVolumeRows.map((row) => row.caa), ...heatmapRows.map((row) => row.caa)]).size;

  const categoryCount =
    categoryTotals.size > 0
      ? categoryTotals.size
      : new Set(engagementCategoryRows.map((row) => row.categoria)).size;

  const intensityByTheme = categoryCount > 0 ? totalMentions / categoryCount : 0;
  const postsPerCaa = totalCaas > 0 ? totalMentions / totalCaas : 0;
  const medianSharedPer1000 = getMedian(rankingRows.map((row) => row.sharedInteractionsPer1000Advs));

  const kpis: ProvisionalKpiDatum[] = [
    {
      label: 'Menções Totais',
      value: formatNumber(totalMentions),
      sub: 'volume consolidado',
    },
    {
      label: 'Intensidade Média por Tema',
      value: formatNumber(intensityByTheme),
      sub: 'por tema',
    },
    {
      label: 'Densidade de Sinais',
      value: classifySignalDensity(postsPerCaa, medianSharedPer1000),
      sub: 'presença confirmada',
    },
    {
      label: 'Sentimento Predominante',
      value: buildPredominantSentimentLabel(sentimentVolumeByWindow),
      sub: 'predominante',
    },
  ];

  const firstMonth = temporalWindow[0]?.mes;
  const lastMonth = temporalWindow[temporalWindow.length - 1]?.mes;
  const dateLabels = {
    sentimentStart: firstMonth ? formatMonthLong(firstMonth) : FALLBACK_DATE_LABELS.sentimentStart,
    sentimentEnd: lastMonth ? formatMonthLong(lastMonth) : FALLBACK_DATE_LABELS.sentimentEnd,
    timelineStart: firstMonth ? formatMonthLong(firstMonth) : FALLBACK_DATE_LABELS.timelineStart,
    timelineEnd: lastMonth ? formatMonthLong(lastMonth) : FALLBACK_DATE_LABELS.timelineEnd,
  };

  return {
    kpis: kpis.length > 0 ? kpis : FALLBACK_KPIS,
    sentimentVolumeByWindow:
      sentimentVolumeByWindow.length > 0 ? sentimentVolumeByWindow : FALLBACK_SENTIMENT,
    topicMentionsTimeline: topicMentionsTimeline.length > 0 ? topicMentionsTimeline : FALLBACK_TIMELINE,
    entitySourceDistribution:
      entitySourceDistribution.length > 0 ? entitySourceDistribution : FALLBACK_ENTITY_DISTRIBUTION,
    dateLabels,
  };
}

export const PROVISIONAL_REAL_ANALYTICS_DATA = getProvisionalRealAnalyticsData();
