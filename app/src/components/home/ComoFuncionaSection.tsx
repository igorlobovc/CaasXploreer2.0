import { BarChart, Eye, Filter, Layout, Search } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

const ETAPAS = [
  {
    numero: '01',
    titulo: 'Coleta Estruturada',
    descricao:
      'Varredura controlada de fontes institucionais e públicas, com captura validada de páginas, notícias e registros oficiais.',
    Icon: Search,
  },
  {
    numero: '02',
    titulo: 'Classificação Canônica',
    descricao:
      'Enquadramento de cada serviço em taxonomia nacional padronizada, permitindo comparação objetiva entre estados.',
    Icon: Filter,
  },
  {
    numero: '03',
    titulo: 'Evidência Pública',
    descricao:
      'Consolidação de sinais externos (notícias, menções e registros públicos) para validação de impacto não-transacional.',
    Icon: Eye,
  },
  {
    numero: '04',
    titulo: 'Leitura Comparativa',
    descricao:
      'Análise por UF, região e porte institucional, revelando diferenciais, lacunas e benchmarks nacionais.',
    Icon: BarChart,
  },
];

export function ComoFuncionaSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Layout className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="METODOLOGIA"
            title="Como Funciona"
            description="Pipeline de inteligência assistencial estruturado em quatro etapas operacionais."
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {ETAPAS.map((etapa, index) => (
            <motion.div
              key={etapa.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <GlassCard className="p-5 sm:p-6 h-full hover:border-cyan-400/40" hover>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                      <etapa.Icon className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-cyan-500/40">{etapa.numero}</span>
                      <h3 className="text-lg font-semibold text-white">{etapa.titulo}</h3>
                    </div>
                    <p className="text-sm text-cyan-200/60 leading-relaxed">{etapa.descricao}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
