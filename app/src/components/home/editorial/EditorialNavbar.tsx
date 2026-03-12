import { Link, NavLink } from 'react-router-dom';
import { BarChart2, Home, Map, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadarSymbol } from '@/components/shared';

const navItems = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/ranking', label: 'Ranking', icon: Trophy },
  { to: '/estados', label: 'Estados', icon: Map },
];

export function EditorialNavbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-cyan-500/15 bg-[#050b14]/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors"
        >
          <div className="w-7 h-7 bg-cyan-500/15 border border-cyan-400/25 rounded-md flex items-center justify-center">
            <RadarSymbol className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-semibold text-sm tracking-tight">CAAsXplorer</span>
          <span className="text-[10px] font-mono text-cyan-400/40 hidden sm:inline">v2.1.0</span>
        </Link>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs transition-colors',
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-200'
                    : 'text-cyan-200/45 hover:bg-cyan-500/8 hover:text-cyan-200/70',
                )
              }
              end={to === '/'}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
