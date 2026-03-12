import { ArrowRight, Compass, FileCheck2, MapPinned, Medal, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

import { GlassCard } from '@/components/shared';

const executiveHighlights = [
  {
    title: 'O padrão ouro',
    text: 'Estados com cobertura ampla e consistência de comunicação institucional formam a referência de maturidade atual.',
  },
  {
    title: 'O motor do engajamento',
    text: 'Benefícios e convênios seguem como núcleo de mobilização, com saúde e bem-estar como aceleradores recorrentes.',
  },
  {
    title: 'A era da hiper-personalização',
    text: 'As CAAs com melhor resposta regional conectam oferta segmentada, canais ativos e leitura contínua de adesão.',
  },
];

const mobilizationCategories = ['Benefícios e Convênios', 'Sorteios', 'Esporte e Bem-estar', 'Saúde'];

const betaLinks = [
  {
    title: 'Ranking',
    description: 'Comparação relativa entre estados.',
    to: '/ranking',
    icon: Trophy,
  },
  {
    title: 'Estados',
    description: 'Visão por UF com recortes consolidados.',
    to: '/estados',
    icon: MapPinned,
  },
  {
    title: 'Evidências',
    description: 'Registros públicos para validação de método e taxonomia.',
    to: '/evidencias',
    icon: FileCheck2,
  },
  {
    title: 'Serviços',
    description: 'Catálogo estruturado com cobertura atual.',
    to: '/servicos',
    icon: Compass,
  },
];

function ScrollButton({ targetId, label }: { targetId: string; label: string }) {
  return (
    <button
      type="button"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      className="rounded-full border border-cyan-300/30 px-4 py-2 text-xs text-cyan-100 transition hover:bg-cyan-400/10 hover:text-white"
    >
      {label}
    </button>
  );
}

export function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#0A0F1E] via-[#111C33] to-[#1E293B] text-white">
      <header className="sticky top-0 z-30 border-b border-cyan-500/20 bg-[#0A0F1E]/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2 font-semibold tracking-wide text-white">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            CAAsXplorer Editorial
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <ScrollButton targetId="panorama" label="Panorama" />
            <ScrollButton targetId="paraiba" label="Paraíba" />
            <ScrollButton targetId="explore" label="Explore o beta" />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <section className="py-14 sm:py-20">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-cyan-300/80">Capa editorial</p>
          <h1 className="mb-4 text-4xl font-extrabold leading-tight text-cyan-300 sm:text-6xl" style={{ textShadow: '0 0 10px rgba(0,224,255,0.5)' }}>
            Panorama comparativo das Caixas de Assistência da Advocacia Brasileira
          </h1>
          <p className="max-w-4xl text-base leading-relaxed text-[#94A3B8] sm:text-lg">
            Leitura editorial e comparativa sobre cobertura de benefícios, engajamento digital e diferenciais regionais das
            CAAs no Brasil.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 rounded-full bg-[#00E0FF] px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_15px_rgba(0,224,255,0.7)]"
            >
              Explorar o beta
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/ranking"
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-500/10 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/20"
            >
              Ver ranking
              <Medal className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section id="panorama" className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Panorama executivo</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {executiveHighlights.map((item) => (
              <GlassCard key={item.title} className="rounded-2xl border-cyan-400/20 bg-[#111827]/85 p-6 shadow-lg shadow-cyan-500/20">
                <h3 className="mb-2 text-xl font-semibold text-cyan-200">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[#94A3B8]">{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">O que realmente mobiliza a advocacia</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {mobilizationCategories.map((category) => (
              <div key={category} className="rounded-2xl border border-cyan-400/20 bg-[#111827]/80 px-5 py-4 text-center text-sm font-medium text-cyan-100 shadow-lg shadow-cyan-500/10">
                {category}
              </div>
            ))}
          </div>
        </section>

        <section id="paraiba" className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Paraíba em perspectiva analítica</h2>
          <p className="mt-3 max-w-3xl text-sm text-[#94A3B8]">
            Referência de normalização: PB com 24.226 advogados. Comparação orientada por PB x Nordeste x Brasil para
            leitura proporcional por 1.000 advogados.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[{ label: 'PB', value: '24.226 advogados' }, { label: 'Nordeste', value: 'benchmark regional' }, { label: 'Brasil', value: 'referência nacional' }].map((item) => (
              <GlassCard key={item.label} className="rounded-2xl border-cyan-400/20 bg-[#111827]/85 p-6 shadow-lg shadow-cyan-500/20">
                <div className="text-xs uppercase tracking-widest text-cyan-300/80">{item.label}</div>
                <div className="mt-2 text-2xl font-bold text-white">{item.value}</div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="py-10 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Exemplos de leitura / casos</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {['Cauda longa dos benefícios', 'Esportes diferenciados', 'Adoção tecnológica e fricção regional', 'A Caixa do futuro'].map((caseTitle) => (
              <GlassCard key={caseTitle} className="rounded-2xl border-cyan-400/20 bg-[#111827]/85 p-6 shadow-lg shadow-cyan-500/15">
                <h3 className="text-lg font-semibold text-cyan-100">{caseTitle}</h3>
                <p className="mt-2 text-sm text-[#94A3B8]">Leitura editorial aplicada para identificar diferenciais de estratégia e oportunidades de evolução por seccional.</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section id="explore" className="py-12 sm:py-16">
          <h2 className="text-2xl font-bold text-white sm:text-4xl">Explore o beta</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {betaLinks.map(({ title, description, to, icon: Icon }) => (
              <Link key={title} to={to} className="rounded-2xl border border-cyan-400/20 bg-[#111827]/85 p-5 transition hover:border-cyan-300/60 hover:shadow-lg hover:shadow-cyan-500/25">
                <Icon className="h-5 w-5 text-cyan-300" />
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-[#94A3B8]">{description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-500/20 bg-[#0A0F1E]/90">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-5 text-xs text-cyan-200/70 sm:px-6">
          <span>CAAsXplorer 2.0</span>
          <span>Editorial shell · beta navegável</span>
        </div>
      </footer>
    </div>
  );
}
