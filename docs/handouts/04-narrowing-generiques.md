# Fiche 4 — Narrowing, gardes, génériques

## Valeurs absentes

```ts
const found = list.find((e) => e.id === id);   // Equipment | undefined
found?.name;                                   // undefined si absent
found?.description ?? 'Aucune description.';   // défaut si null/undefined (pas '' ni 0)
let selectedId: number | null = null;          // absence voulue
```

## Narrowing

```ts
if (found !== undefined) { found.name; }                 // comparaison
if (typeof v === 'string') { v.trim(); }                 // typeof
if (el instanceof HTMLInputElement) { el.value; }        // instanceof
if ('id' in obj) { obj.id; }                             // in
if (state.status === 'error') { state.message; }         // union discriminée
if (x === undefined) { return; } x.name;                 // retour anticipé
```

## Exhaustivité

```ts
default: { const unhandled: never = status; return unhandled; }
```

## Garde de type

```ts
export function isEquipmentStatus(value: unknown): value is EquipmentStatus {
  return STATUSES.some((status) => status === value);
}
if (isEquipmentStatus(select.value)) { /* EquipmentStatus ici */ }
```

Vérifie **réellement** à l'exécution. `as EquipmentStatus` ne vérifie **rien**. Tester les gardes.

## Génériques

```ts
function findById<T extends { id: number }>(items: readonly T[], id: number): T | undefined
function sortByProperty<T>(items: readonly T[], key: keyof T): T[]

findById(equipments, 3);           // T inféré = Equipment
useState<number | null>(null);     // T explicite quand l'inférence ne suffit pas
```

## Types utilitaires

`keyof T` · `Partial<T>` · `Pick<T, 'a' | 'b'>` · `Omit<T, 'id'>` · `Record<EquipmentStatus, string>`

## Erreurs fréquentes

| Message | Cause | Correction |
|---|---|---|
| `TS18048 'x' is possibly 'undefined'` | Résultat de `find`, propriété optionnelle | Tester, `?.`, `??` |
| `TS2345 … 'number \| null' … 'number'` | `null` non traité | `x === null ? … : f(x)` |
| `TS2322 Type '"retired"' is not assignable to type 'never'` | Cas de `switch` manquant | Ajouter le `case` |
| `TS2345 … '"nmae"' … 'keyof Equipment'` | Clé inexistante | Corriger la clé |
| `TS2353 … 'name' does not exist in type '{ id: number; }'` | Contrainte `extends` non respectée | Fournir un `id` |
| `TS2578 Unused '@ts-expect-error' directive` | L'erreur attendue n'existe plus | Retirer la directive |
