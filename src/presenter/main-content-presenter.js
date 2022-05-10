import { render } from '../render.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import LoadMoreButtonPresenter from './load-more-button-presenter.js';
import NoMovieView from '../view/no-movie-view.js';
import CardPresenter from './card-presenter.js';

const MOVIE_COUNT_PER_STEP = 5;

export default class MainContentPresenter {
  #mainContentComponent = new MainContentView();
  #listContainerComponent = new ListContainerView();

  #contentContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #movies = [];

  #renderedMoviesCount = MOVIE_COUNT_PER_STEP;

  constructor(contentContainer, moviesModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#movies = [...this.#moviesModel.movies];
    this.#renderCardsContainer();
  }

  #renderCardsContainer() {
    render(this.#mainContentComponent, this.#contentContainer);
    if (this.#movies.length === 0) {
      render(new NoMovieView(), this.#mainContentComponent.element);
    } else {
      render(this.#listContainerComponent, this.#mainContentComponent.element);
      for (let i = 0; i < Math.min(this.#movies.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#movies[i]);
      }

      if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
        this.#renderLoadMoreButton();
      }
    }
  }

  #renderCard(movie) {
    const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
    const cardPresenter = new CardPresenter(movie, comments);
    cardPresenter.init().renderCard(this.#listContainerComponent.element);
  }

  #renderLoadMoreButton() {
    const loadMoreButtonPresenter = new LoadMoreButtonPresenter(
      this.#mainContentComponent.element,
      this.#moviesModel,
      this.#renderedMoviesCount,
      MOVIE_COUNT_PER_STEP,
      this.#renderCard.bind(this)
    );
    loadMoreButtonPresenter.init().renderLoadMoreButton();
  }
}