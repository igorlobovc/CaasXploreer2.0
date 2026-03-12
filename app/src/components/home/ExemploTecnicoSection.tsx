import { useState } from 'react';

import { Code, FileJson, SearchCode, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

const TECHNICAL_EXAMPLES = {
  json: `{
  "uf": "PB",
  "categoria": "SAÚDE",
  "servico": "Vacinação da Advocacia",
  "evidencia": "noticia_institucional",
  "status": "confirmado",
  "benchmark": true,
  "fontes": ["site", "notícia", "registro"],
  "data_captura": "2026-02-06"
}`,
  query: `("Vacinação" OR "Vacina" OR "Imunização")
AND ("OAB-PB" OR "CAA-PB" OR "Advocacia PB")
AND ("João Pessoa" OR "Paraíba")
NOT ("Gripe comum" OR "Particular")`,
  schema: `servico: {
  id: UUID
  uf: UF_BRASIL
  categoria: CATEGORIA_TAXONOMICA
  nome: STRING
  evidencia: TIPO_EVIDENCIA
  status: confirmado|parcial|não_confirmado
  fontes: ARRAY<FONTE>
  data_captura: ISO_DATE
  metadata: {
    porte_seccional: ENUM
    densidade_adv: FLOAT
  }
}`,
} as const;

type TechnicalExampleTab = keyof typeof TECHNICAL_EXAMPLES;

export function ExemploTecnicoSection() {
  const [tabAtiva, setTabAtiva] = useState<TechnicalExampleTab>('json');

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="ESTRUTURA TÉCNICA"
            title="Exemplo Técnico"
            description="Estrutura de dados versionada, auditável e pronta para integração com pipelines analíticos."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="overflow-hidden">
            <div className="flex border-b border-cyan-500/20">
              {(['json', 'query', 'schema'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabAtiva(tab)}
                  className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors ${
                    tabAtiva === tab
                      ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                      : 'text-cyan-200/50 hover:text-cyan-200/70'
                  }`}
                >
                  {tab === 'json' ? (
                    <span className="flex items-center gap-2">
                      <FileJson className="w-4 h-4" /> JSON
                    </span>
                  ) : null}
                  {tab === 'query' ? (
                    <span className="flex items-center gap-2">
                      <SearchCode className="w-4 h-4" /> Query
                    </span>
                  ) : null}
                  {tab === 'schema' ? (
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Schema
                    </span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="p-4 sm:p-6 bg-[#0a0f1a]/80">
              <pre className="text-xs sm:text-sm text-cyan-100/80 font-mono overflow-x-auto">
                <code>{TECHNICAL_EXAMPLES[tabAtiva]}</code>
              </pre>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
