import {render, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import MovieView from '../view/movie-view.js';

export default class MoviePresenter {
  #movieContainer = null;
  #changeData = null;
  #movieClickHandler = null;

  #movie = null;
  #movieComponent = null;

  constructor(movieContainer, changeData, movieClickHandler) {
    this.#movieContainer = movieContainer;
    this.#changeData = changeData;
    this.#movieClickHandler = movieClickHandler;
  }

  init(movie) {
    this.#movie = movie;

    const prevMovieComponent = this.#movieComponent;
    this.#movieComponent = new MovieView(movie);

    this.#movieComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler.bind(this));
    this.#movieComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler.bind(this));
    this.#movieComponent.setFavoriteClickHandler(this.#favoriteClickHandler.bind(this));
    this.#movieComponent.setMovieClickHandler(this.#movieClickHandler);

    if (prevMovieComponent === null) {
      this.#renderMovie();
      return;
    }

    if (this.#movieContainer.contains(prevMovieComponent.element)) {
      this.#replaceMovie(prevMovieComponent);
    }

    remove(prevMovieComponent);
  }

  #renderMovie() {
    render(this.#movieComponent, this.#movieContainer);
  }

  #replaceMovie(prevMovieComponent) {
    replace(this.#movieComponent, prevMovieComponent);
  }

  #addToWatchlistClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;

    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, movie);
  }

  #alreadyWatchedClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;

    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.MINOR, movie);
  }

  #favoriteClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;

    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.PATCH, movie);
  }

  destroy() {
    remove(this.#movieComponent);
  }
}
