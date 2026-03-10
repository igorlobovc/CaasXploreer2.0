// ============================================================
// PAGE: /ranking-v2
// Comparison version: Intelligence report style ranking presentation
// ============================================================

import { useState } from 'react';
import { Navbar, PageBackground } from '@/components/shared';
import { RankingHeatmapMatrixV2 } from '@/components/comparison/RankingHeatmapMatrixV2';
import { ParaibaEditorialBlockV2 } from '@/components/comparison/ParaibaEditorialBlockV2';
import { FileText, BarChart3, MapPin } from 'lucide-react';

type ViewMode = 'heatmap' | 'paraiba' | 'combined';

export default function RankingV2Page() {
  const [mode, setMode] = useState<ViewMode>('combined');
  const [selectedUF, setSelectedUF] = useState<string>('PB');

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-slate-200 overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-medium tracking-[0.15em] text-cyan-400/70 uppercase">
              Relatório de Inteligência
            </span>
            <span className="px-1.5 py-0.5 bg-cyan-950/50 border border-cyan-800/30 rounded text-[9px] text-cyan-400/60">
              v2
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-2">
            Performance por Estado
          </h1>
          <p className="text-sm text-slate-500 max-w-2xl">
            Análise comparativa de interações institucionais normalizadas por base de advogados ativos.
          </p>
        </header>

        {/* View Toggle */}
        <div className="mb-8 flex items-center gap-2">
          {([
            { key: 'combined', label: 'Visão combinada', icon: BarChart3 },
            { key: 'paraiba', label: 'Paraíba', icon: MapPin },
            { key: 'heatmap', label: 'Matriz completa', icon: FileText },
          ] as { key: ViewMode; label: string; icon: React.ElementType }[]).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-sm text-[11px] font-medium
                transition-colors duration-150
                ${mode === key 
                  ? 'bg-cyan-950/50 border border-cyan-800/50 text-cyan-400' 
                  : 'bg-slate-900/50 border border-slate-800 text-slate-500 hover:text-slate-300'}
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Paraíba Editorial Block */}
          {(mode === 'combined' || mode === 'paraiba') && (
            <div className={`${mode === 'combined' ? 'lg:col-span-5' : 'lg:col-span-8 lg:col-start-3'}`}>
              <ParaibaEditorialBlockV2 />
            </div>
          )}

          {/* Heatmap Matrix */}
          {(mode === 'combined' || mode === 'heatmap') && (
            <div className={`${mode === 'combined' ? 'lg:col-span-7' : 'lg:col-span-10 lg:col-start-2'}`}>
              <RankingHeatmapMatrixV2
                metric="per1000"
                highlightUF={selectedUF}
                onUFClick={setSelectedUF}
              />
            </div>
          )}
        </div>

        {/* Footer Note */}
        <footer className="mt-12 pt-6 border-t border-slate-800/50">
          <div className="flex items-start gap-3 text-[10px] text-slate-600">
            <div className="w-1 h-1 rounded-full bg-slate-600 mt-1.5" />
            <div className="space-y-1">
              <p>
                Dados: Período mar/2024 — fev/2025. Interações normalizadas por 1.000 advogados ativos (OAB).
              </p>
              <p>
                Q1-Q4: Quartis de distribuição nacional. Q1 = 25% superior, Q4 = 25% inferior.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
