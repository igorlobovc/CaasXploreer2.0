import { execFileSync } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

type PreviewOutput = {
  metadata: {
    generatedAt: string;
    sourceFile: string;
    sheetNames: string[];
    rowCount: number | null;
  };
  columns: Record<string, string[]>;
  proposedFieldMapping: Record<string, string | null>;
};

const EXPECTED_FIELDS = ['uf', 'entidade', 'categoria', 'servico', 'descricao', 'fonte', 'status'];
const FIELD_ALIASES: Record<string, string[]> = {
  uf: ['uf', 'estado'],
  entidade: ['entidade', 'profile', 'perfil', 'profile original', 'pagina', 'page'],
  categoria: ['categoria canonica', 'categoria', 'subcategoria canonica', 'subcategoria'],
  servico: ['cluster servico', 'servico', 'tema servico'],
  descricao: ['descricao', 'message', 'texto', 'conteudo', 'observacoes classificacao'],
  fonte: ['fonte', 'network', 'origem', 'source', 'canal'],
  status: ['status', 'needs manual review', 'qa priority', 'needs dedupe review', 'match fraco'],
};

function assertFileExists(filePath: string) {
  return fs
    .access(filePath)
    .catch(() => {
      throw new Error(`Input file not found: ${filePath}`);
    })
    .then(() => filePath);
}

function readZipEntry(filePath: string, entry: string) {
  try {
    return execFileSync('unzip', ['-p', filePath, entry], { encoding: 'utf8' });
  } catch {
    return '';
  }
}

function decodeXmlEntities(input: string) {
  return input
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function extractSheetNames(workbookXml: string) {
  const names: string[] = [];
  const sheetRegex = /<sheet[^>]*name="([^"]+)"[^>]*>/g;
  let match = sheetRegex.exec(workbookXml);
  while (match) {
    names.push(decodeXmlEntities(match[1]));
    match = sheetRegex.exec(workbookXml);
  }
  return names;
}

function extractSharedStrings(sharedStringsXml: string) {
  const values: string[] = [];
  const tRegex = /<t[^>]*>(.*?)<\/t>/g;
  let match = tRegex.exec(sharedStringsXml);
  while (match) {
    values.push(decodeXmlEntities(match[1]));
    match = tRegex.exec(sharedStringsXml);
  }
  return values;
}

function extractHeaderRow(sheetXml: string, sharedStrings: string[]) {
  const rowMatch = sheetXml.match(/<row[^>]*r="1"[^>]*>([\s\S]*?)<\/row>/);
  if (!rowMatch) {
    return [];
  }
  const rowXml = rowMatch[1];
  const cellRegex = /<c[^>]*r="([A-Z]+)1"[^>]*?(?:t="([^"]+)")?[^>]*>([\s\S]*?)<\/c>/g;
  const headers: { col: string; value: string }[] = [];
  let match = cellRegex.exec(rowXml);
  while (match) {
    const col = match[1];
    const type = match[2];
    const cellXml = match[3];
    const valueMatch = cellXml.match(/<v>([\s\S]*?)<\/v>/);
    if (type === 's' && valueMatch) {
      const idx = Number(valueMatch[1]);
      headers.push({ col, value: sharedStrings[idx] ?? '' });
    } else if (type === 'inlineStr') {
      const inlineMatch = cellXml.match(/<t[^>]*>([\s\S]*?)<\/t>/);
      headers.push({ col, value: inlineMatch ? decodeXmlEntities(inlineMatch[1]) : '' });
    } else if (valueMatch) {
      headers.push({ col, value: valueMatch[1] });
    }
    match = cellRegex.exec(rowXml);
  }
  return headers.map((header) => header.value).filter(Boolean);
}

function normalizeLabel(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function proposeLegacyFieldMapping(columns: string[]) {
  const mapping: Record<string, string | null> = {};
  for (const field of EXPECTED_FIELDS) {
    const candidate = columns.find((col) => col.toLowerCase().includes(field));
    mapping[field] = candidate ?? null;
  }
  return mapping;
}

function findColumnByAliases(columns: string[], aliases: string[]) {
  const normalizedColumns = columns.map((raw) => ({ raw, normalized: normalizeLabel(raw) }));
  for (const alias of aliases) {
    const normalizedAlias = normalizeLabel(alias);
    const exactMatch = normalizedColumns.find((col) => col.normalized === normalizedAlias);
    if (exactMatch) {
      return exactMatch.raw;
    }
  }

  for (const alias of aliases) {
    const normalizedAlias = normalizeLabel(alias);
    const partialMatch = normalizedColumns.find(
      (col) => col.normalized.includes(normalizedAlias) || normalizedAlias.includes(col.normalized),
    );
    if (partialMatch) {
      return partialMatch.raw;
    }
  }

  return null;
}

function proposeFieldMapping(columns: string[]) {
  const mapping: Record<string, string | null> = {};
  for (const field of EXPECTED_FIELDS) {
    const aliases = FIELD_ALIASES[field] ?? [field];
    mapping[field] = findColumnByAliases(columns, aliases);
  }
  return mapping;
}

function summarizeMappingDiff(
  beforeMapping: Record<string, string | null>,
  afterMapping: Record<string, string | null>,
) {
  const changedFields = EXPECTED_FIELDS.filter((field) => beforeMapping[field] !== afterMapping[field]);
  if (changedFields.length === 0) {
    return 'No mapping changes detected';
  }

  return changedFields
    .map((field) => `${field}: ${beforeMapping[field] ?? 'null'} -> ${afterMapping[field] ?? 'null'}`)
    .join('; ');
}

async function inspectXlsx(filePath: string) {
  const workbookXml = readZipEntry(filePath, 'xl/workbook.xml');
  const sheetNames = extractSheetNames(workbookXml);
  const sharedStringsXml = readZipEntry(filePath, 'xl/sharedStrings.xml');
  const sharedStrings = sharedStringsXml ? extractSharedStrings(sharedStringsXml) : [];

  const columnsBySheet: Record<string, string[]> = {};
  for (let idx = 0; idx < sheetNames.length; idx += 1) {
    const sheetXml = readZipEntry(filePath, `xl/worksheets/sheet${idx + 1}.xml`);
    columnsBySheet[sheetNames[idx]] = sheetXml ? extractHeaderRow(sheetXml, sharedStrings) : [];
  }

  return { sheetNames, columnsBySheet, rowCount: null as number | null };
}

function parseCsvHeaderAndRowCount(content: string) {
  const rows: string[][] = [];
  let currentCell = '';
  let currentRow: string[] = [];
  let inQuotes = false;

  const pushCell = () => {
    currentRow.push(currentCell);
    currentCell = '';
  };

  const pushRow = () => {
    pushCell();
    rows.push(currentRow);
    currentRow = [];
  };

  for (let idx = 0; idx < content.length; idx += 1) {
    const char = content[idx];
    if (char === '"') {
      if (inQuotes && content[idx + 1] === '"') {
        currentCell += '"';
        idx += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      pushCell();
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && content[idx + 1] === '\n') {
        idx += 1;
      }
      pushRow();
      continue;
    }

    currentCell += char;
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    pushRow();
  }

  const rawHeader = rows[0] ?? [];
  const normalizedHeader = rawHeader
    .map((col, index) => (index === 0 ? col.replace(/^\uFEFF/, '') : col))
    .map((col) => col.trim())
    .filter(Boolean);

  const dataRows = rows.slice(1).filter((row) => row.some((value) => value.trim().length > 0)).length;

  return { columns: normalizedHeader, rowCount: dataRows };
}

async function inspectCsv(filePath: string) {
  const content = await fs.readFile(filePath, 'utf8');
  const { columns, rowCount } = parseCsvHeaderAndRowCount(content);
  const sheetName = path.basename(filePath);
  return { sheetNames: [sheetName], columnsBySheet: { [sheetName]: columns }, rowCount };
}

async function main() {
  const [inputFile] = process.argv.slice(2);
  if (!inputFile) {
    throw new Error('Usage: normalize_manual_review_dataset.ts <input-file>');
  }

  const resolvedPath = path.resolve(process.cwd(), inputFile);
  await assertFileExists(resolvedPath);

  const isCsv = resolvedPath.toLowerCase().endsWith('.csv');
  const { sheetNames, columnsBySheet, rowCount } = isCsv
    ? await inspectCsv(resolvedPath)
    : await inspectXlsx(resolvedPath);

  const primaryColumns = columnsBySheet[sheetNames[0]] ?? [];
  const legacyMapping = proposeLegacyFieldMapping(primaryColumns);
  const proposedMapping = proposeFieldMapping(primaryColumns);
  const mappingSummary = summarizeMappingDiff(legacyMapping, proposedMapping);

  const preview: PreviewOutput = {
    metadata: {
      generatedAt: new Date().toISOString(),
      sourceFile: resolvedPath,
      sheetNames,
      rowCount,
    },
    columns: columnsBySheet,
    proposedFieldMapping: proposedMapping,
  };

  const outDir = path.resolve(process.cwd(), 'data/normalized/manual_review');
  await fs.mkdir(outDir, { recursive: true });
  const outputPath = path.join(outDir, 'manual_review.preview.json');
  await fs.writeFile(outputPath, JSON.stringify(preview, null, 2), 'utf8');

  console.log('Sheets:', sheetNames.join(', ') || 'none');
  console.log('Primary columns:', primaryColumns.join(' | ') || 'none');
  console.log('Rows read:', rowCount ?? 'n/a');
  console.log('Mapping changes:', mappingSummary);
  console.log('Proposed mapping:', proposedMapping);
  console.log('Preview written to:', outputPath);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
