import AbstractView from '../framework/view/abstract-view';

const createBoardViewTemplate = () => '<section class="films"></section>';

export default class BoardView extends AbstractView {
  get template() {
    return createBoardViewTemplate();
  }
}
