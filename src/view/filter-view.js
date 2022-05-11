import AbstractView from '../framework/view/abstract-view.js';

const createFilterTemplate = (filter) => {
  const {watchListCount, alreadyWatchedCount, favoriteCount} = filter;

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

export default class FilterView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterTemplate(this.#filter);
  }
}
