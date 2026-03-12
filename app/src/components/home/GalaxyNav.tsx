import { Compass, Database, Layers3, Sparkles } from 'lucide-react';

const navItems = [
  { href: '#hero', label: 'Início', icon: Sparkles },
  { href: '#insights', label: 'Insights', icon: Compass },
  { href: '#metodologia', label: 'Metodologia', icon: Layers3 },
  { href: '#dados', label: 'Dados', icon: Database },
];

export function GalaxyNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-400/20 bg-[#0A0F1E]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#hero" className="text-white font-semibold tracking-wide">
          CAA sXplorer <span className="text-cyan-300">Galaxy</span>
        </a>
        <ul className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <a
                href={href}
                className="group inline-flex items-center gap-1.5 rounded-full border border-transparent px-3 py-1.5 text-xs text-white/80 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-200"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-300/80 transition-colors group-hover:text-cyan-200" />
                <span className="hidden sm:inline">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
