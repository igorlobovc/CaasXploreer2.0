import { Activity, Gift, HeartPulse, Ticket } from 'lucide-react';

import { GlassCard, SectionHeading } from '@/components/shared';

const pillars = [
  {
    title: 'Benefícios e Convênios',
    text: 'Categoria com maior potencial de tração contínua e percepção imediata de utilidade.',
    Icon: Gift,
  },
  {
    title: 'Sorteios',
    text: 'Formato de alto alcance para ativação rápida, especialmente em ciclos de campanha.',
    Icon: Ticket,
  },
  {
    title: 'Esporte e Bem-estar',
    text: 'Programas de pertencimento que conectam comunidade, rotina e imagem institucional.',
    Icon: Activity,
  },
  {
    title: 'Saúde',
    text: 'Frente crítica de valor assistencial, com impacto direto em reputação e confiança.',
    Icon: HeartPulse,
  },
];

export function MobilizacaoAdvocaciaSection() {
  return (
    <section className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          label="MOBILIZAÇÃO DA ADVOCACIA"
          title="O que realmente mobiliza a advocacia"
          description="Quatro frentes que concentram sinais mais consistentes de engajamento e resposta pública."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {pillars.map((pillar) => (
            <GlassCard key={pillar.title} className="p-5 border-cyan-500/20 bg-slate-950/70" hover>
              <pillar.Icon className="w-5 h-5 text-cyan-400 mb-3" />
              <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-cyan-100/75 leading-relaxed">{pillar.text}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
