// Typage structurel : TypeScript compare des FORMES, pas des noms de classes
// ou d'interfaces. Exemple isolé, non utilisé par l'application.
import type { Equipment } from '../domain/types.js';

interface Named {
  name: string;
}

function greet(item: Named): string {
  return `Bonjour ${item.name}`;
}

const screen: Equipment = { id: 2, name: 'Écran 27 pouces', category: 'Informatique', status: 'active' };

// Accepté : Equipment possède une propriété `name: string`, cela suffit.
// Aucun « implements Named » n'est nécessaire.
greet(screen);

// Un objet littéral passé directement est contrôlé plus strictement :
// une propriété inconnue est signalée (« excess property check »).
// @ts-expect-error - 'category' n'existe pas dans Named.
greet({ name: 'Routeur', category: 'Réseau' });

// readonly : l'identifiant ne peut pas être réaffecté après création.
// @ts-expect-error - id est en lecture seule.
screen.id = 3;

// Propriété optionnelle : son type est `string | undefined`.
const description: string | undefined = screen.description;

export { description };
