import AbstractView from '../framework/view/abstract-view.js';

const createMainContentTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  </section>`
);

export default class MainContentView extends AbstractView {
  get template() {
    return createMainContentTemplate();
  }
}

