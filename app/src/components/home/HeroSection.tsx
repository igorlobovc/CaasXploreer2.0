import { FileText, Radar } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard } from '@/components/shared';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-14 sm:pt-28 sm:pb-20 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-cyan-400/20 bg-slate-950/80 p-6 sm:p-10"
        >
          <div className="flex items-center gap-2 mb-6 text-cyan-300/80 text-xs uppercase tracking-[0.2em]">
            <Radar className="w-4 h-4" />
            Capa editorial · edição beta
          </div>

          <h1 className="text-3xl sm:text-5xl font-semibold leading-tight text-white max-w-5xl">
            Panorama comparativo das Caixas de Assistência da Advocacia Brasileira
          </h1>
          <p className="mt-5 text-cyan-100/80 text-base sm:text-lg max-w-3xl leading-relaxed">
            Leitura editorial e comparativa sobre cobertura de benefícios, engajamento digital e diferenciais regionais
            das CAAs no Brasil.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              'Cobertura nacional e lentes regionais',
              'Destaques de mobilização por categoria',
              'Comparativos beta-safe para leitura executiva',
            ].map((item) => (
              <GlassCard key={item} className="p-4 border-cyan-500/20 bg-cyan-500/5">
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <p className="text-sm text-cyan-100/85">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
