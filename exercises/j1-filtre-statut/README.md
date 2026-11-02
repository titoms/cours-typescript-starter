# Exercice J1 — Ajouter un filtre par statut

**Créneau :** J1, 15h45-16h30 (45 min). **Dossier :** `day-1-vanilla/`.
**Point de départ :** votre projet à la fin de la séquence de 15h00 (tout le code de `src/` est en
TypeScript, sauf `src/legacy/text.js`). En cas de doute, demandez le jalon de départ au formateur.

## Objectif

Ajouter une liste déroulante « Statut » qui filtre les équipements : « Tous les statuts », « En
service », « En maintenance », « Hors service ». Le filtre se combine avec la recherche et la catégorie.

Ce que vous mobilisez : union de types, garde de type, fonction typée, mise à jour d'un contrat.

## Contrôle

1. Copier le test fourni dans le projet, puis lancer la vérification des types :

   ```bash
   cp ../exercises/j1-filtre-statut/status-filter.test.ts src/domain/
   npm run typecheck
   ```

   Au départ, 3 erreurs : `matchesStatus` et `isStatusFilter` n'existent pas, `status` n'existe pas dans
   `FilterCriteria`. C'est normal.
2. Terminé quand : `npm run typecheck` n'affiche rien, `npm test` est entièrement vert, et le filtre
   fonctionne dans le navigateur (« En maintenance » → 4 équipements ; avec la catégorie « Réseau » → 1).

## Étapes

1. **HTML.** Dans `index.html`, après le bloc `<div class="field">` de la catégorie, ajouter :

   ```html
   <div class="field">
     <label for="status-filter">Statut</label>
     <select id="status-filter">
       <option value="all">Tous les statuts</option>
       <option value="active">En service</option>
       <option value="maintenance">En maintenance</option>
       <option value="inactive">Hors service</option>
     </select>
   </div>
   ```

2. **Type.** Dans `src/domain/types.ts`, déclarer un type `StatusFilter` : un statut d'équipement **ou**
   la valeur `'all'`. Ajouter une propriété `status` de ce type à `FilterCriteria`.
3. **Fonction métier.** Dans `src/domain/equipment.ts`, écrire et exporter
   `matchesStatus(equipment: Equipment, status: StatusFilter): boolean`, puis l'utiliser dans
   `filterEquipments`.
4. **Garde.** Dans `src/domain/status.ts`, écrire et exporter `isStatusFilter(value: unknown)` avec le
   bon type de retour.
5. **Branchement.** Dans `src/main.ts` : récupérer la liste déroulante, ajouter `statusFilter` à l'état,
   le passer dans les critères, écouter l'événement `change`.
6. **Appelants.** Lancer `npm run typecheck` et corriger tous les endroits signalés.

## Indices (à lire dans l'ordre, un par un)

<details>
<summary>Indice 1 — le type</summary>

Une union peut combiner un type existant et un littéral : `type A = B | 'x'`.
</details>

<details>
<summary>Indice 2 — la fonction métier</summary>

Deux cas acceptent l'équipement : le filtre vaut `'all'`, ou il est égal au statut de l'équipement.
Une seule expression booléenne avec `||` suffit.
</details>

<details>
<summary>Indice 3 — la garde</summary>

Le type de retour d'une garde s'écrit `value is StatusFilter`. Vous avez déjà une garde pour les
statuts : réutilisez-la plutôt que de relister les valeurs.
</details>

<details>
<summary>Indice 4 — l'erreur « Type 'string' is not assignable to type 'StatusFilter' »</summary>

`statusFilterSelect.value` est une `string`. Vérifiez-la avec votre garde dans un `if` avant de
l'affecter à l'état : à l'intérieur du `if`, TypeScript sait que c'est un `StatusFilter`.
</details>

<details>
<summary>Indice 5 — l'erreur « Property 'status' is missing… » dans les tests</summary>

`FilterCriteria` a maintenant une propriété obligatoire : chaque appel de `filterEquipments` doit la
fournir. Dans `src/domain/equipment.test.ts`, ajoutez `status: 'all'` aux critères existants.
</details>

## Bonus (sans corrigé)

Afficher sous les filtres un résumé « 12 en service · 4 en maintenance · 2 hors service » calculé à
partir de `STATUSES` et `statusLabel`.
