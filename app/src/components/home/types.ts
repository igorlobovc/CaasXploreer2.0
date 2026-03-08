import type { LucideIcon } from 'lucide-react';

export interface AcaoInstitucional {
  id: string;
  entity: string;
  uf: string;
  category: string;
  title: string;
  description: string;
  source_url?: string;
  evidence_level: string;
  data_origin: string[];
  icon: LucideIcon;
  benchmark?: boolean;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'final';
}

export interface ServicoCategoria {
  categoria: string;
  count: string;
  examples: string[];
}
