import { normalizeText } from '../legacy/text.js';
import { sortByProperty } from '../lib/collections.js';
import type { Equipment, EquipmentStatus, FilterCriteria, StatusFilter } from './types.js';

export function getCategories(equipments: readonly Equipment[]): string[] {
  const categories = equipments.map((equipment) => equipment.category);
  return [...new Set(categories)].sort((a, b) => a.localeCompare(b, 'fr'));
}

export function matchesSearch(equipment: Equipment, searchTerm: string): boolean {
  return normalizeText(equipment.name).includes(normalizeText(searchTerm));
}

// Une catégorie vide signifie « toutes les catégories ».
export function matchesCategory(equipment: Equipment, category: string): boolean {
  return category === '' || equipment.category === category;
}

export function matchesStatus(equipment: Equipment, status: StatusFilter): boolean {
  return status === 'all' || equipment.status === status;
}

export function filterEquipments(
  equipments: readonly Equipment[],
  criteria: FilterCriteria,
): Equipment[] {
  const visible = equipments
    .filter((equipment) => matchesSearch(equipment, criteria.searchTerm))
    .filter((equipment) => matchesCategory(equipment, criteria.category))
    .filter((equipment) => matchesStatus(equipment, criteria.status));
  return sortByProperty(visible, 'name');
}

// Renvoie un nouveau tableau : l'équipement modifié est une copie.
export function updateStatus(
  equipments: readonly Equipment[],
  id: number,
  status: EquipmentStatus,
): Equipment[] {
  return equipments.map((equipment) =>
    equipment.id === id ? { ...equipment, status } : equipment,
  );
}
