import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AnalyticsPage from './pages/AnalyticsPage.tsx'
import EvidenciasPage from './pages/EvidenciasPage.tsx'
import RankingPage from './pages/RankingPage.tsx'
import ServicosPage from './pages/ServicosPage.tsx'
import EstadosPage from './pages/EstadosPage.tsx'
import EstadoDetailPage from './pages/EstadoDetailPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/evidencias" element={<EvidenciasPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/servicos" element={<ServicosPage />} />
        <Route path="/estados" element={<EstadosPage />} />
        <Route path="/estados/:uf" element={<EstadoDetailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
