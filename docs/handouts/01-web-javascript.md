# Fiche 1 — Bases Web et JavaScript

## Qui fait quoi

| Acteur | Rôle | Dans le projet |
|---|---|---|
| Navigateur | Affiche HTML/CSS, **exécute le JavaScript** | Chrome, Firefox… |
| Serveur | Répond aux requêtes HTTP (fichiers, données) | Vite en dev ; backend Java plus tard |
| Node.js | Exécute du JS hors navigateur : **outils** | `tsc`, Vite, Vitest |
| npm | Dépendances et scripts | `npm ci`, `npm run dev` |

`package.json` ≈ `pom.xml` · `package-lock.json` = versions exactes · `node_modules/` = dépendances du projet.

## Commandes

```bash
npm ci            # installe exactement le lockfile
npm run dev       # serveur de développement
npm test          # tests
npm run build     # build de production (dist/)
npm run dev -- --host   # accessible depuis une autre machine (VM distante)
```

## JavaScript à connaître

```js
const list = [3, 1, 2];        // non réaffectable (contenu modifiable)
let total = 0;                 // réaffectable
const twice = list.map((n) => n * 2);     // [6, 2, 4]
const big = list.filter((n) => n > 1);    // [3, 2]
const found = list.find((n) => n > 5);    // undefined
const copy = { ...item, status: 'active' }; // copie + remplacement
const unique = [...new Set(['a', 'a'])];    // ['a']
`#${id} ${name}`;              // gabarit de chaîne
a === b;                       // égalité stricte (jamais ==)
```

## Modules

```js
export function formatCount(count) { /* … */ }        // format.js
import { formatCount } from './ui/format.js';          // main.js
```

## DOM

```js
const input = document.querySelector('#search');   // Element | null
input.addEventListener('input', () => render());
const li = document.createElement('li');
li.textContent = 'Texte sûr';                      // pas d'innerHTML avec des données
```

## Pièges

- Propriété absente → `undefined` sans erreur ; `undefined.length` → `TypeError` à l'exécution.
- `'3' + 1` vaut `'31'` (concaténation).
- `typeof null === 'object'`.
- `const` ne rend pas un objet immuable.
