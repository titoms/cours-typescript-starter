import { EquipmentList } from './components/EquipmentList';
import { equipments } from './data/equipments';
import { filterEquipments } from './domain/equipment';
import { formatCount } from './ui/format';

export function App() {
  // Pour l'instant : données synchrones, aucun filtre actif.
  const visible = filterEquipments(equipments, { searchTerm: '', category: '', status: 'all' });

  return (
    <>
      <header className="app-header">
        <h1>Equipment Manager</h1>
        <p>Version React + TypeScript — mêmes données, mêmes contrats.</p>
      </header>

      <main className="layout">
        <section className="panel" aria-labelledby="list-title">
          <h2 id="list-title">Équipements</h2>
          <p className="result-count">{formatCount(visible.length)}</p>
          <EquipmentList equipments={visible} />
        </section>

        <section className="panel detail" aria-live="polite">
          <p className="placeholder">Sélectionnez un équipement pour afficher sa fiche.</p>
        </section>
      </main>
    </>
  );
}
