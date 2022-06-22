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
  #isCommentLoading = true;
  #isCommentLoadError = false;

  constructor(commentsModel, changeData, filtersModel) {
    this.#commentsModel = commentsModel;
    this.#changeData = changeData;
    this.#filtersModel = filtersModel;
  }

  init(movie) {
    this.#movie = movie;
    this.#commentsModel.init(movie);
  }

  refreshPopup(isCommentLoadError) {
    this.#isCommentLoadError = isCommentLoadError;
    this.#isCommentLoading = false;
    this.#comments = this.#commentsModel.comments;
    this.#renderPopup();
  }

  updatePopup(movie) {
    this.init(movie);
  }

  setCommentDeleting(deletingCommentId) {
    this.#popupComponent.updateElement({
      deletingCommentId,
    });
  }

  setCommentSaving() {
    this.#popupComponent.updateElement({
      isSaving: true,
    });
  }

  setMovieUpdating() {
    this.#popupComponent.updateElement({
      isMovieUpdating: true,
    });
  }

  setCommentDeleteAborting() {
    const resetCommentDelete = () => {
      this.#popupComponent.updateElement({
        deletingCommentId: null,
        isDeletingError: true,
      });
    };

    this.#popupComponent.shake('film-details__comments-list', resetCommentDelete);
  }

  setCommentSaveAborting() {
    const resetCommentSave = () => {
      this.#popupComponent.updateElement({
        isSaving: false,
        isSavingError: false,
        isDisablingForm: false,
      });
    };

    this.#popupComponent.shake('film-details__new-comment', resetCommentSave);
  }

  setMovieUpdateAborting() {
    const resetMovieUpdating = () => {
      this.#popupComponent.updateElement({
        isMovieUpdating: false,
      });
    };

    this.#popupComponent.shake('film-details__controls', resetMovieUpdating);
  }

  #renderPopup() {
    const prevPopupComponent = this.#popupComponent;
    this.#popupComponent = new PopupView(this.#movie, this.#comments, this.#isCommentLoading, this.#isCommentLoadError);

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
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#keyDownHandler);
  }

  #onAddToWatchlistClick() {
    const movie = {...this.#movie};
    movie.userDetails.watchlist = !movie.userDetails.watchlist;
    const updateType = this.#filtersModel.currentFilterType === FilterType.WATCHLIST ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_POPUP_MOVIE, updateType, movie);
  }

  #onAlreadyWatchedClick() {
    const movie = {...this.#movie};
    movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    const updateType = this.#filtersModel.currentFilterType === FilterType.HISTORY ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_POPUP_MOVIE, updateType, movie);
  }

  #onFavoriteClick() {
    const movie = {...this.#movie};
    movie.userDetails.favorite = !movie.userDetails.favorite;
    const updateType = this.#filtersModel.currentFilterType === FilterType.FAVORITES ? UpdateType.POPUP_MINOR : UpdateType.POPUP_PATCH;
    this.#changeData(UserAction.UPDATE_POPUP_MOVIE, updateType, movie);
  }

  #onCommentDelete(commentId) {
    const movie = {...this.#movie};

    const commentIndex = movie.comments.findIndex((id) => id === commentId);

    if (commentIndex === -1) {
      return;
    }

    this.#changeData(UserAction.DELETE_COMMENT, UpdateType.POPUP_MAJOR, {commentId, movie});
  }

  #onCommentAdd(comment) {
    this.#changeData(UserAction.ADD_COMMENT, UpdateType.POPUP_MAJOR, {comment, movieId: this.#movie.id});
  }

  #onDocumentKeydown(evt) {
    if (isEscape(evt.code)) {
      evt.preventDefault();
      this.#removePopup();
    }
  }
}
