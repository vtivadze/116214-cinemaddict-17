import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;

  #filter = null;
  #filterComponent = null;

  constructor(filterContainer) {
    this.#filterContainer = filterContainer;
  }

  init(moviesModel) {
    const {watchListCount, alreadyWatchedCount, favoriteCount} = moviesModel;
    this.#filter = {
      watchListCount,
      alreadyWatchedCount,
      favoriteCount
    };

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filter);

    if (prevFilterComponent === null) {
      this.#renderFilter();
      return;
    }

    if (this.#filterContainer.contains(prevFilterComponent.element)) {
      replace(this.#filterComponent, prevFilterComponent);
    }

    remove(prevFilterComponent);
  }

  #renderFilter() {
    render(this.#filterComponent, this.#filterContainer);
  }

}
