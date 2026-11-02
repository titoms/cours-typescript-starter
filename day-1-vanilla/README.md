# Equipment Manager — starter JavaScript (jour 1)

Application JavaScript native (modules ES), servie par Vite. Elle sera migrée **progressivement** en
TypeScript pendant la formation, sans changer son comportement ni son apparence.

```bash
npm ci        # une fois
npm run dev   # http://localhost:5173/
npm test      # tests unitaires du domaine
npm run build # build de production dans dist/
```

Fonctionnalités : 18 équipements fictifs, recherche par nom (sans tenir compte des accents ni de la
casse), filtre par catégorie, fiche détail, modification du statut **en mémoire** (un rechargement de la
page remet les données d'origine), navigation clavier (`Tab`, `Entrée`).

Organisation :

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page |
| `src/main.js` | Point d'entrée : état de l'application et branchement des événements |
| `src/data/equipments.js` | Données fictives (rôle d'une réponse serveur) |
| `src/domain/equipment.js` | Fonctions métier pures (filtrer, chercher, mettre à jour) |
| `src/domain/status.js` | Liste et libellés des statuts |
| `src/ui/render.js` | Construction du DOM (liste, fiche) |
| `src/ui/dom.js`, `src/ui/format.js` | Petits utilitaires d'interface |
| `src/legacy/text.js` | Module « hérité », conservé en JavaScript |
| `src/styles.css` | Styles |

Les dépendances `typescript` et `vitest` sont déjà installées : la configuration TypeScript est ajoutée
pendant le cours (`docs/participants/guide-tp.md`).
