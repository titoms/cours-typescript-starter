# Fiche 6 — TypeScript dans React et aide-mémoire CI

## Composant et props

```tsx
interface EquipmentDetailProps {
  equipment: Equipment | undefined;
}

export function EquipmentDetail({ equipment }: EquipmentDetailProps) {
  if (equipment === undefined) return <p>Sélectionnez un équipement.</p>;
  return <h2>{equipment.name}</h2>;
}
```

- Fichier `.tsx` ; props = un objet typé, déstructuré dans la signature.
- Prop manquante → `TS2741` ; mauvais type → `TS2322`.
- Prop optionnelle : `title?: string` (omise plutôt que `undefined`).

## Callback

```tsx
interface EquipmentListProps {
  onSelect: (id: number) => void;
}
<button onClick={() => onSelect(equipment.id)}>…</button>
```

## État

```tsx
const [searchTerm, setSearchTerm] = useState('');                  // string
const [selectedId, setSelectedId] = useState<number | null>(null); // explicite
const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
```

## Événements

```tsx
<input onChange={(event) => setSearchTerm(event.target.value)} />  // event inféré
<select onChange={(event) => { if (isStatusFilter(event.target.value)) onChange(event.target.value); }} />
```

## Résultat asynchrone

```tsx
const result = useEquipments(window.location.search);
{result.status === 'loading' && <p>Chargement…</p>}
{result.status === 'error' && <p>{result.message}</p>}
```

Appeler les hooks **avant** tout `return` conditionnel.

## Checklist pratique avant de pousser

- [ ] `npm run typecheck` — aucune sortie
- [ ] `npm test` — tout vert
- [ ] `npm run build` — réussi
- [ ] Pas de `any`, pas de `as` sur des données externes
- [ ] Les données externes passent par une garde / un parseur
- [ ] Les valeurs absentes sont traitées (`undefined`, `null`)

## CI (GitHub Actions)

```yaml
on: [push, pull_request]          # pas sur un commit local
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with: { node-version: 22.17.1 }
  - run: npm ci                   # installation exacte du lockfile
  - run: npm run typecheck
  - run: npm test
  - run: npm run build
```

Une étape en échec (code de sortie ≠ 0) rend le run rouge ; la correction poussée relance un run.
