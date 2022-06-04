import { isEscape } from '../utils/util.js';
import {render, replace, remove} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #comments = [];
  #movieComponent = null;

  #popupComponent = null;
  #movie = null;

  static openedPresenter = null;

  constructor(comments, movieComponent) {
    this.#comments = comments;
    this.#movieComponent = movieComponent;
  }

  init(movie) {
    this.#movie = movie;

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(movie, this.#comments, this.#movieComponent);

    this.#popupComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler.bind(this));
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler.bind(this));
    this.#popupComponent.setFavoriteClickHandler(this.#favoriteClickHandler.bind(this));

    this.#popupComponent.setCloseButtonClickHandler(this.#hidePopup.bind(this));
    document.addEventListener('keydown', this.#documentKeydownHandler.bind(this));

    if (prevPopupComponent === null) {
      if (PopupPresenter.openedPresenter !== null) {
        PopupPresenter.openedPresenter.#hidePopup();
      }

      this.#renderPopup();
      PopupPresenter.openedPresenter = this;
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      this.#replacePopup(prevPopupComponent);
    }

    remove(prevPopupComponent);
  }

  #renderPopup() {
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #replacePopup(prevPopupComponent) {
    replace(this.#popupComponent, prevPopupComponent);
  }

  #documentKeydownHandler(evt) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#hidePopup();
    }
  }

  #hidePopup() {
    this.#popupComponent.element.remove();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#documentKeydownHandler);
  }

  #addToWatchlistClickHandler() {
    this.#updatePopup();
  }

  #alreadyWatchedClickHandler() {
    this.#updatePopup();
  }

  #favoriteClickHandler() {
    this.#updatePopup();
  }

  #updatePopup() {
    this.init(this.#movie);
  }
}
