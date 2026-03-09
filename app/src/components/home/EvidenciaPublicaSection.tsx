import { useState, useMemo } from 'react';

import { Calendar, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

import { FilterChipButton, GlassCard, SectionHeading } from '@/components/shared';

import { ACOES_INSTITUCIONAIS } from './data';

export function EvidenciaPublicaSection() {
  const [filterUF, setFilterUF] = useState<string | null>(null);
  const ufs = useMemo(
    () => [...new Set(ACOES_INSTITUCIONAIS.map((acao) => acao.uf))],
    [],
  );
  const filteredAcoes = filterUF
    ? ACOES_INSTITUCIONAIS.filter((acao) => acao.uf === filterUF)
    : ACOES_INSTITUCIONAIS;

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="AÇÕES INSTITUCIONAIS E EVIDÊNCIA PÚBLICA"
            title="Iniciativas Não-Transacionais"
            description="Ações institucionais que geram alto impacto simbólico, produzem buzz social e fortalecem a imagem institucional."
            descriptionClassName="max-w-3xl"
          />
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          <FilterChipButton active={filterUF === null} onClick={() => setFilterUF(null)}>
            Todas
          </FilterChipButton>
          {ufs.map((uf) => (
            <FilterChipButton key={uf} active={filterUF === uf} onClick={() => setFilterUF(uf)}>
              {uf}
            </FilterChipButton>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAcoes.map((acao, index) => (
            <motion.div
              key={acao.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                    <acao.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">
                        {acao.uf}
                      </span>
                      {acao.benchmark ? (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">
                          benchmark
                        </span>
                      ) : null}
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white">{acao.title}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-cyan-200/60 mb-4 leading-relaxed">{acao.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cyan-500/10">
                  <div className="flex flex-wrap gap-1">
                    {acao.data_origin.map((origin) => (
                      <span
                        key={`${acao.id}-${origin}`}
                        className="text-[9px] text-cyan-300/40 bg-cyan-500/5 px-1.5 py-0.5 rounded"
                      >
                        {origin}
                      </span>
                    ))}
                  </div>
                  {acao.source_url ? (
                    <a
                      href={acao.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ) : null}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
