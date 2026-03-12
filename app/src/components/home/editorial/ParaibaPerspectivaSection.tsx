import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { GlassCard } from '@/components/shared';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { PptxSlideCarousel } from './PptxSlideCarousel';

// Benchmark data for northeastern states
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

const tooltipStyle = {
  backgroundColor: 'rgba(5,11,20,0.98)',
  border: '1px solid rgba(6,182,212,0.35)',
  borderRadius: '8px',
  color: '#f1f5f9',
  fontSize: 12,
  fontWeight: 500,
  boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
};

const tooltipLabelStyle = {
  color: '#67e8f9',
  fontWeight: 600,
  marginBottom: 4,
};

function CustomDot(props: {
  cx?: number;
  cy?: number;
  payload?: { highlight?: boolean; name?: string; size?: number };
}) {
  const { cx = 0, cy = 0, payload } = props;
  const isHighlight = payload?.highlight;
  const r = isHighlight ? 16 : (payload?.size ?? 12) / 2.5;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={isHighlight ? '#ef4444' : '#1e3a5f'}
      stroke={isHighlight ? '#ef4444' : '#06b6d4'}
      strokeWidth={isHighlight ? 2 : 1}
      opacity={0.85}
    />
  );
}

export function ParaibaPerspectivaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-3">
            Benchmarking Regional · Nordeste
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Paraíba em Perspectiva
            <br />
            <span className="text-cyan-400">Analítica</span>
          </h2>
          <p className="text-cyan-200/50 max-w-xl text-sm sm:text-base leading-relaxed">
            Onde a Paraíba lidera e onde pode crescer. A CAA-PB como motor digital do Nordeste.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scatter chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-white mb-1">
                Volume vs. Engajamento — Nordeste
              </h3>
              <p className="text-xs text-cyan-200/40 mb-5">
                Posts/dia × total de interações (12 meses)
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(6,182,212,0.08)" />
                  <XAxis
                    dataKey="posts"
                    name="Posts/dia"
                    tick={{ fill: 'rgba(6,182,212,0.45)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={{ stroke: 'rgba(6,182,212,0.15)' }}
                    label={{
                      value: 'Volume/Frequência de Posts',
                      position: 'insideBottom',
                      offset: -10,
                      fill: 'rgba(6,182,212,0.35)',
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    dataKey="engagement"
                    name="Interações"
                    tick={{ fill: 'rgba(6,182,212,0.45)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
                    label={{
                      value: 'Engajamento',
                      angle: -90,
                      position: 'insideLeft',
                      fill: 'rgba(6,182,212,0.35)',
                      fontSize: 10,
                    }}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    labelStyle={tooltipLabelStyle}
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

              {/* Legend */}
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

          {/* Right column: key finding + Hex embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* PPTX Slide Carousel */}
            <PptxSlideCarousel />

            {/* Hex embed — Geography of Legal Practice */}
            <GlassCard className="p-0 overflow-hidden border border-cyan-500/15">
              <div className="px-5 pt-4 pb-3 border-b border-cyan-500/10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    Bench comparativo perfis CAAs
                  </h4>
                  <p className="text-[10px] text-cyan-200/40 mt-0.5 leading-relaxed">
                    JAN 2025 até 11 mar · vs. mesmo período dez 2024 para trás
                  </p>
                </div>
                <a
                  href="https://app.hex.tech/3f6a746a-e122-46c6-be12-44807bef5d8e/app/032gpsHbsbTkJyPNjMCjbI/latest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-cyan-400/60 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Abrir</span>
                </a>
              </div>
              <div className="relative w-full" style={{ paddingBottom: '75%' }}>
                <iframe
                  src="https://app.hex.tech/3f6a746a-e122-46c6-be12-44807bef5d8e/app/032gpsHbsbTkJyPNjMCjbI/latest?embedded=true"
                  className="absolute inset-0 w-full h-full border-0"
                  title="A Geografia da Prática Jurídica"
                  loading="lazy"
                  allow="fullscreen"
                />
              </div>
            </GlassCard>

            {/* Analyst alert */}
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
      </div>
    </section>
  );
}
