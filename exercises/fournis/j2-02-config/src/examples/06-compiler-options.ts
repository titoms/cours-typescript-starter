// Effet de deux options strictes ajoutées au jour 2 dans tsconfig.json.
// Exemple isolé, non utilisé par l'application.
import type { Equipment } from '../domain/types.js';

// noUncheckedIndexedAccess : un index peut sortir du tableau.
const names = ['Écran', 'Routeur'];
const third = names[2]; // string | undefined (et undefined à l'exécution !)
// @ts-expect-error - 'third' est possiblement 'undefined'.
third.toUpperCase();
const safeThird = names[2] ?? 'inconnu';

// Même règle pour un objet utilisé comme dictionnaire.
const stockByCategory: Record<string, number> = { Informatique: 4 };
const stock = stockByCategory['Réseau']; // number | undefined
const total = (stock ?? 0) + 1;

// exactOptionalPropertyTypes : « absente » n'est pas « présente avec undefined ».
const withoutDescription: Equipment = { id: 1, name: 'Écran', category: 'Informatique', status: 'active' };
// @ts-expect-error - undefined explicite refusé pour une propriété optionnelle.
const explicitUndefined: Equipment = { ...withoutDescription, description: undefined };

export { safeThird, total, explicitUndefined };
