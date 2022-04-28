import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';
import CardView from '../view/card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import ExtraContentView from '../view/extra-content-view.js';

export default class ContentPresenter {
  contentContainerComponent = new ContentContainerView();
  mainContentComponent = new MainContentView();
  extraContentComponent = new ExtraContentView();
  listContainerComponent = new ListContainerView();

  init(board) {
    this.board = board;

    render(this.contentContainerComponent, this.board);

    render(this.mainContentComponent, this.contentContainerComponent.getElement());
    render(this.listContainerComponent, this.mainContentComponent.getElement());
    for (let i = 0; i < 5; i++) {
      render(new CardView(), this.listContainerComponent.getElement());
    }
    render(new ShowMoreButtonView(), this.mainContentComponent.getElement());

    render(this.extraContentComponent, this.contentContainerComponent.getElement());
  }
}
