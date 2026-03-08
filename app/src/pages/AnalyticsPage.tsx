// ============================================================
// PAGE: /analytics — Dashboard analítico (últimos 12 meses)
// ============================================================

import { motion } from 'framer-motion';
import {
  BarChart2, TrendingUp, Share2, Users,
  Activity, Calendar, Database, Layers,
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { GlassCard, Navbar, PageBackground } from '../components/shared';
import {
  analyticsSummary,
  historicoNacional,
  categoriesNacional,
  sourceDistribution,
} from '../data/analytics';
import {
  formatNumber,
  formatPercent,
  calcGrowthRate,
  calcShareRate,
} from '../lib/analytics';

// ---- Stat card -----------------------------------------------
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color = 'cyan',
  delay = 0,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub?: string;
  color?: string;
  delay?: number;
}) {
  const colorMap: Record<string, string> = {
    cyan:    'bg-cyan-500/20 text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20',
    blue:    'bg-blue-500/20 text-blue-400 border-blue-500/20',
    violet:  'bg-violet-500/20 text-violet-400 border-violet-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard className="p-4 sm:p-5" hover>
        <div className="flex items-start justify-between mb-3">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${colorMap[color]}`}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-cyan-200/60 mb-0.5">{label}</div>
        {sub && <div className="text-[10px] font-mono text-cyan-300/40">{sub}</div>}
      </GlassCard>
    </motion.div>
  );
}

// ---- Tooltip styles ------------------------------------------
const tooltipStyle = {
  backgroundColor: 'rgba(10,22,40,0.92)',
  border: '1px solid rgba(6,182,212,0.3)',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontSize: 12,
};

// ============================================================
// MAIN PAGE
// ============================================================
export default function AnalyticsPage() {
  const growthRate = calcGrowthRate(historicoNacional);
  const shareRate  = calcShareRate(
    analyticsSummary.totalInteracoes,
    analyticsSummary.interacoesCompartilhadas,
  );

  const COLORS = ['#ec4899', '#06b6d4', '#8b5cf6', '#3b82f6', '#64748b'];

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 mt-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart2 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">PAINEL ANALÍTICO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-cyan-200/60 text-sm sm:text-base max-w-2xl">
            Visão consolidada dos últimos 12 meses de interações institucionais das CAAs brasileiras.
            Período: <span className="text-cyan-300 font-mono">{analyticsSummary.periodoCobertura}</span>
          </p>
        </motion.div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard
            icon={Activity}
            label="Total de Interações"
            value={formatNumber(analyticsSummary.totalInteracoes)}
            sub="últimos 12 meses"
            color="cyan"
            delay={0}
          />
          <StatCard
            icon={Share2}
            label="Interações Compartilhadas"
            value={formatNumber(analyticsSummary.interacoesCompartilhadas)}
            sub={`${formatPercent(shareRate)} do total`}
            color="emerald"
            delay={0.05}
          />
          <StatCard
            icon={Users}
            label="Média por 1.000 advogados"
            value={String(analyticsSummary.mediaInteracoesPer1000)}
            sub="métrica normalizada"
            color="blue"
            delay={0.1}
          />
          <StatCard
            icon={TrendingUp}
            label="Crescimento no período"
            value={`+${formatPercent(growthRate, 0)}`}
            sub="Mar/2024 → Fev/2025"
            color="violet"
            delay={0.15}
          />
        </div>

        {/* Second row of KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: Database,  label: 'CAAs ativas',         value: String(analyticsSummary.caasAtivas),        color: 'cyan'    },
            { icon: Layers,    label: 'Categorias ativas',   value: String(analyticsSummary.categoriasAtivas),  color: 'blue'    },
            { icon: Calendar,  label: 'Serviços mapeados',   value: String(analyticsSummary.servicosMapeados),  color: 'violet'  },
            { icon: Activity,  label: 'Últ. atualização',    value: analyticsSummary.ultimaAtualizacao,         color: 'emerald' },
          ].map(({ icon, label, value, color }, i) => (
            <StatCard key={label} icon={icon} label={label} value={value} color={color} delay={0.2 + i * 0.05} />
          ))}
        </div>

        {/* Line chart: monthly totals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard className="p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
              Evolução Mensal de Interações
            </h2>
            <p className="text-xs text-cyan-200/50 mb-6">
              Total de interações e interações compartilhadas mês a mês nos últimos 12 meses.
            </p>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={historicoNacional} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" />
                <XAxis
                  dataKey="mes"
                  tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 10 }}
                  tickLine={false}
                  axisLine={{ stroke: 'rgba(6,182,212,0.2)' }}
                  interval={1}
                />
                <YAxis
                  tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  wrapperStyle={{ fontSize: 11, color: 'rgba(6,182,212,0.7)' }}
                  formatter={(v: string) =>
                    v === 'totalInteracoes' ? 'Total de interações' : 'Compartilhadas'
                  }
                />
                <Line
                  type="monotone"
                  dataKey="totalInteracoes"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#06b6d4' }}
                />
                <Line
                  type="monotone"
                  dataKey="interacoesCompartilhadas"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 5, fill: '#10b981' }}
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Bottom 2 cols: Bar + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar chart: by category */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <GlassCard className="p-4 sm:p-6 h-full">
              <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
                Interações por Categoria
              </h2>
              <p className="text-xs text-cyan-200/50 mb-6">
                Volume total de interações por categoria de serviço nos últimos 12 meses.
              </p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={categoriesNacional}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.1)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: 'rgba(6,182,212,0.5)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                  />
                  <YAxis
                    dataKey="categoria"
                    type="category"
                    tick={{ fill: 'rgba(6,182,212,0.7)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={110}
                  />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [formatNumber(v), 'Interações']} />
                  <Bar dataKey="totalInteracoes" fill="#06b6d4" radius={[0, 4, 4, 0]} opacity={0.85} />
                </BarChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Pie chart: source distribution */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <GlassCard className="p-4 sm:p-6 h-full">
              <h2 className="text-base sm:text-lg font-semibold text-white mb-1">
                Distribuição de Fontes
              </h2>
              <p className="text-xs text-cyan-200/50 mb-4">
                Percentual de interações por fonte de dados monitorada.
              </p>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={sourceDistribution}
                      dataKey="percentual"
                      nameKey="fonte"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                    >
                      {sourceDistribution.map((entry, index) => (
                        <Cell key={entry.fonte} fill={COLORS[index % COLORS.length]} opacity={0.85} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, 'Participação']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-2">
                  {sourceDistribution.map((s, i) => (
                    <div key={s.fonte} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-xs text-cyan-200/60">{s.fonte} {s.percentual}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Data note */}
        <p className="text-center text-[10px] text-cyan-200/30 mt-10">
          Dados analíticos gerados a partir do pipeline CAAsXplorer v2.1.0 · Base operacional: Fev/2025 · Schema auditável
        </p>
      </main>
    </div>
  );
}
