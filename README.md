# CaasXploreer2.0

Apresentação operacional do projeto de pesquisa que indexa, mede, classifica sentimento e normaliza serviços das CAAs por estado, com foco no primeiro incremento produtivo de analytics e `/ranking`.

## Project

Use o GitHub Projects como quadro de execução do sprint de 24 horas do CaasXploreer2.0.

### Instrução de cadastro no GitHub Projects

1. Crie ou confirme os campos personalizados com estes nomes exatos: `Title`, `Owner`, `Track`, `Priority`, `Status`, `Due`, `Estimated_Hours`, `Dependencies`, `Deliverable` e `Notes`.
2. Importe ou cadastre os itens usando os títulos abaixo exatamente como estão, para preservar dependências entre cards.
3. Registre nas notas do projeto a política de merge atual: analytics primeiro, `/ranking` em seguida, homepage seletiva depois; preservar arquivos de registro público/data e não reescrever rotas já estáveis.
4. Mantenha `/estados` e `/estados/[uf]` congelados durante este ciclo, e não autorize merge enquanto a validação da anomalia do Sudeste não estiver concluída.

### Importação sugerida para o Project board

```csv
Title,Owner,Track,Priority,Status,Due,Estimated_Hours,Dependencies,Deliverable,Notes
"Confirm analytics package consistency","Agent 1","Analytics","HIGH","Todo","Next 24h","2.0","None","Audit note covering missing UFs, missing CAAs by region, field consistency, integer/float issues","Focus on ranking_normalizado_12m.json, ranking_servicos_12m.json, ranking_estados_12m.json, comparativo_regioes_12m.json"
"Validate Sudeste anomaly","Agent 1","Analytics","HIGH","Todo","Next 24h","1.5","Confirm analytics package consistency","Short report with exact Sudeste composition and whether MG/ES are missing","Do not merge anything yet"
"List trusted analytics files","Agent 1","Analytics","MEDIUM","Todo","Next 24h","0.5","Confirm analytics package consistency","One list of SAFE analytics files vs files needing correction","Should explicitly classify JSONs"
"Inspect CaasXploreer2.0 target structure","Agent 2","Integration","HIGH","Todo","Next 24h","1.5","None","Inventory of deploy/build/data paths in igorlobovc/CaasXploreer2.0","Focus on .github/workflows/deploy.yml, app/, app/src/, data location"
"Map candidate package to target repo","Agent 2","Integration","HIGH","Todo","Next 24h","2.0","Inspect CaasXploreer2.0 target structure","File-by-file ADD / MANUAL_MERGE / POSTPONE map","No code changes yet"
"Identify minimal live version","Agent 2","Integration","HIGH","Todo","Next 24h","1.0","Map candidate package to target repo","Recommendation for smallest safe production increment","Expected likely outcome: analytics JSONs + /ranking candidate"
"Prepare /ranking readiness checklist","Agent 2","Integration","MEDIUM","Todo","Next 24h","0.5","Map candidate package to target repo","Checklist of files/data required before /ranking goes live","No merge instructions yet"
"Draft executive analytics narrative","Agent 3","Presentation","HIGH","Todo","Next 24h","1.5","None","Short narrative for president: what services worked best, absolute vs normalized winners, regional takeaways","Use last-12-month logic and normalized metrics"
"Create service-ranking presentation table spec","Agent 3","Presentation","HIGH","Todo","Next 24h","1.0","Draft executive analytics narrative","Spec for final ranking table fields and display order","Must include total interactions, shared interactions, per-1000 lawyers, top service/category"
"Draft homepage section strategy","Agent 3","Presentation","MEDIUM","Todo","Next 24h","1.0","Inspect CaasXploreer2.0 target structure","Homepage section map aligned to aq3buksivjaga structure but adapted to current project","Reference-only, no replacement yet"
"Review and approve README/project text","Igor","Project Control","HIGH","Todo","Next 24h","0.5","None","Final approved repo/project description text","Use updated CaasXploreer2.0 wording"
"Create/organize GitHub Project cards","Igor","Project Control","HIGH","Todo","Next 24h","0.5","None","Project board populated with tasks and owners","Use this CSV as source"
"Download and inspect Kimi package artifacts","Igor","Validation","HIGH","Todo","Next 24h","0.75","None","Quick manual check of package folder contents and naming","Open README_MERGE_FIRST.md, MERGE_MAP.md, top JSONs"
"Provide final lawyer totals source confirmation","Igor","Data","HIGH","Todo","Next 24h","0.25","None","Confirmed authoritative totals by UF","Already available; keep fixed for all agents"
"Decide target repo for first live increment","Igor","Decision","HIGH","Todo","Next 24h","0.5","Inspect CaasXploreer2.0 target structure; Map candidate package to target repo","Decision note: CaasXploreer2.0 vs caasxplorer-web for first live increment","Current plan favors CaasXploreer2.0"
"Approve minimal live scope","Igor","Decision","HIGH","Todo","Next 24h","0.5","Identify minimal live version; Draft executive analytics narrative","Approved scope document","Likely: analytics layer + /ranking, homepage later"
"Request corrected package if regional anomaly confirmed","Igor","Coordination","MEDIUM","Todo","Next 24h","0.25","Validate Sudeste anomaly","Message sent to Kimi asking for corrected analytics package","Only if anomaly is real"
"Freeze /estados and /estados/[uf] from changes","Igor","Governance","HIGH","Todo","Next 24h","0.25","None","Explicit project rule recorded","No rewrite of working state routes"
"Record merge policy in project notes","Igor","Governance","MEDIUM","Todo","Next 24h","0.25","None","Short note: analytics first, /ranking second, homepage selective later","Preserve public/data registry files"
"Consolidate 24h checkpoint","Igor","Project Control","HIGH","Todo","End of 24h","0.5","All agent outputs","One summary note: trusted files, risks, next merge-ready step","Use for next-day action"
```
