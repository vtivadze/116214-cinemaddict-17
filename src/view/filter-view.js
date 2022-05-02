import { createElement } from '../render.js';

const createFilterTemplate = (moviesModel) => {
  const watchListCount = moviesModel.getWatchListCount();
  const alreadyWatchedCount = moviesModel.getAlreadyWatchedCount();
  const favoriteCount = moviesModel.getFavoreiteCount();

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
  constructor(moviesModel) {
    this.moviesModel = moviesModel;
  }

  getTemplate() {
    return createFilterTemplate(this.moviesModel);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
