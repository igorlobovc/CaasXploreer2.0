import { GlassCard } from '@/components/shared';
import { estadosData } from '@/data/estados';

interface MetricCellProps {
  value: number;
  min: number;
  max: number;
  suffix?: string;
}

function getHeatColor(value: number, min: number, max: number) {
  if (max === min) return 'rgba(6, 182, 212, 0.20)';
  const ratio = (value - min) / (max - min);
  const opacity = 0.16 + ratio * 0.48;
  return `rgba(34, 211, 238, ${opacity.toFixed(3)})`;
}

function MetricCell({ value, min, max, suffix = '' }: MetricCellProps) {
  return (
    <td
      className="text-right px-3 py-2 text-sm font-medium text-cyan-50 border-b border-cyan-500/10"
      style={{ backgroundColor: getHeatColor(value, min, max) }}
    >
      {value.toFixed(1)}{suffix}
    </td>
  );
}

export function UFHeatmapMatrix() {
  const matrix = [...estadosData]
    .map((estado) => ({
      uf: estado.uf,
      estado: estado.estado,
      interacoesPer1000: estado.interacoesPer1000,
      sharedPct: (estado.interacoesCompartilhadas / estado.totalInteracoes) * 100,
    }))
    .sort((a, b) => b.interacoesPer1000 - a.interacoesPer1000);

  const per1000Values = matrix.map((item) => item.interacoesPer1000);
  const sharedPctValues = matrix.map((item) => item.sharedPct);

  const minPer1000 = Math.min(...per1000Values);
  const maxPer1000 = Math.max(...per1000Values);
  const minShared = Math.min(...sharedPctValues);
  const maxShared = Math.max(...sharedPctValues);

  return (
    <GlassCard className="p-4 sm:p-5 rounded-xl border border-cyan-500/20 bg-[#071326]/80">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-white">Matriz UF · Intensidade de Interações</h2>
        <p className="text-xs sm:text-sm text-cyan-200/60 mt-1">
          Heatmap beta-safe com foco em interações por 1.000 advogados e participação de interações compartilhadas.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wider text-cyan-300/60">
              <th className="px-3 py-2 border-b border-cyan-500/20">UF</th>
              <th className="px-3 py-2 border-b border-cyan-500/20">Estado</th>
              <th className="px-3 py-2 border-b border-cyan-500/20 text-right">Interações / 1k adv.</th>
              <th className="px-3 py-2 border-b border-cyan-500/20 text-right">Interações compartilhadas (%)</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((item) => (
              <tr key={item.uf} className="hover:bg-cyan-500/5 transition-colors">
                <td className="px-3 py-2 text-xs text-cyan-100 border-b border-cyan-500/10 font-mono">{item.uf}</td>
                <td className="px-3 py-2 text-sm text-cyan-100 border-b border-cyan-500/10">{item.estado}</td>
                <MetricCell value={item.interacoesPer1000} min={minPer1000} max={maxPer1000} />
                <MetricCell value={item.sharedPct} min={minShared} max={maxShared} suffix="%" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}
