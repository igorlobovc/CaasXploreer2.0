import {
  Heart,
  Sparkles,
  Stethoscope,
  Trophy,
  Zap,
  Map,
  Database,
  BarChart2,
  FileText,
  Globe,
} from 'lucide-react';

import type { AcaoInstitucional, ProjectGoal, ServicoCategoria, TimelineEvent } from './types';

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

export const PROJECT_GOALS: ProjectGoal[] = [
  {
    id: 'goal-mapping-coverage',
    goalTitle: 'Cobertura Nacional Completa',
    goalDescription: 'Mapear todas as 27 Caixas de Assistência dos Advogados (CAAs) brasileiras, garantindo representação de todos os estados e do Distrito Federal.',
    targetValue: '27 CAAs',
    currentResult: '27 mapeadas',
    achievementStatus: 'achieved',
    icon: Map,
  },
  {
    id: 'goal-service-taxonomy',
    goalTitle: 'Taxonomia de Serviços',
    goalDescription: 'Identificar e classificar os serviços institucionais em categorias canônicas padronizadas, permitindo comparação objetiva entre estados.',
    targetValue: '120+ serviços',
    currentResult: '134 mapeados',
    achievementStatus: 'achieved',
    icon: Database,
  },
  {
    id: 'goal-normalized-dataset',
    goalTitle: 'Dataset Normalizado',
    goalDescription: 'Construir uma base de dados com métricas normalizadas (interações por 1.000 advogados) para comparação justa entre estados de portes distintos.',
    targetValue: 'Métrica nacional',
    currentResult: '65,5 / 1k adv.',
    achievementStatus: 'achieved',
    icon: BarChart2,
  },
  {
    id: 'goal-national-reach',
    goalTitle: 'Alcance Nacional',
    goalDescription: 'Registrar volume significativo de interações institucionais em nível nacional, evidenciando o impacto das ações de assistência à advocacia.',
    targetValue: '80.000+ interações',
    currentResult: '88.200 interações',
    achievementStatus: 'achieved',
    icon: Globe,
  },
  {
    id: 'goal-technical-report',
    goalTitle: 'Relatório Técnico Consolidado',
    goalDescription: 'Produzir relatório técnico auditável com datasets exportáveis, evidência pública e análise comparativa entre estados e categorias.',
    targetValue: 'Entrega final',
    currentResult: 'Em produção',
    achievementStatus: 'in-progress',
    icon: FileText,
  },
];
