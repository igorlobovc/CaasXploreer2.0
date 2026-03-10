export function ServicosTeaserSection() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
              Serviços
            </p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Navegue pelo catálogo de serviços mapeados
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
              O detalhamento de serviços e categorias agora segue para uma área própria,
              deixando a homepage mais executiva e direta.
            </p>
          </div>

          <a
            href="/servicos"
            className="inline-flex items-center justify-center rounded-xl bg-fuchsia-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-fuchsia-300"
          >
            Ver serviços
          </a>
        </div>
      </div>
    </section>
  );
}
