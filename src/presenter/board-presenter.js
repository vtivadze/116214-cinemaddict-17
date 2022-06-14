import {render, remove, replace} from '../framework/render.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortMovieByDate, sortMovieByRating} from '../utils/util.js';
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
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #mostCommentedComponent = null;
  #topRatedComponent = new TopRatedView();

  #popupPresenter = null;
  #filterPresenter = null;
  #noMovieComponent = null;
  #sortPresenter = null;

  #movieContainers = {
    Main: new MoviesListContainerView(),
    MostCommented: new MoviesListContainerView(),
    TopRated: new MoviesListContainerView()
  };

  #moviePresenters = {
    Main: new Map(),
    MostCommented: new Map(),
    TopRated: new Map()
  };

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;

  constructor(siteMainElement, moviesModel, commentsModel, filtersModel, sortModel) {
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

  init() {
    this.#filterPresenter = new FilterPresenter(this.#siteMainElement, this.#filtersModel, this.#moviesModel);
    this.#filterPresenter.init(this.#moviesModel);

    this.#sortPresenter = new SortPresenter(this.#siteMainElement, this.#sortModel);
    this.#sortPresenter.init(this.#moviesModel);

    this.#popupPresenter = new PopupPresenter(this.#commentsModel, this.#handleViewAction.bind(this));

    this.#renderBoard();
  }

  get movies() {
    const filteredMovies = this.#filtersModel.currentFilterType === FilterType.ALL
      ? [...this.#moviesModel.movies]
      : [...this.#moviesModel.movies].filter((movie) => movie.userDetails[this.#filtersModel.currentFilterType]);

    switch(this.#sortModel.currentSortType) {
      case SortType.DATE:
        return filteredMovies.sort(sortMovieByDate);
      case SortType.RATING:
        return filteredMovies.sort(sortMovieByRating);
      default:
        return filteredMovies;
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
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
    switch(updateType) {
      case UpdateType.PATCH:
        this.#updateCards(data);
        break;
      case UpdateType.BOARD:
        this.#updateBoard();
        break;
      case UpdateType.MINOR:
        this.#updateCards(data);
        this.#updateBoard();
        break;
      case UpdateType.POPUP_MINOR:
        this.#updateCards(data);
        this.#updatePopup(data);
        break;
      case UpdateType.POPUP_MAJOR:
        this.#updateCards(data);
        this.#updatePopup(data);
        this.#updateMostCommented();
        break;
    }
  };

  #renderBoard() {
    render(this.#boardComponent, this.#siteMainElement);

    this.#renderMainContent();
    this.#renderMostCommentedContent();
    this.#renderTopRatedContent();
  }

  #renderMainContent() {
    if (this.movies.length === 0) {
      this.#renderNoMovie();
    } else {
      render(this.#mainContentComponent, this.#boardComponent.element);
      render(this.#movieContainers.Main, this.#mainContentComponent.element);
      this.#renderMovies('Main', this.#getMainContentMovies());
    }
  }

  #renderNoMovie() {
    const prevNoMovieComponent = this.#noMovieComponent;
    this.#noMovieComponent = new NoMovieView(this.#filtersModel.currentFilterType);

    if (prevNoMovieComponent && this.#boardComponent.element.contains(prevNoMovieComponent.element)) {
      replace(this.#noMovieComponent, prevNoMovieComponent);
      return;
    }

    if (this.#mainContentComponent && this.#boardComponent.element.contains(this.#mainContentComponent.element)) {
      replace(this.#noMovieComponent, this.#mainContentComponent);
      return;
    }

    render(this.#noMovieComponent, this.#boardComponent.element);
  }

  #renderMostCommentedContent() {
    const mostCommentedMovies = this.#getMostCommentedMovies();

    if (mostCommentedMovies.length > 0) {
      this.#rednerMostCommented();
      this.#renderMovies('MostCommented', mostCommentedMovies);
    }
  }

  #rednerMostCommented() {
    const prevMosteCommentedComponent = this.#mostCommentedComponent;
    this.#mostCommentedComponent = new MostCommentedView();

    if (prevMosteCommentedComponent === null) {
      render(this.#mostCommentedComponent, this.#boardComponent.element);
    } else {
      replace(this.#mostCommentedComponent, prevMosteCommentedComponent);
    }

    render(this.#movieContainers.MostCommented, this.#mostCommentedComponent.element);
  }

  #renderTopRatedContent() {
    const topRatedMovies = this.#getTopRatedMovies();

    if (topRatedMovies.length > 0) {
      render(this.#topRatedComponent, this.#boardComponent.element);
      render(this.#movieContainers.TopRated, this.#topRatedComponent.element);

      this.#renderMovies('TopRated', topRatedMovies);
    }
  }

  #renderMovies(containerType, movies) {
    movies.forEach((movie) => this.#renderMovie(containerType, movie));

    if (containerType === 'Main' && this.movies.length > MOVIE_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #movieClickHandler = (movie) => {
    this.#popupPresenter.init(movie);
  };

  #renderMovie(containerType, movie) {
    const moviePresenter = new MoviePresenter(
      this.#movieContainers[containerType].element,
      this.#handleViewAction,
      this.#movieClickHandler,
      this.#filtersModel
    );
    moviePresenter.init(movie);

    this.#moviePresenters[containerType].set(movie.id, moviePresenter);
  }

  #renderLoadMoreButton() {
    if (!this.#mainContentComponent.element.contains(this.#loadMoreButtonComponent.element)) {
      this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler.bind(this));
      render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);
    }
  }

  #loadMoreButtonClickHandler() {
    const movieCount = this.movies.length;
    const newRenderedMovieCount = Math.min(movieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP);
    const movies = this.movies.slice(this.#renderedMovieCount, newRenderedMovieCount);
    this.#renderMovies('Main', movies);

    this.#renderedMovieCount = newRenderedMovieCount;

    if (this.#renderedMovieCount >= movieCount) {
      remove(this.#loadMoreButtonComponent);
    }
  }

  #cliearContentMovies() {
    this.#clearMainContentMovies();
    this.#clearMostCommentedContentMovies();
    this.#clearTopRatedContentMovies();
  }

  #clearMainContentMovies() {
    this.#moviePresenters.Main.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.Main.clear();
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #clearMostCommentedContentMovies() {
    this.#moviePresenters.MostCommented.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.MostCommented.clear();
  }

  #clearTopRatedContentMovies() {
    this.#moviePresenters.TopRated.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.TopRated.clear();
  }

  #getMainContentMovies() {
    return this.movies.slice(0, Math.min(this.movies.length, MOVIE_COUNT_PER_STEP));
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
    this.#clearMostCommentedContentMovies();
    this.#renderMostCommentedContent();
  }

  #updatePopup(movie) {
    this.#popupPresenter.updatePopup(movie);
  }
}
