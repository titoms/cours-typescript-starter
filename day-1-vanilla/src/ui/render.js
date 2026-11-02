import { STATUSES, statusLabel } from '../domain/status.js';

function createText(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className !== '') {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

function createBadge(status) {
  return createText('span', `badge badge-${status}`, statusLabel(status));
}

export function renderCategoryOptions(select, categories) {
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    select.append(option);
  }
}

export function renderList(container, equipments, selectedId, onSelect) {
  container.replaceChildren();

  if (equipments.length === 0) {
    container.append(createText('li', 'empty', 'Aucun équipement ne correspond à votre recherche.'));
    return;
  }

  for (const equipment of equipments) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'equipment-item';
    button.setAttribute('aria-pressed', String(equipment.id === selectedId));
    button.append(
      createText('span', 'equipment-name', equipment.name),
      createText('span', 'equipment-category', equipment.category),
      createBadge(equipment.status),
    );
    // La fermeture (closure) conserve l'identifiant numérique : pas de
    // conversion via un attribut HTML, qui ne stocke que des chaînes.
    button.addEventListener('click', () => onSelect(equipment.id));

    const item = document.createElement('li');
    item.append(button);
    container.append(item);
  }
}

function appendDetail(list, term, value) {
  list.append(createText('dt', '', term), createText('dd', '', value));
}

export function renderDetail(container, equipment, onStatusChange) {
  container.replaceChildren();

  if (equipment === undefined) {
    container.append(createText('p', 'placeholder', 'Sélectionnez un équipement pour afficher sa fiche.'));
    return;
  }

  const details = document.createElement('dl');
  appendDetail(details, 'Identifiant', `#${equipment.id}`);
  appendDetail(details, 'Catégorie', equipment.category);
  appendDetail(details, 'Description', equipment.description ?? 'Aucune description.');

  const label = createText('label', '', 'Modifier le statut');
  label.htmlFor = 'status-select';

  const select = document.createElement('select');
  select.id = 'status-select';
  for (const status of STATUSES) {
    const option = createText('option', '', statusLabel(status));
    option.value = status;
    option.selected = status === equipment.status;
    select.append(option);
  }
  select.addEventListener('change', () => onStatusChange(equipment.id, select.value));

  container.append(createText('h2', '', equipment.name), createBadge(equipment.status), details, label, select);
}
