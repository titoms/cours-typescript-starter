import { equipments as initialEquipments } from './data/equipments.js';
import { filterEquipments, findEquipment, getCategories, updateStatus } from './domain/equipment.js';
import { getElement } from './ui/dom.js';
import { formatCount } from './ui/format.js';
import { renderCategoryOptions, renderDetail, renderList } from './ui/render.js';

const searchInput = getElement('#search');
const categorySelect = getElement('#category');
const countElement = getElement('#result-count');
const listElement = getElement('#equipment-list');
const detailElement = getElement('#equipment-detail');

// Tout l'état de l'application tient dans cet objet, en mémoire.
const state = {
  equipments: initialEquipments,
  searchTerm: '',
  category: '',
  selectedId: null,
};

function render() {
  const visible = filterEquipments(state.equipments, {
    searchTerm: state.searchTerm,
    category: state.category,
  });
  countElement.textContent = formatCount(visible.length);
  renderList(listElement, visible, state.selectedId, handleSelect);
  renderDetail(detailElement, findEquipment(state.equipments, state.selectedId), handleStatusChange);
}

function handleSelect(id) {
  state.selectedId = id;
  render();
  // Le rendu recrée les boutons : on redonne le focus à l'élément choisi.
  listElement.querySelector('[aria-pressed="true"]')?.focus();
}

function handleStatusChange(id, status) {
  state.equipments = updateStatus(state.equipments, id, status);
  render();
  detailElement.querySelector('#status-select')?.focus();
}

searchInput.addEventListener('input', () => {
  state.searchTerm = searchInput.value;
  render();
});

categorySelect.addEventListener('change', () => {
  state.category = categorySelect.value;
  render();
});

renderCategoryOptions(categorySelect, getCategories(state.equipments));
render();
