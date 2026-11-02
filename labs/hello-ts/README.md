# Mini-labo : premier fichier TypeScript

Projet minimal pour observer le compilateur `tsc` **seul** (sans Vite ni navigateur). Contrairement aux
applications, sa configuration **émet** du JavaScript dans `dist/`.

```bash
npm ci
npm run build      # tsc : index.ts -> dist/index.js + dist/index.js.map
npm start          # node dist/index.js
npm run typecheck  # tsc --noEmit : vérifie sans rien écrire
npm run dts        # génère les déclarations dans types/index.d.ts
npm run clean      # supprime dist/ et types/
```

Erreur volontaire : décommenter la ligne `// console.log('Total :', totalQuantity([3, '1', 4]));` dans
`index.ts`, puis `npm run clean` et `npm run build` : l'erreur `TS2322` s'affiche et, grâce à
`noEmitOnError`, aucun fichier n'est produit. Remettre la ligne en commentaire.

Les manipulations détaillées (`target`, `lib`, source maps) sont dans `docs/participants/guide-tp.md`.
