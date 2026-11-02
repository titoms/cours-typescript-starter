import type { EquipmentStatus, StatusFilter } from './types.js';

export const STATUSES: readonly EquipmentStatus[] = ['active', 'maintenance', 'inactive'];

export function statusLabel(status: EquipmentStatus): string {
  switch (status) {
    case 'active':
      return 'En service';
    case 'maintenance':
      return 'En maintenance';
    case 'inactive':
      return 'Hors service';
    default: {
      // Ici `status` est de type `never` : tous les cas sont traités.
      // Si un statut est ajouté à l'union, cette affectation ne compile plus.
      const unhandled: never = status;
      return unhandled;
    }
  }
}

// Garde de type : vérifie à l'exécution qu'une valeur quelconque est un
// statut connu. Si elle renvoie true, TypeScript considère `value` comme un
// EquipmentStatus dans la suite du code (prédicat `value is ...`).
export function isEquipmentStatus(value: unknown): value is EquipmentStatus {
  return STATUSES.some((status) => status === value);
}

export function isStatusFilter(value: unknown): value is StatusFilter {
  return value === 'all' || isEquipmentStatus(value);
}
