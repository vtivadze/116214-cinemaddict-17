import AbstractView from '../framework/view/abstract-view.js';
import { humanizeYear, humanizeRuntime } from '../utils/util.js';

const createWatchlistButtonTemplate = (watchlist) => (
  `<button
    class="${watchlist ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--add-to-watchlist"
    type="button">Add to watchlist</button>`
);

const createAlreadyWatchedButtonTemplate = (alreadyWatched) => (
  `<button
    class="${alreadyWatched ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--mark-as-watched"
    type="button">Mark as watched</button>`
);

const createFavoriteButtonTemplate = (favorite) => (
  `<button
    class="${favorite ? 'film-card__controls-item--active ' : ''}film-card__controls-item film-card__controls-item--favorite"
    type="button">Mark as favorite</button>`
);

const createMovieTemplate = (movie) => {
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

export default class CardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieTemplate(this.#movie);
  }

  setMovieClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#onMovieClick);
  };

  #onMovieClick = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClick = callback;
    this.element
      .querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#onAddToWatchlistClick);
  };

  #onAddToWatchlistClick = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#onAlreadyWatchedClick);
  };

  #onAlreadyWatchedClick = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#onFavoriteClick);
  };

  #onFavoriteClick = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
