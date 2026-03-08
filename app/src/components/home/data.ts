import {
  Heart,
  Sparkles,
  Stethoscope,
  Trophy,
  Zap,
} from 'lucide-react';

import type { AcaoInstitucional, ServicoCategoria, TimelineEvent } from './types';

export const ACOES_INSTITUCIONAIS: AcaoInstitucional[] = [
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
    icon: Stethoscope,
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
    icon: Trophy,
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
    icon: Zap,
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
    icon: Sparkles,
  },
  {
    id: '5',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BENEFÍCIOS',
    title: 'Saúde Pet - Plano Pet Top',
    description:
      'Convênio de saúde pet com 40+ clínicas credenciadas na Paraíba e condições especiais para advogados. Diferencial competitivo identificado.',
    evidence_level: 'confirmado',
    data_origin: ['site', 'app'],
    icon: Heart,
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
    icon: Stethoscope,
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
    icon: Trophy,
  },
];

export const SERVICOS_POR_CATEGORIA: ServicoCategoria[] = [
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

export const TIMELINE_EVENTS: TimelineEvent[] = [
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
