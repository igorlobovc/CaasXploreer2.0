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

/** Calculate growth rate between first and last month in a monthly data series */
export function calcInteractionGrowthRate(series: MonthlyNational[]): number {
  if (series.length < 2) return 0;
  const firstMonthTotal = series[0].totalInteracoes;
  const lastMonthTotal = series[series.length - 1].totalInteracoes;
  return ((lastMonthTotal - firstMonthTotal) / firstMonthTotal) * 100;
}

/** Compute the shared-interaction rate (shared / total) as a percentage */
export function calcSharedInteractionRate(totalInteractions: number, sharedInteractions: number): number {
  if (totalInteractions === 0) return 0;
  return (sharedInteractions / totalInteractions) * 100;
}

/** Compute interactions per 1,000 registered lawyers */
export function calcInteractionsPer1000Lawyers(totalInteractions: number, totalLawyers: number): number {
  if (totalLawyers === 0) return 0;
  return (totalInteractions / totalLawyers) * 1000;
}

/** Aggregate total interactions across all estados */
export function sumTotalInteractions(estados: EstadoData[]): number {
  return estados.reduce((runningTotal, estado) => runningTotal + estado.totalInteracoes, 0);
}

/** Aggregate total shared interactions across all estados */
export function sumSharedInteractions(estados: EstadoData[]): number {
  return estados.reduce((runningTotal, estado) => runningTotal + estado.interacoesCompartilhadas, 0);
}

/** Return a Tailwind color class based on trend direction */
export function getTrendColorClass(tendencia: 'alta' | 'estavel' | 'baixa'): string {
  switch (tendencia) {
    case 'alta':   return 'text-emerald-400';
    case 'baixa':  return 'text-rose-400';
    default:       return 'text-cyan-400';
  }
}

/** Return a human-readable trend label in Portuguese */
export function getTrendLabel(tendencia: 'alta' | 'estavel' | 'baixa'): string {
  switch (tendencia) {
    case 'alta':   return '↑ Alta';
    case 'baixa':  return '↓ Baixa';
    default:       return '→ Estável';
  }
}

/** Return the top N items from a ranked list */
export function getTopNItems<T>(items: T[], maxItems: number): T[] {
  return items.slice(0, maxItems);
}
