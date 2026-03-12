import { motion } from 'framer-motion';
import { Activity, MapPin, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/shared';

const PILLARS = [
  {
    number: '1',
    icon: Activity,
    title: 'O Padrão Ouro',
    description:
      'As CAAs transcenderam a saúde básica. Hoje, atuam como hubs completos de lifestyle, ancorados nacionalmente em Telemedicina (Conexa/Psicologia Viva) e acessos fitness (Wellhub/TotalPass).',
    accent: 'cyan',
  },
  {
    number: '2',
    icon: Sparkles,
    title: 'O Motor do Engajamento',
    description:
      'O engajamento digital é dominado por Benefícios de Varejo (Sesc, farmácias) e Sorteios. Porém, a categoria de Esporte e Bem-estar é a que gera maior retenção orgânica e senso de comunidade.',
    accent: 'blue',
  },
  {
    number: '3',
    icon: MapPin,
    title: 'A Era da Hiper-Personalização',
    description:
      'Para engajar diferentes perfis, os estados apostam na cauda longa de benefícios: de paraquedismo no Espírito Santo a saúde pet no Paraná e hidratação de bolsas em Goiás.',
    accent: 'violet',
  },
];

const accentMap: Record<string, { number: string; border: string; icon: string; tag: string }> = {
  cyan: {
    number: 'text-cyan-400',
    border: 'border-cyan-500/20 hover:border-cyan-400/40',
    icon: 'bg-cyan-500/15 text-cyan-400',
    tag: 'bg-cyan-500/10 text-cyan-300',
  },
  blue: {
    number: 'text-blue-400',
    border: 'border-blue-500/20 hover:border-blue-400/40',
    icon: 'bg-blue-500/15 text-blue-400',
    tag: 'bg-blue-500/10 text-blue-300',
  },
  violet: {
    number: 'text-violet-400',
    border: 'border-violet-500/20 hover:border-violet-400/40',
    icon: 'bg-violet-500/15 text-violet-400',
    tag: 'bg-violet-500/10 text-violet-300',
  },
};

export function PanoramaExecutivoSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-3">
            Panorama Executivo
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Três Descobertas que
            <br />
            <span className="text-cyan-400">Redefinem o Setor</span>
          </h2>
          <p className="text-cyan-200/50 max-w-xl text-sm sm:text-base leading-relaxed">
            Avaliação regional, engajamento digital e as ofertas mais inovadoras das Caixas de
            Assistência (CAAs).
          </p>
        </motion.div>

        {/* Pillars grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => {
            const colors = accentMap[pillar.accent];
            return (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard
                  className={`p-6 sm:p-8 h-full flex flex-col border ${colors.border} transition-all duration-300`}
                >
                  {/* Number */}
                  <div
                    className={`text-6xl font-bold ${colors.number} opacity-30 leading-none mb-4 select-none`}
                  >
                    {pillar.number}
                  </div>

                  {/* Icon + title */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.icon}`}
                    >
                      <pillar.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="w-8 h-px bg-cyan-500/20 mb-4" />

                  {/* Description */}
                  <p className="text-sm text-cyan-200/55 leading-relaxed flex-1">
                    {pillar.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 p-5 sm:p-6 bg-[#0a1628]/40 border border-cyan-500/10 rounded-xl"
        >
          <p className="text-center text-sm sm:text-base text-cyan-100/60 leading-relaxed max-w-3xl mx-auto italic">
            "A Caixa de Assistência do futuro não apenas cuida da saúde do advogado na doença; ela
            potencializa o seu estilo de vida, sua imagem e sua comunidade em todas as frentes."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
