export interface ManualReviewEvidenceRecord {
  uf: string;
  entidade: string;
  categoria: string;
  servico: string;
  descricao: string;
  fonte: string;
  status?: string;
}

interface ManualReviewEvidenceDataset {
  sample_rows?: ManualReviewEvidenceRecord[];
}

export interface EvidenceFilters {
  uf?: string;
  categoria?: string;
  servico?: string;
  entidade?: string;
}

const MANUAL_REVIEW_EVIDENCE_PATH = `${import.meta.env.BASE_URL}data/normalized/manual_review/manual_review.preview.json`;

let evidenceRowsPromise: Promise<ManualReviewEvidenceRecord[]> | null = null;

function normalizeFilterValue(value?: string | null) {
  return value?.trim().toLocaleLowerCase('pt-BR') ?? '';
}

function matchesFilter(value: string, filter?: string) {
  if (!filter) {
    return true;
  }

  return normalizeFilterValue(value) === normalizeFilterValue(filter);
}

function sanitizeRow(row: ManualReviewEvidenceRecord): ManualReviewEvidenceRecord {
  return {
    uf: row.uf?.trim() ?? '',
    entidade: row.entidade?.trim() ?? '',
    categoria: row.categoria?.trim() ?? '',
    servico: row.servico?.trim() ?? '',
    descricao: row.descricao?.trim() ?? '',
    fonte: row.fonte?.trim() ?? '',
    status: row.status?.trim(),
  };
}

async function loadEvidenceRowsFromSource() {
  const response = await fetch(MANUAL_REVIEW_EVIDENCE_PATH);

  if (!response.ok) {
    throw new Error(`Falha ao carregar evidências manuais (${response.status})`);
  }

  const dataset = (await response.json()) as ManualReviewEvidenceDataset;

  if (!Array.isArray(dataset.sample_rows)) {
    throw new Error('Formato inválido para o dataset de evidências manuais.');
  }

  return dataset.sample_rows.map(sanitizeRow);
}

export async function loadManualReviewEvidence() {
  evidenceRowsPromise ??= loadEvidenceRowsFromSource();
  return evidenceRowsPromise;
}

export async function getEvidenceByState(uf: string) {
  return filterEvidence({ uf });
}

export async function filterEvidence(filters: EvidenceFilters) {
  const evidenceRows = await loadManualReviewEvidence();

  return evidenceRows.filter((row) => {
    return (
      matchesFilter(row.uf, filters.uf) &&
      matchesFilter(row.categoria, filters.categoria) &&
      matchesFilter(row.servico, filters.servico) &&
      matchesFilter(row.entidade, filters.entidade)
    );
  });
}
