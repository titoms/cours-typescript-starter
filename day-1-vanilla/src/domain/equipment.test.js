import { describe, expect, it } from 'vitest';
import {
  filterEquipments,
  findEquipment,
  getCategories,
  updateStatus,
} from './equipment.js';

const sample = [
  { id: 1, name: 'Écran', category: 'Informatique', status: 'active' },
  { id: 2, name: 'Routeur', category: 'Réseau', status: 'maintenance' },
  { id: 3, name: 'Clavier', category: 'Informatique', status: 'inactive' },
];

describe('equipment', () => {
  it('liste les catégories sans doublon, triées', () => {
    expect(getCategories(sample)).toEqual(['Informatique', 'Réseau']);
  });

  it('filtre par nom sans tenir compte des accents ni de la casse', () => {
    const result = filterEquipments(sample, { searchTerm: 'ecr', category: '' });
    expect(result.map((equipment) => equipment.id)).toEqual([1]);
  });

  it('filtre par catégorie et trie par nom', () => {
    const result = filterEquipments(sample, { searchTerm: '', category: 'Informatique' });
    expect(result.map((equipment) => equipment.name)).toEqual(['Clavier', 'Écran']);
  });

  it('renvoie undefined pour un identifiant inconnu', () => {
    expect(findEquipment(sample, 2)?.name).toBe('Routeur');
    expect(findEquipment(sample, 99)).toBeUndefined();
  });

  it('met à jour le statut sans modifier le tableau d’origine', () => {
    const updated = updateStatus(sample, 2, 'active');
    expect(findEquipment(updated, 2)?.status).toBe('active');
    expect(findEquipment(sample, 2)?.status).toBe('maintenance');
  });
});
