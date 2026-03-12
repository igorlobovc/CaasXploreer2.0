import { Link } from 'react-router-dom';

const cards = [
  {
    title: 'Ranking',
    description: 'Comparação relativa entre estados.',
    to: '/ranking',
  },
  {
    title: 'Estados',
    description: 'Visão por UF com recortes consolidados.',
    to: '/estados',
  },
  {
    title: 'Evidências',
    description: 'Registros públicos para validação de método e taxonomia.',
    to: '/evidencias',
  },
  {
    title: 'Serviços',
    description: 'Catálogo estruturado com cobertura atual.',
    to: '/servicos',
  },
];

export function ExploreAgoraSection() {
  return (
    <section className="px-4 sm:px-6 py-14 sm:py-20 relative z-10">
      <div className="mx-auto max-w-7xl rounded-3xl border border-cyan-500/20 bg-slate-950/90 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300 mb-2">Explore o beta</p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Navegue pelos quatro módulos centrais</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-2xl border border-slate-700 bg-slate-900/90 p-5 transition hover:border-cyan-400/60"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">{card.description}</p>
                </div>
                <span className="text-cyan-300 transition group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
