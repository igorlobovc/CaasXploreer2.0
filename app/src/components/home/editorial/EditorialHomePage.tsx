import { HomeBackground } from '../HomeBackground';
import { EditorialNavbar } from './EditorialNavbar';
import { HeroCoverSection } from './HeroCoverSection';
import { PanoramaExecutivoSection } from './PanoramaExecutivoSection';
import { MobilizaAdvocaciaSection } from './MobilizaAdvocaciaSection';
import { ParaibaPerspectivaSection } from './ParaibaPerspectivaSection';
import { CaudaLongaBeneficiosSection } from './CaudaLongaBeneficiosSection';
import { RelatorioIntelligenciaSection } from './RelatorioIntelligenciaSection';
import { FanpageKarmaSection } from './FanpageKarmaSection';
import { CAADirectorySection } from './CAADirectorySection';
import { EditorialFooterSection } from './EditorialFooterSection';

export function EditorialHomePage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-white overflow-x-hidden">
      <HomeBackground />
      <EditorialNavbar />
      <main>
        <div id="hero"><HeroCoverSection /></div>
        <div id="panorama"><PanoramaExecutivoSection /></div>
        <div id="mobiliza"><MobilizaAdvocaciaSection /></div>
        <div id="paraiba"><ParaibaPerspectivaSection /></div>
        <div id="cauda-longa"><CaudaLongaBeneficiosSection /></div>
        <div id="relatorio"><RelatorioIntelligenciaSection /></div>
        <div id="diretorio"><CAADirectorySection /></div>
        <div id="fanpagekarma"><FanpageKarmaSection /></div>
      </main>
      <EditorialFooterSection />
    </div>
  );
}
