import {render, replace, remove} from '../framework/render.js';
import { updateItem } from '../utils/util.js';
import MovieView from '../view/movie-view.js';
import PopupPresenter from './popup-presenter.js';

export default class CardPresenter {
  #movieContainer = null;
  #comments = [];
  #moviesModel = null;
  #filterPresenter = null;
  #updateContent = null;

  #movie = null;
  #movieComponent = null;

  constructor(movieContainer, comments, moviesModel, filterPresenter, updateContent) {
    this.#movieContainer = movieContainer;
    this.#comments = comments;
    this.#moviesModel = moviesModel;
    this.#filterPresenter = filterPresenter;
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
    const popupPresenter = new PopupPresenter(this.#comments, this.#movieComponent);
    popupPresenter.init(this.#movie);
  }

  #addToWatchlistClickHandler() {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  }

  #alreadyWatchedClickHandler() {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  }

  #favoriteClickHandler() {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  }

  destroy() {
    remove(this.#movieComponent);
  }

  #updateFilter() {
    this.#filterPresenter.init(this.#moviesModel);
  }
}
