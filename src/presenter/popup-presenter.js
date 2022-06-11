import { isEscape } from '../utils/util.js';
import { UserAction, UpdateType } from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #changeData = null;
  #commentsModel = null;

  #movie = null;
  #comments = [];
  #popupComponent = null;

  static openedPresenter = null;

  constructor(commentsModel, changeData) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;

    this.#commentsModel.addObserver(this.#handleModelEvent.bind(this));
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

    this.#popupComponent.setCloseButtonClickHandler(this.#hidePopup.bind(this));
    document.addEventListener('keydown', this.#documentKeydownHandler.bind(this));

    if (prevPopupComponent === null) {
      if (PopupPresenter.openedPresenter !== null) {
        PopupPresenter.openedPresenter.#hidePopup();
      }

      this.#renderPopup();
      PopupPresenter.openedPresenter = this;
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      this.#replacePopup(prevPopupComponent);
    }

    remove(prevPopupComponent);
  }

  #getComments() {
    return this.#commentsModel.comments.filter((comment) => this.#movie.comments.includes(String(comment.id)));
  }

  #renderPopup() {
    document.body.classList.add('hide-overflow');
    render(this.#popupComponent, document.body);
  }

  #replacePopup(prevPopupComponent) {
    replace(this.#popupComponent, prevPopupComponent);
  }

  #documentKeydownHandler(evt) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#hidePopup();
    }
  }

  #hidePopup() {
    this.#popupComponent.element.remove();
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#documentKeydownHandler);
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
    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.POPUP_MINOR, commentId);
  }

  #handleModelEvent() {
    this.init(this.#movie);
  }

  updatePopup() {
    this.init(this.#movie);
  }
}
