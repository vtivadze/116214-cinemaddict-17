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

    if (this.#siteMainElement.contains(prevFilterComponent.element)) {
      replace(this.#filterComponent, prevFilterComponent);
    }

    remove(prevFilterComponent);
  }

  #renderFilter() {
    render(this.#filterComponent, this.#siteMainElement);
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
