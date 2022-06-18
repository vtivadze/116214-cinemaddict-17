import AbstractView from '../framework/view/abstract-view.js';
import { SortType } from '../const.js';

const createSortTemplate = (currentSortType, isMovieLoading) => (
  `<ul class="sort${isMovieLoading ? ' visually-hidden' : ''}">
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
  #isMovieLoading = true;

  constructor(sortType, isMovieLoading) {
    super();
    this.#sortType = sortType;
    this.#isMovieLoading = isMovieLoading;
  }

  get template() {
    return createSortTemplate(this.#sortType, this.#isMovieLoading);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onSortTypeChange.bind(this));
  }

  #onSortTypeChange(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.click(evt.target.dataset.sortType);
  }
}
