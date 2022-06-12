import Observable from '../framework/observable.js';
import { generateComment } from '../mock/comment.js';
import { COMMENTS_ALL_COUNT } from '../const.js';

export default class CommentsModel extends Observable {
  #comments = Array.from({length: COMMENTS_ALL_COUNT}, generateComment);

  get comments () {
    return this.#comments;
  }

  deleteComment = (updateType, data) => {
    const commentId = data.commentId;
    const index = this.#comments.findIndex((comment) => comment.id === commentId);

    if (index === -1) {
      throw new Error('Can\'t update unexiting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1)
    ];

    this._notify(updateType, data);
  };
}
