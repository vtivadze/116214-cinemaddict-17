import {render} from '../framework/render.js';
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
  #filterPresenter = null;

  #movies = [];
  #cardPresenter = new Map();

  #renderedMoviesCount = MOVIE_COUNT_PER_STEP;

  constructor(contentContainer, moviesModel, commentsModel, filterPresenter) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;
  }

  init() {
    this.#movies = [...this.#moviesModel.movies];
    this.#renderCardsContainer();

    if (this.#movies.length === 0) {
      this.#renderNoMovie();
    } else {
      this.#renderMovies();
    }
  }

  #renderCardsContainer() {
    render(this.#mainContentComponent, this.#contentContainer);
  }

  #renderListContainer() {
    render(this.#listContainerComponent, this.#mainContentComponent.element);
  }

  #renderCard(movie) {
    const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
    const cardPresenter = new CardPresenter(
      this.#listContainerComponent.element,
      comments,
      this.#moviesModel,
      this.#filterPresenter);
    cardPresenter.init(movie);
    this.#cardPresenter.set(movie.id, cardPresenter);
  }

  #renderLoadMoreButton() {
    const loadMoreButtonPresenter = new LoadMoreButtonPresenter(
      this.#mainContentComponent.element,
      this.#moviesModel,
      this.#renderedMoviesCount,
      MOVIE_COUNT_PER_STEP,
      this.#renderCard.bind(this)
    );
    loadMoreButtonPresenter.init();
  }

  #renderNoMovie() {
    render(new NoMovieView(), this.#mainContentComponent.element);
  }

  #renderMovies() {
    this.#renderListContainer();
    for (let i = 0; i < Math.min(this.#movies.length, MOVIE_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#movies[i]);
    }

    if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }
}
