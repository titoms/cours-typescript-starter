// Mini-labo : premier fichier TypeScript, compilé par `tsc` puis exécuté par Node.

export function describeEquipment(name: string, quantity: number): string {
  return `${quantity} × ${name}`;
}

export function totalQuantity(quantities: number[]): number {
  return quantities.reduce((sum, quantity) => sum + quantity, 0);
}

const quantities = [3, 1, 4];

console.log(describeEquipment('Oscilloscope', 3));
console.log('Total :', totalQuantity(quantities));

// `toSorted` est une API ES2023 : elle doit être déclarée par `lib`.
// `??` est une syntaxe ES2020 : `target` décide si elle est réécrite.
const sorted = quantities.toSorted((a, b) => a - b);
const largest = sorted.at(-1) ?? 0;
console.log('Plus grande quantité :', largest);

// ERREUR VOLONTAIRE (démonstration) : décommenter la ligne suivante.
// console.log('Total :', totalQuantity([3, '1', 4]));

if (process.argv.includes('--crash')) {
  throw new Error('Erreur volontaire pour observer les source maps');
}
