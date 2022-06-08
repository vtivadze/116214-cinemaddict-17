import {RenderPosition, render, remove} from '../framework/render.js';
import {SortType, UpdateType, UserAction} from '../const.js';
import {sortMovieByDate, sortMovieByRating} from '../utils/util.js';
import UserProfilePresenter from './user-profile-presenter.js';
import MoviePresenter from './movie-presenter.js';
import PopupPresenter from './popup-presenter.js';
import BoardView from '../view/board-view.js';
import MainContentView from '../view/main-content-view.js';
import NoMovieView from '../view/no-movie-view.js';
import MoviesListContainerView from '../view/movies-list-container-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import TopRatedView from '../view/top-rated-view.js';
import SortView from '../view/sort-view.js';

const MOVIE_COUNT_PER_STEP = 5;
const MOST_COMMETNTED_COUNT = 2;
const TOP_RATED_COUNT = 2;

export default class BoardPresenter {
  #siteMainElement = null;
  #siteHeaderElement = null;
  #moviesModel = null;
  #commentsModel = null;
  #filterPresenter = null;

  #boardComponent = new BoardView();
  #mainContentComponent = new MainContentView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #mostCommentedComponent = new MostCommentedView();
  #topRatedComponent = new TopRatedView();

  #userProfilePresenter = null;
  #popupPresenter = null;
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;

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

  constructor(siteMainElement, siteHeaderElement, moviesModel, commentsModel, filterPresenter) {
    this.#siteMainElement = siteMainElement;
    this.#siteHeaderElement = siteHeaderElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;

    this.#moviesModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#renderBoard();
  }

  get movies() {
    switch(this.#currentSortType) {
      case SortType.DATE:
        return [...this.#moviesModel.movies].sort(sortMovieByDate);
      case SortType.RATING:
        return [...this.#moviesModel.movies].sort(sortMovieByRating);
    }

    return this.#moviesModel.movies;
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch(actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch(updateType) {
      case UpdateType.PATCH:
        this.#updateCards(data);
        this.#updateFilter();
        break;
      case UpdateType.POPUP_PATCH:
        this.#updatePopup();
        this.#updateCards(data);
        this.#updateFilter();
        break;
      case UpdateType.MINOR:
        this.#updateCards(data);
        this.#updateFilter();
        this.#updateUserProfile();
        break;
      case UpdateType.POPUP_MINOR:
        this.#updatePopup();
        this.#updateCards(data);
        this.#updateFilter();
        this.#updateUserProfile();
        break;
      case UpdateType.MAJOR:

        break;
    }
  };

  #renderBoard() {
    this.#userProfilePresenter = new UserProfilePresenter(this.#siteHeaderElement);
    this.#userProfilePresenter.init(this.#moviesModel);

    render(this.#boardComponent, this.#siteMainElement);

    this.#renderSort();
    this.#renderMainContent();
    this.#renderMostCommentedMovies();
    this.#renderTopRatedMovies();
  }

  #renderSort(sortType = SortType.DEFAULT) {
    this.#sortComponent = new SortView(sortType);
    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler.bind(this));
  }

  #renderMainContent() {
    render(this.#mainContentComponent, this.#boardComponent.element);

    if (this.movies.length === 0) {
      this.#renderNoMovie();
    } else {
      render(this.#movieContainers.Main, this.#mainContentComponent.element);
      this.#renderMainContentMovies();
    }
  }

  #renderNoMovie() {
    render(new NoMovieView(), this.#mainContentComponent.element);
  }

  #renderMainContentMovies() {
    this.#renderMovies('Main', this.#getMainContentMovies());

    if (this.movies.length > MOVIE_COUNT_PER_STEP) {
      this.#renderLoadMoreButton();
    }
  }

  #renderMostCommentedMovies() {
    render(this.#mostCommentedComponent, this.#boardComponent.element);
    render(this.#movieContainers.MostCommented, this.#mostCommentedComponent.element);

    this.#renderMovies('MostCommented', this.#getMostCommentedMovies());
  }

  #renderTopRatedMovies() {
    render(this.#topRatedComponent, this.#boardComponent.element);
    render(this.#movieContainers.TopRated, this.#topRatedComponent.element);

    this.#renderMovies('TopRated', this.#getTopRatedMovies());
  }

  #renderMovies(containerType, movies) {
    movies.forEach((movie) => this.#renderMovie(containerType, movie));
  }

  #movieClickHandler = (movie) => {
    this.#popupPresenter = new PopupPresenter(this.#commentsModel, this.#handleViewAction);
    this.#popupPresenter.init(movie);
  };

  #renderMovie(containerType, movie) {
    const moviePresenter = new MoviePresenter(
      this.#movieContainers[containerType].element,
      this.#handleViewAction,
      this.#movieClickHandler,
    );
    moviePresenter.init(movie);

    this.#moviePresenters[containerType].set(movie.id, moviePresenter);
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler.bind(this));
    render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);
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

  #sortTypeChangeHandler(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;

    this.#clearMoviesList();
    this.#renderMainContentMovies();

    remove(this.#sortComponent);
    this.#renderSort(sortType);
  }

  #clearMoviesList() {
    this.#moviePresenters.Main.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.Main.clear();
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #getMainContentMovies() {
    return this.movies.slice(0, Math.min(this.movies.length, MOVIE_COUNT_PER_STEP));
  }

  #getMostCommentedMovies() {
    return this.#moviesModel.mostCommented.slice(0, MOST_COMMETNTED_COUNT);
  }

  #getTopRatedMovies() {
    return this.#moviesModel.topRated.slice(0, TOP_RATED_COUNT);
  }

  #updateFilter() {
    this.#filterPresenter.init(this.#moviesModel);
  }

  #updateCards(data) {
    this.#moviePresenters.Main.get(data.id)?.init(data);
    this.#moviePresenters.MostCommented.get(data.id)?.init(data);
    this.#moviePresenters.TopRated.get(data.id)?.init(data);
  }

  #updateUserProfile() {
    this.#userProfilePresenter.init(this.#moviesModel);
  }

  #updatePopup() {
    this.#popupPresenter.updatePopup();
  }
}
