import { Activity, CheckCircle2, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

import { TIMELINE_EVENTS } from './data';

export function CronogramaSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="ENTREGA"
            title="Linha de Entrega"
            description="O serviço se encerra com a entrega do relatório técnico consolidado."
            descriptionClassName="max-w-none"
          />
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-cyan-500/20" />

          <div className="space-y-6 sm:space-y-8">
            {TIMELINE_EVENTS.map((event, index) => (
              <motion.div
                key={event.date}
                initial={false}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                <div
                  className={`relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.status === 'completed'
                      ? 'bg-emerald-500/20 border border-emerald-500/50'
                      : event.status === 'current'
                        ? 'bg-cyan-500/20 border border-cyan-500/50'
                        : 'bg-blue-500/20 border border-blue-500/50'
                  }`}
                >
                  {event.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  ) : null}
                  {event.status === 'current' ? (
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  ) : null}
                  {event.status === 'final' ? (
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  ) : null}
                </div>

                <GlassCard className="flex-1 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                    <span className="text-xs font-mono text-cyan-400">{event.date}</span>
                    {event.status === 'current' ? (
                      <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded w-fit">
                        ATUAL
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1">{event.title}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200/60">{event.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
