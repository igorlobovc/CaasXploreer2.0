import type {
  NormalizedCaaVolumePoint,
  NormalizedCategoryPoint,
  NormalizedEngagementCategoryPoint,
  NormalizedRankingPoint,
  NormalizedTemporalPoint,
} from './realDataTypes';

export type SourcePriorityLevel = 'canonical' | 'provisional' | 'inferred';

export interface AnalyticsSourcePriorityRule {
  useCase: string;
  primarySource: string;
  validationSources: string[];
  level: SourcePriorityLevel;
  note: string;
}

export interface AnalyticsResolverDiagnostic {
  code:
    | 'TOTAL_POSTS_MISSING'
    | 'TOTAL_POSTS_MISMATCH'
    | 'CAA_COVERAGE_MISMATCH'
    | 'CATEGORY_TAXONOMY_MISMATCH'
    | 'INFERRED_SIGNAL_PRESENT';
  message: string;
  details?: Record<string, unknown>;
}

export interface HomepageAnalyticsResolverInput {
  resumoTotalPosts: number | null;
  temporalRows: NormalizedTemporalPoint[];
  caaVolumeRows: NormalizedCaaVolumePoint[];
  rankingRows: NormalizedRankingPoint[];
  heatmapRows: NormalizedCategoryPoint[];
  engagementCategoryRows: NormalizedEngagementCategoryPoint[];
}

export const HOMEPAGE_KPI_SOURCE_PRIORITY_RULES: ReadonlyArray<AnalyticsSourcePriorityRule> = [
  {
    useCase: 'Menções Totais (global)',
    primarySource: 'resumo-executivo.json::total_posts',
    validationSources: ['temporal-data.json::sum(dados[].quantidade)'],
    level: 'canonical',
    note: 'Primary total should match temporal sum.',
  },
  {
    useCase: 'Evolução Temporal (mensal)',
    primarySource: 'temporal-data.json::dados',
    validationSources: ['resumo-executivo.json::periodo'],
    level: 'canonical',
    note: 'Temporal series is the canonical timeline window.',
  },
  {
    useCase: 'Distribuição por CAA',
    primarySource: 'heatmap-data.json::aggregate(caa)',
    validationSources: ['caa-data.json::dados'],
    level: 'provisional',
    note: 'Heatmap covers broader CAA set; caa-data is a subset candidate.',
  },
  {
    useCase: 'Distribuição por Categoria',
    primarySource: 'heatmap-data.json::aggregate(categoria)',
    validationSources: ['engagement-categoria.json::dados'],
    level: 'provisional',
    note: 'Category names align, but totals may diverge by dataset scope.',
  },
  {
    useCase: 'Densidade de Sinais per capita',
    primarySource: 'ranking_estados_12m.json',
    validationSources: ['caa-data.json::dados'],
    level: 'provisional',
    note: 'Useful for density context but may require CAA code normalization.',
  },
  {
    useCase: 'Sentimento Predominante',
    primarySource: 'none (derived)',
    validationSources: ['engagement-categoria.json::engagement_medio (proxy)'],
    level: 'inferred',
    note: 'Sentiment is inferred due to missing canonical sentiment dataset.',
  },
  {
    useCase: 'Distribuição de Fontes por Canal',
    primarySource: 'none (derived)',
    validationSources: ['heatmap-data.json + caa-data.json + ranking_estados_12m.json (proxies)'],
    level: 'inferred',
    note: 'Channel split is inferred due to missing canonical source-channel dataset.',
  },
];

const toSortedUnique = (values: string[]): string[] =>
  [...new Set(values.filter((value) => value.trim().length > 0))].sort((a, b) => a.localeCompare(b));

const getSetDifferences = (
  left: string[],
  right: string[],
): { onlyInLeft: string[]; onlyInRight: string[] } => {
  const rightSet = new Set(right);
  const leftSet = new Set(left);

  return {
    onlyInLeft: left.filter((value) => !rightSet.has(value)),
    onlyInRight: right.filter((value) => !leftSet.has(value)),
  };
};

export const getSourcePriorityRule = (useCase: string): AnalyticsSourcePriorityRule | undefined =>
  HOMEPAGE_KPI_SOURCE_PRIORITY_RULES.find((rule) => rule.useCase === useCase);

export const getInferredUseCases = (): string[] =>
  HOMEPAGE_KPI_SOURCE_PRIORITY_RULES.filter((rule) => rule.level === 'inferred').map(
    (rule) => `${rule.useCase} (${rule.primarySource})`,
  );

export const resolveHomepageAnalyticsDiagnostics = (
  input: HomepageAnalyticsResolverInput,
): AnalyticsResolverDiagnostic[] => {
  const diagnostics: AnalyticsResolverDiagnostic[] = [];

  const temporalTotal = input.temporalRows.reduce((sum, row) => sum + row.quantidade, 0);
  if (input.resumoTotalPosts === null) {
    diagnostics.push({
      code: 'TOTAL_POSTS_MISSING',
      message: '`resumo-executivo.total_posts` is missing; fallback to temporal aggregation remains active.',
    });
  } else if (input.resumoTotalPosts !== temporalTotal) {
    diagnostics.push({
      code: 'TOTAL_POSTS_MISMATCH',
      message: 'Total posts mismatch between resumo and temporal sources.',
      details: {
        resumoTotalPosts: input.resumoTotalPosts,
        temporalTotalPosts: temporalTotal,
      },
    });
  }

  const caaFromCaaData = toSortedUnique(input.caaVolumeRows.map((row) => row.caa));
  const caaFromRanking = toSortedUnique(input.rankingRows.map((row) => row.caa));
  const caaDiff = getSetDifferences(caaFromCaaData, caaFromRanking);
  if (caaDiff.onlyInLeft.length > 0 || caaDiff.onlyInRight.length > 0) {
    diagnostics.push({
      code: 'CAA_COVERAGE_MISMATCH',
      message: 'CAA coverage mismatch between caa-data and ranking sources.',
      details: {
        caaDataCount: caaFromCaaData.length,
        rankingCount: caaFromRanking.length,
        onlyInCaaData: caaDiff.onlyInLeft,
        onlyInRanking: caaDiff.onlyInRight,
      },
    });
  }

  const categoriesFromHeatmap = toSortedUnique(input.heatmapRows.map((row) => row.categoria));
  const categoriesFromEngagement = toSortedUnique(input.engagementCategoryRows.map((row) => row.categoria));
  const categoryDiff = getSetDifferences(categoriesFromHeatmap, categoriesFromEngagement);
  if (categoryDiff.onlyInLeft.length > 0 || categoryDiff.onlyInRight.length > 0) {
    diagnostics.push({
      code: 'CATEGORY_TAXONOMY_MISMATCH',
      message: 'Category taxonomy mismatch between heatmap and engagement sources.',
      details: {
        onlyInHeatmap: categoryDiff.onlyInLeft,
        onlyInEngagement: categoryDiff.onlyInRight,
      },
    });
  }

  const inferredUseCases = getInferredUseCases();
  if (inferredUseCases.length > 0) {
    diagnostics.push({
      code: 'INFERRED_SIGNAL_PRESENT',
      message: 'Adapter still contains inferred (non-canonical) outputs.',
      details: {
        inferredUseCases,
      },
    });
  }

  return diagnostics;
};
