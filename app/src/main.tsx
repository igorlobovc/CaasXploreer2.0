import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AnalyticsPage from './pages/AnalyticsPage.tsx'
import RankingPage from './pages/RankingPage.tsx'
import EstadosPage from './pages/EstadosPage.tsx'
import EstadoDetailPage from './pages/EstadoDetailPage.tsx'
import ServicosPage from './pages/ServicosPage.tsx'
import EvidenciasPage from './pages/EvidenciasPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/ranking-v2" element={<RankingPage />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/evidencias" element={<EvidenciasPage />} />
        <Route path="/estados" element={<EstadosPage />} />
        <Route path="/estados/:uf" element={<EstadoDetailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
