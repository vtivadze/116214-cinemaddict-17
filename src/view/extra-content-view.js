import {createElement} from '../render.js';

const createExtraContentTemplate = () => `<section class="films-list films-list--extra">`;

export default class ExtraContentView {
  getTemplate() {
    return createExtraContentTemplate();
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
