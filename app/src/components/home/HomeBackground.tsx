import { motion } from 'framer-motion';

export function HomeBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#0a0f1a]" />
      <motion.div
        animate={{ x: [0, 30, -20, 0], y: [0, 20, -10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-1/4 -left-1/4 w-[55vw] h-[55vw] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.15), transparent 70%)' }}
      />
      <motion.div
        animate={{ x: [0, -20, 25, 0], y: [0, -25, 10, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-1/4 -right-1/4 w-[50vw] h-[50vw] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.16), transparent 72%)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0f1a]/40 to-[#0a0f1a]/90" />
    </div>
  );
}
