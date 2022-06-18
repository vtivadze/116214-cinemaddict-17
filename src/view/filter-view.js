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

const createFilterTemplate = (filters, isMovieLoading) => (
  `<nav class="main-navigation${isMovieLoading ? ' visually-hidden': ''}">
    ${createFilterItemsTemplate(filters)}
  </nav>`
);

export default class FilterView extends AbstractView {
  #filters = null;
  #isMovieLoading = true;

  constructor(filters, isMovieLoading) {
    super();
    this.#filters = filters;
    this.#isMovieLoading = isMovieLoading;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#isMovieLoading);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onFilterTypeChange.bind(this));
  }

  #onFilterTypeChange(evt) {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }

    const filterType = evt.target.tagName === 'A'
      ? evt.target.dataset.filterType
      : evt.target.parentElement.dataset.filterType;

    evt.preventDefault();
    this._callback.click(filterType);
  }
}
