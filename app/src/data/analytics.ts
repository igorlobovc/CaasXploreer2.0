// ============================================================
// DATA: Analytics nacionais — últimos 12 meses
// Métricas agregadas de todos os 27 estados
// ============================================================

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

// Últimos 12 meses de dados nacionais (Mar/2024 → Fev/2025)
export const historicoNacional: MonthlyNational[] = [
  { mes: 'Mar/2024', totalInteracoes: 5200,  interacoesCompartilhadas: 1820, caasAtivas: 22 },
  { mes: 'Abr/2024', totalInteracoes: 5600,  interacoesCompartilhadas: 1960, caasAtivas: 23 },
  { mes: 'Mai/2024', totalInteracoes: 6100,  interacoesCompartilhadas: 2135, caasAtivas: 23 },
  { mes: 'Jun/2024', totalInteracoes: 6400,  interacoesCompartilhadas: 2240, caasAtivas: 24 },
  { mes: 'Jul/2024', totalInteracoes: 6800,  interacoesCompartilhadas: 2380, caasAtivas: 24 },
  { mes: 'Ago/2024', totalInteracoes: 7300,  interacoesCompartilhadas: 2555, caasAtivas: 25 },
  { mes: 'Set/2024', totalInteracoes: 7700,  interacoesCompartilhadas: 2695, caasAtivas: 25 },
  { mes: 'Out/2024', totalInteracoes: 8200,  interacoesCompartilhadas: 2870, caasAtivas: 26 },
  { mes: 'Nov/2024', totalInteracoes: 8600,  interacoesCompartilhadas: 3010, caasAtivas: 26 },
  { mes: 'Dez/2024', totalInteracoes: 8100,  interacoesCompartilhadas: 2835, caasAtivas: 26 },
  { mes: 'Jan/2025', totalInteracoes: 8800,  interacoesCompartilhadas: 3080, caasAtivas: 27 },
  { mes: 'Fev/2025', totalInteracoes: 9400,  interacoesCompartilhadas: 3290, caasAtivas: 27 },
];

// Métricas por categoria (nível nacional)
export const categoriesNacional: CategoryNational[] = [
  { categoria: 'Saúde',               totalInteracoes: 34200, totalServicos: 42, percentual: 34.2, tendencia: 'alta' },
  { categoria: 'Benefícios',          totalInteracoes: 28500, totalServicos: 35, percentual: 28.5, tendencia: 'alta' },
  { categoria: 'Financeiro',          totalInteracoes: 19800, totalServicos: 24, percentual: 19.8, tendencia: 'estavel' },
  { categoria: 'Esporte e Bem-estar', totalInteracoes: 10600, totalServicos: 18, percentual: 10.6, tendencia: 'estavel' },
  { categoria: 'Infraestrutura',      totalInteracoes: 6900,  totalServicos: 15, percentual: 6.9,  tendencia: 'baixa' },
];

// Distribuição de fontes de dados
export const sourceDistribution: SourceDistribution[] = [
  { fonte: 'Instagram',    percentual: 32, cor: '#ec4899' },
  { fonte: 'Site Oficial', percentual: 28, cor: '#06b6d4' },
  { fonte: 'Portais',      percentual: 18, cor: '#8b5cf6' },
  { fonte: 'Facebook',     percentual: 14, cor: '#3b82f6' },
  { fonte: 'Outros',       percentual: 8,  cor: '#64748b' },
];

// Resumo geral do projeto
export const analyticsSummary: AnalyticsSummary = {
  totalInteracoes: 88200,
  interacoesCompartilhadas: 30870,
  totalAdvogadosMapeados: 1346000,
  mediaInteracoesPer1000: 65.5,
  caasAtivas: 27,
  categoriasAtivas: 5,
  servicosMapeados: 134,
  periodoCobertura: 'Mar/2024 – Fev/2025',
  ultimaAtualizacao: 'Fev/2025',
};
