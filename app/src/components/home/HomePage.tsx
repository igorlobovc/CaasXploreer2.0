import { ComoFuncionaSection } from './ComoFuncionaSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { ExploreAgoraSection } from './ExploreAgoraSection';
import { ParaibaSpotlight } from '../state/ParaibaSpotlight';
import { ServiceTaxonomySection } from '../services/ServiceTaxonomySection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <ComoFuncionaSection />
      <ServiceTaxonomySection />
      <ParaibaSpotlight />
      <ExploreAgoraSection />
      <FooterSection />
    </div>
  );
}