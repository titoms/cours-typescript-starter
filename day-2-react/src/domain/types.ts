// Contrats de données de l'application.

// Union de types littéraux : seules ces trois chaînes sont acceptées.
export type EquipmentStatus = 'active' | 'maintenance' | 'inactive';

// Valeur du filtre de statut : un statut précis ou 'all' (tous).
export type StatusFilter = EquipmentStatus | 'all';

export interface Equipment {
  readonly id: number;
  name: string;
  category: string;
  status: EquipmentStatus;
  description?: string;
}

export interface FilterCriteria {
  searchTerm: string;
  // Chaîne vide : toutes les catégories.
  category: string;
  status: StatusFilter;
}
