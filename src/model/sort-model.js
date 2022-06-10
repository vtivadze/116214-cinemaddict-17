import { SortType } from '../const.js';

export default class SortModel {
  #currentSortType = SortType.DEFAULT;

  get currentSortType() {
    return this.#currentSortType;
  }

  set currentSortType(sortType) {
    this.#currentSortType = sortType;
  }
}
