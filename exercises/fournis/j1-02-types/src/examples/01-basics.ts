// Exemples isolés (non importés par l'application) : ils sont vérifiés par
// `npm run typecheck`. Une ligne précédée de `@ts-expect-error` DOIT produire
// une erreur ; sinon tsc signale que la directive est inutile.

// Types primitifs : souvent inférés, rarement écrits.
const appName = 'Equipment Manager'; // type littéral 'Equipment Manager' (const)
let selectedCount = 0; // number (let : la valeur peut changer)
selectedCount += 1;
const isReadOnly: boolean = false; // annotation possible mais inutile ici

// @ts-expect-error - une variable number ne peut pas recevoir une chaîne.
selectedCount = 'deux';

// Tableaux : `number[]` (ou `Array<number>`), inféré depuis les valeurs.
const ids = [1, 2, 3];
const firstId = ids[0]; // number (voir noUncheckedIndexedAccess le jour 2)
const doubled = ids.map((id) => id * 2); // number[] : le callback est typé par contexte

// Paramètres : toujours annotés ; retour : inféré ou annoté pour documenter.
function label(name: string, id: number): string {
  return `#${id} ${name}`;
}

// @ts-expect-error - l'ordre des arguments est vérifié.
label(1, 'Écran');

// Tuple (survol) : tableau de longueur et de types fixés par position.
const entry: [number, string] = [1, 'Écran'];
const [entryId, entryName] = entry;

// `any` désactive toute vérification : à éviter. Ici aucune erreur n'est
// signalée alors que le code planterait à l'exécution.
const anything: any = 42;
const crash = () => anything.toUpperCase();

export { appName, isReadOnly, firstId, doubled, label, entryId, entryName, crash };
