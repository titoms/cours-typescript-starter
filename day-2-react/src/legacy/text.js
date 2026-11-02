// Module « hérité » fourni par une autre équipe : il reste en JavaScript
// pendant toute la formation. Il met un texte en minuscules et retire les
// accents afin de comparer des saisies (« Écran » et « ecran » sont égaux).
export function normalizeText(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}
