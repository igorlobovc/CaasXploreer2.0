import { BrainCircuit, Globe, Rocket, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const insightCards = [
  {
    icon: TrendingUp,
    title: 'Panorama estratégico',
    text: 'Mapeamento nacional de serviços, adesão digital e lacunas regionais para apoiar decisões orientadas por impacto.',
  },
  {
    icon: BrainCircuit,
    title: 'Inteligência aplicada',
    text: 'Leituras comparáveis por categoria com critérios auditáveis, viabilizando priorização de iniciativas com menor risco.',
  },
  {
    icon: Globe,
    title: 'Cobertura e equidade',
    text: 'Insights para ampliar acesso da advocacia com foco em inclusão, capilaridade e consistência da experiência.',
  },
  {
    icon: Rocket,
    title: 'Roadmap de evolução',
    text: 'Frentes de curto e médio prazo para transformar evidências em entregas operacionais e governança contínua.',
  },
];

export function StrategicInsightsSection() {
  return (
    <section id="insights" className="relative z-10 py-24 sm:py-28">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-10 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300/80">Strategic Insights</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-cyan-300 glow-text-cyan">Conteúdo adicionado da apresentação</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base text-[#94A3B8]">
            Consolidamos pontos-chave do material de advocacy em blocos acionáveis para leitura executiva rápida no
            homepage.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {insightCards.map(({ icon: Icon, title, text }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-cyan-400/20 bg-[#111827]/85 p-8 shadow-lg shadow-cyan-500/20"
            >
              <div className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 p-2.5">
                <Icon className="h-5 w-5 text-cyan-200" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold text-white">{title}</h3>
              <p className="text-base leading-relaxed text-[#94A3B8]">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
