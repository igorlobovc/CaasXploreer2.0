export interface ProvisionalSentimentVolumeDatum {
  volume: number;
  neutro: number;
  positivo: number;
  negativo: number;
}

export interface ProvisionalTopicMentionsDatum {
  mes: string;
  saude: number;
  beneficios: number;
}

export interface ProvisionalEntitySourceDistributionDatum {
  nome: string;
  instagram: number;
  facebook: number;
  portais: number;
  blogs: number;
  outros: number;
}

export interface ProvisionalKpiDatum {
  label: string;
  value: string;
  sub: string;
}

export interface ProvisionalDateLabelSet {
  sentimentStart: string;
  sentimentEnd: string;
  timelineStart: string;
  timelineEnd: string;
}

export interface ProvisionalRealAnalyticsData {
  kpis: ProvisionalKpiDatum[];
  sentimentVolumeByWindow: ProvisionalSentimentVolumeDatum[];
  topicMentionsTimeline: ProvisionalTopicMentionsDatum[];
  entitySourceDistribution: ProvisionalEntitySourceDistributionDatum[];
  dateLabels: ProvisionalDateLabelSet;
}

export interface NormalizedTemporalPoint {
  mes: string;
  quantidade: number;
}

export interface NormalizedCategoryPoint {
  caa: string;
  categoria: string;
  quantidade: number;
}

export interface NormalizedCaaVolumePoint {
  caa: string;
  quantidade: number;
}

export interface NormalizedCaaEngagementPoint {
  caa: string;
  engagementMedio: number;
  totalPosts: number;
}

export interface NormalizedEngagementCategoryPoint {
  categoria: string;
  engagementMedio: number;
  totalPosts: number;
}

export interface NormalizedRankingPoint {
  caa: string;
  rankAbsoluto: number;
  sharedInteractionsPer1000Advs: number;
  topServico: string;
}
