# Equipment Manager — starter React + TypeScript (jour 2)

Projet Vite + React 19 + TypeScript **déjà initialisé et fonctionnel** : il affiche les mêmes équipements
que l'application du jour 1. Pendant le cours, on y ajoute des props typées, un état typé, le chargement
asynchrone et un filtre ; on ne réécrit pas l'interface.

```bash
npm ci
npm run dev        # http://localhost:5173/ (ou 5174 si le port est pris)
npm run typecheck
npm test
npm run build
```

## Fichiers métier partagés (copie synchronisée)

Ces fichiers sont des **copies exactes** de ceux de l'application TypeScript finale du jour 1, pour
réutiliser les mêmes contrats sans monorepo :

`src/domain/types.ts`, `src/domain/status.ts`, `src/domain/equipment.ts`, `src/lib/collections.ts`,
`src/services/equipment-service.ts`, `src/data/equipments.ts`, `src/legacy/text.js`,
`src/legacy/text.d.ts`, `src/ui/format.ts`, `src/styles.css`.

Ne pas les modifier ici : la référence est l'application du jour 1. Le formateur vérifie la
synchronisation avec `scripts/check-shared-sync.sh`. (Dans un vrai projet, ces types seraient dans un
paquet partagé ou générés depuis les contrats du backend.)

## Fichiers propres à React

| Fichier | Rôle |
|---|---|
| `src/main.tsx` | Point d'entrée React |
| `src/App.tsx` | Composant principal |
| `src/components/StatusBadge.tsx` | Composant modèle : props typées |
| `src/components/EquipmentList.tsx` | Liste des équipements |
| `src/hooks/useEquipments.ts` | Hook **préparé** de chargement asynchrone (branché à 15h00) |
| `src/vite-env.d.ts` | Types fournis par Vite (imports CSS, etc.) |
