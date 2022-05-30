import {render} from '../framework/render.js';
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
  #filterPresenter = null;
  #updateContent = null;

  #movies = [];
  cardPresenters = new Map();

  constructor(contentContainer, moviesModel, commentsModel, filterPresenter, updateContent) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;
    this.#updateContent = updateContent;
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
    this.#movies.forEach((movie) => this.#renderCard(movie));
  }

  #renderCard(movie) {
    const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
    const cardPresenter = new CardPresenter(
      this.#listContainerComponent.element,
      comments,
      this.#moviesModel,
      this.#filterPresenter,
      this.#updateContent);
    cardPresenter.init(movie);
    this.cardPresenters.set(movie.id, cardPresenter);
  }
}
