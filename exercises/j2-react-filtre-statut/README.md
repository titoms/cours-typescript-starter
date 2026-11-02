# Exercice J2 — Filtre par statut en React

**Créneau :** J2, 15h45-16h30 (45 min). **Dossier :** `day-2-react/`.
**Point de départ :** votre projet à la fin de la séquence de 15h00 (`App.tsx` utilise `useEquipments`).

## Objectif

Ajouter un composant `StatusFilterSelect` (liste déroulante « Statut ») et un état typé dans `App` pour
filtrer la liste. Le cas « aucun résultat » doit afficher le message prévu par `EquipmentList`.

Ce que vous mobilisez : props typées, callback typé, `useState` avec paramètre de type, garde de type,
réutilisation des types et fonctions du domaine (`StatusFilter`, `STATUSES`, `statusLabel`,
`isStatusFilter`, déjà présents dans `src/domain/`).

## Contrôle

1. Copier le test fourni :

   ```bash
   cp ../exercises/j2-react-filtre-statut/StatusFilterSelect.test.tsx src/components/
   npm run typecheck
   ```

   Erreur de départ : `Cannot find module './StatusFilterSelect'`.
2. Terminé quand : `npm run typecheck` n'affiche rien, `npm test` est vert, et dans le navigateur
   « Hors service » affiche 3 équipements ; avec la recherche « ordinateur », le message « Aucun
   équipement ne correspond à votre recherche. » apparaît.

## Étapes

1. Créer `src/components/StatusFilterSelect.tsx` exportant `StatusFilterSelect`, avec deux props :
   `value` (la valeur courante du filtre) et `onChange` (appelée avec la nouvelle valeur du filtre).
2. Le composant affiche un `<label htmlFor="status-filter">` et un `<select id="status-filter">` :
   une option « Tous les statuts » (`all`) puis une option par statut, générées à partir de `STATUSES`.
   Utiliser la classe CSS `field` sur le conteneur pour la mise en page.
3. Dans `App.tsx`, ajouter un état pour le filtre, le passer à `filterEquipments` et afficher le
   composant après le champ de recherche.

## Indices (à lire dans l'ordre, un par un)

<details>
<summary>Indice 1 — les props</summary>

`interface StatusFilterSelectProps { value: StatusFilter; onChange: (value: StatusFilter) => void; }`
</details>

<details>
<summary>Indice 2 — générer les options</summary>

`STATUSES.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)`.
`key` doit être unique : le statut lui-même convient.
</details>

<details>
<summary>Indice 3 — « Argument of type 'string' is not assignable to parameter of type 'StatusFilter' »</summary>

`event.target.value` est une `string`. Utilisez `isStatusFilter` dans un `if` avant d'appeler `onChange`.
</details>

<details>
<summary>Indice 4 — « Type 'string' is not assignable to type 'StatusFilter' » dans App</summary>

`useState('all')` infère `string`. Donnez le type explicitement : `useState<StatusFilter>('all')`.
</details>

<details>
<summary>Indice 5 — brancher le callback</summary>

La fonction de mise à jour renvoyée par `useState<StatusFilter>` accepte un `StatusFilter` : elle peut
être passée directement à `onChange`.
</details>

## Bonus (sans corrigé)

Ajouter le filtre par catégorie en réutilisant `getCategories` (même principe, avec `string`).
