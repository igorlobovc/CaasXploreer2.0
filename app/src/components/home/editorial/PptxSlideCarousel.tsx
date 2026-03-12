import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

/* ─── Slide data (faithful to the 12 PPTX slides) ─────────────────────────── */
const SLIDES = [
  /* 01 – Cover */
  {
    id: 'cover',
    tag: 'RELATÓRIO DE INTELIGÊNCIA',
    title: 'Ecossistema de Benefícios da Advocacia Brasileira',
    subtitle: 'Análise Nacional e Deep Dive Paraíba',
    accent: '#6366f1',
    content: (
      <div className="space-y-4">
        <p className="text-sm text-slate-300/80 leading-relaxed">
          Insights orientados a dados sobre serviços, engajamento e a evolução da assistência à
          advocacia no Brasil.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: '📊', label: 'Análise Quantitativa' },
            { icon: '🎯', label: 'Foco Estratégico' },
            { icon: '💡', label: 'Recomendações Acionáveis' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-white/5 border border-white/10"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] text-slate-400 text-center leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  /* 02 – Sumário */
  {
    id: 'sumario',
    tag: 'SUMÁRIO EXECUTIVO',
    title: 'Estrutura da Análise',
    subtitle: '',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-2">
        {[
          { num: '01', title: 'Contexto e Metodologia', sub: 'O Funil Analítico' },
          { num: '04', title: 'Deep Dive Paraíba', sub: 'Diagnóstico Local' },
          { num: '02', title: 'Panorama Nacional', sub: 'Demografia e Ecossistema' },
          { num: '05', title: 'Análise de Gaps', sub: 'PB vs. Benchmarks' },
          { num: '03', title: 'Engajamento Digital', sub: 'Performance e Benchmarking' },
          { num: '06', title: 'Recomendações', sub: 'Estratégias Prescritivas' },
        ].map((item) => (
          <div
            key={item.num}
            className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/5 border border-indigo-500/20"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-600/40 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-indigo-200">{item.num}</span>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white leading-tight">{item.title}</div>
              <div className="text-[9px] text-slate-400 mt-0.5">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  /* 03 – Panorama Nacional */
  {
    id: 'panorama',
    tag: 'PANORAMA NACIONAL',
    title: 'Demografia da Advocacia',
    subtitle: 'A Distribuição Demográfica dita a Escala; a Inteligência Digital nivela o Jogo',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          {[
            { state: 'SP', val: 320000, pct: 100 },
            { state: 'RJ', val: 180000, pct: 56 },
            { state: 'MG', val: 95000, pct: 30 },
            { state: 'RS', val: 88000, pct: 28 },
            { state: 'PR', val: 72000, pct: 23 },
            { state: 'PB', val: 24226, pct: 8, highlight: true },
          ].map((row) => (
            <div key={row.state} className="flex items-center gap-2">
              <span
                className={`text-[10px] font-mono w-5 ${row.highlight ? 'text-indigo-300 font-bold' : 'text-slate-400'}`}
              >
                {row.state}
              </span>
              <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`h-full rounded-full ${row.highlight ? 'bg-indigo-500' : 'bg-slate-500/60'}`}
                />
              </div>
              <span className="text-[9px] text-slate-400 w-12 text-right">
                {row.val.toLocaleString('pt-BR')}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <div className="text-xs font-mono text-indigo-300 mb-1">📍 Foco Regional: Paraíba</div>
            <div className="text-2xl font-bold text-indigo-300">24.226</div>
            <div className="text-[10px] text-slate-400">Advogados Ativos</div>
            <div className="mt-1.5 px-2 py-0.5 bg-indigo-600/20 rounded text-[9px] text-indigo-300 inline-block">
              16º maior população do país
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] font-semibold text-white mb-1">💡 Insight Estratégico</div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Escala ideal para adoção massiva de inovações digitais sem os gargalos logísticos dos
              mega-estados.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  /* 04 – Inventário de Serviços */
  {
    id: 'servicos',
    tag: 'ECOSSISTEMA DE BENEFÍCIOS',
    title: 'O Inventário de Serviços',
    subtitle: 'A Matriz do Ecossistema: A Migração para a Integração de Estilo de Vida',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-2">
        {[
          {
            icon: '❤️',
            title: 'Saúde Integrada',
            items: ['Planos de Saúde Unimed', 'Vacinação Drive-Thru', 'Telemedicina'],
          },
          {
            icon: '🏃',
            title: 'Esporte e Bem-estar',
            items: ['Parcerias Wellhub/Gympass', 'Corridas da Advocacia', 'Festivais Esportivos'],
            badge: 'TOP GROWTH',
          },
          {
            icon: '📱',
            title: 'Infraestrutura Digital',
            items: ['Certificação Digital Token', 'Aplicativo Proprietário', 'Coworking Spaces'],
          },
          {
            icon: '🛒',
            title: 'Benefícios Comerciais',
            items: ['Descontos Regionais', 'Clube de Parceiros', 'Convênios Estratégicos'],
          },
        ].map((cat) => (
          <div
            key={cat.title}
            className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20 relative"
          >
            {cat.badge && (
              <span className="absolute top-2 right-2 text-[8px] px-1.5 py-0.5 bg-indigo-600 text-white rounded font-bold">
                {cat.badge}
              </span>
            )}
            <div className="flex items-center gap-1.5 mb-2">
              <span>{cat.icon}</span>
              <span className="text-[11px] font-semibold text-white">{cat.title}</span>
            </div>
            <ul className="space-y-1">
              {cat.items.map((item) => (
                <li key={item} className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                  <span className="text-[9px] text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  /* 05 – Quadrante de Engajamento */
  {
    id: 'quadrante',
    tag: 'ANÁLISE DE REGRESSÃO',
    title: 'O Quadrante de Engajamento',
    subtitle: 'Volume vs. Valor de Marca: Entendendo o Comportamento Digital',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          {[
            { cat: 'Sorteios', x: 42, y: 13.5, size: 'lg', color: 'bg-slate-400' },
            { cat: 'Token/Digital', x: 30, y: 7.5, size: 'md', color: 'bg-indigo-500' },
            { cat: 'Esporte e Bem-estar', x: 20, y: 9, size: 'md', color: 'bg-indigo-500' },
            { cat: 'Saúde', x: 24, y: 6.5, size: 'sm', color: 'bg-indigo-500' },
            { cat: 'Eventos', x: 19, y: 6, size: 'sm', color: 'bg-indigo-500' },
            { cat: 'Coworking', x: 10, y: 3, size: 'sm', color: 'bg-slate-500' },
          ].map((dot) => (
            <div key={dot.cat} className="flex items-center gap-2">
              <div
                className={`rounded-full flex-shrink-0 ${dot.color} ${dot.size === 'lg' ? 'w-4 h-4' : dot.size === 'md' ? 'w-3 h-3' : 'w-2 h-2'}`}
              />
              <span className="text-[10px] text-slate-300">{dot.cat}</span>
              <span className="ml-auto text-[9px] text-slate-500">{dot.y}%</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20">
            <div className="text-[10px] font-semibold text-white mb-1">🏆 Esporte e Bem-estar</div>
            <p className="text-[9px] text-slate-400 leading-relaxed">
              Motor de Life Time Value. Menor volume, mas lidera em métricas de alto valor orgânico.
            </p>
            <div className="flex gap-1 mt-1.5">
              <span className="text-[8px] px-1.5 py-0.5 bg-indigo-600/30 text-indigo-300 rounded">
                Alto Valor
              </span>
              <span className="text-[8px] px-1.5 py-0.5 bg-indigo-600/30 text-indigo-300 rounded">
                Alta Retenção
              </span>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] font-semibold text-white mb-1">🎁 Sorteios</div>
            <p className="text-[9px] text-slate-400 leading-relaxed">
              Growth Hack de aquisição. Picos anômalos de comentários, mas baixa retenção.
            </p>
            <div className="flex gap-1 mt-1.5">
              <span className="text-[8px] px-1.5 py-0.5 bg-slate-600/30 text-slate-300 rounded">
                Alto Volume
              </span>
              <span className="text-[8px] px-1.5 py-0.5 bg-slate-600/30 text-slate-300 rounded">
                Baixa Retenção
              </span>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
            <p className="text-[9px] text-indigo-200/80 leading-relaxed">
              <span className="font-bold">Conclusão:</span> Atrair exige Sorteios; reter exige
              Esporte e Bem-estar.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  /* 06 – Top Performers */
  {
    id: 'top-performers',
    tag: 'BENCHMARKING NACIONAL',
    title: 'Top Performers Nacionais',
    subtitle: 'Quem define o Padrão-Ouro do Ecossistema de Benefícios',
    accent: '#6366f1',
    content: (
      <div className="space-y-3">
        {[
          {
            sigla: 'CAADF',
            estado: 'Distrito Federal',
            tag: 'Pioneiro em Inovação',
            items: [
              { icon: '🧠', title: 'Saúde Mental', sub: 'Atendimento psicológico gratuito online' },
              { icon: '🔬', title: 'Inovação Clínica', sub: 'Destaque absoluto no engajamento nacional' },
            ],
            pct: 95,
          },
          {
            sigla: 'CAACE',
            estado: 'Ceará',
            tag: 'Bem-estar Integrado',
            items: [
              { icon: '💪', title: 'Wellhub/TotalPass', sub: 'Implementação massiva de acesso' },
              { icon: '🏃', title: 'Festivais de Esporte', sub: 'Dominação através de eventos físicos' },
            ],
            pct: 92,
          },
          {
            sigla: 'CAARN',
            estado: 'Rio Grande do Norte',
            tag: 'Digitalização Avançada',
            items: [
              { icon: '📱', title: 'App CAARN', sub: 'Integrado a reserva de escritórios' },
              { icon: '%', title: 'Clube de Descontos', sub: 'Alta performance digital' },
            ],
            pct: 88,
          },
        ].map((p) => (
          <div
            key={p.sigla}
            className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-600/40 flex items-center justify-center">
                  <span className="text-[9px] font-bold text-indigo-200">{p.sigla.slice(-2)}</span>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">{p.estado}</div>
                  <div className="text-[9px] text-slate-400">{p.tag}</div>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-300">{p.pct}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${p.pct}%` }}
                transition={{ duration: 0.8 }}
                className="h-full bg-indigo-500 rounded-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {p.items.map((item) => (
                <div key={item.title} className="p-1.5 rounded bg-white/5">
                  <div className="text-[10px] font-semibold text-white">{item.title}</div>
                  <div className="text-[8px] text-slate-500">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  /* 07 – Contexto Local PB */
  {
    id: 'contexto-pb',
    tag: 'DEEP DIVE PARAÍBA',
    title: 'Contexto Local: Visão Geral',
    subtitle: 'O Ecossistema CAA-PB em Números',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <div className="text-3xl font-bold text-indigo-300">24.226</div>
            <div className="text-xs font-semibold text-white mt-0.5">Advogados Ativos</div>
            <div className="text-[9px] text-slate-400">Base consolidada na Paraíba</div>
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] font-semibold text-white mb-1.5">✅ Status do Ecossistema</div>
            {['Ecossistema maduro', 'Digitalização avançada', 'Infraestrutura completa'].map(
              (item) => (
                <div key={item} className="flex items-center gap-1.5 mb-1">
                  <div className="w-4 h-4 rounded-full bg-indigo-600/40 flex items-center justify-center">
                    <span className="text-[8px] text-indigo-300">✓</span>
                  </div>
                  <span className="text-[9px] text-slate-300">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-[10px] font-semibold text-white mb-2">Inventário de Serviços-Chave</div>
          {[
            { icon: '📱', title: 'App CAA-PB', sub: 'Geolocalização de parceiros, carteira digital' },
            { icon: '🔐', title: 'Nosso Token', sub: 'Certificação digital integrada' },
            { icon: '🛡️', title: 'Soluti', sub: 'Segurança digital avançada' },
            { icon: '💄', title: 'Espaço da Beleza', sub: 'Unidades em Tambaú e Patos' },
            { icon: '❤️', title: 'Plano de Saúde', sub: 'Parceria Unimed' },
            { icon: '🏋️', title: 'Parcerias Fitness', sub: 'Bluefit e Clube Cabo Branco' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-1.5 p-1.5 rounded bg-white/5 border border-indigo-500/15"
            >
              <span className="text-sm flex-shrink-0">{item.icon}</span>
              <div>
                <div className="text-[10px] font-semibold text-white">{item.title}</div>
                <div className="text-[8px] text-slate-500">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  /* 08 – O que mobiliza PB */
  {
    id: 'mobiliza-pb',
    tag: 'RADIOGRAFIA DIGITAL',
    title: 'O que Mobiliza a Advocacia Paraibana?',
    subtitle: 'Análise de Campanhas e Engajamento Digital',
    accent: '#6366f1',
    content: (
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '📱', title: 'Lançamento App CAA-PB', sub: 'Soluções de geolocalização e centralização de serviços' },
            { icon: '🎵', title: 'Bloquinho da Advocacia', sub: 'Evento cultural e de comunidade local' },
            { icon: '🔐', title: 'Nosso Token + Soluti', sub: 'Segurança digital prática e obrigatória' },
            { icon: '🚩', title: 'Arraia da Advocacia', sub: 'Evento sazonal de engajamento familiar' },
            { icon: '💉', title: 'Campanhas de Vacinação', sub: 'Assistencialismo direto e imediato' },
            { icon: '🏃', title: 'Corrida da Advocacia', sub: 'Foco em esporte e encerramento do ano' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-2 p-2 rounded-lg bg-white/5 border-l-2 border-indigo-500"
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <div>
                <div className="text-[10px] font-semibold text-white leading-tight">{item.title}</div>
                <div className="text-[8px] text-slate-500 mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-indigo-600/10 border border-indigo-500/20">
          <p className="text-[9px] text-indigo-200/80 leading-relaxed">
            <span className="font-bold">💡 Data Insight:</span> A PB domina com campanhas focadas em{' '}
            <span className="text-indigo-300 font-semibold">duas frentes distintas</span>: soluções
            digitais práticas (Token e App) e eventos de massa focados em comunidade e cultura local
            (Bloquinho e Arraia).
          </p>
        </div>
      </div>
    ),
  },
  /* 09 – Matriz de Gap Analysis */
  {
    id: 'gap-analysis',
    tag: 'DIAGNÓSTICO ESTRATÉGICO',
    title: 'Matriz de Gap Analysis',
    subtitle: 'PB vs. Benchmarks Nacionais: Onde estão as Oportunidades?',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="text-[10px] font-semibold text-white mb-2">Comparativo por Dimensão</div>
          {[
            { dim: 'Telessaúde e Saúde Mental', pb: 44, media: 50, top: 95 },
            { dim: 'Esportes de Massa', pb: 55, media: 60, top: 90 },
            { dim: 'Eventos Sociais', pb: 90, media: 65, top: 85 },
            { dim: 'Infraestrutura Física', pb: 85, media: 55, top: 80 },
            { dim: 'Digitalização e Apps', pb: 75, media: 60, top: 97 },
          ].map((row) => (
            <div key={row.dim} className="space-y-0.5">
              <div className="text-[9px] text-slate-400">{row.dim}</div>
              <div className="flex gap-1 items-center">
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="flex h-full gap-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${row.pb}%` }}
                      transition={{ duration: 0.6 }}
                      className="h-full bg-indigo-500 rounded-full"
                    />
                  </div>
                </div>
                <span className="text-[8px] text-indigo-300 w-6">{row.pb}</span>
              </div>
            </div>
          ))}
          <div className="flex gap-3 mt-1">
            {[
              { color: 'bg-indigo-500', label: 'CAA-PB' },
              { color: 'bg-slate-500', label: 'Média' },
              { color: 'bg-white/40', label: 'Top 5' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${l.color}`} />
                <span className="text-[8px] text-slate-500">{l.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="p-2.5 rounded-lg bg-indigo-600/15 border border-indigo-500/30">
            <div className="text-[10px] font-semibold text-white mb-1.5">🏆 Forças da PB</div>
            {[
              'Ultrapassa média nacional em Eventos (Arraia/Bloquinho)',
              'Destaque em Infraestrutura local (Espaço da Beleza)',
              'Empata em Digitalização (App próprio)',
            ].map((item) => (
              <div key={item} className="flex items-start gap-1.5 mb-1">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-600/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[7px] text-indigo-300">✓</span>
                </div>
                <span className="text-[9px] text-slate-300">{item}</span>
              </div>
            ))}
          </div>
          <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
            <div className="text-[10px] font-semibold text-white mb-1.5">⚠️ Gaps Estratégicos</div>
            {[
              'Defasagem em integração com mega-parceiros de bem-estar corporativo (modelo Wellhub)',
              'Necessidade de ampliação de telessaúde e saúde mental',
            ].map((item) => (
              <div key={item} className="flex items-start gap-1.5 mb-1">
                <span className="text-[10px] text-slate-400 flex-shrink-0">→</span>
                <span className="text-[9px] text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  /* 10 – Tokenização Digital */
  {
    id: 'token',
    tag: 'ESTRATÉGIA DE RETENÇÃO',
    title: 'Tokenização Digital',
    subtitle: 'O Token como Cavalo de Troia Digital para Adoção Massiva',
    accent: '#6366f1',
    content: (
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              num: '1',
              title: 'A Dor Prática',
              items: ['Trabalhar', 'Assinar processos', 'Rotina jurídica'],
              intro: 'O advogado necessita obrigatoriamente do Token (Soluti) para:',
            },
            {
              num: '2',
              title: 'A Condição Estratégica',
              items: ['Intimamente atrelada', 'Instalação obrigatória do App', 'Validação via App CAA-PB'],
              intro: 'Aquisição ou renovação do Nosso Token deve ser:',
            },
            {
              num: '3',
              title: 'A Descoberta Induzida',
              items: ['Geolocalização da rede', 'Descontos exclusivos', 'Clínica e Espaço da Beleza'],
              intro: 'Uma vez dentro do App, o usuário é exposto a:',
            },
          ].map((col) => (
            <div
              key={col.num}
              className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{col.num}</span>
                </div>
                <span className="text-[10px] font-semibold text-white">{col.title}</span>
              </div>
              <p className="text-[8px] text-slate-500 mb-1.5">{col.intro}</p>
              {col.items.map((item) => (
                <div key={item} className="flex items-center gap-1 mb-1 p-1 rounded bg-white/5">
                  <span className="text-[9px] text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-start gap-2">
          <span className="text-base flex-shrink-0">🚀</span>
          <p className="text-[9px] text-indigo-200/80 leading-relaxed">
            <span className="font-bold">Impacto Transformacional:</span> O projeto não é apenas sobre
            segurança digital; é uma{' '}
            <span className="text-indigo-300 font-semibold">ferramenta de marketing direto a custo zero</span>
            , transformando 24k advogados em Usuários Ativos Mensais (MAU) do aplicativo proprietário.
          </p>
        </div>
      </div>
    ),
  },
  /* 11 – Prescrições para Crescimento */
  {
    id: 'prescricoes',
    tag: 'RECOMENDAÇÕES ESTRATÉGICAS',
    title: 'Prescrições para Crescimento',
    subtitle: 'Sorteios Inteligentes e Hub de Saúde Integral Regional',
    accent: '#6366f1',
    content: (
      <div className="grid grid-cols-2 gap-3">
        {[
          {
            icon: '🎁',
            title: 'Sorteios Inteligentes',
            items: [
              { icon: '💎', title: 'Isca de Alto Valor', sub: 'Cadeiras Ergonômicas, pacotes de viagens (tática validada no RJ)' },
              { icon: '👥', title: 'Regra de Marcação Cruzada', sub: 'Exigir marcação de 2 colegas → Efeito Viral' },
              { icon: '🔒', title: 'A Regra de Ouro (A Trava)', sub: 'Cadastro completo e ativo no App CAA-PB' },
            ],
            footer: '🎯 Resultado: Transformação de engajamento social em aquisição permanente',
          },
          {
            icon: '❤️',
            title: 'Hub de Saúde e Esporte',
            items: [
              { icon: '📊', title: 'A Tese de Dados', sub: 'Esporte e Bem-estar é a categoria com maior Life Time Value (SP e CE com Wellhub)' },
              { icon: '🧩', title: 'Empacotar Convênios', sub: 'Bluefit, Clube Cabo Branco, Corridas → assinatura única' },
              { icon: '⬆️', title: 'Evolução Estratégica', sub: 'De descontos passivos para programa ativo de bem-estar corporativo contínuo' },
            ],
            footer: '🏆 Diferencial: Modelo regional adaptado à realidade paraibana',
          },
        ].map((col) => (
          <div
            key={col.title}
            className="p-2.5 rounded-lg bg-white/5 border-l-2 border-indigo-500"
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span>{col.icon}</span>
              <span className="text-[11px] font-semibold text-white">{col.title}</span>
            </div>
            {col.items.map((item) => (
              <div key={item.title} className="mb-1.5 p-1.5 rounded bg-white/5">
                <div className="text-[10px] font-semibold text-white">{item.title}</div>
                <div className="text-[8px] text-slate-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
            <div className="mt-2 p-1.5 rounded bg-indigo-600/10 border border-indigo-500/15">
              <p className="text-[8px] text-indigo-300/80">{col.footer}</p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  /* 12 – Os 3 Eixos */
  {
    id: 'eixos',
    tag: 'CONCLUSÃO ESTRATÉGICA',
    title: 'Os 3 Eixos do Futuro da CAA-PB',
    subtitle: '',
    accent: '#6366f1',
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              num: '01',
              title: 'A Base',
              body: 'O ecossistema físico e digital da Paraíba já possui maturidade nacional.',
              detail: 'Com 24.226 advogados, a escala exige foco absoluto em conversão e cross-selling, não apenas em criação de novos serviços do zero.',
            },
            {
              num: '02',
              title: 'O Motor de Tráfego',
              body: 'A energia e o imenso volume de massa gerados pelos grandes eventos locais.',
              detail: 'Corrida, Arraia, Bloquinho devem ser imperativamente canalizados para alimentar a base de dados do App proprietário.',
            },
            {
              num: '03',
              title: 'O Próximo Salto',
              body: 'O futuro da assistência repousa na evolução estratégica.',
              detail: 'De descontos comerciais passivos para programas de integração de estilo de vida ativos (Hub de Saúde e Esporte integrado no ambiente digital).',
            },
          ].map((axis) => (
            <div
              key={axis.num}
              className="p-2.5 rounded-lg bg-white/5 border border-indigo-500/20"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white">{axis.num}</span>
                </div>
                <span className="text-[11px] font-semibold text-white">{axis.title}</span>
              </div>
              <p className="text-[9px] text-white/80 font-medium leading-relaxed mb-1">{axis.body}</p>
              <p className="text-[8px] text-slate-500 leading-relaxed">{axis.detail}</p>
            </div>
          ))}
        </div>
        <div className="p-2.5 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center gap-2">
          <span className="text-base flex-shrink-0">🗄️</span>
          <p className="text-[9px] text-indigo-200/70">
            <span className="font-bold">Insights gerados</span> através do processamento de milhares
            de interações digitais do ecossistema OAB/CAA Nacional.
          </p>
        </div>
      </div>
    ),
  },
];

/* ─── Carousel ─────────────────────────────────────────────────────────────── */
export function PptxSlideCarousel() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const total = SLIDES.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);

  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [playing, next]);

  const slide = SLIDES[current];

  return (
    <div className="w-full rounded-xl overflow-hidden border border-indigo-500/20 bg-[#0d1117]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#161b22]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
        <span className="text-[9px] font-mono text-slate-500">
          Ecossistema de Benefícios da Advocacia Brasileira.pptx
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setPlaying((v) => !v)}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={next}
            className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[9px] font-mono text-slate-600 ml-1">
            {current + 1}/{total}
          </span>
        </div>
      </div>

      {/* Slide area */}
      <div className="relative overflow-hidden" style={{ minHeight: 340 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
            className="p-5"
          >
            {/* Slide header */}
            <div className="mb-4">
              <p
                className="text-[9px] font-mono uppercase tracking-[0.15em] mb-1"
                style={{ color: slide.accent }}
              >
                {slide.tag}
              </p>
              <h3 className="text-lg font-bold text-white leading-tight">{slide.title}</h3>
              {slide.subtitle && (
                <p className="text-[10px] text-slate-400 mt-0.5">{slide.subtitle}</p>
              )}
              <div
                className="w-10 h-0.5 mt-2 rounded-full"
                style={{ backgroundColor: slide.accent }}
              />
            </div>
            {/* Slide content */}
            <div>{slide.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1 py-2.5 border-t border-white/5 bg-[#161b22]">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current
                ? 'w-4 h-1.5 bg-indigo-500'
                : 'w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
