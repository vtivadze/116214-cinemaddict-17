import AbstractView from '../framework/view/abstract-view.js';

const createFilterItemTemplate = (filter) => (
  `<a
    href="#${filter.url}"
    class="main-navigation__item${filter.isActive ? ' main-navigation__item--active' : ''}"
    data-filter-type="${filter.type}"
  >
    ${filter.name}
    ${filter.type !== 'all' ? `<span class="main-navigation__item-count">${filter.count}</span>` : ''}
  </a>`
);

const createFilterItemsTemplate = (filters) => filters.map((filter) => createFilterItemTemplate(filter)).join('');

const createFilterTemplate = (filters) => (
  `<nav class="main-navigation">
    ${createFilterItemsTemplate(filters)}
  </nav>`
);

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#handleFilterTypeChange.bind(this));
  }

  #handleFilterTypeChange(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }
}
