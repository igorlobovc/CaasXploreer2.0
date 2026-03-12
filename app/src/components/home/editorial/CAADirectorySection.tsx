import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Instagram, Globe, Users, X } from 'lucide-react';

/* ─── Data ──────────────────────────────────────────────────────────────────── */
const REGIONS: Record<string, string> = {
  AC: 'Norte', AM: 'Norte', AP: 'Norte', PA: 'Norte', RO: 'Norte', RR: 'Norte', TO: 'Norte',
  AL: 'Nordeste', BA: 'Nordeste', CE: 'Nordeste', MA: 'Nordeste', PB: 'Nordeste',
  PE: 'Nordeste', PI: 'Nordeste', RN: 'Nordeste', SE: 'Nordeste',
  DF: 'Centro-Oeste', GO: 'Centro-Oeste', MS: 'Centro-Oeste', MT: 'Centro-Oeste',
  ES: 'Sudeste', MG: 'Sudeste', RJ: 'Sudeste', SP: 'Sudeste',
  PR: 'Sul', RS: 'Sul', SC: 'Sul',
  BR: 'Nacional',
};

const REGION_COLORS: Record<string, string> = {
  Norte: '#31A69B',
  Nordeste: '#A36A66',
  'Centro-Oeste': '#C45DF5',
  Sudeste: '#DA2E2C',
  Sul: '#EECF0E',
  Nacional: '#333333',
};

interface CAA {
  uf: string;
  color: string;
  name: string;
  site: string;
  lawyers: number;
  instagram: string;
  instagramUrl: string;
  region: string;
}

const CAA_DATA: CAA[] = [
  { uf: 'TO', color: '#C45DF5', name: 'CAATO', site: 'caato.com.br', lawyers: 11621, instagram: '@caatocantins', instagramUrl: 'https://www.instagram.com/caatocantins/', region: REGIONS['TO'] },
  { uf: 'SP', color: '#DA2E2C', name: 'CAASP', site: 'caasp.org.br', lawyers: 404461, instagram: '@oabcaasp', instagramUrl: 'https://instagram.com/oabcaasp', region: REGIONS['SP'] },
  { uf: 'SE', color: '#A36A66', name: 'CAASE', site: 'caase.com.br', lawyers: 14866, instagram: '@caasergipe', instagramUrl: 'https://instagram.com/caasergipe', region: REGIONS['SE'] },
  { uf: 'SC', color: '#EECF0E', name: 'CAASC', site: 'caasc.org.br', lawyers: 60046, instagram: '@caasc_santacatarina', instagramUrl: 'https://instagram.com/caasc_santacatarina', region: REGIONS['SC'] },
  { uf: 'RS', color: '#EECF0E', name: 'CAARS', site: 'caars.org.br', lawyers: 104135, instagram: '@caa.rs', instagramUrl: 'https://instagram.com/caa.rs', region: REGIONS['RS'] },
  { uf: 'RR', color: '#31A69B', name: 'CAARR', site: 'oabrr.org.br', lawyers: 3479, instagram: '@caarr_oraima', instagramUrl: 'https://www.instagram.com/caaroraima/?hl=pt', region: REGIONS['RR'] },
  { uf: 'RO', color: '#31A69B', name: 'CAARO', site: 'caaro.org.br', lawyers: 12596, instagram: '@caaro_rondonia', instagramUrl: 'https://instagram.com/caaro_rondonia', region: REGIONS['RO'] },
  { uf: 'RN', color: '#A36A66', name: 'CAARN', site: 'caarn.org.br', lawyers: 18553, instagram: '@caarn.oab', instagramUrl: 'https://instagram.com/caarn.oab', region: REGIONS['RN'] },
  { uf: 'RJ', color: '#DA2E2C', name: 'CAARJ', site: 'caarj.org.br', lawyers: 172504, instagram: '@caarj_oab', instagramUrl: 'https://www.instagram.com/oabrjcaarj/', region: REGIONS['RJ'] },
  { uf: 'PR', color: '#EECF0E', name: 'CAAPR', site: 'caapr.org.br', lawyers: 100639, instagram: '@caa_parana', instagramUrl: 'https://instagram.com/caa_parana', region: REGIONS['PR'] },
  { uf: 'PI', color: '#A36A66', name: 'CAAPI', site: 'caapi.org.br', lawyers: 19865, instagram: '@caapi', instagramUrl: 'https://www.instagram.com/caapiaui/', region: REGIONS['PI'] },
  { uf: 'PE', color: '#A36A66', name: 'CAAPE', site: 'caape.org.br', lawyers: 48093, instagram: '@caape_oab', instagramUrl: 'https://instagram.com/caape_oab', region: REGIONS['PE'] },
  { uf: 'PB', color: '#A36A66', name: 'CAAPB', site: 'caapb.org.br', lawyers: 24226, instagram: '@caa_paraiba', instagramUrl: 'https://instagram.com/caa_paraiba', region: REGIONS['PB'] },
  { uf: 'PA', color: '#31A69B', name: 'CAAPA', site: 'caapara.org.br', lawyers: 32364, instagram: '@caapa.oab', instagramUrl: 'https://www.instagram.com/caapa.oab/', region: REGIONS['PA'] },
  { uf: 'MT', color: '#C45DF5', name: 'CAAMT', site: 'caamt.com.br', lawyers: 29377, instagram: '@caamt1', instagramUrl: 'https://instagram.com/caamt1', region: REGIONS['MT'] },
  { uf: 'MS', color: '#C45DF5', name: 'CAAMS', site: 'caams.org.br', lawyers: 21629, instagram: '@caams.oficial', instagramUrl: 'https://instagram.com/caams.oficial', region: REGIONS['MS'] },
  { uf: 'MG', color: '#DA2E2C', name: 'CAAMG', site: 'caamg.org.br', lawyers: 158161, instagram: '@caa_mg', instagramUrl: 'https://instagram.com/caa_mg', region: REGIONS['MG'] },
  { uf: 'MA', color: '#A36A66', name: 'CAAMA', site: 'caama.org.br', lawyers: 27952, instagram: '@caama.oabma', instagramUrl: 'https://instagram.com/caama.oabma', region: REGIONS['MA'] },
  { uf: 'GO', color: '#C45DF5', name: 'CASAG', site: 'casag.org.br', lawyers: 61767, instagram: '@oab_casag', instagramUrl: 'https://instagram.com/oab_casag', region: REGIONS['GO'] },
  { uf: 'ES', color: '#DA2E2C', name: 'CAAES', site: 'caaes.org.br', lawyers: 30821, instagram: '@caaes', instagramUrl: 'https://instagram.com/caaes', region: REGIONS['ES'] },
  { uf: 'DF', color: '#C45DF5', name: 'CAADF', site: 'caadf.org.br', lawyers: 62686, instagram: '@caa.df', instagramUrl: 'https://instagram.com/caa.df', region: REGIONS['DF'] },
  { uf: 'CE', color: '#A36A66', name: 'CAACE', site: 'caace.org.br', lawyers: 43456, instagram: '@caace.oab', instagramUrl: 'https://instagram.com/caace.oab', region: REGIONS['CE'] },
  { uf: 'BR', color: '#333333', name: 'CONCAD', site: 'concad.oab.org.br', lawyers: 0, instagram: '@concadoficial', instagramUrl: 'https://instagram.com/concadoficial', region: REGIONS['BR'] },
  { uf: 'BA', color: '#A36A66', name: 'CAAB', site: 'caab.org.br', lawyers: 69474, instagram: '@caab_oficial', instagramUrl: 'https://instagram.com/caab_oficial', region: REGIONS['BA'] },
  { uf: 'AP', color: '#31A69B', name: 'CAAAP', site: 'caaap.org.br', lawyers: 5056, instagram: '@caixadeassistenciadosadv.ap', instagramUrl: 'https://instagram.com/caixadeassistenciadosadv.ap', region: REGIONS['AP'] },
  { uf: 'AM', color: '#31A69B', name: 'CAAAM', site: 'caaam.org.br', lawyers: 18459, instagram: '@caaamazonas', instagramUrl: 'https://instagram.com/caaamazonas', region: REGIONS['AM'] },
  { uf: 'AL', color: '#A36A66', name: 'CAAAL', site: 'caa-al.org.br', lawyers: 17250, instagram: '@caa.al', instagramUrl: 'https://instagram.com/caa.al', region: REGIONS['AL'] },
  { uf: 'AC', color: '#31A69B', name: 'CAAAC', site: 'caaac.org.br', lawyers: 4736, instagram: '@caaac.oficial', instagramUrl: 'https://instagram.com/caaac.oficial', region: REGIONS['AC'] },
];

const ALL_REGIONS = ['Todos', 'Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul', 'Nacional'];

function fmt(n: number) {
  if (n === 0) return '—';
  return n.toLocaleString('pt-BR');
}

/* ─── Component ─────────────────────────────────────────────────────────────── */
export function CAADirectorySection() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('Todos');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return CAA_DATA.filter((c) => {
      const matchRegion = region === 'Todos' || c.region === region;
      const matchQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.uf.toLowerCase().includes(q) ||
        c.instagram.toLowerCase().includes(q) ||
        c.site.toLowerCase().includes(q);
      return matchRegion && matchQuery;
    });
  }, [query, region]);

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-10">
          <p className="text-xs font-mono text-indigo-400/60 uppercase tracking-[0.2em] mb-3">
            Índice de Recursos
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            Diretório das CAAs
          </h2>
          <p className="text-slate-400 text-sm max-w-xl">
            Todas as Caixas de Assistência mapeadas — sites, Instagram e base de advogados.
          </p>
        </motion.div>

        {/* Search + filter bar */}
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="mb-6 flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nome, UF, Instagram…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
            {query && (
              <button onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Region filter */}
          <div className="flex flex-wrap gap-1.5">
            {ALL_REGIONS.map((r) => (
              <button key={r} onClick={() => setRegion(r)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  region === r
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 border border-white/10 text-slate-400 hover:border-indigo-500/40 hover:text-white'
                }`}
                style={region === r ? {} : {
                  borderLeftColor: r !== 'Todos' ? REGION_COLORS[r] : undefined,
                  borderLeftWidth: r !== 'Todos' ? 2 : undefined,
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-4">
          {filtered.length} {filtered.length === 1 ? 'resultado' : 'resultados'}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.map((caa, i) => (
            <motion.div
              key={caa.uf}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="group p-4 rounded-xl bg-[#0d1117] border border-white/8 hover:border-white/20 transition-all duration-200"
              style={{ borderLeftColor: caa.color, borderLeftWidth: 3 }}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: `${caa.color}22`, border: `1px solid ${caa.color}44` }}
                  >
                    {caa.uf}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight">{caa.name}</div>
                    <div
                      className="text-[9px] font-medium uppercase tracking-wide"
                      style={{ color: REGION_COLORS[caa.region] ?? '#6b7280' }}
                    >
                      {caa.region}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lawyers */}
              {caa.lawyers > 0 && (
                <div className="flex items-center gap-1.5 mb-3">
                  <Users className="w-3 h-3 text-slate-500 flex-shrink-0" />
                  <span className="text-xs text-slate-400">{fmt(caa.lawyers)} advogados</span>
                </div>
              )}

              {/* Links */}
              <div className="flex items-center gap-2">
                <a
                  href={`https://${caa.site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-slate-400 hover:text-white transition-colors"
                >
                  <Globe className="w-3 h-3" />
                  <span>Site</span>
                </a>
                <a
                  href={caa.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-slate-400 hover:text-white transition-colors"
                >
                  <Instagram className="w-3 h-3" />
                  <span>{caa.instagram}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500 text-sm">
            Nenhuma CAA encontrada para "{query}"
          </div>
        )}
      </div>
    </section>
  );
}
