import {render} from '../framework/render.js';
import StatisticsView from '../view/statistics-view.js';

export default class StatisticsPresenter {
  #container = null;
  #moviesModel = null;
  #moviecCount = 0;

  constructor(container, moviesModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;
  }

  init() {
    this.#moviecCount = this.#moviesModel.movies.length;
    return this;
  }

  renderStatistics() {
    render(new StatisticsView(this.#moviecCount), this.#container);
  }
}
