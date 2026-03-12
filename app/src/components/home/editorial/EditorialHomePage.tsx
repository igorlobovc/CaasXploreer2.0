import { HomeBackground } from '../HomeBackground';
import { EditorialNavbar } from './EditorialNavbar';
import { HeroCoverSection } from './HeroCoverSection';
import { PanoramaExecutivoSection } from './PanoramaExecutivoSection';
import { MobilizaAdvocaciaSection } from './MobilizaAdvocaciaSection';
import { ParaibaPerspectivaSection } from './ParaibaPerspectivaSection';
import { CaudaLongaBeneficiosSection } from './CaudaLongaBeneficiosSection';
import { ExploreBetaSection } from './ExploreBetaSection';
import { EditorialFooterSection } from './EditorialFooterSection';

export function EditorialHomePage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-white overflow-x-hidden">
      <HomeBackground />
      <EditorialNavbar />
      <main>
        <HeroCoverSection />
        <PanoramaExecutivoSection />
        <MobilizaAdvocaciaSection />
        <ParaibaPerspectivaSection />
        <CaudaLongaBeneficiosSection />
        <ExploreBetaSection />
      </main>
      <EditorialFooterSection />
    </div>
  );
}
