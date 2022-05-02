import {createElement} from '../render.js';

const createStatisticsTemplate = (moviesCount) => `<p>${moviesCount} movies inside</p>`;

export default class StatisticsView {
  constructor(movies) {
    this.movies = movies;
  }

  getTemplate() {
    return createStatisticsTemplate(this.movies.length);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
