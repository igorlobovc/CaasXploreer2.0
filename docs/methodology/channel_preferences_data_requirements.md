# Channel Preferences Data Requirements

## Purpose
Define data requirements for "Matriz de Canais de Informação por Seccional" — a survey-based view of lawyer communication channel preferences by state/UF.

## Current Status
**NOT IMPLEMENTED** — Source data does not exist in repository. Templates created for future ingestion.

## What Source Data is Missing

### Required Input
Survey or research data answering:
> "Em cada seccional/UF, quais são os canais preferidos de informação institucional pela advocacia?"

### Data Must Include
- Geographic identifier (UF code: SP, RJ, MG, etc.)
- Channel identifier (mapped to normalized labels below)
- Percentage of respondents preferring each channel
- Survey/research source attribution
- Data collection period
- Confidence level or sample size metadata

### Expected Source Types
1. **Primary:** OAB/CAAs internal satisfaction surveys
2. **Secondary:** Independent research on lawyer communication habits
3. **Tertiary:** Inferred from engagement analytics (marked with lower confidence)

## Normalized Channel Labels

All source channel names must map to these standardized labels:

| Normalized Label | Common Source Variations |
|-----------------|-------------------------|
| Instagram | Instagram, IG, @handle mentions |
| WhatsApp | WhatsApp, Zap, Grupos de WhatsApp |
| Site institucional | Site, Website, Portal, Página oficial |
| E-mail | Email, E-mail, Correio eletrônico |
| YouTube | YouTube, YT, Canal no YouTube |
| Facebook | Facebook, FB, Meta, Página no Facebook |
| Telegram | Telegram, Grupos de Telegram |
| Aplicativo | App, Aplicativo oficial, App da CAA |
| Atendimento presencial | Presencial, Guichê, Sede, Pessoalmente |
| Outros | Outros, Não informado, Nenhum |

## File Format Specifications

### Template 1: channel_preferences_by_uf_template.csv
**Purpose:** Long-format matrix — one row per UF + channel combination

| Column | Type | Description |
|--------|------|-------------|
| UF | string | State code (SP, RJ, MG, etc.) |
| Entidade | string | CAA name (CAASP, CAARJ, CAAMG, etc.) |
| Canal | string | Normalized channel label |
| Percentual | number | 0-100, no % symbol |
| Fonte | string | Survey/research source name |
| Confianca | string | Alta / Média / Baixa |
| Observacao | string | Notes on mapping, caveats, or data gaps |

### Template 2: channel_preferences_ranked_template.csv
**Purpose:** Compact ranking — top 3 channels per state in single row

| Column | Type | Description |
|--------|------|-------------|
| UF | string | State code |
| Entidade | string | CAA name |
| Canal_1 | string | Most preferred channel |
| Percentual_1 | number | Percentage for Canal_1 |
| Canal_2 | string | Second preference |
| Percentual_2 | number | Percentage for Canal_2 |
| Canal_3 | string | Third preference |
| Percentual_3 | number | Percentage for Canal_3 |
| Fonte | string | Survey/research source |
| Confianca | string | Alta / Média / Baixa |

### Template 3: channel_preferences_regional_template.csv
**Purpose:** Regional aggregation for Nordeste/Sudeste/etc. comparisons

| Column | Type | Description |
|--------|------|-------------|
| Regiao | string | Region name (Norte, Nordeste, Sudeste, Sul, Centro-Oeste) |
| Canal | string | Normalized channel label |
| Percentual_Medio | number | Average percentage across states in region |
| Estados_Considerados | string | Comma-separated UF codes included |
| Fonte | string | Survey/research source |
| Confianca | string | Alta / Média / Baixa |

## Ingestion Mapping Rules

### Step 1: Normalize Source Labels
When ingesting external data:
1. Identify the channel name as provided in source
2. Map to closest normalized label using variation table above
3. Document original name in Observacao column if ambiguous

### Step 2: Handle Missing Data
- If a state has incomplete survey coverage: leave cells blank
- If a channel is not offered in a state's survey: mark as "N/A" in Observacao
- Never interpolate or estimate missing percentages

### Step 3: Confidence Assignment
- **Alta:** Representative sample survey (>100 respondents), recent (<2 years)
- **Média:** Smaller sample survey, older data (2-4 years), or indirect inference
- **Baixa:** Very small samples, outdated (>4 years), or purely inferred from engagement

## Data Quality Gates

Before committing populated files:
1. [ ] All UF codes valid (27 Brazilian states)
2. [ ] All Canal values match normalized labels exactly
3. [ ] Percentual values numeric only, 0-100 range
4. [ ] No fabricated rows — only documented survey data
5. [ ] Fonte column populated with traceable source

## Related Files

- Templates: `data/reference/channel_preferences/*_template.csv`
- Lawyer totals reference: `data/reference/lawyer_totals/lawyer_totals_mar_2026.csv`
- CAA dictionary: `data/reference/caa_dictionary/` (to be populated)

## Future Integration Path

Once populated, these files can power:
- `/analytics` → Channel preference breakdown by state
- `/ranking` → Communication channel effectiveness comparison
- `/estados/:uf` → State-specific communication preferences
- `/servicos` → Channel recommendation for service announcements

## Date Created
2026-03-10
