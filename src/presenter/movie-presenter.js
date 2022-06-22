import {render, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType, FilterType, MovieUpdatingStatus } from '../const.js';
import MovieView from '../view/movie-view.js';

export default class MoviePresenter {
  #movieContainer = null;
  #changeData = null;
  #handleMovieClick = null;
  #filtersModel = null;

  #movie = null;
  #movieComponent = null;

  #isMovieUpdating = false;

  constructor(movieContainer, changeData, handleMovieClick, filtersModel) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
    this.#handleMovieClick = handleMovieClick;
    this.#filtersModel = filtersModel;
  }

  init(movie, isMovieUpdating) {
    this.#movie = movie;
    this.#isMovieUpdating = isMovieUpdating;

    const prevMovieComponent = this.#movieComponent;
    this.#movieComponent = new MovieView(movie, this.#isMovieUpdating);

    if (!this.#isMovieUpdating) {
      this.#movieComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick.bind(this));
      this.#movieComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick.bind(this));
      this.#movieComponent.setFavoriteClickHandler(this.#onFavoriteClick.bind(this));
    }
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

  setMovieUpdating() {
    this.#isMovieUpdating = MovieUpdatingStatus.TRUE;
    this.init(this.#movie, this.#isMovieUpdating);
  }

  setMovieUpdateAborting(updatableField) {
    const resetMovieUpdating = () => {
      this.#isMovieUpdating = MovieUpdatingStatus.FALSE;
      this.#movie.userDetails[updatableField] = !this.#movie.userDetails[updatableField];
      this.init(this.#movie, this.#isMovieUpdating);
    };

    this.#movieComponent.shake(resetMovieUpdating);
  }

  #renderMovie() {
    render(this.#movieComponent, this.#movieContainer);
  }

  #replaceMovie(prevMovieComponent) {
    replace(this.#movieComponent, prevMovieComponent);
  }

  #onAddToWatchlistClick() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, {movie, moviePresenter: this, updatableField: 'watchlist'});
  }

  #onAlreadyWatchedClick() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, {movie, moviePresenter: this, updatableField: 'alreadyWatched'});
  }

  #onFavoriteClick() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;

    const currentFilterType = this.#filtersModel.currentFilterType;

    const updateType = currentFilterType === FilterType.ALL ? UpdateType.PATCH : UpdateType.MINOR;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, {movie, moviePresenter: this, updatableField: 'favorite'});
  }
}
