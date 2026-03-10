# BrazilMap

Mapa interativo do Brasil por UF para React + TypeScript.

## Uso

```tsx
import { BrazilMap } from '@/components/map';

const stateData = {
  PB: { value: 76.4, label: "Paraíba", category: "alta" },
  PE: { value: 52.1, label: "Pernambuco", category: "média" },
};

<BrazilMap
  data={stateData}
  mode="numeric"
  onStateClick={(uf) => console.log(uf)}
/>
```

## Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `data` | `MapData` | Dados por UF |
| `mode` | `"numeric" \| "category"` | Modo de visualização |
| `selectedUF` | `string` | UF destacada |
| `onStateClick` | `(uf: string) => void` | Callback de clique |
| `title` | `string` | Título do mapa |
| `height` | `number` | Altura em pixels |
