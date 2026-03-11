import { ComoFuncionaSection } from './ComoFuncionaSection';
import { EvidenceTeaserSection } from './EvidenceTeaserSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { ParaibaSpotlight } from '../state/ParaibaSpotlight';
import { ServiceTaxonomySection } from '../services/ServiceTaxonomySection';
import { ServicosTeaserSection } from './ServicosTeaserSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <ComoFuncionaSection />
      <ServiceTaxonomySection />
      <ParaibaSpotlight />
      <EvidenceTeaserSection />
      <ServicosTeaserSection />
      <FooterSection />
    </div>
  );
}