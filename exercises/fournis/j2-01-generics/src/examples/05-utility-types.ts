// Types utilitaires : ils FABRIQUENT de nouveaux types à partir d'un type
// existant, sans le recopier. Exemple isolé, non utilisé par l'application.
import type { Equipment, EquipmentStatus } from '../domain/types.js';

// keyof : union des noms de propriétés.
type EquipmentKey = keyof Equipment; // 'id' | 'name' | 'category' | 'status' | 'description'
const sortKey: EquipmentKey = 'name';
// @ts-expect-error - 'nmae' n'est pas une clé d'Equipment.
const wrongKey: EquipmentKey = 'nmae';

// Partial : toutes les propriétés deviennent optionnelles (modification partielle).
type EquipmentPatch = Partial<Equipment>;
const patch: EquipmentPatch = { status: 'inactive' };

// Omit : tout sauf certaines propriétés (création : l'id sera attribué ailleurs).
type NewEquipment = Omit<Equipment, 'id'>;
const draft: NewEquipment = { name: 'Projecteur', category: 'Informatique', status: 'active' };

// Pick : seulement certaines propriétés (résumé pour une liste).
type EquipmentSummary = Pick<Equipment, 'id' | 'name'>;
const summary: EquipmentSummary = { id: 1, name: 'Ordinateur portable PX-14' };

// Record : objet dont TOUTES les clés d'une union sont obligatoires.
// Ajouter un statut à EquipmentStatus provoquerait ici une erreur « propriété manquante ».
const statusColors: Record<EquipmentStatus, string> = {
  active: 'vert',
  maintenance: 'orange',
  inactive: 'gris',
};

export { sortKey, wrongKey, patch, draft, summary, statusColors };
