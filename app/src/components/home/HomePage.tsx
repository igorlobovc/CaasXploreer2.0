import { ComoFuncionaSection } from './ComoFuncionaSection';
import { CronogramaSection } from './CronogramaSection';
import { EvidenciaPublicaSection } from './EvidenciaPublicaSection';
import { ExemploTecnicoSection } from './ExemploTecnicoSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { StateEvidenceView } from '../evidence/StateEvidenceView';
import { ParaibaSpotlight } from '../state/ParaibaSpotlight';
import { ProvisionalSimulationResultsSection } from './provisional/ProvisionalSimulationResultsSection';
import { ServicosMapeadosSection } from './ServicosMapeadosSection';
import { TecnologiaSection } from './TecnologiaSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <ComoFuncionaSection />
      <ServicosMapeadosSection />
      <ParaibaSpotlight />
      <StateEvidenceView />
      <EvidenciaPublicaSection />
      <ProvisionalSimulationResultsSection />
      <ExemploTecnicoSection />
      <TecnologiaSection />
      <CronogramaSection />
      <FooterSection />
    </div>
  );
}
