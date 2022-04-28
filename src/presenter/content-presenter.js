import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommented from '../view/most-commented-view.js';

export default class ContentPresenter {
  CARDS_COUNT = 5;
  CARDS_COUNT_EXTRA = 2;

  contentContainerComponent = new ContentContainerView();
  mainContentComponent = new MainContentView();
  mainContentListComponent = new ListContainerView();

  extraContentComponent = new TopRatedView();
  extraContentListComponent = new ListContainerView();

  mostCommentedComponent = new MostCommented();
  mostCommentedListcomponent = new ListContainerView();

  init(board) {
    this.board = board;

    render(this.contentContainerComponent, this.board);

    render(this.mainContentComponent, this.contentContainerComponent.getElement());
    render(this.mainContentListComponent, this.mainContentComponent.getElement());
    for (let i = 0; i < this.CARDS_COUNT; i++) {
      render(new CardView(), this.mainContentListComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.mainContentComponent.getElement());

    render(this.extraContentComponent, this.contentContainerComponent.getElement());
    render(this.extraContentListComponent, this.extraContentComponent.getElement());
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      render(new CardView(), this.extraContentListComponent.getElement());
    }

    render(this.mostCommentedComponent, this.contentContainerComponent.getElement());
    render(this.mostCommentedListcomponent, this.mostCommentedComponent.getElement());
    for (let i = 0; i < this.CARDS_COUNT_EXTRA; i++) {
      render(new CardView(), this.mostCommentedListcomponent.getElement());
    }
  }
}
