import {render} from '../render.js';
import TopRatedView from '../view/top-rated-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardPresenter from './card-presenter.js';

const TOP_RATED_COUNT = 2;

export default class TopRatedPresenter {
  #topRatedComponenet = new TopRatedView();
  #listContainerComponent = new ListContainerView();

  #contentContainer = null;
  #moviesModel = null;
  #commentsModel = null;
  #movies = [];

  #topRatedCount = TOP_RATED_COUNT;

  constructor(contentContainer, moviesModel, commentsModel) {
    this.#contentContainer = contentContainer;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
  }

  init() {
    this.#movies = this.#getTopRatedMovies();
    this.#renderCardsContainer();
  }

  #getTopRatedMovies() {
    return this.#moviesModel.topRated.slice(0, this.#topRatedCount);
  }

  #renderCardsContainer() {
    render(this.#topRatedComponenet, this.#contentContainer);
    render(this.#listContainerComponent, this.#topRatedComponenet.element);
    for (let i = 0; i < this.#topRatedCount; i++) {
      const comments = this.#commentsModel.comments.filter((comment) => this.#movies[i].comments.includes(String(comment.id)));
      const cardPresenter = new CardPresenter(this.#movies[i], comments);
      cardPresenter.init().renderCard(this.#listContainerComponent.element);
    }
  }
}
