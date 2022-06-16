import {render} from '../framework/render.js';
import StatisticsView from '../view/statistics-view.js';

export default class StatisticsPresenter {
  #container = null;
  #moviesModel = null;
  #moviesCount = 0;

  constructor(container, moviesModel) {
    this.#container = container;
    this.#moviesModel = moviesModel;
  }

  init() {
    this.#moviesCount = this.#moviesModel.movies.length;
    this.#renderStatistics();
  }

  #renderStatistics() {
    render(new StatisticsView(this.#moviesCount), this.#container);
  }
}
