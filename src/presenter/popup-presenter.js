import { isEscape } from '../utils/util.js';
import { UserAction, UpdateType, FilterType } from '../const.js';
import {render, replace, remove} from '../framework/render.js';
import PopupView from '../view/popup-view.js';

export default class PopupPresenter {
  #changeData = null;
  #commentsModel = null;
  #filtersModel = null;

  #movie = null;
  #comments = [];
  #popupComponent = null;
  #keyDownHandler = null;
  #prevState = {};
  #isCommentLoading = true;

  popupMovieId = null;

  constructor(commentsModel, changeData, filtersModel) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#filtersModel = filtersModel;
  }

  init(movie) {
    this.#movie = movie;
    this.popupMovieId = movie.id;
    this.#commentsModel.init(movie);
    this.#comments = [];

    this.#renderPopup();
  }

  refreshPopup() {
    this.#isCommentLoading = false;
    this.#comments = this.#commentsModel.comments;
    this.#renderPopup();
  }

  updatePopup(movie) {
    this.#prevState = this.#getPrevState();
    this.init(movie);
  }

  #renderPopup() {
    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(this.#movie, this.#comments, this.#prevState, this.#isCommentLoading);

    this.#setHandlers();

    if (prevPopupComponent === null) {
      render(this.#popupComponent, document.body);
      document.body.classList.add('hide-overflow');
      this.#scrollTopPopup();
      return;
    }

    if (document.body.contains(prevPopupComponent.element)) {
      replace(this.#popupComponent, prevPopupComponent);
      this.#scrollTopPopup();
    }

    remove(prevPopupComponent);
  }

  #getPrevState() {
    const {selectedEmoji, commentInputValue, scrollTop} = this.#popupComponent._state;
    return {selectedEmoji, commentInputValue, scrollTop};
  }

  #scrollTopPopup() {
    this.#popupComponent.element.scrollTop = this.#popupComponent._state.scrollTop;
  }

  #setHandlers() {
    this.#popupComponent.setAddToWatchlistClickHandler(this.#onAddToWatchlistClick.bind(this));
    this.#popupComponent.setAlreadyWatchedClickHandler(this.#onAlreadyWatchedClick.bind(this));
    this.#popupComponent.setFavoriteClickHandler(this.#onFavoriteClick.bind(this));
    this.#popupComponent.setCommentDeleteHandler(this.#onCommentDelete.bind(this));
    this.#popupComponent.setCommentAddHandler(this.#onCommentAdd.bind(this));
    this.#popupComponent.setCloseButtonClickHandler(this.#removePopup.bind(this));
    this.#setDocumentKeydownHandler();
  }

  #setDocumentKeydownHandler() {
    if (this.#keyDownHandler !== null) {
      document.removeEventListener('keydown', this.#keyDownHandler);
    }
    this.#keyDownHandler = this.#onDocumentKeydown.bind(this);
    document.addEventListener('keydown', this.#keyDownHandler);
  }

  #removePopup() {
    this.#comments = [];
    this.#popupComponent._setState({comments: []});
    remove(this.#popupComponent);
    this.#popupComponent = null;
    this.#prevState = {};
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#keyDownHandler);
    this.popupMovieId = null;
  }

  #onAddToWatchlistClick() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;
    const updateType = this.#filtersModel.currentFilterType === FilterType.WATCHLIST ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }

  #onAlreadyWatchedClick() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    const updateType = this.#filtersModel.currentFilterType === FilterType.HISTORY ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }

  #onFavoriteClick() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;
    const updateType = this.#filtersModel.currentFilterType === FilterType.FAVORITES ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_MOVIE, updateType, movie);
  }

  #onCommentDelete(commentId) {
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

  #onCommentAdd(newComment) {
    const comment = {
      // ...generateComment(),
      ...newComment,
    };

    const movie = {...this.#movie};
    movie.comments = [
      ...movie.comments,
      comment.id,
    ];

    this.#changeData(UserAction.ADD_COMMENT, UpdateType.POPUP_MAJOR, {comment, movie});
  }

  #onDocumentKeydown(evt) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#removePopup();
    }
  }
}
