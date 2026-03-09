import { motion } from 'framer-motion';

import { GlassCard, RadarSymbol, SectionHeading } from '@/components/shared';

import { STATE_SPOTLIGHTS } from './stateSpotlights';

export function ParaibaSpotlight() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<RadarSymbol className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label={STATE_SPOTLIGHTS.PB.label}
            title={STATE_SPOTLIGHTS.PB.title}
            description={STATE_SPOTLIGHTS.PB.description}
            descriptionClassName="max-w-3xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {STATE_SPOTLIGHTS.PB.pillars.map((pillar, index) => (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="text-[10px] uppercase tracking-wider text-cyan-300/60 mb-2">
                  Pilar {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="text-sm sm:text-base font-medium text-white">{pillar}</h3>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
