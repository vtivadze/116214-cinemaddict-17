import {render} from '../framework/render.js';
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
    return this.#moviesModel.topRated.slice(0, TOP_RATED_COUNT);
  }

  #renderCardsContainer() {
    render(this.#topRatedComponenet, this.#contentContainer);
    render(this.#listContainerComponent, this.#topRatedComponenet.element);
    this.#movies.forEach((movie) => this.#renderCard(movie));
  }

  #renderCard(movie) {
    const comments = this.#commentsModel.comments.filter((comment) => movie.comments.includes(String(comment.id)));
    const cardPresenter = new CardPresenter(this.#listContainerComponent.element, comments);
    cardPresenter.init(movie);
  }
}
