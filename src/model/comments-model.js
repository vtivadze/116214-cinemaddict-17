import dayjs from 'dayjs';
import { UpdateType } from '../const.js';
import Observable from '../framework/observable.js';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (movie) => {
    let updateType = null;

    try {
      const comments = await this.#commentsApiService.getMovieComments(
        movie.id
      );
      this.#comments = comments.map(this.#adaptToClient);
      updateType = UpdateType.COMMENT_LOAD;
    } catch (err) {
      this.#comments = [];
      updateType = UpdateType.COMMENT_LOAD_ERROR;
    }

    this._notify(updateType, movie);
  };

  deleteComment = async (updateType, {commentId, movie}, moviesModel) => {
    const commentIndex = this.#comments.findIndex(
      (comment) => comment.id === commentId
    );

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexiting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(commentId);

      this.#comments = [
        ...this.#comments.slice(0, commentIndex),
        ...this.#comments.slice(commentIndex + 1),
      ];

      movie.comments = this.#comments.map((comment) => comment.id);
      moviesModel.updateMoviesModel(movie);

      this._notify(updateType, movie);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  };

  addComment = async ({comment, movieId}, updateType, moviesModel) => {
    try {
      const response = await this.#commentsApiService.addComment(comment, movieId);
      const {movie, comments} = response;

      this.#comments = [...comments];
      moviesModel.updateMoviesModel(movie);

      this._notify(updateType, moviesModel.getMovie(movieId));
    }catch(err) {
      throw new Error('Can\'t add comment');
    }
  };

  #adaptToClient(comments) {
    const adaptedComments = {
      ...comments,
      date: dayjs(comments.date).toDate(),
    };

    return adaptedComments;
  }
}
