// ============================================================
// HELPERS: Analytics utilities
// ============================================================

import { type MonthlyNational } from '../data/analytics';
import { type EstadoData } from '../data/estados';

/** Format large numbers with pt-BR locale separators */
export function formatNumber(n: number): string {
  return n.toLocaleString('pt-BR');
}

/** Format a value as a percentage string */
export function formatPercent(n: number, decimals = 1): string {
  return `${n.toFixed(decimals)}%`;
}

/** Calculate growth rate between first and last value in a series */
export function calcGrowthRate(series: MonthlyNational[]): number {
  if (series.length < 2) return 0;
  const first = series[0].totalInteracoes;
  const last = series[series.length - 1].totalInteracoes;
  return ((last - first) / first) * 100;
}

/** Compute the share rate (shared / total) as percentage */
export function calcShareRate(total: number, shared: number): number {
  if (total === 0) return 0;
  return (shared / total) * 100;
}

/** Compute interactions per 1,000 lawyers */
export function interacoesPer1000(totalInteracoes: number, totalAdvogados: number): number {
  if (totalAdvogados === 0) return 0;
  return (totalInteracoes / totalAdvogados) * 1000;
}

/** Aggregate total interactions from a list of estados */
export function sumInteracoes(estados: EstadoData[]): number {
  return estados.reduce((acc, e) => acc + e.totalInteracoes, 0);
}

/** Aggregate total shared interactions */
export function sumCompartilhadas(estados: EstadoData[]): number {
  return estados.reduce((acc, e) => acc + e.interacoesCompartilhadas, 0);
}

/** Return a color class based on trend */
export function trendColor(tendencia: 'alta' | 'estavel' | 'baixa'): string {
  switch (tendencia) {
    case 'alta':   return 'text-emerald-400';
    case 'baixa':  return 'text-rose-400';
    default:       return 'text-cyan-400';
  }
}

/** Return a trend label in Portuguese */
export function trendLabel(tendencia: 'alta' | 'estavel' | 'baixa'): string {
  switch (tendencia) {
    case 'alta':   return '↑ Alta';
    case 'baixa':  return '↓ Baixa';
    default:       return '→ Estável';
  }
}

/** Return top-N items from a ranked list */
export function topN<T>(items: T[], n: number): T[] {
  return items.slice(0, n);
}
