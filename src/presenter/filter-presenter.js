import { UpdateType } from '../const.js';
import { render, remove } from '../framework/render.js';
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

  init() {
    this.#removePreviousFilter();

    this.#filters = this.#filtersModel.filters;
    this.#setFilterCounts();

    this.#filterComponent = new FilterView(this.#filters);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    this.#renderFilter();
  }

  #renderFilter() {
    render(this.#filterComponent, this.#siteMainElement);
  }

  #removePreviousFilter() {
    if (this.#filterComponent && this.#siteMainElement.contains(this.#filterComponent.element)) {
      remove(this.#filterComponent);
    }
  }

  #setFilterCounts() {
    this.#filters.forEach((filter) => {filter.count = this.#moviesModel.movies.filter((movie) => movie.userDetails[filter.type]).length;});
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (evt) => {
    if (evt.target.tagName !== 'A' && evt.target.tagName !== 'SPAN') {
      return;
    }

    const filterType = evt.target.tagName === 'A'
      ? evt.target.dataset.filterType
      : evt.target.parentElement.dataset.filterType;

    if (this.#filters.find((filter) => filter.type === filterType).isActive) {
      return;
    }

    this.#filtersModel.updateFilter(UpdateType.BOARD, filterType);
  };
}
