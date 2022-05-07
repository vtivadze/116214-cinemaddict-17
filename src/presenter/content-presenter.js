import { isEscape } from '../util.js';
import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';
import LoadMoreButtonView from '../view/load-more-button-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommented from '../view/most-commented-view.js';
import PopupView from '../view/popup-view.js';
import NomovieView from '../view/nomovie-view.js';
import CommentsModel from '../model/comments-model.js';

const CARDS_COUNT_EXTRA = 2;
const MOVIE_COUNT_PER_STEP = 5;

export default class ContentPresenter {
  #board = null;
  #moviesModel = null;
  #movies = [];

  #commentsModel = new CommentsModel();

  #contentContainerComponent = new ContentContainerView();

  #mainContentComponent = new MainContentView();
  #mainContentListComponent = new ListContainerView();

  #loadMoreButtonComponent = new LoadMoreButtonView();
  #renderedMoviesCount = MOVIE_COUNT_PER_STEP;

  #topRatedComponent = new TopRatedView();
  #topRatedListComponent = new ListContainerView();

  #mostCommentedComponent = new MostCommented();
  #mostCommentedListcomponent = new ListContainerView();

  init(board, moviesModel) {
    this.#board = board;
    this.#moviesModel = moviesModel;
    this.#movies = [...this.#moviesModel.movies];

    render(this.#contentContainerComponent, this.#board);

    render(this.#mainContentComponent, this.#contentContainerComponent.element);
    if (this.#movies.length === 0) {
      render(new NomovieView(), this.#mainContentComponent.element);
      return;
    }

    render(this.#mainContentListComponent, this.#mainContentComponent.element);
    for (let i = 0; i < Math.min(this.#movies.length, MOVIE_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#movies[i], this.#mainContentListComponent.element);
    }

    if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
      render(this.#loadMoreButtonComponent, this.#mainContentComponent.element);

      this.#loadMoreButtonComponent.element.addEventListener('click', this.#handleLoadMoreButtonClick);
    }

    render(this.#topRatedComponent, this.#contentContainerComponent.element);
    render(this.#topRatedListComponent, this.#topRatedComponent.element);
    for (let i = 0; i < CARDS_COUNT_EXTRA; i++) {
      this.#renderCard(this.#movies[i], this.#topRatedListComponent.element);
    }

    render(this.#mostCommentedComponent, this.#contentContainerComponent.element);
    render(this.#mostCommentedListcomponent, this.#mostCommentedComponent.element);
    for (let i = 0; i < CARDS_COUNT_EXTRA; i++) {
      this.#renderCard(this.#movies[i], this.#mostCommentedListcomponent.element);
    }

  }

  #handleLoadMoreButtonClick = () => {
    this.#movies
      .slice(this.#renderedMoviesCount, this.#renderedMoviesCount + MOVIE_COUNT_PER_STEP)
      .forEach((movie) => this.#renderCard(movie, this.#mainContentListComponent.element));

    this.#renderedMoviesCount += MOVIE_COUNT_PER_STEP;

    if (this.#renderedMoviesCount >= this.#movies.length) {
      this.#loadMoreButtonComponent.element.remove();
      this.#loadMoreButtonComponent.removeElement();
    }
  };

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
