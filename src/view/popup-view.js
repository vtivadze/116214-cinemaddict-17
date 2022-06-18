import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeReleaseDate, humanizeRuntime, humanizeCommentDate} from '../utils/util.js';
import { emojies } from '../const.js';

const createMovieGenresListTemplate = (genres) => genres
  .reduce((previousValue, currentValue) => `${previousValue}<span class="film-details__genre">${currentValue}</span>`, '');

const createCommentsListTemplate = (comments) => comments
  .reduce((previousValue, {id, emotion, comment, author, date}) => (
    `${previousValue}
    <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${he.encode(emotion)}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${humanizeCommentDate(date)}</span>
            <button class="film-details__comment-delete" data-comment-id="${id}">Delete</button>
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

const createSelectedEmojiTemplate = (selectedEmoji) => (
  selectedEmoji ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-smile">` : ''
);

const createEmojiListTemplate = (selectedEmoji) => (
  emojies.map((emoji) => (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji === selectedEmoji && 'checked'}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji" data-emoji-type="${emoji}">
    </label>`
  )).join('')
);

const createCommentsTemplate = (comments) => (
  `<ul class="film-details__comments-list">${createCommentsListTemplate(comments)}</ul>`
);

const createCommentLoadingTemplate = () => '<h3>Loading...</h3>';
const createCommentLoadErrorTemplate = () => '<h3>Error while comments\' loading</h3>';

const createCommentFormTemplate = (selectedEmoji, commentInputValue) => {
  const selectedEmojiTemplate = createSelectedEmojiTemplate(selectedEmoji);
  const emojiListeTemplate = createEmojiListTemplate(selectedEmoji);

  return (
    `<div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">${selectedEmojiTemplate}</div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${commentInputValue}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiListeTemplate}
      </div>
    </div>`
  );
};

const createPopupTemplate = (movie, comments, selectedEmoji, commentInputValue, isCommentLoading, isCommentLoadError) => {
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

  const commentsTemplate = createCommentsTemplate(comments);

  const watchlistButtonTemplate = createWatchlistButtonTemplate(watchlist);
  const alreadyWatchedButtonTemplate = createAlreadyWatchedButtonTemplate(alreadyWatched);
  const favoriteButtonTemplate = createFavoriteButtonTemplate(favorite);

  const commentLoadingTemplate = createCommentLoadingTemplate();
  const commentLoadErrorTemplate = createCommentLoadErrorTemplate();

  const commentFormTemplate = createCommentFormTemplate(selectedEmoji, commentInputValue);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${poster}" alt="${title}">

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

            ${isCommentLoading ? commentLoadingTemplate : ''}
            ${isCommentLoadError ? commentLoadErrorTemplate : ''}
            ${!isCommentLoading && !isCommentLoadError ? commentsTemplate : ''}

            ${!isCommentLoadError ? commentFormTemplate : ''}
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupView extends AbstractStatefulView {
  #isCommentLoading = true;
  #isCommentLoadError = false;

  static defaultState = {
    selectedEmoji: '',
    scrollTop: 0,
    commentInputValue: '',
  };

  constructor(movie, comments, prevState, isCommentLoading, isCommentLoadError) {
    super();
    this.#isCommentLoading = isCommentLoading;
    this.#isCommentLoadError = isCommentLoadError;
    this._state = PopupView.parsePopupToState(movie, comments, prevState);

    this.#setInnerHandlers();
  }

  get template() {
    const popup = PopupView.parseStateToPopup(this._state);

    return createPopupTemplate(
      popup.movie,
      popup.comments,
      popup.selectedEmoji,
      popup.commentInputValue,
      this.#isCommentLoading,
      this.#isCommentLoadError,
    );
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);
    this.setAddToWatchlistClickHandler(this._callback.addToWatchlistClick);
    this.setAlreadyWatchedClickHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCommentDeleteHandler(this._callback.commentDelete);
    this.setCommentAddHandler(this._callback.commentAdd);
  };

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#onCloseButtonClick.bind(this));
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.element
      .querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#onAddToWatchlistClick.bind(this));
  }

  setAlreadyWatchedClickHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.element
      .querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#onAlreadyWatchedClick.bind(this));
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element
      .querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#onFavoriteClick.bind(this));
  }

  setCommentDeleteHandler(callback) {
    if (this._state.comments.length > 0) {
      this._callback.commentDelete = callback;
      this.element
        .querySelector('.film-details__comments-list')
        .addEventListener('click', this.#onCommentDelete.bind(this));
    }
  }

  setCommentAddHandler(callback) {
    if (this.#isCommentLoadError === false) {
      this._callback.commentAdd = callback;
      this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#onCommentAdd.bind(this));
    }
  }

  #setInnerHandlers() {
    if (this.#isCommentLoadError === false) {
      this.element.querySelector('.film-details__emoji-list').addEventListener('click', this.#onEmojiTypeChange.bind(this));
      this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#onCommentInput.bind(this));
    }
    this.element.addEventListener('scroll', this.#onPopupScroll.bind(this));
  }

  #onCommentInput(evt) {
    evt.preventDefault();
    this._setState({
      commentInputValue: evt.target.value,
    });
  }

  #onEmojiTypeChange(evt) {
    evt.preventDefault();
    this.updateElement({
      selectedEmoji: evt.target.dataset.emojiType,
      scrollTop: this.element.scrollTop,
    });
    this.element.scrollTop = this._state.scrollTop;
  }

  #onPopupScroll(evt) {
    evt.preventDefault();
    this._setState({
      scrollTop: this.element.scrollTop,
    });
  }

  #onCloseButtonClick(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
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

  #onCommentDelete(evt) {
    if (evt.target.tagName !== 'BUTTON') {
      return;
    }

    evt.preventDefault();
    this._callback.commentDelete(evt.target.dataset.commentId);
  }

  #onCommentAdd(evt) {
    if (!evt.ctrlKey || evt.key !== 'Enter') {
      return;
    }

    const commentBody = document.querySelector('.film-details__comment-input').value;
    const emoji = document.querySelector('.film-details__emoji-list input[checked]')?.value;

    if (!commentBody || !emoji) {
      return;
    }

    const comment = {comment: commentBody, emotion: emoji};

    this._setState({
      selectedEmoji: '',
      commentInputValue: '',
    });

    evt.preventDefault();
    this._callback.commentAdd(comment);
  }

  static parsePopupToState(movie, comments, prevState) {
    const state = {
      ...PopupView.defaultState,
      ...prevState,
      movie: {...movie},
      comments: [...comments],
    };

    return state;
  }

  static parseStateToPopup(state) {
    const popup = {...state};

    return popup;
  }
}
