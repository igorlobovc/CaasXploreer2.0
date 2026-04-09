// ============================================================
// PAGE: /ranking — Rankings por estado e por categoria
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, BarChart2, Users } from 'lucide-react';
import { GlassCard, Navbar, PageBackground } from '../components/shared';
import { rankingPorEstado, rankingPorTotalInteracoes, rankingPorCategoria } from '../data/ranking';
import { analyticsSummary } from '../data/analytics';
import { formatNumber, trendColor, trendLabel } from '../lib/analytics';
import { Link } from 'react-router-dom';

type RankingMode = 'normalizado' | 'total' | 'categoria';

function VariacaoBadge({ variacao }: { variacao: number }) {
  if (variacao > 0)
    return (
      <span className="flex items-center gap-0.5 text-emerald-400 text-[10px]">
        <TrendingUp className="w-3 h-3" />+{variacao}
      </span>
    );
  if (variacao < 0)
    return (
      <span className="flex items-center gap-0.5 text-rose-400 text-[10px]">
        <TrendingDown className="w-3 h-3" />{variacao}
      </span>
    );
  return (
    <span className="flex items-center gap-0.5 text-cyan-400/50 text-[10px]">
      <Minus className="w-3 h-3" />
    </span>
  );
}

function MedalBadge({ pos }: { pos: number }) {
  if (pos === 1)
    return <span className="text-yellow-400 text-base">🥇</span>;
  if (pos === 2)
    return <span className="text-slate-300 text-base">🥈</span>;
  if (pos === 3)
    return <span className="text-amber-600 text-base">🥉</span>;
  return (
    <span className="text-xs font-mono text-cyan-200/50 w-6 text-center">
      {pos}
    </span>
  );
}

export default function RankingPage() {
  const [mode, setMode] = useState<RankingMode>('normalizado');

  const categoryTotals = useMemo(
    () => rankingPorCategoria.reduce(
      (acc, c) => ({ totalInteracoes: acc.totalInteracoes + c.totalInteracoes, totalServicos: acc.totalServicos + c.totalServicos }),
      { totalInteracoes: 0, totalServicos: 0 },
    ),
    [],
  );

  const tabs: { key: RankingMode; label: string; Icon: React.ElementType }[] = [
    { key: 'normalizado', label: 'Por 1.000 adv.', Icon: Users },
    { key: 'total',       label: 'Total absoluto',  Icon: BarChart2 },
    { key: 'categoria',   label: 'Por categoria',   Icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">RANKING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Ranking das CAAs</h1>
          <p className="text-cyan-200/60 text-sm max-w-xl">
            Classificação dos estados por volume de interações institucionais monitoradas.
            Período: <span className="text-cyan-300 font-mono">{analyticsSummary.periodoCobertura}</span>
          </p>
        </motion.div>

        {/* Mode Tabs */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
          <GlassCard className="inline-flex rounded">
            {tabs.map(({ key, label, Icon }) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-medium transition-colors ${
                  mode === key
                    ? 'text-cyan-300 bg-cyan-500/20 border-b-2 border-cyan-400'
                    : 'text-cyan-200/50 hover:text-cyan-200/70'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </GlassCard>
        </motion.div>

        {/* Ranking: by normalized metric */}
        {mode === 'normalizado' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="overflow-hidden rounded">
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
                  Interações por 1.000 advogados
                </span>
              </div>
              <div className="divide-y divide-cyan-500/10">
                {rankingPorEstado.map((item, idx) => (
                  <motion.div
                    key={item.uf}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-cyan-500/5 transition-colors"
                  >
                    <div className="w-8 flex justify-center flex-shrink-0">
                      <MedalBadge pos={item.posicao} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/estados/${item.uf}`}
                          className="text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                        >
                          {item.estado}
                        </Link>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">
                          {item.uf}
                        </span>
                        <span className="text-[10px] text-cyan-200/40">{item.regiao}</span>
                      </div>
                      {/* Progress bar */}
                      <div className="mt-1.5 h-1.5 w-full bg-cyan-500/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${(item.interacoesPer1000 / rankingPorEstado[0].interacoesPer1000) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white">
                        {item.interacoesPer1000.toFixed(1)}
                      </div>
                      <div className="text-[10px] text-cyan-200/50">/ 1k adv.</div>
                    </div>
                    <div className="w-12 text-right">
                      <VariacaoBadge variacao={item.variacao} />
                    </div>
                    <span className={`text-[10px] w-14 text-right ${trendColor(item.tendencia)}`}>
                      {trendLabel(item.tendencia)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Ranking: by absolute totals */}
        {mode === 'total' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="overflow-hidden rounded">
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
                  Total absoluto de interações
                </span>
              </div>
              <div className="divide-y divide-cyan-500/10">
                {rankingPorTotalInteracoes.map((item, idx) => (
                  <motion.div
                    key={item.uf}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    className="flex items-center gap-4 px-4 py-3 hover:bg-cyan-500/5 transition-colors"
                  >
                    <div className="w-8 flex justify-center flex-shrink-0">
                      <MedalBadge pos={item.posicao} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/estados/${item.uf}`}
                          className="text-sm font-medium text-white hover:text-cyan-300 transition-colors"
                        >
                          {item.estado}
                        </Link>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">
                          {item.uf}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1.5 w-full bg-cyan-500/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet-400 rounded-full"
                          style={{
                            width: `${(item.totalInteracoes / rankingPorTotalInteracoes[0].totalInteracoes) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-sm font-bold text-white">{formatNumber(item.totalInteracoes)}</div>
                      <div className="text-[10px] text-cyan-200/50">interações</div>
                    </div>
                    <div className="w-12 text-right">
                      <VariacaoBadge variacao={item.variacao} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Ranking: by category */}
        {mode === 'categoria' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <GlassCard className="overflow-hidden rounded">
              <div className="px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
                  Categorias por volume
                </span>
              </div>
              <div className="divide-y divide-cyan-500/10">
                {rankingPorCategoria.map((item, idx) => (
                  <motion.div
                    key={item.categoria}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center gap-4 px-4 py-4 hover:bg-cyan-500/5 transition-colors"
                  >
                    <div className="w-8 flex justify-center flex-shrink-0">
                      <MedalBadge pos={item.posicao} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white mb-1">{item.categoria}</div>
                      <div className="h-2 w-full bg-cyan-500/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{
                            width: `${(item.totalInteracoes / rankingPorCategoria[0].totalInteracoes) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-0.5">
                      <div className="text-sm font-bold text-white">{formatNumber(item.totalInteracoes)}</div>
                      <div className="text-[10px] text-cyan-200/50">{item.totalServicos} serviços</div>
                    </div>
                    <div className="text-right flex-shrink-0 space-y-0.5">
                      <div className="text-xs font-mono text-cyan-300">{item.percentual}%</div>
                      <div className={`text-[10px] ${trendColor(item.tendencia)}`}>{trendLabel(item.tendencia)}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Summary note */}
            <p className="text-center text-xs text-cyan-200/40 mt-6">
              Total combinado: <span className="text-cyan-300">
                {formatNumber(categoryTotals.totalInteracoes)}
              </span> interações · {categoryTotals.totalServicos} serviços mapeados
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
}
