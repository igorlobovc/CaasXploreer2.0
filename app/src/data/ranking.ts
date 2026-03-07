// ============================================
// RANKING DATA – service categories & timeline
// ============================================

export interface ServicoCategoria {
  categoria: string;
  count: string;
  examples: string[];
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'final';
}

/** Service categories with estimated counts */
export const servicosPorCategoria: ServicoCategoria[] = [
  {
    categoria: 'Saúde',
    count: '40+',
    examples: ['Vacinação', 'Plano de Saúde', 'Odontologia', 'Saúde Mental', 'Saúde Pet'],
  },
  {
    categoria: 'Benefícios',
    count: '30+',
    examples: ['Convênios', 'Descontos', 'Clube de Vantagens', 'Turismo', 'Educação'],
  },
  {
    categoria: 'Financeiro',
    count: '20+',
    examples: ['Auxílios', 'Crédito Consignado', 'Previdência', 'Anuidade'],
  },
  {
    categoria: 'Esporte e Bem-estar',
    count: '15+',
    examples: ['Eventos Esportivos', 'Academias', 'Modalidades', 'Integração'],
  },
  {
    categoria: 'Infraestrutura',
    count: '15+',
    examples: ['Coworking', 'Certificado Digital', 'Espaços Físicos', 'Apoio Operacional'],
  },
];

/** Project delivery timeline */
export const timelineEvents: TimelineEvent[] = [
  {
    date: '28 Jan 2026',
    title: 'Início do Projeto',
    description: 'Mapeamento institucional e definição de escopo analítico',
    status: 'completed',
  },
  {
    date: '01 Fev 2026',
    title: 'Consolidação Conceitual',
    description: 'Estruturação da taxonomia canônica e queries booleanas',
    status: 'completed',
  },
  {
    date: '06 Fev 2026',
    title: 'Base Operacional',
    description: 'Taxonomia validada e pipeline de dados operacional',
    status: 'current',
  },
  {
    date: '21–28 Fev 2026',
    title: 'Entrega Final',
    description: 'Relatório técnico consolidado e datasets auditáveis',
    status: 'final',
  },
];
