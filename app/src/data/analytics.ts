// ============================================
// ANALYTICS DATA – simulation & chart data
// ============================================

export interface GraficoData {
  volume: number;
  neutro: number;
  positivo: number;
  negativo: number;
}

export interface LinhaData {
  mes: string;
  saude: number;
  beneficios: number;
}

export interface EntidadeData {
  nome: string;
  instagram: number;
  facebook: number;
  portais: number;
  blogs: number;
  outros: number;
}

/** Volume relativo por janela de consulta – 24 meses (Fev/2024 → Fev/2026) */
export const dadosGrafico: GraficoData[] = [
  { volume: 45, neutro: 58, positivo: 32, negativo: 10 },
  { volume: 52, neutro: 55, positivo: 35, negativo: 10 },
  { volume: 38, neutro: 62, positivo: 28, negativo: 10 },
  { volume: 61, neutro: 50, positivo: 40, negativo: 10 },
  { volume: 48, neutro: 57, positivo: 33, negativo: 10 },
  { volume: 72, neutro: 48, positivo: 42, negativo: 10 },
  { volume: 55, neutro: 60, positivo: 30, negativo: 10 },
  { volume: 42, neutro: 54, positivo: 36, negativo: 10 },
  { volume: 68, neutro: 52, positivo: 38, negativo: 10 },
  { volume: 51, neutro: 59, positivo: 31, negativo: 10 },
  { volume: 64, neutro: 47, positivo: 43, negativo: 10 },
  { volume: 47, neutro: 61, positivo: 29, negativo: 10 },
  { volume: 58, neutro: 53, positivo: 37, negativo: 10 },
  { volume: 75, neutro: 49, positivo: 41, negativo: 10 },
  { volume: 44, neutro: 56, positivo: 34, negativo: 10 },
  { volume: 62, neutro: 51, positivo: 39, negativo: 10 },
  { volume: 53, neutro: 63, positivo: 27, negativo: 10 },
  { volume: 69, neutro: 46, positivo: 44, negativo: 10 },
  { volume: 49, neutro: 58, positivo: 32, negativo: 10 },
  { volume: 66, neutro: 55, positivo: 35, negativo: 10 },
  { volume: 41, neutro: 60, positivo: 30, negativo: 10 },
  { volume: 73, neutro: 52, positivo: 38, negativo: 10 },
  { volume: 56, neutro: 57, positivo: 33, negativo: 10 },
  { volume: 60, neutro: 54, positivo: 36, negativo: 10 },
];

/** Evolução temporal de menções por tema – Jan/2024 a Dez/2025 */
export const dadosLinha: LinhaData[] = [
  { mes: 'Jan/24', saude: 45, beneficios: 32 },
  { mes: 'Fev/24', saude: 52, beneficios: 38 },
  { mes: 'Mar/24', saude: 48, beneficios: 35 },
  { mes: 'Abr/24', saude: 61, beneficios: 42 },
  { mes: 'Mai/24', saude: 55, beneficios: 39 },
  { mes: 'Jun/24', saude: 68, beneficios: 45 },
  { mes: 'Jul/24', saude: 72, beneficios: 48 },
  { mes: 'Ago/24', saude: 64, beneficios: 44 },
  { mes: 'Set/24', saude: 58, beneficios: 41 },
  { mes: 'Out/24', saude: 75, beneficios: 52 },
  { mes: 'Nov/24', saude: 69, beneficios: 49 },
  { mes: 'Dez/24', saude: 62, beneficios: 46 },
  { mes: 'Jan/25', saude: 71, beneficios: 51 },
  { mes: 'Fev/25', saude: 66, beneficios: 48 },
  { mes: 'Mar/25', saude: 78, beneficios: 55 },
  { mes: 'Abr/25', saude: 73, beneficios: 53 },
  { mes: 'Mai/25', saude: 81, beneficios: 58 },
  { mes: 'Jun/25', saude: 76, beneficios: 54 },
  { mes: 'Jul/25', saude: 84, beneficios: 61 },
  { mes: 'Ago/25', saude: 79, beneficios: 57 },
  { mes: 'Set/25', saude: 87, beneficios: 63 },
  { mes: 'Out/25', saude: 82, beneficios: 59 },
  { mes: 'Nov/25', saude: 91, beneficios: 66 },
  { mes: 'Dez/25', saude: 86, beneficios: 62 },
];

/** Distribuição de fontes por entidade */
export const dadosEntidades: EntidadeData[] = [
  { nome: 'CAAPB',  instagram: 25, facebook: 18, portais: 35, blogs: 12, outros: 10 },
  { nome: 'CAASP',  instagram: 15, facebook: 12, portais: 48, blogs: 15, outros: 10 },
  { nome: 'CAAPE',  instagram: 20, facebook: 15, portais: 28, blogs: 22, outros: 15 },
  { nome: 'CAAAL',  instagram: 18, facebook: 14, portais: 32, blogs: 18, outros: 18 },
  { nome: 'CAAAP',  instagram: 22, facebook: 16, portais: 30, blogs: 16, outros: 16 },
];
