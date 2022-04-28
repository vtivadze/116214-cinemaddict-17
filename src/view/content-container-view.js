import { createElement } from '../render';

const createContentContainerTemplate = () => '<section class="films"></section>';

export default class ContentContainerView {
  getTemplate() {
    return createContentContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
