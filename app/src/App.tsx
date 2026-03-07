import { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RadarSymbol } from './components/RadarSymbol';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import RankingPage from './pages/RankingPage';
import EstadosPage from './pages/EstadosPage';
import EstadoDetailPage from './pages/EstadoDetailPage';

// ============================================
// VIDEO BACKGROUND WITH ANIMATED ORBS
// ============================================
function VideoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, 0, -30, 0], y: [0, 30, 60, 20, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 100, 200, 0.05) 50%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ x: [0, -40, 0, 30, 0], y: [0, -50, -20, -40, 0], scale: [1, 0.9, 1.15, 1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[10%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(88, 28, 135, 0.05) 50%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ x: [0, 30, -20, 40, 0], y: [0, -30, 20, -10, 0], scale: [1, 1.2, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.03) 50%, transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]/90" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
    </div>
  );
}

// ============================================
// CENTERED RADAR BACKGROUND
// ============================================
function CenteredRadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    let pulsePhase = 0;
    let sweepAngle = 0;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      pulsePhase = (pulsePhase + delta * 0.00015) % 1;
      sweepAngle = (sweepAngle + delta * 0.0001) % (Math.PI * 2);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      for (let i = 1; i <= 8; i++) {
        const radius = 60 + i * 50;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 + i * 0.003})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let angle = 0; angle < 360; angle += 45) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(rad) * 500, centerY + Math.sin(rad) * 500);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
        ctx.stroke();
      }

      const pulseCount = 3;
      for (let i = 0; i < pulseCount; i++) {
        const pulseOffset = (pulsePhase + i / pulseCount) % 1;
        const pulseRadius = 80 + pulseOffset * 350;
        const alpha = (1 - pulseOffset) * 0.12;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sweepAngle);
      const sweepGradient = ctx.createLinearGradient(0, 0, 400, 0);
      sweepGradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.15)');
      sweepGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 400, -0.12, 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" style={{ opacity: 0.9 }} />;
}

// ============================================
// FOOTER
// ============================================
function Footer() {
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

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <VideoBackground />
      <CenteredRadarBackground />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/estados" element={<EstadosPage />} />
        <Route path="/estados/:uf" element={<EstadoDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
