// ============================================
// ESTADOS DATA – institutional actions by UF
// ============================================

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
  /** Lucide icon name used by the UI layer */
  iconKey: 'stethoscope' | 'trophy' | 'zap' | 'sparkles' | 'heart';
  benchmark?: boolean;
}

export const acoesInstitucionais: AcaoInstitucional[] = [
  {
    id: '1',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'SAÚDE',
    title: 'Vacinação da Advocacia',
    description:
      'Campanhas de vacinação voltadas exclusivamente à advocacia paraibana, realizadas em parceria com a OAB-PB. Ação recorrente com alto engajamento institucional.',
    source_url: 'https://www.oabpb.org.br',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia', 'registro'],
    iconKey: 'stethoscope',
    benchmark: true,
  },
  {
    id: '2',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BEM-ESTAR',
    title: 'Jogos de Verão da Advocacia',
    description:
      'Evento esportivo anual que reúne a advocacia paraibana em celebração ao esporte e união da classe. Alto impacto simbólico e integração.',
    source_url: 'https://www.oabpb.org.br/post/sucesso-total-jogos-de-ver%C3%A3o',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    iconKey: 'trophy',
  },
  {
    id: '3',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BEM-ESTAR',
    title: 'Circuito de Corrida de Rua',
    description:
      'Circuito de corrida de rua da advocacia paraibana com múltiplas etapas ao longo do ano. Consolidação de evento institucional recorrente.',
    source_url: 'https://www.oabpb.org.br/post/circuito-de-corrida',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    iconKey: 'zap',
  },
  {
    id: '4',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BENEFÍCIOS',
    title: 'Descontos em Eventos Culturais',
    description:
      'Descontos exclusivos de 20% em abadás e eventos culturais para advogados, divulgados via aplicativo oficial. Benefício não-transacional de alto valor.',
    evidence_level: 'confirmado',
    data_origin: ['app', 'site'],
    iconKey: 'sparkles',
  },
  {
    id: '5',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BENEFÍCIOS',
    title: 'Saúde Pet – Plano Pet Top',
    description:
      'Convênio de saúde pet com 40+ clínicas credenciadas na Paraíba e condições especiais para advogados. Diferencial competitivo identificado.',
    evidence_level: 'confirmado',
    data_origin: ['site', 'app'],
    iconKey: 'heart',
  },
  {
    id: '6',
    entity: 'CAAPE',
    uf: 'PE',
    category: 'SAÚDE',
    title: 'Vacinação da Advocacia',
    description:
      'Ações de vacinação realizadas nos pontos de atendimento da CAAPE, como o posto da Joana Bezerra. Presença institucional validada.',
    source_url: 'https://www.oabpe.org.br/noticias/vacinacao',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    iconKey: 'stethoscope',
  },
  {
    id: '7',
    entity: 'CAAPE',
    uf: 'PE',
    category: 'BEM-ESTAR',
    title: 'Corrida da OAB-PE',
    description:
      'Evento esportivo anual que reúne a advocacia pernambucana no Recife para corrida e integração. Evento consolidado no calendário institucional.',
    source_url: 'https://www.oabpe.org.br/noticias/corrida',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    iconKey: 'trophy',
  },
];
