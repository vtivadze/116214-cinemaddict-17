import {render} from '../render.js';
import TopRatedView from '../view/top-rated-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';

const TOP_RATED_COUNT = 2;

export default class TopRatedPresenter {
  #topRatedComponenet = new TopRatedView();
  #listContainerComponent = new ListContainerView();
  #topRatedMovies = null;

  #contentContainer = null;
  #moviesModel = null;

  constructor(contentContainer, moviesModel) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
  }

  init() {
    this.#topRatedMovies = this.#getTopRatedMovies();
    this.#renderCardsContainer();
  }

  #getTopRatedMovies() {
    return this.#moviesModel.topRated.slice(0, TOP_RATED_COUNT);
  }

  #renderCardsContainer() {
    render(this.#topRatedComponenet, this.#contentContainer);
    render(this.#listContainerComponent, this.#topRatedComponenet.element);
    this.#topRatedMovies.forEach((movie) => this.#renderCard(movie));
  }

  #renderCard(movie) {
    const cardComponent = new CardView(movie);

    // const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(comment.id));
    // const popupComponent = new PopupView(movie, comments);

    // const hidePopup = () => {
    //   document.body.removeChild(popupComponent.element);
    //   document.body.classList.remove('hide-overflow');
    //   document.removeEventListener('keydown', handleEscapeDocument);
    // };

    // function handleEscapeDocument (evt) {
    //   if (isEscape(evt.code)) {
    //     evt.preventDefault();
    //     hidePopup();
    //   }
    // }

    // const showPopup = () => {
    //   document.body.classList.add('hide-overflow');
    //   document.body.appendChild(popupComponent.element);
    //   document.addEventListener('keydown', handleEscapeDocument);
    // };

    // cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
    //   showPopup();
    // });

    // popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
    //   hidePopup();
    // });

    render(cardComponent, this.#listContainerComponent.element);
  }
}
