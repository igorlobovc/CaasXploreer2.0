import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Globe, BarChart2, MapPin, Target, Lightbulb,
  ChevronDown, ChevronUp, Smartphone, Award,
  Users, Zap, Activity,
} from 'lucide-react';
import { GlassCard } from '@/components/shared';

interface SlideCard {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  accentColor: string;
  borderColor: string;
  tagColor: string;
  highlights: { label: string; value: string; sub?: string }[];
  insight: string;
  insightColor: string;
}

const SLIDES: SlideCard[] = [
  {
    id: 'metodologia',
    tag: '01 · Contexto',
    title: 'O Funil Analítico',
    subtitle: 'Do Panorama Nacional à Estratégia Local',
    icon: BookOpen,
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/20',
    tagColor: 'bg-cyan-500/10 text-cyan-300',
    highlights: [
      { label: 'Análise Quantitativa', value: '6.357', sub: 'posts processados' },
      { label: 'Foco Estratégico', value: '27', sub: 'CAAs mapeadas' },
      { label: 'Recomendações', value: '100%', sub: 'acionáveis' },
    ],
    insight:
      'Pipeline analítico em três camadas: panorama nacional → benchmarking regional → deep dive Paraíba com prescrições estratégicas.',
    insightColor: 'text-cyan-300/70',
  },
  {
    id: 'panorama',
    tag: '02 · Panorama Nacional',
    title: 'A Escala Dita a Estratégia',
    subtitle: 'A Distribuição Demográfica e o Ecossistema de Benefícios',
    icon: Globe,
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    tagColor: 'bg-blue-500/10 text-blue-300',
    highlights: [
      { label: 'Paraíba', value: '24.226', sub: 'advogados ativos' },
      { label: 'Posição Nacional', value: '16º', sub: 'maior população' },
      { label: 'Ecossistema', value: '4 pilares', sub: 'saúde · esporte · digital · comercial' },
    ],
    insight:
      'A PB possui escala ideal para adoção massiva de inovações digitais sem os gargalos logísticos dos mega-estados. Alta saturação de base.',
    insightColor: 'text-blue-300/70',
  },
  {
    id: 'engajamento',
    tag: '03 · Engajamento Digital',
    title: 'O Quadrante de Engajamento',
    subtitle: 'Volume vs. Valor de Marca: Entendendo o Comportamento Digital',
    icon: BarChart2,
    accentColor: 'text-violet-400',
    borderColor: 'border-violet-500/20',
    tagColor: 'bg-violet-500/10 text-violet-300',
    highlights: [
      { label: 'Esporte & Bem-estar', value: 'Alto LTV', sub: 'motor de retenção orgânica' },
      { label: 'Sorteios', value: 'Growth Hack', sub: 'picos de aquisição' },
      { label: 'Benefícios', value: '#1', sub: 'maior engajamento médio' },
    ],
    insight:
      'Atrair a atenção da advocacia exige Sorteios; reter a lealdade exige a tangibilidade do Esporte e Bem-estar.',
    insightColor: 'text-violet-300/70',
  },
  {
    id: 'paraiba',
    tag: '04 · Deep Dive Paraíba',
    title: 'Ecossistema Maduro',
    subtitle: 'Diagnóstico Local: Contexto, Produtos e Digitalização',
    icon: MapPin,
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/20',
    tagColor: 'bg-red-500/10 text-red-300',
    highlights: [
      { label: 'App CAA-PB', value: 'Ativo', sub: 'geolocalização + carteira digital' },
      { label: 'Nosso Token', value: 'Soluti', sub: 'certificação digital integrada' },
      { label: 'Fitness', value: 'Bluefit', sub: 'Clube Cabo Branco' },
    ],
    insight:
      'O foco agora não é construção estrutural, mas ativação agressiva e cross-selling de benefícios para a base consolidada de 24k advogados.',
    insightColor: 'text-red-300/70',
  },
  {
    id: 'gaps',
    tag: '05 · Análise de Gaps',
    title: 'PB vs. Benchmarks Nacionais',
    subtitle: 'Onde estão as Oportunidades Estratégicas?',
    icon: Target,
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    tagColor: 'bg-orange-500/10 text-orange-300',
    highlights: [
      { label: 'Força', value: 'Eventos', sub: 'Arraia/Bloquinho acima da média' },
      { label: 'Força', value: 'App próprio', sub: 'empata com nacionais' },
      { label: 'Gap', value: 'Wellhub', sub: 'integração mega-parceiros de bem-estar' },
    ],
    insight:
      'Defasagem em integração com mega-parceiros de bem-estar corporativo (modelo Wellhub) e necessidade de ampliar telessaúde e saúde mental.',
    insightColor: 'text-orange-300/70',
  },
  {
    id: 'recomendacoes',
    tag: '06 · Recomendações',
    title: 'Prescrições para Crescimento',
    subtitle: 'Sorteios Inteligentes e Hub de Saúde Integral Regional',
    icon: Lightbulb,
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    tagColor: 'bg-emerald-500/10 text-emerald-300',
    highlights: [
      { label: 'Sorteios Inteligentes', value: 'Trava no App', sub: 'cadastro ativo obrigatório' },
      { label: 'Hub de Saúde', value: 'Assinatura única', sub: 'Bluefit + Corridas + Cabo Branco' },
      { label: 'Token como Cavalo de Troia', value: '24k MAU', sub: 'potencial de ativação' },
    ],
    insight:
      'Transformação de engajamento social em aquisição permanente: de descontos passivos para programa ativo de bem-estar corporativo contínuo.',
    insightColor: 'text-emerald-300/70',
  },
];

const TOP_PERFORMERS = [
  {
    sigla: 'CAADF',
    estado: 'Distrito Federal',
    tag: 'Pioneiro em Inovação',
    features: ['Saúde Mental gratuita online', 'Inovação Clínica'],
    engagement: 95,
    color: 'cyan',
  },
  {
    sigla: 'CAACE',
    estado: 'Ceará',
    tag: 'Bem-estar Integrado',
    features: ['Wellhub/TotalPass massivo', 'Festivais de Esporte'],
    engagement: 92,
    color: 'blue',
  },
  {
    sigla: 'CAARN',
    estado: 'Rio Grande do Norte',
    tag: 'Digitalização Avançada',
    features: ['App integrado a coworking', 'Clube de Descontos'],
    engagement: 88,
    color: 'violet',
  },
];

function ExpandableSlideCard({ slide }: { slide: SlideCard }) {
  const [open, setOpen] = useState(false);
  const Icon = slide.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <GlassCard className={`overflow-hidden border ${slide.borderColor}`}>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full text-left p-5 flex items-start gap-4"
        >
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${slide.borderColor} bg-white/5`}
          >
            <Icon className={`w-5 h-5 ${slide.accentColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${slide.tagColor}`}>
                {slide.tag}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white leading-tight">{slide.title}</h4>
            <p className="text-[11px] text-cyan-200/40 mt-0.5">{slide.subtitle}</p>
          </div>
          <div className="flex-shrink-0 mt-1">
            {open ? (
              <ChevronUp className="w-4 h-4 text-cyan-400/50" />
            ) : (
              <ChevronDown className="w-4 h-4 text-cyan-400/50" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 space-y-4">
                {/* Highlights */}
                <div className="grid grid-cols-3 gap-3">
                  {slide.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-3 bg-white/[0.03] border border-white/5 rounded-lg text-center"
                    >
                      <div className={`text-base font-bold ${slide.accentColor}`}>{h.value}</div>
                      <div className="text-[9px] text-cyan-200/40 mt-0.5 leading-tight">{h.sub}</div>
                    </div>
                  ))}
                </div>
                {/* Insight */}
                <div className="p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                  <p className={`text-xs leading-relaxed ${slide.insightColor}`}>
                    <span className={`font-semibold ${slide.accentColor}`}>Insight: </span>
                    {slide.insight}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
}

export function RelatorioIntelligenciaSection() {
  return (
    <section className="py-20 sm:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 bg-violet-500/10 border border-violet-500/20 rounded-full">
              <span className="text-[10px] font-mono text-violet-300 uppercase tracking-wider">
                Relatório de Inteligência · 2024
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Ecossistema de Benefícios da
            <br />
            <span className="text-violet-400">Advocacia Brasileira</span>
          </h2>
          <p className="text-cyan-200/50 max-w-2xl text-sm sm:text-base leading-relaxed">
            Análise nacional e deep dive Paraíba. Insights orientados a dados sobre serviços,
            engajamento e a evolução da assistência à advocacia no Brasil.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: accordion slides */}
          <div className="lg:col-span-2 space-y-3">
            {SLIDES.map((slide) => (
              <ExpandableSlideCard key={slide.id} slide={slide} />
            ))}
          </div>

          {/* Right: Top performers + conclusion */}
          <div className="space-y-5">
            {/* Top performers */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard className="p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <h4 className="text-sm font-semibold text-white">Top Performers Nacionais</h4>
                </div>
                <div className="space-y-4">
                  {TOP_PERFORMERS.map((p) => (
                    <div key={p.sigla} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/30 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-violet-200">{p.sigla.slice(-2)}</span>
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-white">{p.estado}</div>
                            <div className="text-[9px] text-cyan-200/40">{p.tag}</div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-cyan-300">{p.engagement}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.engagement}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {p.features.map((f) => (
                          <span key={f} className="text-[9px] px-1.5 py-0.5 bg-white/5 text-cyan-200/50 rounded">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-cyan-200/30 mt-4 leading-relaxed border-t border-white/5 pt-3">
                  O engajamento orgânico recorde no Brasil advém diretamente do lançamento de
                  plataformas unificadas de benefícios.
                </p>
              </GlassCard>
            </motion.div>

            {/* 3 strategic axes */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <GlassCard className="p-5 border border-violet-500/15">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-4 h-4 text-violet-400" />
                  <h4 className="text-sm font-semibold text-white">Os 3 Eixos do Futuro</h4>
                  <span className="text-[9px] text-cyan-200/30 ml-auto">CAA-PB</span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      num: '01',
                      title: 'A Base',
                      icon: Users,
                      text: 'Ecossistema maduro. Foco em conversão e cross-selling.',
                      color: 'text-cyan-400',
                    },
                    {
                      num: '02',
                      title: 'O Motor de Tráfego',
                      icon: Zap,
                      text: 'Corrida, Arraia, Bloquinho → alimentar o App proprietário.',
                      color: 'text-blue-400',
                    },
                    {
                      num: '03',
                      title: 'O Próximo Salto',
                      icon: Activity,
                      text: 'De descontos passivos para Hub de Saúde e Esporte integrado.',
                      color: 'text-violet-400',
                    },
                  ].map((axis) => (
                    <div key={axis.num} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-violet-600/20 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-bold text-violet-300">{axis.num}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <axis.icon className={`w-3 h-3 ${axis.color}`} />
                          <span className="text-xs font-semibold text-white">{axis.title}</span>
                        </div>
                        <p className="text-[10px] text-cyan-200/40 leading-relaxed">{axis.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-cyan-200/20 mt-4 border-t border-white/5 pt-3 leading-relaxed">
                  Insights gerados através do processamento de milhares de interações digitais do
                  ecossistema OAB/CAA Nacional.
                </p>
              </GlassCard>
            </motion.div>

            {/* Token strategy highlight */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-5 border border-emerald-500/15">
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-semibold text-white">Token como Cavalo de Troia</h4>
                </div>
                <div className="space-y-2">
                  {[
                    { step: '1', label: 'A Dor Prática', desc: 'Token obrigatório para assinar processos' },
                    { step: '2', label: 'A Condição', desc: 'Renovação atrelada ao App CAA-PB' },
                    { step: '3', label: 'A Descoberta', desc: 'Usuário exposto a toda a rede de benefícios' },
                  ].map((s) => (
                    <div key={s.step} className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-[9px] font-bold text-emerald-300">{s.step}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-semibold text-emerald-300">{s.label}: </span>
                        <span className="text-[10px] text-cyan-200/40">{s.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                  <p className="text-[10px] text-emerald-300/60 leading-relaxed">
                    Impacto: ferramenta de marketing direto a custo zero, transformando 24k advogados
                    em Usuários Ativos Mensais (MAU).
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
