import { useEffect, useMemo, useState } from 'react';

import { Database, FilterX } from 'lucide-react';
import { motion } from 'framer-motion';

import { GlassCard, SectionHeading } from '@/components/shared';
import {
  type EvidenceFilters,
  type ManualReviewEvidenceRecord,
  filterEvidence,
  loadManualReviewEvidence,
} from '@/data/manualReviewEvidence';

const ITEMS_PER_PAGE = 9;

function getUniqueValues(rows: ManualReviewEvidenceRecord[], key: keyof EvidenceFilters) {
  return [...new Set(rows.map((row) => row[key]).filter(Boolean))].sort((left, right) =>
    left.localeCompare(right, 'pt-BR'),
  );
}

function getVisiblePages(totalPages: number, currentPage: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, 'ellipsis', totalPages] as const;
  }

  if (currentPage >= totalPages - 3) {
    return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
  }

  return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages] as const;
}

export function StateEvidenceView() {
  const [allRows, setAllRows] = useState<ManualReviewEvidenceRecord[]>([]);
  const [filteredRows, setFilteredRows] = useState<ManualReviewEvidenceRecord[]>([]);
  const [filters, setFilters] = useState<EvidenceFilters>({ uf: '', categoria: '', servico: '', entidade: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadRows() {
      try {
        const evidenceRows = await loadManualReviewEvidence();

        if (!isMounted) {
          return;
        }

        setAllRows(evidenceRows);
        setErrorMessage('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : 'Não foi possível carregar as evidências.');
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadRows();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!allRows.length) {
      setFilteredRows([]);
      return;
    }

    let isMounted = true;

    async function applyFilters() {
      const nextRows = await filterEvidence(filters);

      if (isMounted) {
        setFilteredRows(nextRows);
      }
    }

    void applyFilters();

    return () => {
      isMounted = false;
    };
  }, [allRows.length, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const ufOptions = useMemo(() => getUniqueValues(allRows, 'uf'), [allRows]);
  const categoriaOptions = useMemo(() => getUniqueValues(allRows, 'categoria'), [allRows]);
  const servicoOptions = useMemo(() => getUniqueValues(allRows, 'servico'), [allRows]);
  const entidadeOptions = useMemo(() => getUniqueValues(allRows, 'entidade'), [allRows]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / ITEMS_PER_PAGE));
  const currentPageRows = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRows.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, filteredRows]);
  const visiblePages = useMemo(() => getVisiblePages(totalPages, currentPage), [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  function updateFilter(key: keyof EvidenceFilters, value: string) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [key]: value,
    }));
  }

  function clearFilters() {
    setFilters({ uf: '', categoria: '', servico: '', entidade: '' });
  }

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <SectionHeading
            icon={<Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />}
            label="MANUAL REVIEW · STATE EVIDENCE"
            title="Evidências filtráveis por estado"
            description="Explore os registros normalizados de revisão manual por UF, categoria, serviço e entidade, sem incorporar o dataset ao bundle principal da aplicação."
            descriptionClassName="max-w-3xl"
          />
        </motion.div>

        <GlassCard className="p-4 sm:p-5 mb-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300/70 mb-2">
                  UF
                </label>
                <select
                  value={filters.uf ?? ''}
                  onChange={(event) => updateFilter('uf', event.target.value)}
                  className="h-10 w-full rounded-md border border-cyan-500/20 bg-[#081322] px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Todas as UFs</option>
                  {ufOptions.map((uf) => (
                    <option key={uf} value={uf}>
                      {uf}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300/70 mb-2">
                  Categoria
                </label>
                <select
                  value={filters.categoria ?? ''}
                  onChange={(event) => updateFilter('categoria', event.target.value)}
                  className="h-10 w-full rounded-md border border-cyan-500/20 bg-[#081322] px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Todas as categorias</option>
                  {categoriaOptions.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300/70 mb-2">
                  Serviço
                </label>
                <select
                  value={filters.servico ?? ''}
                  onChange={(event) => updateFilter('servico', event.target.value)}
                  className="h-10 w-full rounded-md border border-cyan-500/20 bg-[#081322] px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Todos os serviços</option>
                  {servicoOptions.map((servico) => (
                    <option key={servico} value={servico}>
                      {servico}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-cyan-300/70 mb-2">
                  Entidade
                </label>
                <select
                  value={filters.entidade ?? ''}
                  onChange={(event) => updateFilter('entidade', event.target.value)}
                  className="h-10 w-full rounded-md border border-cyan-500/20 bg-[#081322] px-3 text-sm text-cyan-100 outline-none transition focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/20"
                >
                  <option value="">Todas as entidades</option>
                  {entidadeOptions.map((entidade) => (
                    <option key={entidade} value={entidade}>
                      {entidade}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-cyan-200/60">
              <span>
                {isLoading ? 'Carregando evidências...' : `${filteredRows.length} registros encontrados na amostra normalizada`}
              </span>
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
              >
                <FilterX className="w-4 h-4" />
                Limpar filtros
              </button>
            </div>
          </div>
        </GlassCard>

        {errorMessage ? (
          <GlassCard className="p-4 sm:p-5 text-sm text-rose-200 border-rose-500/30 bg-rose-500/10">
            {errorMessage}
          </GlassCard>
        ) : null}

        {!errorMessage ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {currentPageRows.map((record, index) => (
                <motion.div
                  key={`${record.uf}-${record.entidade}-${record.categoria}-${record.servico}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <GlassCard className="p-4 sm:p-5 h-full" hover>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">{record.uf}</span>
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-300 rounded">
                        {record.entidade}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">Categoria</div>
                        <div className="text-sm font-medium text-white">{record.categoria}</div>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">Serviço</div>
                        <div className="text-sm text-cyan-100">{record.servico}</div>
                      </div>

                      <div>
                        <div className="text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">Descrição</div>
                        <div className="max-h-40 overflow-y-auto pr-1 text-sm text-cyan-200/75 whitespace-pre-line leading-relaxed">
                          {record.descricao}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-cyan-500/10">
                      <div className="text-[11px] uppercase tracking-wider text-cyan-300/60 mb-1">Fonte</div>
                      <div className="text-sm text-cyan-100">{record.fonte}</div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {!isLoading && !filteredRows.length ? (
              <GlassCard className="p-6 mt-6 text-sm text-cyan-200/70">
                Nenhum registro encontrado para os filtros selecionados.
              </GlassCard>
            ) : null}

            {!isLoading && totalPages > 1 ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2" id="state-evidence-pagination">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="rounded border border-cyan-500/20 px-3 py-2 text-sm text-cyan-100 transition enabled:hover:border-cyan-400/40 enabled:hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Anterior
                </button>

                {visiblePages.map((page, index) =>
                  page === 'ellipsis' ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-cyan-300/60">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-10 rounded border px-3 py-2 text-sm transition ${
                        page === currentPage
                          ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-200'
                          : 'border-cyan-500/20 text-cyan-100 hover:border-cyan-400/40 hover:bg-cyan-500/10'
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded border border-cyan-500/20 px-3 py-2 text-sm text-cyan-100 transition enabled:hover:border-cyan-400/40 enabled:hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Próxima
                </button>
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
}
