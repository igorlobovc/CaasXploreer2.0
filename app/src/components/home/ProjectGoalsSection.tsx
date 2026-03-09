import { CheckCircle2, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';

import { PROJECT_GOALS } from './data';

const ACHIEVEMENT_STATUS_STYLES: Record<
  'achieved' | 'in-progress' | 'planned',
  { badgeClass: string; badgeLabel: string; iconColorClass: string }
> = {
  achieved: {
    badgeClass: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400',
    badgeLabel: 'Atingido',
    iconColorClass: 'text-emerald-400',
  },
  'in-progress': {
    badgeClass: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400',
    badgeLabel: 'Em andamento',
    iconColorClass: 'text-cyan-400',
  },
  planned: {
    badgeClass: 'bg-slate-500/15 border-slate-500/30 text-slate-400',
    badgeLabel: 'Planejado',
    iconColorClass: 'text-slate-400',
  },
};

const ACHIEVEMENT_STATUS_ICONS: Record<'achieved' | 'in-progress' | 'planned', React.ElementType> = {
  achieved: CheckCircle2,
  'in-progress': Clock,
  planned: Target,
};

export function ProjectGoalsSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Target className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="MAPEAMENTO DO PROJETO"
            title="Objetivos e Resultados"
            description="Mapeamento dos objetivos do projeto e os resultados alcançados até o momento."
            descriptionClassName="max-w-2xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROJECT_GOALS.map((projectGoal, goalIndex) => {
            const achievementStyle = ACHIEVEMENT_STATUS_STYLES[projectGoal.achievementStatus];
            const AchievementStatusIcon = ACHIEVEMENT_STATUS_ICONS[projectGoal.achievementStatus];

            return (
              <motion.div
                key={projectGoal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: goalIndex * 0.1 }}
              >
                <GlassCard className="p-4 sm:p-5 h-full flex flex-col" hover>
                  {/* Goal header: icon + achievement badge */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <projectGoal.icon className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-medium ${achievementStyle.badgeClass}`}
                    >
                      <AchievementStatusIcon className={`w-3 h-3 ${achievementStyle.iconColorClass}`} />
                      {achievementStyle.badgeLabel}
                    </div>
                  </div>

                  {/* Goal title and description */}
                  <h3 className="text-base font-semibold text-white mb-2">{projectGoal.goalTitle}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200/60 leading-relaxed flex-1 mb-4">
                    {projectGoal.goalDescription}
                  </p>

                  {/* Target vs result */}
                  <div className="flex items-center justify-between pt-3 border-t border-cyan-500/20">
                    <div>
                      <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-0.5">Meta</div>
                      <div className="text-xs font-mono text-cyan-300/70">{projectGoal.targetValue}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-0.5">Resultado</div>
                      <div className={`text-xs font-mono font-semibold ${achievementStyle.iconColorClass}`}>
                        {projectGoal.currentResult}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
