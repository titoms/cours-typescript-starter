# Fiche 3 — Types, interfaces, unions

## Annoter ou inférer ?

```ts
const name = 'Écran';                 // inféré
function find(id: number): Equipment | undefined { /* … */ } // paramètres + retour exporté annotés
const ids = [1, 2].map((id) => id * 2); // paramètre typé par le contexte
```

## Types de base

```ts
let n: number; let s: string; let b: boolean;
let list: number[];               // ou Array<number>
let ro: readonly string[];        // pas de push/sort
let pair: [number, string];       // tuple
let fn: (id: number) => void;     // type de fonction
let x: unknown;                   // à vérifier avant usage
let y: any;                       // À ÉVITER : plus de vérification
```

## Objets

```ts
export interface Equipment {
  readonly id: number;
  name: string;
  status: EquipmentStatus;
  description?: string;           // optionnelle
}
```

`interface` pour les objets ; `type` pour les unions, alias, fonctions.

## Unions de littéraux

```ts
export type EquipmentStatus = 'active' | 'maintenance' | 'inactive';
export type StatusFilter = EquipmentStatus | 'all';
```

## Typage structurel

Compatible = **même forme**, pas même nom. `greet({ name })` accepte tout objet ayant `name: string`.
Un objet **littéral** avec une propriété en trop est refusé.

## `import type`

```ts
import type { Equipment } from './types.js'; // effacé du JS
```

## Erreurs fréquentes

| Message | Cause | Correction |
|---|---|---|
| `TS7006 Parameter 'x' implicitly has an 'any' type` | Paramètre non annoté | Annoter |
| `TS2322 Type 'string' is not assignable to type 'EquipmentStatus'` | Chaîne quelconque pour une union | Garde de type ou valeur littérale |
| `TS2345 Argument of type … is not assignable to parameter …` | Mauvais argument | Corriger l'appel ou le type |
| `TS2561 … 'categry' does not exist … Did you mean 'category'?` | Faute de frappe | Corriger le nom |
| `TS2540 Cannot assign to 'id' because it is a read-only property` | `readonly` | Créer une copie |
| `TS2339 Property 'x' does not exist on type 'Y'` | Type trop large ou propriété inexistante | Rétrécir le type, vérifier le nom |
| `TS1484 'X' is a type and must be imported using a type-only import` | `verbatimModuleSyntax` | `import type` |

**Lire les messages de bas en haut** : la dernière ligne donne la cause précise.
