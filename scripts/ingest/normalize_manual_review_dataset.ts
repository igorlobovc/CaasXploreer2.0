import path from 'node:path';
import fs from 'node:fs/promises';

// NOTE: This is a placeholder skeleton. No ingestion is wired yet.

type ManualReviewRow = {
  uf: string;
  entidade: string;
  categoria: string;
  servico: string;
  descricao?: string;
  fonte?: string;
  status?: string;
};

type NormalizedManualReview = {
  metadata: {
    generatedAt: string;
    sourceFiles: string[];
  };
  records: ManualReviewRow[];
};

async function readSpreadsheet(filePath: string): Promise<ManualReviewRow[]> {
  // TODO: Add Excel/CSV parsing (e.g. xlsx + csv-parse) when format is finalized.
  // Placeholder to keep interface stable.
  void filePath;
  return [];
}

function normalizeRows(rows: ManualReviewRow[]): ManualReviewRow[] {
  // TODO: Apply canonical field mapping, trimming, and category normalization.
  return rows;
}

async function writeNormalizedOutput(output: NormalizedManualReview, outDir: string) {
  await fs.mkdir(outDir, { recursive: true });
  const outputPath = path.join(outDir, 'manual_review.normalized.json');
  await fs.writeFile(outputPath, JSON.stringify(output, null, 2), 'utf8');
}

async function main() {
  const sourceFiles = process.argv.slice(2);
  const outDir = path.resolve(process.cwd(), 'data/normalized/manual_review');

  if (sourceFiles.length === 0) {
    throw new Error('Provide at least one input spreadsheet path.');
  }

  const allRows = (await Promise.all(sourceFiles.map(readSpreadsheet))).flat();
  const normalizedRows = normalizeRows(allRows);

  const payload: NormalizedManualReview = {
    metadata: {
      generatedAt: new Date().toISOString(),
      sourceFiles,
    },
    records: normalizedRows,
  };

  await writeNormalizedOutput(payload, outDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
