import {createElement} from '../render.js';

const createStatisticsTemplate = (moviesCount) => `<p>${moviesCount} movies inside</p>`;

export default class StatisticsView {
  #element = null;
  #movies = null;

  constructor(movies) {
    this.#movies = movies;
  }

  get template() {
    return createStatisticsTemplate(this.#movies.length);
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
