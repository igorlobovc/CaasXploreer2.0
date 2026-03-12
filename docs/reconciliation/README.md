# docs/reconciliation/

Esta pasta armazena os artefatos de rastreabilidade e controle de qualidade gerados pelo pipeline de exportação JSON do CAAsXploreer.

## O que é armazenado aqui

### Relatórios de execução (`*_run_report.md`)
Relatórios em Markdown gerados automaticamente a cada execução do pipeline. Cada relatório registra:
- O `batch_id` e o período coberto pelo arquivo de origem processado.
- A lista de arquivos JSON produzidos com sucesso.
- O número de linhas ingeridas, normalizadas e exportadas.
- Quaisquer anomalias detectadas durante a etapa de normalização.

### Notas de anomalias (`*_anomalies.md`)
Documentação manual ou gerada automaticamente sobre inconsistências encontradas nos dados de origem, como:
- Valores de UF não reconhecidos.
- Categorias sem correspondência no dicionário canônico.
- Campos de interação ausentes ou ambíguos.
- Arquivos de origem corrompidos ou com estrutura inesperada.

### Resumos de proveniência (`*_provenance.json`)
Cópias legíveis dos arquivos `_provenance.json` gerados pelo pipeline, contendo:
- O hash SHA-256 do arquivo de origem.
- O commit Git do código do pipeline utilizado na execução.
- O timestamp de execução (UTC).
- Um resumo dos problemas de QA detectados.

### Saídas de reconciliação entre fontes e JSONs processados
Documentos que descrevem decisões tomadas para reconciliar diferenças entre arquivos de origem distintos (por exemplo, entre a versão `_QA` e a versão `_20250308` do workbook Fanpage Karma), incluindo:
- Qual versão foi considerada canônica para cada campo.
- Campos descartados ou substituídos.
- Justificativas para decisões de normalização não triviais.

## Regras de uso

- **Não edite** os arquivos gerados automaticamente pelo pipeline. Eles são registros auditáveis.
- Notas manuais de anomalias devem ser adicionadas em arquivos separados com nomenclatura descritiva (ex.: `anomalia_uf_desconhecida_20260310.md`).
- Todos os arquivos nesta pasta devem ser versionados no repositório.
- Esta pasta **não** armazena dados processados — os JSONs finais ficam em `data/processed/`.
