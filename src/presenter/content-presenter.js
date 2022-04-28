import { render } from '../render.js';
import ContentContainerView from '../view/content-container-view.js';
import MainContentView from '../view/main-content-view.js';

export default class ContentPresenter {
  contentContainerComponent = new ContentContainerView();

  init(board) {
    this.board = board;

    render(this.contentContainerComponent, this.board);
    render(new MainContentView(), this.contentContainerComponent.getElement());
  }
}
