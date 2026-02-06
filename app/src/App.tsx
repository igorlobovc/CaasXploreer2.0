import { useEffect, useRef, useState } from 'react';
import { 
  Database, CheckCircle2, 
  Radio, Target, BarChart, 
  Search, Filter,
  ArrowRight, ExternalLink, Heart, Stethoscope, 
  Calendar, Trophy, Sparkles, Zap, Code, Cpu, GitBranch,
  TrendingUp, Activity, Clock, Shield, Server,
  Terminal, FileJson, SearchCode, Layout, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';

// ============================================
// TYPES
// ============================================
interface AcaoInstitucional {
  id: string;
  entity: string;
  uf: string;
  category: string;
  title: string;
  description: string;
  source_url?: string;
  evidence_level: string;
  data_origin: string[];
  icon: React.ReactNode;
  benchmark?: boolean;
}

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'final';
}

interface ServicoCategoria {
  categoria: string;
  count: string;
  examples: string[];
}

// ============================================
// DATA - AÇÕES INSTITUCIONAIS COM EVIDÊNCIA
// ============================================
const acoesInstitucionais: AcaoInstitucional[] = [
  {
    id: '1',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'SAÚDE',
    title: 'Vacinação da Advocacia',
    description: 'Campanhas de vacinação voltadas exclusivamente à advocacia paraibana, realizadas em parceria com a OAB-PB. Ação recorrente com alto engajamento institucional.',
    source_url: 'https://www.oabpb.org.br',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia', 'registro'],
    icon: <Stethoscope className="w-5 h-5" />,
    benchmark: true
  },
  {
    id: '2',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BEM-ESTAR',
    title: 'Jogos de Verão da Advocacia',
    description: 'Evento esportivo anual que reúne a advocacia paraibana em celebração ao esporte e união da classe. Alto impacto simbólico e integração.',
    source_url: 'https://www.oabpb.org.br/post/sucesso-total-jogos-de-ver%C3%A3o',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    icon: <Trophy className="w-5 h-5" />
  },
  {
    id: '3',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BEM-ESTAR',
    title: 'Circuito de Corrida de Rua',
    description: 'Circuito de corrida de rua da advocacia paraibana com múltiplas etapas ao longo do ano. Consolidação de evento institucional recorrente.',
    source_url: 'https://www.oabpb.org.br/post/circuito-de-corrida',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '4',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BENEFÍCIOS',
    title: 'Descontos em Eventos Culturais',
    description: 'Descontos exclusivos de 20% em abadás e eventos culturais para advogados, divulgados via aplicativo oficial. Benefício não-transacional de alto valor.',
    evidence_level: 'confirmado',
    data_origin: ['app', 'site'],
    icon: <Sparkles className="w-5 h-5" />
  },
  {
    id: '5',
    entity: 'CAA-PB',
    uf: 'PB',
    category: 'BENEFÍCIOS',
    title: 'Saúde Pet - Plano Pet Top',
    description: 'Convênio de saúde pet com 40+ clínicas credenciadas na Paraíba e condições especiais para advogados. Diferencial competitivo identificado.',
    evidence_level: 'confirmado',
    data_origin: ['site', 'app'],
    icon: <Heart className="w-5 h-5" />
  },
  {
    id: '6',
    entity: 'CAAPE',
    uf: 'PE',
    category: 'SAÚDE',
    title: 'Vacinação da Advocacia',
    description: 'Ações de vacinação realizadas nos pontos de atendimento da CAAPE, como o posto da Joana Bezerra. Presença institucional validada.',
    source_url: 'https://www.oabpe.org.br/noticias/vacinacao',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    icon: <Stethoscope className="w-5 h-5" />
  },
  {
    id: '7',
    entity: 'CAAPE',
    uf: 'PE',
    category: 'BEM-ESTAR',
    title: 'Corrida da OAB-PE',
    description: 'Evento esportivo anual que reúne a advocacia pernambucana no Recife para corrida e integração. Evento consolidado no calendário institucional.',
    source_url: 'https://www.oabpe.org.br/noticias/corrida',
    evidence_level: 'confirmado',
    data_origin: ['site', 'notícia'],
    icon: <Trophy className="w-5 h-5" />
  }
];

// ============================================
// DATA - SERVIÇOS POR CATEGORIA (TAXONOMIA)
// ============================================
const servicosPorCategoria: ServicoCategoria[] = [
  {
    categoria: 'Saúde',
    count: '40+',
    examples: ['Vacinação', 'Plano de Saúde', 'Odontologia', 'Saúde Mental', 'Saúde Pet']
  },
  {
    categoria: 'Benefícios',
    count: '30+',
    examples: ['Convênios', 'Descontos', 'Clube de Vantagens', 'Turismo', 'Educação']
  },
  {
    categoria: 'Financeiro',
    count: '20+',
    examples: ['Auxílios', 'Crédito Consignado', 'Previdência', 'Anuidade']
  },
  {
    categoria: 'Esporte e Bem-estar',
    count: '15+',
    examples: ['Eventos Esportivos', 'Academias', 'Modalidades', 'Integração']
  },
  {
    categoria: 'Infraestrutura',
    count: '15+',
    examples: ['Coworking', 'Certificado Digital', 'Espaços Físicos', 'Apoio Operacional']
  }
];

// ============================================
// DATA - TIMELINE DE ENTREGA
// ============================================
const timelineEvents: TimelineEvent[] = [
  {
    date: '28 Jan 2026',
    title: 'Início do Projeto',
    description: 'Mapeamento institucional e definição de escopo analítico',
    status: 'completed'
  },
  {
    date: '01 Fev 2026',
    title: 'Consolidação Conceitual',
    description: 'Estruturação da taxonomia canônica e queries booleanas',
    status: 'completed'
  },
  {
    date: '06 Fev 2026',
    title: 'Base Operacional',
    description: 'Taxonomia validada e pipeline de dados operacional',
    status: 'current'
  },
  {
    date: '21–28 Fev 2026',
    title: 'Entrega Final',
    description: 'Relatório técnico consolidado e datasets auditáveis',
    status: 'final'
  }
];

// ============================================
// VIDEO BACKGROUND WITH ANIMATED ORBS
// ============================================
function VideoBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden z-0">
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, 0, -30, 0], y: [0, 30, 60, 20, 0], scale: [1, 1.1, 0.95, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, rgba(0, 100, 200, 0.05) 50%, transparent 70%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ x: [0, -40, 0, 30, 0], y: [0, -50, -20, -40, 0], scale: [1, 0.9, 1.15, 1, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[10%] -right-[15%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(88, 28, 135, 0.05) 50%, transparent 70%)', filter: 'blur(80px)' }}
        />
        <motion.div
          animate={{ x: [0, 30, -20, 40, 0], y: [0, -30, 20, -10, 0], scale: [1, 1.2, 0.9, 1.1, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, rgba(29, 78, 216, 0.03) 50%, transparent 70%)', filter: 'blur(70px)' }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]/90" />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(0, 212, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.5) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
    </div>
  );
}

// ============================================
// CENTERED RADAR BACKGROUND
// ============================================
function CenteredRadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    let lastTime = 0;
    let pulsePhase = 0;
    let sweepAngle = 0;

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;
      pulsePhase = (pulsePhase + delta * 0.00015) % 1;
      sweepAngle = (sweepAngle + delta * 0.0001) % (Math.PI * 2);

      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      for (let i = 1; i <= 8; i++) {
        const radius = 60 + i * 50;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.04 + i * 0.003})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.stroke();

      for (let angle = 0; angle < 360; angle += 45) {
        const rad = (angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(rad) * 500, centerY + Math.sin(rad) * 500);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.03)';
        ctx.stroke();
      }

      const pulseCount = 3;
      for (let i = 0; i < pulseCount; i++) {
        const pulseOffset = (pulsePhase + i / pulseCount) % 1;
        const pulseRadius = 80 + pulseOffset * 350;
        const alpha = (1 - pulseOffset) * 0.12;
        ctx.beginPath();
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(sweepAngle);
      const sweepGradient = ctx.createLinearGradient(0, 0, 400, 0);
      sweepGradient.addColorStop(0, 'rgba(0, 212, 255, 0)');
      sweepGradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.15)');
      sweepGradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 400, -0.12, 0.12);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" style={{ opacity: 0.9 }} />;
}

// ============================================
// GLASS CARD COMPONENT
// ============================================
function GlassCard({ children, className = '', hover = false }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`backdrop-blur-xl bg-[#0a1628]/60 border border-cyan-500/20 ${hover ? 'hover:border-cyan-400/40 hover:bg-[#0a1628]/70' : ''} transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

// ============================================
// RADAR SYMBOL COMPONENT
// ============================================
function RadarSymbol({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <line x1="24" y1="4" x2="24" y2="12" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="24" y1="36" x2="24" y2="44" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="4" y1="24" x2="12" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="36" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" />
      <line x1="9.86" y1="9.86" x2="15.51" y2="15.51" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="32.49" y1="32.49" x2="38.14" y2="38.14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="38.14" y1="9.86" x2="32.49" y2="15.51" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
      <line x1="15.51" y1="32.49" x2="9.86" y2="38.14" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
    </svg>
  );
}

// ============================================
// HERO SECTION
// ============================================
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-3 sm:gap-4">
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
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-6 space-y-6 sm:space-y-8">
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

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-6">
            <MetricsPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
          { label: 'COBERTURA', value: 'NACIONAL' }
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
// COMO FUNCIONA SECTION - 4 ETAPAS
// ============================================
function ComoFuncionaSection() {
  const etapas = [
    {
      numero: '01',
      titulo: 'Coleta Estruturada',
      descricao: 'Varredura controlada de fontes institucionais e públicas, com captura validada de páginas, notícias e registros oficiais.',
      icon: <Search className="w-6 h-6" />
    },
    {
      numero: '02',
      titulo: 'Classificação Canônica',
      descricao: 'Enquadramento de cada serviço em taxonomia nacional padronizada, permitindo comparação objetiva entre estados.',
      icon: <Filter className="w-6 h-6" />
    },
    {
      numero: '03',
      titulo: 'Evidência Pública',
      descricao: 'Consolidação de sinais externos (notícias, menções e registros públicos) para validação de impacto não-transacional.',
      icon: <Eye className="w-6 h-6" />
    },
    {
      numero: '04',
      titulo: 'Leitura Comparativa',
      descricao: 'Análise por UF, região e porte institucional, revelando diferenciais, lacunas e benchmarks nacionais.',
      icon: <BarChart className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
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
// SERVIÇOS MAPEADOS SECTION
// ============================================
function ServicosMapeadosSection() {
  const [regiaoAtiva, setRegiaoAtiva] = useState<string | null>(null);
  const regioes = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Database className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">TAXONOMIA CANÔNICA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Serviços Mapeados</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Serviços institucionais identificados e classificados por categoria, com base em evidência pública e documentação oficial.
          </p>
        </motion.div>

        {/* Filtro por Região */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setRegiaoAtiva(null)}
            className={`px-3 py-1.5 text-xs rounded border transition-colors ${
              regiaoAtiva === null 
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' 
                : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'
            }`}
          >
            Todas
          </button>
          {regioes.map(regiao => (
            <button
              key={regiao}
              onClick={() => setRegiaoAtiva(regiao)}
              className={`px-3 py-1.5 text-xs rounded border transition-colors ${
                regiaoAtiva === regiao 
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' 
                  : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'
              }`}
            >
              {regiao}
            </button>
          ))}
        </div>

        {/* Cards de Categorias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {servicosPorCategoria.map((cat, i) => (
            <motion.div
              key={cat.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{cat.categoria}</h3>
                  <span className="text-2xl font-bold text-cyan-400">{cat.count}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.examples.map((ex, idx) => (
                    <span key={idx} className="text-[10px] text-cyan-200/60 bg-cyan-500/10 px-2 py-1 rounded">
                      {ex}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-xs text-cyan-200/40 text-center">
          * Valores estimados a partir de consolidação de fontes públicas inspecionadas
        </p>
      </div>
    </section>
  );
}

// ============================================
// EVIDÊNCIA PÚBLICA SECTION
// ============================================
function EvidenciaPublicaSection() {
  const [filterUF, setFilterUF] = useState<string | null>(null);
  const ufs = [...new Set(acoesInstitucionais.map(a => a.uf))];
  const filteredAcoes = filterUF ? acoesInstitucionais.filter(a => a.uf === filterUF) : acoesInstitucionais;

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">AÇÕES INSTITUCIONAIS E EVIDÊNCIA PÚBLICA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Iniciativas Não-Transacionais</h2>
          <p className="text-cyan-200/60 max-w-3xl text-sm sm:text-base">
            Ações institucionais que geram alto impacto simbólico, produzem buzz social e fortalecem a imagem institucional.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setFilterUF(null)} className={`px-3 py-1.5 text-xs rounded border transition-colors ${filterUF === null ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'}`}>Todas</button>
          {ufs.map(uf => (
            <button key={uf} onClick={() => setFilterUF(uf)} className={`px-3 py-1.5 text-xs rounded border transition-colors ${filterUF === uf ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300' : 'bg-transparent border-cyan-500/20 text-cyan-200/50 hover:border-cyan-400/30'}`}>{uf}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAcoes.map((acao, i) => (
            <motion.div key={acao.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-4 sm:p-5 h-full" hover>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
                    {acao.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] px-2 py-0.5 bg-cyan-500/10 text-cyan-300 rounded">{acao.uf}</span>
                      {acao.benchmark && <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">benchmark</span>}
                    </div>
                    <h3 className="text-sm sm:text-base font-medium text-white">{acao.title}</h3>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-cyan-200/60 mb-4 leading-relaxed">{acao.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-cyan-500/10">
                  <div className="flex flex-wrap gap-1">
                    {acao.data_origin.map((origin, idx) => (
                      <span key={idx} className="text-[9px] text-cyan-300/40 bg-cyan-500/5 px-1.5 py-0.5 rounded">{origin}</span>
                    ))}
                  </div>
                  {acao.source_url && (
                    <a href={acao.source_url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
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
// SIMULAÇÃO DE RESULTADOS SECTION
// ============================================
function SimulacaoResultadosSection() {
  // Dados simulados: 24 meses (Fev/2024 → Fev/2026)
  // Cada barra tem volume total variável + proporções de sentimento variáveis
  const dadosGrafico = [
    { volume: 45, neutro: 58, positivo: 32, negativo: 10 },
    { volume: 52, neutro: 55, positivo: 35, negativo: 10 },
    { volume: 38, neutro: 62, positivo: 28, negativo: 10 },
    { volume: 61, neutro: 50, positivo: 40, negativo: 10 },
    { volume: 48, neutro: 57, positivo: 33, negativo: 10 },
    { volume: 72, neutro: 48, positivo: 42, negativo: 10 },
    { volume: 55, neutro: 60, positivo: 30, negativo: 10 },
    { volume: 42, neutro: 54, positivo: 36, negativo: 10 },
    { volume: 68, neutro: 52, positivo: 38, negativo: 10 },
    { volume: 51, neutro: 59, positivo: 31, negativo: 10 },
    { volume: 64, neutro: 47, positivo: 43, negativo: 10 },
    { volume: 47, neutro: 61, positivo: 29, negativo: 10 },
    { volume: 58, neutro: 53, positivo: 37, negativo: 10 },
    { volume: 75, neutro: 49, positivo: 41, negativo: 10 },
    { volume: 44, neutro: 56, positivo: 34, negativo: 10 },
    { volume: 62, neutro: 51, positivo: 39, negativo: 10 },
    { volume: 53, neutro: 63, positivo: 27, negativo: 10 },
    { volume: 69, neutro: 46, positivo: 44, negativo: 10 },
    { volume: 49, neutro: 58, positivo: 32, negativo: 10 },
    { volume: 66, neutro: 55, positivo: 35, negativo: 10 },
    { volume: 41, neutro: 60, positivo: 30, negativo: 10 },
    { volume: 73, neutro: 52, positivo: 38, negativo: 10 },
    { volume: 56, neutro: 57, positivo: 33, negativo: 10 },
    { volume: 60, neutro: 54, positivo: 36, negativo: 10 },
  ];

  // Dados para gráfico de linha - Evolução temporal por tema
  const dadosLinha = [
    { mes: 'Jan/24', saude: 45, beneficios: 32 },
    { mes: 'Fev/24', saude: 52, beneficios: 38 },
    { mes: 'Mar/24', saude: 48, beneficios: 35 },
    { mes: 'Abr/24', saude: 61, beneficios: 42 },
    { mes: 'Mai/24', saude: 55, beneficios: 39 },
    { mes: 'Jun/24', saude: 68, beneficios: 45 },
    { mes: 'Jul/24', saude: 72, beneficios: 48 },
    { mes: 'Ago/24', saude: 64, beneficios: 44 },
    { mes: 'Set/24', saude: 58, beneficios: 41 },
    { mes: 'Out/24', saude: 75, beneficios: 52 },
    { mes: 'Nov/24', saude: 69, beneficios: 49 },
    { mes: 'Dez/24', saude: 62, beneficios: 46 },
    { mes: 'Jan/25', saude: 71, beneficios: 51 },
    { mes: 'Fev/25', saude: 66, beneficios: 48 },
    { mes: 'Mar/25', saude: 78, beneficios: 55 },
    { mes: 'Abr/25', saude: 73, beneficios: 53 },
    { mes: 'Mai/25', saude: 81, beneficios: 58 },
    { mes: 'Jun/25', saude: 76, beneficios: 54 },
    { mes: 'Jul/25', saude: 84, beneficios: 61 },
    { mes: 'Ago/25', saude: 79, beneficios: 57 },
    { mes: 'Set/25', saude: 87, beneficios: 63 },
    { mes: 'Out/25', saude: 82, beneficios: 59 },
    { mes: 'Nov/25', saude: 91, beneficios: 66 },
    { mes: 'Dez/25', saude: 86, beneficios: 62 },
  ];

  // Dados para gráfico horizontal - Distribuição de fontes por entidade
  const dadosEntidades = [
    { nome: 'CAAPB', instagram: 25, facebook: 18, portais: 35, blogs: 12, outros: 10 },
    { nome: 'CAASP', instagram: 15, facebook: 12, portais: 48, blogs: 15, outros: 10 },
    { nome: 'CAAPE', instagram: 20, facebook: 15, portais: 28, blogs: 22, outros: 15 },
    { nome: 'CAAAL', instagram: 18, facebook: 14, portais: 32, blogs: 18, outros: 18 },
    { nome: 'CAAAP', instagram: 22, facebook: 16, portais: 30, blogs: 16, outros: 16 },
  ];

  const maxVolume = Math.max(...dadosLinha.map(d => Math.max(d.saude, d.beneficios)));

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">SINAL EXTERNO</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-2 sm:mb-3">Evidência de Repercussão</h2>
          <div className="mb-3 sm:mb-4">
            <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider">Base Operacional</span>
            <p className="text-sm text-cyan-200/60 mt-1">
              Taxonomia validada e pipeline de dados em atualização contínua.
            </p>
          </div>
          <p className="text-cyan-200/60 max-w-3xl text-sm sm:text-base">
            Leitura de repercussão externa baseada em consultas temáticas estruturadas. Repercussão na mídia e redes sociais, medida por tema como um todo ou por região.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {[
            { label: 'Menções Totais', value: '247', sub: 'volume consolidado' },
            { label: 'Intensidade Média por Tema', value: '34', sub: 'por tema' },
            { label: 'Densidade de Sinais', value: 'Alta', sub: 'presença confirmada' },
            { label: 'Sentimento Predominante', value: 'Neutro / Positivo', sub: 'predominante' }
          ].map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <GlassCard className="p-3 sm:p-4 text-center h-full flex flex-col justify-center min-h-[100px]">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">{kpi.value}</div>
                <div className="text-[11px] sm:text-xs text-cyan-200/70 leading-tight">{kpi.label}</div>
                <div className="text-[9px] sm:text-[10px] text-cyan-200/40 mt-1">{kpi.sub}</div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Gráfico Stacked - Volume Relativo */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mb-8">
          <GlassCard className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm sm:text-base font-medium text-white">Volume Relativo por Janela de Consulta</h3>
            </div>
            
            {/* Grid de fundo */}
            <div className="relative">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-cyan-500/10 w-full" style={{ height: '20%' }} />
                ))}
              </div>
              
              {/* Barras Stacked com variação de altura */}
              <div className="h-48 sm:h-64 flex items-end gap-[2px] sm:gap-1 relative z-10">
                {dadosGrafico.map((dado, i) => (
                  <motion.div
                    key={i}
 initial={{ opacity: 0, height: 0 }}
                    whileInView={{ opacity: 1, height: `${dado.volume}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
                    className="flex-1 flex flex-col justify-end"
                  >
                    {/* Negativo (vermelho) - topo */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.15 + i * 0.03 }}
                      style={{ height: `${dado.negativo}%` }}
                      className="w-full bg-rose-500/70 origin-bottom rounded-t-[1px]"
                    />
                    {/* Positivo (verde) - meio */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.08 + i * 0.03 }}
                      style={{ height: `${dado.positivo}%` }}
                      className="w-full bg-emerald-500/70 origin-bottom"
                    />
                    {/* Neutro (azul) - base */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.03 }}
                      style={{ height: `${dado.neutro}%` }}
                      className="w-full bg-cyan-500/70 origin-bottom rounded-b-[2px]"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Eixo temporal */}
            <div className="flex justify-between mt-4 text-[10px] sm:text-xs text-cyan-200/50 font-mono">
              <span>Fev/2024</span>
              <span>Fev/2026</span>
            </div>
            
            {/* Legenda */}
            <div className="mt-6 pt-4 border-t border-cyan-500/20">
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-cyan-500/70" />
                  <span className="text-xs text-cyan-200/70">Neutro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500/70" />
                  <span className="text-xs text-cyan-200/70">Positivo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-rose-500/70" />
                  <span className="text-xs text-cyan-200/70">Negativo</span>
                </div>
              </div>
              <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                Dados simulados para demonstração analítica
              </p>
              <p className="text-center text-[9px] text-cyan-200/30 mt-1">
                Base operacional: taxonomia validada e pipeline de dados em atualização
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* NOVA SUBSEÇÃO: COMPARATIVOS ANALÍTICOS */}
        <div className="mt-12 sm:mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">Comparativos Analíticos</h3>
            <p className="text-sm text-cyan-200/60">
              Leitura comparativa de repercussão por tema e por entidade de assistência.
            </p>
          </motion.div>

          {/* Gráfico 1: Evolução Temporal de Menções (Linha) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mb-8">
            <GlassCard className="p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-medium text-white mb-2">Evolução Temporal de Menções por Tema</h4>
              <p className="text-xs text-cyan-200/50 mb-6">
                Comparativo da evolução de menções por grandes temas de assistência à advocacia em nível nacional, agregando sinais de mídia e redes sociais ao longo do tempo.
              </p>
              
              {/* Line Chart */}
              <div className="relative h-56 sm:h-72">
                {/* Grid de fundo */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-cyan-500/10 w-full" />
                  ))}
                </div>
                
                {/* Linhas SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${dadosLinha.length - 1} 100`} preserveAspectRatio="none">
                  {/* Linha SAÚDE (azul) */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    d={`M${dadosLinha.map((d, i) => `${i},${100 - (d.saude / maxVolume) * 80}`).join(' L')}`}
                    fill="none"
                    stroke="rgb(6, 182, 212)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Linha BENEFÍCIOS (laranja) */}
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                    d={`M${dadosLinha.map((d, i) => `${i},${100 - (d.beneficios / maxVolume) * 80}`).join(' L')}`}
                    fill="none"
                    stroke="rgb(251, 146, 60)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                
                {/* Pontos de dados */}
                <div className="absolute inset-0 flex items-end justify-between px-0">
                  {dadosLinha.map((dado, i) => (
                    <div key={i} className="flex-1 relative h-full">
                      {/* Ponto SAÚDE */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.5 + i * 0.04 }}
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                        style={{ bottom: `${(dado.saude / maxVolume) * 80}%`, left: '50%', transform: 'translateX(-50%)' }}
                        title={`${dado.mes}: Saúde ${dado.saude} menções`}
                      />
                      {/* Ponto BENEFÍCIOS */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.6 + i * 0.04 }}
                        className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full"
                        style={{ bottom: `${(dado.beneficios / maxVolume) * 80}%`, left: '50%', transform: 'translateX(-50%)' }}
                        title={`${dado.mes}: Benefícios ${dado.beneficios} menções`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Eixo temporal */}
              <div className="flex justify-between mt-4 text-[10px] sm:text-xs text-cyan-200/50 font-mono">
                <span>Jan/2024</span>
                <span>Dez/2025</span>
              </div>
              
              {/* Legenda */}
              <div className="mt-4 pt-4 border-t border-cyan-500/20">
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-xs text-cyan-200/70">SAÚDE & BEM-ESTAR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-400" />
                    <span className="text-xs text-cyan-200/70">BENEFÍCIOS & CONVÊNIOS</span>
                  </div>
                </div>
                <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                  Dados simulados para demonstração analítica nacional (2024–2025)
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Gráfico 2: Distribuição de Fontes por Entidade (Barras Horizontais) */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <GlassCard className="p-4 sm:p-6">
              <h4 className="text-sm sm:text-base font-medium text-white mb-2">Distribuição de Fontes por Entidade</h4>
              <p className="text-xs text-cyan-200/50 mb-6">
                Distribuição relativa das fontes de menções por entidade de assistência, permitindo leitura comparativa de presença e visibilidade externa.
              </p>
              
              {/* Barras Horizontais */}
              <div className="space-y-3 sm:space-y-4">
                {dadosEntidades.map((entidade, i) => {
                  const total = entidade.instagram + entidade.facebook + entidade.portais + entidade.blogs + entidade.outros;
                  return (
                    <motion.div
                      key={entidade.nome}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-xs sm:text-sm text-cyan-200/70 w-16 sm:w-20 flex-shrink-0">{entidade.nome}</span>
                      <div className="flex-1 h-6 sm:h-8 flex rounded overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.instagram / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                          className="h-full bg-pink-500/70"
                          title={`Instagram: ${entidade.instagram}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.facebook / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                          className="h-full bg-blue-500/70"
                          title={`Facebook: ${entidade.facebook}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.portais / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                          className="h-full bg-cyan-500/70"
                          title={`Portais: ${entidade.portais}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.blogs / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
                          className="h-full bg-emerald-500/70"
                          title={`Blogs: ${entidade.blogs}%`}
                        />
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(entidade.outros / total) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                          className="h-full bg-slate-500/70"
                          title={`Outros: ${entidade.outros}%`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Legenda */}
              <div className="mt-6 pt-4 border-t border-cyan-500/20">
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-pink-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Instagram</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-blue-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Facebook</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-cyan-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Portais</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-emerald-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Blogs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded bg-slate-500/70" />
                    <span className="text-[10px] sm:text-xs text-cyan-200/70">Outros</span>
                  </div>
                </div>
                <p className="text-center text-[10px] text-cyan-200/40 mt-3">
                  Fontes agregadas | Dados simulados para visualização comparativa
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Texto de Contexto */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-8">
            <GlassCard className="p-4 sm:p-6">
              <p className="text-sm text-cyan-200/70 leading-relaxed">
                Os comparativos evidenciam diferenças estruturais de visibilidade externa entre entidades, tanto em volume absoluto quanto em diversidade de fontes. A leitura conjunta por tema e por entidade permite identificar padrões de repercussão, maturidade comunicacional e concentração de sinal.
              </p>
            </GlassCard>
          </motion.div>
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
}`
  };

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Code className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span className="text-[10px] sm:text-xs font-mono text-cyan-300/70 uppercase tracking-wider">ESTRUTURA TÉCNICA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white mb-3 sm:mb-4">Exemplo Técnico</h2>
          <p className="text-cyan-200/60 max-w-2xl text-sm sm:text-base">
            Estrutura de dados versionada, auditável e pronta para integração com pipelines analíticos.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <GlassCard className="overflow-hidden">
            {/* Tabs */}
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
                  {tab === 'json' && <span className="flex items-center gap-2"><FileJson className="w-4 h-4" /> JSON</span>}
                  {tab === 'query' && <span className="flex items-center gap-2"><SearchCode className="w-4 h-4" /> Query</span>}
                  {tab === 'schema' && <span className="flex items-center gap-2"><Terminal className="w-4 h-4" /> Schema</span>}
                </button>
              ))}
            </div>
            
            {/* Code Content */}
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
    { icon: <GitBranch className="w-5 h-5" />, title: 'Pipeline de Dados', desc: 'Fluxo automatizado de coleta, processamento e estruturação' },
    { icon: <FileJson className="w-5 h-5" />, title: 'Schema Versionado', desc: 'Taxonomia canônica nacional com controle de versão' },
    { icon: <Shield className="w-5 h-5" />, title: 'Datasets Auditáveis', desc: 'Rastreabilidade completa de fontes e transformações' },
    { icon: <Server className="w-5 h-5" />, title: 'Exportação Estruturada', desc: 'JSON, CSV e API para integração com sistemas externos' }
  ];

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
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
            <motion.div key={tech.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10 sm:mb-16">
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
          {/* Timeline Line */}
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
                {/* Dot */}
                <div className={`relative z-10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.status === 'completed' ? 'bg-emerald-500/20 border border-emerald-500/50' :
                  event.status === 'current' ? 'bg-cyan-500/20 border border-cyan-500/50' :
                  'bg-blue-500/20 border border-blue-500/50'
                }`}>
                  {event.status === 'completed' ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" /> :
                   event.status === 'current' ? <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" /> :
                   <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />}
                </div>

                {/* Content */}
                <GlassCard className="flex-1 p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                    <span className="text-xs font-mono text-cyan-400">{event.date}</span>
                    {event.status === 'current' && <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded w-fit">ATUAL</span>}
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
// FOOTER
// ============================================
function Footer() {
  return (
    <footer className="py-8 sm:py-12 border-t border-cyan-500/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-cyan-500/20 border border-cyan-400/30 rounded-lg flex items-center justify-center">
              <RadarSymbol className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-semibold text-white">CAAsXplorer</span>
              <p className="text-xs sm:text-sm text-cyan-200/50">Sistema de leitura institucional</p>
            </div>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-cyan-200/50">
            <span>Base operacional: 06/02/2026</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// MAIN APP
// ============================================
function App() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <VideoBackground />
      <CenteredRadarBackground />
      <Hero />
      <ComoFuncionaSection />
      <ServicosMapeadosSection />
      <EvidenciaPublicaSection />
      <SimulacaoResultadosSection />
      <ExemploTecnicoSection />
      <TecnologiaSection />
      <CronogramaSection />
      <Footer />
    </div>
  );
}

export default App;
