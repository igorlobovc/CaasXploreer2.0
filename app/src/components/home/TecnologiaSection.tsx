import { Cpu, FileJson, GitBranch, Server, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

const TECH_ITEMS = [
  {
    Icon: GitBranch,
    title: 'Pipeline de Dados',
    desc: 'Fluxo automatizado de coleta, processamento e estruturação',
  },
  {
    Icon: FileJson,
    title: 'Schema Versionado',
    desc: 'Taxonomia canônica nacional com controle de versão',
  },
  {
    Icon: Shield,
    title: 'Datasets Auditáveis',
    desc: 'Rastreabilidade completa de fontes e transformações',
  },
  {
    Icon: Server,
    title: 'Exportação Estruturada',
    desc: 'JSON, CSV e API para integração com sistemas externos',
  },
];

export function TecnologiaSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="STACK TÉCNICO"
            title="Tecnologia"
            description="Infraestrutura analítica robusta, escalável e pronta para produção."
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {TECH_ITEMS.map((tech, index) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 flex items-start gap-4" hover>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <tech.Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white mb-1">{tech.title}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200/60">{tech.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
