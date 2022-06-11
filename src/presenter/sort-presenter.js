import { render, replace, remove } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import { UpdateType } from '../const';

export default class SortPresenter {
  #sortModel = null;
  #siteMainElement = null;

  #sortComponent = null;
  #currentSortType = null;

  constructor(siteMainElement, sortModel) {
    this.#sortModel = sortModel;
    this.#siteMainElement = siteMainElement;

    this.#sortModel.addObserver(this.#handleModelEvent);
  }

  init() {
    const previousSortcomponent = this.#sortComponent;

    this.#currentSortType = this.#sortModel.currentSortType;
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange.bind(this));

    if (previousSortcomponent === null) {
      this.#renderSort();
      return;
    }

    replace(this.#sortComponent, previousSortcomponent);
    remove(previousSortcomponent);
  }

  #renderSort() {
    render(this.#sortComponent, this.#siteMainElement);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleSortTypeChange(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortModel.updateSort(UpdateType.BOARD, sortType);
  }
}
