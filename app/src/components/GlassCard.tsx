interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
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
