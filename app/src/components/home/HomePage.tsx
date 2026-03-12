import { ParaibaSpotlight } from '../state/ParaibaSpotlight';

import { PanoramaExecutivoSection } from './PanoramaExecutivoSection';
import { ExemplosLeituraSection } from './ExemplosLeituraSection';
import { ExploreAgoraSection } from './ExploreAgoraSection';
import { FooterSection } from './FooterSection';
import { HeroSection } from './HeroSection';
import { HomeBackground } from './HomeBackground';
import { MobilizacaoAdvocaciaSection } from './MobilizacaoAdvocaciaSection';

export function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <HomeBackground />
      <HeroSection />
      <PanoramaExecutivoSection />
      <MobilizacaoAdvocaciaSection />
      <ParaibaSpotlight />
      <ExemplosLeituraSection />
      <ExploreAgoraSection />
      <FooterSection />
    </div>
  );
}
