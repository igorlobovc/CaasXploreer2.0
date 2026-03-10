// ============================================================
// BrazilMap - Mapa Interativo do Brasil
// Exportações principais
// ============================================================

// Componente
export { BrazilMap } from './BrazilMap';
export { BrazilMap as default } from './BrazilMap';

// Tipos
export type { 
  StateData, 
  MapData, 
  MapMode, 
  ColorScheme, 
  BrazilMapProps,
  LegendItem 
} from './types';

// Utils
export { 
  getStateColor, 
  formatNumber, 
  getLegendItems, 
  getDataStats,
  ALL_STATES,
  STATE_NAMES,
  STATE_REGIONS,
} from './utils';
