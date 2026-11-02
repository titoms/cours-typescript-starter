# Formation TypeScript — Equipment Manager

Dépôt pédagogique d'une formation TypeScript de 2 jours (14 h) pour des développeurs Java, avec une
application fil rouge **Equipment Manager** : une application JavaScript migrée progressivement en
TypeScript (jour 1 et matin du jour 2), puis une introduction à TypeScript dans React (après-midi du jour 2).

## Contenu

`labs/hello-ts/` - Mini-labo de compilation (`tsc` émet du JavaScript)
`day-1-vanilla/` - Starter JavaScript (Vite), migré en TypeScript pendant le cours
`day-2-react/` - Starter React + TypeScript déjà initialisé
`exercises/` - Énoncés et tests des deux exercices, fichiers fournis pendant le cours (`exercises/fournis/`)
`docs/participants/` - Support de cours et guide de TP
`docs/handouts/` Six fiches de révision

## Prérequis

- **Node.js 22.17.1** (version de référence ; toute version 22.12 ou plus récente convient à Vite 7).
  Fichier `.nvmrc` fourni.
- npm (fourni avec Node.js). **Aucune installation globale, aucun `sudo`** : tout est installé dans
  chaque projet.
- IntelliJ IDEA (Ultimate ou Community avec le support JavaScript/TypeScript) **ou** VS Code.
- Un navigateur récent (Chrome, Firefox, Edge).

Vérifier dans un terminal :

```bash
node --version
```

```bash
npm --version
```

Attendu : `v22.17.1` (ou 22.12+) et `10.x`.

## Installation (une fois, avant le cours)

Depuis la racine du dépôt (ou de l'archive décompressée) :

```bash
cd labs/hello-ts && npm ci && cd ../..
```

```bash
cd day-1-vanilla && npm ci && cd ..
```

```bash
cd day-2-react && npm ci && cd ..
```

`npm ci` installe exactement les versions du `package-lock.json` dans le dossier `node_modules/` du projet.

## Démarrage

```bash
cd day-1-vanilla
npm run dev
```

Ouvrir l'URL affichée (par défaut `http://localhost:5173/`). Même chose dans `day-2-react/`.

Scripts disponibles dans chaque projet (selon l'étape) :

| Script | Rôle |
|---|---|
| `npm run dev` | Serveur de développement Vite (rechargement automatique) |
| `npm run typecheck` | Vérification TypeScript (`tsc`, sans produire de fichiers) — ajouté pendant le cours dans `day-1-vanilla` |
| `npm test` | Tests unitaires (Vitest) |
| `npm run build` | Build de production dans `dist/` (précédé du typecheck une fois la migration avancée) |
| `npm run preview` | Sert le contenu de `dist/` |

Dans `labs/hello-ts/` : `npm run build` (compile vers `dist/`), `npm start` (exécute `dist/index.js`),
`npm run typecheck`, `npm run dts`, `npm run clean`.

### IntelliJ IDEA

1. **File → Open** sur le dossier racine du dépôt.
2. **Settings → Languages & Frameworks → Node.js** : choisir l'interpréteur Node 22 ; la version de
   TypeScript utilisée doit être celle du projet (`node_modules/typescript`), proposée par défaut.
3. Les scripts npm sont dans la fenêtre **npm** (clic droit sur `package.json` → *Show npm Scripts*).
4. Les erreurs TypeScript apparaissent soulignées et dans la fenêtre **TypeScript** ; la référence
   reste `npm run typecheck`.

### VS Code

1. **Fichier → Ouvrir le dossier** sur la racine du dépôt.
2. Dans un fichier `.ts`, commande *TypeScript: Select TypeScript Version* → *Use Workspace Version*.
3. Terminal intégré (`Ctrl+ù` / `Ctrl+\``) pour les commandes npm.

## Dépannage

**Port déjà utilisé.** Vite prend automatiquement le port suivant (5174…) : lire l'URL affichée.
Pour choisir : `npm run dev -- --port 5180`.

**VM distante : `localhost` ne répond pas dans le navigateur.** Le navigateur tourne sur votre poste et
Vite sur la VM. Au choix :

- utiliser un navigateur **dans** la VM ;
- exposer Vite sur le réseau : `npm run dev -- --host`, puis ouvrir `http://<adresse-de-la-vm>:5173/`
  (le port doit être autorisé par le pare-feu) ;
- redirection de port SSH depuis votre poste :
  `ssh -L 5173:localhost:5173 utilisateur@vm`, puis `http://localhost:5173/` sur le poste.

**Proxy d'entreprise.** npm utilise les variables `HTTPS_PROXY`/`HTTP_PROXY`, ou une configuration
**propre à l'utilisateur** (pas de droits root nécessaires) :

```bash
npm config set proxy http://proxy.exemple:8080
```

```bash
npm config set https-proxy http://proxy.exemple:8080
```

En cas d'erreur de certificat (proxy qui intercepte TLS), demander à l'équipe IT le certificat
d'entreprise et le déclarer avec `npm config set cafile /chemin/vers/certificat.pem` — ne pas désactiver
la vérification TLS.

**Registre npm inaccessible.**

- Miroir interne (Nexus, Artifactory…) : `npm config set registry https://miroir.interne/npm/` (URL
  fournie par l'IT), puis `npm ci`.
- Archive de secours **avec dépendances** préparée par le formateur sur une machine de même système et
  architecture (Linux x64) : `scripts/make-zips.sh --with-node-modules`. Décompresser et lancer
  directement `npm run dev` (pas de `npm ci`).
- Une fois les dépendances installées, aucun accès réseau n'est nécessaire pendant le cours.

**`npx tsc` propose d'installer un paquet `tsc`.** Vous n'êtes pas dans le dossier d'un projet :
refuser, se placer dans `labs/hello-ts/` ou `day-1-vanilla/`, ou utiliser `npm run typecheck`.

**Version de Node trop ancienne** (`Vite requires Node.js version 20.19+ or 22.12+`). Installer Node 22
sans droits root : archive officielle `node-v22.17.1-linux-x64.tar.xz` décompressée dans le dossier
personnel puis ajoutée au `PATH`, ou un gestionnaire de versions utilisateur (nvm, fnm, volta).

## Distribution

- **Git** : cloner le dépôt formateur, **puis supprimer** `corrections/` et `docs/trainer/` avant de le
  transmettre, ou mieux :
- **ZIP** : `scripts/make-zips.sh` produit `artifacts/participants.zip` (sans corrigés ni guides
  formateur) et `artifacts/formateur.zip` (dépôt complet). Remarque : `day-2-react/src/domain/`,
  `src/lib/` et `src/services/` contiennent les versions finales des modules métier écrits pendant le
  cours ; si cela pose problème, distribuer `day-2-react/` seulement le jour 2.
