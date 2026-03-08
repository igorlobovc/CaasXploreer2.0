import { RadarSymbol } from '@/components/shared';

export function FooterSection() {
  return (
    <footer className="py-8 sm:py-12 border-t border-cyan-500/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
              <RadarSymbol className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-semibold text-white">CAAsXplorer</span>
              <p className="text-xs sm:text-sm text-cyan-200/50">Sistema de leitura institucional</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-cyan-200/50">
            <span>Base operacional: 06/02/2026</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
