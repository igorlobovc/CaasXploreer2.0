import { motion } from 'framer-motion';
import { Sparkles, Trophy, Zap } from 'lucide-react';

import { GlassCard, SectionHeading } from '@/components/shared';

const findings = [
  {
    title: 'O padrão ouro',
    description:
      'Estados com cobertura ampla, consistência de comunicação e clareza de proposta convergem para maior percepção de valor institucional.',
    Icon: Trophy,
  },
  {
    title: 'O motor do engajamento',
    description:
      'Benefícios e convênios associados a rotinas concretas da advocacia aumentam recorrência de interação e sustentam tração pública.',
    Icon: Zap,
  },
  {
    title: 'A era da hiper-personalização',
    description:
      'CAAs com portfólio segmentado por perfil profissional avançam em diferenciação, fidelização e relevância regional.',
    Icon: Sparkles,
  },
];

export function PanoramaExecutivoSection() {
  return (
    <section className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          label="PANORAMA EXECUTIVO"
          title="Síntese dos achados centrais"
          description="Três leituras estruturantes para interpretar o cenário comparativo das CAAs no país."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {findings.map((finding, index) => (
            <motion.div
              key={finding.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="p-5 h-full border-cyan-500/25" hover>
                <finding.Icon className="w-5 h-5 text-cyan-400 mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">{finding.title}</h3>
                <p className="text-sm text-cyan-100/75 leading-relaxed">{finding.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
