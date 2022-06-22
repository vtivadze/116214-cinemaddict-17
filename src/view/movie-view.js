import AbstractView from '../framework/view/abstract-view.js';
import { humanizeYear, humanizeRuntime } from '../utils/util.js';

const createWatchlistButtonTemplate = (watchlist, isMovieUpdating) => (
  `<button
    class="${watchlist ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--add-to-watchlist"
    type="button"
    ${isMovieUpdating ? 'disabled' : ''}
  >Add to watchlist</button>`
);

const createAlreadyWatchedButtonTemplate = (alreadyWatched, isMovieUpdating) => (
  `<button
    class="${alreadyWatched ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--mark-as-watched"
    type="button"
    ${isMovieUpdating ? 'disabled' : ''}
  >Mark as watched</button>`
);

const createFavoriteButtonTemplate = (favorite, isMovieUpdating) => (
  `<button
    class="${favorite ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--favorite"
    type="button"
    ${isMovieUpdating ? 'disabled' : ''}
  >Mark as favorite</button>`
);

const createMovieTemplate = (movie, isMovieUpdating) => {
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

  const watchlistButtonTemplate = createWatchlistButtonTemplate(watchlist, isMovieUpdating);
  const alreadyWatchedButtonTemplate = createAlreadyWatchedButtonTemplate(alreadyWatched, isMovieUpdating);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(favorite, isMovieUpdating);

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
        <img src="./${poster}" alt="${title}" class="film-card__poster">
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

export default class CardView extends AbstractView {
  #movie = null;
  #isMovieUpdating = false;

  constructor(movie, isMovieUpdating) {
    super();
    this.#movie = movie;
    this.#isMovieUpdating = isMovieUpdating;
  }

  get template() {
    return createMovieTemplate(this.#movie, this.#isMovieUpdating);
  }

  setMovieClickHandler(callback) {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#onMovieClick.bind(this));
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#onAddToWatchlistClick.bind(this));
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#onAlreadyWatchedClick.bind(this));
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#onFavoriteClick.bind(this));
  }

  #onAddToWatchlistClick(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  #onAlreadyWatchedClick(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  #onFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  #onMovieClick(evt) {
    evt.preventDefault();
    this._callback.click(this.#movie);
  }
}
