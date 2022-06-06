import {RenderPosition, render, remove} from '../framework/render.js';
import {SortType} from '../const.js';
import {sortMovieByDate, sortMovieByRating, updateItem} from '../utils/util.js';
import MoviePresenter from './movie-presenter.js';
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
  #moviesModel = null;
  #commentsModel = null;
  #filterPresenter = null;

  #boardComponent = new BoardView();
  #mainContentComponent = new MainContentView();
  #loadMoreButtonComponent = new LoadMoreButtonView();
  #mostCommentedComponent = new MostCommentedView();
  #topRatedComponent = new TopRatedView();

  #currentSortType = SortType.DEFAULT;
  #sortComponent = null;

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

  #renderedMoviesCount = MOVIE_COUNT_PER_STEP;

  constructor(siteMainElement, moviesModel, commentsModel, filterPresenter) {
    this.#siteMainElement = siteMainElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;
  }

  init() {
    this.#renderBoard();
  }

  get movies() {
    return this.#moviesModel.movies;
  }

  #renderBoard() {
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

  #renderMovie(containerType, movie) {
    const moviePresenter = new MoviePresenter(
      this.#movieContainers[containerType].element,
      this.#getMovieComments(movie),
      this.#moviesModel,
      this.#updateContent
    );
    moviePresenter.init(movie);

    this.#moviePresenters[containerType].set(movie.id, moviePresenter);
  }

  #getMovieComments(movie) {
    return this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
  }

  #renderLoadMoreButton() {
    this.#loadMoreButtonComponent.setClickHandler(this.#loadMoreButtonClickHandler.bind(this));
    render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);
  }

  #loadMoreButtonClickHandler() {
    this.#renderMovies('Main', this.#getMoviesToLoad());

    this.#renderedMoviesCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMoviesCount >= this.#moviesModel.movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  }

  #sortTypeChangeHandler(sortType) {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortMovies(sortType);
    this.#clearMoviesList();
    this.#renderMainContentMovies();
    remove(this.#sortComponent);
    this.#renderSort(sortType);
  }

  #sortMovies(sortType) {
    switch(sortType) {
      case SortType.DATE:
        this.movies.sort(sortMovieByDate);
        break;
      case SortType.RATING:
        this.movies.sort(sortMovieByRating);
        break;
      case SortType.DEFAULT:
        this.movies;
    }

    this.#currentSortType = sortType;
  }

  #clearMoviesList() {
    this.#moviePresenters.Main.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.Main.clear();
    this.#renderedMoviesCount = MOVIE_COUNT_PER_STEP;
    remove(this.#loadMoreButtonComponent);
  }

  #getMainContentMovies() {
    return this.movies.slice(0, Math.min(this.movies.length, MOVIE_COUNT_PER_STEP));
  }

  #getMoviesToLoad() {
    return this.movies.slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIE_COUNT_PER_STEP);
  }

  #getMostCommentedMovies() {
    return this.#moviesModel.mostCommented.slice(0, MOST_COMMETNTED_COUNT);
  }

  #getTopRatedMovies() {
    return this.#moviesModel.topRated.slice(0, TOP_RATED_COUNT);
  }

  #updateSameMovies = (movie) => {
    Object.values(this.#moviePresenters).forEach((presenters) => presenters.get(movie.id)?.init(movie));
  };

  #updateFilter() {
    this.#filterPresenter.init(this.#moviesModel);
  }

  #updateContent = (movie) => {
    updateItem(this.#moviesModel.movies, movie);
    this.#updateSameMovies(movie);
    this.#updateFilter();
  };
}
