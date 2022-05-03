import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommented from '../view/most-commented-view.js';

export default class ContentPresenter {
  CARDS_COUNT_EXTRA = 2;

  #board = null;
  #moviesModel = null;
  #movies = [];

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
      this.#renderMovie(this.#movies[i], this.#mainContentListComponent);
    }
    render(new ShowMoreButtonView(), this.#mainContentComponent.element);

    render(this.#extraContentComponent, this.#contentContainerComponent.element);
    render(this.#extraContentListComponent, this.#extraContentComponent.element);
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      this.#renderMovie(this.#movies[i], this.#extraContentListComponent);
    }

    render(this.#mostCommentedComponent, this.#contentContainerComponent.element);
    render(this.#mostCommentedListcomponent, this.#mostCommentedComponent.element);
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      this.#renderMovie(this.#movies[i], this.#mostCommentedListcomponent);
    }
  }

  #renderMovie(movie, containerComponent) {
    const cardComponent = new CardView(movie);
    const container = containerComponent.element;
    render(cardComponent, container);
  }
}
