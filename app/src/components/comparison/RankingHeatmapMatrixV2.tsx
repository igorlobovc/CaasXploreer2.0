// ============================================================
// COMPONENT: RankingHeatmapMatrixV2
// Compact UF heatmap for intelligence report presentation
// ============================================================

import React, { useMemo } from 'react';
import { estadosData } from '@/data/estados';

interface HeatmapCell {
  uf: string;
  estado: string;
  regiao: string;
  value: number;
  rank: number;
  quartil: 1 | 2 | 3 | 4;
}

interface RankingHeatmapMatrixV2Props {
  metric?: 'per1000' | 'total';
  highlightUF?: string;
  onUFClick?: (uf: string) => void;
  className?: string;
}

const REGIAO_ORDER = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

function getQuartilColor(quartil: number): string {
  switch (quartil) {
    case 1: return 'bg-emerald-500/80';
    case 2: return 'bg-emerald-400/60';
    case 3: return 'bg-amber-400/50';
    case 4: return 'bg-rose-400/60';
    default: return 'bg-slate-600';
  }
}

function getQuartilLabel(quartil: number): string {
  switch (quartil) {
    case 1: return 'Q1';
    case 2: return 'Q2';
    case 3: return 'Q3';
    case 4: return 'Q4';
    default: return '-';
  }
}

export const RankingHeatmapMatrixV2: React.FC<RankingHeatmapMatrixV2Props> = ({
  metric = 'per1000',
  highlightUF = 'PB',
  onUFClick,
  className = '',
}) => {
  const { cells, stats } = useMemo(() => {
    const sorted = [...estadosData]
      .filter(e => metric === 'per1000' ? e.interacoesPer1000 > 0 : e.totalInteracoes > 0)
      .sort((a, b) => {
        const valA = metric === 'per1000' ? a.interacoesPer1000 : a.totalInteracoes;
        const valB = metric === 'per1000' ? b.interacoesPer1000 : b.totalInteracoes;
        return valB - valA;
      });

    const total = sorted.length;
    const cells: HeatmapCell[] = sorted.map((e, idx) => {
      const value = metric === 'per1000' ? e.interacoesPer1000 : e.totalInteracoes;
      const quartil = (Math.floor((idx / total) * 4) + 1) as 1 | 2 | 3 | 4;
      return {
        uf: e.uf,
        estado: e.estado,
        regiao: e.regiao,
        value,
        rank: idx + 1,
        quartil,
      };
    });

    const highlightCell = cells.find(c => c.uf === highlightUF);
    const stats = {
      total,
      highlightRank: highlightCell?.rank || 0,
      highlightQuartil: highlightCell?.quartil || 0,
      topValue: cells[0]?.value || 0,
      medianValue: cells[Math.floor(total / 2)]?.value || 0,
    };

    return { cells, stats };
  }, [metric, highlightUF]);

  const byRegiao = useMemo(() => {
    const grouped: Record<string, HeatmapCell[]> = {};
    REGIAO_ORDER.forEach(r => grouped[r] = []);
    cells.forEach(cell => {
      if (!grouped[cell.regiao]) grouped[cell.regiao] = [];
      grouped[cell.regiao].push(cell);
    });
    return grouped;
  }, [cells]);

  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-sm ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-baseline justify-between">
        <h3 className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
          Distribuição por Região
        </h3>
        <span className="text-[10px] font-mono text-slate-600">
          {metric === 'per1000' ? 'Interações/1K adv' : 'Total interações'}
        </span>
      </div>

      {/* Matrix */}
      <div className="p-4">
        {REGIAO_ORDER.map(regiao => {
          const items = byRegiao[regiao] || [];
          if (items.length === 0) return null;

          return (
            <div key={regiao} className="mb-4 last:mb-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-medium text-slate-500 w-20">{regiao}</span>
                <div className="flex-1 h-px bg-slate-800/50" />
              </div>
              <div className="flex flex-wrap gap-1.5 pl-[5.5rem]">
                {items.map(cell => {
                  const isHighlight = cell.uf === highlightUF;
                  return (
                    <button
                      key={cell.uf}
                      onClick={() => onUFClick?.(cell.uf)}
                      className={`
                        relative w-9 h-9 rounded-sm flex items-center justify-center
                        transition-all duration-150
                        ${getQuartilColor(cell.quartil)}
                        ${isHighlight ? 'ring-1 ring-cyan-400 ring-offset-1 ring-offset-slate-950' : ''}
                        ${onUFClick ? 'cursor-pointer hover:brightness-110' : ''}
                      `}
                      title={`${cell.estado}: ${cell.value.toLocaleString('pt-BR')} (#${cell.rank})`}
                    >
                      <span className={`text-[10px] font-bold ${isHighlight ? 'text-cyan-50' : 'text-slate-900'}`}>
                        {cell.uf}
                      </span>
                      {isHighlight && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="px-4 py-3 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map(q => (
              <div key={q} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${getQuartilColor(q)}`} />
                <span className="text-[9px] text-slate-500">{getQuartilLabel(q)}</span>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-slate-600 font-mono">
            n={stats.total}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingHeatmapMatrixV2;
