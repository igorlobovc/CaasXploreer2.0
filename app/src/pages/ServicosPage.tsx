import { Navbar, PageBackground } from '@/components/shared';
import { ServicosMapeadosSection } from '@/components/home/ServicosMapeadosSection';

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <PageBackground />
      <Navbar />
      <main className="relative z-10 pt-16">
        <ServicosMapeadosSection />
      </main>
    </div>
  );
}
