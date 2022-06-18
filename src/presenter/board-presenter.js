import { render, remove, replace } from '../framework/render.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { sortMovieByDate, sortMovieByRating } from '../utils/util.js';
import FilterPresenter from './filter-presenter.js';
import SortPresenter from './sort-presenter.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';
import BoardView from '../view/board-view.js';
import MainContentView from '../view/main-content-view.js';
import NoMovieView from '../view/no-movie-view.js';
import MoviesListContainerView from '../view/movies-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MovieLoadingView from '../view/movie-loading-view.js';
import MovieLoadingErrorView from '../view/movie-loading-error.js';

const MOVIE_COUNT_PER_STEP = 5;
const MOST_COMMETNTED_COUNT = 2;
const TOP_RATED_COUNT = 2;

export default class BoardPresenter {
  #siteMainElement = null;
  #moviesModel = null;
  #commentsModel = null;
  #filtersModel = null;
  #sortModel = null;

  #boardComponent = new BoardView();
  #mainContentComponent = new MainContentView();
  #topRatedComponent = new TopRatedView();
  #mostCommentedComponent = null;
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #movieLoadingComponent = new MovieLoadingView();
  #movieLoadingErrorComponent = new MovieLoadingErrorView();

  #popupPresenter = null;
  #filterPresenter = null;
  #noMovieComponent = null;
  #sortPresenter = null;

  #isPreservedRenderedMovieCount = false;
  #isMovieLoading = true;
  #isMovieLoadingError = false;

  #movieListContainerComponent = {
    Main: new MoviesListContainerView(),
    MostCommented: new MoviesListContainerView(),
    TopRated: new MoviesListContainerView(),
  };

  #moviePresenters = {
    Main: new Map(),
    MostCommented: new Map(),
    TopRated: new Map(),
  };

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;

  constructor(
    siteMainElement,
    moviesModel,
    commentsModel,
    filtersModel,
    sortModel
  ) {
    this.#siteMainElement = siteMainElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filtersModel = filtersModel;
    this.#sortModel = sortModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
    this.#sortModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    const filteredMovies =
      this.#filtersModel.currentFilterType === FilterType.ALL
        ? [...this.#moviesModel.movies]
        : [...this.#moviesModel.movies].filter(
          (movie) => movie.userDetails[this.#filtersModel.currentFilterType]
        );

    switch (this.#sortModel.currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortMovieByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortMovieByRating);
      default:
        return filteredMovies;
    }
  }

  init() {
    this.#filterPresenter = new FilterPresenter(
      this.#siteMainElement,
      this.#filtersModel,
      this.#moviesModel
    );
    this.#filterPresenter.init(this.#isMovieLoading);

    this.#sortPresenter = new SortPresenter(
      this.#siteMainElement,
      this.#sortModel,
      this.#moviesModel
    );
    this.#sortPresenter.init(this.#isMovieLoading);

    this.#popupPresenter = new PopupPresenter(
      this.#commentsModel,
      this.#handleViewAction.bind(this),
      this.#filtersModel
    );

    this.#renderBoard();
  }

  #renderBoard() {
    if (this.#isMovieLoading) {
      this.#renderMovieLoading();
      return;
    }

    render(this.#boardComponent, this.#siteMainElement);

    this.#renderMainContent();

    if (this.#isMovieLoadingError === false) {
      this.#renderMostCommentedContent();
      this.#renderTopRatedContent();
    }
  }

  #renderMovieLoading() {
    render(this.#movieLoadingComponent, this.#siteMainElement);
  }

  #renderMovieLoadingError() {
    render(this.#movieLoadingErrorComponent, this.#boardComponent.element);
  }

  #renderMainContent() {
    if (this.#isMovieLoadingError) {
      this.#renderMovieLoadingError();
    } else if (this.movies.length === 0) {
      this.#renderNoMovie();
    } else {
      render(this.#mainContentComponent, this.#boardComponent.element);
      render(
        this.#movieListContainerComponent.Main,
        this.#mainContentComponent.element
      );
      const mainContentMovies = this.#getMainContentMovies();
      this.#renderMovies('Main', mainContentMovies);

      if (this.movies.length > this.#renderedMovieCount) {
        this.#renderLoadMoreButton();
      }
    }
  }

  #renderNoMovie() {
    const prevNoMovieComponent = this.#noMovieComponent;
    this.#noMovieComponent = new NoMovieView(
      this.#filtersModel.currentFilterType
    );

    if (
      prevNoMovieComponent &&
      this.#boardComponent.element.contains(prevNoMovieComponent.element)
    ) {
      replace(this.#noMovieComponent, prevNoMovieComponent);
      return;
    }

    if (
      this.#mainContentComponent &&
      this.#boardComponent.element.contains(this.#mainContentComponent.element)
    ) {
      replace(this.#noMovieComponent, this.#mainContentComponent);
      return;
    }

    render(this.#noMovieComponent, this.#boardComponent.element);
  }

  #renderMostCommentedContent() {
    const mostCommentedMovies = this.#getMostCommentedMovies();

    if (mostCommentedMovies.length > 0) {
      this.#rednerMostCommentedContainer();
      this.#renderMovies('MostCommented', mostCommentedMovies);
    }
  }

  #rednerMostCommentedContainer() {
    const prevMostCommentedComponent = this.#mostCommentedComponent;
    this.#mostCommentedComponent = new MostCommentedView();

    if (
      prevMostCommentedComponent &&
      this.#boardComponent.element.contains(prevMostCommentedComponent.element)
    ) {
      replace(this.#mostCommentedComponent, prevMostCommentedComponent);
    } else {
      render(this.#mostCommentedComponent, this.#boardComponent.element);
    }

    render(
      this.#movieListContainerComponent.MostCommented,
      this.#mostCommentedComponent.element
    );
  }

  #renderTopRatedContent() {
    const topRatedMovies = this.#getTopRatedMovies();

    if (topRatedMovies.length > 0) {
      render(this.#topRatedComponent, this.#boardComponent.element);
      render(
        this.#movieListContainerComponent.TopRated,
        this.#topRatedComponent.element
      );

      this.#renderMovies('TopRated', topRatedMovies);
    }
  }

  #renderMovies(containerType, movies) {
    movies.forEach((movie) => this.#renderMovie(containerType, movie));
  }

  #renderMovie(containerType, movie) {
    const moviePresenter = new MoviePresenter(
      this.#movieListContainerComponent[containerType].element,
      this.#handleViewAction,
      this.#onMovieClick,
      this.#filtersModel
    );
    moviePresenter.init(movie);

    this.#moviePresenters[containerType].set(movie.id, moviePresenter);
  }

  #renderLoadMoreButton() {
    if (
      !this.#mainContentComponent.element.contains(
        this.#loadMoreButtonComponent.element
      )
    ) {
      this.#loadMoreButtonComponent.setClickHandler(
        this.#onLoadMoreButtonClick.bind(this)
      );
      render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);
    }
  }

  #cliearContentMovies() {
    this.#clearMovieListContent('Main');
    this.#clearMovieListContent('MostCommented');
    this.#clearMovieListContent('TopRated');
  }

  #clearMovieListContent(contentType) {
    this.#moviePresenters[contentType].forEach((presenter) =>
      presenter.destroy()
    );
    this.#moviePresenters[contentType].clear();

    if (contentType === 'Main') {
      this.#renderedMovieCount = this.#isPreservedRenderedMovieCount
        ? this.#renderedMovieCount
        : MOVIE_COUNT_PER_STEP;

      this.#isPreservedRenderedMovieCount = false;

      remove(this.#loadMoreButtonComponent);
    }
  }

  #getMoviesToLoad(from, to) {
    return this.movies.slice(from, to);
  }

  #getMainContentMovies() {
    return this.movies.slice(
      0,
      Math.min(this.movies.length, this.#renderedMovieCount)
    );
  }

  #getMostCommentedMovies() {
    return this.movies
      .sort((a, b) => b.comments.length - a.comments.length)
      .slice(0, MOST_COMMETNTED_COUNT);
  }

  #getTopRatedMovies() {
    return this.movies
      .sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating)
      .slice(0, TOP_RATED_COUNT);
  }

  #updateCards(data) {
    this.#moviePresenters.Main.get(data.id)?.init(data);
    this.#moviePresenters.MostCommented.get(data.id)?.init(data);
    this.#moviePresenters.TopRated.get(data.id)?.init(data);
  }

  #updateBoard() {
    this.#cliearContentMovies();
    remove(this.#boardComponent);
    this.#renderBoard();
  }

  #updateMostCommented() {
    this.#clearMovieListContent('MostCommented');
    this.#renderMostCommentedContent();
  }

  #updatePopup(movie) {
    this.#popupPresenter.updatePopup(movie);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.deleteComment(update.commentId);
        this.#moviesModel.updateMovie(updateType, update.movie);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.addComment(update.comment);
        this.#moviesModel.updateMovie(updateType, update.movie);
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.INIT:
        this.#isMovieLoading = false;
        remove(this.#movieLoadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.MOVIE_LOAD_ERROR:
        this.#isMovieLoading = false;
        this.#isMovieLoadingError = true;
        remove(this.#movieLoadingComponent);
        this.#renderBoard();
        break;
      case UpdateType.COMMENT_LOAD:
        this.#popupPresenter.refreshPopup(false);
        break;
      case UpdateType.COMMENT_LOAD_ERROR:
        this.#popupPresenter.refreshPopup(true);
        break;
      case UpdateType.PATCH:
        this.#updateCards(data);
        if (
          this.#popupPresenter.popupMovieId &&
          this.#popupPresenter.popupMovieId === data.id
        ) {
          this.#updatePopup(data);
        }
        break;
      case UpdateType.SORT:
        this.#isPreservedRenderedMovieCount = true;
        this.#updateBoard();
        break;
      case UpdateType.FILTER:
        this.#updateBoard();
        break;
      case UpdateType.BOARD:
        this.#isPreservedRenderedMovieCount = true;
        this.#updateBoard();
        break;
      case UpdateType.MINOR:
        this.#isPreservedRenderedMovieCount = true;
        this.#updateCards(data);
        this.#updateBoard();
        if (
          this.#popupPresenter.popupMovieId &&
          this.#popupPresenter.popupMovieId === data.id
        ) {
          this.#updatePopup(data);
        }
        break;
      case UpdateType.POPUP_PATCH:
        this.#updateCards(data);
        this.#updatePopup(data);
        break;
      case UpdateType.POPUP_MINOR:
        this.#isPreservedRenderedMovieCount = true;
        this.#updateCards(data);
        this.#updatePopup(data);
        this.#updateBoard();
        break;
      case UpdateType.POPUP_MAJOR:
        this.#updateCards(data);
        this.#updatePopup(data);
        this.#updateMostCommented();
        break;
    }
  };

  #onMovieClick = (movie) => {
    if (this.#popupPresenter.popupMovieId === movie.id) {
      return;
    }

    this.#popupPresenter.init(movie);
  };

  #onLoadMoreButtonClick() {
    const movieCount = this.movies.length;
    const newRenderedMovieCount = Math.min(
      movieCount,
      this.#renderedMovieCount + MOVIE_COUNT_PER_STEP
    );

    const movies = this.#getMoviesToLoad(
      this.#renderedMovieCount,
      newRenderedMovieCount
    );
    this.#renderMovies('Main', movies);

    this.#renderedMovieCount = newRenderedMovieCount;

    if (this.#renderedMovieCount >= movieCount) {
      remove(this.#loadMoreButtonComponent);
    }
  }
}
