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

  get comments () {
    return this.#comments;
  }

  init = async (movie) => {
    try {
      const comments = await this.#commentsApiService.getMovieComments(movie.id);
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.LOAD_COMMENTS, movie);
  };

  deleteComment(commentId) {
    const commentIndex = this.#comments.findIndex((comment) => comment.id === commentId);

    if (commentIndex === -1) {
      throw new Error('Can\'t delete unexiting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, commentIndex),
      ...this.#comments.slice(commentIndex + 1)
    ];
  }

  addComment(comment) {
    this.#comments = [
      ...this.#comments,
      comment,
    ];
  }

  #adaptToClient(comments) {
    const adaptedComments = {...comments,
      date: dayjs(comments.date).toDate()
    };

    return adaptedComments;
  }
}
