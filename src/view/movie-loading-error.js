import AbstractView from '../framework/view/abstract-view.js';

const createMovieLoadingErrorTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title">Error while data loading</h2>
  </section>`
);

export default class MovieLoadingErrorView extends AbstractView {
  get template() {
    return createMovieLoadingErrorTemplate();
  }
}
