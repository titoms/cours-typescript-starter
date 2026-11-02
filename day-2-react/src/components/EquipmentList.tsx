import type { Equipment } from '../domain/types';
import { StatusBadge } from './StatusBadge';

interface EquipmentListProps {
  equipments: readonly Equipment[];
}

export function EquipmentList({ equipments }: EquipmentListProps) {
  if (equipments.length === 0) {
    return <p className="empty">Aucun équipement ne correspond à votre recherche.</p>;
  }

  return (
    <ul id="equipment-list" className="equipment-list">
      {equipments.map((equipment) => (
        // `key` aide React à suivre chaque élément entre deux rendus.
        <li key={equipment.id}>
          <button type="button" className="equipment-item">
            <span className="equipment-name">{equipment.name}</span>
            <span className="equipment-category">{equipment.category}</span>
            <StatusBadge status={equipment.status} />
          </button>
        </li>
      ))}
    </ul>
  );
}
