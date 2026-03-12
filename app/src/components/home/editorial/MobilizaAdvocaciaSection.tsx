import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { GlassCard } from '@/components/shared';
import { TrendingUp, Award, Zap, Heart } from 'lucide-react';

const ENGAGEMENT_DATA = [
  { categoria: 'Benefícios e Convênios', engagement: 1.34, posts: 90, color: '#06b6d4' },
  { categoria: 'Sorteios', engagement: 0.83, posts: 419, color: '#3b82f6' },
  { categoria: 'Esporte e Bem-estar', engagement: 0.73, posts: 65, color: '#8b5cf6' },
  { categoria: 'Saúde', engagement: 0.52, posts: 745, color: '#10b981' },
];

const THEMES = [
  {
    icon: Award,
    title: 'Benefícios e Convênios',
    subtitle: 'A espinha dorsal',
    description:
      'Postagens sobre descontos reais (Sesc, Nissei, restaurantes) geram o maior número de curtidas e salvamentos orgânicos.',
    tag: 'Maior engajamento',
    tagColor: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20',
  },
  {
    icon: Zap,
    title: 'Sorteios',
    subtitle: 'O grande motor de visibilidade',
    description:
      'Sorteios servem como principal ferramenta de alcance. Gera picos absolutos de comentários e marcações.',
    tag: 'Pico de alcance',
    tagColor: 'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Esporte e Bem-estar',
    subtitle: 'A categoria com maior crescimento',
    description:
      'Constrói a comunidade mais leal e recorrente. Alta retenção orgânica e senso de pertencimento.',
    tag: 'Maior retenção',
    tagColor: 'bg-violet-500/15 text-violet-300 border border-violet-500/20',
  },
  {
    icon: Heart,
    title: 'Saúde',
    subtitle: 'Serviço de alta confiança',
    description:
      'Essencialidade reconhecida, mas que naturalmente gera menor interação viral pública.',
    tag: 'Alta confiança',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  },
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

export function MobilizaAdvocaciaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      {/* Subtle separator */}
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
            Análise de Engajamento
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            O Que Realmente
            <br />
            <span className="text-cyan-400">Mobiliza a Advocacia?</span>
          </h2>
          <p className="text-cyan-200/50 max-w-xl text-sm sm:text-base leading-relaxed">
            Análise de 6.357 posts institucionais revela quais categorias geram engajamento
            genuíno versus alcance superficial.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-6">
              <h3 className="text-sm font-semibold text-white mb-1">
                Taxa de Engajamento por Categoria
              </h3>
              <p className="text-xs text-cyan-200/40 mb-6">
                Engajamento médio (%) — quanto maior, mais orgânico e recorrente
              </p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart
                  data={ENGAGEMENT_DATA}
                  layout="vertical"
                  margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
                >
                  <XAxis
                    type="number"
                    tick={{ fill: 'rgba(6,182,212,0.45)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v: number) => `${v.toFixed(1)}%`}
                  />
                  <YAxis
                    dataKey="categoria"
                    type="category"
                    tick={{ fill: 'rgba(6,182,212,0.65)', fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    width={130}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(v: number) => [`${v.toFixed(2)}%`, 'Engajamento']}
                  />
                  <Bar dataKey="engagement" radius={[0, 6, 6, 0]}>
                    {ENGAGEMENT_DATA.map((entry) => (
                      <Cell key={entry.categoria} fill={entry.color} opacity={0.85} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Annotation */}
              <div className="mt-4 p-3 bg-[#0a0f1a]/60 border border-cyan-500/10 rounded-lg">
                <p className="text-[10px] text-cyan-200/40 leading-relaxed">
                  <span className="text-cyan-400">Nota:</span> Sorteios geram picos absolutos de
                  comentários e marcações — motor de visibilidade, não de retenção.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Theme cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {THEMES.map((theme, index) => (
              <motion.div
                key={theme.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 sm:p-5 flex items-start gap-4" hover>
                  <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <theme.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{theme.title}</h4>
                        <p className="text-[10px] text-cyan-300/50 italic">{theme.subtitle}</p>
                      </div>
                      <span className={`text-[9px] px-2 py-0.5 rounded font-medium flex-shrink-0 ${theme.tagColor}`}>
                        {theme.tag}
                      </span>
                    </div>
                    <p className="text-xs text-cyan-200/50 leading-relaxed">{theme.description}</p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
