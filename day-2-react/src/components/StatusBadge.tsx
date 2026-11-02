import { statusLabel } from '../domain/status';
import type { EquipmentStatus } from '../domain/types';

// Les props d'un composant sont un simple objet : on les décrit par une interface.
interface StatusBadgeProps {
  status: EquipmentStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return <span className={`badge badge-${status}`}>{statusLabel(status)}</span>;
}
