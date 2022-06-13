import { isEscape } from '../utils/util.js';
import { generateComment } from '../mock/comment.js';
import { UserAction, UpdateType } from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #changeData = null;
  #commentsModel = null;

  #movie = null;
  #comments = [];
  #popupComponent = null;
  #keyDownHandler = null;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
  }

  init(movie) {
    this.#movie = movie;
    this.#comments = this.#getComments();

    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(movie, this.#comments);

    this.#popupComponent.setAddToWatchlistClickHandler(this.#addToWatchlistClickHandler.bind(this));
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#alreadyWatchedClickHandler.bind(this));
    this.#popupComponent.setFavoriteClickHandler(this.#favoriteClickHandler.bind(this));
    this.#popupComponent.setCommentDeleteHandler(this.#handleCommentDelete.bind(this));
    this.#popupComponent.setCommentAddHandler(this.#handleCommentAdd.bind(this));

    this.#popupComponent.setCloseButtonClickHandler(this.#hidePopup.bind(this));

    this.#keyDownHandler = this.#documentKeydownHandler.bind(this);
    document.addEventListener('keydown', this.#keyDownHandler);

    if (prevPopupComponent === null) {
      this.#renderPopup();
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
    }

    remove(prevPopupComponent);
  }

  #getComments() {
    return this.#commentsModel.comments.filter((comment) => this.#movie?.comments.includes(String(comment.id)));
  }

  #renderPopup() {
    render(this.#popupComponent, document.body);
    document.body.classList.add('hide-overflow');
  }

  #documentKeydownHandler(evt) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#hidePopup();
    }
  }

  #hidePopup() {
    remove(this.#popupComponent);
    this.#popupComponent = null;
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#keyDownHandler);
  }

  #addToWatchlistClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;
    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.POPUP_MINOR, movie);
  }

  #alreadyWatchedClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.POPUP_MINOR, movie);
  }

  #favoriteClickHandler() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;
    this.#changeData(UserAction.UPDATE_MOVIE, UpdateType.POPUP_MINOR, movie);
  }

  #handleCommentDelete(commentId) {
    const movie = {...this.#movie};

    const commentIndex = movie.comments.findIndex((id) => id === commentId);

    if (commentIndex === -1) {
      return;
    }

    movie.comments = [
      ...movie.comments.slice(0, commentIndex),
      ...movie.comments.slice(commentIndex + 1),
    ];

    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.POPUP_MAJOR, {commentId, movie});
  }

  #handleCommentAdd(newComment) {
    const comment = {
      ...generateComment(),
      ...newComment,
    };
    const movie = {...this.#movie};

    movie.comments = [
      ...movie.comments,
      comment.id,
    ];

    this.#changeData(UserAction.ADD_COMMENT, UpdateType.POPUP_MAJOR, {comment, movie});

  }

  updatePopup(movie) {
    this.init(movie);
  }
}
