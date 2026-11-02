# Fichiers fournis pendant le cours

Fichiers d'exemples et de tests que le formateur fait **copier** (plutôt que taper) à certaines étapes.
Ils sont rangés par étape, avec le même chemin que dans le projet. Depuis le dossier du projet
(`day-1-vanilla/` ou `day-2-react/`), copier une étape entière :

```bash
cp -r ../exercises/fournis/j1-02-types/src/. src/
```

| Étape | Projet | Fichiers |
|---|---|---|
| `j1-02-types` | `day-1-vanilla` | `src/examples/01-basics.ts` |
| `j1-03-models` | `day-1-vanilla` | `src/examples/02-structural-typing.ts` |
| `j1-04-unions` | `day-1-vanilla` | `src/examples/03-absent-values.ts` |
| `j1-06-modules` | `day-1-vanilla` | `src/examples/04-classes.ts` |
| `j2-01-generics` | `day-1-vanilla` | `src/examples/05-utility-types.ts`, `src/lib/collections.test.ts` |
| `j2-02-config` | `day-1-vanilla` | `src/examples/06-compiler-options.ts` |
| `j2-03-async` | `day-1-vanilla` | `src/services/equipment-service.test.ts` |
| `j2-04-react-props` | `day-2-react` | `src/components/EquipmentDetail.test.tsx` |
| `j2-05-react-state` | `day-2-react` | `src/components/EquipmentList.test.tsx` |

Les fichiers `src/examples/` ne sont pas utilisés par l'application : ils sont seulement vérifiés par
`npm run typecheck`. Une ligne précédée de `// @ts-expect-error` est une erreur **attendue**.
