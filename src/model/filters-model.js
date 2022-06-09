import Observable from '../framework/observable.js';
import { filters } from '../const.js';

export default class FiltersModel extends Observable {
  #filters = filters;

  get filters() {
    return this.#filters;
  }

  get currentFilterType() {
    return this.#filters.find((filter) => filter.isActive).type;
  }

  updateFilter = (updateType, activeFilterType) => {
    this.#filters.forEach((filter) => {filter.isActive = filter.type === activeFilterType;});
    this._notify(updateType, activeFilterType);
  };
}

