import { useEffect, useRef } from 'react';

import { motion } from 'framer-motion';

function GalaxyNebulaBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1E] via-[#101A31] to-[#1E293B]" />

      <motion.div
        animate={{ x: [0, 60, 0, -30, 0], y: [0, 30, 70, 10, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-[15%] -top-[20%] h-[65vw] w-[65vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(0,224,255,0.16) 0%, rgba(59,130,246,0.08) 42%, rgba(10,15,30,0) 72%)',
          filter: 'blur(70px)',
        }}
      />
      <motion.div
        animate={{ x: [0, -50, 0, 40, 0], y: [0, -40, -10, -30, 0], scale: [1, 0.9, 1.1, 0.95, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
        className="absolute -bottom-[20%] -right-[15%] h-[56vw] w-[56vw] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(59,130,246,0.18) 0%, rgba(30,41,59,0.08) 45%, rgba(10,15,30,0) 72%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.65) 1px, transparent 1.5px), radial-gradient(circle at 76% 34%, rgba(255,255,255,0.45) 1px, transparent 1.5px), radial-gradient(circle at 60% 78%, rgba(255,255,255,0.5) 1px, transparent 1.5px), radial-gradient(circle at 32% 66%, rgba(255,255,255,0.35) 1px, transparent 1.5px)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,224,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,255,0.4) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
    </div>
  );
}

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

      for (let i = 1; i <= 8; i += 1) {
        const radius = 70 + i * 52;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 224, 255, ${0.03 + i * 0.003})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      const pulseCount = 3;
      for (let i = 0; i < pulseCount; i += 1) {
        const pulseOffset = (pulsePhase + i / pulseCount) % 1;
        const pulseRadius = 110 + pulseOffset * 380;
        const alpha = (1 - pulseOffset) * 0.11;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 224, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sweepAngle);
      const sweepGradient = ctx.createLinearGradient(0, 0, 420, 0);
      sweepGradient.addColorStop(0, 'rgba(0, 224, 255, 0)');
      sweepGradient.addColorStop(0.45, 'rgba(0, 224, 255, 0.14)');
      sweepGradient.addColorStop(1, 'rgba(0, 224, 255, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 420, -0.13, 0.13);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1] h-full w-full" style={{ opacity: 0.9 }} />;
}

export function HomeBackground() {
  return (
    <>
      <GalaxyNebulaBackground />
      <CenteredRadarBackground />
    </>
  );
}
