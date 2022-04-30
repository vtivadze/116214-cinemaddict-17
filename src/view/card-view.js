import { createElement } from '../render.js';
import { humanizeYear, humanizeDuration } from '../util.js';

const createCardTemplate = (movie) => {
  const {
    filmInfo: {
      title,
      totalRating,
      runtime,
      genre,
      poster,
      description,
      release: {
        date
      }
    },
    comments
  } = movie;

  const releaseDate = humanizeYear(date);
  const genres = genre.join(', ');
  const commentsCount = comments.length;
  const duration = humanizeDuration(runtime);

  return  (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${releaseDate}</span>
          <span class="film-card__duration">${duration}</span>
          <span class="film-card__genre">${genres}</span>
        </p>
        <img src="./images/posters/${poster}" alt="${title}" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${commentsCount} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class CardView {
  constructor(movie) {
    this.movie = movie;
  }

  getTemplate() {
    return createCardTemplate(this.movie);
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
