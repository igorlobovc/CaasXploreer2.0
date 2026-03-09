// ============================================================
// PAGE: /servicos — Taxonomia de serviços mapeados
// ============================================================

import { Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { Navbar, PageBackground } from '../components/shared';
import { ServiceTaxonomySection } from '../components/services/ServiceTaxonomySection';

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <main className="relative z-10 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 mb-4 mt-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono text-cyan-300/70 uppercase tracking-wider">SERVIÇOS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Taxonomia de Serviços</h1>
          <p className="text-cyan-200/60 text-sm max-w-xl">
            Catálogo completo dos serviços institucionais mapeados por categoria e subcategoria.
          </p>
        </motion.div>

        <ServiceTaxonomySection />
      </main>
    </div>
  );
}
