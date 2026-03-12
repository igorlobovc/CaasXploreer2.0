import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared';
import { Dumbbell, PawPrint, Briefcase, BookOpen, Stethoscope, Wind } from 'lucide-react';

const CASES = [
  {
    state: 'ES',
    caa: 'CAAES',
    icon: Wind,
    title: 'Paraquedismo',
    subtitle: 'Esportes Radicais e Diferenciados',
    description:
      'Acesso com desconto à única escola de paraquedismo em atividade no estado, oferecendo saltos a 10.000 pés sobre Vila Velha.',
    tag: 'Esporte Radical',
    tagColor: 'bg-sky-500/15 text-sky-300 border-sky-500/20',
    accent: 'border-sky-500/20 hover:border-sky-400/40',
  },
  {
    state: 'GO',
    caa: 'CASAG',
    icon: Briefcase,
    title: 'Clube de Tiro',
    subtitle: 'CASAG (GO)',
    description:
      'Parceria com o CTCI, disponibilizando 13 pistas curtas, pistas longas, tiro ao prato e acesso a instrutores e armamentos sem custo extra.',
    tag: 'Diferenciado',
    tagColor: 'bg-amber-500/15 text-amber-300 border-amber-500/20',
    accent: 'border-amber-500/20 hover:border-amber-400/40',
  },
  {
    state: 'AM',
    caa: 'CAAAM',
    icon: Dumbbell,
    title: 'MMA',
    subtitle: 'CAAAM (AM)',
    description:
      'Aulões gratuitos de Artes Marciais Mistas com mestres reconhecidos locais, diversificando o calendário esportivo da Caixa.',
    tag: 'Esporte',
    tagColor: 'bg-violet-500/15 text-violet-300 border-violet-500/20',
    accent: 'border-violet-500/20 hover:border-violet-400/40',
  },
  {
    state: 'PR',
    caa: 'CAAPR',
    icon: PawPrint,
    title: 'Saúde Pet',
    subtitle: 'CAAPR (PR)',
    description:
      'Convênio com clínicas veterinárias para consultas e procedimentos com desconto para advogados e seus animais de estimação.',
    tag: 'Lifestyle',
    tagColor: 'bg-pink-500/15 text-pink-300 border-pink-500/20',
    accent: 'border-pink-500/20 hover:border-pink-400/40',
  },
  {
    state: 'GO',
    caa: 'CASAG',
    icon: BookOpen,
    title: 'Hidratação de Bolsas',
    subtitle: 'CASAG (GO)',
    description:
      'Serviço de conservação e higienização de bolsas de couro com parceiros especializados, benefício voltado ao lifestyle profissional.',
    tag: 'Hiper-personalizado',
    tagColor: 'bg-rose-500/15 text-rose-300 border-rose-500/20',
    accent: 'border-rose-500/20 hover:border-rose-400/40',
  },
  {
    state: 'SP',
    caa: 'CAASP',
    icon: Stethoscope,
    title: 'Telemedicina Avançada',
    subtitle: 'CAASP (SP)',
    description:
      'Conexa e Psicologia Viva integradas, com cobertura de saúde mental, nutricional e clínica geral via app — padrão ouro nacional.',
    tag: 'Padrão Ouro',
    tagColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/20',
    accent: 'border-emerald-500/20 hover:border-emerald-400/40',
  },
];

export function CaudaLongaBeneficiosSection() {
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
            A Cauda Longa dos Benefícios
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Para Além do Gympass
            <br />
            <span className="text-cyan-400">e da Telemedicina</span>
          </h2>
          <p className="text-cyan-200/50 max-w-xl text-sm sm:text-base leading-relaxed">
            Como as CAAs estão mapeando as necessidades hiper-específicas do estilo de vida da
            advocacia — de paraquedismo a hidratação de bolsas.
          </p>
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CASES.map((item, index) => (
            <motion.div
              key={`${item.caa}-${item.title}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard
                className={`p-5 h-full border ${item.accent} transition-all duration-300`}
                hover
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/20 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono text-cyan-300/50 bg-cyan-500/8 px-2 py-0.5 rounded border border-cyan-500/15">
                      {item.state}
                    </span>
                    <span className={`text-[9px] px-2 py-0.5 rounded border font-medium ${item.tagColor}`}>
                      {item.tag}
                    </span>
                  </div>
                </div>

                <h4 className="text-base font-semibold text-white mb-0.5">{item.title}</h4>
                <p className="text-[10px] text-cyan-300/40 font-mono mb-3">{item.subtitle}</p>
                <p className="text-xs text-cyan-200/50 leading-relaxed">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {[
            { label: 'Categorias mapeadas', value: '120+', desc: 'taxonomia canônica nacional' },
            { label: 'Serviços identificados', value: '1.200+', desc: 'em 27 CAAs brasileiras' },
            { label: 'Cobertura nacional', value: '100%', desc: 'todas as regiões do país' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 bg-[#0a1628]/30 border border-cyan-500/10 rounded-xl text-center"
            >
              <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-white mb-0.5">{stat.label}</div>
              <div className="text-[10px] text-cyan-200/40">{stat.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
