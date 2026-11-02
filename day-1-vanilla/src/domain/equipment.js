import { normalizeText } from '../legacy/text.js';

export function getCategories(equipments) {
  const categories = equipments.map((equipment) => equipment.category);
  return [...new Set(categories)].sort((a, b) => a.localeCompare(b, 'fr'));
}

export function matchesSearch(equipment, searchTerm) {
  return normalizeText(equipment.name).includes(normalizeText(searchTerm));
}

// Une catégorie vide signifie « toutes les catégories ».
export function matchesCategory(equipment, category) {
  return category === '' || equipment.category === category;
}

export function filterEquipments(equipments, criteria) {
  return equipments
    .filter((equipment) => matchesSearch(equipment, criteria.searchTerm))
    .filter((equipment) => matchesCategory(equipment, criteria.category))
    .sort((a, b) => a.name.localeCompare(b.name, 'fr'));
}

export function findEquipment(equipments, id) {
  return equipments.find((equipment) => equipment.id === id);
}

// Renvoie un nouveau tableau : l'équipement modifié est une copie.
export function updateStatus(equipments, id, status) {
  return equipments.map((equipment) =>
    equipment.id === id ? { ...equipment, status } : equipment,
  );
}
