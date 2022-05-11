import AbstractView from '../framework/view/abstract-view';

const createContentContainerTemplate = () => '<section class="films"></section>';

export default class ContentContainerView extends AbstractView {
  get template() {
    return createContentContainerTemplate();
  }
}
