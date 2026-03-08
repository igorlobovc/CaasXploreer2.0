import { ArrowRight, CheckCircle2, Radio, Server, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, RadarSymbol } from '@/components/shared';

function MetricsPanel() {
  return (
    <GlassCard className="p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-wider">
            ESTADO DO SISTEMA
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-400">OPERACIONAL</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'CAAs MAPEADAS', value: '27' },
          { label: 'CATEGORIAS', value: '120+' },
          { label: 'SERVIÇOS ID.', value: '1.200+' },
          { label: 'COBERTURA', value: 'NACIONAL' },
        ].map((metric) => (
          <div key={metric.label} className="bg-cyan-500/5 p-3 rounded border border-cyan-500/10">
            <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-1">{metric.label}</div>
            <div className="text-xl sm:text-2xl font-semibold text-white">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap pt-2 border-t border-cyan-500/20">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] text-emerald-400">SCHEMA v2.1</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded">
          <Server className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] text-blue-400">PIPELINE ATIVO</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded">
          <Shield className="w-3 h-3 text-cyan-400" />
          <span className="text-[9px] text-cyan-400">AUDITÁVEL</span>
        </div>
      </div>
    </GlassCard>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/20 border border-cyan-400/40 rounded-lg flex items-center justify-center">
              <RadarSymbol className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">CAAsXplorer</span>
              <span className="text-xs sm:text-sm text-cyan-400/60 ml-2 font-mono">v2.1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-cyan-400/30 bg-cyan-500/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 uppercase tracking-wider">
              Success Finder
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Busca Estruturada
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] flex items-center gap-2 sm:gap-3 mt-1">
                <span className="text-cyan-400">Estrutura</span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500/60" />
                <span className="text-blue-400">Ação</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-cyan-100/80 leading-relaxed text-base sm:text-lg">
                Transforma informação dispersa em evidência estruturada.
              </p>
              <p className="text-cyan-200/50 leading-relaxed text-sm sm:text-base">
                Sinal sem ruído. Dados comparáveis sobre serviços de assistência à advocacia.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-cyan-200/70">27 CAAs mapeadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-sm text-cyan-200/70">Taxonomia validada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-sm text-cyan-200/70">Datasets auditáveis</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6"
          >
            <MetricsPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
