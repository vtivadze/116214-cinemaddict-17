import {createElement} from '../render.js';

const createStatisticsTemplate = (moviesCount) => `<p>${moviesCount} movies inside</p>`;

export default class StatisticsView {
  #element = null;
  #moviesCount = 0;

  constructor(moviesCount) {
    this.#moviesCount = moviesCount;
  }

  get template() {
    return createStatisticsTemplate(this.#moviesCount);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
