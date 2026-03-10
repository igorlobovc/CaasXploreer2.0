// ============================================================
// Tipos - BrazilMap
// ============================================================

/** Dados de um estado */
export interface StateData {
  /** Valor numérico (para modo numérico) */
  value?: number;
  /** Nome completo do estado */
  label?: string;
  /** Categoria (para modo categórico) */
  category?: string;
  /** Dados extras para exibir no tooltip */
  extra?: Record<string, string | number>;
}

/** Dados do mapa indexados por UF */
export type MapData = Record<string, StateData>;

/** Modo de visualização */
export type MapMode = 'numeric' | 'category';

/** Esquema de cores para modo numérico */
export interface ColorScheme {
  min: string;
  max: string;
  empty: string;
}

/** Props do BrazilMap */
export interface BrazilMapProps {
  /** Dados por UF */
  data: MapData;
  /** Modo de visualização */
  mode?: MapMode;
  /** UF selecionada (destaca no mapa) */
  selectedUF?: string;
  /** Callback ao clicar em um estado */
  onStateClick?: (uf: string) => void;
  /** Título do mapa */
  title?: string;
  /** Mostrar legenda */
  showLegend?: boolean;
  /** Altura do mapa em pixels */
  height?: number;
  /** Esquema de cores para modo numérico */
  colorScheme?: ColorScheme;
  /** Cores para modo categórico (categoria -> cor) */
  categoryColors?: Record<string, string>;
  /** Classes CSS adicionais */
  className?: string;
}

/** Item da legenda */
export interface LegendItem {
  label: string;
  color: string;
}
