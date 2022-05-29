import { isEscape } from '../utils/util.js';
import {render, replace, remove} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #comments = [];
  #cardComponent = null;

  #popupComponent = null;
  #movie = null;

  constructor(comments, cardComponent) {
    this.#comments = comments;
    this.#cardComponent = cardComponent;
  }

  init(movie) {
    this.#movie = movie;

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(movie, this.#comments, this.#cardComponent);

    this.#popupComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick);
    this.#popupComponent.setCloseButtonClickHandler(this.#hidePopup);
    document.addEventListener('keydown', this.#onDocumentKeydown);

    if (prevPopupComponent === null) {
      this.#renderPopup();
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  }

  #renderPopup() {
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #onDocumentKeydown = (evt) => {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#hidePopup();
    }
  };

  #hidePopup = () => {
    this.#popupComponent.element.remove();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onDocumentKeydown);
  };

  #onAddToWatchlistClick = () => {
    this.init(this.#movie);
  };
}
