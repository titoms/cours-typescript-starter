import { describe, expect, it } from 'vitest';
import {
  fetchEquipments,
  isEquipment,
  parseEquipments,
  readServiceOptions,
} from './equipment-service.js';

describe('isEquipment', () => {
  it('accepte un équipement valide, avec ou sans description', () => {
    expect(isEquipment({ id: 1, name: 'Écran', category: 'Informatique', status: 'active' })).toBe(true);
    expect(
      isEquipment({ id: 1, name: 'Écran', category: 'Informatique', status: 'active', description: 'x' }),
    ).toBe(true);
  });

  it('refuse les formes incorrectes', () => {
    expect(isEquipment(null)).toBe(false);
    expect(isEquipment('Écran')).toBe(false);
    expect(isEquipment({ id: '1', name: 'Écran', category: 'Informatique', status: 'active' })).toBe(false);
    expect(isEquipment({ id: 1, name: 'Écran', category: 'Informatique', status: 'broken' })).toBe(false);
    expect(isEquipment({ id: 1, name: 'Écran', category: 'Informatique', status: 'active', description: 3 })).toBe(false);
  });
});

describe('parseEquipments', () => {
  it('refuse une valeur qui n’est pas un tableau', () => {
    expect(() => parseEquipments({ items: [] })).toThrow('Réponse du serveur invalide');
  });

  it('accepte un tableau vide', () => {
    expect(parseEquipments([])).toEqual([]);
  });
});

describe('fetchEquipments', () => {
  it('renvoie les 18 équipements', async () => {
    const equipments = await fetchEquipments({ delayMs: 0 });
    expect(equipments).toHaveLength(18);
  });

  it('rejette la promesse en mode erreur', async () => {
    await expect(fetchEquipments({ delayMs: 0, failureMode: 'error' })).rejects.toThrow('ne répond pas');
  });

  it('refuse une réponse malformée', async () => {
    await expect(fetchEquipments({ delayMs: 0, failureMode: 'malformed' })).rejects.toThrow('invalide');
  });
});

describe('readServiceOptions', () => {
  it('lit le mode et la latence, avec des valeurs par défaut sûres', () => {
    expect(readServiceOptions('?failure=error&delay=50')).toEqual({ delayMs: 50, failureMode: 'error' });
    expect(readServiceOptions('?failure=oops&delay=abc')).toEqual({ delayMs: 300, failureMode: 'none' });
  });
});
