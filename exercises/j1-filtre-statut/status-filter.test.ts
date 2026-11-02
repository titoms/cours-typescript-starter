// Tests de l'exercice J1 : copier ce fichier dans day-1-vanilla/src/domain/
// puis lancer `npm test`. Ils échouent (ou ne compilent pas) tant que
// l'exercice n'est pas terminé.
import { describe, expect, it } from 'vitest';
import { filterEquipments, matchesStatus } from './equipment.js';
import { isStatusFilter } from './status.js';
import type { Equipment } from './types.js';

const screen: Equipment = { id: 1, name: 'Écran', category: 'Informatique', status: 'active' };
const router: Equipment = { id: 2, name: 'Routeur', category: 'Réseau', status: 'maintenance' };
const keyboard: Equipment = { id: 3, name: 'Clavier', category: 'Informatique', status: 'maintenance' };
const sample = [screen, router, keyboard];

describe('filtre par statut', () => {
  it("matchesStatus accepte tout avec 'all'", () => {
    expect(sample.every((equipment) => matchesStatus(equipment, 'all'))).toBe(true);
  });

  it('matchesStatus compare le statut exact', () => {
    expect(matchesStatus(screen, 'active')).toBe(true);
    expect(matchesStatus(screen, 'inactive')).toBe(false);
  });

  it('filterEquipments combine catégorie et statut', () => {
    const result = filterEquipments(sample, {
      searchTerm: '',
      category: 'Informatique',
      status: 'maintenance',
    });
    expect(result.map((equipment) => equipment.id)).toEqual([3]);
  });

  it('isStatusFilter refuse les valeurs inconnues', () => {
    expect(isStatusFilter('all')).toBe(true);
    expect(isStatusFilter('inactive')).toBe(true);
    expect(isStatusFilter('broken')).toBe(false);
    expect(isStatusFilter(null)).toBe(false);
  });
});
