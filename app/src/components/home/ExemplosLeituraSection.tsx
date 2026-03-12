import { BookOpenText, Compass, Layers, Shapes } from 'lucide-react';

import { GlassCard, SectionHeading } from '@/components/shared';

const readings = [
  {
    title: 'Cauda longa dos benefícios',
    description: 'Cobertura extensa com baixo destaque tende a esconder diferenciais que poderiam virar assinatura institucional.',
    Icon: Layers,
  },
  {
    title: 'Esportes diferenciados',
    description: 'Estados que ampliam modalidades além do básico aumentam valor percebido e criam presença de marca assistencial.',
    Icon: Shapes,
  },
  {
    title: 'Adoção tecnológica e fricção regional',
    description: 'Maturidade digital heterogênea explica parte das diferenças de alcance e velocidade de mobilização entre regiões.',
    Icon: Compass,
  },
  {
    title: 'A Caixa do futuro',
    description: 'Modelo híbrido, orientado por dados e curadoria ativa de benefícios, aparece como vetor de próxima geração.',
    Icon: BookOpenText,
  },
];

export function ExemplosLeituraSection() {
  return (
    <section className="py-14 sm:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<BookOpenText className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
          label="EXEMPLOS DE LEITURA"
          title="Casos interpretativos para leitura rápida"
          description="Recortes editoriais para transformar dados comparativos em decisão e priorização estratégica."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {readings.map((reading) => (
            <GlassCard key={reading.title} className="p-5 sm:p-6 border-cyan-500/20" hover>
              <reading.Icon className="w-5 h-5 text-cyan-400 mb-3" />
              <h3 className="text-lg text-white font-semibold">{reading.title}</h3>
              <p className="mt-2 text-sm text-cyan-100/75 leading-relaxed">{reading.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
