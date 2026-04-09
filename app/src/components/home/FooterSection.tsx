import { RadarSymbol } from '@/components/shared';

export function FooterSection() {
  return (
    <footer className="py-8 sm:py-10 border-t border-cyan-500/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-cyan-500/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
            <RadarSymbol className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <p className="text-white font-semibold">CAAsXplorer · Front Page Editorial</p>
            <p className="text-xs text-cyan-200/60">Leitura comparativa beta das CAAs brasileiras</p>
          </div>
        </div>
        <p className="text-xs text-cyan-200/60">© 2026 · Edição compacta de apresentação</p>
      </div>
    </footer>
  );
}
