import { useState } from 'react';
import {
  CheckCircle2,
  Radio,
  BarChart,
  ArrowRight,
  Code, Cpu, GitBranch,
  Activity, Clock, Shield, Server,
  Terminal, FileJson, SearchCode, Layout,
  Target, Search, Filter, Eye,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/GlassCard';
import { RadarSymbol } from '../components/RadarSymbol';
import { timelineEvents } from '../data/ranking';

// ============================================
// METRICS PANEL
// ============================================
function MetricsPanel() {
  return (
    <GlassCard className="p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span className="text-[10px] font-mono text-cyan-300/70 uppercase tracking-wider">ESTADO DO SISTEMA</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] text-emerald-400">OPERACIONAL</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'CAAs MAPEADAS', value: '27' },
          { label: 'CATEGORIAS', value: '120+' },
          { label: 'SERVIÇOS ID.', value: '1.200+' },
          { label: 'COBERTURA', value: 'NACIONAL' },
        ].map((m) => (
          <div key={m.label} className="bg-cyan-500/5 p-3 rounded border border-cyan-500/10">
            <div className="text-[9px] text-cyan-300/50 uppercase tracking-wider mb-1">{m.label}</div>
            <div className="text-xl sm:text-2xl font-semibold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap pt-2 border-t border-cyan-500/20">
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
          <span className="text-[9px] text-emerald-400">SCHEMA v2.1</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded">
          <Server className="w-3 h-3 text-blue-400" />
          <span className="text-[9px] text-blue-400">PIPELINE ATIVO</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded">
          <Shield className="w-3 h-3 text-cyan-400" />
          <span className="text-[9px] text-cyan-400">AUDITÁVEL</span>
        </div>
      </div>
    </GlassCard>
  );
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-3 sm:gap-4"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-500/20 border border-cyan-400/40 rounded-lg flex items-center justify-center">
              <RadarSymbol className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-semibold text-white tracking-tight">CAAsXplorer</span>
              <span className="text-xs sm:text-sm text-cyan-400/60 ml-2 font-mono">v2.1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-cyan-400/30 bg-cyan-500/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300 uppercase tracking-wider">Success Finder</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Busca Estruturada
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] flex items-center gap-2 sm:gap-3 mt-1">
                <span className="text-cyan-400">Estrutura</span>
                <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500/60" />
                <span className="text-blue-400">Ação</span>
              </h2>
            </div>

            <div className="space-y-4">
              <p className="text-cyan-100/80 leading-relaxed text-base sm:text-lg">
                Transforma informação dispersa em evidência estruturada.
              </p>
              <p className="text-cyan-200/50 leading-relaxed text-sm sm:text-base">
                Sinal sem ruído. Dados comparáveis sobre serviços de assistência à advocacia.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-sm text-cyan-200/70">27 CAAs mapeadas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span className="text-sm text-cyan-200/70">Taxonomia validada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-sm text-cyan-200/70">Datasets auditáveis</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-6"
          >
            <MetricsPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// COMO FUNCIONA SECTION – 4 ETAPAS
// ============================================
function ComoFuncionaSection() {
  const etapas = [
    {
      numero: '01',
      titulo: 'Coleta Estruturada',
      descricao:
        'Varredura controlada de fontes institucionais e públicas, com captura validada de páginas, notícias e registros oficiais.',
      icon: <Search className="w-6 h-6" />,
    },
    {
      numero: '02',
      titulo: 'Classificação Canônica',
      descricao:
        'Enquadramento de cada serviço em taxonomia nacional padronizada, permitindo comparação objetiva entre estados.',
      icon: <Filter className="w-6 h-6" />,
    },
    {
      numero: '03',
      titulo: 'Evidência Pública',
      descricao:
        'Consolidação de sinais externos (notícias, menções e registros públicos) para validação de impacto não-transacional.',
      icon: <Eye className="w-6 h-6" />,
    },
    {
      numero: '04',
      titulo: 'Leitura Comparativa',
      descricao:
        'Análise por UF, região e porte institucional, revelando diferenciais, lacunas e benchmarks nacionais.',
      icon: <BarChart className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Layout className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">METODOLOGIA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Como Funciona</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Pipeline de inteligência assistencial estruturado em quatro etapas operacionais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {etapas.map((etapa, i) => (
            <motion.div
              key={etapa.numero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <GlassCard className="p-5 sm:p-6 h-full hover:border-cyan-400/40" hover>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                      {etapa.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-cyan-500/40">{etapa.numero}</span>
                      <h3 className="text-lg font-semibold text-white">{etapa.titulo}</h3>
                    </div>
                    <p className="text-sm text-cyan-200/60 leading-relaxed">{etapa.descricao}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// EXEMPLO TÉCNICO SECTION
// ============================================
function ExemploTecnicoSection() {
  const [tabAtiva, setTabAtiva] = useState<'json' | 'query' | 'schema'>('json');

  const exemplos = {
    json: `{
  "uf": "PB",
  "categoria": "SAÚDE",
  "servico": "Vacinação da Advocacia",
  "evidencia": "noticia_institucional",
  "status": "confirmado",
  "benchmark": true,
  "fontes": ["site", "notícia", "registro"],
  "data_captura": "2026-02-06"
}`,
    query: `("Vacinação" OR "Vacina" OR "Imunização")
AND ("OAB-PB" OR "CAA-PB" OR "Advocacia PB")
AND ("João Pessoa" OR "Paraíba")
NOT ("Gripe comum" OR "Particular")`,
    schema: `servico: {
  id: UUID
  uf: UF_BRASIL
  categoria: CATEGORIA_TAXONOMICA
  nome: STRING
  evidencia: TIPO_EVIDENCIA
  status: confirmado|parcial|não_confirmado
  fontes: ARRAY<FONTE>
  data_captura: ISO_DATE
  metadata: {
    porte_seccional: ENUM
    densidade_adv: FLOAT
  }
}`,
  };

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">ESTRUTURA TÉCNICA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Exemplo Técnico</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Estrutura de dados versionada, auditável e pronta para integração com pipelines analíticos.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="overflow-hidden">
            <div className="flex border-b border-cyan-500/20">
              {(['json', 'query', 'schema'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTabAtiva(tab)}
                  className={`px-4 sm:px-6 py-3 text-xs sm:text-sm font-medium transition-colors ${
                    tabAtiva === tab
                      ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                      : 'text-cyan-200/50 hover:text-cyan-200/70'
                  }`}
                >
                  {tab === 'json' && (
                    <span className="flex items-center gap-2">
                      <FileJson className="w-4 h-4" /> JSON
                    </span>
                  )}
                  {tab === 'query' && (
                    <span className="flex items-center gap-2">
                      <SearchCode className="w-4 h-4" /> Query
                    </span>
                  )}
                  {tab === 'schema' && (
                    <span className="flex items-center gap-2">
                      <Terminal className="w-4 h-4" /> Schema
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 sm:p-6 bg-[#0a0f1a]/80">
              <pre className="text-xs sm:text-sm text-cyan-100/80 font-mono overflow-x-auto">
                <code>{exemplos[tabAtiva]}</code>
              </pre>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================
// TECNOLOGIA SECTION
// ============================================
function TecnologiaSection() {
  const techs = [
    {
      icon: <GitBranch className="w-5 h-5" />,
      title: 'Pipeline de Dados',
      desc: 'Fluxo automatizado de coleta, processamento e estruturação',
    },
    {
      icon: <FileJson className="w-5 h-5" />,
      title: 'Schema Versionado',
      desc: 'Taxonomia canônica nacional com controle de versão',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Datasets Auditáveis',
      desc: 'Rastreabilidade completa de fontes e transformações',
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'Exportação Estruturada',
      desc: 'JSON, CSV e API para integração com sistemas externos',
    },
  ];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">STACK TÉCNICO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Tecnologia</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Infraestrutura analítica robusta, escalável e pronta para produção.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {techs.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 flex items-start gap-4" hover>
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 flex-shrink-0">
                  {tech.icon}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-medium text-white mb-1">{tech.title}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200/60">{tech.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CRONOGRAMA / TIMELINE SECTION
// ============================================
function CronogramaSection() {
  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-16"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">ENTREGA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Linha de Entrega</h2>
          <p className="text-cyan-200/60 text-sm sm:text-base">
            O serviço se encerra com a entrega do relatório técnico consolidado.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-cyan-500/20" />

          <div className="space-y-6 sm:space-y-8">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={event.date}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative flex items-start gap-4 sm:gap-6"
              >
                <div
                  className={`relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    event.status === 'completed'
                      ? 'bg-emerald-500/20 border border-emerald-500/50'
                      : event.status === 'current'
                      ? 'bg-cyan-500/20 border border-cyan-500/50'
                      : 'bg-blue-500/20 border border-blue-500/50'
                  }`}
                >
                  {event.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                  ) : event.status === 'current' ? (
                    <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  ) : (
                    <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  )}
                </div>

                <GlassCard className="flex-1 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                    <span className="text-xs font-mono text-cyan-400">{event.date}</span>
                    {event.status === 'current' && (
                      <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded w-fit">ATUAL</span>
                    )}
                  </div>
                  <h3 className="text-base sm:text-lg font-medium text-white mb-1">{event.title}</h3>
                  <p className="text-xs sm:text-sm text-cyan-200/60">{event.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// HOME PAGE
// ============================================
export default function HomePage() {
  return (
    <>
      <Hero />
      <ComoFuncionaSection />
      <ExemploTecnicoSection />
      <TecnologiaSection />
      <CronogramaSection />
    </>
  );
}
