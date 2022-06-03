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

    this.#movieComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick);
    this.#movieComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#movieComponent.setFavoriteClickHandler(this.#onFavoriteClick);
    this.#movieComponent.setMovieClickHandler(this.#onMovieClick);

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

  #onMovieClick = () => {
    const popupPresenter = new PopupPresenter(this.#comments, this.#movieComponent);
    popupPresenter.init(this.#movie);
  };

  #onAddToWatchlistClick = () => {
    this.#toggleWatchlist();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  };

  #onAlreadyWatchedClick = () => {
    this.#toggleAlreadyWatched();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  };

  #onFavoriteClick = () => {
    this.#toggleFavorite();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateContent(this.#movie);
    this.#updateFilter();
  };

  destroy() {
    remove(this.#movieComponent);
  }

  #updateFilter() {
    this.#filterPresenter.init(this.#moviesModel);
  }

  #toggleWatchlist() {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
  }

  #toggleAlreadyWatched() {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
  }

  #toggleFavorite() {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
  }
}
