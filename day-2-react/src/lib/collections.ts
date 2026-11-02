// Mini-bibliothèque interne : fonctions génériques réutilisables, sans
// dépendance au métier. `T` est un paramètre de type, choisi à chaque appel.

// `T extends { id: number }` : T peut être n'importe quel type d'objet,
// à condition de posséder un identifiant numérique.
export function findById<T extends { id: number }>(items: readonly T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}

// Trie une COPIE du tableau selon une propriété, par ordre croissant.
// `keyof T` limite `key` aux noms de propriétés existants de T.
export function sortByProperty<T>(items: readonly T[], key: keyof T): T[] {
  return [...items].sort((a, b) => compareValues(a[key], b[key]));
}

function compareValues(a: unknown, b: unknown): number {
  if (a === b) {
    return 0;
  }
  // Valeurs absentes (propriété optionnelle) en dernier.
  if (a === undefined || a === null) {
    return 1;
  }
  if (b === undefined || b === null) {
    return -1;
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b), 'fr');
}
