import AbstractView from '../framework/view/abstract-view.js';

const createListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class ListContainerView extends AbstractView {
  get template() {
    return createListContainerTemplate();
  }
}
