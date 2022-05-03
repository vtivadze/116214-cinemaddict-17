import { createElement } from '../render.js';
import { humanizeYear, humanizeRuntime } from '../util.js';

const createWatchlistButtonTemplate = (watchlist) => watchlist
  ? '<button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>'
  : '<button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>';

const createAlreadyWatchedButtonTemplate = (alreadyWatched) => alreadyWatched
  ? '<button class="film-card__controls-item film-card__controls-item--mark-as-watched film-card__controls-item--active" type="button">Mark as watched</button>'
  : '<button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>';

const createFavoriteButtonTemplate = (favorite) => favorite
  ? '<button class="film-card__controls-item film-card__controls-item--favorite film-card__controls-item--active" type="button">Mark as favorite</button>'
  : '<button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>';

const createCardTemplate = (movie) => {
  const {
    comments,
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
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = movie;

  const releaseDate = humanizeYear(date);
  const genres = genre.join(', ');
  const commentsCount = comments.length;
  const duration = humanizeRuntime(runtime);

  const watchlistButtonTemplate = createWatchlistButtonTemplate(watchlist);
  const alreadyWatchedButtonTemplate = createAlreadyWatchedButtonTemplate(alreadyWatched);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(favorite);

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
        ${watchlistButtonTemplate}
        ${alreadyWatchedButtonTemplate}
        ${favoriteButtonTemplate}
      </div>
    </article>`
  );
};

export default class CardView {
  #element = null;
  #movie = null;

  constructor(movie) {
    this.#movie = movie;
  }

  get template() {
    return createCardTemplate(this.#movie);
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
