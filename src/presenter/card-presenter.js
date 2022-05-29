import {render, replace, remove} from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import CardView from '../view/card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class CardPresenter {
  #cardContainer = null;
  #comments = [];
  #moviesModel = null;
  #filterPresenter = null;

  #movie = null;
  #cardComponent = null;

  constructor(cardContainer, comments, moviesModel, filterPresenter) {
    this.#cardContainer = cardContainer;
    this.#comments = comments;
    this.#moviesModel = moviesModel;
    this.#filterPresenter = filterPresenter;
  }

  init(movie) {
    this.#movie = movie;

    const prevCardComponent = this.#cardComponent;
    this.#cardComponent = new CardView(movie);

    this.#cardComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick);
    this.#cardComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick);
    this.#cardComponent.setFavoriteClickHandler(this.#onFavoriteClick);
    this.#addClickHandler();

    if (prevCardComponent === null) {
      this.#renderCard();
      return;
    }

    if (this.#cardContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
  }

  #renderCard() {
    render(this.#cardComponent, this.#cardContainer);
  }

  #addClickHandler() {
    this.#cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      const popupPresenter = new PopupPresenter(this.#comments, this.#cardComponent);
      popupPresenter.init(this.#movie);
    });
  }

  #onAddToWatchlistClick = () => {
    this.#toggleWatchlist();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateCardView();
    this.#updateFilterView();
  };

  #onAlreadyWatchedClick = () => {
    this.#toggleAlreadyWatched();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateCardView();
    this.#updateFilterView();
  };

  #onFavoriteClick = () => {
    this.#toggleFavorite();
    updateItem(this.#moviesModel.movies, this.#movie);
    this.#updateCardView();
    this.#updateFilterView();
  };

  #updateCardView() {
    this.init(this.#movie);
  }

  #updateFilterView() {
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
