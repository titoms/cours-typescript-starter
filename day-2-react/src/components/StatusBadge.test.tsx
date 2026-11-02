import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { StatusBadge } from './StatusBadge';

describe('StatusBadge', () => {
  it('affiche le libellé et la classe du statut', () => {
    const html = renderToStaticMarkup(<StatusBadge status="maintenance" />);
    expect(html).toBe('<span class="badge badge-maintenance">En maintenance</span>');
  });
});
