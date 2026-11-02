import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import type { Equipment } from '../domain/types';
import { EquipmentList } from './EquipmentList';

const equipments: Equipment[] = [
  { id: 1, name: 'Écran', category: 'Informatique', status: 'active' },
  { id: 2, name: 'Routeur', category: 'Réseau', status: 'maintenance' },
];

const noop = () => {};

describe('EquipmentList', () => {
  it('affiche un bouton par équipement et marque la sélection', () => {
    const html = renderToStaticMarkup(<EquipmentList equipments={equipments} selectedId={2} onSelect={noop} />);
    expect(html.match(/<button/g)).toHaveLength(2);
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('Routeur');
  });

  it('affiche un message quand la liste est vide', () => {
    const html = renderToStaticMarkup(<EquipmentList equipments={[]} selectedId={null} onSelect={noop} />);
    expect(html).toContain('Aucun équipement');
  });
});
