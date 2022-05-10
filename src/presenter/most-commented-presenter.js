import {render} from '../render.js';
import MostCommentedView from '../view/most-commented-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardPresenter from './card-presenter.js';

const MOST_COMMETNTED_COUNT = 2;

export default class MostCommentedPresenter {
  #mostCommentedComponent = new MostCommentedView();
  #listContainerComponent = new ListContainerView();

  #contentContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #movies = [];

  #mostCommentedCount = MOST_COMMETNTED_COUNT;

  constructor(contentContainer, moviesModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#movies = this.#getMostCommentedMovies();
    this.#renderCardsContainer();
  }

  #getMostCommentedMovies() {
    return this.#moviesModel.mostCommented.slice(0, MOST_COMMETNTED_COUNT);
  }

  #renderCardsContainer() {
    render(this.#mostCommentedComponent, this.#contentContainer);
    render(this.#listContainerComponent, this.#mostCommentedComponent.element);
    for (let i = 0; i < this.#mostCommentedCount; i++) {
      const comments = this.#commentsModel.comments.filter((comment) => this.#movies[i].comments.includes(String(comment.id)));
      const cardPresenter = new CardPresenter(this.#movies[i], comments);
      cardPresenter.init().renderCard(this.#listContainerComponent.element);
    }
  }
}
