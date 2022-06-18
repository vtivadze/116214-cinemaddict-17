import { UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #siteMainElement = null;
  #filtersModel = null;
  #moviesModel = null;

  #filters = null;
  #filterComponent = null;

  constructor(siteMainElement, filtersModel, moviesModel) {
    this.#siteMainElement = siteMainElement;
    this.#filtersModel = filtersModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init(isMovieLoading) {
    this.#filters = this.#filtersModel.filters;
    this.#setFilterCounts();

    const previousFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filters, isMovieLoading);
    this.#filterComponent.setFilterTypeChangeHandler(this.#onFilterTypeChange);

    if (previousFilterComponent === null) {
      this.#renderFilter();
      return;
    }

    replace(this.#filterComponent, previousFilterComponent);
    remove(previousFilterComponent);
  }

  #renderFilter() {
    render(this.#filterComponent, this.#siteMainElement);
  }

  #setFilterCounts() {
    this.#filters.forEach((filter) => {filter.count = this.#moviesModel.movies.filter((movie) => movie.userDetails[filter.type]).length;});
  }

  #handleModelEvent = () => {
    this.init();
  };

  #onFilterTypeChange = (filterType) => {
    if (this.#filters.find((filter) => filter.type === filterType).isActive) {
      return;
    }

    this.#filtersModel.updateFilter(UpdateType.FILTER, filterType);
  };
}
