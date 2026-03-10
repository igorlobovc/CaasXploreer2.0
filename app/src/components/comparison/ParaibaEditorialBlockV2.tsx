// ============================================================
// COMPONENT: ParaibaEditorialBlockV2
// Intelligence report style: PB vs Nordeste vs Brasil
// ============================================================

import React, { useMemo } from 'react';
import { estadosData, estadoByUF } from '@/data/estados';
import { TrendingUp, TrendingDown, Minus, Award, MapPin, Scale } from 'lucide-react';

interface ComparisonMetrics {
  pb: {
    per1000: number;
    total: number;
    advogados: number;
    rank: number;
    percentile: number;
  };
  nordeste: {
    avgPer1000: number;
    total: number;
    advogados: number;
    bestUF: string;
  };
  brasil: {
    avgPer1000: number;
    total: number;
    advogados: number;
    medianPer1000: number;
  };
}

interface ParaibaEditorialBlockV2Props {
  className?: string;
  onViewDetails?: () => void;
}

function TrendIndicator({ value }: { value: number }) {
  if (value > 0) return <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />;
  if (value < 0) return <TrendingDown className="w-3.5 h-3.5 text-rose-400" />;
  return <Minus className="w-3.5 h-3.5 text-slate-500" />;
}

function formatDelta(current: number, baseline: number): string {
  const delta = ((current - baseline) / baseline) * 100;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(0)}%`;
}

export const ParaibaEditorialBlockV2: React.FC<ParaibaEditorialBlockV2Props> = ({
  className = '',
  onViewDetails,
}) => {
  const metrics: ComparisonMetrics = useMemo(() => {
    const pb = estadoByUF['PB'];
    
    // Nordeste stats
    const nordesteStates = estadosData.filter(e => e.regiao === 'Nordeste');
    const nordesteAvg = nordesteStates.reduce((sum, e) => sum + e.interacoesPer1000, 0) / nordesteStates.length;
    const nordesteTotal = nordesteStates.reduce((sum, e) => sum + e.totalInteracoes, 0);
    const nordesteAdvogados = nordesteStates.reduce((sum, e) => sum + e.advogados, 0);
    const nordesteBest = nordesteStates.sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000)[0];

    // Brasil stats
    const brasilAvg = estadosData.reduce((sum, e) => sum + e.interacoesPer1000, 0) / estadosData.length;
    const brasilTotal = estadosData.reduce((sum, e) => sum + e.totalInteracoes, 0);
    const brasilAdvogados = estadosData.reduce((sum, e) => sum + e.advogados, 0);
    
    const sortedByPer1000 = [...estadosData].sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000);
    const pbRank = sortedByPer1000.findIndex(e => e.uf === 'PB') + 1;
    const percentile = ((estadosData.length - pbRank) / estadosData.length) * 100;
    
    const medianIndex = Math.floor(sortedByPer1000.length / 2);
    const medianPer1000 = sortedByPer1000[medianIndex]?.interacoesPer1000 || 0;

    return {
      pb: {
        per1000: pb.interacoesPer1000,
        total: pb.totalInteracoes,
        advogados: pb.advogados,
        rank: pbRank,
        percentile,
      },
      nordeste: {
        avgPer1000: nordesteAvg,
        total: nordesteTotal,
        advogados: nordesteAdvogados,
        bestUF: nordesteBest?.uf || '',
      },
      brasil: {
        avgPer1000: brasilAvg,
        total: brasilTotal,
        advogados: brasilAdvogados,
        medianPer1000,
      },
    };
  }, []);

  const pbVsNordeste = formatDelta(metrics.pb.per1000, metrics.nordeste.avgPer1000);
  const pbVsBrasil = formatDelta(metrics.pb.per1000, metrics.brasil.avgPer1000);

  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-sm ${className}`}>
      {/* Header */}
      <div 
        className="px-5 py-4 border-b border-slate-800 cursor-pointer hover:bg-slate-900/50 transition-colors"
        onClick={onViewDetails}
      >
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-medium tracking-[0.1em] text-cyan-400/80 uppercase">Análise Regional</span>
        </div>
        <h2 className="text-xl font-semibold text-slate-100 tracking-tight">
          Paraíba
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Comparação estratégica • Dados consolidados
        </p>
      </div>

      {/* Rank Badge */}
      <div className="px-5 py-4 border-b border-slate-800 bg-slate-900/30">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-cyan-400">#{metrics.pb.rank}</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Ranking<br/>Nacional</span>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="flex-1">
            <div className="text-[11px] text-slate-400 mb-1">
              Percentil {metrics.pb.percentile.toFixed(0)}% — {metrics.pb.percentile >= 75 ? 'Desempenho superior' : 'Desempenho médio-alto'}
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 rounded-full"
                style={{ width: `${metrics.pb.percentile}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="p-5">
        {/* Primary Metric */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-[10px] text-slate-500 uppercase tracking-wide">Interações por 1.000 advogados</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* PB */}
            <div className="bg-slate-900/50 border border-cyan-900/30 rounded-sm p-3">
              <div className="text-[10px] text-cyan-400/70 mb-1 uppercase tracking-wide">Paraíba</div>
              <div className="text-2xl font-semibold text-cyan-50">{metrics.pb.per1000.toFixed(1)}</div>
              <div className="text-[9px] text-slate-500 mt-1">{metrics.pb.advogados.toLocaleString('pt-BR')} advogados</div>
            </div>
            {/* Nordeste */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-sm p-3">
              <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Nordeste</div>
              <div className="text-xl font-medium text-slate-300">{metrics.nordeste.avgPer1000.toFixed(1)}</div>
              <div className="text-[9px] text-slate-500 mt-1">Média regional</div>
            </div>
            {/* Brasil */}
            <div className="bg-slate-900/30 border border-slate-800 rounded-sm p-3">
              <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wide">Brasil</div>
              <div className="text-xl font-medium text-slate-300">{metrics.brasil.avgPer1000.toFixed(1)}</div>
              <div className="text-[9px] text-slate-500 mt-1">Média nacional</div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Total Interactions */}
          <div className="p-3 border border-slate-800 rounded-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Scale className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] text-slate-500 uppercase">Total de interações</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-medium text-slate-200">{metrics.pb.total.toLocaleString('pt-BR')}</span>
              <span className="text-[10px] text-slate-500">últimos 12 meses</span>
            </div>
          </div>

          {/* Regional Context */}
          <div className="p-3 border border-slate-800 rounded-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <Award className="w-3 h-3 text-slate-500" />
              <span className="text-[10px] text-slate-500 uppercase">Melhor do Nordeste</span>
            </div>
            <div className="text-lg font-medium text-slate-200">
              {metrics.nordeste.bestUF === 'PB' ? 'Paraíba' : metrics.nordeste.bestUF}
            </div>
            {metrics.nordeste.bestUF === 'PB' && (
              <div className="text-[9px] text-emerald-400 mt-1">Liderança regional</div>
            )}
          </div>
        </div>

        {/* Delta Summary */}
        <div className="border-t border-slate-800 pt-4">
          <div className="text-[10px] text-slate-500 uppercase tracking-wide mb-3">Diferença percentual</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 border-b border-slate-800/50">
              <span className="text-[11px] text-slate-400">vs. Média Nordeste</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${parseFloat(pbVsNordeste) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pbVsNordeste}
                </span>
                <TrendIndicator value={parseFloat(pbVsNordeste)} />
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-[11px] text-slate-400">vs. Média Brasil</span>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium ${parseFloat(pbVsBrasil) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {pbVsBrasil}
                </span>
                <TrendIndicator value={parseFloat(pbVsBrasil)} />
              </div>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="w-full mt-5 py-2.5 bg-cyan-950/50 hover:bg-cyan-900/50 border border-cyan-800/50 text-cyan-400 text-[11px] font-medium rounded-sm transition-colors"
          >
            Ver detalhes completos →
          </button>
        )}
      </div>
    </div>
  );
};

export default ParaibaEditorialBlockV2;
