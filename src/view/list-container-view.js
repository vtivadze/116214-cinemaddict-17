import {createElement} from '../render.js';

const createListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class {
  getTemplate() {
    return createListContainerTemplate();
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
