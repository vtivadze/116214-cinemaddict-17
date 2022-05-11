import {render} from '../render.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';

export default class LoadMoreButtonPresenter {
  #loadMoreButtonComponent = new LoadMoreButtonView();

  #container = null;
  #moviesModel = null;
  #renderedMoviesCount = 0;
  #movieCountPerStep = null;
  #renderCard = null;

  constructor(container, moviesModel, renderedMoviesCount, movieCountPerStep, renderCard) {
    this.#container = container;
    this.#moviesModel = moviesModel;
    this.#renderedMoviesCount = renderedMoviesCount;
    this.#movieCountPerStep = movieCountPerStep;
    this.#renderCard = renderCard;
  }

  init() {
    this.#loadMoreButtonComponent.setClickHandler(this.#handleLoadMoreButtonClick);
    return this;
  }

  renderLoadMoreButton() {
    render(this.#loadMoreButtonComponent, this.#container);
  }

  #handleLoadMoreButtonClick = () => {
    this.#moviesModel.movies
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + this.#movieCountPerStep)
      .forEach((movie) => this.#renderCard(movie));

    this.#renderedMoviesCount += this.#movieCountPerStep;

    if (this.#renderedMoviesCount >= this.#moviesModel.movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };
}
