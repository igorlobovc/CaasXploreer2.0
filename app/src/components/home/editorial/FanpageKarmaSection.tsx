import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/shared';
import { ExternalLink, Loader2, RefreshCw } from 'lucide-react';

const FPK_URL =
  'https://app.fanpagekarma.com/onlinePresentation?pr=ag5zfmZhbnBhZ2VrYXJtYXIfCxIST25saW5lUHJlc2VudGF0aW9uGICAga-K35AIDA';

export function FanpageKarmaSection() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [key, setKey] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const reload = () => {
    setLoaded(false);
    setError(false);
    setKey((k) => k + 1);
  };

  return (
    <section id="fanpagekarma" className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-xs font-mono text-violet-400/60 uppercase tracking-[0.2em] mb-3">
            Análise de Presença Digital
          </p>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
                Relatório Fanpage Karma
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                Análise comparativa de performance digital das CAAs — engajamento, crescimento de
                seguidores, frequência de posts e benchmarks competitivos em tempo real.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {!loaded && !error && (
                <button
                  onClick={reload}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-700/40 border border-slate-600/30 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Recarregar</span>
                </button>
              )}
              <a
                href={FPK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/15 border border-violet-500/25 text-sm text-violet-300 hover:bg-violet-600/25 hover:text-violet-200 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir em tela cheia</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-0 overflow-hidden border border-violet-500/15">
            {/* Toolbar */}
            <div className="px-5 py-3 border-b border-violet-500/10 flex items-center justify-between bg-[#0d0d1a]/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-500/60" />
                <span className="text-xs font-mono text-violet-300/60">fanpagekarma.com</span>
              </div>
              <div className="flex items-center gap-2">
                {loaded && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] text-slate-500">live</span>
                  </div>
                )}
                <button
                  onClick={reload}
                  title="Recarregar"
                  className="p-1 rounded hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Iframe container */}
            <div className="relative w-full" style={{ height: '82vh', minHeight: 640 }}>

              {/* Loading overlay */}
              {!loaded && !error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1e] z-10 gap-4">
                  <Loader2 className="w-8 h-8 text-violet-400 animate-spin" />
                  <p className="text-sm text-slate-400">A carregar relatório Fanpage Karma…</p>
                  <p className="text-xs text-slate-600 max-w-xs text-center">
                    Se não carregar, use o botão "Abrir em tela cheia" acima.
                  </p>
                </div>
              )}

              {/* Error state */}
              {error && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0f1e] z-10 gap-4">
                  <div className="w-12 h-12 rounded-full bg-violet-900/40 border border-violet-500/20 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium mb-1">Relatório disponível externamente</p>
                    <p className="text-sm text-slate-400 max-w-xs">
                      O relatório Fanpage Karma está disponível na plataforma original.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={reload}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-700/40 border border-slate-600/30 text-sm text-slate-300 hover:bg-slate-700/60 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Tentar novamente
                    </button>
                    <a
                      href={FPK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-violet-600/20 border border-violet-500/30 text-sm text-violet-300 hover:bg-violet-600/30 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir relatório
                    </a>
                  </div>
                </div>
              )}

              {/* The iframe itself */}
              <iframe
                key={key}
                ref={iframeRef}
                src={FPK_URL}
                className="w-full h-full border-0"
                title="Relatório Fanpage Karma — CAAs"
                loading="eager"
                allow="fullscreen; scripts; same-origin"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => {
                  // Give it a moment to render before hiding the loader
                  setTimeout(() => setLoaded(true), 800);
                }}
                onError={() => setError(true)}
                style={{ display: error ? 'none' : 'block' }}
              />
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
