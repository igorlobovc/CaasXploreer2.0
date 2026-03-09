import { Link, useLocation } from 'react-router-dom';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { BarChart2, Home, Map, Trophy } from 'lucide-react';

import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { to: '/', label: 'Início' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/ranking', label: 'Ranking' },
  { to: '/estados', label: 'Estados' },
] as const;

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0f1a]/80 border-b border-cyan-500/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white font-semibold text-sm hover:text-cyan-300 transition-colors">
          CAAsXplorer
          <span className="text-[10px] font-mono text-cyan-400/60">v2.1.0</span>
        </Link>
        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                'px-3 py-1.5 text-xs rounded transition-colors',
                location.pathname === to
                  ? 'bg-cyan-500/20 text-cyan-300'
                  : 'text-cyan-200/60 hover:text-cyan-200',
              )}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function PageBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
    </div>
  );
}

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-[#0a1628]/60 border border-cyan-500/20 transition-all duration-300',
        hover && 'hover:border-cyan-400/40 hover:bg-[#0a1628]/70',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface RadarSymbolProps {
  className?: string;
}

export function RadarSymbol({ className = '' }: RadarSymbolProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <line x1="24" y1="4" x2="24" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="4" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="36" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="9.86" y1="9.86" x2="15.51" y2="15.51" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="32.49" y1="32.49" x2="38.14" y2="38.14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="38.14" y1="9.86" x2="32.49" y2="15.51" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="15.51" y1="32.49" x2="9.86" y2="38.14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

interface SectionHeadingProps {
  icon: ReactNode;
  label: string;
  title: string;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}

export function SectionHeading({
  icon,
  label,
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 sm:mb-16', className)}>
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        {icon}
        <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4',
          titleClassName,
        )}
      >
        {title}
      </h2>
      {children}
      {description ? (
        <p className={cn('text-cyan-200/60 max-w-2xl text-sm sm:text-base', descriptionClassName)}>
          {description}
        </p>
      ) : null}
    </div>
  );
}

type FilterChipButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
};

export function FilterChipButton({ active, className, ...props }: FilterChipButtonProps) {
  return (
    <button
      className={cn(
        'px-3 py-1.5 text-xs rounded border transition-colors',
        active
          ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
          : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30',
        className,
      )}
      {...props}
    />
  );
}

export function PageBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <div
        className="absolute -top-[15%] -left-[10%] h-[45rem] w-[45rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(6,182,212,0.14) 0%, rgba(6,182,212,0.04) 45%, transparent 75%)',
          filter: 'blur(45px)',
        }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] h-[40rem] w-[40rem] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0.03) 45%, transparent 75%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(6,182,212,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.8) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
    </div>
  );
}

const navItems = [
  { to: '/', label: 'Inicio', icon: Home },
  { to: '/analytics', label: 'Analytics', icon: BarChart2 },
  { to: '/ranking', label: 'Ranking', icon: Trophy },
  { to: '/estados', label: 'Estados', icon: Map },
];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 border-b border-cyan-500/20 bg-[#081322]/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-3 sm:px-6">
        <Link to="/" className="font-mono text-xs tracking-wider text-cyan-200/85 hover:text-cyan-100 transition-colors">
          CAAsXplorer
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-1 rounded px-2.5 py-1.5 text-[11px] sm:text-xs transition-colors',
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200'
                    : 'text-cyan-200/55 hover:bg-cyan-500/10 hover:text-cyan-200',
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
