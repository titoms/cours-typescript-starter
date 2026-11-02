# Support de cours — TypeScript, de JavaScript à React

Ce support accompagne le live coding. Chaque notion est illustrée par un extrait de code ; les exemples
viennent de l'application **Equipment Manager** ou de petits fichiers d'exemple. Il ne contient pas le
corrigé complet des exercices.

## Sommaire

1. [Le Web et TypeScript en une page](#1-le-web-et-typescript-en-une-page)
2. [Rappels JavaScript utiles](#2-rappels-javascript-utiles)
3. [Le compilateur et `tsconfig.json`](#3-le-compilateur-et-tsconfigjson)
4. [Types de base, inférence, fonctions](#4-types-de-base-inférence-fonctions)
5. [Contrats de données : `interface`, `type`, typage structurel](#5-contrats-de-données--interface-type-typage-structurel)
6. [Valeurs absentes, unions et narrowing](#6-valeurs-absentes-unions-et-narrowing)
7. [Gardes de type et données externes](#7-gardes-de-type-et-données-externes)
8. [Modules et `import type`](#8-modules-et-import-type)
9. [Classes et prototypes (survol)](#9-classes-et-prototypes-survol)
10. [Génériques et types utilitaires](#10-génériques-et-types-utilitaires)
11. [Bibliothèques, `.d.ts` et `@types`](#11-bibliothèques-dts-et-types)
12. [Asynchrone : `Promise`, `async`/`await`](#12-asynchrone--promise-asyncawait)
13. [TypeScript dans React](#13-typescript-dans-react)
14. [Tests et intégration continue](#14-tests-et-intégration-continue)
15. [Sujets survolés](#15-sujets-survolés)
16. [Glossaire](#16-glossaire)

---

## 1. Le Web et TypeScript en une page

- Le **navigateur** télécharge HTML, CSS et JavaScript via **HTTP** et exécute le JavaScript. C'est le
  seul langage de programmation qu'il exécute.
- Le **serveur** répond aux requêtes : fichiers statiques ou données (dans votre projet : backend Java
  exposé en gRPC-Web).
- **Node.js** exécute du JavaScript hors navigateur ; on s'en sert pour les outils (compilateur, serveur
  de développement, tests). **npm** gère les dépendances : `package.json` (déclaration),
  `package-lock.json` (versions exactes), `node_modules/` (installation locale au projet).
- **TypeScript** = JavaScript + types. Le compilateur **vérifie** le code puis **efface** les types : le
  navigateur n'exécute que du JavaScript.

```text
src/*.ts ──► tsc (vérifie)            ──► erreurs dans l'IDE / le terminal
src/*.ts ──► Vite/esbuild (efface les types) ──► JavaScript servi au navigateur
```

**Ce que TypeScript ne fait pas :** valider les données reçues à l'exécution, accélérer le code, empêcher
toutes les erreurs. Il signale, **avant l'exécution**, les incohérences dans le code qu'il voit.

TypeScript est utilisé par Angular (obligatoire), VS Code, Deno, la plupart des grands projets React. Il
n'est pas obligatoire, mais il devient rentable dès qu'une base de code est partagée et durable.

## 2. Rappels JavaScript utiles

```js
const ids = [3, 1, 2];               // const : variable non réaffectable (contenu modifiable)
let count = 0;                       // let : réaffectable
count += 1;

const item = { id: 1, name: 'Écran' };
const copy = { ...item, name: 'Écran 27 pouces' }; // copie avec remplacement (spread)

ids.map((id) => id * 10);            // [30, 10, 20] : transforme
ids.filter((id) => id > 1);          // [3, 2] : sélectionne
[...new Set(['a', 'b', 'a'])];       // ['a', 'b'] : sans doublon

item.description;                    // undefined, sans erreur
'1' === 1;                           // false : toujours utiliser ===
```

**Fonction fléchée** : `(equipment) => equipment.category`, équivalent d'une lambda Java.
**Fermeture (closure)** : une fonction se souvient des variables visibles à sa création :

```js
button.addEventListener('click', () => onSelect(equipment.id)); // `equipment` est mémorisé
```

**Modules ES** : chaque fichier a sa portée ; on partage avec `export` / `import`.

```js
// src/domain/equipment.js
export function findEquipment(equipments, id) {
  return equipments.find((equipment) => equipment.id === id);
}
// src/main.js
import { findEquipment } from './domain/equipment.js';
```

## 3. Le compilateur et `tsconfig.json`

```bash
npx tsc            # vérifie et émet selon tsconfig.json
npx tsc --noEmit   # vérifie seulement
```

Dans `labs/hello-ts/`, `tsc` produit `dist/index.js` : les annotations ont disparu.

```ts
// index.ts
export function describeEquipment(name: string, quantity: number): string {
  return `${quantity} × ${name}`;
}
```

```js
// dist/index.js
export function describeEquipment(name, quantity) {
    return `${quantity} × ${name}`;
}
```

Options essentielles :

| Option | Rôle |
|---|---|
| `strict` | Active les vérifications strictes (`strictNullChecks`, `noImplicitAny`, …) |
| `noEmit` | Vérifier sans produire de fichiers (projets Vite) |
| `noEmitOnError` | Ne rien produire si une erreur existe (projets qui émettent) |
| `target` | Syntaxe JavaScript produite (réécrit `??` pour un ancien moteur) |
| `lib` | API supposées disponibles (`DOM`, `ES2023`…) — n'ajoute aucun polyfill |
| `module` / `moduleResolution` | Format et résolution des imports (`bundler` pour Vite) |
| `sourceMap` | Fichier `.map` reliant le JS au TS (débogage) |
| `allowJs` / `checkJs` | Accepter / vérifier les `.js` pendant une migration |
| `noUncheckedIndexedAccess` | `tableau[i]` est `T \| undefined` |
| `exactOptionalPropertyTypes` | Propriété optionnelle ≠ propriété valant `undefined` |
| `verbatimModuleSyntax` | Imposer `import type` pour les imports de types |

Erreur de type ≠ erreur d'exécution : `totalQuantity([3, '1', 4])` est refusé par TypeScript ; en
JavaScript il renvoie `'314'` sans erreur.

## 4. Types de base, inférence, fonctions

```ts
const appName = 'Equipment Manager';  // type littéral 'Equipment Manager'
let selectedCount = 0;                // number (inféré)
const ids = [1, 2, 3];                // number[]
const entry: [number, string] = [1, 'Écran']; // tuple

function label(name: string, id: number): string {
  return `#${id} ${name}`;
}

const doubled = ids.map((id) => id * 2); // `id` typé par le contexte : number
```

Règles pratiques : annoter **les paramètres** et le **retour des fonctions exportées** ; laisser
l'inférence pour les variables locales. Éviter `any` (désactive la vérification) ; préférer `unknown`
pour une valeur à vérifier.

```ts
type SelectHandler = (id: number) => void; // type de fonction
```

## 5. Contrats de données : `interface`, `type`, typage structurel

```ts
export interface Equipment {
  readonly id: number;          // non réaffectable dans le code TS
  name: string;
  category: string;
  status: EquipmentStatus;
  description?: string;         // optionnelle : string | undefined à la lecture
}

export const equipments: readonly Equipment[] = [ /* … */ ];
```

- `interface` pour décrire un objet ; `type` pour un alias, une union, un type de fonction.
- **Typage structurel** : un objet convient s'il a la bonne **forme**, sans `implements`.

```ts
interface Named { name: string }
function greet(item: Named): string { return `Bonjour ${item.name}`; }
greet(screen); // accepté : un Equipment a un `name: string`
```

- Un objet littéral passé directement est contrôlé plus strictement (propriété en trop = erreur) : c'est
  ce qui détecte `categry` au lieu de `category`.

## 6. Valeurs absentes, unions et narrowing

```ts
export type EquipmentStatus = 'active' | 'maintenance' | 'inactive'; // union de littéraux

const found = equipments.find((equipment) => equipment.id === 42); // Equipment | undefined
found?.name;                                  // ?. : undefined si found est absent
found?.description ?? 'Aucune description.';  // ?? : valeur par défaut si null/undefined
let selectedId: number | null = null;         // null : absence voulue
```

**Narrowing** : après un test, TypeScript connaît le type précis.

```ts
if (found !== undefined) { found.name.toUpperCase(); }            // comparaison
typeof id === 'number' ? `#${id}` : id.trim();                    // typeof
if (element instanceof HTMLInputElement) { element.value; }       // instanceof
```

**Exhaustivité** avec `never` :

```ts
switch (status) {
  case 'active': return 'En service';
  case 'maintenance': return 'En maintenance';
  case 'inactive': return 'Hors service';
  default: {
    const unhandled: never = status; // erreur si un statut n'est pas traité
    return unhandled;
  }
}
```

**Union discriminée** : une propriété commune indique la variante.

```ts
type LoadState = { status: 'loading' } | { status: 'error'; message: string } | { status: 'ready' };
if (state.load.status === 'error') { console.log(state.load.message); } // message accessible ici seulement
```

## 7. Gardes de type et données externes

Une valeur venue de l'extérieur (champ de formulaire, URL, réponse serveur) n'a pas le type que l'on
espère. Une **garde de type** la vérifie à l'exécution et informe TypeScript :

```ts
export function isEquipmentStatus(value: unknown): value is EquipmentStatus {
  return STATUSES.some((status) => status === value);
}

const value = select.value;            // string
if (isEquipmentStatus(value)) {
  onStatusChange(equipment.id, value); // EquipmentStatus
}
```

`value as EquipmentStatus` est une **assertion** : aucune vérification, à éviter pour des données externes.
TypeScript fait confiance à la garde : elle doit être testée.

## 8. Modules et `import type`

```ts
import { filterEquipments } from './domain/equipment.js'; // valeur : conservée dans le JS
import type { Equipment } from './domain/types.js';      // type : effacé du JS
```

Les chemins se terminent par `.js` même si le fichier est `.ts` : avec `moduleResolution: "bundler"`,
TypeScript et Vite font le lien. Les **namespaces** TypeScript (`namespace X { }`) sont une ancienne forme
d'organisation, remplacée par les modules.

## 9. Classes et prototypes (survol)

```ts
export class MaintenanceTicket {
  private readonly createdAt = new Date();   // `private` : vérifié par TS seulement
  constructor(
    public readonly equipmentId: number,     // propriété de paramètre
    public status: EquipmentStatus = 'maintenance',
  ) {}
  close(): void { this.status = 'active'; }
}
Object.getPrototypeOf(new MaintenanceTicket(1)) === MaintenanceTicket.prototype; // true
```

Les méthodes vivent sur le **prototype** de la classe : la syntaxe `class` est construite sur le
mécanisme de prototypes de JavaScript. `#champ` est un champ privé JavaScript, garanti à l'exécution.
Pour des données (JSON), une interface suffit ; une classe sert à encapsuler état et comportement.

## 10. Génériques et types utilitaires

```ts
export function findById<T extends { id: number }>(items: readonly T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

const selected = findById(equipments, 3); // T = Equipment → Equipment | undefined
```

- `T` est choisi à l'appel (souvent inféré) ; `extends` impose une contrainte.
- `keyof T` : union des noms de propriétés (`'id' | 'name' | …`).

```ts
export function sortByProperty<T>(items: readonly T[], key: keyof T): T[] { /* … */ }
sortByProperty(equipments, 'name');  // ok
sortByProperty(equipments, 'nmae');  // erreur
```

| Type utilitaire | Exemple | Résultat |
|---|---|---|
| `Partial<T>` | `Partial<Equipment>` | toutes les propriétés optionnelles |
| `Pick<T, K>` | `Pick<Equipment, 'id' \| 'name'>` | seulement `id` et `name` |
| `Omit<T, K>` | `Omit<Equipment, 'id'>` | tout sauf `id` |
| `Record<K, V>` | `Record<EquipmentStatus, string>` | un objet avec une clé par statut |

## 11. Bibliothèques, `.d.ts` et `@types`

Un fichier `.d.ts` déclare des types sans code, pour décrire du JavaScript existant :

```ts
// src/legacy/text.d.ts
export declare function normalizeText(text: string): string;
```

Sources de types d'une bibliothèque : fournis par la bibliothèque (Vite, Vitest) ; paquet `@types/nom`
de DefinitelyTyped (React : `@types/react`, en `devDependencies`) ; à défaut, un `.d.ts` écrit à la main.
Les types du navigateur viennent de `lib.dom.d.ts` (option `lib`). À partir de code TypeScript,
`tsc --declaration` génère les `.d.ts` (`npm run dts` dans le labo).

## 12. Asynchrone : `Promise`, `async`/`await`

```ts
export async function fetchEquipments(options: ServiceOptions = {}): Promise<Equipment[]> {
  const { delayMs = 300, failureMode = 'none' } = options;
  await wait(delayMs);
  if (failureMode === 'error') {
    throw new Error('Le serveur ne répond pas (erreur simulée).'); // la Promise est rejetée
  }
  return parseEquipments(fakeResponse(failureMode));               // unknown → Equipment[] vérifié
}

try {
  state.equipments = await fetchEquipments();
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : 'Erreur inconnue.';
}
```

`JSON.parse` renvoie `any` : convertir immédiatement en `unknown` et valider. Dans un projet réel, la
validation est souvent faite par une bibliothèque de schémas ou par du code généré depuis les contrats
d'API (Protobuf pour gRPC-Web).

## 13. TypeScript dans React

Un composant est une fonction ; ses **props** sont un objet typé.

```tsx
interface StatusBadgeProps {
  status: EquipmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge-${status}`}>{statusLabel(status)}</span>;
}

<StatusBadge status="broken" />; // erreur : 'broken' n'est pas un EquipmentStatus
```

Callback et état typés :

```tsx
interface EquipmentListProps {
  equipments: readonly Equipment[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const [searchTerm, setSearchTerm] = useState('');                    // string inféré
const [selectedId, setSelectedId] = useState<number | null>(null);   // type explicite nécessaire

<input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />;
```

Résultat asynchrone sous forme d'union discriminée :

```tsx
const result = useEquipments(window.location.search);
const equipments = result.status === 'success' ? result.equipments : [];
```

## 14. Tests et intégration continue

Les tests utilisent **Vitest** (API compatible Jest : `describe`, `it`, `expect`) :

```ts
it('renvoie undefined si absent', () => {
  expect(findById(items, 99)).toBeUndefined();
});
```

Une **CI** (GitHub Actions dans ce dépôt) relance, à chaque `push` ou pull request, `npm ci`,
`npm run typecheck`, `npm test` et `npm run build`. Un commit resté local ne déclenche rien. La CI rend
visibles les erreurs qu'on a oublié de vérifier localement.

## 15. Sujets survolés

- **`enum`** : `enum Status { Active = 'active' }` génère du code ; les unions de littéraux suffisent le
  plus souvent. À savoir lire.
- **Décorateurs** : `@Component(…)` au-dessus d'une classe (Angular, NestJS) ; fonctions appliquées à une
  classe ou un membre. Inutiles en React.
- **Babel vs `tsc`** : Babel et esbuild retirent les types sans vérifier ; `tsc` vérifie.
- **Angular / Vue** : Angular impose TypeScript (classes, décorateurs, injection de dépendances) ; Vue 3
  le propose (`<script setup lang="ts">`). Les notions de ce cours s'y appliquent.
- **Écosystème** : compilateur TypeScript natif (réécrit en Go, plus rapide) ; exécution directe de `.ts`
  par les versions récentes de Node.js en retirant les types, sans les vérifier.

## 16. Glossaire

| Terme | Définition |
|---|---|
| Annotation | Type écrit explicitement : `count: number` |
| Inférence | Déduction du type par le compilateur à partir des valeurs |
| Union | `A \| B` : une valeur de type A ou de type B |
| Type littéral | Type d'une seule valeur : `'active'` |
| Narrowing | Rétrécissement d'un type après un test |
| Garde de type | Fonction `(v: unknown): v is T` qui vérifie et rétrécit |
| Assertion (`as`) | Affirmation non vérifiée d'un type |
| Générique | Type paramétré par un autre type : `findById<T>` |
| `unknown` | Type d'une valeur inconnue, à vérifier avant usage |
| `any` | Désactivation de la vérification |
| `never` | Type sans valeur possible (cas impossible) |
| Déclaration (`.d.ts`) | Description de types sans code |
| Transpilation | Transformation du TS en JS (effacement des types) |
| Props | Paramètres d'un composant React |
