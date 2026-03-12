import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Map, Trophy, Activity } from 'lucide-react';
import { GlassCard } from '@/components/shared';

const FEATURES = [
  {
    icon: BarChart2,
    title: 'Analytics',
    description:
      'Painel analítico completo com evolução mensal, distribuição por categoria e fontes de dados.',
    href: '/analytics',
    cta: 'Abrir Analytics',
    accent: 'cyan',
  },
  {
    icon: Trophy,
    title: 'Ranking Nacional',
    description:
      'Classificação das CAAs por engajamento per capita, com métricas normalizadas por 1.000 advogados.',
    href: '/ranking',
    cta: 'Ver Ranking',
    accent: 'amber',
  },
  {
    icon: Map,
    title: 'Explorar Estados',
    description:
      'Perfil detalhado de cada estado: serviços mapeados, categorias líderes e benchmarks regionais.',
    href: '/estados',
    cta: 'Explorar Estados',
    accent: 'blue',
  },
];

const accentMap: Record<string, { icon: string; cta: string; border: string }> = {
  cyan: {
    icon: 'bg-cyan-500/15 text-cyan-400',
    cta: 'bg-cyan-500/15 text-cyan-300 hover:bg-cyan-500/25 border border-cyan-500/20',
    border: 'hover:border-cyan-400/40',
  },
  amber: {
    icon: 'bg-amber-500/15 text-amber-400',
    cta: 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/20',
    border: 'hover:border-amber-400/40',
  },
  blue: {
    icon: 'bg-blue-500/15 text-blue-400',
    cta: 'bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 border border-blue-500/20',
    border: 'hover:border-blue-400/40',
  },
};

export function ExploreBetaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-cyan-400/20 bg-cyan-500/8 rounded-full mb-6">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-wider">
              Plataforma em Beta
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Explore o Beta do
            <br />
            <span className="text-cyan-400">CAAsXplorer</span>
          </h2>
          <p className="text-cyan-200/50 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            Acesse os módulos analíticos já disponíveis. Dados reais, visualizações interativas e
            leitura comparativa entre as 27 CAAs brasileiras.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((feature, index) => {
            const colors = accentMap[feature.accent];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12 }}
              >
                <GlassCard
                  className={`p-6 h-full flex flex-col border border-cyan-500/15 ${colors.border} transition-all duration-300`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${colors.icon}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-cyan-200/50 leading-relaxed flex-1 mb-5">
                    {feature.description}
                  </p>
                  <Link
                    to={feature.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${colors.cta}`}
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-6 sm:p-8 bg-gradient-to-r from-cyan-500/10 via-blue-500/8 to-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Dados Abertos. Leitura Estruturada.
          </h3>
          <p className="text-cyan-200/50 text-sm mb-6 max-w-md mx-auto">
            Pipeline auditável, taxonomia versionada e datasets prontos para integração com
            sistemas externos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/analytics"
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#050b14] font-semibold text-sm rounded-lg transition-colors"
            >
              Começar Agora
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/estados"
              className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 text-sm rounded-lg transition-colors"
            >
              Ver Todos os Estados
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
