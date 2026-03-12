import { Link } from 'react-router-dom';
import { RadarSymbol } from '@/components/shared';

export function EditorialFooterSection() {
  return (
    <footer className="py-10 sm:py-14 border-t border-cyan-500/15 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-cyan-500/15 border border-cyan-400/25 rounded-lg flex items-center justify-center">
                <RadarSymbol className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="text-base font-semibold text-white">CAAsXplorer</span>
            </div>
            <p className="text-xs text-cyan-200/40 leading-relaxed max-w-xs">
              Sistema de leitura institucional das Caixas de Assistência dos Advogados brasileiros.
              Dados estruturados, taxonomia canônica e análise comparativa nacional.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-mono text-cyan-300/40 uppercase tracking-wider mb-3">
              Plataforma
            </p>
            <div className="space-y-2">
              {[
                { to: '/', label: 'Início' },
                { to: '/analytics', label: 'Analytics' },
                { to: '/ranking', label: 'Ranking Nacional' },
                { to: '/estados', label: 'Explorar Estados' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-xs text-cyan-200/50 hover:text-cyan-200/80 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Data info */}
          <div>
            <p className="text-[10px] font-mono text-cyan-300/40 uppercase tracking-wider mb-3">
              Dados
            </p>
            <div className="space-y-1.5">
              {[
                'Base operacional: 06/02/2026',
                'Schema v2.1.0',
                '27 CAAs mapeadas',
                '6.357 posts analisados',
                'Pipeline auditável',
              ].map((item) => (
                <p key={item} className="text-xs text-cyan-200/35">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-cyan-200/25 font-mono">
            © 2026 CAAsXplorer · Relatório de Inteligência de Dados
          </p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono text-emerald-400/60">Sistema Operacional</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
