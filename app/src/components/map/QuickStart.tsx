// ============================================================
// QUICK START - Exemplo mínimo para /mapa-demo
// ============================================================

import React, { useState } from 'react';
import { BrazilMap, type MapData } from './index';

// Dados mockados para demonstração
const demoData: MapData = {
  PB: { value: 76.4, label: "Paraíba", category: "alta" },
  PE: { value: 52.1, label: "Pernambuco", category: "média" },
  SP: { value: 37.4, label: "São Paulo", category: "baixa" },
  RJ: { value: 56.9, label: "Rio de Janeiro", category: "média" },
  MG: { value: 60.0, label: "Minas Gerais", category: "alta" },
  RS: { value: 77.5, label: "Rio Grande do Sul", category: "alta" },
};

export const QuickStart: React.FC = () => {
  const [selected, setSelected] = useState<string>();

  return (
    <div className="p-6 bg-slate-950 min-h-screen">
      <h1 className="text-2xl font-bold text-cyan-400 mb-4">Mapa do Brasil - Demo</h1>
      
      <BrazilMap
        data={demoData}
        mode="numeric"
        selectedUF={selected}
        onStateClick={setSelected}
        title="Interações por 1.000 Advogados"
        height={500}
      />

      {selected && (
        <div className="mt-4 p-4 bg-slate-800 rounded text-white">
          Selecionado: {selected} - {demoData[selected]?.label || 'Sem dados'}
        </div>
      )}
    </div>
  );
};

export default QuickStart;
