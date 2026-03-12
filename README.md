# CAAsXploreer2.0 — MASTER README / SINGLE AI HANDOFF FILE

## 1. Estado atual do repositório

- **Repositório-base:** `igorlobovc/CaasXploreer2.0`
- **Camada oficial de implementação:** GitHub repo
- **Kimi / Manus / Codex:** camadas auxiliares de ideação, scaffold, comparação visual e experimentação
- **Regra operacional principal:** tudo que valer como estado real do produto precisa existir de verdade no Git e aparecer em branch/commit verificável

## 2. Branches importantes no momento

### Branch estável para beta
- **`feature/state-highlights-paraiba`**
- Esta é a branch mais estável para demo / beta navegável
- Ela contém as melhorias reais já empurradas e verificadas do produto navegável

### Branch de experimento para nova home editorial
- **`feature/home-editorial-redesign`**
- Criada para experimentar uma homepage mais inspirada na apresentação / PowerPoint
- Ainda não deve ser tratada como branch estável de demo sem validação visual e técnica final

### Branch de revisão de proposta Manus
- **`manus-homepage-review`**
- Branch temporária criada para visualizar a proposta editorial do Manus em isolamento
- Serve para comparar com a home atual sem contaminar a branch beta estável

### Branch remota externa do Manus
- **`origin/feat/homepage-editorial-redesign`**
- Commit identificado na conversa:
  - `de5edacc6ca4c81c065ef73e576bcf31721b1060`
- É uma proposta editorial paralela, não automaticamente integrada ao fluxo principal

## 3. Estado funcional atual do produto

Hoje o produto está mais forte nas páginas internas do que na homepage.

### Páginas consideradas fortes / apresentáveis
- `/servicos`
- `/estados`
- `/estados/pb`
- `/ranking`
- `/ranking-v2`
- `/evidencias`
- `/analytics`

### Página ainda em debate / redesign
- `/` (homepage)

## 4. O que já está realmente implementado no produto navegável

### 4.1 Estrutura de navegação
O produto já possui navegação funcionando para:
- home
- ranking
- ranking-v2
- estados
- detalhe por estado
- evidências
- serviços
- analytics

### 4.2 Camada comparativa / ranking
Já existe base visual e estrutural para:
- comparação por estado
- leitura proporcional
- leitura editorial regional
- destaque comparativo da Paraíba

### 4.3 Página estadual
A página da Paraíba é uma das superfícies mais fortes do produto no momento e foi usada como prova de valor do beta.

### 4.4 Serviços / taxonomia
A página de serviços está forte e ajuda a provar que o projeto não é só “visualização”, mas sim um índice navegável com taxonomia.

### 4.5 Evidências
A camada de evidências já funciona como suporte de auditabilidade / método.

### 4.6 Analytics
A página de analytics está utilizável, mas deve ser tratada como camada de apoio, não como a principal narrativa de abertura.

## 5. Lawyer totals / normalização

A base de normalização por quantidade de advogados foi corrigida e passou a ser tratada como ponto crítico de credibilidade.

### Fonte de referência fixada no repo
- `data/reference/lawyer_totals/lawyer_totals_mar_2026.csv`

### Observação importante
A Paraíba foi tratada explicitamente como caso de correção relevante:
- **PB = 24.226**

Isso afeta:
- leitura por 1.000 advogados
- comparações proporcionais
- ranking normalizado
- narrativa da Paraíba

## 6. Homepage: estado atual real

A homepage passou por múltiplas tentativas de ajuste. Nem todas aterrissaram em commits reais. Portanto, a distinção abaixo é essencial.

### O que é real na branch beta estável
Na branch `feature/state-highlights-paraiba`, a home atual é **utilizável**, mas ainda não representa a versão editorial final desejada.

### Problema central da home
A homepage ainda oscilou entre:
- shell de produto
- pilha de cards
- teaser stack
- tentativa de editorialização parcial

### Conclusão atual
A homepage ainda precisa ser tratada como:
- ponto de entrada do produto
- síntese editorial do relatório
- guia de navegação para as páginas internas fortes

Mas isso ainda está em refinamento.

## 7. Direção correta para a homepage

A direção correta já foi definida na conversa e deve ser preservada.

### A homepage NÃO deve ser:
- dashboard genérico
- amontoado de teasers
- analytics wall
- experimentação de iframe
- vitrine de lógica inacabada

### A homepage DEVE ser:
- capa editorial do projeto
- síntese executiva
- apresentação dos principais achados
- vitrine da leitura comparativa da Paraíba
- hub de entrada para o app real

### Estrutura-alvo da homepage editorial
1. Hero / cover
2. Panorama executivo
3. O que realmente mobiliza a advocacia
4. Paraíba em perspectiva analítica
5. Exemplos de leitura / casos
6. Explore o beta
7. Footer

## 8. Conteúdo editorial já definido para a nova home

### Título principal
**Panorama comparativo das Caixas de Assistência da Advocacia Brasileira**

### Subtítulo
**Leitura editorial e comparativa sobre cobertura de benefícios, engajamento digital e diferenciais regionais das CAAs no Brasil.**

### Panorama executivo
Três ideias principais já definidas:
1. **O padrão ouro**
2. **O motor do engajamento**
3. **A era da hiper-personalização**

### Mobilização da advocacia
Categorias a destacar:
- Benefícios e Convênios
- Sorteios
- Esporte e Bem-estar
- Saúde

### Paraíba
Usar framing comparativo estável entre:
- PB
- Nordeste
- Brasil

### Exemplos / casos
Blocos editoriais desejados:
- Cauda longa dos benefícios
- Esportes diferenciados
- Adoção tecnológica e fricção regional
- A Caixa do futuro

### Explore o beta
A home deve terminar com 4 entradas claras:
- Ranking — Comparação relativa entre estados.
- Estados — Visão por UF com recortes consolidados.
- Evidências — Registros públicos para validação de método e taxonomia.
- Serviços — Catálogo estruturado com cobertura atual.

## 9. Materiais editoriais / apresentação

Foram usados materiais derivados de apresentações / slides / PNGs como referência visual e narrativa para a homepage editorial.

### Regra importante
Esses materiais devem servir como:
- referência estética
- referência de hierarquia
- referência narrativa

Eles **não** devem ser simplesmente despejados como “slides embutidos”.

### Uso correto
A nova home deve:
- parecer uma capa editorial premium
- continuar pertencendo visualmente ao CAAsXploreer
- manter shell dark e leitura moderna
- usar imagens estáticas e narrativas sem depender de lógica dinâmica inacabada

## 10. Fanpage Karma

### Situação
Foi criado um sandbox isolado para testar embedding de uma apresentação Fanpage Karma:
- rota temporária de teste:
  - `/fanpagekarma-test`

### Conclusão prática
A apresentação Fanpage Karma pode ser útil como:
- referência
- sandbox
- CTA externa opcional

Mas **não** deve ser dependência central da homepage.

### Regra
- não embutir Fanpage Karma como base crítica da home
- não fazer a home depender do iframe

## 11. Dados de canais / matriz por seccional

A matriz de canais por seccional foi discutida, mas a realidade atual ficou clara:

### O que existe
- estrutura / templates de ingestão
- documentação de necessidade de dados

### O que NÃO existe ainda no repo como dado live
- a base canônica final de preferência de canais por seccional ingerida no produto

### Templates criados
Em branch estável foram criados templates como:
- `data/reference/channel_preferences/channel_preferences_by_uf_template.csv`
- `data/reference/channel_preferences/channel_preferences_ranked_template.csv`
- `data/reference/channel_preferences/channel_preferences_regional_template.csv`
- `docs/methodology/channel_preferences_data_requirements.md`

### Regra
Não fingir que a matriz já está viva no app.
Ela deve ser tratada como:
- próxima ingestão
- próxima validação
- próxima expansão metodológica

## 12. Organização real dos dados no repo

### Já existem camadas relevantes como:
- dados provisórios para homepage / analytics
- referências de lawyer totals
- estruturas de taxonomy / subcategorias
- dados para páginas internas

### Mas o projeto ainda não deve ser tratado como “camada final completa”
Ainda há separação entre:
- backbone utilizável
- camada provisória
- camadas editoriais
- dados externos ainda não totalmente reconciliados

## 13. O que já não deve mais ser prioridade

Não priorizar agora:
- micro-polish de badge
- mexer em rotas estáveis sem necessidade
- reescrever páginas internas fortes
- reabrir loops de homepage antiga
- perseguir commits relatados por IA que não aparecem em `git log`
- qualquer redesign amplo fora da homepage

## 14. Regras de branch / operação

### Branch segura para demo
- `feature/state-highlights-paraiba`

### Branch para experimento editorial de home
- `feature/home-editorial-redesign`

### Branch de revisão externa / Manus
- `manus-homepage-review`

### Regra operacional crítica
Só considerar como “implementado de verdade” o que:
1. existe em branch real
2. aparece em `git log`
3. compila
4. abre em preview verificável

## 15. Regra de validação de mudanças de IA

Mudança vinda de Codex / Manus / Kimi só vale se:
- houver hash real verificável
- a branch existir
- o preview abrir
- o output fizer sentido visualmente
- não houver dependência de truque frágil (ex.: mutação de DOM via `querySelector`)

## 16. Preview / execução local em Codespaces

### Fluxo que funcionou
```bash
cd /workspaces/CaasXploreer2.0/app
rm -rf dist
npm run build
npm run preview -- --host 0.0.0.0 --port 4200
