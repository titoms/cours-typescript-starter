// Valeurs absentes et narrowing. Exemple isolé, non utilisé par l'application.
import { findEquipment } from '../domain/equipment.js';
import type { Equipment, EquipmentStatus } from '../domain/types.js';

declare const equipments: readonly Equipment[];

// `find` peut ne rien trouver : le résultat est `Equipment | undefined`.
const found = findEquipment(equipments, 42);

// @ts-expect-error - 'found' est possiblement 'undefined' (strictNullChecks).
found.name;

// Narrowing par comparaison : après le test, `found` est un Equipment.
if (found !== undefined) {
  found.name.toUpperCase();
}

// Chaînage optionnel `?.` : s'arrête et renvoie undefined si `found` est absent.
const maybeName: string | undefined = found?.name;

// `??` : valeur par défaut seulement si la gauche est null ou undefined
// (contrairement à `||`, qui remplace aussi '' et 0).
const description: string = found?.description ?? 'Aucune description.';

// `null` = absence voulue et explicite ; `undefined` = valeur non définie.
let selectedId: number | null = null;
selectedId = 4;

// Narrowing avec typeof sur une union de types primitifs.
function formatId(id: number | string): string {
  return typeof id === 'number' ? `#${id}` : id.trim();
}

// Une chaîne quelconque n'est pas un EquipmentStatus.
const fromInput: string = 'broken';
// @ts-expect-error - 'string' n'est pas assignable à 'EquipmentStatus'.
const status: EquipmentStatus = fromInput;

export { maybeName, description, selectedId, formatId, status };
