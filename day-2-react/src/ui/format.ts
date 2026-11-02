export function formatCount(count: number): string {
  if (count === 0) {
    return 'Aucun équipement';
  }
  return count === 1 ? '1 équipement' : `${count} équipements`;
}
