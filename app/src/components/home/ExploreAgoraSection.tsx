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
    <section className="px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-sm md:p-8">
        <div className="mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Explore agora
          </p>
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
            Navegue pelos módulos centrais da beta
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-2xl border border-slate-700 bg-slate-900/95 p-5 shadow-lg transition hover:border-cyan-400/60 hover:bg-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {card.description}
                  </p>
                </div>
                <span className="text-cyan-300 transition group-hover:translate-x-0.5">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}