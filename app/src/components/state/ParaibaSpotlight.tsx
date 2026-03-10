import { motion } from 'framer-motion';

import { GlassCard, RadarSymbol, SectionHeading } from '@/components/shared';
import { estadosData } from '@/data/estados';

function formatPct(value: number) {
  return `${value.toFixed(1)}%`;
}

export function ParaibaSpotlight() {
  const pb = estadosData.find((estado) => estado.uf === 'PB');
  const nordeste = estadosData.filter((estado) => estado.regiao === 'Nordeste');

  if (!pb || nordeste.length === 0) {
    return null;
  }

  const brasilMediaPer1000 =
    estadosData.reduce((sum, estado) => sum + estado.interacoesPer1000, 0) / estadosData.length;

  const nordesteMediaPer1000 =
    nordeste.reduce((sum, estado) => sum + estado.interacoesPer1000, 0) / nordeste.length;

  const pbSharedPct = (pb.interacoesCompartilhadas / pb.totalInteracoes) * 100;
  const nordesteSharedPct =
    nordeste.reduce((sum, estado) => sum + (estado.interacoesCompartilhadas / estado.totalInteracoes) * 100, 0) /
    nordeste.length;
  const brasilSharedPct =
    estadosData.reduce((sum, estado) => sum + (estado.interacoesCompartilhadas / estado.totalInteracoes) * 100, 0) /
    estadosData.length;

  const pbRank =
    [...estadosData].sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000).findIndex((item) => item.uf === 'PB') +
    1;

  const insight =
    pb.interacoesPer1000 >= brasilMediaPer1000
      ? 'Paraíba opera acima da média regional e nacional em intensidade relativa de engajamento.'
      : 'Paraíba preserva boa tração relativa e mantém espaço claro para aceleração acima da média nacional.';

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<RadarSymbol className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="PARAÍBA · DESTAQUE EDITORIAL"
            title="Paraíba em Perspectiva Analítica"
            description="Comparativo beta-safe entre Paraíba, média do Nordeste e média do Brasil com foco em eficiência de interação."
            descriptionClassName="max-w-3xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <GlassCard className="p-5 border border-cyan-400/30 bg-cyan-500/10">
            <div className="text-[10px] uppercase tracking-wider text-cyan-300/70 mb-2">Paraíba (PB)</div>
            <div className="text-2xl font-bold text-white mb-1">{pb.interacoesPer1000.toFixed(1)}</div>
            <div className="text-xs text-cyan-100/80 mb-2">interações por 1.000 advogados</div>
            <div className="text-xs text-cyan-200/70">Compartilhadas: {formatPct(pbSharedPct)}</div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[10px] uppercase tracking-wider text-cyan-300/60 mb-2">Nordeste · média</div>
            <div className="text-2xl font-bold text-white mb-1">{nordesteMediaPer1000.toFixed(1)}</div>
            <div className="text-xs text-cyan-100/80 mb-2">interações por 1.000 advogados</div>
            <div className="text-xs text-cyan-200/70">Compartilhadas: {formatPct(nordesteSharedPct)}</div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="text-[10px] uppercase tracking-wider text-cyan-300/60 mb-2">Brasil · média</div>
            <div className="text-2xl font-bold text-white mb-1">{brasilMediaPer1000.toFixed(1)}</div>
            <div className="text-xs text-cyan-100/80 mb-2">interações por 1.000 advogados</div>
            <div className="text-xs text-cyan-200/70">Compartilhadas: {formatPct(brasilSharedPct)}</div>
          </GlassCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="mt-4"
        >
          <GlassCard className="p-4 sm:p-5 border border-cyan-500/25">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-cyan-300/60 mb-1">Posição segura no ranking</div>
                <p className="text-sm text-cyan-100">PB rank #{pbRank} em interações por 1.000 advogados.</p>
              </div>
              <p className="text-sm text-cyan-200/90 sm:text-right">{insight}</p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
