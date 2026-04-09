// ============================================================
// PAGE: /estados — Listagem de todos os estados mapeados
// ============================================================

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Map, Search, TrendingUp, TrendingDown, Minus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassCard, Navbar, PageBackground } from '../components/shared';
import { estadosData } from '../data/estados';
import { formatNumber, trendColor } from '../lib/analytics';

const REGIOES = ['Todas', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

const CAT_BAR_COLORS = ['#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#64748b'];
const CAT_BAR_COLOR_MAP: Record<string, string> = {
  'Saúde':               CAT_BAR_COLORS[0],
  'Benefícios':          CAT_BAR_COLORS[1],
  'Financeiro':          CAT_BAR_COLORS[2],
  'Esporte e Bem-estar': CAT_BAR_COLORS[3],
  'Infraestrutura':      CAT_BAR_COLORS[4],
};
const CAT_TEXT_COLORS = ['text-cyan-400', 'text-emerald-400', 'text-violet-400'];

function TrendIcon({ t }: { t: 'alta' | 'estavel' | 'baixa' }) {
  if (t === 'alta')   return <TrendingUp   className="w-3.5 h-3.5 text-emerald-400" />;
  if (t === 'baixa')  return <TrendingDown  className="w-3.5 h-3.5 text-rose-400" />;
  return <Minus className="w-3.5 h-3.5 text-cyan-400/60" />;
}

export default function EstadosPage() {
  const [regiao, setRegiao] = useState('Todas');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return estadosData.filter((e) => {
      const matchRegiao = regiao === 'Todas' || e.regiao === regiao;
      const matchSearch =
        search === '' ||
        e.estado.toLowerCase().includes(search.toLowerCase()) ||
        e.uf.toLowerCase().includes(search.toLowerCase());
      return matchRegiao && matchSearch;
    });
  }, [regiao, search]);

  const sorted = useMemo(
    () => [...filtered].sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000),
    [filtered]
  );

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Map className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">MAPA DE COBERTURA</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Estados</h1>
          <p className="text-cyan-200/60 text-sm max-w-xl">
            Todos os {estadosData.length} estados brasileiros mapeados pelo CAAsXplorer.
            Selecione um estado para ver o painel detalhado.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400/50" />
            <input
              type="text"
              placeholder="Buscar estado ou UF…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#0a1628]/60 border border-cyan-500/20 rounded text-sm text-white placeholder-cyan-200/30 focus:outline-none focus:border-cyan-400/40 transition-colors"
            />
          </div>

          {/* Region filter */}
          <div className="flex flex-wrap gap-2">
            {REGIOES.map((r) => (
              <button
                key={r}
                onClick={() => setRegiao(r)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  regiao === r
                    ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40'
                    : 'text-cyan-200/50 border border-cyan-500/15 hover:text-cyan-200 hover:border-cyan-500/30'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((estado, idx) => (
            <motion.div
              key={estado.uf}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Link to={`/estados/${estado.uf}`} className="block group">
                <GlassCard className="p-4 sm:p-5 rounded group-hover:border-cyan-400/40 group-hover:bg-[#0a1628]/80 transition-all h-full" hover>
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {estado.estado}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">
                          {estado.uf}
                        </span>
                        <span className="text-[10px] text-cyan-200/40">{estado.regiao}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendIcon t={estado.tendencia} />
                      <ChevronRight className="w-4 h-4 text-cyan-400/40 group-hover:text-cyan-400 transition-colors" />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="bg-cyan-500/5 rounded p-2.5">
                      <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-1">Interações</div>
                      <div className="text-lg font-bold text-white">{formatNumber(estado.totalInteracoes)}</div>
                    </div>
                    <div className="bg-cyan-500/5 rounded p-2.5">
                      <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-1">/ 1k adv.</div>
                      <div className={`text-lg font-bold ${trendColor(estado.tendencia)}`}>
                        {estado.interacoesPer1000.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  {/* Category mini bar */}
                  <div className="h-1.5 w-full flex rounded-full overflow-hidden gap-px">
                    {estado.categorias.map((cat) => {
                      const pct = (cat.interacoes / estado.totalInteracoes) * 100;
                      return (
                        <div
                          key={cat.categoria}
                          style={{ width: `${pct}%`, backgroundColor: CAT_BAR_COLOR_MAP[cat.categoria] ?? CAT_BAR_COLORS[4] }}
                        />
                      );
                    })}
                  </div>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {estado.categorias.slice(0, 3).map((cat, i) => (
                      <span key={cat.categoria} className={`text-[9px] ${CAT_TEXT_COLORS[i] ?? 'text-cyan-200/40'}`}>
                        {cat.categoria}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-16 text-cyan-200/40">
            Nenhum estado encontrado para os filtros selecionados.
          </div>
        )}
      </main>
    </div>
  );
}
