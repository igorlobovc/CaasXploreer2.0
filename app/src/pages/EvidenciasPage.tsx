import { Navbar, PageBackground } from '@/components/shared';
import { EvidenciaPublicaSection } from '@/components/home/EvidenciaPublicaSection';

export default function EvidenciasPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <PageBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        <EvidenciaPublicaSection />
      </main>
    </div>
  );
}
