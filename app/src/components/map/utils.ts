// ============================================================
// Utils - BrazilMap
// ============================================================

import type { MapData, MapMode, ColorScheme, LegendItem, StateData } from './types';

// Cores padrão
const DEFAULT_COLORS: ColorScheme = {
  min: '#1e3a5f',    // Azul escuro
  max: '#06b6d4',    // Ciano
  empty: '#334155',  // Slate 700
};

const DEFAULT_CATEGORY_COLORS: Record<string, string> = {
  'alta': '#10b981',     // Verde
  'média': '#f59e0b',    // Laranja  
  'media': '#f59e0b',    // Laranja (sem acento)
  'baixa': '#ef4444',    // Vermelho
  'norte': '#06b6d4',    // Ciano
  'nordeste': '#3b82f6', // Azul
  'sudeste': '#f59e0b',  // Laranja
  'sul': '#8b5cf6',      // Roxo
  'centro-oeste': '#10b981', // Verde
};

// ============================================================
// CORES
// ============================================================

/** 
 * Interpola entre duas cores hex
 */
function interpolateColor(color1: string, color2: string, factor: number): string {
  const hex1 = color1.replace('#', '');
  const hex2 = color2.replace('#', '');
  
  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);
  
  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

/**
 * Retorna a cor para um estado baseado nos dados
 */
export function getStateColor(
  _uf: string,
  stateData: StateData | undefined,
  mode: MapMode,
  allData: MapData,
  options?: {
    colorScheme?: ColorScheme;
    categoryColors?: Record<string, string>;
  }
): string {
  // Sem dados = cor neutra
  if (!stateData) {
    return options?.colorScheme?.empty ?? DEFAULT_COLORS.empty;
  }

  // Modo categórico
  if (mode === 'category' || stateData.category) {
    const category = stateData.category?.toLowerCase() || 'default';
    const colors = { ...DEFAULT_CATEGORY_COLORS, ...options?.categoryColors };
    return colors[category] ?? colors['default'] ?? DEFAULT_COLORS.empty;
  }

  // Modo numérico
  if (stateData.value !== undefined) {
    const scheme = { ...DEFAULT_COLORS, ...options?.colorScheme };
    
    // Coleta todos os valores numéricos
    const values = Object.values(allData)
      .filter(d => d.value !== undefined)
      .map(d => d.value as number);
    
    if (values.length === 0) return scheme.empty ?? DEFAULT_COLORS.empty;
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    if (max === min) return scheme.max ?? DEFAULT_COLORS.max;
    
    const normalized = (stateData.value - min) / (max - min);
    return interpolateColor(scheme.min ?? DEFAULT_COLORS.min, scheme.max ?? DEFAULT_COLORS.max, normalized);
  }

  return options?.colorScheme?.empty ?? DEFAULT_COLORS.empty;
}

/**
 * Gera itens da legenda
 */
export function getLegendItems(
  data: MapData,
  mode: MapMode,
  options?: {
    colorScheme?: ColorScheme;
    categoryColors?: Record<string, string>;
  }
): LegendItem[] {
  // Modo categórico
  if (mode === 'category') {
    const categories = new Set<string>();
    Object.values(data).forEach(d => {
      if (d.category) categories.add(d.category);
    });
    
    const colors = { ...DEFAULT_CATEGORY_COLORS, ...options?.categoryColors };
    
    return Array.from(categories).map(cat => ({
      label: cat.charAt(0).toUpperCase() + cat.slice(1),
      color: colors[cat.toLowerCase()] ?? colors['default'] ?? DEFAULT_COLORS.empty,
    })) as LegendItem[];
  }

  // Modo numérico retorna vazio (usa gradiente)
  return [];
}

// ============================================================
// FORMATAÇÃO
// ============================================================

/**
 * Formata número para exibição (K, M)
 */
export function formatNumber(value: number): string {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return value.toLocaleString('pt-BR');
}

/**
 * Retorna estatísticas dos dados
 */
export function getDataStats(data: MapData) {
  const values = Object.values(data)
    .filter(d => d.value !== undefined)
    .map(d => d.value as number);
  
  if (values.length === 0) {
    return { min: 0, max: 0, avg: 0, count: 0 };
  }
  
  const sum = values.reduce((a, b) => a + b, 0);
  
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    avg: sum / values.length,
    count: values.length,
  };
}

// ============================================================
// CONSTANTES
// ============================================================

/** Lista de todas as UFs */
export const ALL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
] as const;

/** Mapeamento UF -> Nome */
export const STATE_NAMES: Record<string, string> = {
  AC: 'Acre', AL: 'Alagoas', AP: 'Amapá', AM: 'Amazonas', BA: 'Bahia',
  CE: 'Ceará', DF: 'Distrito Federal', ES: 'Espírito Santo', GO: 'Goiás',
  MA: 'Maranhão', MT: 'Mato Grosso', MS: 'Mato Grosso do Sul', MG: 'Minas Gerais',
  PA: 'Pará', PB: 'Paraíba', PR: 'Paraná', PE: 'Pernambuco', PI: 'Piauí',
  RJ: 'Rio de Janeiro', RN: 'Rio Grande do Norte', RS: 'Rio Grande do Sul',
  RO: 'Rondônia', RR: 'Roraima', SC: 'Santa Catarina', SP: 'São Paulo',
  SE: 'Sergipe', TO: 'Tocantins',
};

/** Mapeamento UF -> Região */
export const STATE_REGIONS: Record<string, string> = {
  AC: 'Norte', AL: 'Nordeste', AP: 'Norte', AM: 'Norte', BA: 'Nordeste',
  CE: 'Nordeste', DF: 'Centro-Oeste', ES: 'Sudeste', GO: 'Centro-Oeste',
  MA: 'Nordeste', MT: 'Centro-Oeste', MS: 'Centro-Oeste', MG: 'Sudeste',
  PA: 'Norte', PB: 'Nordeste', PR: 'Sul', PE: 'Nordeste', PI: 'Nordeste',
  RJ: 'Sudeste', RN: 'Nordeste', RS: 'Sul', RO: 'Norte', RR: 'Norte',
  SC: 'Sul', SP: 'Sudeste', SE: 'Nordeste', TO: 'Norte',
};
