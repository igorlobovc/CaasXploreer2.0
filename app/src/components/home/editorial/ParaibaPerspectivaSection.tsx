import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Cell,
} from 'recharts';
import { GlassCard } from '@/components/shared';
import { MapPin, TrendingUp, AlertCircle } from 'lucide-react';

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

const GEOGRAPHY_DATA = [
  { uf: 'MT', interior: 15, capital: 85, type: 'hyper-capital' },
  { uf: 'TO', interior: 18, capital: 82, type: 'hyper-capital' },
  { uf: 'AM', interior: 20, capital: 80, type: 'hyper-capital' },
  { uf: 'GO', interior: 65, capital: 35, type: 'interior-strength' },
  { uf: 'SC', interior: 62, capital: 38, type: 'interior-strength' },
  { uf: 'MS', interior: 61, capital: 39, type: 'interior-strength' },
  { uf: 'ES', interior: 58, capital: 42, type: 'interior-strength' },
];

const tooltipStyle = {
  backgroundColor: 'rgba(10,22,40,0.95)',
  border: '1px solid rgba(6,182,212,0.25)',
  borderRadius: '8px',
  color: '#e2e8f0',
  fontSize: 11,
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
                    cursor={{ strokeDasharray: '3 3', stroke: 'rgba(6,182,212,0.3)' }}
                    formatter={(value: number, name: string) => [
                      name === 'Posts/dia' ? `${value} posts/dia` : `${(value / 1000).toFixed(1)}k interações`,
                      name,
                    ]}
                  />
                  <ReferenceLine
                    x={0.5}
                    stroke="rgba(6,182,212,0.15)"
                    strokeDasharray="4 4"
                  />
                  <ReferenceLine
                    y={30000}
                    stroke="rgba(6,182,212,0.15)"
                    strokeDasharray="4 4"
                  />
                  <Scatter data={BENCHMARK_DATA} shape={<CustomDot />}>
                    {BENCHMARK_DATA.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.highlight ? '#ef4444' : '#1e3a5f'}
                      />
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

          {/* Right column: insights + geography */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {/* Key finding */}
            <GlassCard className="p-5 border border-red-500/20">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-red-500/15 border border-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-2 py-0.5 bg-red-500/15 text-red-400 rounded font-mono">
                      CAA-PB
                    </span>
                    <span className="text-[10px] text-cyan-200/40">Motor digital do Nordeste</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">
                    1 post/dia · 43k+ interações
                  </h4>
                  <p className="text-xs text-cyan-200/50 leading-relaxed">
                    A Paraíba posta mais e engaja mais que gigantes regionais como Pernambuco. O
                    desafio não é criar o canal, mas otimizar a mensagem.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Geography insight */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <h4 className="text-sm font-semibold text-white">
                  Pilar 2: A Geografia da Prática Jurídica
                </h4>
              </div>
              <div className="space-y-2">
                {GEOGRAPHY_DATA.map((item) => (
                  <div key={item.uf} className="flex items-center gap-3">
                    <span className="text-xs font-mono text-cyan-300/70 w-6">{item.uf}</span>
                    <div className="flex-1 flex items-center gap-1">
                      {/* Interior bar */}
                      <div className="flex-1 h-2 bg-[#0a1628] rounded-l overflow-hidden">
                        <div
                          className="h-full rounded-l"
                          style={{
                            width: `${item.interior}%`,
                            backgroundColor: '#c2410c',
                            marginLeft: `${100 - item.interior}%`,
                          }}
                        />
                      </div>
                      {/* Divider */}
                      <div className="w-px h-4 bg-cyan-500/30" />
                      {/* Capital bar */}
                      <div className="flex-1 h-2 bg-[#0a1628] rounded-r overflow-hidden">
                        <div
                          className="h-full rounded-r"
                          style={{
                            width: `${item.capital}%`,
                            backgroundColor: '#1e40af',
                          }}
                        />
                      </div>
                    </div>
                    <span className="text-[9px] text-cyan-200/30 w-16 text-right">
                      {item.type === 'hyper-capital'
                        ? `Cap: ${item.capital}%`
                        : `Int: ${item.interior}%`}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-orange-700" />
                  <span className="text-[9px] text-cyan-200/40">Interior</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded bg-blue-800" />
                  <span className="text-[9px] text-cyan-200/40">Capital</span>
                </div>
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
