import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Heart, Stethoscope, Trophy, Sparkles, Zap } from 'lucide-react';
import { GlassCard } from '../components/GlassCard';
import { acoesInstitucionais, type AcaoInstitucional } from '../data/estados';

function resolveIcon(key: AcaoInstitucional['iconKey']) {
  const cls = 'w-5 h-5';
  switch (key) {
    case 'stethoscope': return <Stethoscope className={cls} />;
    case 'trophy':      return <Trophy className={cls} />;
    case 'zap':         return <Zap className={cls} />;
    case 'sparkles':    return <Sparkles className={cls} />;
    case 'heart':       return <Heart className={cls} />;
  }
}

export default function EstadoDetailPage() {
  const { uf } = useParams<{ uf: string }>();
  const acoes = acoesInstitucionais.filter((a) => a.uf === uf?.toUpperCase());

  if (!uf || acoes.length === 0) {
    return (
      <section className="py-16 sm:py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <p className="text-cyan-200/60 mb-6">Nenhuma ação encontrada para a UF <strong>{uf?.toUpperCase()}</strong>.</p>
          <Link
            to="/estados"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Estados
          </Link>
        </div>
      </section>
    );
  }

  const entity = acoes[0].entity;

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-14">
          <Link
            to="/estados"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Todos os Estados
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl sm:text-4xl font-bold text-cyan-400">{uf?.toUpperCase()}</span>
            <span className="text-lg sm:text-xl text-white/70">{entity}</span>
          </div>
          <p className="text-cyan-200/60 text-sm sm:text-base">
            {acoes.length} ação{acoes.length !== 1 ? 'ões' : ''} institucional{acoes.length !== 1 ? 'is' : ''} mapeada{acoes.length !== 1 ? 's' : ''}.
          </p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {acoes.map((acao, i) => (
            <motion.div
              key={acao.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-6" hover>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 flex-shrink-0">
                    {resolveIcon(acao.iconKey)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">{acao.category}</span>
                      {acao.benchmark && (
                        <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">benchmark</span>
                      )}
                      <span className="text-xs px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">
                        {acao.evidence_level}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{acao.title}</h3>
                    <p className="text-sm text-cyan-200/60 leading-relaxed mb-4">{acao.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {acao.data_origin.map((origin, idx) => (
                          <span key={idx} className="text-[10px] text-cyan-300/50 bg-cyan-500/5 px-2 py-0.5 rounded">
                            {origin}
                          </span>
                        ))}
                      </div>
                      {acao.source_url && (
                        <a
                          href={acao.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Fonte
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
