import { FilterType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const NoMovieText = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies to watch now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNomovieTemplate = (currentFilterType) => (
  `<section class="films-list">
    <h2 class="films-list__title">${NoMovieText[currentFilterType]}</h2>
  </section>`
);

export default class NoMovieView extends AbstractView {
  #currentFilterType = null;

  constructor(currentFilterType) {
    super();
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createNomovieTemplate(this.#currentFilterType);
  }
}
