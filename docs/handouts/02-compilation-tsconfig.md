# Fiche 2 — Compilation et tsconfig

## Deux rôles distincts

1. **Vérifier** les types → erreurs (`TS2322`, `TS2345`…).
2. **Émettre** du JavaScript en effaçant les types.

Projets Vite : Vite (esbuild) émet, `tsc --noEmit` vérifie. Labo `hello-ts` : `tsc` fait les deux.

```bash
npx tsc                     # selon tsconfig.json (dans le dossier du projet !)
npx tsc --noEmit            # vérifier seulement
npm run typecheck           # script du projet
node --enable-source-maps dist/index.js   # piles d'erreurs en lignes .ts
```

## Options

| Option | Signification | Valeur du cours |
|---|---|---|
| `strict` | Toutes les vérifications strictes | `true` |
| `noEmit` | Ne produit aucun fichier | `true` (Vite) |
| `noEmitOnError` | Aucun fichier si erreur | `true` (labo) |
| `target` | **Syntaxe** JS produite | `ES2022` |
| `lib` | **API** connues (`DOM`, `ES2023`…) | `["ES2022", "DOM", "DOM.Iterable"]` |
| `module` | Format des modules produits | `ESNext` / `NodeNext` |
| `moduleResolution` | Résolution des imports | `bundler` (Vite) |
| `sourceMap` | Génère les `.map` | `true` (labo) |
| `allowJs` / `checkJs` | Accepter / vérifier les `.js` | migration : `true` / `false` |
| `isolatedModules` | Chaque fichier transpilable seul | `true` |
| `verbatimModuleSyntax` | `import type` obligatoire pour les types | `true` (après J1 15h) |
| `noUncheckedIndexedAccess` | `t[i]` : `T \| undefined` | `true` (J2) |
| `exactOptionalPropertyTypes` | `x?: T` refuse `x: undefined` explicite | `true` (J2) |
| `skipLibCheck` | Ne pas revérifier les `.d.ts` des dépendances | `true` |
| `jsx` | Transformation du JSX | `react-jsx` (React) |

## `target` ≠ `lib`

- `target: ES2017` réécrit `a ?? b` en `a !== null && a !== void 0 ? a : b`.
- `lib: ["ES2022"]` refuse `tableau.toSorted()` (ES2023) **même si** le moteur l'exécute.
- Aucun des deux n'ajoute de polyfill.

## Erreurs et exécution

```ts
totalQuantity([3, '1', 4]); // TS2322 à la compilation ; en JS : '314' sans erreur
```

`noEmitOnError: false` + erreur → le JS est quand même produit. Seule la configuration (ou la CI) bloque.

## Piège

`npx tsc` hors d'un projet propose d'installer un paquet `tsc` **sans rapport** : refuser.
