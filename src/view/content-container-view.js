import { createElement } from '../render';

const createContentContainerTemplate = () => '<section class="films"></section>';

export default class ContentContainerView {
  #element = null;

  get template() {
    return createContentContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
