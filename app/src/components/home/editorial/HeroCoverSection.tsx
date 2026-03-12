import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RadarSymbol } from '@/components/shared';

const STATS = [
  { value: '27', label: 'CAAs mapeadas', icon: Users },
  { value: '1.47M', label: 'Profissionais', icon: TrendingUp },
  { value: '6.357', label: 'Posts analisados', icon: BookOpen },
];

export function HeroCoverSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#050b14]" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,212,255,0.12) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-10 h-10 bg-cyan-500/15 border border-cyan-400/30 rounded-lg flex items-center justify-center">
            <RadarSymbol className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <span className="text-sm font-semibold text-white tracking-tight">CAAsXplorer</span>
            <span className="text-xs text-cyan-400/50 ml-2 font-mono">v2.1.0</span>
          </div>
          <div className="ml-auto flex items-center gap-2 px-3 py-1.5 border border-cyan-400/20 bg-cyan-500/8 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-wider">
              Relatório de Inteligência de Dados
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-4">
                O Ecossistema de Benefícios da Advocacia Brasileira
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.05]">
                O DNA da Nova
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Advocacia Brasileira
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-cyan-100/60 leading-relaxed max-w-2xl">
              Um raio-x analítico em 15 visualizações de alto impacto sobre demografia, economia,
              tecnologia e sentimento institucional das Caixas de Assistência (CAAs).
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#050b14] font-semibold text-sm rounded-lg transition-colors"
              >
                Explorar Analytics
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/ranking"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300 hover:text-cyan-200 text-sm rounded-lg transition-colors"
              >
                Ver Ranking Nacional
              </Link>
            </div>
          </motion.div>

          {/* Stats column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-5 space-y-3"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="flex items-center gap-4 p-4 bg-[#0a1628]/50 border border-cyan-500/15 rounded-xl backdrop-blur-sm"
              >
                <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-cyan-200/50">{stat.label}</div>
                </div>
              </motion.div>
            ))}

            <div className="mt-4 p-4 bg-[#0a1628]/30 border border-cyan-500/10 rounded-xl">
              <p className="text-[10px] font-mono text-cyan-300/40 uppercase tracking-wider mb-1">
                Nota do Cientista de Dados
              </p>
              <p className="text-xs text-cyan-200/50 leading-relaxed">
                Análise descritiva e espacial extraída do censo estatístico de mais de 1,47 milhão
                de profissionais. Foco em anomalias estatísticas e disparidades regionais.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-mono text-cyan-300/30 uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-400/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
