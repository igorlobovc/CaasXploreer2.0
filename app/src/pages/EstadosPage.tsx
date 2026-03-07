import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Heart, Stethoscope, Trophy, Sparkles, Zap } from 'lucide-react';
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

export default function EstadosPage() {
  const [filterUF, setFilterUF] = useState<string | null>(null);
  const ufs = [...new Set(acoesInstitucionais.map((a) => a.uf))];
  const filteredAcoes = filterUF ? acoesInstitucionais.filter((a) => a.uf === filterUF) : acoesInstitucionais;

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">
              AÇÕES INSTITUCIONAIS E EVIDÊNCIA PÚBLICA
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">
            Iniciativas Não-Transacionais
          </h2>
          <p className="text-cyan-200/60 max-w-3xl text-sm sm:text-base">
            Ações institucionais que geram alto impacto simbólico, produzem buzz social e fortalecem a imagem
            institucional.
          </p>
        </motion.div>

        {/* UF Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilterUF(null)}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              filterUF === null
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'
            }`}
          >
            Todas
          </button>
          {ufs.map((uf) => (
            <button
              key={uf}
              onClick={() => setFilterUF(uf)}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                filterUF === uf
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                  : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'
              }`}
            >
              {uf}
            </button>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAcoes.map((acao, i) => (
            <motion.div
              key={acao.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                    {resolveIcon(acao.iconKey)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        to={`/estados/${acao.uf}`}
                        className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded hover:bg-cyan-500/20 transition-colors"
                      >
                        {acao.uf}
                      </Link>
                      {acao.benchmark && (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">
                          benchmark
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white">{acao.title}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-cyan-200/60 mb-4 leading-relaxed">{acao.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cyan-500/10">
                  <div className="flex flex-wrap gap-1">
                    {acao.data_origin.map((origin, idx) => (
                      <span key={idx} className="text-[9px] text-cyan-300/40 bg-cyan-500/5 px-1.5 py-0.5 rounded">
                        {origin}
                      </span>
                    ))}
                  </div>
                  {acao.source_url && (
                    <a
                      href={acao.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
