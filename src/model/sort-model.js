import { SortType } from '../const.js';
import Observable from '../framework/observable.js';

export default class SortModel extends Observable  {
  #currentSortType = SortType.DEFAULT;

  get currentSortType() {
    return this.#currentSortType;
  }

  updateSort = (updateType, sortType) => {
    this.#currentSortType = sortType;
    this._notify(updateType, sortType);
  };
}
