import { BarChart3, Database, Layers, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Ranking',
    description: 'Comparação relativa entre estados.',
    to: '/ranking',
    icon: BarChart3,
  },
  {
    title: 'Estados',
    description: 'Visão por UF com recortes consolidados.',
    to: '/estados',
    icon: Map,
  },
  {
    title: 'Evidências',
    description: 'Registros públicos para validação de método e taxonomia.',
    to: '/evidencias',
    icon: Database,
  },
  {
    title: 'Serviços',
    description: 'Catálogo estruturado com cobertura atual.',
    to: '/servicos',
    icon: Layers,
  },
];

export function ExploreAgoraSection() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-cyan-500/20 bg-[#081322]/80 p-6 shadow-[0_20px_80px_rgba(6,182,212,0.12)] backdrop-blur-md md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-white md:text-2xl">Explore agora</h2>
          <span className="text-xs uppercase tracking-[0.2em] text-cyan-300/75">Navegação</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ title, description, to, icon: Icon }) => (
            <Link
              key={title}
              to={to}
              className="group rounded-2xl border border-cyan-400/25 bg-[#0a1628]/90 p-4 transition-all hover:border-cyan-300/60 hover:bg-[#0d2038]"
            >
              <Icon className="mb-3 h-4 w-4 text-cyan-300/85" />
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-cyan-100/65">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
