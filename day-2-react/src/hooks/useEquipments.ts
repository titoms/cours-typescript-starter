// Hook préparé pour le jour 2 (15h00) : il appelle le service simulé et
// expose le résultat sous forme d'union discriminée. Il n'est pas encore
// utilisé par App au départ.
import { useEffect, useState } from 'react';
import type { Equipment } from '../domain/types';
import { fetchEquipments, readServiceOptions } from '../services/equipment-service';

export type EquipmentsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; equipments: Equipment[] };

// `search` : partie « ?… » de l'URL, par exemple `?failure=error&delay=1500`.
export function useEquipments(search: string): EquipmentsState {
  const [state, setState] = useState<EquipmentsState>({ status: 'loading' });

  useEffect(() => {
    // Ignore une réponse arrivée après le démontage du composant (ou après
    // le double appel volontaire de React.StrictMode en développement).
    let ignore = false;
    setState({ status: 'loading' });
    fetchEquipments(readServiceOptions(search))
      .then((equipments) => {
        if (!ignore) setState({ status: 'success', equipments });
      })
      .catch((error: unknown) => {
        const message = error instanceof Error ? error.message : 'Erreur inconnue.';
        if (!ignore) setState({ status: 'error', message });
      });
    return () => {
      ignore = true;
    };
  }, [search]);

  return state;
}
