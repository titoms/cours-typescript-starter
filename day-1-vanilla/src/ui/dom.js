// Récupère un élément obligatoire de la page ; échoue tôt et clairement
// si le HTML ne correspond pas au code.
export function getElement(selector) {
  const element = document.querySelector(selector);
  if (element === null) {
    throw new Error(`Élément introuvable : ${selector}`);
  }
  return element;
}
