// Test de l'exercice J2 : copier ce fichier dans day-2-react/src/components/
// puis lancer `npm test`. Il ne compile pas tant que le composant
// StatusFilterSelect n'existe pas avec les props attendues.
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatusFilterSelect } from './StatusFilterSelect';

describe('StatusFilterSelect', () => {
  it('propose « tous » puis les trois statuts', () => {
    const html = renderToStaticMarkup(<StatusFilterSelect value="all" onChange={() => {}} />);
    expect(html).toContain('id="status-filter"');
    expect(html.match(/<option/g)).toHaveLength(4);
    expect(html).toContain('Tous les statuts');
    expect(html).toContain('En maintenance');
  });

  it('sélectionne la valeur reçue en props', () => {
    const html = renderToStaticMarkup(<StatusFilterSelect value="inactive" onChange={() => {}} />);
    expect(html).toContain('<option value="inactive" selected="">');
  });
});
