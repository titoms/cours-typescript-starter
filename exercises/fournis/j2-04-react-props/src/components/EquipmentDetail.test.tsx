import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { EquipmentDetail } from './EquipmentDetail';

describe('EquipmentDetail', () => {
  it('affiche un message quand aucun équipement n’est fourni', () => {
    expect(renderToStaticMarkup(<EquipmentDetail equipment={undefined} />)).toContain('Sélectionnez un équipement');
  });

  it('affiche la fiche et une description par défaut', () => {
    const html = renderToStaticMarkup(
      <EquipmentDetail equipment={{ id: 6, name: 'Commutateur', category: 'Réseau', status: 'active' }} />,
    );
    expect(html).toContain('<h2>Commutateur</h2>');
    expect(html).toContain('Aucune description.');
  });
});
