import { describe, expect, it } from 'vitest';
import { findById, sortByProperty } from './collections.js';

interface Item {
  id: number;
  label: string;
  rank?: number;
}

const items: Item[] = [
  { id: 3, label: 'Câble', rank: 2 },
  { id: 1, label: 'Écran' },
  { id: 2, label: 'ampoule', rank: 10 },
];

describe('findById', () => {
  it('trouve un élément par identifiant et conserve son type', () => {
    const found = findById(items, 2);
    expect(found?.label).toBe('ampoule');
  });

  it('renvoie undefined si absent ou si le tableau est vide', () => {
    expect(findById(items, 99)).toBeUndefined();
    expect(findById([], 1)).toBeUndefined();
  });

  it('fonctionne avec tout objet possédant un id numérique', () => {
    const users = [{ id: 7, email: 'a@example.com' }];
    expect(findById(users, 7)?.email).toBe('a@example.com');
  });
});

describe('sortByProperty', () => {
  it('trie les chaînes selon l’ordre français (casse et accents)', () => {
    expect(sortByProperty(items, 'label').map((item) => item.label)).toEqual([
      'ampoule',
      'Câble',
      'Écran',
    ]);
  });

  it('trie les nombres numériquement et place les valeurs absentes à la fin', () => {
    expect(sortByProperty(items, 'rank').map((item) => item.id)).toEqual([3, 2, 1]);
  });

  it('ne modifie pas le tableau d’origine', () => {
    const before = items.map((item) => item.id);
    sortByProperty(items, 'id');
    expect(items.map((item) => item.id)).toEqual(before);
  });

  it('gère un tableau vide', () => {
    expect(sortByProperty([] as Item[], 'label')).toEqual([]);
  });
});
