import { ComoFuncionaSection } from './ComoFuncionaSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { ParaibaSpotlight } from '../state/ParaibaSpotlight';
import { ExploreAgoraSection } from './ExploreAgoraSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <ComoFuncionaSection />
      <ParaibaSpotlight />
      <ExploreAgoraSection />
      <FooterSection />
    </div>
  );
}
