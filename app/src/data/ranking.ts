// ============================================================
// DATA: Rankings por estado e por categoria
// ============================================================

import { estadosData, type EstadoData } from './estados';
import { categoriesNacional, type CategoryNational } from './analytics';

export interface EstadoRankingItem extends EstadoData {
  posicao: number;
  variacao: number; // change vs previous period
}

export interface CategoryRankingItem extends CategoryNational {
  posicao: number;
  variacao: number;
}

// Ranking por estado — normalizado por 1.000 advogados (decrescente)
export const rankingPorEstado: EstadoRankingItem[] = estadosData
  .slice()
  .sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000)
  .map((estado, idx) => ({
    ...estado,
    posicao: idx + 1,
    variacao: [3, 1, -1, 2, 0, -2, 4, 1, -3, 0, 2, -1, 1, 0, -2, 3, 1, -1, 0, 2, -1, 1, 0, -2, 1, 0, -1][idx] ?? 0,
  }));

// Ranking por estado — total de interações absolutas (decrescente)
export const rankingPorTotalInteracoes: EstadoRankingItem[] = estadosData
  .slice()
  .sort((a, b) => b.totalInteracoes - a.totalInteracoes)
  .map((estado, idx) => ({
    ...estado,
    posicao: idx + 1,
    variacao: [0, 1, -1, 2, -1, 0, 1, -2, 0, 1, -1, 0, 2, -1, 0, 1, -2, 0, 1, -1, 0, -1, 0, 1, 0, -1, 1][idx] ?? 0,
  }));

// Ranking por categoria
export const rankingPorCategoria: CategoryRankingItem[] = categoriesNacional
  .slice()
  .sort((a, b) => b.totalInteracoes - a.totalInteracoes)
  .map((cat, idx) => ({
    ...cat,
    posicao: idx + 1,
    variacao: [1, 0, -1, 0, -1][idx] ?? 0,
  }));
