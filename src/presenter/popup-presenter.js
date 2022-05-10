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
    this.#addHandlers();
    return this;
  }

  renderPresenter() {
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #addHandlers() {
    document.addEventListener('keydown', handleEscapeDocument);

    const hidePopup = () => {
      document.body.removeChild(this.#popupComponent.element);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', handleEscapeDocument);
    };

    function handleEscapeDocument (evt) {
      if (isEscape(evt.code)) {
        evt.preventDefault();
        hidePopup();
      }
    }

    this.#popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', hidePopup);
  }
}
