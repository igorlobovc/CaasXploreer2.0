import { useState } from 'react';

import { ChevronDown, Database } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, FilterChipButton, SectionHeading } from '@/components/shared';

import { SERVICOS_POR_CATEGORIA } from './data';

const CATEGORIAS = SERVICOS_POR_CATEGORIA.map((item) => item.categoria);

export function ServicosMapeadosSection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [categoriaExpandida, setCategoriaExpandida] = useState<string | null>(null);
  const categoriasFiltradas = categoriaAtiva
    ? SERVICOS_POR_CATEGORIA.filter((item) => item.categoria === categoriaAtiva)
    : SERVICOS_POR_CATEGORIA;

  const handleToggleCategoria = (categoria: string) => {
    setCategoriaExpandida((current) => (current === categoria ? null : categoria));
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="TAXONOMIA CANÔNICA"
            title="Serviços Mapeados"
            description="Resumo consolidado por categoria, com abertura de detalhes sob demanda."
          />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-5 sm:mb-6">
          <FilterChipButton
            active={categoriaAtiva === null}
            onClick={() => {
              setCategoriaAtiva(null);
              setCategoriaExpandida(null);
            }}
          >
            Todas
          </FilterChipButton>
          {CATEGORIAS.map((categoria) => (
            <FilterChipButton
              key={categoria}
              active={categoriaAtiva === categoria}
              onClick={() => {
                setCategoriaAtiva(categoria);
                setCategoriaExpandida(categoria);
              }}
            >
              {categoria}
            </FilterChipButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {categoriasFiltradas.map((categoria, index) => {
            const expandida = categoriaExpandida === categoria.categoria;
            return (
            <motion.div
              key={categoria.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <GlassCard className="p-3.5 sm:p-4 h-full" hover>
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => handleToggleCategoria(categoria.categoria)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">
                        {categoria.categoria}
                      </h3>
                      <p className="text-[11px] text-cyan-200/50 mt-1">Resumo por taxonomia</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-cyan-400">{categoria.count}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-cyan-300/70 transition-transform ${expandida ? 'rotate-180' : ''}`}
                      />
                    </div>
                  </div>
                </button>
                <div className="mt-2 text-[10px] text-cyan-300/40 uppercase tracking-wide">
                  {categoria.examples.length} exemplos mapeados
                </div>
                {expandida ? (
                  <div className="mt-3 pt-3 border-t border-cyan-500/15">
                    <div className="flex flex-wrap gap-1.5">
                      {categoria.examples.map((example) => (
                        <span
                          key={example}
                          className="text-[10px] text-cyan-200/70 bg-cyan-500/10 px-2 py-1 rounded"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </GlassCard>
            </motion.div>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] text-cyan-200/40 text-center">
          * Valores estimados a partir de consolidação de fontes públicas inspecionadas
        </p>
      </div>
    </section>
  );
}
