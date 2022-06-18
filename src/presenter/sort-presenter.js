import { render, replace, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { SortType, UpdateType } from '../const';

export default class SortPresenter {
  #sortModel = null;
  #siteMainElement = null;
  #moviesModel = null;

  #sortComponent = null;
  #currentSortType = null;

  constructor(siteMainElement, sortModel, moviesModel) {
    this.#sortModel = sortModel;
    this.#siteMainElement = siteMainElement;
    this.#moviesModel = moviesModel;

    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  init(isMovieLoading) {
    const previousSortcomponent = this.#sortComponent;

    this.#currentSortType = this.#sortModel.currentSortType;
    this.#sortComponent = new SortView(this.#currentSortType, isMovieLoading);
    this.#sortComponent.setSortTypeChangeHandler(this.#onSortTypeChange.bind(this));

    if (previousSortcomponent === null) {
      this.#renderSort();
      return;
    }

    replace(this.#sortComponent, previousSortcomponent);
    remove(previousSortcomponent);
  }

  setToDefault() {
    this.#sortModel.currentSortType = SortType.DEFAULT;
    this.init(false);
  }

  #renderSort() {
    render(this.#sortComponent, this.#siteMainElement);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #onSortTypeChange(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortModel.updateSort(UpdateType.SORT, sortType);
  }
}
