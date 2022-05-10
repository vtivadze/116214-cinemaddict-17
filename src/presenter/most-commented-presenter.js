import {render} from '../render.js';
import MostCommentedView from '../view/most-commented-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';

const MOST_COMMETNTED_COUNT = 2;

export default class MostCommentedPresenter {
  #mostCommentedComponent = new MostCommentedView();
  #listContainerComponent = new ListContainerView();
  #mostCommentedMovies = null;

  #boardContainer = null;
  #moviesModel = null;

  constructor(boardContainer, moviesModel) {
    this.#boardContainer = boardContainer;
    this.#moviesModel = moviesModel;
  }

  init() {
    this.#mostCommentedMovies = this.#getMostCommentedMovies();
    this.#renderboard();
  }

  #getMostCommentedMovies() {
    return this.#moviesModel.mostCommented.slice(0, MOST_COMMETNTED_COUNT);
  }

  #renderboard() {
    render(this.#mostCommentedComponent, this.#boardContainer);
    render(this.#listContainerComponent, this.#mostCommentedComponent.element);
    this.#mostCommentedMovies.forEach((movie) => this.#renderCard(movie));
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
