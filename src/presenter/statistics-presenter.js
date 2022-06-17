import {remove, render, replace} from '../framework/render.js';
import StatisticsView from '../view/statistics-view.js';

export default class StatisticsPresenter {
  #footerStatisticsElement = null;
  #moviesModel = null;
  #moviesCount = 0;

  #statisticsComponent = null;

  constructor(footerStatisticsElement, moviesModel) {
    this.#footerStatisticsElement = footerStatisticsElement;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent.bind(this));
  }

  init() {
    this.#moviesCount = this.#moviesModel.movies.length;
    this.#renderStatistics();
  }

  #renderStatistics() {
    const prevStatisticsComponent = this.#statisticsComponent;
    this.#statisticsComponent = new StatisticsView(this.#moviesCount);

    if (prevStatisticsComponent && this.#footerStatisticsElement.contains(prevStatisticsComponent.element)) {
      replace(this.#statisticsComponent, prevStatisticsComponent);
    } else {
      render(this.#statisticsComponent, this.#footerStatisticsElement);
    }

    remove(prevStatisticsComponent);
  }

  #handleModelEvent() {
    this.init();
  }
}
