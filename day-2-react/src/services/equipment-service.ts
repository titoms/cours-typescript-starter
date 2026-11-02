// Service simulé : il imite un appel réseau (latence, erreur, réponse
// malformée) sans serveur. La réponse brute est typée `unknown` puis
// contrôlée : TypeScript ne vérifie pas les données reçues à l'exécution.
import { equipments as fixtures } from '../data/equipments.js';
import { isEquipmentStatus } from '../domain/status.js';
import type { Equipment } from '../domain/types.js';

export type FailureMode = 'none' | 'error' | 'malformed';

export interface ServiceOptions {
  delayMs?: number;
  failureMode?: FailureMode;
}

const DEFAULT_DELAY_MS = 300;

function wait(delayMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

// Ce que « renverrait le serveur » : du JSON, donc un type inconnu.
function fakeResponse(failureMode: FailureMode): unknown {
  if (failureMode === 'malformed') {
    // id en chaîne et statut inconnu : exactement ce qu'un `as` laisserait passer.
    return [{ id: '1', name: 'Écran', category: 'Informatique', status: 'broken' }];
  }
  return JSON.parse(JSON.stringify(fixtures));
}

export function isEquipment(value: unknown): value is Equipment {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  // L'opérateur `in` informe TypeScript que la propriété existe.
  return (
    'id' in value &&
    typeof value.id === 'number' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'category' in value &&
    typeof value.category === 'string' &&
    'status' in value &&
    isEquipmentStatus(value.status) &&
    (!('description' in value) || typeof value.description === 'string')
  );
}

export function parseEquipments(data: unknown): Equipment[] {
  if (!Array.isArray(data) || !data.every(isEquipment)) {
    throw new Error('Réponse du serveur invalide : format inattendu.');
  }
  return data;
}

export async function fetchEquipments(options: ServiceOptions = {}): Promise<Equipment[]> {
  const { delayMs = DEFAULT_DELAY_MS, failureMode = 'none' } = options;
  await wait(delayMs);
  if (failureMode === 'error') {
    throw new Error('Le serveur ne répond pas (erreur simulée).');
  }
  return parseEquipments(fakeResponse(failureMode));
}

function isFailureMode(value: unknown): value is FailureMode {
  return value === 'none' || value === 'error' || value === 'malformed';
}

// Lit les options de démonstration dans l'URL, par exemple
// `?failure=error`, `?failure=malformed` ou `?delay=2000`.
export function readServiceOptions(search: string): ServiceOptions {
  const params = new URLSearchParams(search);
  const failure = params.get('failure');
  const delay = Number(params.get('delay') ?? DEFAULT_DELAY_MS);
  return {
    delayMs: Number.isFinite(delay) && delay >= 0 ? delay : DEFAULT_DELAY_MS,
    failureMode: isFailureMode(failure) ? failure : 'none',
  };
}
