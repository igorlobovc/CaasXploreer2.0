export function EvidenceTeaserSection() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              Evidências
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Explore evidências por estado, categoria e entidade
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
              A navegação detalhada de evidências agora fica em uma página própria,
              com foco em descoberta e leitura organizada, sem sobrecarregar a homepage.
            </p>
          </div>

          <a
            href="/evidencias"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Ver evidências
          </a>
        </div>
      </div>
    </section>
  );
}
