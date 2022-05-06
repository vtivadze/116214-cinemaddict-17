import { createElement } from '../render.js';

const createNomovieTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2>';

export default class NomovieView {
  #element = null;

  get template() {
    return createNomovieTemplate();
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
