import {render, replace, remove} from '../framework/render.js';
import CardView from '../view/card-view.js';
import PopupPresenter from './popup-presenter.js';

export default class CardPresenter {
  #cardContainer = null;
  #movie = null;
  #comments = [];
  #moviesModel = null;
  #cardComponent = null;

  constructor(cardContainer, comments, moviesModel) {
    this.#cardContainer = cardContainer;
    this.#comments = comments;
    this.#moviesModel = moviesModel;
  }

  init(movie) {
    this.#movie = movie;

    const prevCardComponent = this.#cardComponent;
    this.#cardComponent = new CardView(movie);

    this.#cardComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick);
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
      const popupPresenter = new PopupPresenter(this.#movie, this.#comments);
      popupPresenter.init();
    });
  }

  #onAddToWatchlistClick = () => {
    // eslint-disable-next-line no-console
    console.log(this.#movie);
    console.log(this.#moviesModel);
  };

  #toggleWatchList() {
    // const movie
  }
}
