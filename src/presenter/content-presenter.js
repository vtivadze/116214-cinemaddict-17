import { isEscape } from '../util.js';
import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommented from '../view/most-commented-view.js';
import PopupView from '../view/popup-view.js';
import CommentsModel from '../model/comments-model.js';

export default class ContentPresenter {
  CARDS_COUNT_EXTRA = 2;

  #board = null;
  #moviesModel = null;
  #movies = [];

  #commentsModel = new CommentsModel();

  #contentContainerComponent = new ContentContainerView();

  #mainContentComponent = new MainContentView();
  #mainContentListComponent = new ListContainerView();

  #extraContentComponent = new TopRatedView();
  #extraContentListComponent = new ListContainerView();

  #mostCommentedComponent = new MostCommented();
  #mostCommentedListcomponent = new ListContainerView();

  init(board, moviesModel) {
    this.#board = board;
    this.#moviesModel = moviesModel;
    this.#movies = [...this.#moviesModel.movies];

    render(this.#contentContainerComponent, this.#board);

    render(this.#mainContentComponent, this.#contentContainerComponent.element);
    render(this.#mainContentListComponent, this.#mainContentComponent.element);
    for (let i = 0; i < this.#movies.length; i++) {
      this.#renderCard(this.#movies[i], this.#mainContentListComponent.element);
    }
    render(new ShowMoreButtonView(), this.#mainContentComponent.element);

    render(this.#extraContentComponent, this.#contentContainerComponent.element);
    render(this.#extraContentListComponent, this.#extraContentComponent.element);
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      this.#renderCard(this.#movies[i], this.#extraContentListComponent.element);
    }

    render(this.#mostCommentedComponent, this.#contentContainerComponent.element);
    render(this.#mostCommentedListcomponent, this.#mostCommentedComponent.element);
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      this.#renderCard(this.#movies[i], this.#mostCommentedListcomponent.element);
    }
  }

  #renderCard(movie, container) {
    const cardComponent = new CardView(movie);

    const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(comment.id));
    const popupComponent = new PopupView(movie, comments);

    const hidePopup = () => {
      document.body.removeChild(popupComponent.element);
      document.body.classList.remove('hide-overflow');
      document.removeEventListener('keydown', handleEscapeDocument);
    };

    function handleEscapeDocument (evt) {
      if (isEscape(evt.code)) {
        evt.preventDefault();
        hidePopup();
      }
    }

    const showPopup = () => {
      document.body.classList.add('hide-overflow');
      document.body.appendChild(popupComponent.element);
      document.addEventListener('keydown', handleEscapeDocument);
    };

    cardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      showPopup();
    });

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
      hidePopup();
    });

    render(cardComponent, container);
  }
}
