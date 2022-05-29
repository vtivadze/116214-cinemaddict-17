import {render} from '../framework/render.js';
import MainContentPresenter from './main-content-presenter.js';
import MostCommentedPresenter from './most-commented-presenter.js';
import TopRatedPresenter from './top-rated-presenter.js';
import BoardView from '../view/board-view.js';

export default class BoardPresenter {
  #boardContainerElement = null;
  #moviesModel = null;
  #commentsModel = null;
  #filterPresenter = null;

  #boardComponent = null;
  #contentPresenters = [];

  constructor(boardContainerElement, moviesModel, commentsModel, filterPresenter) {
    this.#boardContainerElement = boardContainerElement;
    this.#moviesModel = moviesModel;
    this.#commentsModel = commentsModel;
    this.#filterPresenter = filterPresenter;
  }

  init() {
    this.#boardComponent = new BoardView();
    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainerElement);

    this.#renderMainContent();
    this.#renderMosteCommentedContent();
    this.#renderTopRatedContent();
  }

  #renderMainContent() {
    const mainContentPresenter = new MainContentPresenter(
      this.#boardComponent.element,
      this.#moviesModel,
      this.#commentsModel,
      this.#filterPresenter,
      this.#updateContent);
    mainContentPresenter.init();
    this.#contentPresenters.push(mainContentPresenter);
  }

  #renderMosteCommentedContent() {
    const mostCommentedPresenter = new MostCommentedPresenter(
      this.#boardComponent.element,
      this.#moviesModel,
      this.#commentsModel,
      this.#filterPresenter,
      this.#updateContent);
    mostCommentedPresenter.init();
    this.#contentPresenters.push(mostCommentedPresenter);
  }

  #renderTopRatedContent() {
    const topRatedPresenter = new TopRatedPresenter(
      this.#boardComponent.element,
      this.#moviesModel,
      this.#commentsModel,
      this.#filterPresenter,
      this.#updateContent);
    topRatedPresenter.init();
    this.#contentPresenters.push(topRatedPresenter);
  }

  #updateContent = (movie) => this.#contentPresenters.forEach(
    (contentPresenter) => contentPresenter.cardPresenters.forEach(
      (cardPresenter) => {
        if (cardPresenter.movie.id === movie.id) {
          cardPresenter.init(movie);
        }
      }
    )
  );
}
