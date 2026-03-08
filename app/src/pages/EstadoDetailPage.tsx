// ============================================================
// PAGE: /estados/:uf — Painel detalhado por estado
// ============================================================

import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Users, Activity, Share2,
  TrendingUp, TrendingDown, Minus,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { GlassCard, Navbar, PageBackground } from '../components/shared';
import { estadoByUF } from '../data/estados';
import { formatNumber, formatPercent, calcShareRate, trendLabel } from '../lib/analytics';

const tooltipStyle = {
  backgroundColor: 'rgba(10,22,40,0.92)',
  border: '1px solid rgba(6,182,212,0.3)',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontSize: 12,
};

function StatCard({
  label,
  value,
  sub,
  Icon,
  color = 'cyan',
}: {
  label: string;
  value: string;
  sub?: string;
  Icon: React.ElementType;
  color?: string;
}) {
  const colorMap: Record<string, string> = {
    cyan:    'bg-cyan-500/20 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
    blue:    'bg-blue-500/20 text-blue-400 border-blue-500/20',
    violet:  'bg-violet-500/20 text-violet-400 border-violet-500/20',
  };
  return (
    <GlassCard className="p-4" hover>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border mb-3 ${colorMap[color]}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-xl sm:text-2xl font-bold text-white mb-0.5">{value}</div>
      <div className="text-xs text-cyan-200/60">{label}</div>
      {sub && <div className="text-[10px] font-mono text-cyan-300/40 mt-0.5">{sub}</div>}
    </GlassCard>
  );
}

export default function EstadoDetailPage() {
  const { uf } = useParams<{ uf: string }>();
  const estado = uf ? estadoByUF[uf.toUpperCase()] : undefined;

  if (!estado) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] text-white flex items-center justify-center">
        <PageBackground />
        <Navbar />
        <div className="relative z-10 text-center pt-14">
          <p className="text-cyan-200/60 mb-4">Estado "{uf}" não encontrado.</p>
          <Link to="/estados" className="text-cyan-400 hover:text-cyan-300 text-sm underline">
            Ver todos os estados
          </Link>
        </div>
      </div>
    );
  }

  const shareRate = calcShareRate(estado.totalInteracoes, estado.interacoesCompartilhadas);
  const TrendIcon =
    estado.tendencia === 'alta' ? TrendingUp :
    estado.tendencia === 'baixa' ? TrendingDown : Minus;

  const catColors: Record<string, string> = {
    'Saúde':               '#06b6d4',
    'Benefícios':          '#10b981',
    'Financeiro':          '#8b5cf6',
    'Esporte e Bem-estar': '#f59e0b',
    'Infraestrutura':      '#64748b',
  };

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="mb-6 mt-4">
          <Link
            to="/estados"
            className="flex items-center gap-2 text-cyan-200/60 hover:text-cyan-300 text-sm transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Estados
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">{estado.regiao}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{estado.estado}</h1>
            <span className="text-lg font-mono px-2.5 py-1 bg-cyan-500/15 text-cyan-300 rounded border border-cyan-400/25">
              {estado.uf}
            </span>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border ${
              estado.tendencia === 'alta'  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' :
              estado.tendencia === 'baixa' ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' :
              'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}>
              <TrendIcon className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{trendLabel(estado.tendencia)}</span>
            </div>
          </div>
          <p className="text-cyan-200/50 text-sm mt-2">
            Última atualização: <span className="text-cyan-300 font-mono">{estado.ultimaAtualizacao}</span>
          </p>
        </motion.div>

        {/* KPI row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StatCard Icon={Activity} label="Total de Interações" value={formatNumber(estado.totalInteracoes)} sub="últimos 12 meses" color="cyan" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <StatCard Icon={Share2}   label="Compartilhadas"     value={formatNumber(estado.interacoesCompartilhadas)} sub={formatPercent(shareRate)} color="emerald" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <StatCard Icon={TrendingUp} label="Por 1.000 adv." value={estado.interacoesPer1000.toFixed(1)} sub="métrica normalizada" color="blue" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <StatCard Icon={Users}    label="Advogados (OAB)"   value={formatNumber(estado.advogados)} sub="base de cálculo" color="violet" />
          </motion.div>
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly history */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <GlassCard className="p-4 sm:p-5 h-full rounded">
              <h2 className="text-sm font-semibold text-white mb-1">Histórico Mensal</h2>
              <p className="text-xs text-cyan-200/50 mb-4">Interações e compartilhamentos mês a mês.</p>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={estado.historicoMensal} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" />
                  <XAxis
                    dataKey="mes"
                    tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 9 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(6,182,212,0.15)' }}
                    interval={2}
                  />
                  <YAxis
                    tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="interacoes"     stroke="#06b6d4" strokeWidth={2} dot={false} name="Interações" />
                  <Line type="monotone" dataKey="compartilhadas" stroke="#10b981" strokeWidth={2} dot={false} strokeDasharray="4 2" name="Compartilhadas" />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Category breakdown */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <GlassCard className="p-4 sm:p-5 h-full rounded">
              <h2 className="text-sm font-semibold text-white mb-1">Interações por Categoria</h2>
              <p className="text-xs text-cyan-200/50 mb-4">Volume por categoria de serviço.</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={estado.categorias}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    dataKey="categoria"
                    type="category"
                    tick={{ fill: 'rgba(6,182,212,0.7)', fontSize: 9 }}
                    tickLine={false}
                    axisLine={false}
                    width={100}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatNumber(v), 'Interações']} />
                  <Bar dataKey="interacoes" radius={[0, 4, 4, 0]} opacity={0.85}>
                    {estado.categorias.map((cat) => (
                      <Cell
                        key={cat.categoria}
                        fill={catColors[cat.categoria] ?? '#64748b'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>
        </div>

        {/* Category detail table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <GlassCard className="overflow-hidden rounded">
            <div className="px-4 py-3 border-b border-cyan-500/20">
              <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">Detalhamento por Categoria</span>
            </div>
            <div className="divide-y divide-cyan-500/10">
              {estado.categorias.map((cat) => {
                const pct = (cat.interacoes / estado.totalInteracoes) * 100;
                return (
                  <div key={cat.categoria} className="flex items-center gap-4 px-4 py-3">
                    <div
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: catColors[cat.categoria] ?? '#64748b' }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">{cat.categoria}</span>
                        <span className="text-xs text-cyan-200/60">{cat.servicos} serviços</span>
                      </div>
                      <div className="h-1.5 w-full bg-cyan-500/10 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: catColors[cat.categoria] ?? '#64748b' }}
                        />
                      </div>
                    </div>
                    <div className="text-right w-24 flex-shrink-0">
                      <div className="text-sm font-medium text-white">{formatNumber(cat.interacoes)}</div>
                      <div className="text-[10px] text-cyan-200/50">{pct.toFixed(1)}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Sources */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-6">
          <GlassCard className="p-4 rounded">
            <div className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider mb-3">Fontes Identificadas</div>
            <div className="flex flex-wrap gap-2">
              {estado.fontesPrincipais.map((fonte) => (
                <span
                  key={fonte}
                  className="px-2.5 py-1 text-xs bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 rounded"
                >
                  {fonte}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </main>
    </div>
  );
}
