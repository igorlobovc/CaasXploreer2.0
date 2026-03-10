import { useMemo, useState } from 'react';

import { ChevronDown, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

import { FilterChipButton, GlassCard, SectionHeading } from '@/components/shared';
import {
  SERVICE_TAXONOMY,
  SERVICE_TAXONOMY_SUBCATEGORY_TOTAL,
  SERVICE_TAXONOMY_TOTAL,
} from '@/data/serviceTaxonomy';

export function ServiceTaxonomySection() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [categoriaExpandida, setCategoriaExpandida] = useState<string | null>(null);

  const categoriasVisiveis = useMemo(
    () =>
      categoriaAtiva
        ? SERVICE_TAXONOMY.filter((item) => item.categoria === categoriaAtiva)
        : SERVICE_TAXONOMY,
    [categoriaAtiva],
  );

  const handleFilterChange = (categoria: string | null) => {
    setCategoriaAtiva(categoria);
    setCategoriaExpandida(null);
  };

  const handleExpandToggle = (categoria: string) => {
    setCategoriaExpandida((current) => (current === categoria ? null : categoria));
  };

  return (
    <section className="py-12 sm:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Layers className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="TAXONOMIA CANÔNICA"
            title="Resumo Compacto por Categoria"
            description="Leitura sintética por categoria, com detalhes de subcategorias abertos sob demanda."
            className="mb-6 sm:mb-8"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <GlassCard className="p-3 sm:p-4">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">
              Categorias
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white">{SERVICE_TAXONOMY.length}</div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">
              Subcategorias
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white">{SERVICE_TAXONOMY_SUBCATEGORY_TOTAL}</div>
          </GlassCard>
          <GlassCard className="p-3 sm:p-4">
            <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">
              Registros
            </div>
            <div className="text-lg sm:text-xl font-semibold text-white">{SERVICE_TAXONOMY_TOTAL.toLocaleString('pt-BR')}</div>
          </GlassCard>
        </div>

        <div className="flex flex-wrap gap-2 mb-4 sm:mb-5">
          <FilterChipButton active={categoriaAtiva === null} onClick={() => handleFilterChange(null)}>
            Todas
          </FilterChipButton>
          {SERVICE_TAXONOMY.map((item) => (
            <FilterChipButton
              key={item.categoria}
              active={categoriaAtiva === item.categoria}
              onClick={() => handleFilterChange(item.categoria)}
            >
              {item.categoria}
            </FilterChipButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
          {categoriasVisiveis.map((item, index) => {
            const expandida = categoriaExpandida === item.categoria;
            return (
              <motion.div
                key={item.categoria}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <GlassCard className="p-3.5 sm:p-4 h-full" hover>
                  <button type="button" className="w-full text-left" onClick={() => handleExpandToggle(item.categoria)}>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm sm:text-base font-semibold text-white leading-tight">{item.categoria}</h3>
                      <ChevronDown
                        className={`w-4 h-4 text-cyan-300/70 transition-transform ${expandida ? 'rotate-180' : ''}`}
                      />
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs">
                      <span className="text-cyan-300/80 font-medium">{item.total.toLocaleString('pt-BR')}</span>
                      <span className="text-cyan-200/45">{item.subcategoryTotal} subcategorias</span>
                    </div>
                  </button>

                  {expandida ? (
                    <div className="mt-3 pt-3 border-t border-cyan-500/15 flex flex-wrap gap-1.5">
                      {item.subcategories.map((subcategory) => (
                        <span
                          key={`${item.categoria}-${subcategory.name}`}
                          className="inline-flex items-center gap-1 text-[10px] text-cyan-200/70 bg-cyan-500/10 px-2 py-1 rounded"
                        >
                          <span>{subcategory.name}</span>
                          <span className="text-cyan-300/60">({subcategory.total})</span>
                        </span>
                      ))}
                    </div>
                  ) : null}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

