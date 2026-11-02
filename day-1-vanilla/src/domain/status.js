export const STATUSES = ['active', 'maintenance', 'inactive'];

export function statusLabel(status) {
  switch (status) {
    case 'active':
      return 'En service';
    case 'maintenance':
      return 'En maintenance';
    case 'inactive':
      return 'Hors service';
    default:
      return 'Statut inconnu';
  }
}
