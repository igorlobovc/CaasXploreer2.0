import { ArrowRight, CheckCircle2, Radio, Server, Shield, Sparkles, WandSparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, RadarSymbol } from '@/components/shared';

function MetricsPanel() {
  return (
    <GlassCard className="space-y-4 rounded-2xl border-cyan-400/20 bg-[#111827]/80 p-4 shadow-lg shadow-cyan-500/40 sm:p-5">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyan-400" />
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/70">ESTADO DO SISTEMA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
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
          <div key={metric.label} className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
            <div className="mb-1 text-[9px] uppercase tracking-wider text-cyan-300/50">{metric.label}</div>
            <div className="text-xl font-semibold text-white sm:text-2xl">{metric.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-cyan-500/20 pt-2">
        <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-1">
          <CheckCircle2 className="h-3 w-3 text-emerald-400" />
          <span className="text-[9px] text-emerald-400">SCHEMA v2.1</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-1">
          <Server className="h-3 w-3 text-blue-400" />
          <span className="text-[9px] text-blue-400">PIPELINE ATIVO</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-1">
          <Shield className="h-3 w-3 text-cyan-400" />
          <span className="text-[9px] text-cyan-400">AUDITÁVEL</span>
        </div>
      </div>
    </GlassCard>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center">
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pt-32">
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6 sm:space-y-8 lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              <span className="text-xs uppercase tracking-[0.2em] text-cyan-200">Galaxy SaaS Theme</span>
            </div>

            <div>
              <h1 className="glow-text-cyan text-5xl font-bold leading-[1.05] tracking-tight text-cyan-300 sm:text-6xl lg:text-7xl">
                CAA sXplorer
              </h1>
              <h2 className="mt-3 flex items-center gap-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-white">Estratégia</span>
                <ArrowRight className="h-7 w-7 text-cyan-400 sm:h-8 sm:w-8" />
                <span className="text-[#3B82F6]">em Escala</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-white">
                Plataforma de inteligência para advocacy com visão nacional de serviços, desempenho e oportunidades de
                evolução.
              </p>
              <p className="text-base leading-relaxed text-[#94A3B8]">
                Design cósmico + dados auditáveis para transformar sinais dispersos em decisões executivas de alto
                impacto.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="#insights"
                className="inline-flex items-center gap-2 rounded-full bg-[#00E0FF] px-6 py-3 text-sm font-semibold text-white transition-all hover:shadow-[0_0_15px_rgba(0,224,255,0.7)]"
              >
                <WandSparkles className="h-4 w-4" />
                Explorar insights
              </a>
              <a
                href="#dados"
                className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition-all hover:border-cyan-200/80 hover:bg-cyan-500/20"
              >
                <RadarSymbol className="h-4 w-4" />
                Ver cobertura nacional
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-5"
          >
            <MetricsPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
