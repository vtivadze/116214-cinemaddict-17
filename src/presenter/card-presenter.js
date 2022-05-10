import {render} from '../render.js';
import CardView from '../view/card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class CardPresenter {
  #movie = null;
  #cardComponent = null;
  #comments = [];

  constructor(movie, comments) {
    this.#movie = movie;
    this.#comments = comments;
  }

  init() {
    this.#cardComponent = new CardView(this.#movie);
    this.#addClickHandler();
    return this;
  }

  renderCard(cardContainer) {
    render(this.#cardComponent, cardContainer);
  }

  #addClickHandler() {
    this.#cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      const popupPresenter = new PopupPresenter(this.#movie, this.#comments);
      popupPresenter.init().renderPresenter();
    });
  }
}
