import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';
import ListContainerView from '../view/list-container-view.js';

export default class ContentPresenter {
  contentContainerComponent = new ContentContainerView();
  mainContentComponent = new MainContentView();
  listContainerComponent = new ListContainerView();

  init(board) {
    this.board = board;

    render(this.contentContainerComponent, this.board);
    render(this.mainContentComponent, this.contentContainerComponent.getElement());
    render(this.listContainerComponent, this.mainContentComponent.getElement());
  }
}