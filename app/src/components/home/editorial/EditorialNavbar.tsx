import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BarChart2, Home, Map, Trophy, FileText, Layers } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadarSymbol } from '@/components/shared';

const appRoutes = [
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/ranking', label: 'Ranking', icon: Trophy },
  { to: '/estados', label: 'Estados', icon: Map },
  { to: '/evidencias', label: 'Evidências', icon: FileText },
  { to: '/servicos', label: 'Serviços', icon: Layers },
];

const sectionAnchors = [
  { id: 'hero', label: 'Início' },
  { id: 'panorama', label: 'Panorama' },
  { id: 'mobiliza', label: 'Análise' },
  { id: 'paraiba', label: 'Paraíba' },
  { id: 'cauda-longa', label: 'Casos' },
  { id: 'relatorio', label: 'Relatório' },
  { id: 'explore', label: 'Beta' },
];

export function EditorialNavbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sectionAnchors.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-cyan-500/15 bg-[#050b14]/85 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 gap-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:text-cyan-100 transition-colors flex-shrink-0"
        >
          <div className="w-7 h-7 bg-cyan-500/15 border border-cyan-400/25 rounded-md flex items-center justify-center">
            <RadarSymbol className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="font-semibold text-sm tracking-tight">CAAsXplorer</span>
          <span className="text-[10px] font-mono text-cyan-400/40 hidden lg:inline">v2.1.0</span>
        </Link>

        {/* Center: section anchors on home, app routes elsewhere */}
        <div className="flex items-center gap-0.5 overflow-x-auto">
          {isHome
            ? sectionAnchors.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={cn(
                    'flex-shrink-0 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs transition-colors whitespace-nowrap',
                    activeSection === id
                      ? 'bg-cyan-500/15 text-cyan-200'
                      : 'text-cyan-200/45 hover:bg-cyan-500/8 hover:text-cyan-200/70',
                  )}
                >
                  {label}
                </button>
              ))
            : appRoutes.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'flex-shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs transition-colors whitespace-nowrap',
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-200'
                        : 'text-cyan-200/45 hover:bg-cyan-500/8 hover:text-cyan-200/70',
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}
        </div>

        {/* Right: app route icons on home, Home link on inner pages */}
        <div className="flex items-center gap-0.5 flex-shrink-0">
          {isHome
            ? appRoutes.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  title={label}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center rounded-lg p-1.5 text-[11px] transition-colors',
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-200'
                        : 'text-cyan-200/35 hover:bg-cyan-500/8 hover:text-cyan-200/60',
                    )
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                </NavLink>
              ))
            : (
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] sm:text-xs transition-colors',
                      isActive
                        ? 'bg-cyan-500/15 text-cyan-200'
                        : 'text-cyan-200/45 hover:bg-cyan-500/8 hover:text-cyan-200/70',
                    )
                  }
                >
                  <Home className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Início</span>
                </NavLink>
              )}
        </div>
      </nav>
    </header>
  );
}
