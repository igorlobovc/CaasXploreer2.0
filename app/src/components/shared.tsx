import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/utils';

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
