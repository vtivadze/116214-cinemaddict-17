import { createElement } from '../render.js';

const createFilterTemplate = (moviesModel) => {
  const watchListCount = moviesModel.watchListCount;
  const alreadyWatchedCount = moviesModel.alreadyWatchedCount;
  const favoriteCount = moviesModel.favoreiteCount;

  return (
    `<nav class="main-navigation">
      <a href="#all" class="main-navigation__item main-navigation__item--active">
        All movies
      </a>
      <a href="#watchlist" class="main-navigation__item">
        Watchlist
        <span class="main-navigation__item-count">${watchListCount}</span>
      </a>
      <a href="#history" class="main-navigation__item">
        History
        <span class="main-navigation__item-count">${alreadyWatchedCount}</span>
      </a>
      <a href="#favorites" class="main-navigation__item">
        Favorites
        <span class="main-navigation__item-count">${favoriteCount}</span>
      </a>
    </nav>`
  );
};

export default class FilterView {
  #element = null;
  #moviesModel = null;

  constructor(moviesModel) {
    this.#moviesModel = moviesModel;
  }

  get template() {
    return createFilterTemplate(this.#moviesModel);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
