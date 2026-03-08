// ============================================================
// Shared UI primitives reused across pages
// ============================================================

import { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2, Map, Home, Radio,
} from 'lucide-react';

// ---- GlassCard -----------------------------------------------
export function GlassCard({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`backdrop-blur-xl bg-[#0a1628]/60 border border-cyan-500/20 ${
        hover ? 'hover:border-cyan-400/40 hover:bg-[#0a1628]/70' : ''
      } transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

// ---- RadarSymbol ---------------------------------------------
export function RadarSymbol({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="24" cy="24" r="8"  stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="24" cy="24" r="3"  fill="currentColor" />
      <line x1="24" y1="4"  x2="24" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="4"  y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="36" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
    </svg>
  );
}

// ---- PageBackground (static version for inner pages) ---------
export function PageBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0 pointer-events-none">
      <div
        className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(0,100,200,0.03) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-[10%] -right-[15%] w-[40vw] h-[40vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(139,92,246,0.07) 0%, rgba(88,28,135,0.03) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}

// ---- Navbar --------------------------------------------------
const NAV_LINKS = [
  { to: '/',          label: 'Início',    Icon: Home      },
  { to: '/analytics', label: 'Analytics', Icon: BarChart2 },
  { to: '/ranking',   label: 'Ranking',   Icon: Radio     },
  { to: '/estados',   label: 'Estados',   Icon: Map       },
];

export function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0f1a]/80 border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-cyan-500/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
            <RadarSymbol className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
            CAAsXplorer
          </span>
          <span className="text-[10px] text-cyan-400/60 font-mono hidden sm:inline">v2.1.0</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label, Icon }) => {
            const active = pathname === to || (to !== '/' && pathname.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  active
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                    : 'text-cyan-200/60 hover:text-cyan-200 hover:bg-cyan-500/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
