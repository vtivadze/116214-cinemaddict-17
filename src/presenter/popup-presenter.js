import { isEscape } from '../util.js';
import {render} from '../render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #movie = null;
  #comments = [];
  #popupComponent = null;

  constructor(movie, comments) {
    this.#movie = movie;
    this.#comments = comments;
  }

  init() {
    this.#popupComponent = new PopupView(this.#movie, this.#comments);
    document.addEventListener('keydown', this.#onDocumentKeydown);
    this.#popupComponent.setCloseButtonClickHandler(this.#hidePopup);
    return this;
  }

  renderPresenter() {
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
}
