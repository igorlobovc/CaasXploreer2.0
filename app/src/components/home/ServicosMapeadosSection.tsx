import { useState } from 'react';

import { Database } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, FilterChipButton, SectionHeading } from '@/components/shared';

import { SERVICOS_POR_CATEGORIA } from './data';

const REGIOES = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

export function ServicosMapeadosSection() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="TAXONOMIA CANÔNICA"
            title="Serviços Mapeados"
            description="Serviços institucionais identificados e classificados por categoria, com base em evidência pública e documentação oficial."
          />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8">
          <FilterChipButton active={activeRegion === null} onClick={() => setActiveRegion(null)}>
            Todas
          </FilterChipButton>
          {REGIOES.map((regionName) => (
            <FilterChipButton
              key={regionName}
              active={activeRegion === regionName}
              onClick={() => setActiveRegion(regionName)}
            >
              {regionName}
            </FilterChipButton>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {SERVICOS_POR_CATEGORIA.map((categoria, index) => (
            <motion.div
              key={categoria.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{categoria.categoria}</h3>
                  <span className="text-2xl font-bold text-cyan-400">{categoria.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoria.examples.map((example) => (
                    <span key={example} className="text-[10px] text-cyan-200/60 bg-cyan-500/10 px-2 py-1 rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-cyan-200/40 text-center">
          * Valores estimados a partir de consolidação de fontes públicas inspecionadas
        </p>
      </div>
    </section>
  );
}
