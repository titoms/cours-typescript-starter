# Fiche 5 — Asynchrone et validation

## Promise et async/await

```ts
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchEquipments(): Promise<Equipment[]> {
  await wait(300);
  return parseEquipments(rawResponse);   // une exception → Promise rejetée
}

try {
  const list = await fetchEquipments();
} catch (error: unknown) {               // toujours unknown
  const message = error instanceof Error ? error.message : 'Erreur inconnue.';
}

void loadEquipments();                   // lancer sans attendre (erreurs gérées dedans)
```

## Frontière de validation

```text
réseau / JSON ──► unknown ──► garde / parse ──► Equipment[] fiable dans toute l'app
```

```ts
export function isEquipment(value: unknown): value is Equipment {
  if (typeof value !== 'object' || value === null) return false;
  return 'id' in value && typeof value.id === 'number'
    && 'status' in value && isEquipmentStatus(value.status) /* … */;
}

export function parseEquipments(data: unknown): Equipment[] {
  if (!Array.isArray(data) || !data.every(isEquipment)) {
    throw new Error('Réponse du serveur invalide : format inattendu.');
  }
  return data;
}
```

**À ne pas faire :** `return data as Equipment[];` — compile, ne vérifie rien.

## États de chargement

```ts
type LoadState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready' };
```

## Démonstration dans l'application

`?delay=2000` (chargement) · `?failure=error` (erreur) · `?failure=malformed` (réponse refusée).

## À retenir

- TypeScript **ne valide pas** les données reçues à l'exécution.
- `JSON.parse` renvoie `any` : le convertir en `unknown` immédiatement.
- Projet réel : bibliothèque de schémas (Zod, Valibot…) ou code généré depuis les contrats
  (Protobuf / gRPC-Web).
