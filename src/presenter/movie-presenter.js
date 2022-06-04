import {render, replace, remove} from '../framework/render.js';
import MovieView from '../view/movie-view.js';
import PopupPresenter from './popup-presenter.js';

export default class CardPresenter {
  #movieContainer = null;
  #comments = [];
  #moviesModel = null;
  #updateContent = null;

  #movie = null;
  #movieComponent = null;

  constructor(movieContainer, comments, moviesModel, updateContent) {
    this.#movieContainer = movieContainer;
    this.#comments = comments;
    this.#moviesModel = moviesModel;
    this.#updateContent = updateContent;
  }

  init(movie) {
    this.#movie = movie;

    const prevMovieComponent = this.#movieComponent;
    this.#movieComponent = new MovieView(movie);

    this.#movieComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler.bind(this));
    this.#movieComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler.bind(this));
    this.#movieComponent.setFavoriteClickHandler(this.#favoriteClickHandler.bind(this));
    this.#movieComponent.setMovieClickHandler(this.#movieClickHandler.bind(this));

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

  #movieClickHandler() {
    const popupPresenter = new PopupPresenter(this.#comments, this.#updateContent);
    popupPresenter.init(this.#movie);
  }

  #addToWatchlistClickHandler() {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateContent(this.#movie);
  }

  #alreadyWatchedClickHandler() {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateContent(this.#movie);
  }

  #favoriteClickHandler() {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateContent(this.#movie);
  }

  destroy() {
    remove(this.#movieComponent);
  }
}
