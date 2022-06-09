import { UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #moviesModel = null;

  #filters = null;
  #filterComponent = null;

  constructor(filterContainer, filtersModel, moviesModel) {
    this.#filterContainer = filterContainer;
    this.#filtersModel = filtersModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#filters = this.#filtersModel.filters;
    this.#filters.forEach((filter) => {filter.count = this.#moviesModel.movies.filter((movie) => movie.userDetails[filter.type]).length;});

    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(this.#filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

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

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    const filterType = evt.target.dataset.filterType;
    if (this.#filters.find((filter) => filter.type === filterType).isActive) {
      return;
    }

    this.#filtersModel.updateFilter(UpdateType.FILTER, filterType);
  };
}
