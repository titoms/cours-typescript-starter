# Guide de TP — Equipment Manager

Ce guide suit **exactement** les manipulations faites avec le formateur. Pour chaque étape : le chemin,
l'objectif, pourquoi, ce qu'il faut faire, comment vérifier, et des indices gradués. Il ne contient pas
le corrigé complet : le code s'écrit avec le formateur.

**Conventions**

- Les commandes s'exécutent dans le dossier du projet indiqué (`day-1-vanilla/`, `labs/hello-ts/` ou
  `day-2-react/`), dans un terminal (celui d'IntelliJ ou de VS Code convient).
- « Vérifier les types » = `npm run typecheck` : **aucune sortie = aucune erreur**.
- Laissez `npm run dev` tourner dans un terminal séparé : le navigateur se met à jour à chaque
  enregistrement.
- Lisez les messages d'erreur TypeScript **de bas en haut** : la dernière ligne donne la cause précise.
- Si vous êtes bloqué ou en retard, le formateur peut vous fournir l'état de référence de l'étape (un
  dossier à décompresser **à côté** du vôtre : votre travail n'est jamais écrasé).

---

## Jour 1

### TP 0 — Démarrer l'application (09h00)

**Dossier :** `day-1-vanilla/`. **Objectif :** vérifier l'environnement.

1. `node --version` (22.12 ou plus) et `npm --version`.
2. `npm run dev`, ouvrir l'URL affichée.

**Vérification :** 18 équipements ; « ecran » trouve « Écran 27 pouces » ; clic sur un équipement →
fiche ; changer le statut → le badge change dans la fiche et la liste ; `Tab` puis `Entrée` sélectionne
un équipement au clavier.

<details><summary>Indice — la page ne s'affiche pas</summary>

Sur une VM distante : `npm run dev -- --host` et utiliser l'adresse de la VM, ou un navigateur dans la
VM. Voir la section Dépannage du `README.md`.
</details>

### TP 1 — Lire le starter (09h20)

**Objectif :** savoir où se trouve chaque responsabilité avant de migrer.

Ouvrir dans cet ordre : `index.html`, `src/data/equipments.js`, `src/domain/equipment.js`,
`src/legacy/text.js`, `src/ui/render.js`, `src/main.js`.

**Vérification (répondre à voix haute) :** Quelle fonction filtre la liste ? Qui l'appelle ? Où est
stocké l'équipement sélectionné ? Pourquoi `updateStatus` renvoie-t-il un nouveau tableau ?

Dans la console du navigateur (`F12`) : `const item = { id: 1 }; item.description.length;` → `TypeError`.

### TP 2 — Mini-labo de compilation (09h45)

**Dossier :** `labs/hello-ts/`. **Objectif :** voir ce que fait `tsc`.

1. Lire `index.ts` et `tsconfig.json`.
2. `npm run build`, puis `ls dist` → `index.js  index.js.map`. `npm start` → 3 lignes, dont `Total : 8`.
3. Comparer `index.ts` et `dist/index.js` : qu'est-ce qui a disparu ?
4. Décommenter la ligne `// console.log('Total :', totalQuantity([3, '1', 4]));`, puis
   `npm run clean` et `npm run build`.
   **Vérification :** `error TS2322: Type 'string' is not assignable to type 'number'.` et pas de dossier `dist/`.
5. `npx tsc --noEmitOnError false` puis `npm start` : la dernière ligne affiche `Total : 314`.
   Pourquoi JavaScript ne signale-t-il rien ?
6. Remettre la ligne en commentaire ; `npm run build` doit réussir.
7. `npm run typecheck` : vérifie sans écrire de fichier (mode utilisé par les projets Vite).
8. `npx tsc --target ES2017`, puis chercher `largest` dans `dist/index.js` : que devient `??` ? Et `toSorted` ?
   Revenir avec `npm run build`.
9. `npx tsc --lib ES2022` : quelle erreur ? Node 22 sait pourtant exécuter `toSorted`. Revenir avec `npm run build`.
10. `node dist/index.js --crash` puis `node --enable-source-maps dist/index.js --crash` : quel fichier est
    cité dans la pile d'erreur ?

<details><summary>Indice — étapes 8 et 9</summary>

`target` choisit la **syntaxe** produite (il réécrit `??` pour les anciens moteurs) ; `lib` choisit les
**API** que TypeScript suppose disponibles. Aucun des deux n'ajoute de fonction manquante.
</details>

### TP 3 — Ajouter TypeScript au projet (10h15)

**Dossier :** `day-1-vanilla/`. **Objectif :** vérifier le projet avec `tsc` sans rien casser.

1. Créer `tsconfig.json` à la racine du projet, avec le formateur. Options clés : `"strict": true`,
   `"noEmit": true`, `"allowJs": true`, `"checkJs": false`, `"moduleResolution": "bundler"`,
   `"lib": ["ES2022", "DOM", "DOM.Iterable"]`, `"include": ["src"]`.
2. Dans `package.json`, ajouter le script `"typecheck": "tsc"`.
3. `npm run typecheck` (aucune sortie) et `npm test` (5 tests verts).
4. Expérience : ajouter `// @ts-check` en première ligne de `src/main.js`, lancer `npx tsc` (3 erreurs
   `TS7006`), puis **retirer la ligne**.

### TP 4 — Premiers fichiers TypeScript (10h30)

**Objectif :** migrer deux fichiers « feuilles » (qui n'importent rien du projet).

1. `mv src/ui/format.js src/ui/format.ts` puis `npm run typecheck` : une erreur `TS7006` sur `count`.
2. Annoter le paramètre et le type de retour de `formatCount`.
3. `mv src/data/equipments.js src/data/equipments.ts` ; survoler `equipments` dans l'IDE : quel type
   TypeScript a-t-il déduit ?
4. Créer `src/ui/format.test.ts` avec le formateur (trois cas : 0, 1, 18).
5. Copier le fichier d'exemples fourni, puis lire `src/examples/01-basics.ts` :
   `cp -r ../exercises/fournis/j1-02-types/src/. src/`.

**Vérification :** `npm run typecheck` silencieux ; `npm test` → `Tests  6 passed (6)` ; l'application
fonctionne toujours. Les imports se terminent toujours par `.js` : ne pas les modifier.

<details><summary>Indice — faut-il annoter les variables ?</summary>

Non : annotez les paramètres et les retours des fonctions exportées ; laissez l'inférence faire le reste.
</details>

### TP 5 — Contrats de données (11h00)

**Objectif :** décrire un équipement par une interface et typer le domaine.

1. Créer `src/domain/types.ts` avec deux interfaces exportées : `Equipment` (`id` numérique en lecture
   seule, `name`, `category`, `status` en `string` pour l'instant, `description` optionnelle) et
   `FilterCriteria` (`searchTerm`, `category`).
2. Dans `src/data/equipments.ts` : `import type { Equipment } from '../domain/types.js';` et annoter le
   tableau `readonly Equipment[]`.
3. `mv src/domain/equipment.js src/domain/equipment.ts`, puis annoter chaque fonction jusqu'à ce que
   `npm run typecheck` soit silencieux.
4. `mv src/domain/equipment.test.js src/domain/equipment.test.ts` et typer l'échantillon `sample`.
5. Copier (`cp -r ../exercises/fournis/j1-03-models/src/. src/`) puis lire `src/examples/02-structural-typing.ts`.

**Vérification :** typecheck silencieux, 6 tests verts. Expérience : écrire `categry` au lieu de
`category` dans le premier équipement → erreur `TS2561` ; corriger.

<details><summary>Indice 1 — quel type pour un tableau reçu en paramètre ?</summary>

`readonly Equipment[]` : la fonction promet de ne pas le modifier et accepte ainsi tous les tableaux.
</details>

<details><summary>Indice 2 — que renvoie findEquipment ?</summary>

`Array.prototype.find` peut ne rien trouver : `Equipment | undefined`.
</details>

<details><summary>Indice 3 — erreur « 'a' is of type 'unknown' » dans getCategories</summary>

Elle disparaît quand le paramètre `equipments` est typé : TypeScript sait alors que les catégories sont
des `string`.
</details>

### TP 6 — Valeurs absentes et unions (12h00)

**Objectif :** limiter le statut à trois valeurs et traiter l'absence de valeur.

1. Dans `src/domain/types.ts` : `export type EquipmentStatus = 'active' | 'maintenance' | 'inactive';`
   et l'utiliser pour `status`.
2. Corriger l'erreur signalée dans `updateStatus` (type du paramètre `status`).
3. `mv src/domain/status.js src/domain/status.ts` : typer `STATUSES` et `statusLabel` ; dans le `default`
   du `switch`, écrire la vérification d'exhaustivité avec le type `never`.
4. Créer `src/domain/status.test.ts` avec le formateur.
5. Copier (`cp -r ../exercises/fournis/j1-04-unions/src/. src/`) puis lire `src/examples/03-absent-values.ts` : `?.`, `??`,
   `null` vs `undefined`, narrowing.

**Vérification :** typecheck silencieux, `Tests  7 passed (7)`. Expériences : statut `'broken'` dans les
données → `TS2322` ; ajouter `| 'retired'` à l'union → erreur dans `statusLabel`. Annuler les deux.

<details><summary>Indice — que mettre dans le default ?</summary>

`const unhandled: never = status; return unhandled;` : si tous les cas sont traités, `status` est de
type `never` à cet endroit.
</details>

### TP 7 — Rendu typé et garde de type (14h00)

**Objectif :** typer le module de rendu et contrôler la valeur choisie dans la liste des statuts.

1. Dans `src/domain/status.ts`, ajouter et exporter `isEquipmentStatus(value: unknown): value is
   EquipmentStatus` ; ajouter son test dans `src/domain/status.test.ts`.
2. `mv src/ui/render.js src/ui/render.ts` (16 erreurs `TS7006` attendues).
3. Déclarer les types de callbacks `SelectHandler` et `StatusChangeHandler`, puis typer les paramètres
   de chaque fonction (`HTMLElement`, `HTMLSelectElement`, `readonly Equipment[]`, `number | null`,
   `Equipment | undefined`).
4. Corriger les erreurs `htmlFor`, `value`, `selected` : créer le libellé et les options avec
   `document.createElement('label')` / `document.createElement('option')`.
5. Dans l'écouteur `change` de la liste des statuts : n'appeler `onStatusChange` que si
   `isEquipmentStatus(value)`.

**Vérification :** typecheck silencieux, `Tests  8 passed (8)`, le changement de statut fonctionne.

<details><summary>Indice 1 — pourquoi pas STATUSES.includes(value) ?</summary>

`includes` exige un argument déjà de type `EquipmentStatus`. `STATUSES.some((status) => status === value)`
compare sans cette exigence.
</details>

<details><summary>Indice 2 — « Property 'htmlFor' does not exist on type 'HTMLElement' »</summary>

`createText` renvoie un `HTMLElement` générique. `document.createElement('label')` renvoie un
`HTMLLabelElement`, qui possède `htmlFor`.
</details>

### TP 8 — Point d'entrée, `import type` et build (15h00)

**Objectif :** terminer la migration.

1. `mv src/ui/dom.js src/ui/dom.ts` : écrire `getElement`, `getInput`, `getSelect` avec `instanceof`.
2. `mv src/main.js src/main.ts` et, dans `index.html`, remplacer `/src/main.js` par `/src/main.ts`.
3. Dans `main.ts` : utiliser `getInput`/`getSelect`, déclarer une interface `AppState` et typer `state`,
   traiter `selectedId === null` avant d'appeler `findEquipment`, typer les handlers.
4. `tsconfig.json` : ajouter `"verbatimModuleSyntax": true`.
5. `package.json` : `"build": "npm run typecheck && vite build"`.
6. Copier (`cp -r ../exercises/fournis/j1-06-modules/src/. src/`) puis lire `src/examples/04-classes.ts`.

**Vérification :** `npm run typecheck`, `npm test` (8 tests), `npm run build` réussissent ; il ne reste
aucun `.js` dans `src/` sauf `src/legacy/text.js`. Expérience : retirer `type` d'un `import type` →
`TS1484` ; remettre.

<details><summary>Indice — « Argument of type 'number | null' is not assignable… »</summary>

`const selected = state.selectedId === null ? undefined : findEquipment(state.equipments, state.selectedId);`
</details>

### Exercice J1 — Filtre par statut (15h45)

Énoncé complet, test fourni et indices : `exercises/j1-filtre-statut/README.md`.

### Fin de journée (16h30)

Correction avec le formateur, puis : `npm run typecheck`, `npm test` (12 tests), `npm run build`.
Si votre dossier est un dépôt Git : `git add -A && git commit -m "Fin J1"` (un commit local ne déclenche
aucune CI).

---

## Jour 2 (matin) — dans `day-1-vanilla/`

### TP 9 — Mini-bibliothèque générique (09h30)

**Objectif :** écrire des fonctions réutilisables pour tout type d'objet.

1. Créer `src/lib/collections.ts` avec :
   - `findById<T extends { id: number }>(items: readonly T[], id: number): T | undefined` ;
   - `sortByProperty<T>(items: readonly T[], key: keyof T): T[]` (trie une **copie**).
2. Copier les fichiers fournis de l'étape (`cp -r ../exercises/fournis/j2-01-generics/src/. src/`) : test
   `src/lib/collections.test.ts` et exemple `src/examples/05-utility-types.ts`.
3. Dans `src/domain/equipment.ts` : utiliser `sortByProperty(visible, 'name')` dans `filterEquipments`
   et **supprimer** `findEquipment`. Remplacer ses usages par `findById` partout où `npm run typecheck`
   les signale.
4. Lire `src/examples/05-utility-types.ts` : `keyof`, `Partial`, `Omit`, `Pick`, `Record`.

**Vérification :** typecheck silencieux, `Tests  18 passed (18)`, liste toujours triée par nom.
Expérience : `sortByProperty(visible, 'nmae')` → `TS2345`.

<details><summary>Indice 1 — pourquoi `[...items]` ?</summary>

`sort` modifie le tableau sur place ; `readonly` l'interdit et l'appelant ne s'y attend pas. On trie
une copie.
</details>

<details><summary>Indice 2 — comparer deux valeurs de type inconnu</summary>

`a[key]` est d'un type que la fonction ne connaît pas : passez-le à une fonction `compareValues(a:
unknown, b: unknown)` qui teste `typeof … === 'number'` avant de soustraire, sinon compare les chaînes
avec `localeCompare`.
</details>

### TP 10 — Fichier de déclaration et options strictes (10h15)

1. À la fin de `src/domain/equipment.ts`, écrire temporairement `normalizeText(42);` : aucune erreur.
2. Créer `src/legacy/text.d.ts` déclarant `normalizeText(text: string): string`
   (`export declare function …`). L'erreur apparaît. Supprimer `normalizeText(42);`.
3. Ouvrir `day-2-react/node_modules/@types/react/index.d.ts` et `day-2-react/src/vite-env.d.ts`.
4. `tsconfig.json` : ajouter `"noUncheckedIndexedAccess": true` et `"exactOptionalPropertyTypes": true`.
5. Copier (`cp -r ../exercises/fournis/j2-02-config/src/. src/`) puis lire `src/examples/06-compiler-options.ts`.

**Vérification :** typecheck silencieux, 18 tests verts. Dans le labo : `npm run dts` puis ouvrir
`types/index.d.ts`.

### TP 11 — Service asynchrone et validation (11h00)

**Objectif :** charger les données de façon asynchrone et refuser une réponse malformée.

1. Créer `src/services/equipment-service.ts` avec le formateur : `fetchEquipments(options):
   Promise<Equipment[]>`, la garde `isEquipment(value: unknown): value is Equipment`, `parseEquipments`,
   et `readServiceOptions` (lecture de `?failure=…&delay=…`).
2. Copier le test fourni `src/services/equipment-service.test.ts` (`cp -r ../exercises/fournis/j2-03-async/src/. src/`).
3. Dans `src/main.ts` : type `LoadState` (union discriminée `loading` / `error` / `ready`), état initial
   `loading`, fonction `async loadEquipments()` avec `try`/`catch`, affichage selon `state.load.status`.
4. Dans `src/ui/render.ts` : fonction `renderListMessage` (message et bouton « Réessayer »).

**Vérification :** `Tests  26 passed (26)` et dans le navigateur :
`?delay=2000` (« Chargement… » puis la liste), `?failure=error` (message d'erreur), `?failure=malformed`
(« Réponse du serveur invalide… »).

<details><summary>Indice 1 — tester une propriété d'un unknown</summary>

D'abord `typeof value === 'object' && value !== null`, puis `'id' in value && typeof value.id === 'number'`.
</details>

<details><summary>Indice 2 — « Property 'message' does not exist on type 'LoadState' »</summary>

`message` n'existe que dans la variante `error` : testez `state.load.status === 'error'` avant d'y accéder.
</details>

<details><summary>Indice 3 — type de l'erreur dans catch</summary>

Elle est `unknown` : `error instanceof Error ? error.message : 'Erreur inconnue.'`.
</details>

---

## Jour 2 (après-midi) — dans `day-2-react/`

### TP 12 — Props typées (12h00)

1. `npm run dev` ; lire `src/main.tsx`, `src/components/StatusBadge.tsx`, `src/components/EquipmentList.tsx`,
   `src/App.tsx`. Les dossiers `src/domain/`, `src/lib/`, `src/services/` sont des copies du jour 1.
2. Expérience : `<StatusBadge status="broken" />` dans `EquipmentList.tsx` → `TS2322`. Annuler.
3. Créer `src/components/EquipmentDetail.tsx` : props `{ equipment: Equipment | undefined }`, message
   si `undefined`, sinon nom, badge, identifiant, catégorie, description (`??`).
4. L'afficher dans `App.tsx` à la place du paragraphe d'attente, avec `equipment={visible[0]}`.
5. Copier le test fourni `src/components/EquipmentDetail.test.tsx` (`cp -r ../exercises/fournis/j2-04-react-props/src/. src/`).

**Vérification :** la fiche de « Borne Wi-Fi atelier » s'affiche ; `npm run typecheck` silencieux ;
`Tests  3 passed (3)`. Expérience : `<EquipmentDetail />` → `TS2741`.

<details><summary>Indice — pourquoi `visible[0]` convient-il ?</summary>

Avec `noUncheckedIndexedAccess`, `visible[0]` est de type `Equipment | undefined` : c'est exactement le
type de la prop.
</details>

### TP 13 — Callback et état typés (14h00)

1. `EquipmentList` : nouvelles props `selectedId: number | null` et `onSelect: (id: number) => void` ;
   sur le bouton : `aria-pressed` et `onClick`.
2. `App` : `useState('')` pour la recherche, `useState<number | null>(null)` pour la sélection, champ
   `<input id="search">`, `filterEquipments` avec `searchTerm`, fiche de l'équipement sélectionné via
   `findById`.
3. Copier le test fourni `src/components/EquipmentList.test.tsx` (`cp -r ../exercises/fournis/j2-05-react-state/src/. src/`).

**Vérification :** recherche et sélection fonctionnent (souris et clavier), `Tests  5 passed (5)`.
Expérience : `useState(null)` sans paramètre de type → `TS2322`.

### TP 14 — Chargement asynchrone (15h00)

1. Lire le type `EquipmentsState` dans `src/hooks/useEquipments.ts` (hook fourni).
2. Dans `App.tsx` : remplacer les données statiques par `const result = useEquipments(window.location.search);`,
   calculer `equipments` selon `result.status`, afficher « Chargement… », le message d'erreur ou la liste.

**Vérification :** `?delay=2000`, `?failure=error`, `?failure=malformed` se comportent comme au jour 1.
Expérience : `const equipments = result.equipments;` → `TS2339`.

### Exercice J2 — Filtre par statut en React (15h45)

Énoncé complet, test fourni et indices : `exercises/j2-react-filtre-statut/README.md`.

### Fin de formation (16h30)

Correction avec le formateur ; `npm run typecheck`, `npm test` (7 tests), `npm run build`.
