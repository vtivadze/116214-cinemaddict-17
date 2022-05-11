import AbstractView from '../framework/view/abstract-view.js';

const createStatisticsTemplate = (moviesCount) => `<p>${moviesCount} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  #moviesCount = 0;

  constructor(moviesCount) {
    super();
    this.#moviesCount = moviesCount;
  }

  get template() {
    return createStatisticsTemplate(this.#moviesCount);
  }
}
