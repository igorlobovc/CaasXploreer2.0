import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
  PieChart, Pie, Legend,
} from 'recharts';
import { GlassCard } from '@/components/shared';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { PptxSlideCarousel } from './PptxSlideCarousel';

/* ─── Scatter data ─────────────────────────────────────────────────────────── */
const BENCHMARK_DATA = [
  { name: 'CAA-PB', posts: 1.0, engagement: 43000, size: 40, highlight: true },
  { name: 'CAA-RN', posts: 0.76, engagement: 22899, size: 28, highlight: false },
  { name: 'CAA-PE', posts: 0.28, engagement: 23528, size: 24, highlight: false },
  { name: 'CAA-CE', posts: 0.65, engagement: 39612, size: 26, highlight: false },
  { name: 'CAA-BA', posts: 0.55, engagement: 44623, size: 30, highlight: false },
  { name: 'CAA-MA', posts: 0.1, engagement: 201, size: 12, highlight: false },
  { name: 'CAA-PI', posts: 0.8, engagement: 48267, size: 28, highlight: false },
  { name: 'CAA-AL', posts: 0.45, engagement: 29043, size: 20, highlight: false },
];

/* ─── Interaction share data (from CSV — top 10 + others) ──────────────────── */
const INTERACTION_DATA = [
  { name: 'CAA-MG', value: 122975, pct: 13.2 },
  { name: 'CAA-PI', value: 64551, pct: 7.0 },
  { name: 'CAAAM', value: 60389, pct: 6.5 },
  { name: 'CAA-DF', value: 58766, pct: 6.3 },
  { name: 'CAA-SE', value: 51339, pct: 5.5 },
  { name: 'CAA-BA', value: 50644, pct: 5.5 },
  { name: 'CAASP', value: 49102, pct: 5.3 },
  { name: 'CAA-CE', value: 47348, pct: 5.1 },
  { name: 'CAA-PR', value: 44245, pct: 4.8 },
  { name: 'CAA-PB', value: 44131, pct: 4.8, highlight: true },
  { name: 'Outros', value: 335398, pct: 36.1 },
];

const COLORS = [
  '#334155', '#334155', '#334155', '#334155', '#334155',
  '#334155', '#334155', '#334155', '#334155',
  '#6366f1', // CAA-PB — indigo highlight
  '#1e293b',
];

/* ─── Tooltip styles ───────────────────────────────────────────────────────── */
const tooltipStyle = {
  backgroundColor: 'rgba(5,11,20,0.98)',
  border: '1px solid rgba(6,182,212,0.35)',
  borderRadius: '8px',
  color: '#f1f5f9',
  fontSize: 12,
  fontWeight: 500,
  boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
};
const tooltipLabelStyle = { color: '#67e8f9', fontWeight: 600, marginBottom: 4 };

function CustomDot(props: {
  cx?: number; cy?: number;
  payload?: { highlight?: boolean; name?: string; size?: number };
}) {
  const { cx = 0, cy = 0, payload } = props;
  const isHighlight = payload?.highlight;
  const r = isHighlight ? 16 : (payload?.size ?? 12) / 2.5;
  return (
    <circle cx={cx} cy={cy} r={r}
      fill={isHighlight ? '#ef4444' : '#1e3a5f'}
      stroke={isHighlight ? '#ef4444' : '#06b6d4'}
      strokeWidth={isHighlight ? 2 : 1}
      opacity={0.85}
    />
  );
}

/* ─── Custom pie label ─────────────────────────────────────────────────────── */
interface PieLabelProps {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number;
  name: string; pct: number; highlight?: boolean;
}
function PieLabel({ cx, cy, midAngle, innerRadius, outerRadius, pct, highlight }: PieLabelProps) {
  if (pct < 4 && !highlight) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill={highlight ? '#a5b4fc' : 'rgba(148,163,184,0.7)'}
      textAnchor="middle" dominantBaseline="central" fontSize={highlight ? 11 : 9} fontWeight={highlight ? 700 : 400}>
      {highlight ? `PB ${pct}%` : `${pct}%`}
    </text>
  );
}

export function ParaibaPerspectivaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Section header ─────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-14">
          <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-3">
            Benchmarking Regional · Nordeste
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Paraíba Líder NE
            <br />
            <span className="text-cyan-400">em Perspectiva Analítica</span>
          </h2>
          <p className="text-cyan-200/50 max-w-xl text-sm sm:text-base leading-relaxed">
            Onde a Paraíba lidera e onde pode crescer. A CAA-PB como motor digital do Nordeste.
          </p>
        </motion.div>

        {/* ── Row 1: Scatter + Interaction Share ─────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Scatter chart */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <GlassCard className="p-6 h-full">
              <h3 className="text-sm font-semibold text-white mb-1">
                Volume vs. Engajamento — Nordeste
              </h3>
              <p className="text-xs text-cyan-200/40 mb-5">
                Posts/dia × total de interações (12 meses)
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.08)" />
                  <XAxis dataKey="posts" name="Posts/dia"
                    tick={{ fill: 'rgba(6,182,212,0.45)', fontSize: 10 }}
                    tickLine={false} axisLine={{ stroke: 'rgba(6,182,212,0.15)' }}
                    label={{ value: 'Volume/Frequência de Posts', position: 'insideBottom', offset: -10, fill: 'rgba(6,182,212,0.35)', fontSize: 10 }}
                  />
                  <YAxis dataKey="engagement" name="Interações"
                    tick={{ fill: 'rgba(6,182,212,0.45)', fontSize: 10 }}
                    tickLine={false} axisLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    label={{ value: 'Engajamento', angle: -90, position: 'insideLeft', fill: 'rgba(6,182,212,0.35)', fontSize: 10 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle}
                    cursor={{ strokeDasharray: '3 3', stroke: 'rgba(6,182,212,0.3)' }}
                    formatter={(value: number, name: string) => [
                      name === 'Posts/dia' ? `${value} posts/dia` : `${(value / 1000).toFixed(1)}k interações`,
                      name,
                    ]}
                  />
                  <ReferenceLine x={0.5} stroke="rgba(6,182,212,0.15)" strokeDasharray="4 4" />
                  <ReferenceLine y={30000} stroke="rgba(6,182,212,0.15)" strokeDasharray="4 4" />
                  <Scatter data={BENCHMARK_DATA} shape={<CustomDot />}>
                    {BENCHMARK_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.highlight ? '#ef4444' : '#1e3a5f'} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-[10px] text-cyan-200/50">CAA-PB (destaque)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#1e3a5f] border border-cyan-500/40" />
                  <span className="text-[10px] text-cyan-200/50">Demais CAAs</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Interaction share pie */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}>
            <GlassCard className="p-6 h-full">
              <h3 className="text-sm font-semibold text-white mb-1">
                Share de Interações — Nacional
              </h3>
              <p className="text-xs text-cyan-200/40 mb-4">
                Distribuição do total de interações entre CAAs (mar 2026)
              </p>

              {/* Highlight badge */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-indigo-600/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-[10px] font-bold text-indigo-300">PB</span>
                </div>
                <div>
                  <div className="text-lg font-bold text-indigo-300">4,8% do total nacional</div>
                  <div className="text-[10px] text-slate-400">44.131 interações · 10º lugar geral</div>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={INTERACTION_DATA}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    dataKey="value"
                    labelLine={false}
                    label={(props) => <PieLabel {...props} />}
                  >
                    {INTERACTION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}
                        stroke={entry.highlight ? '#6366f1' : 'rgba(255,255,255,0.04)'}
                        strokeWidth={entry.highlight ? 2 : 1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value: number, _name: string, props) => [
                      `${value.toLocaleString('pt-BR')} interações (${props.payload?.pct}%)`,
                      props.payload?.name,
                    ]}
                  />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: 'rgba(148,163,184,0.6)', fontSize: 10 }}>{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>

              {/* Top 5 bar list */}
              <div className="mt-3 space-y-1.5">
                {INTERACTION_DATA.slice(0, 5).map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono w-14 flex-shrink-0 ${item.highlight ? 'text-indigo-300 font-bold' : 'text-slate-400'}`}>
                      {item.name}
                    </span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.pct / 13.2) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className={`h-full rounded-full ${item.highlight ? 'bg-indigo-500' : 'bg-slate-600'}`}
                      />
                    </div>
                    <span className="text-[9px] text-slate-500 w-8 text-right">{item.pct}%</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* ── Row 2: PPTX Carousel (full-width) ──────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-8">
          <PptxSlideCarousel />
        </motion.div>

        {/* ── Row 3: Hex notebook (full-width) ───────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-8">
          <GlassCard className="p-0 overflow-hidden border border-cyan-500/15">
            <div className="px-5 pt-4 pb-3 border-b border-cyan-500/10 flex items-start justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white leading-snug">
                  Bench comparativo perfis CAAs
                </h4>
                <p className="text-xs text-cyan-200/50 mt-1 leading-relaxed max-w-2xl">
                  JAN 2025 até 11 de março · Uns contra os outros, avaliação estatística contra os
                  próprios desempenhos no mesmo número de dias dez 31 2024 para trás.
                </p>
              </div>
              <a
                href="https://app.hex.tech/3f6a746a-e122-46c6-be12-44807bef5d8e/app/032gpsHbsbTkJyPNjMCjbI/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-cyan-400/60 hover:text-cyan-300 transition-colors flex-shrink-0 mt-0.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Abrir no Hex</span>
              </a>
            </div>
            {/* Full-width iframe — 70vh tall */}
            <div className="w-full" style={{ height: '70vh', minHeight: 520 }}>
              <iframe
                src="https://app.hex.tech/3f6a746a-e122-46c6-be12-44807bef5d8e/app/032gpsHbsbTkJyPNjMCjbI/latest?embedded=true"
                className="w-full h-full border-0"
                title="Bench comparativo perfis CAAs"
                loading="lazy"
                allow="fullscreen"
              />
            </div>
          </GlassCard>
        </motion.div>

        {/* ── Row 4: Analyst alert ────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>
          <GlassCard className="p-4 border border-orange-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-mono text-orange-400/70 uppercase tracking-wider mb-1">
                  Alerta Analítico
                </p>
                <p className="text-xs text-cyan-200/50 leading-relaxed">
                  MT (85% na capital) vs. MS (61% no interior). Dois gigantes do agronegócio
                  vizinhos, porém com lógicas de distribuição profissional diametralmente opostas.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

      </div>
    </section>
  );
}
