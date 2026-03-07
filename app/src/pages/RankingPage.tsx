import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { servicosPorCategoria } from '../data/ranking';

export default function RankingPage() {

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
              TAXONOMIA CANÔNICA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Serviços Mapeados</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Serviços institucionais identificados e classificados por categoria, com base em evidência pública e
            documentação oficial.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicosPorCategoria.map((cat, i) => (
            <motion.div
              key={cat.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{cat.categoria}</h3>
                  <span className="text-2xl font-bold text-cyan-400">{cat.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.examples.map((ex, idx) => (
                    <span key={idx} className="text-[10px] text-cyan-200/60 bg-cyan-500/10 px-2 py-1 rounded">
                      {ex}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-cyan-200/40 text-center">
          * Valores estimados a partir de consolidação de fontes públicas inspecionadas
        </p>
      </div>
    </section>
  );
}
