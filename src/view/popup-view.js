import AbstractView from '../framework/view/abstract-view.js';
import {humanizeReleaseDate, humanizeRuntime, humanizeCommentDate} from '../utils/util.js';

const createMovieGenresListTemplate = (genres) => genres
  .reduce((previousValue, currentValue) => `${previousValue}<span class="film-details__genre">${currentValue}</span>`, '');

const createCommentsListTemplate = (comments) => comments
  .reduce((previousValue, {emotion, comment, author, date}) => (
    `${previousValue}
    <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
  ), '');

const createWatchlistButtonTemplate = (watchlist) => (
  `<button
    type="button"
    class="${watchlist ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--watchlist"
    id="watchlist" name="watchlist">Add to watchlist</button>`
);

const createAlreadyWatchedButtonTemplate = (alreadyWatched) => (
  `<button
    type="button"
    class="${alreadyWatched ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--watched"
    id="watched" name="watched">Already watched</button>`
);

const createFavoriteButtonTemplate = (favorite) => (
  `<button
    type="button"
    class="${favorite ? 'film-details__control-button--active ' : ''}film-details__control-button film-details__control-button--favorite"
    id="favorite" name="favorite">Add to favorites</button>`
);

const createPopupTemplate = (movie, comments) => {
  const {
    filmInfo: {
      poster,
      title,
      alternativeTitle,
      totalRating,
      director,
      writers,
      actors,
      runtime,
      description,
      genre,
      ageRating,
      release: {
        date,
        releaseCountry
      },
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite
    }
  } = movie;

  const movieWriters = writers.join(', ');
  const movieActors = actors.join(', ');
  const releaseDate = humanizeReleaseDate(date);
  const movieRuntime = humanizeRuntime(runtime);
  const commentsCount = comments.length;

  const movieGenresListTemplate = createMovieGenresListTemplate(genre);

  const commentsListTemplate = commentsCount
    ? createCommentsListTemplate(comments)
    : '';

  const watchlistButtonTemplate = createWatchlistButtonTemplate(watchlist);
  const alreadyWatchedButtonTemplate = createAlreadyWatchedButtonTemplate(alreadyWatched);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(favorite);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${poster}" alt="${title}">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${movieWriters}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${movieActors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${movieRuntime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${movieGenresListTemplate}</td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            ${watchlistButtonTemplate}
            ${alreadyWatchedButtonTemplate}
            ${favoriteButtonTemplate}
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">${commentsListTemplate}</ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupView extends AbstractView {
  #movie = null;
  #comments = null;
  #cardComponent = null;

  constructor(movie, comments, cardComponent) {
    super();
    this.#movie = movie;
    this.#comments = comments;
    this.#cardComponent = cardComponent;
  }

  get template() {
    return createPopupTemplate(this.#movie, this.#comments);
  }

  setCloseButtonClickHandler = (callback) => {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick);
  };

  #onCloseButtonClick = (evt) => {
    evt.preventDefault();
    this._callback.closeButtonClick();
  };

  setAddToWatchlistClickHandler = (callback) => {
    this._callback.addToWatchlistClickPopup = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchlistClickHandler);
  };

  #addToWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this.#cardComponent._callback.addToWatchlistClick();
    this._callback.addToWatchlistClickPopup();
  };
}
