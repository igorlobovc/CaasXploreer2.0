import { ComoFuncionaSection } from './ComoFuncionaSection';
import { CronogramaSection } from './CronogramaSection';
import { EvidenciaPublicaSection } from './EvidenciaPublicaSection';
import { ExemploTecnicoSection } from './ExemploTecnicoSection';
import { EvidenceTeaserSection } from './EvidenceTeaserSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { ParaibaSpotlight } from '../state/ParaibaSpotlight';
import { ServiceTaxonomySection } from '../services/ServiceTaxonomySection';
import { ServicosTeaserSection } from './ServicosTeaserSection';
import { ProvisionalSimulationResultsSection } from './provisional/ProvisionalSimulationResultsSection';
import { TecnologiaSection } from './TecnologiaSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <ComoFuncionaSection />
      <ServiceTaxonomySection />
      <EvidenceTeaserSection />
      <ServicosTeaserSection />
      <EvidenciaPublicaSection />
      <ProvisionalSimulationResultsSection />
      <ParaibaSpotlight />
      <ExemploTecnicoSection />
      <TecnologiaSection />
      <CronogramaSection />
      <FooterSection />
    </div>
  );
}
