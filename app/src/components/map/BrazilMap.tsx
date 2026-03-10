// ============================================================
// BrazilMap - Mapa Interativo do Brasil (Beta)
// Componente funcional, limpo e pronto para produção
// ============================================================

import React, { useState, useMemo, useCallback } from 'react';
import type { BrazilMapProps } from './types';
import { getStateColor, formatNumber, getLegendItems } from './utils';

// ============================================================
// SVG PATHS - Mapa do Brasil (27 UFs)
// ============================================================
const STATE_PATHS = [
  { uf: 'AC', d: 'M48,185 L78,180 L88,205 L83,235 L53,245 L38,215 Z', labelX: 58, labelY: 210 },
  { uf: 'AM', d: 'M83,125 L183,115 L203,155 L193,205 L143,215 L103,205 L88,180 L78,150 Z', labelX: 138, labelY: 165 },
  { uf: 'RR', d: 'M103,55 L163,50 L168,90 L143,105 L108,100 Z', labelX: 133, labelY: 80 },
  { uf: 'AP', d: 'M168,90 L203,85 L208,115 L178,125 L171,105 Z', labelX: 188, labelY: 105 },
  { uf: 'PA', d: 'M163,50 L283,55 L323,105 L303,145 L253,155 L203,155 L183,115 L168,90 Z', labelX: 238, labelY: 105 },
  { uf: 'RO', d: 'M88,205 L143,215 L153,255 L123,285 L93,275 L83,235 Z', labelX: 118, labelY: 250 },
  { uf: 'TO', d: 'M253,155 L303,145 L323,205 L293,235 L263,225 L248,185 Z', labelX: 283, labelY: 190 },
  { uf: 'MA', d: 'M323,105 L403,115 L423,165 L383,185 L343,175 L323,145 Z', labelX: 373, labelY: 150 },
  { uf: 'PI', d: 'M343,175 L383,185 L393,235 L363,245 L333,225 Z', labelX: 365, labelY: 210 },
  { uf: 'CE', d: 'M403,115 L443,120 L453,165 L423,175 L408,145 Z', labelX: 428, labelY: 145 },
  { uf: 'RN', d: 'M443,120 L478,125 L483,160 L458,170 L451,150 Z', labelX: 465, labelY: 145 },
  { uf: 'PB', d: 'M478,125 L508,130 L513,170 L488,180 L483,160 Z', labelX: 495, labelY: 153 },
  { uf: 'PE', d: 'M453,165 L483,160 L488,180 L508,185 L498,215 L463,220 L448,190 Z', labelX: 478, labelY: 190 },
  { uf: 'AL', d: 'M498,215 L523,220 L528,250 L508,260 L498,235 Z', labelX: 513, labelY: 240 },
  { uf: 'SE', d: 'M463,220 L498,215 L508,260 L488,270 L473,245 Z', labelX: 488, labelY: 245 },
  { uf: 'BA', d: 'M333,225 L363,245 L393,235 L423,245 L453,265 L463,295 L423,315 L363,305 L323,275 L313,245 Z', labelX: 393, labelY: 275 },
  { uf: 'MT', d: 'M193,205 L248,185 L263,225 L293,235 L303,285 L253,295 L203,275 L193,235 Z', labelX: 248, labelY: 245 },
  { uf: 'GO', d: 'M293,235 L363,245 L373,295 L343,325 L303,315 L293,285 Z', labelX: 328, labelY: 280 },
  { uf: 'DF', d: 'M338,265 L353,263 L355,280 L341,283 Z', labelX: 348, labelY: 273 },
  { uf: 'MS', d: 'M203,275 L253,295 L303,315 L293,365 L243,355 L203,325 Z', labelX: 253, labelY: 320 },
  { uf: 'MG', d: 'M373,295 L423,245 L463,295 L453,335 L403,345 L373,325 Z', labelX: 415, labelY: 295 },
  { uf: 'ES', d: 'M453,335 L483,330 L493,365 L463,375 L453,355 Z', labelX: 473, labelY: 353 },
  { uf: 'RJ', d: 'M423,355 L453,335 L463,375 L443,400 L423,385 Z', labelX: 443, labelY: 368 },
  { uf: 'SP', d: 'M343,325 L373,325 L403,345 L423,355 L423,385 L383,405 L343,395 L323,365 Z', labelX: 373, labelY: 365 },
  { uf: 'PR', d: 'M323,365 L343,395 L333,425 L293,415 L303,385 Z', labelX: 318, labelY: 400 },
  { uf: 'SC', d: 'M293,415 L333,425 L323,465 L283,455 L288,425 Z', labelX: 308, labelY: 440 },
  { uf: 'RS', d: 'M253,455 L283,455 L323,465 L343,505 L303,535 L253,515 L233,485 Z', labelX: 293, labelY: 500 },
];

// ============================================================
// COMPONENTE
// ============================================================
export const BrazilMap: React.FC<BrazilMapProps> = ({
  data,
  mode = 'numeric',
  selectedUF,
  onStateClick,
  title,
  showLegend = true,
  height = 500,
  colorScheme,
  categoryColors,
  className = '',
}) => {
  const [hoveredUF, setHoveredUF] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: string } | null>(null);

  // Calcula cores para todos os estados
  const stateColors = useMemo(() => {
    const colors: Record<string, string> = {};
    STATE_PATHS.forEach(({ uf }) => {
      colors[uf] = getStateColor(uf, data[uf], mode, data, { colorScheme, categoryColors });
    });
    return colors;
  }, [data, mode, colorScheme, categoryColors]);

  // Itens da legenda
  const legendItems = useMemo(() => 
    getLegendItems(data, mode, { colorScheme, categoryColors }),
    [data, mode, colorScheme, categoryColors]
  );

  // Handler de mouse move para tooltip
  const handleMouseMove = useCallback((e: React.MouseEvent, uf: string) => {
    const stateData = data[uf];
    if (!stateData) {
      setTooltip({ x: e.clientX + 12, y: e.clientY - 12, content: uf });
      return;
    }

    const lines = [stateData.label || uf];
    if (mode === 'numeric' && stateData.value !== undefined) {
      lines.push(`Valor: ${formatNumber(stateData.value)}`);
    }
    if (stateData.category) {
      lines.push(`Categoria: ${stateData.category}`);
    }
    if (stateData.extra) {
      Object.entries(stateData.extra).forEach(([key, val]) => {
        lines.push(`${key}: ${typeof val === 'number' ? formatNumber(val) : val}`);
      });
    }

    setTooltip({ x: e.clientX + 12, y: e.clientY - 12, content: lines.join('\n') });
  }, [data, mode]);

  return (
    <div className={`bg-slate-900 rounded-xl border border-slate-700 p-5 ${className}`}>
      {/* Título */}
      {title && (
        <h3 className="text-lg font-semibold text-slate-100 mb-4">{title}</h3>
      )}

      {/* Mapa SVG */}
      <div className="relative flex justify-center">
        <svg
          width="100%"
          height={height}
          viewBox="0 0 550 580"
          preserveAspectRatio="xMidYMid meet"
          className="drop-shadow-lg"
        >
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {STATE_PATHS.map(({ uf, d, labelX, labelY }) => {
            const isHovered = hoveredUF === uf;
            const isSelected = selectedUF === uf;
            const hasData = !!data[uf];

            return (
              <g key={uf}>
                <path
                  d={d}
                  fill={stateColors[uf]}
                  stroke={isSelected ? '#22d3ee' : isHovered ? '#38bdf8' : '#475569'}
                  strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                  className="transition-all duration-150 cursor-pointer"
                  style={{
                    filter: isSelected ? 'url(#glow)' : undefined,
                    opacity: hasData ? 1 : 0.7,
                  }}
                  onMouseEnter={() => setHoveredUF(uf)}
                  onMouseLeave={() => {
                    setHoveredUF(null);
                    setTooltip(null);
                  }}
                  onMouseMove={(e) => handleMouseMove(e, uf)}
                  onClick={() => onStateClick?.(uf)}
                />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="pointer-events-none select-none"
                  style={{
                    fontSize: uf === 'DF' ? '7px' : '9px',
                    fontWeight: isSelected ? '700' : '600',
                    fill: isSelected ? '#22d3ee' : hasData ? '#e2e8f0' : '#64748b',
                    textShadow: '0 1px 2px rgba(0,0,0,0.9)',
                  }}
                >
                  {uf}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legenda */}
      {showLegend && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          {mode === 'numeric' ? (
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">Baixo</span>
              <div 
                className="flex-1 h-2.5 rounded-full"
                style={{
                  background: `linear-gradient(to right, ${colorScheme?.min || '#1e3a5f'}, ${colorScheme?.max || '#06b6d4'})`,
                }}
              />
              <span className="text-xs text-slate-500">Alto</span>
              <div className="flex items-center gap-1.5 ml-4">
                <div className="w-3.5 h-3.5 rounded bg-slate-700" />
                <span className="text-xs text-slate-500">Sem dados</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {legendItems.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div 
                    className="w-3.5 h-3.5 rounded"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-slate-400">{item.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 rounded bg-slate-800 border border-slate-600 shadow-lg pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="text-xs text-slate-100 whitespace-pre-line leading-relaxed">
            {tooltip.content}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrazilMap;
