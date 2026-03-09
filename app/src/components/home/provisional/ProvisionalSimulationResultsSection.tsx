import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

import { PROVISIONAL_REAL_ANALYTICS_DATA } from './realDataAdapter';

const { kpis, sentimentVolumeByWindow, topicMentionsTimeline, entitySourceDistribution, dateLabels } =
  PROVISIONAL_REAL_ANALYTICS_DATA;

const maxVolume = Math.max(
  1,
  ...topicMentionsTimeline.map((datum) => Math.max(datum.saude, datum.beneficios)),
);

// Provisional/simulated analytics visuals until canonical analytics integration.
export function ProvisionalSimulationResultsSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="SINAL EXTERNO"
            title="Evidência de Repercussão"
            titleClassName="mb-2 sm:mb-3"
            description="Leitura de repercussão externa baseada em consultas temáticas estruturadas. Repercussão na mídia e redes sociais, medida por tema como um todo ou por região."
            descriptionClassName="max-w-3xl"
          >
            <div className="mb-3 sm:mb-4">
              <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">Base Operacional</span>
              <p className="text-sm text-cyan-200/60 mt-1">
                Taxonomia validada e pipeline de dados em atualização contínua.
              </p>
            </div>
          </SectionHeading>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-3 sm:p-4 text-center h-full flex flex-col justify-center min-h-[100px]">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">{kpi.value}</div>
                <div className="text-[11px] sm:text-xs text-cyan-200/70 leading-tight">{kpi.label}</div>
                <div className="text-[9px] sm:text-[10px] text-cyan-200/40 mt-1">{kpi.sub}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm sm:text-base font-medium text-white">
                Volume Relativo por Janela de Consulta
              </h3>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((index) => (
                  <div key={index} className="border-t border-cyan-500/10 w-full" style={{ height: '20%' }} />
                ))}
              </div>

              <div className="h-48 sm:h-64 flex items-end gap-[2px] sm:gap-1 relative z-10">
                {sentimentVolumeByWindow.map((datum, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: `${datum.volume}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.03, ease: 'easeOut' }}
                    className="flex-1 flex flex-col justify-end"
                  >
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + index * 0.03 }}
                      style={{ height: `${datum.negativo}%` }}
                      className="w-full bg-rose-500/70 origin-bottom rounded-t-[1px]"
                    />
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.08 + index * 0.03 }}
                      style={{ height: `${datum.positivo}%` }}
                      className="w-full bg-emerald-500/70 origin-bottom"
                    />
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.03 }}
                      style={{ height: `${datum.neutro}%` }}
                      className="w-full bg-cyan-500/70 origin-bottom rounded-b-[2px]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-4 text-[10px] sm:text-xs text-cyan-200/50 font-mono">
              <span>{dateLabels.sentimentStart}</span>
              <span>{dateLabels.sentimentEnd}</span>
            </div>

            <div className="mt-6 pt-4 border-t border-cyan-500/20">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-cyan-500/70" />
                  <span className="text-xs text-cyan-200/70">Neutro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500/70" />
                  <span className="text-xs text-cyan-200/70">Positivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-rose-500/70" />
                  <span className="text-xs text-cyan-200/70">Negativo</span>
                </div>
              </div>
              <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                Dados reais com inferência conservadora para leitura comparativa
              </p>
              <p className="text-center text-[9px] text-cyan-200/30 mt-1">
                Base operacional: taxonomia validada e pipeline de dados em atualização
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <div className="mt-12 sm:mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Comparativos Analíticos</h3>
            <p className="text-sm text-cyan-200/60">
              Leitura comparativa de repercussão por tema e por entidade de assistência.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GlassCard className="p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-medium text-white mb-2">
                Evolução Temporal de Menções por Tema
              </h4>
              <p className="text-xs text-cyan-200/50 mb-6">
                Comparativo da evolução de menções por grandes temas de assistência à advocacia em nível nacional,
                agregando sinais de mídia e redes sociais ao longo do tempo.
              </p>

              <div className="relative h-56 sm:h-72">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className="border-t border-cyan-500/10 w-full" />
                  ))}
                </div>

                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox={`0 0 ${topicMentionsTimeline.length - 1} 100`}
                  preserveAspectRatio="none"
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    d={`M${topicMentionsTimeline.map(
                      (datum, index) => `${index},${100 - (datum.saude / maxVolume) * 80}`,
                    ).join(' L')}`}
                    fill="none"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
                    d={`M${topicMentionsTimeline.map(
                      (datum, index) => `${index},${100 - (datum.beneficios / maxVolume) * 80}`,
                    ).join(' L')}`}
                    fill="none"
                    stroke="rgb(251, 146, 60)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <div className="absolute inset-0 flex items-end justify-between px-0">
                  {topicMentionsTimeline.map((datum, index) => (
                    <div key={index} className="flex-1 relative h-full">
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.04 }}
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                        style={{
                          bottom: `${(datum.saude / maxVolume) * 80}%`,
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                        title={`${datum.mes}: Saúde ${datum.saude} menções`}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.04 }}
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full"
                        style={{
                          bottom: `${(datum.beneficios / maxVolume) * 80}%`,
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }}
                        title={`${datum.mes}: Benefícios ${datum.beneficios} menções`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between mt-4 text-[10px] sm:text-xs text-cyan-200/50 font-mono">
                <span>{dateLabels.timelineStart}</span>
                <span>{dateLabels.timelineEnd}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-cyan-500/20">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-xs text-cyan-200/70">SAÚDE & BEM-ESTAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="text-xs text-cyan-200/70">BENEFÍCIOS & CONVÊNIOS</span>
                  </div>
                </div>
                <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                  Dados reais com distribuição proporcional por tema para janela ativa
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-medium text-white mb-2">
                Distribuição de Fontes por Entidade
              </h4>
              <p className="text-xs text-cyan-200/50 mb-6">
                Distribuição relativa das fontes de menções por entidade de assistência, permitindo leitura comparativa
                de presença e visibilidade externa.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {entitySourceDistribution.map((entidade, index) => {
                  const total =
                    entidade.instagram +
                    entidade.facebook +
                    entidade.portais +
                    entidade.blogs +
                    entidade.outros;

                  return (
                    <motion.div
                      key={entidade.nome}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs sm:text-sm text-cyan-200/70 w-16 sm:w-20 flex-shrink-0">
                        {entidade.nome}
                      </span>
                      <div className="flex-1 h-6 sm:h-8 flex rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.instagram / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                          className="h-full bg-pink-500/70"
                          title={`Instagram: ${entidade.instagram}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.facebook / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.15 + index * 0.1 }}
                          className="h-full bg-blue-500/70"
                          title={`Facebook: ${entidade.facebook}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.portais / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                          className="h-full bg-cyan-500/70"
                          title={`Portais: ${entidade.portais}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.blogs / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.25 + index * 0.1 }}
                          className="h-full bg-emerald-500/70"
                          title={`Blogs: ${entidade.blogs}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.outros / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                          className="h-full bg-slate-500/70"
                          title={`Outros: ${entidade.outros}%`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-cyan-500/20">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-pink-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Instagram</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-blue-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Facebook</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-cyan-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Portais</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-emerald-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Blogs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-slate-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Outros</span>
                  </div>
                </div>
                <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                  Fontes agregadas | Inferência conservadora até integração de origem canônica
                </p>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <GlassCard className="p-4 sm:p-6">
              <p className="text-sm text-cyan-200/70 leading-relaxed">
                Os comparativos evidenciam diferenças estruturais de visibilidade externa entre entidades, tanto em
                volume absoluto quanto em diversidade de fontes. A leitura conjunta por tema e por entidade permite
                identificar padrões de repercussão, maturidade comunicacional e concentração de sinal.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
