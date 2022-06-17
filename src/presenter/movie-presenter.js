import {render, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import MovieView from '../view/movie-view.js';

export default class MoviePresenter {
  #movieContainer = null;
  #changeData = null;
  #handleMovieClick = null;
  #filtersModel = null;

  #movie = null;
  #movieComponent = null;

  constructor(movieContainer, changeData, handleMovieClick, filtersModel) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
    this.#handleMovieClick = handleMovieClick;
    this.#filtersModel = filtersModel;
  }

  init(movie) {
    this.#movie = movie;

    const prevMovieComponent = this.#movieComponent;
    this.#movieComponent = new MovieView(movie);

    this.#movieComponent.setAddToWatchlistClickHandler(this.#handleAddToWatchlistClick.bind(this));
    this.#movieComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick.bind(this));
    this.#movieComponent.setFavoriteClickHandler(this.#handleFavoriteClick.bind(this));
    this.#movieComponent.setMovieClickHandler(this.#handleMovieClick);

    if (prevMovieComponent === null) {
      this.#renderMovie();
      return;
    }

    if (this.#movieContainer.contains(prevMovieComponent.element)) {
      this.#replaceMovie(prevMovieComponent);
    }

    remove(prevMovieComponent);
  }

  destroy() {
    remove(this.#movieComponent);
  }

  #renderMovie() {
    render(this.#movieComponent, this.#movieContainer);
  }

  #replaceMovie(prevMovieComponent) {
    replace(this.#movieComponent, prevMovieComponent);
  }

  #handleAddToWatchlistClick() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }

  #handleAlreadyWatchedClick() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }

  #handleFavoriteClick() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }
}
