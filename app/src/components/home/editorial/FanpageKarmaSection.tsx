import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared';
import { ExternalLink } from 'lucide-react';

export function FanpageKarmaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-violet-400/60 uppercase tracking-[0.2em] mb-3">
            Análise de Presença Digital
          </p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                Relatório Fanpage Karma
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                Análise comparativa de performance digital das CAAs — engajamento, crescimento de
                seguidores, frequência de posts e benchmarks competitivos em tempo real.
              </p>
            </div>
            <a
              href="https://app.fanpagekarma.com/onlinePresentation?pr=ag5zfmZhbnBhZ2VrYXJtYXIfCxIST25saW5lUHJlc2VudGF0aW9uGICAga-K35AIDA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/15 border border-violet-500/25 text-sm text-violet-300 hover:bg-violet-600/25 hover:text-violet-200 transition-colors flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Abrir em tela cheia</span>
            </a>
          </div>
        </motion.div>

        {/* Full-width embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-0 overflow-hidden border border-violet-500/15">
            {/* Toolbar */}
            <div className="px-5 py-3 border-b border-violet-500/10 flex items-center justify-between bg-[#0d0d1a]/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500/60" />
                <span className="text-xs font-mono text-violet-300/60">fanpagekarma.com</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-slate-500">live</span>
              </div>
            </div>

            {/* Iframe — full width, 80vh */}
            <div className="w-full" style={{ height: '80vh', minHeight: 600 }}>
              <iframe
                src="https://app.fanpagekarma.com/onlinePresentation?pr=ag5zfmZhbnBhZ2VrYXJtYXIfCxIST25saW5lUHJlc2VudGF0aW9uGICAga-K35AIDA"
                className="w-full h-full border-0"
                title="Relatório Fanpage Karma — CAAs"
                loading="lazy"
                allow="fullscreen"
              />
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
