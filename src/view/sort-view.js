import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = (currentSortType) => (
  `<ul class="sort">
    ${Object.values(SortType).map((sortType) => (
    `<li>
      <a
        href="#"
        class="sort__button${sortType === currentSortType ? ' sort__button--active' : ''}"
        data-sort-type="${sortType}">Sort by ${sortType}</a>
    </li>`
  )).join('')}
  </ul>`
);

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler.bind(this));
  }

  #sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
