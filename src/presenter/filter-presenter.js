import { render } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #container = null;
  #moviesModel = null;
  #filter = null;

  constructor(container, moviesModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;
  }

  init() {
    const {watchListCount, alreadyWatchedCount, favoriteCount} = this.#moviesModel;
    this.#filter = {
      watchListCount,
      alreadyWatchedCount,
      favoriteCount
    };

    this.#renderFilter();
  }

  #renderFilter() {
    render(new FilterView(this.#filter), this.#container);
  }

}
