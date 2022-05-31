import {render} from '../framework/render.js';
import {MOVIE_COUNT_PER_STEP, MOST_COMMETNTED_COUNT, TOP_RATED_COUNT} from '../const.js';
import MoviePresenter from './movie-presenter.js';
import BoardView from '../view/board-view.js';
import MainContentView from '../view/main-content-view.js';
import NoMovieView from '../view/no-movie-view.js';
import MoviesListContainerView from '../view/movies-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import TopRatedView from '../view/top-rated-view.js';

export default class BoardPresenter {
  #siteMainElement = null;
  #moviesModel = null;
  #commentsModel = null;
  #filterPresenter = null;

  #boardComponent = new BoardView();
  #mainContentComponent = new MainContentView();
  #mainMoviesListContainerComponent = new MoviesListContainerView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #mostCommentedComponent = new MostCommentedView();
  #topRatedComponent = new TopRatedView();

  #moviesPresenters = [];
  #movies = [];

  #movieCountPerStep = MOVIE_COUNT_PER_STEP;
  #renderedMoviesCount = this.#movieCountPerStep;

  constructor(siteMainElement, moviesModel, commentsModel, filterPresenter) {
    this.#siteMainElement = siteMainElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;
  }

  init() {
    this.#movies = [...this.#moviesModel.movies];
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#siteMainElement);

    this.#renderMainContent();
    this.#renderMosteCommentedMovies();
    this.#renderTopRatedMovies();
  }

  #renderMainContent() {
    render(this.#mainContentComponent, this.#boardComponent.element);

    if (this.#movies.length === 0) {
      this.#renderNoMovie();
    } else {
      this.#renderMainContentMovies();
    }
  }

  #renderNoMovie() {
    render(new NoMovieView(), this.#mainContentComponent.element);
  }

  #renderMainContentMovies() {
    render(this.#mainMoviesListContainerComponent, this.#mainContentComponent.element);

    for (let i = 0; i < Math.min(this.#movies.length, this.#movieCountPerStep); i++) {
      this.#renderMovie(this.#mainMoviesListContainerComponent, this.#movies[i]);
    }

    if (this.#movies.length > this.#movieCountPerStep) {
      this.#renderLoadMoreButton();
    }
  }

  #renderMovie(moviesListContainerComponent, movie) {
    const comments = this.#getMovieComments(movie);

    const moviePresenter = new MoviePresenter(
      moviesListContainerComponent.element,
      comments,
      this.#moviesModel,
      this.#filterPresenter,
      // this.#updateContent
    );
    moviePresenter.init(movie);
    // this.cardPresenters.set(movie.id, cardPresenter);
  }

  #getMovieComments(movie) {
    return this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent.setClickHandler(this.#onLoadMoreButtonClick);
    render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);
  }

  #onLoadMoreButtonClick = () => {
    this.#moviesModel.movies
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + this.#movieCountPerStep)
      .forEach((movie) => this.#renderMovie(this.#mainMoviesListContainerComponent, movie));

    this.#renderedMoviesCount += this.#movieCountPerStep;

    if (this.#renderedMoviesCount >= this.#moviesModel.movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

  #renderMosteCommentedMovies() {
    const moviesListContainerComponent = new MoviesListContainerView();
    const mostCommentedMovies = this.#getMostCommentedMovies();

    render(this.#mostCommentedComponent, this.#boardComponent.element);
    render(moviesListContainerComponent, this.#mostCommentedComponent.element);

    mostCommentedMovies.forEach((movie) => this.#renderMovie(moviesListContainerComponent, movie));
  }

  #getMostCommentedMovies() {
    return this.#moviesModel.mostCommented.slice(0, MOST_COMMETNTED_COUNT);
  }

  #renderTopRatedMovies() {
    const moviesListContainerComponent = new MoviesListContainerView();
    const topRatedMovies = this.#getTopRatedMovies();

    render(this.#topRatedComponent, this.#boardComponent.element);
    render(moviesListContainerComponent, this.#topRatedComponent.element);

    topRatedMovies.forEach((movie) => this.#renderMovie(moviesListContainerComponent, movie));
  }

  #getTopRatedMovies() {
    return this.#moviesModel.topRated.slice(0, TOP_RATED_COUNT);
  }

  // #updateContent = (movie) => this.#contentPresenters.forEach(
  //   (contentPresenter) => contentPresenter.cardPresenters.forEach(
  //     (cardPresenter) => {
  //       if (cardPresenter.movie.id === movie.id) {
  //         cardPresenter.init(movie);
  //       }
  //     }
  //   )
  // );
}
